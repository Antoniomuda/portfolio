const canvas = document.getElementById("c");
const wrap = document.getElementById("wrap");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = wrap.clientWidth;
  canvas.height = wrap.clientHeight;
}
resize();
window.addEventListener("resize", resize);

const shapes = [
  { x: 0, y: 0, vx: 2.2, vy: 1.8, r: 165, color: "#8FA876" },
  { x: 0, y: 0, vx: -2.0, vy: 2.4, r: 117, color: "#D4A57A" },

  { x: 0, y: 0, vx: 2.0, vy: 1.0, r: 165, color: "red" },
  { x: 0, y: 0, vx: -2.0, vy: 2.4, r: 117, color: "blue" },

  { x: 0, y: 0, vx: 2.2, vy: 1.8, r: 165, color: "yellow" },
  { x: 0, y: 0, vx: -2.0, vy: 2.4, r: 117, color: "pink" },
];

function init() {
  const W = canvas.width,
    H = canvas.height;
  shapes[0].x = W * 0.05;
  shapes[0].y = H * 0.1;
  shapes[1].x = W * 0.8;
  shapes[1].y = H * 0.65;
}
init();

function drawCircle(s) {
  ctx.save();
  ctx.globalAlpha = 0.55;
  ctx.fillStyle = s.color;
  ctx.beginPath();
  ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function collide(a, b) {
  const dx = a.x - b.x,
    dy = a.y - b.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const minDist = a.r + b.r;
  if (dist < minDist && dist > 0) {
    const nx = dx / dist,
      ny = dy / dist;
    const dvx = a.vx - b.vx,
      dvy = a.vy - b.vy;
    const dot = dvx * nx + dvy * ny;
    if (dot < 0) {
      a.vx -= dot * nx;
      a.vy -= dot * ny;
      b.vx += dot * nx;
      b.vy += dot * ny;
    }
  }
}

function update() {
  const W = canvas.width,
    H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  for (let i = 0; i < shapes.length; i++) {
    const s = shapes[i];
    s.x += s.vx;
    s.y += s.vy;
    if (s.x - s.r < -s.r * 0.5) {
      s.vx = Math.abs(s.vx);
    }
    if (s.x + s.r > W + s.r * 0.5) {
      s.vx = -Math.abs(s.vx);
    }
    if (s.y - s.r < -s.r * 0.5) {
      s.vy = Math.abs(s.vy);
    }
    if (s.y + s.r > H + s.r * 0.5) {
      s.vy = -Math.abs(s.vy);
    }
    for (let j = i + 1; j < shapes.length; j++) collide(s, shapes[j]);
    drawCircle(s);
  }
  requestAnimationFrame(update);
}
update();
