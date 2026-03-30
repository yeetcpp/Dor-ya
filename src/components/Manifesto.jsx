import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import styles from './Manifesto.module.css';

const springIn = { type: 'spring', stiffness: 80, damping: 13, mass: 0.9 };

const lines = [
  { text: 'Not a factory.',           color: 'var(--ink)' },
  { text: 'Not a brand team.',        color: 'var(--ink)' },
  { text: 'Just yarn, hooks,',        color: 'var(--mustard)' },
  { text: 'and me.',                  color: 'var(--rust)' },
];

const ManifestoLine = ({ text, color, index }) => {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px' });
  return (
    <div ref={ref} className={styles.lineRow}>
      <motion.span
        className={styles.lineText}
        style={{ color }}
        initial={{ x: -60, opacity: 0, rotate: -1.5 }}
        animate={inView ? { x: 0, opacity: 1, rotate: 0 } : {}}
        transition={{ ...springIn, delay: index * 0.1 }}
      >
        {text}
      </motion.span>
    </div>
  );
};

const Manifesto = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const loopX  = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);
  const loopX2 = useTransform(scrollYProgress, [0, 1], ['3%', '-3%']);

  return (
    <section ref={ref} className={styles.section}>
      {/* Decorative top band */}
      <div className={styles.topBand}>
        <motion.div className={styles.bandTrack} style={{ x: loopX }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className={styles.bandItem}>DORÉYA &nbsp;◆&nbsp; HANDMADE &nbsp;◆&nbsp; </span>
          ))}
        </motion.div>
      </div>

      <div className={`container ${styles.inner}`}>
        {/* Left: section mark + yarn loop decoration */}
        <div className={styles.leftCol}>
          <span className="label">§ 01</span>
          {/* Decorative crochet-loop SVG drawing down */}
          <motion.svg
            width="40" viewBox="0 0 40 200" fill="none"
            className={styles.loopSvg}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.2, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
          >
            <motion.path
              d="M20 5 C5 30, 35 50, 20 75 C5 100, 35 120, 20 145 C5 170, 35 190, 20 200"
              stroke="var(--mustard)" strokeWidth="2" strokeLinecap="round"
            />
          </motion.svg>
        </div>

        {/* Center: big statement lines */}
        <div className={styles.centerCol}>
          <div className={styles.statementsWrap}>
            {lines.map((l, i) => <ManifestoLine key={i} index={i} {...l} />)}
          </div>
          <hr className="stitch-line" style={{ marginTop: '2.5rem', maxWidth: 420 }} />
        </div>

        {/* Right: body copy */}
        <motion.div
          className={styles.rightCol}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, delay: 0.55 }}
        >
          <p className={styles.body}>
            Doréya is a one-person crochet studio. Every piece you see here was made by me, by hand, taking as long as it needed to take. No shortcuts, no assembly line — just intentional making.
          </p>
          <a href="#collection" className={styles.cta}>
            View the Collection
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Bottom band */}
      <div className={styles.bottomBand}>
        <motion.div className={styles.bandTrack} style={{ x: loopX2 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className={styles.bandItem}>CUSTOM ORDERS &nbsp;◆&nbsp; MAGIC NEEDLES YARN &nbsp;◆&nbsp; </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Manifesto;
