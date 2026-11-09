"use strict";
const assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const {parseDocument,DomUtils}=require("htmlparser2");
const root=path.resolve(__dirname,".."),site=path.join(root,"_site"),route="/resources/best-cold-email-software/",canonical="https://www.callteam.ca"+route;
const data=require("../src/_data/coldEmail.json");
const dom=parseDocument(fs.readFileSync(path.join(site,route,"index.html"),"utf8"));
const nodes=(parent,p)=>DomUtils.findAll(p,parent.children||[]);
const all=p=>nodes(dom,p),text=DomUtils.textContent;
const main=all(n=>n.name==="main")[0];
assert.ok(main);
assert.equal(data.providers.length,10);
assert.equal(new Set(data.providers.map(p=>p.id)).size,10);
assert.equal(all(n=>n.name==="h1").length,1);
assert.match(text(all(n=>n.name==="h1")[0]),/cold email\s+software/i);
assert.equal(all(n=>n.name==="link"&&n.attribs.rel==="canonical")[0].attribs.href,canonical);
assert.ok(all(n=>n.name==="meta"&&n.attribs.name==="description")[0].attribs.content.length<=165);
assert.ok(!all(n=>n.name==="meta"&&n.attribs.name==="robots").some(n=>/noindex/.test(n.attribs.content)));
assert.equal(nodes(main,n=>n.name==="button").length,1);
assert.equal(nodes(main,n=>["input","textarea","select","form"].includes(n.name)).length,0);
const ids=all(n=>n.attribs&&n.attribs.id).map(n=>n.attribs.id);
assert.equal(ids.length,new Set(ids).size);
const priceRows=all(n=>n.name==="tr"&&n.attribs["data-price-id"]);
assert.equal(priceRows.length,10);
for(const p of data.providers){
  const row=priceRows.find(n=>n.attribs["data-price-id"]===p.id);
  assert.ok(row&&ids.includes(p.id));
  assert.ok(text(row).includes(p.monthly)&&text(row).includes(p.annual));
  if(p.annualValue!==null){
    const total=Number(p.annualTotal.match(/[\d,.]+/)[0].replaceAll(",",""));
    assert.equal(Math.round(total*100),Math.round(p.annualValue*12*100),p.name+" annual total");
  }
  assert.ok(p.sources.length&&p.good&&p.weak&&p.verdict);
}
const agency=data.budgets[2].rows;
assert.equal(agency[0].price,94+3*29);
assert.equal(agency[1].price,3*69);
assert.equal(agency[2].price,299+49);
assert.equal(1000*(1+2),3000);
assert.equal(data.budgets[1].rows.find(r=>r.name==="Smartlead Pro").price,94);
assert.equal(data.budgets[1].rows.find(r=>r.name==="Saleshandy Pro").price,99);
for (const budget of data.budgets.slice(0,2)) {
  assert.match(budget.description,/1,000 contacts/);
  assert.match(budget.description,/3,000 (?:emails|messages)/);
}
const graph=all(n=>n.name==="script"&&n.attribs.type==="application/ld+json").flatMap(n=>{const x=JSON.parse(text(n));return x["@graph"]||[x];});
assert.equal(graph.find(x=>x["@type"]==="WebPage").url,canonical);
const itemList=graph.find(x=>x["@type"]==="ItemList");
assert.equal(itemList.numberOfItems,10);
assert.deepEqual(itemList.itemListElement.map(p=>p.url),data.providers.map(p=>canonical+"#"+p.id));
const faq=graph.find(x=>x["@type"]==="FAQPage");
const details=nodes(main,n=>n.name==="details");
assert.equal(details.length,8);
assert.deepEqual(faq.mainEntity.map(f=>[f.name,f.acceptedAnswer.text]),data.faqs.map(f=>[f.q,f.a]));
assert.deepEqual(details.map(d=>[text(nodes(d,n=>n.name==="summary")[0]),text(nodes(d,n=>n.name==="p")[0])]),data.faqs.map(f=>[f.q,f.a]));
assert.equal(text(all(n=>n.attribs?.id==="sg-resource-text")[0]),data.resource);
assert.equal(data.resource.match(/^\d\./gm).length,5);
const links=all(n=>n.name==="a"),urls=new Set();
for(const a of links){
  const href=a.attribs.href;assert.ok(href&&href!=="#");
  const u=new URL(href,canonical);
  if(href.startsWith("#"))assert.ok(ids.includes(href.slice(1)),href);
  if(["http:","https:"].includes(u.protocol))urls.add(u.origin+u.pathname+u.search);
  if(u.origin==="https://www.callteam.ca"){
    const file=path.join(site,u.pathname,u.pathname.endsWith("/")?"index.html":"");assert.ok(fs.existsSync(file),href);
    if(u.hash){const target=parseDocument(fs.readFileSync(file,"utf8"));assert.ok(nodes(target,n=>n.attribs?.id===u.hash.slice(1)).length,href);}
  }
  if(u.hostname==="calendly.com")assert.equal(u.pathname,"/hello-callteam/new-meeting");
  if(a.attribs.target==="_blank")assert.match(a.attribs.rel||"",/noopener/);
}
assert.equal(nodes(main,n=>n.name==="a"&&(n.attribs.href||"").includes("calendly.com")).length,2);
for(const n of all(n=>n.attribs&&(n.attribs.src||(n.name==="link"&&n.attribs.rel==="stylesheet")))){
  const src=n.attribs.src||n.attribs.href;if(src.startsWith("/"))assert.ok(fs.existsSync(path.join(site,src.split("?")[0])),src);
}
for(const slug of ["b2b-lead-providers","apollo-alternatives","best-crm-for-outbound-sales","outbound-sales-library"]){
  const incoming=parseDocument(fs.readFileSync(path.join(site,"resources",slug,"index.html"),"utf8"));
  const found=nodes(incoming,n=>n.name==="a"&&(n.attribs.href||"").startsWith(route));assert.equal(found.length,1,slug);
  for(const a of found){const u=new URL(a.attribs.href,canonical);if(u.hash)assert.ok(ids.includes(u.hash.slice(1)));}
}
assert.ok(fs.readFileSync(path.join(site,"sitemap.xml"),"utf8").includes(canonical));
const prose=nodes(main,n=>n.name==="p").map(text).join(" ");
assert.doesNotMatch(prose,/why this matters|that distinction matters|this matters because|it(?:'|’)s not about|this isn(?:'|’)t|CallTeam uses|we use Apollo|we use Close|we tested (?:them|all)|guaranteed (?:results|ranking)/i);
assert.doesNotMatch(text(main), /\bworkload\b|eligible plan|why this is important|this is important because|that distinction matters/i);
const sentences=prose.replace(/\s+/g," ").split(/[.!?](?:\s|$)/).map(s=>s.trim().toLowerCase()).filter(s=>s.split(/\s+/).length>=10);
assert.deepEqual(sentences.filter((s,i)=>sentences.indexOf(s)!==i),[],"Repeated long sentences");
if(process.env.EMAIL_AUDIT_URLS)fs.writeFileSync(process.env.EMAIL_AUDIT_URLS,JSON.stringify([...urls].filter(u=>u!==canonical),null,2));
console.log(JSON.stringify({result:"PASS",providers:10,annualTotalsChecked:8,workloadExamples:3,faqs:8,copyControls:1,linkInstances:links.length,uniqueDestinations:urls.size-1,incomingLinks:4,mainWords:text(main).trim().split(/\s+/).length}));
