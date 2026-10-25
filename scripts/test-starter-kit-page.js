'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'..'),site=path.join(root,'_site');
const canonical='https://www.callteam.ca/b2b-cold-calling-starter-kit/';
const dom=new JSDOM(fs.readFileSync(path.join(site,'b2b-cold-calling-starter-kit/index.html'),'utf8'));
const d=dom.window.document,main=d.querySelector('main.sk-page');
assert(main);assert.equal(d.querySelectorAll('main').length,1);assert.equal(d.querySelectorAll('h1').length,1);
assert.equal(d.title,'Free B2B Cold Calling Starter Kit | CallTeam');
assert.equal(d.querySelector('link[rel="canonical"]').href,canonical);
assert.equal(d.querySelector('meta[property="og:url"]').content,canonical);
assert(!d.querySelector('meta[name="robots"]').content.includes('noindex'));
assert(d.querySelector('meta[name="description"]').content.length<=160);
assert.equal(d.querySelector('h1').textContent,'Get your next B2B cold calling campaign ready.');
const ids=[...d.querySelectorAll('[id]')].map(x=>x.id);assert.equal(ids.length,new Set(ids).size);
let local=0;
for(const node of d.querySelectorAll('a[href],img[src],script[src],link[rel="stylesheet"]')) {
 const href=node.getAttribute(/^(IMG|SCRIPT)$/.test(node.tagName)?'src':'href');
 if(href.startsWith('#')) assert(d.getElementById(href.slice(1)),'Missing anchor '+href);
 if(href.startsWith('/')&&!href.startsWith('//')){
  const url=new URL(href,canonical),file=path.join(site,url.pathname,url.pathname.endsWith('/')?'index.html':'');
  assert(fs.existsSync(file),'Missing local destination '+href);local++;
 }
}
const downloads=[...main.querySelectorAll('[data-kit-download]')];assert.equal(downloads.length,5);
assert.deepEqual([...new Set(downloads.map(a=>path.extname(a.getAttribute('href'))))].sort(),['.csv','.pdf','.xlsx','.zip']);
assert(downloads.every(a=>a.hasAttribute('download')));
const graph=[...d.querySelectorAll('script[type="application/ld+json"]')].flatMap(x=>{const v=JSON.parse(x.textContent);return v['@graph']||[v]});
for(const type of ['WebPage','CreativeWork','Person','BreadcrumbList','FAQPage'])assert(graph.some(x=>x['@type']===type));
assert(!graph.some(x=>/Review|AggregateRating|SoftwareApplication/.test(x['@type'])));
const page=graph.find(x=>x['@type']==='WebPage'),kit=graph.find(x=>x['@type']==='CreativeWork'),author=graph.find(x=>x['@type']==='Person');
assert.equal(page.mainEntity['@id'],kit['@id']);assert.equal(page.author['@id'],author['@id']);
assert.equal(main.querySelector('[rel="author"]').textContent,author.name);assert.equal(kit.isAccessibleForFree,true);
for(const key of ['datePublished','dateModified'])assert(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\dZ$/.test(page[key])&&Number.isFinite(Date.parse(page[key])));
const faqs=[...main.querySelectorAll('.sk-faqs details')],questions=graph.find(x=>x['@type']==='FAQPage').mainEntity;
assert.equal(faqs.length,7);assert.equal(questions.length,faqs.length);
faqs.forEach((node,i)=>{assert.equal(node.querySelector('summary').textContent,questions[i].name);assert.equal(node.querySelector('p').textContent,questions[i].acceptedAnswer.text)});
assert.equal(main.querySelectorAll('input,textarea,select,script,[hidden]').length,0);
assert.equal(main.querySelectorAll('.sk-file-grid article').length,4);
assert.equal(main.querySelectorAll('.sk-path-grid article').length,3);
for(const element of main.querySelectorAll('img'))assert(element.alt.trim());
assert(main.querySelector('#sk-example').textContent.includes('fictional'));
assert(main.querySelector('#sk-proof').textContent.includes('15 qualified demos in 90 days'));
assert.equal(main.querySelectorAll('a[href="https://calendly.com/hello-callteam/new-meeting"]').length,2);
const normal=s=>s.replace(/\s+/g,' ').trim();
for(const selector of ['p','h2,h3']){const texts=[...main.querySelectorAll(selector)].map(x=>normal(x.textContent));assert.equal(new Set(texts).size,texts.length,'Repeated copy '+selector)}
assert(!/SEO.optimiz|LLM.optimiz|impress.{0,30}search|rank on Google|ChatGPT|Claude|Gemini|guaranteed/i.test(main.textContent));
const css=fs.readFileSync(path.join(site,'assets/css/cold-calling-starter-kit.css'),'utf8');
const cssDom=new JSDOM('<style>'+css+'</style>');
function check(rules){for(const rule of rules){if(rule.selectorText)assert(rule.selectorText.split(',').every(s=>s.trim().startsWith('.sk-page')));if(rule.cssRules)check(rule.cssRules)}}
check(cssDom.window.document.styleSheets[0].cssRules);
for(const value of ['max-width:1000px','max-width:720px','max-width:420px',':focus-visible','prefers-reduced-motion','#f5f4f2','#ff5a1f','Archivo','Inter'])assert(css.includes(value));
console.log(JSON.stringify({passed:true,localLinksAndAssets:local,downloadLinks:downloads.length,faqs:7,structuredDataMatches:true,contentAvailableWithoutJavascript:true,duplicateParagraphsAndHeadings:0,cssScoped:true},null,2));
dom.window.close();cssDom.window.close();
