# Work Packet Protocol

Meaningful improvement work is bounded in durable work packets. Requirement IDs are immutable governance identifiers; work-packet IDs are execution identifiers. One work packet may satisfy several requirements.

## Required sections

```text
Work Packet ID
Title
Objective
Original requirement(s)
Business reason
Current state
Owner lane
Human accountable owner, if known
Inputs
Dependencies
Dependency classification
Shared contracts consumed
Authorized actions
Expected output
KPI / observable outcome affected
Evidence required
Acceptance criteria
Integration requirement
Explicit non-ownership
Stop boundary
Status
Next action
```

Prefixes include `SHR-`, `ADV-`, `OUT-`, `LRN-`, `ENR-`, `MKT-`, and `PART-`; baseline packets may use `BASE-`.

Statuses follow the Master Pipeline Tracker. Work packets move between `active`, `blocked`, `acceptance-pending`, and `completed` directories only when durable status supports that move.

## Requirement-registry dependency references

`governance/pipeline-requirements.json` keeps `dependencies` as an array of strings for compatibility, but every non-empty dependency reference must declare its namespace:

- `work-packet:<ID>` — the requirement consumes or depends on execution/evidence from a durable work packet.
- `requirement:<ID>` — the requirement has a true requirement-level prerequisite.

Bare IDs such as `OUT-001` are invalid because requirement IDs and work-packet IDs intentionally occupy different namespaces and may have the same visible identifier. A requirement may reference a same-named work packet (for example requirement `OUT-001` may depend on `work-packet:OUT-001`); that is not a requirement self-dependency. A requirement may not depend on `requirement:<its-own-ID>`.

Repository validation must reject ambiguous/bare dependency references, unknown requirement/work-packet targets, requirement self-dependencies, duplicate references, and requirement-level dependency cycles. This convention types coordination metadata only; it does not redefine lifecycle, attribution, functional business rules, or work-packet status.

## Pipeline Contract Request (PCR)

When a lane needs another lane to define or change shared behavior, it must not invent a local replacement. Record a PCR containing: requesting lane; affected contract; problem; why current contract is insufficient; required decision/interface; affected work packets; affected requirements; blocking classification; proposed resolution; owner; disposition. Update the Dependency Map when blocking or sequencing changes.
