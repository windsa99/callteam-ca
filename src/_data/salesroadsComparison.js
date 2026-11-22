const salesroadsFourWeekRate = 11950;
const fourWeekPeriods = 52 / 4;
const salesroadsYear = salesroadsFourWeekRate * fourWeekPeriods;

const dollars = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

module.exports = {
  checkedDate: '2026-11-21',
  checkedLabel: 'November 21, 2026',
  callTeamMonthly: `US${dollars.format(4000)}`,
  salesroadsFourWeekRate: dollars.format(salesroadsFourWeekRate),
  salesroadsYear: dollars.format(salesroadsYear),
  salesroadsMonthlyEquivalent: dollars.format(salesroadsYear / 12),
  fourWeekPeriods,
  sources: {
    salesroadsPricing: {
      url: 'https://salesroads.com/pricing/',
      label: 'SalesRoads dedicated SDR pricing, inclusions and terms',
    },
    salesroadsMethodology: {
      url: 'https://salesroads.com/methodology/',
      label: 'SalesRoads calling, email and LinkedIn use',
    },
    callTeamPricing: {
      url: 'https://www.callteam.ca/pricing/',
      label: 'CallTeam pricing, list building and campaign scope',
    },
    callTeamAppointments: {
      url: 'https://www.callteam.ca/services/b2b-appointment-setting/',
      label: 'CallTeam qualification, follow-up and meeting handoff',
    },
    campaign: {
      url: 'https://www.callteam.ca/case-studies/manufacturing-cybersecurity-appointment-setting/',
      label: 'CallTeam manufacturing cybersecurity campaign',
    },
  },
  faqs: [
    {
      question: 'What do we need to start with CallTeam?',
      answer: 'Bring an established offer, your target market and a salesperson who can take meetings. We agree on the buyer roles, what qualifies a meeting and how we will use your CRM and calendar.',
    },
    {
      question: 'Does SalesRoads require a long-term commitment?',
      answer: 'SalesRoads advertises cancellation at any time and recommends allowing 12 weeks to see the program in action. Ask what notice applies to your quote.',
    },
    {
      question: 'Can CallTeam work prospects who went quiet?',
      answer: 'Yes. Give us the previous contact history. We can prioritize buyers by fit and timing, reopen the conversation where there is a reason, and record the next step.',
    },
  ],
};
