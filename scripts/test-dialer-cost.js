'use strict';
const assert = require('node:assert/strict');
const providers = require('../src/_data/dialerProviders.json').providers;
const {calculateCost} = require('../src/assets/js/dialer-comparison');
const base = {provider:'close',plan:'growth',billing:'annual',reps:'3'};
let checks = 0;
function calc(patch) { checks++; return calculateCost(providers,{...base,...patch}); }
// Independent subscription checkpoints: [provider, plan, seat minimum, monthly, annual].
// Numeric entries are complete per-caller prices; partial and unknown prices are explicit.
const fixtures = [
  ['nooks','quote',2,'quote','quote'], ['orum','quote',9,'quote','quote'],
  ['close','growth',1,109,99], ['close','scale',1,149,139],
  ['apollo','advanced',null,'partial:149','partial:119'],
  ['phoneburner','standard',1,165,140], ['phoneburner','professional',1,195,165], ['phoneburner','premium',1,215,183],
  ['kixie','single',null,'quote','quote'], ['kixie','multi',null,'quote','quote'],
  ['justcall','pro',2,69,49], ['justcall','proplus',2,109,89], ['justcall','salespro',2,'quote','quote'],
  ['aircall','professional',3,'unconfirmed',50],
  ['cloudtalk','essential-power',1,54,44], ['cloudtalk','expert-power',3,69,49],
  ['cloudtalk','essential-parallel',1,78,68], ['cloudtalk','expert-parallel',3,108,88],
  ['mojo','single',1,99,undefined], ['mojo','triple',1,149,undefined]
];
let configurations=0, scenarios=0;
for (const [provider,plan,minimum,monthly,annual] of fixtures) {
  const data=providers.find(p=>p.id===provider).plans.find(p=>p.id===plan);
  assert.deepEqual(Object.keys(data.rates).sort(),['monthly',...(annual===undefined?[]:['annual'])].sort());
  for (const [billing,expected] of [['monthly',monthly],['annual',annual]]) {
    if (expected===undefined) continue;
    configurations++;
    for (const reps of [1,3,5,10,100]) {
      scenarios++;
      const r=calc({provider,plan,billing,reps}); assert(!r.error,r.error); assert.equal(r.minimum,minimum);
      if (typeof expected==='number') {
        const seats=Math.max(reps,minimum), amount=expected*seats;
        assert.equal(r.kind,'estimate'); assert.equal(r.seats,seats); assert.equal(r.monthly,amount);
        assert.equal(r.annual,billing==='annual'?amount*12:null);
        assert.equal(r.licences,provider==='mojo'?reps:0);
      } else if (expected.startsWith('partial:')) {
        assert.equal(r.kind,'partial'); assert.equal(r.monthly,Number(expected.split(':')[1]));
        assert.equal(r.annual,null); assert.equal(r.seats,null);
      } else {
        assert.equal(r.kind,expected); assert.equal(r.monthly,null); assert.equal(r.annual,null); assert.equal(r.seats,null);
      }
      assert.equal(r.currency,providers.find(p=>p.id===provider).currency);
    }
  }
}
assert.equal(configurations,38); assert.equal(fixtures.length,providers.reduce((n,p)=>n+p.plans.length,0));
assert.equal(calc({provider:'aircall',plan:'professional',reps:1}).monthly,150);
assert.equal(calc({provider:'justcall',plan:'pro',reps:1}).monthly,98);
assert.equal(calc({provider:'mojo',plan:'triple',billing:'monthly',reps:5}).monthly,745);
assert.equal(calc({provider:'apollo',plan:'advanced',reps:100}).monthly,119);
assert.equal(calc({minimum:99,seatAddon:100,usageCost:200,setup:999}).monthly,297); // Removed fields cannot affect the simple result.
assert.equal(calc({provider:'nooks',plan:'quote',quotePrice:0,months:12}).kind,'quote');
for (const reps of ['', ' ', null, undefined, true, false, [], {}, '-1', '0', '1.5', '10001', 'NaN', 'Infinity', '1e309']) {
  const r=calc({reps}); assert.equal(r.kind,'error'); assert.equal(r.monthly,null); assert.equal(r.annual,null);
}
assert.equal(calc({reps:10000}).monthly,990000);
for (const patch of [{provider:'bad'},{plan:'bad'},{billing:'bad'},{provider:'mojo',plan:'single',billing:'annual'}]) assert.equal(calc(patch).kind,'error');
const fs=require('node:fs');const template=fs.readFileSync(require('node:path').join(__dirname,'../src/resources/best-cold-calling-dialers.njk'),'utf8');
const form=template.match(/<form id="dc-form"[\s\S]*?<\/form>/)[0];
assert.deepEqual([...form.matchAll(/<(?:input|select) id="([^"]+)"/g)].map(x=>x[1]).sort(),['dc-billing','dc-plan','dc-provider','dc-reps']);
assert(!template.includes('Add numbers, usage and extras'));assert(!template.includes('What will your team<br>actually pay?'));
console.log(`Simple dialler checks passed: ${configurations} billing configurations, ${scenarios} team-size scenarios, ${checks} calculations. Minimum seats, partial/quote prices, invalid inputs and four-field form verified.`);
