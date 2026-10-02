import {ArrowRight, Minus, Plus, X} from 'lucide-react';
import {useEffect} from 'react';
import {BOX_ITEMS, PRODUCT} from '../data/catalog';
import {useStore} from '../context/StoreContext';
import {format} from '../lib/format';
import {go} from '../hooks/useRoute';
import {ProductArt} from './ProductArt';

export function CartDrawer() {
  const {cart, setQty, subtotal, isCartDrawerOpen, closeCartDrawer} = useStore();
  const qty = cart[PRODUCT.id] || 0;
  const shipping = subtotal >= PRODUCT.price || subtotal === 0 ? 0 : 199;
  const total = subtotal + shipping;

  useEffect(() => {
    document.body.classList.toggle('drawer-lock', isCartDrawerOpen);
    return () => document.body.classList.remove('drawer-lock');
  }, [isCartDrawerOpen]);

  const checkout = () => {
    closeCartDrawer();
    go('/checkout');
  };

  return (
    <div className={`cart-drawer-shell ${isCartDrawerOpen ? 'is-open' : ''}`} aria-hidden={!isCartDrawerOpen}>
      <button className="cart-drawer-backdrop" onClick={closeCartDrawer} tabIndex={isCartDrawerOpen ? 0 : -1} aria-label="Close cart" />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Pre-order cart">
        <div className="cart-drawer-head">
          <div>
            <p className="secondary-kicker">PRE-ORDER CART</p>
            <h2>Your drop is ready.</h2>
          </div>
          <button className="cart-drawer-close" onClick={closeCartDrawer} aria-label="Close cart"><X size={20} /></button>
        </div>

        {qty ? (
          <>
            <article className="cart-drawer-item">
              <ProductArt item={BOX_ITEMS[0]} />
              <div>
                <small>{PRODUCT.category}</small>
                <b>{PRODUCT.name}</b>
                <span>{format(PRODUCT.price)}</span>
                <div className="qty mini drawer-qty">
                  <button onClick={() => setQty(PRODUCT.id, qty - 1)} aria-label="Decrease quantity"><Minus /></button>
                  <strong>{qty}</strong>
                  <button onClick={() => setQty(PRODUCT.id, qty + 1)} aria-label="Increase quantity"><Plus /></button>
                </div>
              </div>
            </article>

            <div className="cart-drawer-summary">
              <div><span>Subtotal</span><b>{format(subtotal)}</b></div>
              <div><span>Shipping</span><b>{shipping ? format(shipping) : 'FREE'}</b></div>
              <div className="total"><span>Total</span><b>{format(total)}</b></div>
            </div>

            <button className="secondary-preorder-btn cart-drawer-checkout" onClick={checkout}>
              CHECKOUT NOW <ArrowRight size={20} />
            </button>
            <button className="cart-drawer-soft" onClick={closeCartDrawer}>Keep exploring</button>
          </>
        ) : (
          <div className="cart-drawer-empty">
            <p>Your cart is empty.</p>
            <button className="secondary-preorder-btn" onClick={() => setQty(PRODUCT.id, 1)}>ADD PRE-ORDER</button>
          </div>
        )}
      </aside>
    </div>
  );
}
