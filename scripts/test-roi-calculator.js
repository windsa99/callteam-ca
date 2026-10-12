"use strict";

const assert = require("assert/strict");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { calculate, DEFAULTS, LIMITS } = require("../src/assets/js/roi-model.js");

let passed = 0;

function test(name, check) {
  check();
  passed += 1;
  console.log(`PASS ${passed}: ${name}`);
}

function near(actual, expected, message) {
  assert.equal(typeof actual, "number", message);
  assert.ok(Math.abs(actual - expected) <= 1e-9 * Math.max(1, Math.abs(expected)),
    `${message || "Value"}: expected ${expected}, received ${actual}`);
}

test("Example: $12,000 spend, two wins, $25,000 gross profit and 108.33% ROI", () => {
  const result = calculate();
  assert.deepEqual(result.inputs, DEFAULTS);
  assert.equal(result.totalCost, 12000);
  assert.equal(result.expectedWins, 2);
  assert.equal(result.inputs.closeRate, 10);
  assert.equal(result.inputs.customerRevenue, 25000);
  assert.equal(result.revenue, 50000);
  assert.equal(result.grossProfit, 25000);
  assert.equal(result.contribution, 13000);
  near(result.roiPercent, 108.33333333333333);
  assert.equal(result.breakEvenCustomers, 1);
  near(result.breakEvenCloseRate, 4.8);
  assert.equal(result.breakEvenRevenuePerCustomer, 12000);
  assert.equal(result.breakEvenMarginPercent, 24);
  assert.equal(result.costPerHeldMeeting, 600);
  assert.equal(result.costPerExpectedCustomer, 6000);
});

test("A higher $10,000 monthly budget exposes a negative return", () => {
  const result = calculate({ monthlyCost: 10000 });
  assert.equal(result.totalCost, 30000);
  assert.equal(result.contribution, -5000);
  near(result.roiPercent, -16.666666666666668);
  assert.equal(result.breakEvenCustomers, 3);
});

test("Additional acquisition costs count once in the campaign total", () => {
  const result = calculate({ extraCosts: 2000 });
  assert.equal(result.totalCost, 14000);
  assert.equal(result.contribution, 11000);
  near(result.roiPercent, 78.57142857142857);
});

test("Longer campaigns increase costs without multiplying a total meeting input", () => {
  const result = calculate({ months: 6 });
  assert.equal(result.totalCost, 24000);
  assert.equal(result.expectedWins, 2);
  near(result.roiPercent, 4.166666666666667);
});

test("Zero held meetings produces a full campaign loss, with unavailable per-meeting metrics", () => {
  const result = calculate({ meetings: 0 });
  assert.equal(result.expectedWins, 0);
  assert.equal(result.revenue, 0);
  assert.equal(result.contribution, -12000);
  assert.equal(result.roiPercent, -100);
  assert.equal(result.costPerHeldMeeting, null);
  assert.equal(result.costPerExpectedCustomer, null);
  assert.equal(result.breakEvenCloseRate, null);
  assert.equal(result.breakEvenRevenuePerCustomer, null);
  assert.equal(result.breakEvenMarginPercent, null);
});

test("A zero close rate produces no wins and does not create a false break-even value", () => {
  const result = calculate({ closeRate: 0 });
  assert.equal(result.expectedWins, 0);
  assert.equal(result.roiPercent, -100);
  assert.equal(result.breakEvenCustomers, 1);
  near(result.breakEvenCloseRate, 4.8);
  assert.equal(result.breakEvenRevenuePerCustomer, null);
});

test("Zero gross margin retains revenue but yields no finite customer break-even", () => {
  const result = calculate({ grossMargin: 0 });
  assert.equal(result.revenue, 50000);
  assert.equal(result.grossProfit, 0);
  assert.equal(result.roiPercent, -100);
  assert.equal(result.breakEvenCustomers, null);
  assert.equal(result.breakEvenCloseRate, null);
  assert.equal(result.breakEvenRevenuePerCustomer, null);
  assert.equal(result.breakEvenMarginPercent, 24);
});

test("Zero campaign cost leaves ROI undefined instead of reporting infinity", () => {
  const result = calculate({ monthlyCost: 0, extraCosts: 0 });
  assert.equal(result.totalCost, 0);
  assert.equal(result.contribution, 25000);
  assert.equal(result.roiPercent, null);
  assert.equal(result.breakEvenCustomers, 0);
  assert.equal(result.breakEvenCloseRate, 0);
});

test("Fractional expected wins are retained through the revenue and profit calculation", () => {
  const result = calculate({ meetings: 7, closeRate: 12.5 });
  assert.equal(result.expectedWins, 0.875);
  assert.equal(result.revenue, 21875);
  assert.equal(result.grossProfit, 10937.5);
  assert.equal(result.contribution, -1062.5);
  near(result.roiPercent, -8.854166666666666);
});

test("An exact expected-value break-even scenario returns 0% ROI", () => {
  const result = calculate({ closeRate: 4.8 });
  assert.equal(result.expectedWins, 0.96);
  assert.equal(result.grossProfit, 12000);
  assert.equal(result.contribution, 0);
  assert.equal(result.roiPercent, 0);
  assert.equal(result.breakEvenCustomers, 1);
  near(result.breakEvenCloseRate, 4.8);
});

test("Zero customer revenue is not mistaken for a profitable acquisition", () => {
  const result = calculate({ customerRevenue: 0 });
  assert.equal(result.revenue, 0);
  assert.equal(result.roiPercent, -100);
  assert.equal(result.breakEvenCustomers, null);
  assert.equal(result.breakEvenCloseRate, null);
  assert.equal(result.breakEvenMarginPercent, null);
  assert.equal(result.breakEvenRevenuePerCustomer, 12000);
});

test("Infeasible break-even rates remain above 100%, rather than being clamped", () => {
  const result = calculate({ meetings: 1, closeRate: 10, customerRevenue: 100, grossMargin: 5 });
  assert.equal(result.breakEvenCloseRate, 240000);
  near(result.breakEvenRevenuePerCustomer, 2400000);
  assert.equal(result.breakEvenMarginPercent, 120000);
  assert.ok(result.roiPercent < 0);
});

test("Whole-customer break-even rounds upward when a partial customer would not cover costs", () => {
  const result = calculate({ monthlyCost: 5000, extraCosts: 1, customerRevenue: 15000 });
  assert.equal(result.totalCost, 15001);
  assert.equal(result.breakEvenCustomers, 3);
});

test("An exact whole-customer break-even does not add an unnecessary customer", () => {
  const result = calculate({ monthlyCost: 5000, customerRevenue: 15000 });
  assert.equal(result.totalCost, 15000);
  assert.equal(result.breakEvenCustomers, 2);
  assert.equal(result.roiPercent, 0);
});

test("An all-zero economic scenario has no ROI or finite margin-dependent break-even", () => {
  const result = calculate({ monthlyCost: 0, extraCosts: 0, meetings: 0, closeRate: 0, customerRevenue: 0, grossMargin: 0 });
  assert.equal(result.contribution, 0);
  assert.equal(result.roiPercent, null);
  assert.equal(result.breakEvenCustomers, null);
  assert.equal(result.breakEvenMarginPercent, null);
});

test("Upper permitted input bounds remain finite", () => {
  const input = Object.fromEntries(Object.entries(LIMITS).map(([key, limit]) => [key, limit.max]));
  const result = calculate(input);
  Object.entries(result).filter(([key]) => key !== "inputs").forEach(([key, value]) => {
    assert.ok(value === null || Number.isFinite(value), `${key} must be finite or unavailable`);
  });
  assert.equal(result.totalCost, 46000000);
  assert.equal(result.revenue, 10000000000000);
});

test("Changing close rate only gives the correct lower, example and higher scenarios", () => {
  const results = [5, 10, 15].map(closeRate => calculate({ closeRate }));
  assert.deepEqual(results.map(result => result.expectedWins), [1, 2, 3]);
  [4.166666666666667, 108.33333333333333, 212.5].forEach((expected, index) => {
    near(results[index].roiPercent, expected);
  });
  assert.deepEqual(results.map(result => result.totalCost), [12000, 12000, 12000]);
});

test("A lower $15,000 customer value continues to calculate a 25% return", () => {
  const result = calculate({ customerRevenue: 15000 });
  assert.equal(result.revenue, 30000);
  assert.equal(result.grossProfit, 15000);
  assert.equal(result.contribution, 3000);
  assert.equal(result.roiPercent, 25);
  assert.equal(result.breakEvenCustomers, 2);
});

test("Currency decimals do not trigger an extra whole customer at break-even", () => {
  const result = calculate({ monthlyCost: 0.1, months: 3, customerRevenue: 0.1, grossMargin: 100 });
  assert.equal(result.breakEvenCustomers, 3);
});

test("Tiny positive denominators never expose infinity to the interface", () => {
  const result = calculate({ customerRevenue: Number.MIN_VALUE, grossMargin: 100 });
  assert.equal(result.breakEvenCustomers, null);
  assert.equal(result.breakEvenCloseRate, null);
  Object.values(result).filter(value => typeof value === "number").forEach(value => assert.ok(Number.isFinite(value)));
});

test("A tiny positive cost still requires one whole customer, rather than rounding to zero", () => {
  const result = calculate({ monthlyCost: Number.EPSILON, extraCosts: 0 });
  assert.ok(result.totalCost > 0);
  assert.equal(result.breakEvenCustomers, 1);
});

test("Calculation does not mutate the input or shared defaults", () => {
  const input = Object.freeze({ ...DEFAULTS, meetings: 7 });
  const result = calculate(input);
  result.inputs.meetings = 999;
  assert.equal(input.meetings, 7);
  assert.equal(DEFAULTS.meetings, 20);
  assert.ok(Object.isFrozen(DEFAULTS));
});

test("Null, arrays and primitive input containers are rejected", () => {
  for (const input of [null, [], "", 0, true]) {
    assert.throws(() => calculate(input), TypeError);
  }
});

test("Missing overrides may use defaults, but explicit blank/null/string/undefined values cannot become zero", () => {
  assert.deepEqual(calculate({}).inputs, DEFAULTS);
  for (const field of Object.keys(DEFAULTS)) {
    for (const value of [null, "", " ", "0", undefined, true, false]) {
      assert.throws(() => calculate({ [field]: value }), { name: "TypeError", message: new RegExp(field) });
    }
  }
});

test("NaN, infinities, negatives and values beyond the stated input limits are rejected", () => {
  for (const [field, limit] of Object.entries(LIMITS)) {
    for (const value of [NaN, Infinity, -Infinity]) {
      assert.throws(() => calculate({ [field]: value }), { name: "TypeError", message: new RegExp(field) });
    }
    for (const value of [-1, limit.max + 1]) {
      assert.throws(() => calculate({ [field]: value }), { name: "RangeError", message: new RegExp(field) });
    }
  }
  assert.throws(() => calculate({ months: 0 }), RangeError);
});

test("Campaign duration and held-meeting counts require whole numbers", () => {
  assert.throws(() => calculate({ months: 1.5 }), /months must be a whole number/);
  assert.throws(() => calculate({ meetings: 20.5 }), /meetings must be a whole number/);
});

test("The browser global and CommonJS module expose the same calculation", () => {
  const source = fs.readFileSync(path.resolve(__dirname, "../src/assets/js/roi-model.js"), "utf8");
  const context = vm.createContext({});
  vm.runInContext(source, context);
  assert.equal(typeof context.CallTeamROI.calculate, "function");
  assert.deepEqual(JSON.parse(JSON.stringify(context.CallTeamROI.calculate())), calculate());
});

console.log(`ROI calculator: ${passed} checks passed. These validate arithmetic and input handling, not campaign performance.`);
