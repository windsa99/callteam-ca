const appointmentSetting = (description) => ({
  title: "B2B Appointment Setting",
  description,
  href: "https://www.callteam.ca/services/b2b-appointment-setting/",
});

const outsourcedSdr = (description) => ({
  title: "Outsourced SDR Services",
  description,
  href: "https://www.callteam.ca/services/outsourced-sdr/",
});

const aiGtm = (description) => ({
  title: "AI GTM Services",
  description,
  href: "https://www.callteam.ca/services/ai-gtm/",
});

const waveSevenResources = [
  {
    id: "CT-R036",
    slug: "ai-customer-support-software-cold-call-script",
    title: "AI Customer Support Software Cold Call Script",
    seoTitle: "AI Customer Support Software Cold Call Script",
    metaDescription: "Use this free AI customer support software cold call script to reach CX and support leaders, qualify service pressure and book a workflow demo.",
    publishedDate: "2026-08-23",
    category: "Customer Experience Technology",
    industry: "B2B software, ecommerce, financial services, healthcare and service organizations",
    subindustry: "AI support assistants, agent assistance, knowledge retrieval and case automation",
    serviceCategory: "AI customer support software",
    icp: "Organizations with growing support volume, several service channels, material knowledge complexity or a need to improve response without removing human escalation.",
    companySize: "Growth-stage companies through enterprise customer-service operations",
    geography: "Global",
    buyers: ["Chief Customer Officer", "VP Customer Experience", "Head of Customer Support", "Contact Centre Director", "Chief Operating Officer", "Chief Information Officer", "Customer Service Operations Director"],
    buyerLevel: "Customer experience, support, operations and technology buyer",
    objective: "Book an AI support-workflow discovery and demonstration",
    scenario: "The buyer is curious about AI but may have a weak chatbot experience, a mature helpdesk, strict customer-experience standards or concern about unsafe automation.",
    triggers: ["Ticket-volume growth", "Support hiring", "Queue or response-time pressure", "New service channel", "Chatbot replacement", "International expansion", "Knowledge-base initiative"],
    archetype: "Service-volume and escalation diagnostic",
    primaryKeyword: "AI customer service cold call script",
    secondaryKeywords: ["AI customer support software sales script", "customer service AI prospecting script", "support automation cold call", "AI helpdesk appointment setting"],
    filters: ["Technology", "Operations"],
    copyLabel: "Copy this script",
    opening: "Hi [First Name], [Your Name] with [Company]. I am calling because support teams are being asked to handle more conversations without making customers feel trapped inside automation. Where is the pressure highest for your team today: repetitive tickets, agent search time, inconsistent answers or response queues?",
    questions: [
      "Which channels and ticket types create the most avoidable work for agents?",
      "What should AI handle, what should it assist with and what must stay with a person?",
      "Which helpdesk, knowledge, CRM and identity systems would the workflow need to respect?",
      "What customer, agent and operating measures would determine whether a controlled pilot is useful?",
    ],
    bridge: "We help service teams examine one support workflow before discussing broad automation. The working session maps ticket type, knowledge sources, escalation rules, system boundaries and the evidence required for a responsible pilot. It is designed to support agents and customers, not force every interaction into a bot.",
    cta: "Would a short workflow session around one high-volume support category be useful to see whether a focused demonstration is worth scheduling?",
    fullScript: `Hi [First Name], [Your Name] with [Company]. I am calling because support teams are being asked to handle more conversations without making customers feel trapped inside automation. Where is the pressure highest for your team today: repetitive tickets, agent search time, inconsistent answers or response queues?

If relevant:
• Which channels and ticket types create the most avoidable work for agents?
• What should AI handle, what should it assist with and what must stay with a person?
• Which helpdesk, knowledge, CRM and identity systems would the workflow need to respect?
• What customer, agent and operating measures would determine whether a controlled pilot is useful?

Bridge: We help service teams examine one support workflow before discussing broad automation. The working session maps ticket type, knowledge sources, escalation rules, system boundaries and the evidence required for a responsible pilot. It is designed to support agents and customers, not force every interaction into a bot.

CTA: Would a short workflow session around one high-volume support category be useful to see whether a focused demonstration is worth scheduling?`,
    objections: [
      { objection: "We already tried a chatbot.", response: "That history is useful. What failed: answer quality, customer adoption, escalation, integration or the range of requests it was expected to handle? A new evaluation should start with that lesson, not another generic bot demo." },
      { objection: "We will not replace our agents.", response: "Agreed. The purpose can be reducing repetitive work, improving knowledge access or routing cases while keeping people accountable for sensitive and complex conversations." },
      { objection: "Our helpdesk already has AI features.", response: "Then replacement may not be justified. Is the current capability solving the target workflow, or are configuration, knowledge quality, adoption and system fit still limiting the result?" },
      { objection: "We cannot risk incorrect answers.", response: "That belongs at the centre of discovery. The team should define approved sources, permissions, confidence rules, review, escalation and the cases AI is not allowed to complete before a pilot." },
    ],
    whyItWorks: "The script opens with the buyer's service pressure instead of announcing AI. It separates assistance from autonomous resolution, respects the existing support stack and turns the next step into a controlled workflow evaluation.",
    whyBreakdown: [
      { label: "It leads with customer reality", text: "Queues, repetitive cases, search time and inconsistent answers are easier to evaluate than a broad AI promise." },
      { label: "It protects human escalation", text: "The buyer defines what stays with an agent before automation scope is discussed." },
      { label: "It qualifies the operating environment", text: "Knowledge, helpdesk, CRM, identity and governance requirements enter the conversation early." },
      { label: "It creates a measurable pilot", text: "One ticket category gives the team a practical place to test customer, agent and operating outcomes." },
    ],
    personalization: [
      "Use verified support hiring, service-channel, product-growth or customer-experience signals without claiming the company has a service failure.",
      "Name the existing helpdesk or service channel only when the information is public and current.",
      "For CX leaders, focus on customer effort and escalation. For support operations, focus on workflow and agent capacity. For CIOs, focus on systems and governance.",
      "Remove any autonomy, accuracy, integration or performance claim the seller cannot support with approved evidence.",
    ],
    alternatives: [
      { label: "Short version", description: "Use when a support executive gives you a few seconds.", script: "Hi [First Name], [Your Name] with [Company]. Across repetitive tickets, agent search time and response queues, where is support capacity under the most pressure today?" },
      { label: "Voicemail", description: "Leave a human-safe reason for the call.", script: "Hi [First Name], this is [Your Name] with [Company]. I am reaching out about AI-assisted customer support, agent workflows and human escalation. I will send a short note as well. My number is [Phone Number]." },
      { label: "CIO opener", description: "Use when architecture and control are likely to lead.", script: "Hi [First Name], [Your Name] with [Company]. When support teams evaluate AI, how is your organization deciding which knowledge, systems and customer interactions it can safely use?" },
    ],
    signalRadar: {
      heading: "Find support organizations with a real workflow decision",
      summary: "The CallTeam Buyer Signal Radar looks for observable changes in service volume, channels, staffing and technology. It helps distinguish a current support initiative from a broad list of companies that merely operate a customer-service team.",
      signals: [
        { label: "Service demand", text: "Product growth, international expansion and new customer segments can increase volume or knowledge complexity." },
        { label: "Team capacity", text: "Support hiring, workforce redesign and operating-efficiency programs can reveal where leaders are reviewing agent workload." },
        { label: "Experience change", text: "New service channels, self-service initiatives and customer-experience leadership can create a defined evaluation window." },
        { label: "Technology window", text: "Helpdesk changes, chatbot replacement and knowledge projects can show that systems, content or governance are under review." },
      ],
      activation: "CallTeam AI GTM organizes the support signal, account fit, service environment and buyer map before outreach. A trained caller verifies the situation, qualifies the workflow and books a meeting only when the customer, agent and technical questions justify a next step.",
    },
    campaignPlan: {
      listFocus: "Organizations with meaningful support volume, identifiable CX or service ownership, several channels or knowledge sources and a visible service or technology signal.",
      callAround: "Ticket growth, support hiring, channel expansion, a helpdesk or chatbot review, a knowledge initiative or a new customer-experience leader.",
      meetingReady: "The buyer can identify a target workflow, current tools, customer or agent problem, human-escalation requirement, evaluation measure and relevant stakeholders.",
      handoff: "Capture channels, ticket categories, volumes where available, current helpdesk, knowledge sources, CRM, identity, escalation path, customer risk, agent role, measures, decision team and agreed demonstration scope.",
    },
    faqs: [
      { question: "Who should an AI customer support software cold call target?", answer: "Start with the leader accountable for customer service outcomes or support operations. Customer-experience, contact-centre, operations and technology executives may all matter when the decision affects workflow, data and escalation." },
      { question: "What should an AI customer service cold call lead with?", answer: "Lead with a specific support workflow or pressure condition such as repetitive cases, search time, response queues or inconsistent answers. Do not lead with a claim that AI should replace the service team." },
      { question: "How is this different from an AI voice-agent call script?", answer: "This page focuses on customer-support software across tickets, chat, email, knowledge and agent assistance. The AI voice-agent script focuses on inbound and outbound phone workflows." },
      { question: "What qualifies an AI support demonstration?", answer: "Confirm one target case, current systems, approved knowledge, escalation rules, affected users, evaluation measures and the people who can assess customer, operating and technical fit." },
      { question: "How should a caller handle accuracy concerns?", answer: "Treat them as a qualification requirement. Ask about approved sources, permissions, testing, confidence thresholds, human review and the situations the system must escalate or refuse." },
    ],
    aboutCallTeam: {
      heading: "About CallTeam and global AI customer-service lead generation",
      paragraphs: [
        "CallTeam is a global B2B lead generation, human cold-calling and appointment-booking company for complex technology and service offers. We build the target account strategy, map decision-makers, prepare the talk track, make the calls and qualify the opportunity before the handoff. For customer-experience vendors, that means booked meetings straight into your calendar with qualified buyers who can describe the support workflow, current environment and reason for evaluating change, rather than a calendar filled with unqualified AI curiosity.",
        "Our outbound experience spans technology and SaaS, AI software, cybersecurity, healthcare, financial services, manufacturing, logistics, workforce platforms, professional services and other global B2B sectors. AI customer-support campaigns require more than a list of service leaders. CallTeam separates phone automation from ticket and knowledge workflows, respects existing helpdesk investments, qualifies human escalation and keeps product claims inside approved evidence. This gives customer, support, operations and technology buyers a practical reason to continue the conversation.",
        "CallTeam AI GTM and the CallTeam Buyer Signal Radar provide the research and prioritization layer for this campaign. They organize support hiring, channel changes, product growth, helpdesk reviews and leadership signals, then prepare account context for human review. CallTeam is also building a free resource centre designed to exceed 100 cold-call scripts, industry playbooks, objection guides and B2B sales articles for founders, revenue leaders, SDR teams and working callers. The intelligence improves preparation, while experienced people remain responsible for every conversation, qualification decision and meeting booked.",
      ],
      points: ["CX, support, operations and technology buyer mapping", "Service-volume and technology signal research", "Human-safe AI messaging and escalation qualification", "Global calling with complete meeting context"],
    },
    related: ["ai-voice-agent-cold-call-script", "itsm-software-cold-call-script", "frontline-workforce-software-cold-call-script"],
    relevantServices: [appointmentSetting("Reach customer-experience and support buyers around a defined service workflow."), outsourcedSdr("Add research, live calling, qualification and AI-software demo handoff."), aiGtm("Prioritize accounts showing service-volume, channel, staffing and helpdesk signals." )],
  },
  {
    id: "CT-R037",
    slug: "compliance-training-software-cold-call-script",
    title: "Compliance Training Software Cold Call Script for Regulated Workforces",
    seoTitle: "Compliance Training Software Cold Call Script",
    metaDescription: "Use this free compliance training software cold call script to reach compliance and quality leaders, qualify training evidence needs and book a demo.",
    publishedDate: "2026-08-23",
    category: "Compliance Training Technology",
    industry: "Healthcare, life sciences, financial services, manufacturing and regulated operations",
    subindustry: "Role-based compliance training, qualification records and audit evidence",
    serviceCategory: "Compliance training and workforce-qualification software",
    icp: "Regulated organizations with role-specific training, recurring certification, several sites or teams and a need to prove qualification status reliably.",
    companySize: "Mid-market regulated employers through global enterprises",
    geography: "Global, with jurisdiction-specific requirements",
    buyers: ["Chief Compliance Officer", "VP Quality", "Learning and Development Director", "Training Manager", "Operations Director", "Quality Systems Director", "Chief Human Resources Officer"],
    buyerLevel: "Compliance, quality, learning, HR and operations buyer",
    objective: "Book a compliance-training workflow demonstration",
    scenario: "The buyer may already have an LMS and will reject any claim that software alone guarantees compliance, audit readiness or workforce qualification.",
    triggers: ["Audit preparation", "Certification expiry", "New site", "Policy change", "Training backlog", "Quality event", "Regulated workforce expansion"],
    archetype: "Qualification-evidence and workflow diagnostic",
    primaryKeyword: "compliance training software cold call script",
    secondaryKeywords: ["compliance training sales script", "regulated workforce software cold call", "LMS compliance prospecting script", "training software appointment setting"],
    filters: ["Technology", "Operations"],
    copyLabel: "Copy this script",
    opening: "Hi [First Name], [Your Name] with [Company]. I am calling because regulated employers often deliver the training but still struggle to show who is current, which role requires what and where evidence lives when someone asks for it. How does your team manage that today?",
    questions: [
      "Which employees, contractors, sites or roles are hardest to keep current?",
      "How are assignments, expiries, policy versions and qualification evidence managed now?",
      "Where does the current LMS or training process stop meeting the compliance or quality need?",
      "Who would evaluate content, workflow, records, integrations and operating adoption together?",
    ],
    bridge: "We help regulated teams examine the training and evidence workflow around a defined workforce or requirement. A first demonstration can map role assignment, renewal, version control, exceptions and reporting without suggesting that a platform replaces accountable compliance or quality decisions.",
    cta: "Would a short workflow review around one regulated role, site or training requirement be useful before deciding whether a demonstration belongs on the calendar?",
    fullScript: `Hi [First Name], [Your Name] with [Company]. I am calling because regulated employers often deliver the training but still struggle to show who is current, which role requires what and where evidence lives when someone asks for it. How does your team manage that today?

If relevant:
• Which employees, contractors, sites or roles are hardest to keep current?
• How are assignments, expiries, policy versions and qualification evidence managed now?
• Where does the current LMS or training process stop meeting the compliance or quality need?
• Who would evaluate content, workflow, records, integrations and operating adoption together?

Bridge: We help regulated teams examine the training and evidence workflow around a defined workforce or requirement. A first demonstration can map role assignment, renewal, version control, exceptions and reporting without suggesting that a platform replaces accountable compliance or quality decisions.

CTA: Would a short workflow review around one regulated role, site or training requirement be useful before deciding whether a demonstration belongs on the calendar?`,
    objections: [
      { objection: "We already have an LMS.", response: "That may be the right system. The useful question is whether role assignment, renewal, qualification evidence and exceptions are handled inside it or through separate manual work." },
      { objection: "Our compliance training is current.", response: "Good. Then this is only relevant if proving currency, managing policy versions or coordinating several sites still creates work. Is the evidence process as controlled as the delivery process?" },
      { objection: "Software cannot guarantee compliance.", response: "Agreed, and we would not claim that. The platform can support assignment, records and workflow, while accountable people interpret requirements and make compliance decisions." },
      { objection: "Quality owns this, not HR.", response: "That distinction matters. Who in Quality owns qualification evidence, and which HR, Learning or Operations partners would need to be involved in an evaluation?" },
    ],
    whyItWorks: "The script distinguishes training delivery from qualification evidence. It respects existing LMS investments, avoids unsupported compliance promises and identifies the cross-functional owners required for a credible software evaluation.",
    whyBreakdown: [
      { label: "It starts with proof, not fear", text: "Currency, role requirements and evidence are practical questions without implying an audit failure." },
      { label: "It respects the current LMS", text: "The caller investigates the remaining workflow before suggesting another platform." },
      { label: "It maps accountable ownership", text: "Compliance, Quality, Learning, HR and Operations may control different parts of the process." },
      { label: "It scopes the demonstration", text: "One role, site or requirement creates a useful evaluation boundary." },
    ],
    personalization: [
      "Use verified audit preparation, site expansion, policy, certification, hiring or quality-system signals without alleging noncompliance.",
      "Adapt terminology to the jurisdiction and regulated activity instead of treating every training requirement as interchangeable.",
      "For Quality, focus on qualification and evidence. For Compliance, focus on obligation and oversight. For Operations, focus on workforce readiness and exceptions.",
      "Never state that the software guarantees compliance, passes an audit or satisfies a requirement without qualified review and approved evidence.",
    ],
    alternatives: [
      { label: "Short version", description: "Use when a compliance leader is pressed for time.", script: "Hi [First Name], [Your Name] with [Company]. Across role assignments, expiries and qualification records, where is it hardest to prove that the regulated workforce is current?" },
      { label: "Voicemail", description: "Leave an evidence-led message.", script: "Hi [First Name], this is [Your Name] with [Company]. I am reaching out about compliance training, workforce qualification and audit evidence workflows. I will send a short note as well. My number is [Phone Number]." },
      { label: "Quality leader opener", description: "Use when qualification records are central.", script: "Hi [First Name], [Your Name] with [Company]. When a role, process or policy changes, how does Quality confirm the right people are trained and the qualification evidence is current?" },
    ],
    signalRadar: {
      heading: "Prioritize regulated employers with an active training need",
      summary: "The CallTeam Buyer Signal Radar looks for events that can change training scope, qualification status or evidence requirements. The campaign uses those events as research prompts, not as proof that the employer has failed a requirement.",
      signals: [
        { label: "Requirement change", text: "Policy updates, new regulations and certification changes can alter assignments, content and evidence." },
        { label: "Workforce change", text: "Hiring, contractor growth, new roles and expansion can increase training volume and exception work." },
        { label: "Operating change", text: "New sites, products, equipment and processes can create distinct qualification and version-control needs." },
        { label: "Review window", text: "Audit preparation, quality events and new compliance or Quality leadership can trigger a workflow assessment." },
      ],
      activation: "CallTeam AI GTM organizes the regulated-industry context, verified trigger, workforce profile and stakeholder map. Human callers test whether the event created a real training or evidence problem and qualify the meeting without making a legal, regulatory or audit conclusion.",
    },
    campaignPlan: {
      listFocus: "Regulated employers with formal compliance or Quality ownership, recurring workforce qualification and enough organizational complexity to create assignment or evidence work.",
      callAround: "An audit-preparation window, certification change, new site, regulated hiring program, policy update, quality event or training-technology review.",
      meetingReady: "The prospect can name the workforce or requirement, current system, assignment or evidence gap, affected teams, review trigger and evaluation stakeholders.",
      handoff: "Capture jurisdiction, workforce, roles, training types, recurrence, current LMS, evidence sources, policy versions, exceptions, integrations, reporting, accountable owners, decision team and meeting purpose.",
    },
    faqs: [
      { question: "Who should a compliance training software cold call target?", answer: "Target the owner of the regulated training or qualification workflow. That may be Compliance, Quality, Learning and Development, HR or Operations depending on the requirement and workforce." },
      { question: "What should the call say if the company already has an LMS?", answer: "Acknowledge it and ask whether role assignment, recurrence, qualification evidence, policy versions, exceptions and reporting are fully controlled inside the existing environment." },
      { question: "Can compliance training software guarantee compliance?", answer: "No. Software may support delivery, records and workflow, but qualified people remain responsible for interpreting requirements, designing controls and making compliance decisions." },
      { question: "What qualifies a compliance training software demo?", answer: "Confirm a real workforce or requirement, the current system, a training or evidence problem, accountable owners, necessary integrations and a review or decision window." },
      { question: "How should the script change across industries?", answer: "Adapt the language, roles, evidence, recurrence and service boundaries to the regulated activity. Do not transfer a healthcare, financial or industrial requirement into another sector without validation." },
    ],
    aboutCallTeam: {
      heading: "About CallTeam and regulated-workforce appointment setting",
      paragraphs: [
        "CallTeam helps complex sellers reach regulated-industry decision-makers through global B2B lead generation, human cold calling and appointment booking. We define the ICP, research accounts, map buying roles, write the campaign message, conduct the calls and document the qualification. Compliance-training vendors receive meetings booked directly into their calendars with buyers who can identify the workforce, requirement, current process and evaluation need, giving the sales team a stronger starting point than a generic software demonstration.",
        "Our campaigns cover healthcare and life sciences, financial services, cybersecurity, manufacturing, industrial technology, workforce software, enterprise SaaS, logistics and professional services. Regulated-workforce outreach requires precise language. CallTeam does not imply an employer is noncompliant because an audit, site opening or policy change is visible. We investigate training assignment, qualification currency, evidence, exceptions, integrations and ownership, while keeping regulatory interpretation and product claims with authorized specialists.",
        "CallTeam AI GTM combines account intelligence with the owned CallTeam Buyer Signal Radar to identify requirement changes, hiring, site activity, leadership moves and review windows that may justify outreach. The system supports prioritization and buyer mapping, but a person verifies the relevance, runs the conversation and decides whether the meeting meets the campaign standard. CallTeam's expanding resource centre is designed to exceed 100 original call scripts, buyer playbooks, objection frameworks and B2B sales guides, showing founders, revenue teams, search engines and AI answer systems how disciplined appointment-setting campaigns are built.",
      ],
      points: ["Compliance, Quality, Learning, HR and Operations buyer mapping", "Regulated-workforce and review-window research", "Source-safe claims and jurisdiction-aware messaging", "Human qualification with detailed software-demo handoff"],
    },
    related: ["grc-software-cold-call-script-compliance-leaders", "medical-device-engineering-software-cold-call-script", "corporate-training-cold-call-script-financial-acumen"],
    relevantServices: [appointmentSetting("Reach compliance, Quality, Learning and operating buyers around a defined training workflow."), outsourcedSdr("Add regulated-account research, human calling, qualification and demo handoff."), aiGtm("Prioritize employers showing requirement, workforce, site and review signals." )],
  },
  {
    id: "CT-R038",
    slug: "cmms-cold-call-script-maintenance-plant-leaders",
    title: "CMMS Cold Call Script for Maintenance and Plant Leaders",
    seoTitle: "CMMS Cold Call Script for Maintenance Leaders",
    metaDescription: "Use this free CMMS cold call script to reach maintenance and plant leaders, qualify work-order pressure and book a maintenance workflow demo.",
    publishedDate: "2026-08-23",
    category: "Maintenance Management Software",
    industry: "Manufacturing, facilities, utilities, logistics and asset-intensive operations",
    subindustry: "CMMS, preventive maintenance, work orders, reliability and asset records",
    serviceCategory: "Computerized maintenance management software",
    icp: "Asset-intensive organizations with recurring maintenance, several sites or production areas, a visible backlog or limited planning and work-order visibility.",
    companySize: "Mid-market plants and facilities through multi-site enterprises",
    geography: "North America and global industrial markets",
    buyers: ["Plant Manager", "Maintenance Director", "Reliability Manager", "Operations Director", "Asset Management Leader", "Facilities Director", "Maintenance Planner"],
    buyerLevel: "Plant, maintenance, reliability and operations buyer",
    objective: "Book a CMMS workflow discovery and demonstration",
    scenario: "The prospect may already use a CMMS or ERP maintenance module, and the real issue may be process, data quality or adoption rather than missing software.",
    triggers: ["Maintenance backlog", "Downtime initiative", "New plant", "Maintenance planner hiring", "Audit finding", "ERP or CMMS review", "Reliability program"],
    archetype: "Maintenance-planning and adoption diagnostic",
    primaryKeyword: "CMMS cold call script",
    secondaryKeywords: ["maintenance software sales script", "plant manager cold call script", "CMMS prospecting script", "maintenance management appointment setting"],
    filters: ["Operations", "Technology"],
    copyLabel: "Copy this script",
    opening: "Hi [First Name], [Your Name] with [Company]. I am calling about the path from a maintenance request to completed work. When the backlog grows or production changes, where does the process lose visibility today: prioritization, planning, parts, technician updates or asset history?",
    questions: [
      "How are preventive, corrective and emergency work prioritized across assets or sites?",
      "What system holds work orders, parts, procedures and equipment history now?",
      "Is the main problem capability, data quality, mobile use, adoption, integration or planning discipline?",
      "Who would need to evaluate the maintenance workflow, plant impact and implementation effort together?",
    ],
    bridge: "We help maintenance and operations teams examine one work-order journey before proposing a system change. The first session maps request, priority, planning, execution, closure and reporting, then determines whether the current platform can be improved or a CMMS evaluation is justified.",
    cta: "Would a short maintenance-workflow review around one plant, asset group or backlog category be useful before scheduling a product demonstration?",
    fullScript: `Hi [First Name], [Your Name] with [Company]. I am calling about the path from a maintenance request to completed work. When the backlog grows or production changes, where does the process lose visibility today: prioritization, planning, parts, technician updates or asset history?

If relevant:
• How are preventive, corrective and emergency work prioritized across assets or sites?
• What system holds work orders, parts, procedures and equipment history now?
• Is the main problem capability, data quality, mobile use, adoption, integration or planning discipline?
• Who would need to evaluate the maintenance workflow, plant impact and implementation effort together?

Bridge: We help maintenance and operations teams examine one work-order journey before proposing a system change. The first session maps request, priority, planning, execution, closure and reporting, then determines whether the current platform can be improved or a CMMS evaluation is justified.

CTA: Would a short maintenance-workflow review around one plant, asset group or backlog category be useful before scheduling a product demonstration?`,
    objections: [
      { objection: "We already have a CMMS.", response: "That is common. Is the current system giving maintenance and Operations the visibility they need, or do adoption, mobile use, data, integration or planning still force work outside it?" },
      { objection: "Our ERP handles maintenance.", response: "It may be the right answer. The useful comparison is whether the ERP workflow supports the technicians, planners, assets and plant decisions involved, not whether a separate product has more features." },
      { objection: "The problem is our process, not software.", response: "That may be correct. A workflow review should expose whether ownership, data and discipline need repair before any platform decision." },
      { objection: "We cannot disrupt production with an implementation.", response: "Agreed. The evaluation should define critical assets, maintenance windows, data, integrations, training, rollout stages and fallback before a change is recommended." },
    ],
    whyItWorks: "The script follows actual maintenance work rather than using a generic efficiency pitch. It respects existing CMMS and ERP environments, separates process problems from platform problems and acknowledges production risk before requesting a demo.",
    whyBreakdown: [
      { label: "It uses a recognizable workflow", text: "Request, priority, planning, execution and closure give the buyer a concrete process to examine." },
      { label: "It protects the incumbent decision", text: "The current CMMS or ERP can remain the answer if configuration and adoption solve the problem." },
      { label: "It respects plant constraints", text: "Production, maintenance windows and critical assets shape the evaluation." },
      { label: "It qualifies implementation reality", text: "Data, integrations, mobile use, training and rollout enter before the product demonstration." },
    ],
    personalization: [
      "Verify the facility, asset environment and buyer's operating responsibility before using a plant-specific message.",
      "Use public expansion, maintenance hiring, reliability, audit or systems-review signals without claiming downtime or equipment failure.",
      "For plant leaders, connect maintenance to production. For reliability, focus on asset strategy. For planners, focus on backlog and work readiness.",
      "Do not promise downtime reduction, predictive accuracy or implementation speed without approved evidence and technical qualification.",
    ],
    alternatives: [
      { label: "Short version", description: "Use when a plant leader gives you one question.", script: "Hi [First Name], [Your Name] with [Company]. From maintenance request to completed work, where does the plant lose the most visibility: priority, planning, parts, technician updates or asset history?" },
      { label: "Voicemail", description: "Leave a workflow-specific message.", script: "Hi [First Name], this is [Your Name] with [Company]. I am reaching out about maintenance backlog, work-order visibility and CMMS workflows. I will send a short note as well. My number is [Phone Number]." },
      { label: "Reliability leader opener", description: "Use when asset strategy is central.", script: "Hi [First Name], [Your Name] with [Company]. How does your team connect asset criticality and reliability priorities to the work planners and technicians actually execute?" },
    ],
    signalRadar: {
      heading: "Find plants with a credible maintenance decision",
      summary: "The CallTeam Buyer Signal Radar combines operational and organizational signals to find facilities where maintenance workflow may be under review. It creates a reason to investigate without suggesting that the plant is unsafe or experiencing unverified failures.",
      signals: [
        { label: "Asset change", text: "New plants, production lines, equipment programs and acquisitions can expand the maintenance scope." },
        { label: "Work pressure", text: "Maintenance hiring, planner roles and public reliability initiatives can indicate backlog or workflow attention." },
        { label: "Governance window", text: "Audits, quality programs and asset-management standards may increase the need for controlled records and ownership." },
        { label: "System decision", text: "ERP projects, CMMS reviews, mobile-work initiatives and new operating leadership can open an evaluation period." },
      ],
      activation: "CallTeam AI GTM groups accounts by facility profile, asset intensity, maintenance signal and decision ownership. Human callers verify the context, diagnose the workflow and qualify whether a plant, maintenance, reliability and technology meeting has a defined purpose.",
    },
    campaignPlan: {
      listFocus: "Manufacturers, utilities, facilities, logistics sites and other asset-intensive operators with formal maintenance ownership and a visible operational or system signal.",
      callAround: "A new plant or line, maintenance hiring, reliability initiative, audit, ERP program, mobile-work project or CMMS review that can be verified.",
      meetingReady: "The prospect can identify the facility or asset scope, current system, maintenance workflow problem, plant constraint, decision trigger and evaluation team.",
      handoff: "Capture sites, assets, work types, backlog context, current CMMS or ERP, request and priority process, planning, parts, mobile use, data, integrations, adoption, production constraints, stakeholders and demonstration goal.",
    },
    faqs: [
      { question: "Who should a CMMS cold call target?", answer: "Start with the person accountable for maintenance execution or asset reliability, such as a Maintenance Director, Plant Manager, Reliability Manager or Operations Director. Planners, facilities and technology teams may also influence the decision." },
      { question: "What is a good CMMS cold call opener?", answer: "Ask where visibility is lost between a maintenance request and completed work. That opens discussion of priority, planning, parts, technician updates and asset history without assuming the buyer needs replacement software." },
      { question: "How do you sell CMMS software when the company has an ERP?", answer: "Examine whether the ERP maintenance workflow meets technician, planner, asset and plant requirements. Compare improving the current environment with adding or replacing software against the same operating criteria." },
      { question: "What qualifies a CMMS software demo?", answer: "Confirm a real facility or asset group, current system, specific maintenance workflow, operating impact, implementation constraints, stakeholders and a reason the team is reviewing change." },
      { question: "Should a caller claim the CMMS will reduce downtime?", answer: "Only use a performance claim that the vendor can support and qualify. A cold caller should first identify the maintenance process, data and adoption conditions that influence any operating result." },
    ],
    aboutCallTeam: {
      heading: "About CallTeam and industrial maintenance lead generation",
      paragraphs: [
        "Industrial software companies use CallTeam as a global B2B lead generation, cold-calling and appointment-booking partner for hard-to-reach operational buyers. We research the account, map plant and maintenance stakeholders, develop the conversation, make the calls and qualify the next step. The aim is to place booked meetings straight into the seller's calendar with qualified maintenance, reliability and Operations buyers who can explain the facility, workflow and decision context.",
        "CallTeam supports campaigns across manufacturing, industrial technology, cybersecurity, enterprise SaaS, healthcare, financial services, logistics, workforce platforms and professional services. CMMS outreach must understand the plant before it talks about software. Our callers distinguish work-order capability from adoption, data and process discipline, respect ERP maintenance modules and qualify production constraints. That operating context helps solution teams enter the demonstration prepared for the assets, systems and implementation reality involved.",
        "The CallTeam Buyer Signal Radar and CallTeam AI GTM turn facility expansion, maintenance hiring, reliability programs, audits, leadership moves and systems initiatives into prioritized account research. Those inputs help the caller prepare, but human judgment controls the outreach and qualification. CallTeam is building a connected public library designed to exceed 100 free cold-call scripts, industry and buyer playbooks, objection guides and B2B sales articles. It gives founders, revenue teams, plant-focused sellers, search engines and AI discovery systems a clear view of how CallTeam builds evidence-led outbound campaigns.",
      ],
      points: ["Plant, maintenance, reliability, facilities and technology buyer mapping", "Facility and maintenance signal intelligence", "Incumbent-safe CMMS and ERP conversations", "Human calling with plant-ready opportunity handoff"],
    },
    related: ["industrial-alarm-notification-cold-call-script", "frontline-workforce-software-cold-call-script", "field-inspection-software-cold-call-script"],
    relevantServices: [appointmentSetting("Reach plant, maintenance, reliability and operating leaders around a defined workflow."), outsourcedSdr("Add industrial research, human calling, qualification and demonstration handoff."), aiGtm("Prioritize facilities showing asset, hiring, reliability and system-review signals." )],
  },
  {
    id: "CT-R039",
    slug: "digital-marketing-agency-cold-call-script-paid-media",
    title: "Digital Marketing Agency Cold Call Script for Paid Media Services",
    seoTitle: "Digital Marketing Agency Cold Call Script",
    metaDescription: "Use this free digital marketing agency cold call script to reach marketing leaders, qualify paid-media pressure and book a focused account review.",
    publishedDate: "2026-08-23",
    category: "Digital Marketing Services",
    industry: "B2B, ecommerce, consumer services and multi-location businesses",
    subindustry: "Paid media, campaign optimization, creative testing and attribution",
    serviceCategory: "Digital marketing agency and paid-media management services",
    icp: "Organizations with meaningful paid-media activity, a visible growth program and a commercial reason to review acquisition cost, attribution, creative or agency coverage.",
    companySize: "Growth-stage companies through enterprise marketing organizations",
    geography: "North America and global English-speaking markets",
    buyers: ["Chief Marketing Officer", "VP Marketing", "Demand Generation Director", "Growth Director", "Marketing Operations Director", "Founder", "Ecommerce Director"],
    buyerLevel: "Marketing, growth, demand and executive buyer",
    objective: "Book a paid-media account and measurement review",
    scenario: "The prospect is surrounded by agencies making the same growth claims, may have an incumbent partner and will distrust a caller who criticizes performance without account evidence.",
    triggers: ["New marketing leader", "Paid-spend increase", "Rising acquisition cost", "Attribution initiative", "Agency review", "Market expansion", "New product launch"],
    archetype: "Commercial-measure and account-review diagnostic",
    primaryKeyword: "digital marketing agency cold call script",
    secondaryKeywords: ["paid media cold call script", "marketing agency sales script", "PPC prospecting script", "digital agency appointment setting"],
    filters: ["Commerce", "Executive"],
    copyLabel: "Copy this script",
    opening: "Hi [First Name], [Your Name] with [Company]. I know every digital agency says it can improve performance, so I am not calling to diagnose an account I have not seen. I am curious which paid-media question has the most executive attention right now: acquisition cost, lead or revenue quality, attribution, creative fatigue or scaling spend?",
    questions: [
      "Which channels, markets or campaigns are included in the current review?",
      "What commercial measure matters most, and where does the team distrust or lack the data?",
      "What is working with the internal team or current agency that must be protected?",
      "Would the next useful step be an account audit, measurement review, creative session or a scoped campaign test?",
    ],
    bridge: "We help marketing teams examine one commercial question before suggesting an agency change. A first review can map objectives, channel scope, measurement, current ownership and the smallest useful work product. It can confirm the existing approach, identify a focused gap or show that no change is needed.",
    cta: "Would a short working session around one paid-media question be useful if the outcome is a defined test or audit rather than a generic agency pitch?",
    fullScript: `Hi [First Name], [Your Name] with [Company]. I know every digital agency says it can improve performance, so I am not calling to diagnose an account I have not seen. I am curious which paid-media question has the most executive attention right now: acquisition cost, lead or revenue quality, attribution, creative fatigue or scaling spend?

If relevant:
• Which channels, markets or campaigns are included in the current review?
• What commercial measure matters most, and where does the team distrust or lack the data?
• What is working with the internal team or current agency that must be protected?
• Would the next useful step be an account audit, measurement review, creative session or a scoped campaign test?

Bridge: We help marketing teams examine one commercial question before suggesting an agency change. A first review can map objectives, channel scope, measurement, current ownership and the smallest useful work product. It can confirm the existing approach, identify a focused gap or show that no change is needed.

CTA: Would a short working session around one paid-media question be useful if the outcome is a defined test or audit rather than a generic agency pitch?`,
    objections: [
      { objection: "We already have an agency.", response: "That is what I expected, and a working relationship should be protected. Is there a channel, market, measurement question or specialist project the current scope does not cover?" },
      { objection: "Our team manages media internally.", response: "That may be the strongest model. Outside help is only useful where the team needs specialist depth, temporary capacity, independent analysis or a defined test. Is any one area creating that need?" },
      { objection: "You cannot know our performance.", response: "Correct, and I would not pretend to. The first conversation is to understand the commercial question and decide whether account access or a scoped review is justified." },
      { objection: "We are cutting marketing spend.", response: "Then a broad growth pitch is not useful. Is the priority reducing waste, protecting the strongest campaigns, improving measurement or simply holding the current plan?" },
    ],
    whyItWorks: "The script acknowledges the agency market's credibility problem and refuses to invent an account diagnosis. It respects internal and incumbent teams, anchors the conversation to one commercial measure and offers a concrete work product.",
    whyBreakdown: [
      { label: "It disarms the generic agency pitch", text: "The caller openly rejects unsupported performance claims." },
      { label: "It respects existing ownership", text: "Internal teams and incumbent agencies can remain central while a narrow gap is evaluated." },
      { label: "It connects media to business", text: "Acquisition cost, revenue quality and measurement give the review a commercial purpose." },
      { label: "It earns a tangible next step", text: "An audit, measurement review, creative session or scoped test is easier to evaluate than a capabilities presentation." },
    ],
    personalization: [
      "Use verified product launches, market expansion, marketing leadership, public campaign activity or hiring signals without claiming the account is underperforming.",
      "Reference a channel only when the brand is visibly active there and the agency can support it.",
      "For CMOs, focus on commercial confidence and allocation. For demand leaders, focus on pipeline quality. For marketing operations, focus on measurement and process.",
      "Never quote savings, return, acquisition-cost improvement or revenue lift without approved evidence and account-level analysis.",
    ],
    alternatives: [
      { label: "Short version", description: "Use when a marketing executive gives you one question.", script: "Hi [First Name], [Your Name] with [Company]. Which paid-media issue has the most attention right now: acquisition cost, lead quality, attribution, creative fatigue or scaling spend?" },
      { label: "Voicemail", description: "Leave a commercial-review message.", script: "Hi [First Name], this is [Your Name] with [Company]. I am reaching out about paid-media performance, measurement and account-review work. I will send a short note as well. My number is [Phone Number]." },
      { label: "Marketing Operations opener", description: "Use when attribution and process are likely to lead.", script: "Hi [First Name], [Your Name] with [Company]. When channel reports and CRM outcomes disagree, how does your team decide which paid-media decisions it can trust?" },
    ],
    signalRadar: {
      heading: "Find marketing teams with a current account question",
      summary: "The CallTeam Buyer Signal Radar looks for public growth, leadership and campaign-change signals that can justify a paid-media conversation. The signal creates timing for a question, not permission to claim the buyer's agency or campaigns are failing.",
      signals: [
        { label: "Growth event", text: "Product launches, new markets, funding and location expansion can change media scope and acquisition priorities." },
        { label: "Leadership window", text: "A new CMO, growth leader or demand executive may review allocation, partners and measurement." },
        { label: "Campaign change", text: "New channels, visible creative activity, ecommerce redesign and hiring can indicate active media work." },
        { label: "Commercial pressure", text: "Public efficiency programs, margin pressure and attribution initiatives can make evidence and account focus more important." },
      ],
      activation: "CallTeam AI GTM organizes the company signal, visible campaign context, buyer role and approved personalization. Human callers test whether a commercial question exists, protect incumbent relationships and book a review only when the agency can offer a relevant work product.",
    },
    campaignPlan: {
      listFocus: "B2B, ecommerce, service and multi-location organizations with visible paid-media activity, identifiable marketing ownership and a credible growth or review signal.",
      callAround: "A new marketing leader, product launch, expansion, channel change, hiring program, attribution project or public efficiency initiative.",
      meetingReady: "The buyer can identify the channel or account scope, commercial question, current ownership, evidence gap, possible work product and relevant decision-makers.",
      handoff: "Capture channels, markets, products, current team and agencies, spend range only when volunteered, business measures, data sources, attribution concerns, creative or landing-page context, decision window, stakeholders and agreed review output.",
    },
    faqs: [
      { question: "Who should a digital marketing agency cold call target?", answer: "Target the leader who owns the commercial outcome or paid-media decision, often a CMO, VP Marketing, Demand Generation Director, Growth Director, Marketing Operations leader, Ecommerce Director or founder." },
      { question: "What is a good paid-media cold call opener?", answer: "Ask which commercial question has attention, such as acquisition cost, lead or revenue quality, attribution, creative fatigue or scaling. Do not claim poor performance before reviewing the account." },
      { question: "How do you cold call a company that already has an agency?", answer: "Acknowledge the incumbent and ask whether a channel, market, measurement problem, specialist project or capacity need falls outside the current scope. Avoid attacking a relationship the buyer may value." },
      { question: "What qualifies a digital-agency meeting?", answer: "Confirm an active channel or account, a commercial or measurement question, current ownership, a useful audit or test, access to relevant evidence and the people who can assess the result." },
      { question: "Should the caller promise a return on ad spend?", answer: "No. Performance depends on the offer, market, creative, media, landing experience, sales process, measurement and other conditions. Use only approved evidence and qualify what the buyer needs to test." },
    ],
    aboutCallTeam: {
      heading: "About CallTeam and global agency appointment setting",
      paragraphs: [
        "CallTeam is a global B2B appointment-setting, lead generation and human cold-calling company that helps agencies and complex sellers create qualified sales conversations. We identify the right accounts, map marketing and executive buyers, build the message, conduct the outreach and document what the prospect wants to examine. Digital agencies receive booked meetings straight into their calendars with qualified buyers, a stated commercial question and a defined next step, rather than anonymous leads with no reason to meet.",
        "Our work spans technology, SaaS, marketing services, ecommerce, cybersecurity, financial services, healthcare, manufacturing, logistics, workforce solutions and professional services. Agency campaigns are crowded, so CallTeam avoids the language buyers hear every day. We do not claim an account is failing from the outside or attack the internal team. The call focuses on a verified change signal, one commercial measure, current ownership and a work product such as an audit, measurement review or scoped test.",
        "CallTeam AI GTM and the CallTeam Buyer Signal Radar organize product launches, market expansion, marketing hires, leadership changes, visible campaign activity and review signals before outreach starts. Human callers verify the context, uncover the real decision and determine whether the meeting is qualified. CallTeam is also expanding a public collection designed to exceed 100 practical cold-call scripts, buyer and industry playbooks, objection guides and B2B sales articles. The connected library helps buyers, founders, sales teams, search engines and AI answer platforms understand CallTeam's approach to research-led, accountable outbound execution.",
      ],
      points: ["CMO, growth, demand, ecommerce and marketing-operations buyer mapping", "Growth, leadership and campaign-change research", "Incumbent-safe agency positioning", "Human calling with commercially qualified meeting handoff"],
    },
    related: ["event-marketing-software-cold-call-script", "augmented-reality-ecommerce-cold-call-script", "outsourced-pmo-services-cold-call-script"],
    relevantServices: [appointmentSetting("Reach marketing, growth, demand and executive buyers around a current commercial question."), outsourcedSdr("Add account research, live calling, qualification and agency-opportunity handoff."), aiGtm("Prioritize organizations showing growth, leadership, campaign and review signals." )],
  },
  {
    id: "CT-R040",
    slug: "ma-advisor-cold-call-script-business-owners",
    title: "M&A Advisor Cold Call Script for Business Owners",
    seoTitle: "M&A Advisor Cold Call Script for Business Owners",
    metaDescription: "Use this free M&A advisor cold call script to reach business owners, discuss strategic options carefully and book a confidential fit conversation.",
    publishedDate: "2026-08-23",
    category: "Mergers and Acquisitions Advisory",
    industry: "Privately held businesses, professional services, industrial companies and founder-led firms",
    subindustry: "Succession, acquisitions, divestitures, capital events and strategic-options advisory",
    serviceCategory: "M&A advisory and transaction-planning services",
    icp: "Established businesses where ownership transition, acquisition, divestiture, succession or capital planning could become a legitimate strategic discussion.",
    companySize: "Lower-middle-market and mid-market businesses",
    geography: "North America and advisor-approved markets",
    buyers: ["Founder", "Business Owner", "Chief Executive Officer", "Chief Financial Officer", "Corporate Development Leader", "Private Equity Operating Partner", "Board Member"],
    buyerLevel: "Owner, executive, finance and corporate-development buyer",
    objective: "Book a confidential strategic-options fit conversation",
    scenario: "The conversation is sensitive, and the caller must not imply that an owner wants to sell, reveal confidential knowledge or manufacture transaction urgency from a public signal.",
    triggers: ["Succession planning", "Ownership transition", "Acquisition activity", "Divestiture", "Capital event", "Industry consolidation", "Corporate-development hiring"],
    archetype: "Permission-based strategic-options conversation",
    primaryKeyword: "M&A advisor cold call script",
    secondaryKeywords: ["business broker cold call script", "mergers and acquisitions prospecting script", "sell-side advisory cold call", "M&A appointment setting"],
    filters: ["Executive", "Finance"],
    copyLabel: "Copy this script",
    opening: "Hi [First Name], [Your Name] with [Company]. I am calling about long-term strategic options for owner-led businesses in [industry]. I do not know whether a transaction is relevant to you, and I am not assuming that it is. Is succession, acquisition, partial liquidity or another ownership decision something your team expects to examine in the next few years, or is the focus firmly on operating the business as it stands?",
    questions: [
      "Which strategic path, if any, deserves preparation before it becomes urgent?",
      "Is the first need market perspective, readiness, valuation context, buyer or target mapping, or transaction execution?",
      "Who would need to be involved while keeping the early conversation appropriately confidential?",
      "What would make a first advisory discussion useful without committing the company to a transaction process?",
    ],
    bridge: "We help owners and executive teams examine strategic options with a defined scope and appropriate confidentiality. A first conversation can clarify objectives, timing, readiness and advisor fit. It does not assume the business is for sale, promise a valuation or create a process before the owner decides one is warranted.",
    cta: "Would a brief confidential fit conversation be useful to determine whether any preparation or market perspective is worth pursuing now?",
    fullScript: `Hi [First Name], [Your Name] with [Company]. I am calling about long-term strategic options for owner-led businesses in [industry]. I do not know whether a transaction is relevant to you, and I am not assuming that it is. Is succession, acquisition, partial liquidity or another ownership decision something your team expects to examine in the next few years, or is the focus firmly on operating the business as it stands?

If relevant:
• Which strategic path, if any, deserves preparation before it becomes urgent?
• Is the first need market perspective, readiness, valuation context, buyer or target mapping, or transaction execution?
• Who would need to be involved while keeping the early conversation appropriately confidential?
• What would make a first advisory discussion useful without committing the company to a transaction process?

Bridge: We help owners and executive teams examine strategic options with a defined scope and appropriate confidentiality. A first conversation can clarify objectives, timing, readiness and advisor fit. It does not assume the business is for sale, promise a valuation or create a process before the owner decides one is warranted.

CTA: Would a brief confidential fit conversation be useful to determine whether any preparation or market perspective is worth pursuing now?`,
    objections: [
      { objection: "We are not selling the company.", response: "Understood, and I am not asking you to. The only question is whether succession, acquisitions, partial liquidity or long-term readiness deserves any planning. If not, we should leave it there." },
      { objection: "This is confidential.", response: "Absolutely. A caller should not ask for sensitive detail. The first step can remain at the level of objective, timing and advisor fit, with confidentiality controls defined before information is shared." },
      { objection: "We already have an advisor.", response: "That relationship should be respected. Is the advisor covering the strategic question you expect to face, or is there a distinct market, sector, buyer or transaction need that requires separate expertise?" },
      { objection: "Just tell me what the company is worth.", response: "A credible valuation needs evidence and context. The right next step is to understand the business, objective and purpose of the valuation before anyone offers a conclusion." },
    ],
    whyItWorks: "The script gives the owner permission to reject the transaction premise and still discuss preparation. It protects confidentiality, avoids invented urgency and defines several strategic paths beyond a full company sale.",
    whyBreakdown: [
      { label: "It removes the sale assumption", text: "The owner can discuss succession, acquisition, liquidity, readiness or no transaction at all." },
      { label: "It respects confidentiality", text: "The opening asks for direction, not sensitive financial or shareholder information." },
      { label: "It avoids manufactured urgency", text: "Public signals justify research but never prove a private owner intends to transact." },
      { label: "It qualifies advisor fit", text: "Objective, market, timing, preparation and stakeholder needs shape the next conversation." },
    ],
    personalization: [
      "Use public ownership, acquisition, succession, capital, leadership or industry-consolidation signals only as neutral research context.",
      "Never state or imply that a company is for sale, distressed, seeking liquidity or facing an ownership issue unless the business has publicly said so.",
      "For owners, focus on options and control. For CFOs, focus on preparation and evidence. For corporate development, focus on acquisition or portfolio strategy.",
      "Do not request confidential financial, shareholder, family or transaction information during an unsolicited opening.",
    ],
    alternatives: [
      { label: "Short version", description: "Use when an owner wants the premise immediately.", script: "Hi [First Name], [Your Name] with [Company]. I am not assuming you want to sell. Is succession, acquisition, liquidity or long-term transaction readiness something the business expects to examine, or is it not relevant?" },
      { label: "Voicemail", description: "Leave a discreet options-led message.", script: "Hi [First Name], this is [Your Name] with [Company]. I am reaching out about confidential strategic-options and transaction-readiness work for owner-led businesses. My number is [Phone Number]." },
      { label: "Corporate Development opener", description: "Use when the buyer is pursuing acquisitions.", script: "Hi [First Name], [Your Name] with [Company]. As your team reviews acquisition opportunities, where is the greater constraint today: target identification, sector coverage, owner access, evaluation capacity or transaction execution?" },
    ],
    signalRadar: {
      heading: "Identify credible strategic-options conversations",
      summary: "The CallTeam Buyer Signal Radar uses public company and market events to prioritize research while protecting the owner's privacy. A signal may justify a respectful question, but it does not prove transaction intent or permit the caller to describe private circumstances.",
      signals: [
        { label: "Ownership context", text: "Public founder ownership, leadership transition and stated succession initiatives can guide careful research without creating a sale assumption." },
        { label: "Transaction activity", text: "Acquisitions, divestitures, joint ventures and corporate-development hiring can indicate an active strategic mandate." },
        { label: "Capital change", text: "Public refinancing, investment, recapitalization and growth funding can create advisory questions when the purpose is known." },
        { label: "Market movement", text: "Industry consolidation, buyer activity and regulatory or technology change can make market perspective useful to owners and boards." },
      ],
      activation: "CallTeam AI GTM organizes public ownership context, transaction signals, sector fit and the likely decision route before outreach. Experienced callers use permission-based language, protect confidentiality and qualify only the objectives the prospect chooses to discuss.",
    },
    campaignPlan: {
      listFocus: "Established owner-led, sponsor-backed and corporate businesses that fit the advisor's sector, size, geography and transaction expertise.",
      callAround: "A public succession initiative, leadership transition, acquisition or divestiture, capital event, corporate-development buildout or sector-consolidation pattern.",
      meetingReady: "The prospect identifies a strategic question, approximate planning horizon, permitted level of discussion, relevant stakeholders and a reason the advisor may fit.",
      handoff: "Capture only approved context: company and sector, buyer role, publicly verified signal, strategic option discussed, broad timing, advisor status, confidentiality boundary, participants and purpose of the next conversation. Mark assumptions clearly.",
    },
    faqs: [
      { question: "Who should an M&A advisor cold call target?", answer: "Depending on the mandate, target owners, founders, CEOs, CFOs, corporate-development leaders, board members or private-equity operating partners. The advisor's sector, size and geography should determine the account list." },
      { question: "What is a good M&A cold call opener for a business owner?", answer: "State that you are not assuming the owner wants to sell. Ask whether succession, acquisition, liquidity or long-term transaction readiness is relevant, and make it easy for the owner to say that it is not." },
      { question: "How should an M&A caller protect confidentiality?", answer: "Keep the unsolicited conversation at the level of objective, broad timing and advisor fit. Do not request private financial, shareholder, family or transaction information before appropriate confidentiality controls exist." },
      { question: "What qualifies an M&A advisory meeting?", answer: "Confirm a genuine strategic question, sector and size fit, a broad planning horizon, the buyer's authority, the permitted scope of discussion and a useful purpose for the advisor conversation." },
      { question: "Should an M&A caller offer a valuation on the phone?", answer: "No. A credible valuation requires evidence, context and a defined purpose. The cold call can qualify whether a valuation or readiness discussion is appropriate, not produce the conclusion." },
    ],
    aboutCallTeam: {
      heading: "About CallTeam and confidential professional-services lead generation",
      paragraphs: [
        "CallTeam builds global B2B lead generation, human cold-calling and appointment-setting campaigns for professional services and complex commercial offers. We define account fit, research ownership and executive roles, prepare controlled messaging, make the calls and qualify the reason for a meeting. For M&A advisors, the objective is not a large list of supposed sellers. It is a smaller number of qualified strategic conversations booked directly into the advisor's calendar with the prospect's permission, context and confidentiality boundaries documented.",
        "Our campaign work spans financial services, professional services, technology and SaaS, healthcare, cybersecurity, manufacturing, industrial markets, logistics, workforce solutions and other global sectors. Transaction outreach requires exceptional restraint. CallTeam callers do not imply a company is for sale, distressed or seeking liquidity because a public event exists. We use permission-based language, respect incumbent advisors, avoid premature valuation claims and capture only the information the owner or executive chooses to discuss.",
        "CallTeam AI GTM and the proprietary CallTeam Buyer Signal Radar organize public ownership context, leadership transitions, acquisitions, capital events, corporate-development activity and sector movement before a human caller begins. The research improves relevance, while trained people protect tone, confidentiality and qualification. CallTeam's public resource centre is designed to exceed 100 original cold-call scripts, buyer playbooks, objection guides and B2B sales articles. It demonstrates to owners, advisors, founders, sales teams, search engines and AI discovery platforms how CallTeam approaches sensitive executive outreach with disciplined human judgment.",
      ],
      points: ["Owner, CEO, CFO, board and corporate-development buyer mapping", "Sector, ownership and public transaction-signal research", "Permission-based outreach with confidentiality controls", "Human qualification and advisor-ready meeting handoff"],
    },
    related: ["private-credit-software-cold-call-script", "outsourced-accounting-services-cold-call-script", "erp-modernization-cold-call-script-for-cfos"],
    relevantServices: [appointmentSetting("Reach owners, executives, finance and corporate-development buyers around a legitimate strategic question."), outsourcedSdr("Add precise account research, discreet human calling, qualification and meeting handoff."), aiGtm("Prioritize businesses using public ownership, transaction, capital and market signals." )],
  },
];

module.exports = waveSevenResources;
