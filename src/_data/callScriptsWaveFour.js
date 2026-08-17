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

const sdrTraining = (description) => ({
  title: "SDR Training Services",
  description,
  href: "https://www.callteam.ca/services/sdr-training/",
});

const aiGtm = (description) => ({
  title: "AI GTM Services",
  description,
  href: "https://www.callteam.ca/services/ai-gtm/",
});

const waveFourResources = [
  {
    id: "CT-R016",
    slug: "erp-competitive-replacement-cold-call-script",
    title: "ERP Competitive Replacement Cold Call Script",
    seoTitle: "ERP Replacement Cold Call Script for B2B Software Sales",
    metaDescription:
      "Use this ERP replacement cold call script to reach CFO, IT and operations buyers, uncover incumbent-system pressure and book a focused assessment.",
    publishedDate: "2026-08-17",
    category: "ERP Software",
    industry: "Mid-market distribution, manufacturing and services",
    subindustry: "ERP replacement and competitive displacement",
    serviceCategory: "Cloud ERP and business-management software",
    icp: "Organizations already running an ERP but facing pressure from licensing cost, customizations, integrations, usability, reporting or an upcoming commercial decision.",
    companySize: "100–2,000 employees",
    geography: "Global",
    buyers: [
      "CFO",
      "CIO",
      "Controller",
      "VP Finance",
      "IT Director",
      "ERP Program Manager",
      "Director of Operations",
    ],
    buyerLevel: "Economic, technical and operational buyer",
    objective: "Book a competitive ERP assessment",
    scenario: "The current ERP still functions, but the commercial or operating burden is becoming harder to defend.",
    triggers: [
      "ERP renewal",
      "Licensing price increase",
      "Failed implementation phase",
      "Acquisition or new entity",
      "Customization backlog",
      "Integration project",
      "Executive or ownership change",
    ],
    archetype: "Competitive-displacement diagnostic",
    primaryKeyword: "ERP replacement cold call script",
    secondaryKeywords: [
      "competitive displacement sales script",
      "ERP prospecting script",
      "software replacement call script",
      "ERP appointment-setting campaign",
    ],
    filters: ["Finance", "Technology", "Operations"],
    opening:
      "Hi [First Name], [Your Name] with [Company]. I know replacing an ERP is not something teams consider casually. I am calling because organizations often stay with a platform long after the cost, customization or reporting burden becomes difficult to defend. Is anything in the current ERP creating that kind of pressure?",
    questions: [
      "What creates the most frustration today: licensing cost, implementation overhead, customization, integrations, usability or data access?",
      "Is there an upcoming renewal or business event that could force the organization to make a decision?",
      "Would leadership seriously evaluate a replacement, or is the priority improving the current system?",
      "Which group feels the problem most clearly: finance, operations, IT or the people using the system every day?",
    ],
    bridge:
      "We help teams compare the cost and risk of staying with the current platform against the case for a different cloud ERP. The first conversation documents the business requirements and switching constraints. It is not a rip-and-replace proposal.",
    cta: "Would a brief assessment be useful to document the current gaps before the next renewal or planning cycle?",
    fullScript: `Hi [First Name], [Your Name] with [Company]. I know replacing an ERP is not something teams consider casually. I am calling because organizations often stay with a platform long after the cost, customization or reporting burden becomes difficult to defend. Is anything in the current ERP creating that kind of pressure?

If relevant:
• What creates the most frustration today: licensing cost, implementation overhead, customization, integrations, usability or data access?
• Is there an upcoming renewal or business event that could force the organization to make a decision?
• Would leadership seriously evaluate a replacement, or is the priority improving the current system?
• Which group feels the problem most clearly: finance, operations, IT or the people using the system every day?

Bridge: We help teams compare the cost and risk of staying with the current platform against the case for a different cloud ERP. The first conversation documents the business requirements and switching constraints. It is not a rip-and-replace proposal.

CTA: Would a brief assessment be useful to document the current gaps before the next renewal or planning cycle?`,
    objections: [
      {
        objection: "Switching would be too disruptive.",
        response:
          "That may outweigh the benefits. The purpose of the assessment is to measure both sides: the cost of staying and the risk, time and operating impact of changing.",
      },
      {
        objection: "We have customized too much.",
        response:
          "That is often the central question. A useful review separates processes that genuinely differentiate the business from custom work that accumulated around the old platform.",
      },
      {
        objection: "We just renewed.",
        response:
          "Understood. That may give the team enough time to document requirements, clean up process issues and evaluate alternatives before the next commercial deadline.",
      },
      {
        objection: "Our ERP works fine.",
        response:
          "Then a replacement campaign is probably not relevant. I would only ask whether teams are doing significant work outside the system to make it appear that way.",
      },
    ],
    whyItWorks:
      "This call does not attack the incumbent ERP or pretend switching is easy. It gives the buyer room to describe the pressure, identifies the deadline and turns a broad replacement pitch into a defensible assessment.",
    whyBreakdown: [
      {
        label: "It respects the switching cost",
        text: "ERP buyers know replacement affects data, integrations, users and daily operations. Acknowledging that reality gives the caller more credibility than claiming the change will be simple.",
      },
      {
        label: "It finds the decision trigger",
        text: "Renewals, price changes, acquisitions and failed projects create a real planning window. The call becomes stronger when it is tied to one of those moments.",
      },
      {
        label: "It qualifies repair versus replace",
        text: "Not every unhappy account should switch systems. The discovery separates a fixable operating problem from a serious platform-fit or commercial problem.",
      },
    ],
    personalization: [
      "Use one verified trigger, such as a renewal, acquisition, price increase, implementation issue or ERP-program hiring signal.",
      "For CFOs, lead with total cost, reporting and decision visibility. For CIOs and IT leaders, lead with integrations, support and customization debt.",
      "For operations buyers, ask where people work outside the ERP to keep orders, inventory or service moving.",
      "Do not name a competitor unless the account's current platform is publicly verified and the seller has a legitimate replacement case.",
      "Never promise a faster implementation, lower total cost or easier migration without a documented assessment.",
    ],
    alternatives: [
      {
        label: "Short version",
        description: "Use when an executive gives you only a few seconds.",
        script:
          "Hi [First Name], [Your Name] with [Company]. Quick question: is the current ERP creating enough cost, customization or reporting pressure that leadership would consider an alternative before the next renewal?",
      },
      {
        label: "Voicemail",
        description: "Leave the decision problem, not a product pitch.",
        script:
          "Hi [First Name], this is [Your Name] with [Company]. I am reaching out about how teams evaluate the cost of staying with an incumbent ERP against the disruption of replacing it. I will send a short note as well. My number is [Phone Number].",
      },
      {
        label: "CFO opener",
        description: "Use when finance owns the commercial case.",
        script:
          "Hi [First Name], [Your Name] with [Company]. Before the next ERP renewal, how will your team decide whether the current licensing, reporting and manual work still justify staying?",
      },
    ],
    campaignPlan: {
      listFocus: "Global mid-market distribution, manufacturing and service organizations with an established ERP, multiple entities, complex operations and visible finance, IT or transformation leadership.",
      callAround: "An ERP renewal, price increase, acquisition, implementation problem, customization backlog, new integration requirement or executive change.",
      meetingReady: "The buyer can identify a material commercial or operating problem, a decision window and the finance, IT or operations stakeholders who would assess alternatives.",
      handoff: "Capture the current ERP category, renewal timing, core frustrations, business processes affected, critical integrations, customization level, internal sponsor and tolerance for change.",
    },
    faqs: [
      {
        question: "How is this different from the accounting-software-to-ERP script?",
        answer:
          "This page targets organizations that already run an ERP and may replace it. The accounting-to-ERP script targets growing companies moving from basic accounting software toward their first connected ERP.",
      },
      {
        question: "What qualifies an ERP replacement appointment?",
        answer:
          "A qualified meeting needs more than dissatisfaction. Confirm a material business problem, a decision trigger, a plausible planning window and access to the people who understand cost, technology and operations.",
      },
      {
        question: "Should a competitive ERP campaign name the incumbent platform?",
        answer:
          "Only when the platform is verified and the message is relevant. Lead with the buyer's operating or commercial problem, not an unsupported attack on a competitor.",
      },
    ],
    aboutCallTeam: {
      heading: "Global B2B lead generation for complex ERP buying groups",
      body: "CallTeam builds B2B lead-generation and appointment-setting programs for offers that require finance, operations and technology buyers to agree. Our script library is drawn from real outbound campaign structures, then rewritten to remove private client details and unsupported claims. The result is practical sales guidance that can be used across global markets without pretending every ERP decision follows the same path.",
      points: [
        "Multi-stakeholder account research",
        "Caller-led qualification and meeting handoff",
        "Global outreach adapted to the target market",
      ],
    },
    related: [
      "erp-modernization-cold-call-script-for-cfos",
      "accounting-software-to-erp-cold-call-script",
      "software-procurement-advisory-cold-call-script",
    ],
    relevantServices: [
      appointmentSetting("Reach finance, IT and operations stakeholders with a replacement campaign built around a real decision trigger."),
      outsourcedSdr("Add global account research, calling, qualification and multi-stakeholder meeting handoff."),
      aiGtm("Prioritize accounts showing ERP renewal, transformation, acquisition and integration signals."),
    ],
  },
  {
    id: "CT-R018",
    slug: "security-guard-services-cold-call-script",
    title: "Security Guard Services Cold Call Script",
    seoTitle: "Security Guard Services Cold Call Script for B2B Sales",
    metaDescription:
      "Use this security guard services cold call script to reach facilities and property buyers, qualify coverage needs and secure a quote or backup-vendor call.",
    publishedDate: "2026-08-17",
    category: "Physical Security",
    industry: "Commercial real estate, construction, retail, industrial and events",
    subindustry: "Guarding, fire watch, concierge, gate and temporary coverage",
    serviceCategory: "Licensed contract security services",
    icp: "Organizations with facilities, properties, projects or events that need permanent, temporary, emergency or backup security coverage.",
    companySize: "Single-site and multi-site organizations",
    geography: "Local, regional and multi-market campaigns",
    buyers: [
      "Facilities Director",
      "Property Manager",
      "Security Director",
      "Operations Manager",
      "Procurement Manager",
      "Construction Project Manager",
      "Event Operations Director",
    ],
    buyerLevel: "Operations and procurement buyer",
    objective: "Secure a quote request or backup-vendor conversation",
    scenario: "The prospect may already have security coverage but still needs a credible option for emergencies, projects, shortages or comparison.",
    triggers: [
      "New property or worksite",
      "Construction project",
      "Security incident",
      "Fire-system outage",
      "Contract renewal",
      "Event or seasonal requirement",
      "Vendor service issue",
    ],
    archetype: "Backup-option-led",
    primaryKeyword: "security guard services cold call script",
    secondaryKeywords: [
      "security services sales script",
      "security guard sales script",
      "fire watch cold call script",
      "facility services prospecting script",
    ],
    filters: ["Operations", "Industry"],
    opening:
      "Hi [First Name], [Your Name] with [Company]. Quick question: do you oversee security coverage for your properties or sites, or would that sit with someone else?",
    questions: [
      "Are you fully covered today, or do you occasionally need temporary, emergency or backup guards?",
      "Which services matter most at the site: guarding, fire watch, concierge, gate control, traffic support or mobile patrol?",
      "When is the current vendor arrangement normally reviewed?",
      "What would a second provider have to prove before being approved as a backup?",
    ],
    bridge:
      "We provide licensed site-security coverage for ongoing requirements and short-notice gaps. Even when a primary provider is in place, some organizations keep a qualified second option ready for shortages, projects, emergencies or service problems.",
    cta: "Would it be useful to prepare a comparison quote or discuss what is required to become an approved backup provider?",
    fullScript: `Hi [First Name], [Your Name] with [Company]. Quick question: do you oversee security coverage for your properties or sites, or would that sit with someone else?

If relevant:
• Are you fully covered today, or do you occasionally need temporary, emergency or backup guards?
• Which services matter most at the site: guarding, fire watch, concierge, gate control, traffic support or mobile patrol?
• When is the current vendor arrangement normally reviewed?
• What would a second provider have to prove before being approved as a backup?

Bridge: We provide licensed site-security coverage for ongoing requirements and short-notice gaps. Even when a primary provider is in place, some organizations keep a qualified second option ready for shortages, projects, emergencies or service problems.

CTA: Would it be useful to prepare a comparison quote or discuss what is required to become an approved backup provider?`,
    objections: [
      {
        objection: "We already have a security company.",
        response:
          "That is fine. The conversation does not have to be about replacement. We can determine whether staying on file as a vetted backup would be useful for shortages, projects, emergencies or service issues.",
      },
      {
        objection: "We are not looking right now.",
        response:
          "Understood. Is there a normal contract review, busy season or project window when a comparison would be more useful?",
      },
      {
        objection: "Send pricing.",
        response:
          "Happy to prepare a quote once we know the location, hours, duties, risk level, supervision, licensing requirements and expected start date.",
      },
      {
        objection: "We only use approved vendors.",
        response:
          "That makes sense. What insurance, licensing, screening, reporting and procurement steps would a provider need to complete before being considered?",
      },
    ],
    whyItWorks:
      "The backup-provider angle removes the false choice between replacing the incumbent and ending the call. It lets the buyer discuss real gaps, gives procurement a sensible qualification path and makes the quote dependent on site facts.",
    whyBreakdown: [
      {
        label: "The opener finds the owner",
        text: "Security coverage may sit with facilities, property management, operations, security or procurement. The first question earns a referral without forcing a pitch on the wrong person.",
      },
      {
        label: "The backup angle lowers resistance",
        text: "A covered account can still need a second option for fire watch, absentee coverage, construction, events or an urgent service failure.",
      },
      {
        label: "The quote requires real scope",
        text: "Hours, duties, site risk and licensing affect delivery. Asking for those details prevents the caller from throwing out a meaningless price.",
      },
    ],
    personalization: [
      "Localize the script to the licensed service area. Never imply the provider can operate in a jurisdiction where coverage has not been confirmed.",
      "Choose one relevant use case: permanent guarding, fire watch, concierge, gate control, mobile patrol, construction coverage or an event.",
      "Use a verified property opening, project, incident, event or contract-review signal when one is publicly available.",
      "For property managers, focus on coverage and resident or tenant operations. For procurement, focus on approval requirements and quote scope.",
      "Do not claim response times, guard availability, licensing, insurance limits or service quality that the provider cannot document.",
    ],
    alternatives: [
      {
        label: "Short version",
        description: "Use when the buyer wants the reason immediately.",
        script:
          "Hi [First Name], [Your Name] with [Company]. Do your sites ever need temporary, emergency or backup security coverage even though a primary vendor is already in place?",
      },
      {
        label: "Voicemail",
        description: "Make the backup use case clear.",
        script:
          "Hi [First Name], this is [Your Name] with [Company]. I am reaching out about permanent and backup security coverage for your sites, including short-notice gaps and project needs. I will send a short note as well. My number is [Phone Number].",
      },
      {
        label: "Property-manager opener",
        description: "Use for commercial or residential property operations.",
        script:
          "Hi [First Name], [Your Name] with [Company]. If your current security provider had a coverage gap tomorrow, do you already have a second approved option for the property?",
      },
    ],
    campaignPlan: {
      listFocus: "Property groups, construction companies, industrial sites, retailers and event operators inside the provider's verified service and licensing area.",
      callAround: "A new site, active construction project, fire-system outage, public event, security incident, vendor complaint, contract renewal or seasonal staffing requirement.",
      meetingReady: "The buyer owns or influences site coverage, has a current or foreseeable requirement and can provide the location, hours, duties and vendor-approval process.",
      handoff: "Record the site address, service type, schedule, duties, risk conditions, start date, incumbent status, licensing requirements, procurement steps and decision-maker.",
    },
    faqs: [
      {
        question: "Can this script be used when the prospect already has a security provider?",
        answer:
          "Yes. Lead with backup, emergency, temporary or project coverage. Do not force an immediate replacement conversation unless the buyer describes a real service or contract problem.",
      },
      {
        question: "What qualifies a security-services appointment?",
        answer:
          "Confirm the buyer's responsibility, service location, likely coverage type, timing and approval path. A quote call without site and duty information is not properly qualified.",
      },
      {
        question: "Should a security cold call mention licensing?",
        answer:
          "Yes, but only accurately. Licensing and operating rules vary by location, so the campaign must match the provider's verified authority and service footprint.",
      },
    ],
    aboutCallTeam: {
      heading: "B2B lead generation for trust-based local services",
      body: "CallTeam builds outbound and appointment-setting programs for service companies that win through timing, credibility and operational fit. Our team can support global B2B lead-generation strategy while localizing each campaign to the provider's actual territory, licensing and service capabilities. We do not turn a regulated local offer into a vague global claim.",
      points: [
        "Territory and buyer-list design",
        "Human calling and quote qualification",
        "Clear site-level meeting handoffs",
      ],
    },
    related: [
      "parcel-locker-cold-call-script-property-managers",
      "field-inspection-software-cold-call-script",
      "frontline-workforce-software-cold-call-script",
    ],
    relevantServices: [
      appointmentSetting("Reach facilities, property, security and procurement buyers with a location-specific campaign."),
      outsourcedSdr("Add list building, calling, quote qualification and clean handoff to the local sales team."),
      sdrTraining("Train callers to handle incumbent-provider and pricing objections without making unsupported promises."),
    ],
  },
  {
    id: "CT-R019",
    slug: "parcel-locker-cold-call-script-property-managers",
    title: "Parcel Locker Cold Call Script for Property Managers",
    seoTitle: "Parcel Locker Cold Call Script for Property Managers",
    metaDescription:
      "Use this parcel locker cold call script to reach property managers, uncover package-handling problems and book a portfolio review or site assessment.",
    publishedDate: "2026-08-17",
    category: "PropTech",
    industry: "Multifamily and commercial real estate",
    subindustry: "Package management and resident operations",
    serviceCategory: "Smart parcel-locker systems",
    icp: "Apartment, condominium, student-housing and commercial portfolios dealing with growing parcel volume, theft concerns, clutter or staff handling time.",
    companySize: "50+ units or multi-property portfolios",
    geography: "North America and global markets",
    buyers: [
      "Property Manager",
      "Director of Residential Operations",
      "Facilities Manager",
      "Asset Manager",
      "VP Property Management",
      "Resident Experience Director",
      "Development Manager",
    ],
    buyerLevel: "Property operations and asset buyer",
    objective: "Book a property-needs review or site assessment",
    scenario: "Package handling consumes staff time, fills common areas or creates resident and tenant complaints.",
    triggers: [
      "Package-volume complaints",
      "Lobby or mailroom clutter",
      "Theft or lost-package incident",
      "New development or renovation",
      "Staffing reduction",
      "Resident-experience initiative",
      "Portfolio technology review",
    ],
    archetype: "Visible-operational-problem-led",
    primaryKeyword: "parcel locker cold call script",
    secondaryKeywords: [
      "property management cold call script",
      "parcel locker sales script",
      "PropTech cold call script",
      "apartment technology sales script",
    ],
    filters: ["Operations", "Technology", "Industry"],
    opening:
      "Hi [First Name], [Your Name] with [Company]. I am calling about package management at your properties. Are deliveries handled by staff today, or do residents and tenants have a secure self-service pickup option?",
    questions: [
      "Are packages piling up or consuming staff time during high-volume periods?",
      "Have theft, misplaced deliveries or resident complaints become a recurring issue?",
      "Would a solution need to support one building, a new development or an entire portfolio?",
      "What would matter most in a site review: space, capacity, carrier access, resident use or system integration?",
    ],
    bridge:
      "We help properties move deliveries into a secure self-service workflow so residents can collect packages without turning the front desk, leasing office or lobby into a package room.",
    cta: "Would a short property review be useful to estimate the workflow, footprint and locker capacity you would need?",
    fullScript: `Hi [First Name], [Your Name] with [Company]. I am calling about package management at your properties. Are deliveries handled by staff today, or do residents and tenants have a secure self-service pickup option?

If relevant:
• Are packages piling up or consuming staff time during high-volume periods?
• Have theft, misplaced deliveries or resident complaints become a recurring issue?
• Would a solution need to support one building, a new development or an entire portfolio?
• What would matter most in a site review: space, capacity, carrier access, resident use or system integration?

Bridge: We help properties move deliveries into a secure self-service workflow so residents can collect packages without turning the front desk, leasing office or lobby into a package room.

CTA: Would a short property review be useful to estimate the workflow, footprint and locker capacity you would need?`,
    objections: [
      {
        objection: "We do not have enough space.",
        response:
          "Space is often the first design constraint. A site review can determine whether the available footprint, package volume and access pattern support a practical configuration.",
      },
      {
        objection: "Staff already handles it.",
        response:
          "Understood. The comparison is whether staff time, storage, chain of custody and resident experience justify a more self-service process.",
      },
      {
        objection: "Residents will not use it.",
        response:
          "Adoption depends on access, notifications, placement and the building workflow. Those questions should be part of the evaluation, not assumed away.",
      },
      {
        objection: "We are not changing anything across the whole portfolio.",
        response:
          "A portfolio commitment is not required for the first discussion. One building with a visible package problem can be the right place to assess fit.",
      },
    ],
    whyItWorks:
      "The script starts with a problem the property buyer can see: staff handling, storage, theft and complaints. It then qualifies the building workflow and gives the meeting a concrete purpose around space, capacity and fit.",
    whyBreakdown: [
      {
        label: "The problem is easy to recognize",
        text: "The caller does not need to teach the buyer a new category. Property teams already know whether deliveries create clutter, interruptions or resident complaints.",
      },
      {
        label: "It qualifies property reality",
        text: "Unit count alone is not enough. Package volume, available space, carrier access, building layout and staff workflow determine whether a locker system makes sense.",
      },
      {
        label: "The next step is site-specific",
        text: "A capacity and workflow review is more credible than a generic product demo because it connects the system to one actual property or portfolio need.",
      },
    ],
    personalization: [
      "Identify whether the account owns or manages apartments, condominiums, student housing, mixed-use property or commercial buildings.",
      "Use a verified development, renovation, staffing, package complaint or resident-experience signal when one exists.",
      "For on-site property managers, focus on daily package flow. For asset and portfolio leaders, focus on standards, rollout requirements and resident experience.",
      "Ask about the current mailroom or front-desk workflow before discussing hardware, software or locker size.",
      "Do not claim theft reduction, labor savings, property-value improvement or adoption levels without approved evidence.",
    ],
    alternatives: [
      {
        label: "Short version",
        description: "Use when the property manager wants one direct question.",
        script:
          "Hi [First Name], [Your Name] with [Company]. Are deliveries at your properties still handled by staff, or do residents have a secure self-service pickup process?",
      },
      {
        label: "Voicemail",
        description: "Name the property workflow clearly.",
        script:
          "Hi [First Name], this is [Your Name] with [Company]. I am reaching out about package volume, staff handling and secure resident pickup at your properties. I will send a short note as well. My number is [Phone Number].",
      },
      {
        label: "Portfolio-buyer opener",
        description: "Use for regional operations and asset leaders.",
        script:
          "Hi [First Name], [Your Name] with [Company]. Across your portfolio, which properties create the most package-handling work or resident complaints today?",
      },
    ],
    campaignPlan: {
      listFocus: "Global and North American multifamily, student-housing, condominium and commercial portfolios with enough unit count, package activity or resident-service complexity to justify a property review.",
      callAround: "A new development, renovation, visible resident complaint, theft event, portfolio technology program, lobby redesign or staffing change.",
      meetingReady: "The buyer can identify a building or portfolio problem, explain the current delivery workflow and involve property operations, facilities or asset stakeholders.",
      handoff: "Capture the property type, unit or tenant count, package volume, current storage and notification process, available space, carrier access, resident concerns, integration needs and decision path.",
    },
    faqs: [
      {
        question: "Who should a parcel-locker campaign contact first?",
        answer:
          "Start with the person who owns daily property operations or resident experience. For multi-property decisions, add facilities, asset management, portfolio operations and development stakeholders.",
      },
      {
        question: "What qualifies a parcel-locker site assessment?",
        answer:
          "Confirm a real package workflow, suitable property type, visible operating problem and access to basic facts about volume, space, users and decision ownership.",
      },
      {
        question: "Should the call lead with package theft?",
        answer:
          "Only when it is a verified concern. Staff time, clutter, missed deliveries and resident convenience are often safer and equally relevant starting points.",
      },
    ],
    aboutCallTeam: {
      heading: "Global B2B lead generation for PropTech and property operations",
      body: "CallTeam helps technology and service companies reach the people who run buildings, portfolios and resident operations. Our global B2B lead-generation approach combines account research, human calling, buyer qualification and a practical meeting handoff. The campaign stays focused on the property workflow, not a generic technology pitch.",
      points: [
        "Property and portfolio buyer mapping",
        "Problem-led calls built around real operating triggers",
        "Qualified site-review and demonstration handoffs",
      ],
    },
    related: [
      "security-guard-services-cold-call-script",
      "frontline-workforce-software-cold-call-script",
      "field-inspection-software-cold-call-script",
    ],
    relevantServices: [
      appointmentSetting("Book property-needs reviews with operations, facilities, asset and resident-experience buyers."),
      outsourcedSdr("Add global property research, calling, qualification and site-level meeting handoff."),
      aiGtm("Prioritize accounts showing development, renovation, staffing and resident-experience signals."),
    ],
  },
  {
    id: "CT-R020",
    slug: "outsourced-pmo-services-cold-call-script",
    title: "Outsourced PMO Services Cold Call Script",
    seoTitle: "Project Management Services Cold Call Script for PMO Sales",
    metaDescription:
      "Use this outsourced PMO cold call script to reach operations and transformation leaders, uncover delivery gaps and book a focused project diagnostic.",
    publishedDate: "2026-08-17",
    category: "Professional Services",
    industry: "Consulting, technology, transformation and high-growth companies",
    subindustry: "Project delivery and transformation governance",
    serviceCategory: "Outsourced project-management office services",
    icp: "Organizations running multiple projects where scope, ownership, reporting or delivery capacity breaks down before leadership gets a clear warning.",
    companySize: "50–2,000 employees",
    geography: "Global",
    buyers: [
      "COO",
      "VP Operations",
      "PMO Director",
      "Transformation Director",
      "Professional Services Director",
      "Delivery Director",
      "Chief of Staff",
    ],
    buyerLevel: "Executive and program buyer",
    objective: "Book a project-delivery diagnostic",
    scenario: "The company has project tools but still lacks reliable ownership, reporting, capacity or early warning across important work.",
    triggers: [
      "Transformation program",
      "ERP or cloud rollout",
      "Acquisition integration",
      "Missed project deadline",
      "Project-management hiring",
      "Rapid client growth",
      "Troubled strategic initiative",
    ],
    archetype: "Tool-versus-execution-gap",
    primaryKeyword: "project management services cold call script",
    secondaryKeywords: [
      "outsourced PMO cold call script",
      "PMO sales script",
      "consulting services cold call",
      "outsourced project management script",
    ],
    filters: ["Operations", "Services"],
    opening:
      "Hi [First Name], [Your Name] with [Company]. Quick question: even with project tools in place, do important initiatives still drift on scope, budget or deadlines before leadership gets a clear warning?",
    questions: [
      "Where does delivery break down most often: planning, ownership, reporting, change control or resource capacity?",
      "Are project managers embedded in each team, centralized or pulled in only after something slips?",
      "Is there one active program where better governance or extra delivery capacity would have an immediate impact?",
      "What does leadership need to see earlier than it does today?",
    ],
    bridge:
      "We provide plug-in PMO capacity, including project managers, analysts, governance and reporting, to create visibility and accountability without forcing the organization to build a permanent office before the need is clear.",
    cta: "Would a 15-minute delivery diagnostic around one active program be useful?",
    fullScript: `Hi [First Name], [Your Name] with [Company]. Quick question: even with project tools in place, do important initiatives still drift on scope, budget or deadlines before leadership gets a clear warning?

If relevant:
• Where does delivery break down most often: planning, ownership, reporting, change control or resource capacity?
• Are project managers embedded in each team, centralized or pulled in only after something slips?
• Is there one active program where better governance or extra delivery capacity would have an immediate impact?
• What does leadership need to see earlier than it does today?

Bridge: We provide plug-in PMO capacity, including project managers, analysts, governance and reporting, to create visibility and accountability without forcing the organization to build a permanent office before the need is clear.

CTA: Would a 15-minute delivery diagnostic around one active program be useful?`,
    objections: [
      {
        objection: "We already use project-management software.",
        response:
          "The tool may be fine. The review focuses on ownership, decisions, reporting, escalation and follow-through, which software alone does not create.",
      },
      {
        objection: "We have project managers.",
        response:
          "Good. Outside support may still help with portfolio visibility, a temporary workload surge, specialized governance or one troubled initiative.",
      },
      {
        objection: "We do not want more process.",
        response:
          "Agreed. The goal is the minimum governance required to surface risk early, make decisions clear and keep delivery moving.",
      },
      {
        objection: "We cannot outsource accountability.",
        response:
          "Correct. Executives and program owners keep accountability. External PMO capacity supports the structure, information and follow-through around those decisions.",
      },
    ],
    whyItWorks:
      "The call separates project software from delivery discipline, names the executive visibility problem and anchors discovery to one live program. That makes the meeting useful even when the buyer already has tools and internal project managers.",
    whyBreakdown: [
      {
        label: "It avoids the software trap",
        text: "Many teams own project tools but still struggle with unclear decisions, inconsistent reporting or overloaded managers. The script goes after the operating gap.",
      },
      {
        label: "It finds where delivery breaks",
        text: "Planning, ownership, reporting, change control and capacity require different responses. The caller needs to know which failure is actually present.",
      },
      {
        label: "It starts with one program",
        text: "A focused diagnostic around an active initiative is easier to evaluate than a broad proposal to redesign project governance across the company.",
      },
    ],
    personalization: [
      "Name one verified initiative, such as an ERP rollout, cloud program, acquisition integration, client-delivery expansion or transformation office buildout.",
      "For COOs and executives, focus on visibility, ownership and decisions. For PMO leaders, focus on capacity, standards and portfolio reporting.",
      "For professional-services leaders, connect the conversation to client delivery, utilization, handoffs and project margin only when those issues are relevant.",
      "Do not imply the internal project team has failed. Position outside capacity as reinforcement around a specific gap or workload period.",
      "Never promise every project will finish on time or budget. Qualify the operating conditions first.",
    ],
    alternatives: [
      {
        label: "Short version",
        description: "Use when an operations leader wants the issue immediately.",
        script:
          "Hi [First Name], [Your Name] with [Company]. Even with project tools and managers in place, where do initiatives still lose control: ownership, reporting, scope or capacity?",
      },
      {
        label: "Voicemail",
        description: "Name the execution gap in plain language.",
        script:
          "Hi [First Name], this is [Your Name] with [Company]. I am reaching out about project-delivery visibility and temporary PMO capacity around important programs. I will send a short note as well. My number is [Phone Number].",
      },
      {
        label: "Transformation-leader opener",
        description: "Use for leaders running one major change program.",
        script:
          "Hi [First Name], [Your Name] with [Company]. On the current transformation program, which risk does leadership learn about later than it should?",
      },
    ],
    campaignPlan: {
      listFocus: "Global consulting, technology, transformation and high-growth organizations with multiple active projects, visible program hiring or a major change initiative.",
      callAround: "An ERP or cloud rollout, acquisition integration, delayed program, new transformation office, rapid client growth, PM hiring or a public strategic initiative.",
      meetingReady: "The buyer can name one active program, a specific delivery gap and the executive or program owner who would evaluate additional PMO capacity.",
      handoff: "Capture the initiative, business outcome, current governance, project roles, reporting rhythm, visible failure point, decision owner, resource gap and timing.",
    },
    faqs: [
      {
        question: "How do you cold call a company that already has a PMO?",
        answer:
          "Do not pitch replacement. Ask whether the internal PMO needs temporary capacity, specialized support, portfolio visibility or help stabilizing one program.",
      },
      {
        question: "What qualifies an outsourced PMO appointment?",
        answer:
          "A useful meeting has an active initiative, a defined delivery or visibility gap, a plausible need for outside capacity and access to the program or executive owner.",
      },
      {
        question: "Should the call lead with governance?",
        answer:
          "Usually not as an abstract concept. Start with the concrete failure the buyer sees, such as late warnings, unclear ownership, missed decisions or overloaded project managers.",
      },
    ],
    aboutCallTeam: {
      heading: "Global B2B lead generation for complex professional services",
      body: "CallTeam turns advisory and delivery offers into direct conversations that senior buyers can understand. Our global B2B lead-generation programs combine account selection, trigger research, human calling and qualification. We help sellers explain why outside capacity matters without burying the buyer in consulting language or promising outcomes that depend on the client's execution.",
      points: [
        "Executive and program-buyer targeting",
        "Trigger-led professional-services conversations",
        "Detailed qualification before calendar handoff",
      ],
    },
    related: [
      "erp-competitive-replacement-cold-call-script",
      "technical-cloud-migration-discovery-call-script",
      "software-procurement-advisory-cold-call-script",
    ],
    relevantServices: [
      appointmentSetting("Book project-delivery diagnostics with operations, transformation and PMO leaders."),
      outsourcedSdr("Add global account research, calling, qualification and executive-ready handoff."),
      aiGtm("Prioritize accounts showing transformation, integration, project hiring and delivery-pressure signals."),
    ],
  },
  {
    id: "CT-R021",
    slug: "corporate-training-cold-call-script-financial-acumen",
    title: "Corporate Training Cold Call Script for Financial Acumen",
    seoTitle: "Corporate Training Cold Call Script for Learning and Development",
    metaDescription:
      "Use this corporate training cold call script to reach L&D, finance and enablement buyers, qualify financial-acumen needs and book a focused demonstration.",
    publishedDate: "2026-08-17",
    category: "Corporate Learning",
    industry: "Cross-industry employers",
    subindustry: "Business and financial-acumen training",
    serviceCategory: "Simulation-based employee training",
    icp: "Organizations that need managers, salespeople, emerging leaders or operational teams to understand financial consequences and business tradeoffs.",
    companySize: "100+ employees",
    geography: "Global",
    buyers: [
      "Chief Learning Officer",
      "Learning and Development Director",
      "CHRO",
      "CFO",
      "Sales Enablement Director",
      "Operations Training Manager",
      "Leadership Development Director",
    ],
    buyerLevel: "Learning, finance and enablement buyer",
    objective: "Book a training-needs conversation or demonstration",
    scenario: "Traditional finance training feels abstract or does not change how employees make operating and commercial decisions.",
    triggers: [
      "Manager-development program",
      "New leadership cohort",
      "Sales enablement initiative",
      "Margin pressure",
      "Annual budget cycle",
      "Business-literacy program",
      "Post-acquisition integration",
    ],
    archetype: "Learning-outcome-led",
    primaryKeyword: "corporate training cold call script",
    secondaryKeywords: [
      "training services sales script",
      "learning and development cold call",
      "employee training prospecting script",
      "financial acumen training sales script",
    ],
    filters: ["Services", "Finance"],
    opening:
      "Hi [First Name], [Your Name] with [Company]. Quick question: are you doing anything this year to help managers or frontline leaders understand how their day-to-day decisions affect margin, cash flow and the broader business?",
    questions: [
      "Which audience needs the strongest financial understanding: managers, sales, operations or emerging leaders?",
      "What behavior or decision should change after the training?",
      "Have lecture-based or online courses produced enough engagement and practical use?",
      "Would finance, learning and the business unit agree on what success should look like?",
    ],
    bridge:
      "We use interactive business simulations so teams can make decisions, see the financial consequences and connect their role to company performance in a practical setting.",
    cta: "Would a short demonstration be useful to see whether the format fits your audience and learning objectives?",
    fullScript: `Hi [First Name], [Your Name] with [Company]. Quick question: are you doing anything this year to help managers or frontline leaders understand how their day-to-day decisions affect margin, cash flow and the broader business?

If relevant:
• Which audience needs the strongest financial understanding: managers, sales, operations or emerging leaders?
• What behavior or decision should change after the training?
• Have lecture-based or online courses produced enough engagement and practical use?
• Would finance, learning and the business unit agree on what success should look like?

Bridge: We use interactive business simulations so teams can make decisions, see the financial consequences and connect their role to company performance in a practical setting.

CTA: Would a short demonstration be useful to see whether the format fits your audience and learning objectives?`,
    objections: [
      {
        objection: "We already have finance training.",
        response:
          "Good. The useful question is whether employees can apply it to operating and commercial decisions, not simply complete a course.",
      },
      {
        objection: "Our people are not financial.",
        response:
          "That is the point of the format: make the concepts usable without expecting accounting expertise or turning the session into a finance lecture.",
      },
      {
        objection: "Training budgets are tight.",
        response:
          "Understood. We can first establish the audience, business outcome and whether the program solves a priority worth funding before discussing a broader rollout.",
      },
      {
        objection: "Online learning is easier to scale.",
        response:
          "It often is. The comparison is whether scale alone produces the practice, discussion and decision-making behavior the program is meant to create.",
      },
    ],
    whyItWorks:
      "The script connects training to real business decisions, qualifies the audience and desired behavior, and makes the demonstration about learning design and application rather than entertainment or course completion.",
    whyBreakdown: [
      {
        label: "It starts with business impact",
        text: "Margin, cash flow and tradeoffs give finance, learning and operations a shared reason to care about the program.",
      },
      {
        label: "It defines the learner",
        text: "Managers, sales teams, operations and emerging leaders need different examples. The caller identifies the audience before pitching a curriculum.",
      },
      {
        label: "It asks for changed behavior",
        text: "A useful training conversation is about what people should decide or do differently, not only attendance, completion or satisfaction scores.",
      },
    ],
    personalization: [
      "Use the employer's real audience, such as new managers, sales leaders, plant supervisors, account executives or a high-potential cohort.",
      "Tie the call to a verified leadership program, enablement initiative, budget cycle, margin focus or acquisition integration when one exists.",
      "For L&D buyers, focus on learning design and application. For CFOs, focus on decision quality. For enablement, focus on commercial judgment.",
      "Ask what behavior should change before describing the simulation or delivery format.",
      "Do not promise financial mastery, measurable profit improvement or behavior change without a defined program and evaluation method.",
    ],
    alternatives: [
      {
        label: "Short version",
        description: "Use when an L&D buyer wants the learning need immediately.",
        script:
          "Hi [First Name], [Your Name] with [Company]. Are your managers being taught how everyday operating decisions affect margin and cash flow, or is financial acumen still mostly learned on the job?",
      },
      {
        label: "Voicemail",
        description: "Connect learning to practical decisions.",
        script:
          "Hi [First Name], this is [Your Name] with [Company]. I am reaching out about practical financial-acumen training for managers and operational teams. I will send a short note as well. My number is [Phone Number].",
      },
      {
        label: "CFO opener",
        description: "Use when finance sponsors the program.",
        script:
          "Hi [First Name], [Your Name] with [Company]. Which management decisions would improve most if leaders understood their effect on margin, working capital and cash flow?",
      },
    ],
    campaignPlan: {
      listFocus: "Global employers with active manager development, leadership, sales enablement, operational training or business-literacy programs and enough learner scale to justify a structured solution.",
      callAround: "A new leadership cohort, annual planning cycle, margin program, manager academy, sales transformation, acquisition integration or visible L&D hiring.",
      meetingReady: "The buyer can identify a learner group, a business decision or behavior to improve, a sponsor and a plausible program window.",
      handoff: "Capture the audience, cohort size, business objective, current training, delivery preferences, regions and languages, sponsor, success measures, budget timing and decision process.",
    },
    faqs: [
      {
        question: "Who should a corporate training cold call target?",
        answer:
          "Start with the owner of the learning outcome. That may be L&D, leadership development, sales enablement, operations training, HR or finance, depending on the audience and business goal.",
      },
      {
        question: "What qualifies a financial-acumen training appointment?",
        answer:
          "Confirm a defined learner group, a business decision or behavior that needs improvement, a sponsor and a realistic delivery window. Interest in a generic course is not enough.",
      },
      {
        question: "Should the first meeting be a product demo?",
        answer:
          "A short demonstration can help, but it should follow basic discovery. Use the buyer's audience and learning objective so the example shows relevant decisions rather than a generic simulation.",
      },
    ],
    aboutCallTeam: {
      heading: "Global B2B lead generation for learning and enablement offers",
      body: "CallTeam helps corporate-learning, training and enablement providers reach the people who own the business outcome, not only the training calendar. Our global B2B lead-generation programs use buyer research, human calling and qualification to connect learning offers with a real audience, decision problem and program window. This resource reflects the same practical approach used across our wider outbound library.",
      points: [
        "Learning, finance and business-sponsor mapping",
        "Simple outcome-led call positioning",
        "Qualified global program and demonstration handoffs",
      ],
    },
    related: [
      "outsourced-pmo-services-cold-call-script",
      "frontline-workforce-software-cold-call-script",
      "erp-modernization-cold-call-script-for-cfos",
    ],
    relevantServices: [
      appointmentSetting("Reach learning, finance, enablement and operations buyers with an outcome-led campaign."),
      outsourcedSdr("Add global account research, calling, qualification and program-level meeting handoff."),
      sdrTraining("Train callers to sell learning outcomes without turning the call into a course catalogue."),
    ],
  },
];

module.exports = waveFourResources;
