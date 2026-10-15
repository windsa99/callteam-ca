(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.CallTeamScriptCheckModel = factory();
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  var GENERAL_GUIDE = {title: 'How to Write a B2B Cold Call Script', url: '/articles/how-to-write-a-b2b-cold-call-script/', type: 'guide', reason: 'Use the general structure to check your reason for calling, buyer question and next step.'};
  var LIBRARY = {title: 'Cold Call Script Library', url: '/resources/cold-call-scripts/', type: 'library', reason: 'Compare published examples and choose a situation that fits your offer.'};
  var GENERIC_WORDS = new Set(('a an the and or for to of in on we i you your our with who what help helps helping company companies business businesses solution solutions service services sell selling call cold script opening that this is are it can from as at have has software platform tool tools product products better improve improves improving work works working need needs new good best modern innovative team teams customer customers client clients people technology technologies system systems offer offers support professional professionals provider providers testing test consulting planning management growth grow increase save time money efficiency efficient effective success successful results result leading industry enterprise b2b every all more less access monitoring verification projects project workflow workflows assessment assessments validation visibility process processes task tasks review reviews delivery deliveries inspection maintenance finance financial manufacturing manufacturers manufacturer track tracking update updates place including service operating operations business dates date see find identifies identify understand improve improvements make makes making use using user users').split(' '));
  var ALIASES = {cybersecurity:['security'],saas:['subscription'],msp:['managed'],logistics:['transportation','freight','fleet'],manufacturing:['manufacturer','factory','plant'],erp:['enterprise resource planning'],hr:['human resources'],ap:['accounts payable'],unused:['shelfware']};
  var BUYER_FAMILIES = [
    {key:'finance', pattern:/\b(?:cfo|chief financial officer|finance|financial|controller|accounts payable|accounting)\b/i},
    {key:'security', pattern:/\b(?:ciso|chief information security officer|security|cybersecurity)\b/i},
    {key:'technology', pattern:/\b(?:cio|cto|chief information officer|chief technology officer|it (?:leader|director|manager)|information technology|infrastructure|technical|technology)\b/i},
    {key:'operations', pattern:/\b(?:coo|chief operating officer|operations|operational|plant|production|manufacturing|logistics|fleet)\b/i},
    {key:'sales', pattern:/\b(?:cro|chief revenue officer|sales|revenue)\b/i},
    {key:'people', pattern:/\b(?:hr|human resources|people|talent|recruitment|recruiting)\b/i},
    {key:'marketing', pattern:/\b(?:cmo|chief marketing officer|marketing|demand generation)\b/i},
    {key:'procurement', pattern:/\b(?:procurement|purchasing|sourcing)\b/i},
    {key:'owner', pattern:/\b(?:ceo|chief executive officer|founder|owner|president)\b/i}
  ];
  function words(text) {return String(text || '').match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) || [];}
  function stem(token) {
    if (/ies$/.test(token) && token.length > 5) return token.slice(0,-3)+'y';
    if (/s$/.test(token) && !/(ss|us|is|saas)$/.test(token) && token.length > 4) return token.slice(0,-1);
    return token;
  }
  function terms(text, excludeGeneric) {
    var list=words(text).map(function(t){return t.toLowerCase();});
    if(excludeGeneric) list=list.filter(function(t){return !GENERIC_WORDS.has(t) && !/^\d+$/.test(t) && t.length>1;});
    return Array.from(new Set(list.map(stem)));
  }
  function normalizeInput(input) {
    if(typeof input==='string') return {buyer:'',offer:'',script:input};
    input=input || {};
    return {buyer:typeof input.buyer==='string'?input.buyer:'',offer:typeof input.offer==='string'?input.offer:'',script:typeof input.script==='string'?input.script:''};
  }
  function validateInput(input) {
    var value = {}, errors = {};
    var fields = {buyer:[2,100,'Tell us who you are calling.'],offer:[10,500,'Describe what you sell in a short sentence.'],script:[30,4000,'Paste at least one complete opening sentence (30 characters).']};
    input=input && typeof input==='object' && !Array.isArray(input)?input:{};
    Object.keys(fields).forEach(function(key){
      var rule=fields[key]; value[key]=typeof input[key]==='string'?input[key].trim():'';
      if(typeof input[key]!=='string' || value[key].length<rule[0]) errors[key]=rule[2];
      else if(input[key].length>rule[1]) errors[key]='Keep this field to '+rule[1]+' characters or fewer.';
      else if(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value[key])) errors[key]='Remove unsupported control characters.';
    });
    return {valid:Object.keys(errors).length===0,errors:errors,value:value};
  }
  function sentences(text) {
    var results=[],start=0;
    var ends=/(?:[.!?]+(?=\s|$)|\n+)/g,match;
    function add(end) {
      var chunk=text.slice(start,end),leading=(chunk.match(/^\s*/) || [''])[0].length;
      var clean=chunk.trim(); if(clean) results.push({text:clean,start:start+leading,end:end});
      start=end;
    }
    while((match=ends.exec(text))) {
      var prefix=text.slice(start,match.index);
      if(match[0]==='.' && /\b(?:mr|mrs|ms|dr|prof|sr|jr|e\.g|i\.e)$/i.test(prefix)) continue;
      add(match.index+match[0].length);
    }
    add(text.length);return results;
  }
  function firstMatch(text,patterns) {
    var best=null;
    patterns.forEach(function(pattern){var m=pattern.exec(text);if(m&&(!best||m.index<best.index))best={index:m.index,text:m[0]};});
    return best;
  }
  function responsePoint(sentence) {
    var invitation=firstMatch(sentence.text,[
      /\b(?:how|what|where|when|why|which|who)\s+(?:do|does|did|are|is|have|has|can|could|would|will|should|might|was|were)\b/i,
      /\b(?:who\s+(?:owns|handles|manages|decides|oversees)|what\s+(?:happens|stops|changes)|which\s+(?:part|team|process|area|step))\b/i,
      /(?:^|[,;:]\s*)(?:do|does|are|is|can|could|would|will|may|have|has)\s+(?:you|your|we|i|it|there|that|this)\b/i,
      /\b(?:tell me (?:about|how|what|which)|walk me through|talk me through|help me understand|describe (?:your|the)|curious (?:how|what|whether))\b/i
    ]);
    if(invitation)return {start:sentence.start+invitation.index,quote:sentence.text};
    if(sentence.text.includes('?'))return {start:sentence.start,quote:sentence.text};
    return null;
  }
  function meetingPoint(sentence) {
    return /\b(?:book|schedule|arrange|set up)\b.{0,70}\b(?:call|meeting|demo|conversation|time|appointment|walkthrough)\b|\b(?:call|demo|meeting|walkthrough|conversation)\b.{0,60}\b(?:useful|helpful|worthwhile)\b|\b(?:are you|would you be)\s+(?:free|available|open to (?:a|an|another) (?:call|meeting|demo|conversation))\b|\b(?:can|could|would)\s+(?:we|you|i)\b.{0,25}\bbook\b.{0,35}\bminutes?\b|\b(?:can|could|would)\s+(?:we|you)\b.{0,35}\b(?:meet|talk)\b/i.test(sentence.text);
  }
  function clarityState(script) {
    var list=words(script),lower=list.map(function(t){return t.toLowerCase();});
    if(!script.trim() || list.length<4)return 'short';
    var counts={};lower.forEach(function(t){counts[t]=(counts[t]||0)+1;});
    if(list.length>=12 && Object.values(counts).some(function(n){return n/list.length>=0.65;}))return 'repeated';
    if(/([\p{L}])\1{9,}/u.test(script))return 'characters';
    var keyboard=lower.filter(function(t){return /^(?:asdf|asdfgh|qwerty|qwertyuiop|zxcv|zxcvbnm|hjkl)+$/.test(t);}).length;
    if(keyboard>=3 && keyboard/list.length>0.4)return 'keyboard';
    // English rules cannot establish meaning in another language or bare specialist terms.
    if(list.length>=5 && !/\b(?:i|we|you|your|our|the|this|that|from|with|for|to|of|and|is|are|how|what|who|when|hi|hello|help|helps|can|could|would|tell|please)\b/i.test(script))return 'uncertain-language';
    return null;
  }
  function isNegatedClaim(sentence,index) {
    var before=sentence.slice(0,index).split(/[;.!?]/).pop();
    return /\b(?:not|no|never|cannot|can't|can’t|don't|don’t|doesn't|doesn’t|won't|won’t|without|avoid)\b(?:\W+\w+){0,6}\W*$/i.test(before);
  }
  function analyze(raw) {
    var input=normalizeInput(raw),script=input.script,list=words(script),parts=sentences(script);
    var result={summary:'',metrics:{wordCount:list.length,sentenceCount:parts.length,wordsBeforeResponse:null},found:[],review:[],confirm:[],needsClarification:false};
    var clarity=clarityState(script);
    if(clarity){
      result.needsClarification=true;
      result.summary=clarity==='uncertain-language'?'These English wording checks cannot confidently assess this text.':'Add a clear opening before using these checks to guide your edits.';
      result.confirm.push({id:'input-unclear',label:'Check the pasted text',detail:clarity==='uncertain-language'?'These English wording checks cannot confidently interpret this draft. Unfamiliar terms or another language do not make it a weak opening.':'There is too little usable text or a repeated text pattern to give useful wording feedback.',action:'Use complete sentences that show your introduction and reason for calling. The builder will leave details for you to fill in.'});
      return result;
    }
    var intro=parts.find(function(s){
      var common=/\b(?:this is|my name is|i am|i['’]m)\b.{1,90}\b(?:from|with|at)\b|\b[\p{L}][\p{L}'’-]{1,30}\s+here\b.{0,60}\b(?:from|with|at)\b/iu.test(s.text);
      var named=/^(?:(?:[Hh]i|[Hh]ello|[Hh]ey)\b.{0,45}[,;]\s*)?[A-Z][\p{L}'’-]{1,30}(?:\s+[A-Z][\p{L}'’-]{1,30})?\s+(?:from|with|at)\s+[\p{L}]/u.test(s.text);
      return common||named;
    });
    if(intro)result.found.push({id:'intro',label:'Introduction found',quote:intro.text,detail:'This line uses a recognisable caller or company introduction. Check that the names are accurate.'});
    else result.confirm.push({id:'intro-confirm',label:'Caller and company',detail:'An introduction was not confidently recognised. You may be using a different structure.',action:'Make sure the buyer can identify your name and company.'});
    var responseParts=parts.map(function(s){return {sentence:s,response:responsePoint(s)};}).filter(function(x){return x.response;});
    if(responseParts.length){var response=responseParts[0].response;result.metrics.wordsBeforeResponse=words(script.slice(0,response.start)).length;result.found.push({id:'response',label:'Response invitation found',quote:response.quote,detail:'This line contains a question or an invitation to respond. Read it aloud and leave room for the buyer to answer.'});}
    else result.confirm.push({id:'response-confirm',label:'Where does the buyer respond?',detail:'A question or response invitation was not confidently recognised. Punctuation alone cannot tell us whether you pause for an answer.',action:'Mark the point where the buyer can respond. You can use a question or an invitation such as “Walk me through how you handle that.”'});
    var meetings=parts.filter(meetingPoint);
    if(meetings.length){
      result.found.push({id:'meeting',label:'Next-step wording found',quote:meetings[0].text,detail:'This line appears to propose a meeting or further conversation. Check that its purpose is clear.'});
      if(!responseParts.some(function(x){return x.sentence.start<meetings[0].start && !meetingPoint(x.sentence);}))result.confirm.push({id:'early-meeting',label:'Check the order of the ask',quote:meetings[0].text,detail:'The first response invitation recognised is a meeting request, or no earlier invitation was recognised. This can be appropriate for some calls.',action:'Consider a practical buyer question first when you need to establish whether a meeting would help.'});
    }
    var beforeResponse=result.metrics.wordsBeforeResponse;
    if((beforeResponse!==null&&beforeResponse>80)||(beforeResponse===null&&list.length>100)){
      var stretch=beforeResponse!==null?script.slice(0,responseParts[0].response.start).trim():script.trim();
      result.review.push({id:'long-opening',label:'A long stretch to try aloud',quote:stretch,detail:(beforeResponse===null?list.length+' words appear before any response invitation these checks recognise.':beforeResponse+' words appear before the first recognised response invitation.')+' If you deliver this uninterrupted, check where the buyer could speak.',action:'Try moving a useful buyer question earlier or separating later detail from the opening.'});
    }
    var long=parts.filter(function(s){return words(s.text).length>35;});
    if(long.length)result.review.push({id:'long-sentence',label:'A long sentence to try aloud',quote:long[0].text,detail:'This sentence contains '+words(long[0].text).length+' words. That is a prompt to check its delivery, not a fixed limit.',action:'Try splitting it at the main idea, then leave a pause.'});
    var broad=script.match(/\b(?:best[- ]in[- ]class|world[- ]class|cutting[- ]edge|industry[- ]leading|revolutionary|game[- ]changer|synergy|innovative solutions|disruptive solutions|unlock your potential)\b/i);
    if(broad)result.review.push({id:'broad-wording',label:'Broad sales wording',quote:broad[0],detail:'This phrase can be less specific than naming the task your offer helps with.',action:'Use a concrete task or keep the phrase only if it adds useful, accurate meaning here.'});
    var placeholderMatches=Array.from(script.matchAll(/\[[^\]\n]{1,80}\]|\{\{[^}\n]{1,80}\}\}/g));
    if(placeholderMatches.length)result.review.push({id:'placeholders',label:'Details to fill in',quote:placeholderMatches[0][0],detail:placeholderMatches.length+' placeholder'+(placeholderMatches.length===1?'':'s')+' found. Placeholders are normal in a working draft.',action:'Replace them with accurate details before using the opening.'});
    var seen=new Map(),repeated=null;
    parts.forEach(function(s){var key=words(s.text).join(' ').toLowerCase();if(words(s.text).length<6)return;if(seen.has(key)&&!repeated)repeated=s;seen.set(key,s);});
    if(repeated)result.review.push({id:'repetition',label:'Repeated sentence',quote:repeated.text,detail:'This sentence appears more than once, ignoring case and punctuation.',action:'Keep both only if the repetition is intentional.'});
    var claimSentence=parts.find(function(s){var matches=Array.from(s.text.matchAll(/\bguarantee(?:s|d)?\b|\b(?:double|triple)\s+(?:(?:your|our|the|their|its)\s+)?(?:revenue|sales|profits?|pipeline|meetings?|appointments?|customers?|conversions?|productivity|output|capacity|savings|returns?)\b|\b(?:twice|three times)\s+(?:as many|as much|the)\s+(?:qualified\s+)?(?:revenue|sales|profits?|pipeline|meetings?|appointments?|customers?|conversions?|productivity|output|capacity|savings|returns?)\b|\b\d+(?:[.,]\d+)?\s*(?:%|percent\b|per cent\b)/gi));return matches.some(function(m){
      if(isNegatedClaim(s.text,m.index))return false;
      var before=s.text.slice(Math.max(0,m.index-50),m.index),after=s.text.slice(m.index+m[0].length,m.index+m[0].length+60);
      if(/^guarantee/i.test(m[0])){
        var verbPromise=/\b(?:we|i|this|it|that|product|service|software|programme|program|platform|system)\s+(?:(?:can|will|always|also)\s+)?$/i.test(before);
        var promisedOutcome=/^\s+(?:you(?:r)?|revenue|sales|profits?|savings|results?|returns?|growth|meetings?|appointments?|conversions?|performance)\b/i.test(after);
        if(!verbPromise&&!promisedOutcome)return false;
      }
      if(/%|percent|per cent/i.test(m[0])){
        if(/\b(?:charge|commission|discount|interest|tax|gst|vat|apr|fee)\b/i.test(before)||/^\s*(?:off\b|discount\b|interest\b|tax\b|gst\b|vat\b|apr\b|fee\b)/i.test(after))return false;
      }
      return true;
    });});
    if(claimSentence)result.confirm.push({id:'claim-check',label:'Check the evidence',quote:claimSentence.text,detail:'This line includes a guarantee, multiplier or percentage. The wording check cannot establish whether it is supported.',action:'Keep it only with accurate evidence and the relevant conditions. Prices and meeting durations are not treated as performance claims.'});
    result.confirm.push({id:'buyer-fit',label:'Buyer relevance',detail:'Word matching cannot establish whether this matters to your buyer.',action:'Can this person recognise the specific task or situation your offer helps with?'});
    if(!claimSentence)result.confirm.push({id:'evidence',label:'Accuracy',detail:'These checks do not verify facts or customer results.',action:'Confirm that every claim, name and example is accurate before calling.'});
    result.confirm.push({id:'next-step',label:'Reason to continue',detail:'A clear question or meeting request still needs a relevant purpose.',action:'What would the buyer get from the next conversation?'});
    var specificChecks=result.confirm.filter(function(f){return ['intro-confirm','response-confirm','claim-check','early-meeting'].includes(f.id);}).length;
    result.summary=result.review.length?'Review '+result.review.length+' wording '+(result.review.length===1?'point':'points')+', then use your judgement on the buyer context.':specificChecks?'Review '+specificChecks+' '+(specificChecks===1?'item that needs':'items that need')+' your judgement before using this draft.':'These checks found no issues. Confirm buyer relevance, accuracy and the reason to continue.';
    return result;
  }
  function safeTemplate(item) {return item && typeof item.slug==='string' && /^\/resources\/cold-call-scripts\/[a-z0-9-]+\/$/.test(item.url) && typeof item.title==='string';}
  function serviceWording(text) {
    // Audience clauses are not evidence of what a visitor sells. Keep task
    // clauses such as "for tracking shipments" or "to reconcile invoices".
    var boundary=/\b(for|to)\s+/gi,match;
    while((match=boundary.exec(text))){
      var rest=text.slice(boundary.lastIndex),first=(rest.match(/^([a-z-]+)/i)||[])[1]||'';
      if(match[1].toLowerCase()==='for' && /ing$/i.test(first) && !/^(?:accounting|marketing|banking|manufacturing|staffing|recruiting)$/i.test(first))continue;
      if(match[1].toLowerCase()==='to' && !/^(?:(?:the|our|your|a|an)\s+)?(?:[\w-]+\s+){0,3}(?:firms?|companies|businesses|teams?|owners?|directors?|leaders?|managers?|hospitals?|manufacturers?|CFOs?|CEOs?|CISOs?|CTOs?)\b/i.test(rest))continue;
      return text.slice(0,match.index).trim();
    }
    return text;
  }
  function suggestTemplates(raw,catalog) {
    var input=normalizeInput(raw);
    if(!Array.isArray(catalog)||clarityState(input.script))return [];
    // These small topic groups connect stated concepts to published examples.
    // They suggest a related starting point; they do not assert an exact offer match.
    var service=serviceWording(input.offer),curated=null;
    if(/\b(?:saml|scim|sso|mfa|single sign[- ]on|identity and access|identity access|access management|access reviews?|privileged access)\b/i.test(service)){
      curated={slugs:['cybersecurity-risk-assessment-cold-call-script'],reason:'A related security example for the identity or access topic you entered. This published script covers security assessments; choose it only if that approach fits your actual service.'};
    }else if(/\b(?:cybersecurity|cyber security|penetration testing|security risk assessments?)\b/i.test(service)){
      curated={slugs:['cybersecurity-risk-assessment-cold-call-script'],reason:'A related security-assessment example for the security service you entered. Confirm that the published approach fits your actual offer.'};
    }else if(/\b(?:remote desktop(?: support)?|desktop support|help[- ]?desk|managed it|it (?:support|services)|managed service provider|msp)\b/i.test(service)||/^\s*IT\s*$/i.test(service)){
      curated={slugs:['msp-cold-call-script-managed-it-services'],reason:'A related managed-IT example for the IT support topic you entered. It covers a broader managed service; use only the parts that fit your actual offer.'};
    }else if(/\b(?:accounting|bookkeeping)\b/i.test(service)&&!/\b(?:software|erp|platform|automation|app|tool)\b/i.test(service)){
      curated={slugs:['outsourced-accounting-services-cold-call-script'],reason:'A related accounting-service example for the service you entered. Check that the scope and responsibilities fit what you provide.'};
    }else if(/\b(?:software|saas|subscriptions?|licen[cs]es?|seats?)\b/i.test(service)&&/\b(?:unused|renewals?|subscriptions?|spend|shelfware|seats?)\b/i.test(service)){
      curated={slugs:['software-procurement-advisory-cold-call-script'],reason:'A related example for software renewals, usage and purchasing decisions. This published script offers advisory services; adapt the structure only where it fits what you sell.'};
    }else if(/\b(?:shipments?|carriers?|freight|drayage|shipping|logistics|3pl)\b/i.test(service)){
      curated={slugs:/\b(?:ecommerce|e-commerce|fulfillment|fulfilment|3pl)\b/i.test(service)?['3pl-fulfillment-cold-call-script']:['logistics-overflow-drayage-cold-call-script'],reason:'A related physical-logistics example for the shipment or carrier context you entered. This published script offers logistics services; confirm which parts are appropriate for your offer.'};
    }
    if(curated){return curated.slugs.map(function(slug){return catalog.find(function(item){return item.slug===slug&&safeTemplate(item);});}).filter(Boolean).map(function(item){return Object.assign({},item,{matchKind:'offer',reason:curated.reason});});}
    var offer=terms(service,true),families=BUYER_FAMILIES.filter(function(f){return f.pattern.test(input.buyer);}).map(function(f){return f.key;});
    var ranked=catalog.filter(safeTemplate).map(function(item,index){
      var subject=terms(item.serviceTerms||item.title,true);
      var matched=offer.filter(function(t){var alternatives=[t].concat(ALIASES[t]||[]);return alternatives.some(function(variant){var ts=terms(variant,true);return ts.length&&ts.every(function(v){return subject.includes(v);});});});
      var meaningful=matched.length>=2||matched.some(function(t){return ['erp','msp','cybersecurity','payroll','cmms','telematics','drayage','recruitment','staffing','telehealth','banking','insurance','salesforce','sap','netsuite','iot','fintech','cpa'].includes(t);});
      if(!meaningful)matched=[];
      var rawBuyer=(item.buyers||[]).join(' ');
      var buyerMatch=BUYER_FAMILIES.filter(function(f){return families.includes(f.key)&&f.pattern.test(rawBuyer);}).map(function(f){return f.key;});
      var distinctive=matched.filter(function(t){return !['security','managed','assessment','automation','cloud','data','manufacturing','manufacturer','finance','financial','marketing','sale','sales'].includes(t);}).length;
      return {item:item,index:index,matched:matched,buyerMatch:buyerMatch,rank:matched.length*4+distinctive*2+(matched.length?Math.min(buyerMatch.length,2):0)};
    }).filter(function(x){return x.matched.length;});
    ranked.sort(function(a,b){return b.rank-a.rank||a.index-b.index;});
    var selected=[];
    // Original library order resolves equal candidates; no tie is represented as a best answer.
    ranked.forEach(function(entry){if(selected.length<3)selected.push(entry);});
    return selected.map(function(entry){return Object.assign({},entry.item,{matchKind:'offer',reason:'Suggested because its published service topic overlaps with your offer wording ('+entry.matched.slice(0,3).join(', ')+'). Confirm the situation fits before choosing it.'});});
  }
  function matchResources(raw,catalog,selectedSlug) {
    var selected=selectedSlug&&Array.isArray(catalog)?catalog.find(function(x){return x.slug===selectedSlug&&safeTemplate(x);}):null;
    var suggestions=selected?[]:suggestTemplates(raw,catalog);
    if(!selected)selected=suggestions[0]||null;
    if(!selected)return [Object.assign({},LIBRARY),Object.assign({},GENERAL_GUIDE)];
    var result=[{title:selected.title,url:selected.url,type:'script',reason:selectedSlug?'You selected this published example. Adapt its wording to your actual offer and buyer.':'One suggested example to inspect. Choose a template explicitly before using its wording.'}];
    (selected.guides||[]).filter(function(g){return g&&typeof g.title==='string'&&/^\/articles\/[a-z0-9-]+\/$/.test(g.url);}).slice(0,2).forEach(function(g){result.push({title:g.title,url:g.url,type:'guide',reason:'Published guidance connected to this script: '+g.description});});
    if(result.length<2)result.push(Object.assign({},GENERAL_GUIDE));
    return result;
  }
  function makeDraft(raw,template) {
    var input=normalizeInput(raw),unclear=clarityState(input.script),chosen=safeTemplate(template)&&typeof template.opening==='string'&&Array.isArray(template.questions)&&typeof template.cta==='string'&&!unclear;
    var draft=chosen?{opening:template.opening,followUpQuestion:template.questions[0]||'',meetingRequest:template.cta,source:{title:template.title,url:template.url},notes:['This is the published example you selected, copied without rewriting your draft. Check that each claim and service fits what you actually offer.'].concat((template.personalization||[]).slice(0,3)),placeholders:[]}:{opening:'Hi [First Name], [Your Name] from [Company]. We help [buyer or team] [complete a specific task]. How do you currently handle [that task]?',followUpQuestion:'What would you want to improve about [that task or process]?',meetingRequest:'If [the task] is worth reviewing, would [a focused next step] be useful?',source:null,notes:[unclear?'Your pasted text needs clarification. This general structure leaves the details for you to fill in.':'Choose a published example or fill in this general structure with accurate details.','This structure is a starting point. It is not a rewrite or an assessment of your offer.'],placeholders:[]};
    var all=[draft.opening,draft.followUpQuestion,draft.meetingRequest].join('\n');
    draft.placeholders=Array.from(new Set(all.match(/\[[^\]\n]{1,80}\]|\{\{[^}\n]{1,80}\}\}/g)||[]));
    return draft;
  }
  return Object.freeze({validateInput:validateInput,analyze:analyze,suggestTemplates:suggestTemplates,matchResources:matchResources,makeDraft:makeDraft});
}));
