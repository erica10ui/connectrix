// Delete Events Script - Run this in browser console
console.log('🎯 Starting targeted deletion of July 7, 8, 9 events...');

// Function to delete specific events
async function deleteJuly789Events() {
  try {
    // Clear from localStorage
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      const events = JSON.parse(storedEvents);
      console.log('📋 Current events:', events);
      
      // Filter out July 7, 8, 9 events
      const filteredEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        const month = eventDate.getMonth(); // 6 for July (0-indexed)
        const day = eventDate.getDate();
        
        // Keep events that are NOT on July 7, 8, or 9
        const shouldKeep = !(month === 6 && (day === 7 || day === 8 || day === 9));
        
        if (!shouldKeep) {
          console.log('🗑️ Removing event:', event.title, 'on', event.date);
        }
        
        return shouldKeep;
      });
      
      console.log('✅ Filtered events:', filteredEvents);
      
      // Update localStorage
      localStorage.setItem('events', JSON.stringify(filteredEvents));
      console.log('💾 Updated localStorage');
      
      // Clear all localStorage keys that might contain events
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.toLowerCase().includes('event')) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
        console.log('🗑️ Removed localStorage key:', key);
      });
      
      // Force page reload
      console.log('🔄 Reloading page...');
      window.location.reload();
      
    } else {
      console.log('📭 No events found in localStorage');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Function to completely clear everything
function nuclearClear() {
  console.log('☢️ NUCLEAR CLEAR - Removing everything...');
  
  // Clear all localStorage
  localStorage.clear();
  console.log('🗑️ Cleared all localStorage');
  
  // Clear sessionStorage
  sessionStorage.clear();
  console.log('🗑️ Cleared all sessionStorage');
  
  // Clear any cached data
  if ('caches' in window) {
    caches.keys().then(names => {
      names.forEach(name => {
        caches.delete(name);
        console.log('🗑️ Deleted cache:', name);
      });
    });
  }
  
  // Force reload
  console.log('🔄 Force reloading...');
  window.location.reload();
}

// Function to disable Firebase temporarily
function disableFirebase() {
  console.log('🔌 Disabling Firebase...');
  
  // Clear events
  localStorage.removeItem('events');
  
  // Add a flag to prevent Firebase loading
  localStorage.setItem('firebase_disabled', 'true');
  
  // Force reload
  window.location.reload();
}

// Auto-run the deletion
console.log('🚀 Auto-running deletion...');
deleteJuly789Events();

// Also provide manual functions
console.log('📝 Manual functions available:');
console.log('- deleteJuly789Events() - Delete July 7,8,9 events');
console.log('- nuclearClear() - Clear everything');
console.log('- disableFirebase() - Disable Firebase'); 