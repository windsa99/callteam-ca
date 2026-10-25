(function(){'use strict';var api=window.CallTeamEvergreen;if(!api)return;
function el(id){return document.getElementById(id);}
function add(parent,tag,text){var n=document.createElement(tag);n.textContent=text;parent.appendChild(n);return n;}
function copy(id,status){var text=el(id).value;var done=function(){el(status).textContent='Copied. You can paste this into your own document.';};if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(text).then(done).catch(function(){el(id).focus();el(id).select();el(status).textContent='Select and copy the text below.';});else{el(id).focus();el(id).select();el(status).textContent='Select and copy the text below.';}}
function print(){window.print();}
var auditForm=el('eg-audit-form');
if(auditForm){
 var run=el('eg-audit-run'),results=el('eg-audit-results');run.disabled=false;
 auditForm.addEventListener('change',function(){results.hidden=true;el('eg-audit-status').textContent='Answers changed. Run the checks to update your result.';});
 run.addEventListener('click',function(){try{var values={};api.checks.forEach(function(c){values[c.key]=el('audit-'+c.key).value;});var out=api.audit(values);el('eg-audit-copy-status').textContent='';el('eg-audit-title').textContent=out.title;el('eg-audit-note').textContent=out.note;el('eg-audit-counts').textContent='Needs attention: '+out.gaps+' · To verify: '+out.unknown+' · Reported in place: '+out.inPlace;
 var list=el('eg-audit-actions');list.replaceChildren();out.actions.forEach(function(a){var li=add(list,'li','');add(li,'h3',a.title);add(li,'p',a.action);});if(!out.actions.length)add(list,'li','Keep a reviewed sample of account, conversation and callback records so the six checks remain verifiable.');
 var review=el('eg-audit-review');review.replaceChildren();out.rows.forEach(function(row){add(review,'li',row.title+': '+(row.answer==='yes'?'Reported in place':row.answer==='no'?'Needs attention':'Verify'));});
 el('eg-audit-output').value=['CALLTEAM OUTBOUND SELF-AUDIT',out.title,out.note,'',el('eg-audit-counts').textContent,'',out.rows.map(function(row){return row.title+': '+(row.answer==='yes'?'Reported in place':row.answer==='no'?'Needs attention':'Verify');}).join('\n'),'','FIRST CHECKS',out.actions.length?out.actions.map(function(a,i){return (i+1)+'. '+a.title+'\n'+a.action;}).join('\n\n'):'Confirm the reported checks against actual campaign records.','','Self-assessment of pre-booking work. No automated inspection of your systems or call records.'].join('\n');
 el('eg-audit-print-copy').textContent=el('eg-audit-output').value;results.hidden=false;el('eg-audit-status').textContent='Checklist complete. Review your priorities below.';el('eg-audit-title').focus();}catch(e){el('eg-audit-status').textContent=e.message;}});
 el('eg-audit-example').disabled=false;el('eg-audit-example').addEventListener('click',function(){api.checks.forEach(function(c){el('audit-'+c.key).value=c.key==='callbacks'?'no':c.key==='data'?'unknown':'yes';});results.hidden=true;el('eg-audit-status').textContent='Fictional example loaded: callbacks need ownership and contact data needs checking. Run the checks to see the result.';});
 el('eg-audit-reset').disabled=false;el('eg-audit-reset').addEventListener('click',function(){api.checks.forEach(function(c){el('audit-'+c.key).value='unknown';});results.hidden=true;el('eg-audit-output').value='';el('eg-audit-status').textContent='Answers cleared. Start with your own campaign.';});
 el('eg-audit-copy').addEventListener('click',function(){copy('eg-audit-output','eg-audit-copy-status');});el('eg-audit-print').addEventListener('click',print);
}
var briefForm=el('eg-brief-form');
if(briefForm){
 var result=el('eg-brief-results'),lastBriefInput='';el('eg-brief-run').disabled=false;
 function briefValues(){var input={};['offer','buyer','market','work','criteria','timing'].forEach(function(k){input[k]=el('brief-'+k).value;});return input;}
 function briefDirty(){if(!result.hidden&&JSON.stringify(briefValues())===lastBriefInput)return;result.hidden=true;el('eg-brief-status').textContent='Brief changed. Build it again to update the output.';}
 briefForm.addEventListener('input',briefDirty);briefForm.addEventListener('change',briefDirty);
 el('eg-brief-run').addEventListener('click',function(){try{var input=briefValues();el('eg-brief-output').value=api.brief(input);lastBriefInput=JSON.stringify(input);el('eg-brief-copy-status').textContent='';el('eg-brief-print-copy').textContent=el('eg-brief-output').value;result.hidden=false;el('eg-brief-status').textContent='Your brief is ready to review below.';el('eg-brief-title').focus();}catch(e){el('eg-brief-status').textContent=e.message;}});
 el('eg-brief-example').disabled=false;el('eg-brief-example').addEventListener('click',function(){var example={offer:'ERP software connecting finance and stock reporting.',buyer:'CFOs and finance leaders at wholesale distributors.',market:'United States and Canada; English-speaking campaigns.',work:'Research, calling and follow-up',criteria:'A distributor that fits our account criteria, a relevant finance owner, a confirmed reporting question and clear agreement to an introductory call.',timing:'Discuss a launch next month. Ask for an itemised proposal.'};Object.keys(example).forEach(function(k){el('brief-'+k).value=example[k];});result.hidden=true;el('eg-brief-status').textContent='Fictional ERP example loaded. Edit it or build the example brief.';});
 el('eg-brief-reset').disabled=false;el('eg-brief-reset').addEventListener('click',function(){['offer','buyer','market','work','criteria','timing'].forEach(function(k){el('brief-'+k).value='';});result.hidden=true;el('eg-brief-output').value='';el('eg-brief-status').textContent='All fields cleared.';});
 el('eg-brief-copy').addEventListener('click',function(){copy('eg-brief-output','eg-brief-copy-status');});el('eg-brief-print').addEventListener('click',print);
}
})();
