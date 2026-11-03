(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root && root.document) api.bind(root);
}(typeof window !== 'undefined' ? window : null, function () {
  'use strict';
  var storageKey = 'ct_award_journey_v1';
  var timeout = 30 * 60 * 1000;
  var routes = {
    '/articles/international-elite-100-award-2026/': 'ie100',
    '/articles/global-100-award-2027/': 'global100',
    '/awards/global-excellence-2027/': 'globalexcellence',
    '/awards/corporate-livewire-global-awards-2026-27/': 'corporatelivewire'
  };
  var keys = ['ie100', 'global100', 'globalexcellence', 'corporatelivewire'];
  var home = 'https://www.callteam.ca';
  function pathOf(value) {
    try { return new URL(value, home).pathname.slice(0, 250); } catch (_) { return '/'; }
  }
  function read(raw, now) {
    try {
      var state = JSON.parse(raw);
      if (!state || keys.indexOf(state.award) < 0 || !Number.isFinite(state.time) || state.time > now || now - state.time > timeout) return null;
      return { award: state.award, origin: pathOf(state.origin), placement: String(state.placement || 'direct').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 80), time: state.time };
    } catch (_) { return null; }
  }
  function begin(award, origin, placement, now) {
    if (keys.indexOf(award) < 0) return null;
    return read(JSON.stringify({ award: award, origin: origin, placement: placement, time: now }), now);
  }
  function action(href, current, state) {
    var u;
    try { u = new URL(href, current); } catch (_) { return null; }
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return null;
    if (u.protocol === 'https:' && u.hostname === 'calendly.com' && u.pathname.replace(/\/$/, '') === '/hello-callteam/new-meeting') return state ? { event: 'ct_award_booking_click', award: state.award } : null;
    var here = new URL(current);
    var internal = u.origin === here.origin || ['callteam.ca', 'www.callteam.ca'].indexOf(u.hostname) >= 0;
    if (!internal) return null;
    if (routes[u.pathname] && u.pathname !== here.pathname) return { event: 'ct_award_badge_click', award: routes[u.pathname] };
    if (!state || u.pathname === here.pathname) return null;
    if (u.pathname.indexOf('/case-studies/') === 0) return { event: 'ct_award_proof_click', award: state.award };
    if (u.pathname.indexOf('/services/') === 0 || ['/human-led-appointment-setting/', '/ai-lead-generation-services/', '/b2b-lead-generation-canada/', '/pricing/'].indexOf(u.pathname) >= 0) return { event: 'ct_award_service_click', award: state.award };
    if (['/b2b-outbound-campaign-planner/', '/b2b-lead-generation-roi-calculator/', '/b2b-meeting-quality-check/', '/lead-generation-proposal-comparison/'].indexOf(u.pathname) >= 0) return { event: 'ct_award_tool_click', award: state.award };
    return null;
  }
  function bind(win) {
    var doc = win.document;
    if (doc.documentElement.getAttribute('data-award-engagement') === 'ready') return;
    function get() { try { return read(win.sessionStorage.getItem(storageKey), Date.now()); } catch (_) { return null; } }
    function put(state) { try { win.sessionStorage.setItem(storageKey, JSON.stringify(state)); } catch (_) {} }
    function emit(event, state) {
      doc.documentElement.setAttribute('data-award-last-event', event);
      if (typeof win.clarity !== 'function') return;
      win.clarity('set', 'ct_award', state.award);
      win.clarity('set', 'ct_award_placement', state.placement);
      win.clarity('set', 'ct_award_origin', state.origin);
      win.clarity('event', event);
    }
    var route = pathOf(win.location.href);
    var current = get();
    if (routes[route]) {
      if (!current || current.award !== routes[route]) current = begin(routes[route], route, 'direct', Date.now());
      put(current); emit('ct_award_announcement_view', current);
    }
    doc.addEventListener('click', function (event) {
      var a = event.target && event.target.closest ? event.target.closest('a[href]') : null;
      if (!a) return;
      var state = get();
      var next = action(a.href, win.location.href, state);
      if (!next) return;
      if (next.event === 'ct_award_badge_click') {
        var placement = a.getAttribute('data-award-placement') || (a.closest('footer') ? 'footer' : 'context');
        state = begin(next.award, win.location.href, placement, Date.now());
        put(state);
      }
      emit(next.event, state);
    });
    doc.documentElement.setAttribute('data-award-engagement', 'ready');
  }
  return { storageKey: storageKey, timeout: timeout, read: read, begin: begin, action: action, bind: bind };
}));
