'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const baseline = process.argv[2];
if (!baseline) throw new Error('Usage: node scripts/verify-roi-release.js /absolute/path/to/pre-change-site');
const built = path.resolve(__dirname, '../_site');
const route = '/b2b-lead-generation-roi-calculator/';
const additions = new Set([
  'b2b-lead-generation-roi-calculator/index.html',
  'assets/css/roi-calculator.css',
  'assets/js/roi-model.js',
  'assets/js/roi-calculator.js'
]);
const contextual = new Set(['pricing/index.html', 'resources/outbound-sales-library/index.html', 'services/b2b-appointment-setting/index.html', 'services/outsourced-sdr/index.html', 'services/lead-reactivation/index.html']);
const articleAdditions = {
  'articles/b2b-appointment-setting-cost/index.html': '<p>Use the <a href="/b2b-lead-generation-roi-calculator/">B2B lead generation ROI calculator</a> to connect your campaign costs and conversion assumptions to customer economics and break-even.</p>',
  'articles/cold-calling-metrics-campaign-quality/index.html': '<p>Test the financial effect of those assumptions with the <a href="/b2b-lead-generation-roi-calculator/">B2B lead generation ROI calculator</a>, keeping your campaign period and customer economics consistent.</p>'
};
function files(dir, prefix = '') {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? files(path.join(dir, entry.name), prefix + entry.name + '/') : [prefix + entry.name]);
}
const oldFiles = files(baseline);
const newFiles = files(built);
assert.deepEqual(newFiles.filter(file => !oldFiles.includes(file)).sort(), [...additions].sort(), 'Unexpected new generated files');
function normalize(value) { return value.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim(); }
let checkedPages = 0;
for (const file of oldFiles) {
  const before = fs.readFileSync(path.join(baseline, file));
  let after = fs.readFileSync(path.join(built, file));
  if (file.endsWith('.html')) {
    after = after.toString();
    const marks = after.match(/<!-- ROI calculator link -->/g) || [];
    assert.equal(marks.length, contextual.has(file) ? 2 : 1, 'Unexpected additive blocks in ' + file);
    after = after.replace(/<!-- ROI calculator link -->[\s\S]*?<!-- \/ROI calculator link -->/g, '');
    let headerLinks = 0;
    after = after.replace(/<header\b[\s\S]*?<\/header>/, header => header.replace(/\s*<a href="\/b2b-lead-generation-roi-calculator\/"[^>]*>[\s\S]*?<\/a>/g, () => { headerLinks++; return ''; }));
    assert.equal(headerLinks, 1, 'Shared header calculator link missing/duplicated in ' + file);
    if (articleAdditions[file]) {
      assert.ok(after.includes(articleAdditions[file]), 'Expected article addition missing ' + file);
      after = after.replace(articleAdditions[file], '');
    }
    assert.equal(normalize(after), normalize(before.toString()), 'Unapproved content or metadata change in ' + file);
    assert.ok(!after.includes('/assets/js/roi-') && !after.includes('/assets/css/roi-'), 'Calculator assets leaked onto ' + file);
    checkedPages++;
  } else if (file === 'sitemap.xml') {
    let count = 0;
    after = after.toString().replace(/<url>\s*<loc>https:\/\/www\.callteam\.ca\/b2b-lead-generation-roi-calculator\/<\/loc>[\s\S]*?<\/url>/g, () => { count++; return ''; });
    assert.equal(count, 1, 'Sitemap needs one calculator URL');
    assert.equal(normalize(after), normalize(before.toString()), 'Unexpected sitemap change');
  } else {
    assert.ok(before.equals(after), 'Existing asset changed: ' + file);
  }
}
const page = fs.readFileSync(path.join(built, 'b2b-lead-generation-roi-calculator/index.html'), 'utf8');
for (const asset of ['/assets/css/roi-calculator.css', '/assets/js/roi-model.js', '/assets/js/roi-calculator.js']) assert.ok(page.includes(asset), 'Missing calculator asset ' + asset);
console.log('Release preservation passed: ' + checkedPages + ' existing pages unchanged after removing only approved links and harmless whitespace; existing assets unchanged; exactly one new page and three assets; one sitemap URL.');
