const scripts = require("../src/_data/callScripts.js");

const failures = [];
const waveSixIds = new Set(["CT-R031", "CT-R032", "CT-R033", "CT-R034", "CT-R035"]);
const waveSevenIds = new Set(["CT-R036", "CT-R037", "CT-R038", "CT-R039", "CT-R040"]);
const waveEightIds = new Set(["CT-R041", "CT-R042", "CT-R043", "CT-R044", "CT-R045"]);
const waveNineIds = new Set(["CT-R046", "CT-R047", "CT-R048", "CT-R049", "CT-R050"]);
const waveTenIds = new Set(["CT-R051", "CT-R052", "CT-R053", "CT-R054", "CT-R055", "CT-R056", "CT-R057", "CT-R058", "CT-R059", "CT-R060"]);
const forbidden = [
  "Beyonk", "Vynyl", "UnDesked", "SeQent", "QuickBooks", "Acumatica", "NetSuite",
  "JPMorgan", "JP Morgan", "Chase Payment", "Software Lens", "Flowfinity", "Concierto", "Trianz",
];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function words(text) {
  return text.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter((word) => word.length > 2);
}

function trigrams(text) {
  const tokens = words(text);
  return new Set(tokens.slice(0, -2).map((word, index) => `${word} ${tokens[index + 1]} ${tokens[index + 2]}`));
}

function jaccard(left, right) {
  let intersection = 0;
  left.forEach((value) => { if (right.has(value)) intersection += 1; });
  return intersection / (left.size + right.size - intersection || 1);
}

const keys = ["id", "slug", "seoTitle", "metaDescription", "primaryKeyword"];
for (const key of keys) {
  assert(new Set(scripts.map((script) => script[key].toLowerCase())).size === scripts.length, `${key} values must be unique.`);
}

for (const script of scripts) {
  assert(script.seoTitle.length >= 30 && script.seoTitle.length <= 68, `${script.slug}: SEO title length is ${script.seoTitle.length}.`);
  assert(script.metaDescription.length >= 120 && script.metaDescription.length <= 180, `${script.slug}: meta description length is ${script.metaDescription.length}.`);
  assert(script.fullScript.length >= 650, `${script.slug}: complete script is too thin (${script.fullScript.length} characters).`);
  assert(script.questions.length >= 3, `${script.slug}: needs at least three discovery questions.`);
  assert(script.objections.length >= 3, `${script.slug}: needs at least three objections.`);
  assert(script.alternatives.length >= 3, `${script.slug}: needs at least three alternative versions.`);
  assert(script.personalization.length >= 4, `${script.slug}: needs at least four personalization instructions.`);
  const publicText = JSON.stringify(script);
  forbidden.forEach((term) => assert(!new RegExp(term, "i").test(publicText), `${script.slug}: private identifier ${term} found.`));
  if (waveSixIds.has(script.id) || waveSevenIds.has(script.id) || waveEightIds.has(script.id) || waveNineIds.has(script.id) || waveTenIds.has(script.id)) {
    assert(!publicText.includes("—"), `${script.slug}: em dash found in new public content.`);
    assert(script.whyBreakdown.length === 4, `${script.slug}: needs four distinct why-it-works points.`);
    assert(script.signalRadar && script.signalRadar.signals.length === 4, `${script.slug}: needs four Buyer Signal Radar inputs.`);
    assert(script.aboutCallTeam.paragraphs.join(" ").split(/\s+/).length >= 220, `${script.slug}: expanded About CallTeam section is too thin.`);
    const sentences = script.aboutCallTeam.paragraphs
      .flatMap((paragraph) => paragraph.split(/(?<=[.!?])\s+/))
      .map((sentence) => sentence.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim())
      .filter((sentence) => sentence.length > 50);
    assert(new Set(sentences).size === sentences.length, `${script.slug}: repeated About CallTeam sentence found.`);
  }
  if (waveTenIds.has(script.id)) {
    assert(script.enhancedSchema === true, `${script.slug}: enhanced structured-data flag is missing.`);
    assert(script.faqs.length === 5, `${script.slug}: expected five buyer-intent FAQs.`);
    assert(script.questions.length === 4, `${script.slug}: expected four focused qualification questions.`);
    assert(script.objections.length === 4, `${script.slug}: expected four market-specific objection responses.`);
  }
}

let highest = { score: 0, pair: "" };
for (let left = 0; left < scripts.length; left += 1) {
  const leftSet = trigrams(`${scripts[left].fullScript} ${scripts[left].whyItWorks} ${scripts[left].personalization.join(" ")}`);
  for (let right = left + 1; right < scripts.length; right += 1) {
    const rightSet = trigrams(`${scripts[right].fullScript} ${scripts[right].whyItWorks} ${scripts[right].personalization.join(" ")}`);
    const score = jaccard(leftSet, rightSet);
    if (score > highest.score) highest = { score, pair: `${scripts[left].slug} / ${scripts[right].slug}` };
    assert(score < 0.35, `Possible content cannibalization: ${scripts[left].slug} and ${scripts[right].slug} scored ${score.toFixed(3)}.`);
  }
}

if (failures.length) {
  console.error(`Script content validation failed with ${failures.length} problem(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Script content validation passed for ${scripts.length} resources. Highest pairwise similarity: ${highest.score.toFixed(3)} (${highest.pair}).`);
