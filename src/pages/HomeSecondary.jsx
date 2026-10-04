import {ArrowRight, BadgeCheck, Check, Lock, PackageCheck, ShieldCheck, Sparkles, Star, Truck} from 'lucide-react';
import {useEffect, useRef} from 'react';
import {BoxGallery} from '../components/BoxGallery';
import {Faq} from '../components/Faq';
import {PRODUCT, PRODUCT_PATH, REVIEWS} from '../data/catalog';
import {format} from '../lib/format';
import {go} from '../hooks/useRoute';
import {useStore} from '../context/StoreContext';
import {useStickyReveal} from '../hooks/useStickyReveal';

function InteractiveDropBox({onOpenProduct}) {
  const boxRef = useRef(null);
  const interaction = useRef({
    yaw: -18,
    pitch: -8,
    dragging: false,
    moved: false,
    pointerId: null,
    x: 0,
    y: 0,
    lastTime: 0
  });

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return undefined;

    let frame = 0;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const render = time => {
      const state = interaction.current;
      const dt = state.lastTime ? Math.min(time - state.lastTime, 34) : 16;
      state.lastTime = time;

      if (!state.dragging && !reduceMotion) {
        state.yaw += dt * 0.0125;
      }

      el.style.transform = `rotateX(${state.pitch}deg) rotateY(${state.yaw}deg)`;
      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frame);
  }, []);

  const onPointerDown = event => {
    const state = interaction.current;
    state.dragging = true;
    state.moved = false;
    state.pointerId = event.pointerId;
    state.x = event.clientX;
    state.y = event.clientY;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = event => {
    const state = interaction.current;
    if (!state.dragging || state.pointerId !== event.pointerId) return;

    const dx = event.clientX - state.x;
    const dy = event.clientY - state.y;
    if (Math.abs(dx) + Math.abs(dy) > 6) state.moved = true;
    state.x = event.clientX;
    state.y = event.clientY;
    state.yaw += dx * 0.42;
    state.pitch = Math.max(-22, Math.min(18, state.pitch - dy * 0.22));
  };

  const stopDrag = event => {
    const state = interaction.current;
    if (state.pointerId !== event.pointerId) return;
    const shouldOpenProduct = !state.moved;
    state.dragging = false;
    state.pointerId = null;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    if (shouldOpenProduct) onOpenProduct?.();
  };

  return (
    <div className="secondary-box-stage" aria-label="Tap to open product page. Drag to rotate pre-order box.">
      <div className="secondary-box-shadow" />
      <div
        className="secondary-box"
        role="button"
        tabIndex={0}
        ref={boxRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        onKeyDown={event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onOpenProduct?.();
          }
        }}
      >
        <div className="secondary-box-face secondary-box-front">
          <span className="box-kicker">GTA // 001</span>
          <strong>VICE<br />PACK</strong>
          <div className="box-line" />
          <small>PRE-ORDER EDITION</small>
        </div>
        <div className="secondary-box-face secondary-box-back">
          <span>ONE DROP</span>
          <b>{format(PRODUCT.price)}</b>
          <small>LIMITED PRE-ORDER</small>
        </div>
        <div className="secondary-box-face secondary-box-right"><span>VICE // 001</span></div>
        <div className="secondary-box-face secondary-box-left"><span>GTA STORE</span></div>
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
      <section className="secondary-hero">
        <div className="secondary-rays" aria-hidden="true" />
        <div className="secondary-rays secondary-rays-soft" aria-hidden="true" />
        <div className="secondary-glow" aria-hidden="true" />
        <div className="secondary-core-glow" aria-hidden="true" />

        <div className="secondary-hero-copy">
          <p className="secondary-kicker">LIMITED // PRE-ORDER DROP</p>
          <h1>VICE READY<br /><em>DROP BOX.</em></h1>
          <p className="secondary-subcopy">A black collector box staged under neon magenta motion, backed by secure checkout, clear policies, and careful preorder support.</p>
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
          <p>Tap pre-order to open the cart drawer, then complete secure Razorpay checkout.</p>
        </div>
      </section>

      <section className="store-trust-band" aria-label="Trusted store details">
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

      <BoxGallery
        eyebrow="THE DROP, FRAME BY FRAME"
        title="Slide the product. Watch the story change."
        className="secondary-story"
      />

      <section className="secondary-quality">
        <div className="secondary-section-head">
          <p className="secondary-kicker">BUILT TO FEEL PREMIUM</p>
          <h2>Every detail pushes the box into focus.</h2>
        </div>
        <div className="secondary-quality-grid">
          <article>
            <Sparkles />
            <b>Clear product presentation</b>
            <p>Large square visuals, named gallery items, and consistent pricing keep attention on the exact product being ordered.</p>
          </article>
          <article>
            <ShieldCheck />
            <b>Trust-first buying flow</b>
            <p>The cart, policy pages, footer, and checkout copy all explain what happens before payment and after order confirmation.</p>
          </article>
          <article>
            <PackageCheck />
            <b>Mobile-first performance</b>
            <p>Priority images, lazy galleries, reduced loader timing, and touch-friendly controls keep browsing quick on smaller screens.</p>
          </article>
        </div>
      </section>

      <section className="secondary-final-cta">
        <div>
          <p className="secondary-kicker">ONE PRODUCT // ONE DECISION</p>
          <h2>{PRODUCT.name}</h2>
          <div className="secondary-final-proof">
            <span><Check size={15} /> One premium drop</span>
            <span><Check size={15} /> Smooth product gallery</span>
            <span><Check size={15} /> Pre-order at {format(PRODUCT.price)}</span>
          </div>
        </div>
        <button className="secondary-preorder-btn" onClick={startPreorder}>
          PRE-ORDER BOX <ArrowRight size={20} />
        </button>
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
