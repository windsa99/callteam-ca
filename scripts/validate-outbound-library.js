const fs = require("fs");
const path = require("path");
const vm = require("vm");
const outboundLibrary = require("../src/_data/outboundLibrary");
const callScripts = require("../src/_data/callScripts.js");

const root = path.resolve(__dirname, "..");
const output = path.join(root, "_site");
const requiredRoutes = [
  "/resources/outbound-sales-library/",
  "/resources/cold-call-scripts/",
  "/resources/outbound-playbooks/industries/",
  "/resources/outbound-playbooks/buyers/",
  "/articles/cold-call-objection-handling/",
  "/resources/outbound-campaign-strategy/"
];
const bookingUrl = "https://calendly.com/hello-callteam/new-meeting";
const errors = [];

function fail(message) {
  errors.push(message);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function walk(directory, extension, found = []) {
  for (const name of fs.readdirSync(directory)) {
    const target = path.join(directory, name);
    const stat = fs.statSync(target);
    if (stat.isDirectory()) walk(target, extension, found);
    else if (target.endsWith(extension)) found.push(target);
  }
  return found;
}

function routeToFile(route) {
  const pathname = route.split("#")[0].split("?")[0];
  if (pathname === "/") return path.join(output, "index.html");
  if (pathname.endsWith("/")) return path.join(output, pathname, "index.html");
  return path.join(output, pathname);
}

function hasAnchor(html, anchor) {
  if (!anchor) return true;
  const decoded = decodeURIComponent(anchor);
  return html.includes(`id="${decoded}"`) || html.includes(`name="${decoded}"`);
}

function checkFinderInteractions() {
  class TestElement {
    constructor(attributes = {}) {
      this.attributes = attributes;
      this.hidden = false;
      this.value = "";
      this.textContent = "";
      this.listeners = {};
      this.classList = { toggle: (name, on) => { if (name === "is-active") this.active = on; } };
    }
    getAttribute(name) { return this.attributes[name] || null; }
    setAttribute(name, value) { this.attributes[name] = String(value); }
    addEventListener(type, callback) { this.listeners[type] = callback; }
    dispatch(type) { if (this.listeners[type]) this.listeners[type]({ preventDefault() {} }); }
  }

  const input = new TestElement();
  const count = new TestElement();
  const empty = new TestElement();
  const more = new TestElement();
  const all = new TestElement({ "data-library-filter": "all" });
  const scripts = new TestElement({ "data-library-filter": "scripts" });
  const cards = [
    new TestElement({ "data-track": "scripts", "data-search": "saas demo script" }),
    new TestElement({ "data-track": "industries", "data-search": "healthcare software" }),
    new TestElement({ "data-track": "strategy", "data-search": "campaign quality metrics" })
  ];
  const finder = new TestElement({ "data-limit": "2" });
  finder.querySelector = (selector) => ({
    "[data-library-search]": input,
    "[data-library-count]": count,
    "[data-library-empty]": empty,
    "[data-library-more]": more
  }[selector] || null);
  finder.querySelectorAll = (selector) => selector === "[data-library-filter]" ? [all, scripts] : cards;
  const document = {
    querySelectorAll: (selector) => selector === "[data-resource-finder]" ? [finder] : [],
    querySelector: () => null,
    getElementById: () => null
  };
  vm.runInNewContext(read(path.join(root, "src/assets/js/outbound-library.js")), { document, Event: class Event {} });
  if (cards.filter((card) => !card.hidden).length !== 2) fail("Finder did not apply its initial card limit.");
  scripts.dispatch("click");
  if (!cards[0].hidden && cards[1].hidden && cards[2].hidden && count.textContent.includes("1 of 1")) {
    input.value = "healthcare";
    input.dispatch("input");
    if (!empty.hidden && cards.every((card) => card.hidden)) {
      all.dispatch("click");
      if (cards[0].hidden && !cards[1].hidden && cards[2].hidden) return;
    }
  }
  fail("Finder search/filter interaction test failed.");
}

if (!fs.existsSync(output)) fail("_site does not exist. Run npm run build first.");

const navigation = JSON.parse(read(path.join(root, "src/_data/navigation.json")));
const resources = navigation.find((item) => item.label === "Resources");
if (!resources || resources.url !== requiredRoutes[0]) fail("Resources navigation does not point to the library hub.");
const navigationUrls = resources ? resources.children.map((item) => item.url) : [];
for (const route of requiredRoutes) {
  if (!navigationUrls.includes(route)) fail(`Resources navigation is missing ${route}`);
}

const footerSource = read(path.join(root, "src/_includes/partials/footer.njk"));
for (const route of requiredRoutes) {
  if (!footerSource.includes(`href="${route}"`)) fail(`Footer is missing ${route}`);
}

const articleFiles = walk(path.join(root, "src/articles"), ".md");
if (articleFiles.length !== 127) fail(`Expected 127 article files, found ${articleFiles.length}.`);
for (const file of articleFiles) {
  const slug = path.basename(file, ".md");
  const section = outboundLibrary.primarySectionFor(slug);
  if (!section || !section.url || !section.id) fail(`Article has no primary library section: ${slug}`);
}
if (callScripts.length !== 90) fail(`Expected 90 cold-call scripts, found ${callScripts.length}.`);

for (const route of requiredRoutes) {
  const file = routeToFile(route);
  if (!fs.existsSync(file)) {
    fail(`Required route did not build: ${route}`);
    continue;
  }
  const html = read(file);
  const expectedCanonical = `https://www.callteam.ca${route}`;
  if (!html.includes(`<link rel="canonical" href="${expectedCanonical}">`)) fail(`Canonical mismatch at ${route}`);
  if (!html.includes("BreadcrumbList")) fail(`Breadcrumb structured data missing at ${route}`);
  if (!html.includes(bookingUrl)) fail(`Booking link missing at ${route}`);
}

const hubHtml = read(routeToFile(requiredRoutes[0]));
for (const file of articleFiles) {
  const source = read(file);
  const permalink = source.match(/^permalink:\s*["']?([^"'\n]+)["']?/m);
  if (!permalink) fail(`Missing permalink in ${path.basename(file)}`);
  else if (!hubHtml.includes(`href="${permalink[1]}"`)) fail(`Master library is missing article ${permalink[1]}`);
}
for (const script of callScripts) {
  const url = `/resources/cold-call-scripts/${script.slug}/`;
  if (!hubHtml.includes(`href="${url}"`)) fail(`Master library is missing script ${url}`);
}
if (!hubHtml.includes("data-resource-finder") || !hubHtml.includes("outbound-library.js")) fail("Master library search/filter controls are missing.");
checkFinderInteractions();

const htmlFiles = fs.existsSync(output) ? walk(output, ".html") : [];
const canonicals = new Map();
for (const file of htmlFiles) {
  const html = read(file);
  const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)">/);
  if (!canonicalMatch) fail(`Canonical missing in ${path.relative(output, file)}`);
  else {
    const previous = canonicals.get(canonicalMatch[1]);
    if (previous) fail(`Duplicate canonical ${canonicalMatch[1]} in ${previous} and ${path.relative(output, file)}`);
    canonicals.set(canonicalMatch[1], path.relative(output, file));
  }

  const jsonScripts = Array.from(html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g));
  for (const match of jsonScripts) {
    try { JSON.parse(match[1]); }
    catch (error) { fail(`Invalid JSON-LD in ${path.relative(output, file)}: ${error.message}`); }
  }

  const hrefs = Array.from(html.matchAll(/href="([^"]+)"/g), (match) => match[1]);
  for (const href of hrefs) {
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const [route, anchor] = href.split("#");
    const target = routeToFile(route || "/");
    if (!fs.existsSync(target)) {
      fail(`Broken internal link in ${path.relative(output, file)}: ${href}`);
      continue;
    }
    if (anchor && !hasAnchor(read(target), anchor)) fail(`Broken anchor in ${path.relative(output, file)}: ${href}`);
  }
}

const sitemap = read(path.join(output, "sitemap.xml"));
for (const route of requiredRoutes) {
  if (!sitemap.includes(`<loc>https://www.callteam.ca${route}</loc>`)) fail(`Sitemap is missing ${route}`);
}

const standardArticle = read(path.join(output, "articles/b2b-cold-calling-strategy/index.html"));
if (!standardArticle.includes("Part of the Outbound Sales Library") || !standardArticle.includes("Qualification and Campaign Strategy")) fail("Article library context or primary breadcrumb is missing.");
const scriptArticle = read(path.join(output, "resources/cold-call-scripts/b2b-saas-cold-call-script/index.html"));
if (!scriptArticle.includes("Part of the Outbound Sales Library") || !scriptArticle.includes("Cold-Call Scripts")) fail("Script library context or breadcrumb is missing.");
const objectionPage = read(routeToFile("/articles/cold-call-objection-handling/"));
if (!objectionPage.includes("#not-interested") || !objectionPage.includes("#objections")) fail("Objection database directory or ItemList schema is missing.");

if (errors.length) {
  console.error(`Outbound Sales Library validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Outbound Sales Library validation passed: ${articleFiles.length} articles, ${callScripts.length} scripts, ${htmlFiles.length} HTML pages, all internal links, anchors, canonicals, JSON-LD, sitemap entries and booking links checked.`);
