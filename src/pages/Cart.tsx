import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { toPKR } from '../utils/currency';
import './Cart.css';

const PROMO_CODES: Record<string, number> = {
  WELCOME10: 10,
  OAK20: 20,
  AURA15: 15,
};

export default function Cart() {
  const { state, dispatch, cartTotal, removeFromCart } = useApp();
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  const pkrTotal = toPKR(cartTotal);
  const discountAmount = appliedPromo ? Math.round(pkrTotal * appliedPromo.discount / 100) : 0;
  const discountedTotal = pkrTotal - discountAmount;
  const shipping = discountedTotal >= 50000 ? 0 : 500;
  const tax = Math.round(discountedTotal * 0.17);
  const total = discountedTotal + shipping + tax;

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setAppliedPromo({ code, discount: PROMO_CODES[code] });
      setPromoError('');
      setPromoInput('');
    } else {
      setPromoError('Invalid promo code. Try WELCOME10, OAK20, or AURA15.');
      setAppliedPromo(null);
    }
  };

  if (state.cart.length === 0) {
    return (
      <div className="cart-empty-page">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="cart-empty-page__content"
        >
          <ShoppingBag size={64} strokeWidth={1} />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet. Explore our beautiful furniture collection.</p>
          <Link to="/shop" className="btn-primary">
            Start Shopping <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-page__title">Shopping Cart</h1>
        <p className="cart-page__count">{state.cart.reduce((s, i) => s + i.quantity, 0)} items</p>

        <div className="cart-page__layout">
          {/* Items */}
          <div className="cart-page__items">
            <div className="cart-page__items-header">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>

            <AnimatePresence>
              {state.cart.map(item => (
                <motion.div
                  key={item.product.id}
                  className="cart-page__item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3 }}
                  layout
                >
                  <div className="cart-page__item-product">
                    <Link to={`/product/${item.product.id}`}>
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        onError={e => {
                          (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/img7/800/600';
                        }}
                      />
                    </Link>
                    <div className="cart-page__item-info">
                      <Link to={`/product/${item.product.id}`}>
                        <h3>{item.product.name}</h3>
                      </Link>
                      <p>{item.product.category}</p>
                      <p className="cart-page__item-material">{item.product.material}</p>
                      {item.selectedColor && (
                        <span
                          className="cart-page__item-color"
                          style={{ background: item.selectedColor }}
                          title={`Color: ${item.selectedColor}`}
                        />
                      )}
                      <button
                        className="cart-page__item-remove"
                        onClick={() => removeFromCart(item.product.id)}
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </div>

                  <div className="cart-page__item-price">
                    Rs. {toPKR(item.product.price).toLocaleString('en-PK')}
                  </div>

                  <div className="cart-page__item-qty">
                    <button
                      onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.product.id, quantity: item.quantity - 1 } })}
                      aria-label="Decrease"
                    >
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.product.id, quantity: item.quantity + 1 } })}
                      aria-label="Increase"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="cart-page__item-total">
                    Rs. {toPKR(item.product.price * item.quantity).toLocaleString('en-PK')}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="cart-page__actions">
              <Link to="/shop" className="btn-outline">
                ← Continue Shopping
              </Link>
              <button
                className="cart-page__clear"
                onClick={() => dispatch({ type: 'CLEAR_CART' })}
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="cart-page__summary">
            <h2>Order Summary</h2>

            <div className="cart-page__summary-rows">
              <div className="cart-page__summary-row">
                <span>Subtotal</span>
                <span>Rs. {pkrTotal.toLocaleString('en-PK')}</span>
              </div>
              {appliedPromo && (
                <div className="cart-page__summary-row cart-page__summary-row--discount">
                  <span>Discount ({appliedPromo.code} -{appliedPromo.discount}%)</span>
                  <span>− Rs. {discountAmount.toLocaleString('en-PK')}</span>
                </div>
              )}
              <div className="cart-page__summary-row">
                <span>Delivery</span>
                <span className={shipping === 0 ? 'free' : ''}>
                  {shipping === 0 ? 'FREE' : 'Rs. 500'}
                </span>
              </div>
              <div className="cart-page__summary-row">
                <span>GST (17%)</span>
                <span>Rs. {tax.toLocaleString('en-PK')}</span>
              </div>
            </div>

            {shipping > 0 && (
              <div className="cart-page__free-shipping">
                <Truck size={14} />
                Add Rs. {(50000 - discountedTotal).toLocaleString('en-PK')} more for free delivery
              </div>
            )}

            {/* Promo Code */}
            <div className="cart-page__promo">
              {appliedPromo ? (
                <div className="cart-page__promo-applied">
                  <Tag size={14} />
                  <span><strong>{appliedPromo.code}</strong> applied — {appliedPromo.discount}% off!</span>
                  <button onClick={() => setAppliedPromo(null)} aria-label="Remove promo">✕</button>
                </div>
              ) : (
                <>
                  <div className="cart-page__promo-input">
                    <Tag size={16} />
                    <input
                      type="text"
                      placeholder="Promo code"
                      value={promoInput}
                      onChange={e => { setPromoInput(e.target.value); setPromoError(''); }}
                      onKeyDown={e => e.key === 'Enter' && handleApplyPromo()}
                      aria-label="Promo code"
                    />
                    <button onClick={handleApplyPromo}>Apply</button>
                  </div>
                  {promoError && <p className="cart-page__promo-error">{promoError}</p>}
                </>
              )}
            </div>

            <div className="cart-page__summary-total">
              <span>Total</span>
              <span>Rs. {total.toLocaleString('en-PK')}</span>
            </div>

            <Link to="/checkout" className="btn-primary cart-page__checkout-btn">
              Proceed to Checkout <ArrowRight size={18} />
            </Link>

            <div className="cart-page__secure">
              🔒 Secure checkout — SSL encrypted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Truck({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="3" width="15" height="13" rx="1"/>
      <path d="M16 8h4l3 3v5h-7V8z"/>
      <circle cx="5.5" cy="18.5" r="2.5"/>
      <circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  );
}


