# AK9I Pipeline Program Authority

## Status and precedence

This is the highest program-specific repository authority below explicit AK9I executive/user direction. Conflicts are resolved in that order; lower artifacts must be corrected rather than silently diverging.

## Mission

Build and operate a measurable AK9I customer pipeline that reliably converts qualified prospects into enrolled students, supports those students through successful training and completion, helps produce documented post-graduation outcomes, and turns successful students, graduates, employers, partners, and other advocates into reputation, referrals, and future qualified demand.

The top-level success condition is a **healthy closed-loop customer pipeline**, not merely increased lead volume.

## Program boundary

The program covers the customer journey, shared lifecycle/data contracts, demand, admissions, learning/student success, completion, outcomes, advocacy, strategic channels, measurement, acceptance, and journey integration. It does not make GitHub the operational database for customer/student records.

## Architecture

Centralize intent and coordination. Distribute execution. Share common infrastructure. Communicate through durable shared state. Independently verify outcomes. Test the complete customer journey separately from component acceptance.

Permanent lanes are 00–09 as defined in `CHAT_LANE_CHARTERS.md`.

## Powers and autonomy

Lane 00 coordinates mission, sequencing, priorities, requirements, dependencies, conflicts, program health, wave management, and executive escalations. Functional lanes 01–07 may act independently within charter and approved work-packet boundaries. Lane 01 governs shared pipeline concepts/interfaces. Lane 08 is independent acceptance. Lane 09 is independent cross-lane journey integration.

The Control Room is not a routine implementation lane and must not become a human approval bottleneck.

## One customer journey

Shared lifecycle terms, attribution concepts, identity conventions, pipeline state, and common measurement definitions may not be independently redefined by functional lanes. Shared changes must update governing contracts and affected durable state.

## Privacy boundary

Customer/student PII belongs in authoritative business systems. GitHub may contain aggregate, redacted, synthetic, or non-identifying evidence and references. See `PRIVACY_AND_DATA_BOUNDARIES.md`.

## Acceptance and integration independence

A builder may claim `IMPLEMENTATION COMPLETE`; it may not convert that claim into `ACCEPTED` where independent acceptance is required. Acceptance asks whether a candidate satisfies its approved requirement. Integration separately asks whether accepted components operate as one coherent customer journey.

## Human authority

Execution lanes may analyze, inspect connected systems, create process artifacts, design workflows, draft materials, maintain GitHub state, and perform authorized tool actions. They may not fabricate human approvals or claim offline actions occurred. Policy approvals, contracts, material financial authorization, hiring decisions, calls/interviews, student instruction, and similar organizational actions remain with authorized humans unless explicitly delegated.

## Change control

- Local lane decisions: within charter and no shared redefinition.
- Shared-contract decisions: lane 01/shared authority plus affected lanes.
- Program-architecture decisions: Control Room authority.
- Business/executive decisions: authorized AK9I human.

Material decisions are recorded in `control-room/DECISION_LOG.md`.

## Initial sequencing

Wave 0 Operating System → Wave 1 Baseline Truth → Wave 2 Advocacy & Reputation → Wave 3 Outcomes, Placement & Alumni → Wave 4 Learning & Student Success → Wave 5 Enrollment & Admissions → Wave 6 Demand Generation → Wave 7 Continuous Bottleneck Optimization. Safe parallel work is allowed; the sequence prevents top-of-funnel volume from becoming the primary success definition before downstream truth is observable.

## Completion doctrine

`Work performed ≠ outcome achieved`

`Outcome claimed ≠ outcome verified`

`Component accepted ≠ journey integrated`

A work item is not closed merely because implementation stopped.

## Healthy-pipeline definition

AK9I has a healthy customer pipeline when it can identify where every meaningful active prospect/customer is in the journey, where that person came from when attribution is available, what should happen next, who owns that action, whether required handoffs occurred, what ultimately happened, and whether successful outcomes generated feedback, reputation, referrals, or future qualified demand. Management can identify conversion, velocity, quality, capacity, outcomes, and bottlenecks without manually reconstructing the customer story from disconnected sources.
