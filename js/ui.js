/* js/ui.js — UI micro-interactions + animations for dark theme
   Includes: ripple, staggered reveal, float effects, simple parallax
*/

(function () {
  'use strict';

  /* small helper: add ripple on pointerdown for elements with data-ripple */
  function bindRipples() {
    document.querySelectorAll('[data-ripple]').forEach(btn => {
      btn.addEventListener('pointerdown', function (e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        const size = Math.max(rect.width, rect.height) * 1.2;
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 700);
      });
    });
  }

  /* stagger reveal for elements with class 'ani' or data-animate */
  function staggerIn(root = document, selector = '.ani') {
    const nodes = Array.from(root.querySelectorAll(selector));
    nodes.forEach((el, i) => {
      const extra = parseInt(el.dataset.animateDelay || 0, 10) || 0;
      const delay = Math.min(600, extra + i * 70);
      el.style.transitionDelay = delay + 'ms';
      requestAnimationFrame(() => el.classList.add('visible'));
    });
  }

  /* show .card.fade-in elements sequentially */
  function showCards() {
    document.querySelectorAll('.card.fade-in').forEach((c, i) => {
      setTimeout(() => c.classList.add('is-visible'), 90 * i);
    });
  }

  /* simple parallax for illustration and hero-right */
  function bindParallax() {
    document.querySelectorAll('.illustration, .hero-right').forEach(el => {
      el.addEventListener('mousemove', (ev) => {
        const r = el.getBoundingClientRect();
        const px = (ev.clientX - r.left) / r.width - 0.5;
        const py = (ev.clientY - r.top) / r.height - 0.5;
        el.style.transform = `translate3d(${px * 6}px, ${py * 6}px, 0)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  /* float animation for illustration elements */
  function initFloat() {
    document.querySelectorAll('.illustration').forEach(el => {
      el.style.transition = 'transform 800ms ease';
      // small float via CSS class if desired
      el.classList.add('float');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    bindRipples();
    staggerIn(document);
    showCards();
    bindParallax();
    initFloat();
  });
})();
