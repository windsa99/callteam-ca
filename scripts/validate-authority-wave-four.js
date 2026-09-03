const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const articleDir = path.join(root, "src", "articles");
const siteDir = path.join(root, "_site");
const sitemap = fs.readFileSync(path.join(siteDir, "sitemap.xml"), "utf8");
const industryHub = fs.readFileSync(path.join(siteDir, "resources", "outbound-playbooks", "industries", "index.html"), "utf8");
const buyerHub = fs.readFileSync(path.join(siteDir, "resources", "outbound-playbooks", "buyers", "index.html"), "utf8");

const pages = [
  ["it-services-outbound-sales-playbook", "IT Services Outbound Sales Playbook", "IT services outbound sales", "industry"],
  ["staffing-recruiting-outbound-sales-playbook", "Staffing and Recruiting Outbound Sales Playbook", "staffing outbound sales", "industry"],
  ["retail-technology-outbound-sales-playbook", "Retail Technology Outbound Sales Playbook", "retail technology outbound sales", "industry"],
  ["marketing-agency-outbound-sales-playbook", "Marketing Agency Outbound Sales Playbook", "marketing agency outbound sales", "industry"],
  ["hospitality-technology-outbound-sales-playbook", "Hospitality Technology Outbound Sales Playbook", "hospitality technology outbound sales", "industry"],
  ["revenue-leader-outbound-sales-playbook", "Revenue Leader Outbound Sales Playbook", "revenue leader outbound sales", "buyer"]
];

const failures = [];
const bodies = new Map();

function fail(message) {
  failures.push(message);
}

function stripFrontmatter(markdown) {
  return markdown.replace(/^---[\s\S]*?---\s*/, "");
}

function plainText(markdown) {
  return stripFrontmatter(markdown)
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_|`]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function shingles(text, size = 7) {
  const words = text.split(/\s+/).filter(Boolean);
  const result = new Set();
  for (let index = 0; index <= words.length - size; index += 1) {
    result.add(words.slice(index, index + size).join(" "));
  }
  return result;
}

function jaccard(left, right) {
  let overlap = 0;
  for (const value of left) if (right.has(value)) overlap += 1;
  return overlap / (left.size + right.size - overlap || 1);
}

for (const [slug, title, primaryKeyword, track] of pages) {
  const sourcePath = path.join(articleDir, `${slug}.md`);
  const renderedPath = path.join(siteDir, "articles", slug, "index.html");
  if (!fs.existsSync(sourcePath)) {
    fail(`${slug}: source article is missing.`);
    continue;
  }
  if (!fs.existsSync(renderedPath)) {
    fail(`${slug}: rendered article is missing.`);
    continue;
  }

  const source = fs.readFileSync(sourcePath, "utf8");
  const rendered = fs.readFileSync(renderedPath, "utf8");
  const body = plainText(source);
  const wordCount = body.split(/\s+/).filter(Boolean).length;
  bodies.set(slug, shingles(body));

  if (!source.includes(`title: "${title}"`)) fail(`${slug}: expected title is missing.`);
  if (!source.toLowerCase().includes(primaryKeyword.toLowerCase())) fail(`${slug}: primary keyword is missing.`);
  if (!source.includes(`permalink: "/articles/${slug}/"`)) fail(`${slug}: permalink is wrong.`);
  if (!source.includes(`canonicalUrl: "https://www.callteam.ca/articles/${slug}/"`)) fail(`${slug}: canonical is wrong.`);
  if (!source.includes("aboutParagraphSpacing: true")) fail(`${slug}: About CallTeam paragraph spacing is not enabled.`);
  if (source.includes("—")) fail(`${slug}: em dash found.`);
  if (wordCount < 1000) fail(`${slug}: body has only ${wordCount} words.`);
  if (!rendered.includes("application/ld+json")) fail(`${slug}: JSON-LD is missing.`);
  for (const schema of ["BreadcrumbList", "FAQPage"]) {
    if (!rendered.includes(`\"@type\":\"${schema}\"`) && !rendered.includes(`\"@type\": \"${schema}\"`)) {
      fail(`${slug}: ${schema} schema is missing.`);
    }
  }
  if (!rendered.includes(`\"@type\":\"Article\"`) && !rendered.includes(`\"@type\": \"Article\"`) && !rendered.includes(`\"@type\":\"BlogPosting\"`) && !rendered.includes(`\"@type\": \"BlogPosting\"`)) {
    fail(`${slug}: Article or BlogPosting schema is missing.`);
  }
  if (!rendered.includes(`https://www.callteam.ca/articles/${slug}/`)) fail(`${slug}: rendered canonical URL is missing.`);
  if (!sitemap.includes(`https://www.callteam.ca/articles/${slug}/`)) fail(`${slug}: sitemap entry is missing.`);
  const expectedHub = track === "buyer" ? buyerHub : industryHub;
  if (!expectedHub.includes(`/articles/${slug}/`)) fail(`${slug}: missing from ${track} hub.`);
  if (!rendered.includes("https://calendly.com/hello-callteam/new-meeting")) fail(`${slug}: booking link is missing.`);
}

const entries = [...bodies.entries()];
for (let left = 0; left < entries.length; left += 1) {
  for (let right = left + 1; right < entries.length; right += 1) {
    const score = jaccard(entries[left][1], entries[right][1]);
    if (score > 0.09) fail(`${entries[left][0]} and ${entries[right][0]} have excessive seven-word similarity: ${(score * 100).toFixed(2)}%.`);
  }
}

if (failures.length) {
  console.error(`Authority Wave 4 validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Authority Wave 4 validation passed: six canonical pages, rendered routes, hubs, schema, sitemap, booking links and similarity checked.");
