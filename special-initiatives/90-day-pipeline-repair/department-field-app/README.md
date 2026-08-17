# AK9I Department Fieldwork Application

**Field date:** Tuesday, August 18, 2026  
**Status:** implementation candidate; Firebase project configuration and GitHub Pages enablement remain deployment prerequisites.  
**Program relationship:** supports the Day-2 fieldwork in the 90-day pipeline repair initiative and the broader Wave-1 baseline. It does not redefine canonical lifecycle, attribution, or pipeline requirements.

## What is implemented

One mobile-first site contains two connected workflows:

1. **Individual Department Operating Pulse** — one response per participant, designed for approximately 6–8 minutes.
2. **Department Meeting Summary** — one facilitator response after each department meeting.

Tuesday's four primary department links are prefilled for:

- Kennels;
- Training / Instruction;
- Grounds & Maintenance;
- Office / Admissions / Student Services.

The individual form includes the complete rapid operating pulse; department-specific activities and ratings; delay, system, measurement, waste, continuity, risk, and priority questions; seven-day improvement capture; evidence-source pointers; willingness to participate; and private follow-up request.

The facilitator form captures the operating map:

`Purpose → Work → Owner → System → Dependency → KPI → Failure Point → Immediate Fix`

It also captures risk status, evidence requests, unresolved questions, and private escalation category.

## Mobile behavior

- card-based 1–5 ratings rather than a matrix;
- large touch targets and responsive layout;
- progress indicator with Back / Continue navigation;
- department locked when selected by the distributed link;
- conditional risk and single-person-dependency questions;
- local draft auto-save;
- remembered email on the same device;
- final review screen showing email, department, and session;
- connectivity-aware submission retry queue;
- server confirmation number;
- resubmissions retained as revisions, with the latest response marked current;
- no file-upload fields.

## Privacy boundary

The public repository contains **application code and field definitions only**. It must never contain respondent submissions, work-email exports, session tokens, generated QR-code links, student/customer records, personnel files, passwords, medical information, confidential allegations, or Firebase administrative credentials.

The form tells respondents that email is self-identified and **does not verify identity**. Respondents are instructed not to enter student/customer names, passwords, medical information, confidential personnel information, or allegations about another person. Sensitive concerns use the private-follow-up / private-escalation path without collecting the details in the public field form.

## Repository layout

- `site/` — static GitHub Pages client.
- `firebase/functions/` — HTTPS submission function with App Check and server-side validation.
- `firebase/firestore.rules` — deny-all client rules; server-only persistence.
- `firebase/tools/create-meeting-sessions.mjs` — creates hashed-token meeting sessions and private department links/QR SVGs.
- `firebase/tools/export-responses.mjs` — private administrator export using Google application-default credentials.
- `DEPLOYMENT.md` — one-time deployment and field-day runbook.

## Local static preview

From this directory:

```bash
python3 -m http.server 8080 --directory site
```

Then open the local site. Submission is intentionally unavailable until `site/config.js` is populated by the Pages deployment workflow or a local development copy.

## Validation

The candidate is designed so that the browser is not the trust boundary. The server:

- verifies Firebase App Check;
- verifies a department/session token whose hash is stored server-side;
- rejects unexpected envelope and answer fields;
- validates allowed choice values, text lengths, dates/times, array limits, and required response shapes;
- generates server-side receipt metadata and confirmation numbers;
- uses an idempotent client-submission ID for retry;
- marks earlier responses from the same email + form + session + department as superseded.

This builder implementation is not an Independent Acceptance disposition.
