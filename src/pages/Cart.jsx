import {ArrowRight, Minus, Plus, ShoppingBag} from 'lucide-react';
import {BOX_ITEMS, PRODUCT, PRODUCT_PATH} from '../data/catalog';
import {useStore} from '../context/StoreContext';
import {format} from '../lib/format';
import {go} from '../hooks/useRoute';
import {ProductArt} from '../components/ProductArt';

export function Cart() {
  const {cart, setQty, subtotal} = useStore();
  const qty = cart[PRODUCT.id] || 0;
  const shipping = subtotal >= 4999 || subtotal === 0 ? 0 : 199;

  if (!qty) {
    return (
      <main className="page">
        <EmptyCart />
      </main>
    );
  }

  return (
    <main className="page">
      <section className="page-hero">
        <p className="eyebrow">Cart</p>
        <h1>Your box is ready.</h1>
      </section>
      <section className="cart-layout">
        <article className="cart-line">
          <ProductArt item={BOX_ITEMS[0]} />
          <div>
            <small>{PRODUCT.category}</small>
            <h2>{PRODUCT.name}</h2>
            <b>{format(PRODUCT.price)}</b>
            <div className="qty mini">
              <button onClick={() => setQty(PRODUCT.id, qty - 1)}><Minus /></button>
              <span>{qty}</span>
              <button onClick={() => setQty(PRODUCT.id, qty + 1)}><Plus /></button>
            </div>
          </div>
          <button className="remove-btn" onClick={() => setQty(PRODUCT.id, 0)}>Remove</button>
        </article>
        <OrderSummary subtotal={subtotal} shipping={shipping} />
      </section>
    </main>
  );
}

function EmptyCart() {
  return (
    <section className="empty">
      <ShoppingBag />
      <h1>Your cart is empty.</h1>
      <p>Add the GTA VI Collector Box to start checkout.</p>
      <button className="primary-btn" onClick={() => go(PRODUCT_PATH)}>View Product</button>
    </section>
  );
}

function OrderSummary({subtotal, shipping}) {
  return (
    <aside className="summary-card">
      <p className="eyebrow">Order summary</p>
      <div><span>Subtotal</span><b>{format(subtotal)}</b></div>
      <div><span>Shipping</span><b>{shipping ? format(shipping) : 'FREE'}</b></div>
      <div className="total"><span>Total</span><b>{format(subtotal + shipping)}</b></div>
      <button onClick={() => go('/checkout')}>Continue to Checkout <ArrowRight size={18} /></button>
      <a href={`#${PRODUCT_PATH}`}>Back to product</a>
    </aside>
  );
}
