import admin from 'firebase-admin';
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(readFileSync('./backend/firebase-service-account.json', 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function fastClean() {
  console.log('🚀 Fast cleanup starting...');
  
  try {
    // Get valid users
    const profiles = await db.collection('profiles').get();
    const validIds = new Set(profiles.docs.map(doc => doc.id));
    console.log(`✅ Valid users: ${validIds.size}`);
    
    // Clean messages
    const messages = await db.collection('messages').get();
    let deleted = 0;
    
    for (const doc of messages.docs) {
      const data = doc.data();
      if (data.senderId && !validIds.has(data.senderId)) {
        await doc.ref.delete();
        deleted++;
      }
    }
    
    console.log(`✅ Deleted ${deleted} orphaned messages`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  
  process.exit(0);
}

fastClean(); 