"use strict";
// Local review artifact only. Never deploy the packaged preview to CallTeam.
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict");
const { JSDOM } = require("jsdom");
const root = path.resolve(__dirname, ".."), site = path.join(root, "_site");
const output = process.argv[2];
assert(output && path.isAbsolute(output), "Supply an absolute preview HTML filename.");
const route = "/b2b-cold-calling-campaign-process/";
const dom = new JSDOM(fs.readFileSync(path.join(site, route, "index.html"), "utf8"));
const doc = dom.window.document;
doc.title = "CallTeam First 60 Days | Sandbox Preview";
doc.querySelector('meta[name="robots"]').content = "noindex, nofollow";
doc.querySelector('link[rel="canonical"]').remove();
doc.querySelectorAll("script").forEach(node => { if (!node.src && node.textContent.includes("clarity.ms")) node.remove(); });
const config = doc.createElement("script");
config.textContent = 'window.CALLTEAM_LOCAL_PREVIEW=true;document.addEventListener("submit",function(e){e.preventDefault();e.stopImmediatePropagation();},true);';
doc.head.append(config);
const placements = [
 ["Outbound Sales Library", "resources/outbound-sales-library/index.html", "cta-library-campaign-process", "Resource card beside the existing Campaign Preview and US campaign example"],
 ["Pricing", "pricing/index.html", "cta-pricing-campaign-process", "After the campaign progression chart"],
 ["Homepage / Outbound Calling", "index.html", "cta-outbound-campaign-process", "Within Structured follow-up, after the activity rail"],
 ["Outsourced SDR", "services/outsourced-sdr/index.html", "cta-sdr-campaign-process", "At the end of Reporting and campaign improvement"],
 ["Campaign Preview", "b2b-outbound-campaign-planner/index.html", "cta-preview-campaign-process", "After the four execution steps"],
 ["US campaign example", "us-b2b-lead-generation-campaign-example/index.html", "cta-us-example-campaign-process", "After The first review"]
];
const review = doc.createElement("section");
review.id = "sandbox-link-placements";
review.className = "sandbox-placement-review";
review.innerHTML = '<p class="sandbox-label">Preview appendix / Not part of the published page</p><h2>Where the six links will appear</h2><p>These are the exact new elements from the sandbox pages. The main header and footer are unchanged.</p>';
for (const [name, file, id, position] of placements) {
  const source = new JSDOM(fs.readFileSync(path.join(site, file), "utf8"));
  const element = source.window.document.getElementById(id);
  assert(element, "Missing cross-link " + id);
  const item = doc.createElement("article");
  const heading = doc.createElement("h3"); heading.textContent = name;
  const location = doc.createElement("p"); location.textContent = position;
  const frame = doc.createElement("div");
  frame.className = id.includes("preview-") ? "campaign-page" : id.includes("us-example-") ? "uce-page" : "";
  frame.append(doc.importNode(element, true));
  item.append(heading, location, frame);
  review.append(item); source.window.close();
}
doc.querySelector("main").after(review);
const contextStyle = doc.createElement("style");
contextStyle.textContent = ["contextual-tools.css", "outbound-library.css", "campaign-preview.css", "us-campaign-example.css"].filter(file => fs.existsSync(path.join(site,"assets/css",file))).map(file => fs.readFileSync(path.join(site,"assets/css",file),"utf8")).join("\n");
doc.head.append(contextStyle);
doc.querySelectorAll('link[rel="stylesheet"]').forEach(node => {
  const href = node.getAttribute("href");
  if (!href.startsWith("/")) return; // Public fonts are optional; local fallbacks work offline.
  const style = doc.createElement("style"); style.textContent = fs.readFileSync(path.join(site, href), "utf8"); node.replaceWith(style);
});
const mime = file => file.endsWith(".png") ? "image/png" : file.endsWith(".svg") ? "image/svg+xml" : "image/jpeg";
doc.querySelectorAll('img[src^="/"],link[rel="icon"][href^="/"]').forEach(node => {
  const attr = node.tagName === "IMG" ? "src" : "href", url = node.getAttribute(attr);
  node.setAttribute(attr, "data:" + mime(url) + ";base64," + fs.readFileSync(path.join(site, url)).toString("base64"));
});
doc.querySelectorAll("script[src]").forEach(node => {
  const src = node.getAttribute("src"); assert(src.startsWith("/"), "Unexpected external executable script");
  node.textContent = fs.readFileSync(path.join(site, src), "utf8").replace(/<\/script/gi, "<\\/script"); node.removeAttribute("src"); node.removeAttribute("defer");
});
doc.querySelectorAll('a[href^="/"]').forEach(node => {
  const href = node.getAttribute("href");
  if (href === route) node.setAttribute("href", "#process-title");
  else if (node.hasAttribute("data-uce-download")) node.setAttribute("href", "data:text/plain;charset=utf-8;base64," + fs.readFileSync(path.join(site, href)).toString("base64"));
  else { node.href = "https://www.callteam.ca" + href; node.target = "_blank"; node.rel = "noopener"; }
});
for (const form of doc.querySelectorAll("form")) {
  form.action = "#contact";
  const submit = form.querySelector('[type="submit"]');
  if (submit) { submit.disabled = true; submit.textContent = "Sending disabled in this sandbox preview"; }
}
const banner = doc.createElement("aside"); banner.className = "sandbox-preview-banner";
banner.setAttribute("aria-label", "Sandbox preview");
banner.innerHTML = '<strong>CallTeam sandbox preview</strong><span>Nothing is deployed. Explore the full 60-day walkthrough here. Contact sending is disabled. Other resource and booking links open the live site.</span><a href="#sandbox-link-placements">See the six link placements ↓</a>';
doc.body.prepend(banner);
const style = doc.createElement("style");
style.textContent = '.sandbox-preview-banner{display:flex;flex-wrap:wrap;gap:8px 20px;padding:13px 24px;background:#111;color:#fff;border-bottom:3px solid #ff5a1f;font:12px/1.6 Arial,sans-serif}.sandbox-preview-banner span{max-width:800px}.sandbox-preview-banner a{color:#fff;text-underline-offset:4px}.sandbox-placement-review{max-width:1200px;width:calc(100% - 40px);margin:50px auto;padding:30px;background:#f5f4f2;border:1px solid #d8d6d2}.sandbox-placement-review>h2{font-size:32px;line-height:1.25;margin:10px 0}.sandbox-placement-review>p{font-size:14px;line-height:1.7}.sandbox-label{font-size:11px!important;letter-spacing:.1em;text-transform:uppercase}.sandbox-placement-review>article{padding:25px;margin-top:25px;border:1px solid #d8d6d2;background:#fff}.sandbox-placement-review>article>h3{font-size:23px}.sandbox-placement-review>article>p{font-size:12px;margin:10px 0 18px}.sandbox-placement-review .library-route-card{display:block;max-width:600px}.sandbox-placement-review .library-route-card h3{font-size:27px}@media(max-width:600px){.sandbox-placement-review{padding:20px}.sandbox-placement-review>article{padding:18px}}@media print{.sandbox-preview-banner,.sandbox-placement-review{display:none}}';
doc.head.append(style);
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, "<!DOCTYPE html>\n" + doc.documentElement.outerHTML + "\n");
assert(!doc.documentElement.outerHTML.includes("clarity.ms"));
assert.equal(doc.querySelectorAll("script[src]").length, 0);
assert.equal(doc.querySelectorAll(".process-faqs details").length, 8);
assert.equal(review.querySelectorAll(":scope > article").length, 6);
console.log(JSON.stringify({file:output,bytes:fs.statSync(output).size,placements:6,analyticsRemoved:true,contactSendingDisabled:true,standaloneAssetsEmbedded:true}));
dom.window.close();
