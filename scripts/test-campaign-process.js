'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'..'),site=path.join(root,'_site'),route='/b2b-cold-calling-campaign-process/';
const plan=require('../src/_data/campaignProcess');
const sum=x=>x.reduce((a,b)=>a+b,0);
assert.equal(sum(plan.monthOneAdditions),300);
assert.equal(sum(plan.monthTwoAdditions),150);
assert.equal(plan.carryover+plan.newMonthTwo,300);
assert.equal(plan.initialProspects+plan.newMonthTwo,450);
assert.equal(plan.monthlyCalls*2,2400);
assert.equal(plan.monthlyCalls/plan.initialProspects,4);
assert.equal(1500/plan.initialProspects,5);
assert.equal(1200/500,2.4);assert.equal(1500/500,3);
const html=fs.readFileSync(path.join(site,route,'index.html'),'utf8'),dom=new JSDOM(html),doc=dom.window.document;
assert.equal(doc.querySelectorAll('h1').length,1);
assert.equal(doc.title,'B2B Cold Calling Campaign: Your First 60 Days | CallTeam');
assert.equal(doc.querySelector('link[rel="canonical"]').href,'https://www.callteam.ca'+route);
assert(!doc.querySelector('meta[name="robots"]').content.includes('noindex'));
const ids=[...doc.querySelectorAll('[id]')].map(x=>x.id);assert.equal(new Set(ids).size,ids.length,'Duplicate IDs');
let links=0;
for(const el of doc.querySelectorAll('a[href],img[src],link[rel="stylesheet"]')){
 const url=el.getAttribute(el.tagName==='IMG'?'src':'href');assert(url,'Empty URL');
 if(url.startsWith('#'))assert(doc.getElementById(url.slice(1)), 'Missing anchor '+url);
 if(url.startsWith('/')&&!url.startsWith('//')){
  const parsed=new URL(url,'https://www.callteam.ca'),target=path.join(site,decodeURI(parsed.pathname),parsed.pathname.endsWith('/')?'index.html':'');
  assert(fs.existsSync(target),'Missing local target '+url);
  if(parsed.hash){const targetDoc=new JSDOM(fs.readFileSync(target,'utf8'));assert(targetDoc.window.document.getElementById(parsed.hash.slice(1)),'Missing destination anchor '+url);targetDoc.window.close();}
  links++;
 }
}
const graphs=[...doc.querySelectorAll('script[type="application/ld+json"]')].flatMap(s=>{const x=JSON.parse(s.textContent);return x['@graph']||[x]});
for(const type of ['WebPage','Article','Person','BreadcrumbList','FAQPage'])assert(graphs.some(x=>x['@type']===type),'Missing schema '+type);
const article=graphs.find(x=>x['@type']==='Article');assert(Number.isFinite(Date.parse(article.datePublished)));assert(Number.isFinite(Date.parse(article.dateModified)));assert(article.author['@id']);
const faq=graphs.find(x=>x['@type']==='FAQPage').mainEntity,details=[...doc.querySelectorAll('.process-faqs details')];
assert.equal(faq.length,8);assert.equal(details.length,8);
faq.forEach((x,i)=>{assert.equal(x.name,details[i].querySelector('summary').textContent);assert.equal(x.acceptedAnswer.text,details[i].querySelector('p').textContent)});
const main=doc.querySelector('main');assert.equal(main.querySelectorAll('input,textarea,select').length,0);
assert(!/impress.{0,20}search|llm.optim|SEO.optim|guaranteed meetings/i.test(main.textContent));
const paragraphs=[...main.querySelectorAll('p:not(.process-intake)')].map(x=>x.textContent.trim());assert.equal(new Set(paragraphs).size,paragraphs.length,'Repeated paragraph');
assert(main.textContent.includes('450 distinct prospects'));
assert(main.textContent.includes('150'));assert(main.textContent.includes('1,200'));
assert.equal(main.querySelectorAll('a[href="https://calendly.com/hello-callteam/new-meeting"]').length,2);
const css=fs.readFileSync(path.join(site,'assets/css/campaign-process.css'),'utf8');
for(const fragment of ['max-width:1000px','max-width:720px','max-width:420px',':focus-visible','prefers-reduced-motion','@media print'])assert(css.includes(fragment),fragment);
assert.equal(doc.querySelectorAll('link[href="/assets/css/campaign-process.css"]').length,1);
console.log(JSON.stringify({passed:true,mathScenarios:9,faqs:8,localLinksAndAssets:links,structuredDataValid:true,duplicateParagraphs:0,staticContentWithoutJavascript:true,browserVisualQaPerformed:false},null,2));
dom.window.close();
