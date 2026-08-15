const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const sourcePath = path.join(root, "src", "about.njk");
const outputPath = path.join(root, "_site", "about", "index.html");

function fail(message) {
  console.error(`About page validation failed: ${message}`);
  process.exit(1);
}

function requireFile(filePath) {
  if (!fs.existsSync(filePath)) fail(`missing ${path.relative(root, filePath)}`);
  return fs.readFileSync(filePath, "utf8");
}

const source = requireFile(sourcePath);
const html = requireFile(outputPath);
const navigation = requireFile(path.join(root, "src", "_data", "navigation.json"));
const footer = requireFile(path.join(root, "src", "_includes", "partials", "footer.njk"));
const articleLayout = requireFile(path.join(root, "src", "_includes", "layouts", "article.njk"));

if (source.includes("—") || source.includes("–")) fail("replace em or en dashes with natural punctuation");
if ((html.match(/<h1\b/g) || []).length !== 1) fail("page must contain exactly one H1");
if (!html.includes('<link rel="canonical" href="https://www.callteam.ca/about/">')) fail("missing canonical URL");
if (!html.includes('<meta name="robots" content="index, follow')) fail("page must be indexable");
if (!html.includes('class="about-page"')) fail("missing About page layout marker");

for (const marker of [
  '"@type": "AboutPage"',
  '"@type": "Organization"',
  '"@type": "OfferCatalog"',
  '"@type": "FAQPage"',
  '"contactPoint"',
  '"areaServed"',
  '"knowsAbout"',
  '"hasOfferCatalog"'
]) {
  if (!html.includes(marker)) fail(`missing entity marker ${marker}`);
}

const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
if (jsonLdBlocks.length < 2) fail("expected shared and About page JSON-LD graphs");
for (const [index, match] of jsonLdBlocks.entries()) {
  try {
    JSON.parse(match[1]);
  } catch (error) {
    fail(`JSON-LD block ${index + 1} is invalid: ${error.message}`);
  }
}

const visibleFaqCount = (html.match(/<details(?:\s|>)/g) || []).length;
const aboutGraph = JSON.parse(jsonLdBlocks[1][1]);
const faqNode = aboutGraph["@graph"].find((node) => node["@type"] === "FAQPage");
if (!faqNode || faqNode.mainEntity.length !== visibleFaqCount) fail("visible FAQ and FAQ schema counts must match");

for (const [name, content] of [["header navigation", navigation], ["footer", footer], ["article About module", articleLayout]]) {
  if (!content.includes('/about/')) fail(`${name} must link to /about/`);
}

const internalLinks = [...html.matchAll(/href="(\/(?!\/|#)[^"?#]*)/g)].map((match) => match[1]);
for (const href of new Set(internalLinks)) {
  const relative = href.endsWith("/") ? `${href.slice(1)}index.html` : href.slice(1);
  if (!fs.existsSync(path.join(root, "_site", relative))) fail(`broken internal link ${href}`);
}

console.log(`About page validation passed with ${visibleFaqCount} FAQs and ${new Set(internalLinks).size} internal links.`);
