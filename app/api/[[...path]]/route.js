import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import crypto from 'crypto';

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
  return token && token === makeToken();
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
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as PATCH, handler as DELETE };
