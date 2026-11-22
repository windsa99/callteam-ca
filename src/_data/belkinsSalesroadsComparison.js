const billings = {
  belkinsMonthly: 5000,
  belkinsAppointment: 750,
  belkinsSetup: 1500,
  packageMeetings: 10,
  salesroadsFourWeeks: 11950,
  salesroadsTwoReps: 16750,
  callteamMonthly: 4000,
};
const dollars = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const amount = value => '$' + dollars.format(value);
const packageTotal = billings.belkinsAppointment * billings.packageMeetings + billings.belkinsSetup;
const salesroadsAnnual = billings.salesroadsFourWeeks * 13;

module.exports = {
  checkedDate: '2026-11-21',
  checkedLabel: 'November 21, 2026',
  prices: {
    ...Object.fromEntries(Object.entries(billings).filter(([key]) => key !== 'packageMeetings').map(([key, value]) => [key, amount(value)])),
    packageMeetings: billings.packageMeetings,
    packageTotal: amount(packageTotal),
    packageUnit: amount(packageTotal / billings.packageMeetings),
    belkinsThree: amount(billings.belkinsMonthly * 3),
    belkinsSix: amount(billings.belkinsMonthly * 6),
    salesroadsThree: amount(billings.salesroadsFourWeeks * 3),
    salesroadsAnnual: amount(salesroadsAnnual),
    salesroadsMonthEquivalent: amount(salesroadsAnnual / 12),
    callteamThree: amount(billings.callteamMonthly * 3),
  },
  sources: {
    belkinsRetainer: { url: 'https://belkins.io/blog/belkins-vs-salesroads', label: 'Belkins’ published retainer starting rate and term' },
    belkinsPlans: { url: 'https://belkins.io/pricing', label: 'Belkins managed plans and channel coverage' },
    belkinsPackage: { url: 'https://belkins.io/pay-per-appointment', label: 'Belkins package pricing, exclusions and credit rules' },
    salesroadsPricing: { url: 'https://salesroads.com/pricing/', label: 'SalesRoads four-week rates and team inclusions' },
    salesroadsMethod: { url: 'https://salesroads.com/methodology/', label: 'SalesRoads outreach channels and methodology' },
    callteamPricing: { url: 'https://www.callteam.ca/pricing/', label: 'CallTeam pricing and campaign scope' },
    callteamCase: { url: 'https://www.callteam.ca/case-studies/saas-demo-appointment-setting/', label: 'CallTeam SaaS campaign results' },
  },
  faqs: [
    {
      q: 'Does the Belkins appointment package include cold calling?',
      a: 'The package uses email and LinkedIn. Belkins sells calling through its managed services. Ask which calling tier is priced in the proposal.',
    },
    {
      q: 'Do Belkins no-shows count against the package?',
      a: 'Belkins says a no-show keeps its slot and can be rebooked. If you dispute fit, the slot is restored after Belkins confirms that the meeting fell outside the agreed criteria.',
    },
    {
      q: 'Does SalesRoads use LinkedIn to book meetings?',
      a: 'SalesRoads uses LinkedIn to research and verify prospects. Calls and email are its published outreach channels.',
    },
    {
      q: 'Can I cancel SalesRoads after one billing period?',
      a: 'SalesRoads advertises cancellation at any time. Ask when notice is due and which invoice will be your last.',
    },
    {
      q: 'Can CallTeam build the list as well as make the calls?',
      a: 'Yes. We can build a prospect list or work accounts you already have. A proposal spells out the research, data, calling and follow-up included in your campaign.',
    },
  ],
};
