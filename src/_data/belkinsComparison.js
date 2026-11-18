const callTeamMonthly = 4000;
const belkinsMonthly = 5000;
const appointmentRate = 750;
const setupFee = 1500;
const starterAppointments = 10;
const comparisonMonths = 3;
const belkinsAgreementMonths = 6;
const starterTotal = setupFee + appointmentRate * starterAppointments;

const dollars = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});
const usDollars = amount => `US${dollars.format(amount)}`;

module.exports = {
  checkedDate: '2026-11-17',
  checkedLabel: '17 November 2026',
  prices: {
    callTeamMonthly: usDollars(callTeamMonthly),
    belkinsMonthly: dollars.format(belkinsMonthly),
    comparisonMonths,
    callTeamThreeMonths: usDollars(callTeamMonthly * comparisonMonths),
    belkinsThreeMonths: dollars.format(belkinsMonthly * comparisonMonths),
    threeMonthDifference: usDollars((belkinsMonthly - callTeamMonthly) * comparisonMonths),
    belkinsAgreementMonths,
    belkinsAgreementTotal: dollars.format(belkinsMonthly * belkinsAgreementMonths),
    appointmentRate: dollars.format(appointmentRate),
    setupFee: dollars.format(setupFee),
    starterAppointments,
    starterTotal: dollars.format(starterTotal),
    starterUnitCost: dollars.format(starterTotal / starterAppointments),
  },
  sources: {
    callTeam: {
      url: 'https://www.callteam.ca/pricing/',
      label: 'CallTeam pricing and campaign scope',
    },
    belkinsManaged: {
      url: 'https://belkins.io/appointment-setting',
      label: 'Belkins appointment-setting pricing and scope',
    },
    belkinsTerms: {
      url: 'https://belkins.io/blog/belkins-vs-callbox',
      label: 'Belkins’ published monthly rate and agreement',
    },
    belkinsPlans: {
      url: 'https://belkins.io/pricing',
      label: 'Belkins plan inclusions and optional add-ons',
    },
    belkinsAppointments: {
      url: 'https://belkins.io/pay-per-appointment',
      label: 'Belkins appointment package pricing and credit rules',
    },
    campaign: {
      url: 'https://www.callteam.ca/case-studies/saas-demo-appointment-setting/',
      label: 'CallTeam SaaS campaign and qualification criteria',
    },
  },
  faqs: [
    {
      question: 'How many appointments does Belkins guarantee on a retainer?',
      answer: 'Belkins advertises 100 guaranteed appointments per year on its appointment-setting page. Ask for the number that applies to your signed term, the criteria for counting an appointment and the remedy if delivery falls short.',
    },
    {
      question: 'When does Belkins return a wrong-fit appointment to your package?',
      answer: 'Flag the meeting in your post-call feedback and share a recording or transcript. Belkins restores the slot if it confirms the meeting fell outside the agreed criteria.',
    },
    {
      question: 'What if Belkins is short of the package total after six months?',
      answer: 'Belkins first works to make up the shortfall. If appointments remain unused, you can get a partial refund for those slots. The setup fee is non-refundable.',
    },
    {
      question: 'Can CallTeam work accounts from our email or LinkedIn campaigns?',
      answer: 'Yes. Send us the accounts or replies you want called. We agree which prospects need a call and when your team should take over.',
    },
    {
      question: 'What happens if someone misses a CallTeam meeting?',
      answer: 'We handle rescheduling and follow-up within the agreed campaign scope. A missed meeting is tracked separately from a held meeting.',
    },
  ],
};
