// Script to fix user banner
import { db } from './src/firebase.js';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { getBannerForRole } from './src/utils/bannerUtils.js';

const userId = "jOIIqdjno8dXvzoBonCQ7qGZiUz1";

async function fixUserBanner() {
  try {
    console.log('Fixing banner for user:', userId);
    
    // Get current user profile
    const userDocRef = doc(db, 'profiles', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      console.error('User profile not found');
      return;
    }
    
    const userData = userDoc.data();
    console.log('Current user data:', userData);
    
    // Get appropriate banner based on role
    const newBanner = getBannerForRole(userData.role || 'alumni');
    
    // Update the profile with the new banner
    await updateDoc(userDocRef, {
      banner: newBanner
    });
    
    console.log('✅ Banner updated successfully!');
    console.log('New banner URL:', newBanner);
    console.log('User role:', userData.role);
    
  } catch (error) {
    console.error('❌ Error fixing banner:', error);
  }
}

// Run the fix
fixUserBanner(); 