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

## Pipeline Contract Request (PCR)

When a lane needs another lane to define or change shared behavior, it must not invent a local replacement. Record a PCR containing: requesting lane; affected contract; problem; why current contract is insufficient; required decision/interface; affected work packets; affected requirements; blocking classification; proposed resolution; owner; disposition. Update the Dependency Map when blocking or sequencing changes.
