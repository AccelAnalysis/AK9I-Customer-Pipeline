# Parallel Delivery Matrix

Dependency classes: **GREEN** independent; **YELLOW** contract-dependent; **RED** outcome-dependent.

| Lane | Owns | Consumes | Produces | May change independently | May not redefine | Expected dependencies | Acceptance / integration |
|---|---|---|---|---|---|---|---|
| 00 Control Room | mission, sequencing, tracker, dependencies, bottlenecks | all lane state | work packets, priorities, program state | sequencing within authority | functional outcomes or acceptance verdicts | all | coordinates; does not self-certify |
| 01 Shared Platform | lifecycle/data/measurement contracts | source systems, lane needs | canonical definitions/interfaces | implementation detail not changing business meaning | functional outcome criteria owned elsewhere | YELLOW PCRs; baseline access | lane 08 acceptance; lane 09 all-lane integration |
| 02 Advocacy | feedback/reviews/testimonials/referrals | outcomes, consent, shared identity | advocacy process/evidence | local workflow | lifecycle/outcome definitions | YELLOW 01/03/06; RED eligible success events | 08 + 09 feedback loop |
| 03 Outcomes | graduate outcomes/placement/alumni | completion, shared identity | outcome state/evidence | local outcome workflow | shared lifecycle; strategic channel ownership | YELLOW 01/07; RED completions | 08 + 09 completion→outcome→advocacy |
| 04 Learning | student success/progress/completion | confirmed start | completion evidence/handoff | learning-support workflow | admissions/enrollment definitions | YELLOW 01/05; RED actual starts | 08 + 09 enrollment→learning→completion |
| 05 Enrollment | inquiry→confirmed start | demand, shared contracts | enrollment/start state and handoff | admissions workflow | shared lifecycle/source definitions | YELLOW 01/06/07 | 08 + 09 demand→learning seams |
| 06 Marketing | qualified attributable demand | evidence from 02/03/04/05; attribution | campaigns/content/demand | creative/channel execution within claims authority | admissions criteria, outcome claims, shared attribution | YELLOW 01/02/05; RED verified claims | 08 + 09 marketing→pipeline |
| 07 Partnerships | reusable external channels | shared attribution, admissions/outcomes needs | partner/channel opportunities | relationship workflow | individual graduate outcome ownership | YELLOW 01/03/05 | 08 + 09 partner journeys |
| 08 Acceptance | independent requirement verification | requirements/candidates/evidence | dispositions/assurance findings | acceptance infrastructure | production implementation | candidate/evidence availability | independent; not replaced by 09 |
| 09 Integration | end-to-end journey QA | accepted components/contracts | journey findings/defects | integration test assets | component acceptance verdicts | accepted components | independent seam verification |

The matrix optimizes safe concurrency. It does not require unrelated work to wait for one lane.
