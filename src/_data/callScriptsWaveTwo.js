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

const waveTwoResources = [
  {
    id: "CT-R002",
    slug: "technical-cloud-migration-discovery-call-script",
    title: "Technical Cloud Migration Discovery Call Script",
    seoTitle: "Technical Cloud Migration Discovery Call Script",
    metaDescription:
      "Use this cloud migration discovery call script to reach cloud architects and infrastructure leaders, qualify technical risk and book a focused working session.",
    category: "Cloud and IT Infrastructure",
    industry: "Cross-industry enterprise technology",
    subindustry: "Cloud engineering, architecture and platform operations",
    serviceCategory: "Cloud migration services and automation",
    icp: "Organizations with complex application estates, custom configurations, workload dependencies or limited internal cloud capacity.",
    companySize: "250+ employees",
    geography: "Global",
    buyers: [
      "Director of Cloud Engineering",
      "Enterprise Architect",
      "Cloud Architect",
      "Infrastructure Manager",
      "Platform Engineering Lead",
      "Solutions Architect",
    ],
    buyerLevel: "Technical evaluator and influencer",
    objective: "Book a technical cloud-migration discovery session",
    scenario: "The team is evaluating migration feasibility, dependencies and implementation risk.",
    triggers: [
      "Data-center exit",
      "Hardware refresh",
      "Migration backlog",
      "Application dependency concerns",
      "Performance requirements",
      "Cloud skills gap",
      "Security architecture review",
    ],
    archetype: "Technical current-state-led",
    primaryKeyword: "cloud migration discovery call script",
    secondaryKeywords: [
      "cloud migration sales questions",
      "cloud architect cold call script",
      "technical discovery script",
      "cloud migration appointment-setting script",
    ],
    filters: ["Technology", "Operations"],
    opening:
      "Hi [First Name], this is [Your Name] with [Company]. We work with technical teams planning cloud migrations where the hard part is not choosing the cloud. It is mapping dependencies, custom configurations and performance risk. Are you already assessing workloads, or are you still working out what can move safely?",
    questions: [
      "How large and complex is the environment you are assessing?",
      "Which dependencies or custom configurations create the most concern?",
      "Have you established performance, security and validation requirements for the move?",
      "Does your team have the capacity and cloud experience to run the migration internally?",
    ],
    bridge:
      "That is where we normally help. We document the current environment, map workload dependencies, identify likely blockers and build a phased technical plan before anything is moved.",
    cta: "Would a technical working session with a migration specialist be useful to review the environment and the main risks?",
    fullScript: `Hi [First Name], this is [Your Name] with [Company]. We work with technical teams planning cloud migrations where the hard part is not choosing the cloud. It is mapping dependencies, custom configurations and performance risk.

Are you already assessing workloads, or are you still working out what can move safely?

If relevant:
• How large and complex is the environment you are assessing?
• Which dependencies or custom configurations create the most concern?
• Have you established performance, security and validation requirements for the move?
• Does your team have the capacity and cloud experience to run the migration internally?

Bridge: That is where we normally help. We document the current environment, map workload dependencies, identify likely blockers and build a phased technical plan before anything is moved.

CTA: Would a technical working session with a migration specialist be useful to review the environment and the main risks?`,
    objections: [
      {
        objection: "Our environment has too many custom configurations.",
        response:
          "That is exactly what the discovery session should examine. The first step is documenting those configurations and deciding what can move, what needs adapting and what should stay where it is.",
      },
      {
        objection: "We are concerned about performance after migration.",
        response:
          "That is a fair concern. We would first establish the current performance requirements and validation criteria rather than assuming every workload will behave the same way in a new environment.",
      },
      {
        objection: "Security still has to approve this.",
        response:
          "They should be involved early. We can make security architecture, access controls, data handling and compliance requirements part of the technical review.",
      },
      {
        objection: "We do not have enough cloud expertise internally.",
        response:
          "That is useful to know. The next conversation can separate what your team wants to own from where outside planning, migration support or knowledge transfer would help.",
      },
    ],
    whyItWorks:
      "The script speaks to the technical buyer's real concern: whether the workloads can move safely. It does not repeat the executive cloud page, which focuses on cost, strategy and business risk.",
    whyBreakdown: [
      {
        label: "It starts with technical reality",
        text: "Dependencies, custom configurations and performance are familiar problems for cloud and infrastructure teams.",
      },
      {
        label: "The questions reveal migration readiness",
        text: "The caller learns whether the team is exploring, planning or already blocked inside an active migration.",
      },
      {
        label: "The meeting has a clear job",
        text: "A technical working session is more useful than a generic cloud-services demonstration.",
      },
    ],
    personalization: [
      "Name the environment or workload type only when you have verified it.",
      "For architects, focus on dependencies and target-state design. For infrastructure managers, focus on performance, validation and operating capacity.",
      "Use a real trigger such as a data-center exit, renewal or migration backlog when available.",
      "Do not introduce savings, migration-speed or uptime claims without approved evidence.",
    ],
    alternatives: [
      {
        label: "Short version",
        description: "For a technical buyer who gives you only a few seconds.",
        script:
          "Hi [First Name], [Your Name] with [Company]. Quick question: is the harder part of your cloud plan deciding what should move, or mapping the dependencies and risk around moving it?",
      },
      {
        label: "Voicemail",
        description: "Leave a technical reason for the call without listing features.",
        script:
          "Hi [First Name], this is [Your Name] with [Company]. I am reaching out about workload dependencies, migration readiness and technical risk in cloud projects. I will send a short note as well. My number is [Phone Number].",
      },
      {
        label: "Architecture opener",
        description: "Use for enterprise and cloud architects.",
        script:
          "Hi [First Name], [Your Name] with [Company]. When you look at the current application estate, which dependencies or custom configurations are creating the biggest migration question?",
      },
    ],
    campaignPlan: {
      listFocus: "Organizations with active cloud, data-center, infrastructure-refresh or migration hiring signals. Start with architecture, cloud engineering and infrastructure leadership.",
      callAround: "A data-center exit, hardware refresh, cloud mandate, migration backlog or a visible need for external cloud capacity.",
      meetingReady: "The buyer can name an active environment, workload group, technical blocker or planning deadline that deserves a deeper review.",
      handoff: "Record the current environment, migration stage, main dependency, technical stakeholders, security involvement and expected timeline.",
    },
    faqs: [
      {
        question: "How is this different from the CIO cloud migration script?",
        answer: "This version is for technical evaluators. It focuses on dependencies, configurations, performance and migration readiness. The CIO version focuses on business case, risk and executive priorities.",
      },
      {
        question: "What should qualify a cloud migration appointment?",
        answer: "A useful meeting has a defined environment or workload group, a technical concern, a project trigger and the right architecture or infrastructure stakeholder involved.",
      },
    ],
    related: [
      "cloud-migration-cold-call-script-for-cios",
      "cybersecurity-risk-assessment-cold-call-script",
      "itsm-software-cold-call-script",
    ],
    relevantServices: [
      appointmentSetting("Reach cloud, architecture and infrastructure buyers with a technical discovery-led campaign."),
      outsourcedSdr("Add managed account research, calling, qualification and technical meeting handoff."),
      sdrTraining("Train callers to qualify technical buyers without pretending to be solution architects."),
    ],
  },
  {
    id: "CT-R008",
    slug: "tourism-booking-software-cold-call-script",
    title: "Tourism Booking Software Cold Call Script",
    seoTitle: "Tourism Booking Software Cold Call Script",
    metaDescription:
      "Use this booking software cold call script to reach tour operators and attractions, uncover fragmented booking work and book a tailored product demonstration.",
    category: "Travel Technology",
    industry: "Tourism, attractions and leisure",
    subindustry: "Tours, activities, venues and visitor experiences",
    serviceCategory: "Booking and visitor-management software",
    icp: "Tour operators, attractions, activity providers and venues managing bookings, waivers, vouchers, memberships or staff across disconnected tools.",
    companySize: "SMB and mid-market",
    geography: "Global",
    buyers: [
      "Owner",
      "General Manager",
      "Director of Operations",
      "Head of Reservations",
      "Visitor Experience Director",
      "Ecommerce Manager",
    ],
    buyerLevel: "Owner and operational buyer",
    objective: "Book a tailored booking-software demonstration",
    scenario: "Bookings and the surrounding guest workflow are spread across separate systems or manual processes.",
    triggers: [
      "Peak-season preparation",
      "New location",
      "Rising booking volume",
      "Customer complaints",
      "Manual waivers",
      "Gift-voucher growth",
      "Ecommerce redesign",
    ],
    archetype: "Current-system diagnostic",
    primaryKeyword: "booking software cold call script",
    secondaryKeywords: [
      "tourism sales call script",
      "travel software sales script",
      "attraction booking software script",
      "tour operator appointment-setting script",
    ],
    filters: ["Technology", "Operations", "Commerce"],
    opening:
      "Hi [First Name], this is [Your Name] with [Company]. We work with tourism and leisure businesses that manage bookings, waivers, vouchers and guest operations across more than one system. Quick question: what are you using for bookings today, and where does the process still become manual?",
    questions: [
      "Are there any booking or reporting problems with the current system?",
      "How are customer waivers and gift vouchers handled today?",
      "Do you offer memberships, passes or packages, and are they managed in the same place?",
      "How closely are booking volume and staff scheduling connected during busy periods?",
    ],
    bridge:
      "We help visitor businesses bring online bookings and the surrounding customer workflow into one easier operating system. The useful next step is to compare the platform against the process you already have.",
    cta: "Would a short demonstration built around your current booking process be worth scheduling?",
    fullScript: `Hi [First Name], this is [Your Name] with [Company]. We work with tourism and leisure businesses that manage bookings, waivers, vouchers and guest operations across more than one system.

Quick question: what are you using for bookings today, and where does the process still become manual?

If relevant:
• Are there any booking or reporting problems with the current system?
• How are customer waivers and gift vouchers handled today?
• Do you offer memberships, passes or packages, and are they managed in the same place?
• How closely are booking volume and staff scheduling connected during busy periods?

Bridge: We help visitor businesses bring online bookings and the surrounding customer workflow into one easier operating system. The useful next step is to compare the platform against the process you already have.

CTA: Would a short demonstration built around your current booking process be worth scheduling?`,
    objections: [
      {
        objection: "Our booking system already works.",
        response:
          "That is good. I would not suggest changing it just for the sake of changing. The question is whether waivers, vouchers, memberships, reporting or staffing still create work outside it.",
      },
      {
        objection: "We cannot change systems before peak season.",
        response:
          "Understood. A demonstration does not create a switch date. It can simply help you decide whether anything should be reviewed after the busy period.",
      },
      {
        objection: "Send me information.",
        response:
          "Happy to. So I send the right information, is the bigger interest booking management, waivers and vouchers, memberships, or operational reporting?",
      },
      {
        objection: "We are too small for a platform like this.",
        response:
          "Possibly. How many bookings or locations are you managing, and which part of the process takes the most time today? That will tell us quickly whether it is relevant.",
      },
    ],
    whyItWorks:
      "The script starts with the booking system the business already uses, then widens the conversation to the manual work around it. That creates a practical reason for a tailored demo.",
    whyBreakdown: [
      {
        label: "It respects the current system",
        text: "The caller does not assume the booking platform is broken or that the buyer wants to replace it.",
      },
      {
        label: "The questions reveal the full workflow",
        text: "Waivers, vouchers, memberships and staff scheduling can expose friction that a booking-only question misses.",
      },
      {
        label: "The demo is tailored",
        text: "The next step is connected to the prospect's actual booking process rather than a generic product tour.",
      },
    ],
    personalization: [
      "Use the prospect's business type: tour operator, attraction, venue, activity provider or visitor experience.",
      "Reference peak season, a new location or a visible ecommerce change only when verified.",
      "For owners, keep the discussion simple and operational. For ecommerce leaders, ask about conversion, integrations and reporting.",
      "Do not promise more ticket sales or faster growth without approved evidence.",
    ],
    alternatives: [
      {
        label: "Short version",
        description: "For a busy owner or general manager.",
        script:
          "Hi [First Name], [Your Name] with [Company]. Quick question: what are you using for bookings today, and are waivers, vouchers or memberships still handled somewhere else?",
      },
      {
        label: "Voicemail",
        description: "Name the operational problem and leave a clean reason to call back.",
        script:
          "Hi [First Name], this is [Your Name] with [Company]. I am reaching out about booking operations for tourism and visitor businesses, especially the work around waivers, vouchers and memberships. I will send a short note as well. My number is [Phone Number].",
      },
      {
        label: "Operations opener",
        description: "Use for reservation and visitor-experience leaders.",
        script:
          "Hi [First Name], [Your Name] with [Company]. During a busy week, which part of the booking and guest process still creates the most manual work for your team?",
      },
    ],
    campaignPlan: {
      listFocus: "Tour operators, attractions, activity providers and venues with online booking volume, several ticket types, multiple locations or visible seasonal hiring.",
      callAround: "Peak-season preparation, a new location, an ecommerce redesign, new memberships or signs that waivers and vouchers are handled manually.",
      meetingReady: "The buyer can name a booking, guest-service or reporting problem and is willing to compare the current process in a tailored demo.",
      handoff: "Record the current booking system, booking volume, locations, manual steps, integrations, peak period and who should attend the demonstration.",
    },
    faqs: [
      {
        question: "Who should a booking software campaign call first?",
        answer: "Start with the owner or general manager in smaller businesses. In larger visitor operations, target reservations, operations, visitor experience or ecommerce leadership.",
      },
      {
        question: "What makes a tourism software demo qualified?",
        answer: "The prospect should have a defined booking workflow, a real operational problem and a buyer willing to show how bookings, waivers, vouchers or memberships are handled today.",
      },
    ],
    related: [
      "ai-voice-agent-cold-call-script",
      "payment-processing-cold-call-script",
      "3pl-fulfillment-cold-call-script",
    ],
    relevantServices: [
      appointmentSetting("Book tailored software demonstrations with tourism and leisure operators."),
      outsourcedSdr("Add prospect research, calling, qualification and clean demo handoffs."),
      sdrTraining("Train reps to discover operational problems without overloading owners with features."),
    ],
  },
  {
    id: "CT-R010",
    slug: "healthcare-software-modernization-cold-call-script",
    title: "Healthcare Software Modernization Cold Call Script",
    seoTitle: "Healthcare Software Development Cold Call Script",
    metaDescription:
      "Use this software development cold call script to reach healthcare and life-sciences leaders, uncover stalled product work and book a project-fit discussion.",
    category: "Software Development Services",
    industry: "Healthcare, healthtech, life sciences and pharmaceutical",
    subindustry: "Regulated digital products and internal platforms",
    serviceCategory: "Custom software development and modernization services",
    icp: "Regulated organizations with stalled product work, aging applications, under-resourced engineering teams or carefully governed AI-development initiatives.",
    companySize: "100+ employees",
    geography: "North America and global markets",
    buyers: [
      "CIO",
      "CTO",
      "VP Digital",
      "Director of Product",
      "Director of Engineering",
      "Head of Innovation",
      "IT Director",
    ],
    buyerLevel: "Technical and product buyer",
    objective: "Book a healthcare software project-fit meeting",
    scenario: "An important digital product, internal platform or modernization project is stalled or under-resourced.",
    triggers: [
      "Engineering hiring",
      "Digital transformation",
      "Product backlog",
      "Legacy-system risk",
      "Acquisition",
      "New AI initiative",
      "Vendor failure",
    ],
    archetype: "Stalled-project-led",
    primaryKeyword: "software development cold call script",
    secondaryKeywords: [
      "healthcare software sales script",
      "custom software development call script",
      "software modernization cold call",
      "healthtech appointment-setting script",
    ],
    filters: ["Technology", "Executive", "Healthcare"],
    opening:
      "Hi [First Name], this is [Your Name] with [Company]. I will be brief. We help healthcare and life-sciences teams when a digital product is stuck, an older platform needs modernizing or the internal team simply cannot get to the work. Is anything like that stalled or under-resourced on your side right now?",
    questions: [
      "Is the work tied to a customer-facing product, an internal platform or a legacy application?",
      "What is holding it back today: capacity, specialist skills, technical debt, security or compliance review?",
      "Does the team need a complete delivery partner or additional senior engineering capacity?",
      "Is there a launch, regulatory, budget or internal planning date shaping the timeline?",
    ],
    bridge:
      "We provide senior product and engineering support for new digital products, older software and projects that are short on capacity. The first conversation is simply to understand the work and see whether the delivery model fits.",
    cta: "Would a short project-fit discussion with the product team make sense to review what is stalled and what support would actually help?",
    fullScript: `Hi [First Name], this is [Your Name] with [Company]. I will be brief. We help healthcare and life-sciences teams when a digital product is stuck, an older platform needs modernizing or the internal team simply cannot get to the work.

Is anything like that stalled or under-resourced on your side right now?

If relevant:
• Is the work tied to a customer-facing product, an internal platform or a legacy application?
• What is holding it back today: capacity, specialist skills, technical debt, security or compliance review?
• Does the team need a complete delivery partner or additional senior engineering capacity?
• Is there a launch, regulatory, budget or internal planning date shaping the timeline?

Bridge: We provide senior product and engineering support for new digital products, older software and projects that are short on capacity. The first conversation is simply to understand the work and see whether the delivery model fits.

CTA: Would a short project-fit discussion with the product team make sense to review what is stalled and what support would actually help?`,
    objections: [
      {
        objection: "We have an internal engineering team.",
        response:
          "That makes sense. The question is not whether you have a team. It is whether anything important is delayed because the team is full or missing a specific capability.",
      },
      {
        objection: "We already use development partners.",
        response:
          "Understood. Is the current coverage handling every priority, or are there projects, platforms or specialist needs that still sit outside it?",
      },
      {
        objection: "We cannot bring in a vendor because of compliance.",
        response:
          "That may determine whether there is a fit. The next discussion should cover your security, quality and compliance requirements before anyone talks about delivery.",
      },
      {
        objection: "Nothing is approved yet.",
        response:
          "That is fine. A short fit discussion can help define the work and the likely delivery options before you seek approval.",
      },
    ],
    whyItWorks:
      "The opener keeps the strongest language from the original campaign: stuck, older and under-resourced. It gives product and technology leaders three recognizable reasons to continue the call.",
    whyBreakdown: [
      {
        label: "The problem is easy to recognize",
        text: "A stalled product, aging platform or overloaded internal team is clearer than a broad digital-transformation pitch.",
      },
      {
        label: "The discovery respects regulation",
        text: "Security, quality and compliance are treated as project conditions, not minor objections.",
      },
      {
        label: "The CTA checks fit",
        text: "The buyer is not asked to commit to a build. The meeting determines whether the work and delivery model belong together.",
      },
    ],
    personalization: [
      "Choose one relevant work type: modernization, MVP, internal platform, workflow tool or product backlog.",
      "For a CIO or CTO, discuss portfolio pressure and technical risk. For product leaders, discuss roadmap, capacity and launch timing.",
      "Use a verified hiring, acquisition, modernization or AI-development signal when available.",
      "Do not claim faster delivery, lower cost or risk-free AI development without evidence.",
    ],
    alternatives: [
      {
        label: "Short version",
        description: "The closest version to the strongest original opener.",
        script:
          "Hi [First Name], [Your Name] with [Company]. We help healthcare and life-sciences teams when a digital product is stuck, an older platform needs modernizing or the internal team cannot get to the work. Is anything like that under-resourced right now?",
      },
      {
        label: "Voicemail",
        description: "Use one clear project condition.",
        script:
          "Hi [First Name], this is [Your Name] with [Company]. I am reaching out about stalled digital products, software modernization and additional senior engineering capacity for regulated teams. I will send a short note as well. My number is [Phone Number].",
      },
      {
        label: "Product-leader opener",
        description: "Use for product and innovation leaders.",
        script:
          "Hi [First Name], [Your Name] with [Company]. Is there anything on the product roadmap that should be moving but keeps getting pushed because the team cannot get to it?",
      },
    ],
    campaignPlan: {
      listFocus: "Healthcare, healthtech, life-sciences and pharmaceutical organizations with product hiring, modernization programs, digital initiatives or visible delivery backlogs.",
      callAround: "A stalled product, an aging platform, a hiring gap, an acquisition, a new digital initiative or a regulated AI-development project.",
      meetingReady: "The buyer can identify a real project, capacity problem or modernization need and can explain who owns the work and what is blocking it.",
      handoff: "Capture the project type, current state, technical stack if known, security and compliance requirements, internal team capacity, stakeholders and timeline.",
    },
    faqs: [
      {
        question: "What should a software development cold call qualify?",
        answer: "Qualify whether a real project exists, why it is not moving, who owns it, what regulated requirements apply and whether outside delivery support is realistic.",
      },
      {
        question: "Should the caller pitch AI-assisted development?",
        answer: "Only when it is relevant. Lead with the stalled work or modernization need. Discuss AI after the buyer explains the project and its security, quality and compliance boundaries.",
      },
    ],
    related: [
      "technical-cloud-migration-discovery-call-script",
      "cybersecurity-risk-assessment-cold-call-script",
      "itsm-software-cold-call-script",
    ],
    relevantServices: [
      appointmentSetting("Book project-fit conversations with healthcare product and technology leaders."),
      outsourcedSdr("Add focused account research, calling, qualification and project handoff."),
      aiGtm("Prioritize accounts showing software modernization, hiring and regulated AI signals."),
    ],
  },
  {
    id: "CT-R011",
    slug: "frontline-workforce-software-cold-call-script",
    title: "Frontline Workforce Software Cold Call Script",
    seoTitle: "Frontline Workforce Software Cold Call Script",
    metaDescription:
      "Use this frontline workforce software cold call script to reach operations leaders, uncover deskless communication gaps and book a workflow demonstration.",
    category: "Workforce Technology",
    industry: "Manufacturing, construction, logistics and field operations",
    subindustry: "Deskless workforce communication, reporting and compliance",
    serviceCategory: "Frontline productivity and operations software",
    icp: "Organizations with large deskless teams still using paper, word of mouth, bulletin boards or disconnected tools for critical work.",
    companySize: "250+ employees or multi-site operations",
    geography: "Global",
    buyers: [
      "VP Operations",
      "Plant Manager",
      "Director of Manufacturing",
      "EHS Director",
      "Continuous Improvement Director",
      "HR Operations Director",
    ],
    buyerLevel: "Operational buyer",
    objective: "Book a frontline workflow demonstration",
    scenario: "Critical updates and reporting do not consistently reach or return from the frontline.",
    triggers: [
      "Safety incident",
      "Multi-site growth",
      "Compliance finding",
      "Digitization project",
      "High turnover",
      "New plant",
      "Paper-process initiative",
    ],
    archetype: "Operational-gap-led",
    primaryKeyword: "frontline workforce software cold call script",
    secondaryKeywords: [
      "deskless workforce sales script",
      "manufacturing software cold call",
      "employee communications sales script",
      "frontline appointment-setting script",
    ],
    filters: ["Technology", "Operations"],
    opening:
      "Hi [First Name], this is [Your Name] with [Company]. Even with ERP and safety systems in place, we hear that the frontline is still hard to reach. How are you making sure shift changes, safety alerts and checklists actually reach deskless teams in real time?",
    questions: [
      "Do critical updates ever reach the floor late or inconsistently?",
      "Are near misses, incidents or frontline issues sometimes logged after the fact?",
      "How much inspection and checklist work is still completed on paper?",
      "Can managers see completion and reporting across sites without chasing people?",
    ],
    bridge:
      "We help organizations close the gap between their central systems and the frontline. Workers receive updates, complete tasks and report issues through accessible channels, while managers get a clearer view of what is happening.",
    cta: "Would a short workflow demonstration be useful to compare that approach with how updates and reporting move today?",
    fullScript: `Hi [First Name], this is [Your Name] with [Company]. Even with ERP and safety systems in place, we hear that the frontline is still hard to reach.

How are you making sure shift changes, safety alerts and checklists actually reach deskless teams in real time?

If relevant:
• Do critical updates ever reach the floor late or inconsistently?
• Are near misses, incidents or frontline issues sometimes logged after the fact?
• How much inspection and checklist work is still completed on paper?
• Can managers see completion and reporting across sites without chasing people?

Bridge: We help organizations close the gap between their central systems and the frontline. Workers receive updates, complete tasks and report issues through accessible channels, while managers get a clearer view of what is happening.

CTA: Would a short workflow demonstration be useful to compare that approach with how updates and reporting move today?`,
    objections: [
      {
        objection: "We already have an ERP and safety system.",
        response:
          "That is expected. This is not about replacing those systems. The question is how information reaches workers and how frontline updates return to management between those systems and the floor.",
      },
      {
        objection: "Our workers will not use another app.",
        response:
          "Adoption is the right concern. The discussion should cover how workers access information today and whether mobile, kiosks or shared displays fit the environment better than a single-app approach.",
      },
      {
        objection: "Paper works for us.",
        response:
          "It may. Where paper becomes difficult is timing, consistency and visibility across sites. Does any of that create enough work to justify a comparison?",
      },
      {
        objection: "This belongs with HR or IT.",
        response:
          "They may need to be involved. Who owns the operational outcome when an alert, checklist or incident report does not move properly?",
      },
    ],
    whyItWorks:
      "The script keeps the original campaign's strongest line: even with ERP and safety systems, the frontline can still be hard to reach. It positions the platform as a missing operational layer, not another replacement project.",
    whyBreakdown: [
      {
        label: "It respects existing investments",
        text: "The opener acknowledges the ERP and safety systems instead of pretending the organization has no technology.",
      },
      {
        label: "The problem is visible",
        text: "Shift changes, safety alerts, checklists and incident reports are concrete examples a plant or operations leader understands immediately.",
      },
      {
        label: "The demo follows the workflow",
        text: "The next step can show how one real update moves from management to the floor and back again.",
      },
    ],
    personalization: [
      "Choose the two frontline workflows most relevant to the account: alerts, shift updates, checklists, inspections or incident reporting.",
      "Use the language the organization uses for workers: frontline, deskless, plant-floor, field or site teams.",
      "For plant leaders, emphasize real-time visibility. For EHS, emphasize completion and reporting. For HR operations, emphasize communication and adoption.",
      "Do not imply that the ERP, safety system or existing communication tools must be replaced.",
    ],
    alternatives: [
      {
        label: "Short version",
        description: "Keep the original observation and one question.",
        script:
          "Hi [First Name], [Your Name] with [Company]. Even with ERP and safety systems in place, the frontline can still be hard to reach. How are critical updates and checklists reaching your deskless teams today?",
      },
      {
        label: "Voicemail",
        description: "Use a concrete frontline workflow.",
        script:
          "Hi [First Name], this is [Your Name] with [Company]. I am reaching out about how shift changes, safety alerts and frontline reporting move across deskless teams. I will send a short note as well. My number is [Phone Number].",
      },
      {
        label: "Plant-manager opener",
        description: "Use when calling plant and site leadership.",
        script:
          "Hi [First Name], [Your Name] with [Company]. Do critical updates and checklists reach the floor in real time, or is part of that process still handled through paper and word of mouth?",
      },
    ],
    campaignPlan: {
      listFocus: "Multi-site manufacturers, construction firms, logistics operators and field organizations with large deskless workforces and visible safety or digitization initiatives.",
      callAround: "A new site, safety event, compliance finding, high frontline hiring, paper-reduction program or operational-communication initiative.",
      meetingReady: "The buyer recognizes a real delay, adoption problem or reporting gap in a frontline workflow and can identify who owns the outcome.",
      handoff: "Capture workforce size, sites, current communication channels, priority workflow, current system, adoption concern and stakeholders from operations, EHS, HR or IT.",
    },
    faqs: [
      {
        question: "Should a frontline software call lead with features?",
        answer: "No. Lead with a real workflow such as alerts, checklists or incident reporting. Show the product only after the buyer confirms where information is getting lost.",
      },
      {
        question: "Who owns a frontline workforce software decision?",
        answer: "Operations usually owns the outcome, but EHS, manufacturing, continuous improvement, HR operations and IT may all influence the decision.",
      },
    ],
    related: [
      "industrial-alarm-notification-cold-call-script",
      "field-inspection-software-cold-call-script",
      "itsm-software-cold-call-script",
    ],
    relevantServices: [
      appointmentSetting("Book workflow demonstrations with plant, operations and EHS leaders."),
      aiGtm("Prioritize multi-site accounts showing safety, hiring and digitization signals."),
      sdrTraining("Train callers to discuss frontline problems in operational language."),
    ],
  },
  {
    id: "CT-R012",
    slug: "industrial-alarm-notification-cold-call-script",
    title: "Industrial Alarm Notification Cold Call Script",
    seoTitle: "Manufacturing Cold Call Script for Industrial Alarm Software",
    metaDescription:
      "Use this manufacturing software cold call script to reach plant leaders, uncover alarm-routing gaps and book an industrial notification workflow review.",
    category: "Industrial Software",
    industry: "Manufacturing and process industries",
    subindustry: "Plant alarms, controls, maintenance and operational response",
    serviceCategory: "Industrial alarm-routing and notification software",
    icp: "Plants where alarms start in control systems but notifications still depend on radios, phones, manual escalation or disconnected workflows.",
    companySize: "Single-site and multi-site manufacturers",
    geography: "Global",
    buyers: [
      "Plant Manager",
      "Maintenance Manager",
      "Controls Engineering Manager",
      "Automation Director",
      "EHS Manager",
      "Operations Manager",
    ],
    buyerLevel: "Plant operations and engineering buyer",
    objective: "Book a plant-alarm workflow review",
    scenario: "Critical alarms are delayed, missed, misrouted or create too much noise for the people expected to respond.",
    triggers: [
      "Downtime event",
      "Audit finding",
      "Control-system upgrade",
      "New plant",
      "Alarm-rationalization project",
      "Staffing change",
      "Escalation failure",
    ],
    archetype: "Failure-scenario-led",
    primaryKeyword: "manufacturing software cold call script",
    secondaryKeywords: [
      "industrial software sales script",
      "plant manager cold call script",
      "alarm management sales script",
      "manufacturing appointment-setting script",
    ],
    filters: ["Technology", "Operations"],
    opening:
      "Hi [First Name], this is [Your Name] with [Company]. Quick question: when an alarm fires in the plant control system, does it always reach the right person quickly, or are there still manual steps between the alarm and the response?",
    questions: [
      "Which systems generate the alarms your team cares about most?",
      "How are alerts routed today: radio, phone, tablet, control room or manual escalation?",
      "Do teams struggle more with missed alerts, delayed escalation or too many low-value alarms?",
      "Who owns the workflow between controls, maintenance, operations and EHS?",
    ],
    bridge:
      "We help plants route critical alarms from existing control systems to the right person and device based on the operating workflow. The goal is to improve notification and escalation without forcing a control-system replacement.",
    cta: "Would a short alarm-workflow review be useful to map how one critical alert moves today and where the gaps are?",
    fullScript: `Hi [First Name], this is [Your Name] with [Company]. Quick question: when an alarm fires in the plant control system, does it always reach the right person quickly, or are there still manual steps between the alarm and the response?

If relevant:
• Which systems generate the alarms your team cares about most?
• How are alerts routed today: radio, phone, tablet, control room or manual escalation?
• Do teams struggle more with missed alerts, delayed escalation or too many low-value alarms?
• Who owns the workflow between controls, maintenance, operations and EHS?

Bridge: We help plants route critical alarms from existing control systems to the right person and device based on the operating workflow. The goal is to improve notification and escalation without forcing a control-system replacement.

CTA: Would a short alarm-workflow review be useful to map how one critical alert moves today and where the gaps are?`,
    objections: [
      {
        objection: "Our control system already handles alarms.",
        response:
          "That makes sense. The question is not whether it creates alarms. It is what happens after the alarm fires and whether the right person receives, acknowledges and escalates it quickly.",
      },
      {
        objection: "We cannot replace our current stack.",
        response:
          "A replacement is not the starting point. The review should determine how notification can work with the systems and devices already in place.",
      },
      {
        objection: "We do not miss critical alarms.",
        response:
          "Good. Is the bigger issue alarm volume, escalation consistency or proving who received and acted on an alert? If none of those are problems, there may not be a fit.",
      },
      {
        objection: "That belongs to controls engineering.",
        response:
          "They should be involved. Who else owns the response once the alarm leaves the control system and becomes an operations or maintenance issue?",
      },
    ],
    whyItWorks:
      "The opener keeps the original campaign's strongest idea: the alarm may exist in the SCADA or PLC environment, but notification can still fail between the system and the responsible person.",
    whyBreakdown: [
      {
        label: "It separates detection from response",
        text: "The buyer may already have alarms. The script focuses on routing, acknowledgment and escalation after the alarm fires.",
      },
      {
        label: "The language fits plant operations",
        text: "Control systems, radios, phones, maintenance and EHS are more credible than a broad software-efficiency pitch.",
      },
      {
        label: "The next step maps one workflow",
        text: "Reviewing one critical alert keeps the meeting practical and reduces fear of a large replacement project.",
      },
    ],
    personalization: [
      "Use SCADA, PLC or control system only when the account environment is known. Do not guess the vendor or platform.",
      "Choose one relevant operating concern: missed alerts, delayed escalation, alarm noise or acknowledgment tracking.",
      "For plant managers, emphasize response ownership. For controls teams, emphasize integration and routing. For EHS, emphasize escalation and records.",
      "Do not promise zero downtime, perfect compliance or instant response.",
    ],
    alternatives: [
      {
        label: "Short version",
        description: "Use the original direct routing question.",
        script:
          "Hi [First Name], [Your Name] with [Company]. When an alarm fires in the plant, does it always reach the right person quickly, or are there still manual steps in the middle?",
      },
      {
        label: "Voicemail",
        description: "Keep it focused on alarm routing.",
        script:
          "Hi [First Name], this is [Your Name] with [Company]. I am reaching out about how critical plant alarms move from control systems to the people expected to respond. I will send a short note as well. My number is [Phone Number].",
      },
      {
        label: "Controls-engineering opener",
        description: "Use with controls and automation buyers.",
        script:
          "Hi [First Name], [Your Name] with [Company]. Once a critical alarm leaves the control system, how are routing, acknowledgment and escalation handled across the plant?",
      },
    ],
    campaignPlan: {
      listFocus: "Manufacturing and process plants with control systems, shift-based maintenance and operations teams, several facilities or visible automation projects.",
      callAround: "A downtime event, audit, control-system upgrade, new plant, alarm-rationalization effort or staffing change affecting escalation coverage.",
      meetingReady: "The buyer can identify a critical alarm workflow, a routing or escalation concern and the controls or operations stakeholders who own it.",
      handoff: "Capture the control environment, alert channels, response teams, shift coverage, alarm problem, current escalation path and technical stakeholders.",
    },
    faqs: [
      {
        question: "Is this a control-system replacement script?",
        answer: "No. The script focuses on notification, routing and escalation around the existing control environment. A replacement discussion should happen only if the buyer raises it.",
      },
      {
        question: "Who should attend an industrial alarm software meeting?",
        answer: "The right group often includes controls or automation, plant operations, maintenance and sometimes EHS, depending on who owns the alert and the response.",
      },
    ],
    related: [
      "frontline-workforce-software-cold-call-script",
      "field-inspection-software-cold-call-script",
      "cybersecurity-risk-assessment-cold-call-script",
    ],
    relevantServices: [
      appointmentSetting("Book technical workflow reviews with plant, maintenance and controls leaders."),
      outsourcedSdr("Build and call a focused manufacturing list with clean operational qualification."),
      sdrTraining("Train reps to speak credibly with plant and engineering buyers."),
    ],
  },
  {
    id: "CT-R015",
    slug: "accounting-software-to-erp-cold-call-script",
    title: "Accounting Software-to-ERP Cold Call Script",
    seoTitle: "Accounting Software-to-ERP Cold Call Script",
    metaDescription:
      "Use this ERP cold call script to reach growing businesses, uncover inventory and reporting limits, and book an ERP-fit discovery and product demonstration.",
    category: "ERP Software",
    industry: "Distribution, manufacturing, services and ecommerce",
    subindustry: "Growing businesses outgrowing entry-level accounting systems",
    serviceCategory: "Cloud ERP and business-management software",
    icp: "Growing companies where accounting software is stretched across inventory, orders, reporting and operational workflows.",
    companySize: "25–500 employees",
    geography: "Global",
    buyers: [
      "CFO",
      "Controller",
      "COO",
      "VP Finance",
      "Director of Operations",
      "Inventory Manager",
    ],
    buyerLevel: "Finance and operations buyer",
    objective: "Book an ERP-fit discovery and demonstration",
    scenario: "The business has outgrown its accounting system but has not yet committed to an ERP project.",
    triggers: [
      "Multiple entities",
      "Inventory complexity",
      "Spreadsheet reporting",
      "Manual order workflow",
      "Rapid growth",
      "New locations",
      "Audit difficulty",
    ],
    archetype: "Outgrown-system-led",
    primaryKeyword: "ERP cold call script",
    secondaryKeywords: [
      "ERP sales script",
      "accounting software cold call",
      "cloud ERP sales call script",
      "ERP demo appointment-setting script",
    ],
    filters: ["Technology", "Executive", "Operations", "Finance"],
    opening:
      "Hi [First Name], this is [Your Name] with [Company]. I am reaching out to growing businesses that still use accounting software for finance and a mix of spreadsheets or separate tools for operations. As the company has grown, have you started running into limits around inventory, orders, reporting or manual work?",
    questions: [
      "Is inventory information accurate and available when teams need it?",
      "How are orders, shipments and operational updates tracked today?",
      "Where does the team still rekey information or build reports manually?",
      "Is growth, a new location, an acquisition or an audit creating pressure to review the system?",
    ],
    bridge:
      "Those are common signs that the business has outgrown an accounting-only setup. We help companies assess whether a cloud ERP would connect finance and operations well enough to justify a change.",
    cta: "Would a short ERP-fit conversation and demonstration be useful to compare the current process with a more connected system?",
    fullScript: `Hi [First Name], this is [Your Name] with [Company]. I am reaching out to growing businesses that still use accounting software for finance and a mix of spreadsheets or separate tools for operations.

As the company has grown, have you started running into limits around inventory, orders, reporting or manual work?

If relevant:
• Is inventory information accurate and available when teams need it?
• How are orders, shipments and operational updates tracked today?
• Where does the team still rekey information or build reports manually?
• Is growth, a new location, an acquisition or an audit creating pressure to review the system?

Bridge: Those are common signs that the business has outgrown an accounting-only setup. We help companies assess whether a cloud ERP would connect finance and operations well enough to justify a change.

CTA: Would a short ERP-fit conversation and demonstration be useful to compare the current process with a more connected system?`,
    objections: [
      {
        objection: "Our accounting software still works.",
        response:
          "It may work well for accounting. The question is whether inventory, orders, reporting and other operational work now sit outside it and create enough effort to review.",
      },
      {
        objection: "We are too small for ERP.",
        response:
          "You may be. The fit depends more on operational complexity than employee count. How many entities, locations, inventory points or manual workflows are you managing?",
      },
      {
        objection: "An ERP project would be too disruptive.",
        response:
          "That is a legitimate concern. The first meeting should document the current process and determine whether the business case is strong enough to consider a phased change.",
      },
      {
        objection: "We do not have budget.",
        response:
          "Understood. Is the project simply not funded this year, or has the team not yet measured the cost and effort of the current process?",
      },
    ],
    whyItWorks:
      "The script preserves the original campaign's direct question about whether the business has outgrown its accounting system. It turns that into a broader operational diagnosis without naming a software brand.",
    whyBreakdown: [
      {
        label: "It begins with the current stage",
        text: "The company is not treated like a failed ERP project. It is treated like a growing business whose accounting setup may no longer cover operations.",
      },
      {
        label: "The pain is measurable",
        text: "Inventory, orders, manual rekeying and spreadsheet reporting give the buyer concrete areas to evaluate.",
      },
      {
        label: "The CTA checks fit first",
        text: "The meeting is an assessment and demonstration, not an assumption that the business must buy an ERP.",
      },
    ],
    personalization: [
      "Use the correct current-system category only when verified. Do not name an accounting platform unless the data is reliable.",
      "For CFOs and controllers, focus on reporting and controls. For operations leaders, focus on inventory, orders and rekeying.",
      "Reference growth, new locations, multiple entities or an audit only when the signal is real.",
      "Do not promise specific savings, implementation speed or return on investment.",
    ],
    alternatives: [
      {
        label: "Short version",
        description: "Use one direct growth question.",
        script:
          "Hi [First Name], [Your Name] with [Company]. As the business has grown, has your accounting system started creating limits around inventory, orders, reporting or manual work?",
      },
      {
        label: "Voicemail",
        description: "Name the outgrown-system condition.",
        script:
          "Hi [First Name], this is [Your Name] with [Company]. I am reaching out about growing businesses that have outgrown an accounting-only setup and are reviewing ERP options. I will send a short note as well. My number is [Phone Number].",
      },
      {
        label: "Operations opener",
        description: "Use for operations and inventory leaders.",
        script:
          "Hi [First Name], [Your Name] with [Company]. How much of the order and inventory process still happens outside the accounting system through spreadsheets or separate tools?",
      },
    ],
    campaignPlan: {
      listFocus: "Growing distribution, manufacturing, services and ecommerce companies using entry-level accounting software alongside spreadsheets or separate operational tools.",
      callAround: "Rapid growth, new locations, added entities, inventory complexity, finance hiring, an audit or visible operations-system evaluation.",
      meetingReady: "The buyer confirms meaningful work outside the accounting system and can identify an operational or reporting problem worth assessing.",
      handoff: "Capture the current accounting category, entities, locations, inventory model, manual processes, reporting problems, stakeholders and timing.",
    },
    faqs: [
      {
        question: "How is this different from the ERP script for CFOs?",
        answer: "This page targets smaller and growing companies that may be moving from accounting software to their first ERP. The CFO modernization script targets established organizations already dealing with broader ERP and operational complexity.",
      },
      {
        question: "What qualifies an accounting-to-ERP demo?",
        answer: "The company should have real operational work outside accounting, a buyer who owns the problem and enough complexity to justify reviewing a connected system.",
      },
    ],
    related: [
      "erp-modernization-cold-call-script-for-cfos",
      "payment-processing-cold-call-script",
      "software-procurement-advisory-cold-call-script",
    ],
    relevantServices: [
      appointmentSetting("Book ERP-fit conversations with finance and operations buyers."),
      outsourcedSdr("Build the target list, make the calls and qualify system-fit conversations."),
      sdrTraining("Train reps to uncover operational limits without attacking the current accounting system."),
    ],
  },
  {
    id: "CT-R017",
    slug: "payment-processing-cold-call-script",
    title: "Payment Processing Cold Call Script",
    seoTitle: "Payment Processing Cold Call Script for Merchant Services",
    metaDescription:
      "Use this payment processing cold call script to reach merchants, qualify fee and service concerns, and book a focused statement and payment-setup review.",
    category: "Payments",
    industry: "Retail, automotive, hospitality, professional services and ecommerce",
    subindustry: "Merchant acquiring, terminals and card payments",
    serviceCategory: "Payment processing and merchant services",
    icp: "Merchants processing meaningful card volume and experiencing possible fee, funding, terminal, support or ecommerce-payment issues.",
    companySize: "SMB and mid-market merchants",
    geography: "North America",
    buyers: [
      "Owner",
      "CFO",
      "Controller",
      "Operations Manager",
      "Retail Director",
      "Ecommerce Director",
    ],
    buyerLevel: "Owner, finance and operations buyer",
    objective: "Book a statement and payment-setup review",
    scenario: "The merchant may be dissatisfied but is wary of another generic payment-processor pitch.",
    triggers: [
      "Fee increase",
      "Funding delay",
      "Chargeback issue",
      "Terminal replacement",
      "New location",
      "Ecommerce launch",
      "Contract review",
    ],
    archetype: "Transparent-review-led",
    primaryKeyword: "payment processing cold call script",
    secondaryKeywords: [
      "merchant services sales script",
      "credit card processing cold call",
      "payment sales script",
      "merchant appointment-setting script",
    ],
    filters: ["Executive", "Operations", "Finance", "Commerce"],
    opening:
      "Hi [First Name], this is [Your Name] with [Company]. Quick question: do you handle the payment processing, terminals and funding setup there, or is that someone else? The reason I am calling is simple. We help merchants review whether fees, deposits, support and equipment still fit the way the business operates.",
    questions: [
      "Who is the current processing setup through, and when was it last reviewed?",
      "Are fees, funding times, chargebacks or customer support creating any frustration?",
      "Are payments mainly in person, online, recurring or spread across several channels?",
      "Is there a new location, ecommerce project, terminal change or contract date creating a reason to look?",
    ],
    bridge:
      "We start with the current statement and payment setup, identify any real service or operating issue, and explain the available options clearly. If the existing setup is already the right fit, the review should make that obvious.",
    cta: "Would a short statement and payment-setup review be worth scheduling to see whether anything actually needs attention?",
    fullScript: `Hi [First Name], this is [Your Name] with [Company]. Quick question: do you handle the payment processing, terminals and funding setup there, or is that someone else?

The reason I am calling is simple. We help merchants review whether fees, deposits, support and equipment still fit the way the business operates.

If relevant:
• Who is the current processing setup through, and when was it last reviewed?
• Are fees, funding times, chargebacks or customer support creating any frustration?
• Are payments mainly in person, online, recurring or spread across several channels?
• Is there a new location, ecommerce project, terminal change or contract date creating a reason to look?

Bridge: We start with the current statement and payment setup, identify any real service or operating issue, and explain the available options clearly. If the existing setup is already the right fit, the review should make that obvious.

CTA: Would a short statement and payment-setup review be worth scheduling to see whether anything actually needs attention?`,
    objections: [
      {
        objection: "We are happy with our processor.",
        response:
          "That is good. I am not asking you to switch on the call. When was the setup last reviewed, and is there anything around fees, deposits or support you would change if you could?",
      },
      {
        objection: "We are under contract.",
        response:
          "Understood. The first step is simply understanding the agreement and timing. I would not make any claim about exit terms without reviewing the actual contract.",
      },
      {
        objection: "Every processor says they are cheaper.",
        response:
          "I agree, and a broad price claim is not useful. The review should compare the actual statement, funding, service and equipment based on how you take payments.",
      },
      {
        objection: "Send me your rates.",
        response:
          "I can send an overview, but rates depend on the payment mix and setup. Are most transactions in person, online or recurring?",
      },
    ],
    whyItWorks:
      "The script keeps the original campaign's plain language about payments, terminals, deposits, fees and support. It removes legal claims, hidden-fee statistics and promotions that could not be safely generalized.",
    whyBreakdown: [
      {
        label: "It finds the right person quickly",
        text: "Payment decisions often sit with the owner, finance or operations. The opening question gets the routing issue out of the way.",
      },
      {
        label: "It acknowledges processor fatigue",
        text: "The caller does not lead with an unsupported cheaper-rate promise that sounds like every other merchant-services pitch.",
      },
      {
        label: "The review uses real information",
        text: "A statement and setup review gives the next meeting a specific purpose and a clear qualification standard.",
      },
    ],
    personalization: [
      "Use the merchant's business type and likely payment channels, but do not guess their processor or volume.",
      "For owners, keep the language direct. For finance buyers, ask about statements and funding. For operations, ask about terminals, support and locations.",
      "Use a verified new location, ecommerce launch or terminal change when available.",
      "Do not claim guaranteed savings, hidden fees, penalty-free cancellation, promotions or funding terms without approved evidence.",
    ],
    alternatives: [
      {
        label: "Short version",
        description: "Keep the original routing language and one issue question.",
        script:
          "Hi [First Name], [Your Name] with [Company]. Do you handle the payment processing and terminals there? Quick question: are fees, deposits or support creating any frustration with the current setup?",
      },
      {
        label: "Voicemail",
        description: "Offer a review rather than a cheaper-rate claim.",
        script:
          "Hi [First Name], this is [Your Name] with [Company]. I am reaching out about a straightforward review of your current payment processing, funding and terminal setup. I will send a short note as well. My number is [Phone Number].",
      },
      {
        label: "Finance opener",
        description: "Use for controllers and finance leaders.",
        script:
          "Hi [First Name], [Your Name] with [Company]. When was the last time someone reviewed the full processing statement against the way the business actually takes payments?",
      },
    ],
    campaignPlan: {
      listFocus: "Established merchants with meaningful in-person, ecommerce or recurring card volume, several locations or visible changes to their payment setup.",
      callAround: "A new location, ecommerce launch, terminal refresh, contract review, fee change, funding problem or public complaint about payment operations.",
      meetingReady: "The buyer owns or influences payments, can share the current setup or statement and has a service, cost or operational reason to review it.",
      handoff: "Capture payment channels, locations, current provider if shared, statement availability, main concern, contract timing, equipment and decision-makers.",
    },
    faqs: [
      {
        question: "Should a payment-processing cold call promise lower rates?",
        answer: "No. Ask for the actual statement and payment mix first. A credible review compares the merchant's real setup instead of making a blanket savings claim.",
      },
      {
        question: "What makes a merchant-services appointment qualified?",
        answer: "The person should influence the payment decision, have a reason to review the setup and be willing to discuss the statement, channels, equipment or service issue.",
      },
    ],
    related: [
      "accounting-software-to-erp-cold-call-script",
      "tourism-booking-software-cold-call-script",
      "3pl-fulfillment-cold-call-script",
    ],
    relevantServices: [
      appointmentSetting("Book statement and payment-setup reviews with qualified merchants."),
      outsourcedSdr("Build the merchant list, make the calls and hand off useful payment context."),
      sdrTraining("Train reps to handle processor fatigue without making reckless claims."),
    ],
  },
  {
    id: "CT-R023",
    slug: "3pl-fulfillment-cold-call-script",
    title: "3PL Fulfillment Cold Call Script",
    seoTitle: "3PL Cold Call Script for Fulfillment Sales",
    metaDescription:
      "Use this 3PL cold call script to reach ecommerce operations leaders, uncover fulfillment problems and book a focused diagnostic with a qualified brand.",
    category: "Fulfillment and Ecommerce Operations",
    industry: "Ecommerce and consumer brands",
    subindustry: "Warehousing, order fulfillment and inventory operations",
    serviceCategory: "Third-party logistics and fulfillment services",
    icp: "Growing brands using a 3PL or an in-house operation but struggling with inventory accuracy, peak volume, delivery speed or service.",
    companySize: "Established ecommerce brands with recurring order volume",
    geography: "North America and global markets",
    buyers: [
      "COO",
      "VP Operations",
      "Director of Fulfillment",
      "Supply Chain Director",
      "Logistics Director",
      "Ecommerce Operations Director",
    ],
    buyerLevel: "Operations buyer",
    objective: "Book a fulfillment diagnostic and fit call",
    scenario: "The current fulfillment model works until growth, product drops or peak volume expose recurring problems.",
    triggers: [
      "Peak season",
      "Product launch",
      "Warehouse expansion",
      "Service complaints",
      "3PL review",
      "International growth",
      "Order spike",
    ],
    archetype: "Incumbent-friction-led",
    primaryKeyword: "3PL cold call script",
    secondaryKeywords: [
      "fulfillment sales script",
      "logistics prospecting script",
      "ecommerce fulfillment cold call",
      "3PL appointment-setting script",
    ],
    filters: ["Operations", "Commerce"],
    opening:
      "Hi [First Name], this is [Your Name] with [Company]. We speak with brands that already use a 3PL or run fulfillment in house but still hit late orders, inventory headaches or shipping problems during product drops and peak periods. Does any of that sound familiar?",
    questions: [
      "Where does the current model struggle most: receiving, inventory accuracy, picking, shipping or support?",
      "What happens to service levels during a product launch, promotion or peak week?",
      "Are teams adding staff or spreadsheets to keep orders moving?",
      "Is the goal to replace the current model, add backup capacity or evaluate options before the next review?",
    ],
    bridge:
      "We help brands assess whether a different or additional fulfillment model would improve control, visibility and support without forcing changes to the ecommerce tools that already work.",
    cta: "Would a short fulfillment diagnostic be useful to compare the current operation with the volume and service level you need next?",
    fullScript: `Hi [First Name], this is [Your Name] with [Company]. We speak with brands that already use a 3PL or run fulfillment in house but still hit late orders, inventory headaches or shipping problems during product drops and peak periods.

Does any of that sound familiar?

If relevant:
• Where does the current model struggle most: receiving, inventory accuracy, picking, shipping or support?
• What happens to service levels during a product launch, promotion or peak week?
• Are teams adding staff or spreadsheets to keep orders moving?
• Is the goal to replace the current model, add backup capacity or evaluate options before the next review?

Bridge: We help brands assess whether a different or additional fulfillment model would improve control, visibility and support without forcing changes to the ecommerce tools that already work.

CTA: Would a short fulfillment diagnostic be useful to compare the current operation with the volume and service level you need next?`,
    objections: [
      {
        objection: "We already have a 3PL.",
        response:
          "Most companies we call do. The question is whether the current partner handles peak volume, inventory accuracy and support well enough, or whether a backup or future option is worth reviewing.",
      },
      {
        objection: "Switching would be too disruptive.",
        response:
          "Agreed. A diagnostic does not require a switch. It can identify whether the issues justify any change and what a safe transition or backup plan would require.",
      },
      {
        objection: "Our volume is not large enough.",
        response:
          "That may be true. What is the regular order volume, how high does it climb during peak periods and what service level do customers expect?",
      },
      {
        objection: "Send me information.",
        response:
          "Happy to. Should I send information about overflow capacity, a full fulfillment model, inventory visibility or high-touch account support?",
      },
    ],
    whyItWorks:
      "The script keeps the original campaign's strongest sequence: acknowledge the existing 3PL, name the recurring fulfillment problems and ask whether the brand is patching them with more staff or spreadsheets.",
    whyBreakdown: [
      {
        label: "It assumes an incumbent exists",
        text: "That removes the most predictable objection and lets the buyer discuss where the current model breaks down.",
      },
      {
        label: "It uses operational evidence",
        text: "Late orders, inventory mismatch, peak pressure and manual work are easier to qualify than a vague promise of better fulfillment.",
      },
      {
        label: "The next step can be replacement or backup",
        text: "The campaign does not force every account into a complete 3PL switch.",
      },
    ],
    personalization: [
      "Reference the brand's product type, sales channels and visible peak periods when known.",
      "For COOs, focus on scale and service. For fulfillment leaders, ask about receiving, inventory and shipping. For ecommerce operations, ask about integrations and customer impact.",
      "Use product launches, seasonal peaks or expansion signals only when verified.",
      "Do not publish warehouse counts, awards, guaranteed accuracy, delivery speed or savings claims without evidence.",
    ],
    alternatives: [
      {
        label: "Short version",
        description: "Keep the original incumbent-friction structure.",
        script:
          "Hi [First Name], [Your Name] with [Company]. We speak with brands that already have a 3PL but still hit late orders, inventory problems or service gaps during peak periods. Does any of that happen on your side?",
      },
      {
        label: "Voicemail",
        description: "Name the fulfillment condition, not a broad service claim.",
        script:
          "Hi [First Name], this is [Your Name] with [Company]. I am reaching out about fulfillment performance during product launches and peak demand, especially inventory, order flow and service visibility. I will send a short note as well. My number is [Phone Number].",
      },
      {
        label: "Overflow-capacity opener",
        description: "Use when replacement intent is unlikely.",
        script:
          "Hi [First Name], [Your Name] with [Company]. When order volume spikes, does the current fulfillment setup absorb it comfortably, or do teams start adding staff and spreadsheets to keep up?",
      },
    ],
    campaignPlan: {
      listFocus: "Established ecommerce and consumer brands with recurring order volume, active product launches, seasonal peaks, fulfillment hiring or visible warehouse changes.",
      callAround: "A product drop, peak season, international expansion, 3PL review, customer-service complaints, a warehouse move or a large increase in order volume.",
      meetingReady: "The buyer can describe a real fulfillment problem, expected volume and whether they are considering replacement, backup capacity or a future option.",
      handoff: "Capture regular and peak volume, products, channels, current model, facilities, main service issue, required integrations, geography and review timeline.",
    },
    faqs: [
      {
        question: "Should a 3PL cold call ask the prospect to replace its provider?",
        answer: "Not immediately. First qualify whether the current model has a real problem and whether the account needs replacement, backup capacity or simply another option before renewal.",
      },
      {
        question: "How is this different from the logistics and drayage script?",
        answer: "This page covers warehousing, inventory and order fulfillment. The logistics script covers transportation capacity, freight lanes, drayage and carrier coverage.",
      },
    ],
    related: [
      "logistics-overflow-drayage-cold-call-script",
      "tourism-booking-software-cold-call-script",
      "payment-processing-cold-call-script",
    ],
    relevantServices: [
      appointmentSetting("Book fulfillment diagnostics with ecommerce operations and supply-chain buyers."),
      outsourcedSdr("Build and call a focused brand list with useful volume and fit qualification."),
      sdrTraining("Train reps to sell around an incumbent 3PL without forcing a replacement pitch."),
    ],
  },
  {
    id: "CT-R024",
    slug: "software-procurement-advisory-cold-call-script",
    title: "Software Procurement Advisory Cold Call Script",
    seoTitle: "Software Procurement Cold Call Script for IT and Finance Buyers",
    metaDescription:
      "Use this software procurement cold call script to reach IT, finance and sourcing leaders, qualify renewal pressure and book a focused investment review.",
    category: "Technology Advisory",
    industry: "Enterprise technology, finance and procurement",
    subindustry: "Software sourcing, renewals and vendor management",
    serviceCategory: "Software procurement research and advisory services",
    icp: "Enterprises with major software renewals, large application portfolios, shelfware concerns or limited independent market and contract data.",
    companySize: "1,000+ employees",
    geography: "Global",
    buyers: [
      "CIO",
      "CFO",
      "Chief Procurement Officer",
      "VP Information Technology",
      "Software Asset Manager",
      "Vendor Management Director",
      "Strategic Sourcing Director",
    ],
    buyerLevel: "Economic, procurement and functional buyer",
    objective: "Book a software renewal or investment review",
    scenario: "The buyer is making renewal or platform decisions with incomplete market, usage, contract or total-cost information.",
    triggers: [
      "Major software renewal",
      "Cost-reduction mandate",
      "Merger or acquisition",
      "Software audit",
      "Vendor consolidation",
      "Procurement transformation",
      "Application portfolio review",
    ],
    archetype: "Upcoming-renewal-led",
    primaryKeyword: "software procurement cold call script",
    secondaryKeywords: [
      "IT procurement sales script",
      "software renewal call script",
      "technology advisory cold call",
      "enterprise appointment-setting script",
    ],
    filters: ["Technology", "Executive", "Finance"],
    opening:
      "Hi [First Name], this is [Your Name] with [Company]. We help enterprises make software renewal and platform decisions with better information on total cost, functionality, user experience and the available market. When a major renewal comes up, how confident are you that the team has enough independent data to challenge the default option?",
    questions: [
      "Which software renewals or platform choices carry the most cost or operating risk this year?",
      "How are usage, contract terms, functionality and total cost evaluated today?",
      "Do IT, finance and procurement work from the same information during the decision?",
      "Is the immediate need benchmarking, renewal preparation, portfolio cleanup or a new-platform decision?",
    ],
    bridge:
      "We bring independent research and advisory support into the decision so the team can compare the current agreement, actual use, market options and business requirements before negotiating or selecting a platform.",
    cta: "Would a short renewal or investment review be useful to identify where better data could change the decision?",
    fullScript: `Hi [First Name], this is [Your Name] with [Company]. We help enterprises make software renewal and platform decisions with better information on total cost, functionality, user experience and the available market.

When a major renewal comes up, how confident are you that the team has enough independent data to challenge the default option?

If relevant:
• Which software renewals or platform choices carry the most cost or operating risk this year?
• How are usage, contract terms, functionality and total cost evaluated today?
• Do IT, finance and procurement work from the same information during the decision?
• Is the immediate need benchmarking, renewal preparation, portfolio cleanup or a new-platform decision?

Bridge: We bring independent research and advisory support into the decision so the team can compare the current agreement, actual use, market options and business requirements before negotiating or selecting a platform.

CTA: Would a short renewal or investment review be useful to identify where better data could change the decision?`,
    objections: [
      {
        objection: "Procurement already handles renewals.",
        response:
          "That makes sense. The question is whether they have enough independent product, usage and market information to strengthen the decision and negotiation.",
      },
      {
        objection: "We already use an advisory firm.",
        response:
          "Understood. Does the current coverage include the specific renewal, portfolio or platform decision you are working through? If it does, there may not be a gap.",
      },
      {
        objection: "The renewal is too far away.",
        response:
          "That may actually be the right time to prepare. How far ahead does your team normally begin usage analysis, stakeholder alignment and market comparison?",
      },
      {
        objection: "Send me information.",
        response:
          "Happy to. Should I focus on renewal benchmarking, portfolio and shelfware review, or support for a new software selection?",
      },
    ],
    whyItWorks:
      "The script preserves the original campaign's useful language around total cost, functionality and user experience while removing proprietary research counts and savings claims.",
    whyBreakdown: [
      {
        label: "It begins with a scheduled business event",
        text: "A renewal or platform choice gives the campaign a practical reason to call and a natural timeline.",
      },
      {
        label: "The problem crosses departments",
        text: "IT, finance and procurement often need different evidence. The questions reveal whether those groups are aligned.",
      },
      {
        label: "The review narrows the opportunity",
        text: "The meeting identifies where independent information would matter instead of pitching a broad research subscription.",
      },
    ],
    personalization: [
      "Reference a specific renewal or software category only when the signal is reliable.",
      "For CIOs, emphasize business and technology fit. For finance, emphasize total cost and portfolio exposure. For procurement, emphasize market evidence and negotiation preparation.",
      "Use an acquisition, consolidation program or cost mandate when it is publicly verifiable.",
      "Do not publish provider counts, guide counts, savings totals or unlimited-access claims without approval.",
    ],
    alternatives: [
      {
        label: "Short version",
        description: "Use one direct renewal question.",
        script:
          "Hi [First Name], [Your Name] with [Company]. When a major software renewal comes up, does your team have enough independent data on cost, usage and alternatives to challenge the default option?",
      },
      {
        label: "Voicemail",
        description: "Name the renewal and decision problem.",
        script:
          "Hi [First Name], this is [Your Name] with [Company]. I am reaching out about software renewal preparation, portfolio decisions and independent market analysis for IT, finance and procurement teams. I will send a short note as well. My number is [Phone Number].",
      },
      {
        label: "Procurement opener",
        description: "Use for sourcing and vendor-management leaders.",
        script:
          "Hi [First Name], [Your Name] with [Company]. Which major software renewal this year would benefit most from better usage, contract and market data before negotiations begin?",
      },
    ],
    campaignPlan: {
      listFocus: "Large enterprises with complex application portfolios, visible procurement programs, cost-reduction mandates, acquisitions or major software renewal signals.",
      callAround: "An upcoming renewal, portfolio consolidation, software audit, merger, sourcing transformation or public cost-control initiative.",
      meetingReady: "The buyer can identify a material renewal or platform decision and a real information gap involving usage, cost, contract terms or market alternatives.",
      handoff: "Capture the software category, renewal date, current decision process, stakeholders, information gap, business risk and next planning milestone.",
    },
    faqs: [
      {
        question: "When should a software renewal campaign begin calling?",
        answer: "Call early enough for the buyer to analyze usage, align stakeholders and compare options before negotiation pressure removes those choices.",
      },
      {
        question: "Who should attend a software investment review?",
        answer: "The group often includes IT, finance, procurement, software asset management and the business owner of the platform being reviewed.",
      },
    ],
    related: [
      "cloud-migration-cold-call-script-for-cios",
      "erp-modernization-cold-call-script-for-cfos",
      "accounting-software-to-erp-cold-call-script",
    ],
    relevantServices: [
      appointmentSetting("Book renewal and investment reviews with senior IT, finance and procurement buyers."),
      aiGtm("Use renewal, hiring, acquisition and cost-control signals to prioritize enterprise accounts."),
      outsourcedSdr("Add focused enterprise prospecting, qualification and multi-stakeholder handoff."),
    ],
  },
  {
    id: "CT-R026",
    slug: "field-inspection-software-cold-call-script",
    title: "Field Inspection Software Cold Call Script",
    seoTitle: "Field Inspection Software Cold Call Script",
    metaDescription:
      "Use this field service software cold call script to reach operations leaders, uncover inspection-data delays and book a field-workflow demonstration.",
    category: "Field Operations Software",
    industry: "Utilities, construction, facilities, environmental and industrial services",
    subindustry: "Inspections, work orders, technical data and field reporting",
    serviceCategory: "No-code field-data and inspection software",
    icp: "Organizations collecting technical or inspection data through paper forms, spreadsheets, PDFs, email or rigid legacy applications.",
    companySize: "50+ field workers or multi-site operations",
    geography: "Global",
    buyers: [
      "Field Operations Director",
      "Inspection Manager",
      "Quality Director",
      "EHS Director",
      "Asset Manager",
      "Operations Systems Manager",
    ],
    buyerLevel: "Operational and technical buyer",
    objective: "Book a field-workflow demonstration",
    scenario: "Field data returns late, incomplete or inconsistent and requires manual work before management can use it.",
    triggers: [
      "Inspection backlog",
      "Audit finding",
      "Mobile initiative",
      "Reporting delay",
      "No-code initiative",
      "Field hiring",
      "System replacement",
    ],
    archetype: "Data-journey-led",
    primaryKeyword: "field service software cold call script",
    secondaryKeywords: [
      "inspection software sales script",
      "field operations cold call",
      "no-code software sales script",
      "field inspection appointment-setting script",
    ],
    filters: ["Technology", "Operations"],
    opening:
      "Hi [First Name], this is [Your Name] with [Company]. Quick question: does field data ever come back late, incomplete or not usable until someone cleans it up? We speak with teams where the inspection happens in the field but the reporting work starts again when the information reaches the office.",
    questions: [
      "How are inspections and technical data captured today: paper, spreadsheets, PDFs or a field application?",
      "How much manual work happens between collection and the final report?",
      "How quickly can supervisors see what was submitted in the field?",
      "Who has to change forms, workflows and reports when the process changes?",
    ],
    bridge:
      "We help teams digitize inspections, work orders, forms and field reporting so information comes back in a more consistent format and management can see it sooner. The workflows can be configured around the operation rather than rebuilt from scratch each time.",
    cta: "Would a short field-workflow demonstration be useful using one inspection or reporting process your team handles today?",
    fullScript: `Hi [First Name], this is [Your Name] with [Company]. Quick question: does field data ever come back late, incomplete or not usable until someone cleans it up?

We speak with teams where the inspection happens in the field but the reporting work starts again when the information reaches the office.

If relevant:
• How are inspections and technical data captured today: paper, spreadsheets, PDFs or a field application?
• How much manual work happens between collection and the final report?
• How quickly can supervisors see what was submitted in the field?
• Who has to change forms, workflows and reports when the process changes?

Bridge: We help teams digitize inspections, work orders, forms and field reporting so information comes back in a more consistent format and management can see it sooner. The workflows can be configured around the operation rather than rebuilt from scratch each time.

CTA: Would a short field-workflow demonstration be useful using one inspection or reporting process your team handles today?`,
    objections: [
      {
        objection: "We already use forms and spreadsheets.",
        response:
          "That may work for collection. The question is what happens after submission: validation, missing information, approvals, reporting and management visibility.",
      },
      {
        objection: "We have a field-service system.",
        response:
          "Understood. Does it handle the technical inspection and reporting workflow well, or are teams still using separate forms and manual steps around it?",
      },
      {
        objection: "IT would have to build this.",
        response:
          "IT may need to approve the environment and integrations. The workflow discussion should also determine how much the operations team can configure safely without a development project.",
      },
      {
        objection: "Our field teams will not adopt another tool.",
        response:
          "Adoption matters. The demonstration should use a familiar inspection process and show exactly what the field worker would have to do differently.",
      },
    ],
    whyItWorks:
      "The script keeps the original campaign's best diagnostic question: does the data come back late, incomplete or unusable without cleanup? It follows the full journey from field collection to reporting.",
    whyBreakdown: [
      {
        label: "It starts with the data journey",
        text: "The buyer can think about collection, validation, approvals and reporting instead of hearing a list of software features.",
      },
      {
        label: "The questions expose double work",
        text: "A form may be digital while the reporting and cleanup are still manual. The script looks beyond the device used in the field.",
      },
      {
        label: "The demo uses one real process",
        text: "Showing one familiar inspection keeps the conversation practical and makes adoption easier to evaluate.",
      },
    ],
    personalization: [
      "Name the relevant workflow: inspection, work order, environmental sample, safety check, asset review or technical field report.",
      "For field operations, focus on submission and adoption. For quality or EHS, focus on validation and records. For systems leaders, focus on configuration and integration.",
      "Use an audit, backlog, mobile initiative or reporting delay only when verified.",
      "Do not claim staffing-cost reduction, instant reporting or AI accuracy without approved evidence.",
    ],
    alternatives: [
      {
        label: "Short version",
        description: "Keep the original field-data question.",
        script:
          "Hi [First Name], [Your Name] with [Company]. Does field data ever come back late, incomplete or not usable until someone cleans it up?",
      },
      {
        label: "Voicemail",
        description: "Name the gap between collection and reporting.",
        script:
          "Hi [First Name], this is [Your Name] with [Company]. I am reaching out about field inspections and the manual work between collecting technical data and turning it into usable reporting. I will send a short note as well. My number is [Phone Number].",
      },
      {
        label: "Inspection-manager opener",
        description: "Use for inspection and quality leaders.",
        script:
          "Hi [First Name], [Your Name] with [Company]. When an inspection is submitted from the field, how much validation and cleanup still happens before the report is ready?",
      },
    ],
    campaignPlan: {
      listFocus: "Utilities, construction, facilities, environmental and industrial-service organizations with field teams, recurring inspections and visible mobile or reporting initiatives.",
      callAround: "An inspection backlog, audit finding, new mobile initiative, reporting delay, field hiring or a system review.",
      meetingReady: "The buyer can identify one field process with delayed, incomplete or manually reworked data and can involve the owner of that workflow.",
      handoff: "Capture the inspection type, field users, current collection method, cleanup steps, approval path, reporting delay, systems and adoption concerns.",
    },
    faqs: [
      {
        question: "What should a field inspection software demonstration show?",
        answer: "Use one real inspection from data entry through validation, approval and reporting. That lets the buyer judge both field adoption and management visibility.",
      },
      {
        question: "Is this the same as a field-service management script?",
        answer: "Not exactly. This resource focuses on inspections, technical data and reporting. A broader field-service campaign may also cover scheduling, dispatch, inventory and customer work orders.",
      },
    ],
    related: [
      "frontline-workforce-software-cold-call-script",
      "industrial-alarm-notification-cold-call-script",
      "itsm-software-cold-call-script",
    ],
    relevantServices: [
      appointmentSetting("Book field-workflow demonstrations with operations, inspection and quality leaders."),
      aiGtm("Prioritize accounts showing field hiring, audit and mobile-transformation signals."),
      sdrTraining("Train reps to qualify the full data journey without overcomplicating the call."),
    ],
  },
];

waveTwoResources.forEach((resource) => {
  resource.publishedDate = "2026-08-16";
});

module.exports = waveTwoResources;
