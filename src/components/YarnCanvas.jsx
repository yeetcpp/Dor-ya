import React, { useRef, useEffect } from 'react';

/*
  YarnCanvas — handcrafted yarn loop animation
  - Bezier-curve loops that pull, stretch and settle (spring physics)
  - Slight wobble + overshoot on each thread
  - Warm craft palette: mustard, rust, cream, teal
*/

const PALETTE = [
  'rgba(203, 128, 32,',   // mustard
  'rgba(194, 77, 44,',    // rust / terracotta
  'rgba(105, 124, 74,',   // olive
  'rgba(43, 106, 106,',   // teal
  'rgba(44, 36, 24,',     // ink
];

const rnd = (a, b) => Math.random() * (b - a) + a;
const pi2  = Math.PI * 2;

class YarnLoop {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
  }

  reset() {
    const { width, height } = this.canvas;

    // Anchor point — where the loop originates
    this.ax = rnd(0.05, 0.95) * width;
    this.ay = rnd(0.05, 0.95) * height;

    // Loop radius & phase
    this.r      = rnd(18, 90);
    this.phase  = rnd(0, pi2);
    this.speed  = rnd(0.003, 0.012);

    // Spring oscillation (wobble / overshoot)
    this.wobble      = 0;
    this.wobbleSpeed = rnd(0.04, 0.1);
    this.wobbleAmp   = rnd(2, 8);

    // Drift — the loop slowly drifts across the canvas
    this.driftX = rnd(-0.15, 0.15);
    this.driftY = rnd(-0.1, 0.1);

    // Visual
    const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    this.color = c;
    this.alpha  = rnd(0.07, 0.22);
    this.lw     = rnd(0.6, 2.2);

    // Number of loop "petals"
    this.petals = Math.round(rnd(1, 3));

    // Life
    this.life    = rnd(0, 200);
    this.maxLife = rnd(400, 1200);

    // Control point offsets (bezier "twist")
    this.cp1Angle = rnd(0, pi2);
    this.cp2Angle = rnd(0, pi2);
    this.cpR      = rnd(0.4, 0.9);
  }

  update() {
    this.phase    += this.speed;
    this.wobble   += this.wobbleSpeed;
    this.ax       += this.driftX;
    this.ay       += this.driftY;
    this.life++;

    const { width, height } = this.canvas;
    if (
      this.ax < -this.r * 2 || this.ax > width + this.r * 2 ||
      this.ay < -this.r * 2 || this.ay > height + this.r * 2 ||
      this.life > this.maxLife
    ) this.reset();
  }

  draw(ctx) {
    const t = this.life / this.maxLife;
    const fade = t < 0.1 ? t / 0.1 : t > 0.88 ? (1 - t) / 0.12 : 1;
    const wobbleVal = Math.sin(this.wobble) * this.wobbleAmp;

    ctx.beginPath();
    for (let p = 0; p < this.petals; p++) {
      const pOffset = (pi2 / this.petals) * p;
      const angle   = this.phase + pOffset;

      // Start of arc
      const sx = this.ax + Math.cos(angle)                  * (this.r + wobbleVal);
      const sy = this.ay + Math.sin(angle)                  * (this.r + wobbleVal);
      // End of arc (opposite side + next petal)
      const ex = this.ax + Math.cos(angle + pi2 / this.petals) * (this.r + wobbleVal * 0.7);
      const ey = this.ay + Math.sin(angle + pi2 / this.petals) * (this.r + wobbleVal * 0.7);

      // Bezier control points
      const cp1x = this.ax + Math.cos(this.cp1Angle + angle) * this.r * this.cpR;
      const cp1y = this.ay + Math.sin(this.cp1Angle + angle) * this.r * this.cpR;
      const cp2x = this.ax + Math.cos(this.cp2Angle + angle) * this.r * this.cpR;
      const cp2y = this.ay + Math.sin(this.cp2Angle + angle) * this.r * this.cpR;

      if (p === 0) ctx.moveTo(sx, sy);
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, ex, ey);
    }
    ctx.strokeStyle = `${this.color} ${this.alpha * fade})`;
    ctx.lineWidth   = this.lw;
    ctx.lineCap     = 'round';
    ctx.stroke();
  }
}

const YarnCanvas = () => {
  const canvasRef = useRef(null);
  const loopsRef  = useRef([]);
  const animRef   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    const COUNT  = 55;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    loopsRef.current = Array.from({ length: COUNT }, () => new YarnLoop(canvas));

    const render = () => {
      // Warm linen fade — leaves organic trails
      ctx.fillStyle = 'rgba(253, 248, 241, 0.028)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      loopsRef.current.forEach(loop => {
        loop.draw(ctx);
        loop.update();
      });
      animRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default YarnCanvas;
