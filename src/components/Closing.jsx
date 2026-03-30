import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './Closing.module.css';

const spring = { type: 'spring', stiffness: 75, damping: 14 };

const Closing = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-12%' });

  return (
    <section ref={ref} className={styles.section}>
      {/* Warm background stamp */}
      <div className={styles.stampBg} aria-hidden>DORÉYA</div>

      <div className={`container ${styles.inner}`}>
        {/* Left — craft texture decoration */}
        <div className={styles.left}>
          {/* Inline decorative crochet hexagon SVG */}
          <motion.svg
            viewBox="0 0 200 200"
            fill="none"
            className={styles.hexSvg}
            xmlns="http://www.w3.org/2000/svg"
            initial={{ scale: 0.7, opacity: 0, rotate: -15 }}
            animate={inView ? { scale: 1, opacity: 1, rotate: 0 } : {}}
            transition={{ ...spring, delay: 0.2 }}
          >
            <motion.polygon
              points="100,10 178,55 178,145 100,190 22,145 22,55"
              stroke="var(--mustard)" strokeWidth="2.5" fill="var(--bg-alt)"
              strokeDasharray="6 4"
              initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 2, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
            />
            <motion.polygon
              points="100,30 160,65 160,135 100,170 40,135 40,65"
              stroke="var(--rust)" strokeWidth="1.5" fill="none"
              initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.6, delay: 0.9, ease: [0.25, 1, 0.5, 1] }}
            />
            <motion.text
              x="100" y="108"
              textAnchor="middle"
              fontFamily="'Fraunces', Georgia, serif"
              fontWeight="700"
              fontSize="18"
              fill="var(--rust)"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              Handmade
            </motion.text>
            <motion.text
              x="100" y="130"
              textAnchor="middle"
              fontFamily="'Fraunces', Georgia, serif"
              fontWeight="700"
              fontSize="18"
              fill="var(--mustard)"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 2.1 }}
            >
              with love.
            </motion.text>
          </motion.svg>

          <motion.p
            className={styles.quote}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.5 }}
          >
            "I make things slowly,<br />so they last."
          </motion.p>
        </div>

        {/* Right — CTA */}
        <div className={styles.right}>
          <motion.span
            className="label"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >§ 04 — Get in Touch</motion.span>

          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ ...spring, delay: 0.35 }}
          >
            Your piece,<br />
            <span className={styles.accent}>made to order.</span>
          </motion.h2>

          <motion.p
            className={styles.body}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Every piece is made to order — yours starts when you reach out. Custom orders are always welcome. I'll work with you on size, colour, and design.
          </motion.p>

          <motion.a
            href="#"
            className={styles.btn}
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...spring, delay: 0.85 }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Get in Touch
          </motion.a>
        </div>
      </div>

      {/* Footer strip */}
      <div className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <div className={styles.footerLogo}>Doréya</div>
          <nav className={styles.footerNav}>
            {['Instagram', 'Custom Orders', 'About', 'Contact'].map(link => (
              <a key={link} href="#" className={styles.footerLink}>{link}</a>
            ))}
          </nav>
          <span className="label">© 2026 Doréya</span>
        </div>
      </div>
    </section>
  );
};

export default Closing;
