import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Award, Users, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import './About.css';

const VALUES = [
  { icon: <Leaf size={24} />, title: 'Sustainability', desc: 'Every piece is crafted with sustainably sourced materials and eco-conscious manufacturing processes.' },
  { icon: <Award size={24} />, title: 'Craftsmanship', desc: 'We partner with skilled artisans who bring decades of expertise to every joint, finish, and detail.' },
  { icon: <Users size={24} />, title: 'Community', desc: 'We believe great design should be accessible. Our pricing reflects quality without unnecessary markup.' },
  { icon: <Globe size={24} />, title: 'Pakistan-Wide Delivery', desc: 'From Karachi to Peshawar, Lahore to Quetta — we deliver to all major cities across Pakistan.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About() {
  return (
    <div className="about-page">
      {/* Hero */}
      <div className="about-hero">
        <div className="about-hero__bg">
          <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=85&auto=format&fit=crop" alt="" />
          <div className="about-hero__overlay" />
        </div>
        <motion.div
          className="about-hero__content container"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="about-hero__eyebrow">Our Story</span>
          <h1>Furniture That<br /><em>Tells a Story</em></h1>
          <p>Founded in 2019, Oak & Aura was born from a simple belief: that beautiful, well-crafted furniture should be accessible to everyone.</p>
        </motion.div>
      </div>

      {/* Story */}
      <section className="about-story container">
        <motion.div
          className="about-story__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          <motion.div className="about-story__text" variants={fadeUp}>
            <span className="about-eyebrow">Who We Are</span>
            <h2>Transforming Spaces,<br />One Piece at a Time</h2>
            <p>Oak & Aura Furnishings was founded with a vision to bridge the gap between luxury design and everyday living. We believe your home should be a reflection of who you are — a sanctuary that inspires, comforts, and endures.</p>
            <p>Every piece in our collection is thoughtfully designed by our in-house team and crafted by skilled artisans using sustainably sourced materials. From the initial sketch to the final delivery, quality is never compromised.</p>
            <Link to="/shop" className="btn-primary">
              Explore Our Collection <ArrowRight size={16} />
            </Link>
          </motion.div>
          <motion.div className="about-story__img" variants={fadeUp}>
            <img
              src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=85&auto=format&fit=crop"
              alt="Our workshop"
              loading="lazy"
            />
            <div className="about-story__img-badge">
              <span className="about-story__img-badge-num">5+</span>
              <span>Years of Excellence</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="container about-stats__grid">
          {[
            { num: '2,400+', label: 'Happy Customers' },
            { num: '150+', label: 'Products' },
            { num: '50+', label: 'Cities Served' },
            { num: '4.9★', label: 'Average Rating' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="about-stat"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <span className="about-stat__num">{stat.num}</span>
              <span className="about-stat__label">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="about-values container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="about-section-header"
        >
          <span className="about-eyebrow">What We Stand For</span>
          <h2>Our Core Values</h2>
        </motion.div>
        <div className="about-values__grid">
          {VALUES.map((v, i) => (
            <motion.div
              key={i}
              className="about-value-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="about-value-card__icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="about-cta__bg">
          <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd3?w=1920&q=80&auto=format&fit=crop" alt="" />
          <div className="about-cta__overlay" />
        </div>
        <motion.div
          className="about-cta__content container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Ready to Transform Your Space?</h2>
          <p>Explore our full collection and find the perfect pieces for your home.</p>
          <div className="about-cta__btns">
            <Link to="/shop" className="btn-primary">Shop Now <ArrowRight size={16} /></Link>
            <Link to="/contact" className="btn-outline-white">Contact Us</Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
