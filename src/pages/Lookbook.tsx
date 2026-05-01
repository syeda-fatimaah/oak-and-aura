import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Lookbook.css';

const LOOKBOOK_ITEMS = [
  { id: 1, title: 'Nordic Living Room', category: 'Living Room', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=85&auto=format&fit=crop', products: ['Nordic Oak Sofa', 'Travertine Coffee Table', 'Arched Floor Lamp'], slug: 'sofas' },
  { id: 2, title: 'Serene Bedroom Retreat', category: 'Bedroom', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=85&auto=format&fit=crop', products: ['Aria Platform Bed', 'Geometric Mirror', 'Linen Throw Blanket'], slug: 'beds' },
  { id: 3, title: 'Dining in Style', category: 'Dining Room', image: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=800&q=85&auto=format&fit=crop', products: ['Harvest Dining Table', 'Nordic Dining Chair Set', 'Rattan Pendant Light'], slug: 'dining' },
  { id: 4, title: 'The Modern Office', category: 'Home Office', image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=85&auto=format&fit=crop', products: ['Executive Oak Desk', 'Ergonomic Task Chair', 'Floating Wall Shelf System'], slug: 'office' },
  { id: 5, title: 'Bohemian Corner', category: 'Decor', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=85&auto=format&fit=crop', products: ['Rattan Storage Cabinet', 'Ceramic Vase Collection', 'Woven Wall Tapestry'], slug: 'decor' },
  { id: 6, title: 'Minimal Luxury', category: 'Living Room', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd3?w=800&q=85&auto=format&fit=crop', products: ['Curved Bouclé Sofa', 'Wool Area Rug', 'Scented Candle Set'], slug: 'sofas' },
  { id: 7, title: 'Velvet Dreams', category: 'Bedroom', image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=85&auto=format&fit=crop', products: ['Cloud Upholstered Bed', 'Japandi Sideboard', 'Arched Floor Lamp'], slug: 'beds' },
  { id: 8, title: 'Marble & Brass', category: 'Dining Room', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=85&auto=format&fit=crop', products: ['Marble Top Dining Table', 'Velvet Dining Chair', 'Geometric Mirror'], slug: 'dining' },
  { id: 9, title: 'Canopy Sanctuary', category: 'Bedroom', image: 'https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?w=800&q=85&auto=format&fit=crop', products: ['Oak Canopy Bed Frame', 'Modular Bookcase System', 'Rattan Pendant Light'], slug: 'beds' },
];

export default function Lookbook() {
  const [selected, setSelected] = useState<typeof LOOKBOOK_ITEMS[0] | null>(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(LOOKBOOK_ITEMS.map(i => i.category)))];
  const filtered = filter === 'All' ? LOOKBOOK_ITEMS : LOOKBOOK_ITEMS.filter(i => i.category === filter);

  // Lock body scroll when lightbox is open
  const openLightbox = (item: typeof LOOKBOOK_ITEMS[0]) => {
    setSelected(item);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelected(null);
    document.body.style.overflow = '';
  };

  return (
    <div className="lookbook-page">
      {/* Hero */}
      <div className="lookbook-hero">
        <img src="https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1920&q=85&auto=format&fit=crop" alt="Lookbook hero" />
        <div className="lookbook-hero__overlay" />
        <motion.div
          className="lookbook-hero__content container"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="lookbook-hero__eyebrow">2026 Collection</span>
          <h1>The Lookbook</h1>
          <p>Discover how our pieces come together to create beautiful, liveable spaces.</p>
        </motion.div>
      </div>

      <div className="container">
        {/* Filter */}
        <div className="lookbook-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`lookbook-filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div className="lookbook-grid" layout>
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                className={`lookbook-item ${i % 5 === 0 ? 'lookbook-item--tall' : ''}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => openLightbox(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  onError={e => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80';
                  }}
                />
                <div className="lookbook-item__overlay">
                  <span className="lookbook-item__category">{item.category}</span>
                  <h3>{item.title}</h3>
                  <span className="lookbook-item__cta">View Room <ArrowRight size={14} /></span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="lookbook-lightbox-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => closeLightbox()}
            />
            <motion.div
              className="lookbook-lightbox"
              initial={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
              animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
              exit={{ opacity: 0, scale: 0.9, x: '-50%', y: '-50%' }}
            >
              <button className="lookbook-lightbox__close" onClick={() => closeLightbox()} aria-label="Close">
                <X size={20} />
              </button>
              <div className="lookbook-lightbox__img">
                <img src={selected.image} alt={selected.title} />
              </div>
              <div className="lookbook-lightbox__info">
                <span className="lookbook-lightbox__category">{selected.category}</span>
                <h2>{selected.title}</h2>
                <p>Featured in this room:</p>
                <ul>
                  {selected.products.map(p => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <Link to={`/shop?category=${selected.slug}`} className="btn-primary" onClick={() => closeLightbox()}>
                  Shop This Look <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
