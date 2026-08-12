# Dependency Map

| Active dependency | Requesting lane | Provider lane | Work packet | Requirement | Class | Blocking effect | Status | Next action |
|---|---:|---:|---|---|---|---|---|---|
| Actual systems/source inventory | 00/01 | 01 + authorized humans | SHR-001 / BASE-001 | PIPE-001, PIPE-002 | GREEN→YELLOW | Canonical mapping cannot be verified before system truth | ACTIVE | Inventory systems and sources of truth |
| Lifecycle validation | 05/04/03/02/06/07 | 01 + affected lanes + AK9I authority | SHR-002 | DATA-001, ENR-001 | YELLOW | Conversion reporting and stage handoffs remain provisional | READY | Validate stage definitions from actual processes |
| Source attribution implementation truth | 06/07/05 | 01 | SHR-003 | ATTR-001, MKT-001, PART-001 | YELLOW | Channel contribution cannot be authoritative | READY | Inspect original/latest source behavior and physical fields |
| Current graduate-outcome operating source, owner, and SOP | 03 | Authorized AK9I owner + 01 systems inventory | OUT-001 / SHR-001 | OUT-001, OUT-002 | GREEN→YELLOW | Discovery can proceed, but current operating stages, verification practice, follow-up, and outcome metrics cannot be authoritative | ACTIVE | Identify accountable owner/current system and inspect the current completion/placement SOP using de-identified evidence |
| Completion → outcome handoff truth | 03 | 04 | OUT-001 / LRN-001 | OUT-002, LRN-001 | GREEN→YELLOW | Outcome entry timing and evidence remain provisional until completion authority/handoff is observed | READY | Lane 04 to verify actual completion event/state and de-identified handoff to post-graduation support |
| Employer relationship → individual graduate outcome seam | 03 | 07 | OUT-001 / PART-001 | OUT-002, PART-001 | GREEN→YELLOW | Employer-network/contact evidence cannot be treated as an individual placement or verified outcome | ACTIVE | Validate authoritative employer roster/relationship boundary and trace individual interactions separately through Lane 03 outcome evidence |

No RED dependency is asserted because Lane 03 discovery can proceed; authoritative outcome semantics/reporting remain provisional until the listed YELLOW dependencies are resolved.
