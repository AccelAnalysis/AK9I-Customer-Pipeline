# Master Pipeline Tracker

Status flow: `BACKLOG → READY → ACTIVE → BLOCKED → ACCEPTANCE-PENDING → ACCEPTED → INTEGRATION-PENDING → INTEGRATED → CLOSED`.

| Work Packet | Title | Lane | Pipeline stage | Status | Priority | Dependency | Blocked by | Owner | Acceptance | Integration | Evidence | Next action | Last updated |
|---|---|---:|---|---|---|---|---|---|---|---|---|---|---|
| SHR-001 | Inventory Current Pipeline Systems and Sources of Truth | 01 | Shared | ACTIVE | P0 | GREEN | — | Lane 01 | Required | Required | baseline pending | Inventory actual systems | 2026-08-12 |
| SHR-002 | Establish Canonical Customer Lifecycle Definitions | 01 | Shared | READY | P0 | YELLOW | SHR-001 | Lane 01 | Required | Required | stage contracts initial only | Validate definitions with AK9I/lanes | 2026-08-12 |
| SHR-003 | Establish Current Source Attribution Model | 01 | Demand/Shared | READY | P0 | YELLOW | SHR-001 | Lane 01 | Required | Required | attribution baseline pending | Inspect actual source fields/behavior | 2026-08-12 |
| BASE-001 | Establish Current Pipeline Baseline | 00/01 | All | ACTIVE | P0 | YELLOW | SHR-001 | Control Room + Lane 01 | Required | Required | baseline not established | Gather evidence without inventing values | 2026-08-12 |
| ADV-001 | Inventory Current Feedback, Reviews, Testimonials, and Referral Practices | 02 | Advocacy | ACTIVE | P1 | GREEN discovery; YELLOW/RED implementation | — | Lane 02 | Required | Required | `evidence/advocacy/ADV-001_CURRENT_STATE_BASELINE_2026-08-12.md` | Obtain de-identified internal process/system evidence | 2026-08-12 |
| OUT-001 | Inventory Current Graduate Outcome and Placement Process | 03 | Outcomes | ACTIVE | P0 | GREEN discovery; YELLOW authoritative reporting | — | Lane 03 | Required | Required | `lanes/03-outcomes-placement/OUT-001_CURRENT_OUTCOME_BASELINE.md` | Identify accountable owner/current SOP and verify actual outcome-stage tracking with de-identified evidence | 2026-08-12 |
| LRN-001 | Inventory Current Student Journey and Completion Measurement | 04 | Learning | READY | P0 | GREEN | — | Lane 04 | Required | Required | baseline pending | Observe current journey | 2026-08-12 |
| ENR-001 | Inventory Current Inquiry-to-Enrollment Process | 05 | Enrollment | READY | P0 | GREEN | — | Lane 05 | Required | Required | baseline pending | Observe actual vs intended process | 2026-08-12 |
| MKT-001 | Inventory Current Demand Sources and Marketing Measurement | 06 | Demand | ACTIVE | P1 | GREEN | — | Lane 06 | Required | Required | `evidence/marketing/MKT-001-current-demand-inventory-2026-08-12.md` — public baseline partial | Inspect authoritative analytics/channel/form data; converge attribution via SHR-003; coordinate course/enrollment truth with 05 | 2026-08-12 |
| PART-001 | Inventory Current Referral, Employer, Agency, and Strategic Channels | 07 | Partnerships | ACTIVE | P1 | GREEN | — | Lane 07 | Required | Required | lanes/07-partnerships/PART-001_CURRENT_CHANNEL_INVENTORY.md | Obtain authoritative relationship roster; validate employer/veteran channels and contribution traceability | 2026-08-12 |

`CLOSED` requires completed work plus required acceptance/integration/operational evidence; implementation stopping is not closure.
