'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{execFileSync}=require('node:child_process'),{JSDOM}=require('jsdom');
const root=path.resolve(__dirname,'..'),base='5168527b683c1a8f9e99af130079f8bbe66a9840',before=path.resolve(root,'../callteam-evergreen-release-baseline-5168527'),after=path.join(root,'_site');
const placements=JSON.parse(fs.readFileSync(path.join(root,'scripts/data/evergreen-three-placements.json'),'utf8'));
function list(p){return fs.readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?list(path.join(p,e.name)):[path.join(p,e.name)]);}
function git(args){return execFileSync('git',args,{cwd:root,encoding:'utf8'});}
const sources=git(['diff','--diff-filter=M','--name-only',base]).trim().split('\n').filter(Boolean);assert.deepEqual(sources.sort(),placements.map(x=>x.source).sort());

const allowedNew=new Set(['src/_data/evergreenLanding.js','src/_includes/evergreen3/schema.njk','src/_includes/evergreen3/faq.njk','src/assets/css/evergreen-landing.css','src/assets/js/evergreen-tools.js','src/assets/js/evergreen-ui.js','src/assets/downloads/CallTeam-Fintech-Meeting-Handoff-Checklist.txt','src/assets/downloads/CallTeam-Outbound-Self-Audit-Checklist.txt','src/assets/downloads/CallTeam-Lead-Generation-RFP-Template.txt','src/assets/downloads/CallTeam-Agency-Brief-Example.txt','src/services/fintech-lead-generation.njk','src/b2b-lead-generation-audit.njk','src/b2b-lead-generation-rfp-template.njk','scripts/data/evergreen-three-placements.json','scripts/test-evergreen-three.js','scripts/check-evergreen-three-release.js','scripts/package-evergreen-three-preview.js','scripts/test-evergreen-three-preview.js','docs/evergreen-three-sandbox.md']);
const added=git(['diff','--diff-filter=A','--name-only',base]).trim().split('\n').filter(Boolean);
const untracked=git(['ls-files','--others','--exclude-standard']).trim().split('\n').filter(Boolean);
for(const file of added.concat(untracked)){if(file==='node_modules'&&fs.lstatSync(path.join(root,file)).isSymbolicLink())continue;assert(allowedNew.has(file),'Unexpected added source: '+file);}
assert.equal(git(['diff','--diff-filter=D','--name-only',base]).trim(),'','No source deletions allowed');

for(const x of placements){const now=fs.readFileSync(path.join(root,x.source),'utf8'),old=git(['show',base+':'+x.source]);assert.equal(now.split(x.block).length,2,x.id);assert.equal(now.replace(x.block,''),old,x.source);}
git(['diff','--check']);
const byOut=Object.fromEntries(placements.map(x=>[x.output,x]));let unchanged=0,inserted=0,assets=0;
function normal(s){return s.replace(/\s+/g,' ').trim();}
for(const f of list(before)){const rel=path.relative(before,f),current=path.join(after,rel);assert(fs.existsSync(current),rel);if(rel==='sitemap.xml')continue;const b=fs.readFileSync(f),a=fs.readFileSync(current);
 if(!byOut[rel]){assert(a.equals(b),'Unrelated output changed: '+rel);if(rel.endsWith('.html'))unchanged++;else assets++;continue;}
 const x=byOut[rel],s=a.toString(),start='<!-- EG3:'+x.id+' -->',end='<!-- /EG3:'+x.id+' -->';assert.equal(s.split(start).length,2);const stripped=s.slice(0,s.indexOf(start))+s.slice(s.indexOf(end)+end.length);assert(normal(stripped)===normal(b.toString()),'Outside insertion: '+rel);
 const d=new JSDOM(s).window.document;assert(d.getElementById(x.id));assert(!d.getElementById(x.id).previousElementSibling?.classList.contains('context-tool-cta'),'Avoid adjacent CTA cards: '+x.id);assert.equal(d.getElementById(x.id).querySelector('a').getAttribute('href'),x.route);assert.equal(d.querySelectorAll('header a[href="'+x.route+'"],footer a[href="'+x.route+'"]').length,0);inserted++;
}
function sitemap(dir){const d=new JSDOM(fs.readFileSync(path.join(dir,'sitemap.xml'),'utf8'),{contentType:'application/xml'}).window.document;return Object.fromEntries([...d.querySelectorAll('url')].map(e=>[e.querySelector('loc').textContent,normal(e.outerHTML)]));}
const oldMap=sitemap(before),newMap=sitemap(after);assert.equal(Object.keys(oldMap).length,279);assert.equal(Object.keys(newMap).length,282);for(const [url,val] of Object.entries(oldMap))assert.equal(newMap[url],val);
const expectedNew=['assets/css/evergreen-landing.css','assets/js/evergreen-tools.js','assets/js/evergreen-ui.js','assets/downloads/CallTeam-Fintech-Meeting-Handoff-Checklist.txt','assets/downloads/CallTeam-Outbound-Self-Audit-Checklist.txt','assets/downloads/CallTeam-Lead-Generation-RFP-Template.txt','assets/downloads/CallTeam-Agency-Brief-Example.txt','services/fintech-lead-generation/index.html','b2b-lead-generation-audit/index.html','b2b-lead-generation-rfp-template/index.html'].sort();
const oldFiles=new Set(list(before).map(f=>path.relative(before,f)));assert.deepEqual(list(after).map(f=>path.relative(after,f)).filter(f=>!oldFiles.has(f)).sort(),expectedNew);
console.log(JSON.stringify({passed:true,baselinePages:279,unrelatedPagesByteIdentical:unchanged,hostPagesWithOnlyApprovedInsertions:inserted,existingAssetsByteIdentical:assets,totalPages:282,preservedSitemapEntries:279,newSitemapEntries:3,articleEngineAndSharedNavigationUnchanged:true},null,2));
