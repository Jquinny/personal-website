/**
 * scrollReveal.js
 * Uses IntersectionObserver to add the `.visible` class to elements
 * as they scroll into the viewport, triggering their CSS transitions.
 *
 * Targets:
 *   .reveal          — generic section content (headers, text blocks)
 *   .timeline-item   — experience timeline rows
 *   .project-card    — project grid cards
 *
 * A small staggered delay (proportional to each element's index in the
 * current batch) makes groups of cards animate in one by one rather
 * than all at once.
 */

const SELECTOR  = '.reveal, .timeline-item, .project-card';
const STAGGER   = 80;   // ms between items in the same intersecting batch

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, batchIndex) => {
      if (!entry.isIntersecting) return;

      // Stagger within the current callback batch
      setTimeout(
        () => entry.target.classList.add('visible'),
        batchIndex * STAGGER
      );

      // Once revealed, stop observing — no need to re-trigger
      observer.unobserve(entry.target);
    });
  },
  {
    threshold:  0.1,
    rootMargin: '0px 0px -40px 0px',  // trigger slightly before bottom edge
  }
);

document.querySelectorAll(SELECTOR).forEach((el) => observer.observe(el));
