import React, { useEffect, useRef } from 'react';

const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top  = e.clientY + 'px';
      }
    };

    const lerp = (a, b, n) => a + (b - a) * n;

    const animate = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px';
        ringRef.current.style.top  = ring.current.y + 'px';
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    requestAnimationFrame(animate);

    // Hover effect on interactive elements
    const targets = document.querySelectorAll('a, button, [data-hover]');
    const grow = () => {
      dotRef.current && (dotRef.current.style.transform = 'translate(-50%,-50%) scale(3)');
      ringRef.current && (ringRef.current.style.transform = 'translate(-50%,-50%) scale(1.8)');
    };
    const shrink = () => {
      dotRef.current && (dotRef.current.style.transform = 'translate(-50%,-50%) scale(1)');
      ringRef.current && (ringRef.current.style.transform = 'translate(-50%,-50%) scale(1)');
    };
    targets.forEach(t => { t.addEventListener('mouseenter', grow); t.addEventListener('mouseleave', shrink); });

    return () => {
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
};

export default Cursor;
