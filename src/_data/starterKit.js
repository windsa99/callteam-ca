module.exports = {
  version: '2026-10-25',
  brief: [
    ['Your offer', 'Describe what you sell and the business problem it addresses.'],
    ['Target companies', 'Define the industry, geography, size and operating situation.'],
    ['Buyer roles', 'Name the likely owner and useful referral roles.'],
    ['Reason to call', 'Use confirmed context or a question to test relevance.'],
    ['Approved evidence', 'Record claims, examples and materials the caller can use.'],
    ['Account exclusions', 'List existing customers, active opportunities and other exclusions.'],
    ['Meeting standard', 'Define account fit, role, need and the purpose of the meeting.'],
    ['Sales handoff', 'Name the seller, calendar route and notes they need.'],
    ['Follow-up and stop rules', 'Agree callbacks, next-action ownership and contact preferences.']
  ],
  worksheet: [
    ['Who you are', 'Your name, company and who you represent.'],
    ['Reason for calling', 'One relevant problem or confirmed piece of account context.'],
    ['First question', 'A question the buyer can confirm, correct or answer.'],
    ['Discovery questions', 'Two or three questions about the situation, need and timing.'],
    ['Objection or referral', 'Write the response and when another person or later date fits.'],
    ['Meeting request', 'State what the next conversation would help the buyer assess.'],
    ['Qualification notes', 'What must be established and what remains for deeper discovery.'],
    ['Agreed next action', 'Who does what next, by when, and what you will record.']
  ],
  example: {
    label: 'Fictional ERP campaign',
    buyer: 'CFOs at wholesale distributors',
    offer: 'ERP software connecting finance, stock and operations reporting.',
    hypothesis: 'Reporting may require manual work across separate systems. Ask how the process works before assuming a problem.',
    opening: 'Hi [First Name], [Your Name] with [Company]. We help wholesale distributors bring finance and stock reporting into one system. How are those teams pulling the numbers together today?',
    question: 'Where does that process still need someone to combine or check information manually?',
    objection: 'We already have an ERP.',
    response: 'Understood. Does it give finance the reporting it needs, or is there still work outside the system?',
    meeting: 'Would a focused conversation with our ERP specialist help you assess that reporting workflow?',
    handoff: 'Record the reporting task, existing approach, relevant people and agreed purpose. Leave budget, integrations and buying timeline open until confirmed.',
    rows: [
      ['Target companies', 'Wholesale distributors in an agreed market.', 'Confirm size, systems and account exclusions.'],
      ['Buyer', 'CFO or finance leader responsible for reporting.', 'Ask who owns the workflow.'],
      ['Offer', 'ERP software connecting finance, stock and operations reporting.', 'Use only capabilities your product supports.'],
      ['Reason to investigate', 'Separate systems may create manual reporting work.', 'A hypothesis to check, not a known fact about the account.'],
      ['Opening', 'Hi [First Name], [Your Name] with [Company]. We help wholesale distributors bring finance and stock reporting into one system. How are those teams pulling the numbers together today?', 'Replace placeholders and approve the offer statement.'],
      ['Discovery', 'Where does that process still need someone to combine or check information manually?', 'Listen for a specific workflow and its owner.'],
      ['Existing ERP response', 'Understood. Does it give finance the reporting it needs, or is there still work outside the system?', 'Continue only when the buyer finds the topic relevant.'],
      ['Meeting purpose', 'Assess the reporting workflow with your ERP specialist.', 'Confirm account fit, role and a useful reason to meet.'],
      ['Sales handoff', 'Current process, reporting task, participants and agreed next step.', 'Budget, integrations and buying timeline remain to be confirmed.'],
      ['Follow-up record', 'Keep the same Contact ID, log the call outcome and name the next-action owner.', 'Use a due date for an agreed callback. Stop further outreach when requested.']
    ]
  },
  outcomes: ['No answer', 'Conversation', 'Callback agreed', 'Meeting booked', 'Wrong person', 'Not a fit', 'Do not contact'],
  trackerHeaders: ['Call date', 'Contact ID', 'Company', 'Contact name', 'Role', 'Phone', 'Outcome', 'Next action', 'Due date', 'Owner', 'Notes'],
  paths: [
    { market: 'ERP and finance buyers', title: 'Start with the reporting workflow.', text: 'Use finance and operations language to explore the current system and a relevant discovery conversation.', script: '/resources/cold-call-scripts/erp-modernization-cold-call-script-for-cfos/', guide: '/articles/erp-lead-generation-outbound-sales-playbook/' },
    { market: 'Managed IT services', title: 'Understand the support arrangement.', text: 'Explore the current provider, operating gaps and a useful reason to review the service.', script: '/resources/cold-call-scripts/msp-cold-call-script-managed-it-services/', guide: '/articles/it-services-outbound-sales-playbook/' },
    { market: 'Logistics and operations', title: 'Find the shipment or coverage need.', text: 'Prepare for an operational conversation about overflow, timing and the work a provider could support.', script: '/resources/cold-call-scripts/logistics-overflow-drayage-cold-call-script/', guide: '/articles/logistics-sales-prospecting-playbook/' }
  ],
  faqs: [
    { q: 'What is included in the free B2B cold calling starter kit?', a: 'The download contains an Excel workbook, a PDF quick-start guide and a blank CSV call tracker. The workbook has four sheets: Campaign Brief, Script Worksheet, Call Tracker and Worked Example. The first three are ready for your inputs. The final sheet shows a fictional ERP campaign.' },
    { q: 'Is the kit free, and do I need to provide my email?', a: 'It is free, with no email signup. Download the complete ZIP or choose the workbook, PDF or CSV separately. You complete the files in your own systems.' },
    { q: 'Does the download contain all 100 cold calling scripts?', a: 'The 100 complete scripts remain in CallTeam’s online script library, searchable by buyer, industry and objective. The starter kit provides working documents and selected links so you can prepare a campaign around the script that fits.' },
    { q: 'Can I use the workbook in Google Sheets?', a: 'The workbook is an XLSX file designed for Excel. You can import it into Google Sheets, then check that the outcome dropdowns and summary counts work as expected. The CSV opens as a plain call log without formulas or dropdowns. Use the PDF for the short instructions and example.' },
    { q: 'How should I record repeat calls and callbacks?', a: 'Use one row per call attempt and keep the same Contact ID when you call that person again. Choose an outcome, record the next action and add its due date and owner. The workbook summary counts outcome entries in the 200 prepared rows, rather than unique prospects. Extend the summary ranges if you add more rows.' },
    { q: 'Can the example be used for a different offer?', a: 'Yes. Replace the ERP example with your actual offer, buyers, approved capabilities and qualification standard. The fictional example demonstrates how to complete the fields. Use the industry scripts and playbooks for a closer starting point.' },
    { q: 'Can CallTeam build and run the campaign for us?', a: 'Yes. CallTeam can scope prospect research, list preparation, human calling, follow-up, qualification, appointment setting and sales handoff. Bring your offer, target buyers and current materials to a strategy call so we can agree the work and responsibilities.' }
  ]
};
