import {ArrowRight, Check, PackageCheck, ShieldCheck} from 'lucide-react';
import {useRef, useState} from 'react';
import {BoxGallery} from '../components/BoxGallery';
import {Faq} from '../components/Faq';
import {ProductArt} from '../components/ProductArt';
import {BOX_ITEMS, PRODUCT} from '../data/catalog';
import {useStore} from '../context/StoreContext';
import {format} from '../lib/format';
import {useStickyReveal} from '../hooks/useStickyReveal';

export function ProductPage() {
  const {preorder} = useStore();
  const stickyVisible = useStickyReveal(380);
  const [active, setActive] = useState(0);
  const touchStart = useRef(null);
  const current = BOX_ITEMS[active];

  const move = direction => {
    setActive(index => (index + direction + BOX_ITEMS.length) % BOX_ITEMS.length);
  };

  const onTouchEnd = event => {
    if (touchStart.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(delta) > 42) move(delta > 0 ? -1 : 1);
    touchStart.current = null;
  };

  const startPreorder = () => preorder(PRODUCT.id, 1);

  return (
    <main className="product-page preorder-product-page">
      <section className="preorder-product-hero product-image-first">
        <div
          className="product-center-gallery"
          onTouchStart={event => { touchStart.current = event.touches[0].clientX; }}
          onTouchEnd={onTouchEnd}
        >
          <div className="product-center-frame" key={current.src}>
            <ProductArt item={current} large priority={active === 0} />
            <div className="product-frame-count">0{active + 1} / 0{BOX_ITEMS.length}</div>
          </div>

          <div className="product-thumb-rail" aria-label="Product image gallery">
            {BOX_ITEMS.map((item, index) => (
              <button
                key={item.src}
                className={active === index ? 'active' : ''}
                onClick={() => setActive(index)}
                aria-label={`Show ${item.name}`}
              >
                <img src={item.src} alt="" loading={index < 2 ? 'eager' : 'lazy'} decoding="async" />
                <span>{String(index + 1).padStart(2, '0')}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="preorder-buy-panel single-action-panel">
          <div>
            <p className="secondary-kicker">LIMITED PRE-ORDER</p>
            <h1>{PRODUCT.name}</h1>
          </div>
          <div>
            <p className="preorder-label">PRE-ORDER PRICE</p>
            <b className="preorder-main-price">{format(PRODUCT.price)}</b>
          </div>
          <button className="secondary-preorder-btn" onClick={startPreorder}>PRE-ORDER OUTFIT <ArrowRight size={20} /></button>
        </div>
      </section>

      <BoxGallery
        eyebrow="EXPLORE THE DROP"
        title="Swipe the frame. Product story moves with it."
        className="product-story-section"
      />

      <section className="product-detail-band">
        <article><span>01</span><b>Square-first product visuals</b><p>Every image block is locked to a clean 1:1 ratio for premium mobile and desktop browsing.</p></article>
        <article><span>02</span><b>Smooth conversion flow</b><p>Pre-order opens the half cart drawer first, so the buyer reviews quantity before payment.</p></article>
        <article><span>03</span><b>Secure Razorpay checkout</b><p>The frontend never stores the secret key; payment orders are created and verified through server APIs.</p></article>
      </section>

      <Faq />

      <div className={`secondary-sticky-preorder product-preorder-sticky ${stickyVisible ? 'is-visible' : ''}`}>
        <div>
          <small>PRE-ORDER</small>
          <b>{format(PRODUCT.price)}</b>
        </div>
        <button onClick={startPreorder}>PRE-ORDER OUTFIT <ArrowRight size={17} /></button>
      </div>
    </main>
  );
}
