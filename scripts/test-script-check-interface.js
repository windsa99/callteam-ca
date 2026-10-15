"use strict";

// Rendered-page DOM checks for the browser-only checker. No network, AI API or
// browser installation is used. These do not replace a visual browser review.
const assert = require("node:assert/strict");
const fs = require("node:fs"), path = require("node:path");
const { JSDOM, VirtualConsole } = require("jsdom");
const base = path.resolve(__dirname, ".."), output = path.join(base, "_site");
const html = fs.readFileSync(path.join(output, "cold-call-script-checker/index.html"), "utf8");
const modelJS = fs.readFileSync(path.join(output, "assets/js/script-check-model.js"), "utf8");
const interfaceJS = fs.readFileSync(path.join(output, "assets/js/script-checker.js"), "utf8");
const fixtures = JSON.parse(fs.readFileSync(path.join(base, "tests/fixtures/script-check-scenarios.json"), "utf8"));
const validInput = fixtures[0].input;
const cyberInput = fixtures.find(item => item.id === "cybersecurity").input;
let passed = 0;
const tick = () => new Promise(resolve => setImmediate(resolve));
async function settle() { for (let i = 0; i < 3; i++) await tick(); }
function deferred() { let resolve, reject; const promise = new Promise((yes, no) => { resolve = yes; reject = no; }); return { promise, resolve, reject }; }

function setup(options = {}) {
  const errors = [], requests = [], events = [], clipboard = [], downloads = [], objectURLs = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on("jsdomError", error => errors.push(error));
  const dom = new JSDOM(html, {
    url: options.file ? "file:///preview/callteam-script-checker.html" : "https://www.callteam.ca/cold-call-script-checker/",
    runScripts: "outside-only", virtualConsole
  });
  const { window } = dom;
  const get = id => window.document.getElementById("sc-" + id);
  window.HTMLElement.prototype.scrollIntoView = function () {};
  window.addEventListener("error", event => errors.push(event.error || new Error(event.message)));
  window.fetch = (...args) => { requests.push({ type: "fetch", args }); throw new Error("Checker must not fetch"); };
  window.XMLHttpRequest = function () { requests.push({ type: "xhr" }); throw new Error("Checker must not use XHR"); };
  Object.defineProperty(window.navigator, "sendBeacon", { configurable: true, value: (...args) => { requests.push({ type: "beacon", args }); return false; } });
  window.clarity = (...args) => events.push(args);
  if (options.preview) window.CALLTEAM_LOCAL_PREVIEW = true;
  if (options.clipboard) Object.defineProperty(window.navigator, "clipboard", { configurable: true, value: {
    writeText: async text => { if (options.clipboardGate) await options.clipboardGate.promise; if (options.clipboard === "reject") throw new Error("Clipboard unavailable"); clipboard.push(text); }
  } });
  window.URL.createObjectURL = blob => { const url = "blob:script-check/" + objectURLs.length; objectURLs.push({ url, blob }); return url; };
  window.URL.revokeObjectURL = url => { const item = objectURLs.find(entry => entry.url === url); if (item) item.revoked = true; };
  const originalAnchorClick = window.HTMLAnchorElement.prototype.click;
  window.HTMLAnchorElement.prototype.click = function () {
    if (this.hasAttribute("download")) { downloads.push({ href: this.href, filename: this.download }); return; }
    if (this.href.includes("calendly.com/")) return;
    return originalAnchorClick.call(this);
  };
  const click = id => get(id).click();
  const field = (key, value) => { get(key).value = value; get(key).dispatchEvent(new window.Event("input", { bubbles: true })); };
  const fill = (input = validInput) => Object.entries(input).forEach(([key, value]) => field(key, value));
  const examples = JSON.parse(get("examples").textContent), catalog = JSON.parse(get("catalog").textContent);
  const sample = id => window.document.querySelector('[data-sc-example="' + (id || examples[0].id) + '"]').click();
  const selectTemplate = (index = 0) => { const button = get("template-options").querySelectorAll("button")[index]; assert(button, "Expected template choice"); button.click(); return button; };
  const blobText = blob => new Promise((resolve, reject) => { const reader = new window.FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsText(blob); });
  window.eval(modelJS); window.eval(interfaceJS);
  return { dom, window, get, click, field, fill, sample, selectTemplate, blobText, examples, catalog, errors, requests, events, clipboard, downloads, objectURLs };
}

async function test(name, callback, options = {}) {
  const e = setup(options);
  let watchdog;
  try {
    const deadline = new Promise((resolve, reject) => { watchdog = setTimeout(() => reject(new Error("Scenario did not complete: " + name)), 10000); });
    await Promise.race([(async () => { await callback(e); await settle(); })(), deadline]);
    assert.deepEqual(e.errors, [], "Unexpected DOM error");
    assert.deepEqual(e.requests, [], "No visitor input may leave the browser");
    for (const args of e.events) { assert.equal(args.length, 2); assert.equal(args[0], "event"); assert.match(args[1], /^script_check_[a-z_]+$/); }
    passed++; console.log("PASS " + name);
  } finally { clearTimeout(watchdog); e.dom.window.close(); }
}

(async () => {
  await test("initial check is enabled and blank input produces accessible errors", e => {
    assert.equal(e.get("check").disabled, false); assert.equal(e.get("results").hidden, true); e.click("check");
    assert.equal(e.get("error").hidden, false);
    for (const key of ["buyer", "offer", "script"]) assert.equal(e.get(key).getAttribute("aria-invalid"), "true");
    assert.equal(e.window.document.activeElement, e.get("buyer"));
  });

  await test("short, overflow and control-character input are rejected without results", e => {
    for (const input of [{ ...validInput, buyer: "x" }, { ...validInput, offer: "short" }, { ...validInput, script: "Too short" }, { ...validInput, script: "a".repeat(4001) }, { ...validInput, offer: "This offer contains a\u0001 control character" }]) {
      e.fill(input); e.click("check"); assert.equal(e.get("error").hidden, false); assert.equal(e.get("results").hidden, true);
    }
  });

  await test("visitor's own valid draft gets computed findings immediately", e => {
    e.fill(); e.click("check"); const result = e.window.CallTeamScriptCheckModel.analyze(validInput);
    assert.equal(e.get("results").hidden, false); assert.equal(e.get("summary").textContent, result.summary);
    assert(e.get("metrics").textContent.includes(String(result.metrics.wordCount)));
    assert.equal(e.window.document.activeElement, e.get("results"));
    assert(!/AI-assisted|AI review|illustrative sample review/i.test(e.get("result-mode").textContent));
    assert.equal(e.get("draft-panel").hidden, true, "No draft substitution before a choice");
  });

  await test("five input-only samples use identical computed checks as typed drafts", e => {
    assert.equal(e.examples.length, 5);
    for (const example of e.examples) {
      assert.equal("review" in example, false); e.sample(example.id);
      assert.equal(e.get("summary").textContent, e.window.CallTeamScriptCheckModel.analyze(example.input).summary);
      const first = ["found", "review", "confirm"].map(id => e.get(id).textContent);
      e.fill(example.input); e.click("check");
      assert.deepEqual(["found", "review", "confirm"].map(id => e.get(id).textContent), first);
      assert.equal(e.get("script").value, example.input.script);
    }
  });

  await test("strong sample receives no compulsory criticism or automatic rewrite", e => {
    e.sample("strong");
    assert.equal(e.window.CallTeamScriptCheckModel.analyze(e.examples.find(item => item.id === "strong").input).review.length, 0);
    assert.equal(e.get("review").querySelectorAll("li").length, 0); assert.equal(e.get("draft-panel").hidden, true);
  });

  await test("question without a question mark is recognised", e => {
    e.sample("question"); const sample = e.examples.find(item => item.id === "question");
    assert(!sample.input.script.includes("?")); assert(e.window.CallTeamScriptCheckModel.analyze(sample.input).found.some(item => item.id === "response"));
    assert(!/no question|missing question/i.test(e.get("review").textContent));
  });

  await test("all displayed quotations preserve the visitor's exact wording", e => {
    for (const fixture of fixtures) {
      e.fill(fixture.input); e.click("check");
      for (const quote of e.get("results").querySelectorAll(".sc-finding blockquote")) assert(fixture.input.script.includes(quote.textContent));
    }
  });

  await test("file preview runs the full review and editable builder offline", e => {
    e.fill(); e.click("check"); e.click("keep");
    assert.equal(e.get("results").hidden, false); assert.equal(e.get("draft-panel").hidden, false); assert.equal(e.get("draft-opening").value, validInput.script);
  }, { file: true });

  await test("sandbox flag runs real checks and suppresses tracking", e => {
    e.sample("saas"); e.click("general"); assert.equal(e.get("results").hidden, false); assert.equal(e.get("draft-panel").hidden, false); assert.deepEqual(e.events, []);
  }, { preview: true });

  await test("resources and explicit template choices explain possible matches", e => {
    e.fill(cyberInput); e.click("check"); assert(e.get("resources").querySelectorAll("a").length >= 2); assert(e.get("template-options").querySelectorAll("button").length >= 1);
    for (const link of e.get("resources").querySelectorAll("a")) { assert(/^https:\/\/www.callteam.ca\/(resources|articles)\//.test(link.href)); assert(link.textContent.length > 30); }
    assert.equal(e.get("draft-panel").hidden, true);
  });

  await test("keep my opening preserves the original exactly and exposes editable fields", e => {
    e.fill(); e.click("check"); e.click("keep"); assert.equal(e.get("draft-opening").value, validInput.script);
    for (const key of ["opening", "followup", "meeting"]) { assert.equal(e.get("draft-" + key).readOnly, false); assert.equal(e.get("draft-" + key).disabled, false); }
    assert.equal(e.get("draft-panel").hidden, false);
  });

  await test("selected template preserves published wording and source attribution", e => {
    e.fill(cyberInput); e.click("check"); e.selectTemplate(); const link = e.get("draft-source").querySelector("a"); assert(link);
    const source = e.catalog.find(item => new URL(link.href).pathname === item.url); assert(source);
    const draft = e.window.CallTeamScriptCheckModel.makeDraft(validInput, source);
    assert.equal(e.get("draft-opening").value, draft.opening); assert.equal(e.get("draft-followup").value, draft.followUpQuestion); assert.equal(e.get("draft-meeting").value, draft.meetingRequest);
  });

  await test("general structure keeps unknown details explicit and allows manual editing", e => {
    e.sample("unfamiliar"); e.click("general"); assert.equal(e.get("draft-panel").hidden, false);
    assert(/\[[^\]]+\]/.test(e.get("draft-opening").value)); assert(e.get("draft-notes").textContent.length > 0);
    e.field("draft-opening", "Hi Jo, this is Pat. How do you identify a kiln roller needing inspection?");
    assert(e.get("draft-opening").value.includes("kiln roller")); assert(e.get("draft-status").textContent.length > 0);
  });

  await test("declining inline replacement preserves all edited draft fields", e => {
    e.fill(cyberInput); e.click("check"); e.click("keep");
    e.field("draft-opening", "My edited opening."); e.field("draft-followup", "My follow-up question?"); e.field("draft-meeting", "My meeting request?");
    e.selectTemplate(); assert.equal(e.get("replace-confirm").hidden, false);
    assert.equal(e.get("draft-opening").value, "My edited opening."); e.click("replace-no");
    assert.equal(e.get("draft-opening").value, "My edited opening."); assert.equal(e.get("draft-followup").value, "My follow-up question?"); assert.equal(e.get("draft-meeting").value, "My meeting request?");
  });

  await test("accepting inline replacement loads the explicitly chosen starting point", e => {
    e.sample("cyber"); e.click("keep"); e.field("draft-opening", "Edited draft to replace."); e.click("general");
    assert.equal(e.get("replace-confirm").hidden, false); e.click("replace-yes");
    assert.notEqual(e.get("draft-opening").value, "Edited draft to replace."); assert(/\[[^\]]+\]/.test(e.get("draft-opening").value));
  });

  await test("editing buyer, offer or script invalidates old results and draft", e => {
    for (const key of ["buyer", "offer", "script"]) {
      e.fill(); e.click("check"); e.click("keep"); e.field(key, validInput[key] + " Updated.");
      assert.equal(e.get("results").hidden, true); assert.equal(e.get("draft-panel").hidden, true);
    }
  });

  await test("clear empties all input and draft fields and restores focus", e => {
    e.sample("cyber"); e.click("general"); e.click("clear");
    for (const key of ["buyer", "offer", "script", "draft-opening", "draft-followup", "draft-meeting"]) assert.equal(e.get(key).value, "");
    assert.equal(e.get("results").hidden, true); assert.equal(e.get("draft-panel").hidden, true); assert.equal(e.get("error").hidden, true); assert.equal(e.window.document.activeElement, e.get("buyer"));
  });

  await test("copy includes current edits and separately retains the original opening", async e => {
    e.fill(); e.click("check"); e.click("keep");
    e.field("draft-opening", "My final opening for the call."); e.field("draft-followup", "Which exceptions take the most time?"); e.field("draft-meeting", "Would a discussion be useful?");
    e.click("copy"); await settle(); assert.equal(e.clipboard.length, 1);
    for (const value of [validInput.script, "My final opening for the call.", "Which exceptions take the most time?", "Would a discussion be useful?"]) assert(e.clipboard[0].includes(value));
    assert.match(e.get("copy-status").textContent, /copied/i);
  }, { clipboard: true });

  await test("copy before draft selection exports review without inventing a rewrite", async e => {
    e.fill(); e.click("check"); e.click("copy"); await settle(); assert.equal(e.clipboard.length, 1); assert(e.clipboard[0].includes(validInput.script)); assert.equal(e.get("draft-panel").hidden, true);
  }, { clipboard: true });

  await test("clipboard denial supplies a masked selectable fallback", async e => {
    e.fill(); e.click("check"); e.click("keep"); e.click("copy"); await settle(); const area = e.get("copy-fallback");
    assert(area && !area.hidden); assert.equal(area.readOnly, true); assert.equal(area.getAttribute("data-clarity-mask"), "true");
    assert(area.value.includes(validInput.script)); assert.equal(e.window.document.activeElement, area);
  }, { clipboard: "reject" });

  const pendingCopy = deferred();
  await test("editing during a pending copy suppresses a stale success message", async e => {
    e.fill(); e.click("check"); e.click("keep"); e.click("copy");
    e.field("draft-opening", "A newer version typed while copying.");
    pendingCopy.resolve(); await settle();
    assert.equal(e.get("copy-status").textContent, "");
    assert.equal(e.get("draft-opening").value, "A newer version typed while copying.");
  }, { clipboard: true, clipboardGate: pendingCopy });

  const rejectedCopy = deferred();
  await test("editing before clipboard rejection prevents an outdated fallback from appearing", async e => {
    e.fill(); e.click("check"); e.click("keep"); e.click("copy");
    e.field("draft-opening", "Latest wording after the copy attempt.");
    rejectedCopy.reject(new Error("Clipboard refused")); await settle();
    assert(!e.get("copy-fallback") || e.get("copy-fallback").hidden);
    assert.equal(e.get("copy-status").textContent, "");
  }, { clipboard: true, clipboardGate: rejectedCopy });

  await test("download exports latest edited draft in a plain text file", async e => {
    e.fill(); e.click("check"); e.click("keep"); e.field("draft-opening", "Latest download draft."); e.click("download"); await settle();
    assert.equal(e.downloads.length, 1); assert.match(e.downloads[0].filename, /\.txt$/);
    const entry = e.objectURLs.find(item => item.url === e.downloads[0].href); assert(entry); assert.match(entry.blob.type, /^text\/plain/);
    const text = await e.blobText(entry.blob); assert(text.includes("Latest download draft.")); assert(text.includes(validInput.script));
  });

  await test("HTML-like pasted text remains inert throughout review and editing", e => {
    const payload = '<img src=x onerror="window.injected=true">';
    const input = { ...validInput, script: payload + " Hi Alex, we guarantee a 40% saving. How do you check invoices?" };
    e.fill(input); e.click("check"); e.click("keep"); assert.equal(e.get("draft-opening").value, input.script);
    assert.equal(e.get("results").querySelectorAll("img,script,iframe").length, 0); assert.equal(e.window.injected, undefined);
  });

  await test("user inputs and results are masked and controls have accessible labels", e => {
    for (const key of ["buyer", "offer", "script", "draft-opening", "draft-followup", "draft-meeting"]) {
      const element = e.get(key); assert(element.closest('[data-clarity-mask="true"]')); assert(e.window.document.querySelector('label[for="' + element.id + '"]'));
    }
    assert(e.get("results").closest('[data-clarity-mask="true"]')); assert.equal(e.get("results").getAttribute("tabindex"), "-1"); assert.equal(e.get("error").getAttribute("role"), "alert"); assert.equal(e.get("status").getAttribute("role"), "status");
  });

  await test("tracking carries event names only, with no original or edited draft text", async e => {
    e.fill(); e.click("check"); e.click("keep"); e.field("draft-opening", "PRIVATE EDITED DRAFT 73"); e.click("copy"); await settle();
    const text = JSON.stringify(e.events); for (const value of [...Object.values(validInput), "PRIVATE EDITED DRAFT 73"]) assert(!text.includes(value)); assert(e.events.length > 0);
  }, { clipboard: true });

  assert.equal(passed, 26, "Every expected interaction scenario must finish");
  console.log("\n" + passed + " browser-only rendered-page interaction scenarios passed. Fetch/XHR/beacon blocked; zero requests observed. No visual browser QA performed.");
})().catch(error => { console.error(error); process.exitCode = 1; });
