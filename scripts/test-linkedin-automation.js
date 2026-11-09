"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { parseDocument } = require("htmlparser2");
const guide = require("../src/_data/linkedinAutomation.json");
const api = require("../src/assets/js/simple-buying-guide.js");
const root = path.resolve(__dirname, "..");
const route = "/resources/best-linkedin-automation-tools/";
const canonical = "https://www.callteam.ca" + route;
const walk = (n, p, result = []) => { if (p(n)) result.push(n); for (const c of n.children || []) walk(c,p,result); return result; };
const text = n => n.type === "text" ? n.data : (n.children || []).map(text).join("");
const html = fs.readFileSync(path.join(root,"_site",route,"index.html"),"utf8");
const dom = parseDocument(html);
const all = p => walk(dom,p);
const main = all(n=>n.name==="main")[0];
const mainText = text(main);
const expected = {dripify:[99,297,495],expandi:[99,297,495],heyreach:[79,237,395],waalaxy:[159,477,795],"linked-helper":[15,45,75],"dux-soup":[55,165,275],"meet-alfred":[69,207,345]};
assert.equal(guide.providers.length,8);
assert.equal(new Set(guide.providers.map(p=>p.id)).size,8);
for(const p of guide.providers) {
  assert.ok(p.good && p.weak && p.verdict && p.price && p.sources.length >= 3);
  if(expected[p.id]) { assert.deepEqual(p.costs,expected[p.id]); assert.deepEqual(p.costs,[1,3,5].map(n=>p.costs[0]*n)); }
  else assert.equal(p.id,"phantombuster");
}
const costRows = all(n=>n.name==="tr" && n.attribs["data-cost-id"]);
assert.equal(costRows.length,7);
for(const row of costRows) {
  const cells=walk(row,n=>n.name==="td").map(n=>Number(text(n).match(/[€$](\d+)/)[1]));
  assert.deepEqual(cells,expected[row.attribs["data-cost-id"]]);
}
assert.match(text(costRows.find(n=>n.attribs["data-cost-id"]==="waalaxy")),/€139 \+ €20/);
assert.match(mainText,/\$237 for one to three senders, or \$395 for five/);
assert.match(mainText,/Start: \$69\/month/);
assert.doesNotMatch(mainText,/unlimited users|unlimited-user/);
assert.equal(all(n=>n.name==="h1").length,1);
assert.equal(all(n=>n.name==="link"&&n.attribs.rel==="canonical")[0].attribs.href,canonical);
assert.ok(all(n=>n.name==="meta"&&n.attribs.name==="description")[0].attribs.content.includes("Dripify"));
assert.ok(!all(n=>n.name==="meta"&&n.attribs.name==="robots").some(n=>/noindex/.test(n.attribs.content)));
assert.equal(walk(main,n=>n.name==="button").length,1);
assert.equal(walk(main,n=>["input","textarea","select","form"].includes(n.name)).length,0);
assert.equal(text(all(n=>n.attribs&&n.attribs.id==="sg-resource-text")[0]),guide.resource);
const ids=all(n=>n.attribs&&n.attribs.id).map(n=>n.attribs.id);
assert.equal(ids.length,new Set(ids).size);
const graph=all(n=>n.name==="script"&&n.attribs.type==="application/ld+json").flatMap(n=>{const o=JSON.parse(text(n));return o["@graph"]||[o];});
assert.equal(graph.find(n=>n["@type"]==="WebPage").url,canonical);
const itemList=graph.find(n=>n["@type"]==="ItemList");
assert.equal(itemList.numberOfItems,8);
assert.deepEqual(itemList.itemListElement.map(n=>n.url),guide.providers.map(p=>canonical+"#"+p.id));
const faq=graph.find(n=>n["@type"]==="FAQPage");
assert.deepEqual(faq.mainEntity.map(n=>[n.name,n.acceptedAnswer.text]),guide.faqs.map(f=>[f.q,f.a]));
const details=walk(main,n=>n.name==="details");
assert.equal(details.length,8);
assert.deepEqual(details.map(n=>[text(walk(n,x=>x.name==="summary")[0]),text(walk(n,x=>x.name==="p")[0])]),guide.faqs.map(f=>[f.q,f.a]));
assert.ok(all(n=>n.attribs&&(n.attribs.class||"").split(" ").includes("lp-faqs")).length);
let linkCount=0;
const urls=new Set();
for(const a of all(n=>n.name==="a")) {
  const href=a.attribs.href; assert.ok(href&&href!=="#");
  if(href.startsWith("#")) assert.ok(ids.includes(href.slice(1)),href);
  const url=new URL(href,canonical);
  if(["https:","http:"].includes(url.protocol)) urls.add(url.origin+url.pathname+url.search);
  if(url.origin==="https://www.callteam.ca") {
    const file=path.join(root,"_site",url.pathname,url.pathname.endsWith("/")?"index.html":"");
    assert.ok(fs.existsSync(file),href);
    if(url.hash) assert.ok(fs.readFileSync(file,"utf8").includes('id="'+url.hash.slice(1)+'"'),href);
  }
  if(url.hostname==="calendly.com") assert.equal(url.pathname,"/hello-callteam/new-meeting");
  if(a.attribs.target==="_blank") assert.match(a.attribs.rel||"",/noopener/);
  linkCount++;
}
for(const n of all(n=>n.attribs && (n.attribs.src || (n.name==="link"&&n.attribs.rel==="stylesheet")))) {
  const src=n.attribs.src||n.attribs.href;
  if(src.startsWith("/")) assert.ok(fs.existsSync(path.join(root,"_site",src.split("?")[0])),src);
}
for(const slug of ["linkedin-sales-navigator-lead-generation","b2b-lead-providers","best-crm-for-outbound-sales","best-crm-for-small-businesses","outbound-sales-library"]) {
  assert.ok(fs.readFileSync(path.join(root,"_site/resources",slug,"index.html"),"utf8").includes('href="'+route+'"'),slug);
}
assert.ok(fs.readFileSync(path.join(root,"_site/sitemap.xml"),"utf8").includes(canonical));
assert.doesNotMatch(mainText,/why this matters|that distinction matters|it(?:'|’)s not about|this isn(?:'|’)t|CallTeam uses|we use Apollo|we use Close|we tested (?:them|all)|guaranteed (?:results|ranking)|safest tool/i);

function mock(mode,fallback) {
  const state={written:[],added:0,removed:0,selected:0};
  const els=Object.fromEntries(["simple-guide","sg-resource-text","sg-copy-resource","sg-copy-status","site-header"].map(id=>[id,{hidden:true,disabled:false,textContent:"",attributes:{},listeners:{},style:{setProperty(){}},getAttribute(k){return this.attributes[k];},setAttribute(k,v){this.attributes[k]=v;},addEventListener(k,fn){(this.listeners[k]||=[]).push(fn);},focus(){},getBoundingClientRect(){return {height:76};}}]));
  els["sg-resource-text"].textContent=guide.resource;
  const win={navigator:{},document:{activeElement:{focus(){}},body:{appendChild(){state.added++;}},createElement(){return {style:{},setAttribute(){},select(){state.selected++;},remove(){state.removed++;}};},execCommand(){return fallback;},getElementById(id){return els[id]||null;},createRange(){return {selectNodeContents(){state.selected++;}};}},getSelection(){return {removeAllRanges(){},addRange(){}};},addEventListener(){}};
  if(mode==="ok") win.navigator.clipboard={async writeText(t){state.written.push(t);}};
  if(mode==="reject") win.navigator.clipboard={async writeText(){throw new Error("denied");}};
  return {state,els,win};
}
(async()=>{
  for(const [mode,fallback,success] of [["ok",false,true],["reject",true,true],["reject",false,false],["absent",true,true]]) {
    const {win,els,state}=mock(mode,fallback); api.mount(win);api.mount(win);
    assert.equal(els["sg-copy-resource"].hidden,false);
    assert.equal(els["sg-copy-resource"].listeners.click.length,1);
    await els["sg-copy-resource"].listeners.click[0]();
    assert.match(els["sg-copy-status"].textContent,success?/Copied/:/blocked/);
    assert.equal(els["sg-copy-resource"].disabled,false);
    if(mode==="ok") assert.equal(state.written[0],guide.resource);
    else assert.equal(state.added,state.removed);
  }
  if(process.env.LINKEDIN_AUDIT_URLS) fs.writeFileSync(process.env.LINKEDIN_AUDIT_URLS,JSON.stringify([...urls].filter(u=>u!==canonical),null,2));
  console.log(`LinkedIn guide passed: 8 reviews; 21 verified cost cells; 8 matching FAQs; 4 clipboard paths; ${linkCount} links; 5 incoming cross-links; schema, assets and metadata.`);
})().catch(e=>{console.error(e);process.exitCode=1;});
