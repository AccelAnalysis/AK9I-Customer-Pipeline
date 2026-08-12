# Pipeline Stage Contracts

Shared lifecycle states cannot be privately redefined. Bootstrap contracts below define purpose and governance; AK9I-specific operational entry/exit tests remain unknown until validated.

## Contract template

Each stage is governed by: Stage name; Purpose; Entry condition; Required information; Required activity; Exit condition; Allowed next states; Required handoff; Owner; Evidence; Known exceptions.

## UNKNOWN AUDIENCE / AWARE / ENGAGED

- Purpose: represent pre-identification market movement without pretending anonymous activity is a customer record.
- Entry/exit criteria: channel-specific and `UNKNOWN — BASELINE REQUIRED` where not technically observable.
- Owner: 06, with 07 for partner channels.
- Allowed next states: sequentially toward INQUIRY / LEAD.
- Evidence: approved analytics/channel evidence where available.

## INQUIRY / LEAD

- Purpose: identifiable interest requiring disposition.
- Authoritative operational definition: `UNKNOWN — BASELINE REQUIRED`.
- Bootstrap requirement: establish canonical definition and capture location before reporting conversion.
- Required concepts: source where available, owner, next action.
- Owner: 05 after handoff from 06/07.
- Allowed next: QUALIFIED PROSPECT, or governed non-progress disposition to be defined.

## QUALIFIED PROSPECT

- Purpose: prospect meets accepted fit/qualification logic.
- Definition/entry/exit: `UNKNOWN — BASELINE REQUIRED`; Admissions/AK9I validation required.
- Owner: 05.
- Allowed next: APPLICANT or governed disposition.

## APPLICANT

- Purpose: person has entered the accepted application process.
- Definition and required information: `UNKNOWN — BASELINE REQUIRED`.
- Owner: 05.
- Allowed next: ENROLLMENT-READY or governed disposition.

## ENROLLMENT-READY

- Purpose: applicant has satisfied prerequisites immediately preceding legitimate enrollment.
- Definition: `UNKNOWN — BASELINE REQUIRED`.
- Owner: 05.
- Allowed next: ENROLLED.

## ENROLLED

- Authoritative operational definition: **UNKNOWN — requires Admissions/AK9I validation.**
- Bootstrap requirement: establish canonical accepted definition before relying on this stage for reporting.
- Purpose: represent legitimate enrollment, not application activity.
- Owner: 05.
- Allowed next: CONFIRMED START or governed disposition.

## CONFIRMED START

- Purpose: enrolled person has a legitimate expected start under an accepted definition.
- Definition: `UNKNOWN — BASELINE REQUIRED`.
- Owner: 05.
- Required handoff: Learning receives required non-PII operational state through authoritative systems/process.
- Allowed next: STARTED or governed no-start disposition.

## STARTED

- Purpose: actual program start.
- Definition: `UNKNOWN — BASELINE REQUIRED`.
- Owner: 04 after 05 handoff.
- Allowed next: ACTIVE STUDENT.

## ACTIVE STUDENT

- Purpose: represent active learning/support state.
- Required activity: progress/support ownership as applicable.
- Detailed criteria: `UNKNOWN — BASELINE REQUIRED`.
- Owner: 04.
- Allowed next: PROGRAM COMPLETION or governed withdrawal/non-completion states to be validated.

## PROGRAM COMPLETION

- Purpose: accepted program completion event.
- Definition: `UNKNOWN — BASELINE REQUIRED`.
- Owner: 04.
- Required handoff: 03 Outcomes.
- Allowed next: GRADUATE where validated.

## GRADUATE

- Purpose: person eligible for post-graduation continuity under AK9I's accepted definition.
- Definition: `UNKNOWN — BASELINE REQUIRED`.
- Owner: 03.
- Allowed next: POST-GRADUATION OUTCOME / ALUMNI.

## POST-GRADUATION OUTCOME

- Purpose: represent an evidence-based outcome state, not an undifferentiated employer contact.
- Required information: intended outcome plus meaningful stage distinctions where supported.
- Detailed state model: `UNKNOWN — BASELINE REQUIRED` pending Outcomes validation.
- Owner: 03.
- Allowed next: ALUMNI and/or advocacy eligibility.

## ALUMNI

- Purpose: preserve post-program relationship continuity.
- Definition/eligibility: `UNKNOWN — BASELINE REQUIRED`.
- Owner: 03.
- Allowed next: ADVOCATE / REFERRAL SOURCE where appropriate.

## ADVOCATE / REFERRAL SOURCE

- Purpose: eligible person/organization provides feedback, proof, reputation, or qualified referral under consent/privacy rules.
- Eligibility and request timing: `UNKNOWN — BASELINE REQUIRED`.
- Owner: 02.
- Allowed next: NEW QUALIFIED DEMAND through governed source attribution.
