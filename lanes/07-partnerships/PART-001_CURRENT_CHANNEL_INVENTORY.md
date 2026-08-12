# PART-001 — Current Strategic Partnership & Channel Inventory

**Status:** ACTIVE discovery artifact  
**Owner lane:** 07 — Strategic Partnerships & Channels  
**As of:** 2026-08-12  
**Privacy:** Organization-level and public/de-identified evidence only; no customer/student PII.

## Purpose

Establish an evidence-backed baseline of AK9I external relationships and strategic channels while explicitly distinguishing:

1. **Contact / signal** — evidence that an organization or channel is known, mentioned, accessible, or has interacted with AK9I, but no reliable evidence of an operating relationship.
2. **Active relationship** — evidence of an ongoing or operational relationship, agreement, partnership, approval/channel access, or repeatable collaboration.
3. **Measurable pipeline contribution** — evidence that the relationship can be traced to attributable candidate/customer movement, employer/outcome activity, referrals, credibility conversion, or another defined pipeline result.

These classifications are evidence states, not sales-stage labels. Lane 07 does not redefine canonical identity, lifecycle, attribution, admissions, or outcome contracts.

## Evidence sources inspected

- Current merged `main` at `401069a67c6e02f87ebca30c98ba2ef051b60525`.
- Governance, baseline, tracker, dependency, and PART-001 work-packet artifacts.
- Current public AK9I website pages indexed in 2026.
- Current public Point One USA facilities page indexed in 2026.
- Limited connected correspondence search used only as discovery support; no private correspondence or personal contact information is reproduced here.

## Current inventory

| Organization / channel | Channel type | Evidence state | Evidence | Current classification | Measurable contribution | Confidence / limitation | Next validation action |
|---|---|---|---|---|---|---|---|
| Point One USA | Industry / training partner | Reciprocal current public evidence | AK9I publicly states it holds a strategic partnership with Point One for EOD/bomb-tech training; Point One publicly states its Isle of Wight live-explosive range was achieved in partnership with American K9 Interdiction through a special-use permit. | **ACTIVE RELATIONSHIP** | **UNKNOWN — NOT YET MEASURED** | Strong evidence that an operational relationship exists; no current candidate, enrollment, outcome, referral, revenue, or credibility contribution is traceable in repository data. | Confirm human owner, relationship objective, current agreement/operating scope, and whether contribution can be linked through authoritative systems. |
| Virginia State Approving Agency / GI Bill® pathway | Military/veteran education channel | Current AK9I public claim; official agency role verified, AK9I-specific listing not independently retrieved in this pass | AK9I states it is approved by the Virginia SAA to offer training under Post-9/11 GI Bill® chapters. Virginia DVS confirms the SAA is the approval pathway for veteran education/training programs. | **ACTIVE/APPROVED CHANNEL CLAIM — AK9I-SPECIFIC VERIFICATION PENDING** | **UNKNOWN — NOT YET MEASURED** | Public evidence supports channel relevance, but this artifact does not independently establish current AK9I approval record or attributable veteran-student flow. | Verify AK9I in authoritative VA/SAA facility/program records; identify admissions handoff and source capture for GI Bill entrants. |
| DoD SkillBridge | Military transition / candidate channel | Current AK9I public claim only | AK9I course page states “DOD Skillbridge Accepted.” | **CHANNEL CLAIM — OFFICIAL VERIFICATION PENDING** | **UNKNOWN — NOT YET MEASURED** | No authoritative current DoD provider record was retrieved in this pass. Do not treat as independently verified active channel yet. | Confirm current DoD SkillBridge provider/program status and determine whether SkillBridge-origin candidates are distinguishable in authoritative systems. |
| Unnamed public/private training sites | Training-access / credibility relationships | Current AK9I public claim, counterparties unnamed | AK9I states it has formalized access agreements with numerous public and private sites for realistic training scenarios. | **ACTIVE RELATIONSHIP CLASS CLAIM — INDIVIDUAL PARTNERS UNKNOWN** | **UNKNOWN — NOT YET MEASURED** | Relationship class appears operational, but organizations, owners, terms, recency, and pipeline value are not observable. | Obtain current site/agreement roster from authorized AK9I owner and classify each relationship without publishing sensitive agreement details. |
| Unnamed companies used for graduate job-placement contacts | Employer / outcome network | Current AK9I public claim, counterparties unnamed | AK9I FAQ says job-placement assistance includes contact information for companies with whom AK9I has partnerships. | **ACTIVE RELATIONSHIP CLASS CLAIM — EMPLOYER ROSTER UNKNOWN** | **UNKNOWN — NOT YET MEASURED** | Public evidence indicates an employer partnership network exists, but no current roster, owner, activity, placement linkage, or repeatability evidence exists in GitHub. | Coordinate with Lane 03 to inventory employer network and distinguish employer contact, active hiring relationship, interview/offer activity, and verified outcomes. |
| Government / law-enforcement / private-entity market | Employer/customer/channel segment | Public positioning and operating-history signal | AK9I publicly states it produces/trains working dogs for government, law-enforcement, and private entities and provides operational K-9 teams to diverse venues. | **MARKET / RELATIONSHIP SIGNAL ONLY** | **UNKNOWN** | This establishes served-market relevance, not current named relationships or pipeline-producing channels. | Obtain current organizational account/relationship roster from authoritative business owner/system; do not infer active status from historical service claims. |

## Current baseline conclusions

1. **A flat contact list would materially overstate current partnership health.** At least one relationship (Point One USA) has reciprocal public evidence supporting `ACTIVE RELATIONSHIP`, while several other channels are only AK9I-claimed, unnamed, or awaiting authoritative verification.
2. **No relationship currently meets the evidence standard for `MEASURABLE PIPELINE CONTRIBUTION` in the repository.** This is a measurement/evidence gap, not a finding that the relationships produce no value.
3. **The employer partnership network is particularly important but currently opaque.** AK9I publicly describes company partnerships used in job-placement support, but the current roster and contribution pathway are not observable.
4. **Military/veteran channels appear strategically material.** GI Bill and SkillBridge are publicly represented as available pathways, but lane 07 cannot yet trace channel → inquiry/candidate → enrollment → outcome.
5. **SHR-003 remains a YELLOW dependency for authoritative contribution reporting.** Lane 07 can continue relationship inventory and activation discovery independently, but source attribution cannot be treated as authoritative until physical source fields/behavior are verified.

## Contribution model gaps to validate

The following are needed to answer PART-001 without creating a lane-local competing schema. They are conceptual inventory needs that consume Lane 01 contracts:

- canonical `partnerRef` / organization identity in the authoritative system;
- relationship classification and accountable AK9I owner;
- relationship objective / intended pipeline contribution;
- current relationship evidence and last meaningful activity date;
- original/latest source or referral-channel linkage where technically available;
- partner-generated opportunity or referral reference where applicable;
- candidate/customer lifecycle linkage through Lane 01 canonical identity without exposing PII in GitHub;
- employer/outcome linkage coordinated with Lane 03;
- admissions handoff coordinated with Lane 05;
- measurable contribution definition appropriate to the channel (qualified inquiries, applicants, enrollments, starts, interviews, offers, verified outcomes, referrals, approved credibility use, or other accepted result);
- evidence confidence and unverified gaps.

## Dependencies / coordination

- **Lane 01:** physical `partnerRef` and source-attribution implementation truth; SHR-003 remains YELLOW for authoritative contribution reporting.
- **Lane 03:** employer network and individual outcome evidence. Lane 07 owns reusable employer/channel relationships; Lane 03 owns individual graduate outcome execution.
- **Lane 05:** partner/referral candidate handoff, qualification, application, enrollment, and confirmed-start progression.
- **Lanes 02/06:** approved proof/reputation and channel-supported demand claims.
- **Lane 08:** independent acceptance of PART-001 when implementation evidence is ready.
- **Lane 09:** partner-generated prospect and partnership→outcome seam testing after accepted components/evidence exist.

## Immediate next actions

1. Obtain the current authoritative external-relationship roster or identify the human/system owner if no roster exists.
2. Validate Point One relationship owner, scope, recency, and intended pipeline value.
3. Validate the named employer/company partnership roster referenced by AK9I’s FAQ with Lane 03.
4. Independently verify current GI Bill/SAA and DoD SkillBridge channel status and map their admissions handoff with Lane 05.
5. For each relationship, record evidence-backed progression from `CONTACT/SIGNAL` → `ACTIVE RELATIONSHIP` → `MEASURABLE CONTRIBUTION`; do not promote a relationship based on outreach count alone.
6. Once SHR-003 establishes physical attribution truth, test whether partner-origin demand can be linked without overwriting original source.

## Stop boundary

Do not publish private contact details, student/customer identifiers, contract-sensitive terms, or inferred partner commitments. Do not label employer contact as placement or a public mention as a partnership without evidence.
