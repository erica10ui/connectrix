# Remove User Banner Guide

## Current Status
The user's banner has been successfully updated to a reliable URL:
```
"banner": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80"
```

## Options to Remove/Update Banner

### Option 1: Remove Banner Completely
Set the banner field to `null` or empty string in Firestore:

**Via Firebase Console:**
1. Go to Firebase Console > Firestore
2. Navigate to `profiles` collection
3. Find document `jOIIqdjno8dXvzoBonCQ7qGZiUz1`
4. Edit the `banner` field and set it to `null` or `""`

**Via Code:**
```javascript
// Set to null
await updateDoc(doc(db, 'profiles', userId), {
  banner: null
});

// Or set to empty string
await updateDoc(doc(db, 'profiles', userId), {
  banner: ""
});
```

### Option 2: Use the Remove Tool
1. Open `remove-banner.html` in your browser
2. Click "Remove Banner" button
3. The banner will be set to null

### Option 3: Manual Profile Edit
1. Open Connectrix application
2. Navigate to user's profile
3. Click "Edit Profile"
4. Click "Change Banner"
5. Remove the current banner or upload a new one

## Expected Results

### If Banner is Removed (set to null/empty):
- ✅ Profile will use the default banner from code
- ✅ No custom banner will be displayed
- ✅ Fallback to default banner will work
- ✅ No broken image placeholders

### If Banner is Set to Empty String:
- ✅ Profile will show no banner image
- ✅ Clean profile layout without banner
- ✅ No image loading errors

## Database Update Commands

### Remove Banner (Set to null):
```javascript
// In Firebase Console or Admin SDK
{
  "banner": null
}
```

### Remove Banner (Set to empty string):
```javascript
// In Firebase Console or Admin SDK
{
  "banner": ""
}
```

### Set Custom Banner:
```javascript
// In Firebase Console or Admin SDK
{
  "banner": "https://your-custom-banner-url.com/image.jpg"
}
```

## Files Created for Banner Management

1. **`remove-banner.html`** - Interactive tool to remove/update banner
2. **`remove-banner.js`** - Node.js script for programmatic banner removal
3. **`remove-banner-guide.md`** - This guide

## Quick Actions

### Remove Banner Now:
1. Open Firebase Console
2. Go to Firestore Database
3. Navigate to: `profiles` > `jOIIqdjno8dXvzoBonCQ7qGZiUz1`
4. Edit the `banner` field
5. Set it to `null` or `""`
6. Save the document

### Test the Remove Tool:
```bash
# Open the remove banner tool
open remove-banner.html
```

The banner can be easily removed or updated using any of these methods. The profile will gracefully handle the absence of a banner by using the default banner from the code. 