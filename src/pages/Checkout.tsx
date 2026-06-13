import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, CreditCard, Lock, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { toPKR, formatPKR } from '../utils/currency';
import type { CartItem } from '../types';
import './Checkout.css';

type Step = 'info' | 'shipping' | 'payment' | 'success';

export default function Checkout() {
  const { state, dispatch, cartTotal } = useApp();
  const [step, setStep] = useState<Step>('info');
  const [payMethod, setPayMethod] = useState<'card' | 'jazzcash' | 'easypaisa'>('card');
  const orderItemsRef = useRef<CartItem[]>([]);
  const orderNumRef = useRef(`OA-${Math.floor(Math.random() * 90000) + 10000}`);

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', province: '', zip: '', country: 'Pakistan',
    cardName: '', cardNumber: '', expiry: '', cvv: '',
  });

  const pkrTotal = toPKR(cartTotal);
  const shipping = pkrTotal >= 50000 ? 0 : 500;
  const tax = Math.round(pkrTotal * 0.17); // 17% GST Pakistan
  const total = pkrTotal + shipping + tax;

  const update = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    orderItemsRef.current = [...state.cart];
    setStep('success');
    dispatch({ type: 'CLEAR_CART' });
  };

  if (state.cart.length === 0 && step !== 'success') {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty</h2>
        <Link to="/shop" className="btn-primary">Shop Now</Link>
      </div>
    );
  }

  if (step === 'success') {
    const successTotal = toPKR(orderItemsRef.current.reduce((s, i) => s + i.product.price * i.quantity, 0));
    return (
      <div className="checkout-success">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="checkout-success__card"
        >
          <div className="checkout-success__icon">
            <CheckCircle size={56} />
          </div>
          <h2>Order Confirmed!</h2>
          <p>Thank you for your purchase. Your order has been placed successfully.</p>
          <div className="checkout-success__order-num">
            Order #{orderNumRef.current}
          </div>
          <p className="checkout-success__email">
            A confirmation email has been sent to <strong>{form.email || 'your email'}</strong>
          </p>

          {/* Order summary */}
          {orderItemsRef.current.length > 0 && (
            <div className="checkout-success__summary">
              <h3>Order Summary</h3>
              {orderItemsRef.current.map(item => (
                <div key={item.product.id} className="checkout-success__summary-item">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=80'; }}
                  />
                  <div className="checkout-success__summary-info">
                    <p>{item.product.name}</p>
                    <span>Qty: {item.quantity}</span>
                  </div>
                  <span className="checkout-success__summary-price">
                    {formatPKR(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
              <div className="checkout-success__summary-total">
                <span>Total Paid</span>
                <strong>Rs. {(successTotal + Math.round(successTotal * 0.17) + (successTotal >= 50000 ? 0 : 500)).toLocaleString('en-PK')}</strong>
              </div>
            </div>
          )}

          <div className="checkout-success__actions">
            <Link to="/" className="btn-primary">Back to Home</Link>
            <Link to="/shop" className="btn-outline">Continue Shopping</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const steps = [
    { key: 'info', label: 'Information' },
    { key: 'shipping', label: 'Shipping' },
    { key: 'payment', label: 'Payment' },
  ];

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-page__header">
          <Link to="/" className="checkout-page__logo">
            <span>🪑</span> Gujrat Furniture Gulyana
          </Link>
          <div className="checkout-steps">
            {steps.map((s, i) => (
              <div key={s.key} className={`checkout-step ${step === s.key ? 'active' : ''} ${steps.findIndex(x => x.key === step) > i ? 'done' : ''}`}>
                <span className="checkout-step__num">{steps.findIndex(x => x.key === step) > i ? '✓' : i + 1}</span>
                <span>{s.label}</span>
                {i < steps.length - 1 && <span className="checkout-step__sep">›</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="checkout-layout">
          {/* Form */}
          <div className="checkout-form-wrap">
            <AnimatePresence mode="wait">
              {step === 'info' && (
                <motion.div key="info" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2>Contact Information</h2>
                  <div className="checkout-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>First Name *</label>
                        <input value={form.firstName} onChange={e => update('firstName', e.target.value)} placeholder="Ali" required />
                      </div>
                      <div className="form-group">
                        <label>Last Name *</label>
                        <input value={form.lastName} onChange={e => update('lastName', e.target.value)} placeholder="Ahmed" required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="ali@example.com" required />
                    </div>
                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+92 300 1234567" required />
                    </div>
                    <button
                      className="btn-primary checkout-next-btn"
                      onClick={() => setStep('shipping')}
                      disabled={!form.firstName || !form.lastName || !form.email}
                    >
                      Continue to Shipping
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 'shipping' && (
                <motion.div key="shipping" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2>Delivery Address</h2>
                  <div className="checkout-form">
                    <div className="form-group">
                      <label>Street Address *</label>
                      <input value={form.address} onChange={e => update('address', e.target.value)} placeholder="House 12, Street 5, Block B" required />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>City *</label>
                        <div className="form-select-wrap">
                          <select value={form.city} onChange={e => update('city', e.target.value)} required>
                            <option value="">Select city...</option>
                            <option>Karachi</option>
                            <option>Lahore</option>
                            <option>Islamabad</option>
                            <option>Rawalpindi</option>
                            <option>Faisalabad</option>
                            <option>Multan</option>
                            <option>Peshawar</option>
                            <option>Quetta</option>
                            <option>Sialkot</option>
                            <option>Hyderabad</option>
                            <option>Gujranwala</option>
                            <option>Abbottabad</option>
                          </select>
                          <ChevronDown size={16} />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Province *</label>
                        <div className="form-select-wrap">
                          <select value={form.province} onChange={e => update('province', e.target.value)} required>
                            <option value="">Select province...</option>
                            <option>Sindh</option>
                            <option>Punjab</option>
                            <option>KPK</option>
                            <option>Balochistan</option>
                            <option>Islamabad Capital Territory</option>
                            <option>Gilgit-Baltistan</option>
                            <option>AJK</option>
                          </select>
                          <ChevronDown size={16} />
                        </div>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Postal Code</label>
                        <input value={form.zip} onChange={e => update('zip', e.target.value)} placeholder="75500" />
                      </div>
                      <div className="form-group">
                        <label>Country</label>
                        <div className="form-select-wrap">
                          <select value={form.country} onChange={e => update('country', e.target.value)}>
                            <option>Pakistan</option>
                          </select>
                          <ChevronDown size={16} />
                        </div>
                      </div>
                    </div>

                    <div className="checkout-shipping-options">
                      <h3>Shipping Method</h3>
                      <label className="shipping-option active">
                        <input type="radio" name="shipping" defaultChecked />
                        <div>
                          <strong>Standard Delivery</strong>
                          <span>3–5 working days</span>
                        </div>
                        <span className="shipping-option__price">{shipping === 0 ? 'FREE' : 'Rs. 500'}</span>
                      </label>
                      <label className="shipping-option">
                        <input type="radio" name="shipping" />
                        <div>
                          <strong>Express Delivery</strong>
                          <span>1–2 working days</span>
                        </div>
                        <span className="shipping-option__price">Rs. 1,500</span>
                      </label>
                      <label className="shipping-option">
                        <input type="radio" name="shipping" />
                        <div>
                          <strong>White Glove Delivery</strong>
                          <span>Scheduled + room placement</span>
                        </div>
                        <span className="shipping-option__price">Rs. 3,000</span>
                      </label>
                    </div>

                    <div className="checkout-form__nav">
                      <button className="btn-outline" onClick={() => setStep('info')}>← Back</button>
                      <button
                        className="btn-primary checkout-next-btn"
                        onClick={() => setStep('payment')}
                        disabled={!form.address || !form.city || !form.province}
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 'payment' && (
                <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h2>Payment</h2>
                  <div className="checkout-form">
                    <div className="payment-methods">
                      {(['card', 'jazzcash', 'easypaisa'] as const).map(m => (
                        <button
                          key={m}
                          className={`payment-method-btn ${payMethod === m ? 'active' : ''}`}
                          onClick={() => setPayMethod(m)}
                        >
                          {m === 'card' && <><CreditCard size={18} /> Debit/Credit Card</>}
                          {m === 'jazzcash' && <><span>💚</span> JazzCash</>}
                          {m === 'easypaisa' && <><span>🟠</span> EasyPaisa</>}
                        </button>
                      ))}
                    </div>

                    {payMethod === 'card' && (
                      <form onSubmit={handlePlaceOrder}>
                        <div className="form-group">
                          <label>Name on Card *</label>
                          <input value={form.cardName} onChange={e => update('cardName', e.target.value)} placeholder="Ali Ahmed" required />
                        </div>
                        <div className="form-group">
                          <label>Card Number *</label>
                          <div className="card-input-wrap">
                            <input
                              value={form.cardNumber}
                              onChange={e => update('cardNumber', e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim())}
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                              required
                            />
                            <CreditCard size={18} />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group">
                            <label>Expiry Date *</label>
                            <input value={form.expiry} onChange={e => update('expiry', e.target.value)} placeholder="MM/YY" maxLength={5} required />
                          </div>
                          <div className="form-group">
                            <label>CVV *</label>
                            <input value={form.cvv} onChange={e => update('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="123" maxLength={4} required />
                          </div>
                        </div>
                        <div className="checkout-secure-note">
                          <Lock size={14} /> Your payment info is encrypted and secure
                        </div>
                        <div className="checkout-form__nav">
                          <button type="button" className="btn-outline" onClick={() => setStep('shipping')}>← Back</button>
                          <button type="submit" className="btn-primary checkout-next-btn">
                            Place Order — Rs. {total.toLocaleString('en-PK')}
                          </button>
                        </div>
                      </form>
                    )}

                    {payMethod !== 'card' && (
                      <div className="payment-alt">
                        <p>You will be redirected to {payMethod === 'jazzcash' ? 'JazzCash' : 'EasyPaisa'} to complete your purchase.</p>
                        <div className="checkout-form__nav">
                          <button className="btn-outline" onClick={() => setStep('shipping')}>← Back</button>
                          <button className="btn-primary checkout-next-btn" onClick={handlePlaceOrder as unknown as React.MouseEventHandler}>
                            Continue with {payMethod === 'jazzcash' ? 'JazzCash' : 'EasyPaisa'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="checkout-summary">
            <h3>Order Summary</h3>
            <div className="checkout-summary__items">
              {state.cart.map(item => (
                <div key={item.product.id} className="checkout-summary__item">
                  <div className="checkout-summary__item-img">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&q=80'; }}
                    />
                    <span className="checkout-summary__item-qty">{item.quantity}</span>
                  </div>
                  <div className="checkout-summary__item-info">
                    <p>{item.product.name}</p>
                    <span>{item.product.category}</span>
                  </div>
                  <span className="checkout-summary__item-price">
                    Rs. {toPKR(item.product.price * item.quantity).toLocaleString('en-PK')}
                  </span>
                </div>
              ))}
            </div>
            <div className="checkout-summary__totals">
              <div><span>Subtotal</span><span>Rs. {pkrTotal.toLocaleString('en-PK')}</span></div>
              <div><span>Shipping</span><span className={shipping === 0 ? 'free' : ''}>{shipping === 0 ? 'FREE' : 'Rs. 500'}</span></div>
              <div><span>GST (17%)</span><span>Rs. {tax.toLocaleString('en-PK')}</span></div>
              <div className="checkout-summary__total"><span>Total</span><span>Rs. {total.toLocaleString('en-PK')}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
