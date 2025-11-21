/* js/auth.js
   Authentication helpers using Firebase Auth (compat).
   Provides: signup, login, forgotPassword, logout, auth guard.
   Designed to work locally with Firebase CDN (compat).
*/

(function () {
  'use strict';

  function showMsg(elId, msg, isError = true) {
    const el = document.getElementById(elId);
    if (!el) return;
    el.textContent = msg;
    el.style.color = isError ? 'var(--danger)' : 'var(--success)';
    setTimeout(() => { el.textContent = ''; }, 6000);
  }

  /* SIGNUP */
  function signup(email, password, password2) {
    if (!window.auth) { showMsg('signupMsg', 'Firebase not initialized. Paste config in js/firebase.js'); return; }
    if (!email || !password) { showMsg('signupMsg', 'Please enter valid email and password'); return; }
    if (password.length < 6) { showMsg('signupMsg', 'Password must be at least 6 characters'); return; }
    if (password !== password2) { showMsg('signupMsg', 'Passwords do not match'); return; }

    auth.createUserWithEmailAndPassword(email, password)
      .then(cred => {
        if (cred.user && !cred.user.emailVerified) {
          cred.user.sendEmailVerification().catch(()=>{});
        }
        showMsg('signupMsg', 'Account created! Redirecting...', false);
        setTimeout(() => { window.location.href = 'dashboard.html'; }, 900);
      })
      .catch(err => {
        showMsg('signupMsg', err.message || 'Signup failed');
      });
  }

  /* LOGIN */
  function login(email, password) {
    if (!window.auth) { showMsg('loginMsg', 'Firebase not initialized. Paste config in js/firebase.js'); return; }
    if (!email || !password) { showMsg('loginMsg', 'Please enter email and password'); return; }

    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        showMsg('loginMsg', 'Logged in. Redirecting...', false);
        setTimeout(() => { window.location.href = 'dashboard.html'; }, 700);
      })
      .catch(err => {
        showMsg('loginMsg', err.message || 'Login failed');
      });
  }

  /* FORGOT PASSWORD */
  function forgotPassword(email) {
    if (!window.auth) { showMsg('resetMsg', 'Firebase not initialized. Paste config in js/firebase.js'); return; }
    if (!email) { showMsg('resetMsg', 'Please enter your email'); return; }

    auth.sendPasswordResetEmail(email)
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
    auth.signOut()
      .then(() => {
        window.location.href = 'login.html';
      })
      .catch(err => {
        alert('Logout failed: ' + (err.message || err));
      });
  }

  /* AUTH GUARD */
  document.addEventListener('DOMContentLoaded', () => {
    if (!window.auth) {
      console.warn('auth.js: Firebase auth not available');
      return;
    }

    window.auth.onAuthStateChanged(user => {
      // dashboard guard: if on dashboard and NOT logged -> redirect to login
      const path = window.location.pathname.split('/').pop().toLowerCase();
      const isDashboard = path === 'dashboard.html';
      if (isDashboard && !user) {
        window.location.href = 'login.html';
        return;
      }

      // show email in dashboard
      const ue = document.getElementById('userEmail');
      if (ue && user) ue.textContent = user.email;

      // if user is logged and on a public page -> redirect to dashboard
      const publicPages = ['index.html','login.html','signup.html','forgot.html',''];
      if (user && publicPages.includes(path)) {
        if (!window.location.href.includes('dashboard.html')) {
          window.location.href = 'dashboard.html';
        }
      }
    });
  });

  // expose globally
  window.signup = signup;
  window.login = login;
  window.forgotPassword = forgotPassword;
  window.logout = logout;

})();
