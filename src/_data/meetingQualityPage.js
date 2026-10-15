module.exports = {
  examples: [
    { id: 'small', label: 'A small, completed campaign', input: { booked: 8, held: 6, accepted: 4, opportunities: 2, outcomes: 'complete' } },
    { id: 'pending', label: 'A campaign still in progress', input: { booked: 8, held: 4, accepted: 3, opportunities: 1, outcomes: 'pending' } },
    { id: 'missing', label: 'Sales acceptance is not tracked', input: { booked: 8, held: 6, accepted: null, opportunities: 2, outcomes: 'unknown' } }
  ],
  fields: [
    { key: 'booked', number: '01', label: 'Meetings booked', placeholder: '8', help: 'Count each original booking once. Keep reschedules with that booking.' },
    { key: 'held', number: '02', label: 'Meetings held', placeholder: '6', help: 'How many of those booked meetings actually happened?' },
    { key: 'accepted', number: '03', label: 'Held meetings accepted by sales', placeholder: '4', help: 'Of the meetings held, how many met your agreed qualification criteria?' },
    { key: 'opportunities', number: '04', label: 'Meetings that created an opportunity', placeholder: '2', help: 'Of the accepted meetings, how many led to a recorded sales opportunity? Count each meeting once.' }
  ],
  definitions: [
    { name: 'Booked meeting', definition: 'A prospect agreed to a sales conversation and a time was scheduled.', rule: 'Count the original booking once, even if it is rescheduled.' },
    { name: 'Held meeting', definition: 'The scheduled conversation actually took place.', rule: 'Include only meetings from the same booked group.' },
    { name: 'Sales-accepted meeting', definition: 'A held meeting met the qualification criteria your sales team agreed to use.', rule: 'This tool counts acceptance after the meeting. Some CRMs use sales acceptance earlier; align your figures first.' },
    { name: 'Opportunity-producing meeting', definition: 'An accepted meeting led to a recorded opportunity with a defined next sales step.', rule: 'Count meetings that produced opportunities, not multiple deals from one meeting.' }
  ],
  investigations: [
    { title: 'Bookings are not becoming held meetings', text: 'First separate future dates, cancellations, reschedules and no-shows. Then review the invitation, agreed purpose, booking delay and confirmation process.', href: '/articles/outbound-appointment-setting/', label: 'Review attendance and follow-up' },
    { title: 'Held meetings are not being accepted', text: 'Read the sales team’s rejection reasons. Compare customer fit, the buyer’s role, a relevant problem and the expected conversation with your qualification agreement.', href: '/articles/what-makes-b2b-appointment-qualified-practical-standard/', label: 'Use a practical qualification standard' },
    { title: 'Accepted meetings are not becoming opportunities', text: 'Check how long those opportunities normally take to develop, the discovery notes and the next step agreed with the buyer. Review the handoff before changing the whole campaign.', href: '/articles/how-to-hand-off-qualified-appointment-from-sdr-to-sales/', label: 'Improve the sales handoff' },
    { title: 'The outcome is not recorded', text: 'Add a simple held, accepted, rejected or pending status, a reason and an owner in your CRM. Reconcile the same group of bookings before comparing rates.', href: '/articles/appointment-setting-crm-integration/', label: 'Connect meetings to CRM outcomes' }
  ],
  faqs: [
    { q: 'How do I calculate appointment-setting performance?', a: 'Track the same group of bookings through held meetings, sales acceptance and opportunities. Divide held by booked for the held rate, accepted by held for the acceptance rate, and opportunity-producing meetings by held for the meeting-to-opportunity rate. Multiply each result by 100. The calculator shows these figures together.' },
    { q: 'What is the difference between a booked meeting and a qualified meeting?', a: 'A booked meeting has an agreed time. A qualified meeting meets criteria you and your sales team have defined, such as customer fit, a relevant contact, a real reason to talk and a useful next step. A booking alone does not establish those things. This tool uses held meetings accepted by sales as a separate, explicitly defined stage.' },
    { q: 'Does booked minus held give me the no-show rate?', a: 'No. That difference can include meetings still to happen, cancelled bookings, reschedules and no-shows. Classify the outcomes before using a no-show rate. The calculator calls the difference meetings not held, rather than assuming why they did not happen.' },
    { q: 'What is a good meeting-to-opportunity conversion rate?', a: 'There is no single target that fits every campaign. The offer, audience, qualification standard, sales cycle and definition of an opportunity all affect the result. Compare completed groups using consistent definitions, then use rejection reasons and sales feedback to decide what to improve.' },
    { q: 'Can I use this with only a few meetings?', a: 'Yes. Small counts can still reveal missing information and useful follow-up questions. Treat the percentages as a description of that group. With six held meetings, one different outcome changes a held-meeting conversion rate by about 16.7 percentage points.' },
    { q: 'What if the campaign is still running or I do not track a stage?', a: 'Choose “Still in progress” if outcomes are pending. Leave an untracked stage blank or select “I don’t track this.” The tool keeps unknown separate from zero and calculates only rates supported by your entries. Return after the same bookings have had time to progress.' },
    { q: 'Is this the same as the CallTeam ROI calculator?', a: 'This tool checks observed meeting outcomes. The ROI calculator estimates potential financial returns from your campaign assumptions. Use this check to understand actual progression, and the ROI calculator when considering costs and possible returns.' },
    { q: 'Are my numbers sent to CallTeam?', a: 'The calculator runs in your browser and does not submit your numbers to CallTeam or attach them to a booking. Its input and result areas are masked from session replay. Existing site analytics may record named interactions, such as completing a check, without your entered figures. Copy or download your results if you want to keep them.' }
  ]
};
