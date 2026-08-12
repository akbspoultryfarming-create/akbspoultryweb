const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://akbspoultryfarming_db_user:akbspoultry2026@akbscluster.aysigf7.mongodb.net/akbs_poultry?retryWrites=true&w=majority&appName=AKBSCluster';
(async () => {
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 15000 });
  try {
    await client.connect();
    console.log('CONNECTED SUCCESSFULLY');
    const db = client.db('akbs_poultry');
    const testDoc = { test: 'hello', at: new Date().toISOString() };
    await db.collection('test_ping').insertOne(testDoc);
    console.log('WRITE TEST OK');
    await db.collection('test_ping').drop().catch(() => {});
    console.log('ALL GOOD - Connection works!');
  } catch (err) {
    console.log('ERROR:', err.message);
    if (err.message.includes('bad auth') || err.message.includes('Authentication failed')) {
      console.log('DIAGNOSIS: PASSWORD IS WRONG');
    }
    if (err.message.includes('ENOTFOUND') || err.message.includes('querySrv')) {
      console.log('DIAGNOSIS: CLUSTER URL / DNS issue');
    }
    if (err.message.includes('IP') || err.message.includes('whitelist') || err.message.includes('not allowed')) {
      console.log('DIAGNOSIS: IP ACCESS not enabled - add 0.0.0.0/0 in Network Access');
    }
  } finally {
    await client.close().catch(() => {});
    process.exit(0);
  }
})();
