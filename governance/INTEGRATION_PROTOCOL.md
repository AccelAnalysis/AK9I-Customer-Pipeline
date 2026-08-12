# Pipeline Integration Protocol

Lane 09 tests whether accepted components behave as one coherent customer journey. This is separate from lane 08 component/requirement acceptance.

## Mandatory seams

- Marketing → shared pipeline/CRM
- Marketing → Admissions
- Admissions → Student start
- Enrollment → Learning
- Learning → Completion
- Completion → Outcomes
- Outcomes → Advocacy
- Advocacy → Demand
- Partnerships → Enrollment
- Partnerships → Outcomes
- Shared Pipeline → every lane

## Initial journey test families

Use synthetic/de-identified scenarios only:

- organic digital prospect
- referral-generated prospect
- partner-generated prospect
- applicant with incomplete enrollment path
- enrolled student reaching start
- active student reaching completion
- graduate seeking a post-graduation outcome
- graduate reaching advocacy
- referred customer returning to demand pipeline

Special funding, military/veteran, agency, employer-sponsored, or similar pathways are added only when supported by AK9I authority.

Integration verifies lifecycle continuity, attribution continuity, handoff continuity, next-action ownership, and the completion→outcomes→advocacy loop. Findings identify the journey, originating/receiving stage, expected vs observed behavior, requirement, severity, and owning lane. Integration failure is not automatically a component-acceptance failure.
