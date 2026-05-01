import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Collections from './pages/Collections';
import Lookbook from './pages/Lookbook';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';

// Page title map
const PAGE_TITLES: Record<string, string> = {
  '/': 'Oak & Aura — Furniture That Defines Your Space',
  '/shop': 'Shop | Oak & Aura',
  '/cart': 'Cart | Oak & Aura',
  '/checkout': 'Checkout | Oak & Aura',
  '/wishlist': 'Wishlist | Oak & Aura',
  '/collections': 'Collections | Oak & Aura',
  '/lookbook': 'Lookbook | Oak & Aura',
  '/about': 'About Us | Oak & Aura',
  '/contact': 'Contact | Oak & Aura',
  '/blog': 'Blog | Oak & Aura',
};

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Update page title
    const base = '/' + pathname.split('/')[1];
    const title = PAGE_TITLES[base] || 'Oak & Aura';
    document.title = title;
  }, [pathname, search]);
  return null;
}

// Back to top button
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      className="back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}

function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <CartDrawer />
      <Toast />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/lookbook" element={<Lookbook />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

function NotFound() {
  return (
    <div className="not-found-page">
      <span className="not-found-page__icon">🪑</span>
      <h1 className="not-found-page__code">404</h1>
      <p className="not-found-page__msg">This page seems to have wandered off.</p>
      <a href="/" className="btn-primary">Back to Home</a>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppProvider>
        <AppLayout />
      </AppProvider>
    </HashRouter>
  );
}
