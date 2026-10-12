(function () {
  'use strict';
  const root = document.querySelector('.campaign-page');
  const data = window.CallTeamCampaignData;
  const model = window.CallTeamCampaign;
  if (!root || !data || !model) return;
  const fields = ['offer', 'industry', 'buyer', 'region', 'goal'];
  const byId = name => document.getElementById('cp-' + name);
  const controls = Object.fromEntries(fields.map(name => [name, byId(name)]));
  if (fields.some(name => !controls[name])) return;
  let current = null;
  let inquiryBlock = '';
  let editedDraftRetained = false;
  let revision = 0;
  let started = false;

  function track(name) {
    // Only coarse event names; never send selections, scripts or contact details.
    if (typeof window.clarity === 'function') window.clarity('event', name);
  }
  function announce(text) { byId('status').textContent = text; }
  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }
  function list(items, ordered) {
    const node = element(ordered ? 'ol' : 'ul');
    items.forEach(text => node.append(element('li', text)));
    return node;
  }
  function resourceLink(text, url) {
    const link = element('a', text);
    // The curated catalogue uses same-site paths, never arbitrary visitor URLs.
    if (typeof url !== 'string' || !/^\/(?!\/)[a-z0-9\-/]+\/$/i.test(url)) return element('span', text);
    link.href = window.CALLTEAM_LOCAL_PREVIEW ? 'https://www.callteam.ca' + url : url;
    if (window.CALLTEAM_LOCAL_PREVIEW) { link.target = '_blank'; link.rel = 'noopener'; }
    link.addEventListener('click', () => track('campaign_preview_resource_clicked'));
    return link;
  }
  function card(title, wide) {
    const node = element('section', undefined, 'cp-plan-card' + (wide ? ' cp-plan-wide' : ''));
    node.append(element('h3', title));
    return node;
  }
  function render(result) {
    byId('result-title').textContent = result.title;
    const fragment = document.createDocumentFragment();
    fragment.append(element('p', result.summary, 'cp-result-summary'));
    const selections = element('dl', undefined, 'cp-result-selections');
    result.selections.forEach(item => {
      const row = element('div');
      row.append(element('dt', item.label), element('dd', item.value));
      selections.append(row);
    });
    fragment.append(selections, element('p', result.matchNote, 'cp-result-note'));
    const grid = element('div', undefined, 'cp-plan-grid');
    const targets = card('Who we would target');
    targets.append(list(result.targets.criteria), element('h4', 'People to involve'), list(result.targets.buyers));
    const angle = card('Why your buyer would take the meeting');
    angle.append(element('p', result.angle));
    if (result.goalNote) angle.append(element('p', result.goalNote, 'cp-result-note'));
    const opener = card('How we would start the conversation', true);
    opener.append(element('p', 'Adapt this opening to your offer before using it.', 'cp-result-kicker'), element('blockquote', result.opening));
    const questions = card('What we would qualify');
    questions.append(list(result.questions, true));
    const objection = card('When the buyer pushes back');
    objection.append(element('h4', result.objection.objection), element('p', result.objection.response));
    const steps = card('How we would run the campaign', true);
    const sequence = element('ol', undefined, 'cp-result-steps');
    result.steps.forEach(step => {
      const item = element('li'); item.append(element('h4', step.title), element('p', step.text)); sequence.append(item);
    });
    steps.append(sequence);
    if (result.regionNote) steps.append(element('p', result.regionNote, 'cp-result-note'));
    const resources = card('Resources matched to your answers', true);
    const resourceList = element('ul', undefined, 'cp-result-links');
    result.resources.forEach(item => {
      const row = element('li');
      row.append(element('span', item.type, 'cp-result-kicker'), resourceLink(item.title, item.url), element('p', item.description));
      resourceList.append(row);
    });
    resources.append(resourceList);
    grid.append(targets, angle, opener, questions, objection, steps, resources);
    if (result.caseStudy) {
      const proof = card('Documented campaign experience', true);
      proof.append(element('p', result.caseStudy.summary), element('p', result.caseStudy.relationship, 'cp-result-note'), resourceLink(result.caseStudy.title, result.caseStudy.url));
      grid.append(proof);
    }
    fragment.append(grid);
    byId('result-content').replaceChildren(fragment);
    byId('results').dataset.match = result.matchLevel;
    byId('results').hidden = false;
    ['copy', 'print', 'inquiry'].forEach(name => { byId(name).disabled = false; });
    byId('copy-text').hidden = true;
  }
  function summaryText(result) {
    const lines = ['CALLTEAM CAMPAIGN PREVIEW', result.title, result.summary, '', 'YOUR ANSWERS'];
    result.selections.forEach(item => lines.push(item.label + ': ' + item.value));
    lines.push('', result.matchNote, '', 'WHO WE WOULD TARGET', ...result.targets.criteria.map(item => '• ' + item), 'Buyer roles: ' + result.targets.buyers.join(', '), '', 'WHY THE BUYER WOULD TAKE THE MEETING', result.angle, result.goalNote, '', 'SAMPLE OPENING', result.opening, '', 'QUALIFICATION QUESTIONS', ...result.questions.map((item, index) => (index + 1) + '. ' + item), '', 'OBJECTION', result.objection.objection, result.objection.response, '', 'CAMPAIGN APPROACH');
    result.steps.forEach((step, index) => lines.push((index + 1) + '. ' + step.title + ': ' + step.text));
    lines.push(result.regionNote, '', 'SELECTED RESOURCES');
    result.resources.forEach(item => lines.push(item.title, 'https://www.callteam.ca' + item.url));
    if (result.caseStudy) lines.push('', 'RELATED CAMPAIGN EXPERIENCE', result.caseStudy.summary, result.caseStudy.relationship, 'https://www.callteam.ca' + result.caseStudy.url);
    lines.push('', 'This is a starting approach based on your answers. Account research, final messaging and scope are confirmed before launch.', 'Book a campaign strategy call: https://calendly.com/hello-callteam/new-meeting', 'https://www.callteam.ca/b2b-outbound-campaign-planner/');
    return lines.filter(line => line !== undefined && line !== null).join('\n');
  }
  function clearPreparedInquiry() {
    if (!inquiryBlock) return;
    const message = document.querySelector('.contact-form textarea[name="message"]');
    if (!message) return;
    let notice = document.getElementById('cp-contact-notice');
    if (message.value.includes(inquiryBlock)) {
      message.value = message.value.replace(inquiryBlock, '').trim();
      message.dispatchEvent(new Event('input', { bubbles: true }));
      inquiryBlock = '';
      editedDraftRetained = false;
      if (notice) notice.hidden = true;
    } else if (message.value.includes('CALLTEAM CAMPAIGN PREVIEW')) {
      // The visitor edited this draft. Keep their work and visibly flag the old plan.
      editedDraftRetained = true;
      if (!notice) {
        notice = element('p', undefined, 'form-note');
        notice.id = 'cp-contact-notice'; notice.setAttribute('role', 'status');
        message.insertAdjacentElement('afterend', notice);
      }
      notice.hidden = false;
      notice.textContent = 'Your edited message still contains an earlier campaign preview. Review it before sending.';
    } else {
      inquiryBlock = ''; editedDraftRetained = false;
      if (notice) notice.hidden = true;
    }
  }
  function clearResult(clearDraft) {
    if (clearDraft) clearPreparedInquiry();
    current = null; revision++;
    byId('results').hidden = true;
    byId('result-content').replaceChildren();
    byId('copy-text').hidden = true;
    byId('copy-text').value = '';
    ['copy', 'print', 'inquiry'].forEach(name => { byId(name).disabled = true; });
  }
  fields.forEach(name => {
    controls[name].addEventListener('change', () => {
      const hadResult = Boolean(current);
      clearResult(true);
      byId('error').hidden = true;
      controls[name].removeAttribute('aria-invalid');
      if (hadResult) announce('Your answers changed. Choose Build My Campaign Preview to update your plan.' + (editedDraftRetained ? ' Review the earlier preview in your edited contact message before sending.' : ' Any automatically added old preview has been removed from the contact form.'));
      if (!started) { track('campaign_preview_started'); started = true; }
    });
  });
  byId('build').disabled = false;
  byId('reset').disabled = false;
  byId('build').addEventListener('click', () => {
    clearResult();
    const answers = {};
    let invalid = null;
    fields.forEach(name => {
      answers[name] = controls[name].value;
      const valid = Boolean(answers[name]) && data.options[name].some(item => item.value === answers[name]);
      controls[name].setAttribute('aria-invalid', valid ? 'false' : 'true');
      if (!valid && !invalid) invalid = controls[name];
    });
    try {
      if (invalid) throw new Error('Choose an option for ' + (invalid.labels[0]?.textContent.trim() || 'the highlighted question') + '.');
      current = model.buildPreview(data, answers);
      render(current);
      byId('example-disclosure').open = false;
      byId('error').hidden = true;
      byId('error').textContent = '';
      byId('results').focus({ preventScroll: true });
      byId('results').scrollIntoView({ behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      announce('Your campaign preview is ready. Review your target buyers, opening and selected resources below.');
      track('campaign_preview_completed');
    } catch (error) {
      current = null;
      byId('error').textContent = error.message;
      byId('error').hidden = false;
      if (invalid) invalid.focus();
      announce('Please complete the highlighted question.');
    }
  });
  byId('reset').addEventListener('click', () => {
    fields.forEach(name => { controls[name].value = data.defaults[name]; controls[name].removeAttribute('aria-invalid'); });
    clearResult(true); byId('error').hidden = true; byId('error').textContent = '';
    byId('example-disclosure').open = true;
    controls.offer.focus(); announce('Answers reset. Choose what you sell to start again.' + (editedDraftRetained ? ' Your edited contact message still contains an earlier preview. Review it before sending.' : ''));
    track('campaign_preview_reset');
  });
  byId('copy').addEventListener('click', async () => {
    if (!current) return;
    const text = summaryText(current); const copiedRevision = revision;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      if (copiedRevision === revision) announce('Your campaign preview has been copied.');
    } catch (_) {
      if (copiedRevision !== revision) return;
      byId('copy-text').value = text; byId('copy-text').hidden = false;
      byId('copy-text').focus(); byId('copy-text').select();
      announce('Your preview is selected below. Use your device’s Copy command.');
    }
    track('campaign_preview_copied');
  });
  byId('print').addEventListener('click', () => { if (current) { track('campaign_preview_printed'); window.print(); } });
  byId('inquiry').addEventListener('click', () => {
    if (!current) return;
    const message = document.querySelector('.contact-form textarea[name="message"]');
    if (!message) { announce('Copy your preview and bring it to your strategy call.'); return; }
    let existing = message.value;
    if (inquiryBlock && existing.includes(inquiryBlock)) existing = existing.replace(inquiryBlock, '').trim();
    inquiryBlock = 'I would like to discuss this campaign with CallTeam.\n\n' + summaryText(current);
    message.value = existing ? existing + '\n\n' + inquiryBlock : inquiryBlock;
    message.dispatchEvent(new Event('input', { bubbles: true }));
    document.getElementById('contact')?.scrollIntoView({ behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    message.focus({ preventScroll: true });
    announce('Your preview is in the contact form. Add your details and choose Send Message when you are ready.');
    track('campaign_preview_inquiry_prepared');
  });
  root.querySelectorAll('a[href="https://calendly.com/hello-callteam/new-meeting"]').forEach(link => {
    link.addEventListener('click', () => track('campaign_preview_booking_clicked'));
  });
  root.querySelectorAll('a[href="#cp-example"]').forEach(link => {
    link.addEventListener('click', () => { byId('example-disclosure').open = true; });
  });
})();
