/* js/firebase.js
   Paste your Firebase Web config below and this file will initialize firebase and expose window.auth.
   IMPORTANT: Replace the firebaseConfig object with your project's config (from Firebase Console -> Project Settings -> SDK).
*/

// ensure firebase loaded (compat)
(function () {
  if (typeof firebase === 'undefined') {
    console.error('Firebase SDK not found. Make sure the firebase scripts are included in the page.');
    window.auth = null;
    return;
  }

  // ========== REPLACE THIS CONFIG ==========
  const firebaseConfig = {
    apiKey: "AIzaSyDzX85eUb28PDh53pK2p8hB5MkE5HUL4Lc",
    authDomain: "url-checker-3d49c.firebaseapp.com",
    projectId: "url-checker-3d49c",
    // storageBucket: "...",
    // messagingSenderId: "...",
    // appId: "..."
  };
  // ==========================================

  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    window.auth = firebase.auth();
    console.info('Firebase initialized (firebase.js).');
  } catch (err) {
    console.error('Firebase init error:', err);
    window.auth = null;
  }
})();