'use strict';
const fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),{JSDOM,VirtualConsole}=require('jsdom');
const root=path.resolve(__dirname,'..'),file=process.argv[2],html=fs.readFileSync(file,'utf8');const master=new JSDOM(html).window.document;
const pages=JSON.parse(master.getElementById('preview-data').textContent);assert.deepEqual(Object.keys(pages),['fintech','audit','rfp']);let placements=0,downloads=0,applicationErrors=[];
for(const [key,text] of Object.entries(pages)){
 const vc=new VirtualConsole();vc.on('jsdomError',e=>applicationErrors.push(key+': '+e.message));
 const dom=new JSDOM(text,{runScripts:'dangerously',url:'http://terminal.local:4173/',pretendToBeVisual:true,virtualConsole:vc});const d=dom.window.document;assert.equal(d.querySelectorAll('script[src],link[rel=stylesheet],link[rel=canonical]').length,0);assert.equal(d.querySelector('meta[name=robots]').content,'noindex, nofollow');assert(!text.includes('clarity.ms'));assert(text.includes('data:font/'));assert.equal(d.querySelectorAll('.eg-faq details').length,7);
 const original=new JSDOM(fs.readFileSync(path.join(root,'_site',key==='fintech'?'services/fintech-lead-generation/index.html':key==='audit'?'b2b-lead-generation-audit/index.html':'b2b-lead-generation-rfp-template/index.html'),'utf8')).window.document;
 const visible=new JSDOM(text).window.document.querySelector('.eg-page').cloneNode(true);visible.querySelector('#preview-placements').remove();
 const norm=s=>s.replace(/\s+/g,' ').trim();assert(norm(visible.textContent)===norm(original.querySelector('.eg-page').textContent),'Preview copy differs: '+key);
 for(const a of d.querySelectorAll('a[download]')){const u=a.getAttribute('href');assert(u.startsWith('data:text/plain;'));assert(Buffer.from(u.split(',')[1],'base64').equals(fs.readFileSync(path.join(root,'src/assets/downloads',a.getAttribute('download')))));downloads++;}
 placements+=d.querySelectorAll('#preview-placements .eg-wrap.eg-card').length;
 for(const f of d.querySelectorAll('form')){assert(f.querySelector('[type=submit]').disabled);const e=new dom.window.Event('submit',{bubbles:true,cancelable:true});assert.equal(f.dispatchEvent(e),false);}
 if(key==='audit'){d.getElementById('eg-audit-example').click();d.getElementById('eg-audit-run').click();assert.equal(d.getElementById('eg-audit-counts').textContent,'Needs attention: 1 · To verify: 1 · Reported in place: 4');assert.match(d.getElementById('eg-audit-actions').textContent,/Assign each open callback/);}
 if(key==='rfp'){d.getElementById('eg-brief-example').click();d.getElementById('eg-brief-run').click();assert(!d.getElementById('eg-brief-results').hidden);assert.match(d.getElementById('eg-brief-output').value,/wholesale distributors/);}
 const detail=d.querySelector('.eg-faq details');detail.open=true;assert(detail.open);detail.open=false;assert(!detail.open);
 dom.window.close();
}
assert.equal(placements,11);assert.equal(downloads,5);assert.deepEqual(applicationErrors,[]);console.log(JSON.stringify({passed:true,embeddedPages:3,placements,embeddedDownloadAnchors:downloads,copyParity:true,offlineUiExecutionPassed:true,contactSendingBlocked:true,applicationScriptErrors:applicationErrors},null,2));
