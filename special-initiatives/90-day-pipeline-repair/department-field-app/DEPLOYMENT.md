# AK9I Department Fieldwork — Deployment and Field-Day Runbook

This runbook keeps the public GitHub Pages site separate from private response storage.

## Architecture

```text
GitHub Pages static site
        ↓  X-Firebase-AppCheck + meeting-session token
Firebase HTTPS function
        ↓  Admin SDK
Private Cloud Firestore
```

The web client never receives Firestore read/write permission.

## 1. Create/select the Firebase project

Use an AK9I-controlled Firebase / Google Cloud project. Enable Firestore and Cloud Functions. Do not place service-account JSON or other administrative credentials in this repository.

Copy `firebase/.firebaserc.example` to a local `.firebaserc` and replace the project placeholder. Do not commit a credential file.

## 2. Deploy rules and the submission function

From `firebase/`:

```bash
cd functions
npm install
npm run check
cd ..
npx firebase-tools@latest deploy --only firestore:rules,functions
```

Record the deployed HTTPS URL for `submitFieldResponse`.

## 3. Configure Firebase App Check

Register the Pages web app in Firebase, configure **reCAPTCHA Enterprise** for the web app, and enable App Check enforcement for the backend resources used by this application. The custom HTTPS function also verifies the `X-Firebase-AppCheck` token with the Firebase Admin SDK.

The Pages client needs only public web configuration values. It does **not** need a Firebase Admin credential.

## 4. Configure GitHub repository variables

Create these GitHub Actions repository variables:

- `AK9I_FIELD_SUBMISSION_ENDPOINT`
- `AK9I_FIREBASE_API_KEY`
- `AK9I_FIREBASE_AUTH_DOMAIN`
- `AK9I_FIREBASE_PROJECT_ID`
- `AK9I_FIREBASE_APP_ID`
- `AK9I_APP_CHECK_SITE_KEY`

The Pages workflow refuses to build if any required runtime value is blank. The workflow materializes these values only into the public static site artifact. Do not add administrative credentials or meeting-session tokens as Pages variables.

## 5. Enable GitHub Pages

In repository **Settings → Pages**, set the build/deployment source to **GitHub Actions**. After this is enabled, pushes to `main` that change the field app or its Pages workflow can publish the site; `workflow_dispatch` also supports a manual deployment.

## 6. Create Tuesday meeting sessions and QR codes

The session tool uses Firebase Admin through **application-default credentials**. From `firebase/tools/`:

```bash
npm install
mkdir -p generated
node create-meeting-sessions.mjs \
  --project=YOUR_FIREBASE_PROJECT_ID \
  --date=2026-08-18 \
  --base=https://accelanalysis.github.io/AK9I-Customer-Pipeline/
```

The command creates four Firestore `meetingSessions` documents. Firestore receives only a SHA-256 hash of each random session token. The clear tokens exist only in the local generated links.

Private output:

- `generated/session-links-2026-08-18.json`
- four participant pulse QR SVG files

`generated/` is gitignored. **Do not commit, paste into an issue, or publish the generated link file.** Share each QR code/link only with the corresponding meeting participants. Use the `summaryUrl` for the facilitator.

## 7. Field-day smoke check

Before distributing the first QR code:

1. open each department Pulse link on a phone;
2. verify the department is preselected and locked;
3. confirm the review screen shows the correct email, department, and session;
4. submit one synthetic test response containing no real PII beyond a test email;
5. confirm a server-generated confirmation number is returned;
6. submit a revision from the same email/session/department and verify the revision number increases;
7. confirm Firestore client reads/writes are denied;
8. test loss of connectivity during submit and verify the device shows a pending local response, then reconnect and retry;
9. delete or clearly label the synthetic test response in the private administrative process.

## 8. Private response export

From `firebase/tools/`, with authorized application-default credentials:

```bash
node export-responses.mjs --project=YOUR_FIREBASE_PROJECT_ID --session=2026-08-18-kennels
```

Exports go to `generated/`, which is ignored by Git. Keep exports in an authorized private location, not in the public repository.

## 9. Close the sessions

After Tuesday fieldwork, set `active: false` on the four `meetingSessions` documents or allow the configured closing time to expire. Do not reuse Tuesday's session tokens for future meetings; generate new sessions.

## Deployment boundary

The code can be reviewed and merged before the Firebase project is provisioned, but it is **not live field-ready** until all of the following are verified:

- Firebase function deployed;
- Firestore rules deployed;
- App Check configured and returning tokens from the Pages origin;
- GitHub Pages enabled and successfully deployed;
- four private meeting sessions generated;
- mobile smoke test completed with a synthetic submission.
