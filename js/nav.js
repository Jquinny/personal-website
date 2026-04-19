/**
 * nav.js
 * Two behaviours:
 *   1. Hamburger button toggles the mobile drawer menu open/closed.
 *   2. The nav bar compresses its padding slightly once the user
 *      has scrolled past the hero area.
 */

const navbar     = document.getElementById('navbar');
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

// ── Hamburger toggle ─────────────────────────────────────────────────────────

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

/**
 * Close the mobile menu and reset the hamburger icon.
 * Called inline from the anchor tags inside .mobile-menu via onclick.
 */
function closeMobile() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

// Make closeMobile available on the global scope so inline onclick="" works.
window.closeMobile = closeMobile;

// ── Nav shrink on scroll ──────────────────────────────────────────────────────

const NAV_COMPACT_PADDING  = '10px 40px';
const NAV_DEFAULT_PADDING  = '16px 40px';
const SCROLL_THRESHOLD     = 60;   // px

window.addEventListener('scroll', () => {
  navbar.style.padding = window.scrollY > SCROLL_THRESHOLD
    ? NAV_COMPACT_PADDING
    : NAV_DEFAULT_PADDING;
}, { passive: true });
