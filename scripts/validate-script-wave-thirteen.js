const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');
const all = require('../src/_data/callScripts');
const wave = require('../src/_data/callScriptsWaveThirteen');
const links = require('../src/_data/scriptWaveThirteenLinks');
const root = path.join(__dirname, '..');
const output = path.join(root, '_site');
const words = text => text.toLowerCase().match(/[a-z0-9]+/g) || [];
const grams = text => {
  const w = words(text);
  return new Set(w.slice(0, -2).map((_, i) => w.slice(i, i + 3).join(' ')));
};
const similarity = (a, b) => {
  const intersection = [...a].filter(value => b.has(value)).length;
  return intersection / (a.size + b.size - intersection);
};
assert.equal(wave.length, 10);
assert.deepEqual(wave.map(s => s.number), Array.from({ length: 10 }, (_, i) => 81 + i));
let closest = { score: 0 };
for (const s of wave) {
  const label = s.slug;
  const html = fs.readFileSync(path.join(output, 'resources/cold-call-scripts', label, 'index.html'), 'utf8');
  assert.equal((html.match(/<h1\b/g) || []).length, 1, label + ': one H1');
  assert(html.includes(`href="https://www.callteam.ca/resources/cold-call-scripts/${label}/"`), label + ': canonical');
  assert(html.includes('content="index, follow,'), label + ': indexable release output');
  assert(html.includes(s.quickAnswer), label + ': visible direct answer');
  assert(html.includes(s.editorialNote), label + ': honest provenance');
  assert(!html.includes('Built from real campaign experience.'), label + ': no unverified field-test claim');
  assert(!/[—]/.test(JSON.stringify(s)), label + ': no em dashes');
  assert.equal(s.faqs.length, 5, label + ': five FAQs');
  assert.equal(s.objections.length, 4, label + ': four objections');
  assert.equal(s.questions.length, 4, label + ': four qualification questions');
  assert.equal(s.alternatives.length, 3, label + ': three alternatives');
  assert.equal(s.stopRules.length, 3, label + ': disqualification criteria');
  assert.equal(s.aboutCallTeam.paragraphs.length, 3, label + ': three About paragraphs');
  assert.equal((html.match(/style="margin-top: 1.25rem;"/g) || []).length, 3, label + ': About spacing');
  const graphs = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(m => {
    const data = JSON.parse(m[1]); return data['@graph'] || [data];
  });
  for (const type of ['Article', 'BreadcrumbList', 'HowTo', 'FAQPage']) assert(graphs.some(x => x['@type'] === type), label + ': ' + type);
  const faq = graphs.find(x => x['@type'] === 'FAQPage');
  assert.deepEqual(faq.mainEntity.map(x => [x.name, x.acceptedAnswer.text]), s.faqs.map(x => [x.question, x.answer]), label + ': FAQ parity');
  const article = graphs.find(x => x['@type'] === 'Article');
  assert.equal(article.datePublished, s.publishedDate);
  assert.equal(article.dateModified, s.publishedDate);
  assert.equal(links[label].length, 7);
  links[label].forEach(link => assert(html.includes(`href="${link.url}"`), label + ': campaign link ' + link.url));
  s.related.forEach(slug => assert(all.some(x => x.slug === slug), label + ': related script ' + slug));
  const parent = path.join(output, links[label][0].url, 'index.html');
  assert(fs.readFileSync(parent, 'utf8').includes(`/resources/cold-call-scripts/${label}/`), label + ': parent backlink');
  const g = grams(s.fullScript + ' ' + s.whyItWorks);
  for (const other of all) if (other.slug !== label) {
    const score = similarity(g, grams(other.fullScript + ' ' + other.whyItWorks));
    if (score > closest.score) closest = { score, first: label, second: other.slug };
    assert(score < 0.35, label + ': duplicated script intent/copy warning with ' + other.slug);
  }
}
const titles = wave.map(s => s.seoTitle.toLowerCase());
const questions = wave.flatMap(s => s.faqs.map(f => f.question.toLowerCase()));
assert.equal(new Set(titles).size, 10);
assert.equal(new Set(questions).size, 50);
console.log(JSON.stringify({ result: 'pass', pages: 10, faqs: 50, campaignLinks: 70, parentBacklinks: 10, closestNewScript: closest }, null, 2));
