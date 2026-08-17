function applyPrefills() {
  if (initialDepartment) {
    if (!answers.pulse.department) answers.pulse.department = initialDepartment;
    if (!answers.summary.department) answers.summary.department = initialDepartment;
  }
}
function draftKey() {
  const dept = formType ? (get(`${formType}.department`) || initialDepartment || 'unassigned') : 'home';
  return `ak9i-field-draft-v2:${formType || 'none'}:${sessionId || 'no-session'}:${dept}`;
}
function loadDraft() {
  if (!formType) return;
  const keys = Object.keys(localStorage).filter(k => k.startsWith(`ak9i-field-draft-v2:${formType}:${sessionId || 'no-session'}:`));
  const preferred = keys.find(k => initialDepartment && k.endsWith(`:${initialDepartment}`)) || keys[0];
  if (!preferred) return;
  try {
    const saved = JSON.parse(localStorage.getItem(preferred));
    if (saved?.answers?.[formType]) answers[formType] = { ...answers[formType], ...saved.answers[formType] };
  } catch (_) { /* ignore malformed local draft */ }
}
function saveDraft() {
  if (!formType || confirmation) return;
  const payload = { savedAt: new Date().toISOString(), answers: { [formType]: answers[formType] } };
  localStorage.setItem(draftKey(), JSON.stringify(payload));
}
function queueDraftSave() { clearTimeout(draftTimer); draftTimer = setTimeout(saveDraft, 180); }
function clearDrafts() {
  const prefix = `ak9i-field-draft-v2:${formType}:${sessionId || 'no-session'}:`;
  Object.keys(localStorage).filter(k => k.startsWith(prefix)).forEach(k => localStorage.removeItem(k));
}

function fieldText(path, label, { required=false, type='text', hint='', placeholder='', maxLength=500, readonly=false }={}) {
  return `<div class="field"><label class="${required?'required':''}" for="${id(path)}">${esc(label)}</label><input id="${id(path)}" data-field="${esc(path)}" type="${type}" value="${esc(get(path) || '')}" ${required?'required':''} ${readonly?'readonly':''} maxlength="${maxLength}" placeholder="${esc(placeholder)}">${hint?`<small>${esc(hint)}</small>`:''}</div>`;
}
function fieldNumber(path, label, { required=false, min=0, max=9999 }={}) {
  return `<div class="field"><label class="${required?'required':''}" for="${id(path)}">${esc(label)}</label><input id="${id(path)}" data-field="${esc(path)}" type="number" inputmode="numeric" min="${min}" max="${max}" value="${esc(get(path) || '')}" ${required?'required':''}></div>`;
}
function fieldTextarea(path, label, { required=false, hint='', maxLength=1800 }={}) {
  return `<div class="field"><label class="${required?'required':''}" for="${id(path)}">${esc(label)}</label><textarea id="${id(path)}" data-field="${esc(path)}" maxlength="${maxLength}" ${required?'required':''}>${esc(get(path) || '')}</textarea>${hint?`<small>${esc(hint)}</small>`:''}</div>`;
}
function fieldSelect(path, label, options, { required=false }={}) {
  const value = get(path) || '';
  return `<div class="field"><label class="${required?'required':''}" for="${id(path)}">${esc(label)}</label><select id="${id(path)}" data-field="${esc(path)}" ${required?'required':''}><option value="">Select one</option>${options.map(o=>`<option value="${esc(o)}" ${o===value?'selected':''}>${esc(o)}</option>`).join('')}</select></div>`;
}
function fieldRadio(path, label, options, { required=false, rerender=false }={}) {
  const value = get(path) || '';
  return `<fieldset class="field"><legend class="${required?'required':''}">${esc(label)}</legend><div class="choice-grid">${options.map(o=>{ const [val,text] = Array.isArray(o)?o:[o,o]; return `<label class="choice"><input type="radio" name="${id(path)}" data-field="${esc(path)}" value="${esc(val)}" ${val===value?'checked':''} ${rerender?'data-rerender="1"':''}><span>${esc(text)}</span></label>`;}).join('')}</div></fieldset>`;
}
function fieldChecks(path, label, options, { required=false, max=null, hint='' }={}) {
  const selected = Array.isArray(get(path)) ? get(path) : [];
  return `<fieldset class="field"><legend class="${required?'required':''}">${esc(label)}</legend>${hint?`<small class="hint">${esc(hint)}</small>`:''}<div class="choice-grid two">${options.map(o=>`<label class="choice"><input type="checkbox" data-field="${esc(path)}" value="${esc(o)}" ${selected.includes(o)?'checked':''} ${max?`data-max="${max}"`:''}><span>${esc(o)}</span></label>`).join('')}</div></fieldset>`;
}
function ratingCards(prefix, statements) {
  return `<div class="rating-list">${statements.map((statement,i)=>{
    const path = `${prefix}.${i+1}`; const value = get(path) || '';
    return `<fieldset class="rating-card"><legend class="statement required">${i+1}. ${esc(statement)}</legend><div class="rating-options">${SCALE.slice(0,5).map(([v,t])=>`<label class="rating-option" title="${esc(t)}"><input type="radio" name="${id(path)}" data-field="${esc(path)}" value="${v}" ${value===v?'checked':''}><span>${v}</span></label>`).join('')}</div><div class="rating-na"><label class="choice"><input type="radio" name="${id(path)}" data-field="${esc(path)}" value="na" ${value==='na'?'checked':''}><span>Not sure / Not applicable</span></label></div></fieldset>`;
  }).join('')}</div>`;
}
function id(path) { return path.replace(/[^a-zA-Z0-9_-]/g,'-'); }
function departmentFeedbackTitle(dept) { return `${DEPARTMENTS[dept] || 'Department'} Feedback`; }
function departmentMeetingTitle(dept) { return `${DEPARTMENTS[dept] || 'Department'} Meeting Notes`; }

function introNotice() {
  return `<div class="notice info"><strong>6–8 minutes.</strong> Your response is associated with the work email you enter and is not anonymous. Answer only from what you directly observe or perform. Select “Not sure / Not applicable” rather than guessing.</div>
  <div class="notice warning"><strong>Do not enter</strong> student/customer names, passwords, medical information, confidential personnel information, or allegations about another person. Use “Private follow-up requested” for sensitive concerns.</div>`;
}

function renderHome() {
  document.title = 'AK9I Department Feedback';
  const feedbackLinks = TUESDAY_DEPARTMENTS.map(d => `<a class="department-link" href="${linkFor('pulse', d)}"><span>${esc(departmentFeedbackTitle(d))}</span><span aria-hidden="true">→</span></a>`).join('');
  const meetingLinks = TUESDAY_DEPARTMENTS.map(d => `<a class="department-link" href="${linkFor('summary', d)}"><span>${esc(departmentMeetingTitle(d))}</span><span aria-hidden="true">→</span></a>`).join('');
  app.innerHTML = `<section class="hero"><h1>AK9I Department Feedback</h1><p>Please choose the appropriate department below.</p></section>
    <div class="grid-2">
      <section class="card launch-card"><h2>Department Feedback</h2><p>For department team members. Designed to take about 6–8 minutes on a phone.</p><div class="department-links">${feedbackLinks}</div></section>
      <section class="card launch-card"><h2>Department Meeting Notes</h2><p>For the meeting facilitator.</p><div class="department-links">${meetingLinks}</div></section>
    </div>`;
}
function linkFor(type, dept) {
  const values = { form:type, department:dept, session:defaultSession(dept) };
  if (!String(config.submissionEndpoint || '').trim()) values.token = 'demo';
  const p = new URLSearchParams(values);
  return `?${p.toString()}`;
}

loadDraft();
applyPrefills();
