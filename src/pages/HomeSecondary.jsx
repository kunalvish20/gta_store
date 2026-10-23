import {ArrowRight, BadgeCheck, Check, Lock, Truck} from 'lucide-react';
import {useEffect, useRef} from 'react';
import {Faq} from '../components/Faq';
import {PRODUCT, PRODUCT_PATH} from '../data/catalog';
import {format} from '../lib/format';
import {go} from '../hooks/useRoute';
import {useStickyReveal} from '../hooks/useStickyReveal';

const TESTIMONIAL_PREVIEW = [
  {
    topic: 'THE BOX',
    quote: 'I wanted to see exactly what came in the box before ordering. The gallery made it easy to look through every piece.',
    name: 'Aarav M.',
    initials: 'AM'
  },
  {
    topic: 'THE CHECKOUT',
    quote: 'The price and order summary were easy to find. I could check the quantity and delivery details before moving to payment.',
    name: 'Riya S.',
    initials: 'RS'
  },
  {
    topic: 'THE DETAILS',
    quote: 'The lamp and poster caught my eye first. Seeing how the items fit together made the drop feel thoughtfully put together.',
    name: 'Dev K.',
    initials: 'DK'
  }
];

const MARQUEE_ITEMS = ['LIMITED STOCK', "EXCLUSIVE COLLECTOR'S BOX"];

function applyBoxRotation(element, {pitch, yaw}) {
  element.style.transform = `rotateX(${pitch}deg) rotateY(${yaw}deg)`;
}

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
    lastTime: 0,
    startX: 0,
    startY: 0
  });

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return undefined;

    let frame = 0;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    applyBoxRotation(el, interaction.current);
    if (reduceMotion) return undefined;

    const render = time => {
      const state = interaction.current;
      const dt = state.lastTime ? Math.min(time - state.lastTime, 34) : 16;
      state.lastTime = time;

      if (!state.dragging) {
        state.yaw = (state.yaw + dt * 0.015) % 360;
      }

      applyBoxRotation(el, state);
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
    if (!state.moved && Math.hypot(event.clientX - state.startX, event.clientY - state.startY) <= 6) return;
    state.moved = true;
    state.x = event.clientX;
    state.y = event.clientY;
    state.yaw += dx * 0.7;
    state.pitch -= dy * 0.7;
    applyBoxRotation(event.currentTarget, state);
  };

  const stopDrag = (event, cancelled = false) => {
    const state = interaction.current;
    if (state.pointerId !== event.pointerId) return;
    const shouldOpenProduct = !cancelled && !state.moved;
    state.dragging = false;
    state.pointerId = null;
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (shouldOpenProduct) onOpenProduct?.();
  };

  return (
    <div className="secondary-box-stage">
      <div className="secondary-box-shadow" aria-hidden="true" />
      <div
        className="secondary-box"
        role="button"
        aria-label="Rotate the GTA VI Collector's Box 360 degrees. Drag in any direction or use arrow keys. Press Enter to view the product."
        tabIndex={0}
        ref={boxRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDrag}
        onPointerCancel={event => stopDrag(event, true)}
        onLostPointerCapture={event => {
          const state = interaction.current;
          if (state.pointerId === event.pointerId) {
            state.dragging = false;
            state.pointerId = null;
          }
        }}
        onClick={event => {
          if (event.detail === 0) onOpenProduct?.();
        }}
        onKeyDown={event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onOpenProduct?.();
            return;
          }

          const step = event.shiftKey ? 45 : 15;
          const state = interaction.current;
          if (event.key === 'ArrowLeft') state.yaw -= step;
          else if (event.key === 'ArrowRight') state.yaw += step;
          else if (event.key === 'ArrowUp') state.pitch += step;
          else if (event.key === 'ArrowDown') state.pitch -= step;
          else return;

          event.preventDefault();
          applyBoxRotation(event.currentTarget, state);
        }}
      >
        <div className="secondary-box-face secondary-box-front">
          <img
            className="secondary-box-cover"
            src="/assets/box%20front%20cover%20(1).png"
            alt=""
            width={3840}
            height={3840}
            decoding="async"
            fetchPriority="high"
            draggable={false}
          />
        </div>
        <div className="secondary-box-face secondary-box-back">
          <img
            className="secondary-box-cover"
            src="/assets/box%20back%20cover.jpeg"
            alt=""
            width={4096}
            height={4096}
            decoding="async"
            draggable={false}
          />
        </div>
        <div className="secondary-box-face secondary-box-right">
          <img
            className="secondary-box-cover"
            src="/assets/box%20left%20cover.jpg.jpeg"
            alt=""
            width={2363}
            height={2363}
            decoding="async"
            draggable={false}
          />
        </div>
        <div className="secondary-box-face secondary-box-left">
          <img
            className="secondary-box-cover"
            src="/assets/box%20right%20cover.jpg.jpeg"
            alt=""
            width={2363}
            height={2363}
            decoding="async"
            draggable={false}
          />
        </div>
        <div className="secondary-box-face secondary-box-top">
          <img
            className="secondary-box-cover secondary-box-top-logo"
            src="/assets/box%20top%20logo.webp"
            alt=""
            width={1920}
            height={1357}
            decoding="async"
            draggable={false}
          />
        </div>
        <div className="secondary-box-face secondary-box-bottom" />
      </div>
      <div className="secondary-drag-hint">DRAG 360° IN ANY DIRECTION / TAP TO VIEW</div>
    </div>
  );
}

export function HomeSecondary() {
  const stickyVisible = useStickyReveal(460);
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
          <h1 id="collector-hero-title">GTA VI<br /><em>COLLECTOR'S<br />EDITION</em></h1>
          <p className="secondary-kicker">LIMITED EDITION</p>
          <p className="secondary-hero-stock">ONLY 500 BOXES.</p>
        </div>

        <InteractiveDropBox onOpenProduct={openProduct} />

        <div className="secondary-hero-cta">
          <div className="secondary-price">
            <span>PRE-ORDER PRICE</span>
            <div className="secondary-price-values"><b>{format(PRODUCT.price)}</b><s>{format(PRODUCT.oldPrice)}</s></div>
          </div>
          <button className="secondary-preorder-btn" onClick={openProduct}>
            PRE-ORDER BOX <ArrowRight size={20} />
          </button>
          <p>Secure Razorpay checkout. Delivery updates from pre-order to dispatch.</p>
        </div>
      </section>

      <section className="secondary-marquee" aria-label="Drop highlights">
        <div className="secondary-marquee-track">
          {Array.from({length: 6}, (_, copy) => (
            <div className="secondary-marquee-group" key={copy} aria-hidden={copy > 0}>
              {MARQUEE_ITEMS.map(item => (
                <span className="secondary-marquee-item" key={item}>
                  <span className="secondary-marquee-star" aria-hidden="true">✦</span>
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="secondary-final-cta" aria-labelledby="collector-box-title">
        <div className="secondary-final-copy">
          <p className="secondary-kicker">COLLECTOR'S EDITION</p>
          <h2 id="collector-box-title">{PRODUCT.name}</h2>
          <p className="secondary-final-tagline">EXCLUSIVE BOX · LIMITED EDITION</p>
          <div className="secondary-final-proof">
            <span><Check size={15} /> One premium drop</span>
            <span><Check size={15} /> Smooth product gallery</span>
            <span><Check size={15} /> Pre-order at {format(PRODUCT.price)}</span>
          </div>
        </div>
        <img
          className="secondary-final-image"
          src="/assets/Gta_VI.png"
          alt="GTA VI Collector's Box"
          width={1254}
          height={1254}
          loading="lazy"
          decoding="async"
        />
        <button className="secondary-preorder-btn" onClick={openProduct}>
          PRE-ORDER BOX <ArrowRight size={20} />
        </button>
      </section>

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

      <section className="secondary-testimonials" id="reviews" aria-labelledby="secondary-testimonials-title">
        <div className="secondary-testimonials-heading">
          <div>
            <p className="secondary-kicker">TESTIMONIAL PREVIEW // THE DROP</p>
            <h2 id="secondary-testimonials-title">THE DROP,<br /><em>IN THEIR WORDS.</em></h2>
          </div>
          <p>From the first look at the box to the final checkout step, the small details shape the whole experience.</p>
        </div>

        <div className="secondary-testimonials-grid">
          {TESTIMONIAL_PREVIEW.map((review, index) => (
            <article className="secondary-testimonial-card" key={review.topic}>
              <div className="secondary-testimonial-topline">
                <span>0{index + 1} / 03</span>
                <span>{review.topic}</span>
              </div>
              <span className="secondary-testimonial-quote" aria-hidden="true">“</span>
              <blockquote>{review.quote}</blockquote>
              <div className="secondary-testimonial-footer">
                <span className="secondary-testimonial-mark" aria-hidden="true">{review.initials}</span>
                <span><strong>{review.name}</strong><small>Sample review</small></span>
              </div>
            </article>
          ))}
        </div>
        <p className="secondary-testimonials-note">Preview testimonials for layout. Replace with customer-submitted reviews before publishing.</p>
      </section>

      <Faq />

      <div className={`secondary-sticky-preorder ${stickyVisible ? 'is-visible' : ''}`}>
        <div>
          <small>PRE-ORDER</small>
          <b>{format(PRODUCT.price)}</b>
        </div>
        <button onClick={openProduct}>PRE-ORDER BOX <ArrowRight size={17} /></button>
      </div>
    </main>
  );
}
