const admin = require('firebase-admin');
const serviceAccount = require('./backend/firebase-service-account.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth();
const db = admin.firestore();

async function testFirebaseAuth() {
  console.log('🔍 Testing Firebase Authentication...\n');

  try {
    // 1. Test Admin SDK initialization
    console.log('✅ Firebase Admin SDK initialized successfully');
    console.log(`📁 Project ID: ${serviceAccount.project_id}`);
    console.log(`👤 Service Account: ${serviceAccount.client_email}\n`);

    // 2. List all users
    console.log('📋 Listing all users in Firebase Auth:');
    const listUsersResult = await auth.listUsers();
    const users = listUsersResult.users;
    
    console.log(`👥 Found ${users.length} users in Firebase Auth:\n`);
    
    for (const user of users) {
      console.log(`📧 Email: ${user.email}`);
      console.log(`🆔 UID: ${user.uid}`);
      console.log(`📅 Created: ${user.metadata.creationTime}`);
      console.log(`✅ Email Verified: ${user.emailVerified}`);
      console.log(`🚫 Disabled: ${user.disabled}`);
      
      // Check if user has password
      if (user.providerData.length > 0) {
        console.log(`🔐 Providers: ${user.providerData.map(p => p.providerId).join(', ')}`);
      }
      
      // Check if profile exists in Firestore
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
      
      console.log('---');
    }

    // 3. Test specific user authentication
    console.log('\n🔐 Testing specific user authentication...');
    
    // You can test with a specific email
    const testEmail = 'test@example.com'; // Change this to test a specific user
    
    try {
      const userRecord = await auth.getUserByEmail(testEmail);
      console.log(`✅ User found: ${userRecord.email}`);
      console.log(`🆔 UID: ${userRecord.uid}`);
      console.log(`✅ Email Verified: ${userRecord.emailVerified}`);
      console.log(`🚫 Disabled: ${userRecord.disabled}`);
      
      // Check if user can sign in (this would require the actual password)
      console.log('⚠️ Note: Cannot test password authentication from server-side');
      console.log('🔧 To test password auth, use the client-side login form');
      
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        console.log(`❌ User not found: ${testEmail}`);
      } else {
        console.log(`❌ Error getting user: ${error.message}`);
      }
    }

    // 4. Check Firestore profiles
    console.log('\n📊 Checking Firestore profiles...');
    const profilesSnapshot = await db.collection('profiles').get();
    console.log(`📋 Found ${profilesSnapshot.docs.length} profiles in Firestore:\n`);
    
    for (const doc of profilesSnapshot.docs) {
      const data = doc.data();
      console.log(`📧 Email: ${data.email}`);
      console.log(`🆔 UID: ${doc.id}`);
      console.log(`👤 Role: ${data.role}`);
      console.log(`📝 Name: ${data.fullName || 'N/A'}`);
      console.log(`🚫 Blocked: ${data.isBlocked || false}`);
      console.log('---');
    }

    // 5. Check for orphaned profiles (profiles without auth users)
    console.log('\n🔍 Checking for orphaned profiles...');
    const authUserIds = new Set(users.map(u => u.uid));
    let orphanedCount = 0;
    
    for (const doc of profilesSnapshot.docs) {
      if (!authUserIds.has(doc.id)) {
        console.log(`❌ Orphaned profile: ${doc.data().email} (UID: ${doc.id})`);
        orphanedCount++;
      }
    }
    
    if (orphanedCount === 0) {
      console.log('✅ No orphaned profiles found');
    } else {
      console.log(`⚠️ Found ${orphanedCount} orphaned profiles`);
    }

    // 6. Check for auth users without profiles
    console.log('\n🔍 Checking for auth users without profiles...');
    const profileUserIds = new Set(profilesSnapshot.docs.map(doc => doc.id));
    let missingProfileCount = 0;
    
    for (const user of users) {
      if (!profileUserIds.has(user.uid)) {
        console.log(`❌ Auth user without profile: ${user.email} (UID: ${user.uid})`);
        missingProfileCount++;
      }
    }
    
    if (missingProfileCount === 0) {
      console.log('✅ All auth users have profiles');
    } else {
      console.log(`⚠️ Found ${missingProfileCount} auth users without profiles`);
    }

  } catch (error) {
    console.error('❌ Error during Firebase Auth test:', error);
  }
}

// Test specific login scenarios
async function testLoginScenarios() {
  console.log('\n🧪 Testing Login Scenarios...\n');

  // Test with a known user (replace with actual test data)
  const testCases = [
    {
      email: 'student@example.com',
      password: 'password123',
      expectedRole: 'student'
    },
    {
      email: 'alumni@example.com', 
      password: 'password123',
      expectedRole: 'alumni'
    }
  ];

  for (const testCase of testCases) {
    console.log(`🔐 Testing login for: ${testCase.email}`);
    
    try {
      // Check if user exists in Auth
      const userRecord = await auth.getUserByEmail(testCase.email);
      console.log(`✅ User exists in Firebase Auth`);
      console.log(`🆔 UID: ${userRecord.uid}`);
      console.log(`✅ Email Verified: ${userRecord.emailVerified}`);
      console.log(`🚫 Disabled: ${userRecord.disabled}`);
      
      // Check if profile exists
      const profileDoc = await db.collection('profiles').doc(userRecord.uid).get();
      if (profileDoc.exists) {
        const profileData = profileDoc.data();
        console.log(`✅ Profile exists in Firestore`);
        console.log(`👤 Role: ${profileData.role}`);
        console.log(`🚫 Blocked: ${profileData.isBlocked || false}`);
        
        if (profileData.role === testCase.expectedRole) {
          console.log(`✅ Role matches expected: ${testCase.expectedRole}`);
        } else {
          console.log(`❌ Role mismatch. Expected: ${testCase.expectedRole}, Got: ${profileData.role}`);
        }
      } else {
        console.log(`❌ No profile found in Firestore`);
      }
      
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        console.log(`❌ User not found in Firebase Auth`);
      } else {
        console.log(`❌ Error: ${error.message}`);
      }
    }
    
    console.log('---');
  }
}

// Main execution
async function main() {
  await testFirebaseAuth();
  await testLoginScenarios();
  
  console.log('\n🎯 Troubleshooting Tips:');
  console.log('1. Check if users exist in Firebase Auth');
  console.log('2. Verify email verification status');
  console.log('3. Check if accounts are disabled');
  console.log('4. Verify profiles exist in Firestore');
  console.log('5. Check if users are blocked');
  console.log('6. Ensure correct role assignment');
  console.log('7. Test with different browsers/devices');
  console.log('8. Check Firebase Console for auth issues');
  
  process.exit(0);
}

main().catch(console.error); 