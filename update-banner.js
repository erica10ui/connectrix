// Direct script to remove banner from Firebase
// Run this with: node update-banner.js

const admin = require('firebase-admin');

// Initialize Firebase Admin (you'll need to add your service account key)
const serviceAccount = require('./backend/firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const userId = "jOIIqdjno8dXvzoBonCQ7qGZiUz1";

async function removeBanner() {
  try {
    console.log('🗑️ Removing banner for user:', userId);
    
    // Update the document to remove banner
    await db.collection('profiles').doc(userId).update({
      banner: null
    });
    
    console.log('✅ Banner removed successfully!');
    console.log('📝 Banner field set to null');
    console.log('💡 Profile will now use default banner');
    
  } catch (error) {
    console.error('❌ Error removing banner:', error);
  }
}

removeBanner(); 