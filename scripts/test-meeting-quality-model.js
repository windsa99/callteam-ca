"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const model = require("../src/assets/js/meeting-quality-model.js");
let passed = 0;
function test(name, run) {
  try { run(); passed++; }
  catch (error) { console.error("FAIL:", name); throw error; }
}
function evaluate(overrides) {
  return model.evaluate(Object.assign({ booked: 8, held: 6, accepted: 4, opportunities: 2, outcomes: "complete" }, overrides));
}
function text(result) { return JSON.stringify(result); }
function close(actual, expected) { assert.ok(Math.abs(actual - expected) < 1e-10, actual + " != " + expected); }

test("low-count example uses held as the opportunity-rate denominator", () => {
  const result = evaluate();
  assert.equal(result.valid, true);
  close(result.metrics.heldRate, 75);
  close(result.metrics.acceptanceRate, 200 / 3);
  close(result.metrics.opportunityRate, 100 / 3);
  close(result.metrics.bookedOpportunityRate, 25);
  assert.deepEqual(result.dropoffs.map(d => d.count), [2, 2, 2]);
  assert.equal(result.focus.key, "tie");
  assert.match(result.notes.join(" "), /small group of 8/);
});
test("largest attendance gap avoids declaring a no-show rate", () => {
  const result = evaluate({ booked: 9, held: 4, accepted: 3, opportunities: 2 });
  assert.equal(result.focus.key, "held");
  assert.match(result.notes.join(" "), /not a no-show count/);
  assert.match(result.focus.checks.join(" "), /future appointments/);
});
test("largest completed acceptance gap provides actual count and relevant action", () => {
  const result = evaluate({ booked: 8, held: 7, accepted: 3, opportunities: 2 });
  assert.equal(result.focus.key, "accepted");
  assert.match(result.focus.summary, /4 of 7 held meetings were not accepted/);
  assert.match(result.focus.checks.join(" "), /qualification criteria/);
});
test("largest opportunity gap checks timing rather than assuming bad meetings", () => {
  const result = evaluate({ booked: 8, held: 8, accepted: 7, opportunities: 2 });
  assert.equal(result.focus.key, "opportunities");
  assert.match(result.focus.summary, /5 of 7/);
  assert.match(result.focus.checks.join(" "), /sales cycle/);
});
for (const outcomes of ["pending", "unknown", undefined, null, ""]) {
  test("unfinished acceptance outcomes remain provisional: " + outcomes, () => {
    const result = evaluate({ booked: 8, held: 7, accepted: 3, opportunities: 2, outcomes });
    assert.equal(result.valid, true);
    assert.match(result.focus.summary, /not been recorded as accepted by sales yet/);
    assert.doesNotMatch(result.focus.summary, /were not accepted|rejected|lost/);
    assert.match(result.notes.join(" "), /pending/);
  });
}
test("pending attendance gap says so far", () => assert.match(evaluate({ booked: 8, held: 3, accepted: 2, opportunities: 1, outcomes: "pending" }).focus.summary, /so far/));
test("pending opportunity gap says so far", () => assert.match(evaluate({ booked: 8, held: 8, accepted: 8, opportunities: 1, outcomes: "pending" }).focus.summary, /so far/));
test("two-way tie names both stages without making up one winner", () => {
  const result = evaluate({ booked: 8, held: 5, accepted: 2, opportunities: 1 });
  assert.equal(result.focus.key, "tie");
  assert.match(result.focus.summary, /Booked to held and Held to sales accepted/);
});
test("pending tie makes the gap provisional", () => assert.match(evaluate({ outcomes: "pending" }).focus.summary, /so far/));
test("all equal positive counts do not manufacture a problem", () => {
  const result = evaluate({ booked: 4, held: 4, accepted: 4, opportunities: 4 });
  assert.equal(result.focus.key, "steady");
  assert.deepEqual(Object.values(result.metrics), [100, 100, 100, 100]);
  assert.match(result.focus.summary, /do not establish revenue/);
});
test("all zero counts produce no NaN or invented percentages", () => {
  const result = evaluate({ booked: 0, held: 0, accepted: 0, opportunities: 0 });
  assert.equal(result.focus.key, "start");
  assert.deepEqual(Object.values(result.metrics), [null, null, null, null]);
  assert.doesNotMatch(text(result), /NaN|Infinity/);
});
test("zero downstream stages keep legitimate zero rates and unavailable denominators", () => {
  const result = evaluate({ held: 0, accepted: 0, opportunities: 0 });
  assert.deepEqual(result.metrics, { heldRate: 0, acceptanceRate: null, opportunityRate: null, bookedOpportunityRate: 0 });
});
test("unknown differs from explicit zero", () => {
  const unknown = evaluate({ accepted: "", opportunities: "" });
  const zero = evaluate({ accepted: 0, opportunities: 0 });
  assert.equal(unknown.focus.key, "tracking");
  assert.equal(unknown.metrics.acceptanceRate, null);
  assert.equal(zero.metrics.acceptanceRate, 0);
  assert.notEqual(zero.focus.key, "tracking");
});
test("known downstream counts can calculate nonadjacent rates despite missing held", () => {
  const result = evaluate({ held: null });
  assert.equal(result.valid, true);
  assert.equal(result.focus.key, "tracking");
  assert.deepEqual(result.dropoffs.map(d => d.count), [null, null, 2]);
  assert.equal(result.metrics.bookedOpportunityRate, 25);
  assert.equal(result.metrics.opportunityRate, null);
});
test("all downstream unknowns remain unknown", () => {
  const result = model.evaluate({ booked: "8" });
  assert.equal(result.valid, true);
  assert.equal(result.focus.key, "tracking");
  assert.deepEqual(Object.values(result.metrics), [null, null, null, null]);
});
test("zero booked with unknown downstream starts tracking without inventing outcomes", () => {
  const result = model.evaluate({ booked: 0 });
  assert.equal(result.focus.key, "start");
  assert.equal(result.counts.held, null);
});
test("digit strings trim whitespace and normalize leading zeroes", () => {
  const result = evaluate({ booked: " 08 ", held: "006", accepted: "4", opportunities: "2" });
  assert.deepEqual(result.counts, { booked: 8, held: 6, accepted: 4, opportunities: 2 });
});
test("largest allowed cohort produces finite correct rates", () => {
  const result = evaluate({ booked: 1000000, held: 750000, accepted: 500000, opportunities: 250000 });
  assert.equal(result.valid, true);
  assert.equal(result.metrics.heldRate, 75);
  assert.equal(result.metrics.bookedOpportunityRate, 25);
});
for (const value of [null, undefined, "", "   "]) {
  test("bookings are required: " + JSON.stringify(value), () => {
    const result = evaluate({ booked: value });
    assert.equal(result.valid, false);
    assert.ok(result.errors.some(e => e.field === "booked"));
  });
}
for (const value of [-1, 1.5, NaN, Infinity, -Infinity, 1000001, true, false, "1e3", "1E3", "-1", "1.5", "1,000", "+8", "0x10", "eight", [], {}, "<script>alert(1)</script>"]) {
  test("reject malformed count: " + String(value), () => {
    const result = evaluate({ booked: value });
    assert.equal(result.valid, false);
    assert.equal(result.focus, null);
    assert.ok(result.errors.some(e => e.field === "booked"));
    assert.doesNotMatch(text(result), /<script>/);
  });
}
for (const field of ["held", "accepted", "opportunities"]) {
  test("downstream fields reject booleans too: " + field, () => assert.equal(evaluate({ [field]: true }).valid, false));
}
for (const value of [null, undefined, [], "8", 8, true]) {
  test("invalid input object safely returns errors: " + String(value), () => {
    const result = model.evaluate(value);
    assert.equal(result.valid, false);
    assert.equal(result.focus, null);
  });
}
for (const value of ["done", "COMPLETE", true, [], {}]) {
  test("invalid outcome state is rejected: " + String(value), () => {
    const result = evaluate({ outcomes: value });
    assert.equal(result.valid, false);
    assert.ok(result.errors.some(e => e.field === "outcomes"));
  });
}
test("held cannot exceed booked", () => assert.equal(evaluate({ held: 9 }).valid, false));
test("accepted cannot exceed held", () => assert.equal(evaluate({ accepted: 7 }).valid, false));
test("opportunities cannot exceed accepted", () => assert.equal(evaluate({ opportunities: 5 }).valid, false));
test("accepted cannot exceed booked through unknown held", () => assert.equal(evaluate({ held: null, accepted: 9 }).valid, false));
test("opportunities cannot exceed booked through two missing stages", () => assert.equal(evaluate({ held: null, accepted: null, opportunities: 9 }).valid, false));
test("opportunities cannot exceed held through unknown acceptance", () => assert.equal(evaluate({ held: 3, accepted: null, opportunities: 4 }).valid, false));
test("a later positive count cannot follow a known zero", () => assert.equal(evaluate({ booked: 0, held: null, accepted: null, opportunities: 1 }).valid, false));
test("repeated evaluations never reuse previous results or mutate caller inputs", () => {
  const input = Object.freeze({ booked: 8, held: 7, accepted: 3, opportunities: 2, outcomes: "complete" });
  const first = model.evaluate(input);
  first.focus.checks[0] = "mutated";
  first.focus.resource.href = "/wrong/";
  first.counts.booked = 0;
  evaluate({ booked: 1, held: 1, accepted: 1, opportunities: 1 });
  const again = model.evaluate(input);
  assert.equal(again.counts.booked, 8);
  assert.notEqual(again.focus.checks[0], "mutated");
  assert.match(again.focus.resource.href, /^\/articles\//);
  assert.equal(again.focus.key, "accepted");
});
test("browser UMD exposes the same model without CommonJS", () => {
  const context = {};
  vm.runInNewContext(fs.readFileSync(require.resolve("../src/assets/js/meeting-quality-model.js"), "utf8"), context);
  assert.equal(typeof context.MeetingQualityModel.evaluate, "function");
  assert.equal(context.MeetingQualityModel.evaluate({ booked: 8, held: 6, accepted: 4, opportunities: 2, outcomes: "complete" }).metrics.heldRate, 75);
});
test("exhaustive small cohorts satisfy rate bounds, count conservation and focus selection", () => {
  let scenarios = 0;
  for (let booked = 0; booked <= 12; booked++) for (let held = 0; held <= booked; held++) for (let accepted = 0; accepted <= held; accepted++) for (let opportunities = 0; opportunities <= accepted; opportunities++) {
    const result = evaluate({ booked, held, accepted, opportunities });
    assert.equal(result.valid, true);
    assert.equal(result.dropoffs.reduce((sum, gap) => sum + gap.count, 0), booked - opportunities);
    for (const rate of Object.values(result.metrics)) assert.ok(rate === null || Number.isFinite(rate) && rate >= 0 && rate <= 100);
    assert.equal(result.metrics.heldRate, booked === 0 ? null : held / booked * 100);
    assert.equal(result.metrics.acceptanceRate, held === 0 ? null : accepted / held * 100);
    assert.equal(result.metrics.opportunityRate, held === 0 ? null : opportunities / held * 100);
    assert.equal(result.metrics.bookedOpportunityRate, booked === 0 ? null : opportunities / booked * 100);
    if (booked === 0) assert.equal(result.focus.key, "start");
    else if (booked === opportunities) assert.equal(result.focus.key, "steady");
    else {
      const largest = Math.max(booked - held, held - accepted, accepted - opportunities);
      const leaders = result.dropoffs.filter(drop => drop.count === largest);
      assert.equal(result.focus.key, leaders.length > 1 ? "tie" : leaders[0].key);
    }
    scenarios++;
  }
  console.log("Exhaustive valid small-cohort scenarios:", scenarios);
});
console.log("Meeting quality model checks passed:", passed);
