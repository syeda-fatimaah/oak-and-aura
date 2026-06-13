import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      <div className="footer__top container">
        {/* Brand */}
        <div className="footer__brand">
          <div className="footer__logo">
            <span>🛋️</span>
            <div>
              <span className="footer__logo-name">Gujrat Furniture</span>
              <span className="footer__logo-tagline">Gulyana</span>
            </div>
          </div>
          <p className="footer__brand-desc">
            Your trusted destination for quality furniture in Gulyana. We bring comfort and style to your home with our wide range of premium furniture.
          </p>
          <div className="footer__socials">
            <a href="https://www.facebook.com/people/Gujrati-Furniture-Gulyana/100093797471240/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">📘</a>
            <a href="https://wa.me/923480444147" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">💬</a>
            <a href="#" aria-label="Instagram">📸</a>
          </div>
        </div>

        {/* Shop */}
        <div className="footer__col">
          <h4>Shop</h4>
          <ul>
            <li><Link to="/shop?category=sofas">Sofas & Sectionals</Link></li>
            <li><Link to="/shop?category=beds">Beds & Bedroom</Link></li>
            <li><Link to="/shop?category=storage">Dressing Tables</Link></li>
            <li><Link to="/shop">All Products</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div className="footer__col">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/lookbook">Gallery</Link></li>
            <li><Link to="/collections">Collections</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer__col">
          <h4>Support</h4>
          <ul>
            <li><Link to="/contact">Help Center</Link></li>
            <li><Link to="/contact">Track Order</Link></li>
            <li><Link to="/contact">Returns & Exchanges</Link></li>
            <li><Link to="/contact">Shipping Info</Link></li>
            <li><Link to="/contact">Care Guide</Link></li>
            <li><Link to="/contact">Warranty</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer__newsletter">
          <h4>Stay Connected</h4>
          <p>Subscribe to get updates on new arrivals and special offers.</p>
          {subscribed ? (
            <div className="footer__subscribed">
              <span>✓</span> Thank you for subscribing!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="footer__newsletter-form">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                aria-label="Email for newsletter"
              />
              <button type="submit" aria-label="Subscribe">
                <ArrowRight size={18} />
              </button>
            </form>
          )}
          <div className="footer__contact-info">
            <a href="tel:+923480444147"><Phone size={14} /> 0348 0444147</a>
            <span><MapPin size={14} /> Naseera Road, Gulyana, Kharian</span>
            <span style={{ marginTop: '8px', fontSize: '0.9em', opacity: 0.9 }}>Abdul Rahman - Proprietor</span>
          </div>
        </div>
      </div>

      <div className="footer__bottom container">
        <p>© 2026 Gujrat Furniture Gulyana. All rights reserved.</p>
        <div className="footer__bottom-links">
          <Link to="/contact">Privacy Policy</Link>
          <Link to="/contact">Terms of Service</Link>
          <Link to="/contact">Cookie Policy</Link>
        </div>
        <div className="footer__payment">
          <span title="JazzCash">💚</span><span title="EasyPaisa">🟠</span><span title="Bank Transfer">🏦</span><span title="Secure">🔒</span>
        </div>
      </div>
    </footer>
  );
}

