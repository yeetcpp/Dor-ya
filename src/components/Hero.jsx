import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import YarnCanvas from './YarnCanvas';
import styles from './Hero.module.css';

const springTransition = { type: 'spring', stiffness: 90, damping: 14, mass: 0.8 };

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const yContent = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const opacity  = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={ref} className={styles.hero}>
      {/* Yarn loop canvas — fills background */}
      <YarnCanvas />

      {/* Warm grain paper overlay */}
      <div className={styles.paperOverlay} aria-hidden />

      <motion.div className={styles.content} style={{ y: yContent, opacity }}>

        {/* Top label row */}
        <motion.div
          className={styles.topRow}
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
        >
          <span className="label">Independent Crochet Studio</span>
          <span className={styles.dotSep}>●</span>
          <span className="label">SS 2026</span>
        </motion.div>

        {/* Main brand word */}
        <div className={styles.titleWrap}>
          {['D', 'o', 'r', 'é', 'y', 'a'].map((char, i) => (
            <motion.span
              key={i}
              className={`${styles.titleChar} ${char === 'é' || char === 'a' ? styles.accent : ''}`}
              initial={{ y: 80, opacity: 0, rotate: (i % 2 === 0 ? -4 : 4) }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ ...springTransition, delay: 0.15 + i * 0.07 }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Stitch underline SVG */}
        <motion.svg
          className={styles.stitchLine}
          viewBox="0 0 480 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, delay: 1.1, ease: [0.25, 1, 0.5, 1] }}
        >
          <motion.path
            d="M4 6 Q20 2 36 6 Q52 10 68 6 Q84 2 100 6 Q116 10 132 6 Q148 2 164 6 Q180 10 196 6 Q212 2 228 6 Q244 10 260 6 Q276 2 292 6 Q308 10 324 6 Q340 2 356 6 Q372 10 388 6 Q404 2 420 6 Q436 10 452 6 Q468 2 476 6"
            stroke="#CB8020"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </motion.svg>

        {/* Tagline */}
        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.4, ease: [0.25, 1, 0.5, 1] }}
        >
          Made by one pair of hands, with care.
        </motion.p>

        {/* CTA */}
        <motion.a
          href="#collection"
          className={styles.cta}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...springTransition, delay: 1.7 }}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          Explore the collection
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10h12M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.a>
      </motion.div>

      {/* Floating craft tag bottom-right */}
      <motion.div
        className={styles.craftTag}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 2.0 }}
      >
        <span>Since 2026</span>
        <span className={styles.dotSep}>•</span>
        <span>Custom Orders Welcome</span>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className={styles.scrollCue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <motion.span
          className={styles.scrollLine}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="label">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;
