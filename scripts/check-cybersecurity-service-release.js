'use strict';

// Read-only scope and preservation audit. Run after npm run build.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const { JSDOM } = require('jsdom');

const root = path.resolve(__dirname, '..');
const baseRef = 'b2c5d80e7eafcb9904d90b323a3c463aa90a31dc';
const baseline = path.resolve(process.argv[2] || path.join(root, '../callteam-cybersecurity-service-baseline'));
const build = path.join(root, '_site');
const route = '/services/cybersecurity-lead-generation/';
const canonical = 'https://www.callteam.ca' + route;
const placements = [
 ['src/services/index.njk','services/index.html','cta-services-cybersecurity'],
 ['src/services/b2b-appointment-setting.njk','services/b2b-appointment-setting/index.html','cta-appointment-cybersecurity'],
 ['src/articles/cybersecurity-outbound-sales-playbook.md','articles/cybersecurity-outbound-sales-playbook/index.html','cta-playbook-cybersecurity-service'],
 ['src/resources/cold-call-scripts/script.njk','resources/cold-call-scripts/cybersecurity-risk-assessment-cold-call-script/index.html','cta-cyber-script-service'],
 ['src/case-studies/manufacturing-cybersecurity-appointment-setting.njk','case-studies/manufacturing-cybersecurity-appointment-setting/index.html','cta-cyber-case-service'],
 ['src/resources/outbound-sales-library/index.njk','resources/outbound-sales-library/index.html','cta-library-cybersecurity-service']
];
const outputPlacements = new Map(placements.map(([, output, id]) => [output, id]));
const allowedNewSources = new Set([
 'src/services/cybersecurity-lead-generation.njk','src/_data/cybersecurityService.js','src/assets/css/cybersecurity-service.css',
 'scripts/check-cybersecurity-service-release.js','scripts/test-cybersecurity-service.js','scripts/package-cybersecurity-service-preview.js','docs/cybersecurity-service.md'
]);
const expectedNewOutput = ['services/cybersecurity-lead-generation/index.html','assets/css/cybersecurity-service.css'].sort();

function files(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? files(full) : [full];
  });
}
function relativeFiles(directory) {
  return files(directory).map(file => path.relative(directory, file).split(path.sep).join('/')).sort();
}
function git(...args) {
  return execFileSync('git', args, { cwd: root, encoding: 'utf8' });
}
function stripInsertion(text, id, source) {
  const start = `<!-- Cybersecurity service link: ${id} -->`;
  const end = `<!-- /Cybersecurity service link: ${id} -->`;
  assert.equal(text.split(start).length - 1, 1, `${source}: expected one start marker`);
  assert.equal(text.split(end).length - 1, 1, `${source}: expected one end marker`);
  const begin = text.indexOf(start), finish = text.indexOf(end) + end.length;
  assert.equal(text[begin - 1], '\n');
  const result = text.slice(0, begin - 1) + text.slice(finish);
  assert.notEqual(result, text, `${source}: insertion was not stripped`);
  return result;
}
function normalizedWhitespace(text) {
  return text.replace(/\s+/g, ' ').trim();
}
function sitemapEntries(filename) {
  const dom = new JSDOM(fs.readFileSync(filename, 'utf8'), { contentType: 'application/xml' });
  assert.equal(dom.window.document.querySelectorAll('parsererror').length, 0, 'Invalid sitemap XML');
  const entries = [...dom.window.document.querySelectorAll('url')].map(node => ({
    url: node.querySelector('loc').textContent.trim(),
    serialized: normalizedWhitespace(node.outerHTML)
  }));
  dom.window.close();
  return entries;
}

function run() {
  assert(fs.existsSync(baseline), `Missing baseline directory: ${baseline}`);
  assert(fs.existsSync(build), 'Missing generated output; build the site first');

  const changed = git('diff', '--name-status', baseRef).trim().split('\n').filter(Boolean).map(line => line.split('\t'));
  const existingChanges = changed.filter(([status]) => status !== 'A');
  assert(existingChanges.every(([status]) => status === 'M'), 'Existing files may only contain approved modifications');
  assert.deepEqual(existingChanges.map(([, name]) => name).sort(), placements.map(([source]) => source).sort(), 'Unexpected existing source changes');
  const untracked = git('ls-files', '--others', '--exclude-standard', '-z').split('\0').filter(Boolean);
  const added = changed.filter(([status]) => status === 'A').map(([, name]) => name);
  for (const name of [...untracked, ...added]) {
    if (name === 'node_modules' && fs.lstatSync(path.join(root, name)).isSymbolicLink()) continue;
    assert(allowedNewSources.has(name), 'Unexpected new source or artifact: ' + name);
  }
  git('diff', '--check', baseRef);
  for (const [source, , id] of placements) {
    const original = git('show', baseRef + ':' + source);
    const current = fs.readFileSync(path.join(root, source), 'utf8');
    let stripped = stripInsertion(current, id, source);
    if (source === 'src/resources/cold-call-scripts/script.njk') {
      const emptyConditional = '{% if resource.slug == "cybersecurity-risk-assessment-cold-call-script" %}{% endif %}';
      assert.equal(stripped.split(emptyConditional).length - 1, 1);
      stripped = stripped.replace(emptyConditional, '');
    }
    assert(stripped === original, 'Original source altered: ' + source);
    assert.equal(current.split(route).length - 1, 1, 'Expected exactly one new source link: ' + source);
  }

  const beforeFiles = relativeFiles(baseline);
  const afterFiles = relativeFiles(build);
  const beforeSet = new Set(beforeFiles);
  assert.deepEqual(afterFiles.filter(file => !beforeSet.has(file)), expectedNewOutput, 'Unexpected added output files');
  let originalHtml = 0;
  let unchangedHtml = 0;
  let preservedNonHtml = 0;
  let contextualLinks = 0;
  for (const relative of beforeFiles) {
    const currentFile = path.join(build, relative);
    assert(fs.existsSync(currentFile), 'Missing existing output: ' + relative);
    const original = fs.readFileSync(path.join(baseline, relative));
    const current = fs.readFileSync(currentFile);
    if (relative === 'sitemap.xml') continue;
    if (!relative.endsWith('.html')) {
      assert(original.equals(current), 'Changed existing non-HTML asset: ' + relative);
      preservedNonHtml++;
      continue;
    }
    originalHtml++;
    const id = outputPlacements.get(relative);
    if (!id) {
      assert(original.equals(current), 'Changed unrelated HTML page: ' + relative);
      assert(!current.toString().includes(route), 'Unapproved inbound placement: ' + relative);
      unchangedHtml++;
      continue;
    }
    const html = current.toString();
    assert(normalizedWhitespace(stripInsertion(html, id, relative)) === normalizedWhitespace(original.toString()), 'Changes outside approved insert: ' + relative);
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    const links = [...doc.querySelectorAll('a')].filter(link => link.getAttribute('href') === route);
    assert.equal(links.length, 1, 'Expected one live contextual link: ' + relative);
    assert(doc.getElementById(id), 'Missing placement ID: ' + relative);
    assert.equal(doc.querySelectorAll(`header a[href="${route}"], footer a[href="${route}"]`).length, 0, 'Unapproved shared navigation change');
    contextualLinks++;
    dom.window.close();
  }
  assert.equal(originalHtml, 271, 'Unexpected baseline HTML count');
  assert.equal(contextualLinks, 6, 'Expected six approved contextual links');
  assert.equal(afterFiles.filter(file => file.endsWith('.html')).length, originalHtml + 1, 'Expected only one new HTML page');

  const beforeSitemap = sitemapEntries(path.join(baseline, 'sitemap.xml'));
  const afterSitemap = sitemapEntries(path.join(build, 'sitemap.xml'));
  assert.equal(beforeSitemap.length, originalHtml, 'Baseline sitemap should include every original page');
  assert.equal(afterSitemap.filter(entry => entry.url === canonical).length, 1, 'New page missing or duplicated in sitemap');
  assert.deepEqual(afterSitemap.filter(entry => entry.url !== canonical), beforeSitemap, 'Existing sitemap URLs, order or metadata changed');
  assert.equal(afterSitemap.length, beforeSitemap.length + 1, 'Unexpected extra sitemap entries');

  return {
    passed: true,
    baseline,
    newPage: route,
    existingHtmlPagesPreserved: originalHtml,
    existingHtmlPagesByteIdentical: unchangedHtml,
    existingHtmlPagesWithOnlyApprovedInsertions: contextualLinks,
    totalHtmlPages: originalHtml + 1,
    existingNonHtmlFilesByteIdenticalExcludingSitemap: preservedNonHtml,
    existingSitemapEntriesPreserved: beforeSitemap.length,
    newSitemapEntries: 1,
    newOutputFiles: expectedNewOutput,
    existingSourcesExactlyRestoredAfterRemovingInsertions: placements.map(([source]) => source),
    headerAndFooterChanged: false,
    existingArticleContentAndMetadataPreservedApartFromApprovedCta: true,
    sharedAssetsChanged: false,
    browserVisualQaPerformed: false
  };
}

try {
  console.log(JSON.stringify(run(), null, 2));
} catch (error) {
  console.error(JSON.stringify({ passed: false, error: error.message }, null, 2));
  process.exitCode = 1;
}
