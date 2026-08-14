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

function sanitizeEnv(value) {
  // Hostinger's env panel sometimes persists shell-escaped values verbatim (e.g. "\#"),
  // wraps values in matching quotes, or leaves trailing whitespace/newlines. Clean them up
  // so a small config typo does not silently break SMTP auth.
  if (value === undefined || value === null) return value;
  let v = String(value).trim();
  // Strip a matching pair of surrounding quotes: "foo" or 'foo'
  if (v.length >= 2 && ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'")))) {
    v = v.slice(1, -1);
  }
  // Unescape shell-style backslash escapes for common special chars.
  // Hostinger's env panel stores "Akbs\#" literally, so nodemailer would send the
  // backslash to smtp.hostinger.com and get 535 EAUTH. This restores the intended value.
  // Only unescape a curated set of characters that users commonly try to escape in .env
  // files - never blindly unescape everything.
  v = v.replace(/\\([#$@!%&*()\[\]{}<>|;:,./?"'`\\])/g, '$1');
  return v;
}

function readSmtpEnv() {
  // Support multiple aliases so it works with the user's Hostinger env naming.
  const host = sanitizeEnv(process.env.SMTP_HOST);
  const portRaw = sanitizeEnv(process.env.SMTP_PORT);
  const user = sanitizeEnv(process.env.SMTP_USER);
  const password = sanitizeEnv(process.env.SMTP_PASSWORD || process.env.SMTP_PASS);
  const from = sanitizeEnv(process.env.SMTP_FROM || process.env.SMTP_FROM_EMAIL) || user;
  const adminEmail = sanitizeEnv(process.env.ADMIN_EMAIL || process.env.ADMIN_EMAILS);
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

// ---------- HTML EMAIL TEMPLATES ----------
// AKBS Brand palette (matches website tailwind.config.js)
const BRAND = {
  green: '#0D4D2C',
  dark: '#07311D',
  gold: '#C89B3C',
  bg: '#F8F5EE',
  ink: '#1F2937',
  white: '#FFFFFF',
  whatsapp: '#25D366',
  greenLight: '#E6F0EA',
};
const BRAND_PHONE = '+91 9893345906';
const BRAND_PHONE_TEL = '+919893345906';
const BRAND_WHATSAPP = '919893345906';
const BRAND_WEBSITE = 'https://akbspoultry.com';
const BRAND_ADDRESS = 'Vill. Jam, Kundali Bamhori, Tehsil Silwani, Dist. Raisen (M.P.) - 464226';
const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/akbspoultryfarming',
  instagram: 'https://www.instagram.com/akbspoultryfarming',
  whatsapp: `https://wa.me/${BRAND_WHATSAPP}`,
};

function escapeHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatISTDateTime(date = new Date()) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric', month: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit', second: '2-digit',
    hour12: true, timeZone: 'Asia/Kolkata',
  }).format(date) + ' IST';
}

function renderAdminEmailHtml({ name, email, phone, message, ip, userAgent }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email || 'not provided');
  const safePhone = escapeHtml(phone || 'not provided');
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');
  const safeIp = escapeHtml(ip || 'unknown');
  const safeUa = escapeHtml((userAgent || 'unknown').slice(0, 120));
  const timestamp = escapeHtml(formatISTDateTime());
  const phoneDigits = String(phone || '').replace(/[^\d+]/g, '');
  const waPhone = phoneDigits.replace(/^\+/, '');
  const hasPhone = phoneDigits.length >= 6;
  const adminDashUrl = `${BRAND_WEBSITE}/admin`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New Website Lead</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.bg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:${BRAND.ink};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;background:${BRAND.white};border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
  <!-- HEADER -->
  <tr><td bgcolor="${BRAND.green}" style="background:${BRAND.green};background:linear-gradient(135deg,${BRAND.green} 0%,${BRAND.dark} 100%);padding:28px 32px;color:${BRAND.white};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td>
          <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:${BRAND.gold};text-transform:uppercase;margin-bottom:6px;">🔔 New Website Lead</div>
          <div style="font-size:22px;font-weight:800;color:${BRAND.white};line-height:1.2;">AKBS Poultry Farming</div>
          <div style="font-size:12px;color:#E7EFEA;margin-top:2px;">Contact form inquiry received</div>
        </td>
        <td align="right" valign="top">
          <div style="width:48px;height:48px;border-radius:50%;background:${BRAND.gold};display:inline-block;text-align:center;line-height:48px;font-size:22px;font-weight:900;color:${BRAND.dark};">A</div>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- LEAD DETAILS -->
  <tr><td style="padding:28px 32px 8px 32px;">
    <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:${BRAND.green};text-transform:uppercase;margin-bottom:14px;">Lead Details</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
      <tr><td style="padding:10px 0;border-bottom:1px solid #EEE;color:#666;width:130px;font-weight:600;">Name</td><td style="padding:10px 0;border-bottom:1px solid #EEE;color:${BRAND.ink};font-weight:600;">${safeName}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #EEE;color:#666;font-weight:600;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #EEE;color:${BRAND.ink};">
        ${hasPhone ? `<a href="tel:${phoneDigits}" style="color:${BRAND.green};text-decoration:none;font-weight:700;">${safePhone}</a> &nbsp; <a href="https://wa.me/${waPhone}" style="display:inline-block;padding:4px 10px;background:${BRAND.whatsapp};color:${BRAND.white};text-decoration:none;border-radius:12px;font-size:11px;font-weight:700;">WhatsApp</a>` : safePhone}
      </td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #EEE;color:#666;font-weight:600;">Email</td><td style="padding:10px 0;border-bottom:1px solid #EEE;color:${BRAND.ink};">
        ${email ? `<a href="mailto:${safeEmail}" style="color:${BRAND.green};text-decoration:none;font-weight:600;">${safeEmail}</a>` : `<span style="color:#999;font-style:italic;">not provided</span>`}
      </td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #EEE;color:#666;font-weight:600;">Date &amp; Time</td><td style="padding:10px 0;border-bottom:1px solid #EEE;color:${BRAND.ink};">${timestamp}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #EEE;color:#666;font-weight:600;">IP Address</td><td style="padding:10px 0;border-bottom:1px solid #EEE;color:${BRAND.ink};font-family:monospace;font-size:13px;">${safeIp}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #EEE;color:#666;font-weight:600;">Browser</td><td style="padding:10px 0;border-bottom:1px solid #EEE;color:${BRAND.ink};font-size:12px;">${safeUa}</td></tr>
      <tr><td style="padding:10px 0;color:#666;font-weight:600;">Source</td><td style="padding:10px 0;color:${BRAND.ink};">Website Contact Form</td></tr>
    </table>
  </td></tr>

  <!-- MESSAGE BLOCK -->
  <tr><td style="padding:16px 32px 8px 32px;">
    <div style="background:${BRAND.greenLight};border-left:4px solid ${BRAND.green};padding:18px 20px;border-radius:8px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:${BRAND.green};text-transform:uppercase;margin-bottom:8px;">Message from Lead</div>
      <div style="font-size:15px;color:${BRAND.ink};line-height:1.6;">${safeMessage}</div>
    </div>
  </td></tr>

  <!-- ACTION BUTTONS -->
  <tr><td style="padding:24px 32px 8px 32px;" align="center">
    <table role="presentation" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:0 6px 10px 0;"><a href="${adminDashUrl}" style="display:inline-block;padding:12px 22px;background:${BRAND.dark};color:${BRAND.white};text-decoration:none;border-radius:24px;font-size:13px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;">Open Admin Dashboard</a></td>
        ${hasPhone ? `<td style="padding:0 6px 10px 0;"><a href="tel:${phoneDigits}" style="display:inline-block;padding:12px 22px;background:${BRAND.green};color:${BRAND.white};text-decoration:none;border-radius:24px;font-size:13px;font-weight:700;">📞 Call Lead</a></td>` : ''}
        ${hasPhone ? `<td style="padding:0 0 10px 0;"><a href="https://wa.me/${waPhone}" style="display:inline-block;padding:12px 22px;background:${BRAND.whatsapp};color:${BRAND.white};text-decoration:none;border-radius:24px;font-size:13px;font-weight:700;">💬 WhatsApp</a></td>` : ''}
      </tr>
    </table>
  </td></tr>

  <!-- ASSISTANCE -->
  <tr><td style="padding:8px 32px 24px 32px;">
    <div style="background:#FFF8E7;border:1px solid #EBD9AE;border-radius:12px;padding:18px 20px;text-align:center;">
      <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:${BRAND.gold};text-transform:uppercase;margin-bottom:8px;">Need Immediate Assistance?</div>
      <div style="font-size:14px;color:${BRAND.ink};">
        <a href="tel:${BRAND_PHONE_TEL}" style="color:${BRAND.green};text-decoration:none;font-weight:700;">📞 ${BRAND_PHONE}</a> &nbsp;|&nbsp;
        <a href="https://wa.me/${BRAND_WHATSAPP}" style="color:${BRAND.whatsapp};text-decoration:none;font-weight:700;">💬 WhatsApp</a> &nbsp;|&nbsp;
        <a href="${BRAND_WEBSITE}" style="color:${BRAND.green};text-decoration:none;font-weight:700;">🌐 akbspoultry.com</a>
      </div>
    </div>
  </td></tr>

  <!-- FOLLOW US -->
  <tr><td style="padding:0 32px 24px 32px;text-align:center;">
    <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:#999;text-transform:uppercase;margin-bottom:12px;">Follow Us</div>
    <table role="presentation" cellpadding="0" cellspacing="0" align="center">
      <tr>
        <td style="padding:0 6px;"><a href="${SOCIAL_LINKS.facebook}" style="display:inline-block;width:36px;height:36px;background:#1877F2;color:#fff;border-radius:50%;text-decoration:none;text-align:center;line-height:36px;font-weight:700;font-size:16px;">f</a></td>
        <td style="padding:0 6px;"><a href="${SOCIAL_LINKS.whatsapp}" style="display:inline-block;width:36px;height:36px;background:${BRAND.whatsapp};color:#fff;border-radius:50%;text-decoration:none;text-align:center;line-height:36px;font-weight:700;font-size:16px;">W</a></td>
        <td style="padding:0 6px;"><a href="${SOCIAL_LINKS.instagram}" style="display:inline-block;width:36px;height:36px;background:#E4405F;color:#fff;border-radius:50%;text-decoration:none;text-align:center;line-height:36px;font-weight:700;font-size:16px;">◉</a></td>
      </tr>
    </table>
  </td></tr>

  <!-- FOOTER -->
  <tr><td bgcolor="${BRAND.dark}" style="background:${BRAND.dark};padding:24px 32px;text-align:center;color:${BRAND.white};">
    <div style="font-size:15px;font-weight:800;letter-spacing:1px;color:${BRAND.gold};margin-bottom:4px;">AKBS POULTRY FARMING PVT. LTD.</div>
    <div style="font-size:11px;color:#B8CFC0;margin-bottom:10px;">स्वस्थ मुर्गी • बेहतर अंडे • अधिक मुनाफा</div>
    <div style="font-size:11px;color:#9BB5A6;line-height:1.6;">${escapeHtml(BRAND_ADDRESS)}</div>
    <div style="font-size:10px;color:#7D9689;margin-top:12px;">© ${new Date().getFullYear()} AKBS Poultry Farming Private Limited. All Rights Reserved.</div>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function renderCustomerEmailHtml({ name, message }) {
  const safeName = escapeHtml(name);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>We received your message | AKBS Poultry</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.bg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:${BRAND.ink};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;background:${BRAND.white};border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
  <!-- HEADER -->
  <tr><td bgcolor="${BRAND.green}" style="background:${BRAND.green};background:linear-gradient(135deg,${BRAND.green} 0%,${BRAND.dark} 100%);padding:32px 32px;text-align:center;color:${BRAND.white};">
    <div style="width:64px;height:64px;border-radius:50%;background:${BRAND.gold};display:inline-block;text-align:center;line-height:64px;font-size:28px;font-weight:900;color:${BRAND.dark};margin-bottom:14px;">A</div>
    <div style="font-size:22px;font-weight:800;color:${BRAND.white};margin-bottom:4px;">AKBS Poultry Farming</div>
    <div style="font-size:12px;color:${BRAND.gold};letter-spacing:1.5px;font-weight:600;text-transform:uppercase;">Private Limited</div>
  </td></tr>

  <!-- GREETING -->
  <tr><td style="padding:32px 32px 8px 32px;">
    <div style="font-size:20px;font-weight:700;color:${BRAND.dark};margin-bottom:12px;">Namaste ${safeName} 👋</div>
    <p style="font-size:15px;color:${BRAND.ink};line-height:1.7;margin:0 0 14px 0;">
      Thank you for reaching out to <strong>AKBS Poultry Farming Private Limited</strong>. We've received your message and our team will get back to you shortly — usually within 24 hours on business days.
    </p>
    <p style="font-size:15px;color:${BRAND.ink};line-height:1.7;margin:0;">
      आपने हमसे संपर्क किया, इसके लिए धन्यवाद। हमारी टीम जल्द ही आपसे संपर्क करेगी।
    </p>
  </td></tr>

  <!-- MESSAGE ECHO -->
  <tr><td style="padding:20px 32px 8px 32px;">
    <div style="background:${BRAND.greenLight};border-left:4px solid ${BRAND.green};padding:18px 20px;border-radius:8px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:${BRAND.green};text-transform:uppercase;margin-bottom:8px;">Your Message</div>
      <div style="font-size:14px;color:${BRAND.ink};line-height:1.6;">${safeMessage}</div>
    </div>
  </td></tr>

  <!-- CTA -->
  <tr><td style="padding:24px 32px 8px 32px;" align="center">
    <a href="${BRAND_WEBSITE}" style="display:inline-block;padding:14px 28px;background:${BRAND.green};color:${BRAND.white};text-decoration:none;border-radius:24px;font-size:14px;font-weight:700;letter-spacing:0.5px;margin:0 4px 8px 4px;">🌐 Visit Our Website</a>
    <a href="https://wa.me/${BRAND_WHATSAPP}" style="display:inline-block;padding:14px 28px;background:${BRAND.whatsapp};color:${BRAND.white};text-decoration:none;border-radius:24px;font-size:14px;font-weight:700;margin:0 4px 8px 4px;">💬 Chat on WhatsApp</a>
  </td></tr>

  <!-- CONTACT INFO -->
  <tr><td style="padding:16px 32px 24px 32px;">
    <div style="background:#FFF8E7;border:1px solid #EBD9AE;border-radius:12px;padding:18px 20px;text-align:center;">
      <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:${BRAND.gold};text-transform:uppercase;margin-bottom:10px;">Direct Contact</div>
      <div style="font-size:14px;color:${BRAND.ink};line-height:1.8;">
        <a href="tel:${BRAND_PHONE_TEL}" style="color:${BRAND.green};text-decoration:none;font-weight:700;">📞 ${BRAND_PHONE}</a><br>
        <a href="mailto:info@akbspoultry.com" style="color:${BRAND.green};text-decoration:none;font-weight:700;">✉️ info@akbspoultry.com</a>
      </div>
    </div>
  </td></tr>

  <!-- FOLLOW US -->
  <tr><td style="padding:0 32px 24px 32px;text-align:center;">
    <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:#999;text-transform:uppercase;margin-bottom:12px;">Follow Us</div>
    <table role="presentation" cellpadding="0" cellspacing="0" align="center">
      <tr>
        <td style="padding:0 6px;"><a href="${SOCIAL_LINKS.facebook}" style="display:inline-block;width:36px;height:36px;background:#1877F2;color:#fff;border-radius:50%;text-decoration:none;text-align:center;line-height:36px;font-weight:700;font-size:16px;">f</a></td>
        <td style="padding:0 6px;"><a href="${SOCIAL_LINKS.whatsapp}" style="display:inline-block;width:36px;height:36px;background:${BRAND.whatsapp};color:#fff;border-radius:50%;text-decoration:none;text-align:center;line-height:36px;font-weight:700;font-size:16px;">W</a></td>
        <td style="padding:0 6px;"><a href="${SOCIAL_LINKS.instagram}" style="display:inline-block;width:36px;height:36px;background:#E4405F;color:#fff;border-radius:50%;text-decoration:none;text-align:center;line-height:36px;font-weight:700;font-size:16px;">◉</a></td>
      </tr>
    </table>
  </td></tr>

  <!-- FOOTER -->
  <tr><td bgcolor="${BRAND.dark}" style="background:${BRAND.dark};padding:24px 32px;text-align:center;color:${BRAND.white};">
    <div style="font-size:15px;font-weight:800;letter-spacing:1px;color:${BRAND.gold};margin-bottom:4px;">AKBS POULTRY FARMING PVT. LTD.</div>
    <div style="font-size:11px;color:#B8CFC0;margin-bottom:10px;">स्वस्थ मुर्गी • बेहतर अंडे • अधिक मुनाफा</div>
    <div style="font-size:11px;color:#9BB5A6;line-height:1.6;">${escapeHtml(BRAND_ADDRESS)}</div>
    <div style="font-size:10px;color:#7D9689;margin-top:12px;">© ${new Date().getFullYear()} AKBS Poultry Farming Private Limited. All Rights Reserved.</div>
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

async function sendContactEmails({ name, email, phone, message, ip, userAgent }) {
  const settings = smtpSettings();
  const transporter = buildTransporter(settings);

  // Envelope-from MUST equal the authenticated user for most providers (incl. Hostinger).
  // Header From can be a display-name wrapped SMTP_FROM, but envelope must be user.
  const envelopeFrom = settings.user;
  const headerFromName = 'AKBS Poultry Farming';
  const headerFrom = `"${headerFromName}" <${settings.from || settings.user}>`;

  const adminSubjectEmail = email ? email : 'No Email User';
  const adminSubjectPhone = phone ? phone : '';
  const adminSubject = `🔔 New Website Lead: ${name} (${adminSubjectPhone || adminSubjectEmail}) - info@akbspoultry.com`;

  const adminMessage = {
    from: headerFrom,
    sender: settings.user,
    envelope: { from: envelopeFrom, to: [settings.adminEmail] },
    to: settings.adminEmail,
    replyTo: email || undefined,
    subject: adminSubject,
    text:
      `NEW WEBSITE LEAD - AKBS Poultry\n\n` +
      `Name: ${name}\n` +
      `Phone: ${phone || 'not provided'}\n` +
      `Email: ${email || 'not provided'}\n` +
      `Date & Time: ${formatISTDateTime()}\n` +
      `IP Address: ${ip || 'unknown'}\n` +
      `Browser: ${(userAgent || 'unknown').slice(0, 120)}\n` +
      `Source: Website Contact Form\n\n` +
      `MESSAGE FROM LEAD:\n${message}\n\n` +
      `--\nAKBS Poultry Farming Private Limited\n${BRAND_ADDRESS}\n${BRAND_PHONE} | ${BRAND_WEBSITE}`,
    html: renderAdminEmailHtml({ name, email, phone, message, ip, userAgent }),
  };

  const customerMessage = email
    ? {
        from: headerFrom,
        sender: settings.user,
        envelope: { from: envelopeFrom, to: [email] },
        to: email,
        subject: 'We received your message | AKBS Poultry',
        text:
          `Namaste ${name},\n\n` +
          `Thank you for contacting AKBS Poultry Farming Private Limited. ` +
          `We have received your message and our team will get back to you shortly - usually within 24 hours on business days.\n\n` +
          `Your message:\n${message}\n\n` +
          `For immediate assistance:\n` +
          `Phone: ${BRAND_PHONE}\n` +
          `WhatsApp: https://wa.me/${BRAND_WHATSAPP}\n` +
          `Website: ${BRAND_WEBSITE}\n\n` +
          `Regards,\nAKBS Poultry Farming Private Limited\n${BRAND_ADDRESS}`,
        html: renderCustomerEmailHtml({ name, message }),
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
        const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown';
        const userAgent = request.headers.get('user-agent') || 'unknown';
        const result = await sendContactEmails({ ...doc, ip, userAgent });
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
      const pwFlags = env.password
        ? {
            length: env.password.length,
            has_backslash: env.password.includes('\\'),
            has_quote: /['"]/.test(env.password),
            has_leading_or_trailing_space: env.password !== env.password.trim(),
            raw_length: (process.env.SMTP_PASSWORD || process.env.SMTP_PASS || '').length,
          }
        : null;
      const status = {
        env: {
          SMTP_HOST: env.host || null,
          SMTP_PORT: env.portRaw || null,
          SMTP_USER: env.user || null,
          SMTP_PASSWORD_present: !!env.password,
          SMTP_PASSWORD_masked: mask(env.password),
          SMTP_PASSWORD_flags: pwFlags,
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
