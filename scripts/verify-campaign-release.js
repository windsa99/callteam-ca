'use strict';

// Read-only release verification against a separately built, pre-change site.
// Do not broaden these allowances to hide an unrelated website change.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const os = require('node:os');
const { spawnSync } = require('node:child_process');
const { checkPage } = require('./check-contact-forms');

const baselineArgument = process.argv[2];
if (!baselineArgument) {
  throw new Error('Usage: node scripts/verify-campaign-release.js /absolute/path/to/pre-change-site [--site built-site-directory] [--self-test]');
}
const baseline = path.resolve(baselineArgument);
let siteArgument;
let selfTestRequested = false;
const extraArguments = process.argv.slice(3);
for (let index = 0; index < extraArguments.length; index++) {
  const argument = extraArguments[index];
  if (argument === '--self-test') selfTestRequested = true;
  else if (argument === '--site') {
    assert.ok(extraArguments[index + 1] && !extraArguments[index + 1].startsWith('--'), '--site requires a directory');
    assert.ok(!siteArgument, 'Specify the built site directory only once');
    siteArgument = extraArguments[++index];
  } else if (!argument.startsWith('--') && !siteArgument) siteArgument = argument;
  else throw new Error('Unknown or repeated argument: ' + argument);
}
const built = siteArgument ? path.resolve(siteArgument) : path.resolve(__dirname, '../_site');
assert.notEqual(baseline, built, 'Baseline and built output must be separate directories');
assert.ok(fs.existsSync(baseline), 'Baseline directory is missing');
assert.ok(fs.existsSync(built), 'Built output is missing; run the configured build first');

const route = '/b2b-outbound-campaign-planner/';
const canonical = 'https://www.callteam.ca' + route;
const pageFile = 'b2b-outbound-campaign-planner/index.html';
const assets = [
  'assets/css/campaign-preview.css',
  'assets/js/campaign-data.js',
  'assets/js/campaign-model.js',
  'assets/js/campaign-preview.js'
];
const additions = new Set([pageFile, ...assets]);
const contextual = new Set([
  'b2b-lead-generation-roi-calculator/index.html',
  'pricing/index.html',
  'resources/outbound-sales-library/index.html',
  'services/b2b-appointment-setting/index.html',
  'services/outsourced-sdr/index.html',
  'services/lead-reactivation/index.html'
]);
const markerStart = '<!-- Campaign preview link -->';
const markerEnd = '<!-- /Campaign preview link -->';
const markerPattern = /<!-- Campaign preview link -->([\s\S]*?)<!-- \/Campaign preview link -->/g;

function files(directory, prefix = '') {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    assert.ok(!entry.isSymbolicLink(), 'Unexpected symbolic link: ' + prefix + entry.name);
    return entry.isDirectory()
      ? files(path.join(directory, entry.name), prefix + entry.name + '/')
      : [prefix + entry.name];
  });
}
function occurrences(value, needle) { return value.split(needle).length - 1; }
function normalize(value) { return value.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim(); }
function markup(value) { return value.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi, ''); }
function textContent(value) { return normalize(value.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]*>/g, ' ')); }
function attribute(tag, name) {
  return tag.match(new RegExp('\\b' + name + '\\s*=\\s*(["\'])([\\s\\S]*?)\\1', 'i'))?.[2];
}
function singleMatch(value, expression, message) {
  const found = [...value.matchAll(expression)];
  assert.equal(found.length, 1, message);
  return found[0];
}
function assertSafeLinkBlock(block, filename) {
  assert.ok(!/<(?:script|style|form|input|textarea|select|button|iframe|object|embed|link)\b/i.test(block), 'Active content in additive link block: ' + filename);
  assert.ok(!/\son\w+\s*=/i.test(block), 'Inline event handler in additive link block: ' + filename);
  const anchors = [...block.matchAll(/<a\b[^>]*>[\s\S]*?<\/a\s*>/gi)];
  assert.equal(anchors.length, 1, 'Expected one calculator-to-preview link in additive block: ' + filename);
  assert.equal(attribute(anchors[0][0], 'href'), route, 'Unapproved link target in additive block: ' + filename);
}
function formMarkup(value) { return [...value.matchAll(/<form\b[^>]*>[\s\S]*?<\/form\s*>/gi)].map(match => match[0]); }
function articleMarkup(value) {
  const start = value.indexOf('<article class="article-page">');
  const end = value.lastIndexOf('</article>');
  assert.ok(start >= 0 && end > start, 'Expected the existing article wrapper');
  return value.slice(start, end + '</article>'.length);
}
function stripApprovedChanges(html, filename) {
  assert.equal(occurrences(html, markerStart), contextual.has(filename) ? 2 : 1, 'Unexpected additive block count in ' + filename);
  assert.equal(occurrences(html, markerEnd), occurrences(html, markerStart), 'Unbalanced additive markers in ' + filename);
  const footer = singleMatch(html, /<footer\b[\s\S]*?<\/footer\s*>/gi, 'Expected one shared footer: ' + filename)[0];
  const footerAddition = singleMatch(footer, /<!-- Campaign preview link -->([\s\S]*?)<!-- \/Campaign preview link -->/g, 'Expected one marked footer addition: ' + filename)[1];
  assert.equal(normalize(footerAddition), '<a href="' + route + '">Campaign Preview</a>', 'Unexpected footer addition: ' + filename);
  const outsideFooter = html.replace(footer, '');
  assert.equal(occurrences(outsideFooter, markerStart), contextual.has(filename) ? 1 : 0, 'Unexpected contextual addition: ' + filename);
  html = html.replace(markerPattern, (whole, block) => {
    assertSafeLinkBlock(block, filename);
    return '';
  });
  let headerLinkCount = 0;
  const header = singleMatch(html, /<header\b[^>]*\bclass=["']site-header["'][^>]*>[\s\S]*?<\/header\s*>/gi, 'Expected one shared site header: ' + filename)[0];
  const restoredHeader = header.replace(/<a\b[^>]*>[\s\S]*?<\/a\s*>/gi, anchor => {
    if (attribute(anchor, 'href') !== route) return anchor;
    headerLinkCount++;
    assert.equal(textContent(singleMatch(anchor, /<strong\b[^>]*>([\s\S]*?)<\/strong>/gi, 'Expected labelled Resources child: ' + filename)[1]), 'Campaign Preview', 'Unexpected new navigation label');
    assert.ok(!/\son\w+\s*=/i.test(anchor), 'Inline handler in new navigation link');
    return '';
  });
  assert.equal(headerLinkCount, 1, 'Campaign Preview navigation link missing or duplicated: ' + filename);
  return html.replace(header, restoredHeader);
}

const oldFiles = files(baseline);
const newFiles = files(built);
const oldSet = new Set(oldFiles);
const newSet = new Set(newFiles);
assert.deepEqual(oldFiles.filter(file => !newSet.has(file)), [], 'Previously published paths were removed');
assert.deepEqual(newFiles.filter(file => !oldSet.has(file)).sort(), [...additions].sort(), 'Unexpected generated additions');
const oldHtml = oldFiles.filter(file => file.endsWith('.html'));
const newHtml = newFiles.filter(file => file.endsWith('.html'));
assert.equal(oldHtml.length, 265, 'Expected the approved 265-page baseline');
assert.equal(newHtml.length, 266, 'Expected 266 pages including the new planner');
const articlePaths = oldHtml.filter(file => /^articles\/.+\/index\.html$/.test(file));
const scriptPaths = oldHtml.filter(file => /^resources\/cold-call-scripts\/.+\/index\.html$/.test(file));
assert.equal(articlePaths.length, 138, 'Expected all 138 existing articles');
assert.equal(scriptPaths.length, 100, 'Expected all 100 existing script pages');
assert.equal(newHtml.filter(file => /^articles\/.+\/index\.html$/.test(file)).length, 138, 'Article collection changed');
assert.equal(newHtml.filter(file => /^resources\/cold-call-scripts\/.+\/index\.html$/.test(file)).length, 100, 'Script collection changed');

let checkedPages = 0;
let checkedAssets = 0;
for (const filename of oldFiles) {
  const before = fs.readFileSync(path.join(baseline, filename));
  const after = fs.readFileSync(path.join(built, filename));
  if (filename.endsWith('.html')) {
    const beforeHtml = before.toString();
    const afterHtml = after.toString();
    const restored = stripApprovedChanges(afterHtml, filename);
    assert.equal(normalize(restored), normalize(beforeHtml), 'Unapproved existing page content, metadata or script change: ' + filename);
    assert.deepEqual(formMarkup(afterHtml), formMarkup(beforeHtml), 'Existing form markup changed: ' + filename);
    if (articlePaths.includes(filename)) assert.equal(articleMarkup(afterHtml), articleMarkup(beforeHtml), 'Existing article body changed: ' + filename);
    for (const asset of assets) assert.ok(!afterHtml.includes('/' + asset), 'Campaign asset leaked onto existing page: ' + filename);
    checkPage(afterHtml, filename);
    checkedPages++;
  } else if (filename === 'sitemap.xml') {
    const newEntry = singleMatch(after.toString(), /<url>\s*<loc>https:\/\/www\.callteam\.ca\/b2b-outbound-campaign-planner\/<\/loc>[\s\S]*?<\/url>/g, 'Sitemap needs exactly one new planner entry')[0];
    assert.equal(normalize(after.toString().replace(newEntry, '')), normalize(before.toString()), 'Unapproved sitemap URL, order or metadata change');
  } else {
    assert.ok(before.equals(after), 'Existing asset or robots.txt changed: ' + filename);
    checkedAssets++;
  }
}

const page = fs.readFileSync(path.join(built, pageFile), 'utf8');
const visible = markup(page);
checkPage(page, pageFile);
const builtHome = fs.readFileSync(path.join(built, 'index.html'), 'utf8');
for (const element of ['header', 'footer']) {
  const expression = element === 'header'
    ? /<header\b[^>]*\bclass=["']site-header["'][^>]*>[\s\S]*?<\/header\s*>/gi
    : /<footer\b[\s\S]*?<\/footer\s*>/gi;
  const pageElement = singleMatch(page, expression, 'Planner needs the shared ' + element)[0];
  const homeElement = singleMatch(builtHome, expression, 'Homepage needs the shared ' + element)[0];
  assert.equal(normalize(pageElement), normalize(homeElement), 'Planner does not inherit the complete shared ' + element);
}
assert.ok(!/\son\w+\s*=/i.test(visible), 'Planner markup contains inline event handlers');
assert.ok(!/<(?:iframe|object|embed)\b/i.test(visible), 'Planner unexpectedly embeds an external application');
assert.ok(!/\b(?:href|src|action)\s*=\s*["']\s*(?:javascript|data):/i.test(visible), 'Unsafe planner URL scheme');
for (const anchor of visible.matchAll(/<a\b[^>]*>/gi)) {
  if (attribute(anchor[0], 'target') === '_blank') {
    assert.ok(/(?:^|\s)noopener(?:\s|$)/.test(attribute(anchor[0], 'rel') || ''), 'New-tab link lacks noopener');
  }
}
for (const asset of assets) {
  const tags = [...page.matchAll(/<(?:link|script)\b[^>]*>/gi)].filter(match => attribute(match[0], asset.endsWith('.css') ? 'href' : 'src') === '/' + asset);
  assert.equal(tags.length, 1, 'Planner asset missing or duplicated: ' + asset);
  if (asset.endsWith('.js')) {
    assert.ok(/\bdefer(?:\s|>|=)/i.test(tags[0][0]), 'Planner scripts must preserve ordered deferred loading');
    const source = fs.readFileSync(path.join(built, asset), 'utf8');
    assert.ok(!/\b(?:fetch\s*\(|XMLHttpRequest\b|WebSocket\s*\(|EventSource\s*\(|sendBeacon\s*\(|importScripts\s*\()/m.test(source), 'Planner asset introduces a network action: ' + asset);
  }
}
const scriptOrder = assets.filter(asset => asset.endsWith('.js')).map(asset => page.indexOf('src="/' + asset + '"'));
assert.ok(scriptOrder.every((position, index) => index === 0 || position > scriptOrder[index - 1]), 'Planner data, model and UI scripts load out of order');

const title = textContent(singleMatch(page, /<title>([\s\S]*?)<\/title>/gi, 'Planner needs exactly one title')[1]);
assert.ok(title.length >= 15 && /campaign/i.test(title) && /CallTeam/.test(title), 'Planner title must identify its campaign purpose and CallTeam');
const canonicalTags = [...page.matchAll(/<link\b[^>]*>/gi)].filter(match => attribute(match[0], 'rel') === 'canonical');
assert.equal(canonicalTags.length, 1, 'Planner needs one canonical');
assert.equal(attribute(canonicalTags[0][0], 'href'), canonical, 'Planner canonical differs from the approved URL');
const metaTags = [...page.matchAll(/<meta\b[^>]*>/gi)].map(match => match[0]);
function meta(key, property = 'name') {
  const values = metaTags.filter(tag => attribute(tag, property) === key).map(tag => attribute(tag, 'content'));
  assert.equal(values.length, 1, 'Missing or duplicate metadata: ' + key);
  assert.ok(values[0], 'Empty metadata: ' + key);
  return values[0];
}
assert.ok(meta('description').length >= 40, 'Planner needs a useful static search description');
assert.ok(!/\b(?:noindex|nofollow|none)\b/i.test(meta('robots')), 'Planner is blocked from indexing');
assert.equal(meta('og:url', 'property'), canonical, 'Open Graph URL differs from the canonical');
meta('og:title', 'property');
meta('og:description', 'property');
meta('og:image', 'property');
meta('twitter:title');
const h1 = textContent(singleMatch(visible, /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi, 'Planner needs exactly one visible H1')[1]);
assert.equal(h1, 'See how we would get your next sales conversation started.', 'Planner H1 must preserve the approved server-rendered introduction');
const main = singleMatch(visible, /<main\b[^>]*>([\s\S]*?)<\/main>/gi, 'Planner needs one static main landmark')[1];
assert.ok(textContent(main).split(' ').length >= 100, 'Planner is missing explanatory content without JavaScript');
assert.ok([...main.matchAll(/<h2\b[^>]*>[\s\S]*?<\/h2>/gi)].length >= 2, 'Planner needs static explanatory sections');
for (const id of ['cp-example-title', 'cp-proof-title', 'cp-execution-title', 'cp-faq-title']) {
  assert.ok(new RegExp('<h2\\b[^>]*\\bid=["\']' + id + '["\'][^>]*>[\\s\\S]*?<\\/h2>', 'i').test(main), 'Missing server-rendered explanation: ' + id);
}
const example = singleMatch(main, /<section\b[^>]*\bid=["']cp-example["'][^>]*>[\s\S]*?<\/section\s*>/gi, 'Planner needs its static manufacturing example')[0];
assert.ok(!/\shidden(?:\s|>|=)/i.test(example.match(/^<section\b[^>]*>/i)[0]), 'Static example must be visible without JavaScript');
assert.ok(textContent(example).includes('Cybersecurity offer. Manufacturing buyer. A better opening.'), 'Static example heading changed or missing');
assert.ok(textContent(example).includes('when a security issue affects the plant, who owns the response: IT, controls or plant operations?'), 'Static example call opening is missing');
const exampleDisclosure = singleMatch(example, /<details\b[^>]*\bid=["']cp-example-disclosure["'][^>]*>/gi, 'Static example needs one native disclosure')[0];
assert.ok(/\sopen(?:\s|>|=)/i.test(exampleDisclosure), 'The fixed example must start open without JavaScript');
const faq = singleMatch(main, /<section\b[^>]*\baria-labelledby=["']cp-faq-title["'][^>]*>[\s\S]*?<\/section\s*>/gi, 'Planner needs its FAQ section')[0];
assert.equal([...faq.matchAll(/<details\b/gi)].length, 6, 'Expected all six server-rendered planner FAQs');
assert.equal([...main.matchAll(/<details\b/gi)].length, 7, 'Expected six FAQs and one example disclosure');

const graphs = [...page.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].flatMap(match => {
  const parsed = JSON.parse(match[1]);
  return parsed['@graph'] || [parsed];
});
assert.ok(graphs.some(node => node['@type'] === 'WebPage' && node.url === canonical), 'Planner WebPage structured data missing or mismatched');
assert.ok(graphs.some(node => node['@type'] === 'BreadcrumbList' && node.itemListElement?.some(item => item.item === canonical)), 'Planner breadcrumb structured data missing or mismatched');
for (const filename of oldHtml) {
  const oldPage = fs.readFileSync(path.join(built, filename), 'utf8');
  assert.ok(!oldPage.includes('<link rel="canonical" href="' + canonical + '">'), 'Planner canonical duplicated on existing page: ' + filename);
  assert.notEqual(textContent(oldPage.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || ''), title, 'Planner title duplicates an existing title: ' + filename);
}

function verifyLocalTarget(value, originFilename) {
  if (!value || (!value.startsWith('/') && !value.startsWith('#')) || value.startsWith('//')) return;
  const parsed = new URL(value, canonical);
  const decodedPath = decodeURIComponent(parsed.pathname);
  const relative = decodedPath.endsWith('/') ? decodedPath.slice(1) + 'index.html' : decodedPath.slice(1);
  const target = path.resolve(built, relative);
  assert.ok(target.startsWith(built + path.sep), 'Local target escapes the built site: ' + value);
  assert.ok(fs.existsSync(target), 'Broken planner link/asset in ' + originFilename + ': ' + value);
  if (parsed.hash) {
    const id = decodeURIComponent(parsed.hash.slice(1));
    const targetHtml = fs.readFileSync(target, 'utf8');
    assert.ok(targetHtml.includes('id="' + id + '"') || targetHtml.includes('id=\'' + id + '\'') || targetHtml.includes('name="' + id + '"'), 'Broken planner anchor: ' + value);
  }
}
for (const tag of page.matchAll(/<(?:a|link|script|img)\b[^>]*>/gi)) {
  verifyLocalTarget(attribute(tag[0], 'href') || attribute(tag[0], 'src'), pageFile);
}
const robots = fs.readFileSync(path.join(built, 'robots.txt'), 'utf8');
assert.ok(/Sitemap:\s*https:\/\/www\.callteam\.ca\/sitemap\.xml/i.test(robots), 'Sitemap discovery is missing from robots.txt');

const selfTestResults = [];
if (selfTestRequested) {
  // Each deliberate regression is isolated in a fresh disposable copy. The
  // actual build and the original baseline are never modified by self-tests.
  const tests = [
    {
      name: 'existing article body modified',
      expected: /Unapproved existing page content, metadata or script change|Existing article body changed/,
      mutate(directory) {
        const target = path.join(directory, articlePaths[0]);
        const original = fs.readFileSync(target, 'utf8');
        const changed = original.replace('<article class="article-page">', '<article class="article-page"><p>Unapproved regression probe.</p>');
        assert.notEqual(changed, original, 'Article regression fixture did not change');
        fs.writeFileSync(target, changed);
      }
    },
    {
      name: 'existing page removed',
      expected: /Previously published paths were removed/,
      mutate(directory) { fs.unlinkSync(path.join(directory, articlePaths[0])); }
    },
    {
      name: 'existing protected form changed',
      expected: /Unapproved existing page content, metadata or script change|Existing form markup changed/,
      mutate(directory) {
        const target = path.join(directory, 'index.html');
        const original = fs.readFileSync(target, 'utf8');
        const changed = original.replace('name="_gotcha"', 'name="removed_honeypot"');
        assert.notEqual(changed, original, 'Form regression fixture did not change');
        fs.writeFileSync(target, changed);
      }
    },
    {
      name: 'new planner resource missing',
      expected: /Unexpected generated additions/,
      mutate(directory) { fs.unlinkSync(path.join(directory, 'assets/js/campaign-model.js')); }
    },
    {
      name: 'existing stylesheet modified',
      expected: /Existing asset or robots.txt changed: assets\/css\/style\.css/,
      mutate(directory) { fs.appendFileSync(path.join(directory, 'assets/css/style.css'), '\n/* Unapproved regression probe. */\n'); }
    }
  ];
  for (const test of tests) {
    const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'callteam-campaign-release-'));
    try {
      const temporarySite = path.join(temporaryRoot, 'site');
      fs.cpSync(built, temporarySite, { recursive: true });
      test.mutate(temporarySite);
      const result = spawnSync(process.execPath, [__filename, baseline, '--site', temporarySite], { encoding: 'utf8', timeout: 30000, maxBuffer: 1024 * 1024 });
      assert.ifError(result.error);
      assert.notEqual(result.status, 0, 'Regression guard accepted: ' + test.name);
      assert.match((result.stderr || '') + (result.stdout || ''), test.expected, 'Regression failed for an unexpected reason: ' + test.name);
      selfTestResults.push({ case: test.name, rejectedAsExpected: true });
    } finally {
      fs.rmSync(temporaryRoot, { recursive: true, force: true });
    }
  }
}

console.log(JSON.stringify({
  status: 'passed',
  existingPagesPreserved: checkedPages,
  existingArticleBodiesPreservedExactly: articlePaths.length,
  existingScriptPagesPreserved: scriptPaths.length,
  existingAssetsAndRobotsPreservedExactly: checkedAssets,
  newPages: 1,
  newAssets: assets.length,
  totalHtmlPages: newHtml.length,
  allowedContextualPages: [...contextual],
  sitemap: 'All prior entries preserved; one planner URL added',
  newPage: 'Static SEO content, canonical, JSON-LD, internal links, asset isolation and shared form guard passed',
  negativeRegressionCasesVerified: selfTestResults.length,
  negativeRegressionResults: selfTestResults,
  qualification: 'Page preservation permits only the explicit marked link additions and harmless whitespace. No live submission or deployment is performed by this script.'
}, null, 2));
