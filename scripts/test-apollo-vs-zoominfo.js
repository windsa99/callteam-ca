"use strict";
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {parseDocument,DomUtils}=require('htmlparser2');
const root=path.resolve(__dirname,'..'),site=path.join(root,'_site');
const route='/resources/apollo-vs-zoominfo/',canonical='https://www.callteam.ca'+route;
const data=require('../src/_data/apolloVsZoominfo');
const dom=parseDocument(fs.readFileSync(path.join(site,route,'index.html'),'utf8'));
const nodes=(p,fn)=>DomUtils.findAll(fn,p.children||[]),all=fn=>nodes(dom,fn),text=DomUtils.textContent;
const main=all(n=>n.name==='main')[0];assert.ok(main);
assert.equal(all(n=>n.name==='h1').length,1);
assert.match(text(all(n=>n.name==='h1')[0]),/Apollo vs\s*ZoomInfo/);
assert.equal(all(n=>n.name==='link'&&n.attribs.rel==='canonical')[0].attribs.href,canonical);
assert.ok(all(n=>n.name==='meta'&&n.attribs.name==='description')[0].attribs.content.length<=165);
assert.ok(!all(n=>n.name==='meta'&&n.attribs.name==='robots').some(n=>/noindex/.test(n.attribs.content)));
assert.equal(nodes(main,n=>n.name==='button').length,1);
assert.equal(nodes(main,n=>['input','textarea','select','form'].includes(n.name)).length,0);
const ids=all(n=>n.attribs?.id).map(n=>n.attribs.id);assert.equal(ids.length,new Set(ids).size);
const expected={basic:[588,1764,2940],professional:[948,2844,4740],organization:[null,4284,7140]};
for(const p of data.plans){
  assert.deepEqual(p.costs.map(c=>c.value),expected[p.id]);
  assert.equal(p.annualTotal,p.annualRate*12);
  const row=all(n=>n.name==='tr'&&n.attribs['data-team-plan']===p.id)[0];assert.ok(row);
  for(const c of p.costs)assert.ok(text(row).includes(c.display));
}
assert.equal(5*79*12+119*12,6168);assert.ok(text(main).includes('$6,168'));
assert.equal(1000*8,8000);assert.ok(text(main).includes('8,000 Apollo credits'));
const graph=all(n=>n.name==='script'&&n.attribs.type==='application/ld+json').flatMap(n=>{const s=JSON.parse(text(n));return s['@graph']||[s]});
assert.equal(graph.find(x=>x['@type']==='WebPage').url,canonical);
assert.equal(graph.find(x=>x['@type']==='Article').dateModified,data.reviewedIso);
assert.ok(!graph.some(x=>x.aggregateRating));
const details=nodes(main,n=>n.name==='details');assert.equal(details.length,8);
assert.deepEqual(details.map(n=>[text(nodes(n,x=>x.name==='summary')[0]),text(nodes(n,x=>x.name==='p')[0])]),data.faqs.map(f=>[f.q,f.a]));
assert.deepEqual(graph.find(x=>x['@type']==='FAQPage').mainEntity.map(f=>[f.name,f.acceptedAnswer.text]),data.faqs.map(f=>[f.q,f.a]));
assert.equal(text(all(n=>n.attribs?.id==='sg-resource-text')[0]),data.resource);
assert.equal(data.resource.match(/^\d\./gm).length,5);
const links=all(n=>n.name==='a'),urls=new Set();
for(const a of links){
  const href=a.attribs.href;assert.ok(href&&href!=='#');const u=new URL(href,canonical);
  if(['http:','https:'].includes(u.protocol))urls.add(u.origin+u.pathname+u.search);
  if(u.origin==='https://www.callteam.ca'){
    const f=path.join(site,u.pathname,u.pathname.endsWith('/')?'index.html':'');assert.ok(fs.existsSync(f),href);
    if(u.hash){const d=parseDocument(fs.readFileSync(f,'utf8'));assert.ok(nodes(d,n=>n.attribs?.id===decodeURIComponent(u.hash.slice(1))).length,href);}
  }
  if(u.hostname==='calendly.com')assert.equal(u.pathname,'/hello-callteam/new-meeting');
  if(a.attribs.target==='_blank')assert.match(a.attribs.rel||'',/noopener/);
}
assert.equal(nodes(main,n=>n.name==='a'&&(n.attribs.href||'').includes('calendly.com')).length,2);
for(const n of all(n=>n.attribs&&(n.attribs.src||(n.name==='link'&&n.attribs.rel==='stylesheet')))){
  const u=n.attribs.src||n.attribs.href;if(u.startsWith('/'))assert.ok(fs.existsSync(path.join(site,u.split('?')[0])),u);
}
for(const slug of ['apollo-alternatives','zoominfo-alternatives','b2b-lead-providers','outbound-sales-library']){
  const d=parseDocument(fs.readFileSync(path.join(site,'resources',slug,'index.html'),'utf8'));
  const found=nodes(d,n=>n.name==='a'&&(n.attribs.href||'').startsWith(route));assert.equal(found.length,1,slug);
  for(const a of found){const u=new URL(a.attribs.href,canonical);if(u.hash)assert.ok(ids.includes(u.hash.slice(1)));}
}
assert.ok(fs.readFileSync(path.join(site,'sitemap.xml'),'utf8').includes(canonical));
const prose=nodes(main,n=>n.name==='p').map(text).join(' ').replace(/\s+/g,' ');
assert.doesNotMatch(prose,/why this matters|that distinction matters|this matters because|why this is important|it(?:'|’)s not about|this isn(?:'|’)t|CallTeam uses|we use Apollo|we use Close|we tested (?:them|all)|guaranteed (?:results|ranking)|\bworkload\b/i);
const sentences=prose.split(/[.!?](?:\s|$)/).map(s=>s.trim().toLowerCase()).filter(s=>s.split(/\s+/).length>=10);
assert.deepEqual(sentences.filter((s,i)=>sentences.indexOf(s)!==i),[],'Repeated sentences');
if(process.env.AZ_AUDIT_URLS)fs.writeFileSync(process.env.AZ_AUDIT_URLS,JSON.stringify([...urls].filter(u=>u!==canonical),null,2));
console.log(JSON.stringify({result:'PASS',teamCosts:9,faqs:8,copyControls:1,formInputs:0,linkInstances:links.length,uniqueDestinations:urls.size-1,incomingLinks:4,mainWords:text(main).trim().split(/\s+/).length}));
