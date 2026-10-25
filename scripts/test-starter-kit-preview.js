'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {JSDOM,VirtualConsole}=require('jsdom');
const root=path.resolve(__dirname,'..'),file=process.argv[2];
assert(path.isAbsolute(file));
const html=fs.readFileSync(file,'utf8');
const built=new JSDOM(fs.readFileSync(path.join(root,'_site/b2b-cold-calling-starter-kit/index.html'),'utf8'));
async function check(pass){
 const errors=[],console=new VirtualConsole();console.on('jsdomError',e=>errors.push(e.message));
 const dom=new JSDOM(html,{runScripts:'dangerously',virtualConsole:console});
 await new Promise(resolve=>dom.window.addEventListener('load',resolve));
 const d=dom.window.document;
 assert.equal(d.querySelectorAll('script[src],link[rel="stylesheet"],link[rel="canonical"]').length,0);
 assert.equal(d.querySelector('meta[name="robots"]').content,'noindex, nofollow');
 assert(!html.includes('clarity.ms'));
 assert.equal(d.querySelector('main').textContent,built.window.document.querySelector('main').textContent);
 const ids=[...d.querySelectorAll('[id]')].map(x=>x.id);assert.equal(ids.length,new Set(ids).size);
 for(const a of d.querySelectorAll('a[href^="#"]'))assert(d.getElementById(a.getAttribute('href').slice(1)));
 const downloads=[...d.querySelectorAll('[data-kit-download]')];assert.equal(downloads.length,5);
 for(const a of downloads){
  const name=a.getAttribute('download'),href=a.getAttribute('href');
  assert(href.startsWith('data:')&&href.includes(';base64,'));
  assert(Buffer.from(href.split(',')[1],'base64').equals(fs.readFileSync(path.join(root,'src/assets/downloads',name))));
 }
 assert([...d.querySelectorAll('img')].every(x=>x.src.startsWith('data:image/')));
 assert((html.match(/data:font\//g)||[]).length>=6);
 assert.equal(d.querySelectorAll('#sandbox-link-placements>article').length,3);
 for(const detail of d.querySelectorAll('.sk-faqs details')){detail.querySelector('summary').click();assert(detail.open);detail.querySelector('summary').click();assert(!detail.open)}
 const menu=d.querySelector('#menu-toggle');menu.click();assert(menu.checked);menu.click();assert(!menu.checked);
 for(const form of d.querySelectorAll('form')){assert(form.querySelector('[type="submit"]').disabled);assert.equal(form.dispatchEvent(new dom.window.Event('submit',{bubbles:true,cancelable:true})),false)}
 assert.deepEqual(errors,[]);dom.window.close();
 return {pass,passed:true,downloadBytesMatch:true,contentParity:true,embeddedFontsAndImages:true,placementSamples:3,faqAndMenuToggles:true,contactSubmissionBlocked:true,scriptErrors:0};
}
(async()=>{const passes=[];for(let n=1;n<=2;n++)passes.push(await check(n));built.window.close();process.stdout.write(JSON.stringify({passed:true,passes},null,2)+'\n')})().catch(error=>{process.stderr.write(String(error.stack)+'\n');process.exitCode=1});
