module.exports = {
  buyers: ['CFO / Finance leader', 'IT leader / CIO', 'Security leader / CISO', 'Operations leader', 'Sales leader', 'HR leader', 'Founder / Owner', 'Marketing leader', 'Procurement leader'],
  examples: [
    {
      id: 'saas',
      label: 'A broad SaaS pitch',
      input: {
        buyer: 'CFO / Finance leader at a SaaS company',
        offer: 'Software that helps finance teams find unused software subscriptions and track renewal dates.',
        script: 'Hi, this is Alex from ExampleCo. We are an innovative, industry-leading software platform with powerful dashboards and integrations. We help businesses save money and improve efficiency. Can I book you in for a demo tomorrow?'
      }
    },
    {
      id: 'strong',
      label: 'A clear, focused opening',
      input: {
        buyer: 'Operations leader at a manufacturer',
        offer: 'Shipment tracking software that helps manufacturers see late deliveries and update customers from one place.',
        script: 'Hi, this is Jordan from ExampleCo. We help manufacturing teams see which customer deliveries are running late without checking each carrier separately. How does your team spot a late delivery before a customer asks about it?'
      }
    },
    {
      id: 'cyber',
      label: 'Technical terms in context',
      input: {
        buyer: 'IT leader / CIO at a manufacturer',
        offer: 'Identity and access management services for manufacturers, including SAML single sign-on and access reviews.',
        script: 'Hi, this is Sam from Example Security. We help manufacturing IT teams manage SAML single sign-on and review access when people change roles. How does your team check whether someone still needs access to production systems?'
      }
    },
    {
      id: 'question',
      label: 'A question without a question mark',
      input: {
        buyer: 'CFO / Finance leader',
        offer: 'Software that helps finance teams see subscription renewal dates and review unused seats.',
        script: 'Hi, this is Alex from ExampleCo. We help finance teams review unused software seats before renewal. How does your team check which subscriptions are still being used'
      }
    },
    {
      id: 'unfamiliar',
      label: 'An unusual specialist offer',
      input: {
        buyer: 'Kiln maintenance lead at a ceramics manufacturer',
        offer: 'Acoustic inspection of ceramic kiln rollers to help maintenance teams identify rollers that need a closer examination.',
        script: 'Hi, this is Morgan from Example Inspection. We inspect ceramic kiln rollers using acoustic measurements. How does your maintenance team decide which rollers need a closer examination before the next shutdown?'
      }
    }
  ],
  editorialExample: {
    opening: 'Hi, this is Alex from ExampleCo. We help finance teams find unused software subscriptions before they renew. How does your team check which subscriptions are still being used?'
  },
  criteria: [
    {title: 'Count what is actually in the draft.', text: 'The checker measures the text you enter, including its word count. Length is a prompt to read the opening aloud and find a natural pause. It is not a quality score.'},
    {title: 'Look for specific wording patterns.', text: 'Checks look for introductions, questions, meeting requests, placeholders, broad phrases and claims that need evidence. A finding quotes the words that triggered it so you can decide whether it applies.'},
    {title: 'Keep the context in your hands.', text: 'A question can be present even without a question mark. Technical terms such as SAML, cybersecurity and ERP are not treated as problems just because they are technical. You confirm whether the wording suits this buyer.'},
    {title: 'Explain possible resource matches.', text: 'Words in your buyer and offer help surface examples from CallTeam’s library. Matching language does not prove that a script fits your business. Read the explanation and choose a resource yourself, or use a general structure.'},
    {title: 'Build a draft you can stand behind.', text: 'Keep your opening, adapt a selected example or start with a general structure. Edit the opening, follow-up question and meeting request. Replace placeholders and confirm every claim before using the draft.'}
  ],
  faqs: [
    {q: 'What does the cold call script checker and builder do?', a: 'It checks your written opening for specific wording patterns and shows the text behind each finding. It also suggests resources to consider from CallTeam’s script library. You choose whether to keep your opening, adapt an example or use a general structure, then edit and save your draft.'},
    {q: 'What should I paste into the checker?', a: 'Paste your introduction, reason for calling, first question and meeting request if you have one. You can enter up to 4,000 characters. Add the buyer’s role and a short explanation of your offer in the separate fields. A sample draft fills in those fields and runs through the same checks as your own text.'},
    {q: 'How does the review work, and what can it miss?', a: 'Fixed text rules run in your browser. They look for wording and structural patterns, then group observations, suggested reviews and points for you to confirm. The tool cannot fully understand every offer, verify factual claims or judge your delivery. Questions can be recognised from their wording without a question mark. Technical vocabulary is not automatically marked as weak.'},
    {q: 'Does a high word count or a flagged phrase mean my opening is bad?', a: 'No. Word count is a measurement, and a phrase flag is a reason to look at the surrounding sentence. Your buyer may need technical detail. A meeting request may be appropriate after an earlier conversation. There is no numerical quality score or predicted booking rate. Keep wording that serves a clear purpose.'},
    {q: 'How are script examples selected for my buyer and offer?', a: 'The checker compares words from your buyer and offer with the topics and roles in CallTeam’s published resources. It explains possible matches. You decide whether an example fits before using it. If your offer is unfamiliar or the suggestions are unsuitable, keep your opening or choose the general structure.'},
    {q: 'Can I keep my own opening and edit the suggested draft?', a: 'Yes. Choose “Keep my opening” to carry your text into the editor. You can edit the opening, follow-up question and meeting request, then copy the review and draft or download a text file. Check names, placeholders, relevance and claims before calling. The editor helps you prepare; it does not assess how a real conversation will go.'},
    {q: 'What happens to the text I enter?', a: 'The checks and draft builder run in your browser. The tool does not submit your buyer, offer, opening or edited draft to CallTeam, and no email address is required. Input and result areas are masked from session replay. Copy or download your work before leaving; it is not saved to an account or automatically attached to a booking.'},
    {q: 'Can CallTeam help run the campaign after I improve the script?', a: 'Yes. CallTeam provides B2B outbound calling and appointment setting, including targeting, conversation planning, qualification and follow-up. Bring your offer, market and draft to a campaign call so we can discuss the buyers you need to reach and how the campaign would run.'}
  ]
};
