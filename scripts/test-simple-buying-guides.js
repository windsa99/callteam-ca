"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { parseDocument } = require("htmlparser2");
const guides = [require("../src/_data/dialingMethods.json"), require("../src/_data/smallBusinessCrm.json")];
const guide = { questions: guides[0].resource };
const api = require("../src/assets/js/simple-buying-guide.js");
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
  const els = Object.fromEntries(["simple-guide","sg-resource-text","sg-copy-resource","sg-copy-status","site-header"].map(id=>[id,element(id)]));
  els["sg-resource-text"].textContent = guide.questions;
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
  assert.equal(good.els["sg-copy-resource"].hidden,false);
  assert.equal(good.els["sg-copy-resource"].listeners.click.length,1);
  await good.els["sg-copy-resource"].listeners.click[0]();
  assert.equal(good.state.written[0],guide.questions);
  assert.match(good.els["sg-copy-status"].textContent,/Copied/);
  assert.equal(good.els["sg-copy-resource"].disabled,false);
  cases++;
  const bad = mock("reject",false); api.mount(bad.win);
  await bad.els["sg-copy-resource"].listeners.click[0]();
  assert.match(bad.els["sg-copy-status"].textContent,/blocked/);
  assert.ok(bad.state.selected>=2);
  assert.equal(bad.els["sg-copy-resource"].disabled,false);
  cases++;
  const absent = mock(null,false); absent.win.document.getElementById=()=>null;
  assert.doesNotThrow(()=>api.mount(absent.win)); cases++;
  const busy=mock("success",false); let resolveCopy;
  busy.win.navigator.clipboard.writeText=()=>new Promise(resolve=>{resolveCopy=resolve;});
  api.mount(busy.win);
  const first=busy.els["sg-copy-resource"].listeners.click[0]();
  assert.equal(busy.els["sg-copy-resource"].disabled,true);
  await busy.els["sg-copy-resource"].listeners.click[0]();
  resolveCopy(); await first;
  assert.equal(busy.els["sg-copy-resource"].disabled,false); cases++;
  for(const id of ["sg-resource-text","sg-copy-resource","sg-copy-status"]) {
    const partial=mock(null,false);delete partial.els[id];assert.doesNotThrow(()=>api.mount(partial.win));cases++;
  }

  for (const g of guides) {
    const resourceMock = mock("success",false);
    resourceMock.els["sg-resource-text"].textContent=g.resource;
    api.mount(resourceMock.win);
    await resourceMock.els["sg-copy-resource"].listeners.click[0]();
    assert.equal(resourceMock.state.written[0],g.resource);
    assert.equal(g.faqs.length,8);
  }
  const expected={bigin:[7,21,35],pipedrive:[14,42,70],'less-annoying':[15,45,75],hubspot:[20,60,100],zoho:[14,42,70],freshsales:[9,27,45],monday:[36,36,60],salesforce:[25,75,125],close:[35,105,175]};
  for(const p of guides[1].providers){assert.deepEqual([1,3,5].map(n=>p.rate*Math.max(n,p.minimum)),expected[p.id]);}
  const slugs=['auto-dialer-vs-predictive-dialer','best-crm-for-small-businesses'];let links=0;
  for(let i=0;i<slugs.length;i++){
    const slug=slugs[i], g=guides[i], html=fs.readFileSync(path.join(base,'_site/resources',slug,'index.html'),'utf8'),dom=parseDocument(html);
    const all=pred=>walk(dom,pred),main=all(n=>n.name==='main')[0];
    assert.equal(all(n=>n.name==='h1').length,1);
    assert.equal(walk(main,n=>n.name==='details').length,8);
    assert.equal(walk(main,n=>n.name==='button').length,1);
    assert.equal(walk(main,n=>['input','select','textarea','form'].includes(n.name)).length,0);
    assert.equal(text(all(n=>n.attribs&&n.attribs.id==='sg-resource-text')[0]),g.resource);
    assert.equal(all(n=>n.name==='link'&&n.attribs.rel==='canonical')[0].attribs.href,'https://www.callteam.ca/resources/'+slug+'/');
    const ids=all(n=>n.attribs&&n.attribs.id).map(n=>n.attribs.id);assert.equal(ids.length,new Set(ids).size);
    const graph=all(n=>n.name==='script'&&n.attribs.type==='application/ld+json').flatMap(n=>{const x=JSON.parse(text(n));return x['@graph']||[x];});
    const faq=graph.find(n=>n['@type']==='FAQPage');assert.deepEqual(faq.mainEntity.map(n=>[n.name,n.acceptedAnswer.text]),g.faqs.map(n=>[n.q,n.a]));
    assert.deepEqual(walk(main,n=>n.name==='details').map(n=>[text(walk(n,x=>x.name==='summary')[0]),text(walk(n,x=>x.name==='p')[0])]),g.faqs.map(n=>[n.q,n.a]));
    assert.ok(all(n=>n.attribs&&(n.attribs.class||'').split(' ').includes('lp-faqs')).length);
    if(i===1){const table=all(n=>n.name==='table'&&(n.attribs.class||'').includes('sg-costs'))[0];const rows=walk(table,n=>n.name==='tbody')[0].children.filter(n=>n.name==='tr');assert.equal(rows.length,9);rows.forEach((r,j)=>{assert.deepEqual(r.children.filter(n=>n.name==='td').map(n=>Number((n.children||[]).filter(x=>x.type==='text').map(text).join('').match(/\$(\d+)/)[1])),expected[g.providers[j].id]);});assert.equal(graph.find(n=>n['@type']==='ItemList').numberOfItems,9);}
    for(const a of all(n=>n.name==='a')){const href=a.attribs.href;assert.ok(href&&href!=='#');if(href.startsWith('#'))assert.ok(ids.includes(href.slice(1)),href);if(href.startsWith('/')){const u=new URL(href,'https://www.callteam.ca');const local=path.join(base,'_site',u.pathname,u.pathname.endsWith('/')?'index.html':'');assert.ok(fs.existsSync(local),href);if(u.hash)assert.ok(fs.readFileSync(local,'utf8').includes('id="'+u.hash.slice(1)+'"'),href);}if(href.includes('calendly.com'))assert.equal(new URL(href).pathname,'/hello-callteam/new-meeting');links++;}
    assert.doesNotMatch(text(main),/why this matters|that distinction matters|CallTeam uses|we use Apollo|we use Close/i);
  }
  console.log('New buying guides passed: '+(cases+2)+' clipboard/mount checks; 27 team-cost cells; two resources; 16 matching FAQs; '+links+' links, metadata and anchors.');
})().catch(error=>{console.error(error);process.exitCode=1;});
