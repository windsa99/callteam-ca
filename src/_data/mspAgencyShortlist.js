const callTeamMonthly = 4000;
const sampleMeetingRate = 800;
const formatUsd = amount => 'US$' + amount.toLocaleString('en-US');
const callTeamStartingPrice = formatUsd(callTeamMonthly);

module.exports = {
  checkedDate: '2026-11-23',
  checkedLabel: 'November 23, 2026',
  callTeamStartingPrice,
  sampleMeetingRate: formatUsd(sampleMeetingRate),
  priceExamples: [4, 5, 6].map(count => ({
    count,
    monthly: callTeamStartingPrice,
    perMeetingTotal: formatUsd(sampleMeetingRate * count),
  })),
  providers: [
    {
      id: 'callteam',
      name: 'CallTeam',
      headline: 'Best for human-led MSP cold calling and renewal follow-up',
      channels: 'North America–based human callers, live voicemails, approved voicemail drops and callbacks.',
      price: 'From ' + callTeamStartingPrice + '/month',
      term: 'Most programs start with three months. List research and data can add to the quote.',
      meeting: 'Qualify to your criteria. Meeting confirmation and no-show recovery are in scope.',
      verdict: 'Hire CallTeam when you want a calling team to work named accounts and follow up around contract reviews. We track future callbacks separately from booked meetings so sales knows which buyers are ready to talk.',
      checkTitle: 'Keep the first campaign focused',
      check: 'Start with one support offer and a service area you can cover. Agree which accounts to call, what counts as a qualified appointment and where future callbacks go in your CRM.',
      sources: [
        ['CallTeam MSP lead generation services', '/services/msp-lead-generation/'],
        ['CallTeam human-led appointment setting', '/human-led-appointment-setting/'],
        ['CallTeam pricing and meeting protection', '/pricing/'],
      ],
    },
    {
      id: 'managed-sales-pros',
      name: 'Managed Sales Pros',
      headline: 'Best for a dedicated IT calling specialist',
      channels: 'Outbound calls for MSPs and technology companies.',
      price: 'Monthly quote',
      term: 'The sales page lists a 120-day initial commitment.',
      meeting: 'Sets qualified appointments. Confirm the acceptance and rebooking rules in the quote.',
      verdict: 'Shortlist Managed Sales Pros if you want a phone specialist familiar with the MSP market. Buy enough calling time to work your territory and revisit accounts as their review dates approach.',
      checkTitle: 'Price the calling hours',
      check: 'Get the weekly calling hours, the list scope and when cancellation notice can begin. Pass if the proposal leaves you guessing how many accounts the team can follow up with.',
      sources: [
        ['Managed Sales Pros calling offer and initial term', 'https://www.managedsalespros.com/msp-sales-appointments-managed-sales-pros/'],
      ],
    },
    {
      id: 'levante-leads',
      name: 'Levante Leads',
      headline: 'Best for paying per qualified meeting held',
      channels: 'Cold email and reply handling for US MSPs.',
      price: 'Per held meeting, quoted',
      term: 'No monthly retainer. Duration and exit terms are set in writing.',
      meeting: 'Bills when an agreed decision-maker attends and the account fits. Missed or off-criteria meetings carry no fee.',
      verdict: 'Choose Levante if email suits your market and you want charges tied to qualified meetings that happen. It publishes a clear standard for what counts and follows up to rebook prospect no-shows.',
      checkTitle: 'Check your territory before pricing',
      check: 'Levante says it works with one MSP per service area. Confirm availability, the rate per meeting and who keeps the prospect list and sending accounts when the agreement ends.',
      sources: [
        ['Levante MSP appointment setting and billing rules', 'https://www.levanteleads.com/outbound-appointment-setting-for-msps'],
        ['Levante pricing, territories and contract terms', 'https://www.levanteleads.com/'],
      ],
    },
    {
      id: 'callbox',
      name: 'Callbox',
      headline: 'Best for a larger, multichannel IT campaign',
      channels: 'Phone, email and LinkedIn, with multilingual coverage available.',
      price: '$7,334/month estimate for one pod',
      term: 'Its FAQ says most programs have a six-month minimum.',
      meeting: 'Confirm who rebooks missed meetings and how Callbox handles a buyer who misses the agreed criteria.',
      verdict: 'Shortlist Callbox if you need coordinated outreach across several channels or a wider market. Its estimator prices a campaign team for a specific buyer group. Extra teams can raise the budget.',
      checkTitle: 'Get a quote for the market you serve',
      check: 'For one local territory, get the total cost for one buyer group first. Ask which languages, contacts and follow-up work the quote includes and what would require another team.',
      sources: [
        ['Callbox campaign team estimator', 'https://www.callboxinc.com/lead-generation-pricing/'],
        ['Callbox minimum contract length', 'https://www.callboxinc.com/faqs/minimum-contract-length/'],
        ['Callbox managed IT lead generation', 'https://www.callboxinc.com/industries-we-serve/it-managed-services-lead-generation/'],
      ],
    },
    {
      id: 'marketopia',
      name: 'Marketopia',
      headline: 'Best for buying MSP marketing and outbound together',
      channels: 'Telemarketing and appointment setting, with broader marketing services available.',
      price: 'BDR packages from $2,999/month',
      term: 'BDR terms show a standard 12-month rate, six months at +12% and three months at +25%.',
      meeting: 'Its separate fixed package advertises two held appointments a month. Ask how a shortfall is handled.',
      verdict: 'Consider Marketopia if your MSP needs a team for both marketing and outbound. Its fixed appointment package and business development rep (BDR) packages have different deliverables.',
      checkTitle: 'Compare the actual package',
      check: 'Ask which team location and hours the BDR price buys. If you only need calling, price that work on its own and confirm the rate for the term you plan to sign.',
      sources: [
        ['Marketopia MSP packages, staffing and term premiums', 'https://www.marketopia.com/msp/'],
        ['Marketopia telemarketing and marketing services', 'https://www.marketopia.com/services/'],
      ],
    },
  ],
  handoff: [
    ['Account fit', '65 users at two Edmonton sites. Both sites are inside the MSP’s service area.'],
    ['Buyer', 'Operations director leads the review. Finance signs the agreement.'],
    ['Current IT support', 'Existing provider handles day-to-day IT. The buyer wants better after-hours escalation.'],
    ['Review window', 'Buyer says the contract renews in October 2027. The review starts in August.'],
    ['Agreed next step', 'Call on August 12 to confirm what support needs to change and who should join discovery.'],
  ],
  quoteQuestions: [
    'Which territory, company size and IT support needs will you include?',
    'Who makes the calls, and what must they confirm before a meeting is accepted?',
    'What do we pay for the full term, including data, setup, tools and any short-term premium?',
    'When is a meeting billable, and who handles no-shows or meetings that miss our criteria?',
    'Who owns renewal callbacks, CRM notes and the contact list if the campaign ends?',
  ],
  faqs: [
    {
      question: 'What does an MSP lead generation company do?',
      answer: 'It finds businesses that fit your managed IT offer and approaches the people who make IT decisions. The agreement defines whether you get contact records, booked appointments or qualified meetings that take place.',
    },
    {
      question: 'How much does MSP lead generation cost?',
      answer: 'Published offers here include CallTeam’s managed calling from ' + callTeamStartingPrice + ' per month and Marketopia BDR packages from $2,999 per month. See the term, caller coverage and list costs before comparing prices.',
    },
    {
      question: 'What counts as a qualified MSP appointment?',
      answer: 'The account fits your support area and size, the attendee has a role in the IT decision, and there is a clear reason for a discovery call. Add any requirements for user count, service type and buyer timing to the agreement.',
    },
    {
      question: 'Can an MSP pay only for meetings that take place?',
      answer: 'Yes. Levante Leads quotes a rate for a held meeting with a qualified buyer. Check how the provider confirms attendance and resolves a dispute before it invoices you.',
    },
    {
      question: 'When should you contact a prospect who already has an MSP?',
      answer: 'Ask when the company reviews its IT support. Follow up at the time the buyer agrees to, and record that date in your CRM. A buyer with an immediate support gap may be ready for discovery sooner.',
    },
    {
      question: 'When should an MSP hire a dedicated calling team?',
      answer: 'Use a calling team when you want to reach specific accounts, learn about their current support and follow up through a review window. Give the team a clear service offer and the criteria your technical seller uses to accept meetings.',
    },
  ],
};
