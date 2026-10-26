const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { parseDocument } = require("htmlparser2");

const CTA_STYLESHEET = "/assets/css/contextual-tools.css";
const COMPONENT = "components/contextual-tool-cta.njk";
const TOOL_DEFINITIONS = Object.freeze({
  campaign: { href: "/b2b-outbound-campaign-planner/", label: "See How We’d Run Your Campaign" },
  roi: { href: "/b2b-lead-generation-roi-calculator/", label: "Calculate Your Campaign ROI" }
});
const BOOKING_URL = "https://calendly.com/hello-callteam/new-meeting";

function parseArticle(contents) {
  if (!/^---\r?\n/.test(contents)) throw new Error("missing YAML front matter");
  const parsed = matter(contents);
  return { data: parsed.data, body: parsed.content };
}

function plainBody(body) {
  // Examples and comments are not rendered calls to the CTA component.
  let fence = null;
  return body.replace(/<!--[^]*?-->/g, "").replace(/{#[^]*?#}/g, "")
    .split(/\r?\n/).map((line) => {
      const marker = line.match(/^\s{0,3}(`{3,}|~{3,})/);
      if (marker) {
        if (!fence) fence = marker[1];
        else if (marker[1][0] === fence[0] && marker[1].length >= fence.length) fence = null;
        return "";
      }
      return fence ? "" : line.replace(/(`+)[^]*?\1/g, "");
    }).join("\n");
}

function words(text) { return (text.match(/[\p{L}\p{N}]+/gu) || []).length; }
function normalized(text) { return String(text || "").replace(/\s+/g, " ").trim(); }
function record(value) { return value !== null && typeof value === "object" && !Array.isArray(value); }
function isLegacy(relativePath, permalink, entries) {
  return entries.some((entry) => entry.path === relativePath && entry.permalink === permalink);
}

function validateArticleSource({ relativePath, contents, legacyEntries = [], pagePermalinks = [] }) {
  const errors = [];
  const fail = (message) => errors.push(`${relativePath}: ${message}`);
  let parsed;
  try { parsed = parseArticle(contents); }
  catch (error) { return { errors: [`${relativePath}: ${error.message}`], exempt: false, selectedTools: [] }; }
  const { data, body } = parsed;
  const exempt = isLegacy(relativePath, data.permalink, legacyEntries);
  const result = { errors, exempt, data, body, selectedTools: [] };
  if (exempt) return result;

  if (legacyEntries.some((entry) => entry.path === relativePath)) {
    fail("a frozen published article path must retain its published permalink");
  }
  if (!/^\/articles\/[a-z0-9]+(?:-[a-z0-9]+)*\/$/.test(data.permalink || "")) {
    fail("future articles require an explicit /articles/lowercase-slug/ permalink");
  }
  if (legacyEntries.some((entry) => entry.permalink === data.permalink)) {
    fail("new article cannot reuse a published article URL");
  }
  if (pagePermalinks.some((entry) => typeof entry === "string"
    ? entry === data.permalink : entry.path !== relativePath && entry.permalink === data.permalink)) {
    fail("article permalink collides with another site page");
  }
  if (data.layout !== "layouts/article.njk") fail("future articles must use layouts/article.njk");
  const intent = data.toolCtaIntent;
  if (!["campaign", "roi", "both"].includes(intent)) {
    fail('toolCtaIntent must be "campaign", "roi", or "both"');
    return result;
  }
  const selected = result.selectedTools = intent === "both" ? ["campaign", "roi"] : [intent];
  if (!Array.isArray(data.pageStyles) || data.pageStyles.filter((url) => url === CTA_STYLESHEET).length !== 1) {
    fail(`pageStyles must include ${CTA_STYLESHEET} exactly once`);
  }
  if (!record(data.contextualTools)) {
    fail("contextualTools must define the selected tool or tools");
    return result;
  }
  if (Object.keys(data.contextualTools).sort().join(",") !== [...selected].sort().join(",")) {
    fail("contextualTools keys must exactly match toolCtaIntent");
  }
  const ids = new Set();
  for (const tool of selected) {
    const config = data.contextualTools[tool];
    if (!record(config)) { fail(`contextualTools.${tool} is missing`); continue; }
    const permitted = ["id", "accessibleName", "copy", "href", "label"];
    if (Object.keys(config).some((key) => !permitted.includes(key))) fail(`${tool}: unsupported CTA configuration field`);
    for (const key of permitted) {
      if (typeof config[key] !== "string" || !config[key].trim()) fail(`${tool}.${key} must be a nonempty string`);
    }
    if (!/^cta-[a-z0-9][a-z0-9-]*$/.test(config.id || "")) fail(`${tool}.id must be a lowercase cta- identifier`);
    if (ids.has(config.id)) fail("CTA IDs must be unique");
    ids.add(config.id);
    if (/[<>]/.test(config.copy || "")) fail(`${tool}.copy must be plain text without HTML`);
    if (/["<>]/.test(config.accessibleName || "")) fail(`${tool}.accessibleName must be safe plain text without double quotes or HTML`);
    if (config.href !== TOOL_DEFINITIONS[tool].href) fail(`${tool}.href must use the approved tool URL`);
    if (config.label !== TOOL_DEFINITIONS[tool].label) fail(`${tool}.label must use the approved button wording`);
  }

  const visible = plainBody(body);
  const includes = [...visible.matchAll(/{%-?\s*include\s+["']components\/contextual-tool-cta\.njk["']\s*-?%}/g)];
  if (includes.length !== selected.length) fail(`body must include ${COMPONENT} exactly ${selected.length} time(s)`);
  const placements = [...visible.matchAll(/{%-?\s*set\s+contextToolCta\s*=\s*contextualTools\.(campaign|roi)\s*-?%}\s*{%-?\s*include\s+["']components\/contextual-tool-cta\.njk["']\s*-?%}/g)];
  const sections = [];
  for (const tool of selected) {
    const matches = placements.filter((match) => match[1] === tool);
    if (matches.length !== 1) { fail(`${tool}: place its explicit set/include component exactly once in the article body`); continue; }
    const before = visible.slice(0, matches[0].index);
    const headings = [...before.matchAll(/^##\s+.+$/gm)];
    const heading = headings[headings.length - 1];
    if (!heading) { fail(`${tool}: place the CTA after relevant H2 advice`); continue; }
    const section = before.slice(heading.index + heading[0].length).replace(/{[%{][^]*?[}%]}/g, "");
    const prose = section.split(/\n\s*\n/).some((paragraph) => {
      const text = paragraph.trim();
      return !/^(#|[-*+]\s|\d+\.\s|\||>|<)/.test(text) && words(text) >= 8;
    });
    if (!prose) fail(`${tool}: explain the topic in a prose paragraph before its CTA`);
    sections.push(heading.index);
  }
  if (placements.length !== selected.length) fail("body has an extra or unselected tool component placement");
  if (selected.length === 2 && sections.length === 2 && sections[0] === sections[1]) {
    fail("place campaign and ROI CTAs in different relevant H2 sections with prose between them");
  }
  return result;
}

function elements(root) {
  const found = [];
  for (const child of root.children || []) {
    if (child.name) found.push(child);
    found.push(...elements(child));
  }
  return found;
}
function textOf(node) { return node.type === "text" ? node.data : (node.children || []).map(textOf).join(""); }
function hasClass(node, name) { return (node.attribs?.class || "").split(/\s+/).includes(name); }
function ancestor(node, test) {
  for (let current = node.parent; current; current = current.parent) if (test(current)) return current;
  return null;
}
function hidden(node) {
  for (let current = node; current?.name; current = current.parent) {
    const attrs = current.attribs || {};
    if ("hidden" in attrs || "inert" in attrs || attrs["aria-hidden"] === "true" ||
        /(?:^|\s)(?:hidden|sr-only|visually-hidden)(?:\s|$)/.test(attrs.class || "") ||
        /(?:display\s*:\s*none|visibility\s*:\s*hidden|opacity\s*:\s*0(?:\D|$))/i.test(attrs.style || "")) return true;
  }
  return false;
}

function validateArticleRendered({ relativePath, contents, html, legacyEntries = [] }) {
  const result = validateArticleSource({ relativePath, contents, legacyEntries });
  if (result.errors.length) return result;
  const { data, selectedTools, errors } = result;
  const fail = (message) => errors.push(`${relativePath}: rendered ${message}`);
  const dom = parseDocument(html, { decodeEntities: true });
  const all = elements(dom);
  const blocks = all.filter((node) => hasClass(node, "context-tool-cta") || "data-context-tool-cta" in (node.attribs || {}));
  // Published articles keep their existing placement rules, but every rendered
  // callout must still contain readable copy and a working, labelled button.
  for (const [index, block] of blocks.entries()) {
    const name = `tool callout ${block.attribs.id || index + 1}`;
    const descendants = elements(block);
    const anchors = descendants.filter((node) => node.name === "a");
    const paragraphs = descendants.filter((node) => node.name === "p");
    if (!normalized(block.attribs.id) || all.filter((node) => node.attribs?.id === block.attribs.id).length !== 1) fail(`${name} needs a unique, nonempty ID`);
    if (!normalized(block.attribs["aria-label"])) fail(`${name} needs an accessible name`);
    if (!paragraphs.some((node) => normalized(textOf(node)))) fail(`${name} has no explanatory copy`);
    if (anchors.length !== 1 || !hasClass(anchors[0], "btn-primary") ||
        !normalized(anchors[0]?.attribs.href) || !normalized(textOf(anchors[0] || {}))) fail(`${name} needs one labelled button with a nonempty destination`);
    if (hidden(block) || anchors.some(hidden)) fail(`${name} must be visible`);
    if ("data-context-tool-cta" in block.attribs && block.attribs["data-context-tool-cta"] !== block.attribs.id) fail(`${name} has a mismatched tracking identifier`);
  }
  const configuredCallouts = [data.contextToolCta, ...Object.values(data.contextualTools || {})].filter(record);
  for (const config of configuredCallouts) {
    if (!normalized(config.id) || blocks.filter((node) => node.attribs.id === config.id).length !== 1) fail(`configured tool callout ${config.id || "without an ID"} is missing or duplicated`);
  }
  if (result.exempt) return result;
  const bodies = all.filter((node) => node.attribs?.id === "article-body");
  const contentAreas = all.filter((node) => hasClass(node, "article-content") && ancestor(node, (parent) => parent.attribs?.id === "article-body"));
  if (bodies.length !== 1 || contentAreas.length !== 1) { fail("article body/content container is missing or duplicated"); return result; }
  const content = contentAreas[0];
  const contentNodes = elements(content);
  if (blocks.length !== selectedTools.length) fail("CTA block count does not match the selected tools");
  const styles = all.filter((node) => node.name === "link" && node.attribs?.href === CTA_STYLESHEET && (node.attribs.rel || "").split(/\s+/).includes("stylesheet"));
  if (styles.length !== 1 || "disabled" in (styles[0]?.attribs || {}) || /print/i.test(styles[0]?.attribs?.media || "")) fail("contextual stylesheet must be enabled exactly once");
  const ids = new Set();
  for (const node of all) {
    if (!node.attribs?.id) continue;
    if (ids.has(node.attribs.id)) fail(`duplicate HTML ID: ${node.attribs.id}`);
    ids.add(node.attribs.id);
  }
  const sectionNodes = [];
  for (const tool of selectedTools) {
    const config = data.contextualTools[tool];
    const matches = blocks.filter((node) => node.attribs.id === config.id);
    if (matches.length !== 1) { fail(`${tool} CTA is missing or duplicated`); continue; }
    const block = matches[0];
    if (block.name !== "aside" || block.attribs["data-context-tool-cta"] !== config.id || !hasClass(block, "context-tool-cta") || !contentNodes.includes(block)) fail(`${tool} CTA must be an aside inside the article content`);
    if (block.attribs["aria-label"] !== config.accessibleName) fail(`${tool} accessible name differs from its source`);
    const descendants = elements(block);
    if ([block, ...descendants].some((node) => hidden(node) || "style" in (node.attribs || {}))) fail(`${tool} CTA must be visible without inline styles or JavaScript`);
    const paragraphs = descendants.filter((node) => node.name === "p");
    if (paragraphs.length !== 1 || normalized(textOf(paragraphs[0])) !== normalized(config.copy)) fail(`${tool} explanatory copy differs from its source`);
    const actions = descendants.filter((node) => hasClass(node, "context-tool-actions"));
    const anchors = descendants.filter((node) => node.name === "a");
    if (actions.length !== 1 || anchors.length !== 1 || anchors[0]?.parent !== actions[0] ||
        !hasClass(anchors[0], "btn-primary") || anchors[0]?.attribs.href !== TOOL_DEFINITIONS[tool].href ||
        normalized(textOf(anchors[0] || {})) !== TOOL_DEFINITIONS[tool].label) fail(`${tool} button must retain the approved label, destination and styling`);
    const position = contentNodes.indexOf(block);
    const previous = contentNodes.slice(0, Math.max(position, 0));
    const h2 = [...previous].reverse().find((node) => node.name === "h2" && !ancestor(node, (parent) => hasClass(parent, "context-tool-cta")));
    const prose = h2 && previous.slice(previous.indexOf(h2) + 1).some((node) => node.name === "p" && !ancestor(node, (parent) => hasClass(parent, "context-tool-cta")) && words(textOf(node)) >= 8 && !hidden(node));
    if (!h2 || hidden(h2) || !prose) fail(`${tool} CTA must follow a visible H2 and explanatory prose`);
    sectionNodes.push(h2);
  }
  if (selectedTools.length === 2 && sectionNodes.length === 2 && sectionNodes[0] === sectionNodes[1]) fail("campaign and ROI CTAs need different H2 sections");
  const booking = all.filter((node) => node.name === "a" && hasClass(node, "btn-light") && normalized(textOf(node)) === "Book a Free Call" &&
    node.attribs.href === (data.ctaUrl || BOOKING_URL) && ancestor(node, (parent) => hasClass(parent, "cta-band")) && !hidden(node));
  if (booking.length !== 1) fail("the existing Book a Free Call conversion CTA must remain visible");
  return result;
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (["_includes", "_data", "node_modules"].includes(entry.name)) return [];
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function inspectProject({ rootDir = path.resolve(__dirname, ".."), siteDir = path.join(rootDir, "_site"), rendered = false } = {}) {
  const manifest = JSON.parse(fs.readFileSync(path.join(rootDir, "scripts/data/article-tool-cta-legacy.json"), "utf8"));
  const legacyEntries = manifest.articles;
  const errors = [];
  if (manifest.version !== 1 || !Array.isArray(legacyEntries) || legacyEntries.length !== 138 ||
      new Set(legacyEntries.map((entry) => entry.path)).size !== 138 || new Set(legacyEntries.map((entry) => entry.permalink)).size !== 138) {
    return { errors: ["The frozen legacy CTA manifest must retain its 138 unique published articles."], legacyCount: 0, futureCount: 0 };
  }
  const pages = [];
  for (const full of walk(path.join(rootDir, "src")).filter((file) => /\.(md|njk)$/.test(file))) {
    const relativePath = path.relative(rootDir, full).split(path.sep).join("/");
    const contents = fs.readFileSync(full, "utf8");
    if (!/^---\r?\n/.test(contents)) {
      if (relativePath.startsWith("src/articles/") && relativePath !== "src/articles/index.njk") pages.push({ relativePath, contents, data: {}, body: contents });
      continue;
    }
    try { pages.push({ relativePath, contents, ...parseArticle(contents) }); }
    catch (error) { errors.push(`${relativePath}: ${error.message}`); }
  }
  const pagePermalinks = pages.filter((page) => typeof page.data.permalink === "string")
    .map((page) => ({ path: page.relativePath, permalink: page.data.permalink }));
  const articles = pages.filter((page) => (page.relativePath.startsWith("src/articles/") && page.relativePath !== "src/articles/index.njk") || page.data.layout === "layouts/article.njk");
  let legacyCount = 0;
  let futureCount = 0;
  for (const article of articles) {
    const options = { relativePath: article.relativePath, contents: article.contents, legacyEntries, pagePermalinks };
    const sourceResult = validateArticleSource(options);
    if (sourceResult.exempt) legacyCount += 1;
    else futureCount += 1;
    errors.push(...sourceResult.errors);
    if (rendered && sourceResult.errors.length === 0) {
      const htmlPath = path.join(siteDir, article.data.permalink, "index.html");
      if (!fs.existsSync(htmlPath)) errors.push(`${article.relativePath}: rendered article is missing`);
      else errors.push(...validateArticleRendered({ ...options, html: fs.readFileSync(htmlPath, "utf8") }).errors);
    }
  }
  for (const tool of Object.values(TOOL_DEFINITIONS)) {
    if (!pagePermalinks.some((entry) => entry.permalink === tool.href)) errors.push(`CTA destination does not exist: ${tool.href}`);
  }
  return { errors, legacyCount, futureCount };
}

module.exports = { TOOL_DEFINITIONS, CTA_STYLESHEET, parseArticle, validateArticleSource, validateArticleRendered, inspectProject };

if (require.main === module) {
  try {
    const args = process.argv.slice(2);
    const readOption = (name) => args.includes(name) ? path.resolve(args[args.indexOf(name) + 1]) : undefined;
    const result = inspectProject({ rootDir: readOption("--root"), siteDir: readOption("--site"), rendered: args.includes("--rendered") });
    if (result.errors.length) {
      console.error(`Article tool CTA checks failed:\n${result.errors.map((error) => `- ${error}`).join("\n")}`);
      process.exitCode = 1;
    } else {
      console.log(`Article tool CTA ${args.includes("--rendered") ? "rendered" : "source"} checks passed: ${result.legacyCount} published articles exempt; ${result.futureCount} future articles validated.${args.includes("--rendered") ? " Rendered callout content and buttons checked for every article, including published articles." : ""}`);
    }
  } catch (error) {
    console.error(`Article tool CTA checks failed: ${error.message}`);
    process.exitCode = 1;
  }
}
