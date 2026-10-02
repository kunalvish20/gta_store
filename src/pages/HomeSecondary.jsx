import {ArrowRight, Check, PackageCheck, ShieldCheck, Sparkles} from 'lucide-react';
import {useEffect, useRef} from 'react';
import {BoxGallery} from '../components/BoxGallery';
import {Faq} from '../components/Faq';
import {PRODUCT, PRODUCT_PATH} from '../data/catalog';
import {format} from '../lib/format';
import {go} from '../hooks/useRoute';
import {useStore} from '../context/StoreContext';
import {useStickyReveal} from '../hooks/useStickyReveal';

function InteractiveDropBox() {
  const boxRef = useRef(null);
  const interaction = useRef({
    yaw: -18,
    pitch: -8,
    dragging: false,
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
    state.x = event.clientX;
    state.y = event.clientY;
    state.yaw += dx * 0.42;
    state.pitch = Math.max(-22, Math.min(18, state.pitch - dy * 0.22));
  };

  const stopDrag = event => {
    const state = interaction.current;
    if (state.pointerId !== event.pointerId) return;
    state.dragging = false;
    state.pointerId = null;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  return (
    <div className="secondary-box-stage" aria-label="Interactive rotating pre-order box">
      <div className="secondary-box-shadow" />
      <div
        className="secondary-box"
        ref={boxRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
      >
        <div className="secondary-box-face secondary-box-front">
          <span className="box-kicker">D&amp;D // 001</span>
          <strong>VICE<br />PACK</strong>
          <div className="box-line" />
          <small>PRE-ORDER EDITION</small>
        </div>
        <div className="secondary-box-face secondary-box-back">
          <span>ONE DROP</span>
          <b>₹4,999</b>
          <small>LIMITED PRE-ORDER</small>
        </div>
        <div className="secondary-box-face secondary-box-right"><span>VICE // 001</span></div>
        <div className="secondary-box-face secondary-box-left"><span>D&amp;D STORE</span></div>
        <div className="secondary-box-face secondary-box-top"><span>PRE-ORDER</span></div>
        <div className="secondary-box-face secondary-box-bottom"><span>2026 DROP</span></div>
      </div>
      <div className="secondary-drag-hint">DRAG TO ROTATE</div>
    </div>
  );
}

export function HomeSecondary() {
  const {preorder} = useStore();
  const stickyVisible = useStickyReveal(460);
  const startPreorder = () => preorder(PRODUCT.id, 1);

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
          <p className="secondary-subcopy">A black collector box staged under neon magenta motion — made for one clean pre-order decision and a premium product reveal.</p>
        </div>

        <InteractiveDropBox />

        <div className="secondary-hero-cta">
          <div className="secondary-price">
            <span>PRE-ORDER PRICE</span>
            <b>{format(PRODUCT.price)}</b>
          </div>
          <button className="secondary-preorder-btn" onClick={startPreorder}>
            PRE-ORDER OUTFIT <ArrowRight size={20} />
          </button>
          <p>Tap pre-order to open the cart drawer, then complete secure Razorpay checkout.</p>
        </div>
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
            <b>High-impact presentation</b>
            <p>Dark surfaces, controlled magenta glow and large-format square visuals keep attention on the product.</p>
          </article>
          <article>
            <ShieldCheck />
            <b>Focused single-product flow</b>
            <p>No catalogue clutter. Every section reinforces the same pre-order action and product story.</p>
          </article>
          <article>
            <PackageCheck />
            <b>Mobile-first conversion</b>
            <p>Fast image loading, touch-friendly sliders and a sticky pre-order CTA only after the user scrolls.</p>
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
          PRE-ORDER OUTFIT <ArrowRight size={20} />
        </button>
      </section>

      <Faq />

      <div className={`secondary-sticky-preorder ${stickyVisible ? 'is-visible' : ''}`}>
        <div>
          <small>PRE-ORDER</small>
          <b>{format(PRODUCT.price)}</b>
        </div>
        <button onClick={startPreorder}>PRE-ORDER OUTFIT <ArrowRight size={17} /></button>
      </div>
    </main>
  );
}
