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

const sdrTraining = (description) => ({
  title: "SDR Training Services",
  description,
  href: "https://www.callteam.ca/services/sdr-training/",
});

const waveFiveResources = [
  {
    id: "CT-R007",
    slug: "ai-recruiting-software-cold-call-script",
    title: "AI Recruiting Software Cold Call Script",
    seoTitle: "AI Recruiting Software Cold Call Script for HR Buyers",
    metaDescription: "Use this AI recruiting software cold call script to reach talent leaders, qualify hiring-workflow pressure and book a focused product demonstration.",
    publishedDate: "2026-08-17",
    category: "HR Technology",
    industry: "Staffing-intensive mid-market and enterprise organizations",
    subindustry: "AI recruiting, talent acquisition automation and candidate screening",
    serviceCategory: "Recruiting software and talent-acquisition technology",
    icp: "Employers and staffing organizations with recurring hiring volume, stretched recruiting teams or inconsistent screening and scheduling workflows.",
    companySize: "250+ employees or high-volume hiring teams",
    geography: "Global",
    buyers: ["Chief Human Resources Officer", "VP Talent Acquisition", "Head of Recruiting", "Director of Talent Acquisition", "Recruiting Operations Director", "HR Technology Director"],
    buyerLevel: "HR, talent and recruiting-operations buyer",
    objective: "Book a recruiting-workflow discovery and demonstration",
    scenario: "The recruiting team needs more capacity or consistency but will not compromise candidate experience, governance or human judgment.",
    triggers: ["High-volume hiring", "Seasonal recruitment", "Recruiter hiring freeze", "Time-to-fill pressure", "New ATS project", "Recruiting operations hire", "Expansion into new markets"],
    archetype: "Workflow-pressure diagnostic",
    primaryKeyword: "AI recruiting software cold call script",
    secondaryKeywords: ["recruiting software sales script", "HR technology cold call script", "talent acquisition prospecting script", "AI recruitment appointment setting"],
    filters: ["Technology", "Human Resources"],
    opening: "Hi [First Name], [Your Name] with [Company]. I am calling because recruiting teams are being asked to move faster without adding the same level of headcount. Where does that pressure show up most for your team today: sourcing, screening, scheduling or recruiter follow-up?",
    questions: [
      "Which part of the hiring workflow consumes the most recruiter time without improving the final decision?",
      "What hiring volume or role type creates the biggest bottleneck?",
      "How are candidate experience, bias controls and human review handled when automation is introduced?",
      "Is the priority adding a point solution, improving the ATS workflow or reducing manual work across several stages?",
    ],
    bridge: "We help recruiting teams automate defined, repeatable work while keeping hiring decisions and sensitive conversations with people. A first session maps one workflow, the systems involved and the controls the team needs before evaluating the software.",
    cta: "Would it be useful to map one high-friction recruiting workflow and see a demonstration built around that use case?",
    fullScript: `Hi [First Name], [Your Name] with [Company]. I am calling because recruiting teams are being asked to move faster without adding the same level of headcount. Where does that pressure show up most for your team today: sourcing, screening, scheduling or recruiter follow-up?

If relevant:
• Which part of the hiring workflow consumes the most recruiter time without improving the final decision?
• What hiring volume or role type creates the biggest bottleneck?
• How are candidate experience, bias controls and human review handled when automation is introduced?
• Is the priority adding a point solution, improving the ATS workflow or reducing manual work across several stages?

Bridge: We help recruiting teams automate defined, repeatable work while keeping hiring decisions and sensitive conversations with people. A first session maps one workflow, the systems involved and the controls the team needs before evaluating the software.

CTA: Would it be useful to map one high-friction recruiting workflow and see a demonstration built around that use case?`,
    objections: [
      { objection: "We already have an ATS.", response: "That makes sense. The question is not whether you need another system of record. It is whether a specific workflow around the ATS still requires too much manual work or produces inconsistent handoffs." },
      { objection: "We do not want AI making hiring decisions.", response: "Neither should an initial conversation assume that. We can focus on administrative and workflow use cases, document where human review stays mandatory and evaluate the governance before any broader discussion." },
      { objection: "Hiring is slower right now.", response: "Understood. A lower-volume period may reduce urgency, although it can also be the cleanest time to improve the workflow before demand returns. Is process improvement still on the agenda?" },
      { objection: "Candidate experience is too important to automate.", response: "Agreed. The useful question is which delays and repetitive steps hurt candidate experience today, and whether automation can remove those without replacing the human moments that matter." },
    ],
    whyItWorks: "The script sells a controlled workflow review instead of vague AI transformation. It exposes operational demand, respects the buyer's governance concerns and earns a use-case-specific demonstration.",
    whyBreakdown: [
      { label: "It starts with recruiter capacity", text: "The opener uses a familiar operating problem instead of leading with AI features or promises." },
      { label: "It protects human judgment", text: "The discovery makes governance, candidate experience and human review part of qualification rather than treating them as late objections." },
      { label: "It narrows the demonstration", text: "One defined workflow gives the buyer a practical way to judge fit, integration and value." },
    ],
    personalization: [
      "Use a verified hiring-volume, expansion, ATS or recruiting-operations signal rather than assuming the company is overwhelmed.",
      "For talent leaders, focus on capacity and candidate experience. For HR technology buyers, focus on workflow ownership, integrations and governance.",
      "Name only the recruiting stages the product genuinely supports.",
      "Do not claim that AI removes bias, replaces recruiters or guarantees faster hiring.",
    ],
    alternatives: [
      { label: "Short version", description: "Use when the buyer wants the reason immediately.", script: "Hi [First Name], [Your Name] with [Company]. Where is manual recruiting work creating the most pressure today: sourcing, screening, scheduling or follow-up?" },
      { label: "Voicemail", description: "Leave a workflow question, not an AI claim.", script: "Hi [First Name], this is [Your Name] with [Company]. I am reaching out about reducing manual work in a defined recruiting workflow while protecting candidate experience and human review. I will send a short note as well. My number is [Phone Number]." },
      { label: "HR technology opener", description: "Use when systems and governance come first.", script: "Hi [First Name], [Your Name] with [Company]. Which recruiting workflow around the ATS is still creating the most manual work or inconsistent handoffs?" },
    ],
    campaignPlan: {
      listFocus: "Global employers and staffing organizations with repeat hiring volume, visible recruiting operations leadership, an established ATS and a definable workflow problem.",
      callAround: "A hiring surge, expansion, recruiter capacity constraint, new ATS initiative, recruiting-operations hire or public focus on time to fill and candidate experience.",
      meetingReady: "The buyer can name a workflow, affected hiring volume, current system, business impact and the people who own operations, technology and governance.",
      handoff: "Capture the workflow, role types, monthly volume, ATS and integrations, current manual steps, candidate-impact concerns, human-review requirements, decision team and evaluation window.",
    },
    faqs: [
      { question: "Who should an AI recruiting software cold call target?", answer: "Target the owner of the workflow and outcome. That is often talent acquisition, recruiting operations or HR technology rather than a broad HR contact." },
      { question: "What qualifies an AI recruiting software appointment?", answer: "Confirm a defined workflow problem, enough recurring volume, a current system environment and a buyer willing to discuss candidate experience, human review and governance." },
      { question: "Should the cold call lead with artificial intelligence?", answer: "Usually not. Lead with a hiring-workflow problem the buyer recognizes, then explain where automation fits and where people remain responsible." },
    ],
    aboutCallTeam: {
      heading: "Global B2B lead generation for HR technology companies",
      body: "CallTeam builds global B2B lead-generation and appointment-setting campaigns for software offers that require operational trust, technical fit and executive approval. We combine account research, human calling, qualification and disciplined meeting handoff. This script applies that experience to AI recruiting technology without relying on inflated automation claims or generic HR messaging.",
      points: ["Talent, recruiting-operations and HR technology buyer mapping", "Use-case-led calling and qualification", "Global B2B campaign execution and meeting handoff"],
    },
    related: ["frontline-workforce-software-cold-call-script", "corporate-training-cold-call-script-financial-acumen", "ai-voice-agent-cold-call-script"],
    relevantServices: [appointmentSetting("Reach talent, recruiting-operations and HR technology buyers with a use-case-led campaign."), outsourcedSdr("Add global research, calling, qualification and demonstration handoff without recruiting an internal SDR team."), aiGtm("Prioritize employers showing hiring-volume, ATS and recruiting-transformation signals." )],
  },
  {
    id: "CT-R013",
    slug: "event-marketing-software-cold-call-script",
    title: "Event Marketing Software Cold Call Script",
    seoTitle: "Event Marketing Software Cold Call Script for B2B Sales",
    metaDescription: "Use this event marketing software cold call script to reach event and demand-generation leaders, qualify pipeline gaps and book a workflow demonstration.",
    publishedDate: "2026-08-17",
    category: "Event Technology",
    industry: "B2B companies, associations and event-led organizations",
    subindustry: "Event marketing, registration, engagement and revenue attribution",
    serviceCategory: "Event marketing and event-management software",
    icp: "Organizations running webinars, conferences, field events or customer programs across disconnected registration, engagement, CRM and reporting workflows.",
    companySize: "100+ employees or recurring multi-event programs",
    geography: "Global",
    buyers: ["VP Marketing", "Head of Events", "Director of Event Marketing", "Demand Generation Director", "Field Marketing Director", "Marketing Operations Director", "Association Events Director"],
    buyerLevel: "Marketing, events and revenue-operations buyer",
    objective: "Book an event-workflow and pipeline demonstration",
    scenario: "The organization runs events but struggles to connect registration, engagement, follow-up and revenue reporting into one accountable workflow.",
    triggers: ["Annual conference planning", "Expanded webinar program", "New field-marketing leader", "Event platform renewal", "CRM cleanup", "Low event follow-up", "Pressure to prove event pipeline"],
    archetype: "Pipeline-leak diagnostic",
    primaryKeyword: "event marketing software cold call script",
    secondaryKeywords: ["event software sales script", "event technology cold call script", "event management software prospecting", "event marketing appointment setting"],
    filters: ["Technology", "Marketing"],
    opening: "Hi [First Name], [Your Name] with [Company]. Quick question about your event program: after someone registers or attends, how cleanly does that engagement reach sales and show up in pipeline reporting?",
    questions: [
      "Where does the process break most often: promotion, registration, attendee engagement, lead routing or post-event follow-up?",
      "How many event formats or regional teams have to work through the current process?",
      "Can marketing show which events influence meetings, opportunities and revenue without rebuilding the report manually?",
      "Is there an upcoming event, planning cycle or platform renewal creating a decision window?",
    ],
    bridge: "We help event and demand-generation teams connect the operating workflow from registration through CRM handoff and attribution. The first discussion uses one real event program to identify where the current stack is working and where data or follow-up is being lost.",
    cta: "Would a short workflow review be useful before the next major event or platform decision?",
    fullScript: `Hi [First Name], [Your Name] with [Company]. Quick question about your event program: after someone registers or attends, how cleanly does that engagement reach sales and show up in pipeline reporting?

If relevant:
• Where does the process break most often: promotion, registration, attendee engagement, lead routing or post-event follow-up?
• How many event formats or regional teams have to work through the current process?
• Can marketing show which events influence meetings, opportunities and revenue without rebuilding the report manually?
• Is there an upcoming event, planning cycle or platform renewal creating a decision window?

Bridge: We help event and demand-generation teams connect the operating workflow from registration through CRM handoff and attribution. The first discussion uses one real event program to identify where the current stack is working and where data or follow-up is being lost.

CTA: Would a short workflow review be useful before the next major event or platform decision?`,
    objections: [
      { objection: "We already have an event platform.", response: "Most teams do. The reason to talk would be a specific gap in workflow, integration, attendee experience or reporting, not replacing a platform that is meeting the need." },
      { objection: "Our events agency handles this.", response: "Understood. Agencies can execute the program well while the organization still owns CRM data, sales handoff and performance reporting. Which side owns those pieces today?" },
      { objection: "Events are not a major channel for us.", response: "Then a broad platform project may not make sense. Is there still one recurring webinar, field-event or customer-event workflow creating enough manual work to review?" },
      { objection: "We cannot change before the next event.", response: "That is reasonable. A review can document the requirements now and separate immediate workflow fixes from changes that belong after the event." },
    ],
    whyItWorks: "The opener moves past event logistics and asks about the commercial handoff buyers are expected to defend. The call qualifies both operating friction and the decision window before proposing a demonstration.",
    whyBreakdown: [
      { label: "It connects events to revenue", text: "The conversation centers on lead flow and attribution instead of offering another registration tool." },
      { label: "It finds the broken stage", text: "The questions isolate whether the real problem sits before, during or after the event." },
      { label: "It respects the calendar", text: "Event dates and renewals determine whether a buyer can evaluate, change or only document requirements." },
    ],
    personalization: [
      "Reference one verified conference, webinar series, field program or association event and never invent attendance volume.",
      "For event leaders, lead with execution and attendee experience. For marketing operations, lead with integrations, routing and reporting.",
      "Match the script to the supported event format rather than claiming one platform solves every event type.",
      "Do not promise pipeline attribution or attendance gains without approved evidence.",
    ],
    alternatives: [
      { label: "Short version", description: "Use with a time-pressed marketing leader.", script: "Hi [First Name], [Your Name] with [Company]. After an event, how reliably does attendee engagement reach sales and appear in pipeline reporting?" },
      { label: "Voicemail", description: "Leave the pipeline question.", script: "Hi [First Name], this is [Your Name] with [Company]. I am reaching out about connecting event registration and engagement with CRM follow-up and pipeline reporting. I will send a short note as well. My number is [Phone Number]." },
      { label: "Event leader opener", description: "Use when execution is the likely priority.", script: "Hi [First Name], [Your Name] with [Company]. Across registration, engagement and follow-up, which part of the event workflow creates the most manual work for your team?" },
    ],
    campaignPlan: {
      listFocus: "Global B2B companies, associations and event-led organizations with recurring programs, visible event or demand-generation ownership and an established CRM or marketing stack.",
      callAround: "A published conference, webinar expansion, annual planning cycle, platform renewal, new event leader or visible pressure to prove event-generated pipeline.",
      meetingReady: "The buyer can identify an event workflow, the broken stage, current platforms, commercial impact and a decision or planning window.",
      handoff: "Capture event types, annual volume, teams and regions, current platform, CRM and marketing integrations, lead-routing process, reporting gaps, next major event, renewal timing and stakeholders.",
    },
    faqs: [
      { question: "Who should an event marketing software cold call target?", answer: "Start with the person accountable for the event outcome. Depending on the problem, that may be event marketing, field marketing, demand generation, marketing operations or an association events leader." },
      { question: "What qualifies an event software demonstration?", answer: "Confirm a recurring event workflow, a material problem, the current stack, the teams affected and a realistic planning or renewal window." },
      { question: "Should the script focus on event attendance?", answer: "Only when attendance is the verified problem. Many stronger conversations start with workflow, engagement data, sales follow-up or revenue attribution." },
    ],
    aboutCallTeam: {
      heading: "Global B2B lead generation for event technology companies",
      body: "CallTeam helps event technology and marketing software companies reach the buyers responsible for both program execution and commercial results. Our global B2B lead-generation work combines account research, human calling, qualification and meeting handoff. This resource reflects that campaign discipline by connecting the software discussion to a real event workflow, stakeholder group and decision date.",
      points: ["Event, demand-generation and marketing-operations targeting", "Workflow and pipeline-led talk tracks", "Qualified global software demonstrations"],
    },
    related: ["tourism-booking-software-cold-call-script", "payment-processing-cold-call-script", "frontline-workforce-software-cold-call-script"],
    relevantServices: [appointmentSetting("Reach event, demand-generation and marketing-operations buyers before a real planning or renewal window."), outsourcedSdr("Add global account research, calling, qualification and event-workflow demonstration booking."), aiGtm("Prioritize accounts showing conference, webinar, platform-renewal and event-team growth signals." )],
  },
  {
    id: "CT-R027",
    slug: "outsourced-accounting-services-cold-call-script",
    title: "Outsourced Accounting Services Cold Call Script",
    seoTitle: "Outsourced Accounting Services Cold Call Script for CFOs",
    metaDescription: "Use this outsourced accounting cold call script to reach CFOs and controllers, qualify close and reporting pressure and book a finance diagnostic.",
    publishedDate: "2026-08-17",
    category: "Finance and Accounting Services",
    industry: "Growth companies, multi-entity businesses and investor-backed firms",
    subindustry: "Outsourced accounting, controllership, close and management reporting",
    serviceCategory: "B2B outsourced accounting and finance operations",
    icp: "Organizations whose internal finance team is stretched by growth, vacancies, acquisitions, complex reporting or an unreliable month-end close.",
    companySize: "20–1,000 employees",
    geography: "Global and market-specific delivery",
    buyers: ["Chief Financial Officer", "VP Finance", "Controller", "Director of Finance", "Chief Operating Officer", "Founder", "Private Equity Operating Partner"],
    buyerLevel: "Finance economic buyer and operating sponsor",
    objective: "Book a finance-operations diagnostic",
    scenario: "Leadership needs more reliable accounting capacity or reporting but may prefer a flexible external team to another long recruiting cycle.",
    triggers: ["Controller vacancy", "Delayed month-end close", "Acquisition", "New funding", "Audit preparation", "ERP implementation", "Multi-entity expansion"],
    archetype: "Capacity-and-control diagnostic",
    primaryKeyword: "outsourced accounting services cold call script",
    secondaryKeywords: ["accounting services sales script", "CFO cold call script", "outsourced finance prospecting script", "bookkeeping appointment setting"],
    filters: ["Finance", "Professional Services"],
    opening: "Hi [First Name], [Your Name] with [Company]. I am calling because finance teams often reach a point where the close, reporting and day-to-day accounting workload grows faster than the internal team. Is capacity or consistency creating any pressure for you right now?",
    questions: [
      "Where is the pressure most visible: transaction processing, close, reconciliations, management reporting or technical accounting?",
      "Is the issue temporary capacity, a difficult hire or a longer-term operating-model decision?",
      "How quickly does leadership receive financial information it trusts after month end?",
      "Which systems, entities or reporting requirements would an external team need to work within?",
    ],
    bridge: "We provide outsourced accounting capacity around a defined scope, ownership model and reporting standard. The first discussion identifies the work that should remain internal, the work an external team could own and the controls required for a clean handoff.",
    cta: "Would a short finance-operations diagnostic be useful to map the workload, risks and best delivery model?",
    fullScript: `Hi [First Name], [Your Name] with [Company]. I am calling because finance teams often reach a point where the close, reporting and day-to-day accounting workload grows faster than the internal team. Is capacity or consistency creating any pressure for you right now?

If relevant:
• Where is the pressure most visible: transaction processing, close, reconciliations, management reporting or technical accounting?
• Is the issue temporary capacity, a difficult hire or a longer-term operating-model decision?
• How quickly does leadership receive financial information it trusts after month end?
• Which systems, entities or reporting requirements would an external team need to work within?

Bridge: We provide outsourced accounting capacity around a defined scope, ownership model and reporting standard. The first discussion identifies the work that should remain internal, the work an external team could own and the controls required for a clean handoff.

CTA: Would a short finance-operations diagnostic be useful to map the workload, risks and best delivery model?`,
    objections: [
      { objection: "We keep accounting in-house.", response: "That may remain the right model. The discussion can focus on whether a defined backlog, specialist requirement or temporary capacity gap is pulling the internal team away from higher-value work." },
      { objection: "We already use an accounting firm.", response: "Understood. Is that firm covering tax and year-end work, or does it also own the recurring operating work and management reporting where the pressure sits?" },
      { objection: "We are hiring a controller.", response: "That role may solve the leadership gap. Some teams still use external capacity during the search or to keep the new controller from inheriting an unresolved close and reporting backlog." },
      { objection: "We cannot send financial data outside the company.", response: "Security and access controls should be qualified before scope. A useful first discussion documents the data boundaries, systems, permissions and delivery locations your policies require." },
    ],
    whyItWorks: "The script respects finance buyers by defining the operating problem before pitching headcount replacement. It distinguishes temporary capacity from a durable delivery model and makes controls part of the buying conversation.",
    whyBreakdown: [
      { label: "It starts with finance pressure", text: "Close, reporting and team capacity are concrete problems a CFO or controller can evaluate quickly." },
      { label: "It protects internal ownership", text: "The bridge explicitly separates work that should stay inside from work an external team may own." },
      { label: "It qualifies control requirements", text: "Systems, data access, entities and reporting standards determine whether the service can be delivered responsibly." },
    ],
    personalization: [
      "Use one verified finance leadership vacancy, acquisition, funding event, ERP initiative or multi-entity expansion signal.",
      "For CFOs, lead with reporting reliability and operating leverage. For controllers, lead with close ownership, workload and controls.",
      "State the accounting scope, delivery locations and qualifications accurately.",
      "Never imply audit independence, tax advice or guaranteed savings unless the provider is authorized and the claim is approved.",
    ],
    alternatives: [
      { label: "Short version", description: "Use with a finance executive who gives you ten seconds.", script: "Hi [First Name], [Your Name] with [Company]. Is month-end, reporting or day-to-day accounting workload growing faster than the finance team can comfortably absorb?" },
      { label: "Voicemail", description: "Leave a capacity and control message.", script: "Hi [First Name], this is [Your Name] with [Company]. I am reaching out about adding defined accounting capacity without losing internal control of the finance function. I will send a short note as well. My number is [Phone Number]." },
      { label: "Controller opener", description: "Use when the close is likely the issue.", script: "Hi [First Name], [Your Name] with [Company]. Which part of the month-end process creates the most recurring pressure or rework for your team?" },
    ],
    campaignPlan: {
      listFocus: "Growth, multi-entity and investor-backed organizations with a visible finance leader, sufficient accounting complexity and a plausible capacity, close or reporting problem.",
      callAround: "A finance vacancy, acquisition, funding event, audit cycle, ERP project, delayed reporting signal or expansion into new entities and markets.",
      meetingReady: "The buyer can define the work, timing, systems, internal owner, control requirements and whether the need is temporary, specialist or ongoing.",
      handoff: "Capture entities, accounting basis, monthly transaction and close profile, systems, current team, backlog, reporting deadlines, data-access constraints, delivery geography, sponsor and desired start date.",
    },
    faqs: [
      { question: "Who should an outsourced accounting cold call target?", answer: "Start with the finance leader who owns close quality, reporting and team capacity. In smaller companies that may be the founder or COO; in larger organizations it is usually the CFO, controller or VP Finance." },
      { question: "What qualifies an outsourced accounting appointment?", answer: "Confirm a defined workload or control problem, internal ownership, systems and data requirements, delivery geography and a plausible timeline." },
      { question: "Should the script lead with cost savings?", answer: "No. Lead with capacity, reliability and control. Cost belongs in the evaluation after the scope and operating model are understood." },
    ],
    aboutCallTeam: {
      heading: "Global B2B lead generation for accounting and finance providers",
      body: "CallTeam builds global B2B lead-generation and appointment-setting programs for professional services that depend on trust, timing and precise qualification. We map finance buyers, research account-level triggers, make the calls and hand over the operating facts required for a serious diagnostic. This page applies that experience without presenting outsourced accounting as a generic staffing pitch.",
      points: ["CFO, controller and finance-operations targeting", "Trigger-led human calling and qualification", "Global B2B diagnostic and opportunity handoff"],
    },
    related: ["accounting-software-to-erp-cold-call-script", "erp-modernization-cold-call-script-for-cfos", "software-procurement-advisory-cold-call-script"],
    relevantServices: [appointmentSetting("Reach CFOs, controllers and operating sponsors around a verified finance trigger."), outsourcedSdr("Add global account research, calling, qualification and finance-diagnostic handoff."), sdrTraining("Train callers to discuss finance capacity, controls and scope without making unsupported claims." )],
  },
  {
    id: "CT-R028",
    slug: "outsourced-legal-support-services-cold-call-script",
    title: "Outsourced Legal Support Services Cold Call Script",
    seoTitle: "Outsourced Legal Support Cold Call Script for Legal Teams",
    metaDescription: "Use this outsourced legal support cold call script to reach general counsel and legal operations, qualify workload pressure and book a scoping call.",
    publishedDate: "2026-08-17",
    category: "Legal Services",
    industry: "Corporate legal departments and law firms",
    subindustry: "Contract support, legal operations, document review and matter administration",
    serviceCategory: "B2B outsourced legal support services",
    icp: "Legal teams with recurring contract, document, matter-management or administrative volume that is stretching internal lawyers and operations staff.",
    companySize: "Mid-market, enterprise and established law firms",
    geography: "Global, subject to jurisdiction and delivery requirements",
    buyers: ["General Counsel", "Chief Legal Officer", "Deputy General Counsel", "Head of Legal Operations", "Legal Operations Director", "Law Firm Managing Partner", "Practice Group Leader"],
    buyerLevel: "Legal executive, operations and practice leader",
    objective: "Book a legal-workflow scoping call",
    scenario: "The legal team needs flexible support for defined work but must protect privilege, confidentiality, quality and jurisdiction-specific requirements.",
    triggers: ["Contract backlog", "Litigation or investigation", "Acquisition", "Legal hiring freeze", "New legal operations leader", "Regulatory project", "Matter-volume spike"],
    archetype: "Workload-and-risk diagnostic",
    primaryKeyword: "outsourced legal support cold call script",
    secondaryKeywords: ["legal services sales script", "legal operations cold call script", "legal process outsourcing script", "general counsel appointment setting"],
    filters: ["Professional Services", "Legal"],
    opening: "Hi [First Name], [Your Name] with [Company]. I am calling because legal teams often have work that must get done but does not always require the most senior internal lawyer to own every step. Is contract, document or matter volume creating that kind of pressure for your team?",
    questions: [
      "Which workstream is absorbing the most internal time right now?",
      "Is the need recurring, tied to a specific matter or caused by a temporary volume spike?",
      "What must remain with internal counsel, and what could be handled through a controlled external workflow?",
      "Which jurisdiction, privilege, confidentiality, system-access or quality requirements would govern the work?",
    ],
    bridge: "We provide structured legal support around a defined scope, review standard and escalation path. The first conversation is designed to determine whether the work is appropriate for an external team and what controls must be in place before any engagement.",
    cta: "Would a brief scoping call be useful to separate the work that must stay internal from the work that could move through a controlled support model?",
    fullScript: `Hi [First Name], [Your Name] with [Company]. I am calling because legal teams often have work that must get done but does not always require the most senior internal lawyer to own every step. Is contract, document or matter volume creating that kind of pressure for your team?

If relevant:
• Which workstream is absorbing the most internal time right now?
• Is the need recurring, tied to a specific matter or caused by a temporary volume spike?
• What must remain with internal counsel, and what could be handled through a controlled external workflow?
• Which jurisdiction, privilege, confidentiality, system-access or quality requirements would govern the work?

Bridge: We provide structured legal support around a defined scope, review standard and escalation path. The first conversation is designed to determine whether the work is appropriate for an external team and what controls must be in place before any engagement.

CTA: Would a brief scoping call be useful to separate the work that must stay internal from the work that could move through a controlled support model?`,
    objections: [
      { objection: "We do not outsource legal work.", response: "Understood. The conversation would only be relevant if a defined administrative, review or process workload could be separated without compromising legal judgment, privilege or internal ownership." },
      { objection: "Our outside counsel handles overflow.", response: "That may be the right model for legal advice. Is outside counsel also the best commercial and operating fit for the repeatable support work surrounding the matter?" },
      { objection: "Confidentiality is too sensitive.", response: "That must be addressed before scope. A first call should document data location, access, personnel, privilege and security requirements to determine whether the delivery model is even eligible." },
      { objection: "Quality would be difficult to control.", response: "Agreed. The useful discussion is about work instructions, reviewer qualifications, sampling, escalation and who retains final approval." },
    ],
    whyItWorks: "The call recognizes that legal support cannot be sold like generic back-office labor. It earns credibility by making scope boundaries, privilege, confidentiality and quality controls central to qualification.",
    whyBreakdown: [
      { label: "It separates judgment from process", text: "The opener does not suggest replacing counsel. It asks whether defined work is consuming the wrong level of internal capacity." },
      { label: "It qualifies the risk boundary", text: "Jurisdiction, privilege, security and review ownership determine whether the opportunity is legitimate." },
      { label: "It sells a scoping decision", text: "The CTA asks the buyer to test eligibility and operating fit before discussing a broad engagement." },
    ],
    personalization: [
      "Use a verified acquisition, legal-operations hire, regulatory project, litigation event or contract-volume signal without speculating about confidential matters.",
      "For general counsel, focus on internal legal capacity and risk. For legal operations, focus on workflow, systems, metrics and review controls.",
      "Use precise service language and distinguish legal support from legal advice.",
      "Never imply jurisdictional eligibility, privilege protection or guaranteed cost reduction without approved evidence.",
    ],
    alternatives: [
      { label: "Short version", description: "Use with a senior legal buyer.", script: "Hi [First Name], [Your Name] with [Company]. Is recurring contract, document or matter-support work pulling internal counsel away from the work only they can own?" },
      { label: "Voicemail", description: "Keep the scope controlled.", script: "Hi [First Name], this is [Your Name] with [Company]. I am reaching out about controlled external support for defined legal workflows, with internal counsel retaining judgment and approval. I will send a short note as well. My number is [Phone Number]." },
      { label: "Legal operations opener", description: "Use when workflow ownership is clear.", script: "Hi [First Name], [Your Name] with [Company]. Which legal workflow creates the most repeatable administrative or review burden for your team today?" },
    ],
    campaignPlan: {
      listFocus: "Corporate legal departments and established law firms with visible legal operations ownership, sufficient recurring workload and a serviceable jurisdiction and delivery model.",
      callAround: "An acquisition, contract backlog, matter spike, investigation, legal hiring constraint, regulatory project or new legal operations mandate.",
      meetingReady: "The buyer can define a potentially outsourceable workstream, volume, internal owner, jurisdiction, systems, risk controls and expected timing.",
      handoff: "Capture work type, volume, jurisdictions, current team and outside counsel, systems, data location, privilege and confidentiality requirements, reviewer qualifications, escalation path, decision team and deadline.",
    },
    faqs: [
      { question: "Who should an outsourced legal support cold call target?", answer: "Target the person who owns both workload and risk. That is often general counsel, a deputy general counsel, legal operations or a law-firm practice leader." },
      { question: "What qualifies an outsourced legal support appointment?", answer: "Confirm a defined workstream, sufficient volume, internal ownership, jurisdictional fit, confidentiality and privilege requirements, review standards and a plausible timeline." },
      { question: "Should the caller describe the service as legal advice?", answer: "Only when the provider is authorized to deliver that service in the relevant jurisdiction. Otherwise use precise legal-support language and keep legal judgment with qualified counsel." },
    ],
    aboutCallTeam: {
      heading: "Global B2B lead generation for legal and professional services",
      body: "CallTeam builds global B2B lead-generation and appointment-setting programs for offers where trust and qualification matter as much as demand. We research the legal buying group, call around verified business triggers and document the scope, controls and stakeholders before handoff. This resource shows how we position outsourced legal support without blurring the line between process support and legal judgment.",
      points: ["General counsel and legal-operations buyer mapping", "Risk-aware human calling and qualification", "Global scoping-call and opportunity handoff"],
    },
    related: ["software-procurement-advisory-cold-call-script", "outsourced-pmo-services-cold-call-script", "corporate-training-cold-call-script-financial-acumen"],
    relevantServices: [appointmentSetting("Reach general counsel, legal operations and practice leaders with a controlled scoping proposition."), outsourcedSdr("Add global research, human calling, qualification and risk-aware opportunity handoff."), sdrTraining("Train callers to discuss scope and controls without overstating legal capabilities." )],
  },
  {
    id: "CT-R030",
    slug: "private-credit-software-cold-call-script",
    title: "Private Credit Software Cold Call Script",
    seoTitle: "Private Credit Software Cold Call Script for Fund Teams",
    metaDescription: "Use this private credit software cold call script to reach investment and operations leaders, qualify workflow risk and book a focused platform demo.",
    publishedDate: "2026-08-17",
    category: "Financial Technology",
    industry: "Private credit funds, direct lenders and alternative asset managers",
    subindustry: "Deal pipeline, underwriting, portfolio monitoring and lender operations",
    serviceCategory: "Private credit and alternative investment software",
    icp: "Private credit managers and direct lenders whose deal, underwriting, covenant, portfolio or investor-reporting workflows rely on disconnected systems and manual handoffs.",
    companySize: "Specialist funds through global alternative asset managers",
    geography: "Global financial markets",
    buyers: ["Chief Investment Officer", "Head of Private Credit", "Chief Operating Officer", "Chief Technology Officer", "Head of Portfolio Management", "Director of Investment Operations", "Head of Data"],
    buyerLevel: "Investment, operations, technology and data buyer",
    objective: "Book a private-credit workflow demonstration",
    scenario: "The platform must support investment speed and portfolio control without forcing a generic software pitch onto a specialized credit process.",
    triggers: ["New private credit strategy", "Fund launch or close", "AUM growth", "Operations or data leadership hire", "Portfolio expansion", "Covenant-monitoring pressure", "Legacy platform review"],
    archetype: "Workflow-control diagnostic",
    primaryKeyword: "private credit software cold call script",
    secondaryKeywords: ["private debt software sales script", "alternative investment software cold call", "direct lending prospecting script", "private credit appointment setting"],
    filters: ["Finance", "Technology"],
    opening: "Hi [First Name], [Your Name] with [Company]. I am calling because private credit teams are scaling deal and portfolio activity while a surprising amount of underwriting, covenant and reporting work still moves through spreadsheets and disconnected systems. Where does that create the most friction for your team today?",
    questions: [
      "Is the larger problem in origination, underwriting, approvals, portfolio monitoring, covenant tracking or investor reporting?",
      "How does information move from the deal team into operations and ongoing portfolio management?",
      "Which data or reporting task becomes hardest as the number of borrowers, facilities or strategies grows?",
      "Is there a fund launch, platform review or operating initiative creating a decision window?",
    ],
    bridge: "We help private credit teams connect a defined investment and operating workflow while preserving the controls, data model and review steps the strategy requires. The first demonstration is built around one real process rather than a generic asset-management tour.",
    cta: "Would a focused session around one deal or portfolio workflow be useful to see whether the platform fits how your team actually operates?",
    fullScript: `Hi [First Name], [Your Name] with [Company]. I am calling because private credit teams are scaling deal and portfolio activity while a surprising amount of underwriting, covenant and reporting work still moves through spreadsheets and disconnected systems. Where does that create the most friction for your team today?

If relevant:
• Is the larger problem in origination, underwriting, approvals, portfolio monitoring, covenant tracking or investor reporting?
• How does information move from the deal team into operations and ongoing portfolio management?
• Which data or reporting task becomes hardest as the number of borrowers, facilities or strategies grows?
• Is there a fund launch, platform review or operating initiative creating a decision window?

Bridge: We help private credit teams connect a defined investment and operating workflow while preserving the controls, data model and review steps the strategy requires. The first demonstration is built around one real process rather than a generic asset-management tour.

CTA: Would a focused session around one deal or portfolio workflow be useful to see whether the platform fits how your team actually operates?`,
    objections: [
      { objection: "We built our own process.", response: "That may reflect the strategy better than an off-the-shelf system. The relevant question is whether maintenance, data handoffs or reporting now create enough operating burden to evaluate a different layer or approach." },
      { objection: "Our current platform already covers this.", response: "Then replacement may not be justified. Is there one workflow, asset type or reporting requirement the current environment still handles outside the platform?" },
      { objection: "Our credit process is too specialized.", response: "That is exactly what the demonstration should test. We would use a representative workflow, data structure and approval path rather than assume a generic model fits." },
      { objection: "Technology is not the priority.", response: "Understood. Is the operating friction low enough that growth can continue without adding risk, manual reconciliation or reporting delay? If so, the timing may not be right." },
    ],
    whyItWorks: "The script demonstrates category knowledge without pretending every private credit strategy operates the same way. It uses the buyer's workflow and control requirements to earn a narrow, credible platform evaluation.",
    whyBreakdown: [
      { label: "It speaks to the operating chain", text: "Origination, underwriting, monitoring and reporting are connected, and the call asks where the handoff breaks." },
      { label: "It respects strategy complexity", text: "The bridge does not force a generic asset-management workflow onto a specialized lending process." },
      { label: "It earns a real demonstration", text: "One representative deal or portfolio process gives investment, operations and technology buyers a shared evaluation point." },
    ],
    personalization: [
      "Use a verified fund launch, strategy expansion, operations hire or portfolio-growth signal and avoid guessing assets under management.",
      "For investment leaders, focus on decision visibility and portfolio oversight. For operations and technology, focus on data movement, controls and reporting.",
      "Adapt terminology to direct lending, specialty finance, real estate debt or the relevant strategy only when verified.",
      "Never promise investment performance, regulatory compliance or implementation speed without approved evidence.",
    ],
    alternatives: [
      { label: "Short version", description: "Use with a senior fund leader.", script: "Hi [First Name], [Your Name] with [Company]. Across underwriting, monitoring and reporting, where do spreadsheets or disconnected systems create the most friction today?" },
      { label: "Voicemail", description: "Leave a specialized workflow message.", script: "Hi [First Name], this is [Your Name] with [Company]. I am reaching out about connecting private credit deal and portfolio workflows without forcing a generic asset-management process. I will send a short note as well. My number is [Phone Number]." },
      { label: "Operations opener", description: "Use when data handoff is the likely problem.", script: "Hi [First Name], [Your Name] with [Company]. How cleanly does deal information move from underwriting and approval into ongoing portfolio monitoring and reporting?" },
    ],
    campaignPlan: {
      listFocus: "Global private credit funds, direct lenders and alternative managers with an active strategy, identifiable investment and operations leadership and a plausible workflow or data problem.",
      callAround: "A fund launch, new strategy, AUM or portfolio growth, operations hire, covenant initiative, data program, system review or expansion into a new lending segment.",
      meetingReady: "The buyer can identify a workflow, current systems, affected teams, portfolio or reporting complexity and a real platform-evaluation window.",
      handoff: "Capture strategies, deal and portfolio volume ranges, current systems, key workflows, data sources, approval and monitoring requirements, reporting outputs, integrations, security process, stakeholders and decision timing.",
    },
    faqs: [
      { question: "Who should a private credit software cold call target?", answer: "Map the buying group. Investment leadership owns the strategy, operations owns the process, and technology or data leaders often own integration, security and implementation." },
      { question: "What qualifies a private credit software demonstration?", answer: "Confirm a specific workflow or data problem, the current environment, affected investment and operating teams, required controls and a plausible evaluation window." },
      { question: "Should the caller lead with assets under management?", answer: "Only when the figure is verified and directly relevant. A stronger opener usually addresses the operating complexity created by growth rather than quoting an unconfirmed number." },
    ],
    aboutCallTeam: {
      heading: "Global B2B lead generation for financial technology companies",
      body: "CallTeam builds global B2B lead-generation and appointment-setting campaigns for complex financial technology offers. We map investment, operations, data and technology stakeholders; research account-level triggers; make the calls; and qualify the workflow before booking a demonstration. This script reflects that multi-stakeholder approach while avoiding unsupported claims about fund performance, compliance or platform fit.",
      points: ["Investment, operations, data and technology buyer mapping", "Specialized workflow-led calling and qualification", "Global B2B platform demonstrations and meeting handoff"],
    },
    related: ["income-verification-software-cold-call-script-credit-unions", "credit-union-identity-protection-cold-call-script", "software-procurement-advisory-cold-call-script"],
    relevantServices: [appointmentSetting("Reach investment, operations, data and technology buyers with a specialized workflow campaign."), outsourcedSdr("Add global account research, calling, multi-stakeholder qualification and platform-demo handoff."), aiGtm("Prioritize funds showing strategy launches, portfolio growth, operations hiring and platform-review signals." )],
  },
];

module.exports = waveFiveResources;
