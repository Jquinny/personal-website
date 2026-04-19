/**
 * starfield.js
 * Animated canvas background: slowly drifting, twinkling stars
 * in three colours, plus randomly spawned shooting stars.
 */

const canvas = document.getElementById('starfield');
const ctx    = canvas.getContext('2d');

let W, H;
let stars    = [];
let shooters = [];

// ── Star colours (matching CSS palette) ────────────────────────────────────
const STAR_COLORS = {
  default: '#c8e6f5',
  purple:  '#a855f7',
  orange:  '#ff6b35',
};

// ── Helpers ─────────────────────────────────────────────────────────────────

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

/** Resize canvas to fill the viewport exactly. */
function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

// ── Stars ───────────────────────────────────────────────────────────────────

function createStar() {
  const roll = Math.random();
  return {
    x:            rand(0, W),
    y:            rand(0, H),
    r:            rand(0.2, 1.6),
    speed:        rand(0.02, 0.14),
    twinkle:      rand(0, Math.PI * 2),   // phase offset for sin()
    twinkleSpeed: rand(0.005, 0.025),
    color:        roll > 0.95 ? STAR_COLORS.purple
                : roll > 0.90 ? STAR_COLORS.orange
                : STAR_COLORS.default,
  };
}

function initStars() {
  stars = [];
  const count = Math.floor((W * H) / 5000);
  for (let i = 0; i < count; i++) {
    stars.push(createStar());
  }
}

function drawStar(star) {
  star.twinkle += star.twinkleSpeed;
  const alpha = 0.4 + Math.sin(star.twinkle) * 0.4;

  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
  ctx.fillStyle = star.color;
  ctx.fill();
  ctx.globalAlpha = 1;

  // Slowly drift downward; wrap to top when off-screen
  star.y += star.speed;
  if (star.y > H) {
    star.y = 0;
    star.x = rand(0, W);
  }
}

// ── Shooting stars ───────────────────────────────────────────────────────────

function spawnShooter() {
  shooters.push({
    x:     rand(0, W),
    y:     rand(0, H * 0.5),          // spawn in top half only
    len:   rand(40, 120),
    speed: rand(4, 10),
    angle: Math.PI / 4 + rand(-0.3, 0.3),
    life:  1,                          // 1 → 0 as it fades out
  });
}

function drawShooter(shooter) {
  const dx   = Math.cos(shooter.angle) * shooter.len * shooter.life;
  const dy   = Math.sin(shooter.angle) * shooter.len * shooter.life;
  const grad = ctx.createLinearGradient(shooter.x, shooter.y, shooter.x - dx, shooter.y - dy);

  grad.addColorStop(0, `rgba(0, 212, 255, ${shooter.life})`);
  grad.addColorStop(1, 'rgba(0, 212, 255, 0)');

  ctx.beginPath();
  ctx.moveTo(shooter.x, shooter.y);
  ctx.lineTo(shooter.x - dx, shooter.y - dy);
  ctx.strokeStyle = grad;
  ctx.lineWidth   = 1.5;
  ctx.stroke();

  shooter.x    += Math.cos(shooter.angle) * shooter.speed;
  shooter.y    += Math.sin(shooter.angle) * shooter.speed;
  shooter.life -= 0.018;
}

// Spawn a new shooting star every 3–7 seconds
function scheduleShooter() {
  spawnShooter();
  setTimeout(scheduleShooter, rand(3000, 7000));
}

// ── Main draw loop ───────────────────────────────────────────────────────────

function draw() {
  ctx.clearRect(0, 0, W, H);

  stars.forEach(drawStar);

  // Remove dead shooters, then draw the living ones
  shooters = shooters.filter(s => s.life > 0);
  shooters.forEach(drawShooter);

  requestAnimationFrame(draw);
}

// ── Init ─────────────────────────────────────────────────────────────────────

resize();
initStars();
scheduleShooter();
draw();

window.addEventListener('resize', () => {
  resize();
  initStars();
});
