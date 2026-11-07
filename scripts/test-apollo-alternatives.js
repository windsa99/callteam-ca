"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { parseDocument } = require("htmlparser2");
const guide = require("../src/_data/apolloAlternatives.json");
const api = require("../src/assets/js/apollo-alternatives.js");
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
  const els = Object.fromEntries(["apollo-guide","aa-test-text","aa-copy-test","aa-copy-status","site-header"].map(id=>[id,element(id)]));
  els["aa-test-text"].textContent = guide.testText;
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
    assert.equal(await api.copyText(win, guide.testText),expected);
    if (mode === "success") { assert.equal(state.written[0],guide.testText); assert.equal(state.appended,0); }
    else { assert.equal(state.appended,1); assert.equal(state.removed,1); assert.equal(state.focused,1); }
    cases++;
  }
  const good = mock("success",false);
  api.mount(good.win); api.mount(good.win);
  assert.equal(good.els["aa-copy-test"].hidden,false);
  assert.equal(good.els["aa-copy-test"].listeners.click.length,1);
  await good.els["aa-copy-test"].listeners.click[0]();
  assert.equal(good.state.written[0],guide.testText);
  assert.match(good.els["aa-copy-status"].textContent,/Copied/);
  assert.equal(good.els["aa-copy-test"].disabled,false);
  cases++;
  const bad = mock("reject",false); api.mount(bad.win);
  await bad.els["aa-copy-test"].listeners.click[0]();
  assert.match(bad.els["aa-copy-status"].textContent,/blocked/);
  assert.ok(bad.state.selected>=2);
  assert.equal(bad.els["aa-copy-test"].disabled,false);
  cases++;
  const absent = mock(null,false); absent.win.document.getElementById=()=>null;
  assert.doesNotThrow(()=>api.mount(absent.win)); cases++;
  assert.equal(guide.providers.length,9);
  assert.equal(new Set(guide.providers.map(p=>p.id)).size,9);
  assert.equal(guide.faqs.length,8);
  assert.ok(guide.testText.includes("No answer") || guide.testText.includes("no answer"));
  if (process.argv.includes("--rendered")) {
    const html = fs.readFileSync(path.join(base,"_site/resources/apollo-alternatives/index.html"),"utf8");
    const dom = parseDocument(html);
    const all = pred=>walk(dom,pred);
    const main=all(n=>n.attribs && n.attribs.id==="apollo-guide")[0];
    assert.ok(main);
    assert.equal(all(n=>n.name==="h1").length,1);
    assert.equal(walk(main,n=>n.name==="article").length,9);
    assert.equal(walk(main,n=>n.name==="details").length,8);
    assert.equal(walk(main,n=>n.name==="button").length,1,"Only one resource button");
    assert.equal(walk(main,n=>["input","select","textarea","form"].includes(n.name)).length,0,"No resource form");
    assert.equal(walk(main,n=>n.name==="tbody")[0].children.filter(n=>n.name==="tr").length,10);
    const ids=all(n=>n.attribs && n.attribs.id).map(n=>n.attribs.id);
    assert.equal(new Set(ids).size,ids.length,"Unique IDs");
    const schema=all(n=>n.name==="script" && n.attribs.type==="application/ld+json").map(n=>JSON.parse(text(n)));
    const graph=schema.flatMap(s=>s["@graph"]||[s]);
    const list=graph.find(s=>s["@type"]==="ItemList");
    assert.equal(list.numberOfItems,9);
    assert.deepEqual(list.itemListElement.map(s=>s.name),guide.providers.map(p=>p.name));
    const faq=graph.find(s=>s["@type"]==="FAQPage");
    assert.deepEqual(faq.mainEntity.map(x=>[x.name,x.acceptedAnswer.text]),guide.faqs.map(f=>[f.q,f.a]));
    const visible=walk(main,n=>n.name==="details").map(n=>[text(walk(n,x=>x.name==="summary")[0]),text(walk(n,x=>x.name==="p")[0])]);
    assert.deepEqual(visible,guide.faqs.map(f=>[f.q,f.a]));
    const canonical=all(n=>n.name==="link" && n.attribs.rel==="canonical")[0];
    assert.equal(canonical.attribs.href,"https://www.callteam.ca/resources/apollo-alternatives/");
    const copy=all(n=>n.attribs && n.attribs.id==="aa-test-text")[0];
    assert.equal(text(copy),guide.testText);
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
    for (const filename of ["b2b-lead-providers/index.html","how-to-buy-cold-calling-leads/index.html","best-crm-for-outbound-sales/index.html","best-cold-calling-dialers/index.html","outbound-sales-library/index.html"]) {
      assert.ok(fs.readFileSync(path.join(base,"_site/resources",filename),"utf8").includes('href="/resources/apollo-alternatives/"'),filename);
    }
    assert.ok(fs.readFileSync(path.join(base,"_site/sitemap.xml"),"utf8").includes("<loc>https://www.callteam.ca/resources/apollo-alternatives/</loc>"));
    const words=text(main).replace(/\s+/g," ").trim().split(" ").length;
    console.log(JSON.stringify({copyCases:cases,providers:9,faqs:8,resourceButtons:1,linksChecked:links,mainWords:words,schemas:"valid",internalLinks:"valid",incomingPages:5}));
  } else console.log("Apollo resource: "+cases+" clipboard, fallback and mounting checks passed.");
})().catch(e=>{console.error(e);process.exitCode=1;});
