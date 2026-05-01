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
            <span>🪑</span>
            <div>
              <span className="footer__logo-name">Oak & Aura</span>
              <span className="footer__logo-tagline">Furnishings</span>
            </div>
          </div>
          <p className="footer__brand-desc">
            Transforming everyday living spaces into aesthetic experiences through thoughtfully designed furniture.
          </p>
          <div className="footer__socials">
            <a href="#" aria-label="Instagram">📸</a>
            <a href="#" aria-label="Twitter">𝕏</a>
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Pinterest">📌</a>
          </div>
        </div>

        {/* Shop */}
        <div className="footer__col">
          <h4>Shop</h4>
          <ul>
            <li><Link to="/shop?category=sofas">Sofas & Sectionals</Link></li>
            <li><Link to="/shop?category=beds">Beds & Bedroom</Link></li>
            <li><Link to="/shop?category=dining">Dining Tables</Link></li>
            <li><Link to="/shop?category=office">Office Furniture</Link></li>
            <li><Link to="/shop?category=storage">Storage</Link></li>
            <li><Link to="/shop?category=decor">Decor & Lighting</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div className="footer__col">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/lookbook">Lookbook</Link></li>
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
          <h4>Stay Inspired</h4>
          <p>Get 10% off your first order and exclusive design inspiration delivered to your inbox.</p>
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
            <a href="mailto:hello@oakandaura.pk"><Mail size={14} /> hello@oakandaura.pk</a>
            <a href="tel:+922134567890"><Phone size={14} /> +92 21 3456 7890</a>
            <span><MapPin size={14} /> Plot 45, Clifton Block 5, Karachi</span>
          </div>
        </div>
      </div>

      <div className="footer__bottom container">
        <p>© 2026 Oak & Aura Furnishings. All rights reserved.</p>
        <div className="footer__bottom-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/cookies">Cookie Policy</Link>
        </div>
        <div className="footer__payment">
          <span title="JazzCash">💚</span><span title="EasyPaisa">🟠</span><span title="Bank Transfer">🏦</span><span title="Secure">🔒</span>
        </div>
      </div>
    </footer>
  );
}

