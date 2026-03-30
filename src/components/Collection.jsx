import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './Collection.module.css';

const spring = { type: 'spring', stiffness: 70, damping: 13 };

const items = [
  {
    id: '001',
    name: 'Obsidian Tote',
    category: 'Objects',
    price: '₹2,800',
    img: '/product_bag.png',
    color: 'var(--rust)',
    note: 'chunky cotton yarn',
    tilt: -1.5,
  },
  {
    id: '002',
    name: 'Geometric Knit',
    category: 'Apparel',
    price: '₹4,200',
    img: '/product_sweater.png',
    color: 'var(--mustard)',
    note: 'premium wool blend',
    tilt: 1.2,
  },
  {
    id: '003',
    name: 'Dusk Wrap',
    category: 'Apparel',
    price: '₹3,600',
    img: '/product_wrap.png',
    color: 'var(--olive)',
    note: 'soft merino wool',
    tilt: -0.8,
  },
];

const ProductCard = ({ item, index }) => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-6% 0px' });

  return (
    <motion.article
      ref={ref}
      className={styles.card}
      initial={{ opacity: 0, y: 50, rotate: item.tilt * 2 }}
      animate={inView ? { opacity: 1, y: 0, rotate: item.tilt } : {}}
      transition={{ ...spring, delay: index * 0.13 }}
      whileHover={{ y: -6, rotate: 0, transition: { type: 'spring', stiffness: 120, damping: 14 } }}
    >
      {/* Pinned label */}
      <div className={styles.pinLabel}>
        <span className="label" style={{ color: item.color }}>{item.category}</span>
        <span className="label">{item.id}</span>
      </div>

      {/* Image with dashed frame */}
      <div className={styles.imgFrame}>
        <img src={item.img} alt={item.name} className={styles.img} />
        {/* Stitch corners */}
        <div className={styles.cornerTL} style={{ borderColor: item.color }} />
        <div className={styles.cornerBR} style={{ borderColor: item.color }} />
        <div className={styles.hoverLayer}>
          <span className={styles.hoverText}>Enquire</span>
        </div>
      </div>

      {/* Details */}
      <div className={styles.details}>
        <div>
          <h3 className={styles.name}>{item.name}</h3>
          <span className={styles.note}>{item.note}</span>
        </div>
        <span className={styles.price} style={{ color: item.color }}>{item.price}</span>
      </div>
    </motion.article>
  );
};

const Collection = () => {
  return (
    <section id="collection" className={styles.section}>
      <div className={`container ${styles.header}`}>
        <div className={styles.headerLeft}>
          <span className="label">§ 02</span>
          <h2 className={styles.title}>The Collection</h2>
          <p className={styles.subtitle}>
            Three pieces. All made to order. All made by hand.
          </p>
        </div>
        <div className={styles.headerRight}>
          <svg viewBox="0 0 100 100" fill="none" className={styles.yarnBall} xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="var(--mustard)" strokeWidth="2" fill="var(--bg-alt)"/>
            <path d="M20 50 Q50 18 80 50 Q50 82 20 50Z" stroke="var(--rust)" strokeWidth="1.5" fill="none"/>
            <path d="M14 38 Q50 10 86 38" stroke="var(--mustard)" strokeWidth="1" fill="none"/>
            <path d="M14 62 Q50 90 86 62" stroke="var(--mustard)" strokeWidth="1" fill="none"/>
            <path d="M50 8 Q22 50 50 92" stroke="var(--olive)" strokeWidth="1" fill="none" strokeDasharray="3 4"/>
            <path d="M50 8 Q78 50 50 92" stroke="var(--olive)" strokeWidth="1" fill="none" strokeDasharray="3 4"/>
          </svg>
        </div>
      </div>

      <hr className="stitch-line" style={{ margin: '0 5vw 3rem' }} />

      <div className={`container ${styles.grid}`}>
        {items.map((item, i) => (
          <ProductCard key={item.id} item={item} index={i} />
        ))}
      </div>

      <motion.p
        className={styles.customNote}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        Don't see what you're looking for?{' '}
        <a href="#" className={styles.customLink}>Custom orders are always open →</a>
      </motion.p>
    </section>
  );
};

export default Collection;
