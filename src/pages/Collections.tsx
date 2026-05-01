import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './Collections.css';

const COLLECTIONS = [
  {
    id: 1,
    name: 'The Japandi Edit',
    subtitle: 'Japanese-Scandinavian Fusion',
    desc: 'Where Eastern minimalism meets Nordic warmth. Clean lines, natural materials, and a palette of muted earth tones.',
    image: 'https://placehold.co/1200x800/e8e4de/C8A96A?text=Oak+%26+Aura',
    tag: 'New Collection',
    color: '#D4C5A9',
    slug: 'sofas',
  },
  {
    id: 2,
    name: 'Luxe Bedroom',
    subtitle: 'Hotel-Inspired Sanctuary',
    desc: 'Transform your bedroom into a five-star retreat with our curated selection of beds, nightstands, and soft furnishings.',
    image: 'https://placehold.co/1200x800/e8e4de/C8A96A?text=Oak+%26+Aura',
    tag: 'Bestseller',
    color: '#C8A96A',
    slug: 'beds',
  },
  {
    id: 3,
    name: 'The Dining Room',
    subtitle: 'Gather & Celebrate',
    desc: 'Create the perfect setting for memorable meals. From intimate dinners to grand celebrations, we have the table for every occasion.',
    image: 'https://placehold.co/1200x800/e8e4de/C8A96A?text=Oak+%26+Aura',
    tag: 'Featured',
    color: '#92400E',
    slug: 'dining',
  },
  {
    id: 4,
    name: 'Work From Home',
    subtitle: 'Productive & Beautiful',
    desc: 'Your home office should inspire creativity and focus. Discover desks, chairs, and storage solutions designed for the modern professional.',
    image: 'https://placehold.co/1200x800/e8e4de/C8A96A?text=Oak+%26+Aura',
    tag: 'Trending',
    color: '#1F2937',
    slug: 'office',
  },
  {
    id: 5,
    name: 'Natural Living',
    subtitle: 'Organic & Sustainable',
    desc: 'Bring the outdoors in with our collection of rattan, bamboo, and natural wood pieces that celebrate the beauty of organic materials.',
    image: 'https://placehold.co/1200x800/e8e4de/C8A96A?text=Oak+%26+Aura',
    tag: 'Eco-Friendly',
    color: '#065F46',
    slug: 'decor',
  },
  {
    id: 6,
    name: 'Monochrome Luxe',
    subtitle: 'Black, White & Gold',
    desc: 'A sophisticated palette of black, white, and gold accents for those who appreciate the drama of contrast and the elegance of restraint.',
    image: 'https://placehold.co/1200x800/e8e4de/C8A96A?text=Oak+%26+Aura',
    tag: 'Limited Edition',
    color: '#111111',
    slug: 'sofas',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Collections() {
  return (
    <div className="collections-page">
      {/* Hero */}
      <div className="collections-hero">
        <div className="collections-hero__bg">
          <img src="https://placehold.co/1200x800/e8e4de/C8A96A?text=Oak+%26+Aura" alt="" />
          <div className="collections-hero__overlay" />
        </div>
        <div className="collections-hero__content container">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="collections-hero__eyebrow">Curated for You</span>
            <h1>Our Collections</h1>
            <p>Thoughtfully curated furniture stories for every style and space.</p>
          </motion.div>
        </div>
      </div>

      {/* Collections Grid */}
      <div className="container collections-grid">
        {COLLECTIONS.map((col, i) => (
          <motion.div
            key={col.id}
            className={`collection-card`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
          >
            <div className="collection-card__img">
              <img
                src={col.image}
                alt={col.name}
                loading="lazy"
                onError={e => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/1200x800/e8e4de/C8A96A?text=Oak+%26+Aura';
                }}
              />
              <div className="collection-card__overlay" />
            </div>
            <div className="collection-card__content">
              <span className="collection-card__tag" style={{ background: col.color }}>{col.tag}</span>
              <h2>{col.name}</h2>
              <p className="collection-card__subtitle">{col.subtitle}</p>
              <p className="collection-card__desc">{col.desc}</p>
              <Link to={`/shop?category=${col.slug}`} className="collection-card__cta">
                Shop Collection <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

