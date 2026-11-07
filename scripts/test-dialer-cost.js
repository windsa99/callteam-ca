'use strict';
const assert=require('node:assert/strict');
const providers=require('../src/_data/dialerProviders.json').providers;
const {calculateCost}=require('../src/assets/js/dialer-comparison');
const base={provider:'close',plan:'growth',billing:'annual',reps:'3',minimum:'1',months:'12',licences:'3',seatPrice:'79',quotePrice:'150',quoteUnit:'seat',seatAddon:'0',teamAddon:'0',phoneCost:'0',usageMode:'total',usageCost:'0',units:'0',unitPrice:'0',setup:'0'};
let count=0;
function calc(patch){const r=calculateCost(providers,{...base,...patch});count++;return r;}
function invoice(patch,expected){const r=calc(patch);assert(!r.error,r.error);for(const [key,value] of Object.entries(expected))assert(Math.abs(r[key]-value)<1e-7,`${patch.provider||'close'} ${key}: ${r[key]} !== ${value}`);}
// Independent invoice checkpoints: annual equivalents, minimum licences, team add-ons and one-time fees.
invoice({}, {base:297,monthly:297,fixedTerm:3564,budget:3564});
invoice({billing:'monthly'}, {base:327,budget:327,months:1});
invoice({plan:'scale'}, {base:417,budget:5004});
invoice({provider:'aircall',plan:'professional',reps:'1',minimum:'3'}, {seats:3,base:150,budget:1800});
invoice({provider:'apollo',plan:'advanced',minimum:'1'}, {base:356,budget:4272});
invoice({provider:'apollo',plan:'advanced',billing:'monthly',minimum:'1',seatPrice:'99'}, {base:446,budget:446});
invoice({provider:'mojo',plan:'single',billing:'monthly',minimum:'1',licences:'1'}, {base:119,budget:119});
invoice({provider:'mojo',plan:'triple',billing:'monthly',minimum:'1'}, {base:447,budget:447});
invoice({provider:'mojo',plan:'single',billing:'monthly',reps:'1',licences:'1',minimum:'1',teamAddon:'55'}, {base:99,monthly:154,budget:154});
invoice({provider:'cloudtalk',plan:'essential-parallel',minimum:'1'}, {base:204,budget:2448});
invoice({provider:'cloudtalk',plan:'expert-power',minimum:'3',reps:'1'}, {base:147,budget:1764});
invoice({provider:'justcall',plan:'pro',minimum:'2',reps:'1'}, {base:98,budget:1176});
invoice({provider:'phoneburner',plan:'premium',minimum:'1',reps:'1'}, {base:183,budget:2196});
invoice({provider:'nooks',plan:'quote',minimum:'2',reps:'1',quotePrice:'500',quoteUnit:'team'}, {seats:2,base:500,budget:6000});
invoice({provider:'orum',plan:'quote',minimum:'9',reps:'3',months:'24',quotePrice:'100'}, {seats:9,base:900,budget:21600});
invoice({seatAddon:'10',teamAddon:'20',phoneCost:'6',usageMode:'units',units:'1000',unitPrice:'.0235',setup:'125'}, {base:297,extras:56,usage:23.5,monthly:376.5,fixedTerm:4236,budget:4643});
// Every supported provider/plan/billing combination, with team sizes, seat floors,
// per-seat and team quotes, both usage methods, and nonzero extras.
let combinations=0,configs=0;
for(const p of providers)for(const plan of p.plans)for(const billing of Object.keys(plan.rates)){
  configs++;
  for(const reps of [1,3,10])for(const extraSeats of [0,2,12])for(const quoteUnit of ['seat','team'])for(const usageMode of ['total','units'])for(const extras of [false,true]){
    const minimum=(plan.min||1)+extraSeats;
    const patch={provider:p.id,plan:plan.id,billing,reps,minimum,quoteUnit,usageMode,licences:Math.max(1,reps-1),seatAddon:extras?'7.25':'0',teamAddon:extras?'12':'0',phoneCost:extras?'6':'0',setup:extras?'83':'0',usageCost:'25',units:'1000',unitPrice:'.025'};
    const r=calc(patch);assert(!r.error,`${p.id}/${plan.id}/${billing}: ${r.error}`);
    assert.equal(r.seats,Math.max(reps,minimum));
    assert.equal(r.usage,25);assert(r.monthly>=r.base);assert(Number.isFinite(r.budget));
    assert(Math.abs(r.budget-(r.monthly*r.months+(extras?83:0)))<1e-7);
    const alternate=calc({...patch,usageMode:usageMode==='total'?'units':'total'});assert.equal(r.budget,alternate.budget);
    const noSetup=calc({...patch,setup:'0'});assert.equal(Math.round((r.budget-noSetup.budget)*100),extras?8300:0);
    combinations++;
  }
}
// Missing is not free; invalid values cannot leak an old or infinite estimate.
for(const field of ['reps','minimum','seatAddon','teamAddon','phoneCost','usageCost','setup'])for(const value of ['', ' ', '-1', 'NaN', 'Infinity', '1e309'])assert(calc({[field]:value}).error,field+' accepted '+value);
for(const field of ['reps','minimum'])for(const value of ['0','1.5','10001'])assert(calc({[field]:value}).error);
for(const p of providers)for(const plan of p.plans)for(const billing of Object.keys(plan.rates)){
  const r=plan.rates[billing],patch={provider:p.id,plan:plan.id,billing,minimum:plan.min||1};
  if(r===null){assert(calc({...patch,quotePrice:''}).error);assert(calc({...patch,months:''}).error);assert(calc({...patch,months:'0'}).error);if(billing==='annual')assert(calc({...patch,months:'1'}).error);}
  else if(r.seat===null)assert(calc({...patch,seatPrice:''}).error);
  if(plan.min>1)assert(calc({...patch,minimum:plan.min-1}).error);
}
for(const field of ['units','unitPrice'])for(const value of ['', '-1','Infinity'])assert(calc({usageMode:'units',[field]:value}).error);
assert(!calc({usageMode:'total',units:'',unitPrice:''}).error); // inactive fields do not block
assert(!calc({usageMode:'units',usageCost:'',units:'0',unitPrice:'0'}).error);
assert(calc({provider:'mojo',plan:'single',billing:'annual'}).error);
assert(calc({provider:'mojo',plan:'single',billing:'monthly',licences:'4'}).error);
assert(calc({provider:'unknown'}).error);assert(calc({plan:'unknown'}).error);assert(calc({billing:'unknown'}).error);
invoice({provider:'nooks',plan:'quote',minimum:'2',quotePrice:'0'}, {base:0,budget:0}); // explicit zero is distinct from unknown
invoice({reps:'10000',minimum:'10000'}, {base:990000,budget:11880000});
console.log(`Dialler cost checks passed: ${configs} plan/billing configurations; ${combinations} combinations; ${count} calculations including invoice fixtures and edge cases.`);
