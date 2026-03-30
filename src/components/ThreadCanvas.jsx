import React, { useRef, useEffect } from 'react';

/*
  ThreadCanvas — abstract generative art:
  - Geometric lines that "weave" across the canvas
  - Controlled, rhythmic motion inspired by crochet structure
  - Muted gold on near-black — not literal, purely aesthetic
*/

const GOLD   = 'rgba(166, 124, 55,';
const RUST   = 'rgba(130, 59, 33,';
const CREAM  = 'rgba(18, 17, 15,';

const randBetween = (a, b) => Math.random() * (b - a) + a;

class Thread {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
  }

  reset() {
    const { width, height } = this.canvas;
    // Start from a random edge
    const edge = Math.floor(Math.random() * 4);
    if (edge === 0) { this.x = randBetween(0, width);  this.y = 0; }
    if (edge === 1) { this.x = width;                  this.y = randBetween(0, height); }
    if (edge === 2) { this.x = randBetween(0, width);  this.y = height; }
    if (edge === 3) { this.x = 0;                       this.y = randBetween(0, height); }

    // Target toward the center-ish area
    this.tx = width  * randBetween(0.1, 0.9);
    this.ty = height * randBetween(0.1, 0.9);

    const angle  = Math.atan2(this.ty - this.y, this.tx - this.x);
    const speed  = randBetween(0.3, 0.9);
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;

    // Color palette
    const palettes = [GOLD, RUST, CREAM];
    const c = palettes[Math.floor(Math.random() * palettes.length)];
    this.color = c;
    this.alpha = randBetween(0.06, 0.25);
    this.width = randBetween(0.4, 1.8);
    this.life  = 0;
    this.maxLife = randBetween(300, 900);

    // Slight curvature: perpendicular drift
    this.drift = randBetween(-0.15, 0.15);
    this.angle = angle;
  }

  update() {
    this.life++;
    // Gentle curvature
    this.angle += this.drift * 0.01;
    this.vx = Math.cos(this.angle) * randBetween(0.3, 0.9);
    this.vy = Math.sin(this.angle) * randBetween(0.3, 0.9);
    this.x += this.vx;
    this.y += this.vy;
    if (this.life > this.maxLife) this.reset();
  }

  draw(ctx, prevX, prevY) {
    const t = this.life / this.maxLife;
    const fade = t < 0.15 ? t / 0.15 : t > 0.85 ? (1 - t) / 0.15 : 1;
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = `${this.color} ${this.alpha * fade})`;
    ctx.lineWidth = this.width;
    ctx.stroke();
  }
}

const ThreadCanvas = () => {
  const canvasRef = useRef(null);
  const threadsRef = useRef([]);
  const animRef = useRef(null);
  const prevPos = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const COUNT = 60;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialise threads
    threadsRef.current = Array.from({ length: COUNT }, () => new Thread(canvas));
    prevPos.current = threadsRef.current.map(t => ({ x: t.x, y: t.y }));

    const render = () => {
      // Very slow trail fade — gives "fabric depth" feel
      ctx.fillStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      threadsRef.current.forEach((thread, i) => {
        const prev = prevPos.current[i];
        thread.draw(ctx, prev.x, prev.y);
        prevPos.current[i] = { x: thread.x, y: thread.y };
        thread.update();
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
        zIndex: 2,
        pointerEvents: 'none',
        opacity: 0.9,
      }}
    />
  );
};

export default ThreadCanvas;
