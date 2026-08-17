async function handleContinue() {
  const steps = formType==='pulse'?PULSE_STEPS:SUMMARY_STEPS;
  errorMessages = validateCurrentStep();
  if (errorMessages.length) { window.scrollTo({top:0,behavior:'smooth'}); return render(); }
  saveDraft();
  if (step < steps.length-1) { step++; window.scrollTo({top:0,behavior:'smooth'}); return render(); }
  await submitCurrent();
}

function validateCurrentStep() {
  const e=[];
  if (formType==='pulse') {
    const p=answers.pulse; const dept=p.department;
    if (step===0) {
      if (!/^\S+@\S+\.\S+$/.test(p.email.trim())) e.push('Enter a valid work email.');
      if (!dept) e.push('Select a primary department.');
      if (!p.role.trim()) e.push('Enter your role or job title.');
      if (!p.tenure) e.push('Select time with AK9I.');
      if (!p.perspective) e.push('Select the perspective represented.');
    } else if (step===1) validateRatings(p.rapid,RAPID_STATEMENTS.length,e,'general feedback');
    else if (step===2) {
      if (!p.tasks.length) e.push('Select at least one regular responsibility.');
      if (p.tasks.length>5) e.push('Select no more than five regular responsibilities.');
      [['outsideRole','time outside your primary role'],['cracks','task fall-through frequency'],['waiting','waiting frequency']].forEach(([k,l])=>{if(!p[k])e.push(`Select ${l}.`)});
      if (!p.delayCauses.length) e.push('Select at least one delay cause.');
      if (p.delayCauses.length>3) e.push('Select no more than three delay causes.');
      if (!p.systems.length) e.push('Select at least one system or method used.');
    } else if (step===3) {
      if (!p.currentMeasures.length) e.push('Select what is currently measured.');
      if (!p.desiredMeasures.length || p.desiredMeasures.length>3) e.push('Select one to three items that should be measured.');
      if (!p.waste.length || p.waste.length>3) e.push('Select one to three categories.');
      if (!p.singleDependency) e.push('Answer the single-person dependency question.');
      if (p.singleDependency==='Yes' && !p.dependencyFunction.trim()) e.push('Identify the dependent function or responsibility.');
      if (!p.immediateRisk) e.push('Answer the current-issue question.');
      if (p.immediateRisk==='Yes' && !p.riskAreas.length) e.push('Select at least one category.');
      if (p.immediateRisk==='Yes' && !p.riskUrgency) e.push('Select when it should be addressed.');
    } else if (step===4) {
      const d=DEPT[dept]; if (d) validateRatings(p.deptRatings,d.ratings.length,e,'department');
      if (d && !p.constraint) e.push('Select the most important current constraint.');
      if (d?.extraChoice && !p.deptExtra) e.push(`Select ${d.extraChoice.label.toLowerCase()}.`);
      if (!p.deptImprovement.trim()) e.push('Enter the highest-impact seven-day department improvement.');
    } else if (step===5) {
      if (p.priorities.length!==3) e.push('Select exactly three top priorities.');
      if (!p.sevenDay.trim()) e.push('Enter one practical seven-day improvement.');
      if (!p.stopStartContinue) e.push('Choose stop, start, or continue.');
      if (!p.willingness) e.push('Select willingness to participate.');
      if (!p.privateFollowup) e.push('Select whether you want private follow-up.');
    }
  } else {
    const s=answers.summary;
    if (step===0) {
      if (!/^\S+@\S+\.\S+$/.test(s.facilitatorEmail.trim())) e.push('Enter a valid facilitator email.');
      if (!s.department) e.push('Select a department.'); if(!s.meetingDate)e.push('Enter the meeting date.'); if(!s.startTime||!s.endTime)e.push('Enter meeting start and end time.');
      if (!hasValue(s.attendees) || Number(s.attendees)<1) e.push('Enter the number of attendees.'); if(!hasValue(s.responseCount))e.push('Enter the response count received.');
    } else if (step===1) { if(!s.purpose.trim())e.push('Enter the department purpose.'); if(s.recurringWork.some(x=>!String(x).trim()))e.push('Enter all five recurring work activities.'); }
    else if (step===2) { if(!s.accountableRole.trim())e.push('Enter the accountable role.'); if(!s.ownershipClarity)e.push('Select ownership clarity.'); if(!s.systems.length)e.push('Select at least one system containing the work.'); }
    else if (step===4) { s.failures.forEach((f,i)=>{ if(Object.values(f).some(v=>!String(v).trim()))e.push(`Complete all fields for challenge ${i+1}.`); }); if(s.failures.filter(f=>f.point.trim()).length!==3)e.push('Record all three priority challenges.'); RISK_AREAS.forEach(a=>{if(!s.risks[a])e.push(`Set current status for ${a}.`)}); }
    else if (step===5) { const f=s.fixes[0]; if(!f.action.trim()||!f.owner.trim()||!f.due||!f.priority||!f.evidence.trim())e.push('Complete all fields for Next step 1.'); if(!s.escalation)e.push('Select private follow-up status.'); }
  }
  return e;
}
function validateRatings(obj,count,e,label) { for(let i=1;i<=count;i++) if(!obj?.[i]) { e.push(`Answer every ${label} statement.`); break; } }
function isDemoMode(){ return !String(config.submissionEndpoint || '').trim(); }

async function submitCurrent() {
  if (!sessionId) { errorMessages=['Open a department form from the home page.']; return render(); }
  const demo = isDemoMode();
  if (!sessionToken && !demo) { errorMessages=['Please reopen the department link provided for the meeting.']; return render(); }
  const endpoint = String(config.submissionEndpoint || '').trim();
  const payload = buildSubmission();
  if (demo) {
    const stored = loadDemoSubmissions();
    stored.push({payload, savedAt:new Date().toISOString()});
    localStorage.setItem('ak9i-field-demo-submissions-v1', JSON.stringify(stored.slice(-20)));
    confirmation={demo:true,confirmationNumber:`AK9I-${payload.clientSubmissionId.slice(-8).toUpperCase()}`,revision:1,current:true};
    clearDrafts();
    render();
    return;
  }
  if (!endpoint) { errorMessages=['This form is not ready to receive responses yet.']; return render(); }
  submitting=true; render();
  if (!navigator.onLine) { submitting=false; queueSubmission(payload); pendingSubmission={localId:payload.clientSubmissionId}; return render(); }
  try {
    const result = await sendSubmission(payload, sessionToken);
    submitting=false; confirmation=result; clearDrafts(); removeQueued(payload.clientSubmissionId); render();
  } catch (err) {
    submitting=false;
    if (isRetryable(err)) { queueSubmission(payload); pendingSubmission={localId:payload.clientSubmissionId,error:err.message}; render(); }
    else { errorMessages=[err.message || 'Submission failed. Please review the form and try again.']; render(); }
  }
}
function loadDemoSubmissions(){try{return JSON.parse(localStorage.getItem('ak9i-field-demo-submissions-v1')||'[]')}catch(_){return []}}
function buildSubmission() {
  const email = formType==='pulse'?answers.pulse.email:answers.summary.facilitatorEmail;
  return { formType, sessionId, department: formType==='pulse'?answers.pulse.department:answers.summary.department, workEmail: email.trim().toLowerCase(), answers: structuredClone(answers[formType]), clientSubmissionId: crypto.randomUUID ? crypto.randomUUID() : `local-${Date.now()}-${Math.random().toString(36).slice(2)}`, clientMeta: { appVersion: config.appVersion || 'dev', submittedAt: new Date().toISOString(), timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, online: navigator.onLine } };
}
async function sendSubmission(payload, token) {
  const headers={'Content-Type':'application/json','X-AK9I-Session-Token':token};
  const appCheck = await getAppCheckToken(); if(appCheck) headers['X-Firebase-AppCheck']=appCheck;
  let response;
  try { response=await fetch(config.submissionEndpoint,{method:'POST',headers,body:JSON.stringify(payload),mode:'cors',cache:'no-store'}); }
  catch (e) { const err=new Error('Network connection failed. Your response has been queued on this device for retry.'); err.retryable=true; throw err; }
  let body={}; try{body=await response.json();}catch(_){ }
  if(!response.ok){ const err=new Error(body.error || `Submission failed (${response.status}).`); err.retryable=response.status>=500||response.status===429; throw err; }
  return body;
}
let appCheckPromise;
async function getAppCheckToken() {
  if (!config.appCheckSiteKey || !config.firebaseConfig?.apiKey || !config.firebaseConfig?.projectId) return '';
  if (!appCheckPromise) appCheckPromise=(async()=>{
    const [{initializeApp},{initializeAppCheck,ReCaptchaEnterpriseProvider,getToken}] = await Promise.all([
      import('https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js'),
      import('https://www.gstatic.com/firebasejs/12.16.0/firebase-app-check.js')
    ]);
    const firebaseApp=initializeApp(config.firebaseConfig);
    const appCheck=initializeAppCheck(firebaseApp,{provider:new ReCaptchaEnterpriseProvider(config.appCheckSiteKey),isTokenAutoRefreshEnabled:true});
    return {appCheck,getToken};
  })();
  try { const {appCheck,getToken}=await appCheckPromise; const t=await getToken(appCheck,false); return t.token || ''; }
  catch (e) { console.warn('App Check token unavailable',e); return ''; }
}
function isRetryable(err){return Boolean(err?.retryable)}
function queueKey(){return 'ak9i-field-submit-queue-v1'}
function queueSubmission(payload){ const q=loadQueue().filter(x=>x.payload.clientSubmissionId!==payload.clientSubmissionId); q.push({payload,queuedAt:new Date().toISOString()}); localStorage.setItem(queueKey(),JSON.stringify(q)); }
function loadQueue(){try{return JSON.parse(localStorage.getItem(queueKey())||'[]')}catch(_){return []}}
function removeQueued(id){ const q=loadQueue().filter(x=>x.payload.clientSubmissionId!==id); localStorage.setItem(queueKey(),JSON.stringify(q)); }
async function retryQueue(){ if(!navigator.onLine||!sessionToken||!config.submissionEndpoint)return; const matching=loadQueue().filter(x=>x.payload.sessionId===sessionId && x.payload.department===(formType==='pulse'?answers.pulse.department:answers.summary.department) && x.payload.formType===formType); for(const item of matching){ try{const r=await sendSubmission(item.payload,sessionToken); removeQueued(item.payload.clientSubmissionId); confirmation=r; pendingSubmission=null; clearDrafts(); render(); break;}catch(err){if(!isRetryable(err))removeQueued(item.payload.clientSubmissionId);} } }
function renderPending(){ app.innerHTML=`<section class="step-card confirmation"><p class="step-kicker">Pending</p><h2>Your response is saved</h2><div class="notice warning">Please reconnect and retry when you have a stable connection.</div><p>Reference</p><div class="confirmation-number">${esc(pendingSubmission.localId)}</div><button class="button" id="retry-now">Retry now</button><button class="button secondary" id="back-to-review" style="margin-left:8px">Back to review</button></section>`; document.getElementById('retry-now').onclick=()=>{pendingSubmission=null;retryQueue();render();};document.getElementById('back-to-review').onclick=()=>{pendingSubmission=null;render();}; }
function renderConfirmation(){
  if(confirmation.demo){app.innerHTML=`<section class="step-card confirmation"><p class="step-kicker">Response complete</p><h2>Thank you</h2><div class="notice success">Your responses are complete.</div><p>Reference</p><div class="confirmation-number">${esc(confirmation.confirmationNumber || 'AK9I')}</div><a class="button-link" href="${esc(window.location.pathname)}">Return to department selection</a></section>`;return;}
  app.innerHTML=`<section class="step-card confirmation"><p class="step-kicker">Response received</p><h2>Thank you</h2><div class="notice success">Your response was received.</div><p>Confirmation number</p><div class="confirmation-number">${esc(confirmation.confirmationNumber || confirmation.responseId || 'Received')}</div><a class="button-link" href="${esc(window.location.pathname)}">Return to department selection</a></section>`;
}

window.addEventListener('online',()=>{ if(formType) retryQueue(); else render(); });
window.addEventListener('offline',render);
window.addEventListener('beforeunload',saveDraft);

if (formType === 'summary') answers.summary.sessionDisplay = sessionId;
render();
retryQueue();
