"use strict";

// Built-page DOM checks. These do not claim real-browser keyboard or visual QA.
const assert = require("node:assert/strict");
const fs = require("node:fs"), path = require("node:path"), timers = require("node:timers");
const { JSDOM, VirtualConsole } = require("jsdom");
const expectedScenarios = 25;
let passed = 0, completed = false, currentScenario = "load built page";
process.on("exit", () => {
  if (!completed) {
    fs.writeSync(2, `INCOMPLETE: ${passed}/${expectedScenarios}; active: ${currentScenario}\n`);
    process.exitCode = 1;
  }
});
const base = path.resolve(__dirname, ".."), output = path.join(base, "_site");
const route = "/us-b2b-lead-generation-campaign-example/", canonical = "https://www.callteam.ca" + route;
const html = fs.readFileSync(path.join(output, route, "index.html"), "utf8");
const script = fs.readFileSync(path.join(output, "assets/js/us-campaign-example.js"), "utf8");
const css = fs.readFileSync(path.join(output, "assets/css/us-campaign-example.css"), "utf8");
const brief = fs.readFileSync(path.join(output, "assets/downloads/us-b2b-campaign-example.txt"), "utf8");
const source = require("../src/_data/usCampaignExample.js");
const ids = ["existing-system", "send-info", "relevant-problem"];
const labels = ["We already have software", "Send me some information", "That is a problem for us"];
const allowedEvents = new Set(["reply_selected", "brief_copied", "brief_download", "booking_click", "resource_click"].map(x => "us_campaign_example_" + x));
const normalized = text => text.replace(/\s+/g, " ").trim();
const settle = async () => { for (let i = 0; i < 3; i++) await new Promise(resolve => timers.setImmediate(resolve)); };
function deferred() { let resolve; const promise = new Promise(r => { resolve = r; }); return { promise, resolve }; }
function setup(options = {}) {
  const errors = [], operations = [], events = [], copies = [];
  const console = new VirtualConsole(); console.on("jsdomError", e => errors.push(e.message));
  const dom = new JSDOM(options.noPage ? "<!doctype html><html><body><p>Unrelated page</p></body></html>" : html, {
    url: options.file ? "file:///preview/callteam-example.html" : canonical,
    runScripts: "outside-only", virtualConsole: console
  });
  const w = dom.window, d = w.document;
  w.addEventListener("error", e => errors.push(e.message));
  const prohibited = name => (...args) => { operations.push({ name, args }); throw new Error("Unexpected " + name); };
  w.fetch = prohibited("fetch"); w.XMLHttpRequest = prohibited("XHR"); w.WebSocket = prohibited("WebSocket");
  Object.defineProperty(w.navigator, "sendBeacon", { configurable: true, value: prohibited("beacon") });
  w.Storage.prototype.setItem = prohibited("storage write");
  w.HTMLFormElement.prototype.submit = prohibited("form submission");
  w.HTMLFormElement.prototype.requestSubmit = prohibited("form requestSubmit");
  Object.defineProperty(d, "cookie", { configurable: true, get: () => "", set: prohibited("cookie write") });
  if (options.analytics !== "absent") w.clarity = (...args) => { events.push(args); if (options.analytics === "throw") throw new Error("Analytics unavailable"); };
  if (options.preview) w.CALLTEAM_LOCAL_PREVIEW = true;
  if (options.clipboard) Object.defineProperty(w.navigator, "clipboard", { configurable: true, value: {
    writeText: async text => { copies.push(text); if (options.gate) await options.gate.promise; if (options.clipboard === "reject") throw new Error("Clipboard denied"); }
  } });
  d.addEventListener("click", e => { if (e.target.closest("a[href]")) e.preventDefault(); });
  if (!options.noJS) w.eval(script);
  return { dom, w, d, errors, operations, events, copies, get: suffix => d.getElementById("uce-" + suffix), button: id => d.querySelector(`[data-uce-branch="${id}"]`), panel: id => d.querySelector(`[data-uce-panel="${id}"]`) };
}
async function test(name, callback, options = {}) {
  currentScenario = name; const e = setup(options); let watchdog;
  try {
    await Promise.race([(async () => { await callback(e); await settle(); })(), new Promise((_, reject) => { watchdog = timers.setTimeout(() => reject(new Error("Timeout: " + name)), 10000); watchdog.ref(); })]);
    assert.deepEqual(e.errors, [], "No unexpected script or DOM errors");
    assert.deepEqual(e.operations, [], "Page interaction must not make requests or persist data");
    for (const args of e.events) { assert.equal(args.length, 2); assert.equal(args[0], "event"); assert(allowedEvents.has(args[1]), "Only a fixed event name may be sent"); }
    passed++; fs.writeSync(1, "PASS " + name + "\n");
  } finally { timers.clearTimeout(watchdog); e.dom.window.close(); }
}
function exerciseLinks(e) {
  for (const selector of ["[data-uce-download]", "[data-uce-booking]", "[data-uce-resource]"]) e.d.querySelector(selector).click();
}
function fallbackAssertions(e) {
  assert.equal(e.get("brief-details").open, true);
  const text = e.get("brief-text"); assert.equal(text.readOnly, true);
  assert.equal(e.d.activeElement, text); assert.equal(text.selectionStart, 0); assert.equal(text.selectionEnd, text.value.length);
  assert.match(e.get("copy-status").textContent, /copy the brief below.*download link/i);
  assert.equal(e.get("copy").disabled, false);
}
(async () => {
  await test("metadata has the approved title, one H1, canonical and indexable page", e => {
    assert.equal(e.d.title, "US B2B Lead Generation Example: From Cold Call to Meeting");
    assert.equal(e.d.querySelectorAll("h1").length, 1);
    assert.equal(normalized(e.d.querySelector("h1").textContent), "See how a US calling campaign becomes a qualified sales meeting.");
    assert.equal(e.d.querySelector('link[rel="canonical"]').href, canonical);
    assert.equal(e.d.documentElement.lang, "en-US");
    assert(!/noindex/.test(e.d.querySelector('meta[name="robots"]').content));
    const allIds = [...e.d.querySelectorAll("[id]")].map(x => x.id); assert.equal(new Set(allIds).size, allIds.length, "IDs must be unique");
  });
  await test("structured article, author, breadcrumbs and dates agree with the visible page", e => {
    const nodes = [...e.d.querySelectorAll('script[type="application/ld+json"]')].flatMap(x => { const json = JSON.parse(x.textContent); return json["@graph"] || [json]; });
    const article = nodes.find(x => x["@type"] === "Article"), person = nodes.find(x => x["@id"] === article.author["@id"]), page = nodes.find(x => x["@id"] === canonical + "#webpage");
    assert.equal(article.headline, e.d.title); assert.equal(page.url, canonical); assert.equal(article.mainEntityOfPage["@id"], page["@id"]);
    assert.equal(person.name, "Harj Singh"); assert.equal(e.d.querySelector(".uce-byline a").href, person.url);
    assert.equal(article.isAccessibleForFree, true); for (const key of ["datePublished", "dateModified"]) assert(Number.isFinite(Date.parse(article[key])));
    const crumbs = nodes.find(x => x["@id"] === canonical + "#breadcrumb").itemListElement; assert.equal(crumbs.length, 3); assert.equal(crumbs[2].item, canonical);
  });
  await test("all eight FAQs are readable HTML and exactly match FAQ structured data", e => {
    const graph = [...e.d.querySelectorAll('script[type="application/ld+json"]')].flatMap(x => JSON.parse(x.textContent)["@graph"] || []);
    const faq = graph.find(x => x["@type"] === "FAQPage").mainEntity;
    const details = [...e.d.querySelectorAll(".uce-faqs details")]; assert.equal(details.length, 8); assert.equal(faq.length, 8);
    for (let i = 0; i < 8; i++) { assert.equal(normalized(details[i].querySelector("summary").textContent), faq[i].name); assert.equal(normalized(details[i].querySelector("p").textContent), faq[i].acceptedAnswer.text); }
  });
  await test("without JavaScript all replies and the complete brief remain readable and downloadable", e => {
    assert.equal(e.get("branch-controls").hidden, true); assert.equal(e.get("copy").hidden, true);
    for (const id of ids) { assert.equal(e.panel(id).hidden, false); assert(e.panel(id).querySelector("blockquote").textContent.length > 40); }
    assert.equal(e.get("brief-text").value, brief); assert.equal(brief, source.briefText);
    const download = e.d.querySelector("[data-uce-download]"); assert.equal(download.getAttribute("href"), "/assets/downloads/us-b2b-campaign-example.txt"); assert(download.hasAttribute("download"));
  }, { noJS: true });
  await test("initial enhancement selects one reply and reveals usable native controls", e => {
    assert.equal(e.get("branch-controls").hidden, false); assert.equal(e.get("copy").hidden, false);
    ids.forEach((id, i) => { assert.equal(e.panel(id).hidden, i !== 0); assert.equal(e.button(id).getAttribute("aria-pressed"), String(i === 0)); assert.equal(e.button(id).type, "button"); assert.equal(e.button(id).tabIndex, 0); assert(e.button(id).textContent.includes(labels[i])); });
    assert.equal(e.events.length, 0, "Initialization is not a user event");
  });
  await test("each buyer reply selects the right panel and announces its heading", e => {
    for (const id of ids) { e.button(id).click(); assert.equal(e.button(id).getAttribute("aria-controls"), e.panel(id).id); assert.equal(e.panel(id).hidden, false); assert.equal(ids.filter(x => !e.panel(x).hidden).length, 1); assert.equal(e.get("branch-status").textContent, "Showing: " + e.panel(id).querySelector("h3").textContent); }
    assert.equal(e.get("branch-status").getAttribute("aria-live"), "polite");
  });
  await test("repeated reply switching does not duplicate content or move control focus", e => {
    const original = ids.map(id => e.panel(id).innerHTML);
    for (let i = 0; i < 24; i++) { const id = ids[i % 3]; e.button(id).focus(); e.button(id).click(); assert.equal(e.d.activeElement, e.button(id)); assert.equal(ids.filter(x => e.button(x).getAttribute("aria-pressed") === "true").length, 1); }
    assert.deepEqual(ids.map(id => e.panel(id).innerHTML), original); assert.equal(e.d.querySelectorAll("[data-uce-panel]").length, 3);
  });
  await test("a buyer whose problem is already solved leaves without an invented booking", e => {
    e.button(ids[0]).click(); const text = e.panel(ids[0]).textContent;
    assert.match(text, /Closed: no current need identified/); assert.match(text, /no meeting/); assert.match(text, /not agreed to a meeting or further follow-up/);
  });
  await test("a request for information remains follow-up rather than a qualified meeting", e => {
    e.button(ids[1]).click(); const text = e.panel(ids[1]).textContent;
    assert.match(text, /meeting not qualified/); assert.match(text, /not enough to qualify a meeting/); assert.match(text, /one follow-up call/); assert.match(text, /not a booked sales meeting/);
  });
  await test("an agreed first discussion preserves unknown budget, authority and later outcomes", e => {
    e.button(ids[2]).click(); const text = e.panel(ids[2]).textContent;
    assert.match(text, /buyer agreed to the discussion/); assert.match(text, /Budget and final purchasing authority are still unknown/); assert.match(text, /invitation acceptance and attendance separately/);
    assert.match(e.get("handoff").textContent, /No opportunity has been recorded yet/); assert.match(e.get("handoff").textContent, /Final purchasing authority is unconfirmed/);
  });
  await test("the fixed handoff stays explicitly tied to the third reply as visitors explore other replies", e => {
    const record = e.get("handoff").innerHTML; assert.match(e.get("handoff").textContent, /completed sample follows the third reply/);
    for (const id of ids) { e.button(id).click(); assert.equal(e.get("handoff").innerHTML, record); }
    assert.match(e.d.querySelector(".uce-disclosure").textContent, /illustrative/); assert.match(e.d.querySelector(".uce-disclosure").textContent, /not a client transcript/);
  });
  await test("dated Chicago and New York meeting and follow-up times are internally consistent", e => {
    const format = (iso, zone) => new Intl.DateTimeFormat("en-US", { timeZone: zone, weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(iso));
    assert.match(format("2026-10-20T15:30:00Z", "America/Chicago"), /Tuesday, October 20 at 10:30 AM/);
    assert.match(format("2026-10-20T15:30:00Z", "America/New_York"), /Tuesday, October 20 at 11:30 AM/);
    assert.match(format("2026-10-21T15:00:00Z", "America/Chicago"), /Wednesday, October 21 at 10:00 AM/);
    assert.match(e.get("handoff").textContent, /10:30–10:50 a.m. America\/Chicago.*11:30–11:50 a.m. America\/New_York/);
    assert.match(e.panel(ids[1]).textContent, /Wednesday, October 21, 2026, at 10:00 a.m. Chicago time/);
  });
  await test("copy exports the complete brief exactly and confirms success accessibly", async e => {
    e.get("copy").click(); await settle(); assert.deepEqual(e.copies, [brief]); assert.match(e.get("copy-status").textContent, /brief copied/); assert.equal(e.get("copy").disabled, false); assert.equal(e.get("copy-status").getAttribute("role"), "status");
  }, { clipboard: true });
  await test("clipboard rejection opens and selects the readonly manual-copy fallback", async e => {
    e.get("copy").click(); await settle(); fallbackAssertions(e); assert(!e.events.some(x => x[1].endsWith("brief_copied")));
  }, { clipboard: "reject" });
  await test("clipboard absence still allows manual copying and the static download", async e => {
    e.get("copy").click(); await settle(); fallbackAssertions(e); assert.equal(e.copies.length, 0); assert(e.d.querySelector("[data-uce-download]").href.endsWith(".txt"));
  });
  const gate = deferred();
  await test("pending copy ignores repeated activation and permits another copy after completion", async e => {
    e.get("copy").click(); e.get("copy").dispatchEvent(new e.w.MouseEvent("click", { bubbles: true })); assert.equal(e.copies.length, 1); assert.equal(e.get("copy").disabled, true);
    gate.resolve(); await settle(); e.get("copy").click(); await settle(); assert.equal(e.copies.length, 2); assert.equal(e.get("copy").disabled, false);
  }, { clipboard: true, gate });
  await test("initializing twice never duplicates reply, copy or link event listeners", async e => {
    e.w.eval(script); e.button(ids[1]).click(); e.get("copy").click(); await settle(); exerciseLinks(e);
    assert.equal(e.copies.length, 1); assert.equal(e.events.length, 5); assert.equal(new Set(e.events.map(x => x[1])).size, 5);
  }, { clipboard: true });
  await test("the page-specific script is harmless when its page root is absent", e => { assert.equal(e.events.length, 0); assert.equal(e.d.querySelector("p").textContent, "Unrelated page"); }, { noPage: true });
  await test("analytics sends only five fixed interaction names without brief text or buyer details", async e => {
    e.button(ids[2]).click(); e.get("copy").click(); await settle(); exerciseLinks(e);
    assert.deepEqual(e.events.map(x => x[1]), [...allowedEvents]);
    assert(!JSON.stringify(e.events).includes("Controller")); assert(!JSON.stringify(e.events).includes("2026-10"));
  }, { clipboard: true });
  await test("missing analytics does not block branching or copy success", async e => {
    e.button(ids[2]).click(); e.get("copy").click(); await settle(); exerciseLinks(e); assert.equal(e.panel(ids[2]).hidden, false); assert.match(e.get("copy-status").textContent, /brief copied/); assert.equal(e.events.length, 0);
  }, { clipboard: true, analytics: "absent" });
  await test("throwing analytics cannot interrupt the visitor's interaction", async e => {
    e.button(ids[1]).click(); e.get("copy").click(); await settle(); exerciseLinks(e); assert.equal(e.panel(ids[1]).hidden, false); assert.equal(e.get("copy").disabled, false); assert.match(e.get("copy-status").textContent, /brief copied/);
  }, { clipboard: true, analytics: "throw" });
  await test("file previews suppress all page analytics while interactions still work", async e => {
    e.button(ids[2]).click(); e.get("copy").click(); await settle(); exerciseLinks(e); assert.equal(e.events.length, 0); assert.equal(e.panel(ids[2]).hidden, false); assert.equal(e.copies.length, 1);
  }, { clipboard: true, file: true });
  await test("explicit local previews suppress page analytics on an HTTPS origin", async e => {
    e.button(ids[1]).click(); e.get("copy").click(); await settle(); exerciseLinks(e); assert.equal(e.events.length, 0); assert.equal(e.panel(ids[1]).hidden, false);
  }, { clipboard: true, preview: true });
  await test("all local links resolve and exactly six contextual pages link in without global navigation additions", e => {
    for (const link of e.d.querySelectorAll(".uce-page a[href]")) {
      const url = new URL(link.getAttribute("href"), canonical);
      if (url.origin !== new URL(canonical).origin) { assert.equal(url.href, "https://calendly.com/hello-callteam/new-meeting"); assert.equal(link.target, "_blank"); assert(link.rel.includes("noopener")); continue; }
      const file = path.join(output, decodeURIComponent(url.pathname), url.pathname.endsWith("/") ? "index.html" : ""); assert(fs.existsSync(file), "Missing local target " + url.pathname);
      if (url.hash) { const target = url.pathname === route ? e.d : new JSDOM(fs.readFileSync(file, "utf8")).window.document; assert(target.getElementById(decodeURIComponent(url.hash.slice(1))), "Missing fragment " + url.href); }
    }
    const incoming = [["articles/best-b2b-lead-generation-companies-usa", "cta-us-agencies-example"], ["articles/best-b2b-cold-calling-companies-usa", "cta-us-calling-example"], ["services/b2b-appointment-setting", "cta-appointment-us-example"], ["articles/b2b-lead-generation-services", "cta-buyer-guide-us-example"], ["articles/launch-90-day-b2b-outbound-campaign", "cta-90-day-us-example"], ["resources/outbound-sales-library", "cta-library-us-example"]];
    for (const [pathname, id] of incoming) { const doc = new JSDOM(fs.readFileSync(path.join(output, pathname, "index.html"), "utf8")).window.document; const links = [...doc.querySelectorAll("a[href]")].filter(a => a.getAttribute("href") === route); assert.equal(links.length, 1, "Exactly one contextual link on " + pathname); const marker = doc.getElementById(id); assert(marker); assert(marker === links[0] || marker.contains(links[0])); assert.equal(doc.querySelectorAll(`header a[href="${route}"], footer a[href="${route}"]`).length, 0); }
    assert.equal(e.d.querySelectorAll(`header a[href="${route}"], footer a[href="${route}"]`).length, 0);
  });
  await test("page styles stay scoped and retain mobile, visible-focus, reduced-motion and print fallbacks", e => {
    const style = e.d.createElement("style"); style.textContent = css; e.d.head.append(style);
    function inspect(rules) { for (const rule of rules) { if (rule.selectorText) for (const selector of rule.selectorText.split(",")) assert(selector.trim().startsWith(".uce-page"), "Unscoped selector " + selector); if (rule.cssRules) inspect(rule.cssRules); } }
    inspect(style.sheet.cssRules); assert.match(css, /@media\s*\(max-width:700px\)/); assert.match(css, /:focus-visible/); assert.match(css, /prefers-reduced-motion/); assert.match(css, /@media print/); assert.match(css, /\[data-uce-panel\]\[hidden\]\{display:grid!important/);
  });
  assert.equal(passed, expectedScenarios); completed = true;
  fs.writeSync(1, `\n${passed} US campaign example scenarios passed. Page fetch/XHR/beacon/form/storage/cookie operations blocked; zero such operations observed. DOM and static CSS checks do not claim visual or real-browser keyboard QA.\n`);
})().catch(error => { fs.writeSync(2, error.stack + "\n"); process.exitCode = 1; });
