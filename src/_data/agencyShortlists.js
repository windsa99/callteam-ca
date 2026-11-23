const sdr = {
  breadcrumb: 'Outsourced SDR companies',
  intro: 'Compare six outsourced SDR companies on staffing, coaching, backup coverage and price. Decide whether to buy a dedicated rep or hire a team to run your B2B calling campaign.',
  quickHeading: 'Start with the work you need',
  tableButton: 'Compare six SDR companies',
  quickChoices: [
    { label: 'Own the calls and follow-up', name: 'CallTeam', anchor: 'callteam', reason: 'runs the campaign with North America–based callers and hands qualified meetings to sales.' },
    { label: 'Put a dedicated rep on the account', name: 'SalesRoads', anchor: 'salesroads', reason: 'assigns a rep and provides coaching and sales operations.' },
    { label: 'Try a rep before hiring internally', name: 'memoryBlue', anchor: 'memoryblue', reason: 'offers an audition-to-hire option. Get the transfer terms in writing.' }
  ],
  buyerSection: ['staffing-and-cost', 'Staffing and costs'],
  tableHeading: 'Compare outsourced SDR companies at a glance',
  tableCaption: 'Team model, public pricing and contract questions for six B2B SDR outsourcing companies.',
  method: 'We compared who does the work, how each company bills and what sales gets after a meeting is booked.',
  columns: ['Best fit', 'Team and channels', 'Published cost', 'Check first'],
  priceNote: 'Prices reflect the published offers. Compare the first invoice, the total fee for your term and the work included.',
  verdictHeading: 'Which SDR outsourcing company fits your team?',
  providers: [
    {
      id: 'callteam', name: 'CallTeam', headline: 'Managed B2B cold calling and appointment setting',
      cells: ['One team for calls, callbacks and qualified meetings', 'Managed outreach with human callers based in North America', 'From US$4,000/month for a campaign-ready scope', 'New list research and added capacity are quoted separately'],
      verdict: 'Hire CallTeam to run your calling campaign from first contact through the sales handoff. We work callbacks, qualify interest and put the buyer’s reason for meeting in your CRM. Use your list or have us build one.',
      checkTitle: 'Agree on the work before launch', check: 'Set the buyer roles, call coverage and rules for booking a meeting. Request a separate price for any new list research or a full-time rep assigned only to you.',
      sources: [['CallTeam pricing', '/pricing/'], ['Outsourced SDR services', '/services/outsourced-sdr/']]
    },
    {
      id: 'salesroads', name: 'SalesRoads', headline: 'Dedicated reps with training and sales operations',
      cells: ['A dedicated SDR with an established support team', 'Dedicated rep with calling, email and call coaching', '$11,950 per four weeks for one SDR', 'Check the first invoice, ramp and notice period'],
      verdict: 'Buy SalesRoads when you have enough accounts to keep a dedicated rep busy and want someone else to coach them. For a short list or one market test, that staffing bill is hard to justify.',
      checkTitle: 'Budget by billing cycle', check: 'The single-rep bill repeats every four weeks. Ask how many cycles you’ll pay for and who takes over callbacks when a rep leaves.',
      sources: [['SalesRoads pricing', 'https://salesroads.com/pricing/'], ['SalesRoads training and coaching', 'https://salesroads.com/about-salesroads/sdr-training-and-coaching/']]
    },
    {
      id: 'memoryblue', name: 'memoryBlue', headline: 'Managed SDRs with a path to an internal hire',
      cells: ['A managed team you may later bring in-house', 'Dedicated SDR teams with phone, email and LinkedIn', 'Quote required. Retainer and performance-based options', 'Confirm transfer fees, meeting charges and capacity'],
      verdict: 'Choose memoryBlue if you want to try an assigned rep before bringing them onto your payroll. Its language coverage also makes it a shortlist option for several markets.',
      checkTitle: 'Price the transfer', check: 'Get the timing and fees for hiring the rep. If you pay by performance, price cancellations and no-shows into the proposal.',
      sources: [['memoryBlue SDR services and pricing models', 'https://memoryblue.com/services/sales/sdr-services/'], ['Televerde vs memoryBlue', '/compare/televerde-vs-memoryblue/']]
    },
    {
      id: 'saleshive', name: 'SalesHive', headline: 'Managed calling with a choice of caller location',
      cells: ['A calling team with data, tools and monthly delivery', 'US- or Philippines-based callers, plus a strategist', 'From $4,500/month in the Philippines or $7,000/month in the US', 'Get the plan, outreach mix and buyer-facing team'],
      verdict: 'Shortlist SalesHive if you want a caller, strategist and data tools in one package. Budget for the higher published starting rate if you need US-based callers.',
      checkTitle: 'Name the callers on the quote', check: 'Confirm where the people calling your buyers are based. Get the assigned hours and the exact plan’s channels in writing.',
      sources: [['SalesHive calling rates', 'https://saleshive.com/cold-calling'], ['SalesHive plan details', 'https://saleshive.com/pricing/']]
    },
    {
      id: 'cience', name: 'CIENCE', headline: 'Regional rep choices with separate team and platform fees',
      cells: ['Multiple SDRs on one managed platform', 'Phone, email and LinkedIn with a campaign team', '$4,249/month with one offshore SDR or $5,999 with one US or European SDR, before extras', 'One-time setup and bonuses for hitting held-meeting targets'],
      verdict: 'Shortlist CIENCE if several reps will share one campaign team and platform. The fixed fees make the single-rep bill considerably higher than the published rep fee.',
      checkTitle: 'Add setup and bonuses', check: 'A $1,750 offshore rep brings the monthly total to $4,249 before setup and bonuses. Get both extra charges in the quote.',
      sources: [['CIENCE pricing and setup', 'https://www.cience.com/pricing/']]
    },
    {
      id: 'televerde', name: 'Televerde', headline: 'Lead generation and nurturing across a longer sale',
      cells: ['Enterprise demand generation and lead nurturing', 'Custom SDR and demand-generation scope', 'Quote required', 'Ask who owns inactive leads and what a handoff includes'],
      verdict: 'Choose Televerde when you need several stages covered, from generating interest to qualifying enterprise accounts. If you already have a ready-to-call list, price the calling scope on its own.',
      checkTitle: 'Name an owner for each stage', check: 'Price demand generation and SDR work separately. Ask who updates your CRM and who calls the buyer when it’s time to revisit.',
      sources: [['Televerde pipeline and revenue growth services', 'https://televerde.com/solutions/pipeline-revenue-growth/']]
    }
  ],
  quoteHeading: 'Five questions to send an outsourced SDR agency',
  quoteIntro: 'Send the same brief to each provider. Ask for one written answer your sales lead and finance team can review together.',
  quoteQuestions: [
    'Who calls our accounts, where are they based and how much of their time is assigned to us?',
    'Who coaches the callers, and who works our callbacks during training, leave or a rep change?',
    'What will we pay in the first 90 days, including setup, data, tools and any fees tied to meetings?',
    'What makes a meeting acceptable, and who handles no-shows, wrong contacts and rescheduling?',
    'Which records, notes and next actions will we receive in our CRM and at the end of the agreement?'
  ],
  related: ['Compare outsourcing with an in-house SDR team', '/articles/outsourced-sdr-vs-in-house-sdr-team/'],
  faqHeading: 'Outsourced SDR buying questions',
  faqs: [
    { question: 'What does an outsourced SDR company do?', answer: 'It handles agreed front-end sales work for you. The service can include prospect research, outbound calls and other outreach, follow-up, qualification, booking and CRM updates. Your salespeople usually take discovery and closing.' },
    { question: 'How much does SDR outsourcing cost?', answer: 'CallTeam starts at US$4,000 a month for a campaign-ready scope. SalesRoads lists $11,950 per four weeks for one dedicated SDR. Check how many cycles you’ll pay for, along with staffing, setup and meeting charges.' },
    { question: 'When is a dedicated SDR worth it?', answer: 'A dedicated rep makes sense when you have a proven offer and enough accounts to fill their week. Decide who trains the rep and covers absences before you hire.' },
    { question: 'Can an SDR agency build our prospect list?', answer: 'Yes. CallTeam can prepare new target accounts or update a list you already have. Confirm which roles and regions the list covers, who pays for the data and what you can keep.' },
    { question: 'What should sales get with an outsourced meeting?', answer: 'Ask for the buyer’s role, the reason they agreed to talk, the problem discussed, timing and any remaining questions. A named owner and callback date protect the follow-up.' },
    { question: 'How can I tell whether the SDR program is working?', answer: 'Review conversations, held meetings your sales team accepts, and opportunities that follow. Read a few notes from rejected meetings to see whether the issue was targeting, the offer or qualification.' }
  ],
  ctaHeading: 'Put a team on the calls and callbacks',
  ctaCopy: 'Tell us who you sell to, what your buyers need to hear and who takes discovery. We’ll spell out the research, calling, handoff and cost for your scope.',
  service: ['See CallTeam’s outsourced SDR service', '/services/outsourced-sdr/']
};

const cybersecurity = {
  breadcrumb: 'Cybersecurity appointment setting companies',
  intro: 'Compare five appointment setting companies for cybersecurity vendors. See who reaches security and IT leaders, what the work costs and what your sales team gets with a booked meeting.',
  quickHeading: 'Pick for your security market',
  tableButton: 'Compare five cybersecurity agencies',
  quickChoices: [
    { label: 'Qualified conversations with IT and operations', name: 'CallTeam', anchor: 'callteam', reason: 'uses live calling to confirm the buyer, the issue and the next step.' },
    { label: 'Specialist security outreach', name: 'The Point Company', anchor: 'the-point-company', reason: 'has published work with Armis, an asset security vendor.' },
    { label: 'Several buyer roles and channels', name: 'Callbox', anchor: 'callbox', reason: 'offers dedicated outreach units that target a defined segment or role.' }
  ],
  buyerSection: ['qualified-meeting', 'Qualified meetings'],
  tableHeading: 'Compare cybersecurity appointment setting companies',
  tableCaption: 'Security buyer fit, outreach models, price visibility and quote checks.',
  method: 'We compared published prices and security case studies. The table identifies who each provider reaches and which results its case study reports.',
  columns: ['Best fit', 'Outreach and proof', 'Published cost', 'Check first'],
  priceNote: 'Prices apply to the stated offer. Compare booked meetings, held meetings and sales opportunities as separate outcomes.',
  verdictHeading: 'Who should hire each cybersecurity appointment setter?',
  providers: [
    {
      id: 'callteam', name: 'CallTeam', headline: 'Human-led calling for a defined security offer',
      cells: ['Security and recovery vendors selling to IT and operations', 'North America–based human callers. Nine qualified appointments in 90 days in a manufacturing campaign', 'From US$4,000/month for a campaign-ready scope', 'Agree on the buyer criteria and price any new list research'],
      verdict: 'Hire CallTeam to get security and IT buyers on the phone and find out what warrants a sales call. We capture who owns the decision, when the buyer will review it and why they agreed to meet.',
      checkTitle: 'Give callers the right questions', check: 'Set the qualification questions together. Your technical team takes detailed discovery and product evaluation once we make the handoff.',
      sources: [['Manufacturing cybersecurity case study', '/case-studies/manufacturing-cybersecurity-appointment-setting/'], ['CallTeam pricing and scope', '/pricing/']]
    },
    {
      id: 'the-point-company', name: 'The Point Company', headline: 'Security-specific outreach and account prioritisation',
      cells: ['Complex security categories with several buyer roles', 'Security SDRs, account research and outreach. Published work with Armis', 'Quote required', 'Ask who will run your accounts and what qualifies a meeting'],
      verdict: 'Shortlist The Point Company if your offer needs separate messages for security operations, risk and executives. Its Armis case is a useful reference for asset security buyers.',
      checkTitle: 'Get proof for your buyer', check: 'Ask for a caller brief and a completed meeting handoff from your product category. Get a quote for the team, territory and minimum term.',
      sources: [['The Point Company’s cybersecurity service', 'https://thepointco.com/cybersecurity-lead-generation/'], ['Armis case study', 'https://thepointco.com/armis/']]
    },
    {
      id: 'memoryblue', name: 'memoryBlue', headline: 'Security SDR coverage for more than one market',
      cells: ['A security vendor adding dedicated SDR capacity', 'Phone, email and LinkedIn. Public case work with Trend Micro', 'Quote required. Retainer and performance options', 'Confirm region, language, training and fee trigger'],
      verdict: 'Choose memoryBlue if you need dedicated reps in several markets. Its Trend Micro case shows how it mapped enterprise accounts and reached senior buyers. Ask for a smaller campaign example if your team sells to mid-market companies.',
      checkTitle: 'Define what earns a fee', check: 'Ask who calls each territory. For performance pricing, have the quote specify what triggers a charge and who handles rebooking.',
      sources: [['Trend Micro case study', 'https://memoryblue.com/resources/case-studies/trend-micro/'], ['memoryBlue SDR service', 'https://memoryblue.com/services/sales/sdr-services/']]
    },
    {
      id: 'callbox', name: 'Callbox', headline: 'Account-based campaigns across roles and channels',
      cells: ['Outreach to security, IT and compliance at named accounts', 'Multichannel programs. A US cybersecurity case reports 58 bookings in three months', '$7,334/month shown for one campaign pod in its estimator', 'Get a firm quote, coverage and held-meeting figures'],
      verdict: 'Choose Callbox if you need to reach several buyer roles at each company across multiple channels. Get a firm quote for the roles and accounts you want covered. Its public price comes from an estimator.',
      checkTitle: 'Look beyond the booking count', check: 'Callbox’s case counts booked appointments. Ask for attendance and sales-accepted meeting totals before you use that result to plan your pipeline.',
      sources: [['Callbox pricing estimator', 'https://www.callboxinc.com/lead-generation-pricing/'], ['US cybersecurity campaign', 'https://www.callboxinc.com/case-studies/abm-accelerates-cybersecurity-sales/']]
    },
    {
      id: 'belkins', name: 'Belkins', headline: 'Email and LinkedIn package for application security outreach',
      cells: ['Written outreach to a defined security audience', 'Email and LinkedIn in its meeting package. Published Whitespots case', 'Retainer starts at $5,000/month. Meeting package starts at $750 each plus $1,500 setup', 'Get a separate quote for calling'],
      verdict: 'Shortlist Belkins for an email and LinkedIn test. Its Whitespots case reports ten booked appointments in a month from email outreach. If you need phone conversations, ask for a calling example and a separate price.',
      checkTitle: 'Confirm the calling price', check: 'The published meeting package covers email and LinkedIn. Ask the retainer team for calling hours, caller location and what it will charge.',
      sources: [['Belkins’ published retainer terms', 'https://belkins.io/blog/belkins-vs-salesroads'], ['Belkins’ appointment package', 'https://belkins.io/pay-per-appointment'], ['Whitespots case study', 'https://belkins.io/case-studies/lead-generation-for-application-security-platform']]
    }
  ],
  quoteHeading: 'Five questions to send a cybersecurity lead generation agency',
  quoteIntro: 'Give each agency one offer, one target industry and one territory. Ask how it would set up the first month of calling or outreach.',
  quoteQuestions: [
    'Which buyer roles would you contact for this offer, and can we see a sample account list?',
    'Who will make the calls or write the outreach, and how will they learn the security problem we solve?',
    'What needs to be true before you book a meeting, and can we see the CRM note your caller would leave?',
    'How will you handle a referral, a contract renewal, a callback request or a no-show?',
    'What does the first 90 days cost, including onboarding, list data, extra territories and fees tied to meetings?'
  ],
  related: ['Use the cybersecurity outbound sales playbook', '/articles/cybersecurity-outbound-sales-playbook/'],
  faqHeading: 'Cybersecurity appointment setting questions',
  faqs: [
    { question: 'Which appointment setting company should a cybersecurity vendor hire?', answer: 'Hire CallTeam for live calls from North America, callbacks and a qualified sales handoff. For a dedicated rep or an email-led program, compare the staffing and channels in the table.' },
    { question: 'How much does cybersecurity appointment setting cost?', answer: 'CallTeam starts at US$4,000 per month for a campaign-ready program. Callbox shows a $7,334 monthly estimate for one campaign pod. Ask about list research, onboarding, billing terms and how the provider handles no-shows.' },
    { question: 'Can a cold caller reach a CISO or security director?', answer: 'Yes. The right first contact depends on the product and company size. A security operations director, infrastructure lead or plant manager may know the issue and introduce the right person for discovery.' },
    { question: 'What makes a cybersecurity meeting qualified?', answer: 'The company fits your target market and the buyer can influence a decision. They have a security or recovery need and have agreed to discuss it with sales.' },
    { question: 'What do we do if a prospect already has a security provider?', answer: 'Ask who owns the current service and when they next review it. Log the date, the reason to call again and any limit the buyer gives you on follow-up.' },
    { question: 'Can CallTeam help with the prospect list?', answer: 'Yes. We can start with your accounts or scope fresh research. We agree on which organisations and roles fit, then use the approved list for calls and callbacks.' }
  ],
  ctaHeading: 'Talk through your first cybersecurity campaign',
  ctaCopy: 'Bring one security offer and the type of company you want to reach. We’ll show who we would call, what we would ask and how a qualified meeting would reach your sales team.',
  service: ['See CallTeam’s cybersecurity lead generation service', '/services/cybersecurity-lead-generation/']
};

module.exports = { sdr, cybersecurity };
