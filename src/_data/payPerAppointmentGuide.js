const setupFee = 1000;
const meetingRate = 500;
const acceptedMeetings = 6;
const formatDollars = value => `US$${Math.round(value).toLocaleString('en-US')}`;

module.exports = {
  checkedDate: '2026-11-23',
  checkedLabel: 'November 23, 2026',
  providers: [
    {
      id: 'belkins',
      name: 'Belkins',
      headline: 'An email and LinkedIn package for a broad B2B market',
      billing: 'Held meetings that meet the agreed criteria.',
      price: 'From $750 per appointment',
      fees: '$1,500 setup. Ten appointments minimum. $9,000 at the published floor.',
      noShow: 'The slot stays in your package. Belkins tries to rebook it.',
      fit: 'Buy Belkins if you have a large market for email and LinkedIn outreach. Skip this package if you need someone to cold call buyers or manage follow-up in your CRM.',
      checkTitle: 'Refund terms',
      check: 'If delivery falls short at six months, Belkins tries to fill the remaining slots first. Unused appointments may qualify for a partial refund. The setup fee is nonrefundable.',
      sources: [['Belkins package, fees and shortfall terms', 'https://belkins.io/pay-per-appointment']]
    },
    {
      id: 'vib',
      name: 'ViB',
      headline: 'Opt-in appointments with B2B technology buyers',
      billing: 'A meeting held with a buyer who fits the agreed criteria.',
      price: 'From $1,400 per meeting',
      fees: 'Meeting volume is quoted. Setup fee and minimum order are unpublished.',
      noShow: 'Prospect no-shows aren’t billed.',
      fit: 'Use ViB if you sell B2B technology and want buyers who ask to meet. Pass if ViB can’t show that its network reaches your target accounts.',
      checkTitle: 'Pilot cost',
      check: 'Get a firm price for your target roles and meeting count. Ask what evidence ViB needs to review a meeting that misses your criteria.',
      sources: [
        ['ViB pricing', 'https://vib.tech/pricing/'],
        ['ViB Appointments', 'https://vib.tech/solutions/appointments/'],
        ['ViB billing and attendance rules', 'https://vib.tech/resources/appointments-resources/marketing-blogs/dp-sales-qualified-lead-vs-opportunity/']
      ]
    },
    {
      id: 'vivin',
      name: 'Vivin Sales',
      headline: 'Attended appointments with a written buyer profile',
      billing: 'An attended appointment that meets the agreed buyer criteria.',
      price: 'US$100–$500 per attended appointment',
      fees: 'No setup fee. Check the quote for minimums and a possible monthly infrastructure fee.',
      noShow: 'No-shows aren’t billed. Eligible wrong-fit meetings are replaced.',
      fit: 'Shortlist Vivin for an attended-meeting pilot with a clear buyer profile. Get the full monthly cost in writing before budgeting from the published range.',
      checkTitle: 'Dispute deadline',
      check: 'Vivin gives you five business days from delivery to dispute a mismatch. Have sales check the buyer’s fit as each meeting comes in.',
      sources: [
        ['Vivin pricing', 'https://vivinsales.ca/pricing/'],
        ['Vivin appointment setting service', 'https://vivinsales.ca/appointment-setting-services/'],
        ['Vivin standard terms', 'https://vivinsales.ca/lead-agreement/']
      ]
    },
    {
      id: 'zen',
      name: 'Zen Advertise',
      headline: 'A prepaid package for ad-generated inquiries',
      billing: 'You prepay for a set number of qualified appointments.',
      price: 'Quote by industry and service area',
      fees: 'One appointment available as a test. Separate setup fee unpublished.',
      noShow: 'Zen tries to reschedule first, then replaces the appointment at no extra cost.',
      fit: 'Test one appointment if ads can bring in the buyers you want. Skip the package if you need a team to call through a named account list.',
      checkTitle: 'Prepayment',
      check: 'Zen confirms targeting after payment. Before buying a larger package, get the buyer criteria, delivery deadline and total cost in writing.',
      sources: [
        ['Zen package and replacement terms', 'https://zenadvertise.com/pay-per-appointment'],
        ['Zen B2B appointment setting offer', 'https://zenadvertise.com/b2b-appointment-setting-services']
      ]
    }
  ],
  invoiceSetup: formatDollars(setupFee),
  invoiceRate: formatDollars(meetingRate),
  invoiceRows: [
    { trigger: 'Booked meetings', count: 10 },
    { trigger: 'Held meetings', count: 8 },
    { trigger: 'Sales-accepted meetings', count: acceptedMeetings }
  ].map(row => {
    const total = setupFee + meetingRate * row.count;
    return { ...row, total: formatDollars(total), perAccepted: formatDollars(total / acceptedMeetings) };
  }),
  quoteQuestions: [
    'When do we pay for a meeting, and what makes it qualified?',
    'What do setup, tools, data and the minimum purchase cost in total?',
    'What happens if the buyer cancels, misses the meeting or fails our criteria?',
    'Who reviews a disputed meeting, what proof do they need and when is it due?',
    'When do unused appointments expire, and when can we get a refund?'
  ],
  faqs: [
    { question: 'How does pay-per-appointment lead generation work?', answer: 'You buy meetings that meet the terms in your agreement. Providers can invoice after each meeting or sell a set of appointments up front. Check both when you pay and when the provider counts an appointment as delivered.' },
    { question: 'How much do B2B pay-per-appointment companies charge?', answer: 'Vivin publishes US$100–$500 per attended meeting, and ViB starts at $1,400. Belkins’ starter package works out to $900 per meeting after setup at its published starting rate.' },
    { question: 'Do you pay for no-shows?', answer: 'Under a held-meeting agreement, the buyer must attend to trigger the meeting fee. For a prepaid package, confirm when a missed meeting returns to your balance and how long the provider has to replace it.' },
    { question: 'Is pay per lead the same as pay per appointment?', answer: 'Pay per lead gets your team a prospect to follow up with. Pay per appointment gets a meeting on the calendar under the agreed terms.' },
    { question: 'Can you buy B2B appointments without a setup fee?', answer: 'Yes. Vivin posts no setup fee for its appointment program. Ask for the first invoice and check for monthly infrastructure charges and minimum spend.' },
    { question: 'When should I choose a monthly appointment setting retainer?', answer: 'Choose a retainer when you need a team to work the same accounts over time. Put callbacks, qualification, reporting and CRM handoff in the scope.' }
  ]
};
