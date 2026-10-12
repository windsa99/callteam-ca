'use strict';
const fs = require('node:fs');
const assert = require('node:assert/strict');
const { JSDOM } = require('jsdom');
const filename = process.argv[2];
assert(filename, 'Provide the packaged HTML preview.');
const html = fs.readFileSync(filename, 'utf8');
const dom = new JSDOM(html, { url: 'https://sandbox.invalid/', runScripts: 'outside-only' });
const { window } = dom;
const doc = window.document;
window.matchMedia = () => ({ matches: true });
window.HTMLElement.prototype.scrollIntoView = function () {};
window.print = () => {};
let requests = 0;
window.fetch = () => { requests++; throw new Error('No network requests expected.'); };
doc.querySelectorAll('script:not([type="application/ld+json"])').forEach(script => window.eval(script.textContent));
assert.equal(window.CALLTEAM_LOCAL_PREVIEW, true);
assert.equal(doc.querySelectorAll('script[src]').length, 0);
assert.equal(doc.querySelectorAll('link[rel="stylesheet"][href^="/"]').length, 0);
assert.equal(doc.querySelectorAll('img[src^="/"]').length, 0);
assert(!html.includes('clarity.ms'));
assert.equal(doc.querySelector('meta[name="robots"]').content, 'noindex, nofollow');
assert.equal(doc.querySelector('.contact-form').getAttribute('action'), '#contact');
assert.equal(doc.querySelector('.contact-form [type="submit"]').disabled, true);
const example = doc.getElementById('cp-example-disclosure');
assert.equal(example.tagName, 'DETAILS');
assert.equal(example.open, true);
assert.equal(example.querySelector('summary').textContent.trim().replace(/\.$/, ''), 'See another example');
assert.equal(doc.querySelector('.cp-proof-section .cp-eyebrow').textContent.trim().replace(/\.$/, ''), 'Real results from past CallTeam campaigns');
const cases = [
  { offer: 'saas', industry: 'technology', buyer: 'auto', region: 'canada', goal: 'demos', match: 'specific' },
  { offer: 'ot-security', industry: 'manufacturing', buyer: 'operations', region: 'us', goal: 'meetings', match: 'specific' },
  { offer: 'accounting', industry: 'services', buyer: 'finance', region: 'uk', goal: 'reactivate', match: 'specific' },
  { offer: 'healthcare-tech', industry: 'commerce', buyer: 'operations', region: 'north-america', goal: 'demos', match: 'broad' },
  { offer: 'other', industry: 'any', buyer: 'auto', region: 'other', goal: 'meetings', match: 'broad' }
];
const evidence = [];
for (const item of cases) {
  for (const field of ['offer', 'industry', 'buyer', 'region', 'goal']) {
    const control = doc.getElementById('cp-' + field); control.value = item[field];
    control.dispatchEvent(new window.Event('change', { bubbles: true }));
  }
  doc.getElementById('cp-build').click();
  assert.equal(doc.getElementById('cp-error').hidden, true);
  assert.equal(doc.getElementById('cp-results').hidden, false);
  assert.equal(doc.getElementById('cp-results').dataset.match, item.match);
  assert(doc.getElementById('cp-result-content').textContent.length > 1000);
  assert.equal(example.open, false, 'Every successful packaged preview must collapse the fixed example');
  assert.equal(doc.querySelector('#cp-results .cp-eyebrow').textContent.trim().replace(/\.$/, ''), 'Your preview — based on your answers');
  assert([...doc.querySelectorAll('#cp-result-content h3')].some(node => node.textContent.trim().replace(/\.$/, '') === 'Resources matched to your answers'));
  for (const link of doc.querySelectorAll('#cp-result-content a')) assert(link.href.startsWith('https://www.callteam.ca/'));
  example.querySelector('summary').click();
  assert.equal(example.open, true, 'The packaged example must remain available on demand');
  evidence.push({ offer: item.offer, industry: item.industry, goal: item.goal, match: item.match, title: doc.getElementById('cp-result-title').textContent, status: 'passed' });
}
doc.getElementById('cp-build').click();
assert.equal(example.open, false);
doc.getElementById('cp-reset').click();
assert.equal(example.open, true);
assert.equal(doc.getElementById('cp-results').hidden, true);
const submitEvent = new window.Event('submit', { bubbles: true, cancelable: true });
doc.querySelector('.contact-form').dispatchEvent(submitEvent);
assert.equal(submitEvent.defaultPrevented, true);
assert.equal(requests, 0);
dom.window.close();
console.log(JSON.stringify({ status: 'passed', packagedScenarios: evidence, exampleDisclosureVerified: true, personalizedAndStaticLabelsVerified: true, scriptsAndStylesEmbedded: true, analyticsRemoved: true, submissionsDisabled: true, qualification: 'Executable DOM verification, not visual browser testing' }, null, 2));
