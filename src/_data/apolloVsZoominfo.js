const money = value => new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value);
const plans = [
  { id: 'basic', name: 'Apollo Basic', monthly: 65, annualRate: 49, minimumSeats: 1, creditsMonthly: 2500, creditsAnnual: 30000 },
  { id: 'professional', name: 'Apollo Professional', monthly: 99, annualRate: 79, minimumSeats: 1, creditsMonthly: 4000, creditsAnnual: 48000 },
  { id: 'organization', name: 'Apollo Organization', monthly: null, annualRate: 119, minimumSeats: 3, creditsMonthly: null, creditsAnnual: 72000 }
].map(p => ({ ...p, annualTotal: p.annualRate * 12, annualDisplay: money(p.annualRate * 12), creditsAnnualDisplay: money(p.creditsAnnual), creditsMonthlyDisplay: p.creditsMonthly ? money(p.creditsMonthly) : null, costs: [1, 3, 5].map(seats => ({ seats, value: seats < p.minimumSeats ? null : seats * p.annualRate * 12, display: seats < p.minimumSeats ? '3-seat minimum' : '$' + money(seats * p.annualRate * 12) })) }));
module.exports = {
  reviewed: 'November 9, 2026', reviewedIso: '2026-11-09', plans,
  quickAnswer: 'Put Apollo first if you need contacts and outreach in one system. ZoomInfo needs to justify its quote with useful account research or better coverage of your buyers. If your current provider already does the job at a fair price, keep it.',
  comparison: [
    ['Best reason to consider it', 'Finding prospects and running email and phone outreach in one place.', 'Researching buying committees and connecting account data across teams.'],
    ['Price visibility', 'Apollo publishes monthly and annual plans, with extra charges for more credits and advanced calling.', 'ZoomInfo requires a quote and publishes no standard sales-platform price.'],
    ['Phone data', 'Provides contact and company numbers, with charges that depend on the number type and action.', 'Offers mobiles and direct dials; check its coverage of your target accounts.'],
    ['Data in your CRM', 'Supports CSV exports and CRM connections; export charges depend on your plan or older account setup.', 'Get the export allowance and integration fees included in your quote.'],
    ['Main buying risk', 'Treating the credit allowance as the number of people you can call.', 'Paying for a broad package when your team mainly needs a contact list.']
  ],
  situations: [
    { title: 'You are starting with one to five sellers.', choice: 'Test Apollo first.', text: 'You can price the seats and try the data and outreach together. Move up a plan only for a feature or allowance your team needs.' },
    { title: 'Your CRM and dialer already work.', choice: 'Buy the useful data.', text: 'Check which missing target contacts each provider can supply and what it costs to move those records into your current setup.' },
    { title: 'You sell into complex accounts.', choice: 'Give ZoomInfo a proper look.', text: 'Organisation charts and account signals can help a team work a buying committee. A five-person team selling large contracts may use these features more than a fifty-person team selling a simple offer.' },
    { title: 'Your target market is hard to cover.', choice: 'Let the sample decide.', text: 'Compare the same roles, industries and territories to see whether the extra cost gets you buyers you would otherwise miss.' },
    { title: 'You are facing a renewal.', choice: 'Review what the team used.', text: 'Remove unused seats and features before accepting a higher bill. If you plan to switch, include the time and cost of moving your data.' }
  ],
  resource: 'APOLLO VS ZOOMINFO: FIVE QUESTIONS FOR THE QUOTE\n\n1. What is the full amount payable over the contract term, including setup and required add-ons? Please state the currency and payment schedule.\n\n2. How many users are included, and which data, outreach and CRM features can they use?\n\n3. What phone access, exports and enrichment are included? Are credits shared, when do they expire, and what happens with wrong numbers or repeat exports?\n\n4. What will extra credits, users, integrations and calling cost? Please itemise each charge.\n\n5. When does the agreement renew, what price can change, and what date and process apply if we cancel or reduce it?',
  faqs: [
    { q: 'Is Apollo better than ZoomInfo for cold calling?', a: 'Apollo is our first shortlist for a team that wants contact data and outreach together at a published price. ZoomInfo can earn its place through better coverage of your buyers or useful account research. Compare current numbers for the same target contacts before choosing.' },
    { q: 'Is Apollo cheaper than ZoomInfo?', a: 'Apollo Basic starts at $49 per user per month with annual billing. ZoomInfo requires a quote, so the exact price difference depends on the package. Compare the full term, users, data allowance and software you still need.' },
    { q: 'How much does ZoomInfo cost for a small team?', a: 'ZoomInfo does not publish a standard sales-platform price for one, three or five users. Request an itemised quote for your team and expected usage. Its 2026 pricing includes platform-fee and prepaid-credit arrangements alongside seat-based packages.' },
    { q: 'Which has more accurate phone numbers?', a: 'Use our linked 25-contact test to compare the same buyers in both. Count correct numbers, missing details, wrong people and outdated jobs, keeping unanswered calls separate.' },
    { q: 'Do Apollo and ZoomInfo credits buy the same thing?', a: 'No. Apollo charges for actions such as revealing a phone number. ZoomInfo’s pricing FAQ describes credits for exported contact or company records. Compare the cost of taking a contact all the way into your calling list.' },
    { q: 'Can Apollo replace ZoomInfo?', a: 'Yes, when it supplies the contacts, exports, CRM connection and outreach features your team needs. Before switching, check any account research or enrichment your team relies on and move ownership, notes, callbacks and stop requests with the records.' },
    { q: 'Should we pay for both Apollo and ZoomInfo?', a: 'A second provider is worth paying for when it adds useful contacts or features. Check the overlap first so you avoid spending your outreach budget on duplicate records.' },
    { q: 'Can CallTeam call leads from Apollo or ZoomInfo?', a: 'Yes. Bring your target market, offer and calling list. CallTeam can prepare the records, make the calls, handle follow-up and book qualified meetings. Book a free 30-minute call to discuss the campaign.' }
  ]
};
