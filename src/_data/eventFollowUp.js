module.exports = {
  situations: [
    { label: 'A demo was requested', title: 'Pick up the request.', note: 'The visitor asked to see how your product would handle a specific task.', action: 'Confirm the use case, relevant people and available times. Pass the original request to the person running the demo.', next: 'A focused demo or discovery meeting' },
    { label: 'A useful conversation happened', title: 'Continue the discussion.', note: 'Your team discussed a problem, but left without an agreed appointment.', action: 'Refer to the recorded conversation. Check whether the issue is worth exploring and what a useful next step would cover.', next: 'A qualified meeting or a dated follow-up' },
    { label: 'Only a badge scan is recorded', title: 'Establish relevance first.', note: 'You have a contact record with little information about the person’s interest.', action: 'Introduce your company and the event context accurately. Check account fit, the person’s role and whether the topic is relevant.', next: 'A conversation, a referral or a recorded outcome' }
  ],
  checklist: [
    { title: 'Event and source', text: 'Event name, date and how the contact entered your list: booth visit, introduction, session or registration.' },
    { title: 'Person and company', text: 'Name, business, role and usable contact details. Flag missing information for review.' },
    { title: 'What was discussed', text: 'The problem, question or use case recorded by your team. Keep the original notes attached.' },
    { title: 'What they requested', text: 'A demo, a document, a quote, a callback or another specific action.' },
    { title: 'Account fit', text: 'Which companies belong in the campaign and which should be excluded.' },
    { title: 'Sales ownership', text: 'Existing customers, active opportunities and accounts already assigned to a seller.' },
    { title: 'Contact preferences', text: 'Requested timing, approved channels and any do-not-contact instructions.' }
  ],
  outcomes: [
    { status: 'Qualified meeting', meaning: 'Fit, a relevant buyer and a useful meeting purpose are confirmed.', action: 'Schedule, confirm and send the context to your salesperson.' },
    { status: 'Follow-up agreed', meaning: 'The person requested information or another conversation.', action: 'Record the exact task, owner and due date.' },
    { status: 'Later timing', meaning: 'The account fits, but the useful conversation belongs later.', action: 'Keep the stated reason and agreed return date.' },
    { status: 'Not reached', meaning: 'Attempts have been made without a live conversation.', action: 'Continue within the agreed sequence or close it with a recorded outcome.' },
    { status: 'Wrong fit or owner', meaning: 'The account is unsuitable or belongs with another person.', action: 'Record the reason and route a useful referral where appropriate.' },
    { status: 'Removed from outreach', meaning: 'The contact declined further contact or must be excluded.', action: 'Update the record and stop the sequence.' }
  ],
  faqs: [
    { q: 'What are trade show lead follow-up services?', a: 'A trade show lead follow-up service works the contacts collected at a recent event. CallTeam reviews the list and notes, agrees priorities with your team, makes the calls, follows up, qualifies interest and books suitable sales meetings. Each worked contact keeps its event source, outcome and next action.' },
    { q: 'Can you work with badge scans that have little information?', a: 'Yes, subject to usable contact details and an agreed reason to reach out. We separate badge-only records from explicit requests and documented conversations. Callers establish relevance and interest before proposing a meeting. Records with missing details are flagged for review.' },
    { q: 'How soon can follow-up start after our event?', a: 'We confirm the start date after reviewing your list, event notes, approved message, calling capacity and sales availability. Sharing the plan before the event helps preparation. The two-week workflow on this page is an example; your proposal sets the actual schedule and coverage.' },
    { q: 'Do you follow up conference, webinar and virtual-event leads?', a: 'Yes. We can scope follow-up for recent conference contacts, webinar attendees and virtual-event enquiries. The opening follows the person’s actual interaction, such as a question, request or registration. We keep the source and level of engagement visible throughout the campaign.' },
    { q: 'How do you avoid duplicating work our salespeople are already doing?', a: 'Before calling, we agree account ownership and exclusions, identify active opportunities and check existing customers. Each open record has a next-action owner. If your salesperson takes over a conversation, we update the handoff and stop overlapping outreach.' },
    { q: 'What makes a post-event appointment qualified?', a: 'The account must fit your agreed criteria, the participant must have a relevant role and there must be a credible reason to meet. We confirm the purpose with the buyer and pass the original event context, questions, timing and unresolved details to your sales team.' },
    { q: 'How is an event follow-up campaign priced?', a: 'We scope the work around contact volume, data quality, target markets, calling effort, follow-up window, qualification and reporting. Your proposal confirms the price, duration and responsibilities. The illustrative two-week plan is a workflow example, not a fixed package or contract term.' },
    { q: 'Can you help an international company follow up US or Canadian event contacts?', a: 'Yes. We plan outreach around the agreed US or Canadian market, local calling hours, available contact methods and your sales team’s calendar. Other English-speaking markets can be discussed during scoping. Your company’s location and the buyers you want to reach are considered separately.' }
  ]
};
