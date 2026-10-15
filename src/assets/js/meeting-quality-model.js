(function (root, factory) {
  "use strict";
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.MeetingQualityModel = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  // All counts describe one cohort. Outcomes are descriptive, never a quality score.
  var FIELDS = ["booked", "held", "accepted", "opportunities"];
  var LABELS = {
    booked: "Meetings booked",
    held: "Meetings held",
    accepted: "Held meetings accepted by sales",
    opportunities: "Opportunities created"
  };
  var RESOURCES = {
    metrics: { href: "/articles/cold-calling-metrics-campaign-quality/", label: "How to measure campaign quality" },
    held: { href: "/articles/outbound-appointment-setting/", label: "Improve meeting confirmation and attendance" },
    accepted: { href: "/articles/what-makes-b2b-appointment-qualified-practical-standard/", label: "Define a qualified appointment" },
    opportunities: { href: "/articles/how-to-hand-off-qualified-appointment-from-sdr-to-sales/", label: "Strengthen the handoff to sales" },
    tracking: { href: "/articles/appointment-setting-crm-integration/", label: "Track meeting outcomes in your CRM" }
  };

  function resource(key) {
    return { href: RESOURCES[key].href, label: RESOURCES[key].label };
  }

  function percentage(numerator, denominator) {
    if (numerator === null || denominator === null || denominator === 0) return null;
    return numerator / denominator * 100;
  }

  function difference(earlier, later) {
    return earlier === null || later === null ? null : earlier - later;
  }

  function focus(key, title, summary, checks, resourceKey) {
    return { key: key, title: title, summary: summary, checks: checks, resource: resource(resourceKey) };
  }

  function evaluate(input) {
    var errors = [];
    var counts = { booked: null, held: null, accepted: null, opportunities: null };
    var emptyMetrics = { heldRate: null, acceptanceRate: null, opportunityRate: null, bookedOpportunityRate: null };
    if (!input || typeof input !== "object" || Array.isArray(input)) {
      return { valid: false, errors: [{ field: "booked", message: "Enter the counts for one group of booked meetings." }], counts: counts, metrics: emptyMetrics, dropoffs: [], focus: null, notes: [] };
    }

    FIELDS.forEach(function (field) {
      var value = input[field];
      if (value === null || value === undefined || (typeof value === "string" && value.trim() === "")) {
        if (field === "booked") errors.push({ field: field, message: "Enter the number of meetings booked, including zero if none were booked." });
        return;
      }
      var numeric = typeof value === "number";
      var digits = typeof value === "string" && /^\d+$/.test(value.trim());
      var number = numeric ? value : digits ? Number(value.trim()) : NaN;
      if ((!numeric && !digits) || !Number.isSafeInteger(number) || number < 0 || number > 1000000) {
        errors.push({ field: field, message: LABELS[field] + " must be a whole number from 0 to 1,000,000. Use digits only." });
        return;
      }
      counts[field] = number;
    });

    FIELDS.forEach(function (field, index) {
      if (counts[field] === null) return;
      for (var i = 0; i < index; i++) {
        var previous = FIELDS[i];
        if (counts[previous] !== null && counts[field] > counts[previous]) {
          errors.push({ field: field, message: LABELS[field] + " cannot exceed " + LABELS[previous].toLowerCase() + " for the same group of bookings." });
          break;
        }
      }
    });

    var outcomes = input.outcomes === undefined || input.outcomes === null || input.outcomes === "" ? "unknown" : input.outcomes;
    if (["complete", "pending", "unknown"].indexOf(outcomes) === -1) {
      errors.push({ field: "outcomes", message: "Choose whether these outcomes are complete, still pending, or unknown." });
    }
    if (errors.length) return { valid: false, errors: errors, counts: counts, metrics: emptyMetrics, dropoffs: [], focus: null, notes: [] };

    var metrics = {
      heldRate: percentage(counts.held, counts.booked),
      acceptanceRate: percentage(counts.accepted, counts.held),
      // Opportunity rate uses held meetings, not sales-accepted meetings.
      opportunityRate: percentage(counts.opportunities, counts.held),
      bookedOpportunityRate: percentage(counts.opportunities, counts.booked)
    };
    var dropoffs = [
      { key: "held", label: "Booked to held", count: difference(counts.booked, counts.held) },
      { key: "accepted", label: "Held to sales accepted", count: difference(counts.held, counts.accepted) },
      { key: "opportunities", label: "Sales accepted to opportunity", count: difference(counts.accepted, counts.opportunities) }
    ];
    var notes = ["Use the same group of bookings at every stage. Do not mix this campaign's bookings with opportunities from older meetings."];
    if (outcomes === "pending") {
      notes.push("These outcomes are still pending. Differences are gaps so far, not confirmed losses or rejections. Update the same group as meetings and sales decisions progress.");
    } else if (outcomes === "unknown") {
      notes.push("Outcome timing is unknown. Confirm which meetings or sales decisions are still pending before interpreting a gap as a completed outcome.");
    }
    if (counts.booked > 0 && counts.booked <= 10) {
      notes.push("This is a small group of " + counts.booked + " booking" + (counts.booked === 1 ? "" : "s") + ". One outcome can move the percentages sharply; review the meeting notes before drawing a wider conclusion.");
    }
    if (counts.booked > 0 && counts.held !== null && counts.held < counts.booked) {
      notes.push("Booked minus held is not a no-show count. The difference can include future appointments, cancellations, rescheduling and no-shows.");
    }

    var resultFocus;
    var missing = FIELDS.slice(1).filter(function (field) { return counts[field] === null; });
    var incomplete = outcomes !== "complete";
    var suffix = incomplete ? " so far" : "";
    var checks = {
      held: [
        "Separate future appointments, reschedules, cancellations and no-shows before choosing a fix.",
        "Check whether the invitation states the meeting's purpose and who should attend.",
        "Review confirmation, reminder and rescheduling steps for this group."
      ],
      accepted: [
        "Review sales feedback against the qualification criteria agreed before booking.",
        "Check whether the prospect fits the target customer and understood the meeting's purpose.",
        "Look for missing context in the handoff notes; separate pending decisions from rejections."
      ],
      opportunities: [
        "Check which sales decisions are still open and whether enough time has passed for this sales cycle.",
        "Review the discovery notes, buyer need and agreed next step.",
        "Confirm that sales uses a consistent opportunity definition and records the outcome in the CRM."
      ]
    };

    if (counts.booked === 0) {
      resultFocus = focus("start", "Start with one group of bookings", "There are no booked meetings to assess yet. Set up the tracking now so your first campaign gives you useful feedback.", ["Agree what makes a meeting acceptable to sales.", "Track booked, held, sales-accepted and opportunity outcomes for the same group.", "Record the next step and the reason whenever a meeting is not accepted."], "metrics");
    } else if (missing.length) {
      resultFocus = focus("tracking", "Complete the missing outcome tracking", "Not yet recorded: " + missing.map(function (field) { return LABELS[field].toLowerCase(); }).join(", ") + ". Available rates are shown, but the missing stages prevent a complete comparison.", ["Use a distinct unknown or pending status; do not record an untracked outcome as zero.", "Ask sales to record acceptance and opportunity outcomes against the original booking.", "Return to this same group after the missing counts are available."], "tracking");
      notes.push("Blank fields mean unknown. They have not been counted as zero.");
    } else {
      var maximum = Math.max.apply(null, dropoffs.map(function (drop) { return drop.count; }));
      var leaders = dropoffs.filter(function (drop) { return drop.count === maximum; });
      if (maximum === 0) {
        resultFocus = focus("steady", "Every recorded booking has reached an opportunity", "Your " + counts.booked + " booking" + (counts.booked === 1 ? " has" : "s have") + " progressed through the recorded stages. These counts show no stage gap; they do not establish revenue, customer fit or a repeatable success rate.", ["Confirm the stage definitions and that each opportunity belongs to this group.", "Keep tracking opportunity outcomes and the next buyer commitment.", "Compare with later groups using the same definitions."], "metrics");
      } else if (leaders.length > 1) {
        resultFocus = focus("tie", "Several stages share the largest observed gap", leaders.map(function (drop) { return drop.label; }).join(" and ") + " each have a gap of " + maximum + " meeting" + (maximum === 1 ? "" : "s") + suffix + ". The counts do not point to one clear starting stage or explain the cause.", ["Review the meeting records at each tied stage before choosing a priority.", incomplete ? "Separate pending outcomes from completed decisions at every stage." : "Compare the recorded reasons and the effort needed to address each gap.", "Keep qualification, attendance and sales follow-up checks separate."], "metrics");
      } else {
        var key = leaders[0].key;
        var titles = {
          held: "Start with the gap between bookings and held meetings",
          accepted: "Start with sales acceptance after the meeting",
          opportunities: "Start with the next step after sales acceptance"
        };
        var summaries = {
          held: maximum + " of " + counts.booked + " bookings have not become held meetings" + suffix + ". This is the largest observed count gap. Check the appointment status before deciding what needs to change.",
          accepted: maximum + " of " + counts.held + " held meetings " + (incomplete ? "have not been recorded as accepted by sales yet" : "were not accepted by sales") + ". This is the largest observed count gap. Review the recorded reasons before changing qualification or targeting.",
          opportunities: maximum + " of " + counts.accepted + " sales-accepted meetings have not become recorded opportunities" + suffix + ". This is the largest observed count gap. Review sales timing, discovery and next steps before drawing a conclusion."
        };
        resultFocus = focus(key, titles[key], summaries[key], checks[key].slice(), key);
      }
    }
    return { valid: true, errors: [], counts: counts, metrics: metrics, dropoffs: dropoffs, focus: resultFocus, notes: notes };
  }

  return Object.freeze({ evaluate: evaluate });
});
