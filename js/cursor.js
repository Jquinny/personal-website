/**
 * cursor.js
 * Custom cursor: a small dot that tracks the mouse exactly,
 * and a larger ring that smoothly lags behind it.
 */

const cursorDot  = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;   // exact mouse position
let ringX  = 0, ringY  = 0;   // lagging ring position

/** Snap the dot to the current mouse position immediately. */
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

/**
 * Animate the ring with lerp so it eases toward the mouse
 * rather than snapping. Runs every animation frame.
 */
(function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;

  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';

  requestAnimationFrame(animateRing);
})();
