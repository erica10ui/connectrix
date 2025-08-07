const admin = require('firebase-admin');
const serviceAccount = require('./backend/firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function fixMessages() {
  console.log('🔧 Fixing orphaned messages...');
  
  try {
    // Get all valid user IDs
    const profiles = await db.collection('profiles').get();
    const validUsers = new Set();
    profiles.docs.forEach(doc => validUsers.add(doc.id));
    console.log(`✅ Found ${validUsers.size} valid users`);
    
    // Get all messages
    const messages = await db.collection('messages').get();
    console.log(`📨 Found ${messages.docs.length} messages`);
    
    let deleted = 0;
    let kept = 0;
    
    // Check each message
    for (const doc of messages.docs) {
      const data = doc.data();
      const senderId = data.senderId;
      
      if (senderId && !validUsers.has(senderId)) {
        // Delete message from deleted user
        await doc.ref.delete();
        deleted++;
        console.log(`🗑️ Deleted message from user: ${senderId}`);
      } else {
        kept++;
      }
    }
    
    console.log(`✅ Cleanup complete!`);
    console.log(`📊 Results:`);
    console.log(`   - Kept: ${kept} messages`);
    console.log(`   - Deleted: ${deleted} orphaned messages`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  
  process.exit(0);
}

fixMessages(); 