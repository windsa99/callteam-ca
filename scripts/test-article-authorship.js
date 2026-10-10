const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = path.resolve(__dirname, "..");
const authors = require(path.join(root, "src/_data/authors.json"));
const site = require(path.join(root, "src/_data/site.json"));
const articles = fs.readdirSync(path.join(root, "src/articles")).filter((file) => file.endsWith(".md"));

function nodes(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .flatMap((match) => {
      const data = JSON.parse(match[1]);
      return data["@graph"] || [data];
    });
}

for (const filename of articles) {
  const source = fs.readFileSync(path.join(root, "src/articles", filename), "utf8");
  const front = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1];
  const authorKey = front.match(/^authorKey:\s*"([^"]+)"\s*$/m)?.[1];
  const permalink = front.match(/^permalink:\s*"([^"]+)"\s*$/m)?.[1];
  const author = authors[authorKey];
  assert(author && permalink, `${filename}: missing author or permalink`);
  const html = fs.readFileSync(path.join(root, "_site", permalink, "index.html"), "utf8");
  const byline = html.match(/<div class="article-byline">([\s\S]*?)<\/div>/)?.[1];
  assert(byline, `${filename}: missing byline`);
  assert.strictEqual((byline.match(/Written by /g) || []).length, 1, `${filename}: duplicate or absent author`);
  assert(byline.includes(`Written by <a href="${author.url}" rel="author">${author.name}</a>`), `${filename}: incorrect linked author`);
  assert(byline.includes('Published by <a href="/">CallTeam</a>'), `${filename}: publisher missing`);
  const article = nodes(html).find((node) => node["@type"] === "BlogPosting");
  assert.deepStrictEqual(article.author, {
    "@type": "Person", "@id": author.id, name: author.name, url: site.url + author.url
  }, `${filename}: visible author and schema must agree`);
  assert.strictEqual(article.publisher["@id"], site.organizationId, `${filename}: publisher changed`);
  assert(html.includes('name="_gotcha"') && html.includes('action="https://formspree.io/f/xbdvejea"'), `${filename}: shared form guard missing`);
}

for (const author of Object.values(authors)) {
  const html = fs.readFileSync(path.join(root, "_site", author.url, "index.html"), "utf8");
  const graph = nodes(html);
  const person = graph.find((node) => node["@type"] === "Person" && node["@id"] === author.id);
  const profile = graph.find((node) => node["@type"] === "ProfilePage");
  assert(person && profile, `${author.name}: missing profile or person`);
  assert.strictEqual(person.name, author.name);
  assert.strictEqual(profile.mainEntity["@id"], person["@id"]);
  assert.strictEqual(person.url, site.url + author.url);
  for (const property of ["dateCreated", "dateModified"]) {
    const value = profile[property];
    assert(typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value)
      && Number.isFinite(Date.parse(value)), `${author.name}: ${property} must be an ISO 8601 datetime with a timezone`);
  }
  assert(Date.parse(profile.dateModified) >= Date.parse(profile.dateCreated), `${author.name}: profile modification precedes creation`);
}

console.log(`Authorship checks passed: ${articles.length} article bylines, linked Person data, publisher attribution, protected forms and author profiles.`);
