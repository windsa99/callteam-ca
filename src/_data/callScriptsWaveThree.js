
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

const waveThreeResources = [
  {
    id: "CT-R004",
    slug: "ot-security-cold-call-script-for-manufacturers",
    title: "OT Security Cold Call Script for Manufacturers",
    seoTitle: "OT Security Cold Call Script for Manufacturing Sales",
    metaDescription:
      "Use this OT security cold call script to reach manufacturing security and plant leaders, uncover ownership gaps and book a focused OT discovery session.",
    publishedDate: "2026-08-16",
    category: "Cybersecurity",
    industry: "Manufacturing and industrial organizations",
    subindustry: "Operational technology and industrial cybersecurity",
    serviceCategory: "OT security assessment and managed security services",
    icp: "Manufacturers with connected plant systems where responsibility is divided between IT, operations, controls and outside partners.",
    companySize: "250+ employees or multiple facilities",
    geography: "North America and global markets",
    buyers: [
      "OT Security Manager",
      "Director of Industrial Cybersecurity",
      "CISO",
      "Plant IT Manager",
      "Controls Engineering Manager",
      "Director of Operational Technology",
    ],
    buyerLevel: "Technical and operational decision-maker",
    objective: "Book an OT security discovery session",
    scenario: "Ownership and visibility are unclear between corporate IT and plant-floor technology.",
    triggers: [
      "New connected equipment",
      "Plant expansion",
      "Security audit",
      "Insurer requirement",
      "Network segmentation project",
      "Recent plant disruption",
    ],
    archetype: "Ownership-gap-led",
    primaryKeyword: "OT security cold call script",
    secondaryKeywords: [
      "industrial cybersecurity sales script",
      "manufacturing cybersecurity cold call",
      "OT security discovery questions",
      "ICS security appointment-setting script",
    ],
    filters: ["Technology", "Operations"],
    opening:
      "Hi [First Name], [Your Name] with [Company]. Quick question: when a security issue appears in the plant environment, who actually owns the response—corporate IT, the controls team, plant operations, or an outside partner?",
    questions: [
      "Do IT and plant teams have the same visibility into industrial assets and remote access?",
      "How are findings prioritized when they affect production systems that cannot simply be taken offline?",
      "Is segmentation, incident response or asset visibility on the roadmap this year?",
    ],
    bridge:
      "We help industrial organizations close the gap between IT security and plant operations by clarifying ownership, testing exposure and building response plans around production realities.",
    cta: "Would you be open to a short working session on how other manufacturers structure responsibility across IT and OT?",
    fullScript: `Hi [First Name], [Your Name] with [Company]. Quick question: when a security issue appears in the plant environment, who actually owns the response—corporate IT, the controls team, plant operations, or an outside partner?

If relevant:
• Do IT and plant teams have the same visibility into industrial assets and remote access?
• How are findings prioritized when they affect production systems that cannot simply be taken offline?
• Is segmentation, incident response or asset visibility on the roadmap this year?

Bridge: We help industrial organizations close the gap between IT security and plant operations by clarifying ownership, testing exposure and building response plans around production realities.

CTA: Would you be open to a short working session on how other manufacturers structure responsibility across IT and OT?`,
    objections: [
      {
        objection: "Our controls team owns it.",
        response:
          "That is useful to know. The next question is how findings, escalation and incident response connect back to enterprise security.",
      },
      {
        objection: "We already have an OT monitoring tool.",
        response:
          "Good. Monitoring is valuable. The discussion is about who acts on the findings and whether the response process has been tested.",
      },
      {
        objection: "We cannot disrupt production.",
        response:
          "Agreed. Any assessment or improvement plan has to be designed around uptime, safety and the limits of the plant environment.",
      },
    ],
    whyItWorks:
      "It uses the ownership problem as the reason for the call, respects production constraints and avoids treating OT security like ordinary endpoint security.",
    whyBreakdown: [
      {
        label: "The opener finds the ownership gap",
        text: "IT, controls and plant operations may all touch security. Asking who owns the response exposes a real coordination problem without using fear.",
      },
      {
        label: "The questions respect production",
        text: "The caller learns how security decisions are made when a production asset cannot be patched, scanned or taken offline like a normal endpoint.",
      },
      {
        label: "The meeting has a practical purpose",
        text: "The CTA offers a working session about responsibility and response—not a vague cybersecurity presentation or an immediate tool replacement.",
      },
    ],
    personalization: [
      "Name the plant environment, facility expansion or segmentation project only when you have verified it.",
      "For CISOs, focus on governance and escalation. For OT and controls leaders, focus on production safety, asset visibility and workable response steps.",
      "Ask about remote access, segmentation or incident response based on the buyer's role instead of listing every OT security topic.",
      "Do not use breach claims, imply the plant is unsafe or promise that an assessment can happen with no operational impact.",
    ],
    alternatives: [
      {
        label: "Short version",
        description: "Use when the buyer gives you only a few seconds.",
        script:
          "Hi [First Name], [Your Name] with [Company]. Quick question: when a plant security issue appears, who owns the response—IT, controls or plant operations?",
      },
      {
        label: "Voicemail",
        description: "Leave one clear OT-specific reason for the call.",
        script:
          "Hi [First Name], this is [Your Name] with [Company]. I’m reaching out about the ownership gap between IT security and plant operations, especially around findings and incident response. I’ll send a short note as well. My number is [Phone Number].",
      },
      {
        label: "Plant-operations opener",
        description: "Use for plant IT, controls and operational-technology leaders.",
        script:
          "Hi [First Name], [Your Name] with [Company]. When security finds something in a production system that cannot simply be taken offline, how does your team decide what happens next?",
      },
    ],
    campaignPlan: {
      listFocus: "Manufacturers with connected plants, multiple facilities, industrial remote access or visible OT, controls and plant-technology leadership.",
      callAround: "A plant expansion, connected-equipment project, security audit, insurer request, segmentation initiative or recent operating disruption.",
      meetingReady: "The buyer can name a gap in OT ownership, asset visibility, remote access, segmentation or response planning and can involve both security and plant stakeholders.",
      handoff: "Record the facility scope, asset environment, ownership model, current monitoring, production constraints, main trigger and the people responsible for IT, OT and operations.",
    },
    faqs: [
      {
        question: "How is this different from a general cybersecurity cold call script?",
        answer:
          "This page is for operational technology in manufacturing. It focuses on plant ownership, industrial assets, production uptime and IT-to-OT response. The general cybersecurity script focuses on independent validation across the wider business environment.",
      },
      {
        question: "What qualifies an OT security appointment?",
        answer:
          "A useful meeting has a real plant environment, a known ownership or visibility question, a current trigger and the right security, controls or operations stakeholder involved.",
      },
    ],
    related: [
      "cybersecurity-risk-assessment-cold-call-script",
      "industrial-alarm-notification-cold-call-script",
      "field-inspection-software-cold-call-script",
    ],
    relevantServices: [
      appointmentSetting("Reach OT, security and plant leaders with a manufacturing-specific discovery campaign."),
      outsourcedSdr("Add account research, calling, qualification and a clear multi-stakeholder handoff."),
      sdrTraining("Train callers to discuss OT risk without ignoring uptime and production realities."),
    ],
  },
  {
    id: "CT-R005",
    slug: "credit-union-identity-protection-cold-call-script",
    title: "Credit Union Identity Protection Cold Call Script",
    seoTitle: "Credit Union Cold Call Script for Identity and Fraud Protection",
    metaDescription:
      "Use this credit union cold call script to reach digital and member-experience leaders, qualify identity-protection needs and book a focused discovery call.",
    publishedDate: "2026-08-16",
    category: "Financial Services",
    industry: "Credit unions and community financial institutions",
    subindustry: "Member identity, scam and fraud protection",
    serviceCategory: "Member-facing identity protection platform",
    icp: "Credit unions evaluating member-protection services, fraud support or digital-benefit programs.",
    companySize: "Community, regional and multi-branch credit unions",
    geography: "North America",
    buyers: [
      "Chief Digital Officer",
      "VP Digital Banking",
      "VP Member Experience",
      "Fraud Manager",
      "Product Director",
      "COO",
    ],
    buyerLevel: "Business and product decision-maker",
    objective: "Book a member-protection discovery session",
    scenario: "The institution wants to improve fraud support or bring fragmented member-protection services together.",
    triggers: [
      "Fraud complaints",
      "Digital banking expansion",
      "Member-retention initiative",
      "Vendor review",
      "New member-benefit program",
      "Fraud-support workload",
    ],
    archetype: "Permission-based current-state",
    primaryKeyword: "credit union cold call script",
    secondaryKeywords: [
      "fintech cold call script",
      "fraud prevention sales script",
      "digital banking sales script",
      "credit union identity protection script",
    ],
    filters: ["Finance", "Technology"],
    opening:
      "Hi [First Name], this is [Your Name] with [Company]. You were not expecting my call, so I’ll keep it short. Do you currently offer members any identity, scam or digital-security protection directly through the credit union?",
    questions: [
      "Is the service managed internally or through a third-party provider?",
      "How well are members adopting and using the protection today?",
      "Is the priority reducing fraud-support workload, improving member value or creating a stronger digital benefit?",
    ],
    bridge:
      "We help financial institutions deliver member protection through one managed program instead of separate tools and support processes. The useful question is whether the current approach is comprehensive, easy for members to use and sustainable for your team.",
    cta: "Would a short overview be worthwhile to compare the model with what you currently provide?",
    fullScript: `Hi [First Name], this is [Your Name] with [Company]. You were not expecting my call, so I’ll keep it short. Do you currently offer members any identity, scam or digital-security protection directly through the credit union?

If relevant:
• Is the service managed internally or through a third-party provider?
• How well are members adopting and using the protection today?
• Is the priority reducing fraud-support workload, improving member value or creating a stronger digital benefit?

Bridge: We help financial institutions deliver member protection through one managed program instead of separate tools and support processes. The useful question is whether the current approach is comprehensive, easy for members to use and sustainable for your team.

CTA: Would a short overview be worthwhile to compare the model with what you currently provide?`,
    objections: [
      {
        objection: "We handle this internally.",
        response:
          "That may be the right model. The conversation would simply compare coverage, adoption, support workload and whether anything is fragmented.",
      },
      {
        objection: "We already have a provider.",
        response:
          "Understood. A benchmark can still show whether members are using the service and whether the current coverage matches the problems your team is seeing.",
      },
      {
        objection: "We are too small.",
        response:
          "The fit depends more on member needs and the delivery model than institution size. We can establish that quickly before involving more people.",
      },
    ],
    whyItWorks:
      "The opening establishes relevance and current state immediately. The questions move the discussion from buying another tool to member use, protection coverage and operational workload.",
    whyBreakdown: [
      {
        label: "The opener asks permission through brevity",
        text: "It acknowledges the interruption, stays direct and asks a current-state question the buyer can answer without hearing a product pitch.",
      },
      {
        label: "The questions cover member and team value",
        text: "Adoption, support workload and member benefit help the caller identify whether the problem is coverage, delivery or actual use.",
      },
      {
        label: "The CTA offers a comparison",
        text: "A short overview lets the buyer benchmark the current model without agreeing to replace an internal program or existing provider.",
      },
    ],
    personalization: [
      "Use a verified digital-banking, member-experience or vendor-review trigger when one is available.",
      "For fraud leaders, focus on support and coverage. For digital and product leaders, focus on member use and delivery. For operations, focus on ownership and workload.",
      "Keep identity protection separate from underwriting, loan approval and income verification; those belong to the lending-workflow script.",
      "Do not use partner logos, guaranteed outcomes, adoption claims or monetization claims without approved evidence.",
    ],
    alternatives: [
      {
        label: "Short version",
        description: "Use when the buyer wants the point immediately.",
        script:
          "Hi [First Name], [Your Name] with [Company]. Do you currently offer members identity or scam protection through the credit union, and is it managed internally or by a provider?",
      },
      {
        label: "Voicemail",
        description: "Name the member-protection question without making a claim.",
        script:
          "Hi [First Name], this is [Your Name] with [Company]. I’m reaching out about how credit unions deliver identity, scam and digital-security protection to members. I’ll send a short note as well. My number is [Phone Number].",
      },
      {
        label: "Member-experience opener",
        description: "Use for digital, product and member-experience leaders.",
        script:
          "Hi [First Name], [Your Name] with [Company]. How easy is it for members to find, activate and use the identity-protection services you offer today?",
      },
    ],
    campaignPlan: {
      listFocus: "Credit unions with digital-banking, fraud, product or member-experience leadership and a visible focus on member protection or digital benefits.",
      callAround: "Fraud complaints, a digital-banking expansion, member-retention work, a provider review, a new benefit program or rising fraud-support demand.",
      meetingReady: "The buyer can describe the current member-protection model, a coverage, adoption or support problem and the team responsible for the service.",
      handoff: "Capture the member base, current provider or internal model, services offered, adoption visibility, support ownership, main priority and vendor-review timing.",
    },
    faqs: [
      {
        question: "Is this page about fraud prevention or loan underwriting?",
        answer:
          "It is about member-facing identity, scam and digital-security protection. It does not cover verifying borrower income or approving loans; use the income-verification script for that lending intent.",
      },
      {
        question: "What qualifies a credit union identity-protection appointment?",
        answer:
          "A useful meeting has a clear current model, a member or support problem, a responsible digital, fraud or product leader and a reason to review the program now.",
      },
    ],
    related: [
      "income-verification-software-cold-call-script-credit-unions",
      "payment-processing-cold-call-script",
      "cybersecurity-risk-assessment-cold-call-script",
    ],
    relevantServices: [
      appointmentSetting("Reach digital, fraud and member-experience leaders with a vertical-specific campaign."),
      outsourcedSdr("Add credit-union account research, calling, qualification and meeting handoff."),
      sdrTraining("Train reps to separate member protection from lending and general cybersecurity conversations."),
    ],
  },
  {
    id: "CT-R006",
    slug: "medical-device-engineering-software-cold-call-script",
    title: "Medical Device Engineering Software Cold Call Script",
    seoTitle: "Medical Device Sales Call Script for Engineering Software",
    metaDescription:
      "Use this medical device sales call script to reach engineering and quality leaders, qualify design-control workflow gaps and book a focused software demo.",
    publishedDate: "2026-08-16",
    category: "Healthcare Technology",
    industry: "Medical devices and regulated product development",
    subindustry: "Design controls, requirements, testing and quality engineering",
    serviceCategory: "AI-assisted engineering and compliance software",
    icp: "Medical-device manufacturers developing or updating regulated products with manual requirements and test-case workflows.",
    companySize: "50+ employees with engineering and quality teams",
    geography: "Global",
    buyers: [
      "VP Engineering",
      "Director of R&D",
      "Systems Engineering Director",
      "Design Assurance Director",
      "Quality Engineering Manager",
      "Regulatory Affairs Director",
    ],
    buyerLevel: "Technical, quality and compliance buyer",
    objective: "Book a workflow discovery and product demonstration",
    scenario: "Engineering teams spend too much time writing, reviewing and tracing requirements and tests.",
    triggers: [
      "New product program",
      "Audit finding",
      "Design-control remediation",
      "Engineering hiring constraint",
      "Documentation backlog",
      "Quality-system initiative",
    ],
    archetype: "Workflow-problem-led",
    primaryKeyword: "medical device sales call script",
    secondaryKeywords: [
      "medtech cold call script",
      "engineering software sales script",
      "regulatory software cold call",
      "medical device engineering prospecting script",
    ],
    filters: ["Technology", "Operations"],
    opening:
      "Hi [First Name], [Your Name] with [Company]. I’m calling because of your work in medical-device development. Are your engineering teams still creating and reviewing design requirements and test cases largely by hand?",
    questions: [
      "Where does the process slow down most: drafting, review, traceability or compliance documentation?",
      "How often are missing or unclear requirements discovered late in testing?",
      "Are teams using AI experimentally, or is there already a governed workflow around it?",
    ],
    bridge:
      "We help regulated engineering teams automate parts of requirements and test-case development while keeping human review, traceability and quality controls in the process. The goal is to reduce repetitive work and catch design gaps earlier—not replace engineering judgment.",
    cta: "Would a short workflow demonstration using a generic design example be useful?",
    fullScript: `Hi [First Name], [Your Name] with [Company]. I’m calling because of your work in medical-device development. Are your engineering teams still creating and reviewing design requirements and test cases largely by hand?

If relevant:
• Where does the process slow down most: drafting, review, traceability or compliance documentation?
• How often are missing or unclear requirements discovered late in testing?
• Are teams using AI experimentally, or is there already a governed workflow around it?

Bridge: We help regulated engineering teams automate parts of requirements and test-case development while keeping human review, traceability and quality controls in the process. The goal is to reduce repetitive work and catch design gaps earlier—not replace engineering judgment.

CTA: Would a short workflow demonstration using a generic design example be useful?`,
    objections: [
      {
        objection: "We cannot trust AI for regulated work.",
        response:
          "Agreed—unreviewed AI output would be unacceptable. The discussion should focus on governance, traceability, validation and where human approval remains mandatory.",
      },
      {
        objection: "Our quality system already covers this.",
        response:
          "The question is not whether a quality system exists. It is how much manual effort remains inside the requirements and testing workflow.",
      },
      {
        objection: "This is not an engineering priority.",
        response:
          "Understood. Is the bigger priority time to market, audit readiness, product quality or simply clearing the documentation backlog?",
      },
    ],
    whyItWorks:
      "It speaks the buyer’s regulated-workflow language, handles AI skepticism directly and positions automation as controlled assistance instead of a replacement for engineering judgment.",
    whyBreakdown: [
      {
        label: "The opener names the manual workflow",
        text: "Requirements and test cases are concrete. The buyer can answer without first accepting a broad claim about AI or engineering productivity.",
      },
      {
        label: "The questions cover control and quality",
        text: "Drafting, review, traceability and governance keep the discovery inside the real design-control process instead of a generic software pitch.",
      },
      {
        label: "The demo stays safe and specific",
        text: "A generic design example lets the team assess the workflow without exposing regulated product information or treating the demo as validation evidence.",
      },
    ],
    personalization: [
      "Name the product program or design-control initiative only when it is verified and not confidential.",
      "For engineering leaders, focus on requirements and testing. For quality and design assurance, focus on traceability, review and governed use.",
      "Use a generic demonstration example; do not request protected product or patient information during early discovery.",
      "Do not make speed, accuracy, defect-reduction, compliance or cost claims without approved evidence.",
    ],
    alternatives: [
      {
        label: "Short version",
        description: "Use when the buyer wants one clear workflow question.",
        script:
          "Hi [First Name], [Your Name] with [Company]. Where does the requirements and test-case process still create the most manual work—drafting, review or traceability?",
      },
      {
        label: "Voicemail",
        description: "Keep the message focused on regulated engineering work.",
        script:
          "Hi [First Name], this is [Your Name] with [Company]. I’m reaching out about manual requirements, test-case and traceability work in medical-device development. I’ll send a short note as well. My number is [Phone Number].",
      },
      {
        label: "Quality-leader opener",
        description: "Use for design assurance, quality and regulatory buyers.",
        script:
          "Hi [First Name], [Your Name] with [Company]. How much manual review is still required to keep requirements, tests and traceability aligned through design changes?",
      },
    ],
    campaignPlan: {
      listFocus: "Medical-device manufacturers with active product programs, engineering and quality teams, visible design-control work or hiring in systems, quality and regulatory roles.",
      callAround: "A new product program, audit finding, design-control remediation, documentation backlog, engineering-capacity gap or governed-AI initiative.",
      meetingReady: "The buyer can identify a requirements, test, traceability or review workflow with manual effort and can involve the relevant engineering and quality owners.",
      handoff: "Capture the product-development stage, current tools, manual steps, design-control process, review owners, governance requirements, sensitive-data limits and demonstration goal.",
    },
    faqs: [
      {
        question: "Should an SDR promise that AI will speed up regulated engineering work?",
        answer:
          "No. The caller should qualify the workflow and explain that any automation must keep human review, traceability, validation and quality controls in place. Use approved evidence only.",
      },
      {
        question: "What makes the software demonstration relevant?",
        answer:
          "Use one generic requirements-and-testing example that shows drafting, review and traceability. Confirm the buyer's governance and quality questions before discussing a broader rollout.",
      },
    ],
    related: [
      "healthcare-software-modernization-cold-call-script",
      "field-inspection-software-cold-call-script",
      "software-procurement-advisory-cold-call-script",
    ],
    relevantServices: [
      appointmentSetting("Reach engineering, quality and regulatory leaders with a workflow-led campaign."),
      outsourcedSdr("Add medtech account research, multi-threaded outreach and qualified demonstration handoff."),
      aiGtm("Prioritize regulated product teams showing design-control, hiring or governed-AI signals."),
    ],
  },
  {
    id: "CT-R014",
    slug: "income-verification-software-cold-call-script-credit-unions",
    title: "Income Verification Software Cold Call Script for Credit Unions",
    seoTitle: "Income Verification Software Cold Call Script for Lenders",
    metaDescription:
      "Use this income-verification software cold call script to reach lending leaders, qualify underwriting friction and book a focused workflow demonstration.",
    publishedDate: "2026-08-16",
    category: "Lending Technology",
    industry: "Credit unions and consumer lenders",
    subindustry: "Underwriting and income verification",
    serviceCategory: "Permissioned financial-data income verification software",
    icp: "Lenders using pay stubs, tax documents, manual verification or fragmented data during consumer underwriting.",
    companySize: "Community to enterprise financial institutions",
    geography: "North America",
    buyers: [
      "Chief Lending Officer",
      "VP Consumer Lending",
      "Underwriting Director",
      "Credit Risk Director",
      "Digital Lending Director",
      "COO",
    ],
    buyerLevel: "Lending and risk buyer",
    objective: "Book an underwriting-workflow demonstration",
    scenario: "Income verification slows decisions and creates document friction for applicants and underwriting teams.",
    triggers: [
      "Digital-lending initiative",
      "Loan-growth target",
      "Application abandonment",
      "Underwriting backlog",
      "Fraud concern",
      "Core-system project",
    ],
    archetype: "Process-time-led",
    primaryKeyword: "income verification sales script",
    secondaryKeywords: [
      "lending software cold call script",
      "credit union sales script",
      "fintech cold call script",
      "underwriting software appointment-setting script",
    ],
    filters: ["Finance", "Technology"],
    opening:
      "Hi [First Name], [Your Name] with [Company]. Quick question about your lending process: are applicants still uploading pay stubs and other documents for income verification, or can your team verify income directly from permissioned financial data?",
    questions: [
      "Where does verification create the most delay or manual follow-up?",
      "How do you handle applicants with variable, gig or nontraditional income?",
      "Is the priority faster decisions, a better applicant experience, reduced fraud or lower operational effort?",
    ],
    bridge:
      "We help lending teams verify multiple income sources through permissioned financial data, reducing document chasing while keeping the result available for underwriting review.",
    cta: "Would a short workflow demo be useful using a generic applicant example?",
    fullScript: `Hi [First Name], [Your Name] with [Company]. Quick question about your lending process: are applicants still uploading pay stubs and other documents for income verification, or can your team verify income directly from permissioned financial data?

If relevant:
• Where does verification create the most delay or manual follow-up?
• How do you handle applicants with variable, gig or nontraditional income?
• Is the priority faster decisions, a better applicant experience, reduced fraud or lower operational effort?

Bridge: We help lending teams verify multiple income sources through permissioned financial data, reducing document chasing while keeping the result available for underwriting review.

CTA: Would a short workflow demo be useful using a generic applicant example?`,
    objections: [
      {
        objection: "Our current process works.",
        response:
          "Understood. The comparison would focus on turnaround time, manual touchpoints, applicant drop-off and exceptions—not changing a process without a reason.",
      },
      {
        objection: "We are concerned about data privacy.",
        response:
          "That is essential. The next step should cover consumer permission, data handling, security controls and how the output enters underwriting.",
      },
      {
        objection: "Our core system cannot support it.",
        response:
          "Integration is a valid qualification point. We can establish the technical path before discussing a broader rollout.",
      },
    ],
    whyItWorks:
      "It opens with a simple current-state question, exposes the operational friction and keeps the conversation grounded in underwriting workflow rather than abstract open-banking terminology.",
    whyBreakdown: [
      {
        label: "The opener creates a clear comparison",
        text: "Manual document uploads and permissioned data are easy for the lending buyer to compare without hearing an unproven performance claim.",
      },
      {
        label: "The questions reveal real exceptions",
        text: "Variable income, follow-up and applicant friction help the caller learn where the process breaks instead of assuming every loan follows the same path.",
      },
      {
        label: "The demo protects the buyer",
        text: "A generic applicant example keeps personal data out of early discovery and lets underwriting, risk and technology stakeholders review the workflow together.",
      },
    ],
    personalization: [
      "Use a verified digital-lending, loan-growth, underwriting or core-system trigger when one exists.",
      "For lending leaders, focus on the applicant and decision workflow. For risk leaders, focus on exceptions and review. For digital leaders, focus on permission and integration.",
      "Keep underwriting intent separate from the member identity-protection page, which is about scams, fraud support and digital member benefits.",
      "Do not promise faster approvals, fraud reduction, higher conversion or pilot terms without approved evidence.",
    ],
    alternatives: [
      {
        label: "Short version",
        description: "Use when the lending leader wants one direct question.",
        script:
          "Hi [First Name], [Your Name] with [Company]. Are borrowers still uploading income documents, or can underwriting verify income from permissioned financial data today?",
      },
      {
        label: "Voicemail",
        description: "Name the verification workflow, not an outcome claim.",
        script:
          "Hi [First Name], this is [Your Name] with [Company]. I’m reaching out about document chasing and exception handling inside income verification. I’ll send a short note as well. My number is [Phone Number].",
      },
      {
        label: "Underwriting opener",
        description: "Use for underwriting and credit-risk leaders.",
        script:
          "Hi [First Name], [Your Name] with [Company]. Which income-verification cases create the most manual follow-up for underwriting—standard payroll, variable income or exceptions?",
      },
    ],
    campaignPlan: {
      listFocus: "Credit unions and consumer lenders with digital-lending, underwriting, credit-risk or lending-operations leadership and a visible loan-workflow initiative.",
      callAround: "A digital-lending project, loan-growth target, application-abandonment concern, underwriting backlog, fraud review or core-system change.",
      meetingReady: "The buyer can identify a verification step, borrower segment or exception that creates manual work and can involve lending, risk and technical stakeholders.",
      handoff: "Capture the loan types, current verification method, document and exception flow, variable-income handling, privacy questions, systems, stakeholders and project timing.",
    },
    faqs: [
      {
        question: "How is this different from the credit union identity-protection script?",
        answer:
          "This page is for loan underwriting and income verification. The identity-protection page is for member-facing scam, fraud and digital-security services. The buyers, workflow and meeting objective are different.",
      },
      {
        question: "What should an income-verification demo include?",
        answer:
          "Use a generic applicant example and show permission, data intake, multiple income sources, exceptions, underwriting review and the expected integration path. Do not use real personal information.",
      },
    ],
    related: [
      "credit-union-identity-protection-cold-call-script",
      "payment-processing-cold-call-script",
      "software-procurement-advisory-cold-call-script",
    ],
    relevantServices: [
      appointmentSetting("Reach lending, underwriting and credit-risk leaders with a workflow-led campaign."),
      outsourcedSdr("Add lender account research, calling, qualification and multi-stakeholder handoff."),
      aiGtm("Prioritize financial institutions showing digital-lending, risk and core-system signals."),
    ],
  },
];

module.exports = waveThreeResources;
