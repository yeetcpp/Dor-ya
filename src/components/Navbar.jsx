import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className={styles.inner}>
        <span className={styles.left}>Est. 2026</span>

        <div className={styles.logo}>
          <span className={styles.logoText}>Doréya</span>
        </div>

        <div className={styles.right}>
          <a href="#collection" className={styles.navLink}>Shop</a>
          <a href="#" className={styles.navLink}>Contact</a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
