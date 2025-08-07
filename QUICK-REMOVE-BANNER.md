# 🗑️ QUICK BANNER REMOVAL GUIDE

## Option 1: Firebase Console (EASIEST)

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/project/connectrix-32033

2. **Navigate to Firestore**
   - Click on "Firestore Database" in the left sidebar

3. **Find the User Document**
   - Go to `profiles` collection
   - Find document with ID: `jOIIqdjno8dXvzoBonCQ7qGZiUz1`

4. **Edit the Document**
   - Click on the document to open it
   - Find the `banner` field
   - **DELETE** the entire banner field or set it to `null`

5. **Save Changes**
   - Click "Update" to save

## Option 2: Use the HTML Tool

1. **Open the tool**
   - Double-click on `remove-banner-now.html`
   - It will open in your browser

2. **Click Remove**
   - Click the "YES, REMOVE BANNER" button

## Option 3: Run the Script

1. **Install dependencies** (if not already installed):
   ```bash
   npm install firebase-admin
   ```

2. **Run the script**:
   ```bash
   node update-banner.js
   ```

## Option 4: Manual App Edit

1. **Open Connectrix App**
2. **Go to Profile**
3. **Click "Edit Profile"**
4. **Click "Change Banner"**
5. **Remove the current banner**

## ✅ Expected Result

After removing the banner:
- Profile will use the default banner from code
- No custom banner will be displayed
- Clean profile layout
- No broken image placeholders

## 🚨 URGENT: Do This Now

**The fastest way is Firebase Console:**

1. Go to: https://console.firebase.google.com/project/connectrix-32033/firestore/data/profiles/jOIIqdjno8dXvzoBonCQ7qGZiUz1
2. Click "Edit" (pencil icon)
3. Delete the `banner` field completely
4. Click "Update"

**That's it! Banner will be removed immediately.** 