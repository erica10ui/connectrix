const admin = require('firebase-admin');
const serviceAccount = require('./backend/firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const auth = admin.auth();

async function deleteUserComplete(userId) {
  try {
    console.log(`🗑️ Starting complete deletion for user: ${userId}`);
    
    // 1. Delete user from Firebase Auth
    try {
      await auth.deleteUser(userId);
      console.log('✅ User deleted from Firebase Auth');
    } catch (error) {
      console.log('⚠️ User not found in Auth or already deleted:', error.message);
    }
    
    // 2. Delete user profile
    try {
      await db.collection('profiles').doc(userId).delete();
      console.log('✅ User profile deleted');
    } catch (error) {
      console.log('⚠️ Profile not found or already deleted:', error.message);
    }
    
    // 3. Clean up messages (sent by user)
    const messagesRef = db.collection('messages');
    const sentMessagesQuery = messagesRef.where('senderId', '==', userId);
    const sentMessagesSnapshot = await sentMessagesQuery.get();
    const sentMessageDeletions = sentMessagesSnapshot.docs.map(doc => doc.ref.delete());
    await Promise.all(sentMessageDeletions);
    console.log(`✅ Deleted ${sentMessagesSnapshot.docs.length} messages sent by user`);
    
    // 4. Clean up messages (received by user)
    const receivedMessagesQuery = messagesRef.where('receiverId', '==', userId);
    const receivedMessagesSnapshot = await receivedMessagesQuery.get();
    const receivedMessageDeletions = receivedMessagesSnapshot.docs.map(doc => doc.ref.delete());
    await Promise.all(receivedMessageDeletions);
    console.log(`✅ Deleted ${receivedMessagesSnapshot.docs.length} messages received by user`);
    
    // 5. Clean up notifications
    const notificationsRef = db.collection('notifications');
    const notificationsQuery = notificationsRef.where('userId', '==', userId);
    const notificationsSnapshot = await notificationsQuery.get();
    const notificationDeletions = notificationsSnapshot.docs.map(doc => doc.ref.delete());
    await Promise.all(notificationDeletions);
    console.log(`✅ Deleted ${notificationsSnapshot.docs.length} notifications`);
    
    // 6. Clean up mentorship requests (as student)
    const requestsRef = db.collection('mentorship_requests');
    const studentRequestsQuery = requestsRef.where('studentId', '==', userId);
    const studentRequestsSnapshot = await studentRequestsQuery.get();
    const studentRequestDeletions = studentRequestsSnapshot.docs.map(doc => doc.ref.delete());
    await Promise.all(studentRequestDeletions);
    console.log(`✅ Deleted ${studentRequestsSnapshot.docs.length} mentorship requests as student`);
    
    // 7. Clean up mentorship requests (as mentor)
    const mentorRequestsQuery = requestsRef.where('mentorId', '==', userId);
    const mentorRequestsSnapshot = await mentorRequestsQuery.get();
    const mentorRequestDeletions = mentorRequestsSnapshot.docs.map(doc => doc.ref.delete());
    await Promise.all(mentorRequestDeletions);
    console.log(`✅ Deleted ${mentorRequestsSnapshot.docs.length} mentorship requests as mentor`);
    
    // 8. Clean up ratings (as mentor)
    const ratingsRef = db.collection('ratings');
    const mentorRatingsQuery = ratingsRef.where('mentorId', '==', userId);
    const mentorRatingsSnapshot = await mentorRatingsQuery.get();
    const mentorRatingDeletions = mentorRatingsSnapshot.docs.map(doc => doc.ref.delete());
    await Promise.all(mentorRatingDeletions);
    console.log(`✅ Deleted ${mentorRatingsSnapshot.docs.length} ratings as mentor`);
    
    // 9. Clean up ratings (as student)
    const studentRatingsQuery = ratingsRef.where('studentId', '==', userId);
    const studentRatingsSnapshot = await studentRatingsQuery.get();
    const studentRatingDeletions = studentRatingsSnapshot.docs.map(doc => doc.ref.delete());
    await Promise.all(studentRatingDeletions);
    console.log(`✅ Deleted ${studentRatingsSnapshot.docs.length} ratings as student`);
    
    // 10. Clean up events (if user created any)
    const eventsRef = db.collection('events');
    const eventsQuery = eventsRef.where('createdBy', '==', userId);
    const eventsSnapshot = await eventsQuery.get();
    const eventDeletions = eventsSnapshot.docs.map(doc => doc.ref.delete());
    await Promise.all(eventDeletions);
    console.log(`✅ Deleted ${eventsSnapshot.docs.length} events created by user`);
    
    // 11. Clean up activity logs
    const activityRef = db.collection('activity_logs');
    const activityQuery = activityRef.where('userId', '==', userId);
    const activitySnapshot = await activityQuery.get();
    const activityDeletions = activitySnapshot.docs.map(doc => doc.ref.delete());
    await Promise.all(activityDeletions);
    console.log(`✅ Deleted ${activitySnapshot.docs.length} activity logs`);
    
    // 12. Clean up any other user-related data
    const collections = ['resource_views', 'event_registrations', 'mentorship_sessions'];
    
    for (const collectionName of collections) {
      try {
        const collectionRef = db.collection(collectionName);
        const query = collectionRef.where('userId', '==', userId);
        const snapshot = await query.get();
        const deletions = snapshot.docs.map(doc => doc.ref.delete());
        await Promise.all(deletions);
        console.log(`✅ Deleted ${snapshot.docs.length} documents from ${collectionName}`);
      } catch (error) {
        console.log(`⚠️ Error cleaning ${collectionName}:`, error.message);
      }
    }
    
    console.log(`🎉 Complete user deletion finished for: ${userId}`);
    
  } catch (error) {
    console.error('❌ Error during user deletion:', error);
  }
}

// Function to delete user by email
async function deleteUserByEmail(email) {
  try {
    console.log(`🔍 Looking for user with email: ${email}`);
    
    // Find user by email
    const userRecord = await auth.getUserByEmail(email);
    console.log(`✅ Found user: ${userRecord.uid}`);
    
    // Delete the user
    await deleteUserComplete(userRecord.uid);
    
  } catch (error) {
    console.error('❌ Error finding/deleting user:', error.message);
  }
}

// Function to list all users and their data
async function listAllUsers() {
  try {
    console.log('📋 Listing all users and their data...');
    
    const listUsersResult = await auth.listUsers();
    const users = listUsersResult.users;
    
    console.log(`\n👥 Found ${users.length} users in Firebase Auth:`);
    
    for (const user of users) {
      console.log(`\n📧 Email: ${user.email}`);
      console.log(`🆔 UID: ${user.uid}`);
      console.log(`📅 Created: ${user.metadata.creationTime}`);
      
      // Check if profile exists
      try {
        const profileDoc = await db.collection('profiles').doc(user.uid).get();
        if (profileDoc.exists) {
          const profileData = profileDoc.data();
          console.log(`👤 Role: ${profileData.role}`);
          console.log(`📝 Name: ${profileData.fullName || 'N/A'}`);
        } else {
          console.log(`❌ No profile found in Firestore`);
        }
      } catch (error) {
        console.log(`⚠️ Error checking profile: ${error.message}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error listing users:', error);
  }
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('📖 Usage:');
  console.log('  node delete-user-complete.js <email>  - Delete user by email');
  console.log('  node delete-user-complete.js list      - List all users');
  console.log('  node delete-user-complete.js <uid>     - Delete user by UID');
} else if (args[0] === 'list') {
  listAllUsers();
} else {
  const identifier = args[0];
  
  // Check if it's an email or UID
  if (identifier.includes('@')) {
    // It's an email
    deleteUserByEmail(identifier);
  } else {
    // It's a UID
    deleteUserComplete(identifier);
  }
}

// Exit after completion
setTimeout(() => {
  process.exit(0);
}, 5000); 