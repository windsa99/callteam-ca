/* Run after npm run build. QA-only jsdom via NODE_PATH; no browser or external requests. */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { JSDOM } = require('jsdom');

const repo = path.resolve(__dirname, '..');
const pageUrl = 'https://www.callteam.ca/b2b-outbound-campaign-planner/';
const html = fs.readFileSync(path.join(repo, '_site/b2b-outbound-campaign-planner/index.html'), 'utf8');
const staticDom = new JSDOM(html, { url: pageUrl });
const initial = staticDom.window.document;
const dom = new JSDOM(html, { url: pageUrl, runScripts: 'outside-only' });
const { window } = dom;
const document = window.document;
const byId = name => document.getElementById('cp-' + name);
const fields = ['offer', 'industry', 'buyer', 'region', 'goal'];
const defaults = { offer: '', industry: 'any', buyer: 'auto', region: 'north-america', goal: 'meetings' };
const results = [];
const events = [];
const requests = [];
let printed = 0;
let submissions = 0;
window.clarity = (...args) => events.push(args);
window.print = () => printed++;
window.matchMedia = () => ({ matches: true });
window.HTMLElement.prototype.scrollIntoView = function () {};
window.fetch = (...args) => { requests.push(args); throw new Error('Unexpected network request from planner'); };
window.XMLHttpRequest = function () { requests.push('XMLHttpRequest'); throw new Error('Unexpected network request from planner'); };
document.addEventListener('submit', event => { submissions++; event.preventDefault(); });
// Prevent jsdom attempting navigation; a booking click must only follow its normal external link.
document.addEventListener('click', event => {
  if (event.target.closest('a[href]')) event.preventDefault();
});
for (const file of ['campaign-data.js', 'campaign-model.js', 'campaign-preview.js']) {
  window.eval(fs.readFileSync(path.join(repo, '_site/assets/js', file), 'utf8'));
}

function choices(field) { return [...byId(field).options].map(option => option.value).filter(Boolean); }
const offers = choices('offer');
function setAnswers(overrides = {}) {
  for (const [field, value] of Object.entries({ ...defaults, offer: offers[0], ...overrides })) {
    byId(field).value = value;
    byId(field).dispatchEvent(new window.Event('change', { bubbles: true }));
  }
}
function build(overrides = {}) { setAnswers(overrides); byId('build').click(); }
function assertPreview() {
  assert.equal(byId('results').hidden, false);
  assert.equal(byId('error').hidden, true);
  assert.ok(byId('result-title').textContent.trim());
  assert.ok(byId('result-content').textContent.trim().length > 200, 'Preview must contain a substantive plan');
  assert.doesNotMatch(byId('result-content').textContent, /\b(?:undefined|NaN)\b/);
  for (const action of ['copy', 'print', 'inquiry']) assert.equal(byId(action).disabled, false);
}
function assertUnavailable() {
  assert.equal(byId('results').hidden, true);
  for (const action of ['copy', 'print', 'inquiry']) assert.equal(byId(action).disabled, true);
}
function tick() { return new Promise(resolve => setImmediate(resolve)); }
function setClipboard(value) { Object.defineProperty(window.navigator, 'clipboard', { configurable: true, value }); }
function label(node) { return node.textContent.trim().replace(/\.$/, ''); }
async function check(name, fn) {
  await fn();
  results.push({ name, status: 'PASS' });
  console.log('PASS: ' + name);
}

async function main() {
  await check('Initial state uses the agreed five selections and keeps result actions unavailable', () => {
    assert.equal(offers.length, 13, 'Expected twelve supported offers plus a general fallback');
    assert.equal(window.CallTeamCampaignData.routes.length, 12);
    for (const field of fields) assert.equal(byId(field).value, defaults[field]);
    assertUnavailable();
  });

  await check('The fixed example starts open in a native disclosure with a clear optional-example label', () => {
    const disclosure = byId('example-disclosure');
    assert.ok(disclosure);
    assert.equal(disclosure.tagName, 'DETAILS');
    assert.equal(disclosure.open, true);
    assert.equal(label(disclosure.querySelector('summary')), 'See another example');
    assert.ok(disclosure.querySelector('.cp-example-call blockquote').textContent.length > 80);
  });

  await check('Missing required offer produces an accessible validation message without a preview', () => {
    byId('build').click();
    assertUnavailable();
    assert.equal(byId('error').hidden, false);
    assert.ok(byId('error').textContent.trim());
    assert.equal(byId('offer').getAttribute('aria-invalid'), 'true');
    assert.equal(byId('example-disclosure').open, true, 'Failed validation must not conceal the available example');
  });

  await check('Building a preview closes the fixed example and labels the personal result and matched resources distinctly', () => {
    build(); assertPreview();
    assert.equal(byId('example-disclosure').open, false);
    assert.equal(label(byId('results').querySelector('.cp-eyebrow')), 'Your preview — based on your answers');
    const resourceHeading = [...byId('result-content').querySelectorAll('h3')].find(node => label(node) === 'Resources matched to your answers');
    assert.ok(resourceHeading, 'Matched resources must have the agreed label');
    assert.equal(label(document.querySelector('.cp-proof-section .cp-eyebrow')), 'Real results from past CallTeam campaigns');
    assert.doesNotMatch(byId('results').textContent, /Your campaign starting point|Your selected CallTeam resources/);
  });

  await check('Visitors can reopen the example, rebuild closes it again and selection changes do not force it open', () => {
    const disclosure = byId('example-disclosure');
    disclosure.querySelector('summary').click();
    assert.equal(disclosure.open, true, 'Native summary must reopen the example');
    byId('build').click(); assertPreview();
    assert.equal(disclosure.open, false, 'A rebuilt preview should reclaim focus from the static example');
    byId('goal').value = 'reactivate';
    byId('goal').dispatchEvent(new window.Event('change', { bubbles: true }));
    assertUnavailable();
    assert.equal(disclosure.open, false, 'Editing an answer must not reopen the fixed example');
    disclosure.querySelector('summary').click();
    assert.equal(disclosure.open, true);
    byId('industry').value = 'technology';
    byId('industry').dispatchEvent(new window.Event('change', { bubbles: true }));
    assert.equal(disclosure.open, true, 'Editing an answer should respect an intentionally open example');
  });

  await check('The explicit example link reopens its content and reset restores the initial open-example state', () => {
    build(); assert.equal(byId('example-disclosure').open, false);
    const link = document.querySelector('a[href="#cp-example"]');
    assert.ok(link); link.click();
    assert.equal(byId('example-disclosure').open, true);
    byId('build').click(); assert.equal(byId('example-disclosure').open, false);
    byId('reset').click();
    assert.equal(byId('example-disclosure').open, true); assertUnavailable();
  });

  await check('Every supported offer creates a distinct substantive preview from default remaining answers', () => {
    const previews = new Set();
    for (const offer of offers) {
      build({ offer }); assertPreview();
      previews.add(byId('result-content').textContent);
      assert.ok(byId('result-content').querySelectorAll('a[href]').length >= 2, 'Preview needs traceable resources');
    }
    assert.equal(previews.size, offers.length);
  });

  await check('Every offered industry, buyer, region and goal selection can be evaluated safely', () => {
    for (const field of fields.slice(1)) {
      for (const value of choices(field)) {
        build({ [field]: value }); assertPreview();
      }
    }
  });

  await check('All twelve routes and the general fallback work with all four campaign goals', () => {
    let count = 0;
    for (const offer of offers) for (const goal of choices('goal')) {
      build({ offer, goal }); assertPreview(); count++;
    }
    assert.equal(count, 52);
  });

  await check('Unsupported industry and buyer combinations show a broad plan without unrelated case-study proof', () => {
    for (const answers of [
      { offer: 'ot-security', industry: 'healthcare' },
      { offer: 'hr-tech', buyer: 'security' },
      { offer: 'payments', industry: 'manufacturing', buyer: 'people' },
      { offer: 'other', industry: 'other' }
    ]) {
      build(answers); assertPreview(); assert.equal(byId('results').dataset.match, 'broad');
      assert.equal(byId('result-content').querySelectorAll('a[href*="/case-studies/"]').length, 0);
      const model = window.CallTeamCampaign.buildPreview(window.CallTeamCampaignData, { ...defaults, offer: offers[0], ...answers });
      assert.ok(model.matchNote.length > 40);
      assert.ok(byId('result-content').textContent.includes(model.matchNote));
    }
  });

  await check('Matched SaaS and manufacturing cybersecurity cases are traceable and retain their context', () => {
    for (const answers of [{ offer: 'saas' }, { offer: 'ot-security', industry: 'manufacturing' }]) {
      build(answers); assertPreview(); assert.equal(byId('results').dataset.match, 'specific');
      const model = window.CallTeamCampaign.buildPreview(window.CallTeamCampaignData, { ...defaults, offer: offers[0], ...answers });
      assert.ok(model.caseStudy);
      assert.ok(byId('result-content').querySelector('a[href="' + model.caseStudy.url + '"]'));
      assert.ok(byId('result-content').textContent.includes(model.caseStudy.relationship));
    }
  });

  await check('Changing from a matched offer to a broad plan removes previous proof and its specific opening', () => {
    build({ offer: 'saas' });
    const priorOpening = byId('result-content').querySelector('blockquote').textContent;
    assert.ok(byId('result-content').querySelector('a[href*="/case-studies/"]'));
    build({ offer: 'ot-security', industry: 'commerce', buyer: 'people' }); assertPreview();
    assert.equal(byId('results').dataset.match, 'broad');
    assert.equal(byId('result-content').querySelector('a[href*="/case-studies/"]'), null);
    assert.notEqual(byId('result-content').querySelector('blockquote').textContent, priorOpening);
  });

  await check('Reactivation changes the opening, while a service-demo request uses an appropriate working session', () => {
    build({ offer: 'cybersecurity' });
    const originalOpening = byId('result-content').querySelector('blockquote').textContent;
    build({ offer: 'cybersecurity', goal: 'reactivate' });
    const reactivationOpening = byId('result-content').querySelector('blockquote').textContent;
    assert.notEqual(reactivationOpening, originalOpening);
    assert.match(reactivationOpening, /earlier enquiry/i);
    byId('reset').click(); build({ offer: 'cybersecurity' });
    assert.equal(byId('result-content').querySelector('blockquote').textContent, originalOpening);
    build({ offer: 'cybersecurity', goal: 'demos' }); assertPreview();
    assert.match(byId('result-content').textContent, /Agree a focused working session/);
  });

  await check('Every selection invalidates stale results until the visitor rebuilds', () => {
    for (const field of fields) {
      build();
      const alternative = choices(field).find(value => value !== byId(field).value);
      assert.ok(alternative, 'No alternative for ' + field);
      byId(field).value = alternative;
      byId(field).dispatchEvent(new window.Event('change', { bubbles: true }));
      assertUnavailable();
      byId('build').click(); assertPreview();
    }
  });

  await check('Empty or tampered selections cannot bypass supported-answer validation', () => {
    for (const field of fields) {
      for (const value of ['', 'not-a-supported-campaign-option']) {
        build();
        const option = document.createElement('option'); option.value = value; option.textContent = value;
        byId(field).append(option); byId(field).value = value;
        byId(field).dispatchEvent(new window.Event('change', { bubbles: true }));
        byId('build').click();
        assertUnavailable(); assert.equal(byId('error').hidden, false);
        option.remove();
      }
    }
  });

  await check('Reset restores all defaults, clears errors and removes stale preview and copy output', () => {
    build(); byId('reset').click();
    for (const field of fields) assert.equal(byId(field).value, defaults[field]);
    assertUnavailable(); assert.equal(byId('error').hidden, true);
    assert.equal(byId('copy-text').hidden, true);
    for (const field of fields) assert.notEqual(byId(field).getAttribute('aria-invalid'), 'true');
  });

  await check('Clipboard success exports the current complete preview with usable resource URLs', async () => {
    build(); let copied = '';
    setClipboard({ writeText: async value => { copied = value; } });
    byId('copy').click(); await tick();
    assert.ok(copied.length > 500);
    assert.match(copied, /https:\/\/www\.callteam\.ca\//);
    for (const field of fields) {
      const label = byId(field).selectedOptions[0].textContent.trim();
      assert.ok(copied.includes(label), 'Copy omits selection: ' + field);
    }
    assert.ok(byId('status').textContent.trim());
  });

  await check('Clipboard failure and unavailable clipboard both provide a selectable complete fallback', async () => {
    for (const clipboard of [undefined, { writeText: async () => { throw new Error('Clipboard denied'); } }]) {
      build(); setClipboard(clipboard); byId('copy').click(); await tick();
      assert.equal(byId('copy-text').hidden, false);
      assert.ok(byId('copy-text').readOnly);
      assert.ok(byId('copy-text').value.length > 500);
      assert.match(byId('copy-text').value, /https:\/\/www\.callteam\.ca\//);
    }
  });

  await check('A delayed clipboard rejection cannot restore a preview after answers change', async () => {
    build(); let rejectCopy;
    setClipboard({ writeText: () => new Promise((resolve, reject) => { rejectCopy = reject; }) });
    byId('copy').click();
    byId('offer').value = offers[1]; byId('offer').dispatchEvent(new window.Event('change', { bubbles: true }));
    rejectCopy(new Error('Delayed denial')); await tick();
    assertUnavailable(); assert.equal(byId('copy-text').hidden, true); assert.equal(byId('copy-text').value, '');
    build(); setClipboard(undefined); byId('copy').click(); await tick();
  });

  await check('Changing answers conceals an old copied preview and disabled buttons cannot export it', () => {
    byId('goal').value = choices('goal').find(value => value !== byId('goal').value);
    byId('goal').dispatchEvent(new window.Event('change', { bubbles: true }));
    assertUnavailable(); assert.equal(byId('copy-text').hidden, true);
    byId('copy').click(); byId('print').click(); byId('inquiry').click();
    assert.equal(printed, 0); assert.equal(submissions, 0);
  });

  await check('Print sends one current preview to the device print function', () => {
    build(); byId('print').click(); assert.equal(printed, 1);
  });

  await check('Inquiry handoff preserves personal text, avoids duplicates, replaces its old plan and never submits', () => {
    const message = document.querySelector('textarea[name="message"]');
    const personal = 'Please call me after 10 AM. Keep our existing CRM workflow.';
    const after = 'We also have a new question about implementation.';
    message.value = personal;
    build({ offer: offers[0] }); byId('inquiry').click();
    const first = message.value;
    assert.ok(first.startsWith(personal)); assert.ok(first.length > personal.length + 500);
    byId('inquiry').click(); assert.equal(message.value, first);
    message.value += '\n\n' + after;
    build({ offer: offers[1] }); byId('inquiry').click();
    assert.ok(message.value.startsWith(personal)); assert.ok(message.value.includes(after));
    assert.notEqual(message.value, first + '\n\n' + after);
    const updated = message.value; byId('inquiry').click(); assert.equal(message.value, updated);
    assert.equal(submissions, 0);
  });

  await check('Changing an answer removes an untouched prepared inquiry while preserving personal text', () => {
    const message = document.querySelector('textarea[name="message"]');
    const personal = 'Keep this personal question about our launch.';
    build(); message.value = personal; byId('inquiry').click();
    assert.ok(message.value.includes('CALLTEAM CAMPAIGN PREVIEW'));
    byId('goal').value = 'reactivate'; byId('goal').dispatchEvent(new window.Event('change', { bubbles: true }));
    assert.equal(message.value, personal); assertUnavailable();
    assert.equal(submissions, 0);
  });

  await check('Reset removes an untouched prepared inquiry and leaves the visitor’s own message intact', () => {
    const message = document.querySelector('textarea[name="message"]');
    const personal = 'Please keep my implementation question after reset.';
    build(); message.value = personal; byId('inquiry').click(); byId('reset').click();
    assert.equal(message.value, personal); assertUnavailable();
    assert.equal(submissions, 0);
  });

  await check('An edited inquiry survives selection changes and reset with a visible warning about its earlier preview', () => {
    const message = document.querySelector('textarea[name="message"]');
    build(); message.value = 'My original personal notes.'; byId('inquiry').click();
    const edited = message.value.replace('I would like to discuss this campaign with CallTeam.', 'I want to discuss my edited version of this campaign.');
    assert.notEqual(edited, message.value); message.value = edited;
    message.dispatchEvent(new window.Event('input', { bubbles: true }));
    byId('industry').value = 'technology'; byId('industry').dispatchEvent(new window.Event('change', { bubbles: true }));
    assert.equal(message.value, edited);
    const notice = byId('contact-notice');
    assert.ok(notice); assert.equal(notice.hidden, false); assert.equal(notice.getAttribute('role'), 'status');
    assert.match(notice.textContent, /earlier campaign preview/i);
    byId('reset').click(); assert.equal(message.value, edited); assert.equal(notice.hidden, false);
    assertUnavailable(); assert.equal(submissions, 0);
  });

  await check('Booking remains a normal Calendly link and clicking does not submit a form or make API requests', () => {
    const booking = byId('booking');
    assert.equal(booking.href, 'https://calendly.com/hello-callteam/new-meeting');
    if (booking.target === '_blank') assert.ok(booking.rel.split(/\s+/).includes('noopener'));
    booking.click(); assert.equal(submissions, 0); assert.equal(requests.length, 0);
  });

  await check('Personalized text is rendered literally and unsafe resource URLs do not create links', () => {
    const original = window.CallTeamCampaign.buildPreview;
    const payload = '<img src=x onerror="window.__campaignXss=true"><script>window.__campaignXss=true</script>';
    window.CallTeamCampaign.buildPreview = (data, answers) => {
      const result = JSON.parse(JSON.stringify(original(data, answers)));
      result.title = payload; result.summary = payload; result.opening = payload;
      result.resources[0].title = payload; result.resources[0].url = 'javascript:window.__campaignXss=true';
      return result;
    };
    try {
      build(); assertPreview();
      assert.equal(byId('result-title').textContent, payload);
      assert.ok(byId('result-content').textContent.includes(payload));
      assert.equal(byId('results').querySelectorAll('img, script, [onerror]').length, 0);
      assert.equal(byId('results').querySelectorAll('a[href^="javascript:"]').length, 0);
      assert.equal(window.__campaignXss, undefined);
    } finally { window.CallTeamCampaign.buildPreview = original; build(); }
  });

  await check('A model failure is shown as text and cannot leave a stale usable result', () => {
    const original = window.CallTeamCampaign.buildPreview;
    const payload = '<img src=x onerror="window.__campaignErrorXss=true">';
    window.CallTeamCampaign.buildPreview = () => { throw new Error(payload); };
    try {
      byId('build').click(); assertUnavailable();
      assert.equal(byId('error').hidden, false); assert.equal(byId('error').textContent, payload);
      assert.equal(byId('error').children.length, 0); assert.equal(window.__campaignErrorXss, undefined);
    } finally { window.CallTeamCampaign.buildPreview = original; build(); }
  });

  await check('Analytics use action names only and all visitor selections and personalized output are masked', () => {
    assert.ok(events.length > 0, 'Expected coarse action events');
    for (const args of events) {
      assert.equal(args.length, 2); assert.equal(args[0], 'event');
      assert.match(args[1], /^(?:cp|campaign)_[a-z_]+$/);
    }
    for (const node of [...fields.map(byId), byId('results'), byId('copy-text')]) {
      assert.ok(node.closest('[data-clarity-mask="true"]'), 'Unmasked node ' + node.id);
    }
  });

  await check('All controls have native labels and accessible error, status and result names', () => {
    for (const field of fields) {
      assert.equal(byId(field).tagName, 'SELECT');
      assert.ok(byId(field).labels.length, 'Missing label for ' + field);
    }
    assert.equal(byId('error').getAttribute('role'), 'alert');
    assert.equal(byId('status').getAttribute('aria-live'), 'polite');
    assert.equal(byId('results').getAttribute('aria-labelledby'), 'cp-result-title');
  });

  await check('Static HTML has one topical title, H1, canonical, indexable metadata and valid JSON-LD', () => {
    assert.match(initial.title, /(?:outbound|campaign).*?(?:planner|preview)/i);
    assert.equal(initial.querySelectorAll('h1').length, 1);
    assert.equal(initial.querySelectorAll('link[rel="canonical"]').length, 1);
    assert.equal(initial.querySelector('link[rel="canonical"]').href, pageUrl);
    assert.ok(initial.querySelector('meta[name="description"]').content.length > 60);
    assert.doesNotMatch(initial.querySelector('meta[name="robots"]').content, /noindex/);
    const schemas = [...initial.querySelectorAll('script[type="application/ld+json"]')];
    assert.ok(schemas.length);
    schemas.forEach(node => JSON.parse(node.textContent));
    assert.ok(initial.querySelector('noscript'));
    for (const action of ['copy', 'print', 'inquiry']) assert.equal(initial.getElementById('cp-' + action).disabled, true);
  });

  await check('A usable example and contact path exist before JavaScript, with no inactive build action presented as working', () => {
    const example = initial.getElementById('cp-example');
    assert.ok(example); assert.equal(example.hidden, false);
    assert.ok(example.querySelector('#cp-example-title').textContent.trim());
    assert.ok(example.querySelector('.cp-example-call blockquote').textContent.trim().length > 80);
    assert.ok(example.textContent.trim().length > 500);
    const disclosure = initial.getElementById('cp-example-disclosure');
    assert.equal(disclosure.tagName, 'DETAILS');
    assert.equal(disclosure.open, true, 'The server-rendered example must be usable without JavaScript');
    assert.equal(label(disclosure.querySelector('summary')), 'See another example');
    assert.ok(disclosure.contains(example.querySelector('.cp-example-call blockquote')));
    assert.equal(label(initial.querySelector('.cp-proof-section .cp-eyebrow')), 'Real results from past CallTeam campaigns');
    assert.ok(initial.querySelector('a[href="https://calendly.com/hello-callteam/new-meeting"]'));
    for (const action of ['build', 'reset']) assert.equal(initial.getElementById('cp-' + action).disabled, true);
  });

  await check('The generated page loads only the three planner scripts in dependency order and exposes each asset', () => {
    const scripts = [...initial.querySelectorAll('script[src]')].map(node => new URL(node.src, pageUrl).pathname);
    const planner = scripts.filter(url => /\/campaign-(?:data|model|preview)\.js$/.test(url));
    assert.deepEqual(planner, ['/assets/js/campaign-data.js', '/assets/js/campaign-model.js', '/assets/js/campaign-preview.js']);
    for (const url of planner.filter(url => !url.endsWith('/campaign-data.js'))) {
      assert.equal(fs.readFileSync(path.join(repo, '_site', url), 'utf8'), fs.readFileSync(path.join(repo, 'src', url), 'utf8'));
    }
    assert.ok(fs.statSync(path.join(repo, '_site/assets/js/campaign-data.js')).size > 1000);
    for (const oldPage of ['index.html', 'pricing/index.html', 'b2b-lead-generation-roi-calculator/index.html']) {
      assert.doesNotMatch(fs.readFileSync(path.join(repo, '_site', oldPage), 'utf8'), /<script[^>]+src="[^\"]*campaign-(?:data|model|preview)\.js/);
    }
  });

  await check('The planner inherits exactly one protected contact form with production requirements intact', () => {
    const forms = document.querySelectorAll('form'); assert.equal(forms.length, 1);
    assert.equal(forms[0].action, 'https://formspree.io/f/xbdvejea');
    assert.equal(forms[0].method.toLowerCase(), 'post');
    for (const name of ['name', 'email', 'company', 'message']) assert.equal(forms[0].elements.namedItem(name).required, true);
    assert.equal(forms[0].elements.namedItem('email').type, 'email');
    assert.equal(forms[0].elements.namedItem('_gotcha').value, '');
    assert.equal(submissions, 0); assert.equal(requests.length, 0);
  });
}

main().then(() => {
  dom.window.close(); staticDom.window.close();
  if (process.env.CAMPAIGN_TEST_REPORT) fs.writeFileSync(process.env.CAMPAIGN_TEST_REPORT, JSON.stringify({ kind: 'DOM integration, not visual browser tests', results }, null, 2));
  console.log('Campaign DOM integration: ' + results.length + ' checks passed. No external requests or form submissions.');
}).catch(error => {
  dom.window.close(); staticDom.window.close(); console.error(error); process.exitCode = 1;
});
