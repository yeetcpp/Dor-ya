import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import styles from './Manifesto.module.css';

const lines = [
  { text: 'Not a factory.',             delay: 0 },
  { text: 'Not a brand team.',           delay: 0.08 },
  { text: 'Just yarn, hooks, and me.',   delay: 0.16 },
];

const ManifestoLine = ({ text, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  return (
    <div ref={ref} className={styles.lineWrapper}>
      <motion.span
        className={styles.line}
        initial={{ y: '105%' }}
        animate={inView ? { y: '0%' } : {}}
        transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {text}
      </motion.span>
    </div>
  );
};

const Manifesto = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const x1 = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);

  return (
    <section ref={ref} className={styles.section}>
      {/* Sliding marquee lines — background texture */}
      <motion.div className={styles.marqueeTrack} style={{ x: x1 }} aria-hidden>
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className={styles.marqueeItem}>DORÉYA&nbsp;—&nbsp;</span>
        ))}
      </motion.div>

      <div className={`container ${styles.inner}`}>
        {/* Left — number */}
        <div className={styles.leftCol}>
          <span className="label">§ 01</span>
          <motion.div
            className={styles.vertLine}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Center — statement */}
        <div className={styles.centerCol}>
          <h2 className={styles.statement}>
            {lines.map((l, i) => (
              <ManifestoLine key={i} {...l} />
            ))}
          </h2>
        </div>

        {/* Right — detail copy */}
        <motion.div
          className={styles.rightCol}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className={styles.body}>
            Doréya is a one-person crochet studio. Every piece you see here was made by me, by hand, taking as long as it needed to take. No shortcuts, no assembly line — just intentional making.
          </p>
          <a href="#collection" className={styles.cta} data-hover>
            <span>View Collection</span>
            <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
              <line x1="0" y1="6" x2="28" y2="6" stroke="currentColor" strokeWidth="1"/>
              <polyline points="23,1 29,6 23,11" fill="none" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Second marquee moving opposite direction */}
      <motion.div className={`${styles.marqueeTrack} ${styles.marqueeBottom}`} style={{ x: x2 }} aria-hidden>
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className={styles.marqueeItem}>HANDMADE WITH CARE&nbsp;—&nbsp;</span>
        ))}
      </motion.div>
    </section>
  );
};

export default Manifesto;
