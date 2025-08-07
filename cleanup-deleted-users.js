const admin = require('firebase-admin');
const serviceAccount = require('./backend/firebase-service-account.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function cleanupDeletedUsers() {
  try {
    console.log('🔍 Starting cleanup of deleted users...');
    
    // Get all profiles
    const profilesSnapshot = await db.collection('profiles').get();
    const validUserIds = new Set();
    
    profilesSnapshot.docs.forEach(doc => {
      validUserIds.add(doc.id);
    });
    
    console.log(`✅ Found ${validUserIds.size} valid users`);
    
    // Clean up messages from deleted users
    const messagesSnapshot = await db.collection('messages').get();
    let deletedMessages = 0;
    
    for (const doc of messagesSnapshot.docs) {
      const data = doc.data();
      if (data.senderId && !validUserIds.has(data.senderId)) {
        await doc.ref.delete();
        deletedMessages++;
      }
    }
    console.log(`🗑️ Deleted ${deletedMessages} messages from deleted users`);
    
    // Clean up notifications from deleted users
    const notificationsSnapshot = await db.collection('notifications').get();
    let deletedNotifications = 0;
    
    for (const doc of notificationsSnapshot.docs) {
      const data = doc.data();
      if (data.userId && !validUserIds.has(data.userId)) {
        await doc.ref.delete();
        deletedNotifications++;
      }
    }
    console.log(`🗑️ Deleted ${deletedNotifications} notifications from deleted users`);
    
    // Clean up mentorship requests from deleted users
    const requestsSnapshot = await db.collection('mentorship_requests').get();
    let deletedRequests = 0;
    
    for (const doc of requestsSnapshot.docs) {
      const data = doc.data();
      if ((data.studentId && !validUserIds.has(data.studentId)) || 
          (data.mentorId && !validUserIds.has(data.mentorId))) {
        await doc.ref.delete();
        deletedRequests++;
      }
    }
    console.log(`🗑️ Deleted ${deletedRequests} mentorship requests from deleted users`);
    
    // Clean up ratings from deleted users
    const ratingsSnapshot = await db.collection('ratings').get();
    let deletedRatings = 0;
    
    for (const doc of ratingsSnapshot.docs) {
      const data = doc.data();
      if ((data.mentorId && !validUserIds.has(data.mentorId)) || 
          (data.studentId && !validUserIds.has(data.studentId))) {
        await doc.ref.delete();
        deletedRatings++;
      }
    }
    console.log(`🗑️ Deleted ${deletedRatings} ratings from deleted users`);
    
    console.log('✅ Cleanup completed successfully!');
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  } finally {
    process.exit(0);
  }
}

cleanupDeletedUsers(); 