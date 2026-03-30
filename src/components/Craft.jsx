import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import styles from './Craft.module.css';

const spring = { type: 'spring', stiffness: 80, damping: 14 };

// SVG stitch grid that draws in row by row
const StitchGrid = ({ inView }) => (
  <svg className={styles.stitchSvg} viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Horizontal stitch rows */}
    {Array.from({ length: 5 }).map((_, row) =>
      Array.from({ length: 8 }).map((_, col) => {
        const x  = col * 42 + 12;
        const y  = row * 42 + 12;
        const d  = (row + col) * 0.08;
        return (
          <g key={`${row}-${col}`}>
            {/* X stitch */}
            <motion.line x1={x} y1={y} x2={x+26} y2={y+26}
              stroke="var(--rust)" strokeWidth="1.5" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.5, delay: d + 0.2 }}
            />
            <motion.line x1={x+26} y1={y} x2={x} y2={y+26}
              stroke="var(--mustard)" strokeWidth="1" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.4, delay: d + 0.38 }}
            />
          </g>
        );
      })
    )}
  </svg>
);

const stats = [
  { num: '100%', label: 'Hand-crocheted', color: 'var(--rust)' },
  { num: '1',    label: 'Maker. Always.', color: 'var(--mustard)' },
  { num: '0',    label: 'Machines involved', color: 'var(--olive)' },
];

const Craft = () => {
  const ref    = useRef(null);
  const gridRef = useRef(null);
  const [inView, setInView] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yImg  = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const yText = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.15 });
    if (gridRef.current) obs.observe(gridRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className={styles.section}>
      <div className={`container ${styles.grid}`}>

        {/* Left: image column */}
        <div className={styles.imgCol}>
          <div className={styles.imgFrame}>
            <motion.img
              src="/product_sweater.png"
              alt="Craft detail"
              className={styles.img}
              style={{ y: yImg, scale: 1.1 }}
            />
          </div>

          {/* Floating process tag */}
          <motion.div
            className={styles.processTag}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: 0.8 }}
          >
            <span className={styles.tagIcon}>✦</span>
            <div>
              <div className={styles.tagTitle}>The Process</div>
              <div className={styles.tagSub}>Handmade in India</div>
            </div>
          </motion.div>

          {/* Stitch grid underneath */}
          <div ref={gridRef} className={styles.stitchWrap}>
            <StitchGrid inView={inView} />
          </div>
        </div>

        {/* Right: text */}
        <motion.div className={styles.textCol} style={{ y: yText }}>
          <span className="label">§ 03 — Process</span>

          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ ...spring }}
          >
            Made differently.
            <span className={styles.titleAccent}> On purpose.</span>
          </motion.h2>

          <motion.p
            className={styles.body}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            I crochet every piece myself, from start to finish. I source my yarns from Magic Needles and select brands on Amazon India — materials I trust and love working with. Each order gets made with full attention, because I care about what I send to you.
          </motion.p>

          {/* Stats */}
          <div className={styles.stats}>
            {stats.map((s, i) => (
              <motion.div
                key={i}
                className={styles.stat}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...spring, delay: 0.3 + i * 0.12 }}
              >
                <span className={styles.statNum} style={{ color: s.color }}>{s.num}</span>
                <span className="label">{s.label}</span>
              </motion.div>
            ))}
          </div>

          <hr className="stitch-line" />
          <motion.p
            className={styles.sourcing}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Yarns sourced from <strong>Magic Needles</strong> &amp; trusted Amazon India sellers.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Craft;
