import {ArrowLeft, ArrowRight, CheckCircle, LockKeyhole, Loader2, Minus, Plus, ShieldCheck, ShoppingBag, Truck} from 'lucide-react';
import {useState} from 'react';
import {BOX_ITEMS, MAX_ORDER_QUANTITY, PRODUCT, PRODUCT_PATH, SITE} from '../data/catalog';
import {useStore} from '../context/StoreContext';
import {format} from '../lib/format';
import {go} from '../hooks/useRoute';
import {createRazorpayOrder, loadRazorpayScript, RAZORPAY_KEY_ID, verifyRazorpayPayment} from '../lib/razorpay';
import './Checkout.css';

const initialForm = {name: '', email: '', phone: '', pincode: '', address: '', city: '', state: ''};

export function Checkout() {
  const {cart, subtotal, setQty, clearCart} = useStore();
  const qty = cart[PRODUCT.id] || 0;
  const total = subtotal;
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);
  const [pendingPayment, setPendingPayment] = useState(null);

  const update = event => {
    const {name, value} = event.target;
    const nextValue = name === 'phone' || name === 'pincode' ? value.replace(/\D/g, '') : value;
    setForm(current => ({...current, [name]: nextValue}));
    if (error && !pendingPayment) setError('');
  };

  const payNow = async event => {
    event.preventDefault();
    if (loading || pendingPayment) return;
    setError('');
    if (!qty) return;
    const customer = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, value.trim()]));
    const invalidField = ['name', 'address', 'city', 'state'].find(key => customer[key].length < (key === 'address' ? 5 : 2));
    if (invalidField) {
      setError('Please enter a complete name and delivery address.');
      event.currentTarget.elements.namedItem(invalidField)?.focus();
      return;
    }
    setLoading(true);
    try {
      const scriptReady = await loadRazorpayScript();
      if (!scriptReady) throw new Error('Payment could not open. Check your connection and try again.');
      const order = await createRazorpayOrder({quantity: qty, customer});
      if (!order.publicKey && !RAZORPAY_KEY_ID) throw new Error('Online payment is temporarily unavailable. Please try again later.');
      const payment = await new Promise((resolve, reject) => {
        const razorpay = new window.Razorpay({
          key: order.publicKey || RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency || 'INR',
          name: SITE.name,
          description: `${PRODUCT.name} Pre-Order`,
          order_id: order.orderId,
          prefill: {name: customer.name, email: customer.email, contact: customer.phone},
          notes: {address: customer.address, city: customer.city, state: customer.state, pincode: customer.pincode},
          theme: {color: '#ff2a9a'},
          handler: resolve,
          modal: {ondismiss: () => reject(new Error('Payment window closed. Your order has not been confirmed.'))}
        });
        razorpay.on('payment.failed', response => {
          reject(new Error(response?.error?.description || 'Payment failed. Please try again.'));
        });
        razorpay.open();
      });
      try {
        const verified = await verifyRazorpayPayment(payment);
        clearCart();
        setSuccess({paymentId: verified.paymentId || payment.razorpay_payment_id});
      } catch {
        setPendingPayment(payment);
        setError(`Payment was submitted, but confirmation is pending. Keep payment ID ${payment.razorpay_payment_id} and retry confirmation below. Please do not pay again.`);
      }
    } catch (paymentError) {
      const message = paymentError.message || '';
      setError(message.includes('configured') ? 'Online payment is temporarily unavailable. Please try again later.' : message || 'Payment could not be completed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const retryConfirmation = async () => {
    if (!pendingPayment || loading) return;
    setLoading(true);
    try {
      const verified = await verifyRazorpayPayment(pendingPayment);
      clearCart();
      setSuccess({paymentId: verified.paymentId || pendingPayment.razorpay_payment_id});
    } catch {
      setError(`Confirmation is still pending for payment ID ${pendingPayment.razorpay_payment_id}. Please do not pay again.`);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="page checkout-success-page">
        <section className="checkout-success-card">
          <CheckCircle />
          <p className="secondary-kicker">PAYMENT VERIFIED</p>
          <h1>Pre-order confirmed.</h1>
          <p>Your payment is verified successfully. Payment ID: <b>{success.paymentId}</b></p>
          <button className="secondary-preorder-btn" onClick={() => go('/')}>BACK TO DROP <ArrowRight size={19} /></button>
        </section>
      </main>
    );
  }

  if (!qty) {
    return (
      <main className="page checkout-empty-page">
        <section className="checkout-empty-card">
          <ShoppingBag aria-hidden="true" />
          <h1>Your cart is empty.</h1>
          <p>Add the Collector’s Box to begin your pre-order.</p>
          <button type="button" onClick={() => go(PRODUCT_PATH)}>View Collector’s Box <ArrowRight size={18} /></button>
        </section>
      </main>
    );
  }

  return (
    <main className="page checkout-page">
      <div className="checkout-shell">
        <div className="checkout-heading">
          <button className="checkout-back" type="button" onClick={() => go('/cart')}><ArrowLeft size={16} /> Back to cart</button>
          <p className="checkout-step">ONE STEP CHECKOUT</p>
          <h1>Almost yours.</h1>
          <p>Enter your details, review your total, and pay securely.</p>
        </div>

        <div className="checkout-grid">
          <form className="checkout-form" onSubmit={payNow}>
            <section className="checkout-section" aria-labelledby="checkout-contact-title">
              <div className="checkout-section-heading">
                <span className="checkout-section-number">01</span>
                <div><h2 id="checkout-contact-title">Contact details</h2><p>We’ll use these for your order and delivery updates.</p></div>
              </div>
              <div className="checkout-fields">
                <label className="checkout-field checkout-field-wide" htmlFor="checkout-name">Full name
                  <input id="checkout-name" name="name" value={form.name} onChange={update} required minLength="2" autoComplete="name" placeholder="As on your delivery address" />
                </label>
                <label className="checkout-field" htmlFor="checkout-email">Email address
                  <input id="checkout-email" name="email" value={form.email} onChange={update} required type="email" autoComplete="email" placeholder="you@example.com" />
                </label>
                <label className="checkout-field" htmlFor="checkout-phone">Mobile number
                  <input id="checkout-phone" name="phone" value={form.phone} onChange={update} required type="tel" inputMode="numeric" pattern="[0-9]{10}" maxLength="10" title="Enter a 10-digit mobile number" autoComplete="tel-national" placeholder="10-digit mobile number" />
                </label>
              </div>
            </section>

            <section className="checkout-section" aria-labelledby="checkout-delivery-title">
              <div className="checkout-section-heading">
                <span className="checkout-section-number">02</span>
                <div><h2 id="checkout-delivery-title">Delivery address</h2><p>Where should we send your Collector’s Box?</p></div>
              </div>
              <div className="checkout-fields">
                <label className="checkout-field checkout-field-wide" htmlFor="checkout-address">House number, street and area
                  <input id="checkout-address" name="address" value={form.address} onChange={update} required minLength="5" autoComplete="street-address" placeholder="Flat / house, street, area" />
                </label>
                <label className="checkout-field" htmlFor="checkout-city">City
                  <input id="checkout-city" name="city" value={form.city} onChange={update} required minLength="2" autoComplete="address-level2" placeholder="Your city" />
                </label>
                <label className="checkout-field" htmlFor="checkout-state">State
                  <input id="checkout-state" name="state" value={form.state} onChange={update} required minLength="2" autoComplete="address-level1" placeholder="Your state" />
                </label>
                <label className="checkout-field checkout-field-pin" htmlFor="checkout-pincode">PIN code
                  <input id="checkout-pincode" name="pincode" value={form.pincode} onChange={update} required inputMode="numeric" pattern="[0-9]{6}" maxLength="6" title="Enter a 6-digit PIN code" autoComplete="postal-code" placeholder="6-digit PIN code" />
                </label>
              </div>
              <div className="checkout-delivery-note"><Truck size={20} aria-hidden="true" /><div><b>Standard delivery is free</b><span>Dispatch and tracking updates will be sent to your contact details.</span></div></div>
            </section>

            <section className="checkout-payment" aria-labelledby="checkout-payment-title">
              <div className="checkout-section-heading">
                <span className="checkout-section-number">03</span>
                <div><h2 id="checkout-payment-title">Secure payment</h2><p>Review your order total before opening Razorpay.</p></div>
              </div>
              <div className="checkout-pay-total"><span>Total to pay</span><strong>{format(total)}</strong></div>
              {error && <p className="checkout-error" role="alert">{error}</p>}
              {pendingPayment && <button className="checkout-retry-btn" type="button" onClick={retryConfirmation} disabled={loading}>
                {loading ? <><Loader2 className="spin" size={18} /> Checking payment…</> : <>Retry payment confirmation <ArrowRight size={18} /></>}
              </button>}
              {!pendingPayment && <button className="pay-now-btn" type="submit" disabled={loading}>
                {loading ? <><Loader2 className="spin" size={19} /> Opening payment…</> : <><LockKeyhole size={18} /> Pay {format(total)} securely <ArrowRight size={18} /></>}
              </button>}
              <p className="checkout-payment-help"><ShieldCheck size={16} aria-hidden="true" /> Payments are handled by Razorpay. We don’t store your card or UPI details.</p>
              <p className="checkout-terms">By paying, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.</p>
            </section>
          </form>

          <aside className="checkout-order" aria-label="Order summary">
            <div className="checkout-order-head"><h2>Your order</h2><span>{qty} {qty === 1 ? 'item' : 'items'}</span></div>
            <div className="checkout-order-product">
              <img src={BOX_ITEMS[0].src} alt={PRODUCT.name} />
              <div><p>{PRODUCT.category}</p><h3>{PRODUCT.name}</h3><strong>{format(PRODUCT.price)}</strong></div>
            </div>
            <div className="checkout-quantity-row">
              <span>Quantity</span>
              <div className="checkout-quantity" role="group" aria-label="Quantity">
                <button type="button" aria-label="Decrease quantity" disabled={loading || Boolean(pendingPayment) || qty <= 1} onClick={() => setQty(PRODUCT.id, qty - 1)}><Minus size={15} /></button>
                <span>{qty}</span>
                <button type="button" aria-label="Increase quantity" disabled={loading || Boolean(pendingPayment) || qty >= MAX_ORDER_QUANTITY} onClick={() => setQty(PRODUCT.id, qty + 1)}><Plus size={15} /></button>
              </div>
            </div>
            <div className="checkout-costs">
              <div><span>Subtotal</span><strong>{format(subtotal)}</strong></div>
              <div><span>Shipping</span><strong className="checkout-free">FREE</strong></div>
              <div className="checkout-cost-total"><span>Total</span><strong>{format(total)}</strong></div>
            </div>
            <p className="checkout-order-note"><ShieldCheck size={17} aria-hidden="true" /> No surprise fees at payment.</p>
          </aside>
        </div>
      </div>
    </main>
  );
}
