import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URL;
let cachedClient = null;

async function getDb() {
  if (!uri) return null;
  if (cachedClient) return cachedClient.db(process.env.DB_NAME || 'akbs');
  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client.db(process.env.DB_NAME || 'akbs');
}

async function handler(request, { params }) {
  const resolved = (await params)?.path || [];
  const route = '/' + resolved.join('/');
  const method = request.method;

  try {
    if (route === '/' || route === '/health') {
      return NextResponse.json({ status: 'ok', service: 'AKBS Poultry API' });
    }

    if (route === '/contact' && method === 'POST') {
      const body = await request.json();
      const { name, email, phone, message } = body || {};
      if (!name || !message) {
        return NextResponse.json({ error: 'Name and message are required' }, { status: 400 });
      }
      const db = await getDb();
      if (db) {
        await db.collection('contacts').insertOne({
          id: crypto.randomUUID(),
          name,
          email: email || '',
          phone: phone || '',
          message,
          createdAt: new Date().toISOString(),
        });
      }
      return NextResponse.json({ success: true, message: 'Thank you! We will get back to you shortly.' });
    }

    return NextResponse.json({ error: 'Not found', route }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
