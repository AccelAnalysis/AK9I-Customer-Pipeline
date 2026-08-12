# Privacy and Data Boundaries

GitHub is the operating/coordination layer, **not** the customer or student database.

## Allowed repository content

Requirements, pipeline definitions, schemas, work packets, process designs, aggregate metrics, de-identified evidence, decisions, risks, dependencies, playbooks, acceptance/integration findings, dashboard specifications, campaign/process artifacts, issue/change history.

## Prohibited unless explicitly sanitized and authorized

Student/customer names tied to pipeline history; personal phone/email; Social Security numbers; benefit documentation; financial or medical information; resumes with personal information; enrollment documents; private educational records; payment credentials; authentication secrets; or other sensitive records.

When a real record must be referenced, use a non-identifying identifier such as `AK9I-STU-XXXX`, state the authoritative business system (for example CRM/SIS), and keep repository evidence aggregate or redacted.

Do not paste raw exports into issues, PRs, evidence folders, or chat prompts. Treat public-repository visibility as an additional reason to minimize data.
