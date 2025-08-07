// Script to remove user banner from Firestore
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';

// Firebase configuration (you'll need to add your config here)
const firebaseConfig = {
  // Add your Firebase config here
  // apiKey: "your-api-key",
  // authDomain: "connectrix-32033.firebaseapp.com",
  // projectId: "connectrix-32033",
  // storageBucket: "connectrix-32033.appspot.com",
  // messagingSenderId: "your-sender-id",
  // appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const userId = "jOIIqdjno8dXvzoBonCQ7qGZiUz1";

async function removeUserBanner() {
  try {
    console.log('🗑️ Removing banner for user:', userId);
    
    // Get current user profile
    const userDocRef = doc(db, 'profiles', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      console.error('❌ User profile not found');
      return;
    }
    
    const userData = userDoc.data();
    console.log('📋 Current user data:', {
      name: userData.fullName,
      email: userData.email,
      role: userData.role,
      currentBanner: userData.banner
    });
    
    // Remove the banner field
    await updateDoc(userDocRef, {
      banner: null // or "" for empty string
    });
    
    console.log('✅ Banner removed successfully!');
    console.log('📝 Banner field set to null');
    console.log('💡 Profile will now use default banner from code');
    
  } catch (error) {
    console.error('❌ Error removing banner:', error);
  }
}

// Alternative function to set empty string instead of null
async function setEmptyBanner() {
  try {
    console.log('🗑️ Setting empty banner for user:', userId);
    
    const userDocRef = doc(db, 'profiles', userId);
    
    await updateDoc(userDocRef, {
      banner: ""
    });
    
    console.log('✅ Banner set to empty string!');
    console.log('📝 Banner field set to ""');
    
  } catch (error) {
    console.error('❌ Error setting empty banner:', error);
  }
}

// Alternative function to set a custom banner
async function setCustomBanner(customBannerUrl) {
  try {
    console.log('🔄 Setting custom banner for user:', userId);
    
    const userDocRef = doc(db, 'profiles', userId);
    
    await updateDoc(userDocRef, {
      banner: customBannerUrl
    });
    
    console.log('✅ Custom banner set successfully!');
    console.log('📝 New banner URL:', customBannerUrl);
    
  } catch (error) {
    console.error('❌ Error setting custom banner:', error);
  }
}

// Run the banner removal
removeUserBanner();

// Uncomment to use other functions:
// setEmptyBanner();
// setCustomBanner("https://your-custom-banner-url.com/image.jpg"); 