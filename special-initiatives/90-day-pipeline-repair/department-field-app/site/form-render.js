const PULSE_STEPS = ['About you','General feedback','Work & coordination','Measurement & continuity','Department','Priorities','Review'];
const SUMMARY_STEPS = ['Meeting','Department overview','Ownership & systems','Handoffs & KPIs','Challenges & priorities','Next steps','Review'];

function render() {
  if (!formType) return renderHome();
  if (confirmation) return renderConfirmation();
  if (pendingSubmission) return renderPending();
  const steps = formType === 'pulse' ? PULSE_STEPS : SUMMARY_STEPS;
  const content = formType === 'pulse' ? renderPulseStep() : renderSummaryStep();
  const pct = Math.round(((step + 1) / steps.length) * 100);
  const dept = formType === 'pulse' ? answers.pulse.department : answers.summary.department;
  const formTitle = formType === 'pulse' ? departmentFeedbackTitle(dept) : departmentMeetingTitle(dept);
  document.title = `${formTitle} — ${steps[step]}`;
  const finalLabel = isDemoMode() ? 'Finish' : (submitting ? 'Submitting…' : 'Submit response');
  app.innerHTML = `<div class="progress-wrap"><div class="progress-meta"><span>Step ${step+1} of ${steps.length}</span><span>${pct}%</span></div><div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><div class="progress-fill" style="width:${pct}%"></div></div></div>
    ${errorMessages.length ? `<div class="error-summary" role="alert"><strong>Please complete the highlighted requirements.</strong><ul>${errorMessages.map(e=>`<li>${esc(e)}</li>`).join('')}</ul></div>` : ''}
    ${content}
    <nav class="nav-bar" aria-label="Form navigation"><div class="nav-inner">${step>0?'<button class="button secondary" id="back-btn" type="button">Back</button>':'<button class="button secondary" id="home-btn" type="button">Exit</button>'}<button class="button" id="continue-btn" type="button" ${submitting?'disabled':''}>${step===steps.length-1?finalLabel:'Continue'}</button></div></nav>`;
  bindInputs();
  document.getElementById('back-btn')?.addEventListener('click', () => { errorMessages=[]; step--; window.scrollTo({top:0,behavior:'smooth'}); render(); });
  document.getElementById('home-btn')?.addEventListener('click', () => { window.location.href = window.location.pathname; });
  document.getElementById('continue-btn')?.addEventListener('click', handleContinue);
  document.getElementById('clear-draft')?.addEventListener('click', () => { if (window.confirm('Clear the saved draft on this device?')) { clearDrafts(); answers = defaultAnswers(); applyPrefills(); render(); } });
}

function renderPulseStep() {
  const dept = answers.pulse.department;
  const title = departmentFeedbackTitle(dept);
  switch (step) {
    case 0: {
      const otherDepartments = Object.values(DEPARTMENTS).filter(x=>x!==DEPARTMENTS[dept]);
      const otherDetail = answers.pulse.otherDepartments.includes('Other') ? fieldText('pulse.otherDepartmentsOther','Other department supported',{required:true,maxLength:120}) : '';
      return `<section class="step-card"><p class="step-kicker">${esc(title)}</p><h2>About you</h2>${introNotice()}${fieldText('pulse.email','Work email',{required:true,type:'email',maxLength:180,hint:'Self-identified; this does not verify identity.'})}<div class="grid-2">${fieldText('pulse.firstName','First name',{maxLength:80})}${fieldText('pulse.lastName','Last name',{maxLength:80})}</div>${departmentSelector()}${fieldText('pulse.role','Role or job title',{required:true,maxLength:140})}${fieldRadio('pulse.tenure','Time with AK9I',TENURE,{required:true})}${fieldChecks('pulse.otherDepartments','Other departments supported',otherDepartments,{rerender:true})}${otherDetail}<button class="button ghost" id="clear-draft" type="button">Clear saved draft</button></section>`;
    }
    case 1: return `<section class="step-card"><p class="step-kicker">${esc(title)}</p><h2>General feedback</h2><p class="hint">Tap one response for every statement.</p>${ratingCards('pulse.rapid',RAPID_STATEMENTS)}</section>`;
    case 2: {
      const tasks = DEPT[dept]?.tasks || ['Daily operations','Customer/student support','Scheduling','Reporting','Purchasing','Records','Coordination with other departments','Other'];
      return `<section class="step-card"><p class="step-kicker">${esc(title)}</p><h2>Work and coordination</h2>${fieldChecks('pulse.tasks','Select up to five activities that make up most of your normal work.',tasks,{required:true,max:5,hint:'Choose the work you actually perform most often.'})}${fieldRadio('pulse.outsideRole','Approximately how much of your working time is spent on tasks outside your primary role?',['0–10%','11–25%','26–50%','51–75%','More than 75%','Not sure'],{required:true})}${fieldRadio('pulse.cracks','How often do important tasks fall through the cracks or require last-minute recovery?',['Never','Less than monthly','Monthly','Weekly','Daily or almost daily','Not sure'],{required:true})}${fieldRadio('pulse.waiting','How often is your work delayed while waiting for another person or department?',['Never','Less than monthly','Monthly','Weekly','Daily or almost daily','Not sure'],{required:true})}${fieldChecks('pulse.delayCauses','Select up to three common causes of delay.',DELAY_CAUSES,{required:true,max:3})}${fieldChecks('pulse.systems','Which systems or methods do you use regularly?',SYSTEMS,{required:true})}${fieldText('pulse.friction','Which system or process creates the most friction? (optional)',{maxLength:500})}</section>`;
    }
    case 3: return `<section class="step-card"><p class="step-kicker">${esc(title)}</p><h2>Measurement and continuity</h2>${fieldChecks('pulse.currentMeasures','What is currently measured?',CURRENT_MEASURES,{required:true})}${fieldChecks('pulse.desiredMeasures','What should be measured? Select up to three.',DESIRED_MEASURES,{required:true,max:3})}${fieldChecks('pulse.waste','Where could time or money be used more effectively? Select up to three.',WASTE,{required:true,max:3})}${fieldRadio('pulse.singleDependency','Would an important function stop or become severely disrupted if one person were unexpectedly absent?',['Yes','No','Not sure'],{required:true,rerender:true})}${get('pulse.singleDependency')==='Yes'?fieldText('pulse.dependencyFunction','Identify the function or responsibility — not the individual person.',{required:true,maxLength:500}):''}${fieldRadio('pulse.immediateRisk','Are you aware of a current issue that could affect AK9I’s ability to meet commitments?',['Yes','No','Not sure'],{required:true,rerender:true})}${get('pulse.immediateRisk')==='Yes'?`${fieldChecks('pulse.riskAreas','Select one or more categories.',RISKS,{required:true})}${fieldRadio('pulse.riskUrgency','When should it be addressed?',['Requires attention today','Within 2–7 days','Within 8–30 days','Longer-term','Not sure'],{required:true})}<div class="notice warning">Do not enter sensitive details in this form. Use Private follow-up at the end if needed.</div>`:''}</section>`;
    case 4: return renderDepartmentSection(dept);
    case 5: return `<section class="step-card"><p class="step-kicker">${esc(title)}</p><h2>Priorities and ideas</h2>${fieldChecks('pulse.priorities','Select the three areas AK9I should address first.',PRIORITIES,{required:true,max:3,hint:'Select exactly three.'})}${fieldTextarea('pulse.sevenDay','What is one practical improvement that could be started or completed within seven days?',{required:true,maxLength:1200})}${fieldSelect('pulse.stopStartContinue','Choose one',['AK9I should stop…','AK9I should start…','AK9I should continue…'],{required:true})}${fieldText('pulse.stopStartText','Optional detail',{maxLength:700})}${fieldText('pulse.evidenceSource','What document, report, system, or record would help verify what is happening? (optional)',{maxLength:800})}${fieldRadio('pulse.willingness','Would you be willing to help implement the seven-day improvement?',['I would be willing to help implement the seven-day improvement.','Maybe, depending on what is required.','No.','Not applicable.'],{required:true})}${fieldRadio('pulse.privateFollowup','Would you like a private follow-up?',['Yes','No'],{required:true})}<div class="notice info">No sensitive explanation is collected here. Your work email provides the follow-up method.</div></section>`;
    case 6: return renderReview('pulse');
  }
}
function departmentSelector() {
  const current = answers.pulse.department;
  if (initialDepartment) return `<div class="field"><span class="field-label required">Primary department</span><div class="prefilled-value">${esc(DEPARTMENTS[initialDepartment])}</div><small>Selected for this form.</small></div>`;
  return `<fieldset class="field"><legend class="required">Primary department</legend><div class="choice-grid">${Object.entries(DEPARTMENTS).map(([k,v])=>`<label class="choice"><input type="radio" name="pulse-department" data-department-field="pulse.department" value="${k}" ${current===k?'checked':''}><span>${esc(v)}</span></label>`).join('')}</div></fieldset>`;
}
function renderDepartmentSection(dept) {
  const d = DEPT[dept];
  const title = departmentFeedbackTitle(dept);
  if (!d) return `<section class="step-card"><p class="step-kicker">${esc(title)}</p><h2>Department questions</h2>${fieldTextarea('pulse.deptImprovement','What is the single highest-impact department improvement that could begin within seven days?',{required:true})}</section>`;
  return `<section class="step-card"><p class="step-kicker">${esc(title)}</p><h2>Department questions</h2>${ratingCards('pulse.deptRatings',d.ratings)}${fieldRadio('pulse.constraint',d.constraintLabel || 'Most important current constraint',d.constraint,{required:true})}${d.extraChoice?fieldRadio('pulse.deptExtra',d.extraChoice.label,d.extraChoice.options,{required:true}):''}${d.extra?fieldTextarea('pulse.professionalDevelopment',d.extra,{required:false,maxLength:900}):''}${fieldTextarea('pulse.deptImprovement',d.improvement,{required:true,maxLength:1200})}</section>`;
}

function renderSummaryStep() {
  const dept = answers.summary.department;
  const title = departmentMeetingTitle(dept);
  switch (step) {
    case 0: return `<section class="step-card"><p class="step-kicker">${esc(title)}</p><h2>Meeting details</h2><div class="notice info">Complete this once after the department meeting. Use role titles rather than naming individuals whenever possible.</div>${fieldText('summary.facilitatorEmail','Facilitator email',{required:true,type:'email',maxLength:180})}${summaryDepartmentSelector()}${fieldText('summary.meetingDate','Meeting date',{required:true,type:'date'})}${fieldText('summary.startTime','Meeting start time',{required:true,type:'time'})}${fieldText('summary.endTime','Meeting end time',{required:true,type:'time'})}<div class="grid-2">${fieldNumber('summary.attendees','Number of attendees',{required:true,min:1,max:500})}${fieldNumber('summary.responseCount','Response count received',{required:true,min:0,max:500})}</div></section>`;
    case 1: return `<section class="step-card"><p class="step-kicker">${esc(title)}</p><h2>Department overview</h2>${fieldTextarea('summary.purpose','State the department’s agreed purpose in one sentence.',{required:true,maxLength:800})}<fieldset class="field"><legend class="required">Five most important recurring work activities</legend>${answers.summary.recurringWork.map((v,i)=>fieldText(`summary.recurringWork.${i}`,`Activity ${i+1}`,{required:true,maxLength:300})).join('')}</fieldset></section>`;
    case 2: return `<section class="step-card"><p class="step-kicker">${esc(title)}</p><h2>Ownership and systems</h2>${fieldText('summary.accountableRole','Which role is accountable for the department’s primary outcomes?',{required:true,maxLength:300})}${fieldRadio('summary.ownershipClarity','Is that ownership clear?',['Yes','Partly','No'],{required:true})}${fieldTextarea('summary.overlapping','Which responsibilities are overlapping?',{maxLength:1200,hint:'Use role titles rather than naming individuals whenever possible.'})}${fieldTextarea('summary.orphaned','Which responsibilities do not have a clear owner?',{maxLength:1200})}${fieldChecks('summary.systems','Which systems contain the department’s work?',SUMMARY_SYSTEMS,{required:true})}${fieldText('summary.authoritativeSource','Identify the primary source, if known.',{maxLength:700})}</section>`;
    case 3: return `<section class="step-card"><p class="step-kicker">${esc(title)}</p><h2>Handoffs and KPIs</h2><h3>Dependencies and handoffs</h3>${answers.summary.handoffs.map((_,i)=>repeatHandoff(i)).join('')}<h3>KPIs</h3>${fieldTextarea('summary.currentMeasured','What is currently measured?',{maxLength:1200})}<p class="hint">Capture up to three priority KPIs that should be measured.</p>${answers.summary.kpis.map((_,i)=>repeatKpi(i)).join('')}</section>`;
    case 4: return `<section class="step-card"><p class="step-kicker">${esc(title)}</p><h2>Challenges and current priorities</h2><p class="hint">Record the three most important recurring challenges.</p>${answers.summary.failures.map((_,i)=>repeatFailure(i)).join('')}<h3>Current status</h3><p class="hint">Use GREEN, YELLOW, RED, or UNKNOWN for every category.</p><div class="risk-grid">${RISK_AREAS.map(area=>riskRow(area)).join('')}</div></section>`;
    case 5: return `<section class="step-card"><p class="step-kicker">${esc(title)}</p><h2>Next steps and supporting information</h2><p class="hint">Agree one or two practical next steps. The first action is required.</p>${answers.summary.fixes.map((_,i)=>repeatFix(i)).join('')}<h3>Supporting information requests</h3>${answers.summary.evidenceRequests.map((_,i)=>repeatEvidence(i)).join('')}${fieldTextarea('summary.unresolved','Open questions',{maxLength:1800,hint:'Do not enter confidential allegations.'})}${fieldRadio('summary.escalation','Private follow-up needed',['No','Yes — financial/control','Yes — HR/personnel','Yes — student continuity','Yes — safety/canine welfare','Yes — legal/compliance','Yes — data/security','Other'],{required:true})}</section>`;
    case 6: return renderReview('summary');
  }
}
function summaryDepartmentSelector() {
  const current = answers.summary.department;
  if (initialDepartment) return `<div class="field"><span class="field-label required">Department</span><div class="prefilled-value">${esc(DEPARTMENTS[initialDepartment])}</div><small>Selected for this form.</small></div>`;
  return `<fieldset class="field"><legend class="required">Department</legend><div class="choice-grid">${TUESDAY_DEPARTMENTS.map(k=>`<label class="choice"><input type="radio" name="summary-department" data-department-field="summary.department" value="${k}" ${current===k?'checked':''}><span>${esc(DEPARTMENTS[k])}</span></label>`).join('')}</div></fieldset>`;
}
function repeatHandoff(i) { const p=`summary.handoffs.${i}`; return `<div class="repeat-card"><h3>Handoff ${i+1}</h3>${fieldText(`${p}.dependency`,'Dependency or handoff',{maxLength:500})}${fieldText(`${p}.sending`,'Sending role/department',{maxLength:300})}${fieldText(`${p}.receiving`,'Receiving role/department',{maxLength:300})}${fieldTextarea(`${p}.failure`,'Current challenge',{maxLength:900})}</div>`; }
function repeatKpi(i) { const p=`summary.kpis.${i}`; return `<div class="repeat-card"><h3>KPI ${i+1}</h3>${fieldText(`${p}.metric`,'What should be measured?',{maxLength:500})}${fieldText(`${p}.owner`,'Who should own the KPI?',{maxLength:300})}${fieldText(`${p}.source`,'What source would support it?',{maxLength:500})}</div>`; }
function repeatFailure(i) { const p=`summary.failures.${i}`; return `<div class="repeat-card"><h3>Challenge ${i+1}</h3>${fieldText(`${p}.point`,'Challenge or recurring issue',{required:true,maxLength:600})}${fieldText(`${p}.frequency`,'Frequency',{required:true,maxLength:200})}${fieldText(`${p}.impact`,'Impact',{required:true,maxLength:500})}${fieldText(`${p}.notices`,'Who typically notices it? (role)',{required:true,maxLength:300})}${fieldTextarea(`${p}.response`,'Current response',{required:true,maxLength:800})}</div>`; }
function riskRow(area) { const path=`summary.risks.${area}`; const value=get(path)||''; return `<div class="risk-row"><strong>${esc(area)}</strong><div class="risk-options">${['GREEN','YELLOW','RED','UNKNOWN'].map(v=>`<label class="risk-pill"><input type="radio" name="${id(path)}" data-field="${esc(path)}" value="${v}" ${value===v?'checked':''}><span>${v}</span></label>`).join('')}</div></div>`; }
function repeatFix(i) { const p=`summary.fixes.${i}`; const required=i===0; return `<div class="repeat-card"><h3>Next step ${i+1}</h3>${fieldText(`${p}.action`,'Action',{required,maxLength:700})}${fieldText(`${p}.owner`,'Owner role',{required,maxLength:300})}${fieldText(`${p}.due`,'Due date',{required,type:'date'})}${fieldRadio(`${p}.priority`,'Timing',[['P0 — immediate','Today'],['P1 — this week','This week'],['P2 — within 30 days','Within 30 days']],{required})}${fieldText(`${p}.evidence`,'How completion will be confirmed',{required,maxLength:700})}</div>`; }
function repeatEvidence(i) { const p=`summary.evidenceRequests.${i}`; return `<div class="repeat-card"><h3>Supporting information ${i+1}</h3>${fieldText(`${p}.needed`,'Information needed',{maxLength:700})}${fieldText(`${p}.source`,'Source/system',{maxLength:400})}${fieldText(`${p}.role`,'Responsible role',{maxLength:300})}${fieldText(`${p}.due`,'Due date',{type:'date'})}</div>`; }

function renderReview(type) {
  const email = type==='pulse' ? answers.pulse.email : answers.summary.facilitatorEmail;
  const dept = type==='pulse' ? answers.pulse.department : answers.summary.department;
  const sections = type==='pulse' ? pulseReviewSections() : summaryReviewSections();
  const tokenWarning = !isDemoMode() && !sessionToken ? '<div class="notice warning">This form link is not ready for submission. Please reopen the department link provided for the meeting.</div>' : '';
  return `<section class="step-card"><p class="step-kicker">${esc(type==='pulse'?departmentFeedbackTitle(dept):departmentMeetingTitle(dept))}</p><h2>Review your responses</h2><div class="notice info"><strong>Email:</strong> ${esc(email)}<br><strong>Department:</strong> ${esc(DEPARTMENTS[dept] || dept)}</div>${tokenWarning}${sections}</section>`;
}
function reviewRows(rows) { return rows.map(([k,v])=>`<dl class="review-row"><dt>${esc(k)}</dt><dd>${esc(formatValue(v))}</dd></dl>`).join(''); }
function formatValue(v) {
  if (Array.isArray(v)) {
    const values = v.filter(x=>x!==undefined && x!==null && x!=='').map(formatValue).filter(x=>x && x!=='—');
    return values.join('; ') || '—';
  }
  if (v && typeof v==='object') return Object.entries(v).map(([k,x])=>`${k}: ${formatValue(x)}`).join(' | ');
  return hasValue(v)?String(v):'—';
}
function pulseReviewSections() {
  const p=answers.pulse;
  const supported = p.otherDepartments.includes('Other') && p.otherDepartmentsOther ? [...p.otherDepartments.filter(x=>x!=='Other'), `Other — ${p.otherDepartmentsOther}`] : p.otherDepartments;
  return `<div class="review-section"><h3>About you</h3>${reviewRows([['First name',p.firstName],['Last name',p.lastName],['Role',p.role],['Tenure',p.tenure],['Other departments supported',supported]])}</div><div class="review-section"><h3>General feedback</h3>${reviewRows(RAPID_STATEMENTS.map((s,i)=>[`${i+1}. ${s}`,p.rapid[i+1]]))}</div><div class="review-section"><h3>Work and systems</h3>${reviewRows([['Regular work',p.tasks],['Time outside role',p.outsideRole],['Tasks fall through',p.cracks],['Waiting on others',p.waiting],['Delay causes',p.delayCauses],['Systems',p.systems],['Friction',p.friction]])}</div><div class="review-section"><h3>Continuity and priorities</h3>${reviewRows([['Current measures',p.currentMeasures],['Desired measures',p.desiredMeasures],['Opportunities to use time/money more effectively',p.waste],['Single-person dependency',p.singleDependency],['Dependency function',p.dependencyFunction],['Current issue',p.immediateRisk],['Issue areas',p.riskAreas],['Timing',p.riskUrgency],['Department constraint',p.constraint],['Department improvement',p.deptImprovement],['Top priorities',p.priorities],['Seven-day improvement',p.sevenDay],['Stop/start/continue',`${p.stopStartContinue} ${p.stopStartText}`],['Supporting source',p.evidenceSource],['Willingness',p.willingness],['Private follow-up',p.privateFollowup]])}</div>`;
}
function summaryReviewSections() {
  const s=answers.summary; return `<div class="review-section"><h3>Meeting</h3>${reviewRows([['Date',s.meetingDate],['Time',`${s.startTime}–${s.endTime}`],['Attendees',s.attendees],['Responses',s.responseCount],['Purpose',s.purpose],['Recurring work',s.recurringWork]])}</div><div class="review-section"><h3>Department overview</h3>${reviewRows([['Accountable role',s.accountableRole],['Ownership clarity',s.ownershipClarity],['Overlapping responsibilities',s.overlapping],['Responsibilities without a clear owner',s.orphaned],['Systems',s.systems],['Primary source',s.authoritativeSource],['Current measured',s.currentMeasured]])}</div><div class="review-section"><h3>Handoffs and KPIs</h3>${reviewRows([['Handoffs',s.handoffs.filter(x=>Object.values(x).some(Boolean))],['KPIs',s.kpis.filter(x=>Object.values(x).some(Boolean))]])}</div><div class="review-section"><h3>Challenges and next steps</h3>${reviewRows([['Challenges',s.failures],['Current status',s.risks],['Next steps',s.fixes.filter(x=>Object.values(x).some(Boolean))],['Supporting information',s.evidenceRequests.filter(x=>Object.values(x).some(Boolean))],['Open questions',s.unresolved],['Private follow-up',s.escalation]])}</div>`; }

function bindInputs() {
  app.querySelectorAll('[data-field]').forEach(el => {
    const handler = () => {
      const path = el.dataset.field;
      if (el.type === 'checkbox') {
        const checked = [...app.querySelectorAll(`input[type="checkbox"][data-field="${cssEscape(path)}"]:checked`)].map(x=>x.value);
        const max = Number(el.dataset.max || 0);
        if (max && checked.length > max) { el.checked=false; showTransient(`Select no more than ${max}.`); return; }
        set(path, [...app.querySelectorAll(`input[type="checkbox"][data-field="${cssEscape(path)}"]:checked`)].map(x=>x.value));
        if (path === 'pulse.otherDepartments' && !get(path).includes('Other')) set('pulse.otherDepartmentsOther','');
      } else set(path, el.value);
      const emailPath = formType==='pulse'?'pulse.email':'summary.facilitatorEmail';
      if (path===emailPath && /^\S+@\S+\.\S+$/.test(el.value.trim())) localStorage.setItem('ak9i-field-email',el.value.trim());
      queueDraftSave();
      if (el.dataset.rerender) render();
    };
    el.addEventListener(el.type==='radio'||el.type==='checkbox'||el.tagName==='SELECT'?'change':'input', handler);
  });
  app.querySelectorAll('[data-department-field]').forEach(el => el.addEventListener('change', () => {
    set(el.dataset.departmentField,el.value); queueDraftSave(); render();
  }));
}
function cssEscape(v) { return window.CSS?.escape ? CSS.escape(v) : v.replace(/["\\]/g,'\\$&'); }
function showTransient(message) {
  const node=document.createElement('div'); node.className='notice warning'; node.setAttribute('role','status'); node.textContent=message; app.prepend(node); setTimeout(()=>node.remove(),2200);
}
