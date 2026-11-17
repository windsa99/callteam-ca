const callTeamMonthly = 4000;
const belkinsMonthly = 5000;
const appointmentRate = 750;
const setupFee = 1500;
const starterAppointments = 10;
const starterTotal = setupFee + appointmentRate * starterAppointments;

const dollars = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

module.exports = {
  checkedDate: '2026-11-17',
  checkedLabel: '17 November 2026',
  prices: {
    callTeamMonthly: `US${dollars.format(callTeamMonthly)}`,
    belkinsMonthly: dollars.format(belkinsMonthly),
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
    belkinsRate: {
      url: 'https://belkins.io/blog/belkins-vs-callbox',
      label: 'Belkins’ published managed starting rate and agreement',
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
      question: 'When does Belkins return a wrong-fit appointment to your package?',
      answer: 'Flag it in your post-call feedback and share a recording, audio or transcript. Belkins reviews it and restores the slot if it confirms the meeting fell outside the criteria you agreed on.',
    },
    {
      question: 'What if Belkins is short of the package total after six months?',
      answer: 'Belkins says it first works to make up the shortfall. If that fails, you can get a partial refund for unused appointments. The setup fee is non-refundable.',
    },
    {
      question: 'Can CallTeam work accounts from our email or LinkedIn campaigns?',
      answer: 'Yes. Give us the accounts or replies you want called. We agree who to contact, when to follow up and where to log each outcome.',
    },
    {
      question: 'What happens if someone misses a CallTeam meeting?',
      answer: 'We handle rescheduling and follow-up within the agreed campaign scope. A missed meeting is tracked separately from a held meeting.',
    },
  ],
};
