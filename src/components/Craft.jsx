import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Craft.module.css';

// SVG that draws an abstract geometric "stitch grid" pattern
const StitchGrid = ({ inView }) => (
  <svg className={styles.stitchSvg} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Grid of diagonal stitches */}
    {Array.from({ length: 8 }).map((_, row) =>
      Array.from({ length: 8 }).map((_, col) => {
        const x1 = col * 52 + 10;
        const y1 = row * 52 + 10;
        const delay = (row + col) * 0.07;
        return (
          <motion.g key={`${row}-${col}`}>
            <motion.line
              x1={x1} y1={y1} x2={x1 + 30} y2={y1 + 30}
              stroke="rgba(201,151,74,0.55)" strokeWidth="0.8"
              initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.6, delay: delay + 0.3, ease: 'easeOut' }}
            />
            <motion.line
              x1={x1 + 30} y1={y1} x2={x1} y2={y1 + 30}
              stroke="rgba(201,151,74,0.25)" strokeWidth="0.5"
              initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.6, delay: delay + 0.5, ease: 'easeOut' }}
            />
          </motion.g>
        );
      })
    )}
    {/* Accent hex outline */}
    <motion.polygon
      points="200,20 360,110 360,290 200,380 40,290 40,110"
      stroke="rgba(201,151,74,0.2)" strokeWidth="1" fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={inView ? { pathLength: 1, opacity: 1 } : {}}
      transition={{ duration: 2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
    />
  </svg>
);

const stats = [
  { num: '100%', label: 'Hand-crocheted' },
  { num: '1',    label: 'Maker. Always.' },
  { num: '0',    label: 'Machines involved' },
];

const Craft = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const yImg   = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const yText  = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);

  const [inView, setInView] = React.useState(false);
  const gridRef = useRef(null);

  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.2 });
    if (gridRef.current) obs.observe(gridRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className={styles.section}>
      <div className={`container ${styles.grid}`}>
        {/* Left: image with parallax */}
        <div className={styles.imgCol}>
          <div className={styles.imgFrame}>
            <motion.img
              src="/product_sweater.png"
              alt="Craft"
              className={styles.img}
              style={{ y: yImg, scale: 1.12 }}
            />
          </div>
          {/* Floating tag */}
          <motion.div
            className={styles.floatingTag}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <span className="label">§ 03</span>
            <span className={styles.tagText}>Process</span>
          </motion.div>
        </div>

        {/* Right: copy + stitch grid */}
        <motion.div className={styles.textCol} style={{ y: yText }}>
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Made differently.<br />
            <em>On purpose.</em>
          </motion.h2>

          <motion.p
            className={styles.body}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            I crochet every piece myself, from start to finish. I source my yarns from Magic Needles and select brands from Amazon India — materials I trust and love working with. Each order gets made with full attention, because I care about what I send to you.
          </motion.p>

          {/* Stats */}
          <div className={styles.stats}>
            {stats.map((s, i) => (
              <motion.div
                key={i}
                className={styles.stat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.12 }}
              >
                <span className={styles.statNum}>{s.num}</span>
                <span className="label">{s.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Stitch animation */}
          <div ref={gridRef} className={styles.stitchWrap}>
            <StitchGrid inView={inView} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Craft;
