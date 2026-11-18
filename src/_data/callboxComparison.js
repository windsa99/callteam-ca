const callTeamMonthly = 4000;
const callboxPerPod = 7334;
const dollars = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

function formatUsd(amount) {
  return `US${dollars.format(amount)}`;
}

module.exports = {
  checkedDate: '2026-11-17',
  checkedLabel: '17 November 2026',
  callTeamMonthly: formatUsd(callTeamMonthly),
  callboxPerPod,
  callboxMonthly: formatUsd(callboxPerPod),
  startingPriceGap: formatUsd(callboxPerPod - callTeamMonthly),
  twoPods: formatUsd(callboxPerPod * 2),
  podEstimates: [1, 2, 3].map(count => ({
    label: count === 1 ? '1 pod' : `${count} pods`,
    total: formatUsd(callboxPerPod * count),
  })),
  sources: {
    callboxPricing: {
      url: 'https://www.callboxinc.com/lead-generation-pricing/',
      label: 'Callbox pod estimator and service scope',
    },
    callboxFaq: {
      url: 'https://www.callboxinc.com/faqs/lead-pricing/',
      label: 'Callbox starting fee and quote factors',
    },
    callboxAppointments: {
      url: 'https://www.callboxinc.com/appointment-setting-lead-generation/',
      label: 'Callbox qualification and appointment setting',
    },
    callTeamPricing: {
      url: 'https://www.callteam.ca/pricing/',
      label: 'CallTeam pricing and campaign scope',
    },
    gong: {
      url: 'https://www.gong.io/blog/the-hidden-power-of-cold-calling-insights-from-300m-calls',
      label: 'Gong Labs research on calling and email replies',
    },
    campaign: {
      url: 'https://www.callteam.ca/case-studies/financial-services-appointment-setting/',
      label: 'CallTeam financial services campaign',
    },
  },
  faqs: [
    {
      question: 'Do you need a Callbox pod for each target market?',
      answer: 'Callbox describes each pod as a team for a market segment or buyer group. Ask which audiences the quoted pod can cover and what change would require another one.',
    },
    {
      question: 'Can Callbox work with our CRM?',
      answer: 'Callbox advertises its own Pipeline CRM and CRM integration capabilities. Ask which fields, meeting notes and follow-up tasks it will record in your system.',
    },
    {
      question: 'Can CallTeam follow up with trade show contacts?',
      answer: 'Yes. We agree which contacts to call and use the conversation or event context to find a reason for follow-up. Bring the contact list and any notes from the event.',
    },
  ],
};
