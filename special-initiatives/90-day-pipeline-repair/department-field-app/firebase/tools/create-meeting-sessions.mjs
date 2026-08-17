import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import QRCode from 'qrcode';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

const departments = {
  kennels: 'Kennels',
  training: 'Training / Instruction',
  maintenance: 'Grounds & Maintenance',
  office: 'Office / Admissions / Student Services'
};
const args = Object.fromEntries(process.argv.slice(2).map(x => {
  const [k, ...rest] = x.replace(/^--/, '').split('=');
  return [k, rest.join('=') || true];
}));
const projectId = String(args.project || process.env.GOOGLE_CLOUD_PROJECT || '').trim();
if (!projectId) throw new Error('Provide --project=YOUR_FIREBASE_PROJECT_ID or GOOGLE_CLOUD_PROJECT.');
const date = String(args.date || '2026-08-18');
const baseUrl = String(args.base || 'https://accelanalysis.github.io/AK9I-Customer-Pipeline/').replace(/\/?$/, '/');
const opens = new Date(`${date}T06:00:00-04:00`);
const closes = new Date(`${date}T23:59:59-04:00`);

initializeApp({ credential: applicationDefault(), projectId });
const db = getFirestore();
const outDir = path.resolve('generated');
await fs.mkdir(outDir, { recursive: true });
const output = { createdAt: new Date().toISOString(), projectId, date, baseUrl, sessions: {} };

for (const [department, label] of Object.entries(departments)) {
  const sessionId = `${date}-${department}`;
  const token = crypto.randomBytes(32).toString('base64url');
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  await db.collection('meetingSessions').doc(sessionId).set({
    sessionId,
    department,
    label,
    active: true,
    formTypes: ['pulse', 'summary'],
    tokenHash,
    opensAt: Timestamp.fromDate(opens),
    closesAt: Timestamp.fromDate(closes),
    createdAt: Timestamp.now()
  });
  const pulse = new URL(baseUrl);
  pulse.searchParams.set('form', 'pulse');
  pulse.searchParams.set('department', department);
  pulse.searchParams.set('session', sessionId);
  pulse.searchParams.set('token', token);
  const summary = new URL(baseUrl);
  summary.searchParams.set('form', 'summary');
  summary.searchParams.set('department', department);
  summary.searchParams.set('session', sessionId);
  summary.searchParams.set('token', token);
  const qrFile = `${sessionId}-pulse.svg`;
  await fs.writeFile(path.join(outDir, qrFile), await QRCode.toString(pulse.toString(), { type: 'svg', errorCorrectionLevel: 'M', margin: 2, width: 640 }), 'utf8');
  output.sessions[department] = { label, sessionId, pulseUrl: pulse.toString(), summaryUrl: summary.toString(), qrFile };
}

await fs.writeFile(path.join(outDir, `session-links-${date}.json`), JSON.stringify(output, null, 2), { mode: 0o600 });
console.log(`Created ${Object.keys(departments).length} private meeting sessions.`);
console.log(`Links and participant QR SVGs are in ${outDir}. Do not commit the generated directory.`);
