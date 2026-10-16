# AK9I 7-stage pipeline: cleanpipe build report (Oct 16, 2026)
**Scope:** sandbox `cleanpipe` only (IsSandbox = true). Production and the alumni sandbox were not touched. Nothing was pushed to GitHub, and no email was sent: sandbox deliverability blocks single email anyway, and every new email flow is a Draft. Stripe was not called. Managed packages (DOZISF, stripeGC, ZVC, autoconvert) were not modified. The source is in `~/ak9i-cleanpipe/salesforce` on the Mac and in `cleanpipe-7stage.tar.gz`.

## 1. Deployed components (each one was dry-run first; targeted deploys only)
| # | Dry run | Real deploy | Contents |
|---|---|---|---|
| L1 | 0AfO300000jOngnKAC | 0AfO300000jOngoKAC | **Contact fields:** AK9I_Doc_Diploma_Transcript, Doc_JST, Doc_COE_SOB (each with a _Date), Employment_Survey_Sent/Received/Signed, Alumni_Registered and _Date, Interview_Scheduled_Date, Doc_Upload_Key, Employment_Status_30_Day, Employer_30_Day. **Opportunity fields:** AK9I_Funding_Confirmation, AK9I_Leave_Of_Absence, AK9I_Docs_Complete (formula). **Lead field:** AK9I_Form_Started_Date. **Contact Status__c values:** Applied, Accepted, Active Student. **Student Stage labels:** 1-Awareness … 7-Advocacy. **Custom metadata:** AK9I_Program_Length__mdt (C005 8, C006 12, C010 6, C011 8, C012 12, C013 12 weeks) and AK9I_Pipeline_Setting__mdt.Default (fee $100, deposit $0, end offset 0). **Labels:** 4 URL placeholder labels. **Lead Status:** + Converted (converted). **Processes:** the Lead Applicant process adds Converted, Nurture and DNC; the Opportunity Enrollment process adds Payment Link Sent and Paid. **Other:** permission set AK9I_Pipeline_Fields; API version 67 |
| L2 | 0AfO300000jOnk1KAC | 0AfO300000jOnorKAC | **New flows (active):** AK9I_Lead_Student_Stage, AK9I_Contact_Pipeline_Before_Save, AK9I_Opp_Enrollment_Before_Save (Enrolled setter + StageName), AK9I_Opp_Enrollment_Status_Sync, AK9I_Contact_Docs_Complete_Enroll, AK9I_Interview_Not_Scheduled_Task (+2 days, task for Michelle), AK9I_Start_Notify_Student_Services, AK9I_Loyalty_Graduation_Scheduler. **Reworked flows:** AK9I_Lead_Do_Not_Contact_Sync v2 (DNC status), Auto_Stage_Sync v2, Auto_Fill_Opportunity_Student_Contact v2, RT_Conversion_to_Enrollment v4 (IsConverted), Enrollment_Engagement_Strategy v5 (7-day email keyed on the start date; Applied/Active Student) |
| L3 | 0AfO300000jOnvJKAS | 0AfO300000jOkmAKAS | Contact record types Enrollment_Contact and Contact_Layout, with the new Status__c values |
| L4 | 0AfO300000jP0hFKAS | 0AfO300000jP0kTKAS | Enrollment_Engagement_Strategy v6: fault paths on all 6 email sends |
| L5 | 0AfO300000jP1ILKA0 | 0AfO300000jP1LZKA0 | **Auto_Stage_Sync fix:** LOA clears on return to Active Student. **Lead formula field:** AK9I_Source_Intro__c (intro per Lead Source). **Email:** hidden folder AK9I_Pipeline and 16 templates, all available = false. **Reports:** folder AK9I_Pipeline with R1 Stage (Contacts), R1b Stage (Leads), R2 Enrollment Funnel, R3 No-Shows, R4 Docs Outstanding, R5 Interview Not Scheduled |
| L6 | 0AfO300000jP1a5KAC | 0AfO300000jP1evKAC | **Draft (inactive) flows:** AK9I_Interview_Scheduling_Email, AK9I_Interview_Not_Scheduled_Email, AK9I_Start_Notice_Email, AK9I_Acceptance_Letter_and_Fee (Stripe test-mode checkout), AK9I_Enrolled_Confirmation_Email, AK9I_Employment_Survey_Send, AK9I_Partial_Form_Series. **Docs upload:** AK9I_Enrollment_Documents_Upload (active screen flow; not on any site yet). **Form:** AK9I_Enrollment_Form v12 (**Draft**; v10 stays active) |
| L7 | 0AfO300000jP2PhKAK | 0AfO300000jP2UXKA0 | Lead Status Applicant → **non-converted** (no converted Applicant leads existed; the active form converts with "Converted") |

**Form v12 changes from v11:**
- Stripe-at-submit removed (it moves to Acceptance).
- Partial save after screen 1: contact info and course go to a Lead with Status Applicant and AK9I_Form_Started_Date. The SSN is saved only on final submit.
- The lead lookup ignores converted leads.
- The Contact gets Status__c Applied and a valid Course__c (this fixes a restricted-picklist bug: the form was writing the Opportunity Program value).
- The Opportunity gets Enrollment_Status__c Applied and Student_Contact__c.

## 1b. Second build (Oct 16, ~7:30 AM ET): F0 and Consideration series
| # | Dry run | Real deploy | Contents |
|---|---|---|---|
| L8 | 0AfO300000jOzLPKA0 | 0AfO300000jP4w9KAC | AK9I_Pipeline_Setting__mdt fields Unsolicited_Cap_30_Day__c (=2) and Cap_Window_Days__c (=30) on the Default record; flow **AK9I_F0_Guarded_Send** (active subflow; sends nothing, only decides and logs) |
| L9 | 0AfO300000jP4zNKAS | 0AfO300000jP57RKAS | **AK9I_Consideration_Series** (new, Draft). F0 wired into the Draft flows Partial_Form_Series (day 1 now uses the source template), Interview_Scheduling_Email, Acceptance_Letter_and_Fee, Enrolled_Confirmation_Email and Employment_Survey_Send. **42 templates** AK9I_C_<NU/IF/AP>_<Source> (available = false) |

**What F0 blocks:**
- Do Not Contact.
- HasOptedOutOfEmail, or consent Opted Out.
- A bounced email: Contact IsEmailBounced, or Lead EmailBouncedDate set.
- No email address.
- A marketing send without AK9I_Consent_Status__c = Consent Confirmed.
- An unsolicited send when 2 or more "Allowed" unsolicited Outreach Log rows exist in the last 30 days. The README guardrail sets 2 per rolling 30 days, configurable in the metadata.

**How F0 decides:**
- Solicited/transactional sends skip the cap.
- Every decision is written to AK9I_Outreach_Log__c (Outcome "Allowed" or "Blocked: reason"), with the solicited flag, stage and consent snapshot.

**What is not gated:** the internal emails to Michelle (interview not scheduled, start notice) are staff notices, not outbound contacts, so they don't call F0.

**F0 test (11 cases, all as expected):**
- Allowed ×2, then the 3rd unsolicited send was blocked by the cap.
- A solicited send was allowed despite the cap.
- Marketing without consent: blocked.
- DNC, opted out, no email and no recipient: each blocked.
- Contact with Consent Confirmed, marketing send: allowed.
- Bounce couldn't be tested because the bounce fields can't be written. The bounce logic is a single field check.
- Test records and logs deleted. Backups for this build are in `backup-20261016/b8`.

## 1c. Third build (Oct 16, ~7:50 AM ET): F0 on the active emails, and all copy-doc emails activated (Jonathan approved by voice)
| # | Dry run | Real deploy | Contents |
|---|---|---|---|
| L10 | 0AfO300000jP6TJKA0 | 0AfO300000jP6Y9KAK | **F0** v1→v2 (runs in system mode so guest/webinar callers work). **Enrollment_Engagement_Strategy** v6→v7 (6 student sends gated, solicited). **Nurture_Email_Scheduler** v3→v5 (12 sends gated as marketing/unsolicited; rebuilt from active v3, and the old Draft v5 was overwritten; its JSON is in b9). **Webinar_Registration** v31→v32 (registrant confirmation gated; internal alert not gated). **Generate_Stripe_Payment_Link** v1→v2 (gated) |
| L11 | 0AfO300000jP2nuKAC | 0AfO300000jP6ptKAC | **58 templates** set available = true (copy unchanged). **8 flows activated:** AK9I_Consideration_Series, Partial_Form_Series, Interview_Scheduling_Email, Interview_Not_Scheduled_Email (staff), Start_Notice_Email (staff), Acceptance_Letter_and_Fee (moved to an async path because of the Stripe callout), Enrolled_Confirmation_Email, Employment_Survey_Send (all v1) |
| L12 | 0AfO300000jP6t7KAC | 0AfO300000jP6ujKAC | **Fault paths** on every send in those 8 flows, so a failed email can't roll back the record save. They're now version 2 |

**Blocked sends:** when F0 blocks a send, the flow skips it and continues. In Nurture, the "email sent" marker still advances.

**Tests** (test records deleted afterwards):

| Case | F0 decision (logged) |
|---|---|
| Interested-Future lead with consent | Allowed (AK9I_C_IF_Web) |
| Same lead, 2nd email | Allowed |
| Same lead, 3rd email | Blocked: 30-day cap |
| Lead without consent | Blocked: no marketing consent |
| DNC lead | Blocked: Do Not Contact |
| Student, Engagement email | Allowed |
| Opted-out student, Engagement email | Blocked: opted out |
| Applied Opportunity (E1 interview email) | Allowed |
| Accepted Opportunity (async acceptance flow) | Allowed |

**Deliverability:** cleanpipe has email delivery turned off ("The organization is not permitted to send email"). No email was sent and no EmailMessage records were created. Each send hit its fault path.

**Could not test or deliver:**
- **Nurture (status change):** a Nurture status change fails because the hardcoded campaign 701Po0000127zbP is missing. That's a pre-existing problem.
- **Scheduled paths:** P1–P3, I2/I3, Nurture tiers and the survey weren't time-tested.
- **Templates with no sending flow:** R1 recurring and A1 alumni (the templates are available, but nothing sends them).
- **Enrollment form email:** the internal application review email is a staff alert, so it isn't gated.
- **Placeholder links:** {BOOKINGS_URL}, {DOC_UPLOAD_URL}, {EMPLOYMENT_SURVEY_URL}, {ENROLLMENT_FORM_URL}, {COURSE_INFO_URL}, {ALUMNI_URL} and {BGK9_RELATIONSHIP_NOTE} are literal text, so those links are broken.
- **Stripe:** there's no test account, so the fee link step is skipped.
- **DocuSign:** not installed, so the survey sends only the email.

## 1d. Fourth build (Oct 16, ~8:15 AM ET): proofreading, Nurture spacing, call notification
| # | Dry run | Real deploy | Contents |
|---|---|---|---|
| L13 | 0AfO300000jP3iOKAS (the first attempt, 0AfO300000jP8QHKA0, failed on element order) | 0AfO300000jP8bZKAS | **Label:** AK9I_Enrollment_Inbox (= enrollment@ak9i.com). **Templates:** 11 existing templates with typo fixes; 2 AK9I_C_NU subjects. **Flows:** Generate_Stripe_Payment_Link v2→v3 (cancel URL adkk9i.edu → ak9i.edu); Nurture_Email_Scheduler v5→v6 (spacing); AK9I_Consideration_Series v2→v3 (call task + enrollment-inbox notification after Nurture 0) |
| Apex | rollback dry run | real update | HtmlValue fixes in K9_Sales and Sorry_we_missed_you (Lightning-builder templates the Metadata API didn't return). The originals are in b11/seven.json |

**Fixes:** 23 in total; the full before → after list is in `ak9i-email-copy.md` (Proofreading fixes).

**Spacing:** Nurture 0 on day 0, then Emails 1–12 at days 16, 32, 48, 64, 80, 96, 112, 130, 180, 200, 250 and 275. Sends are at least 16 days apart, so at most 2 fall in any 30 days.

**Call notification:** after F0 allows Nurture 0, the flow creates a task for the lead owner and emails the enrollment inbox (ungated). It runs even when the email isn't delivered.

**Address:** the request said enrollment@ak9i.edu, but the org has only one verified org-wide address, enrollment@ak9i.com, so .com is used.

**Open item:** staff must get consent on these calls, and the team needs training on that.

**Test (record deleted):** a Job Fair lead with consent, inserted as Nurture, was logged as AK9I_C_NU_Job_Fair Allowed. A High-priority task "Call Nurture lead - obtain email consent" was created for the owner, due the next day. Email 1 now contains "a few reasons" and the duplicated "recently" is gone. Delivery is still off, so no email was delivered. Nurture Start Date stayed blank, so Emails 1–12 would not be scheduled. It's probably set by the failing campaign flow; open question.

## 2. Tests (anonymous Apex in cleanpipe; all test records deleted afterwards)
**Leads:**
- New Lead → 1-Awareness; Interested, Nurture or Applicant → 2-Consideration.
- Status Do Not Contact → DNC checkbox and HasOptedOutOfEmail.
- Convert with "Converted" → RT flow and Auto_Fill set Student_Contact.

**Contact and Opportunity:**
- Under "S: Student" → Enrollment_Contact record type.
- Applied → Contact Applied / Enrollment, with the upload key set.
- Accepted + Stripe Paid → StageName Paid. Two docs stays Accepted; the third doc → Enrolled (Contact Enrolled / Documents Received).
- Start task for Michelle created. Active Student → 4-Training.
- LOA: the Opportunity stays open and flagged; back to Active Student clears the flag (re-tested after L5).
- Graduated → 5-Loyalty; survey received → 6-Recurring; alumni → 7-Advocacy.
- Withdrew → Withdrawn / Closed Lost.
- End date: 2026-11-02 + 8 weeks = 2026-12-28.

**Not tested:**
- Guest form submission.
- File upload as guest.
- Stripe checkout (no Stripe account record in cleanpipe).
- Any email send (deliverability blocks it).
- Scheduled paths (only their logic was tested, not the timing).

## 3. Inactive or guarded
- 7 Draft email flows.
- 16 templates with available = false. Copy is in `ak9i-email-copy.md`; existing template wording was kept and reused.
- Form v12 is a Draft.
- Placeholder URLs in custom labels and in template text ({BOOKINGS_URL}, {DOC_UPLOAD_URL}, {ENROLLMENT_FORM_URL}).
- Active flows that create tasks only, with no email: the interview-not-scheduled task and the start notice.
- Enrollment_Engagement_Strategy was already active and sends existing emails. It was changed but not newly enabled.

## 4. Backups
`~/ak9i-cleanpipe/ref/r/backup-20261016/` contains:
- The whole project as it was before the build (salesforce-project-before.tgz).
- Retrieves b1–b7: fields, picklists, sites, guest profile, flows, RTs, processes, permset.
- bk: form v10/v11 JSON and templates.
- LeadStatus.pre-applicant.xml.
- Plan before the build: `build/ak9i-7-stage-build-plan.pre-build.md` on the box.

## 5. Questions for Jonathan
1. Rename "Application Received" to "Applied", or keep both? Both exist now, and the flows accept both.
2. Course 001: the form says 5 weeks. It isn't used in cleanpipe. Is it used in production? Should it be retired?
3. Graduation date rule: should start + weeks × 7 land on the Monday (2026-12-28 in the test) or on the Friday before? Set AK9I_Pipeline_Setting__mdt offset to −3 for the Friday.
4. Self-pay deposit amount: is $0 correct?
5. Do you approve the wording of the 16 new templates (Lance's copy)? Where do the existing typos noted in the copy file get fixed?
6. What are the real URLs for Bookings, the docs upload page, the survey and alumni?
7. What caused the guest INSUFFICIENT_ACCESS error? Suspects: the managed autoconvert running as guest, the hardcoded owner 005Hs00000EQMxn, or the Course__c bug (now fixed in v12). Can you run a guest debug log to confirm?
8. Which business-process name should "Applicant" become (for example "Student Lead")?

9. F0 counts Outreach Log rows on the same record only. Should a Contact's cap also count the touches it got as a Lead before conversion?
10. F0 logs "Allowed" before the email is sent, so a failed send still counts toward the cap. Is that acceptable, or should failed sends be logged as failed?
11. Marketing consent = AK9I_Consent_Status__c "Consent Confirmed" only. Are there existing leads whose consent is recorded elsewhere (e.g. Consent_Informational__c)? If so, the Consideration series will skip them.
12. What is BGK9's relationship to AK9I? It's needed for the {BGK9_RELATIONSHIP_NOTE} placeholder.
13. Should texts and outbound calls also be logged to the Outreach Log so the cap covers every channel (README: all channels)? F0 only covers automated email now.

## 6. Setup clicks for Jonathan (metadata can't do these, or they are risky)
1. Add "Interested - Future" to the Lead Applicant process. A deploy fails on the ">" character in that value.
2. Rename the Lead process "Applicant".
3. Place AK9I_Enrollment_Documents_Upload on the Enrollment_Form_v2 site. Give the guest file-upload access (the "Allow guest users to upload files" setting) and access to the flow.
4. Run a guest debug log on the form, then activate form v12 after a test submit.
5. Turn on email deliverability ("All email") only when testing with your own address. Then test the Draft flows and activate the ones whose wording is approved.
6. Add a Stripe test-mode account record to cleanpipe so Acceptance and Fee can be tested.
7. Install DocuSign in cleanpipe (gap) for the employment survey.
8. Add field history on Status__c, Enrollment_Status__c and Student Stage to watch the managed packages.
9. Assign the AK9I_Pipeline_Fields permission set to the users.

## 7. Production-only steps (approval needed)
1. Map enrollmentform.ak9i.edu over HTTPS to Enrollment_Form_v2; redirect or retire Enrollment_Form.
2. Lead Status order: add Converted → update the process → deploy RT_Conversion_to_Enrollment v4 → delete/replace Enrolled/Applicant → set Applicant to non-converted.
3. Convert Mason Collins and Brandon Wicker after the swap.
4. Decide on course 001 (is it used in production?).
5. Fix the hardcoded Nurture campaign 701Po0000127zbP in Add_or_Remove_Lead_from_Nurture_Campaign. It exists in production but not in cleanpipe, so that flow fails here.
6. Deploy L1–L7 in the same order. Each one is a dry run first, then a real deploy.

## 8. Known gaps
- F0 covers automated email only; manual emails, texts and calls aren't logged.
- The existing Nurture Campaign Emails 1-12 and Enrollment_Engagement_Strategy (active, existing emails) don't call F0 yet. Rewiring the active Engagement flow changes live behavior, so it needs Jonathan's OK.
- The per Lead Source × Status series exists only as a structure (the Source intro formula plus the P/I/N0 templates); Lance's full copy is pending.
- There's no recurring-products (R1) or alumni send flow yet. When one is built, it must call F0 as a marketing send.
- Network/site metadata could not be retrieved (permissions).

## 1e. L14: Consideration series wording revision and org-wide sender (Oct 16, deployed ~9:35 AM ET)

- The 42 `AK9I_C_{NU,IF,AP}_*` templates were rewritten per the PR #24 review and kept available. Openers use soft-source or neutral wording with one acknowledgment; there is one next step per family; the new subjects are "Which AK9I course fits your goals?", "Let's plan around your training timeline" and "Questions about completing your AK9I application?". "First Monday" was replaced, the address now appears once, and the BGK9 sentence was removed (FLAG).
- Placeholders were removed from the other new templates P1, P2, P3, I3, E1, E3, E4, L1 and A1. In their place, those emails ask the reader to reply, call, or send documents to mhartman@ak9i.com. P1 and P3 no longer use "saved" in the subject, and the "first Monday" wording in I1 and N0 was replaced.
- Eight active AK9I flows now set senderType=OrgWideEmailAddress and senderAddress=enrollment@ak9i.com on all 16 emailSimple sends: Acceptance_Letter_and_Fee, Consideration_Series, Employment_Survey_Send, Enrolled_Confirmation_Email, Interview_Not_Scheduled_Email, Interview_Scheduling_Email, Partial_Form_Series and Start_Notice_Email. AK9I_Enrollment_Form (Draft v12) was left unchanged.
- Deploy (66 components: 58 templates + 8 flows): dry run 0AfO300000jPGfZKAW, real 0AfO300000jPGpFKAW, 0 errors. Jonathan approved. AK9I_Enrollment_Form was not deployed (the local file was restored from backup b13).
- Verified from a cleanpipe retrieve: 58 templates, all available=true; 0 editorial `{TOKEN}` placeholders and no `{` other than `{!` merge fields; no "first Monday", "saved" or "pick up where" left; the 42 C subjects are the 3 new ones (14 each); the Consideration and Partial Form flows carry enrollment@ak9i.com.
- Test: Nurture leads without consent (YouTube, Job Fair) → F0 logged "Blocked: No marketing consent" for AK9I_C_NU_YouTube and _Job_Fair. A Consent Confirmed lead (TAPS) → "Allowed" for AK9I_C_NU_TAPS, the lead saved (the send stops at the fault path because deliverability is off), and the call task was created. All test leads, logs and tasks were deleted.
