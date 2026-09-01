const fs = require("fs");
const path = require("path");
const scripts = require("../src/_data/callScripts.js");
const scriptArticleLinks = require("../src/_data/scriptArticleLinks.js");

const root = path.resolve(__dirname, "..");
const output = path.join(root, "_site");
const failures = [];
const newResourceIds = new Set(["CT-R002", "CT-R008", "CT-R010", "CT-R011", "CT-R012", "CT-R015", "CT-R017", "CT-R023", "CT-R024", "CT-R026", "CT-R004", "CT-R005", "CT-R006", "CT-R014"]);
const waveFourIds = new Set(["CT-R016", "CT-R018", "CT-R019", "CT-R020", "CT-R021"]);
const waveFiveIds = new Set(["CT-R007", "CT-R013", "CT-R027", "CT-R028", "CT-R030"]);
const waveSixIds = new Set(["CT-R031", "CT-R032", "CT-R033", "CT-R034", "CT-R035"]);
const waveSevenIds = new Set(["CT-R036", "CT-R037", "CT-R038", "CT-R039", "CT-R040"]);
const waveEightIds = new Set(["CT-R041", "CT-R042", "CT-R043", "CT-R044", "CT-R045"]);
const waveNineIds = new Set(["CT-R046", "CT-R047", "CT-R048", "CT-R049", "CT-R050"]);
const waveTenIds = new Set(["CT-R051", "CT-R052", "CT-R053", "CT-R054", "CT-R055", "CT-R056", "CT-R057", "CT-R058", "CT-R059", "CT-R060"]);
const waveElevenIds = new Set(["CT-R061", "CT-R062", "CT-R063", "CT-R064", "CT-R065", "CT-R066", "CT-R067", "CT-R068", "CT-R069", "CT-R070"]);
const forbiddenPublicTerms = ["Beyonk", "Vynyl", "UnDesked", "SeQent", "QuickBooks", "Acumatica", "NetSuite", "JPMorgan", "JP Morgan", "Chase Payment", "Software Lens", "Flowfinity", "Concierto", "Trianz"];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function read(relativePath) {
  const absolutePath = path.join(output, relativePath);
  assert(fs.existsSync(absolutePath), `Missing generated file: ${relativePath}`);
  return fs.existsSync(absolutePath) ? fs.readFileSync(absolutePath, "utf8") : "";
}

function validateJsonLd(html, pageName) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => match[1]);
  assert(blocks.length > 0, `${pageName}: JSON-LD is missing.`);
  blocks.forEach((block, index) => {
    try {
      JSON.parse(block);
    } catch (error) {
      failures.push(`${pageName}: JSON-LD block ${index + 1} is invalid (${error.message}).`);
    }
  });
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

function resolveInternalUrl(url, sourceFile) {
  const hashIndex = url.indexOf("#");
  const queryIndex = url.indexOf("?");
  const end = [hashIndex, queryIndex].filter((value) => value >= 0).reduce((min, value) => Math.min(min, value), url.length);
  const pathname = url.slice(0, end);
  const fragment = hashIndex >= 0 ? url.slice(hashIndex + 1) : "";
  let target;

  if (!pathname) {
    target = sourceFile;
  } else {
    const cleanPath = decodeURIComponent(pathname.replace(/^\//, ""));
    const direct = path.join(output, cleanPath);
    if (fs.existsSync(direct) && fs.statSync(direct).isFile()) {
      target = direct;
    } else if (path.extname(cleanPath)) {
      target = direct;
    } else {
      target = path.join(output, cleanPath, "index.html");
    }
  }

  return { target, fragment };
}

assert(fs.existsSync(output), "Build output is missing. Run npm run build first.");
assert(scripts.length === 70, `Expected 70 scripts, found ${scripts.length}.`);
assert(new Set(scripts.map((script) => script.id)).size === scripts.length, "Resource IDs must be unique.");
assert(new Set(scripts.map((script) => script.slug)).size === scripts.length, "Resource slugs must be unique.");
assert(new Set(scripts.map((script) => script.seoTitle)).size === scripts.length, "SEO titles must be unique.");

const hub = read("resources/cold-call-scripts/index.html");
const stylesheet = read("assets/css/style.css");
assert((hub.match(/<article class="script-card" data-script-card/g) || []).length === scripts.length, `Hub should contain ${scripts.length} script cards.`);
assert(hub.includes('id="script-search-input"'), "Hub search input is missing.");
assert(/\.script-card\[hidden\]\s*{[^}]*display:\s*none\s*;?[^}]*}/s.test(stylesheet), "Hidden script cards must be removed from the rendered grid.");
assert(hub.includes("CollectionPage") && hub.includes("ItemList"), "Hub structured data is incomplete.");
assert(hub.includes("index, follow"), "Hub is not indexable.");
validateJsonLd(hub, "script hub");

for (const script of scripts) {
  const relativePath = `resources/cold-call-scripts/${script.slug}/index.html`;
  const html = read(relativePath);
  const renderedSeoTitle = script.seoTitle.replaceAll("&", "&amp;");
  assert(html.includes(`<title>${renderedSeoTitle} | CallTeam</title>`), `${script.slug}: incorrect title.`);
  assert(html.includes(`https://www.callteam.ca/resources/cold-call-scripts/${script.slug}/`), `${script.slug}: canonical URL missing.`);
  assert(html.includes(script.metaDescription), `${script.slug}: meta description missing.`);
  assert(html.includes('id="full-script"'), `${script.slug}: complete script block missing.`);
  assert(html.includes("data-copy-target=\"full-script\""), `${script.slug}: copy control missing.`);
  assert(html.includes("Want CallTeam to run the campaign?"), `${script.slug}: inline campaign conversion CTA missing.`);
  assert(html.includes("Book a B2B Strategy Call"), `${script.slug}: inline booking link missing.`);
  assert(html.includes("script-objection-list"), `${script.slug}: objection section missing.`);
  assert(html.includes("script-related-grid"), `${script.slug}: related-script section missing.`);
  assert(html.includes("script-service-grid"), `${script.slug}: service links missing.`);
  assert(html.includes("class=\"site-header\""), `${script.slug}: shared header missing.`);
  assert(html.includes("<footer>"), `${script.slug}: shared footer missing.`);
  assert(html.includes("calendly.com/hello-callteam/new-meeting"), `${script.slug}: booking CTA missing.`);
  assert(html.includes('href="/#contact"'), `${script.slug}: contact navigation missing.`);
  assert(html.includes("index, follow"), `${script.slug}: page is not indexable.`);
  assert(!/martal|white[ -]?label/i.test(html), `${script.slug}: legacy identifier found.`);
  assert(script.related.length === 3, `${script.slug}: expected three related scripts.`);
  assert(script.related.every((slug) => scripts.some((candidate) => candidate.slug === slug)), `${script.slug}: unresolved related-script slug.`);
  assert(script.relevantServices.length === 3, `${script.slug}: expected three relevant services.`);
  if (newResourceIds.has(script.id) || waveFourIds.has(script.id) || waveFiveIds.has(script.id) || waveSixIds.has(script.id) || waveSevenIds.has(script.id) || waveEightIds.has(script.id) || waveNineIds.has(script.id) || waveTenIds.has(script.id) || waveElevenIds.has(script.id)) {
    const expectedDate = waveElevenIds.has(script.id) ? "2026-09-01" : waveTenIds.has(script.id) ? "2026-08-29" : waveSixIds.has(script.id) || waveSevenIds.has(script.id) || waveEightIds.has(script.id) || waveNineIds.has(script.id) ? "2026-08-23" : waveFiveIds.has(script.id) || waveFourIds.has(script.id) ? "2026-08-17" : "2026-08-16";
    assert(script.publishedDate === expectedDate, `${script.slug}: incorrect publication date.`);
    assert(script.campaignPlan, `${script.slug}: campaign plan missing.`);
    assert(script.faqs && script.faqs.length >= 2, `${script.slug}: campaign FAQs missing.`);
    assert(html.includes("How to use this script for B2B appointment setting"), `${script.slug}: appointment-setting section missing.`);
    assert(html.includes("Using this script in a real outbound campaign"), `${script.slug}: campaign FAQ section missing.`);
    forbiddenPublicTerms.forEach((term) => assert(!new RegExp(term, "i").test(html), `${script.slug}: private identifier ${term} found.`));
  }
  if (waveFourIds.has(script.id) || waveFiveIds.has(script.id) || waveSixIds.has(script.id) || waveSevenIds.has(script.id) || waveEightIds.has(script.id) || waveNineIds.has(script.id) || waveTenIds.has(script.id) || waveElevenIds.has(script.id)) {
    assert(script.aboutCallTeam, `${script.slug}: About CallTeam authority section missing.`);
    assert(html.includes("About CallTeam"), `${script.slug}: About CallTeam section was not rendered.`);
    assert(html.includes("B2B lead generation"), `${script.slug}: B2B lead-generation positioning is missing.`);
  }
  if (waveSixIds.has(script.id) || waveSevenIds.has(script.id) || waveEightIds.has(script.id) || waveNineIds.has(script.id) || waveTenIds.has(script.id) || waveElevenIds.has(script.id)) {
    assert(script.copyLabel === "Copy this script", `${script.slug}: contextual copy CTA label is incorrect.`);
    assert(html.includes(">Copy this script<"), `${script.slug}: exact Copy this script CTA is missing.`);
    assert(script.signalRadar && script.signalRadar.signals.length === 4, `${script.slug}: Buyer Signal Radar section is incomplete.`);
    assert(html.includes("CallTeam Buyer Signal Radar"), `${script.slug}: Buyer Signal Radar was not rendered.`);
    assert(html.includes("CallTeam AI GTM activation"), `${script.slug}: CallTeam AI GTM activation was not rendered.`);
    assert(script.aboutCallTeam.paragraphs && script.aboutCallTeam.paragraphs.length === 3, `${script.slug}: expanded three-paragraph About CallTeam section is missing.`);
    assert(script.faqs.length >= 5, `${script.slug}: expected five campaign FAQs.`);
    assert(html.includes('id="about-callteam"'), `${script.slug}: About CallTeam anchor is missing.`);
  }
  if (waveTenIds.has(script.id) || waveElevenIds.has(script.id)) {
    assert(html.includes('"@type": "HowTo"'), `${script.slug}: HowTo script structured data is missing.`);
    assert(html.includes('"@type": "FAQPage"'), `${script.slug}: FAQ structured data is missing.`);
    assert(Boolean(scriptArticleLinks[script.slug] && scriptArticleLinks[script.slug].length >= 2), `${script.slug}: supporting industry, buyer or objection links are missing.`);
  }
  validateJsonLd(html, script.slug);
}

const sitemap = read("sitemap.xml");
assert(sitemap.includes("https://www.callteam.ca/resources/cold-call-scripts/"), "Hub is missing from sitemap.");
for (const script of scripts) {
  assert(sitemap.includes(`https://www.callteam.ca/resources/cold-call-scripts/${script.slug}/`), `${script.slug}: missing from sitemap.`);
  const sitemapMatches = sitemap.match(new RegExp(`https://www\\.callteam\\.ca/resources/cold-call-scripts/${script.slug}/`, "g")) || [];
  assert(sitemapMatches.length === 1, `${script.slug}: sitemap entry should occur exactly once.`);
}

const requiredCrossLinks = [
  ["index.html", "/resources/cold-call-scripts/"],
  ["services/b2b-appointment-setting/index.html", "/resources/cold-call-scripts/cybersecurity-risk-assessment-cold-call-script/"],
  ["services/outsourced-sdr/index.html", "/resources/cold-call-scripts/cloud-migration-cold-call-script-for-cios/"],
  ["services/ai-gtm/index.html", "/resources/cold-call-scripts/ai-voice-agent-cold-call-script/"],
  ["ai-lead-generation-services/index.html", "/resources/cold-call-scripts/ai-voice-agent-cold-call-script/"],
  ["articles/outbound-lead-generation/index.html", "/resources/cold-call-scripts/"],
  ["articles/outbound-appointment-setting/index.html", "/resources/cold-call-scripts/"],
  ["articles/outsourced-b2b-appointment-setting/index.html", "/resources/cold-call-scripts/"],
];

for (const [page, href] of requiredCrossLinks) {
  assert(read(page).includes(`href="${href}"`), `${page}: required cross-link ${href} is missing.`);
}

const htmlFiles = walk(output).filter((file) => file.endsWith(".html"));
let checkedLinks = 0;
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const hrefs = [...html.matchAll(/href=["']([^"']+)["']/g)].map((match) => match[1]);
  for (const href of hrefs) {
    if (!href.startsWith("/") && !href.startsWith("#")) continue;
    if (href.startsWith("//")) continue;
    checkedLinks += 1;
    const { target, fragment } = resolveInternalUrl(href, file);
    assert(fs.existsSync(target), `${path.relative(output, file)}: broken internal link ${href}`);
    if (fragment && fs.existsSync(target) && target.endsWith(".html")) {
      const targetHtml = fs.readFileSync(target, "utf8");
      const escaped = fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      assert(new RegExp(`(?:id|name)=["']${escaped}["']`).test(targetHtml), `${path.relative(output, file)}: missing fragment target ${href}`);
    }
  }
}

if (failures.length) {
  console.error(`Script library validation failed with ${failures.length} problem(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Script library validation passed: ${scripts.length} resource pages, hub, sitemap, required cross-links, and ${checkedLinks} internal links checked.`);
