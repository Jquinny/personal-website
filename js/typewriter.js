/**
 * typewriter.js
 * Cycles through a list of role phrases in the hero subtitle,
 * typing each one character by character then deleting it before
 * moving to the next.
 */

const PHRASES = [
  'Systems Programmer',
  'Robotics Enthusiast',
  'Language Tinkerer',
];

// Timing constants (ms)
const TYPE_SPEED   = 80;   // ms per character while typing
const DELETE_SPEED = 40;   // ms per character while deleting
const PAUSE_AFTER  = 40;   // extra ticks to wait after fully typed
const PAUSE_BEFORE = 10;   // extra ticks to wait before starting next phrase

const target = document.getElementById('typewriter');

let phraseIndex  = 0;
let charIndex    = 0;
let isDeleting   = false;
let waitTicks    = 0;

function tick() {
  // Honour any pending pause
  if (waitTicks > 0) {
    waitTicks--;
    setTimeout(tick, 50);
    return;
  }

  const phrase = PHRASES[phraseIndex];

  if (isDeleting) {
    // Remove one character
    target.innerHTML = phrase.slice(0, charIndex--) + '<span class="typewriter-cursor"></span>';

    if (charIndex < 0) {
      // Finished deleting — move to next phrase
      isDeleting  = false;
      phraseIndex = (phraseIndex + 1) % PHRASES.length;
      charIndex   = 0;
      waitTicks   = PAUSE_BEFORE;
    }

    setTimeout(tick, DELETE_SPEED);
  } else {
    // Add one character
    target.innerHTML = phrase.slice(0, ++charIndex) + '<span class="typewriter-cursor"></span>';

    if (charIndex === phrase.length) {
      // Finished typing — pause then start deleting
      isDeleting = true;
      waitTicks  = PAUSE_AFTER;
    }

    setTimeout(tick, TYPE_SPEED);
  }
}

tick();
