/* js/ui.js — UI micro-interactions + animation orchestrator
   Include this BEFORE auth.js on every page (see instructions below).
*/

/* ripple effect for buttons with data-ripple attribute */
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
      setTimeout(() => ripple.remove(), 800);
    });
  });
}

/* staggered reveal for elements with class 'ani' or data-animate */
function staggerIn(root = document, selector = '.ani, [data-animate]') {
  const nodes = Array.from(root.querySelectorAll(selector));
  nodes.forEach((el, i) => {
    const delay = (parseFloat(el.dataset.animateDelay) || 0) + (i * 70);
    el.style.transitionDelay = (delay) + 'ms';
    requestAnimationFrame(() => el.classList.add('visible', 'in'));
  });
}

/* fade-in cards — add 'fade-in' class to any .card to animate them */
function showCards() {
  document.querySelectorAll('.card.fade-in').forEach((c, i) => {
    setTimeout(() => c.classList.add('is-visible'), 80 * i);
  });
}

/* tiny parallax on mouse move for illustration areas (dashboard / hero) */
function bindParallax() {
  const p = document.querySelectorAll('.illustration, .hero-right');
  p.forEach(el => {
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

/* decorate hero illustration with float animation */
function initFloatIllustration() {
  document.querySelectorAll('.illustration').forEach(el => el.classList.add('animate-float'));
}

/* run all UI binds on DOMContentLoaded */
document.addEventListener('DOMContentLoaded', () => {
  bindRipples();
  staggerIn(document);
  showCards();
  bindParallax();
  initFloatIllustration();
});
