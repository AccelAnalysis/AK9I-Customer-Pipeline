import fs from 'node:fs/promises';
import process from 'node:process';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const args = Object.fromEntries(process.argv.slice(2).map(x => {
  const [k, ...rest] = x.replace(/^--/, '').split('=');
  return [k, rest.join('=') || true];
}));
const projectId = String(args.project || process.env.GOOGLE_CLOUD_PROJECT || '').trim();
if (!projectId) throw new Error('Provide --project=YOUR_FIREBASE_PROJECT_ID or GOOGLE_CLOUD_PROJECT.');
const session = String(args.session || '').trim();
if (!session) throw new Error('Provide --session=YYYY-MM-DD-department.');
const currentOnly = args.all ? false : true;

initializeApp({ credential: applicationDefault(), projectId });
const db = getFirestore();
const snap = await db.collection('fieldResponses').where('sessionId', '==', session).get();
const rows = snap.docs
  .map(doc => ({ id: doc.id, ...doc.data(), createdAt: doc.data().createdAt?.toDate?.().toISOString?.() || null }))
  .filter(row => !currentOnly || row.current === true);
const outDir = new URL('./generated/', import.meta.url);
await fs.mkdir(outDir, { recursive: true });
const filename = new URL(`field-responses-${session}${currentOnly ? '-current' : '-all'}.json`, outDir);
await fs.writeFile(filename, JSON.stringify(rows, null, 2), { mode: 0o600 });
console.log(`Exported ${rows.length} response(s) to ${filename.pathname}. Treat this file as private; do not commit it.`);
