// firebase.js
// -------------------------
// IMPORTANT:
// Replace the firebaseConfig object below with your Firebase project configuration
// (apiKey, authDomain, projectId, etc.) from the Firebase console.
// Example:
// const firebaseConfig = {
//   apiKey: "API_KEY_HERE",
//   authDomain: "PROJECT.firebaseapp.com",
//   projectId: "PROJECT_ID",
//   ...
// };
// -------------------------

// If you don't paste config, the auth object will be null and functions will show helpful errors.

(function(){
  // ensure firebase global is available (we loaded compat SDK in the pages)
  if (typeof firebase === 'undefined') {
    console.error('Firebase SDK not found. Make sure firebase scripts are included in the page.');
    window.auth = null;
    return;
  }

  // TODO: REPLACE THE OBJECT BELOW WITH YOUR FIREBASE CONFIG:
  const firebaseConfig = {
    apiKey: "AIzaSyDzX85eUb28PDh53pK2p8hB5MkE5HUL4Lc",
    authDomain: "url-checker-3d49c.firebaseapp.com",
    projectId: "url-checker-3d49c",
    // optional fields:
    // storageBucket: "...",
    // messagingSenderId: "...",
    // appId: "..."
  };

  try {
    // initialize only once
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    window.auth = firebase.auth();
    console.info('Firebase initialized (firebase.js).');
  } catch (err) {
    console.error('Error initializing Firebase:', err);
    window.auth = null;
  }
})();
