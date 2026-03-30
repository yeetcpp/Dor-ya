import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ThreadCanvas from './ThreadCanvas';
import styles from './Hero.module.css';

const WORDS = ['Handcrafted', 'Futures'];

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const yTitle = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale   = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const lineVariants = {
    hidden: { clipPath: 'inset(0 100% 0 0)' },
    visible: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
  };

  const charVariants = {
    hidden:   { y: '110%', opacity: 0 },
    visible:  { y: '0%',   opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section ref={ref} className={styles.hero}>
      {/* Abstract thread animation canvas — full background */}
      <ThreadCanvas />

      {/* Horizontal rule accent */}
      <motion.div
        className={styles.hrAccent}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Main content */}
      <motion.div
        className={styles.content}
        style={{ y: yTitle, opacity, scale }}
      >
        {/* Label */}
        <motion.div
          className={styles.topLabel}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <span className="label">Independent Crochet Studio</span>
          <motion.span
            className={styles.line}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          />
          <span className="label">SS 2026</span>
        </motion.div>

        {/* Massive hero headline */}
        <motion.h1
          className={styles.title}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {['Do', 'réya'].map((seg, i) => (
            <span key={i} className={styles.titleSegment}>
              {seg === 'réya'
                ? <motion.span variants={charVariants} className={styles.titleAccent}>{seg}</motion.span>
                : <motion.span variants={charVariants}>{seg}</motion.span>
              }
            </span>
          ))}
        </motion.h1>

        {/* Subtitle line */}
        <motion.div
          className={styles.subtitle}
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
        >
          <p>
            Made by one pair of hands, with care.
          </p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className={styles.scrollCue}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0 }}
        >
          <motion.span
            className={styles.scrollLine}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="label">Scroll</span>
        </motion.div>
      </motion.div>

      {/* Bottom metadata strip */}
      <motion.div
        className={styles.bottomStrip}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <span className="label">Doréya™</span>
        <span className="label">Since 2026</span>
        <span className="label">Custom Orders Welcome</span>
      </motion.div>
    </section>
  );
};

export default Hero;
