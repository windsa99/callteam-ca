const assert = require("assert");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { execFileSync } = require("child_process");
const matter = require("gray-matter");
const nunjucks = require("nunjucks");
const MarkdownIt = require("markdown-it");
const {
  CTA_STYLESHEET,
  parseArticle,
  validateArticleSource,
  validateArticleRendered,
  inspectProject
} = require("./check-article-tool-ctas");

const root = path.resolve(__dirname, "..");
const fixtureDir = path.join(root, "tests/fixtures/article-tool-ctas");
const fixtureNames = ["future-campaign-preview.md", "future-campaign-roi.md", "future-campaign-and-roi.md"];
const fixtures = fixtureNames.map((name) => ({
  relativePath: `src/articles/${name}`,
  contents: fs.readFileSync(path.join(fixtureDir, name), "utf8")
}));
const manifest = JSON.parse(fs.readFileSync(path.join(root, "scripts/data/article-tool-cta-legacy.json"), "utf8"));
const legacyEntries = manifest.articles;
const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(path.join(root, "src/_includes")));
const markdown = new MarkdownIt({ html: true });
const book = '<section class="cta-band"><h2>Discuss your campaign</h2><a class="btn-light" href="https://calendly.com/hello-callteam/new-meeting">Book a Free Call</a></section>';

function sourceDigest() {
  const digest = crypto.createHash("sha256");
  function walk(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const full = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(full);
      else digest.update(path.relative(root, full)).update(fs.readFileSync(full));
    }
  }
  walk(path.join(root, "src"));
  return digest.digest("hex");
}
const beforeDigest = sourceDigest();
let passed = 0;
function check(label, assertion) {
  assertion();
  passed += 1;
  console.log(`PASS: ${label}`);
}
function change(fixture, editData, editBody = (body) => body) {
  const { body } = parseArticle(fixture.contents);
  const data = structuredClone(parseArticle(fixture.contents).data);
  editData(data);
  return { ...fixture, contents: matter.stringify(editBody(body), data) };
}
function sourcePass(fixture, options = {}) {
  const result = validateArticleSource({ ...fixture, legacyEntries, ...options });
  assert.deepStrictEqual(result.errors, [], result.errors.join("\n"));
  return result;
}
function sourceFails(fixture, options = {}) {
  const result = validateArticleSource({ ...fixture, legacyEntries, ...options });
  assert(result.errors.length > 0, "Invalid future article must fail the publishing guard");
  assert.strictEqual(result.exempt, false, "A future article cannot silently gain legacy exemption");
}
function renderFixture(fixture) {
  const { data, body } = parseArticle(fixture.contents);
  const content = markdown.render(env.renderString(body, data));
  return `<!doctype html><html><head><link rel="stylesheet" href="${CTA_STYLESHEET}"></head><body><article><section id="article-body"><div class="container article-content">${content}</div></section></article>${book}</body></html>`;
}
function renderedPass(fixture, html) {
  const result = validateArticleRendered({ ...fixture, html, legacyEntries });
  assert.deepStrictEqual(result.errors, [], result.errors.join("\n"));
}
function renderedFails(fixture, html) {
  const result = validateArticleRendered({ ...fixture, html, legacyEntries });
  assert(result.errors.length > 0, "Broken rendered CTA must fail the publishing guard");
}
const [campaign, roi, both] = fixtures;
const includes = {
  campaign: '{% set contextToolCta = contextualTools.campaign %}{% include "components/contextual-tool-cta.njk" %}',
  roi: '{% set contextToolCta = contextualTools.roi %}{% include "components/contextual-tool-cta.njk" %}'
};

for (const fixture of fixtures) {
  check(`${path.basename(fixture.relativePath)} accepts its deliberate tool selection`, () => {
    const result = sourcePass(fixture);
    assert.strictEqual(result.exempt, false);
    assert.strictEqual(result.selectedTools.length, result.data.toolCtaIntent === "both" ? 2 : 1);
  });
  check(`${path.basename(fixture.relativePath)} renders the real component in context`, () => renderedPass(fixture, renderFixture(fixture)));
}
check("visible copy retains its meaning when HTML entities are encoded", () => {
  const fixture = change(campaign, (data) => { data.contextualTools.campaign.copy = "Bring your R&D offer and target buyers into a useful campaign discussion."; });
  renderedPass(fixture, renderFixture(fixture).replace("R&D", "R&amp;D"));
});

check("the published path and URL together retain their exemption", () => {
  const old = legacyEntries[0];
  const result = sourcePass({ relativePath: old.path, contents: `---\npermalink: "${old.permalink}"\n---\nExisting content stays intact.\n` });
  assert.strictEqual(result.exempt, true);
});
check("new articles cannot borrow an existing article URL", () => sourceFails(change(campaign, (data) => { data.permalink = legacyEntries[0].permalink; })));
check("changing an existing path to a new URL does not gain exemption", () => sourceFails({ ...change(campaign, (data) => { delete data.toolCtaIntent; }), relativePath: legacyEntries[0].path }));
check("a future article cannot overwrite another page permalink", () => sourceFails(campaign, { pagePermalinks: [{ path: "src/another-page.njk", permalink: parseArticle(campaign.contents).data.permalink }] }));
check("missing intent fails even without an editorial profile", () => sourceFails(change(campaign, (data) => { delete data.toolCtaIntent; delete data.editorialProfile; })));
check("an unknown intent fails", () => sourceFails(change(campaign, (data) => { data.toolCtaIntent = "none"; })));
check("an alternate layout cannot bypass the placement check", () => sourceFails(change(campaign, (data) => { data.layout = "layouts/base.njk"; })));
check("declared intent must match the selected components", () => sourceFails(change(both, (data) => { data.toolCtaIntent = "campaign"; })));
check("selected tool configuration is required", () => sourceFails(change(campaign, (data) => { delete data.contextualTools; })));
check("unapproved destinations are rejected", () => sourceFails(change(campaign, (data) => { data.contextualTools.campaign.href = "/pricing/"; })));
check("the approved campaign button wording is required", () => sourceFails(change(campaign, (data) => { data.contextualTools.campaign.label = "Read More"; })));
check("CTA IDs cannot collide", () => sourceFails(change(both, (data) => { data.contextualTools.roi.id = data.contextualTools.campaign.id; })));
check("button copy cannot inject markup", () => sourceFails(change(campaign, (data) => { data.contextualTools.campaign.copy = '<script>alert("wrong")</script>'; })));
check("accessible labels cannot inject attributes", () => sourceFails(change(campaign, (data) => { data.contextualTools.campaign.accessibleName = 'Preview" hidden="hidden'; })));
check("the contextual stylesheet is required", () => sourceFails(change(campaign, (data) => { delete data.pageStyles; })));
check("duplicate contextual stylesheets are rejected", () => sourceFails(change(campaign, (data) => { data.pageStyles.push(CTA_STYLESHEET); })));
check("front matter alone cannot replace an in-article placement", () => sourceFails(change(campaign, () => {}, (body) => body.replace(includes.campaign, ""))));
check("a code-fenced component example cannot satisfy placement", () => sourceFails(change(campaign, () => {}, (body) => body.replace(includes.campaign, `\`\`\`njk\n${includes.campaign}\n\`\`\``))));
check("a commented component cannot satisfy placement", () => sourceFails(change(campaign, () => {}, (body) => body.replace(includes.campaign, `<!-- ${includes.campaign} -->`))));
check("placement before the article advice fails", () => sourceFails(change(campaign, () => {}, (body) => `${includes.campaign}\n\n${body.replace(includes.campaign, "")}`)));
check("a heading without explanatory prose is insufficient", () => sourceFails(change(campaign, () => {}, () => `## Choose the audience\n\n${includes.campaign}\n`)));
check("two tools cannot be stacked in one section", () => sourceFails(change(both, () => {}, (body) => body.replace(includes.roi, "").replace(includes.campaign, `${includes.campaign}\n\n${includes.roi}`))));
check("the same component cannot be repeated twice", () => sourceFails(change(campaign, () => {}, (body) => body.replace(includes.campaign, `${includes.campaign}\n\n${includes.campaign}`))));

const html = renderFixture(campaign);
const aside = html.match(/<aside\b[^]*?<\/aside>/)[0];
check("a missing rendered tool fails", () => renderedFails(campaign, html.replace(aside, "")));
check("a wrong rendered destination fails", () => renderedFails(campaign, html.replace('href="/b2b-outbound-campaign-planner/"', 'href="/pricing/"')));
check("a duplicate rendered tool fails", () => renderedFails(campaign, html.replace(aside, aside + aside)));
check("a tool moved outside article content fails", () => renderedFails(campaign, html.replace(aside, "").replace("</body>", `${aside}</body>`)));
check("a hidden CTA fails", () => renderedFails(campaign, html.replace('<aside class="context-tool-cta"', '<aside hidden class="context-tool-cta"')));
check("a hidden article ancestor fails", () => renderedFails(campaign, html.replace('id="article-body"', 'id="article-body" style="display:none"')));
check("duplicate IDs outside the CTA are rejected", () => renderedFails(campaign, html.replace("</body>", '<div id="cta-future-preview-campaign"></div></body>')));
check("a changed rendered label fails", () => renderedFails(campaign, html.replace("See How We’d Run Your Campaign", "See More")));
check("a changed explanatory paragraph fails", () => renderedFails(campaign, html.replace(parseArticle(campaign.contents).data.contextualTools.campaign.copy, "Unexpected replacement copy.")));
check("missing component button styling fails", () => renderedFails(campaign, html.replace('class="btn-primary"', 'class="unrelated-button"')));
check("a disabled contextual stylesheet fails", () => renderedFails(campaign, html.replace('rel="stylesheet"', 'rel="stylesheet" disabled')));
check("an omitted rendered stylesheet fails", () => renderedFails(campaign, html.replace(`<link rel="stylesheet" href="${CTA_STYLESHEET}">`, "")));
check("missing booking CTA fails", () => renderedFails(campaign, html.replace(book, "")));
check("a changed booking destination fails", () => renderedFails(campaign, html.replace('href="https://calendly.com/hello-callteam/new-meeting">Book a Free Call', 'href="/pricing/">Book a Free Call')));
check("a hidden booking button fails", () => renderedFails(campaign, html.replace('class="btn-light"', 'class="btn-light" hidden')));

const published = {
  relativePath: legacyEntries[0].path,
  contents: `---\npermalink: "${legacyEntries[0].permalink}"\n---\nExisting article content.\n`
};
const publishedCallout = '<aside class="context-tool-cta" id="cta-published-tool" aria-label="Preview your campaign" data-context-tool-cta="cta-published-tool"><p>Preview an approach to your market.</p><div class="context-tool-actions"><a class="btn-primary" href="/b2b-outbound-campaign-planner/">See How We’d Approach Your Market</a></div></aside>';
check("published articles without tool callouts retain their placement exemption", () => renderedPass(published, '<article>Existing content.</article>'));
check("published callouts retain their approved copy and button wording", () => renderedPass(published, publishedCallout));
check("missing component settings cannot publish blank buttons on an exempt article", () => {
  const broken = env.renderString(includes.campaign, {});
  assert(broken.includes('href=""'), "Regression must reproduce the missing-settings defect");
  renderedFails(published, broken);
});
check("an empty published button destination fails", () => renderedFails(published, publishedCallout.replace('href="/b2b-outbound-campaign-planner/"', 'href=""')));
check("an empty published button label fails", () => renderedFails(published, publishedCallout.replace('See How We’d Approach Your Market', '')));
check("an empty published explanatory paragraph fails", () => renderedFails(published, publishedCallout.replace('Preview an approach to your market.', '')));
check("a hidden published button fails", () => renderedFails(published, publishedCallout.replace('class="btn-primary"', 'class="btn-primary" hidden')));
check("duplicate published callout IDs fail", () => renderedFails(published, publishedCallout + publishedCallout));
check("a configured published callout cannot silently disappear", () => {
  const data = parseArticle(published.contents).data;
  data.contextToolCta = { id: "cta-published-tool" };
  renderedFails({ ...published, contents: matter.stringify("Existing article content.", data) }, '<article>Existing content.</article>');
});

check("the current project passes the guard with all 138 published articles exempt", () => {
  const result = inspectProject({ rootDir: root });
  assert.deepStrictEqual(result.errors, [], result.errors.join("\n"));
  assert.strictEqual(result.legacyCount, 138);
  const copiedFixtures = fixtureNames.filter((name) => fs.existsSync(path.join(root, "src/articles", name))).length;
  assert(Number.isInteger(result.futureCount) && result.futureCount >= copiedFixtures,
    "The guard must validate copied fixtures and allow additional compliant future articles");
});
check("the publishing CLI succeeds independently", () => {
  const output = execFileSync(process.execPath, [path.join(__dirname, "check-article-tool-ctas.js"), "--root", root], { encoding: "utf8" });
  assert(output.includes("138 published articles exempt"), output);
});
check("tests leave every published source file unchanged", () => assert.strictEqual(sourceDigest(), beforeDigest));

console.log(`Article tool CTA regression checks passed: ${passed}. No article source files created or changed.`);
