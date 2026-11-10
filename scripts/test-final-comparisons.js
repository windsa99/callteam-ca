'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {parseDocument,DomUtils}=require('htmlparser2');
const guides=require('../src/_data/decisionGuides');
const site=path.resolve(__dirname,'../_site'),rows=[],urls=new Set();
const nodes=(d,fn)=>DomUtils.findAll(fn,d.children||[]),text=DomUtils.textContent;
const expectedIn={orum:['nooks-alternatives','best-cold-calling-dialers','auto-dialer-vs-predictive-dialer','outbound-sales-library','salesforce-alternatives'],salesforce:['best-crm-for-outbound-sales','best-crm-for-small-businesses','hubspot-alternatives','outbound-sales-library','orum-alternatives'],email:['best-cold-email-software','outbound-sales-library']};
for(const [key,guide]of Object.entries(guides)){
 const route='/resources/'+guide.slug+'/',canonical='https://www.callteam.ca'+route;
 const html=fs.readFileSync(path.join(site,route,'index.html'),'utf8'),dom=parseDocument(html),all=fn=>nodes(dom,fn),main=all(n=>n.name==='main')[0];
 assert.ok(main);assert.equal(all(n=>n.name==='h1').length,1);
 assert.equal(all(n=>n.name==='link'&&n.attribs.rel==='canonical')[0].attribs.href,canonical);
 const title=text(all(n=>n.name==='title')[0]),description=all(n=>n.name==='meta'&&n.attribs.name==='description')[0].attribs.content;
 assert.ok(title.length<=65,title);assert.ok(description.length<=165,description);
 assert.equal(nodes(main,n=>n.name==='button').length,1);assert.equal(nodes(main,n=>['input','select','form','textarea'].includes(n.name)).length,0);
 const ids=all(n=>n.attribs?.id).map(n=>n.attribs.id);assert.equal(ids.length,new Set(ids).size,'Duplicate ids');
 const graph=all(n=>n.name==='script'&&n.attribs.type==='application/ld+json').flatMap(n=>{const j=JSON.parse(text(n));return j['@graph']||[j]});
 assert.equal(graph.find(n=>n['@type']==='WebPage').url,canonical);assert.equal(graph.find(n=>n['@type']==='Article').dateModified,guide.reviewedIso);
 assert.deepEqual(graph.find(n=>n['@type']==='FAQPage').mainEntity.map(n=>[n.name,n.acceptedAnswer.text]),guide.faqs.map(n=>[n.q,n.a]));
 const details=nodes(main,n=>n.name==='details');assert.equal(details.length,8);
 assert.deepEqual(details.map(n=>[text(nodes(n,c=>c.name==='summary')[0]),text(nodes(n,c=>c.name==='p')[0])]),guide.faqs.map(n=>[n.q,n.a]));
 assert.equal(text(all(n=>n.attribs?.id==='sg-resource-text')[0]),guide.resource);assert.equal(guide.resource.match(/^\d\./gm).length,5);
 let links=all(n=>n.name==='a');for(const a of links){
  const href=a.attribs.href;assert.ok(href&&href!=='#','Empty link');const u=new URL(href,canonical);
  if(['https:','http:'].includes(u.protocol))urls.add(u.origin+u.pathname+u.search);
  if(u.origin==='https://www.callteam.ca'){
   const file=path.join(site,u.pathname,u.pathname.endsWith('/')?'index.html':'');assert.ok(fs.existsSync(file),href);
   if(u.hash){const target=parseDocument(fs.readFileSync(file,'utf8'));assert.ok(nodes(target,n=>n.attribs?.id===decodeURIComponent(u.hash.slice(1))).length,href);}
  }
  if(u.hostname==='calendly.com')assert.equal(u.pathname,'/hello-callteam/new-meeting');
  if(a.attribs.target==='_blank')assert.match(a.attribs.rel||'',/noopener/);
 }
 for(const n of all(n=>n.attribs&&(n.attribs.src||(n.name==='link'&&n.attribs.rel==='stylesheet')))){
  const href=n.attribs.src||n.attribs.href;if(href.startsWith('/'))assert.ok(fs.existsSync(path.join(site,href.split('?')[0])),href);
 }
 for(const slug of expectedIn[key]){
  const source=fs.readFileSync(path.join(site,'resources',slug,'index.html'),'utf8');assert.ok(source.includes('href="'+route+'"'),slug+' missing incoming link');
 }
 const prose=nodes(main,n=>n.name==='p').map(text).join(' ').replace(/\s+/g,' ');
 assert.doesNotMatch(prose,/why this matters|that distinction matters|this matters because|why this is important|it(?:’|')s not about|this isn(?:’|')t|CallTeam uses|we use Apollo|we use Close|we tested (?:them|all)|guaranteed (?:results|ranking)|not a benchmark|cannot establish that|\bworkload\b/i);
 const sentences=prose.split(/[.!?](?:\s|$)/).map(s=>s.trim().toLowerCase()).filter(s=>s.split(/\s+/).length>=10);
 assert.deepEqual(sentences.filter((s,i)=>sentences.indexOf(s)!==i),[],'Repeated long sentence');
 assert.ok(fs.readFileSync(path.join(site,'sitemap.xml'),'utf8').includes(canonical));
 rows.push({page:guide.slug,words:text(main).trim().split(/\s+/).length,links:links.length,faqs:8,copyButtons:1,inputs:0,titleLength:title.length,descriptionLength:description.length});
}
assert.deepEqual(guides.salesforce.costRows[0],['Salesforce Core','$2,340','$7,020','$11,700']);
assert.deepEqual(guides.salesforce.costRows.find(r=>r[0].startsWith('HubSpot')),['HubSpot Sales Hub Professional','$2,580','$4,740','$6,900']);
assert.deepEqual(guides.salesforce.costRows.find(r=>r[0].startsWith('monday')),['monday CRM Standard','$612<small>3 paid seats</small>','$612','$1,020']);
assert.equal(195*12*5+50*12*5,14700);
for(const row of guides.orum.budgetRows){if(row[0]==='Apollo Basic + Advanced Dialer'){assert.equal(row[1],'$'+(65*5+149));assert.equal(row[2],'$'+(65*10+149));}}
assert.equal((107+10*5)*12+2*15,1914);assert.equal((94+10*4.5)*12+2*13,1694);
for(const g of Object.values(guides))urls.delete('https://www.callteam.ca/resources/'+g.slug+'/');
fs.mkdirSync(path.resolve(__dirname,'../docs/final-comparisons'),{recursive:true});
fs.writeFileSync(path.resolve(__dirname,'../docs/final-comparisons/urls.json'),JSON.stringify([...urls],null,2));
console.log(JSON.stringify({result:'PASS',pages:rows,uniqueHttpDestinations:urls.size,staticArithmetic:'PASS',incomingLinks:12},null,2));
