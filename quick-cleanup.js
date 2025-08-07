const admin = require('firebase-admin');
const serviceAccount = require('./backend/firebase-service-account.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function quickCleanup() {
  try {
    console.log('🚀 Starting quick cleanup...');
    
    // Get all valid user IDs from profiles
    const profilesSnapshot = await db.collection('profiles').get();
    const validUserIds = new Set();
    profilesSnapshot.docs.forEach(doc => validUserIds.add(doc.id));
    
    console.log(`✅ Found ${validUserIds.size} valid users`);
    
    // Clean up messages from deleted users
    const messagesSnapshot = await db.collection('messages').get();
    let deletedMessages = 0;
    
    for (const doc of messagesSnapshot.docs) {
      const data = doc.data();
      if (data.senderId && !validUserIds.has(data.senderId)) {
        await doc.ref.delete();
        deletedMessages++;
        console.log(`🗑️ Deleted message from user: ${data.senderId}`);
      }
    }
    
    console.log(`✅ Cleanup complete! Deleted ${deletedMessages} orphaned messages`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    process.exit(0);
  }
}

quickCleanup(); 