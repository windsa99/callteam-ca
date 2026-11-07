"use strict";
const assert = require("assert/strict");
const fs = require("fs");
const path = require("path");
const { parseDocument, DomUtils } = require("htmlparser2");
const data = require("../src/_data/crmProviders.json");
const api = require("../src/assets/js/crm-guide.js");
const ids = ["close", "hubspot", "pipedrive", "freshsales", "zoho", "salesforce", "monday"];
assert.deepEqual(data.providers.map(p => p.id), ids);
assert.equal(data.checks.length, 6);
assert.equal(new Set(data.checks.map(c => c.id)).size, 6);
let combinations = 0;
for (const id of ids) {
  for (let mask = 0; mask < 64; mask++) {
    const flags = Array.from({length: 6}, (_, bit) => Boolean(mask & (1 << bit)));
    const input = {version: 1, selected: id, states: {[id]: flags}};
    const restored = api.cleanState(JSON.parse(JSON.stringify(input)), ids, 6);
    assert.equal(restored.selected, id);
    assert.deepEqual(restored.states[id], flags);
    for (const other of ids.filter(x => x !== id)) assert.deepEqual(restored.states[other], [false,false,false,false,false,false]);
    const text = api.checklistText(data.providers.find(p => p.id === id), data.checks, flags);
    assert.equal((text.match(/\[TRIED\]/g) || []).length, flags.filter(Boolean).length);
    assert.equal((text.match(/\[TO TEST\]/g) || []).length, 6 - flags.filter(Boolean).length);
    assert(text.includes("CRM: " + data.providers.find(p => p.id === id).name));
    data.checks.forEach(c => assert(text.includes(c.title) && text.includes(c.text)));
    assert(text.includes("Tick each task after testing it, then record what worked, what failed and what needs checking."));
    combinations++;
  }
}
for (const raw of [null, undefined, [], 0, "garbage", {version: 99}, {version: 1, selected: "unknown", states: {monday: "bad"}}]) {
  const clean = api.cleanState(raw, ids, 6);
  assert.equal(clean.selected, ids[0]);
  assert.equal(Object.keys(clean.states).length, 7);
  for (const flags of Object.values(clean.states)) assert.equal(flags.length, 6);
}
const polluted = JSON.parse('{"version":1,"selected":"__proto__","states":{"__proto__":[true],"close":[true,1,"true",null,false,{},true]}}');
const clean = api.cleanState(polluted, ids, 6);
assert.deepEqual(clean.states.close, [true,false,false,false,false,false]);
assert.equal(clean.selected, "close");
assert.equal(Object.prototype.polluted, undefined);

function harness(options = {}) {
  const elements = new Map();
  function el(id) {
    const obj = {id, textContent: "", value: "", checked: false, disabled: true, hidden: true, handlers: {}, attrs: {}, style: {setProperty() {}},
      addEventListener(type, callback) { this.handlers[type] = callback; },
      getAttribute(key) { return this.attrs[key]; },
      setAttribute(key, value) { this.attrs[key] = value; },
      focus() {}, select() {}, remove() {},
      async fire(type) { if (this.handlers[type]) await this.handlers[type](); }
    };
    elements.set(id,obj); return obj;
  }
  const names = ["crm-guide","crm-trial-data","crm-trial-vendor","crm-trial-count","crm-storage-note","crm-copy-status","crm-copy-checklist","crm-reset-checklist","crm-copy-fields","crm-fields-copy","crm-fields-status","site-header"];
  names.forEach(el);
  const boxes = data.checks.map((c,i) => el("crm-check-"+c.id));
  const hidden = ["crm-copy-checklist","crm-reset-checklist","crm-copy-fields"].map(id => elements.get(id));
  elements.get("crm-guide").querySelectorAll = selector => selector === "[data-crm-check]" ? boxes : hidden;
  elements.get("crm-trial-data").textContent = JSON.stringify(data);
  elements.get("crm-fields-copy").textContent = "Company and contact\nOwner\nStop / suppression status";
  elements.get("site-header").getBoundingClientRect = () => ({height:76});
  let stored = options.stored || null, copied = "";
  const win = {
    document: {getElementById: id=>elements.get(id)||null, body:{appendChild() {}}, activeElement:null, createElement:()=>el("temp-copy"), execCommand:()=>options.fallbackSuccess === true},
    navigator: {clipboard: {writeText: async text=>{ if(options.clipboardDenied) throw new Error("denied");copied=text; }}},
    localStorage: {
      getItem: ()=>{if(options.storageDenied) throw new Error("denied");return stored;},
      setItem: (_key,value)=>{if(options.storageDenied) throw new Error("denied");stored=value;}
    },
    addEventListener() {}
  };
  return {win,elements,boxes,getStored:()=>stored,getCopied:()=>copied};
}
(async () => {
  const h = harness();
  api.mount(h.win);
  assert.equal(h.elements.get("crm-guide").attrs["data-crm-ready"], "true");
  assert(h.boxes.every(b=>!b.disabled));
  assert.equal(h.elements.get("crm-trial-count").textContent, "0 of 6 checks tried");
  h.boxes[0].checked=true;await h.boxes[0].fire("change");
  h.elements.get("crm-trial-vendor").value="monday";await h.elements.get("crm-trial-vendor").fire("change");
  assert(h.boxes.every(b=>!b.checked));
  h.boxes[3].checked=true;await h.boxes[3].fire("change");
  h.elements.get("crm-trial-vendor").value="close";await h.elements.get("crm-trial-vendor").fire("change");
  assert.deepEqual(h.boxes.map(b=>b.checked), [true,false,false,false,false,false]);
  await h.elements.get("crm-copy-checklist").fire("click");
  assert(h.getCopied().includes("CRM: Close") && h.getCopied().includes("[TRIED] 1."));
  assert(h.elements.get("crm-copy-status").textContent.startsWith("Copied."));
  await h.elements.get("crm-reset-checklist").fire("click");
  assert(h.boxes.every(b=>!b.checked));
  const state=JSON.parse(h.getStored());
  assert.equal(state.states.monday[3],true);
  assert(state.states.close.every(v=>v===false));
  const restored = harness({stored:h.getStored()});api.mount(restored.win);
  restored.elements.get("crm-trial-vendor").value="monday";await restored.elements.get("crm-trial-vendor").fire("change");
  assert.equal(restored.boxes[3].checked,true);
  await h.elements.get("crm-copy-fields").fire("click");assert(h.getCopied().includes("Stop / suppression"));
  const denied=harness({storageDenied:true});api.mount(denied.win);
  assert(denied.elements.get("crm-storage-note").textContent.includes("this visit only"));
  denied.boxes[5].checked=true;await denied.boxes[5].fire("change");assert.equal(denied.elements.get("crm-trial-count").textContent,"1 of 6 checks tried");
  const corrupt=harness({stored:"not json"});api.mount(corrupt.win);assert(corrupt.boxes.every(b=>!b.checked));
  const failCopy=harness({clipboardDenied:true,fallbackSuccess:false});api.mount(failCopy.win);await failCopy.elements.get("crm-copy-checklist").fire("click");
  assert(failCopy.elements.get("crm-copy-status").textContent.includes("blocked"));
  const fallback=harness({clipboardDenied:true,fallbackSuccess:true});api.mount(fallback.win);await fallback.elements.get("crm-copy-checklist").fire("click");
  assert(fallback.elements.get("crm-copy-status").textContent.startsWith("Copied."));
  const priorHandler = h.elements.get("crm-trial-vendor").handlers.change;
  api.mount(h.win);assert.equal(h.elements.get("crm-trial-vendor").handlers.change, priorHandler);

  const template = fs.readFileSync(path.join(__dirname,"../src/resources/best-crm-for-outbound-sales.njk"),"utf8");
  assert(template.includes('layout: layouts/base.njk'));
  assert(!template.includes('Written by') && !template.includes('aggregateRating'));
  assert.equal((template.match(/data-booking-placement="crm-/g)||[]).length,2);
  assert(template.includes("No budget form to fill in"));
  const download=fs.readFileSync(path.join(__dirname,"../src/assets/downloads/outbound-crm-trial-checklist.txt"),"utf8");
  data.checks.forEach(c=>assert(download.includes(c.title) && download.includes(c.text)));
  const hosting=JSON.parse(fs.readFileSync(path.join(__dirname,"../vercel.json"),"utf8"));
  const attachment=hosting.headers.find(rule=>rule.source==="/assets/downloads/outbound-crm-trial-checklist.txt");
  assert(attachment?.headers.some(header=>header.key.toLowerCase()==="content-disposition" && header.value==='attachment; filename="CallTeam-CRM-Trial-Checklist.txt"'));
  const js=fs.readFileSync(path.join(__dirname,"../src/assets/js/crm-guide.js"),"utf8");
  assert(!/\b(fetch|XMLHttpRequest|sendBeacon)\s*\(/.test(js));

  if (process.argv.includes("--rendered")) {
    const html=fs.readFileSync(path.join(__dirname,"../_site/resources/best-crm-for-outbound-sales/index.html"),"utf8");
    const doc=parseDocument(html);
    const all=DomUtils.findAll(()=>true,doc.children);
    const byTag=tag=>all.filter(n=>n.type==="tag"&&n.name===tag);
    const txt=node=>DomUtils.textContent(node).replace(/\s+/g," ").trim();
    const main=all.find(n=>n.attribs?.id==="crm-guide");
    assert.equal(byTag("h1").length,1);
    assert(txt(main).includes("7 best CRMs for outbound sales"));
    const costs={close:[99,297,495],hubspot:[90,270,450],pipedrive:[39,117,195],freshsales:[39,117,195],zoho:[14,42,70],salesforce:[null,null,null],monday:[84,84,140]};
    const rows=byTag("tr").filter(n=>n.attribs["data-cost-provider"]);
    assert.equal(rows.length,7);
    for(const row of rows){
      const id=row.attribs["data-cost-provider"];
      const cells=row.children.filter(n=>n.name==="td"&&n.attribs["data-user-count"]);
      assert.equal(cells.length,3);
      cells.forEach((cell,index)=>{
        assert.equal(Number(cell.attribs["data-user-count"]),[1,3,5][index]);
        assert(txt(cell).includes(costs[id][index]===null?"Confirm setup":"USD "+costs[id][index]));
      });
      if(id==="monday")assert(txt(cells[0]).includes("3 paid seats"));
    }
    assert(html.includes("USD 3,564/year") && html.includes("USD 4,740 in year one"));
    assert(!/\{\{|\{%/.test(html));
    assert.equal(byTag("input").filter(n=>Object.hasOwn(n.attribs,"data-crm-check")).length,6);
    function inSection(node,id){for(let parent=node.parent;parent;parent=parent.parent){if(parent.attribs?.id===id)return true;}return false;}
    assert.equal(byTag("details").filter(n=>inSection(n,"questions")).length,7);
    for(const p of data.providers){
      const review=all.find(n=>n.attribs?.id===p.id);
      assert(review && txt(review).includes(p.verdict) && txt(review).includes(p.check));
    }
    console.log("Rendered CRM guard: 21 cost cells, two worked examples, all seven reviews, FAQs, download text and CTA placements passed.");
  }
  console.log("CRM tool checks: "+combinations+" provider/checklist combinations; persistence, switching, reset isolation, corrupted/blocked storage, copy success/fallback/failure and repeated initialisation passed.");
})().catch(error=>{console.error(error);process.exit(1);});
