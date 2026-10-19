'use strict';

// Verify buying information, crawlable content, structured data and destinations.
// Layout assertions are static checks, not a substitute for browser visual QA.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { JSDOM } = require('jsdom');
const root = path.resolve(__dirname, '..');
const site = path.join(root, '_site');
const route = '/services/cybersecurity-lead-generation/';
const canonical = 'https://www.callteam.ca' + route;
const docDom = new JSDOM(fs.readFileSync(path.join(site, route, 'index.html'), 'utf8'));
const doc = docDom.window.document;
const main = doc.querySelector('main.cs-page');
assert(main, 'Missing service-page content');
assert.equal(doc.querySelectorAll('main').length, 1);
assert.equal(doc.querySelectorAll('h1').length, 1);
assert.equal(doc.querySelector('h1').textContent, 'Put your cybersecurity offer in front of the right buyers.');
assert.equal(doc.title, 'Cybersecurity Lead Generation Services | CallTeam');
assert.equal(doc.querySelector('link[rel="canonical"]').href, canonical);
assert.equal(doc.querySelector('meta[property="og:url"]').content, canonical);
assert(!doc.querySelector('meta[name="robots"]').content.includes('noindex'));
assert(doc.querySelector('meta[name="description"]').content.length <= 160);
const ids = [...doc.querySelectorAll('[id]')].map(node => node.id);
assert.equal(ids.length, new Set(ids).size, 'Duplicate IDs');
let links = 0;
for (const node of doc.querySelectorAll('a[href], img[src], link[rel="stylesheet"], script[src]')) {
  const attr = /^(IMG|SCRIPT)$/.test(node.tagName) ? 'src' : 'href';
  const url = node.getAttribute(attr);
  assert(url, 'Empty link or asset URL');
  if (url.startsWith('#')) assert(doc.getElementById(url.slice(1)), 'Broken anchor: ' + url);
  if (url.startsWith('/') && !url.startsWith('//')) {
    const parsed = new URL(url, 'https://www.callteam.ca');
    const target = path.join(site, decodeURI(parsed.pathname), parsed.pathname.endsWith('/') ? 'index.html' : '');
    assert(fs.existsSync(target), 'Missing target: ' + url);
    if (parsed.hash) {
      const destination = new JSDOM(fs.readFileSync(target, 'utf8'));
      assert(destination.window.document.getElementById(parsed.hash.slice(1)), 'Missing target anchor: ' + url);
      destination.window.close();
    }
    links++;
  }
}
const graphs = [...doc.querySelectorAll('script[type="application/ld+json"]')].flatMap(node => {
  const value = JSON.parse(node.textContent);
  return value['@graph'] || [value];
});
for (const type of ['WebPage', 'Service', 'Person', 'BreadcrumbList', 'FAQPage']) {
  assert(graphs.some(node => node['@type'] === type), 'Missing structured data: ' + type);
}
assert(!graphs.some(node => /Review|AggregateRating/.test(node['@type'])), 'Unsupported review or rating data');
const webpage = graphs.find(node => node['@type'] === 'WebPage');
const service = graphs.find(node => node['@type'] === 'Service');
assert.equal(webpage.mainEntity['@id'], service['@id']);
assert.equal(service.url, canonical);
assert.equal(service.provider['@id'], 'https://www.callteam.ca/#organization');
for (const field of ['datePublished', 'dateModified']) {
  assert(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(webpage[field]));
  assert(Number.isFinite(Date.parse(webpage[field])));
}
const author = graphs.find(node => node['@type'] === 'Person');
assert.equal(webpage.author['@id'], author['@id']);
assert.equal(main.querySelector('[rel="author"]').textContent, author.name);
const faq = graphs.find(node => node['@type'] === 'FAQPage').mainEntity;
const visibleFaqs = [...main.querySelectorAll('.cs-faqs details')];
assert.equal(faq.length, 8);
assert.equal(visibleFaqs.length, faq.length);
faq.forEach((question, i) => {
  assert.equal(question.name, visibleFaqs[i].querySelector('summary').textContent);
  assert.equal(question.acceptedAnswer.text, visibleFaqs[i].querySelector('p').textContent);
});

// A buyer can read every deliverable, price condition and brief without JavaScript.
assert.equal(main.querySelectorAll('input, textarea, select, [hidden]').length, 0);
assert.equal(main.querySelectorAll('.cs-offer-row').length, 4);
for (const row of main.querySelectorAll('.cs-offer-row')) {
  assert(row.querySelector('h3').textContent.trim());
  assert.equal(row.querySelectorAll('dt').length, 2);
  assert([...row.querySelectorAll('dd')].every(node => node.textContent.trim()));
}
assert.equal(main.querySelectorAll('.cs-delivery-list li').length, 4);
const brief = main.querySelector('.cs-meeting-card');
assert(brief.textContent.includes('Illustrative'));
assert.equal(brief.querySelectorAll('dt').length, 7);
assert(brief.textContent.includes('still to be confirmed'));
assert(brief.textContent.includes('budget and other approvers'));
assert(main.querySelector('.cs-proof-record').textContent.includes('9'));
assert(main.querySelector('.cs-proof-record').textContent.includes('3'));
assert(main.querySelector('.cs-proof-record').textContent.includes('90 days'));
assert(main.querySelector('.cs-proof-record').textContent.includes('past campaign'));
assert(main.querySelector('#cs-scope').textContent.includes('US$4,000'));
assert(main.querySelector('#cs-scope').textContent.includes('per month'));
assert(main.querySelector('#cs-scope').textContent.includes('three-month'));
assert(main.querySelector('#cs-scope').textContent.includes('Fresh prospect research'));
assert(!/guaranteed|guarantee.{0,20}meetings|SEO.optimiz|LLM.optimiz|impress.{0,30}search|ChatGPT|Gemini|Claude/i.test(main.textContent));
assert(!/customers signed|deals closed|certified security/i.test(main.textContent));
const paragraphs = [...main.querySelectorAll('p')].map(node => node.textContent.trim());
assert.equal(new Set(paragraphs).size, paragraphs.length, 'Repeated paragraph');
const headings = [...main.querySelectorAll('h2,h3')].map(node => node.textContent.trim());
assert.equal(new Set(headings).size, headings.length, 'Repeated heading');
const booking = 'https://calendly.com/hello-callteam/new-meeting';
assert.equal(main.querySelectorAll(`a[href="${booking}"]`).length, 3);
for (const href of ['/b2b-outbound-campaign-planner/', '/b2b-lead-generation-roi-calculator/', '/pricing/', '/b2b-cold-calling-campaign-process/', '/b2b-meeting-quality-check/', '/case-studies/manufacturing-cybersecurity-appointment-setting/', '/articles/cybersecurity-outbound-sales-playbook/', '/resources/cold-call-scripts/cybersecurity-risk-assessment-cold-call-script/']) {
  assert(main.querySelector(`a[href="${href}"]`), 'Missing intended resource: ' + href);
}
const css = fs.readFileSync(path.join(site, 'assets/css/cybersecurity-service.css'), 'utf8');
const cssDoc = new JSDOM('<!doctype html><style>' + css + '</style>');
function scoped(rules) {
  for (const rule of rules) {
    if (rule.selectorText) assert(rule.selectorText.split(',').every(selector => selector.trim().startsWith('.cs-page')), 'Unscoped style: ' + rule.selectorText);
    if (rule.cssRules) scoped(rule.cssRules);
  }
}
scoped(cssDoc.window.document.styleSheets[0].cssRules);
for (const snippet of ['max-width: 1000px', 'max-width: 720px', 'max-width: 420px', ':focus-visible', 'prefers-reduced-motion', '@media print', '#f5f4f2', '#ff5a1f', 'Archivo', 'Inter']) assert(css.includes(snippet));
assert.equal(doc.querySelectorAll('link[href="/assets/css/cybersecurity-service.css"]').length, 1);
console.log(JSON.stringify({passed:true,faqs:8,offerExamples:4,deliveryStages:4,meetingBriefFields:7,localLinksAndAssets:links,schemasMatchVisibleContent:true,duplicateHeadingsOrParagraphs:0,contentAvailableWithoutJavascript:true,cssIsScoped:true,browserVisualQaPerformed:false}, null, 2));
cssDoc.window.close();
docDom.window.close();
