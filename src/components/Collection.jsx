import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import styles from './Collection.module.css';

const items = [
  {
    id: '001',
    name: 'Obsidian Tote',
    category: 'Objects',
    price: '$280',
    img: '/product_bag.png',
    accent: '#C9974A',
    size: 'large',
  },
  {
    id: '002',
    name: 'Geometric Knit',
    category: 'Apparel',
    price: '$420',
    img: '/product_sweater.png',
    accent: '#9E4929',
    size: 'medium',
  },
  {
    id: '003',
    name: 'Dusk Wrap',
    category: 'Apparel',
    price: '$360',
    img: '/product_wrap.png',
    accent: '#C4BBAD',
    size: 'medium',
  },
];

const ProductCard = ({ item, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const isEven = index % 2 === 0;

  const variants = {
    hidden: { opacity: 0, y: 60, rotate: isEven ? -1 : 1 },
    visible: {
      opacity: 1, y: 0, rotate: 0,
      transition: { duration: 1.2, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.article
      ref={ref}
      className={`${styles.card} ${styles[item.size]}`}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {/* Image container */}
      <div className={styles.imageWrap} data-hover>
        <motion.img
          src={item.img}
          alt={item.name}
          className={styles.img}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        />
        {/* Hover reveal overlay */}
        <div className={styles.overlay}>
          <span className={styles.overlayLabel}>Add to Roster</span>
        </div>
        {/* Gold corner accent */}
        <div className={styles.cornerTL} />
        <div className={styles.cornerBR} />
      </div>

      {/* Details */}
      <div className={styles.details}>
        <div className={styles.detailLeft}>
          <span className="label" style={{ color: item.accent }}>{item.category}</span>
          <h3 className={styles.name}>{item.name}</h3>
        </div>
        <div className={styles.detailRight}>
          <span className={styles.index}>{item.id}</span>
          <span className={styles.price}>{item.price}</span>
        </div>
      </div>
    </motion.article>
  );
};

const Collection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yHeader = useTransform(scrollYProgress, [0, 0.4], [80, 0]);
  const oHeader = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  return (
    <section id="collection" ref={ref} className={styles.section}>
      {/* Section header — asymmetric */}
      <motion.div
        className={`container ${styles.header}`}
        style={{ y: yHeader, opacity: oHeader }}
      >
        <div className={styles.headerLeft}>
          <span className="label">§ 02</span>
        </div>
        <div className={styles.headerRight}>
          <h2 className={styles.title}>
            The&nbsp;<em>Collection</em>
          </h2>
          <p className={styles.subtitle}>
            Three chapters of the same story.<br />Worn differently.
          </p>
        </div>
      </motion.div>

      {/* Gallery grid */}
      <div className={`container ${styles.grid}`}>
        {items.map((item, i) => (
          <ProductCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Collection;
