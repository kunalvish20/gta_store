import {PRODUCT_PATH} from '../data/catalog';

export function Footer() {
  return (
    <footer>
      <div>
        <button className="brand">D&D <span>STORE</span></button>
        <p>Single-product collector storefront focused on clear buying, clean product proof, and fast checkout.</p>
      </div>
      <nav>
        <a href={`#${PRODUCT_PATH}`}>Product</a>
        <a href="#/cart">Cart</a>
        <a href="#/checkout">Checkout</a>
        <a href="#/shipping">Shipping</a>
      </nav>
      <small>© 2026 D&D STORE. Demo checkout. Add your payment gateway before launch.</small>
    </footer>
  );
}
