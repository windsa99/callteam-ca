const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const src = path.join(root, "src");
const articlesDir = path.join(src, "articles");
const failures = [];

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function source(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function frontMatter(contents, file) {
  const match = contents.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    failures.push(`${file}: missing front matter`);
    return "";
  }
  return match[1];
}

function quotedValue(frontMatterText, key) {
  const match = frontMatterText.match(new RegExp(`^${key}:\\s*["']([^"']+)["']\\s*$`, "m"));
  return match ? match[1] : "";
}

function hasTopLevelKey(frontMatterText, key) {
  return new RegExp(`^${key}:`, "m").test(frontMatterText);
}

function topLevelBlock(frontMatterText, key) {
  const match = frontMatterText.match(new RegExp(`^${key}:\\s*\\r?\\n([\\s\\S]*?)(?=^[A-Za-z][A-Za-z0-9]*:|(?![\\s\\S]))`, "m"));
  return match ? match[1] : "";
}

function listCount(frontMatterText, key, itemKey) {
  return (topLevelBlock(frontMatterText, key).match(new RegExp(`^\\s{2}- ${itemKey}:`, "gm")) || []).length;
}

function wordCount(text) {
  return (text.match(/\b[\w’'-]+\b/g) || []).length;
}

function articleBody(contents) {
  return contents.replace(/^---\r?\n[\s\S]*?\r?\n---\s*/, "");
}

function proseParagraphs(body) {
  return body.split(/\r?\n\s*\r?\n/).filter((paragraph) => {
    const value = paragraph.trim();
    return value && !/^(#{1,6}\s|[-*]\s|\d+\.\s|\||>)/.test(value);
  });
}

function normalizedSentences(body) {
  return body
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_#|]/g, "")
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.replace(/\s+/g, " ").trim())
    .filter((sentence) => wordCount(sentence) >= 9);
}

function failUnless(condition, file, message) {
  if (!condition) failures.push(`${file}: ${message}`);
}

const pageFiles = walk(src).filter((file) => /\.(md|njk)$/.test(file));
const knownPermalinks = new Set(["/"]);

for (const file of pageFiles) {
  const contents = fs.readFileSync(file, "utf8");
  const relativePath = path.relative(root, file);
  const match = contents.match(/^permalink:\s*["']([^"']+)["']/m);
  if (!match) continue;

  const permalink = match[1];
  knownPermalinks.add(permalink);

  if (permalink.endsWith("/")) {
    const data = frontMatter(contents, relativePath);
    const canonical = quotedValue(data, "canonicalUrl");
    failUnless(canonical === `https://www.callteam.ca${permalink}`, relativePath, "canonicalUrl must match the page permalink");
    failUnless(hasTopLevelKey(data, "modified") || hasTopLevelKey(data, "date"), relativePath, "missing sitemap lastmod source (modified or date)");
  }
}

const articleFiles = fs.readdirSync(articlesDir)
  .filter((file) => file.endsWith(".md"))
  .sort();

const sentencesAcrossArticles = new Map();

for (const filename of articleFiles) {
  const relativePath = path.join("src", "articles", filename);
  const contents = source(relativePath);
  const data = frontMatter(contents, relativePath);
  const permalink = quotedValue(data, "permalink");
  const canonical = quotedValue(data, "canonicalUrl");
  const seoTitle = quotedValue(data, "seoTitle");
  const description = quotedValue(data, "description");
  const quickAnswer = quotedValue(data, "quickAnswer");
  const faqCount = listCount(data, "faqs", "question");
  const cardCount = listCount(data, "cards", "title");
  const readNextCount = listCount(data, "readNext", "title");
  const body = articleBody(contents);
  const bodyWords = wordCount(body);
  const h2Count = (body.match(/^##\s+/gm) || []).length;
  const paragraphs = proseParagraphs(body);
  const oneSentenceParagraphs = paragraphs.filter((paragraph) => {
    return (paragraph.match(/[.!?](?:[”"])?(?=\s|$)/g) || []).length <= 1;
  }).length;
  const oneSentenceRatio = paragraphs.length ? oneSentenceParagraphs / paragraphs.length : 1;

  for (const key of [
    "title", "seoTitle", "description", "date", "modified", "category",
    "permalink", "canonicalUrl", "cluster", "articleType", "topics",
    "quickAnswer", "cardsHeading", "cards", "relatedService", "relatedCaseStudy", "faqs", "sources", "readNext"
  ]) {
    failUnless(hasTopLevelKey(data, key), relativePath, `missing required ${key} field`);
  }

  failUnless(canonical === `https://www.callteam.ca${permalink}`, relativePath, "canonicalUrl must match the page permalink");
  failUnless(seoTitle.length > 0 && seoTitle.length <= 65, relativePath, `seoTitle must be 65 characters or fewer (found ${seoTitle.length})`);
  failUnless(description.length >= 100 && description.length <= 165, relativePath, `description must be 100-165 characters (found ${description.length})`);
  failUnless(faqCount >= 5 && faqCount <= 8, relativePath, `FAQ count must be 5-8 (found ${faqCount})`);
  failUnless(cardCount >= 3 && cardCount <= 5, relativePath, `takeaway count must be 3-5 (found ${cardCount})`);
  failUnless(readNextCount >= 3 && readNextCount <= 4, relativePath, `readNext count must be 3-4 (found ${readNextCount})`);
  failUnless(wordCount(quickAnswer) >= 35 && wordCount(quickAnswer) <= 80, relativePath, `quickAnswer must be 35-80 words (found ${wordCount(quickAnswer)})`);
  failUnless(bodyWords >= 1000 && bodyWords <= 3200, relativePath, `article body must be 1000-3200 words (found ${bodyWords})`);
  failUnless(h2Count >= 7 && h2Count <= 14, relativePath, `article body must contain 7-14 H2 sections (found ${h2Count})`);
  failUnless(oneSentenceRatio <= 0.55, relativePath, `one-sentence paragraph ratio must be 55% or lower (found ${Math.round(oneSentenceRatio * 100)}%)`);
  failUnless(!body.includes("—"), relativePath, "replace em dashes with natural sentence structure");
  failUnless(!/^## Where CallTeam fits\s*$/im.test(body), relativePath, "remove generic Where CallTeam fits section; use a contextual service bridge instead");

  for (const [pattern, limit, label] of [
    [/(?:^|[.!?]\s+)That\b/g, 5, "sentences beginning with That"],
    [/(?:^|[.!?]\s+)This is\b/g, 4, "sentences beginning with This is"],
    [/Someone still\b/gi, 2, "Someone still phrasing"],
    [/(?:^|[.!?]\s+)It can\b/g, 5, "sentences beginning with It can"]
  ]) {
    const count = (body.match(pattern) || []).length;
    failUnless(count <= limit, relativePath, `${label} exceeds editorial limit (${count}/${limit})`);
  }

  const localSentences = new Map();
  for (const sentence of normalizedSentences(body)) {
    const normalized = sentence.toLowerCase();
    localSentences.set(normalized, (localSentences.get(normalized) || 0) + 1);
    if (!sentencesAcrossArticles.has(normalized)) sentencesAcrossArticles.set(normalized, new Set());
    sentencesAcrossArticles.get(normalized).add(relativePath);
  }
  for (const [sentence, count] of localSentences) {
    failUnless(count === 1, relativePath, `repeated substantive sentence ${count} times: "${sentence}"`);
  }

  const internalUrls = [...data.matchAll(/^\s+url:\s*["'](\/[^"']+)["']/gm)].map((match) => match[1]);
  for (const url of internalUrls) {
    const target = url.split("#")[0];
    failUnless(knownPermalinks.has(target), relativePath, `internal relationship target does not exist: ${url}`);
  }
}

for (const [sentence, files] of sentencesAcrossArticles) {
  if (files.size > 1) {
    failures.push(`article library: duplicated substantive sentence across ${[...files].join(", ")}: "${sentence}"`);
  }
}

const articleHub = frontMatter(source("src/articles/index.njk"), "src/articles/index.njk");
for (const key of ["canonicalUrl", "modified", "description"]) {
  failUnless(hasTopLevelKey(articleHub, key), "src/articles/index.njk", `missing required ${key} field`);
}

const articleLayout = source("src/_includes/layouts/article.njk");
for (const marker of [
  '"@type": "BlogPosting"', '"@type": "WebPage"', '"@type": "BreadcrumbList"',
  '"@type": "FAQPage"', '"datePublished"', '"dateModified"', '"mainEntityOfPage"',
  '"author"', '"publisher"', 'class="quick-answer"', 'class="article-about"',
  'class="article-summary-list"', 'class="article-summary-number"',
  "relatedService", "relatedCaseStudy"
]) {
  failUnless(articleLayout.includes(marker), "src/_includes/layouts/article.njk", `missing engine marker: ${marker}`);
}
failUnless(!articleLayout.includes("nofollow"), "src/_includes/layouts/article.njk", "editorial source links must not use blanket nofollow");
failUnless(!/article-takeaways[\s\S]{0,500}service-grid/.test(articleLayout), "src/_includes/layouts/article.njk", "takeaways must not use the full service-card grid");

const hubTemplate = source("src/articles/index.njk");
failUnless(!/Read more/i.test(hubTemplate), "src/articles/index.njk", "replace generic Read more anchors with descriptive text");
for (const cluster of [
  "B2B Lead Generation", "Outbound Calling and Sales Development",
  "AI Lead Generation and AI GTM", "Sales Tools and Revenue Systems"
]) {
  failUnless(hubTemplate.includes(cluster), "src/articles/index.njk", `missing topic cluster: ${cluster}`);
}

const baseLayout = source("src/_includes/layouts/base.njk");
for (const marker of ["rel=\"canonical\"", "site.organizationId", "site.websiteId", '"@type": "Organization"', '"@type": "WebSite"']) {
  failUnless(baseLayout.includes(marker), "src/_includes/layouts/base.njk", `missing shared entity/canonical marker: ${marker}`);
}

const sitemap = source("src/sitemap.njk");
failUnless(sitemap.includes("<lastmod>"), "src/sitemap.njk", "missing sitemap lastmod");
failUnless(!sitemap.includes("<changefreq>"), "src/sitemap.njk", "remove unsupported generic changefreq values");
failUnless(!sitemap.includes("<priority>"), "src/sitemap.njk", "remove unsupported generic priority values");

if (failures.length) {
  console.error(`Article Engine validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Article Engine validation passed for ${articleFiles.length} articles.`);
