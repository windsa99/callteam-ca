'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),matter=require('gray-matter'),{parseDocument,DomUtils}=require('htmlparser2');
const root=path.resolve(__dirname,'..'),base=path.resolve(process.argv[2]),baseOutput=path.resolve(process.argv[3]),out=process.argv[4];
const route='/compare/saleshive-alternatives/',canonical='https://www.callteam.ca'+route,htmlFile='compare/saleshive-alternatives/index.html';
const insertions={
 'best-b2b-lead-generation-agencies':'If SalesHive is on your shortlist, our [SalesHive vs CallTeam comparison](/compare/saleshive-alternatives/) examines the staffing, commercial scope and campaign fit in more detail.',
 'best-b2b-cold-calling-companies-usa':'For a closer look at that calling decision, [compare CallTeam with SalesHive](/compare/saleshive-alternatives/) using the published scope, pricing context and meeting handoff.',
 'best-b2b-appointment-setting-companies':'Our [SalesHive alternatives guide](/compare/saleshive-alternatives/) develops that comparison around appointment quality, assigned resources and the work each proposal includes.'
};
const edited=new Set(Object.keys(insertions).map(n=>'articles/'+n+'.md'));
const addedSources=['_data/salesHiveComparison.js','assets/css/vendor-comparison.css','compare/saleshive-alternatives.njk'].sort();
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const rels=dir=>walk(dir).map(p=>path.relative(dir,p)).sort();
const read=(dir,p)=>fs.readFileSync(path.join(dir,p));
const normalize=s=>s.replace(/\s+/g,' ').trim();
function nodes(html,test){return DomUtils.findAll(n=>['tag','script','style'].includes(n.type)&&test(n),parseDocument(html,{withStartIndices:true,withEndIndices:true}).children);}
function text(node){return normalize(DomUtils.textContent(node));}
function hasClass(n,c){return(n.attribs.class||'').split(/\s+/).includes(c);}
const oldSource=rels(path.join(base,'src')),newSource=rels(path.join(root,'src'));
assert.deepEqual(newSource.filter(p=>!oldSource.includes(p)),addedSources);
for(const rel of oldSource){const a=read(path.join(base,'src'),rel),b=read(path.join(root,'src'),rel);if(!edited.has(rel))assert(a.equals(b),'Unrelated source changed: '+rel);else{const x=matter(a.toString()),y=matter(b.toString());assert.deepEqual(y.data,x.data,'Article metadata changed');const sentence=insertions[path.basename(rel,'.md')];assert.equal(y.content.split(sentence).length,2);assert.equal(y.content.replace('\n\n'+sentence,''),x.content,'Existing article changed beyond one contextual link');}}
const oldFiles=rels(baseOutput),files=rels(path.join(root,'_site'));assert.deepEqual(files.filter(p=>!oldFiles.includes(p)),['assets/css/vendor-comparison.css',htmlFile].sort());
const editedOutput=new Set(Object.keys(insertions).map(n=>'articles/'+n+'/index.html'));let identicalPages=0,identicalAssets=0;
function sitemapMap(s){const rows=new Map();for(const block of s.match(/<url>[^]*?<\/url>/g)||[]){const url=block.match(/<loc>([^<]+)<\/loc>/)[1];assert(!rows.has(url));rows.set(url,normalize(block));}return rows;}
for(const rel of oldFiles){const a=read(baseOutput,rel),b=read(path.join(root,'_site'),rel);if(rel==='sitemap.xml'){const before=sitemapMap(a.toString()),after=sitemapMap(b.toString());assert.equal(after.size,before.size+1);for(const[url,row]of before)assert.equal(after.get(url),row,'Existing sitemap record changed');assert(after.get(canonical).includes('<lastmod>2026-10-26</lastmod>'));continue;}if(editedOutput.has(rel)){const old=a.toString(),fresh=b.toString();const linked=nodes(fresh,n=>n.name==='p'&&DomUtils.findOne(x=>x.name==='a'&&x.attribs?.href===route,n.children));assert.equal(linked.length,1);const paragraph=linked[0];const stripped=fresh.slice(0,paragraph.startIndex)+fresh.slice(paragraph.endIndex+1);assert.equal(normalize(stripped),normalize(old),'Generated article changed beyond the added link');continue;}assert(a.equals(b),'Unrelated generated output changed: '+rel);if(rel.endsWith('.html'))identicalPages++;else identicalAssets++;}
const html=read(path.join(root,'_site'),htmlFile).toString(),all=nodes(html,()=>true),data=require('../src/_data/salesHiveComparison');
const get=(name,predicate=()=>true)=>all.filter(n=>n.name===name&&predicate(n));
const metas=key=>get('meta',n=>n.attribs.name===key||n.attribs.property===key).map(n=>n.attribs.content);
assert.equal(get('main').length,1);assert.equal(get('h1').length,1);assert(text(get('h1')[0]).includes('SalesHive alternative'));
assert.equal(get('title').length,1);assert(text(get('title')[0]).length<=65);assert(text(get('title')[0]).includes('SalesHive'));
assert(metas('description')[0].length>=100&&metas('description')[0].length<=180);assert.deepEqual(get('link',n=>n.attribs.rel==='canonical').map(n=>n.attribs.href),[canonical]);
assert(metas('robots')[0].includes('index, follow')&&!metas('robots')[0].includes('noindex'));assert.deepEqual(metas('og:url'),[canonical]);assert.equal(metas('og:title')[0],text(get('title')[0]));
const ids=new Set();for(const n of all)if(n.attribs.id){assert(!ids.has(n.attribs.id),'Duplicate ID '+n.attribs.id);ids.add(n.attribs.id);}
for(const a of get('a')){assert(a.attribs.href?.trim(),'Blank destination');if(a.attribs.href.startsWith('#'))assert(ids.has(a.attribs.href.slice(1)),'Missing jump target');}
const main=get('main')[0],mainNodes=DomUtils.findAll(n=>n.type==='tag',main.children),mainText=text(main);assert(!mainText.includes('Written by'));assert(!mainText.includes('Martal'));assert(!/guaranteed rankings|#1 alternative|independent review/i.test(mainText));
const table=get('table',n=>hasClass(n,'vc-table'))[0];assert(table);assert.equal(DomUtils.findAll(n=>n.name==='tr'&&n.parent.name==='tbody',table.children).length,6);
const faqDetails=get('details'),schema=get('script',n=>n.attribs.type==='application/ld+json').flatMap(n=>{const value=JSON.parse(DomUtils.textContent(n));return value['@graph']||[value];});
assert.equal(faqDetails.length,7);const faqSchema=schema.find(x=>x['@type']==='FAQPage');assert.deepEqual(faqSchema.mainEntity.map(x=>({q:x.name,a:x.acceptedAnswer.text})),data.faqs);
for(let i=0;i<faqDetails.length;i++){const children=DomUtils.findAll(n=>n.type==='tag',faqDetails[i].children);assert.equal(text(children.find(n=>n.name==='summary')),data.faqs[i].q);assert.equal(text(children.find(n=>n.name==='p')),data.faqs[i].a);}
assert(schema.find(x=>x['@type']==='WebPage'&&x.url===canonical));assert(!schema.some(x=>['Review','AggregateRating','Article'].includes(x['@type'])));
const ctas=mainNodes.filter(n=>n.name==='a'&&hasClass(n,'vc-button'));assert.equal(ctas.length,5);for(const a of ctas){assert(text(a).length>10);assert(a.attribs.href);}
const booking=get('a',n=>(n.attribs.href||'').includes('calendly.com/hello-callteam/new-meeting'));assert.equal(booking.length,4);assert(booking.every(a=>a.attribs.href==='https://calendly.com/hello-callteam/new-meeting'));
assert.equal(get('script',n=>n.attribs.src==='/assets/js/booking-attribution.js').length,1);
const model=require('../src/assets/js/booking-attribution');let trackingCases=0;
for(const suffix of ['', '?utm_source=google&utm_medium=cpc&utm_campaign=saleshive_alternative'])for(const placement of ['header','hero','closing','footer']){const href=canonical+suffix,visit=model.visitFrom(href,'',null,1000),url=new URL(model.bookingUrl('https://calendly.com/hello-callteam/new-meeting',href,visit,placement));assert.equal(url.pathname,'/hello-callteam/new-meeting');assert(url.searchParams.get('utm_content').includes('entry=compare/saleshive-alternatives|page=compare/saleshive-alternatives|button='+placement));assert.equal(url.searchParams.get('utm_source'),suffix?'google':'direct_or_unknown');trackingCases++;}
const initial=model.visitFrom(canonical+'?utm_source=research&utm_medium=referral','',null,1000),continued=model.visitFrom('https://www.callteam.ca/pricing/',canonical,initial,2000);const continuedUrl=new URL(model.bookingUrl('https://calendly.com/hello-callteam/new-meeting','https://www.callteam.ca/pricing/',continued,'header'));assert(continuedUrl.searchParams.get('utm_content').includes('entry=compare/saleshive-alternatives|page=pricing|button=header'));trackingCases++;
const caseLinks=mainNodes.filter(n=>n.name==='a'&&(n.attribs.href||'').startsWith('/case-studies/'));assert.equal(caseLinks.length,3);assert.deepEqual(data.cases.map(x=>x.metric),['11','15','9']);
const paragraphs=mainNodes.filter(n=>n.name==='p').map(text).filter(s=>s.length>=80);assert.equal(new Set(paragraphs).size,paragraphs.length,'Repeated long paragraph');
assert.equal(identicalPages,279);assert.equal(identicalAssets,58);assert.equal(files.filter(p=>p.endsWith('.html')).length,283);
const report={status:'passed',baseCommit:'b87f1f02073665f696a40f463aa6927f3ba6af9d',newRoute:route,newHtmlPages:1,newStylesheets:1,existingArticleLinksAdded:3,unrelatedHtmlPagesIdentical:identicalPages,existingAssetsIdentical:identicalAssets,sharedDesignFormsAndTracking:'Unchanged',sitemap:'Only one URL added; existing entries unchanged',faqs:7,comparisonRows:6,mainActionButtons:5,bookingLinks:4,newRouteTrackingCases:trackingCases,mainWordCount:mainText.split(/\s+/).length,productionDeployment:'none',checkedAt:new Date().toISOString()};
if(out)fs.writeFileSync(out,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
