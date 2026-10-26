'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const model = require('../src/assets/js/booking-attribution');
const code = fs.readFileSync(path.join(__dirname, '../src/assets/js/booking-attribution.js'), 'utf8');
const book = 'https://calendly.com/hello-callteam/new-meeting';
const root = 'https://www.callteam.ca';
const now = 1800000000000;
let checks = 0;
function test(name, fn) { fn(); checks++; console.log('PASS ' + checks + ': ' + name); }
function visit(href = root + '/pricing/', ref = '', previous = null, time = now) {
  return model.visitFrom(href, ref, previous, time);
}
function tagged(v = visit(), href = root + '/pricing/', placement = 'hero', original = book) {
  return new URL(model.bookingUrl(original, href, v, placement));
}

test('Only the exact existing HTTPS booking event is eligible', () => {
  assert(model.isBookingUrl(book, root)); assert(model.isBookingUrl(book + '/', root));
  ['http://calendly.com/hello-callteam/new-meeting', 'https://calendly.com.evil.test/hello-callteam/new-meeting',
    'https://evil.test/?next=' + book, 'https://calendly.com/another-team/meeting',
    'https://calendly.com/hello-callteam/another-event', 'javascript:alert(1)', '#contact', '/pricing/',
    'mailto:hello@callteam.ca', 'https://user:secret@calendly.com/hello-callteam/new-meeting'].forEach(u => {
      assert.equal(model.isBookingUrl(u, root), false, u);
      assert.equal(model.bookingUrl(u, root + '/pricing/', visit(), 'hero'), u);
    });
});
test('Unknown sources remain explicitly unknown', () => {
  assert.equal(visit().source, 'direct_or_unknown'); assert.equal(visit().medium, 'unknown');
});
test('Observed Google and Bing referrals are recognised', () => {
  assert.equal(visit(undefined, 'https://www.google.ca/search?q=test').source, 'google');
  assert.equal(visit(undefined, 'https://www.google.com/search?q=test').medium, 'organic');
  assert.equal(visit(undefined, 'https://www.bing.com/search?q=test').source, 'bing');
});
test('Brave and DuckDuckGo receive meaningful source names', () => {
  assert.equal(visit(undefined, 'https://search.brave.com/search?q=test').source, 'brave');
  assert.equal(visit(undefined, 'https://duckduckgo.com/?q=test').source, 'duckduckgo');
});
test('AI and other referring domains are recorded without inventing a search query', () => {
  const v = visit(undefined, 'https://chatgpt.com/c/private-conversation?secret=x');
  assert.equal(v.source, 'chatgpt.com'); assert.equal(v.medium, 'referral');
  assert(!JSON.stringify(v).includes('private-conversation')); assert(!JSON.stringify(v).includes('secret'));
});
test('Explicit campaign tags take priority over the referrer', () => {
  const v = visit(root + '/services/outsourced-sdr/?utm_source=substack&utm_medium=email&utm_campaign=october&utm_content=story-cta&utm_term=sdr', 'https://www.google.com/');
  assert.equal(v.source, 'substack'); assert.equal(v.medium, 'email'); assert.equal(v.campaign, 'october');
  assert.equal(v.content, 'story-cta'); assert.equal(v.term, 'sdr');
});
test('Entry page survives internal navigation to the booking page', () => {
  const first = visit(root + '/resources/cold-call-scripts/msp-cold-call-script-managed-it-services/', 'https://www.google.com/');
  const second = visit(root + '/pricing/', root + first.entryPath, first, now + 30000);
  assert.equal(second.entryPath, first.entryPath); assert.equal(second.source, 'google');
  const tag = tagged(second).searchParams.get('utm_content');
  assert(tag.includes('entry=script:msp-cold-call-script-managed-it-services'));
  assert(tag.includes('page=pricing')); assert(tag.includes('button=hero'));
});
test('WWW and bare CallTeam domains are the same internal site', () => {
  const first = visit(root + '/articles/example/', 'https://www.google.com/');
  const second = visit('https://callteam.ca/pricing/', root + '/articles/example/', first, now + 20000);
  assert.equal(second.source, 'google'); assert.equal(second.entryPath, first.entryPath);
});
test('A fresh external arrival starts a new visit', () => {
  const first = visit(root + '/articles/first/', 'https://www.google.com/');
  const second = visit(root + '/pricing/', 'https://www.bing.com/', first, now + 20000);
  assert.equal(second.source, 'bing'); assert.equal(second.entryPath, '/pricing/');
});
test('A changed campaign starts a new attributed visit', () => {
  const first = visit(root + '/articles/first/?utm_source=substack&utm_campaign=one');
  const second = visit(root + '/pricing/?utm_source=email&utm_campaign=two', root, first, now + 20000);
  assert.equal(second.source, 'email'); assert.equal(second.campaign, 'two'); assert.equal(second.entryPath, '/pricing/');
});
test('A visit expires after 30 minutes of inactivity', () => {
  const first = visit(root + '/articles/first/', 'https://www.google.com/');
  const second = visit(root + '/pricing/', root, first, now + model.visitTimeout + 1);
  assert.equal(second.source, 'direct_or_unknown'); assert.equal(second.entryPath, '/pricing/');
});
test('Returning from Calendly does not replace the original source', () => {
  const first = visit(root + '/articles/first/', 'https://www.google.com/');
  assert.equal(visit(root + '/pricing/', book, first, now + 20000).source, 'google');
});
test('Campaign identity survives navigation and link construction', () => {
  const first = visit(root + '/articles/example/?utm_source=substack&utm_medium=email&utm_campaign=weekly&utm_content=top-link&utm_term=outbound');
  const second = visit(root + '/pricing/', root + '/articles/example/', first, now + 10000);
  const q = tagged(second).searchParams;
  assert.equal(q.get('utm_source'), 'substack'); assert.equal(q.get('utm_medium'), 'email');
  assert.equal(q.get('utm_campaign'), 'weekly'); assert.equal(q.get('utm_term'), 'outbound');
  assert(q.get('utm_content').includes('campaign_content=top-link'));
});
test('Existing booking options, prefilled fields, fragment and event path survive', () => {
  const original = book + '?month=2027-01&hide_event_type_details=1&name=Example%20Person&a1=example&utm_source=partner&utm_campaign=existing&utm_content=partner-button#details';
  const result = tagged(visit(), undefined, 'footer', original);
  const before = new URL(original);
  assert.equal(result.origin, before.origin); assert.equal(result.pathname, before.pathname); assert.equal(result.hash, before.hash);
  ['month','hide_event_type_details','name','a1','utm_source','utm_campaign'].forEach(k => assert.equal(result.searchParams.get(k), before.searchParams.get(k)));
  assert(result.searchParams.get('utm_content').includes('campaign_content=partner-button'));
});
test('Long paths and campaign content stay within Calendly field limits', () => {
  const v = visit(root + '/' + 'very-long-'.repeat(40) + '/?utm_source=' + 's'.repeat(400) + '&utm_content=' + 'c'.repeat(400));
  const q = tagged(v, root + '/' + 'another-long-'.repeat(40) + '/', 'button-'.repeat(30)).searchParams;
  for (const [key, value] of q) if (key.startsWith('utm_')) assert(value.length <= 255, key + ': ' + value.length);
  assert.equal(model.pageLabel(v.entryPath), model.pageLabel(v.entryPath));
  assert.notEqual(model.pageLabel('/' + 'a'.repeat(200)), model.pageLabel('/' + 'a'.repeat(199) + 'b'));
});
test('Repeated decoration does not nest attribution or duplicate campaign fields', () => {
  const v = visit(root + '/?utm_content=original');
  const first = model.bookingUrl(book, root + '/pricing/', v, 'hero');
  const second = model.bookingUrl(first, root + '/pricing/', v, 'hero');
  assert.equal(second, first); assert.equal(new URL(second).searchParams.getAll('utm_content').length, 1);
});
test('Entry query strings and fragments are never stored as page identity', () => {
  const v = visit(root + '/pricing/?email=private@example.test&token=private#sensitive');
  assert.equal(v.entryPath, '/pricing/'); assert(!JSON.stringify(v).includes('private')); assert(!JSON.stringify(v).includes('sensitive'));
});
test('Malformed referrers, corrupt storage and unavailable storage fail open', () => {
  assert.equal(visit(undefined, 'not a URL').source, 'direct_or_unknown');
  assert.equal(model.readVisit({getItem(){return '{broken';}}), null);
  assert.equal(model.readVisit(null), null); assert.equal(model.writeVisit(null, visit()), false);
  assert.equal(model.writeVisit({setItem(){throw new Error('blocked');}}, visit()), false);
});
test('Invalid cached context is replaced', () => {
  assert.equal(visit(undefined, '', {version:1, entryPath:'bad', lastSeen:now}).entryPath, '/pricing/');
  assert.equal(visit(undefined, '', {version:1, entryPath:'/old/', lastSeen:now + 1000}).entryPath, '/pricing/');
});
test('Storage round trip preserves attributed context', () => {
  const values = new Map(); const storage = {getItem:k=>values.get(k), setItem:(k,v)=>values.set(k,v)};
  const v = visit(); assert(model.writeVisit(storage,v)); assert.deepEqual(model.readVisit(storage),v);
});

function browserHarness(blockStorage) {
  const listeners = {}; const existingClicks = [];
  const values = new Map();
  function anchor(href, region) {
    return {
      tagName:'A', href, region, attrs:{href},
      getAttribute(name){return this.attrs[name] || null;},
      setAttribute(name,value){this.attrs[name]=value;},
      closest(selector){
        if (selector === 'a[href]') return this;
        return selector.split(',').some(s=>s.trim()===this.region) ? this : null;
      }
    };
  }
  const anchors = [anchor(book,'.site-header'),anchor(book,'.hero'),anchor('/services/outsourced-sdr/',''),anchor('mailto:hello@callteam.ca',''),anchor(book,'footer')];
  const doc = {
    referrer:'https://www.google.com/', documentElement:{},
    querySelectorAll(){return anchors;},
    addEventListener(name,fn){(listeners[name] ||= []).push(fn);}
  };
  const win = {document:doc, location:{href:root + '/pricing/'}, URL, WeakMap, addEventListener(){}};
  Object.defineProperty(win,'sessionStorage',{get(){if(blockStorage)throw new Error('blocked');return {getItem:k=>values.get(k),setItem:(k,v)=>values.set(k,v)};}});
  return {win,doc,anchors,listeners,existingClicks};
}
test('Browser startup labels header, hero and footer and leaves other links alone', () => {
  const h = browserHarness(false); model.start(h.win);
  ['header','hero','footer'].forEach((p,i)=>assert(new URL(h.anchors[[0,1,4][i]].attrs.href).searchParams.get('utm_content').includes('button='+p)));
  assert.equal(h.anchors[2].attrs.href,'/services/outsourced-sdr/'); assert.equal(h.anchors[3].attrs.href,'mailto:hello@callteam.ca');
});
test('Clicks remain uncancelled, including modifier and middle click events', () => {
  const h = browserHarness(false); model.start(h.win);
  for (const type of ['click','auxclick','contextmenu','pointerdown','focusin']) {
    let cancelled=false;
    const event={target:h.anchors[1],ctrlKey:true,metaKey:true,button:1,preventDefault(){cancelled=true;},stopPropagation(){cancelled=true;}};
    h.listeners[type].forEach(fn=>fn(event));
    assert.equal(cancelled,false,type);
  }
});
test('Existing button references and attached page handlers survive', () => {
  const h = browserHarness(false); const original=h.anchors[1]; let oldHandlerRuns=0;
  const oldHandler=()=>oldHandlerRuns++;
  model.start(h.win); h.listeners.click.forEach(fn=>fn({target:original})); oldHandler();
  assert.equal(h.anchors[1],original); assert.equal(oldHandlerRuns,1);
});
test('Storage denied by the browser still produces a usable attributed booking link', () => {
  const h=browserHarness(true); const api=model.start(h.win);
  assert.equal(api.snapshot().storageAvailable,false); assert.equal(new URL(h.anchors[0].attrs.href).pathname,'/hello-callteam/new-meeting');
});
test('A dynamically changed event or unrelated destination is never rewritten', () => {
  const h=browserHarness(false); model.start(h.win);
  h.anchors[1].attrs.href='https://calendly.com/other/event';
  h.listeners.click.forEach(fn=>fn({target:h.anchors[1]}));
  assert.equal(h.anchors[1].attrs.href,'https://calendly.com/other/event');
});
test('A freshly updated supported booking link keeps its new scheduling options', () => {
  const h=browserHarness(false); model.start(h.win);
  h.anchors[1].attrs.href=book+'?month=2027-02';
  h.listeners.click.forEach(fn=>fn({target:h.anchors[1]}));
  assert.equal(new URL(h.anchors[1].attrs.href).searchParams.get('month'),'2027-02');
});
test('Repeated initialisation does not attach duplicate listeners', () => {
  const h=browserHarness(false); const first=model.start(h.win); const second=model.start(h.win);
  assert.equal(first,second); assert.equal(h.listeners.click.length,1);
});
test('The shipped browser wrapper starts successfully', () => {
  const h=browserHarness(false); vm.runInNewContext(code,{window:h.win, URL,WeakMap,Object,Math,Date});
  assert(h.win.CallTeamBookingAttribution); assert(new URL(h.anchors[0].attrs.href).searchParams.has('utm_content'));
});
test('Unsupported browser features leave original links usable', () => {
  const h=browserHarness(false); h.win.WeakMap=undefined;
  vm.runInNewContext(code,{window:h.win, URL,WeakMap,Object,Math,Date});
  assert.equal(h.anchors[0].attrs.href,book);
});
test('The tracker contains no blocking navigation, external requests or booking API calls', () => {
  assert(!/preventDefault\s*\(|stopPropagation\s*\(|fetch\s*\(|sendBeacon\s*\(|XMLHttpRequest|location\.(?:assign|replace)\s*\(|window\.open\s*\(/.test(code));
});
test('Existing tool scripts load before link attribution', () => {
  const layout=fs.readFileSync(path.join(__dirname,'../src/_includes/layouts/base.njk'),'utf8');
  assert(layout.indexOf('booking-attribution.js') > layout.indexOf('{% for script in pageScripts %}'));
  assert.equal((layout.match(/booking-attribution\.js/g)||[]).length,1);
});
console.log('Booking attribution: ' + checks + ' checks passed. Real Calendly booking storage requires a controlled completed-booking check.');
