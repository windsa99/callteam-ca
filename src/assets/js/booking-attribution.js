/* CallTeam booking attribution. Labels links; never intercepts navigation. */
(function (root, factory) {
  'use strict';
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else {
    try { factory().start(root); } catch (_) { /* Ordinary booking links remain usable. */ }
  }
})(typeof window !== 'undefined' ? window : null, function () {
  'use strict';

  var STORAGE_KEY = 'callteam.booking-visit.v1';
  var VISIT_TIMEOUT = 30 * 60 * 1000;
  var BOOKING_PATH = '/hello-callteam/new-meeting';
  var UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

  function clean(value, limit) {
    return String(value || '').replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, limit || 100);
  }

  function host(value) { return String(value || '').toLowerCase().replace(/^www\./, ''); }

  function internal(ref, current) {
    return ref.hostname === current.hostname ||
      (host(ref.hostname) === 'callteam.ca' && host(current.hostname) === 'callteam.ca');
  }

  function parseUrl(value, base) {
    try { return new URL(value, base); } catch (_) { return null; }
  }

  function isBookingUrl(value, base) {
    var url = parseUrl(value, base);
    return !!url && url.protocol === 'https:' && !url.username && !url.password &&
      url.hostname.toLowerCase() === 'calendly.com' &&
      url.pathname.replace(/\/+$/, '') === BOOKING_PATH;
  }

  function visitFrom(href, referrer, previous, now) {
    var current = parseUrl(href);
    if (!current) return null;
    var ref = referrer ? parseUrl(referrer) : null;
    var external = !!ref && /^https?:$/.test(ref.protocol) && !internal(ref, current) && host(ref.hostname) !== 'calendly.com';
    var incoming = {};
    UTM_KEYS.forEach(function (key) { incoming[key] = clean(current.searchParams.get(key), 100); });
    var changedCampaign = !!incoming.utm_source && (!previous || incoming.utm_source !== previous.source ||
      (incoming.utm_campaign && incoming.utm_campaign !== previous.campaign));
    var valid = previous && previous.version === 1 && typeof previous.entryPath === 'string' &&
      previous.entryPath.charAt(0) === '/' && typeof previous.lastSeen === 'number' &&
      now >= previous.lastSeen && now - previous.lastSeen < VISIT_TIMEOUT;
    if (valid && !external && !changedCampaign) return Object.assign({}, previous, { lastSeen: now });

    var source = 'direct_or_unknown';
    var medium = 'unknown';
    var basis = 'unknown';
    if (incoming.utm_source) {
      source = incoming.utm_source;
      medium = incoming.utm_medium || 'tagged';
      basis = 'campaign_tag';
    } else if (external) {
      var domain = host(ref.hostname);
      source = domain;
      medium = 'referral';
      basis = 'referrer';
      if (/(^|\.)google\.[a-z.]+$/.test(domain)) { source = 'google'; medium = 'organic'; }
      else if (domain === 'bing.com' || domain === 'duckduckgo.com' || domain === 'search.brave.com') {
        source = domain === 'search.brave.com' ? 'brave' : domain.split('.')[0]; medium = 'organic';
      }
      if (current.searchParams.has('gclid') || current.searchParams.has('msclkid')) medium = 'paid';
    }
    return {
      version: 1, startedAt: now, lastSeen: now, entryPath: current.pathname,
      source: source, medium: medium, campaign: incoming.utm_campaign || '',
      term: incoming.utm_term || '', content: incoming.utm_content || '', sourceBasis: basis
    };
  }

  function hash(value) {
    var result = 2166136261;
    for (var i = 0; i < value.length; i++) result = Math.imul(result ^ value.charCodeAt(i), 16777619);
    return (result >>> 0).toString(36);
  }

  function pageLabel(path) {
    var label = String(path || '/').replace(/^\/+|\/+$/g, '') || 'home';
    label = label.replace(/^resources\/cold-call-scripts\//, 'script:')
      .replace(/^articles\//, 'article:').replace(/^services\//, 'service:')
      .replace(/^case-studies\//, 'case:');
    label = label.replace(/[|=\r\n]/g, '_');
    return label.length <= 64 ? label : label.slice(0, 54) + '~' + hash(label);
  }

  function contentTag(visit, path, placement, originalContent) {
    var tag = 'ct1|entry=' + pageLabel(visit.entryPath) + '|page=' + pageLabel(path) +
      '|button=' + clean(placement, 24).replace(/[|=]/g, '_');
    if (originalContent) tag += '|campaign_content=' + clean(originalContent, 64).replace(/[|=]/g, '_');
    return tag.slice(0, 255);
  }

  function bookingUrl(value, href, visit, placement) {
    if (!visit || !isBookingUrl(value, href)) return value;
    var url = parseUrl(value, href);
    var current = parseUrl(href);
    var oldContent = url.searchParams.get('utm_content') || visit.content;
    if (oldContent && oldContent.indexOf('ct1|entry=') === 0) {
      var match = oldContent.match(/\|campaign_content=(.*)$/);
      oldContent = match ? match[1] : '';
    }
    var values = {
      utm_source: visit.source, utm_medium: visit.medium,
      utm_campaign: visit.campaign || 'website_booking', utm_term: visit.term
    };
    Object.keys(values).forEach(function (key) {
      if (!url.searchParams.get(key) && values[key]) url.searchParams.set(key, clean(values[key], 255));
    });
    url.searchParams.set('utm_content', contentTag(visit, current.pathname, placement, oldContent));
    return url.toString();
  }

  function readVisit(storage) {
    try { return JSON.parse(storage.getItem(STORAGE_KEY) || 'null'); } catch (_) { return null; }
  }

  function writeVisit(storage, visit) {
    try { storage.setItem(STORAGE_KEY, JSON.stringify(visit)); return true; } catch (_) { return false; }
  }

  function placementFor(anchor, index) {
    var explicit = anchor.getAttribute('data-booking-placement');
    if (explicit) return clean(explicit, 24);
    if (anchor.closest('.site-header')) return 'header';
    if (anchor.closest('footer')) return 'footer';
    if (anchor.closest('.hero, .article-hero, .ev-hero, .sdr-hero, .pricing-hero, .cs-hero')) return 'hero';
    if (anchor.closest('.article-cta, .ev-final, .sdr-final, .cta-section, .pricing-cta, .final-cta, .cta-band')) return 'closing';
    if (anchor.closest('#contact')) return 'contact';
    return 'body-' + (index + 1);
  }

  function start(win) {
    if (!win || !win.document || typeof win.URL !== 'function' || typeof win.WeakMap !== 'function') return null;
    if (win.CallTeamBookingAttribution) return win.CallTeamBookingAttribution;
    var doc = win.document;
    var storage;
    try { storage = win.sessionStorage; } catch (_) { storage = null; }
    var visit = visitFrom(win.location.href, doc.referrer, readVisit(storage), Date.now());
    if (!visit) return null;
    var persisted = writeVisit(storage, visit);
    var originals = new WeakMap();

    function decorate(anchor, index) {
      if (!anchor || anchor.tagName !== 'A') return;
      var raw = anchor.getAttribute('href');
      var saved = originals.get(anchor);
      var original = saved && raw === saved.decorated ? saved.original : raw;
      if (!original || !isBookingUrl(original, win.location.href)) return;
      var position = typeof index === 'number' && index >= 0 ? index :
        Array.prototype.indexOf.call(doc.querySelectorAll('a[href]'), anchor);
      var next = bookingUrl(original, win.location.href, visit, placementFor(anchor, position));
      originals.set(anchor, { original: original, decorated: next });
      if (raw !== next) anchor.setAttribute('href', next);
    }

    function refresh() {
      doc.querySelectorAll('a[href]').forEach(function (anchor, index) { decorate(anchor, index); });
    }

    function prepare(event) {
      var target = event.target;
      var anchor = target && target.closest ? target.closest('a[href]') : null;
      if (anchor) decorate(anchor);
    }

    // All page-specific deferred scripts run before this file; existing handlers stay attached.
    refresh();
    ['pointerdown', 'focusin', 'click', 'auxclick', 'contextmenu'].forEach(function (name) {
      doc.addEventListener(name, prepare, true);
    });
    if (typeof win.MutationObserver === 'function') {
      var observer = new win.MutationObserver(function (records) {
        records.forEach(function (record) {
          if (record.type === 'attributes') decorate(record.target);
          else record.addedNodes.forEach(function (node) {
            if (node.nodeType !== 1) return;
            if (node.tagName === 'A') decorate(node);
            if (node.querySelectorAll) node.querySelectorAll('a[href]').forEach(function (a) { decorate(a); });
          });
        });
      });
      observer.observe(doc.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['href'] });
    }
    win.addEventListener('pageshow', refresh);
    var api = Object.freeze({
      version: 1,
      snapshot: function () { return Object.assign({}, visit, { storageAvailable: persisted }); },
      urlFor: function (value, placement) { return bookingUrl(value, win.location.href, visit, placement || 'body'); }
    });
    win.CallTeamBookingAttribution = api;
    return api;
  }

  return {
    start: start, visitFrom: visitFrom, bookingUrl: bookingUrl, pageLabel: pageLabel,
    isBookingUrl: isBookingUrl, readVisit: readVisit, writeVisit: writeVisit,
    storageKey: STORAGE_KEY, visitTimeout: VISIT_TIMEOUT
  };
});
