const fs = require("fs");
const path = require("path");
const assert = require("assert");
const vm = require("vm");
const { createRequire } = require("module");

const root = path.resolve(__dirname, "..");
const fixture = path.join(root, "src/articles/editorial-profile-sandbox-test.md");
const validatorPath = path.join(__dirname, "validate-article-engine.js");
const validator = fs.readFileSync(validatorPath, "utf8");
const validatorRequire = createRequire(validatorPath);
const example = fs.readFileSync(path.join(root, "src/articles/cold-calling-agency-vs-freelance-caller-us.md"), "utf8");
const front = example.match(/^---\n([\s\S]*?)\n---/)[1]
  .replace(/^title:.*$/m, 'title: "Editorial Profile Sandbox Test"')
  .replace(/^permalink:.*$/m, 'permalink: "/articles/editorial-profile-sandbox-test/"')
  .replace(/^canonicalUrl:.*$/m, 'canonicalUrl: "https://www.callteam.ca/articles/editorial-profile-sandbox-test/"');

function body(sections) {
  return Array.from({ length: sections }, (_, index) => {
    const n = index + 1;
    return `## Review checkpoint ${n}\n\nAt checkpoint ${n}, the buyer records the resources available for a carefully scoped assignment. The reviewer for checkpoint ${n} records an assessment of the proposed workload and delivery responsibilities.`;
  }).join("\n\n");
}

function document(profile, sections = 4, extra = "", faqCount) {
  let data = front;
  if (profile !== null) data += `\neditorialProfile: "${profile}"`;
  if (faqCount !== undefined) {
    data = data.replace(/^faqs:\n([\s\S]*?)(?=^[A-Za-z][A-Za-z0-9]*:)/m, () =>
      "faqs:\n" + Array.from({ length: faqCount }, (_, i) =>
        `  - question: "Fixture question ${i + 1}?"\n    answer: "Fixture answer ${i + 1} describes the review task."\n`
      ).join("")
    );
  }
  return `---\n${data}\n---\n\n${body(sections)}${extra}\n`;
}

assert(!fs.existsSync(fixture), "The virtual fixture must not exist on disk.");
let passed = 0;
function check(label, contents, expectedErrors = []) {
  // Expose the draft only to this validator run. Never write it into src or a build.
  const virtualFs = Object.create(fs);
  virtualFs.readFileSync = (file, options) => path.resolve(file) === fixture
    ? contents : fs.readFileSync(file, options);
  virtualFs.readdirSync = (directory, options) => {
    const entries = fs.readdirSync(directory, options);
    if (path.resolve(directory) !== path.dirname(fixture)) return entries;
    return entries.concat(options?.withFileTypes
      ? { name: path.basename(fixture), isDirectory: () => false }
      : path.basename(fixture));
  };
  let status = 0;
  let output = "";
  const exitSignal = {};
  try {
    vm.runInNewContext(validator, {
      __dirname,
      require: (name) => name === "fs" ? virtualFs : validatorRequire(name),
      console: {
        log: (message) => { output += message + "\n"; },
        error: (message) => { output += message + "\n"; }
      },
      process: { exit: (code) => { status = code; throw exitSignal; } }
    }, { filename: validatorPath, timeout: 30000 });
  } catch (error) {
    if (error !== exitSignal) throw error;
  }
  if (!expectedErrors.length) {
    assert.strictEqual(status, 0, `${label}: ${output}`);
  } else {
    assert.strictEqual(status, 1, `${label}: expected validation failure, got ${status}`);
    for (const message of expectedErrors) assert(output.includes(message), `${label}: missing ${message}\n${output}`);
  }
  passed += 1;
  console.log(`PASS: ${label}`);
}

{
  check("future article below 1,000 words with four sections", document("flexible-v1"));
  check("missing author is rejected", document("flexible-v1").replace(/^authorKey:.*\n/m, ""), ["authorKey must be a quoted registered author key"]);
  check("unknown author is rejected", document("flexible-v1").replace(/^authorKey:.*$/m, 'authorKey: "unknownAuthor"'), ["authorKey must be a quoted registered author key"]);
  check("unmarked article retains both legacy minimums", document(null), ["article body must be 1000-3200 words", "article body must contain 7-14 H2 sections"]);
  check("future article with three sections is rejected", document("flexible-v1", 3), ["article body must contain 4-14 H2 sections"]);
  check("future article with fourteen sections passes", document("flexible-v1", 14));
  check("future article with fifteen sections is rejected", document("flexible-v1", 15), ["article body must contain 4-14 H2 sections"]);
  check("3,200-word maximum remains enforced", document("flexible-v1", 4, "\n\n" + "planning ".repeat(3201)), ["article body must be 3200 words or fewer"]);
  check("fewer than five FAQs is rejected", document("flexible-v1", 4, "", 4), ["FAQ count must be 5-8"]);
  check("more than eight FAQs is rejected", document("flexible-v1", 4, "", 9), ["FAQ count must be 5-8"]);
  check("unknown profile fails closed", document("flexible-v2"), ['editorialProfile must be "flexible-v1" when supplied']);
  check("repeated substantive sentences remain rejected", document("flexible-v1", 4, "\n\n" + body(1).split("\n\n")[1]), ["repeated substantive sentence"]);
  check("broken internal links remain rejected", document("flexible-v1", 4, "\n\n[Fixture link](/missing-editorial-profile-fixture/)"), ["internal relationship target does not exist"]);
  check("canonical mismatches remain rejected", document("flexible-v1").replace('canonicalUrl: "https://www.callteam.ca/articles/editorial-profile-sandbox-test/"', 'canonicalUrl: "https://www.callteam.ca/wrong-fixture-canonical/"'), ["canonicalUrl must match the page permalink"]);
}
assert(!fs.existsSync(fixture), "Virtual tests must leave no article on disk.");
console.log(`Editorial profile regression checks passed: ${passed}. No article files created.`);
