import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './Closing.module.css';

const Closing = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section ref={ref} className={styles.section}>
      {/* Large background text */}
      <div className={styles.bgText} aria-hidden>DORÉYA</div>

      <div className={`container ${styles.inner}`}>
        {/* Left block */}
        <div className={styles.left}>
          <motion.div
            className={styles.circle}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.p
            className={styles.quote}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            "I make things slowly, so they last."
          </motion.p>
        </div>

        {/* Right block */}
        <div className={styles.right}>
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Enter the<br /><em>boutique.</em>
          </motion.h2>

          <motion.p
            className={styles.body}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Every piece is made to order — yours starts when you reach out.
            Custom orders are always welcome. I'll work with you on size, colour, and design.
          </motion.p>

          <motion.a
            href="#"
            className={styles.btn}
            data-hover
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.9 }}
            whileHover={{ scale: 1.02 }}
          >
            <span>Get in Touch</span>
            <motion.span
              className={styles.btnLine}
              whileHover={{ scaleX: 1.5 }}
              transition={{ duration: 0.4 }}
            />
          </motion.a>
        </div>
      </div>

      {/* Footer strip */}
      <div className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <div className={styles.footerLogo}>Doréya</div>
          <nav className={styles.footerNav}>
            {['Instagram', 'Custom Orders', 'About', 'Contact'].map(link => (
              <a key={link} href="#" className={styles.footerLink} data-hover>{link}</a>
            ))}
          </nav>
          <span className="label" style={{ opacity: 0.4 }}>© 2026 Doréya</span>
        </div>
      </div>
    </section>
  );
};

export default Closing;
