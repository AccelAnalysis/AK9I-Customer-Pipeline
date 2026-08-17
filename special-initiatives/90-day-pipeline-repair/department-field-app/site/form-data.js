const app = document.getElementById('app');
const config = window.AK9I_FIELD_APP_CONFIG || {};
const params = new URLSearchParams(window.location.search);

const DEPARTMENTS = {
  kennels: 'Kennels',
  training: 'Training / Instruction',
  maintenance: 'Grounds & Maintenance',
  office: 'Office / Admissions / Student Services',
  sales: 'Sales / Business Development / Marketing',
  finance: 'Finance / Administration',
  leadership: 'Leadership',
  other: 'Other'
};

const TUESDAY_DEPARTMENTS = ['kennels', 'training', 'maintenance', 'office'];
const TENURE = ['Less than 3 months', '3–11 months', '1–2 years', '3–5 years', 'More than 5 years'];
const PERSPECTIVE = ['Primarily my own work', 'Primarily my department', 'Both my own work and my department'];
const SCALE = [
  ['1', '1 — Not working'],
  ['2', '2 — Weak'],
  ['3', '3 — Inconsistent'],
  ['4', '4 — Mostly working'],
  ['5', '5 — Working well'],
  ['na', 'Not sure / Not applicable']
];
const RAPID_STATEMENTS = [
  'My department’s mission and current priorities are clear.',
  'My personal responsibilities are clear.',
  'Decision and approval authority is clear.',
  'Work requests and priorities are visible and organized.',
  'I receive accurate information when I need it.',
  'Handoffs with other departments are reliable.',
  'Staffing and capacity are sufficient for current commitments.',
  'Our systems and records reflect the work that is actually occurring.',
  'Safety and quality concerns are raised and resolved appropriately.',
  'Critical work has backup coverage if someone is absent.',
  'My department can meet its current commitments over the next 30 days.'
];

const DEPT = {
  kennels: {
    tasks: ['Canine intake and identification','Dog assignment and custody','Feeding and water','Medication and health monitoring','Veterinary coordination','Cleaning and sanitation','Exercise and enrichment','Canine transport','Supply inventory','Incident reporting','Shift handoff','Kennel records'],
    ratings: ['Canine identity, assignment, and custody records are current.','Feeding, medication, and health responsibilities are clear.','Kennel capacity and staffing coverage are visible.','Cleaning and sanitation routines are consistently completed.','Incidents and near misses are reported and resolved.','The handoff between Kennels and Training is reliable.','Required supplies and equipment are available and controlled.'],
    constraint: ['Staffing coverage','Kennel capacity','Veterinary or health issue','Feeding or medication process','Sanitation','Equipment','Transportation','Records','Communication with Training','No major constraint','Other'],
    improvement: 'What is the single highest-impact kennel improvement that could begin within seven days?'
  },
  training: {
    tasks: ['Classroom instruction','Practical instruction','Lesson or curriculum planning','Training schedule','Dog/student matching','Attendance and make-up work','Student evaluation','Canine evaluation','Training records','Student coaching or intervention','Equipment preparation','Completion or certification','Handoff to placement/outcomes'],
    ratings: ['Qualified instructor coverage is sufficient for current students.','Daily schedules and lesson authority are clear.','Attendance and make-up requirements are consistently recorded.','Dog/student matching and assignments are clear.','Evaluations and training records are complete and current.','Graduation or completion authority is clear.','Student complaints and interventions have a defined process.','The handoff from Training to placement/outcomes is reliable.'],
    constraint: ['Instructor capacity','Scheduling','Curriculum consistency','Attendance','Student support','Dog availability or matching','Evaluation process','Training records','Equipment or facility','Completion handoff','Other'],
    improvement: 'What is the single highest-impact training improvement that could begin within seven days?',
    extra: 'What is the most important professional-development need?'
  },
  maintenance: {
    tasks: ['Work-request intake','Preventive maintenance','Emergency repairs','Grounds upkeep','Dormitory or housing maintenance','Facility maintenance','Vehicles or major equipment','Tools and asset control','Purchasing or supplies','Vendor coordination','Inspection or safety review','Completion documentation'],
    ratings: ['Work requests are visible and prioritized.','Preventive maintenance occurs on schedule.','Emergency work is distinguished from routine work.','Internal-versus-vendor decisions are made consistently.','Tools, equipment, and asset custody are visible.','Parts and supplies are available and controlled.','Facility or dormitory issues affecting students are escalated promptly.','Completed work is verified and documented.'],
    constraint: ['Work backlog','Staffing','Parts or supplies','Approval delays','Vendor performance','Tools or equipment','Facility condition','Dormitory condition','Vehicles','Preventive maintenance','Other'],
    improvement: 'What is the single highest-impact maintenance or facility improvement that could begin within seven days?',
    extraChoice: { label: 'Typical work-request age', options: ['Same day','1–3 days','4–7 days','More than 7 days','Not tracked','Not sure'] }
  },
  office: {
    tasks: ['Inquiry routing','Initial response and follow-up','Prospect qualification','Application documents','VA, GI Bill, or SkillBridge processing','Enrollment','Scheduling','Tuition or payment communication','Student-file management','Complaint or service recovery','Salesforce management','Reporting','Completion processing','Placement or employer handoff','Alumni communication','Marketing or public-content support'],
    ratings: ['Web, phone, and email inquiries reach a visible work queue.','Every active prospect or applicant has an owner and next action.','Course name, duration, price, and eligibility facts are consistent.','Salesforce and other systems reflect the actual customer status.','Funding, VA, and SkillBridge processes have clear ownership and backup.','Student files and records have clear ownership.','Complaints and service issues are tracked through resolution.','The handoff from completion to placement, employers, and alumni is reliable.'],
    constraintLabel: 'Where does the customer journey break most often?',
    constraint: ['Inquiry routing','First response','Qualification','Application documents','Funding or VA processing','Interview or enrollment','Confirmed start','Arrival or actual start','Current-student support','Completion','Placement or outcome follow-up','Alumni handoff','Not sure','Other'],
    improvement: 'What is the single highest-impact office, admissions, or student-service improvement that could begin within seven days?',
    extraChoice: { label: 'Typical first-response time', options: ['Less than 1 hour','Same business day','Next business day','2–3 business days','More than 3 business days','Not tracked','Not sure'] }
  }
};

const DELAY_CAUSES = ['Ownership is unclear','Approval takes too long','Priorities conflict','Information is missing or inaccurate','Waiting for another department','Staffing is insufficient','Scheduling is ineffective','System or technology problem','Supply or equipment problem','Vendor or partner delay','Student or customer delay','No recurring delay','Other'];
const SYSTEMS = ['Salesforce','Email','Phone calls','Text messages','Spreadsheet','Paper record','Student information system','LMS','Accounting or payroll system','Shared drive or cloud storage','Social-media platform','Government or vendor portal','Other'];
const SUMMARY_SYSTEMS = ['Salesforce','Student system','LMS','Accounting/payroll','Email','Spreadsheet','Paper','Shared drive','Vendor portal','Other'];
const CURRENT_MEASURES = ['Work volume completed','Timeliness','Quality or errors','Attendance or coverage','Student/customer satisfaction','Safety or incidents','Cost or spending','Revenue or sales','Compliance or record completion','Nothing consistently','Other'];
const DESIRED_MEASURES = ['Work volume','Timeliness','Quality','Attendance or staffing coverage','Student/customer satisfaction','Safety','Cost/spending','Revenue','Compliance','Handoff completion','Other'];
const WASTE = ['Duplicate work','Rework caused by errors','Poor scheduling','Conflicting priorities','Unnecessary approvals','Purchases made without advance planning','Excess printing or marketing materials','Fuel, travel, or event spending','Unused subscriptions or services','External vendors used when internal capability exists','Equipment or facility downtime','Supply or inventory loss','No significant waste observed','Other'];
const RISKS = ['Student continuity','Employee safety','Canine welfare','Training quality','Staffing or instructor capacity','Facility or equipment','Payroll or cash','Data or system access','Accreditation or compliance','Customer or contract commitment','Other'];
const PRIORITIES = ['Authority and decision rights','Role clarity','Staffing or capacity','Student service and continuity','Canine welfare or safety','Training consistency','Training or student records','Admissions and follow-up','Salesforce or data quality','Purchasing and spending','Facilities and maintenance','Cross-department communication','Compliance or quality control','Employer, placement, or alumni handoff','Other'];
const RISK_AREAS = ['Staffing/capacity','Student continuity','Safety','Canine welfare','Facility/equipment','Systems/data','Compliance/records','Spending/control','Customer or contract commitments'];

const formType = params.get('form') === 'summary' ? 'summary' : params.get('form') === 'pulse' ? 'pulse' : null;
const initialDepartment = normalizeDepartment(params.get('department'));
const sessionId = cleanShort(params.get('session')) || (initialDepartment ? defaultSession(initialDepartment) : '');
const sessionToken = params.get('token') || '';
let step = 0;
let errorMessages = [];
let submitting = false;
let confirmation = null;
let pendingSubmission = null;
let draftTimer = null;

let answers = defaultAnswers();
loadDraft();
applyPrefills();

function normalizeDepartment(value) {
  if (!value) return '';
  const v = value.toLowerCase().trim();
  const aliases = { grounds: 'maintenance', 'grounds-maintenance': 'maintenance', 'grounds & maintenance': 'maintenance', instruction: 'training', 'training-instruction': 'training', 'office-admissions-student-services': 'office', admissions: 'office' };
  return DEPARTMENTS[v] ? v : aliases[v] || '';
}
function defaultSession(dept) { return `2026-08-18-${dept}`; }
function cleanShort(value) { return String(value || '').trim().slice(0, 120); }
function esc(value) { return String(value ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function get(path) { return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), answers); }
function set(path, value) {
  const keys = path.split('.');
  let target = answers;
  keys.slice(0, -1).forEach(k => { if (target[k] == null || typeof target[k] !== 'object') target[k] = /^\d+$/.test(k) ? [] : {}; target = target[k]; });
  target[keys[keys.length - 1]] = value;
}
function hasValue(v) { return !(v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0)); }

function defaultAnswers() {
  return {
    pulse: {
      email: localStorage.getItem('ak9i-field-email') || '', name: '', department: '', role: '', tenure: '', perspective: '', otherDepartments: [],
      rapid: {}, tasks: [], outsideRole: '', cracks: '', waiting: '', delayCauses: [], systems: [], friction: '',
      currentMeasures: [], desiredMeasures: [], waste: [], singleDependency: '', dependencyFunction: '', immediateRisk: '', riskAreas: [], riskUrgency: '',
      deptRatings: {}, constraint: '', deptExtra: '', professionalDevelopment: '', deptImprovement: '', priorities: [], sevenDay: '', stopStartContinue: '', stopStartText: '', evidenceSource: '', willingness: '', privateFollowup: ''
    },
    summary: {
      facilitatorEmail: localStorage.getItem('ak9i-field-email') || '', department: '', meetingDate: '2026-08-18', startTime: '', endTime: '', attendees: '', responseCount: '', purpose: '', recurringWork: ['', '', '', '', ''],
      accountableRole: '', ownershipClarity: '', overlapping: '', orphaned: '', systems: [], authoritativeSource: '',
      handoffs: Array.from({length:3}, () => ({dependency:'', sending:'', receiving:'', failure:''})),
      currentMeasured: '', kpis: Array.from({length:3}, () => ({metric:'', owner:'', source:''})),
      failures: Array.from({length:3}, () => ({point:'', frequency:'', impact:'', notices:'', response:''})),
      risks: Object.fromEntries(RISK_AREAS.map(x => [x, ''])),
      fixes: Array.from({length:3}, () => ({action:'', owner:'', due:'', priority:'', evidence:''})),
      evidenceRequests: Array.from({length:3}, () => ({needed:'', source:'', role:'', due:''})),
      unresolved: '', escalation: ''
    }
  };
}
