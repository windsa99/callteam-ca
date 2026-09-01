const fs = require("fs");
const path = require("path");
const scripts = require("../src/_data/callScripts.js");
const articleLinks = require("../src/_data/scriptArticleLinks.js");

const output = path.resolve(__dirname, "..", "_site");
const failures = [];
const waveIds = new Set(Array.from({ length: 10 }, (_, index) => `CT-R${String(61 + index).padStart(3, "0")}`));
const wave = scripts.filter((script) => waveIds.has(script.id));
const legacy = scripts.filter((script) => !waveIds.has(script.id));

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function normalize(text) {
  return String(text || "").toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
}

function shingles(text, size = 5) {
  const tokens = normalize(text).split(" ").filter(Boolean);
  return new Set(tokens.slice(0, Math.max(0, tokens.length - size + 1)).map((_, index) => tokens.slice(index, index + size).join(" ")));
}

function jaccard(left, right) {
  let intersection = 0;
  left.forEach((value) => { if (right.has(value)) intersection += 1; });
  return intersection / (left.size + right.size - intersection || 1);
}

function publicCopy(script) {
  return [
    script.opening,
    ...(script.questions || []),
    script.bridge,
    script.cta,
    ...(script.objections || []).flatMap((item) => [item.objection, item.response]),
    script.whyItWorks,
    ...(script.whyBreakdown || []).flatMap((item) => [item.label, item.text]),
    ...(script.personalization || []),
    ...(script.alternatives || []).flatMap((item) => [item.description, item.script]),
    ...(script.faqs || []).flatMap((item) => [item.question, item.answer]),
    ...((script.aboutCallTeam && script.aboutCallTeam.paragraphs) || []),
  ].join(" ");
}

function jsonLdTypes(html) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  return blocks.flatMap((match) => {
    const parsed = JSON.parse(match[1]);
    return parsed["@graph"] ? parsed["@graph"].map((item) => item["@type"]) : [parsed["@type"]];
  });
}

assert(wave.length === 10, `Expected 10 Wave Eleven scripts, found ${wave.length}.`);
for (const key of ["id", "slug", "title", "seoTitle", "metaDescription", "primaryKeyword"]) {
  assert(new Set(wave.map((script) => normalize(script[key]))).size === wave.length, `Wave Eleven ${key} values must be unique.`);
}

const allSlugs = new Set(scripts.map((script) => script.slug));
let highestWavePair = { score: 0, pair: "" };
let highestLegacyPair = { score: 0, pair: "" };

for (const script of wave) {
  assert(script.publishedDate === "2026-09-01", `${script.slug}: sandbox publication date is wrong.`);
  assert(script.enhancedSchema === true, `${script.slug}: enhanced schema flag is missing.`);
  assert(script.aboutCallTeam.paragraphs.join(" ").split(/\s+/).length >= 220, `${script.slug}: About CallTeam is below 220 words.`);
  assert(script.faqs.length === 5, `${script.slug}: five FAQs are required.`);
  assert(script.questions.length === 4, `${script.slug}: four qualification questions are required.`);
  assert(script.objections.length === 4, `${script.slug}: four objection responses are required.`);
  assert(script.related.length === 3, `${script.slug}: three related scripts are required.`);
  assert(script.related.every((slug) => allSlugs.has(slug)), `${script.slug}: a related script does not resolve.`);
  assert(articleLinks[script.slug] && articleLinks[script.slug].length >= 2, `${script.slug}: supporting guide links are missing.`);
  assert(!JSON.stringify(script).includes("—"), `${script.slug}: em dash found in public copy.`);

  const pagePath = path.join(output, "resources", "cold-call-scripts", script.slug, "index.html");
  assert(fs.existsSync(pagePath), `${script.slug}: rendered page is missing.`);
  if (!fs.existsSync(pagePath)) continue;
  const html = fs.readFileSync(pagePath, "utf8");
  const types = jsonLdTypes(html);
  ["Article", "BreadcrumbList", "HowTo", "FAQPage"].forEach((type) => assert(types.includes(type), `${script.slug}: ${type} structured data is missing.`));
  assert(html.includes(`<h1>${script.seoTitle}</h1>`), `${script.slug}: H1 does not match the locked SEO title.`);
  assert(html.includes(`<title>${script.seoTitle} | CallTeam</title>`), `${script.slug}: rendered title is wrong.`);
  assert(html.includes(`https://www.callteam.ca/resources/cold-call-scripts/${script.slug}/`), `${script.slug}: canonical URL is missing.`);
  assert((html.match(/<details><summary>/g) || []).length >= 5, `${script.slug}: visible FAQ or objection content is incomplete.`);
  assert(html.includes("About CallTeam"), `${script.slug}: visible About CallTeam section is missing.`);
  assert(html.includes("calendly.com/hello-callteam/new-meeting"), `${script.slug}: booking link is missing.`);

  const current = shingles(publicCopy(script));
  for (const other of wave) {
    if (other.id <= script.id) continue;
    const score = jaccard(current, shingles(publicCopy(other)));
    if (score > highestWavePair.score) highestWavePair = { score, pair: `${script.slug} / ${other.slug}` };
    assert(score < 0.12, `${script.slug} and ${other.slug}: Wave Eleven five-word similarity is ${score.toFixed(3)}.`);
  }
  for (const other of legacy) {
    const score = jaccard(current, shingles(publicCopy(other)));
    if (score > highestLegacyPair.score) highestLegacyPair = { score, pair: `${script.slug} / ${other.slug}` };
    assert(score < 0.12, `${script.slug} and ${other.slug}: legacy five-word similarity is ${score.toFixed(3)}.`);
  }
}

const sitemap = fs.readFileSync(path.join(output, "sitemap.xml"), "utf8");
for (const script of wave) {
  const url = `https://www.callteam.ca/resources/cold-call-scripts/${script.slug}/`;
  assert((sitemap.match(new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length === 1, `${script.slug}: sitemap URL must appear once.`);
}

if (failures.length) {
  console.error(`Wave Eleven validation failed with ${failures.length} problem(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Wave Eleven validation passed for ${wave.length} scripts. Highest new-pair similarity: ${highestWavePair.score.toFixed(3)} (${highestWavePair.pair}). Highest legacy comparison: ${highestLegacyPair.score.toFixed(3)} (${highestLegacyPair.pair}).`);
