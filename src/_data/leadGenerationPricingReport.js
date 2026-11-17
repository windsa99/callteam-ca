const checkedDate = '2026-11-17';
const checkedLabel = 'November 17, 2026';

const callTeamMonthly = 4000;
const belkinsSetup = 1500;
const belkinsPerAppointment = 750;
const belkinsStarterAppointments = 10;
const callboxMonthly = 7334;
const cienceTeam = 2000;
const ciencePlatform = 499;
const cienceOffshoreRep = 1750;
const cienceLocalRep = 3500;
const ebqHalfTime = 5000;
const salesRoadsRates = [11950, 16750, 23500, 30150, 36700, 43150];

const money = amount => '$' + amount.toLocaleString('en-US');
const monthly = amount => money(amount) + '/month';
const cienceBase = rep => cienceTeam + ciencePlatform + rep;

const costs = {
  callTeamMonthly: 'US' + monthly(callTeamMonthly),
  callboxDifference: 'US' + money(callboxMonthly - callTeamMonthly),
  belkinsStarter: money(belkinsSetup + belkinsPerAppointment * belkinsStarterAppointments),
  cienceOffshoreBase: monthly(cienceBase(cienceOffshoreRep)),
  cienceLocalBase: monthly(cienceBase(cienceLocalRep)),
  ebqHalfTimeYear: money(ebqHalfTime * 12),
  ebqFullTimeYear: money(10000 * 12),
  salesRoadsYear: money(salesRoadsRates[0] * 13),
  salesRoadsMonthlyEquivalent: money(Math.round(salesRoadsRates[0] * 13 / 12)),
};

const providers = [
  {
    id: 'callteam-pricing',
    name: 'CallTeam',
    rate: 'From ' + costs.callTeamMonthly,
    terms: 'Price applies when your offer, target accounts, CRM and calendar are ready.',
    scope: 'Managed human calling, callbacks, qualification, booking and CRM handoff.',
    strength: 'We record the buyer’s role, reason for meeting and agreed next step in your CRM.',
    tradeoff: 'New lists, licensed data and extra markets change the quote.',
    verdict: 'Hire CallTeam when you have target accounts and want one team to own calls, qualification and follow-up.',
    sources: [
      ['Public pricing and inclusions', 'https://www.callteam.ca/pricing/'],
    ],
    offers: [
      ['Managed B2B calling', costs.callTeamMonthly, 'Starting rate', 'Monthly rate for a campaign ready to launch.', 'Quote prospect research, licensed data, additional markets or more capacity.', 0],
    ],
  },
  {
    id: 'belkins-pricing',
    name: 'Belkins',
    rate: 'Managed from $5,000/month. Pay per appointment from $750.',
    terms: 'At the starting rate, 10 appointments total ' + costs.belkinsStarter + ' including $1,500 setup.',
    scope: 'Managed outreach or an email and LinkedIn appointment package.',
    strength: 'Missed appointments stay available to rebook. Belkins restores a slot once it confirms the meeting fell outside the agreed criteria.',
    tradeoff: 'Cold calling and CRM management sit outside the appointment package.',
    verdict: 'Buy the appointment package if email and LinkedIn fit your market. Get a managed quote if you need calling.',
    sources: [
      ['Managed starting price and term', 'https://belkins.io/blog/belkins-vs-callbox'],
      ['Pay-per-appointment package and credit rules', 'https://belkins.io/pay-per-appointment'],
      ['Managed appointment-setting packages', 'https://belkins.io/pricing'],
    ],
    offers: [
      ['Managed appointment setting', 'From $5,000/month', 'Starting rate', 'Six-month agreement with a three-month checkpoint per Belkins.', 'Ask what the checkpoint permits and get the price for channels in scope.', 0],
      ['Pay per appointment', 'From $750 per appointment', 'Starting rate', 'Packages start at 10 with a six-month delivery window.', 'Email and LinkedIn outreach.', 1],
      ['Pay-per-appointment setup', money(belkinsSetup) + ' one time', 'Published fee', 'Setup fee is non-refundable.', 'Unused appointments may qualify for a partial refund after Belkins tries to make up the shortfall.', 1],
    ],
  },
  {
    id: 'callbox-pricing',
    name: 'Callbox',
    rate: 'From US' + monthly(callboxMonthly),
    terms: 'Same figure in the one-pod estimator. Exact rate and term depend on scope.',
    scope: 'A multichannel pod for a market segment or buyer group.',
    strength: 'A pod includes an SDR, support staff, research and weekly reporting. Callbox supports multilingual outreach.',
    tradeoff: 'Language, team size and coverage affect the quote. Get the price for each pod and ask what it logs in your CRM.',
    verdict: 'Choose Callbox when you need outreach across several markets or languages.',
    sources: [
      ['Published USD starting fee', 'https://www.callboxinc.com/faqs/lead-pricing/'],
      ['Pod calculator and included work', 'https://www.callboxinc.com/lead-generation-pricing/'],
    ],
    offers: [
      ['One campaign pod', 'From US' + monthly(callboxMonthly), 'Starting rate', 'Monthly subscription.', 'A pod serves one market segment or buyer group.', 0],
    ],
  },
  {
    id: 'salesroads-pricing',
    name: 'SalesRoads',
    rate: money(salesRoadsRates[0]) + ' every four weeks for one rep',
    terms: 'About ' + costs.salesRoadsMonthlyEquivalent + ' per calendar month at the same rate over a year. Advertises cancellation at any time.',
    scope: 'Dedicated SDR capacity with prospect research and coaching.',
    strength: 'Dedicated reps get call reviews and coaching. The list rate per rep falls as the team grows.',
    tradeoff: 'Price services such as inbound appointment setting separately. Confirm the billing start date.',
    verdict: 'Buy dedicated capacity when you can keep it busy. Skip a larger team when you still need to prove the market will respond.',
    sources: [
      ['Four-week rates and cancellation', 'https://salesroads.com/pricing/'],
      ['Scope and separately quoted services', 'https://salesroads.com/outsourcing/how-much-does-salesroads-sales-outsourcing-actually-cost/'],
    ],
    offers: salesRoadsRates.map((rate, index) => [
      index === 0 ? 'One dedicated SDR' : (index + 1) + ' dedicated SDRs',
      money(rate) + ' per four weeks',
      'Published rate',
      '',
      index === 0 ? 'Every tier price is the total for the whole team.' : '',
      0,
    ]),
  },
  {
    id: 'cience-pricing',
    name: 'CIENCE',
    rate: 'One rep from ' + costs.cienceOffshoreBase,
    terms: 'Add the one-time setup fee and any bonus tied to held meetings.',
    scope: 'Campaign management, a platform and reps charged separately.',
    strength: 'The published rates let you see how the bill changes as you add reps.',
    tradeoff: 'CIENCE charges for setup and leaves the amount to the quote.',
    verdict: 'Choose CIENCE to scale a managed SDR team. Get the full bill at your held-meeting target before signing.',
    sources: [['Team, platform, SDR and bonus prices', 'https://www.cience.com/pricing/']],
    offers: [
      ['Campaign team', monthly(cienceTeam), 'Published fee', 'Flat fee for the account.', 'Campaign management and monitoring.', 0],
      ['graph8 platform', monthly(ciencePlatform), 'Published fee', 'Flat fee for the account.', '75,000 credits per month listed.', 0],
      ['Offshore SDR', 'From ' + monthly(cienceOffshoreRep) + ' per rep', 'Starting rate', 'Add team and platform fees.', 'One offshore rep comes to ' + costs.cienceOffshoreBase + ' before setup and bonuses.', 0],
      ['US or European SDR', 'From ' + monthly(cienceLocalRep) + ' per rep', 'Starting rate', '', 'With the team and platform, one rep comes to ' + costs.cienceLocalBase + ' before setup and bonuses.', 0],
      ['Campaign setup', 'Amount requires a quote', 'Unpriced fee', 'One-time charge.', 'Ask for the amount before kickoff.', 0],
      ['Held-meeting performance bonus', 'Variable per SDR', 'Published formula', 'Bonus begins at 60% of a rep’s target.', 'From 60% to 99%, base × share of target × 0.35. From 100%, base × share of target × 0.7. Confirm the base and target in the proposal.', 0],
    ],
  },
  {
    id: 'ebq-pricing',
    name: 'EBQ',
    rate: monthly(ebqHalfTime) + ' half-time. $10,000/month full-time.',
    terms: 'Both public rates assume an annual commitment. Half-time totals ' + costs.ebqHalfTimeYear + ' over 12 months.',
    scope: 'US-based staffing for outbound or inbound lead follow-up.',
    strength: 'EBQ can call prospects or qualify leads your marketing brings in.',
    tradeoff: 'Find out what it costs to reduce coverage mid-contract.',
    verdict: 'Choose EBQ when you need US-based staffing for a year. Ask for pilot terms for a shorter test.',
    sources: [
      ['Staffing rates and annual terms', 'https://ebq.com/ebq-pricing/'],
      ['Appointment-setting work', 'https://ebq.com/appointment-setting-services/'],
    ],
    offers: [
      ['Half-time employee', monthly(ebqHalfTime), 'Published annual-term rate', 'Annual commitment. ' + costs.ebqHalfTimeYear + ' over 12 months.', 'Includes management and access to EBQ’s tools.', 0],
      ['Full-time employee', '$10,000/month', 'Published annual-term rate', 'Annual commitment. ' + costs.ebqFullTimeYear + ' over 12 months.', 'Price additional positions separately.', 0],
    ],
  },
  {
    id: 'levelup-leads-pricing',
    name: 'LevelUp Leads',
    rate: 'Cold calling from $5,000/month',
    terms: 'Confirm the rate for your tier, the initial term and which roles are assigned.',
    scope: 'Fractional or full-service outbound, with channel scope by plan.',
    strength: 'You can start with fractional support and add coverage as the campaign grows.',
    tradeoff: 'Ask how many rep hours the starting price buys and who handles callbacks.',
    verdict: 'Choose fractional coverage for a limited launch. Upgrade when you need more rep time or channels.',
    sources: [
      ['Cold calling starting rate', 'https://levelupleads.io/cold-calling-services/'],
      ['Fractional and full-service packages', 'https://levelupleads.io/packages/'],
    ],
    offers: [
      ['Managed cold calling', 'From $5,000/month', 'Starting rate', 'Get the price for the specific package and the minimum term.', 'Require time allocation and follow-up ownership in the proposal.', 0],
    ],
  },
  {
    id: 'cleverly-pricing',
    name: 'Cleverly',
    rate: '$3,995/month for its listed calling package',
    terms: 'Email and LinkedIn have their own prices.',
    scope: 'Individual channel packages, including phone outreach with an SDR.',
    strength: 'The calling package assigns an SDR and a manager. You can buy one channel at a time.',
    tradeoff: 'The listed volume measures calls. Check who handles reschedules and what the team records before handing off a meeting.',
    verdict: 'Shortlist Cleverly when you need phone volume. Review a sample handoff before signing.',
    sources: [['Published calling, email and LinkedIn packages', 'https://www.cleverly.co/b2b-lead-gen']],
    offers: [
      ['Cold calling', '$3,995/month', 'Published rate', '5,000+ calls per month listed.', 'Dedicated SDR and SDR manager. Confirm term and meeting rules.', 0],
      ['Cold email outreach', '$1,995/month', 'Published rate', 'Separate channel package.', 'Ask for a combined price if you want both email and calling.', 0],
      ['LinkedIn outreach', '$397/month', 'Published rate', 'Separate channel package.', 'Get the exact scope and pricing for your outreach plan.', 0],
    ],
  },
  {
    id: 'saleshive-pricing',
    name: 'SalesHive',
    rate: 'Cold calling from $4,500/month Philippines or $7,000/month US',
    terms: 'Zero setup fee. Monthly cancellation runs through the next billing month. Annual plans commit for 12 months.',
    scope: 'Dedicated SDR team with phone-only or phone and email plans.',
    strength: 'One fee covers the rep, strategist, platform and prospect data. You choose the caller’s location.',
    tradeoff: 'The main pricing page gives custom quotes for each managed tier. Put your rate and notice deadline in writing.',
    verdict: 'Choose SalesHive if you want a dedicated caller and supplied prospect data in one package.',
    sources: [
      ['Calling prices by location', 'https://saleshive.com/cold-calling'],
      ['Custom quotes, setup and cancellation', 'https://saleshive.com/pricing'],
    ],
    offers: [
      ['Managed cold calling, Philippines-based', 'From $4,500/month', 'Starting rate', 'Service page advertises monthly billing.', 'Exact quote depends on location, channels and activity.', 0],
      ['Managed cold calling, US-based', 'From $7,000/month', 'Starting rate', 'Service page advertises monthly billing.', 'Managed calling packages span $4,500–$12,000/month according to the service page.', 0],
      ['Starter, Growth or Crush', 'Quote required', 'Custom quote', 'Annual plans carry a 12-month commitment. Monthly billing runs through the next billing month after written notice.', 'Zero setup fee. Billing starts after you approve launch.', 1],
    ],
  },
  {
    id: 'memoryblue-pricing',
    name: 'memoryBlue',
    rate: 'Quote required',
    terms: 'Fixed fee, performance-based or hybrid. Its comparison page says roughly two weeks of onboarding are unbilled.',
    scope: 'Dedicated SDRs in North America, EMEA or APAC.',
    strength: 'Dedicated reps use phone, email and LinkedIn and have an assigned manager.',
    tradeoff: 'The SDR service runs through the booked meeting. Price work after the meeting separately.',
    verdict: 'Shortlist memoryBlue for coverage across regions. Confirm what triggers any performance fee.',
    sources: [
      ['Dedicated SDR teams and service scope', 'https://memoryblue.com/services/sales/sdr-services/'],
      ['Pricing models and onboarding terms', 'https://memoryblue.com/blog/memoryblue-vs-salesroads/'],
    ],
    offers: [
      ['Dedicated outsourced SDR service', 'Quote required', 'Custom quote', 'Fixed, performance-based and hybrid models.', 'Confirm headcount, term, result fees and work after the meeting.', 1],
    ],
  },
];

const faqs = [
  { question: 'How much does outsourced B2B lead generation cost in 2027?', answer: 'CallTeam’s managed calling starts at US$4,000 per month for a campaign-ready buyer. Other agencies charge by the rep, the pod or the appointment.' },
  { question: 'What fees should I check before signing with a lead generation agency?', answer: 'Ask for setup, data, software, rep fees and any charge tied to results. Get the first bill date, the minimum term and the cost to leave in writing.' },
  { question: 'Does pay per appointment include no-shows?', answer: 'The contract sets the rule. Belkins says a no-show leaves the appointment in your package. Ask any supplier how long you have to flag a missed or wrong-fit meeting.' },
  { question: 'How do I compare a four-week bill with a monthly retainer?', answer: 'Use the same time period. A four-week rate occurs 13 times in 52 weeks. A calendar-month rate normally occurs 12 times over a year.' },
  { question: 'What should sales get before a qualified meeting?', answer: 'The rep needs the buyer’s role, the issue they raised, their timing, who agreed to attend and what they expect to discuss. Ask to see a completed example.' },
  { question: 'Can CallTeam call leads from my LinkedIn or email campaign?', answer: 'Yes. We can work the accounts you already have, make live calls and add the next step to the agreed CRM workflow. We define which replies or accounts to call before launch.' },
];

module.exports = { checkedDate, checkedLabel, providers, costs, faqs };
