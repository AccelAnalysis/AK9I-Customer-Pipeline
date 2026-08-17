'use strict';

const crypto = require('crypto');
const { onRequest } = require('firebase-functions/v2/https');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const { getAppCheck } = require('firebase-admin/app-check');

initializeApp();
const db = getFirestore();

const ALLOWED_ORIGINS = [
  /^https:\/\/accelanalysis\.github\.io$/,
  /^http:\/\/localhost(?::\d+)?$/,
  /^http:\/\/127\.0\.0\.1(?::\d+)?$/
];
const DEPARTMENTS = new Set(['kennels','training','maintenance','office','sales','finance','leadership','other']);
const FORM_TYPES = new Set(['pulse','summary']);
const SCALE = new Set(['1','2','3','4','5','na']);
const YES_NO_UNSURE = new Set(['Yes','No','Not sure']);
const RISK_STATUS = new Set(['GREEN','YELLOW','RED','UNKNOWN']);
const RISK_AREAS = ['Staffing/capacity','Student continuity','Safety','Canine welfare','Facility/equipment','Systems/data','Compliance/records','Spending/control','Customer or contract commitments'];
const TENURE = new Set(['Less than 3 months','3–11 months','1–2 years','3–5 years','More than 5 years']);
const PERSPECTIVE = new Set(['Primarily my own work','Primarily my department','Both my own work and my department']);
const DEPARTMENT_LABELS = new Set(['Kennels','Training / Instruction','Grounds & Maintenance','Office / Admissions / Student Services','Sales / Business Development / Marketing','Finance / Administration','Leadership','Other']);
const OUTSIDE_ROLE = new Set(['0–10%','11–25%','26–50%','51–75%','More than 75%','Not sure']);
const FREQUENCY = new Set(['Never','Less than monthly','Monthly','Weekly','Daily or almost daily','Not sure']);
const DELAY_CAUSES = new Set(['Ownership is unclear','Approval takes too long','Priorities conflict','Information is missing or inaccurate','Waiting for another department','Staffing is insufficient','Scheduling is ineffective','System or technology problem','Supply or equipment problem','Vendor or partner delay','Student or customer delay','No recurring delay','Other']);
const SYSTEMS = new Set(['Salesforce','Email','Phone calls','Text messages','Spreadsheet','Paper record','Student information system','LMS','Accounting or payroll system','Shared drive or cloud storage','Social-media platform','Government or vendor portal','Other']);
const CURRENT_MEASURES = new Set(['Work volume completed','Timeliness','Quality or errors','Attendance or coverage','Student/customer satisfaction','Safety or incidents','Cost or spending','Revenue or sales','Compliance or record completion','Nothing consistently','Other']);
const DESIRED_MEASURES = new Set(['Work volume','Timeliness','Quality','Attendance or staffing coverage','Student/customer satisfaction','Safety','Cost/spending','Revenue','Compliance','Handoff completion','Other']);
const WASTE = new Set(['Duplicate work','Rework caused by errors','Poor scheduling','Conflicting priorities','Unnecessary approvals','Purchases made without advance planning','Excess printing or marketing materials','Fuel, travel, or event spending','Unused subscriptions or services','External vendors used when internal capability exists','Equipment or facility downtime','Supply or inventory loss','No significant waste observed','Other']);
const PULSE_RISK_AREAS = new Set(['Student continuity','Employee safety','Canine welfare','Training quality','Staffing or instructor capacity','Facility or equipment','Payroll or cash','Data or system access','Accreditation or compliance','Customer or contract commitment','Other']);
const RISK_URGENCY = new Set(['Requires attention today','Within 2–7 days','Within 8–30 days','Longer-term','Not sure']);
const PRIORITIES = new Set(['Authority and decision rights','Role clarity','Staffing or capacity','Student service and continuity','Canine welfare or safety','Training consistency','Training or student records','Admissions and follow-up','Salesforce or data quality','Purchasing and spending','Facilities and maintenance','Cross-department communication','Compliance or quality control','Employer, placement, or alumni handoff','Other']);
const STOP_START_CONTINUE = new Set(['AK9I should stop…','AK9I should start…','AK9I should continue…']);
const WILLINGNESS = new Set(['I would be willing to help implement the seven-day improvement.','Maybe, depending on what is required.','No.','Not applicable.']);
const SUMMARY_SYSTEMS = new Set(['Salesforce','Student system','LMS','Accounting/payroll','Email','Spreadsheet','Paper','Shared drive','Vendor portal','Other']);
const OWNERSHIP_CLARITY = new Set(['Yes','Partly','No']);
const FIX_PRIORITIES = new Set(['P0 — immediate','P1 — this week','P2 — within 30 days']);
const ESCALATIONS = new Set(['No','Yes — financial/control','Yes — HR/personnel','Yes — student continuity','Yes — safety/canine welfare','Yes — legal/compliance','Yes — data/security','Other']);
const GENERIC_TASKS = new Set(['Daily operations','Customer/student support','Scheduling','Reporting','Purchasing','Records','Coordination with other departments','Other']);
const DEPARTMENT_CONFIG = {
  kennels: {
    tasks: new Set(['Canine intake and identification','Dog assignment and custody','Feeding and water','Medication and health monitoring','Veterinary coordination','Cleaning and sanitation','Exercise and enrichment','Canine transport','Supply inventory','Incident reporting','Shift handoff','Kennel records']),
    constraints: new Set(['Staffing coverage','Kennel capacity','Veterinary or health issue','Feeding or medication process','Sanitation','Equipment','Transportation','Records','Communication with Training','No major constraint','Other']), ratingCount: 7
  },
  training: {
    tasks: new Set(['Classroom instruction','Practical instruction','Lesson or curriculum planning','Training schedule','Dog/student matching','Attendance and make-up work','Student evaluation','Canine evaluation','Training records','Student coaching or intervention','Equipment preparation','Completion or certification','Handoff to placement/outcomes']),
    constraints: new Set(['Instructor capacity','Scheduling','Curriculum consistency','Attendance','Student support','Dog availability or matching','Evaluation process','Training records','Equipment or facility','Completion handoff','Other']), ratingCount: 8
  },
  maintenance: {
    tasks: new Set(['Work-request intake','Preventive maintenance','Emergency repairs','Grounds upkeep','Dormitory or housing maintenance','Facility maintenance','Vehicles or major equipment','Tools and asset control','Purchasing or supplies','Vendor coordination','Inspection or safety review','Completion documentation']),
    constraints: new Set(['Work backlog','Staffing','Parts or supplies','Approval delays','Vendor performance','Tools or equipment','Facility condition','Dormitory condition','Vehicles','Preventive maintenance','Other']),
    extra: new Set(['Same day','1–3 days','4–7 days','More than 7 days','Not tracked','Not sure']), ratingCount: 8
  },
  office: {
    tasks: new Set(['Inquiry routing','Initial response and follow-up','Prospect qualification','Application documents','VA, GI Bill, or SkillBridge processing','Enrollment','Scheduling','Tuition or payment communication','Student-file management','Complaint or service recovery','Salesforce management','Reporting','Completion processing','Placement or employer handoff','Alumni communication','Marketing or public-content support']),
    constraints: new Set(['Inquiry routing','First response','Qualification','Application documents','Funding or VA processing','Interview or enrollment','Confirmed start','Arrival or actual start','Current-student support','Completion','Placement or outcome follow-up','Alumni handoff','Not sure','Other']),
    extra: new Set(['Less than 1 hour','Same business day','Next business day','2–3 business days','More than 3 business days','Not tracked','Not sure']), ratingCount: 8
  }
};
const PULSE_KEYS = new Set(['email','name','department','role','tenure','perspective','otherDepartments','rapid','tasks','outsideRole','cracks','waiting','delayCauses','systems','friction','currentMeasures','desiredMeasures','waste','singleDependency','dependencyFunction','immediateRisk','riskAreas','riskUrgency','deptRatings','constraint','deptExtra','professionalDevelopment','deptImprovement','priorities','sevenDay','stopStartContinue','stopStartText','evidenceSource','willingness','privateFollowup']);
const SUMMARY_KEYS = new Set(['facilitatorEmail','department','meetingDate','startTime','endTime','attendees','responseCount','sessionDisplay','purpose','recurringWork','accountableRole','ownershipClarity','overlapping','orphaned','systems','authoritativeSource','handoffs','currentMeasured','kpis','failures','risks','fixes','evidenceRequests','unresolved','escalation']);

exports.submitFieldResponse = onRequest({
  region: 'us-east1',
  cors: ALLOWED_ORIGINS,
  timeoutSeconds: 30,
  memory: '256MiB',
  maxInstances: 20
}, async (req, res) => {
  res.set('Cache-Control', 'no-store');
  if (req.method === 'GET') return res.status(200).json({ ok: true, service: 'ak9i-fieldwork', version: '2026-08-17' });
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });

  try {
    await verifyAppCheck(req);
    const body = validateEnvelope(req.body);
    await verifyMeetingSession(body, req.get('X-AK9I-Session-Token'));
    const result = await persistRevision(body);
    return res.status(200).json(result);
  } catch (error) {
    const status = Number(error.statusCode || 500);
    if (status >= 500) console.error('Fieldwork submission error', error);
    return res.status(status).json({ error: status >= 500 ? 'Submission service error. Please retry.' : error.message });
  }
});

async function verifyAppCheck(req) {
  const token = req.get('X-Firebase-AppCheck');
  if (!token) throw httpError(401, 'App Check token is required.');
  try { await getAppCheck().verifyToken(token); }
  catch (_) { throw httpError(401, 'App Check token is invalid or expired.'); }
}

function validateEnvelope(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw httpError(400, 'Invalid request body.');
  const allowed = new Set(['formType','sessionId','department','workEmail','answers','clientSubmissionId','clientMeta','schemaVersion']);
  for (const key of Object.keys(raw)) if (!allowed.has(key)) throw httpError(400, `Unexpected field: ${key}`);

  const formType = assertEnum(raw.formType, FORM_TYPES, 'formType');
  const sessionId = assertString(raw.sessionId, 'sessionId', 8, 120);
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]+$/.test(sessionId)) throw httpError(400, 'Invalid sessionId.');
  const department = assertEnum(raw.department, DEPARTMENTS, 'department');
  const workEmail = assertEmail(raw.workEmail);
  const clientSubmissionId = assertString(raw.clientSubmissionId, 'clientSubmissionId', 8, 120);
  if (!/^[A-Za-z0-9._:-]+$/.test(clientSubmissionId)) throw httpError(400, 'Invalid clientSubmissionId.');
  if (!raw.answers || typeof raw.answers !== 'object' || Array.isArray(raw.answers)) throw httpError(400, 'answers must be an object.');

  validateRecursive(raw.answers, 'answers', 0);
  if (formType === 'pulse') validatePulse(raw.answers, department, workEmail);
  else validateSummary(raw.answers, department, workEmail, sessionId);

  const clientMeta = raw.clientMeta && typeof raw.clientMeta === 'object' && !Array.isArray(raw.clientMeta) ? raw.clientMeta : {};
  ensureOnlyKeys(clientMeta, new Set(['appVersion','submittedAt','timezone','online']), 'clientMeta');
  validateRecursive(clientMeta, 'clientMeta', 0);

  return { formType, sessionId, department, workEmail, answers: raw.answers, clientSubmissionId, clientMeta, schemaVersion: '1.0' };
}

function validatePulse(a, department, email) {
  ensureOnlyKeys(a, PULSE_KEYS, 'answers');
  if (String(a.email || '').trim().toLowerCase() !== email) throw httpError(400, 'Email fields do not match.');
  if (a.department !== department) throw httpError(400, 'Department fields do not match.');
  optionalString(a.name, 'answers.name', 120);
  assertString(a.role, 'answers.role', 1, 140);
  assertEnum(a.tenure, TENURE, 'answers.tenure');
  assertEnum(a.perspective, PERSPECTIVE, 'answers.perspective');
  assertArraySubset(a.otherDepartments, DEPARTMENT_LABELS, 'answers.otherDepartments', 0, 8);
  validateRatingObject(a.rapid, 11, 'answers.rapid');
  const deptConfig = DEPARTMENT_CONFIG[department];
  assertArraySubset(a.tasks, deptConfig?.tasks || GENERIC_TASKS, 'answers.tasks', 1, 5);
  assertEnum(a.outsideRole, OUTSIDE_ROLE, 'answers.outsideRole');
  assertEnum(a.cracks, FREQUENCY, 'answers.cracks');
  assertEnum(a.waiting, FREQUENCY, 'answers.waiting');
  assertArraySubset(a.delayCauses, DELAY_CAUSES, 'answers.delayCauses', 1, 3);
  assertExclusiveChoice(a.delayCauses, 'No recurring delay', 'answers.delayCauses');
  assertArraySubset(a.systems, SYSTEMS, 'answers.systems', 1, 20);
  optionalString(a.friction, 'answers.friction', 500);
  assertArraySubset(a.currentMeasures, CURRENT_MEASURES, 'answers.currentMeasures', 1, 20);
  assertExclusiveChoice(a.currentMeasures, 'Nothing consistently', 'answers.currentMeasures');
  assertArraySubset(a.desiredMeasures, DESIRED_MEASURES, 'answers.desiredMeasures', 1, 3);
  assertArraySubset(a.waste, WASTE, 'answers.waste', 1, 3);
  assertExclusiveChoice(a.waste, 'No significant waste observed', 'answers.waste');
  assertEnum(a.singleDependency, YES_NO_UNSURE, 'answers.singleDependency');
  if (a.singleDependency === 'Yes') assertString(a.dependencyFunction, 'answers.dependencyFunction', 1, 500);
  else optionalString(a.dependencyFunction, 'answers.dependencyFunction', 500);
  assertEnum(a.immediateRisk, YES_NO_UNSURE, 'answers.immediateRisk');
  if (a.immediateRisk === 'Yes') {
    assertArraySubset(a.riskAreas, PULSE_RISK_AREAS, 'answers.riskAreas', 1, 20);
    assertEnum(a.riskUrgency, RISK_URGENCY, 'answers.riskUrgency');
  } else {
    assertArraySubset(a.riskAreas, PULSE_RISK_AREAS, 'answers.riskAreas', 0, 20);
    optionalString(a.riskUrgency, 'answers.riskUrgency', 80);
  }
  if (deptConfig) {
    validateRatingObject(a.deptRatings, deptConfig.ratingCount, 'answers.deptRatings');
    assertEnum(a.constraint, deptConfig.constraints, 'answers.constraint');
    if (deptConfig.extra) assertEnum(a.deptExtra, deptConfig.extra, 'answers.deptExtra');
    else optionalString(a.deptExtra, 'answers.deptExtra', 200);
  } else {
    if (a.deptRatings && Object.keys(a.deptRatings).length) throw httpError(400, 'answers.deptRatings is not valid for this department.');
    optionalString(a.constraint, 'answers.constraint', 300);
    optionalString(a.deptExtra, 'answers.deptExtra', 300);
  }
  optionalString(a.professionalDevelopment, 'answers.professionalDevelopment', 900);
  assertString(a.deptImprovement, 'answers.deptImprovement', 1, 1200);
  assertArraySubset(a.priorities, PRIORITIES, 'answers.priorities', 3, 3);
  assertString(a.sevenDay, 'answers.sevenDay', 1, 1200);
  assertEnum(a.stopStartContinue, STOP_START_CONTINUE, 'answers.stopStartContinue');
  optionalString(a.stopStartText, 'answers.stopStartText', 700);
  optionalString(a.evidenceSource, 'answers.evidenceSource', 800);
  assertEnum(a.willingness, WILLINGNESS, 'answers.willingness');
  assertEnum(a.privateFollowup, new Set(['Yes','No']), 'answers.privateFollowup');
}

function validateSummary(a, department, email, sessionId) {
  ensureOnlyKeys(a, SUMMARY_KEYS, 'answers');
  if (String(a.facilitatorEmail || '').trim().toLowerCase() !== email) throw httpError(400, 'Facilitator email fields do not match.');
  if (a.department !== department) throw httpError(400, 'Department fields do not match.');
  assertDate(a.meetingDate, 'answers.meetingDate');
  assertTime(a.startTime, 'answers.startTime');
  assertTime(a.endTime, 'answers.endTime');
  assertIntegerLike(a.attendees, 'answers.attendees', 1, 500);
  assertIntegerLike(a.responseCount, 'answers.responseCount', 0, 500);
  if (a.sessionDisplay !== sessionId) throw httpError(400, 'Form session ID does not match the meeting link.');
  assertString(a.purpose, 'answers.purpose', 1, 800);
  assertArray(a.recurringWork, 'answers.recurringWork', 5, 5);
  a.recurringWork.forEach((x,i)=>assertString(x, `answers.recurringWork.${i}`, 1, 300));
  assertString(a.accountableRole, 'answers.accountableRole', 1, 300);
  assertEnum(a.ownershipClarity, OWNERSHIP_CLARITY, 'answers.ownershipClarity');
  optionalString(a.overlapping, 'answers.overlapping', 1200);
  optionalString(a.orphaned, 'answers.orphaned', 1200);
  assertArraySubset(a.systems, SUMMARY_SYSTEMS, 'answers.systems', 1, 20);
  optionalString(a.authoritativeSource, 'answers.authoritativeSource', 700);
  validateRepeatArray(a.handoffs, 'answers.handoffs', 3, new Set(['dependency','sending','receiving','failure']), {dependency:500,sending:300,receiving:300,failure:900}, false);
  optionalString(a.currentMeasured, 'answers.currentMeasured', 1200);
  validateRepeatArray(a.kpis, 'answers.kpis', 3, new Set(['metric','owner','source']), {metric:500,owner:300,source:500}, false);
  if (!Array.isArray(a.failures) || a.failures.length !== 3) throw httpError(400, 'Exactly three failure points are required.');
  for (let i=0; i<3; i++) {
    const f = a.failures[i];
    ensureOnlyKeys(f, new Set(['point','frequency','impact','notices','response']), `answers.failures.${i}`);
    assertString(f.point, `answers.failures.${i}.point`, 1, 600);
    assertString(f.frequency, `answers.failures.${i}.frequency`, 1, 200);
    assertString(f.impact, `answers.failures.${i}.impact`, 1, 500);
    assertString(f.notices, `answers.failures.${i}.notices`, 1, 300);
    assertString(f.response, `answers.failures.${i}.response`, 1, 800);
  }
  if (!a.risks || typeof a.risks !== 'object' || Array.isArray(a.risks)) throw httpError(400, 'Risk status is required.');
  ensureOnlyKeys(a.risks, new Set(RISK_AREAS), 'answers.risks');
  for (const area of RISK_AREAS) assertEnum(a.risks[area], RISK_STATUS, `answers.risks.${area}`);
  validateRepeatArray(a.fixes, 'answers.fixes', 3, new Set(['action','owner','due','priority','evidence']), {action:700,owner:300,due:20,priority:80,evidence:700}, false);
  const first = a.fixes[0];
  assertString(first.action, 'answers.fixes.0.action', 1, 700);
  assertString(first.owner, 'answers.fixes.0.owner', 1, 300);
  assertDate(first.due, 'answers.fixes.0.due');
  assertEnum(first.priority, FIX_PRIORITIES, 'answers.fixes.0.priority');
  assertString(first.evidence, 'answers.fixes.0.evidence', 1, 700);
  for (let i=1;i<a.fixes.length;i++) validateOptionalFix(a.fixes[i], i);
  validateRepeatArray(a.evidenceRequests, 'answers.evidenceRequests', 3, new Set(['needed','source','role','due']), {needed:700,source:400,role:300,due:20}, false);
  for (let i=0;i<a.evidenceRequests.length;i++) validateOptionalEvidence(a.evidenceRequests[i], i);
  optionalString(a.unresolved, 'answers.unresolved', 1800);
  assertEnum(a.escalation, ESCALATIONS, 'answers.escalation');
}

function validateOptionalFix(f, i) {
  const used = Object.values(f || {}).some(v => String(v || '').trim());
  if (!used) return;
  assertString(f.action, `answers.fixes.${i}.action`, 1, 700);
  assertString(f.owner, `answers.fixes.${i}.owner`, 1, 300);
  assertDate(f.due, `answers.fixes.${i}.due`);
  assertEnum(f.priority, FIX_PRIORITIES, `answers.fixes.${i}.priority`);
  assertString(f.evidence, `answers.fixes.${i}.evidence`, 1, 700);
}
function validateOptionalEvidence(r, i) {
  const used = Object.values(r || {}).some(v => String(v || '').trim());
  if (!used) return;
  assertString(r.needed, `answers.evidenceRequests.${i}.needed`, 1, 700);
  assertString(r.source, `answers.evidenceRequests.${i}.source`, 1, 400);
  assertString(r.role, `answers.evidenceRequests.${i}.role`, 1, 300);
  assertDate(r.due, `answers.evidenceRequests.${i}.due`);
}

async function verifyMeetingSession(body, token) {
  if (!token || token.length < 20 || token.length > 256) throw httpError(401, 'Meeting-session token is required.');
  const ref = db.collection('meetingSessions').doc(body.sessionId);
  const snap = await ref.get();
  if (!snap.exists) throw httpError(403, 'Meeting session is not active.');
  const session = snap.data();
  if (session.active !== true) throw httpError(403, 'Meeting session is closed.');
  if (session.department !== body.department) throw httpError(403, 'Meeting session does not match this department.');
  if (Array.isArray(session.formTypes) && !session.formTypes.includes(body.formType)) throw httpError(403, 'This form type is not enabled for the meeting session.');
  if (session.opensAt?.toMillis && Date.now() < session.opensAt.toMillis()) throw httpError(403, 'Meeting session has not opened.');
  if (session.closesAt?.toMillis && Date.now() > session.closesAt.toMillis()) throw httpError(403, 'Meeting session has closed.');
  const expected = String(session.tokenHash || '');
  const supplied = sha256(token);
  if (!safeEqual(expected, supplied)) throw httpError(403, 'Meeting-session token is invalid.');
}

async function persistRevision(body) {
  const identityKey = sha256(`${body.formType}|${body.sessionId}|${body.department}|${body.workEmail}`);
  const responseId = `r_${sha256(body.clientSubmissionId).slice(0, 40)}`;
  const responseRef = db.collection('fieldResponses').doc(responseId);
  const indexRef = db.collection('fieldResponseIndex').doc(identityKey);
  let result;

  await db.runTransaction(async tx => {
    const existing = await tx.get(responseRef);
    if (existing.exists) {
      const d = existing.data();
      result = { ok: true, responseId, confirmationNumber: d.confirmationNumber, revision: d.revision, current: d.current === true, duplicateRetry: true };
      return;
    }
    const index = await tx.get(indexRef);
    const previous = index.exists ? index.data() : null;
    const revision = Number(previous?.revision || 0) + 1;
    const confirmationNumber = makeConfirmation(body.department);
    if (previous?.responseId) tx.set(db.collection('fieldResponses').doc(previous.responseId), { current: false, supersededAt: FieldValue.serverTimestamp(), supersededBy: responseId }, { merge: true });
    tx.create(responseRef, {
      schemaVersion: body.schemaVersion,
      formType: body.formType,
      sessionId: body.sessionId,
      department: body.department,
      workEmail: body.workEmail,
      answers: body.answers,
      clientSubmissionId: body.clientSubmissionId,
      clientMeta: body.clientMeta,
      identityKey,
      revision,
      current: true,
      confirmationNumber,
      createdAt: FieldValue.serverTimestamp(),
      receivedAtEpochMs: Date.now()
    });
    tx.set(indexRef, { responseId, revision, formType: body.formType, sessionId: body.sessionId, department: body.department, updatedAt: FieldValue.serverTimestamp() });
    result = { ok: true, responseId, confirmationNumber, revision, current: true, duplicateRetry: false };
  });
  return result;
}

function validateRatingObject(value, count, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw httpError(400, `${label} is required.`);
  ensureOnlyKeys(value, new Set(Array.from({length:count},(_,i)=>String(i+1))), label);
  for (let i=1; i<=count; i++) assertEnum(value[i], SCALE, `${label}.${i}`);
}
function validateRepeatArray(value, label, count, keys, limits, requireAllSlots) {
  if (!Array.isArray(value) || value.length !== count) throw httpError(400, `${label} must contain exactly ${count} slots.`);
  value.forEach((item,i) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) throw httpError(400, `${label}.${i} is invalid.`);
    ensureOnlyKeys(item, keys, `${label}.${i}`);
    const used = Object.values(item).some(v => String(v || '').trim());
    if (!used) { if (requireAllSlots) throw httpError(400, `${label}.${i} is required.`); return; }
    for (const [key,max] of Object.entries(limits)) assertString(item[key], `${label}.${i}.${key}`, 1, max);
  });
}
function validateRecursive(value, path, depth) {
  if (depth > 8) throw httpError(400, `${path} is nested too deeply.`);
  if (typeof value === 'string') { if (value.length > 2000) throw httpError(400, `${path} exceeds the text limit.`); return; }
  if (value === null || typeof value === 'number' || typeof value === 'boolean') return;
  if (Array.isArray(value)) { if (value.length > 40) throw httpError(400, `${path} has too many items.`); value.forEach((v,i)=>validateRecursive(v, `${path}.${i}`, depth+1)); return; }
  if (typeof value === 'object') { const keys=Object.keys(value); if(keys.length>80) throw httpError(400, `${path} has too many fields.`); keys.forEach(k=>{if(k.length>120)throw httpError(400,`${path} contains an invalid field name.`);validateRecursive(value[k],`${path}.${k}`,depth+1);}); return; }
  throw httpError(400, `${path} contains an unsupported value.`);
}
function ensureOnlyKeys(value, allowed, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw httpError(400, `${label} must be an object.`);
  for (const key of Object.keys(value)) if (!allowed.has(key)) throw httpError(400, `${label} contains an unexpected field: ${key}`);
}
function assertString(v, label, min, max) { if (typeof v !== 'string' || v.trim().length < min || v.length > max) throw httpError(400, `${label} is invalid.`); return v.trim(); }
function optionalString(v, label, max) { if (v === undefined || v === null || v === '') return ''; if (typeof v !== 'string' || v.length > max) throw httpError(400, `${label} is invalid.`); return v.trim(); }
function assertEmail(v) { const s=assertString(v,'workEmail',3,180).toLowerCase(); if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s))throw httpError(400,'workEmail is invalid.'); return s; }
function assertEnum(v, allowed, label) { if (typeof v !== 'string' || !allowed.has(v)) throw httpError(400, `${label} is invalid.`); return v; }
function assertArray(v,label,min,max){if(!Array.isArray(v)||v.length<min||v.length>max)throw httpError(400,`${label} must contain ${min===max?min:`${min}–${max}`} item(s).`);return v;}
function assertArraySubset(v,allowed,label,min,max){assertArray(v,label,min,max);const seen=new Set();for(const item of v){assertEnum(item,allowed,label);if(seen.has(item))throw httpError(400,`${label} contains a duplicate value.`);seen.add(item);}return v;}
function assertExclusiveChoice(v,choice,label){if(v.includes(choice)&&v.length!==1)throw httpError(400,`${choice} must be selected by itself in ${label}.`);}
function assertIntegerLike(v,label,min,max){const n=Number(v);if(!Number.isInteger(n)||n<min||n>max)throw httpError(400,`${label} is invalid.`);return n;}
function assertDate(v,label){const s=assertString(v,label,10,10);if(!/^\d{4}-\d{2}-\d{2}$/.test(s)||Number.isNaN(Date.parse(`${s}T00:00:00Z`)))throw httpError(400,`${label} is invalid.`);return s;}
function assertTime(v,label){const s=assertString(v,label,5,5);if(!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(s))throw httpError(400,`${label} is invalid.`);return s;}
function sha256(v){return crypto.createHash('sha256').update(String(v),'utf8').digest('hex');}
function safeEqual(a,b){try{const x=Buffer.from(a,'hex'),y=Buffer.from(b,'hex');return x.length===y.length&&crypto.timingSafeEqual(x,y);}catch(_){return false;}}
function makeConfirmation(dept){const date=new Date().toISOString().slice(0,10).replaceAll('-','');const suffix=crypto.randomBytes(5).toString('hex').toUpperCase();return `AK9I-${date}-${dept.toUpperCase().slice(0,4)}-${suffix}`;}
function httpError(statusCode,message){const e=new Error(message);e.statusCode=statusCode;return e;}
