import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

// Force Node.js runtime (nodemailer requires Node APIs, not Edge)
export const runtime = 'nodejs';
// Never cache/statically optimize this route (needed on Hostinger)
export const dynamic = 'force-dynamic';

const uri = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME || 'akbs_poultry';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'akbs@2026';

let cachedClient = null;

async function getDb() {
  if (!uri) return null;
  if (cachedClient) return cachedClient.db(DB_NAME);
  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client.db(DB_NAME);
}

function makeToken() {
  const secret = process.env.ADMIN_PASSWORD || 'akbs@2026';
  return crypto.createHash('sha256').update(secret + '::akbs-admin').digest('hex');
}

function isAuthorized(request) {
  const auth = request.headers.get('authorization') || '';
  const token = auth.replace(/^Bearer\s+/i, '').trim();
  return !!(token && token === makeToken());
}

function readSmtpEnv() {
  // Support multiple aliases so it works with the user's Hostinger env naming.
  const host = process.env.SMTP_HOST;
  const portRaw = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD || process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || process.env.SMTP_FROM_EMAIL || user;
  const adminEmail = process.env.ADMIN_EMAIL || process.env.ADMIN_EMAILS;
  return { host, portRaw, user, password, from, adminEmail };
}

function smtpSettings() {
  const { host, portRaw, user, password, from, adminEmail } = readSmtpEnv();
  const required = { SMTP_HOST: host, SMTP_PORT: portRaw, SMTP_USER: user, SMTP_PASSWORD: password, SMTP_FROM: from, ADMIN_EMAIL: adminEmail };
  const missing = Object.entries(required).filter(([, value]) => !value).map(([key]) => key);
  if (missing.length) {
    throw new Error(`SMTP configuration is missing: ${missing.join(', ')}`);
  }

  const port = Number(portRaw);
  if (![465, 587, 25, 2525].includes(port)) {
    throw new Error(`SMTP_PORT must be 465, 587, 25 or 2525 (got ${portRaw})`);
  }

  return { host, port, user, password, from, adminEmail };
}

function buildTransporter(settings) {
  return nodemailer.createTransport({
    host: settings.host,
    port: settings.port,
    secure: settings.port === 465,
    requireTLS: settings.port === 587,
    auth: { user: settings.user, pass: settings.password },
    connectionTimeout: 20000,
    greetingTimeout: 20000,
    socketTimeout: 20000,
    tls: {
      // Hostinger's shared SMTP occasionally serves a cert whose CN doesn't match the alias
      // the user configured. Allow the hostname to differ while still using TLS.
      servername: settings.host,
      minVersion: 'TLSv1.2',
    },
  });
}

async function sendContactEmails({ name, email, phone, message }) {
  const settings = smtpSettings();
  const transporter = buildTransporter(settings);

  // Envelope-from MUST equal the authenticated user for most providers (incl. Hostinger).
  // Header From can be a display-name wrapped SMTP_FROM, but envelope must be user.
  const envelopeFrom = settings.user;
  const headerFrom = settings.from || settings.user;

  const adminMessage = {
    from: headerFrom,
    sender: settings.user,
    envelope: { from: envelopeFrom, to: [settings.adminEmail] },
    to: settings.adminEmail,
    replyTo: email || undefined,
    subject: `New contact form inquiry from ${name}`,
    text:
      `A new inquiry was submitted through the AKBS Poultry website.\n\n` +
      `Name: ${name}\n` +
      `Email: ${email || 'Not provided'}\n` +
      `Phone: ${phone || 'Not provided'}\n\n` +
      `Message:\n${message}\n`,
  };

  const customerMessage = email
    ? {
        from: headerFrom,
        sender: settings.user,
        envelope: { from: envelopeFrom, to: [email] },
        to: email,
        subject: 'We received your message | AKBS Poultry',
        text:
          `Dear ${name},\n\n` +
          `Thank you for contacting AKBS Poultry Farming Private Limited. ` +
          `We have received your message and our team will get back to you shortly.\n\n` +
          `Your message:\n${message}\n\n` +
          `Regards,\nAKBS Poultry Farming Private Limited`,
      }
    : null;

  // Send sequentially so a single failure produces a clean, attributable error in logs.
  const results = { admin: null, customer: null };
  try {
    const info = await transporter.sendMail(adminMessage);
    results.admin = { messageId: info.messageId, accepted: info.accepted, rejected: info.rejected };
  } catch (err) {
    console.error('[contact] admin email failed:', err && err.message, err && err.code);
    throw new Error(`admin email failed: ${err.message}`);
  }
  if (customerMessage) {
    try {
      const info = await transporter.sendMail(customerMessage);
      results.customer = { messageId: info.messageId, accepted: info.accepted, rejected: info.rejected };
    } catch (err) {
      console.error('[contact] customer email failed:', err && err.message, err && err.code);
      // Do not fail the whole request if customer email fails - admin was already notified.
      results.customer = { error: err.message };
    }
  }
  return results;
}

async function handler(request, { params }) {
  const resolved = (await params)?.path || [];
  const route = '/' + resolved.join('/');
  const method = request.method;

  try {
    if (route === '/' || route === '/health') {
      return NextResponse.json({ status: 'ok', service: 'AKBS Poultry API' });
    }

    /* ============ PUBLIC CONTACT ============ */
    if (route === '/contact' && method === 'POST') {
      const body = await request.json();
      const { name, email, phone, message } = body || {};
      if (!name || !message) {
        return NextResponse.json({ error: 'Name and message are required' }, { status: 400 });
      }
      const db = await getDb();
      if (!db) {
        return NextResponse.json({ error: 'Database not available' }, { status: 500 });
      }
      const doc = {
        id: crypto.randomUUID(),
        name: String(name).slice(0, 200),
        email: String(email || '').slice(0, 200),
        phone: String(phone || '').slice(0, 40),
        message: String(message).slice(0, 5000),
        status: 'new',
        note: '',
        createdAt: new Date().toISOString(),
      };
      await db.collection('inquiries').insertOne(doc);
      try {
        const result = await sendContactEmails(doc);
        console.log('[contact] emails dispatched', {
          inquiryId: doc.id,
          admin: result.admin && { messageId: result.admin.messageId, accepted: result.admin.accepted },
          customer: result.customer && { messageId: result.customer.messageId, accepted: result.customer.accepted, error: result.customer.error },
        });
      } catch (emailError) {
        console.error('[contact] email delivery failed for inquiry', doc.id, '-', emailError.message);
        return NextResponse.json(
          {
            success: true,
            saved: true,
            emailWarning: 'Your inquiry was saved. Our email confirmation could not be sent right now, but our team will contact you shortly.',
          },
          { status: 202 },
        );
      }
      return NextResponse.json({ success: true, message: 'Thank you! We will get back to you shortly.' });
    }

    /* ============ ADMIN LOGIN ============ */
    if (route === '/admin/login' && method === 'POST') {
      const body = await request.json();
      const pass = String(body?.password || '');
      if (pass !== ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
      }
      return NextResponse.json({ success: true, token: makeToken() });
    }

    if (route === '/admin/verify' && method === 'GET') {
      return NextResponse.json({ ok: isAuthorized(request) });
    }

    /* ============ ADMIN SMTP DIAGNOSTICS ============ */
    // Admin-only. Returns which SMTP env vars are present (values masked) and runs a live
    // transporter.verify() so the actual error surfaces on the Hostinger deployment.
    if (route === '/admin/smtp-diagnostics' && method === 'GET') {
      if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      const env = readSmtpEnv();
      const mask = (v) => (v ? `${String(v).slice(0, 2)}***${String(v).slice(-2)}` : null);
      const status = {
        env: {
          SMTP_HOST: env.host || null,
          SMTP_PORT: env.portRaw || null,
          SMTP_USER: env.user || null,
          SMTP_PASSWORD_present: !!env.password,
          SMTP_PASSWORD_masked: mask(env.password),
          SMTP_FROM: env.from || null,
          ADMIN_EMAIL: env.adminEmail || null,
        },
        verify: null,
        error: null,
      };
      try {
        const settings = smtpSettings();
        const transporter = buildTransporter(settings);
        const ok = await transporter.verify();
        status.verify = { ok, host: settings.host, port: settings.port, secure: settings.port === 465 };
      } catch (err) {
        status.error = { message: err.message, code: err.code || null };
      }
      return NextResponse.json(status);
    }

    /* ============ ADMIN SMTP TEST EMAIL ============ */
    // Admin-only. Sends a real test email to the admin + optional custom recipient
    // so the user can validate the fix end-to-end on the live Hostinger server.
    if (route === '/admin/smtp-test' && method === 'POST') {
      if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      const body = await request.json().catch(() => ({}));
      const to = String(body?.to || '').trim();
      try {
        const settings = smtpSettings();
        const transporter = buildTransporter(settings);
        const envelopeFrom = settings.user;
        const headerFrom = settings.from || settings.user;
        const recipient = to || settings.adminEmail;
        const info = await transporter.sendMail({
          from: headerFrom,
          sender: settings.user,
          envelope: { from: envelopeFrom, to: [recipient] },
          to: recipient,
          subject: 'AKBS Poultry - SMTP diagnostic test',
          text:
            `This is a diagnostic test email from the AKBS Poultry website.\n\n` +
            `If you received this, SMTP is working correctly on the deployed environment.\n\n` +
            `Timestamp: ${new Date().toISOString()}`,
        });
        return NextResponse.json({ success: true, messageId: info.messageId, accepted: info.accepted, rejected: info.rejected });
      } catch (err) {
        console.error('[smtp-test] failed:', err && err.message, err && err.code);
        return NextResponse.json({ success: false, error: err.message, code: err.code || null }, { status: 502 });
      }
    }

    /* ============ ADMIN INQUIRIES ============ */
    if (route === '/admin/inquiries' && method === 'GET') {
      if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      const db = await getDb();
      if (!db) return NextResponse.json({ inquiries: [], stats: { total: 0, new: 0, read: 0, replied: 0, archived: 0, thisWeek: 0 } });
      const list = await db.collection('inquiries').find({}).sort({ createdAt: -1 }).limit(500).toArray();
      const inquiries = list.map(({ _id, ...rest }) => rest);
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const stats = {
        total: inquiries.length,
        new: inquiries.filter((i) => i.status === 'new').length,
        read: inquiries.filter((i) => i.status === 'read').length,
        replied: inquiries.filter((i) => i.status === 'replied').length,
        archived: inquiries.filter((i) => i.status === 'archived').length,
        thisWeek: inquiries.filter((i) => i.createdAt >= oneWeekAgo).length,
      };
      return NextResponse.json({ inquiries, stats });
    }

    /* Match /admin/inquiries/:id  (PATCH or DELETE) */
    if (resolved[0] === 'admin' && resolved[1] === 'inquiries' && resolved[2]) {
      if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      const db = await getDb();
      if (!db) return NextResponse.json({ error: 'Database not available' }, { status: 500 });
      const id = resolved[2];
      if (method === 'PATCH') {
        const body = await request.json();
        const update = {};
        if (body.status) update.status = String(body.status);
        if (typeof body.note === 'string') update.note = body.note.slice(0, 2000);
        update.updatedAt = new Date().toISOString();
        const res = await db.collection('inquiries').updateOne({ id }, { $set: update });
        if (!res.matchedCount) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json({ success: true });
      }
      if (method === 'DELETE') {
        const res = await db.collection('inquiries').deleteOne({ id });
        if (!res.deletedCount) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json({ success: true });
      }
    }

    return NextResponse.json({ error: 'Not found', route, method }, { status: 404 });
  } catch (err) {
    console.error('[api] handler error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as PATCH, handler as DELETE };
