"use strict";

// Independently judged scenarios for the browser-only checker. These checks
// verify rule limits and source fidelity; they do not predict sales outcomes.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const model = require(path.join(root, "src/assets/js/script-check-model.js"));
const catalog = require(path.join(root, "src/_data/scriptCheckCatalog.js"));
const published = require(path.join(root, "src/_data/callScripts.js"));
const scenarios = JSON.parse(fs.readFileSync(path.join(root, "tests/fixtures/script-check-scenarios.json"), "utf8"));
let passed = 0;
function test(name, run) { run(); passed++; console.log("PASS " + name); }
const ids = (result, group) => result[group].map(item => item.id);
const allFindings = result => [...result.found, ...result.review, ...result.confirm];
const valid = scenarios[0].input;

function checkAnalysis(result, input) {
  assert.equal(typeof result.summary, "string");
  assert(result.summary.length > 0);
  for (const group of ["found", "review", "confirm"]) assert(Array.isArray(result[group]), group + " must be a list");
  assert.equal(typeof result.needsClarification, "boolean");
  for (const item of allFindings(result)) {
    assert.equal(typeof item.id, "string"); assert.equal(typeof item.label, "string"); assert.equal(typeof item.detail, "string");
    if (item.quote) assert(input.script.includes(item.quote), "Quoted text must be an exact substring of the visitor's draft: " + item.id);
  }
  for (const key of ["wordCount", "sentenceCount"]) assert(Number.isFinite(result.metrics[key]) && result.metrics[key] >= 0, key);
  assert(result.metrics.wordsBeforeResponse === null || Number.isFinite(result.metrics.wordsBeforeResponse));
  assert.equal("score" in result, false, "Rule checks must not invent a quality score");
  assert.equal("predictedConversionRate" in result, false, "No predicted conversion rate");
}

for (const fixture of scenarios) {
  test(fixture.id + ": " + fixture.description, () => {
    assert.equal(model.validateInput(fixture.input).valid, true, "Fixture should be accepted as input");
    const inputCopy = JSON.stringify(fixture.input);
    const result = model.analyze(fixture.input);
    checkAnalysis(result, fixture.input);
    assert.deepEqual(model.analyze(fixture.input), result, "Same input must produce the same checks");
    assert.equal(JSON.stringify(fixture.input), inputCopy, "Checking must not modify the input");
    const expect = fixture.expect;
    if (expect.noForcedCriticism) assert.deepEqual(result.review, [], "A strong opening must not receive manufactured issues");
    if (expect.questionPresent) assert(ids(result, "found").includes("response"), "An evident buyer question should be recognised");
    if (expect.broadLanguage) assert(ids(result, "review").includes("broad-wording"));
    if (expect.claimNeedsChecking) assert(allFindings(result).some(item => item.id === "claim-check"), "Outcome claims should trigger an evidence check");
    if (expect.noPerformanceClaim) assert(!allFindings(result).some(item => item.id === "claim-check"), "Version numbers and negated guarantees are not outcome promises");
    if (expect.technicalNotAutomaticallyBad) assert(!ids(result, "review").includes("broad-wording"), "Uncommon technical words are not automatically vague sales language");
    if (expect.noCertainMissingIntro) assert(!result.review.some(item => /missing introduction|no introduction|no caller identity/i.test(item.detail)), "Unusual introductions need cautious interpretation");
    if (expect.longOpening) assert(result.review.some(item => /long|length/.test(item.id)), "Long copy should receive a concrete length observation");
    if (expect.needsClarification) assert.equal(result.needsClarification, true, "Unclear text must not be treated as a confidently understood script");
    if (expect.placeholders) assert(ids(result, "review").includes("placeholders"));
    if (expect.noQuestion) assert(ids(result, "confirm").includes("response-confirm"));
    if (expect.languageCaution) {
      assert.equal(result.needsClarification, true);
      assert(allFindings(result).some(item => /language|english|unclear|understand/i.test(item.detail + " " + item.label)), "Non-English analysis must disclose its limits");
    }
    if (expect.relevantSuggestion) assert(model.suggestTemplates(fixture.input, catalog).length > 0);
    if (expect.unfamiliarMatch) assert(model.suggestTemplates(fixture.input, catalog).every(item => !/exact|proven|perfect/i.test(item.reason)), "Do not promise an exact match for an unfamiliar specialist offer");
    if (expect.forbiddenTemplates) {
      const forbidden = new RegExp(expect.forbiddenTemplates, "i");
      for (const item of model.suggestTemplates(fixture.input, catalog)) assert(!forbidden.test(item.slug), "Unrelated template: " + item.title);
    }
    if (expect.noSuggestedTemplates) assert.deepEqual(model.suggestTemplates(fixture.input, catalog), [], "A familiar buyer title cannot justify an unrelated service template");
  });
}

test("required fields reject blanks and unsupported types", () => {
  for (const input of [null, [], {}, { ...valid, buyer: "" }, { ...valid, offer: "" }, { ...valid, script: "" }, { ...valid, buyer: 99 }, { ...valid, offer: {} }, { ...valid, script: [] }]) {
    assert.equal(model.validateInput(input).valid, false);
  }
});

test("input limits accept exact boundaries and reject overflow or control characters", () => {
  for (const [field, minimum, maximum] of [["buyer", 2, 100], ["offer", 10, 500], ["script", 30, 4000]]) {
    assert.equal(model.validateInput({ ...valid, [field]: "a".repeat(minimum) }).valid, true);
    assert.equal(model.validateInput({ ...valid, [field]: "a".repeat(maximum) }).valid, true);
    assert.equal(model.validateInput({ ...valid, [field]: "a".repeat(minimum - 1) }).valid, false);
    assert.equal(model.validateInput({ ...valid, [field]: "a".repeat(maximum + 1) }).valid, false);
    assert.equal(model.validateInput({ ...valid, [field]: valid[field] + "\u0001" }).valid, false);
  }
  assert.equal(model.validateInput({ ...valid, script: "👋".repeat(2000) }).valid, true);
  assert.equal(model.validateInput({ ...valid, script: "👋".repeat(2001) }).valid, false);
});

test("normalisation trims outer whitespace without rewriting the visitor's words", () => {
  const input = { buyer: "  " + valid.buyer + "  ", offer: "\n" + valid.offer + "\n", script: "\n" + valid.script + "\n" };
  assert.deepEqual(model.validateInput(input).value, valid);
});

test("known short question has the right word count and response position", () => {
  const input = { ...valid, script: "Hi Alex. This is Maya from Example. How do you handle invoices today?" };
  const result = model.analyze(input);
  assert.equal(result.metrics.wordCount, 13);
  assert.equal(result.metrics.wordsBeforeResponse, 7);
  assert(ids(result, "found").includes("response"));
});

test("matching is based on buyer and offer, independently of a script's persuasiveness", () => {
  const sameOfferDifferentScript = { ...valid, script: scenarios.find(s => s.id === "vague_pitch").input.script };
  assert.deepEqual(model.suggestTemplates(valid, catalog), model.suggestTemplates(sameOfferDifferentScript, catalog));
  assert.deepEqual(model.matchResources(valid, catalog), model.matchResources(sameOfferDifferentScript, catalog));
});

test("suggested templates are limited, deterministic and traceable to real catalog entries", () => {
  for (const fixture of scenarios) {
    const result = model.suggestTemplates(fixture.input, catalog);
    assert(result.length <= 3);
    assert.deepEqual(model.suggestTemplates(fixture.input, catalog), result);
    for (const item of result) {
      assert(catalog.some(source => source.slug === item.slug && source.url === item.url));
      assert.equal(typeof item.matchKind, "string"); assert.equal(typeof item.reason, "string");
      assert(item.reason.length > 0);
    }
  }
});

test("empty catalog offers general guidance without fabricating a template", () => {
  assert.deepEqual(model.suggestTemplates(valid, []), []);
  const draft = model.makeDraft(valid, null);
  assert.equal(draft.source, null);
  assert(Array.isArray(draft.placeholders) && draft.placeholders.length > 0);
  assert(Array.isArray(draft.notes) && draft.notes.length > 0);
  for (const field of ["opening", "followUpQuestion", "meetingRequest"]) assert.equal(typeof draft[field], "string");
  assert(!/guarantee|40%|double your|proven results/i.test(draft.opening));
});

test("generic shared words do not match unrelated industries", () => {
  const cases = [
    { input: scenarios.find(item => item.id === "saas_subscriptions").input, forbidden: /gaming|gambling|casino/i },
    { input: { ...valid, buyer: "Logistics director", offer: "Physical shipment tracking for freight deliveries and distribution teams." }, forbidden: /pmo|telehealth|medical/i },
    { input: { ...valid, buyer: "CISO", offer: "IAM identity access management with SAML and SCIM integration testing." }, forbidden: /telehealth|insurance.claim/i }
  ];
  for (const example of cases) {
    const matches = model.suggestTemplates(example.input, catalog);
    for (const match of matches) assert(!example.forbidden.test(match.slug + " " + match.title), "Unrelated suggestion: " + match.title);
  }
  const cyber = model.suggestTemplates(scenarios.find(item => item.id === "cybersecurity").input, catalog);
  assert(cyber.some(item => /security|penetration/i.test(item.title)), "An available cybersecurity example should be surfaced for explicit cybersecurity input");
});

test("general builder keeps unknown facts explicit instead of inventing outcomes", () => {
  const unfamiliar = scenarios.find(item => item.id === "unfamiliar_offer").input;
  const draft = model.makeDraft(unfamiliar, null);
  assert.equal(draft.source, null);
  assert(draft.placeholders.length > 0);
  assert(!/99%|40%|double your|save \$|guaranteed|trusted by/i.test(JSON.stringify(draft)));
  assert.deepEqual(model.makeDraft(unfamiliar, null), draft);
});

test("every one of 100 selectable drafts preserves published wording and attribution", () => {
  assert.equal(catalog.length, 100);
  for (const item of catalog) {
    const original = published.find(source => source.slug === item.slug);
    assert(original, "Missing published source: " + item.slug);
    const itemBefore = JSON.stringify(item);
    const draft = model.makeDraft(valid, item);
    assert.equal(draft.opening, original.opening, item.slug + " opening must match the existing published script");
    assert.equal(draft.followUpQuestion, original.questions[0], item.slug + " first question must match the existing script");
    assert.equal(draft.meetingRequest, original.cta, item.slug + " meeting request must match the existing script");
    assert.equal(draft.source.url, item.url); assert.equal(draft.source.title, item.title);
    assert(Array.isArray(draft.notes)); assert(Array.isArray(draft.placeholders));
    assert.equal(JSON.stringify(item), itemBefore, "Builder must not mutate source templates");
    const links = model.matchResources(valid, catalog, item.slug);
    assert(links.some(link => link.url === item.url), "Selected template must remain a visible resource");
    for (const link of links) assert(/^\/(?:resources|articles)\/[a-z0-9/-]+\/$/.test(link.url));
  }
});

test("resource catalog does not admit external or executable URL templates", () => {
  const poisoned = catalog.slice(0, 2).map((item, index) => ({ ...item, url: index ? "https://example.invalid/script" : "javascript:alert(1)" }));
  assert.deepEqual(model.suggestTemplates(valid, poisoned), []);
  assert(model.matchResources(valid, poisoned).every(item => /^\/(?:resources|articles)\/[a-z0-9/-]+\/$/.test(item.url)));
});

console.log("\n" + passed + " model scenarios passed, including " + scenarios.length + " independently judged drafts and full source-fidelity checks for 100 catalog templates. Browser-only deterministic checks; no AI calls or conversion predictions.");
