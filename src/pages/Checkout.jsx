import {ArrowRight, CheckCircle, Loader2} from 'lucide-react';
import {useMemo, useState} from 'react';
import {PRODUCT, PRODUCT_PATH, SITE} from '../data/catalog';
import {useStore} from '../context/StoreContext';
import {format} from '../lib/format';
import {go} from '../hooks/useRoute';
import {createRazorpayOrder, loadRazorpayScript, RAZORPAY_KEY_ID, verifyRazorpayPayment} from '../lib/razorpay';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  pincode: '',
  address: '',
  city: '',
  state: ''
};

export function Checkout() {
  const {cart, subtotal, clearCart} = useStore();
  const qty = cart[PRODUCT.id] || 0;
  const shipping = subtotal >= PRODUCT.price || subtotal === 0 ? 0 : 199;
  const total = subtotal + shipping;
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  const canPay = useMemo(() => {
    return qty > 0 && Object.values(form).every(value => String(value).trim().length > 1);
  }, [form, qty]);

  const update = event => {
    const {name, value} = event.target;
    setForm(current => ({...current, [name]: value}));
  };

  const payNow = async event => {
    event.preventDefault();
    setError('');

    if (!qty) {
      setError('Cart is empty. Please add the pre-order first.');
      return;
    }

    if (!canPay) {
      setError('Please complete all checkout fields before payment.');
      return;
    }

    if (!RAZORPAY_KEY_ID) {
      setError(`Payment checkout is not configured yet. Please contact ${SITE.supportEmail} for help.`);
      return;
    }

    setLoading(true);

    try {
      const scriptReady = await loadRazorpayScript();
      if (!scriptReady) throw new Error('Razorpay checkout script could not be loaded.');

      const order = await createRazorpayOrder({quantity: qty, customer: form});

      const payment = await new Promise((resolve, reject) => {
        const razorpay = new window.Razorpay({
          key: order.publicKey || RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency || 'INR',
          name: SITE.name,
          description: `${PRODUCT.name} Pre-Order`,
          order_id: order.orderId,
          prefill: {
            name: form.name,
            email: form.email,
            contact: form.phone
          },
          notes: {
            address: form.address,
            city: form.city,
            state: form.state,
            pincode: form.pincode
          },
          theme: {color: '#ff2a9a'},
          handler: resolve,
          modal: {
            ondismiss: () => reject(new Error('Payment popup was closed.'))
          }
        });

        razorpay.on('payment.failed', response => {
          reject(new Error(response?.error?.description || 'Payment failed.'));
        });

        razorpay.open();
      });

      const verified = await verifyRazorpayPayment(payment);
      clearCart();
      setSuccess({paymentId: verified.paymentId || payment.razorpay_payment_id});
    } catch (paymentError) {
      setError(paymentError.message || 'Payment could not be completed.');
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

  return (
    <main className="page checkout-page">
      <section className="page-hero checkout-hero">
        <p className="eyebrow">Secure Checkout</p>
        <h1>Complete your pre-order.</h1>
      </section>
      <section className="checkout-layout">
        <form onSubmit={payNow}>
          <h2>Contact</h2>
          <div className="form-grid">
            <label>Full name<input name="name" value={form.name} onChange={update} required placeholder="Your name" /></label>
            <label>Email<input name="email" value={form.email} onChange={update} required type="email" placeholder="you@example.com" /></label>
            <label>Phone<input name="phone" value={form.phone} onChange={update} required inputMode="tel" placeholder="98765 43210" /></label>
            <label>PIN code<input name="pincode" value={form.pincode} onChange={update} required inputMode="numeric" placeholder="452001" /></label>
            <label className="wide">Address<input name="address" value={form.address} onChange={update} required placeholder="House, street, area" /></label>
            <label>City<input name="city" value={form.city} onChange={update} required placeholder="Indore" /></label>
            <label>State<input name="state" value={form.state} onChange={update} required placeholder="Madhya Pradesh" /></label>
          </div>

          <h2>Delivery</h2>
          <label className="radio"><input type="radio" defaultChecked /> Standard delivery <b>{shipping ? format(shipping) : 'FREE'}</b></label>

          {error && <p className="checkout-error">{error}</p>}

          <button className="pay-now-btn" type="submit" disabled={loading || !canPay || !qty}>
            {loading ? <><Loader2 className="spin" size={19} /> Processing...</> : <>PAY {format(total)} WITH RAZORPAY <ArrowRight size={19} /></>}
          </button>
          <small>Payments are processed by Razorpay. Card, UPI, and netbanking details are handled by the payment provider, not stored by this storefront.</small>
          <ul className="checkout-assurance">
            <li>Order total reviewed before payment</li>
            <li>Payment signature verified after checkout</li>
            <li>Support available at {SITE.supportEmail}</li>
          </ul>
        </form>

        <aside className="summary-card checkout-summary-card">
          <p className="eyebrow">Order total</p>
          <div><span>{PRODUCT.shortName} x {qty}</span><b>{format(subtotal)}</b></div>
          <div><span>Shipping</span><b>{shipping ? format(shipping) : 'FREE'}</b></div>
          <div className="total"><span>Total</span><b>{format(total)}</b></div>
          {!qty && <button onClick={() => go(PRODUCT_PATH)}>Add pre-order first</button>}
        </aside>
      </section>
    </main>
  );
}
