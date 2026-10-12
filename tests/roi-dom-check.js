/* Run after npm run build. QA-only dependency: jsdom 26 via NODE_PATH. No network or browser is launched. */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { JSDOM } = require('jsdom');
const repo = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(repo, '_site/b2b-lead-generation-roi-calculator/index.html'), 'utf8');
const dom = new JSDOM(html, { url: 'https://www.callteam.ca/b2b-lead-generation-roi-calculator/', runScripts: 'outside-only' });
const { window } = dom;
const document = window.document;
const events = [];
const results = [];
let printed = 0;
let submissions = 0;
window.clarity = (...args) => events.push(args);
window.print = () => printed++;
window.matchMedia = () => ({ matches: true });
window.HTMLElement.prototype.scrollIntoView = function () {};
document.querySelector('.contact-form').addEventListener('submit', event => { submissions++; event.preventDefault(); });
const initialDoc = new JSDOM(html).window.document;
window.eval(fs.readFileSync(path.join(repo, 'src/assets/js/roi-model.js'), 'utf8'));
window.eval(fs.readFileSync(path.join(repo, 'src/assets/js/roi-calculator.js'), 'utf8'));
const output = key => document.querySelector('[data-roi-output="' + key + '"]').textContent;
const byId = name => document.getElementById('roi-' + name);
function setScenario(overrides) {
  const values = { ...window.CallTeamROI.DEFAULTS, ...overrides };
  for (const [name, value] of Object.entries(values)) byId(name).value = value;
  byId('closeRate').dispatchEvent(new window.Event('input', { bubbles: true }));
}
function check(name, fn) {
  fn(); results.push({ name, status: 'PASS' }); console.log('PASS: ' + name);
}
check('Initial example is correct in static HTML and after controller initialization', () => {
  assert.equal(initialDoc.querySelector('[data-roi-output="roi"]').textContent.trim(), '108.3%');
  assert.equal(output('roi'), '108.3%'); assert.equal(output('cost'), 'US$12,000'); assert.equal(output('contribution'), 'US$13,000');
  assert.equal(byId('closeRate').valueAsNumber, 10); assert.equal(output('breakEvenCustomers'), '1');
  assert.equal(byId('results').dataset.state, 'positive');
});
check('Higher close rate updates all outputs and three comparison rows', () => {
  setScenario({ closeRate: 20 });
  assert.equal(output('wins'), '4'); assert.equal(output('roi'), '316.7%');
  assert.equal(byId('scenarios').querySelectorAll('tbody tr').length, 3);
  assert.match(byId('result-cta-copy').textContent, /Let us show you how we can help you get there/);
});
check('Higher campaign price exposes loss rather than forcing a positive result', () => {
  setScenario({ monthlyCost: 10000 });
  assert.equal(output('cost'), 'US$30,000'); assert.equal(output('contribution'), '−US$5,000'); assert.equal(output('roi'), '-16.7%');
  assert.equal(byId('results').dataset.state, 'negative'); assert.match(byId('improvement').textContent, /What would need to improve/);
  assert.equal(byId('improvement').hidden, false);
});
check('Zero held meetings produces -100% with a useful unavailable-target message', () => {
  setScenario({ meetings: 0 }); assert.equal(output('wins'), '0'); assert.equal(output('roi'), '-100%');
  assert.match(byId('improvement').textContent, /needs meetings/);
});
check('Zero gross margin keeps revenue but removes finite customer break-even', () => {
  setScenario({ grossMargin: 0 }); assert.equal(output('revenue'), 'US$50,000'); assert.equal(output('grossProfit'), 'US$0');
  assert.equal(output('breakEvenCustomers'), 'No finite target'); assert.equal(output('roi'), '-100%');
});
check('Zero campaign cost does not render infinity or imply a valid percentage ROI', () => {
  setScenario({ monthlyCost: 0 }); assert.equal(output('roi'), 'Not applicable'); assert.equal(byId('results').dataset.state, 'zero-cost');
  assert.doesNotMatch(byId('results').textContent, /Infinity|NaN/);
});
check('Fractional expected customers are retained through displayed economics', () => {
  setScenario({ meetings: 3, closeRate: 25 }); assert.equal(output('wins'), '0.75'); assert.equal(output('revenue'), 'US$18,750');
  assert.equal(output('contribution'), '−US$2,625'); assert.equal(output('roi'), '-21.9%');
});
check('Exact break-even is neutral and uses the correct CTA', () => {
  setScenario({ customerRevenue: 12000 }); assert.equal(output('roi'), '0%'); assert.equal(output('contribution'), 'US$0');
  assert.equal(byId('results').dataset.state, 'break-even'); assert.match(byId('result-cta-copy').textContent, /covers the campaign cost/);
});
check('Longer campaign costs do not multiply a total meeting count', () => {
  setScenario({ months: 12 }); assert.equal(output('cost'), 'US$48,000'); assert.equal(output('wins'), '2'); assert.equal(output('roi'), '-47.9%');
});
check('Additional costs are included once', () => {
  setScenario({ extraCosts: 13000 }); assert.equal(output('cost'), 'US$25,000'); assert.equal(output('roi'), '0%');
});
check('Advanced costs and calculation details start collapsed, and hidden invalid costs are exposed', () => {
  const advanced = byId('extraCosts').closest('details');
  assert.ok(advanced); assert.equal(advanced.open, false);
  assert.equal(initialDoc.querySelector('.roi-method-details').open, false);
  setScenario({ extraCosts: -1 });
  assert.equal(advanced.open, true); assert.equal(byId('error').hidden, false);
  assert.equal(byId('extraCosts').getAttribute('aria-invalid'), 'true');
  setScenario({});
});
check('Infeasible close rate is explained instead of capped into a plausible target', () => {
  setScenario({ meetings: 1, monthlyCost: 5000 }); assert.match(byId('improvement').textContent, /required close rate exceeds 100%/);
});
check('Blank, out-of-range, fractional-month and injected text inputs clear stale results', () => {
  for (const [field, invalid] of [['meetings', ''], ['closeRate', '101'], ['months', '1.5'], ['customerRevenue', '<script>bad</script>']]) {
    setScenario({}); byId(field).value = invalid; byId(field).dispatchEvent(new window.Event('input'));
    assert.equal(output('roi'), '—'); assert.equal(byId(field).getAttribute('aria-invalid'), 'true');
    assert.equal(byId('error').hidden, false); assert.equal(byId('inquiry').disabled, true); assert.equal(byId('scenarios').children.length, 0);
  }
});
check('Reset recovers from invalid inputs and restores every default', () => {
  byId('reset').click(); assert.equal(output('roi'), '108.3%'); assert.equal(byId('error').hidden, true);
  for (const [key, value] of Object.entries(window.CallTeamROI.DEFAULTS)) assert.equal(byId(key).valueAsNumber, value);
});
check('Copy fallback exposes a selectable complete scenario without network', () => {
  byId('copy').click(); assert.equal(byId('copy-text').hidden, false); assert.match(byId('copy-text').value, /Total campaign cost: US\$12,000/);
});
check('Print calls the device print function once', () => { byId('print').click(); assert.equal(printed, 1); });
check('Inquiry handoff preserves typed text, updates its own summary and never submits', () => {
  const message = document.querySelector('textarea[name="message"]'); message.value = 'Please focus on Canadian manufacturing.';
  byId('inquiry').click(); byId('inquiry').click();
  assert.match(message.value, /^Please focus on Canadian manufacturing/);
  assert.equal(message.value.split('CallTeam outbound campaign scenario').length - 1, 1);
  setScenario({ closeRate: 20 }); byId('inquiry').click();
  assert.equal(message.value.split('CallTeam outbound campaign scenario').length - 1, 1);
  assert.match(message.value, /316.7%/); assert.equal(submissions, 0);
});
check('Clarity events contain only action names, and all financial UI sits inside a mask', () => {
  assert.ok(events.length > 0);
  events.forEach(args => { assert.equal(args.length, 2); assert.equal(args[0], 'event'); assert.match(args[1], /^roi_[a-z_]+$/); });
  document.querySelectorAll('[data-roi-output], #roi-scenarios, #roi-improvement, #roi-copy-text, #roi-calculator input').forEach(node => {
    assert.ok(node.closest('[data-clarity-mask="true"]'), 'Unmasked financial node ' + (node.id || node.dataset.roiOutput));
  });
});
check('Static page has one canonical, one H1, parseable schema and usable no-JS explanations', () => {
  assert.equal(initialDoc.querySelectorAll('h1').length, 1);
  assert.equal(initialDoc.querySelectorAll('link[rel="canonical"]').length, 1);
  assert.equal(initialDoc.querySelector('link[rel="canonical"]').href, 'https://www.callteam.ca/b2b-lead-generation-roi-calculator/');
  initialDoc.querySelectorAll('script[type="application/ld+json"]').forEach(node => JSON.parse(node.textContent));
  assert.ok(initialDoc.querySelector('noscript'));
  assert.equal(initialDoc.getElementById('roi-copy').disabled, true);
  assert.ok(initialDoc.querySelectorAll('details').length >= 8);
});
check('All calculator controls have labels and an accessible invalid-input alert', () => {
  for (const key of Object.keys(window.CallTeamROI.DEFAULTS)) assert.ok(byId(key).labels.length);
  assert.equal(byId('error').getAttribute('role'), 'alert');
  assert.equal(byId('status').getAttribute('aria-live'), 'polite');
});
check('Inherited contact form retains its production endpoint, required fields and honeypot', () => {
  const forms = document.querySelectorAll('form'); assert.equal(forms.length, 1);
  assert.equal(forms[0].action, 'https://formspree.io/f/xbdvejea');
  ['name', 'email', 'company', 'message'].forEach(name => assert.equal(forms[0].elements.namedItem(name).required, true));
  assert.equal(forms[0].elements.namedItem('_gotcha').value, '');
});
dom.window.close();
if (process.env.ROI_TEST_REPORT) fs.writeFileSync(process.env.ROI_TEST_REPORT, JSON.stringify({ kind: 'DOM integration, not visual browser tests', results }, null, 2));
console.log('ROI DOM integration: ' + results.length + ' checks passed. No external requests or form submissions.');
