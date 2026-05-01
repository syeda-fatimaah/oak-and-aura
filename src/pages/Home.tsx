import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Star, Package, RefreshCw, Truck, Shield } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { products, categories } from '../data/products';
import { formatPKR } from '../utils/currency';
import ProductCard from '../components/ProductCard';
import QuickView from '../components/QuickView';
import type { Product } from '../types';
import './Home.css';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&auto=format',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&auto=format',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&auto=format',
];

const TESTIMONIALS = [
  { name: 'Ayesha R.', location: 'Karachi, Sindh', rating: 5, text: 'The Nordic Oak Sofa completely transformed my drawing room. The quality is exceptional and it arrived perfectly on time. Absolutely love it!' },
  { name: 'Usman K.', location: 'Lahore, Punjab', rating: 5, text: 'Oak & Aura has the most beautiful furniture I have ever seen. The Aria Platform Bed is stunning and incredibly comfortable. Worth every rupee!' },
  { name: 'Sana M.', location: 'Islamabad', rating: 5, text: 'Fast delivery, beautiful packaging, and the Harvest Dining Table is even more gorgeous in person. My guests always compliment it.' },
  { name: 'Bilal T.', location: 'Faisalabad, Punjab', rating: 4, text: 'Great quality and design. The Japandi Sideboard fits perfectly in my hallway. Customer service was also very helpful.' },
];

const CATEGORY_IMAGES: Record<string, string> = {
  sofas:   'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format',
  beds:    'https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?w=600&auto=format',
  dining:  'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&auto=format',
  office:  'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&auto=format',
  storage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&auto=format',
  decor:   'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&auto=format',
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex(i => (i + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrolled * 0.4}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const bestSellers = products.filter(p => p.badge === 'Bestseller' || p.rating >= 4.8).slice(0, 8);
  const newArrivals = products.filter(p => p.badge === 'New').slice(0, 4);

  return (
    <div className="home">
      {/* ===== HERO ===== */}
      <section className="hero" aria-label="Hero">
        <div className="hero__bg-wrap" ref={heroRef}>
          {HERO_IMAGES.map((img, i) => (
            <div
              key={i}
              className={`hero__bg ${i === heroIndex ? 'active' : ''}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          <div className="hero__overlay" />
        </div>

        <div className="hero__content container">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero__text"
          >
            <span className="hero__eyebrow">New Collection 2026</span>
            <h1 className="hero__title">
              Furniture That<br />
              <em>Defines Your Space</em>
            </h1>
            <p className="hero__subtitle">Minimal. Modern. Timeless.</p>
            <div className="hero__ctas">
              <Link to="/shop" className="btn-primary hero__cta-primary">
                Shop Collection <ArrowRight size={18} />
              </Link>
              <Link to="/lookbook" className="btn-outline-white">
                Explore Lookbook
              </Link>
            </div>
          </motion.div>

          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-num">2,400+</span>
              <span className="hero__stat-label">Happy Customers</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-num">150+</span>
              <span className="hero__stat-label">Products</span>
            </div>
            <div className="hero__stat hero__stat--last">
              <span className="hero__stat-num">4.9 <span className="hero__stat-star">★</span></span>
              <span className="hero__stat-label">Average Rating</span>
            </div>
          </div>
        </div>

        <div className="hero__indicators">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              className={`hero__indicator ${i === heroIndex ? 'active' : ''}`}
              onClick={() => setHeroIndex(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ===== MARQUEE STRIP ===== */}
      <div className="marquee-strip">
        <div className="marquee-track">
          {['Free Delivery Over Rs. 50,000', 'Premium Materials', 'Easy Returns', '2-Year Warranty', 'Sustainable Sourcing', 'Expert Craftsmanship', 'Free Delivery Over Rs. 50,000', 'Premium Materials', 'Easy Returns', '2-Year Warranty', 'Sustainable Sourcing', 'Expert Craftsmanship'].map((text, i) => (
            <span key={i}>{text} <span className="marquee-dot">✦</span></span>
          ))}
        </div>
      </div>

      {/* ===== CATEGORIES ===== */}
      <section className="section categories-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="section-header"
          >
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Explore our curated furniture collections</p>
          </motion.div>

          <motion.div
            className="categories-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
          >
            {categories.map(cat => (
              <motion.div key={cat.slug} variants={fadeUp}>
                <Link to={`/shop?category=${cat.slug}`} className="category-card">
                  <div className="category-card__img-wrap">
                    <img
                      src={CATEGORY_IMAGES[cat.slug]}
                      alt={cat.name}
                      loading="lazy"
                      onError={e => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format';
                      }}
                    />
                    <div className="category-card__overlay" />
                  </div>
                  <div className="category-card__info">
                    <span className="category-card__icon">{cat.icon}</span>
                    <h3>{cat.name}</h3>
                    <p>{cat.description}</p>
                    <span className="category-card__link">Shop Now <ArrowRight size={14} /></span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== BEST SELLERS ===== */}
      <section className="section bestsellers-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="section-header section-header--flex"
          >
            <div>
              <h2 className="section-title">Best Sellers</h2>
              <p className="section-subtitle">Our most loved pieces</p>
            </div>
            <Link to="/shop" className="btn-outline">View All <ArrowRight size={16} /></Link>
          </motion.div>

          <motion.div
            className="products-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
          >
            {bestSellers.map(product => (
              <motion.div key={product.id} variants={fadeUp}>
                <ProductCard product={product} onQuickView={setQuickViewProduct} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== LIFESTYLE BANNER ===== */}
      <section className="lifestyle-banner">
        <div className="lifestyle-banner__img">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&auto=format"
            alt="Luxury living room interior"
            loading="lazy"
          />
          <div className="lifestyle-banner__overlay" />
        </div>
        <motion.div
          className="lifestyle-banner__content container"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="lifestyle-banner__eyebrow">The Oak & Aura Way</span>
          <h2>Design Spaces That<br /><em>Feel Like Home</em></h2>
          <p>Every piece in our collection is thoughtfully designed to bring warmth, elegance, and functionality to your living spaces. Prices start from {formatPKR(89)}.</p>
          <Link to="/lookbook" className="btn-primary">
            View Lookbook <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>

      {/* ===== NEW ARRIVALS ===== */}
      <section className="section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="section-header section-header--flex"
          >
            <div>
              <h2 className="section-title">New Arrivals</h2>
              <p className="section-subtitle">Fresh designs just landed</p>
            </div>
            <Link to="/shop?badge=new" className="btn-outline">See All New <ArrowRight size={16} /></Link>
          </motion.div>

          <motion.div
            className="products-grid products-grid--4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
          >
            {newArrivals.map(product => (
              <motion.div key={product.id} variants={fadeUp}>
                <ProductCard product={product} onQuickView={setQuickViewProduct} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="section why-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="section-header"
          >
            <h2 className="section-title">Why Oak & Aura</h2>
            <p className="section-subtitle">We believe great furniture should be accessible to everyone</p>
          </motion.div>

          <motion.div
            className="why-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              { icon: <Package size={28} />, title: 'Premium Materials', desc: 'Sustainably sourced solid wood, premium fabrics, and quality metals that last a lifetime.' },
              { icon: <Star size={28} />, title: 'Modern Designs', desc: 'Curated by expert designers to bring timeless aesthetics to contemporary living.' },
              { icon: <Truck size={28} />, title: 'Pakistan-Wide Delivery', desc: 'Karachi, Lahore, Islamabad, Peshawar — we deliver to all major cities across Pakistan.' },
              { icon: <RefreshCw size={28} />, title: 'Easy Returns', desc: "30-day hassle-free returns. If you're not in love with it, we'll make it right." },
              { icon: <Shield size={28} />, title: '2-Year Warranty', desc: 'Every piece comes with a comprehensive 2-year warranty for complete peace of mind.' },
              { icon: <span style={{ fontSize: '1.5rem' }}>🌱</span>, title: 'Sustainable', desc: 'Eco-friendly practices from sourcing to packaging and delivery.' },
            ].map((item, i) => (
              <motion.div key={i} className="why-card" variants={fadeUp}>
                <div className="why-card__icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section testimonials-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="section-header"
          >
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">Real stories from real homes</p>
          </motion.div>

          <div className="testimonials-slider">
            <div className="testimonials-track" style={{ transform: `translateX(-${testimonialIndex * 100}%)` }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="testimonial-card">
                  <div className="testimonial-card__stars">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} size={16} fill="#C8A96A" stroke="#C8A96A" />
                    ))}
                  </div>
                  <p className="testimonial-card__text">"{t.text}"</p>
                  <div className="testimonial-card__author">
                    <div className="testimonial-card__avatar">{t.name.charAt(0)}</div>
                    <div>
                      <strong>{t.name}</strong>
                      <span>{t.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="testimonials-controls">
              <button
                onClick={() => setTestimonialIndex(i => Math.max(0, i - 1))}
                disabled={testimonialIndex === 0}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="testimonials-dots">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    className={`testimonials-dot ${i === testimonialIndex ? 'active' : ''}`}
                    onClick={() => setTestimonialIndex(i)}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setTestimonialIndex(i => Math.min(TESTIMONIALS.length - 1, i + 1))}
                disabled={testimonialIndex === TESTIMONIALS.length - 1}
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <NewsletterSection />

      {/* Quick View Modal */}
      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-section__bg">
        <img
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&auto=format"
          alt=""
          aria-hidden="true"
        />
        <div className="newsletter-section__overlay" />
      </div>
      <motion.div
        className="newsletter-section__content container"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="newsletter-section__eyebrow">Join the Community</span>
        <h2>Get 10% Off Your First Order</h2>
        <p>Subscribe for exclusive offers, design inspiration, and early access to new collections.</p>
        {submitted ? (
          <div className="newsletter-section__success">
            <span>✓</span> Welcome to Oak & Aura! Check your inbox for your discount code.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="newsletter-section__form">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              aria-label="Email address"
            />
            <button type="submit" className="btn-primary">
              Subscribe <ArrowRight size={16} />
            </button>
          </form>
        )}
        <p className="newsletter-section__privacy">No spam, ever. Unsubscribe at any time.</p>
      </motion.div>
    </section>
  );
}
