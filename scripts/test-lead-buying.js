'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {recommendNextCall: recommend} = require('../src/assets/js/lead-buying');
const people = ['known_mobile', 'known_desk', 'known_unknown', 'unknown'];
const outcomes = ['new', 'unanswered', 'screened', 'wrong', 'callback', 'stop'];
const numbers = ['mobile', 'direct', 'company'];
// Expected decisions are explicit: a wrong number is never the next calling route.
const decisions = {
  known_mobile: {new:'mobile', unanswered:['direct','mobile','mobile'], wrong:['direct','mobile','mobile']},
  known_desk: {new:'direct', unanswered:['direct','mobile','direct'], wrong:['direct','mobile','direct']},
  known_unknown: {new:'direct', unanswered:['direct','mobile','direct'], wrong:['direct','mobile','direct']},
  unknown: {new:'company', unanswered:['company','company','company'], wrong:['company','company',null]}
};
let reachable = 0;
for (const person of people) for (const outcome of outcomes) {
  const needsNumber = outcome === 'unanswered' || outcome === 'wrong';
  for (const last of needsNumber ? numbers : ['']) {
    const r = recommend({person,outcome,last}); reachable++;
    assert(!r.error, `${person}/${outcome}/${last}: ${r.error}`);
    assert(r.title && r.why && r.next);
    assert(!/undefined|NaN|\[object Object\]/.test(`${r.title} ${r.why} ${r.next}`));
    assert(`${r.title} ${r.why} ${r.next}`.split(/\s+/).length <= 75, 'Keep advice short.');
    const expected = needsNumber ? decisions[person][outcome][numbers.indexOf(last)] : outcome === 'new' ? decisions[person].new : null;
    assert.equal(r.route, expected, `${person}/${outcome}/${last}`);
    if (outcome === 'wrong') {
      assert.notEqual(r.route,last);
      assert.match(`${r.why} ${r.next}`,/Remove/);
      assert(!/retry the original/i.test(r.next));
      if (person === 'unknown' && last === 'company') assert.equal(r.id,'research');
    }
    if (outcome === 'stop') {
      assert.equal(r.id,'stop'); assert.equal(r.title,'Stop the calling sequence.');
      assert.match(r.next,/Do not switch numbers/);
    }
    if (outcome === 'callback') {
      assert.equal(r.id,'callback'); assert.match(r.next,/time zone and preferred number/);
    }
    if (outcome === 'screened') {
      assert.equal(r.id,'screened'); assert.match(r.next,/name, company and business reason/);
    }
    if (outcome === 'unanswered') assert.match(r.next,/later|another suitable/i);
    if (outcome === 'new') assert.match(r.next,/No (mobile|direct line|company number)\?/);
  }
}
assert.equal(reachable,40);
let stateChecks=0, incomplete=0;
for (const person of people) for (const outcome of outcomes) for (const last of ['',...numbers]) {
  const r = recommend({person,outcome,last}); stateChecks++;
  if (['unanswered','wrong'].includes(outcome) && !last) {
    assert(r.error); assert(!r.title && !r.next); incomplete++;
  } else {
    assert(!r.error);
    if (!['unanswered','wrong'].includes(outcome)) assert.deepEqual(r,recommend({person,outcome,last:''}), 'Hidden old number must not alter advice.');
  }
}
assert.equal(stateChecks,96); assert.equal(incomplete,8);
for (const person of people) for (const outcome of ['unanswered','wrong']) {
  for (const last of ['missing','__proto__','constructor',null]) assert(recommend({person,outcome,last}).error);
}
for (const input of [null,{}, {person:'unknown',outcome:'invented'}, {person:'invented',outcome:'new'}]) assert(recommend(input).error);
const defaultInput={person:'known_mobile',outcome:'new'};
assert.deepEqual(recommend({...defaultInput,mobile:false,direct:false,company:false}),recommend(defaultInput), 'Removed availability fields must not influence results.');
assert.match(recommend(defaultInput).next,/No mobile\? Try their work direct line/);
const template=fs.readFileSync(path.join(__dirname,'../src/resources/how-to-buy-cold-calling-leads.njk'),'utf8');
const form=template.match(/<form id="lb-route-form"[\s\S]*?<\/form>/)[0];
assert.deepEqual([...form.matchAll(/<select id="([^"]+)"/g)].map(x=>x[1]),['lb-person','lb-outcome','lb-last']);
assert(!/type="checkbox"|type="submit"|lb-phone-options|Show my next step/.test(form));
assert.match(form,/<div id="lb-last-wrap" hidden>/);
assert.match(form,/id="lb-last" aria-describedby="lb-route-error"/);
console.log(`Next-call checks passed: ${reachable} reachable combinations; ${stateChecks} complete/incomplete/hidden-field states, including ${incomplete} missing-number states. Wrong numbers, callbacks, stop requests, fallback advice and short answers verified.`);
