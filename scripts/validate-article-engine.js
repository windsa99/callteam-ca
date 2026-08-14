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

for (const filename of articleFiles) {
  const relativePath = path.join("src", "articles", filename);
  const contents = source(relativePath);
  const data = frontMatter(contents, relativePath);
  const permalink = quotedValue(data, "permalink");
  const canonical = quotedValue(data, "canonicalUrl");
  const seoTitle = quotedValue(data, "seoTitle");
  const description = quotedValue(data, "description");
  const faqBlock = data.match(/^faqs:\s*\r?\n([\s\S]*?)(?=^[A-Za-z][A-Za-z0-9]*:|(?![\s\S]))/m);
  const faqCount = faqBlock ? (faqBlock[1].match(/^\s{2}- question:/gm) || []).length : 0;

  for (const key of [
    "title", "seoTitle", "description", "date", "modified", "category",
    "permalink", "canonicalUrl", "cluster", "articleType", "topics",
    "quickAnswer", "relatedService", "relatedCaseStudy", "faqs", "sources", "readNext"
  ]) {
    failUnless(hasTopLevelKey(data, key), relativePath, `missing required ${key} field`);
  }

  failUnless(canonical === `https://www.callteam.ca${permalink}`, relativePath, "canonicalUrl must match the page permalink");
  failUnless(seoTitle.length > 0 && seoTitle.length <= 65, relativePath, `seoTitle must be 65 characters or fewer (found ${seoTitle.length})`);
  failUnless(description.length >= 100 && description.length <= 165, relativePath, `description must be 100-165 characters (found ${description.length})`);
  failUnless(faqCount >= 5 && faqCount <= 8, relativePath, `FAQ count must be 5-8 (found ${faqCount})`);

  const internalUrls = [...data.matchAll(/^\s+url:\s*["'](\/[^"']+)["']/gm)].map((match) => match[1]);
  for (const url of internalUrls) {
    const target = url.split("#")[0];
    failUnless(knownPermalinks.has(target), relativePath, `internal relationship target does not exist: ${url}`);
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
  "relatedService", "relatedCaseStudy"
]) {
  failUnless(articleLayout.includes(marker), "src/_includes/layouts/article.njk", `missing engine marker: ${marker}`);
}
failUnless(!articleLayout.includes("nofollow"), "src/_includes/layouts/article.njk", "editorial source links must not use blanket nofollow");

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
