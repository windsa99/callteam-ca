"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { parseDocument } = require("htmlparser2");
const guide = require("../src/_data/nooksAlternatives.js");
const api = require("../src/assets/js/nooks-alternatives.js");
const base = path.resolve(__dirname, "..");
function walk(node, predicate, out = []) {
  if (predicate(node)) out.push(node);
  for (const child of node.children || []) walk(child, predicate, out);
  return out;
}
function text(node) { return node.type === "text" ? node.data : (node.children || []).map(text).join(""); }
function element(id) {
  return { id, hidden: true, disabled: false, textContent: "", attributes: {}, listeners: {}, style: { setProperty() {} },
    getAttribute(k) { return this.attributes[k]; }, setAttribute(k,v) { this.attributes[k] = v; },
    addEventListener(k, fn) { (this.listeners[k] ||= []).push(fn); }, focus() {}, getBoundingClientRect() { return { height: 76 }; }
  };
}
function mock(clipboard, fallback) {
  const state = { removed: 0, appended: 0, legacy: 0, selected: 0, focused: 0, written: [] };
  const els = Object.fromEntries(["nooks-guide","nk-questions-text","nk-copy-questions","nk-copy-status","site-header"].map(id=>[id,element(id)]));
  els["nk-questions-text"].textContent = guide.questions;
  const win = {
    navigator: {},
    document: {
      activeElement: { focus() { state.focused++; } },
      body: { appendChild() { state.appended++; } },
      createElement() { return { style: {}, setAttribute() {}, select() { state.selected++; }, remove() { state.removed++; } }; },
      execCommand() { state.legacy++; if (fallback === "throw") throw new Error("blocked"); return fallback === true; },
      getElementById(id) { return els[id] || null; },
      createRange() { return { selectNodeContents() { state.selected++; } }; }
    },
    getSelection() { return { removeAllRanges() {}, addRange() {} }; },
    addEventListener() {}
  };
  if (clipboard === "success") win.navigator.clipboard = { async writeText(t) { state.written.push(t); } };
  if (clipboard === "reject") win.navigator.clipboard = { async writeText() { throw new Error("denied"); } };
  return { win, state, els };
}
(async function () {
  let cases = 0;
  for (const [mode, legacy, expected] of [["success",false,true],["reject",true,true],[null,true,true],["reject",false,false],[null,"throw",false]]) {
    const {win,state} = mock(mode,legacy);
    assert.equal(await api.copyText(win, guide.questions),expected);
    if (mode === "success") { assert.equal(state.written[0],guide.questions); assert.equal(state.appended,0); }
    else { assert.equal(state.appended,1); assert.equal(state.removed,1); assert.equal(state.focused,1); }
    cases++;
  }
  const good = mock("success",false);
  api.mount(good.win); api.mount(good.win);
  assert.equal(good.els["nk-copy-questions"].hidden,false);
  assert.equal(good.els["nk-copy-questions"].listeners.click.length,1);
  await good.els["nk-copy-questions"].listeners.click[0]();
  assert.equal(good.state.written[0],guide.questions);
  assert.match(good.els["nk-copy-status"].textContent,/Copied/);
  assert.equal(good.els["nk-copy-questions"].disabled,false);
  cases++;
  const bad = mock("reject",false); api.mount(bad.win);
  await bad.els["nk-copy-questions"].listeners.click[0]();
  assert.match(bad.els["nk-copy-status"].textContent,/blocked/);
  assert.ok(bad.state.selected>=2);
  assert.equal(bad.els["nk-copy-questions"].disabled,false);
  cases++;
  const absent = mock(null,false); absent.win.document.getElementById=()=>null;
  assert.doesNotThrow(()=>api.mount(absent.win)); cases++;
  const busy=mock("success",false); let resolveCopy;
  busy.win.navigator.clipboard.writeText=()=>new Promise(resolve=>{resolveCopy=resolve;});
  api.mount(busy.win);
  const first=busy.els["nk-copy-questions"].listeners.click[0]();
  assert.equal(busy.els["nk-copy-questions"].disabled,true);
  await busy.els["nk-copy-questions"].listeners.click[0]();
  resolveCopy(); await first;
  assert.equal(busy.els["nk-copy-questions"].disabled,false); cases++;
  for(const id of ["nk-questions-text","nk-copy-questions","nk-copy-status"]) {
    const partial=mock(null,false);delete partial.els[id];assert.doesNotThrow(()=>api.mount(partial.win));cases++;
  }
  assert.equal(guide.providers.length,8);
  assert.equal(guide.faqs.length,8);
  assert.equal(guide.questions.split("\n").length,5);

  const expectedCosts = {
    trellus: ['$149.99','$749.95','$1,499.90'],
    apollo: ['$149 + paid Apollo seats','$149 + paid Apollo seats','$149 + paid Apollo seats'],
    close: ['$109','$545','$1,090'],
    cloudtalk: ['$78','$390','$780'],
    justcall: ['$138','$345','$690'],
    phoneburner: ['$195','$975','$1,950'],
    salesfinity: ['$299','$1,495','Request team quote'],
    orum: ['Quote; 9-seat minimum','Quote; 9-seat minimum','Quote; 9-seat minimum']
  };
  for(const row of guide.costs) assert.deepEqual(row.values,expectedCosts[row.id],row.id+' cost examples');
  assert.equal(guide.providers.find(p=>p.id==='justcall').minSeats,2);
  assert.equal(guide.providers.find(p=>p.id==='orum').minSeats,9);
  assert.equal(guide.providers.find(p=>p.id==='apollo').teamAddon,true);

  if (process.argv.includes("--rendered")) {
    const html = fs.readFileSync(path.join(base,"_site/resources/nooks-alternatives/index.html"),"utf8");
    const dom = parseDocument(html);
    const all = pred=>walk(dom,pred);
    const main=all(n=>n.attribs && n.attribs.id==="nooks-guide")[0];
    assert.ok(main);
    assert.equal(all(n=>n.name==="h1").length,1);
    assert.equal(walk(main,n=>n.name==="table").length,2);
    assert.equal(walk(main,n=>n.name==="details").length,8);
    assert.equal(walk(main,n=>n.name==="button").length,1,"Only one resource button");
    assert.equal(walk(main,n=>["input","select","textarea","form"].includes(n.name)).length,0,"No resource form");
    assert.equal(walk(main,n=>n.name==="tbody")[0].children.filter(n=>n.name==="tr").length,9);
    const ids=all(n=>n.attribs && n.attribs.id).map(n=>n.attribs.id);
    assert.equal(new Set(ids).size,ids.length,"Unique IDs");
    const schema=all(n=>n.name==="script" && n.attribs.type==="application/ld+json").map(n=>JSON.parse(text(n)));
    const graph=schema.flatMap(s=>s["@graph"]||[s]);
    const items=graph.find(s=>s['@type']==='ItemList');
    assert.equal(items.numberOfItems,8);
    assert.deepEqual(items.itemListElement.map(x=>x.name),guide.providers.map(p=>p.name));
    const renderedCosts=walk(main,n=>n.name==='table' && (n.attribs.class||'').includes('nk-costs'))[0];
    const costRows=walk(renderedCosts,n=>n.name==='tbody')[0].children.filter(n=>n.name==='tr');
    assert.equal(costRows.length,9);
    for(let i=0;i<guide.costs.length;i++) assert.deepEqual(costRows[i].children.filter(n=>n.name==='td').map(text),guide.costs[i].values);
    assert.deepEqual(costRows[8].children.filter(n=>n.name==='td').map(text),['Quote required','Quote required','Quote required']);
    const faq=graph.find(s=>s["@type"]==="FAQPage");
    assert.deepEqual(faq.mainEntity.map(x=>[x.name,x.acceptedAnswer.text]),guide.faqs.map(f=>[f.q,f.a]));
    const visible=walk(main,n=>n.name==="details").map(n=>[text(walk(n,x=>x.name==="summary")[0]),text(walk(n,x=>x.name==="p")[0])]);
    assert.deepEqual(visible,guide.faqs.map(f=>[f.q,f.a]));
    const canonical=all(n=>n.name==="link" && n.attribs.rel==="canonical")[0];
    assert.equal(canonical.attribs.href,"https://www.callteam.ca/resources/nooks-alternatives/");
    const copy=all(n=>n.attribs && n.attribs.id==="nk-questions-text")[0];
    assert.equal(text(copy),guide.questions);
    let links=0;
    for (const a of all(n=>n.name==="a")) {
      const href=a.attribs.href; assert.ok(href && href!=="#","No empty links");
      if (href.startsWith("#")) assert.ok(ids.includes(href.slice(1)),href);
      if (href.startsWith("/")) {
        const u=new URL(href,"https://www.callteam.ca");
        let target=path.join(base,"_site",decodeURIComponent(u.pathname));
        if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target=path.join(target,"index.html");
        assert.ok(fs.existsSync(target),href);
        if(u.hash) { const targetDoc=parseDocument(fs.readFileSync(target,"utf8")); assert.ok(walk(targetDoc,n=>n.attribs && n.attribs.id===u.hash.slice(1)).length,href); }
      }
      if (href.includes("calendly.com")) {
        const u=new URL(href); assert.equal(u.hostname,"calendly.com"); assert.equal(u.pathname,"/hello-callteam/new-meeting");
        assert.equal(a.attribs.target,"_blank"); assert.match(a.attribs.rel,/noopener/);
      }
      links++;
    }
    for (const n of all(n=>n.attribs && (n.attribs.src || (n.name==="link" && n.attribs.rel==="stylesheet")))) {
      const u=n.attribs.src || n.attribs.href;
      if(u.startsWith("/")) assert.ok(fs.existsSync(path.join(base,"_site",u)),u);
    }
    for (const filename of ["resources/best-cold-calling-dialers/index.html","resources/best-crm-for-outbound-sales/index.html","resources/outbound-sales-library/index.html"]) {
      assert.ok(fs.readFileSync(path.join(base,"_site",filename),"utf8").includes('href="/resources/nooks-alternatives/'),filename);
    }
    assert.ok(fs.readFileSync(path.join(base,"_site/sitemap.xml"),"utf8").includes("<loc>https://www.callteam.ca/resources/nooks-alternatives/</loc>"));
    assert.equal(walk(main,n=>n.name==="a" && (n.attribs["data-booking-placement"]||"").startsWith("nooks-")).length,2);
    const paragraphs=walk(main,n=>n.name==="p").map(n=>text(n).replace(/\s+/g," ").trim()).filter(t=>t.length>75);
    assert.equal(new Set(paragraphs).size,paragraphs.length,"No repeated paragraphs");
    const copyBans=/X not Y|this isn.t about|not just|why it matters|why this is important|that distinction matters|why this matters|this is why (it is|it's) important|in today's (?:digital|fast)|game.changer|unlock (?:your|the) potential|delve into|not just .{1,90}but also/i;
    assert.ok(!copyBans.test(text(main)),"No canned copy patterns");
    const title=text(all(n=>n.name==="title")[0]);
    assert.ok(title.length<=65 && title.includes("Nooks Alternatives"));
    const meta=all(n=>n.name==="meta" && n.attribs.name==="description")[0].attribs.content;
    assert.ok(meta.length>=110 && meta.length<=165);
    assert.match(all(n=>n.name==="meta" && n.attribs.name==="robots")[0].attribs.content,/index, follow/);
    const words=text(main).replace(/\s+/g," ").trim().split(" ").length;
    console.log(JSON.stringify({costCells:27,copyCases:cases,comparisonRows:9,faqs:8,resourceButtons:1,linksChecked:links,mainWords:words,schemas:"valid",internalLinks:"valid",incomingPages:3}));
  } else console.log("Nooks alternatives resource: "+cases+" clipboard, fallback and mounting checks passed.");
})().catch(e=>{console.error(e);process.exitCode=1;});
