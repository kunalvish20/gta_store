import {ArrowRight, BadgeCheck, Check, Lock, Star, Truck} from 'lucide-react';
import {useEffect, useRef} from 'react';
import {BoxGallery} from '../components/BoxGallery';
import {Faq} from '../components/Faq';
import {PRODUCT, PRODUCT_PATH, REVIEWS, SITE} from '../data/catalog';
import {format} from '../lib/format';
import {go} from '../hooks/useRoute';
import {useStore} from '../context/StoreContext';
import {useStickyReveal} from '../hooks/useStickyReveal';

function InteractiveDropBox({onOpenProduct}) {
  const boxRef = useRef(null);
  const interaction = useRef({
    yaw: -18,
    pitch: -8,
    direction: 1,
    dragging: false,
    moved: false,
    pointerId: null,
    x: 0,
    y: 0,
    lastTime: 0,
    startX: 0,
    startY: 0
  });

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return undefined;

    let frame = 0;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    el.style.transform = `rotateX(${interaction.current.pitch}deg) rotateY(${interaction.current.yaw}deg)`;
    if (reduceMotion) return undefined;

    const render = time => {
      const state = interaction.current;
      const dt = state.lastTime ? Math.min(time - state.lastTime, 34) : 16;
      state.lastTime = time;

      if (!state.dragging) {
        state.yaw += dt * 0.004 * state.direction;
        if (state.yaw >= -4) state.direction = -1;
        if (state.yaw <= -32) state.direction = 1;
      }

      el.style.transform = `rotateX(${state.pitch}deg) rotateY(${state.yaw}deg)`;
      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frame);
  }, []);

  const onPointerDown = event => {
    if (!event.isPrimary || event.button !== 0) return;
    const state = interaction.current;
    state.dragging = true;
    state.moved = false;
    state.pointerId = event.pointerId;
    state.x = event.clientX;
    state.y = event.clientY;
    state.startX = event.clientX;
    state.startY = event.clientY;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = event => {
    const state = interaction.current;
    if (!state.dragging || state.pointerId !== event.pointerId) return;

    const dx = event.clientX - state.x;
    const dy = event.clientY - state.y;
    if (Math.hypot(event.clientX - state.startX, event.clientY - state.startY) > 6) state.moved = true;
    state.x = event.clientX;
    state.y = event.clientY;
    state.yaw += dx * 0.42;
    state.pitch = Math.max(-22, Math.min(18, state.pitch - dy * 0.22));
    if (boxRef.current) {
      boxRef.current.style.transform = `rotateX(${state.pitch}deg) rotateY(${state.yaw}deg)`;
    }
  };

  const stopDrag = (event, cancelled = false) => {
    const state = interaction.current;
    if (state.pointerId !== event.pointerId) return;
    const shouldOpenProduct = !cancelled && !state.moved;
    state.dragging = false;
    state.pointerId = null;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    if (shouldOpenProduct) onOpenProduct?.();
  };

  return (
    <div className="secondary-box-stage">
      <div className="secondary-box-shadow" aria-hidden="true" />
      <div
        className="secondary-box"
        role="button"
        aria-label="View the GTA VI Collector Box. Drag horizontally to rotate."
        tabIndex={0}
        ref={boxRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDrag}
        onPointerCancel={event => stopDrag(event, true)}
        onClick={event => {
          if (event.detail === 0) onOpenProduct?.();
        }}
        onKeyDown={event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onOpenProduct?.();
          }
        }}
      >
        <div className="secondary-box-face secondary-box-front">
          <span className="box-kicker">GTA VI // 001</span>
          <strong>GTA VI<br />DROP</strong>
          <div className="box-line" />
          <small>PRE-ORDER EDITION</small>
        </div>
        <div className="secondary-box-face secondary-box-back">
          <span>ONE DROP</span>
          <b>{format(PRODUCT.price)}</b>
          <small>LIMITED PRE-ORDER</small>
        </div>
        <div className="secondary-box-face secondary-box-right"><span>GTA VI // 001</span></div>
        <div className="secondary-box-face secondary-box-left"><span>{SITE.name.toUpperCase()}</span></div>
        <div className="secondary-box-face secondary-box-top"><span>PRE-ORDER</span></div>
        <div className="secondary-box-face secondary-box-bottom"><span>2026 DROP</span></div>
      </div>
      <div className="secondary-drag-hint">TAP TO VIEW / DRAG TO ROTATE</div>
    </div>
  );
}

export function HomeSecondary() {
  const {preorder} = useStore();
  const stickyVisible = useStickyReveal(460);
  const startPreorder = () => preorder(PRODUCT.id, 1);
  const openProduct = () => go(PRODUCT_PATH);

  return (
    <main className="secondary-page">
      <section className="secondary-hero" aria-labelledby="collector-hero-title">
        <div className="secondary-atmosphere" aria-hidden="true" />
        <div className="secondary-rays" aria-hidden="true" />
        <div className="secondary-rays secondary-rays-soft" aria-hidden="true" />
        <div className="secondary-glow" aria-hidden="true" />
        <div className="secondary-core-glow" aria-hidden="true" />
        <div className="secondary-particles" aria-hidden="true">
          {Array.from({length: 34}, (_, index) => (
            <span
              key={index}
              className={index % 6 === 0 ? 'is-sparkle' : ''}
              style={{
                '--particle-x': `${(index * 37 + 7) % 100}%`,
                '--particle-y': `${(index * 23 + 9) % 100}%`,
                '--particle-size': `${index % 3 + 2}px`,
                '--particle-delay': `${-(index % 9)}s`,
                '--particle-duration': `${6 + index % 5}s`
              }}
            />
          ))}
        </div>

        <div className="secondary-hero-copy">
          <p className="secondary-kicker">LIMITED // PRE-ORDER DROP</p>
          <h1 id="collector-hero-title">GTA VI<br /><em>DROP BOX.</em></h1>
          </div>

        <InteractiveDropBox onOpenProduct={openProduct} />

        <div className="secondary-hero-cta">
          <div className="secondary-price">
            <span>PRE-ORDER PRICE</span>
            <b>{format(PRODUCT.price)}</b>
          </div>
          <button className="secondary-preorder-btn" onClick={startPreorder}>
            PRE-ORDER BOX <ArrowRight size={20} />
          </button>
          <p>Secure Razorpay checkout. Delivery updates from pre-order to dispatch.</p>
        </div>
      </section>

      <section className="secondary-final-cta" aria-labelledby="collector-box-title">
        <div className="secondary-final-copy">
          <p className="secondary-kicker">ONE PRODUCT // ONE DECISION</p>
          <h2 id="collector-box-title">{PRODUCT.name}</h2>
          <div className="secondary-final-proof">
            <span><Check size={15} /> One premium drop</span>
            <span><Check size={15} /> Smooth product gallery</span>
            <span><Check size={15} /> Pre-order at {format(PRODUCT.price)}</span>
          </div>
        </div>
        <img
          className="secondary-final-image"
          src="/assets/lamp_gta-VI.png"
          alt="GTA VI neon display lamp"
          width={1122}
          height={1402}
          loading="lazy"
          decoding="async"
        />
        <button className="secondary-preorder-btn" onClick={startPreorder}>
          PRE-ORDER BOX <ArrowRight size={20} />
        </button>
      </section>

      <BoxGallery
        eyebrow="THE DROP, FRAME BY FRAME"
        title="Slide the product. Watch the story change."
        className="secondary-story"
      />

      <section className="store-trust-band secondary-quality" aria-label="Trusted store details">
        <article>
          <Lock />
          <b>Verified checkout</b>
          <p>Razorpay payment opens only after the cart total, quantity, and delivery details are reviewed.</p>
        </article>
        <article>
          <Truck />
          <b>Delivery updates</b>
          <p>Pre-order status, dispatch, and tracking updates are shared through the contact details used at checkout.</p>
        </article>
        <article>
          <BadgeCheck />
          <b>Customer support</b>
          <p>Support links, policy pages, and contact details stay visible in the footer across the whole store.</p>
        </article>
      </section>

      <section className="reviews-preview store-reviews" id="reviews">
        {REVIEWS.map(review => (
          <article key={review}>
            <div>{[1, 2, 3, 4, 5].map(star => <Star key={star} size={14} fill="currentColor" />)}</div>
            <p>{review}</p>
            <b>Verified preorder signal</b>
          </article>
        ))}
      </section>

      <Faq />

      <div className={`secondary-sticky-preorder ${stickyVisible ? 'is-visible' : ''}`}>
        <div>
          <small>PRE-ORDER</small>
          <b>{format(PRODUCT.price)}</b>
        </div>
        <button onClick={startPreorder}>PRE-ORDER BOX <ArrowRight size={17} /></button>
      </div>
    </main>
  );
}
