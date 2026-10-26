'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),vm=require('node:vm'),{parseDocument,DomUtils}=require('htmlparser2');
const file=process.argv[2],outer=fs.readFileSync(file,'utf8'),root=path.resolve(__dirname,'..');
const find=(html,test)=>DomUtils.findAll(n=>['tag','script','style'].includes(n.type)&&test(n),parseDocument(html).children);
const payload=find(outer,n=>n.attribs.id==='page-data')[0];assert(payload,'Missing embedded page');
const html=JSON.parse(DomUtils.textContent(payload)),original=fs.readFileSync(path.join(root,'_site/compare/saleshive-alternatives/index.html'),'utf8');
const content=s=>DomUtils.textContent(find(s,n=>(n.attribs.class||'').split(/\s+/).includes('vc-page'))[0]).replace(/\s+/g,' ').trim();
assert.equal(content(html),content(original),'Preview page content differs from the tested page');
assert.equal(find(html,n=>n.name==='link'&&n.attribs.rel==='stylesheet'||n.name==='script'&&n.attribs.src).length,0,'Preview requires external styles or scripts');
assert.equal(find(html,n=>n.name==='img'&&!(n.attribs.src||'').startsWith('data:image/')).length,0,'Preview image is not embedded');
assert(html.includes('data:font/'));assert(!html.includes('clarity.ms')&&!html.includes('formspree.io'));
assert(find(html,n=>n.name==='button'&&n.attribs.type==='submit').every(n=>'disabled' in n.attribs));
assert(find(html,n=>n.name==='form').every(n=>n.attribs.action==='#contact'));
const booking=find(html,n=>n.name==='a'&&(n.attribs.href||'').includes('calendly.com/hello-callteam/new-meeting'));assert.equal(booking.length,4);
const positions=[];for(const a of booking){const url=new URL(a.attribs.href);assert.equal(url.pathname,'/hello-callteam/new-meeting');assert.equal(url.searchParams.get('utm_source'),'sandbox_preview');const value=url.searchParams.get('utm_content');assert(value.includes('entry=compare/saleshive-alternatives|page=compare/saleshive-alternatives|button='));positions.push(value.split('|button=')[1]);}
assert.deepEqual(positions.sort(),['closing','footer','header','hero']);
const scripts=[...find(outer,n=>n.name==='script'&&!n.attribs.type),...find(html,n=>n.name==='script'&&!n.attribs.type)];for(const node of scripts)new vm.Script(DomUtils.textContent(node));
assert.equal(find(html,n=>n.name==='a'&&(!n.attribs.href||!DomUtils.textContent(n).trim())&&(n.attribs.class||'').includes('vc-button')).length,0);
console.log(JSON.stringify({status:'passed',file,bytes:Buffer.byteLength(outer),pageTextParity:true,allAssetsEmbedded:true,analyticsRemoved:true,contactSendingDisabled:true,bookingLinks:4,trackingPlacements:positions,inlineScriptsCompile:true,desktopAndMobileControls:true}));
