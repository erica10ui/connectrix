// Simple script to remove banner from user profile
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, updateDoc } = require('firebase/firestore');

// Firebase config - you'll need to add your actual config
const firebaseConfig = {
  apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "connectrix-32033.firebaseapp.com",
  projectId: "connectrix-32033",
  storageBucket: "connectrix-32033.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const userId = "jOIIqdjno8dXvzoBonCQ7qGZiUz1";

async function removeBanner() {
  try {
    console.log('🗑️ Removing banner for user:', userId);
    
    const userDocRef = doc(db, 'profiles', userId);
    
    // Remove the banner field
    await updateDoc(userDocRef, {
      banner: null
    });
    
    console.log('✅ Banner removed successfully!');
    console.log('📝 Banner field set to null');
    
  } catch (error) {
    console.error('❌ Error removing banner:', error);
  }
}

removeBanner(); 