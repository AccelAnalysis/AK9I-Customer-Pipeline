# AK9I Customer Pipeline Control Room

This repository is the canonical operating record for improving and operating AK9I's customer pipeline. The mission is to build and operate a measurable pipeline that reliably converts qualified prospects into enrolled students, supports successful training and completion, helps produce documented post-graduation outcomes, and turns successful students, graduates, employers, partners, and other advocates into sources of reputation, referrals, and future qualified demand.

> **Do not infer current program status from an old chat transcript. Read current merged repository state.**

## Operating model

Ten permanent lanes operate concurrently:

- 00 — AK9I Pipeline Control Room
- 01 — Shared Pipeline Platform & Intelligence
- 02 — Advocacy & Reputation
- 03 — Outcomes, Placement & Alumni
- 04 — Learning & Student Success
- 05 — Enrollment & Admissions
- 06 — Demand Generation & Marketing
- 07 — Strategic Partnerships & Channels
- 08 — Independent Acceptance
- 09 — Pipeline Integration / Journey QA

GitHub is the common coordination and institutional-memory layer. Chat is execution context. Customer/student PII belongs in authoritative business systems, not this repository.

## Canonical journey

`Market → Demand → Enrollment → Learning/Delivery → Completion → Outcome → Advocacy → Reviews/Referrals/Reputation/Partnerships → Better Qualified Demand → Market`

See `governance/CUSTOMER_JOURNEY_ARCHITECTURE.md` and `governance/PIPELINE_STAGE_CONTRACTS.md` for the lifecycle model.

## How work moves

Meaningful improvement work is bounded in work packets. Functional lanes may report `IMPLEMENTATION COMPLETE`, but required acceptance is performed independently by lane 08. After component acceptance, lane 09 separately verifies cross-lane journey integration. Shared definitions and interfaces are changed through governed shared-contract decisions or Pipeline Contract Requests (PCRs), not by private lane conventions.

Current authoritative briefing: `control-room/CURRENT_PROGRAM_STATE.md`.

## New chat bootstrap

A new project chat should start from its copy-ready prompt in `governance/chat-prompts/`, then read current merged repository state in the sequence defined by `AGENTS.md` and its lane charter.

## Human contributor start

1. Read `AGENTS.md`.
2. Read `control-room/CURRENT_PROGRAM_STATE.md`, `MASTER_PIPELINE_TRACKER.md`, and `DEPENDENCY_MAP.md`.
3. Read the applicable lane charter and shared contracts.
4. Select or create a bounded work packet under `work-packets/`.
5. Use a short-lived branch tied to the work-packet ID.
6. Record evidence, dependencies, decisions, and tracker changes durably.
7. Avoid PII and unsupported business claims.
8. Submit durable changes through a PR and follow the applicable acceptance/integration path.
