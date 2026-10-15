(function (root, factory) {
  "use strict";
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.CallTeamProposalModel = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  var CHOICES = {
    billing: ["monthly", "fourWeeks", "oneTime"],
    meetingUnit: ["booked", "held", "accepted", "lead", "unknown"],
    volumeType: ["target", "minimum", "estimate", "unknown"],
    qualification: ["written", "partial", "unknown"],
    replacements: ["replace", "credit", "reschedule", "charged", "unknown"],
    ownership: ["export", "limited", "unknown"],
    reporting: ["crm", "report", "unknown"],
    notice: ["none", "30", "60", "unknown"]
  };
  var CHANNELS = ["phone", "email", "linkedin", "research", "followup"];
  var LABELS = {
    fee: "Fixed fee", setup: "Setup fee", extras: "Other costs", rate: "Per-result fee",
    units: "Result count", minMonths: "Minimum commitment", months: "Comparison period"
  };
  var UNIT_LABELS = {
    booked: "booked meeting", held: "held meeting", accepted: "sales-accepted meeting", lead: "lead", unknown: "result"
  };
  var MONEY_MAX = 10000000;
  var UNIT_MAX = 1000000;

  function has(object, key) { return Object.prototype.hasOwnProperty.call(object, key); }
  function blank(value) { return value === undefined || value === null || (typeof value === "string" && value.trim() === ""); }
  function money(value) { return Math.round((value + Number.EPSILON) * 100) / 100; }
  function error(errors, proposal, field, message) { errors.push({ proposal: proposal, field: field, message: message }); }

  function number(value, field, index, errors, max, integer, required, min) {
    var label = LABELS[field] || field;
    if (blank(value)) {
      if (required) error(errors, index, field, "Enter the " + label.toLowerCase() + ".");
      return null;
    }
    // Accept ordinary decimal entry only. Currency symbols, exponents and booleans
    // are rejected instead of silently becoming a different amount.
    if ((typeof value !== "number" && typeof value !== "string") ||
        (typeof value === "string" && !/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(value.trim()))) {
      error(errors, index, field, label + " must be a number without currency symbols or commas.");
      return null;
    }
    var result = Number(typeof value === "string" ? value.trim() : value);
    if (!Number.isFinite(result) || result < min || result > max || (integer && !Number.isInteger(result))) {
      error(errors, index, field, label + " must be " + (integer ? "a whole number " : "a number ") + "between " + min + " and " + max + ".");
      return null;
    }
    return result === 0 ? 0 : result;
  }

  function normalize(raw, index, errors) {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
      error(errors, index, "proposal", "Enter the details for this proposal.");
      return null;
    }
    var proposal = {};
    if (!blank(raw.name) && typeof raw.name !== "string") error(errors, index, "name", "Proposal name must be text.");
    proposal.name = typeof raw.name === "string" ? raw.name.trim() : "";
    if (proposal.name.length > 120) error(errors, index, "name", "Keep the proposal name to 120 characters or fewer.");
    if (!proposal.name) proposal.name = "Proposal " + String.fromCharCode(65 + index);
    ["fee", "setup", "extras", "rate"].forEach(function (field) {
      proposal[field] = number(raw[field], field, index, errors, MONEY_MAX, false, false, 0);
    });
    proposal.units = number(raw.units, "units", index, errors, UNIT_MAX, true, false, 0);
    proposal.minMonths = number(raw.minMonths, "minMonths", index, errors, 36, true, false, 0);
    Object.keys(CHOICES).forEach(function (field) {
      var value = blank(raw[field]) && field !== "billing" ? "unknown" : raw[field];
      if (CHOICES[field].indexOf(value) === -1) {
        error(errors, index, field, "Choose a valid " + ({ billing: "billing period", meetingUnit: "result definition", volumeType: "volume basis", qualification: "qualification standard", replacements: "replacement policy", ownership: "data ownership option", reporting: "reporting option", notice: "notice period" })[field] + ".");
      }
      proposal[field] = value;
    });
    var channels = has(raw, "channels") ? raw.channels : [];
    if (!Array.isArray(channels) || channels.some(function (value) { return CHANNELS.indexOf(value) === -1; })) {
      error(errors, index, "channels", "Choose the channels included in this proposal.");
      proposal.channels = [];
    } else {
      // Keep a canonical order so repeated checkboxes cannot alter comparisons.
      proposal.channels = CHANNELS.filter(function (value) { return channels.indexOf(value) !== -1; });
    }
    return proposal;
  }

  function calculate(proposal, months) {
    var isPackage = proposal.billing === "oneTime";
    var multiplier = proposal.billing === "fourWeeks" ? 13 / 12 : 1;
    // Keep the unrounded monthly equivalent for all subsequent calculations.
    var exactMonthly = proposal.fee === null || isPackage ? null : proposal.fee * multiplier;
    var fixedCost = proposal.fee === null ? null : (isPackage ? proposal.fee : exactMonthly * months);
    var variableCost = proposal.rate === null ? null : (proposal.rate === 0 ? 0 : (proposal.units === null ? null : proposal.rate * proposal.units));
    var components = [fixedCost, proposal.setup, proposal.extras, variableCost];
    var known = components.filter(function (value) { return value !== null; });
    proposal.knownCost = known.length ? money(known.reduce(function (sum, value) { return sum + value; }, 0)) : null;
    proposal.completeCost = components.every(function (value) { return value !== null; });
    proposal.monthlyEquivalent = exactMonthly === null ? null : money(exactMonthly);
    proposal.fixedTermCost = proposal.fee !== null && proposal.setup !== null &&
      (isPackage || (proposal.minMonths !== null && proposal.minMonths > 0)) ?
      money((isPackage ? proposal.fee : exactMonthly * proposal.minMonths) + proposal.setup) : null;
    proposal.costPerResult = proposal.completeCost && proposal.units !== null && proposal.units > 0 && proposal.meetingUnit !== "unknown" ?
      money(components.reduce(function (sum, value) { return sum + value; }, 0) / proposal.units) : null;
    proposal.breakdown = [
      { label: isPackage ? "Fixed package fee" : "Fixed fees across the comparison period", amount: fixedCost === null ? null : money(fixedCost) },
      { label: "Setup fee", amount: proposal.setup },
      { label: "Other costs across the comparison period", amount: proposal.extras },
      { label: "Per-result fees at the entered volume", amount: variableCost === null ? null : money(variableCost) }
    ];
    proposal.notes = [];
    proposal.questions = [];

    var unknownPrices = ["fee", "setup", "extras", "rate"].filter(function (field) { return proposal[field] === null; }).map(function (field) { return LABELS[field].toLowerCase(); });
    if (unknownPrices.length) proposal.questions.push("Confirm the " + unknownPrices.join(", ") + ", including whether any of these are zero.");
    if (proposal.rate !== null && proposal.rate > 0 && proposal.units === null) proposal.questions.push("How many chargeable results should the budget allow for across the full comparison period?");
    if (proposal.meetingUnit === "unknown") proposal.questions.push("Are charges and targets based on leads, booked meetings, held meetings or sales-accepted meetings?");
    if (proposal.qualification !== "written") proposal.questions.push("Can the proposal state the buyer, company fit and qualification criteria in writing?");
    if (proposal.minMonths === null || proposal.notice === "unknown") proposal.questions.push("Confirm the minimum commitment, renewal terms and notice needed to stop further charges.");
    if (proposal.replacements === "unknown") proposal.questions.push("What happens when a prospect does not attend or a meeting fails the agreed criteria?");
    if (proposal.volumeType === "unknown" && proposal.units !== null) proposal.questions.push("Is the stated volume an estimate, a target or a written minimum, and over what period?");
    if (proposal.units === null && (proposal.rate === 0 || proposal.rate === null)) proposal.questions.push("What result volume, if any, is proposed for this comparison period?");
    if (proposal.ownership === "unknown" || proposal.ownership === "limited") proposal.questions.push("Which contacts, campaign data and records can you export when the engagement ends?");
    if (proposal.reporting === "unknown") proposal.questions.push("How will activity, meeting outcomes and sales feedback be reported?");
    if (proposal.channels.length === 0) proposal.questions.push("Which outreach channels, research and follow-up activities are included in the fee?");
    proposal.questions = proposal.questions.slice(0, 5);

    if (!proposal.completeCost) proposal.notes.push("Some costs are unknown. The known subtotal is not a complete campaign budget.");
    if (proposal.billing === "fourWeeks") proposal.notes.push("Four-week fees use 13 billing periods per 52-week year, divided by 12. This is an annualized comparison estimate, not an invoice schedule.");
    if (isPackage) proposal.notes.push("The package fee is counted once. Confirm that its scope covers the full comparison period.");
    if (proposal.minMonths !== null && proposal.minMonths > months) proposal.notes.push("The minimum commitment is longer than the comparison period. Check the fixed minimum-term cost before deciding.");
    if (proposal.fixedTermCost !== null) proposal.notes.push("The fixed minimum-term cost includes fixed fees and setup only. It excludes other costs, per-result fees, taxes and any later renewal charges.");
    if (proposal.units === 0) proposal.notes.push("No cost per result is calculated for zero results.");
    if (proposal.units !== null && proposal.volumeType === "target") proposal.notes.push("The entered volume is a target. It is not a record of delivered results.");
    if (proposal.units !== null && proposal.volumeType === "estimate") proposal.notes.push("The entered volume is an estimate. The cost per result depends on this assumption.");
    if (proposal.units !== null && proposal.volumeType === "minimum") proposal.notes.push("A stated minimum needs written qualification criteria, a delivery period and a clear remedy if it is missed.");
    if (proposal.rate !== null && proposal.rate > 0) proposal.notes.push("Per-result fees use the entered total volume. A different delivered or chargeable volume changes the total.");
    if (proposal.replacements === "reschedule") proposal.notes.push("Rescheduling a meeting does not by itself confirm that a replacement or credit is included.");
    if (proposal.replacements === "charged") proposal.notes.push("Missed or unsuitable meetings may remain chargeable under the selected policy. Confirm the exclusions.");
    if (proposal.ownership === "limited") proposal.notes.push("Some campaign data may not be exportable. Confirm the exact access and ownership limits.");
    if (proposal.notice === "30" || proposal.notice === "60") proposal.notes.push("A " + proposal.notice + "-day notice period may create further charges depending on renewal and billing dates.");
    return proposal;
  }

  function analyze(input) {
    var errors = [];
    if (!input || typeof input !== "object" || Array.isArray(input)) return { ok: false, errors: [{ proposal: null, field: "input", message: "Enter a comparison period, currency and two or three proposals." }] };
    if (input.currency !== "USD" && input.currency !== "CAD") error(errors, null, "currency", "Choose USD or CAD and use the same currency for every proposal.");
    var months = number(input.months, "months", null, errors, 24, true, true, 1);
    if (!Array.isArray(input.proposals) || input.proposals.length < 2 || input.proposals.length > 3) error(errors, null, "proposals", "Compare two or three proposals.");
    var proposals = Array.isArray(input.proposals) && input.proposals.length >= 2 && input.proposals.length <= 3 ?
      input.proposals.map(function (proposal, index) { return normalize(proposal, index, errors); }) : [];
    if (errors.length) return { ok: false, errors: errors };
    proposals = proposals.map(function (proposal) { return calculate(proposal, months); });
    var notices = ["Use one currency and the same comparison period. No exchange-rate conversion is applied. Taxes are excluded."];
    var units = proposals.map(function (proposal) { return proposal.meetingUnit; });
    if (units.some(function (unit) { return unit === "unknown"; })) notices.push("At least one result definition is unknown. Clarify it before comparing cost per result.");
    if (units.some(function (unit) { return unit !== units[0]; })) notices.push("These proposals count different results. A lead, booked meeting, held meeting and sales-accepted meeting are not interchangeable; do not directly compare their unit costs.");
    else if (units[0] !== "unknown") notices.push("All proposals use a " + UNIT_LABELS[units[0]] + " as the result unit. Confirm that qualification and counting rules also match before comparing unit costs.");
    if (proposals.some(function (proposal) { return !proposal.completeCost; })) notices.push("A lower known subtotal can reflect missing costs. Confirm the unknown charges before using it to compare prices.");
    if (proposals.some(function (proposal) { return proposal.volumeType !== proposals[0].volumeType; })) notices.push("The proposals use different volume bases. An estimate, target and written minimum are different commitments.");
    if (proposals.some(function (proposal) { return proposal.channels.join(",") !== proposals[0].channels.join(","); })) notices.push("The included activities differ. Compare the scope as well as the price.");
    return { ok: true, currency: input.currency, months: months, proposals: proposals, notices: notices };
  }

  function examples() {
    return {
      currency: "USD", months: 3,
      proposals: [
        { name: "Example A", fee: "4000", billing: "monthly", setup: "0", extras: "0", rate: "0", units: "30", meetingUnit: "booked", volumeType: "target", minMonths: "3", qualification: "written", replacements: "reschedule", ownership: "export", reporting: "crm", notice: "30", channels: ["phone", "email", "research", "followup"] },
        { name: "Example B", fee: "3500", billing: "monthly", setup: "2500", extras: "0", rate: "0", units: "18", meetingUnit: "held", volumeType: "target", minMonths: "3", qualification: "written", replacements: "replace", ownership: "export", reporting: "report", notice: "30", channels: ["phone", "email", "research", "followup"] }
      ]
    };
  }

  return Object.freeze({ analyze: analyze, examples: examples });
});
