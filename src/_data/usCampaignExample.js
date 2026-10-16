module.exports = {
  branches: [
    {
      id: 'existing-system',
      label: 'We already have software',
      title: 'Find out whether a gap remains.',
      response: 'We already use an ERP across our three distribution locations. Our invoice approvals are handled there.',
      reply: 'Understood. When an invoice needs approval, can your team see who has it and what is holding it up, or does anyone still chase that outside the system?',
      next: 'In this version of the conversation, the controller says approvals are visible in the ERP and there is no current problem to solve. Thank them and close the conversation. They have not agreed to a meeting or further follow-up.',
      qualification: 'The company and role fit the target. The buyer has not identified an unmet need. Keep this as a completed conversation with no meeting.',
      handoff: {
        status: 'Closed: no current need identified',
        reason: 'The controller reports that invoice approvals are visible in the existing ERP and no one needs to chase them outside it.',
        currentState: 'Three US distribution locations. Invoice approvals handled within the ERP.',
        role: 'Controller responsible for the finance workflow. Purchasing authority was not established.',
        timing: 'No evaluation timing discussed. No follow-up agreed.',
        unknowns: 'ERP product, budget and purchasing process were not explored. There is no reason to fill those gaps through another call right now.',
        nextStep: 'Record the stated reason, close this outreach sequence and leave the prospect without an appointment.'
      }
    },
    {
      id: 'send-info',
      label: 'Send me some information',
      title: 'Agree on what to send and what happens next.',
      response: 'I am the controller for our three distribution locations, but I cannot talk now. Send me some information.',
      reply: 'Of course. Would a short example showing how invoice approvals move between locations be useful? If it is, may I send that and call once on Wednesday morning to see whether it relates to your process?',
      next: 'The controller agrees to that specific example and one follow-up call on Wednesday, October 21, 2026, at 10:00 a.m. Chicago time. Confirm the email address and local time, then send what was requested. The follow-up is a call to establish relevance; it is not a booked sales meeting.',
      qualification: 'The account and role fit. The current approval process, any problem and interest in a sales discussion are still unknown. Permission to send information is not enough to qualify a meeting.',
      handoff: {
        status: 'Follow-up agreed: meeting not qualified',
        reason: 'The controller requested a relevant example and agreed to one follow-up call. No workflow problem has been established.',
        currentState: 'Three US distribution locations. The current ERP and approval process are unknown.',
        role: 'Controller. Responsibilities beyond the job title and purchasing authority remain unconfirmed.',
        timing: 'Illustrative follow-up: Wednesday, October 21, 2026, at 10:00 a.m. America/Chicago (CDT), which is 11:00 a.m. America/New_York (EDT).',
        unknowns: 'Current process, unmet need, timing of any evaluation, budget and buying process.',
        nextStep: 'The caller sends the agreed approval-workflow example to the confirmed address and makes the single agreed follow-up call. Ask about relevance before proposing a sales meeting.'
      }
    },
    {
      id: 'relevant-problem',
      label: 'That is a problem for us',
      title: 'Turn a specific problem into a useful meeting.',
      response: 'I am the controller for all three distribution locations. We have an ERP, but approvals still come back by email and my team has to chase people. I would look at a better way to handle that.',
      reply: 'Then a short workflow discussion could be useful. We would look at where approvals leave your ERP, how your team follows up and whether this software could fit. Would you be open to 20 minutes on Tuesday, October 20, at 10:30 a.m. Chicago time?',
      next: 'The controller agrees to that purpose and time. Confirm their email address and send the invitation for Tuesday, October 20, 2026, at 10:30 a.m. America/Chicago, which is 11:30 a.m. America/New_York. Pass the stated problem and remaining questions to the salesperson. Track invitation acceptance and attendance separately.',
      qualification: 'This example meets the agreed first-meeting standard: a suitable distributor, a controller who owns the workflow, a stated approval problem, interest in exploring it and explicit agreement to the meeting. Budget and final purchasing authority are still unknown.',
      handoff: {
        status: 'Qualified to book: buyer agreed to the discussion',
        reason: 'The controller wants to explore how to reduce manual chasing when invoice approvals move outside the ERP.',
        currentState: 'Three US distribution locations. The ERP is in use, but approvals return by email and the finance team follows up manually.',
        role: 'Controller responsible for the finance workflow across all three locations. Final purchasing authority is unconfirmed.',
        timing: 'Illustrative meeting: Tuesday, October 20, 2026, 10:30–10:50 a.m. America/Chicago (CDT), which is 11:30–11:50 a.m. America/New_York (EDT). Implementation timing is unknown.',
        unknowns: 'ERP product and integration requirements, invoice volume, approval rules, budget, final decision-maker and implementation timetable.',
        nextStep: 'The caller sends the agreed invitation. The salesperson reviews the notes before the 20-minute workflow discussion, checks software fit and agrees any further step with the controller. No opportunity has been recorded yet.'
      }
    }
  ],
  faqs: [
    {
      q: 'How does a US B2B lead-generation calling campaign work?',
      a: 'Start with a clear offer, suitable US companies and the people responsible for the problem you solve. Prepare a relevant opening, make the calls, record the responses and qualify interest against an agreed standard. Book a meeting when the buyer has a useful reason to talk and agrees to the next step. Give the salesperson the context and review what happens after the meeting.'
    },
    {
      q: 'Is this an actual CallTeam campaign or customer conversation?',
      a: 'This is an illustrative walkthrough of the decisions and records involved. The software offer, buyer responses and meeting dates are examples. For results from real engagements, see the linked CallTeam case studies.'
    },
    {
      q: 'Does every interested prospect become a booked appointment?',
      a: 'A meeting should meet the qualification standard agreed with your sales team. In this example, the company must fit, the contact must own the relevant workflow, a problem must be identified and the buyer must agree to the discussion. A request for information can lead to an agreed follow-up. A prospect whose needs are already met leaves the sequence without a booking.'
    },
    {
      q: 'Can CallTeam run campaigns for buyers in the United States?',
      a: 'Yes. CallTeam supports B2B campaigns targeting the United States, including companies entering the US market from abroad. The campaign scope should specify territories, buyer time zones, calling coverage and calendar arrangements. Serving US buyers does not by itself describe where the calling team is located; confirm team arrangements when discussing your campaign.'
    },
    {
      q: 'How much does a CallTeam US calling campaign cost?',
      a: 'CallTeam managed B2B outbound calling and appointment-setting programs start at US$4,000 per month for a campaign-ready company. That means an established offer, a defined market, target accounts ready to activate, CRM and calendar access, and a sales team ready for qualified conversations. Fresh prospect data, additional markets and expanded delivery requirements can increase the scope. Review the pricing page for what is included.'
    },
    {
      q: 'Do we need to supply the prospect list and CRM?',
      a: 'CallTeam can work from an existing target-account list or agreed CRM workflow. Fresh prospect research and data can be added to the scope. Before calling, agree which records to use, who owns each account, what fields to capture and how meeting notes reach sales. CRM access and any deeper integration depend on the agreed permissions and delivery requirements.'
    },
    {
      q: 'How do the free CallTeam resources help with this campaign?',
      a: 'Campaign Preview gives you a starting approach based on your answers. The Script Checker reviews a draft against defined rules. The ROI Calculator models financial outcomes from your assumptions. Meeting Quality Check calculates progression from your recorded meeting counts. Proposal Comparison helps you examine agency scope. Use each resource for its specific decision, then bring your questions to a campaign discussion.'
    },
    {
      q: 'Can we use this example for a different offer or industry?',
      a: 'Yes. Keep the structure and replace the buyer, account criteria, problem, opening question and qualification standard with details from your market. Confirm what your offer can actually do before making claims. The example brief is free to copy or download, and CallTeam can discuss how the approach would change for your campaign.'
    }
  ],
  briefText: `US B2B LEAD GENERATION CAMPAIGN EXAMPLE
From cold call to a qualified sales meeting
CallTeam | https://www.callteam.ca/us-b2b-lead-generation-campaign-example/

ILLUSTRATIVE CAMPAIGN
This completed brief is an example for planning. The offer, company profile, buyer responses and dates are fictional. It contains no client transcript or claimed campaign results.

1. THE OFFER
Accounts-payable workflow software that helps a finance team route invoice approvals, see the current approver and track outstanding actions. In this illustration, the software is intended to work alongside the buyer's ERP. Actual integration and fit must be checked during discovery.

2. THE TARGET
US industrial distributors with multiple locations and a finance team responsible for supplier invoices. Start with Eastern and Central time-zone territories. Verify each contact's local time zone before calling or scheduling.

Primary contact: Controller who owns the invoice-approval workflow.
Other possible contact: Accounts Payable Manager who can explain the current process and identify the person responsible for evaluating a change.

Illustrative account: An industrial distributor with three US locations. The controller works in Chicago.

3. WHO TO EXCLUDE
Consumer-only retailers, businesses outside the agreed territories and records that do not establish the basic account fit. Check existing customer, active-opportunity and contact-suppression records before adding an account to outreach. An appropriate company can still leave the sequence when the buyer reports no relevant need.

4. WHAT TO PREPARE
Confirm company activity, locations, contact role and local time zone. Record the source of each fact. Agree record ownership, access permissions, contact preferences, campaign exclusions and the handoff format before calling. Do not treat a job title as proof of purchasing authority.

5. THE OPENING
"Hi [First name], it's [Your name] with [Company]. We help finance teams manage invoice approvals across locations. How do approvals work between your branches and the finance team today?"

Replace the placeholders with the real caller and company identity in an actual campaign, and describe only capabilities the product can support.

6. THE CONVERSATION DECISIONS
Already handled in the ERP: Ask whether any approval work still happens outside it. If the buyer reports that the process works and there is no current need, close the conversation without a meeting.

Requests information: Agree which information would be useful. Ask whether the buyer wants a follow-up and confirm its timing. A request for information alone does not qualify a sales meeting.

Describes a relevant problem: Confirm their responsibility for the workflow, interest in discussing it and a useful purpose for the meeting. Ask for explicit agreement to a time.

7. THE FIRST-MEETING STANDARD
The account is a suitable industrial distributor.
The contact owns the invoice-approval workflow or brings that person into the discussion.
The buyer identifies a relevant problem.
The buyer wants to explore whether a change could help.
The buyer agrees to a defined discussion and time.

For this example, budget and final purchasing authority can remain unknown at the first meeting. Record them as unknown. A real campaign should use the qualification criteria agreed with its sales team.

8. THE COMPLETED HANDOFF EXAMPLE
Status: Qualified to book; buyer agreed to the discussion. Invitation acceptance and attendance remain to be tracked.
Account: Illustrative US industrial distributor with three locations.
Contact: Controller responsible for the finance workflow across all three locations.
Current process: ERP in use; invoice approvals return by email.
Stated problem: The finance team chases approvers manually.
Interest: The controller wants to explore a better way to handle the approval workflow.
Meeting purpose: Review where approvals leave the ERP, how follow-up works and whether the proposed software could fit.
Agreed illustrative time: Tuesday, October 20, 2026, 10:30-10:50 a.m. America/Chicago (CDT), equivalent to 11:30-11:50 a.m. America/New_York (EDT).
Unknowns: ERP product, integration requirements, invoice volume, approval rules, budget, final decision-maker and implementation timetable.
Caller action: Confirm the address, send the agreed invitation and pass these notes to the salesperson.
Salesperson action: Review the notes, run the workflow discussion and agree any further step with the buyer.
Opportunity status: No opportunity recorded yet.

9. WHAT TO REVIEW AFTER THE MEETING
Record whether the meeting happened, whether it met the agreed qualification standard and whether a next sales step was established. Capture the reason when a meeting is rejected or postponed. Review outcomes from the same group of bookings. Keep future meetings and unknown outcomes separate from completed results.

10. CAMPAIGN ECONOMICS
CallTeam managed B2B outbound calling and appointment-setting programs start at US$4,000 per month for a campaign-ready company. Fresh prospect data and expanded requirements are priced into the final scope. This example sets no monthly meeting target and predicts no campaign result.
Pricing and scope: https://www.callteam.ca/pricing/

USE THIS BRIEF FOR YOUR MARKET
Replace the illustrative offer, audience, workflow problem, question and qualification criteria with your own. Keep unknown information visible. Agree the actual territory, coverage, data requirements and sales handoff before launch.

Discuss your US calling campaign: https://calendly.com/hello-callteam/new-meeting
`
};
