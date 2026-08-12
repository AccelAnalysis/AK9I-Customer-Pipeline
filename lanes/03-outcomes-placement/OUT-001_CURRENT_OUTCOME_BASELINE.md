# OUT-001 — Current Graduate Outcome & Placement Baseline

**Status:** ACTIVE discovery artifact  
**Owner lane:** 03 — Outcomes, Placement & Alumni  
**As of:** 2026-08-12  
**Requirements:** OUT-001, OUT-002, PRIV-001  
**Privacy:** Organization-level, public, historical regulatory, and de-identified process evidence only. No student/customer PII is included.

## Purpose

Establish what can currently be demonstrated about AK9I's graduation-to-outcome process without converting employer activity into a placement claim. This artifact distinguishes observed current public support, historical verification controls, and still-unverified operating practice.

## Evidence sources inspected

### Current merged repository truth

- Current `main` at branch creation, including merged Lane 02 advocacy and Lane 07 partnership/channel discovery baselines.
- `governance/AK9I_PIPELINE_PROGRAM_AUTHORITY.md`
- `governance/CUSTOMER_JOURNEY_ARCHITECTURE.md`
- `governance/CUSTOMER_PIPELINE_EXPERIENCE_LEDGER.md`
- `governance/PIPELINE_STAGE_CONTRACTS.md`
- `governance/SHARED_PIPELINE_CONTRACTS.md`
- `governance/PARALLEL_DELIVERY_MATRIX.md`
- `governance/pipeline-requirements.json`
- `control-room/CURRENT_PROGRAM_STATE.md`
- `control-room/MASTER_PIPELINE_TRACKER.md`
- `control-room/DEPENDENCY_MAP.md`
- `work-packets/active/OUT-001.md`
- `lanes/07-partnerships/PART-001_CURRENT_CHANNEL_INVENTORY.md`
- current acceptance/integration directories and seeded handoff/test matrices.

### Current public AK9I evidence

Observed on the current AK9I website during this discovery pass:

- `https://ak9i.edu/frequently-asked-questions/`
- `https://ak9i.edu/enrollment-form/`
- `https://ak9i.edu/recruiters-companies/`

### Historical authoritative evidence

A de-identified summary was taken from an ACCET Commission Action Letter dated 2024-04-16 for AK9I (ACCET ID #1586), preserved in connected business correspondence. The attachment itself is intentionally **not** copied into GitHub because it contains contact information that is unnecessary for this program record.

This historical letter is evidence of the control expectations and a then-existing verification weakness. It is **not** evidence that the weakness remains unresolved in 2026, and this pass did not locate the later closure/reaccreditation action or the current placement SOP in connected evidence.

## Observed current customer-facing outcome support

Current AK9I public materials establish the following as observable offerings/representations:

1. AK9I says it assists with job placement but does **not** guarantee employment, income, compensation, or job placement.
2. Publicly described placement assistance includes a career-development class, possible career paths, advice for starting an LLC, access to an AK9I alumni network, and contact information for companies with which AK9I says it has partnerships.
3. The current enrollment agreement states that AK9I will attempt in good faith to provide placement assistance and separately acknowledges that self-employment is a common vocational objective for the selected course.
4. AK9I maintains a recruiter/company intake page through which organizations can indicate interest in recruiting events and hiring certified students/teams.
5. These current public mechanisms demonstrate **career-support and employer-engagement capability**, but they do not demonstrate that an individual graduate reached an interview, offer, accepted offer, start, or verified employment/self-employment outcome.

## Historical placement-verification control evidence

The 2024 ACCET letter identified a Standard IX.D — Completion and Job Placement concern: a number of placement verifications lacked required documentation for self-employment and continuing employment under ACCET completion/placement policy.

The letter recorded that AK9I had represented that it was increasing operational attention to placement-statistics accuracy, planned completion/placement training, and was writing a detailed SOP. ACCET directed AK9I to provide, among other items:

- revised operating responsibilities for placement/completion work;
- evidence of completion/placement workshop attendance;
- a revised SOP covering graduate attestations, including self-employment and continuing employment; and
- updated 2023 completion/job-placement statistics and supporting verification/attestation forms for three vocational programs.

**Lane-03 implication:** `verified outcome` must remain an evidence-backed state. Self-employment and continuing employment require explicit verification appropriate to governing policy; they cannot be inferred from graduate intent, employer contact, or alumni activity.

## Current stage-distinction baseline

| Outcome concept | Current evidence state | Lane-03 interpretation |
|---|---|---|
| Intended post-graduation outcome / goal | **PARTIAL / NOT OPERATIONALLY VERIFIED** | Current enrollment materials show applicant goals are discussed and self-employment may be an objective, but no authoritative post-completion outcome-goal field/process has been located. |
| Completion → outcome handoff | **UNKNOWN — BASELINE REQUIRED** | Lane 04 owns completion truth; no current completion-trigger/handoff evidence is established in the repository. |
| Career support offered | **OBSERVED — PUBLIC** | Career-development and placement-assistance resources are currently represented publicly. |
| Employer network access | **OBSERVED AS CURRENT AK9I CLAIM; ROSTER UNKNOWN** | Current FAQ describes company partnerships used for placement assistance; Lane 07 independently identified the employer roster/contribution path as opaque. |
| Employer interaction for an individual graduate | **UNKNOWN — BASELINE REQUIRED** | Employer-facing intake exists, but individual graduate interaction tracking has not been evidenced. |
| Interview | **UNKNOWN — BASELINE REQUIRED** | No authoritative interview tracking source/process located. |
| Offer | **UNKNOWN — BASELINE REQUIRED** | No authoritative offer tracking source/process located. |
| Offer acceptance | **UNKNOWN — BASELINE REQUIRED** | No authoritative accepted-offer tracking source/process located. |
| Employment/self-employment start | **UNKNOWN — BASELINE REQUIRED** | No current start-verification workflow/source located. |
| Verified outcome | **HISTORICAL CONTROL EVIDENCE; CURRENT IMPLEMENTATION UNKNOWN** | 2024 evidence shows formal verification/attestation requirements were material; current 2026 process and supporting system are not yet verified. |
| Self-employment | **CURRENT VOCATIONAL OBJECTIVE + HISTORICAL VERIFICATION REQUIREMENT** | Current enrollment agreement recognizes self-employment as a common objective; outcome evidence must still demonstrate actual qualifying self-employment rather than intent alone. |
| Continuing employment | **HISTORICAL VERIFICATION REQUIREMENT; CURRENT PROCESS UNKNOWN** | Must not be inferred without current verification evidence. |
| Alumni continuity | **PARTIAL — PUBLIC CLAIM** | Current FAQ references access to an alumni network; membership, cadence, ownership, communication mechanism, and post-graduation continuity are not yet evidenced. |
| Employer feedback | **UNKNOWN — BASELINE REQUIRED** | No current structured feedback loop located. |
| Outcome reporting / placement rate | **UNKNOWN — NOT AUTHORIZED FOR CURRENT CLAIMS** | No current authoritative numerator, denominator, cohort, time window, exclusion logic, or verification source has been established in the repository. |

## Current-process conclusion

The answer to the lane's fundamental question is presently **partial**:

- AK9I demonstrably offers post-graduation career support and an employer-facing recruiting path.
- AK9I's current public materials appropriately avoid guaranteeing placement.
- Historical authoritative evidence confirms that completion/job-placement verification and evidence quality have been material compliance concerns and that self-employment/continuing-employment verification requires discipline.
- The current 2026 **operating process** from verified completion through individual employer activity, interview, offer, acceptance, start, verification, follow-up, and alumni continuity is **not yet demonstrated** from the accessible authoritative business/system evidence.

Therefore OUT-001 is active discovery, not complete, and OUT-002 remains unsatisfied until actual operating distinctions and evidence sources are verified.

## Cross-lane dependencies and requests

### Lane 04 — Learning & Student Success

Need the actual completion authority and handoff evidence: what event/state establishes successful completion, when the graduate becomes eligible for outcome support, and what de-identified handoff record exists.

### Lane 07 — Strategic Partnerships & Channels

Lane 07's merged baseline identifies an employer/company partnership network claim but no authoritative roster or measurable contribution evidence. Lane 03 needs the reusable employer relationship/roster boundary from Lane 07 while retaining ownership of individual graduate interaction and outcome evidence.

### Lane 01 — Shared Pipeline Platform

Before a production schema or authoritative KPI is defined, Lane 03 needs canonical identity/lifecycle/event/evidence semantics for outcome records and verification. This artifact intentionally does not create a competing lane-local lifecycle.

### Lane 02 — Advocacy

Advocacy/testimonial/referral eligibility should consume appropriately supported outcome and permission evidence. Lane 03 will not equate alumni membership or employer activity with a positive verified outcome.

### Lane 06 — Marketing

Any placement/outcome marketing claim must be based on an accepted definition, current verified data, and defensible cohort/measurement logic. No current placement-rate claim is authorized by this artifact.

### Lanes 08 and 09

Lane 08 remains independent acceptance authority. Lane 09 must eventually verify 04→03→02 and 03↔07 behavior after accepted components and current process evidence exist.

## Governance anomaly surfaced — not corrected here

`governance/pipeline-requirements.json` currently declares `OUT-001` with `dependencies: ["OUT-001"]`, while the active OUT-001 work packet correctly states that discovery has no prerequisite. This appears to be a requirement-registry self-reference. Lane 03 has **not** silently changed it; Control Room/shared-governance authority should resolve the registry inconsistency through the governed change mechanism.

## Evidence still required to advance OUT-001

1. Identify the human accountable owner for graduate outcome/placement operations.
2. Identify the current authoritative system(s), spreadsheet(s), forms, SOP(s), inbox/process, or other source used for graduate follow-up and outcome verification.
3. Inspect the current placement/completion SOP and determine whether the 2024 verification controls were implemented and remain in use.
4. Obtain de-identified current evidence showing how completion becomes outcome support.
5. Determine whether goal, employer interaction, interview, offer, acceptance, start, and verified outcome are actually distinguishable in current practice and data.
6. Determine the follow-up cadence and stop/close logic for graduates who are seeking, self-employed, continuing employment, unreachable, decline assistance, or have an unverified outcome.
7. Determine how employer feedback is captured and whether it can improve curriculum/support without exposing graduate PII in GitHub.
8. Determine how alumni continuity is established and how advocacy eligibility/consent is handed to Lane 02.
9. Establish whether current placement/outcome metrics can be computed defensibly, including cohort, denominator, time window, verification rules, exclusions, and evidence confidence.

## Stop boundary

Do not publish student/customer PII. Do not publish a placement rate from incomplete or unverified records. Do not convert company contact, recruiter interest, interview, offer, alumni membership, graduate intent, or self-employment intent into a verified placement/outcome without governing evidence.