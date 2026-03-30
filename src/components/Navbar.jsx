import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.onChange(v => setScrolled(v > 60));
    return unsub;
  }, [scrollY]);

  return (
    <motion.nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.inner}>
        <span className={`${styles.label} label`}>Est. 2024</span>

        <div className={styles.logo}>
          <span className={styles.logoText}>Doréya</span>
        </div>

        <div className={styles.actions}>
          <button className={styles.menuBtn} aria-label="Menu">
            <span /><span />
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
