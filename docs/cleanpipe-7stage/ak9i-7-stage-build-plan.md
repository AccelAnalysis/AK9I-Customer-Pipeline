# AK9I 7-Stage Customer Pipeline: Salesforce build plan (updated Oct 16 after the cleanpipe build)
**Status:** Phases 1–6 are built in the **cleanpipe sandbox only**. Phase 7 is partly built: templates and Draft flows are done; F0 is not built. Phase 8 is not started. Nothing is in production or pushed to GitHub. Deploy IDs, tests and open questions are in `ak9i-cleanpipe-build-report.md`. Production needs Jonathan's approval.
Inputs: ak9i-pipeline-triggers.md, ak9i-current-automation.md, the production findings already in this conversation, and Jonathan's design of Oct 16.

## 1. Stage model (scope: Contacts under the "S: Student" account; Leads before conversion)
Field: `AK9I_Student_Stage__c` on Lead and Contact. The values exist in cleanpipe but **not in production**. Proposed relabel: 1-Awareness, 2-Consideration, 3-Enrollment, 4-Training & Experience, 5-Loyalty, 6-Recurring, 7-Advocacy. API names stay unchanged ("Recurring Relationships" → label "Recurring").

| Stage | Entry trigger (design) | Lead Status | Contact Status__c | Opp StageName | Enrollment_Process__c | Sets stage |
|---|---|---|---|---|---|---|
| 1 Awareness | Lead created from any channel | New / Contacted | — | — | — | Flow on Lead create (default value) |
| 2 Consideration | Status → Nurture, "Interested - Future…", or **Applicant** (partial form) | Nurture / Interested / Applicant | — | — | — | Flow on Lead Status change |
| 3 Enrollment | Form completed → auto-convert (or a rep completes it) | **Converted** | **Applied** | Applied → Accepted → Payment Link Sent → Paid | Agreement → Interview → Acceptance → Documents | Form / RT flow on conversion |
| 3 → done | All docs received + $100 fee paid | — | **Enrolled** | **Enrolled** (meaning "enrollment complete") | Documents Received | Flow on docs + payment |
| 4 Training & Experience | Michelle sets Active Student (after Actual Start Date) | — | **Active Student** (new) | Enrolled | — | Flow on Status__c |
| 5 Loyalty | Active Student and today > Graduation date (not Withdrew / LOA) | — | Graduated | Enrolled (or Paid; decide) | — | Scheduled path on Course_End_Date__c |
| 6 Recurring | Employment survey received + Graduated + not alumni | — | Graduated | — | — | Flow on survey received |
| 7 Advocacy | Registered for the Alumni program | — | Graduated | — | — | Flow on new alumni field |
| Stop | Withdrew / Leave of Absence (manual) | — | Withdrew / LOA | Closed Lost / unchanged | — | Freeze stage; no automation |

Note: with a Lead Status of "Converted", Lead Status no longer mirrors the pipeline. Stage reporting reads `AK9I_Student_Stage__c` only.

## 2. Lead Status changes (cleanpipe, then production)
Current: cleanpipe converted value = `Applicant`; production = `Enrolled` (label "Qualified"). RT_Conversion_to_Enrollment triggers on Applicant. The form's auto-convert uses `Converted`.

| Step | Cleanpipe | Production (later, approved) |
|---|---|---|
| 1 | Add `Converted` (converted=true) to LeadStatus | Add `Converted` (converted=true) and `Applicant` (converted=false) | Done. Conversion test passed; Applicant set to non-converted |
| 2 | Add `Converted` to the lead business process (ID 019Po00000BIJAjIAP; rename the process "Converted" in Setup) | Same on the production process | Done. Tests passed |
| 3 | Repoint RT_Conversion_to_Enrollment to `IsConverted = true` (better than a status value), new version, activate | Deploy the flow | Built in form v12 (**Draft**, not activated); not tested as guest |
| 4 | Change `Applicant` to converted=false. If Salesforce blocks that while converted leads hold it, delete Applicant → replace with Converted, then re-add Applicant as non-converted | Delete `Enrolled` → replace with `Converted` | Built. Email/Stripe flows are Drafts; Enrolled setter tested; Stripe untested (no test account) |
| 5 | Fix the 2 production unconverted leads at Enrolled (Mason Collins, Brandon Wicker) **before** step 4: decide to convert them or set them to Applicant/Nurture | Same | Built and tested; no-show report R3. DocuSign survey is a gap |
| 6 | Test: partial form → Applicant (no conversion); full form → Converted + Contact + Opp | Smoke test with a test lead | Built (alumni checkbox and date, R1 template). Recurring series copy is pending from Lance |

## 3. Stage detail and build items
**2 Consideration: communication series.** One series per (Lead Source × Status) combination. These combinations need defining (sources come from the LeadSource picklist; confirm the list):
| Source \ Status | Nurture | Interested - Future (>3 mo) | Applicant (partial form) |
|---|---|---|---|
| TAPS | ? | ? | Partial-form series |
| Referral (Referred_By) | ? | ? | Partial-form series |
| Web / webinar | ? | ? | Partial-form series |
| Event (Event_Code__c) / Rep code | ? | ? | Partial-form series |
| Partner / other | ? | ? | Partial-form series |
- Rebuild Nurture_Email_Scheduler (Draft today) as F-series flows behind **F0 guarded send** (≤2 unsolicited contacts per 30 days, Do Not Contact, opt-out, bounce).
- The partial-form series is solicited (the person started an application). Confirm how it counts toward the VA cap.

**3 Enrollment**
| Step | Build |
|---|---|
| Form partial save | Restructure AK9I_Enrollment_Form: after screen 1 (name, email, phone, program), upsert the Lead (match by email), set Status = Applicant, Stage = 2, Application_Status = In Progress, and store a resume token. Each later screen saves its progress. Final submit converts. **Never store the SSN in a partial save**; collect it only on the final submit |
| One live site | Retire one of the two live enrollment form sites; keep one URL. Redirect the other |
| Conversion | Form auto-convert with convertedStatus = Converted. Rep path: an internal launch of the same flow (quick action on Lead) |
| Contact Status | Set `Applied`. **Decision:** rename "Application Received" to "Applied" (relabel; existing records move automatically; update Enrollment_Engagement_Strategy) or add "Applied" alongside it |
| Opportunity | Created at Applied (exists). Fix Student_Contact__c population |
| Enrollment Agreement (start) | Set Enrollment_Process__c = Enrollment Agreement on conversion. Email T: "Schedule your phone interview with Michelle Hartman (mhartman@ak9i.com)" with a scheduling link (Microsoft Bookings or a Salesforce scheduler; decide). The page captures optional Course, Course Start/End, K9__c (Single/Dual) and Odor_Discipline__c, written back to the Contact |
| Interview reminder | New field `Interview_Scheduled_Date__c`. Scheduled path at conversion +2 days: if blank, notify Michelle (email + task) |
| Phone Interview | Path key fields already exist. Michelle completes them and moves the step |
| Acceptance | Michelle sets Opp Stage = **Accepted** by hand → flow sends the Acceptance Letter (template) and runs the existing Stripe checkout ($100) and emails the link → Opp Stage = **Payment Link Sent**; Enrollment_Process = Acceptance Letter |
| Payment | **Paid**: verify what the Stripe package writes (stripeGC__StripeEvent). If nothing writes it, build a flow on the Stripe event / checkout-session status → Opp Paid + `Admin_Fee_Paid__c` = true |
| Documents | Screen Flow on the site page with File Upload ×3. New checkboxes + dates on Contact: `Doc_Diploma_Transcript_Received__c`, `Doc_JST_Received__c`, `Doc_COE_SOB_Received__c` (+ `_Date__c`); files linked to the Contact. Replaces/derives the existing `AK9I_Documents_Complete__c` (formula = all three). Enrollment_Process = Documents Received |
| Enrolled | Flow: all 3 docs AND fee paid → Contact Status__c = **Enrolled**, Opp Stage = **Enrolled** |

**4 Training & Experience**
- Graduation date: `Course_End_Date__c` computed from program length × Course_Start_Date__c (needs a program-length table: custom metadata or Product field).
- On Actual Start Date, a flow notifies Michelle.
- Michelle sets Status__c = **Active Student** (new value) → Stage 4.
- Report **R-NoShow**: Course_Start_Date__c < TODAY, Status__c ≠ Active Student / Withdrew / LOA.

**5 Loyalty**
- Scheduled path at Course_End_Date__c: if Status = Active Student → Status Graduated, Stage 5.
- Withdrew/LOA stops the move.
- Send the 30-day employment confirmation survey (needs a signature). Options:
| Option | Pros | Cons |
|---|---|---|
| DocuSign eSignature for Salesforce (managed app) | Keeps the current vendor; envelopes and status sync to the Contact | Another managed package; license cost |
| Salesforce native e-signature (Docusign-backed in Sales Cloud / Industries) | No separate app if licensed | Licensing unclear; confirm edition |
| Salesforce Screen Flow form + DocuSign envelope sent by flow | Answers land in fields; signature still legal | Two steps for the graduate; integration work |
- New fields: `Employment_Survey_Sent__c`, `Employment_Survey_Received__c` (date), `Employment_Survey_Signed__c`.

**6 Recurring**
- Survey received + Graduated + not alumni → Stage 6.
- Recurring-product series (scent kits, dog food). This series is marketing, so it needs consent (Consent_Marketing / AK9I_Consent_Status__c) and F0.

**7 Advocacy**
- Proposed field: `AK9I_Alumni_Registered__c` (checkbox) + `AK9I_Alumni_Registered_Date__c`. Alternatively, a Campaign "Alumni Program" with member status Registered.
- Flow: registered → Stage 7. Advocacy asks only with `AK9I_Advocacy_Consent__c`.

## 4. Fixes to existing automation
| Issue | Fix |
|---|---|
| Auto_Stage_Sync sets invalid "Closed Won" and updates `$Record.Opportunities` while looking up by ContactId | Rewrite: get Opps where Student_Contact__c = Contact (or a primary OpportunityContactRole) with the Enrollment record type. Map Enrolled → Enrolled, Withdrew → Closed Lost, LOA → no change, Graduated → no change (or Paid; decide) |
| Enrollment_Engagement_Strategy "7 days before class" keyed on CreatedDate | Key it on Course_Start_Date__c −7 days; fix the graduation-day decision (`Status__c = false`); retrigger for Applied |
| Auto_Fill_Opportunity_Student_Contact fires on Create only | Change to Update with "IsConverted changed to true" |
| Two enrollment form sites live | Keep one; deactivate or redirect the other (production) |
| Mason Collins, Brandon Wicker unconverted at Enrolled (prod) | Review with Michelle; convert or reset before the value swap |
| Nurture_Email_Scheduler is a Draft | Replace with F-series behind F0; delete the obsolete Nurture_Backfill_Starter, Contact_Enrolled_Student and Contact_Application_Engagement_Email later |
| Opp path "Enrolled = showed up to class" vs Contact Enrolled = pre-start | Opp Enrolled = enrollment complete (docs + fee); attendance = Contact Active Student. Update the path guidance |
| AK9I_Enrollment_Form is Draft in cleanpipe | Sync the production version into cleanpipe before editing |

## 5. New metadata summary
| Type | Items |
|---|---|
| Lead Status | Converted (converted), Applicant (non-converted) |
| Contact Status__c | Applied (or a relabel), Active Student |
| Contact fields | Interview_Scheduled_Date__c, Admin_Fee_Paid__c, 3 doc checkboxes + dates, Employment_Survey_Sent/Received/Signed, AK9I_Alumni_Registered__c + date. Actual Start Date exists (cleanpipe) |
| Lead fields | Form_Resume_Token__c, Form_Last_Step__c |
| Picklist relabel | AK9I_Student_Stage__c → 1-7 labels |
| Flows | Stage setter (Lead + Contact), form partial save, Enrollment Agreement email + 2-day interview alert, Accepted → letter + Stripe, Stripe Paid sync, Docs upload (site screen flow), Enrolled setter, Start notify Michelle, Graduation scheduler, Survey send/receipt, Alumni → stage 7, Applicant partial-form series, Consideration series (F-series via F0), fixed Auto_Stage_Sync / Engagement / Auto_Fill, RT flow repoint |
| Templates (map to T01–T20) | Partial-form series (3?), Consideration series by source, Schedule interview, Michelle no-interview alert, Acceptance letter, Payment link, Docs request/reminder, Enrolled confirmation, Pre-start 30/7 days, Michelle start notice, Graduation, Employment survey, Recurring products, Alumni invite |
| Reports (R1–R5+) | Pipeline by stage; Enrollment funnel (Applied → Accepted → Paid → Enrolled); No-shows; Docs outstanding; Interview not scheduled >2 days; Opt-outs/bounces; 30-day unsolicited audit. **No per-recruiter enrollment counts** (README guardrail) |

## 6. Phased build order (cleanpipe only; production only with Jonathan's approval)
| Phase | Scope | Exit test | cleanpipe status (Oct 16) |
|---|---|---|---|
| 0 | Retrieve current production versions of the form and flows into cleanpipe; snapshot; baseline-test managed triggers | Test lead → convert works as in production | Done. Backups are in ref/r/backup-20261016; cleanpipe was used as it is (production versions not re-imported) |
| 1 | Lead Status swap (Converted / Applicant), RT flow repoint, Auto_Fill and Auto_Stage_Sync fixes | Conversion test passes; Opp gets Student_Contact | Done. Conversion test passed; Applicant set to non-converted |
| 2 | Stage field labels + stage-setter flows (1–3) | Stage set correctly on test records | Done. Tests passed |
| 3 | Form partial save + Applicant + one site | Abandon after screen 2 → Lead Applicant; resume works | Built in form v12 (**Draft**, not activated); not tested as guest |
| 4 | Enrollment steps: interview email/alert, Accepted → letter + Stripe, Paid sync, Docs upload, Enrolled setter | End-to-end test with Stripe test mode | Built. Email/Stripe flows are Drafts; Enrolled setter tested; Stripe untested (no test account) |
| 5 | Stage 4–5: Active Student, start notice, no-show report, graduation scheduler, survey | Time-shifted test dates | Built and tested; no-show report R3. DocuSign survey is a gap |
| 6 | Stage 6–7: recurring series, alumni field | — | Built (alumni checkbox and date, R1 template). Recurring series copy is pending from Lance |
| 7 | F0 + Consideration series + templates (wording approval) | F0 cap test | 16 inactive templates; F0 not built |
| 8 | Production promotion package + runbook | Jonathan's approval | Not started |

## 7. Hidden managed-package risk (DOZISF, Stripe stripeGC, Zoom ZVC, autoconvertlead)
- **Risk:** their triggers on Lead, Contact, Account and Opportunity may overwrite Status or Stage, convert leads, block DML or send email. We can't read their code.
- **Test approach:**
  1. In cleanpipe, before and after each change, run scripted test records (create Lead → partial → convert → Accept → Pay → Docs → Enrolled). Diff all fields with field history tracking on Status, Stage and Student Stage.
  2. Check debug logs for DOZISF/stripeGC entries.
  3. Use Stripe test mode only.
  4. Confirm what autoconvertlead does with Opps (duplicate Opp risk with Create_Enrollment_Opportunity).
  5. Ask the vendors (DOZISF publisher, Stripe connector) for field-write documentation.
- Before production, verify that the package versions in cleanpipe match production.

## 8. Changes to PR #23
- The converted value becomes **Converted**, not Applicant. Applicant becomes non-converted (partial form). Update the LeadStatus file, the RT flow (IsConverted), and the README "Converted Lead Status" section and promotion order.
- Replace the README line "Count enrollments on the Contact with AK9I_Actual_Start_Date__c" with: "Enrollments = Contact Status__c = Enrolled (docs + fee complete). Starts = Status__c = Active Student / Actual Start Date. Stage = AK9I_Student_Stage__c."
- Also apply the review fixes: API version alignment, outdated Phase 1b docs, Lead Status "Do Not Contact" → checkbox sync, a test-evidence summary.

## 9. Decisions (made Oct 16) and what is still open
Decided: the Opportunity Enrollment_Status__c is the master; Form v2 is the one form; Mason and Brandon are converted later in production; partial save after screen 1, with the SSN saved on submit; a tailored series per Lead Source × Status, with Lance writing the copy; Microsoft Bookings (placeholder URL for now); Michelle gets a task plus an email; the StageName ends at Enrolled; LOA stays open but flagged; Enrolled = 3 docs + $100 fee + funding confirmed; program weeks come from custom metadata; the survey is a Salesforce form plus DocuSign; alumni is a checkbox plus a date; recurring emails need consent and an unsubscribe; PR #23 gets reworked.

Still open (details in the build report):
1. Rename "Application Received" to "Applied" or keep both? (Both exist in cleanpipe now.)
2. Course 001: the form says 5 weeks but nothing else does. Retire it in production?
3. Graduation date rule: start + weeks × 7 lands on a Monday. Should it end on the Friday before (offset −3)?
4. Self-pay deposit amount (it's $0 for now).
5. Approve the wording of the 16 templates before any flow is activated.
6. The Bookings, document upload, survey and alumni URLs.
