# AK9I Salesforce pipeline metadata

This folder is a Salesforce DX project for AK9I pipeline metadata. It is source only and does not connect to a Salesforce org. As of 2026-10-16 the 7-stage pipeline in this tree has been deployed to sandbox `cleanpipe` only (see "7-stage pipeline" below). Nothing here is in production. Do not add credentials, auth files, or consumer secrets here.

The starting source is the 2026-10-13 phase-1 package (fields, the Outreach Log, the `AK9I_Pipeline_Fields` permission set, and the lead-conversion merge inputs). Later phases have empty homes so new metadata lands in the standard source-format directories. A file in git is not evidence that the field, object, flow, or report exists in any org. Physical CRM implementation remains unverified until a sandbox deploy is retrieved and checked.

## Target

Sandbox first. The sandbox name and the CLI alias used for the 2026-10-16 build are both `cleanpipe` (older notes call it `ak9i-sandbox`). Source API version is 67.0 (`sfdx-project.json`); flows rewritten in this build are API 67. Log in with the Salesforce CLI against `https://test.salesforce.com`, then confirm the alias before any deploy:

```bash
sf org display --target-org ak9i-sandbox
sf data query --target-org ak9i-sandbox --query "SELECT IsSandbox FROM Organization"
```

The instance URL must be a sandbox URL, and `IsSandbox` must be true. Production promotion is a separate approval. Do not point these commands at production.

## Guardrails

VA 38 USC 3679(f) treats three or more unsolicited contacts in a month as persistent recruiting. AK9I's own cap is **at most 2 unsolicited contacts per person per rolling 30 days**, on every channel (email, text, and outbound calls). Flow F0 is the later enforcement point. It counts Outreach Log rows for the last 30 days where the touch was unsolicited, and it blocks a send that would exceed the cap.

No flow, report, or dashboard in this project may count enrollments per recruiter for pay or quotas. **No incentive pay tied to enrollment.** Reports describe stage and lane.

Wherever copy uses "GI Bill", include this notice: GI Bill® is a registered trademark of the U.S. Department of Veterans Affairs (VA). More information about education benefits offered by VA is available at the official U.S. government website at https://www.benefits.va.gov/gibill.

Commercial email also needs an unsubscribe mechanism and the postal address 4007 Burdette Rd, Carrsville, VA 23315.

## Where each phase lives

Run commands from this `salesforce/` directory.

| Phase | What it is | Home | In source now |
|---|---|---|---|
| Phase 1 fields | 10 Lead fields and 23 Contact fields (pipeline, consent, and Contact copies of Lead fields that are lost at conversion today) | `force-app/main/default/objects/Lead/fields/`, `force-app/main/default/objects/Contact/fields/`, `force-app/main/default/permissionsets/AK9I_Pipeline_Fields.permissionset-meta.xml` | Yes. Not deployed. |
| Phase 1 mapping | Lead-to-Contact field pairs merged onto the org's existing conversion mapping | `lead-convert-mappings.json`, `manifest/lead-convert.xml`, `scripts/merge_lead_convert.py`. The retrieved file belongs in `force-app/main/default/LeadConvertSettings/` and is not in git until it has been retrieved and merged. | Mapping inputs yes. `LeadConvertSettings` file no. |
| Phase 1b fields | Do Not Contact, Application Status, five UTM text fields, and Lead copies of Branch and VA education benefit type, plus their conversion pairs and a permission-set update | Same Lead and Contact `fields/` directories, then a repeat of the conversion merge | No. Not authored yet. |
| Outreach Log | Custom object `AK9I_Outreach_Log__c` (who was contacted, message type, template/version, sent at, stage at send, solicited flag, consent snapshot) | `force-app/main/default/objects/AK9I_Outreach_Log__c/` | Yes, from the phase-1 package. Not deployed. Required before F0. |
| Flows F0–F13 | F0 guarded send, then F1–F13 (inquiry, follow-up, reminders, application, countdown, stop, course start, out-brief, graduation, outcomes, contract handoff, renewal, payment) | `force-app/main/default/flows/` as `*.flow-meta.xml` | 7-stage flows (AK9I_*) plus reworked existing flows, deployed to cleanpipe. The F0–F13 set is not authored; the new email flows are Drafts. |
| Email templates T01–T20 | Lightning templates in a folder named AK9I Pipeline. They start as drafts. | `force-app/main/default/email/AK9I_Pipeline/` | 16 text templates (AK9I_P1 to AK9I_A1) plus the hidden folder, deployed to cleanpipe with available = false. Copy is a draft for Lance. |
| Reports | Pipeline by stage/lane, the 30-day unsolicited-contact audit, red list / docs / payment, outcomes, and opt-outs/bounces | `force-app/main/default/reports/AK9I_Pipeline/` | R1, R1b, R2–R5 deployed to cleanpipe. The 30-day contact audit and opt-out reports are not authored yet. |
| Layouts | Page layouts when a later change needs them | `force-app/main/default/layouts/` | No. Folder only. |

`config/` is reserved for local DX config. It must not hold credentials. `manifest/` holds package manifests used by retrieve and deploy. `scripts/` holds the conversion-mapping merge.

The custom object's `deploymentStatus` of `Deployed` is Salesforce metadata for "this object is not in-development." It does not mean this repository has deployed the object.

## Deploy steps

Every deploy is a dry run first. Repeat the same command without `--dry-run` only after the dry run succeeds. Retrieve metadata that already exists in the org before editing it. Commit after each verified sandbox step. These commands are for a person at a machine that is already authorized to `ak9i-sandbox`. Nothing in this repo runs them.

### 1. Phase 1 fields, Outreach Log, and permission set

Deploy named components only. Do not deploy the whole `force-app` folder.

```bash
sf project deploy start --metadata "CustomField:Lead.<Field>" --target-org ak9i-sandbox --dry-run
sf project deploy start --metadata "CustomField:Lead.<Field>" --target-org ak9i-sandbox
sf org assign permset --name AK9I_Pipeline_Fields --target-org ak9i-sandbox
```

Deploy fields before any conversion mapping. The permission set grants read/edit on the phase-1 fields and access to the Outreach Log.

### 2. Lead conversion mapping (retrieve, then merge, then deploy)

`LeadConvertSettings` replaces the **entire** lead-conversion field mapping when it is deployed. A file that was not retrieved from the target org first will wipe mappings already in the sandbox.

1. Confirm the phase-1 fields are in the sandbox.
2. If a later edit adds `Selected_Webinar_Date__c` to the mapping, check the field types first. The phase-1 package does not map that pair. Notes from 2026-10-13 and 2026-10-14 disagree on whether Lead is Date and Contact is Date/Time. If the types differ, leave the pair out or align the types before the merge. A type mismatch fails the `LeadConvertSettings` deploy.
3. Retrieve:

```bash
sf project retrieve start --manifest manifest/lead-convert.xml --target-org ak9i-sandbox
```

4. Back up the retrieved file outside the deploy path, and keep that backup uncommitted:

```bash
cp force-app/main/default/LeadConvertSettings/LeadConvertSettings.LeadConvertSetting-meta.xml LeadConvertSettings.sandbox-original.xml
```

5. Merge. The script keeps every existing mapping and adds only missing pairs from `lead-convert-mappings.json`. It also writes a `.before-merge` copy next to the retrieved file. Both backups are gitignored.

```bash
python3 scripts/merge_lead_convert.py force-app/main/default/LeadConvertSettings/LeadConvertSettings.LeadConvertSetting-meta.xml
```

6. Dry run, then deploy:

```bash
sf project deploy start --metadata LeadConvertSettings --target-org ak9i-sandbox --dry-run
sf project deploy start --metadata LeadConvertSettings --target-org ak9i-sandbox
```

7. Convert one sandbox test Lead that has consent, rep/event code, program interest, and webinar date filled. Confirm those values land on the Contact.

Phase 1b repeats this retrieve-backup-merge-dry-run-deploy sequence for its new pairs. Do not hand-author a `LeadConvertSettings` file from scratch.

### 3. Later metadata

Use the same dry-run-then-deploy pattern for phase 1b fields, flows, templates, and reports. Retrieve an existing flow, template, or picklist before changing it (`sf project retrieve start --metadata "Flow:<ApiName>" --target-org ak9i-sandbox`). Every email flow goes through F0. F0 is not in source yet.

## Not in this tree yet

Contract-lane Opportunity fields, queues, roles, the F0–F13 flow definitions, T01–T20 template bodies, and reports. Those wait for a later change in the homes above. Urgent org fixes (opt-outs, the enrollment form, Stripe triggers, record ownership) are sandbox or production operations, not files in this commit.

## Converted Lead Status: Converted (Applicant is not converted)

Updated 2026-10-16 in sandbox `cleanpipe`:
- **Converted** (API `Converted`) is the converted Lead Status. The enrollment form's autoconvert step already passes `Converted`.
- **Applicant** is now a normal, non-converted status. The form sets it after screen 1 (partial save), so a Lead in Applicant has started but not finished the form.
- Flow `RT_Conversion_to_Enrollment` (v4, API 67) now triggers on `IsConverted` = true instead of a status value. It still sets the Enrollment Contact record type only when the converted Account is named "S: Student".
- The Lead `Applicant` business process (ID 019Po00000BIJAjIAP) contains Converted, Nurture and Do Not Contact. Its name still says Applicant; renaming it is a Setup step.
- The Opportunity `Enrollment_Status__c` is the master student status: Applied, Accepted, Enrolled, Active Student, Graduated, Withdrawn, Cancelled, Declined. Contact `Status__c` follows it.

How to count: **Enrollments = Enrolled status; Starts = Active Student or Actual Start Date.** Never count with Lead Status.

Production order (production still has the old values):
1. Add `Converted` (converted) to Lead Status.
2. Update the Lead process to include Converted, Nurture and Do Not Contact.
3. Repoint the flow: deploy `RT_Conversion_to_Enrollment` v4.
4. Delete/replace: move converted `Enrolled`/`Applicant` leads to `Converted`, then set `Applicant` to non-converted.

## 7-stage pipeline (sandbox build 2026-10-16)

Student Stage labels are now 1-Awareness through 7-Advocacy. The API values did not change. Lead flows set stages 1-2; Contact and Opportunity flows set stages 3-7. Program lengths are in custom metadata `AK9I_Program_Length__mdt`, and fee/deposit settings are in `AK9I_Pipeline_Setting__mdt.Default`. Every new email flow is a **Draft** (inactive), and every new email template has `available` = false, until Jonathan approves the wording. The full component list, deploy IDs and open questions are in the build report kept outside this repo (`ak9i-cleanpipe-build-report.md`).
