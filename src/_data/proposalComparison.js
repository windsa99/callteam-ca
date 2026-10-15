module.exports = {
  options: {
    billing: [['monthly','Per calendar month'],['fourWeeks','Every four weeks'],['oneTime','One-time package']],
    meetingUnit: [['unknown','Not stated'],['booked','Meeting booked'],['held','Meeting attended'],['accepted','Meeting accepted by sales'],['lead','Lead or contact']],
    volumeType: [['unknown','Not stated'],['target','Agency target'],['minimum','Written minimum'],['estimate','My own scenario']],
    qualification: [['unknown','Not stated'],['written','Buyer criteria agreed in writing'],['partial','Partly described']],
    replacements: [['unknown','Not stated'],['replace','Replacement included'],['credit','Refund or credit'],['reschedule','Reschedule only'],['charged','Still charged']],
    ownership: [['unknown','Not stated'],['export','Export / retain agreed records'],['limited','Limited access or retention']],
    reporting: [['unknown','Not stated'],['crm','CRM records and activity'],['report','Summary report']],
    notice: [['unknown','Not stated'],['none','No notice period'],['30','30 days'],['60','60 days']]
  },
  channels: [['phone','Cold calling'],['email','Email outreach'],['linkedin','LinkedIn'],['research','List research'],['followup','Follow-up']],
  faqs: [
    {q:'How do I compare lead generation agency proposals?',a:'Use the same currency and comparison period, then check the fixed fee, setup costs, variable charges and minimum commitment. Compare what counts as a result, who qualifies the buyer, what happens to no-shows and which records your team receives. Use this tool to put those answers beside each other and identify what to ask next.'},
    {q:'Can I compare outsourced SDR and appointment-setting proposals?',a:'Yes. Compare the work and outcome in each scope. An outsourced SDR proposal may cover research, calling, email and CRM work; an appointment-setting proposal may focus on a defined meeting outcome. Enter what each quote actually includes. The service name alone does not make the scopes equivalent.'},
    {q:'How do I compare a retainer with pay-per-appointment pricing?',a:'Enter the retainer as a fixed fee. For a proposal with no retainer, enter zero. In “Scope and extra costs”, enter the charge per result and a result count for the full comparison period. Use the same meeting definition to compare unit costs. The result is a cost scenario based on your inputs, not a forecast of delivery.'},
    {q:'What costs should I include beyond the headline fee?',a:'Include setup and other quoted charges for the period, such as research, data licensing, validation, tools or added campaign capacity. Add any separate fee per result. Avoid counting a cost twice when it is already included. Leave an unknown amount blank so the comparison identifies it as unresolved. Tax and your internal sales costs are outside this tool.'},
    {q:'Is a booked meeting the same as a qualified attended meeting?',a:'A booked meeting is scheduled. An attended meeting takes place. A sales-accepted meeting also meets criteria your sales team agrees to accept. Qualification can be checked before booking or after the conversation, so ask when it is assessed and what evidence comes with the handoff.'},
    {q:'What if the proposal leaves a term unclear?',a:'Choose “Not stated” or leave the amount blank. The tool highlights missing answers and builds questions you can send to the agency. An unanswered question is a reason to clarify the scope before deciding; it is not proof that the provider cannot do the work.'},
    {q:'Does the lowest price make an agency the best choice?',a:'Price is one part of the decision. Buyer fit, execution, qualification, reporting and your team’s ability to follow up all affect value. This tool compares the terms you enter. It does not rank providers or predict their results. Use the linked case studies and a scope conversation to assess the delivery behind a quote.'},
    {q:'Does CallTeam receive the proposal information I enter?',a:'The comparison runs in your browser. Its code does not upload your entries or save them to an account, and the input and result areas are masked from session replay. Basic usage events can record that the tool was used, without proposal values. Use Clear entries to remove what you entered. Copy or print to keep a result. Booking a call does not send the comparison automatically.'}
  ]
};
