import {ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, LockKeyhole, Minus, PackageCheck, Plus, ShieldCheck, ShoppingBag, Star, Truck} from 'lucide-react';
import {useEffect, useRef, useState} from 'react';
import {Faq} from '../components/Faq';
import {ProductArt} from '../components/ProductArt';
import {ProductStorySections} from '../components/ProductStorySections';
import {BOX_ITEMS, MAX_ORDER_QUANTITY, PRODUCT, REVIEWS, SITE} from '../data/catalog';
import {useStore} from '../context/StoreContext';
import {format} from '../lib/format';
import {go} from '../hooks/useRoute';
import './ProductPage.css';

export function ProductPage() {
  const {preorder, setQty} = useStore();
  const [active, setActive] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [stickyVisible, setStickyVisible] = useState(false);
  const purchaseActions = useRef(null);
  const touchStart = useRef(null);
  const current = BOX_ITEMS[active];

  useEffect(() => {
    if (!purchaseActions.current || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      setStickyVisible(!entry.isIntersecting);
    }, {rootMargin: '-88px 0px -84px 0px'});
    observer.observe(purchaseActions.current);
    return () => observer.disconnect();
  }, []);

  const move = direction => {
    setActive(index => (index + direction + BOX_ITEMS.length) % BOX_ITEMS.length);
  };

  const onTouchEnd = event => {
    if (touchStart.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(delta) > 42) move(delta > 0 ? -1 : 1);
    touchStart.current = null;
  };

  const addToCart = () => preorder(PRODUCT.id, quantity);
  const buyNow = () => {
    setQty(PRODUCT.id, quantity);
    go('/checkout');
  };

  return (
    <main className="product-page preorder-product-page ecommerce-product-page">
      <section className="ecom-product-hero" aria-labelledby="product-title">
        <nav className="product-breadcrumbs" aria-label="Breadcrumb">
          <a href="#/">Home</a><ChevronRight size={12} />
          <span>Collector drops</span><ChevronRight size={12} />
          <span aria-current="page">{PRODUCT.shortName}</span>
        </nav>

        <div className="product-hero-grid">
          <div className="product-gallery">
            <div
              className="product-gallery-main"
              role="group"
              aria-roledescription="carousel"
              aria-label="Collector box images"
              onTouchStart={event => { touchStart.current = event.touches[0].clientX; }}
              onTouchEnd={onTouchEnd}
              onTouchCancel={() => { touchStart.current = null; }}
            >
              <ProductArt item={current} large priority={active === 0} />
              <span className="product-gallery-badge"><PackageCheck size={14} /> 5 ITEMS. ONE BOX.</span>
              <div className="product-gallery-caption">
                <span>{current.name}</span>
                <span aria-hidden="true">{String(active + 1).padStart(2, '0')} / {String(BOX_ITEMS.length).padStart(2, '0')}</span>
              </div>
              <button className="product-gallery-arrow product-gallery-prev" aria-label="Previous product image" onClick={() => move(-1)}><ChevronLeft size={21} /></button>
              <button className="product-gallery-arrow product-gallery-next" aria-label="Next product image" onClick={() => move(1)}><ChevronRight size={21} /></button>
              <span className="product-sr-only" aria-live="polite">Image {active + 1} of {BOX_ITEMS.length}: {current.name}</span>
            </div>

            <div className="product-gallery-thumbnails" role="group" aria-label="Choose a product image">
              {BOX_ITEMS.map((item, index) => (
                <button key={item.src} className={active === index ? 'active' : ''} onClick={() => setActive(index)} aria-label={`Show ${item.name}`} aria-pressed={active === index}>
                  <img src={item.src} alt="" className={item.contain ? 'contain' : ''} loading={index < 2 ? 'eager' : 'lazy'} decoding="async" />
                </button>
              ))}
            </div>
            <p className="product-gallery-note"><PackageCheck size={14} /> Explore all five items included in your collector box.</p>
          </div>

          <div className="product-purchase-panel">
            <div className="product-edition"><span>{SITE.shortName} COLLECTOR SERIES</span><span className="product-preorder-tag">PRE-ORDER</span></div>
            <h1 id="product-title">{PRODUCT.name}</h1>
            <a className="product-rating" href="#reviews" onClick={event => { event.preventDefault(); document.getElementById('reviews')?.scrollIntoView({behavior: 'smooth'}); }}>
              <span className="product-rating-stars" aria-hidden="true">{[1, 2, 3, 4, 5].map(star => <Star key={star} size={14} fill="currentColor" />)}</span>
              <strong>{PRODUCT.rating} / 5</strong><span>({PRODUCT.reviews} reviews)</span>
              <ChevronRight size={13} />
            </a>

            <div className="product-price-block">
              <div className="product-price-line"><b>{format(PRODUCT.price)}</b><span>Free standard delivery</span></div>
              <p>One collector box. All five items included.</p>
            </div>
            <p className="product-intro">Bring the Vice City mood to your setup. A curated mix of collectibles, artwork and a display lamp, together in one collector drop.</p>

            <div className="product-quantity-row">
              <label htmlFor="product-quantity">Quantity<small id="product-quantity-limit">Max {MAX_ORDER_QUANTITY} per order</small></label>
              <div className="product-quantity-control">
                <button type="button" aria-label="Decrease product quantity" disabled={quantity <= 1} onClick={() => setQuantity(value => Math.max(1, value - 1))}><Minus size={16} /></button>
                <output id="product-quantity" aria-live="polite" aria-describedby="product-quantity-limit">{quantity}</output>
                <button type="button" aria-label="Increase product quantity" disabled={quantity >= MAX_ORDER_QUANTITY} onClick={() => setQuantity(value => Math.min(MAX_ORDER_QUANTITY, value + 1))}><Plus size={16} /></button>
              </div>
              {quantity > 1 && <span className="product-quantity-total">Total <b>{format(PRODUCT.price * quantity)}</b></span>}
            </div>

            <div className="product-purchase-actions" ref={purchaseActions}>
              <button className="product-cart-button" onClick={addToCart}><ShoppingBag size={19} /> Add to cart <ArrowRight size={19} /></button>
              <button className="product-buy-button" onClick={buyNow}>Buy now <ArrowRight size={18} /></button>
            </div>
            <p className="product-preorder-note">This is a pre-order. Dispatch updates are shared by email and SMS.</p>

            <div className="product-payment-proof"><LockKeyhole size={14} /><span>Secure checkout with Razorpay</span><span className="product-payment-methods">UPI · Cards · Netbanking</span></div>
            <div className="product-service-strip">
              <span><Truck size={19} /><b>Free delivery</b></span>
              <span><PackageCheck size={19} /><b>Protective packing</b></span>
              <a href="#/contact"><ShieldCheck size={19} /><b>Order support</b></a>
            </div>

            <ul className="product-buy-benefits">
              <li><Check size={16} /> Five display-ready collector items</li>
              <li><Check size={16} /> Protective packing for your collection</li>
              <li><Check size={16} /> Tracking updates after dispatch</li>
            </ul>

            <div className="product-purchase-details">
              <details>
                <summary>What's in the box? <span>5 collector items <ChevronDown size={16} /></span></summary>
                <ul>{BOX_ITEMS.map(item => <li key={item.name}>{item.name}</li>)}</ul>
              </details>
              <details>
                <summary>Delivery &amp; returns <ChevronDown size={16} /></summary>
                <p>Free standard delivery. Dispatch and tracking updates are shared after your pre-order moves to fulfilment. For damaged or incorrect items, contact support within 48 hours of delivery.</p>
                <div><a href="#/shipping">Shipping details <ArrowRight size={13} /></a><a href="#/returns">Returns &amp; support <ArrowRight size={13} /></a></div>
              </details>
            </div>
          </div>
        </div>
      </section>

      <ProductStorySections />

      <section className="store-trust-band product-trust-band" aria-label="Purchase confidence">
        <article><ShieldCheck /><b>Secure payment</b><p>Pay with UPI, cards, or netbanking through Razorpay checkout.</p></article>
        <article><PackageCheck /><b>Packed for collectors</b><p>The order is prepared as a display-ready drop with protective packing and care guidance.</p></article>
        <article><Check /><b>Clear policy links</b><p>Shipping, returns, cancellation, payment, and contact details remain available before checkout.</p></article>
      </section>

      <section className="product-detail-band">
        <article><span>01</span><b>See every item</b><p>Explore all five collectibles in the image gallery before choosing your box.</p></article>
        <article><span>02</span><b>Review before payment</b><p>Check your quantity, subtotal, and free standard delivery in your cart before checkout.</p></article>
        <article><span>03</span><b>Support for your order</b><p>Delivery updates and clear support links keep you informed from pre-order to dispatch.</p></article>
      </section>

      <section className="reviews-preview store-reviews product-reviews" id="reviews">
        {REVIEWS.map(review => (
          <article key={review}>
            <div>{[1, 2, 3, 4, 5].map(star => <Star key={star} size={14} fill="currentColor" />)}</div>
            <p>{review}</p>
            <b>Verified preorder signal</b>
          </article>
        ))}
      </section>

      <Faq />

      <div className={`product-purchase-sticky ${stickyVisible ? 'is-visible' : ''}`} aria-hidden={!stickyVisible}>
        <div className="product-sticky-info"><span>{quantity > 1 ? `${quantity} collector boxes` : PRODUCT.shortName}</span><b>{format(PRODUCT.price * quantity)}</b><small>Free delivery · Pre-order</small></div>
        <button className="product-cart-button" onClick={addToCart} tabIndex={stickyVisible ? 0 : -1}><ShoppingBag size={18} /> Add to cart <ArrowRight size={18} /></button>
      </div>
    </main>
  );
}
