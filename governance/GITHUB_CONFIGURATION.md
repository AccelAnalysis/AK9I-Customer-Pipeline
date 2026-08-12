# Recommended GitHub Configuration

Repository artifacts are canonical even where the current connector cannot create repository-level metadata.

## Labels to create

### Lane
`lane/00-control-room`, `lane/01-shared-platform`, `lane/02-advocacy`, `lane/03-outcomes`, `lane/04-learning`, `lane/05-enrollment`, `lane/06-marketing`, `lane/07-partnerships`, `lane/08-acceptance`, `lane/09-integration`

### Work type
`type/work-packet`, `type/contract-request`, `type/decision`, `type/risk`, `type/acceptance`, `type/integration-defect`, `type/baseline`

### Dependency
`dependency/green`, `dependency/yellow`, `dependency/red`

### Priority
`priority/P0`, `priority/P1`, `priority/P2`, `priority/P3`

### State/support
`blocked`, `acceptance-pending`, `integration-pending`, `privacy-review`, `evidence-required`

Labels support navigation but do not replace `control-room/MASTER_PIPELINE_TRACKER.md`.

## GitHub Project

Create **AK9I Customer Pipeline Control Room** with fields: Work Packet ID; Requirement ID; Lane; Pipeline Stage; Status; Priority; Dependency; Owner; KPI / Outcome; Acceptance; Integration; Target / Review Date; Blocked By; Next Action.

Workflow: `Backlog → Ready → Active → Blocked → Acceptance Pending → Accepted → Integration Pending → Integrated → Closed`.

This configuration is documented here when connected tooling cannot create Projects/labels directly; do not claim it exists until verified in GitHub.
