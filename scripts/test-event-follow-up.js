'use strict';

// Crawlability, buyer information, download integrity and accessibility structure.
// These DOM/CSS checks do not claim desktop or mobile browser visual inspection.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { JSDOM } = require('jsdom');
const root = path.resolve(__dirname, '..');
const site = path.join(root, '_site');
const route = '/services/trade-show-lead-follow-up/';
const canonical = 'https://www.callteam.ca' + route;
const dom = new JSDOM(fs.readFileSync(path.join(site, route, 'index.html'), 'utf8'));
const doc = dom.window.document;
const main = doc.querySelector('main.ef-page');
assert(main, 'Missing event service');
assert.equal(doc.querySelectorAll('main').length, 1);
assert.equal(doc.querySelectorAll('h1').length, 1);
assert.equal(doc.querySelector('h1').textContent, 'Turn your trade-show conversations into qualified sales meetings.');
assert.equal(doc.title, 'Trade Show Lead Follow-Up Services | CallTeam');
assert.equal(doc.querySelector('link[rel="canonical"]').href, canonical);
assert.equal(doc.querySelector('meta[property="og:url"]').content, canonical);
assert(!doc.querySelector('meta[name="robots"]').content.includes('noindex'));
assert(doc.querySelector('meta[name="description"]').content.length <= 160);
const ids = [...doc.querySelectorAll('[id]')].map(node => node.id);
assert.equal(ids.length, new Set(ids).size, 'Duplicate IDs');
for (const node of doc.querySelectorAll('[aria-labelledby]')) {
  for (const id of node.getAttribute('aria-labelledby').split(/\s+/)) {
    assert(doc.getElementById(id), 'Missing accessible label ' + id);
  }
}
let localLinks = 0;
for (const node of doc.querySelectorAll('a[href], img[src], link[rel="stylesheet"], script[src]')) {
  const attr = /^(IMG|SCRIPT)$/.test(node.tagName) ? 'src' : 'href';
  const url = node.getAttribute(attr);
  assert(url, 'Empty link or asset URL');
  if (url.startsWith('#')) assert(doc.getElementById(url.slice(1)), 'Broken anchor: ' + url);
  if (url.startsWith('/') && !url.startsWith('//')) {
    const parsed = new URL(url, 'https://www.callteam.ca');
    const target = path.join(site, decodeURI(parsed.pathname), parsed.pathname.endsWith('/') ? 'index.html' : '');
    assert(fs.existsSync(target), 'Missing destination: ' + url);
    if (parsed.hash) {
      const destination = new JSDOM(fs.readFileSync(target, 'utf8'));
      assert(destination.window.document.getElementById(parsed.hash.slice(1)), 'Missing target anchor: ' + url);
      destination.window.close();
    }
    localLinks++;
  }
}
const graphs = [...doc.querySelectorAll('script[type="application/ld+json"]')].flatMap(node => {
  const value = JSON.parse(node.textContent);
  return value['@graph'] || [value];
});
for (const type of ['WebPage', 'Service', 'Person', 'BreadcrumbList', 'FAQPage']) {
  assert(graphs.some(node => node['@type'] === type), 'Missing schema ' + type);
}
assert(!graphs.some(node => /Review|AggregateRating/.test(node['@type'])), 'Unsupported rating');
const webpage = graphs.find(node => node['@type'] === 'WebPage');
const service = graphs.find(node => node['@type'] === 'Service');
assert.equal(webpage.mainEntity['@id'], service['@id']);
assert.equal(service.url, canonical);
assert.equal(service.provider['@id'], 'https://www.callteam.ca/#organization');
assert.deepEqual(service.areaServed.map(area => area.name), ['United States', 'Canada']);
for (const field of ['datePublished', 'dateModified']) {
  assert(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(webpage[field]));
  assert(Number.isFinite(Date.parse(webpage[field])));
}
const author = graphs.find(node => node['@type'] === 'Person');
assert.equal(webpage.author['@id'], author['@id']);
assert.equal(main.querySelector('[rel="author"]').textContent, author.name);
const questions = graphs.find(node => node['@type'] === 'FAQPage').mainEntity;
const visibleFaqs = [...main.querySelectorAll('.ef-faqs details')];
assert.equal(questions.length, 8);
assert.equal(visibleFaqs.length, questions.length);
questions.forEach((question, index) => {
  assert.equal(question.name, visibleFaqs[index].querySelector('summary').textContent);
  assert.equal(question.acceptedAnswer.text, visibleFaqs[index].querySelector('p').textContent);
});

// Different levels of event intent must lead to distinct, evidence-based actions.
const situations = [...main.querySelectorAll('.ef-situation-grid article')];
assert.equal(situations.length, 3);
assert(situations[0].textContent.includes('demo'));
assert(situations[1].textContent.includes('recorded conversation'));
assert(situations[2].textContent.includes('Check account fit'));
assert.equal(new Set(situations.map(node => node.querySelector('.ef-situation-action').textContent)).size, 3);
assert.equal(main.querySelectorAll('.ef-checklist li').length, 7);
assert(main.querySelector('.ef-checklist').textContent.includes('do-not-contact'));
assert.equal(main.querySelectorAll('.ef-week-grid article').length, 2);
assert.equal(main.querySelectorAll('.ef-week-grid li').length, 4);
assert(main.querySelector('#ef-two-weeks').textContent.includes('ten working days'));
assert(main.querySelector('#ef-two-weeks').textContent.includes('not a fixed package'));
assert(main.querySelector('.ef-handoff-card').textContent.includes('Illustrative'));
assert.equal(main.querySelectorAll('.ef-handoff-card dt').length, 5);
assert(main.querySelector('.ef-handoff-card').textContent.includes('Still to establish'));
assert.equal(main.querySelectorAll('.ef-outcomes dt').length, 6);
assert(main.querySelector('#ef-outcomes').textContent.includes('meetings booked and meetings held'));
assert(main.querySelector('#ef-outcomes').textContent.includes('stop the sequence'));
assert(main.querySelector('#ef-scope').textContent.includes('responsibilities and price'));
assert(!/\$\d|\d+%|guaranteed|SEO.optimiz|LLM.optimiz|impress.{0,30}search|ChatGPT|Gemini|Claude/i.test(main.textContent));
assert.equal(main.querySelectorAll('input, textarea, select, [hidden], script').length, 0);
const paragraphs = [...main.querySelectorAll('p')].map(node => node.textContent.trim());
assert.equal(new Set(paragraphs).size, paragraphs.length, 'Repeated paragraph');
const headings = [...main.querySelectorAll('h2,h3')].map(node => node.textContent.trim());
assert.equal(new Set(headings).size, headings.length, 'Repeated heading');
const booking = 'https://calendly.com/hello-callteam/new-meeting';
assert.equal(main.querySelectorAll(`a[href="${booking}"]`).length, 3);
for (const href of ['/b2b-meeting-quality-check/', '/b2b-cold-calling-campaign-process/', '/pricing/', '/case-studies/', '/services/lead-reactivation/', '/articles/outsourced-inbound-lead-follow-up/']) {
  assert(main.querySelector(`a[href="${href}"]`), 'Missing useful resource ' + href);
}
const template = main.querySelector('a[data-event-template]');
assert.equal(template.download, 'CallTeam-Event-Follow-Up-Template.csv');
const csvFile = path.join(site, template.getAttribute('href'));
const csv = fs.readFileSync(csvFile, 'utf8').trim();
assert.equal(csv.split(/\r?\n/).length, 1, 'Template must be blank, without customer information');
const headers = csv.split(',');
assert.equal(headers.length, 17);
assert.equal(new Set(headers).size, headers.length);
for (const field of ['Event name','Original conversation notes','Requested next step','Existing sales owner','Contact preferences or exclusions','Next action owner','Next action due']) {
  assert(headers.includes(field), 'Missing useful template field ' + field);
}
assert(fs.readFileSync(path.join(root, 'src', template.getAttribute('href'))).equals(fs.readFileSync(csvFile)), 'Download changed during build');
const css = fs.readFileSync(path.join(site, 'assets/css/event-follow-up.css'), 'utf8');
const cssDoc = new JSDOM('<!doctype html><style>' + css + '</style>');
assert(cssDoc.window.document.styleSheets[0], 'CSS parse failed');
function scoped(rules) {
  for (const rule of rules) {
    if (rule.selectorText) assert(rule.selectorText.split(',').every(selector => selector.trim().startsWith('.ef-page')), 'Unscoped style ' + rule.selectorText);
    if (rule.cssRules) scoped(rule.cssRules);
  }
}
scoped(cssDoc.window.document.styleSheets[0].cssRules);
for (const snippet of ['max-width:1000px','max-width:720px','max-width:420px',':focus-visible','prefers-reduced-motion','@media print','#f5f4f2','#ff5a1f','Archivo','Inter']) assert(css.includes(snippet));
assert.equal(doc.querySelectorAll('link[href="/assets/css/event-follow-up.css"]').length, 1);
console.log(JSON.stringify({passed:true,localLinksAndAssets:localLinks,faqs:8,distinctContactSituations:3,intakeChecklistFields:7,workflowStages:4,handoffFields:5,reportedOutcomes:6,downloadColumns:17,schemasMatchVisibleContent:true,contentAvailableWithoutJavascript:true,duplicateParagraphsOrHeadings:0,cssIsScoped:true,browserVisualQaPerformed:false},null,2));
cssDoc.window.close();
dom.window.close();
