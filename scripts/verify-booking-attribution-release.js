'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {parseDocument, DomUtils} = require('htmlparser2');
const model = require('../src/assets/js/booking-attribution');
const root = path.resolve(__dirname, '../_site');
const baseline = path.resolve(process.argv[2] || '../attribution-qa/baseline');
const reportPath = process.argv[3];
const tag = '<script src="/assets/js/booking-attribution.js" defer></script>\n';
function walk(dir) { return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]); }
let htmlPages=0,bookingLinks=0,otherLinks=0,unchangedAssets=0;
const urls=[];
for (const original of walk(baseline)) {
  const relative=path.relative(baseline,original); const current=path.join(root,relative);
  assert(fs.existsSync(current),'Missing existing output: '+relative);
  const a=fs.readFileSync(original); const b=fs.readFileSync(current);
  if (!relative.endsWith('.html')) { assert(a.equals(b),'Unexpected asset, sitemap or output change: '+relative); unchangedAssets++; continue; }
  htmlPages++;
  const text=b.toString();
  assert.equal(text.split(tag).length-1,1,'Attribution must load exactly once: '+relative);
  assert.equal(text.replace(tag,''),a.toString(),'Existing HTML changed beyond the one script include: '+relative);
  const pagePath='/' + relative.replace(/index\.html$/,'').replace(/\\/g,'/');
  const href='https://www.callteam.ca'+pagePath;
  const first=model.visitFrom('https://www.callteam.ca/resources/cold-call-scripts/msp-cold-call-script-managed-it-services/','https://www.google.com/',null,1800000000000);
  const currentVisit=model.visitFrom(href,'https://www.callteam.ca/pricing/',first,1800000005000);
  const dom=parseDocument(text);
  const anchors=DomUtils.findAll(n=>n.type==='tag'&&n.name==='a'&&n.attribs.href,dom.children);
  for (let i=0;i<anchors.length;i++) {
    const before=anchors[i].attribs.href;
    const after=model.bookingUrl(before,href,currentVisit,'body-'+i);
    if (model.isBookingUrl(before,href)) {
      bookingLinks++;
      const originalUrl=new URL(before,href); const newUrl=new URL(after);
      assert.equal(newUrl.origin,originalUrl.origin); assert.equal(newUrl.pathname,originalUrl.pathname); assert.equal(newUrl.hash,originalUrl.hash);
      for(const [key,value] of originalUrl.searchParams) if(key!=='utm_content') assert.equal(newUrl.searchParams.get(key),value);
      assert(newUrl.searchParams.get('utm_content').includes('page='+model.pageLabel(pagePath)));
      assert(newUrl.searchParams.get('utm_content').includes('entry=script:msp-cold-call-script-managed-it-services'));
      assert.equal(newUrl.searchParams.get('utm_source'),'google');
      for(const [key,value] of newUrl.searchParams) if(key.startsWith('utm_'))assert(value.length<=255);
      urls.push({page:pagePath,sourceHref:before,attributedHref:after});
    } else { otherLinks++;assert.equal(after,before,'Unrelated link changed: '+before); }
  }
}
assert(fs.existsSync(path.join(root,'assets/js/booking-attribution.js')));
assert(fs.readFileSync(path.join(root,'assets/js/booking-attribution.js')).equals(fs.readFileSync(path.resolve(__dirname,'../src/assets/js/booking-attribution.js'))));
const result={status:'passed',htmlPages,bookingLinks,otherLinks,unchangedAssets,existingHtml:'Only one deferred script include added per page',existingLinks:'Existing static href values unchanged; attributed URLs preserve the booking host, event path and original non-attribution parameters',stylesFormsAndMetadata:'Identical to baseline',realCalendlyCompletedBooking:'not performed',verifiedAt:new Date().toISOString()};
if(reportPath) fs.writeFileSync(reportPath,JSON.stringify({summary:result,sampleUrls:urls.filter((u,i)=>i%100===0)},null,2)+'\n');
console.log(JSON.stringify(result,null,2));
