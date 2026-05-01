import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <div className="contact-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="contact-eyebrow">Get in Touch</span>
            <h1>We'd Love to Hear From You</h1>
            <p>Have a question about a product, need design advice, or want to track your order? We're here to help.</p>
          </motion.div>
        </div>
      </div>

      <div className="container contact-layout">
        {/* Info */}
        <div className="contact-info">
          <h2>Contact Information</h2>
          <p>Reach out through any of these channels and we'll get back to you within 24 hours.</p>

          <div className="contact-info__items">
            <div className="contact-info__item">
              <div className="contact-info__icon"><Mail size={20} /></div>
              <div>
                <strong>Email Us</strong>
                <a href="mailto:hello@oakandaura.pk">hello@oakandaura.pk</a>
              </div>
            </div>
            <div className="contact-info__item">
              <div className="contact-info__icon"><Phone size={20} /></div>
              <div>
                <strong>Call Us</strong>
                <a href="tel:+922134567890">+92 21 3456 7890</a>
              </div>
            </div>
            <div className="contact-info__item">
              <div className="contact-info__icon"><MapPin size={20} /></div>
              <div>
                <strong>Visit Us</strong>
                <span>Plot 45, Clifton Block 5, Karachi, Sindh</span>
              </div>
            </div>
            <div className="contact-info__item">
              <div className="contact-info__icon"><Clock size={20} /></div>
              <div>
                <strong>Business Hours</strong>
                <span>Mon–Fri: 9am–6pm PKT</span>
                <span>Sat: 10am–4pm PKT</span>
              </div>
            </div>
          </div>

          <div className="contact-info__faq">
            <h3>Frequently Asked Questions</h3>
            {[
              { q: 'What makes Oak & Aura different from other furniture stores?', a: 'We combine timeless craftsmanship with modern design sensibility. Every piece is built to last and styled to impress.' },
              { q: 'Do you offer luxury furniture options?', a: 'Yes — our premium collection features hand-finished pieces with solid wood frames, premium upholstery, and elegant detailing.' },
              { q: 'Is Oak & Aura furniture affordable?', a: 'We offer a range of price points. Quality doesn\'t have to break the bank — our mid-range line delivers exceptional value.' },
              { q: 'Do you sell sofa sets and living room furniture?', a: 'Absolutely. Our living room range includes modern sofas, sectionals, accent chairs, and complete lounge sets.' },
              { q: 'What bedroom furniture do you carry?', a: 'We carry beds, dressers, wardrobes, nightstands, and full bedroom sets — including bridal and master bedroom collections.' },
              { q: 'Can I order a dining table in a custom size?', a: 'Yes, we offer customization on select dining tables. Reach out via the contact form and our team will assist you.' },
              { q: 'Do you offer made-to-order or customized furniture?', a: 'We do. Share your dimensions, material preferences, and style — our craftsmen will build it to your exact specs.' },
              { q: 'What materials do you use?', a: 'We work with solid sheesham wood, engineered wood, premium fabric, and genuine leather depending on the collection.' },
              { q: 'Do you provide complete home furnishing solutions?', a: 'Yes — from the bedroom to the TV lounge, we can furnish your entire home with a cohesive, curated look.' },
              { q: 'How long does delivery take?', a: 'Standard delivery is 3–5 working days. For custom orders, lead time is typically 2–3 weeks.' },
              { q: 'Do you deliver nationwide?', a: 'Yes, we deliver to all major cities. Delivery charges vary by location and are calculated at checkout.' },
              { q: 'Do you offer assembly services?', a: 'Our white glove delivery includes professional assembly and room placement at no extra charge.' },
              { q: 'What is your return policy?', a: '30-day hassle-free returns on all stocked items in original condition. Custom orders are non-refundable.' },
              { q: 'Can I see the furniture before buying?', a: 'You can visit our showroom or browse detailed photos and dimensions on each product page.' },
              { q: 'How do I care for wooden furniture?', a: 'Wipe with a dry or slightly damp cloth. Avoid direct sunlight and use furniture polish every few months to maintain the finish.' },
            ].map((faq, i) => (
              <div key={i} className="contact-faq-item">
                <strong>{faq.q}</strong>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="contact-form-wrap">
          {submitted ? (
            <motion.div
              className="contact-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <CheckCircle size={48} />
              <h2>Message Sent!</h2>
              <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
              <button className="btn-primary" onClick={() => setSubmitted(false)}>Send Another Message</button>
            </motion.div>
          ) : (
            <motion.form
              className="contact-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2>Send a Message</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input value={form.name} onChange={e => update('name', e.target.value)} placeholder="John Doe" required />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="john@example.com" required />
                </div>
              </div>
              <div className="form-group">
                <label>Subject *</label>
                <select value={form.subject} onChange={e => update('subject', e.target.value)} required>
                  <option value="">Select a topic...</option>
                  <option>Order Inquiry</option>
                  <option>Product Question</option>
                  <option>Returns & Exchanges</option>
                  <option>Design Consultation</option>
                  <option>Wholesale Inquiry</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Message *</label>
                <textarea
                  value={form.message}
                  onChange={e => update('message', e.target.value)}
                  placeholder="Tell us how we can help you..."
                  rows={6}
                  required
                />
              </div>
              <button type="submit" className="btn-primary contact-submit-btn">
                <Send size={16} /> Send Message
              </button>
            </motion.form>
          )}
        </div>
      </div>
    </div>
  );
}
