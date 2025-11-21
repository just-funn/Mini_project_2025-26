// auth.js
// All auth-related functions: signup, login, forgot password, logout, auth-guard
// This file depends on js/firebase.js which should set window.auth (firebase.auth())

/* Helper: show messages in form message element */
function showMsg(elId, msg, isError = true) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.textContent = msg;
  el.style.color = isError ? '#c0392b' : '#0a8f6e';
  setTimeout(() => { el.textContent = ''; }, 6000);
}

/* SIGNUP */
function signup(email, password, password2) {
  if (!window.auth) { showMsg('signupMsg', 'Firebase not initialized. Paste config in js/firebase.js'); return; }
  if (!email || !password) { showMsg('signupMsg', 'Please enter valid email and password'); return; }
  if (password.length < 6) { showMsg('signupMsg', 'Password must be at least 6 characters'); return; }
  if (password !== password2) { showMsg('signupMsg', 'Passwords do not match'); return; }

  window.auth.createUserWithEmailAndPassword(email, password)
    .then(cred => {
      // send email verification optionally
      if (cred.user && !cred.user.emailVerified) {
        cred.user.sendEmailVerification().catch(() => {});
      }
      showMsg('signupMsg', 'Account created! Redirecting...', false);
      setTimeout(() => { window.location.href = 'dashboard.html'; }, 1200);
    })
    .catch(err => {
      showMsg('signupMsg', err.message || 'Signup failed');
    });
}

/* LOGIN */
function login(email, password) {
  if (!window.auth) { showMsg('loginMsg', 'Firebase not initialized. Paste config in js/firebase.js'); return; }
  if (!email || !password) { showMsg('loginMsg', 'Please enter email and password'); return; }

  window.auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      showMsg('loginMsg', 'Logged in. Redirecting...', false);
      setTimeout(() => { window.location.href = 'dashboard.html'; }, 600);
    })
    .catch(err => {
      showMsg('loginMsg', err.message || 'Login failed');
    });
}

/* FORGOT PASSWORD */
function forgotPassword(email) {
  if (!window.auth) { showMsg('resetMsg', 'Firebase not initialized. Paste config in js/firebase.js'); return; }
  if (!email) { showMsg('resetMsg', 'Please enter your email'); return; }

  window.auth.sendPasswordResetEmail(email)
    .then(() => {
      showMsg('resetMsg', 'Reset link sent. Check your email.', false);
    })
    .catch(err => {
      showMsg('resetMsg', err.message || 'Could not send reset email');
    });
}

/* LOGOUT */
function logout() {
  if (!window.auth) { console.warn('Firebase not initialized'); return; }
  window.auth.signOut()
    .then(() => {
      window.location.href = 'login.html';
    })
    .catch(err => {
      alert('Logout failed: ' + (err.message || err));
    });
}

/* AUTH GUARD for dashboard.html (only allow logged users) */
(function attachAuthGuard() {
  // Only run after DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    // If no auth, don't attempt to guard (helps with dev)
    if (!window.auth) {
      console.warn('auth.js: Firebase auth not available');
      return;
    }

    // Common handler: update UI if dashboard contains user elements
    window.auth.onAuthStateChanged(user => {
      // If on dashboard page and no user -> redirect to login
      if (document.body && document.body.classList && document.querySelector('.dashboard')) {
        if (!user) {
          window.location.href = 'login.html';
          return;
        }
        // show user's email on dashboard
        const ue = document.getElementById('userEmail');
        if (ue) ue.textContent = user.email;
      }

      // If on index/login/signup/forgot pages and user is logged in -> redirect to dashboard
      const path = window.location.pathname.split('/').pop().toLowerCase();
      const publicPages = ['index.html','login.html','signup.html','forgot.html',''];
      if (user && publicPages.includes(path)) {
        // prevent infinite loop if already on dashboard
        if (window.location.href.indexOf('dashboard.html') === -1) {
          window.location.href = 'dashboard.html';
        }
      }
    });
  });
})();

/* Expose functions to global scope so inline handlers can call them */
window.signup = signup;
window.login = login;
window.forgotPassword = forgotPassword;
window.logout = logout;
