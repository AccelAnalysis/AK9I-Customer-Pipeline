# ENR-001 Public Enrollment Path Baseline — 2026-08-12

## Scope and evidence boundary

This note records de-identified, externally observable enrollment-path evidence for ENR-001. It does **not** establish the internal CRM/SIS workflow, actual response performance, authoritative stage fields, conversion rates, or human ownership. No customer/student PII is included.

## Observed public entry paths

1. AK9I public website provides general contact / information-request paths and a facility-visit call to action.
2. A separate `ak9i-enrollments` page provides a lightweight lead form requesting first name, last name, email, and phone.
3. The primary enrollment page provides both a downloadable Course Enrollment Agreement and an online multi-step version of that agreement.
4. The enrollment page states that a student applicant is contacted by AK9I by telephone to discuss goals and course convening dates before/while progressing through acceptance.

## Evidence-backed customer-experience issue

The separate public enrollment landing page currently displays `Next Course: March 3, 2025`. As of 2026-08-12, that date is stale. This is a current public-facing maintenance/friction defect because a prospective student can encounter an obsolete next-course date while attempting to enroll.

## Observable admissions / acceptance requirements

The current public Course Enrollment Agreement indicates:

- basic admission requires high-school or GED graduation;
- proof of high-school/GED graduation or college transcripts is part of the acceptance process;
- required academic documentation must be provided before class commencement or the student may be excluded until received;
- the applicant selects a course and supplies a start/convening date in the enrollment agreement;
- the agreement contains payment/funding information and a source question asking how the applicant heard about AK9I;
- the agreement distinguishes applicant, accepted applicant, enrolled student, no-show/cancellation, withdrawal, and started/attending states in policy language.

## Candidate definition evidence — NOT YET AUTHORITATIVE

The agreement states that the contract is binding only when it is accepted, signed, and dated by an authorized AK9I official. Its final acceptance sections also require an AK9I School Official to certify that the candidate meets admission requirements and then record that the candidate has been accepted for enrollment into a named course/class with a convening date.

**Candidate for SHR-002 validation:** legitimate `ENROLLED` may correspond to completed admission review plus an executed/accepted enrollment agreement and authorized AK9I school-official acceptance into a specific course/class. This is evidence for discussion, not a Lane 05 unilateral lifecycle definition.

Payment/funding readiness must remain separately validated. The public agreement describes payment methods, GI Bill treatment, and a third-party financing path, but this evidence does not prove which payment/funding conditions are required before AK9I considers a person enrolled versus enrollment-ready or confirmed to start.

## Actual-vs-intended gaps still requiring internal evidence

The following remain `UNKNOWN — BASELINE REQUIRED`:

- where each public inquiry/enrollment form is routed;
- authoritative CRM/SIS/enrollment system(s) and physical fields;
- who owns first response and each subsequent next action;
- response-time expectations and actual response-time distribution;
- qualification criteria before application;
- duplicate-record handling across contact/enroll/application paths;
- application completion/abandonment visibility and recovery process;
- documentation checklist ownership and incomplete-document follow-up;
- funding/payment status ownership and handoff rules;
- exact operational transition tests for APPLICANT → ENROLLMENT-READY → ENROLLED → CONFIRMED START;
- no-show / cancellation tracking before class start;
- authoritative start roster and Lane 05 → Lane 04 handoff;
- whether the public `How did you hear about AK9I` response is stored as original-source attribution without overwrite;
- current aggregate conversion, velocity, abandonment, and no-start metrics.

## Internal evidence needed next

Use aggregate/de-identified evidence only:

1. Staff walkthrough of one normal inquiry → start path and at least one exception/abandonment path.
2. System inventory showing the authoritative destination for website/contact/enrollment submissions.
3. De-identified recent cohort funnel counts by accepted stage definitions once available.
4. De-identified timestamps sufficient to measure inquiry response, application progression, enrollment acceptance, confirmed start, and actual start.
5. Current SOP/checklist/templates for admissions, required documents, funding/payment coordination, and pre-start communications.
6. Evidence of current record ownership, next-action assignment, and recovery for stalled records.
7. Evidence of the Learning handoff and the authoritative source for actual start/no-start.

## Governance disposition

- ENR-001 discovery: may proceed GREEN.
- Canonical lifecycle validation: YELLOW on SHR-002.
- Source-attribution implementation truth: YELLOW on SHR-003.
- No authoritative enrollment conversion rate should be reported until the enrolled definition and physical stage mapping are accepted.
