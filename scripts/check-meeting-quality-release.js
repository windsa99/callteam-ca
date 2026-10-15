'use strict';
const fs=require('fs'),path=require('path'),assert=require('assert/strict'),{JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'..'),baseline=path.resolve(process.argv[2]||path.join(root,'../meeting-quality-baseline')),build=path.join(root,'_site');
const route='/b2b-meeting-quality-check/';
const affected={
 'articles/cold-calling-metrics-campaign-quality/index.html':'cta-metrics-meeting-check',
 'articles/outbound-appointment-setting/index.html':'cta-outbound-meeting-check',
 'articles/what-makes-b2b-appointment-qualified-practical-standard/index.html':'cta-qualified-meeting-check',
 'articles/how-to-hand-off-qualified-appointment-from-sdr-to-sales/index.html':'cta-handoff-meeting-check',
 'articles/appointment-setting-crm-integration/index.html':'cta-crm-meeting-check',
 'services/b2b-appointment-setting/index.html':'cta-appointment-meeting-check'
};
const styles=['articles/outbound-appointment-setting/index.html','articles/what-makes-b2b-appointment-qualified-practical-standard/index.html','articles/how-to-hand-off-qualified-appointment-from-sdr-to-sales/index.html','articles/appointment-setting-crm-integration/index.html'];
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name)]);}
function normalized(doc){const walker=doc.createTreeWalker(doc,128|4),remove=[];while(walker.nextNode()){const n=walker.currentNode;if(n.nodeType===8||!n.textContent.trim())remove.push(n);else n.textContent=n.textContent.replace(/\s+/g,' ').trim();}remove.forEach(n=>n.remove());return doc.documentElement.outerHTML;}
let preserved=0,assets=0;
for(const file of files(baseline)){
 const relative=path.relative(baseline,file),next=path.join(build,relative);assert(fs.existsSync(next),'Missing original file '+relative);
 const original=fs.readFileSync(file),current=fs.readFileSync(next);
 if(!relative.endsWith('.html')){if(relative!=='sitemap.xml'){assert(original.equals(current),'Changed existing asset '+relative);assets++;}continue;}
 const a=new JSDOM(original.toString()),b=new JSDOM(current.toString()),doc=b.window.document;
 for(const scope of ['header .nav-dropdown[aria-label="Resources menu"]','footer .footer-nav-column']){
  const links=[...doc.querySelectorAll(`${scope} a[href="${route}"]`)];assert.equal(links.length,1,relative+' navigation placement');assert.equal((links[0].querySelector('strong')||links[0]).textContent.trim(),'Meeting Quality Check');links[0].remove();
 }
 if(affected[relative]){const block=doc.getElementById(affected[relative]);assert(block,'Missing insert '+relative);assert.equal(block.querySelector('a').getAttribute('href'),route);assert.equal(block.querySelector('a').textContent.trim(),'Check Your Meeting Results');block.remove();}
 if(styles.includes(relative)){const css=doc.querySelectorAll('link[href="/assets/css/contextual-tools.css"]');assert.equal(css.length,1);css[0].remove();}
 assert.equal(normalized(doc),normalized(a.window.document),'Unexpected content change '+relative);a.window.close();b.window.close();preserved++;
}
function sitemap(p){const dom=new JSDOM(fs.readFileSync(p,'utf8'),{contentType:'application/xml'});const result=[...dom.window.document.querySelectorAll('url')].map(n=>n.textContent.replace(/\s+/g,' ').trim()).sort();dom.window.close();return result;}
const before=sitemap(path.join(baseline,'sitemap.xml')),after=sitemap(path.join(build,'sitemap.xml'));
const newEntry=after.filter(x=>x.startsWith('https://www.callteam.ca'+route+' '));assert.equal(newEntry.length,1);assert.deepEqual(after.filter(x=>!newEntry.includes(x)),before,'Existing sitemap URLs/dates preserved');
const fresh=new JSDOM(fs.readFileSync(path.join(build,route,'index.html'),'utf8')),d=fresh.window.document;
assert.equal(d.querySelectorAll('h1').length,1);assert.equal(d.querySelector('link[rel=canonical]').href,'https://www.callteam.ca'+route);
assert.equal(d.querySelector('title').textContent,'B2B Appointment Setting Performance Calculator | CallTeam');
assert(d.querySelector('meta[name=robots]').content.includes('index, follow'));
const graphs=[...d.querySelectorAll('script[type="application/ld+json"]')].map(n=>JSON.parse(n.textContent)).flatMap(x=>x['@graph']||[x]);
for(const type of ['WebPage','WebApplication','BreadcrumbList','Person','Organization','WebSite'])assert(graphs.some(n=>n['@type']===type),type);
for(const entry of graphs)for(const key of ['datePublished','dateModified'])if(entry[key])assert(/^\d{4}-\d{2}-\d{2}T.*Z$/.test(entry[key])&&!Number.isNaN(Date.parse(entry[key])));
assert.equal(d.querySelectorAll('.mq-table tbody tr').length,4);assert.equal(d.querySelectorAll('.mq-faqs details').length,8);assert.equal(d.querySelectorAll('.mq-formulas>div').length,4);
assert(d.querySelector('main').textContent.includes('no assumed monthly delivery volume'));
for(const id of ['booked','held','accepted','opportunities','outcomes'])assert(d.querySelector(`label[for="mq-${id}"]`));
const examples=JSON.parse(d.getElementById('mq-examples').textContent);assert.equal(examples.length,3);assert.deepEqual(examples[0].input,{booked:8,held:6,accepted:4,opportunities:2,outcomes:'complete'});
assert(!/fetch\s*\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage|api\//.test(fs.readFileSync(path.join(root,'src/assets/js/meeting-quality.js'),'utf8')));
const htmlFiles=files(build).filter(p=>p.endsWith('.html'));assert.equal(htmlFiles.length,preserved+1);
const report={passed:true,existingHtmlPagesPreserved:preserved,totalHtmlPages:htmlFiles.length,existingNonHtmlAssetsPreserved:assets,newPage:route,contextualPlacements:6,sharedNavigationLinksPerPage:2,staticDefinitions:4,staticFormulas:4,staticFAQs:8,practicalExamples:3,existingSitemapEntriesPreserved:before.length,newSitemapEntries:1,metadataSchemaAndDates:'passed',externalServicesRequired:false,browserVisualQaPerformed:false};
console.log(JSON.stringify(report,null,2));fresh.window.close();
