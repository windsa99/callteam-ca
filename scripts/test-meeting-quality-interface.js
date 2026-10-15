"use strict";

// Render the built page and run its shipped scripts in a DOM. This verifies
// interactions and exports, not visual layout or a real browser installation.
const assert = require("node:assert/strict");
const fs = require("node:fs"), path = require("node:path");
const nodeTimers = require("node:timers");
const { JSDOM, VirtualConsole } = require("jsdom");
const expectedScenarios = 31;
let completed = false, passed = 0, currentScenario = "loading built page";
// A pending Promise alone cannot keep Node alive. Fail closed if a harness or
// environment issue ever exits before the final completion assertion is reached.
process.on("exit", () => {
  if (!completed) {
    fs.writeSync(2, "INCOMPLETE: " + passed + "/" + expectedScenarios + " scenarios finished; active scenario: " + currentScenario + "\n");
    process.exitCode = 1;
  }
});
const base = path.resolve(__dirname, ".."), output = path.join(base, "_site");
const html = fs.readFileSync(path.join(output, "b2b-meeting-quality-check/index.html"), "utf8");
const modelJS = fs.readFileSync(path.join(output, "assets/js/meeting-quality-model.js"), "utf8");
const interfaceJS = fs.readFileSync(path.join(output, "assets/js/meeting-quality.js"), "utf8");
const fields = ["booked", "held", "accepted", "opportunities"];
const practical = { booked: 8, held: 6, accepted: 4, opportunities: 2, outcomes: "complete" };
const tick = () => new Promise(resolve => nodeTimers.setImmediate(resolve));
async function settle() { for (let i = 0; i < 3; i++) await tick(); }
function deferred() { let resolve, reject; const promise = new Promise((yes, no) => { resolve = yes; reject = no; }); return { promise, resolve, reject }; }

function setup(options = {}) {
  const errors = [], requests = [], events = [], clipboard = [], downloads = [], objectURLs = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on("jsdomError", error => errors.push(error));
  const dom = new JSDOM(html, {
    url: options.file ? "file:///preview/callteam-meeting-quality.html" : "https://www.callteam.ca/b2b-meeting-quality-check/",
    runScripts: "outside-only", virtualConsole
  });
  const { window } = dom;
  const get = id => window.document.getElementById("mq-" + id);
  window.HTMLElement.prototype.scrollIntoView = function () {};
  window.addEventListener("error", event => errors.push(event.error || new Error(event.message)));
  window.fetch = (...args) => { requests.push({ type: "fetch", args }); throw new Error("Calculator must not fetch"); };
  window.XMLHttpRequest = function () { requests.push({ type: "xhr" }); throw new Error("Calculator must not use XHR"); };
  Object.defineProperty(window.navigator, "sendBeacon", { configurable: true, value: (...args) => { requests.push({ type: "beacon", args }); return false; } });
  window.Storage.prototype.setItem = function (...args) { requests.push({ type: "storage", args }); throw new Error("Calculator must not persist private counts"); };
  window.HTMLFormElement.prototype.submit = function () { requests.push({ type: "form" }); throw new Error("Calculator must not submit a form"); };
  window.clarity = (...args) => events.push(args);
  if (options.preview) window.CALLTEAM_LOCAL_PREVIEW = true;
  if (options.clipboard) Object.defineProperty(window.navigator, "clipboard", { configurable: true, value: {
    writeText: async text => { if (options.clipboardGate) await options.clipboardGate.promise; if (options.clipboard === "reject") throw new Error("Clipboard unavailable"); clipboard.push(text); }
  } });
  window.URL.createObjectURL = blob => {
    if (options.downloadReject) throw new Error("Downloads unavailable");
    const url = "blob:meeting-quality/" + objectURLs.length; objectURLs.push({ url, blob }); return url;
  };
  window.URL.revokeObjectURL = url => { const item = objectURLs.find(entry => entry.url === url); if (item) item.revoked = true; };
  const originalSetTimeout = window.setTimeout.bind(window);
  window.setTimeout = (callback, delay, ...args) => originalSetTimeout(callback, delay === 1000 ? 0 : delay, ...args);
  const originalAnchorClick = window.HTMLAnchorElement.prototype.click;
  window.HTMLAnchorElement.prototype.click = function () {
    if (this.hasAttribute("download")) { downloads.push({ href: this.href, filename: this.download }); return; }
    return originalAnchorClick.call(this);
  };
  window.document.addEventListener("click", event => {
    if (event.target.closest("a[href]")) event.preventDefault();
  });
  const click = id => get(id).click();
  const field = (key, value) => { get(key).value = value === null ? "" : value; get(key).dispatchEvent(new window.Event("input", { bubbles: true })); };
  const unknown = (key, checked) => { get(key + "-unknown").checked = checked; get(key + "-unknown").dispatchEvent(new window.Event("change", { bubbles: true })); };
  const fill = (input = practical) => {
    for (const key of fields) { if (key !== "booked") unknown(key, input[key] === null); field(key, input[key]); }
    field("outcomes", input.outcomes === undefined ? "unknown" : input.outcomes);
  };
  const examples = JSON.parse(get("examples").textContent);
  const sample = id => window.document.querySelector('[data-mq-example="' + (id || examples[0].id) + '"]').click();
  const metric = key => get("metrics").querySelector('[data-metric="' + key + '"]');
  const check = (input = practical) => { fill(input); click("check"); };
  const blobText = blob => new Promise((resolve, reject) => { const reader = new window.FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsText(blob); });
  window.eval(modelJS); window.eval(interfaceJS);
  return { dom, window, get, click, field, fill, unknown, sample, metric, check, blobText, examples, errors, requests, events, clipboard, downloads, objectURLs };
}

async function test(name, callback, options = {}) {
  currentScenario = name;
  const e = setup(options); let watchdog;
  try {
    const deadline = new Promise((resolve, reject) => {
      watchdog = nodeTimers.setTimeout(() => reject(new Error("Scenario did not complete: " + name)), 10000);
      watchdog.ref();
    });
    await Promise.race([(async () => { await callback(e); await settle(); })(), deadline]);
    assert.deepEqual(e.errors, [], "Unexpected DOM error");
    assert.deepEqual(e.requests, [], "No private input may be submitted or persisted");
    for (const args of e.events) { assert.equal(args.length, 2); assert.equal(args[0], "event"); assert.match(args[1], /^meeting_quality_[a-z_]+$/); }
    passed++; fs.writeSync(1, "PASS " + name + "\n");
  } finally { nodeTimers.clearTimeout(watchdog); e.dom.window.close(); }
}

(async () => {
  await test("initial state enables checking and reports a blank booking accessibly", e => {
    assert.equal(e.get("check").disabled, false); assert.equal(e.get("results").hidden, true); e.click("check");
    assert.equal(e.get("errors").hidden, false); assert.equal(e.get("booked").getAttribute("aria-invalid"), "true");
    assert.equal(e.get("booked").getAttribute("aria-errormessage"), "mq-errors");
    assert.equal(e.window.document.activeElement, e.get("booked")); assert.equal(e.get("results").hidden, true);
  });

  await test("typed practical inputs calculate the four independently checked rates", e => {
    e.check(); assert.equal(e.get("results").hidden, false); assert.equal(e.window.document.activeElement, e.get("results"));
    for (const [key, expected, formula] of [["heldRate", "75%", "6 ÷ 8 × 100"], ["acceptanceRate", "66.7%", "4 ÷ 6 × 100"], ["opportunityRate", "33.3%", "2 ÷ 6 × 100"], ["bookedOpportunityRate", "25%", "2 ÷ 8 × 100"]]) {
      assert.equal(e.metric(key).querySelector("strong").textContent, expected); assert.equal(e.metric(key).querySelector("small").textContent, formula);
    }
    assert.deepEqual(Array.from(e.get("stages").querySelectorAll("strong"), item => item.textContent), ["8", "6", "4", "2"]);
    assert.match(e.get("result-mode").textContent, /Your numbers/); assert.match(e.get("notes").textContent, /small group of 8/);
  });

  await test("all three practical examples run the same model as typed counts", e => {
    assert.equal(e.examples.length, 3);
    for (const example of e.examples) {
      assert.equal("results" in example, false); e.sample(example.id);
      const snapshot = ["stages", "metrics", "focus-title", "focus-summary", "checks", "notes"].map(id => e.get(id).textContent);
      assert.match(e.get("result-mode").textContent, /Illustrative example/);
      assert.equal(e.get("focus-title").textContent, e.window.MeetingQualityModel.evaluate(example.input).focus.title);
      e.check(example.input);
      assert.deepEqual(["stages", "metrics", "focus-title", "focus-summary", "checks", "notes"].map(id => e.get(id).textContent), snapshot);
      assert.match(e.get("result-mode").textContent, /Your numbers/);
    }
  });

  await test("Enter on each numeric field calculates without submitting or reloading", e => {
    for (const key of fields) {
      e.fill(); const event = new e.window.KeyboardEvent("keydown", { key: "Enter", bubbles: true, cancelable: true });
      e.get(key).dispatchEvent(event); assert.equal(event.defaultPrevented, true); assert.equal(e.get("results").hidden, false);
    }
  });

  await test("negative, fractional, exponent, formatted and excessive counts are rejected", e => {
    for (const invalid of ["-1", "1.5", "1e2", "1,000", "1000001", "NaN", "Infinity", "<img src=x onerror=alert(1)>"]) {
      e.check({ ...practical, booked: invalid }); assert.equal(e.get("errors").hidden, false); assert.equal(e.get("results").hidden, true);
      assert.equal(e.get("booked").getAttribute("aria-invalid"), "true"); assert.equal(e.get("errors").querySelectorAll("img,script").length, 0);
    }
  });

  await test("impossible later counts are rejected even across an unknown intermediate stage", e => {
    for (const input of [{ ...practical, held: 9 }, { ...practical, accepted: 7 }, { ...practical, opportunities: 5 }, { ...practical, held: null, accepted: 9 }, { ...practical, accepted: null, opportunities: 7 }]) {
      e.check(input); assert.equal(e.get("errors").hidden, false); assert.match(e.get("errors").textContent, /cannot exceed/); assert.equal(e.get("results").hidden, true);
    }
  });

  await test("unknown checkbox suppresses stale field contents and restores editing on uncheck", e => {
    e.check(); e.unknown("accepted", true); assert.equal(e.get("accepted").disabled, true); assert.equal(e.get("results").hidden, true);
    e.click("check"); assert.match(e.get("stages").textContent, /Unknown/); assert.equal(e.metric("acceptanceRate").querySelector("strong").textContent, "Not available");
    assert.equal(e.metric("opportunityRate").querySelector("strong").textContent, "33.3%");
    assert.match(e.get("focus-title").textContent, /missing outcome tracking/);
    e.unknown("accepted", false); assert.equal(e.get("accepted").disabled, false); assert.equal(e.get("accepted").value, "4");
    e.click("check"); assert.equal(e.metric("acceptanceRate").querySelector("strong").textContent, "66.7%");
  });

  await test("blank is unknown while an explicit zero gives a supported zero rate", e => {
    e.check({ booked: 8, held: 6, accepted: "", opportunities: "", outcomes: "complete" });
    assert.equal(e.metric("acceptanceRate").querySelector("strong").textContent, "Not available"); assert.match(e.get("notes").textContent, /not been counted as zero/);
    e.check({ booked: 8, held: 6, accepted: 0, opportunities: 0, outcomes: "complete" });
    assert.equal(e.metric("acceptanceRate").querySelector("strong").textContent, "0%"); assert.equal(e.metric("opportunityRate").querySelector("strong").textContent, "0%");
    assert(!e.get("stages").textContent.includes("Unknown"));
  });

  await test("all-zero input never produces NaN, Infinity or invented conversion", e => {
    e.check({ booked: 0, held: 0, accepted: 0, opportunities: 0, outcomes: "complete" });
    assert.equal(e.get("results").hidden, false); assert.match(e.get("focus-title").textContent, /Start with one group/);
    for (const item of e.get("metrics").querySelectorAll("strong")) assert.equal(item.textContent, "Not available");
    assert(!/NaN|Infinity|100%/.test(e.get("metrics").textContent));
  });

  await test("zero held meetings leave held-based rates unavailable and booked opportunity rate at zero", e => {
    e.check({ booked: 8, held: 0, accepted: 0, opportunities: 0, outcomes: "complete" });
    assert.equal(e.metric("heldRate").querySelector("strong").textContent, "0%");
    assert.equal(e.metric("acceptanceRate").querySelector("strong").textContent, "Not available");
    assert.equal(e.metric("opportunityRate").querySelector("strong").textContent, "Not available");
    assert.equal(e.metric("bookedOpportunityRate").querySelector("strong").textContent, "0%");
  });

  await test("all meetings advancing receives factual acknowledgement without fabricated criticism", e => {
    e.check({ booked: 3, held: 3, accepted: 3, opportunities: 3, outcomes: "complete" });
    assert.match(e.get("focus-title").textContent, /Every recorded booking/);
    for (const item of e.get("metrics").querySelectorAll("strong")) assert.equal(item.textContent, "100%");
    assert.match(e.get("focus-summary").textContent, /do not establish revenue/); assert(!/poor|failure|bad campaign/i.test(e.get("focus-summary").textContent));
  });

  await test("ties do not choose an arbitrary worst stage or invent a reason", e => {
    e.check(); assert.match(e.get("focus-title").textContent, /Several stages share/);
    assert.match(e.get("focus-summary").textContent, /each have a gap of 2 meetings/);
    assert.match(e.get("focus-summary").textContent, /do not point to one clear starting stage/);
  });

  await test("the three largest-gap outcomes change the advice and relevant resource", e => {
    const scenarios = [
      [{ booked: 8, held: 3, accepted: 2, opportunities: 1, outcomes: "complete" }, /bookings and held/, "/articles/outbound-appointment-setting/"],
      [{ booked: 8, held: 7, accepted: 3, opportunities: 2, outcomes: "complete" }, /sales acceptance after/, "/articles/what-makes-b2b-appointment-qualified-practical-standard/"],
      [{ booked: 8, held: 7, accepted: 6, opportunities: 1, outcomes: "complete" }, /next step after/, "/articles/how-to-hand-off-qualified-appointment-from-sdr-to-sales/"]
    ];
    const texts = new Set();
    for (const [input, title, pathname] of scenarios) { e.check(input); assert.match(e.get("focus-title").textContent, title); assert.equal(new URL(e.get("resource").href).pathname, pathname); texts.add(e.get("checks").textContent); }
    assert.equal(texts.size, 3);
  });

  await test("pending outcomes are explicitly provisional and never called rejections", e => {
    e.check({ booked: 8, held: 7, accepted: 3, opportunities: 2, outcomes: "pending" });
    assert.equal(e.get("completeness").textContent, "Still in progress"); assert.match(e.get("focus-summary").textContent, /not been recorded as accepted by sales yet/);
    assert(!e.get("focus-summary").textContent.includes("were not accepted")); assert.match(e.get("notes").textContent, /not confirmed losses or rejections/);
  });

  await test("unknown outcome timing stays explicit in results and stage interpretation", e => {
    e.check({ ...practical, outcomes: "unknown" }); assert.equal(e.get("completeness").textContent, "Outcome timing not confirmed");
    assert.match(e.get("focus-summary").textContent, /so far/); assert.match(e.get("notes").textContent, /Outcome timing is unknown/);
  });

  await test("repeated checks replace result content instead of accumulating duplicate advice", e => {
    for (let index = 0; index < 12; index++) { e.check(); assert.equal(e.get("stages").children.length, 4); assert.equal(e.get("metrics").children.length, 4); assert.equal(e.get("checks").children.length, 3); }
  });

  await test("editing any count invalidates results and prevents stale copy or download", async e => {
    for (const key of fields) {
      e.check(); e.field(key, "1"); assert.equal(e.get("results").hidden, true); assert.match(e.get("status").textContent, /Check again/);
      e.click("copy"); e.click("download"); await settle();
    }
    assert.deepEqual(e.clipboard, []); assert.deepEqual(e.downloads, []);
  }, { clipboard: true });

  await test("outcome select change invalidates previous results and clears export feedback", async e => {
    e.check(); e.click("copy"); await settle(); assert.match(e.get("copy-status").textContent, /copied/);
    e.get("outcomes").value = "pending"; e.get("outcomes").dispatchEvent(new e.window.Event("change", { bubbles: true }));
    assert.equal(e.get("results").hidden, true); assert.equal(e.get("copy-status").textContent, "");
    e.click("check"); assert.equal(e.get("completeness").textContent, "Still in progress");
  }, { clipboard: true });

  await test("clear restores blank editable fields, unknown timing and booking focus", e => {
    e.sample("missing"); e.click("copy"); e.click("clear");
    for (const key of fields) { assert.equal(e.get(key).value, ""); assert.equal(e.get(key).disabled, false); if (key !== "booked") assert.equal(e.get(key + "-unknown").checked, false); }
    assert.equal(e.get("outcomes").value, "unknown"); assert.equal(e.get("results").hidden, true); assert.equal(e.get("errors").hidden, true);
    assert.equal(e.get("copy-fallback-wrap").hidden, true); assert.equal(e.get("copy-fallback").value, ""); assert.equal(e.window.document.activeElement, e.get("booked"));
  });

  await test("copy exports counts, formulas, checklist, context and useful source links", async e => {
    e.check(); e.click("copy"); await settle(); assert.equal(e.clipboard.length, 1);
    for (const text of ["Booked meetings: 8", "Held meetings: 6", "Sales-accepted meetings: 4", "Meetings that created an opportunity: 2", "Held rate: 75% (6 ÷ 8 × 100)", "YOUR CHECKLIST", "[ ]", "small group of 8", "https://www.callteam.ca/articles/", "https://calendly.com/hello-callteam/new-meeting"]) assert(e.clipboard[0].includes(text), "Export missing " + text);
    assert.match(e.get("copy-status").textContent, /copied/); assert.equal(e.get("copy-fallback-wrap").hidden, true);
  }, { clipboard: true });

  await test("copy with missing clipboard supplies a masked selectable fallback", e => {
    e.check(); e.click("copy"); assert.equal(e.get("copy-fallback-wrap").hidden, false); assert.equal(e.get("copy-fallback").readOnly, true);
    assert(e.get("copy-fallback").closest('[data-clarity-mask="true"]')); assert.equal(e.window.document.activeElement, e.get("copy-fallback"));
    assert.match(e.get("copy-fallback").value, /Booked meetings: 8/);
  });

  await test("clipboard rejection supplies the current report without losing results", async e => {
    e.check(); e.click("copy"); await settle(); assert.equal(e.get("results").hidden, false); assert.equal(e.get("copy-fallback-wrap").hidden, false);
    assert.match(e.get("copy-fallback").value, /Held rate: 75%/); assert.match(e.get("copy-status").textContent, /Clipboard access is unavailable/);
  }, { clipboard: "reject" });

  const delayedSuccess = deferred();
  await test("editing during delayed copy suppresses a stale success message", async e => {
    e.check(); e.click("copy"); e.field("booked", "9"); delayedSuccess.resolve(); await settle();
    assert.equal(e.get("copy-status").textContent, ""); assert.equal(e.get("results").hidden, true); assert.equal(e.get("copy-fallback-wrap").hidden, true);
  }, { clipboard: true, clipboardGate: delayedSuccess });

  const delayedFailure = deferred();
  await test("recalculating before clipboard rejection never shows the old report", async e => {
    e.check(); e.click("copy"); e.check({ booked: 3, held: 3, accepted: 3, opportunities: 3, outcomes: "complete" });
    delayedFailure.reject(new Error("Clipboard refused")); await settle();
    assert.equal(e.get("copy-status").textContent, ""); assert.equal(e.get("copy-fallback-wrap").hidden, true); assert.match(e.get("focus-title").textContent, /Every recorded booking/);
  }, { clipboard: true, clipboardGate: delayedFailure });

  const delayedClear = deferred();
  await test("clearing while a copy is pending leaves the reset page clean", async e => {
    e.check(); e.click("copy"); e.click("clear"); delayedClear.resolve(); await settle();
    assert.equal(e.get("copy-status").textContent, ""); assert.equal(e.get("results").hidden, true); assert.equal(e.get("booked").value, "");
  }, { clipboard: true, clipboardGate: delayedClear });

  await test("downloaded text contains the latest figures and marks pending outcomes", async e => {
    e.sample("pending"); e.click("download"); await settle(); assert.equal(e.downloads.length, 1); assert.equal(e.downloads[0].filename, "callteam-meeting-results.txt");
    const entry = e.objectURLs.find(item => item.url === e.downloads[0].href); assert(entry); assert.match(entry.blob.type, /^text\/plain/);
    const text = await e.blobText(entry.blob); assert.match(text, /Still in progress/); assert.match(text, /Held meetings: 4/); assert.match(text, /Held rate: 50%/); assert.match(text, /not confirmed losses/);
    await new Promise(resolve => setTimeout(resolve, 5)); assert.equal(entry.revoked, true);
  });

  await test("download unavailability gives a selectable current report", e => {
    e.check(); e.click("download"); assert.equal(e.get("copy-fallback-wrap").hidden, false); assert.match(e.get("copy-status").textContent, /Download is unavailable/);
    assert.match(e.get("copy-fallback").value, /Booked meetings: 8/); assert.deepEqual(e.downloads, []);
  }, { downloadReject: true });

  await test("sandbox file preview calculates and uses absolute dynamic resource links without tracking", async e => {
    e.sample("missing"); e.click("copy"); e.click("download"); await settle();
    assert.equal(e.get("results").hidden, false); assert.match(e.get("resource").href, /^https:\/\/www\.callteam\.ca\/articles\//);
    assert.equal(e.get("resource").target, "_blank"); assert.match(e.get("resource").rel, /noopener/); assert.match(e.get("resource").rel, /noreferrer/);
    assert.deepEqual(e.events, []);
  }, { file: true, preview: true, clipboard: true });

  await test("private input and result regions are masked and controls have accessible names", e => {
    for (const key of [...fields, "outcomes", "copy-fallback"]) {
      assert(e.get(key).closest('[data-clarity-mask="true"]')); assert(e.window.document.querySelector('label[for="' + e.get(key).id + '"]'));
    }
    for (const key of fields.slice(1)) assert(e.window.document.querySelector('label[for="mq-' + key + '-unknown"]'));
    assert.equal(e.get("results").getAttribute("tabindex"), "-1"); assert.equal(e.get("errors").getAttribute("role"), "alert");
    assert.equal(e.get("status").getAttribute("role"), "status"); assert.equal(e.get("copy-status").getAttribute("role"), "status");
  });

  await test("analytics contain only named interactions and never private campaign counts", async e => {
    e.check({ booked: 987654, held: 876543, accepted: 765432, opportunities: 654321, outcomes: "complete" });
    e.click("copy"); e.click("download"); e.window.document.querySelector("[data-mq-booking]").click(); await settle();
    const names = e.events.map(args => args[1]);
    for (const name of ["meeting_quality_checked", "meeting_quality_copied", "meeting_quality_downloaded", "meeting_quality_booking_clicked"]) assert(names.includes(name));
    assert(!/987654|876543|765432|654321/.test(JSON.stringify(e.events))); assert(!/987654|876543|765432|654321/.test(e.window.location.href));
  }, { clipboard: true });

  await test("essential definitions, formulas, examples and FAQs remain readable without JavaScript", e => {
    const staticDOM = new JSDOM(html);
    try {
      const document = staticDOM.window.document;
      assert.equal(document.getElementById("mq-check").disabled, true);
      assert.match(document.getElementById("mq-definitions").textContent, /Sales-accepted meeting/);
      assert.match(document.getElementById("mq-example").textContent, /6 ÷ 8 × 100 = 75%/);
      assert(document.querySelectorAll(".mq-faqs details").length >= 6); assert.match(document.querySelector("noscript").textContent, /Enable JavaScript/);
    } finally { staticDOM.window.close(); }
  });

  assert.equal(passed, expectedScenarios, "Every expected interaction scenario must finish");
  fs.writeSync(1, "\n" + passed + " rendered-page interaction scenarios passed. Fetch/XHR/beacon/form/storage writes blocked; zero requests observed. This does not claim visual browser QA.\n");
  completed = true;
})().catch(error => { fs.writeSync(2, String(error.stack || error) + "\n"); process.exitCode = 1; });
