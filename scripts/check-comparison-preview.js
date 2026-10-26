'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{parseDocument,DomUtils}=require('htmlparser2');
const file=process.argv[2],html=fs.readFileSync(file,'utf8'),doc=parseDocument(html);
function all(d,p){return DomUtils.findAll(n=>['tag','script','style'].includes(n.type)&&p(n),d.children);}
function one(d,p){const found=all(d,p);assert.equal(found.length,1);return found[0];}
function cls(n,c){return (n.attribs.class||'').split(/\s+/).includes(c);}
const data=JSON.parse(DomUtils.textContent(one(doc,n=>n.name==='script'&&n.attribs.id==='comparison-data')));
assert.equal(Object.keys(data.pages).length,6);assert.equal(data.entries.length,6);let checkedLinks=0;
for(const [key,label,slug]of data.entries){const preview=parseDocument(data.pages[key]),production=parseDocument(fs.readFileSync(path.resolve(__dirname,'../_site/articles',slug,'index.html'),'utf8'));
 const a=one(preview,n=>n.name==='article'&&cls(n,'article-page')),b=one(production,n=>n.name==='article'&&cls(n,'article-page'));
 assert.equal(DomUtils.textContent(a),DomUtils.textContent(b),'Preview article text differs: '+key);
 assert.equal(all(preview,n=>n.name==='h1').length,1);
 assert.equal(all(preview,n=>n.name==='link'&&['canonical','stylesheet','preconnect'].includes(n.attribs.rel)).length,0);
 assert.equal(all(preview,n=>n.name==='script'&&n.attribs.src).length,0);
 assert.equal(one(preview,n=>n.name==='meta'&&n.attribs.name==='robots').attribs.content,'noindex,nofollow');
 assert(all(preview,n=>n.name==='style').some(n=>DomUtils.textContent(n).includes('data:font/')),'Fonts missing from portable preview');
 const form=one(preview,n=>n.name==='form'&&cls(n,'contact-form'));assert.equal(form.attribs.action,'#contact');
 assert(all(preview,n=>n.name==='button'&&n.attribs.type==='submit').every(n=>Object.hasOwn(n.attribs,'disabled')));
 assert(!data.pages[key].includes('clarity.ms'));assert(!data.pages[key].includes('formspree.io'));
 for(const n of all(preview,n=>n.name==='img'))assert(n.attribs.src.startsWith('data:image/'),'Unembedded preview image');
 for(const n of all(preview,n=>n.name==='a'&&n.attribs.href)){const href=n.attribs.href;assert(!href.startsWith('/'),'Offline link depends on preview server');if(href.includes('calendly.com/hello-callteam/new-meeting'))assert.equal(href,'https://calendly.com/hello-callteam/new-meeting');checkedLinks++;}
}
console.log(JSON.stringify({status:'passed',pages:6,articleTextParity:true,embeddedFontsAndImages:true,noRequiredExternalScriptsOrStyles:true,noLiveFormEndpoint:true,noAnalytics:true,originalBookingDestination:true,linksInspected:checkedLinks,bytes:Buffer.byteLength(html)}));
