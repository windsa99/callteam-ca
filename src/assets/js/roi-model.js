(function (root, factory) {
  "use strict";
  var api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  } else {
    root.CallTeamROI = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  // These are illustrative planning inputs, not performance benchmarks or a quote.
  var DEFAULTS = Object.freeze({
    monthlyCost: 4000,
    months: 3,
    extraCosts: 0,
    meetings: 20,
    closeRate: 10,
    customerRevenue: 25000,
    grossMargin: 50
  });

  var LIMITS = Object.freeze({
    monthlyCost: Object.freeze({ min: 0, max: 1000000 }),
    months: Object.freeze({ min: 1, max: 36, integer: true }),
    extraCosts: Object.freeze({ min: 0, max: 10000000 }),
    meetings: Object.freeze({ min: 0, max: 100000, integer: true }),
    closeRate: Object.freeze({ min: 0, max: 100 }),
    customerRevenue: Object.freeze({ min: 0, max: 100000000 }),
    grossMargin: Object.freeze({ min: 0, max: 100 })
  });

  function validate(input) {
    if (input === undefined) input = DEFAULTS;
    if (input === null || typeof input !== "object" || Array.isArray(input)) {
      throw new TypeError("Calculator inputs must be an object of numbers.");
    }

    var values = {};
    Object.keys(DEFAULTS).forEach(function (field) {
      var value = Object.prototype.hasOwnProperty.call(input, field) ? input[field] : DEFAULTS[field];
      var limit = LIMITS[field];
      if (typeof value !== "number" || !Number.isFinite(value)) {
        throw new TypeError(field + " must be a finite number.");
      }
      if (value < limit.min || value > limit.max) {
        throw new RangeError(field + " must be between " + limit.min + " and " + limit.max + ".");
      }
      if (limit.integer && !Number.isInteger(value)) {
        throw new RangeError(field + " must be a whole number.");
      }
      values[field] = value;
    });
    return values;
  }

  function ratioOrNull(numerator, denominator) {
    if (denominator <= 0) return null;
    var ratio = numerator / denominator;
    return Number.isFinite(ratio) ? ratio : null;
  }

  function percentageOrNull(numerator, denominator) {
    var ratio = ratioOrNull(numerator, denominator);
    if (ratio === null) return null;
    var percentage = ratio * 100;
    return Number.isFinite(percentage) ? percentage : null;
  }

  function wholeCustomersOrNull(cost, grossProfitPerCustomer) {
    var customers = ratioOrNull(cost, grossProfitPerCustomer);
    if (customers === null) return null;
    // Avoid an extra whole customer caused solely by floating-point noise at an integer.
    var nearest = Math.round(customers);
    if ((nearest > 0 || cost === 0) &&
        Math.abs(customers - nearest) <= Number.EPSILON * 4 * Math.max(1, customers)) {
      customers = nearest;
    }
    return Math.ceil(customers);
  }

  function calculate(input) {
    var values = validate(input);
    var totalCost = values.monthlyCost * values.months + values.extraCosts;
    // Meetings are the total HELD across the campaign, not a monthly count.
    var expectedWins = values.meetings * (values.closeRate / 100);
    // Revenue is the first 12 months per acquired customer, not cash during the campaign.
    var revenue = expectedWins * values.customerRevenue;
    var grossProfitPerCustomer = values.customerRevenue * (values.grossMargin / 100);
    var grossProfit = expectedWins * grossProfitPerCustomer;
    var contribution = grossProfit - totalCost;

    return {
      inputs: values,
      totalCost: totalCost,
      expectedWins: expectedWins,
      revenue: revenue,
      grossProfit: grossProfit,
      grossProfitPerCustomer: grossProfitPerCustomer,
      contribution: contribution,
      roiPercent: percentageOrNull(contribution, totalCost),
      breakEvenCustomers: wholeCustomersOrNull(totalCost, grossProfitPerCustomer),
      breakEvenCloseRate: percentageOrNull(totalCost, values.meetings * grossProfitPerCustomer),
      breakEvenRevenuePerCustomer: ratioOrNull(totalCost, expectedWins * (values.grossMargin / 100)),
      breakEvenMarginPercent: percentageOrNull(totalCost, revenue),
      costPerHeldMeeting: ratioOrNull(totalCost, values.meetings),
      costPerExpectedCustomer: ratioOrNull(totalCost, expectedWins)
    };
  }

  return Object.freeze({ DEFAULTS: DEFAULTS, LIMITS: LIMITS, calculate: calculate });
});
