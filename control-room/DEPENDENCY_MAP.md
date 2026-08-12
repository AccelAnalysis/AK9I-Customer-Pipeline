# Dependency Map

| Active dependency | Requesting lane | Provider lane | Work packet | Requirement | Class | Blocking effect | Status | Next action |
|---|---:|---:|---|---|---|---|---|---|
| Actual systems/source inventory | 00/01 | 01 + authorized humans | SHR-001 / BASE-001 | PIPE-001, PIPE-002 | GREEN→YELLOW | Canonical mapping cannot be verified before system truth | ACTIVE | Inventory systems and sources of truth |
| Lifecycle validation | 05/04/03/02/06/07 | 01 + affected lanes + AK9I authority | SHR-002 | DATA-001, ENR-001 | YELLOW | Conversion reporting and stage handoffs remain provisional | READY | Validate stage definitions from actual processes |
| Source attribution implementation truth | 06/07/05 | 01 | SHR-003 | ATTR-001, MKT-001, PART-001 | YELLOW | Channel contribution cannot be authoritative | READY | Inspect original/latest source behavior and physical fields |
| Canonical course/enrollment content truth | 06 | 05 + authorized AK9I owner | MKT-001 / ENR-001 | MKT-001, ENR-001 | YELLOW | Lane 06 should not correct or amplify course-count/financing content where current Admissions truth is unresolved | READY | Lane 05 validate canonical current offerings, duration, tuition, and financing example; Lane 06 then align public conversion content |

No RED dependency is asserted at bootstrap because actual outcome-dependent work has not yet been claimed complete.
