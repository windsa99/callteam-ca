const belkins = require('./belkinsComparison');
const callbox = require('./callboxComparison');

const dollars = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const podBudgets = callbox.podEstimates.slice(0, 2).map((estimate, index) => ({
  label: estimate.label,
  monthly: estimate.total,
  threeMonths: `US${dollars.format(callbox.callboxPerPod * (index + 1) * belkins.prices.comparisonMonths)}`,
}));

module.exports = {
  checkedDate: '2026-11-17',
  checkedLabel: '17 November 2026',
  prices: belkins.prices,
  podBudgets,
  sources: {
    belkinsManaged: belkins.sources.belkinsManaged,
    belkinsPlans: belkins.sources.belkinsPlans,
    belkinsAppointments: belkins.sources.belkinsAppointments,
    belkinsTerms: belkins.sources.belkinsTerms,
    callboxPricing: callbox.sources.callboxPricing,
    callboxFaq: callbox.sources.callboxFaq,
    callboxAppointments: callbox.sources.callboxAppointments,
    callTeam: belkins.sources.callTeam,
    campaign: callbox.sources.campaign,
  },
  faqs: [
    {
      question: 'When does Belkins count a meeting against your package?',
      answer: 'Belkins counts meetings that take place and meet your criteria. It works to reschedule no-shows. Flag any wrong-fit meeting in your feedback. Share a recording or transcript so Belkins can review it.',
    },
    {
      question: 'Can one Callbox pod cover two markets?',
      answer: 'A Callbox pod focuses on one buyer group or market segment. Confirm which markets, time zones and languages one team can cover before you add a second pod.',
    },
    {
      question: 'How do Callbox and Belkins hand off meetings?',
      answer: 'Callbox describes a briefing note with prior conversations and buyer context. Belkins’ pay-per-appointment package includes calendar bookings and monthly reporting. Ask either provider for a sample CRM record and who owns the next step.',
    },
    {
      question: 'Can CallTeam follow up on prospects we already have?',
      answer: 'Yes. We can work an existing prospect list, past inquiries or dormant opportunities. We agree who to call, what we can say and where to record each outcome.',
    },
  ],
};
