import {ArrowRight, Check, ShieldCheck, ShoppingBag, Star, Truck} from 'lucide-react';
import {BOX_ITEMS, PRODUCT, PRODUCT_PATH, REVIEWS} from '../data/catalog';
import {useStore} from '../context/StoreContext';
import {format} from '../lib/format';
import {go} from '../hooks/useRoute';
import {ProductArt} from '../components/ProductArt';

export function Home() {
  const {add} = useStore();
  const savings = PRODUCT.oldPrice - PRODUCT.price;

  return (
    <main>
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-copy">
          <p className="eyebrow">Limited Vice City Drop</p>
          <h1>{PRODUCT.name}</h1>
          <p>{PRODUCT.description}</p>
          <div className="hero-price">
            <b>{format(PRODUCT.price)}</b>
            {savings > 0 && <s>{format(PRODUCT.oldPrice)}</s>}
            {savings > 0 && <span>Save {format(savings)}</span>}
          </div>
          <div className="hero-actions">
            <button className="primary-btn" onClick={() => go(PRODUCT_PATH)}>
              Buy the Box <ArrowRight size={18} />
            </button>
            <button className="ghost-btn" onClick={() => add(PRODUCT.id)}>
              Add to Cart <ShoppingBag size={18} />
            </button>
          </div>
          <div className="proof-row">
            <span><Check size={15} /> One product</span>
            <span><Check size={15} /> 5 items inside</span>
            <span><Check size={15} /> Sticky cart</span>
          </div>
        </div>
        <button className="hero-product" onClick={() => go(PRODUCT_PATH)} aria-label="Open product page">
          <ProductArt item={BOX_ITEMS[0]} large priority />
          <div><span>{PRODUCT.tag}</span><b>{PRODUCT.category}</b></div>
        </button>
      </section>

      <section className="ticker">
        <div>{['D&D STORE', 'ONE BOX', 'FIVE ITEMS', 'LIMITED DROP', 'FAST CHECKOUT', 'GTA STYLE'].map(label => <span key={label}>{label}</span>)}</div>
      </section>

      <section className="offer-section">
        <div className="section-title">
          <p className="eyebrow">High CRO Flow</p>
          <h2>One page. One offer. One action.</h2>
        </div>
        <div className="offer-grid">
          {[
            ['Clear product', 'Only one product across the full website, so shoppers never get lost.'],
            ['Visual proof', 'Large swipeable image card shows every item inside the box.'],
            ['Always-ready CTA', 'Sticky add-to-cart keeps purchase action visible on mobile.']
          ].map(([title, copy]) => (
            <article key={title}>
              <b>{title}</b>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-product">
        <ProductArt item={BOX_ITEMS[1]} large />
        <div>
          <p className="eyebrow">The product</p>
          <h2>{PRODUCT.shortName}</h2>
          <ul>
            {PRODUCT.highlights.map(item => <li key={item}><Check size={17} /> {item}</li>)}
          </ul>
          <button className="primary-btn" onClick={() => go(PRODUCT_PATH)}>Open Product Page <ArrowRight size={18} /></button>
        </div>
      </section>

      <section className="trust-band">
        <div><Truck /><b>Fast dispatch</b><span>Ships in 1-2 business days.</span></div>
        <div><ShieldCheck /><b>Protected packing</b><span>Made for collector-safe delivery.</span></div>
        <div><Star /><b>{PRODUCT.rating}/5 rating</b><span>{PRODUCT.reviews} buyer reviews.</span></div>
      </section>

      <section className="reviews-preview">
        {REVIEWS.map(review => (
          <article key={review}>
            <div>{[1, 2, 3, 4, 5].map(star => <Star key={star} size={14} fill="currentColor" />)}</div>
            <p>{review}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
