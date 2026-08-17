# Department Fieldwork Application — Tuesday, August 18, 2026

**Status:** implementation candidate built; live deployment prerequisites remain.  
**Work packet:** `BASE-002`  
**Fieldwork source:** `06_DAY_1_TO_DAY_14_FIELDWORK.md`, Day 2.

## Decision

Use one mobile-first application with two connected forms:

1. **Individual Department Operating Pulse** — every participant, approximately 6–8 minutes.
2. **Department Meeting Summary** — facilitator, once after each meeting.

This preserves fast comparable signal collection while keeping deeper workflow mapping, decisions, owners, and evidence requests in the facilitated conversation.

## Implementation location

`special-initiatives/90-day-pipeline-repair/department-field-app/`

## Privacy and evidence boundary

- work email is required but self-identified; it is not authenticated identity;
- name is optional;
- no student/customer names, passwords, medical information, confidential personnel detail, or allegations about another person are requested;
- sensitive concerns use a private follow-up/escalation category without explanatory detail in the form;
- no upload control exists;
- GitHub stores code/configuration only, never submissions or generated token-bearing links;
- participant responses are operating signals, not verified facts, until reconciled with records, systems, and direct observation.

## Tuesday launch groups

- Kennels
- Training / Instruction
- Grounds & Maintenance
- Office / Admissions / Student Services

The private session-generation utility creates one pulse link + QR and one summary link per department. Department and session are preselected and locked by the distributed link.

## Operating output

The facilitator workflow produces:

`Purpose → Work → Owner → System → Dependency → KPI → Failure Point → Immediate Fix`

This output feeds the Day-2 department map and BASE-001 evidence reconciliation.

## Technical boundary

```text
GitHub Pages client
  → Firebase App Check + meeting-session token
  → Firebase HTTPS function
  → private Firestore
```

The server validates the request envelope, field names, allowed choices, lengths, required shapes, session/department match, and App Check token before persistence. Firestore client rules deny reads and writes. A private identity index supports revisions so the latest same-email/session/department/form response is marked current while prior revisions remain auditable.

## Live-readiness gate

Do not call the application field-ready or distribute the QR codes until:

1. Firebase function and rules are deployed;
2. App Check is configured for the Pages origin;
3. Pages is enabled and the deployment workflow succeeds;
4. four private Tuesday sessions are generated;
5. a phone smoke test proves submit, confirmation, revision, and connectivity retry with synthetic data.

Independent Acceptance remains separate from builder implementation.
