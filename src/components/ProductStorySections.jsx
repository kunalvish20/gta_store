import {ArrowUpRight, Check, Layers3, Lightbulb, PackageCheck} from 'lucide-react';
import {BOX_ITEMS} from '../data/catalog';
import {BoxGallery} from './BoxGallery';
import {ProductArt} from './ProductArt';
import './ProductStorySections.css';

export function ProductStorySections() {
  return (
    <div className="product-story-sections">
      <BoxGallery
        eyebrow="02 / INSIDE YOUR BOX"
        title="Featured pieces. One Collector's Box."
        className="product-story-section collector-story-gallery"
      />

      <section className="collector-feature collector-feature-image-left" aria-labelledby="collector-setup-title">
        <figure className="collector-feature-media">
          <ProductArt item={BOX_ITEMS[2]} large />
          <figcaption>
            <Lightbulb size={18} aria-hidden="true" />
            <span><b>Display lamp</b><small>Included in your Collector's Box</small></span>
          </figcaption>
        </figure>

        <div className="collector-feature-copy">
          <p className="collector-story-eyebrow">03 / MAKE IT YOUR SETUP</p>
          <h2 id="collector-setup-title">Bring the Vice City mood home.</h2>
          <p className="collector-story-description">
            Give your gaming desk or shelf its own display moment. The neon-style lamp and gaming collectible bring the box beyond the unboxing.
          </p>
          <ul className="collector-benefits">
            <li><Check size={18} aria-hidden="true" /><span>A display lamp for that neon-inspired shelf mood.</span></li>
            <li><Check size={18} aria-hidden="true" /><span>A gaming collectible to anchor your desk display.</span></li>
            <li><Check size={18} aria-hidden="true" /><span>Matching artwork to complete the edition theme.</span></li>
          </ul>
          <div className="collector-feature-note">
            <Layers3 size={20} aria-hidden="true" />
            <p><b>One box, a complete display.</b><span>All 9 Collector's Edition items are included.</span></p>
          </div>
        </div>
      </section>

      <section className="collector-feature collector-feature-image-right" aria-labelledby="collector-details-title">
        <div className="collector-feature-copy">
          <p className="collector-story-eyebrow">04 / THE FINISHING DETAILS</p>
          <h2 id="collector-details-title">From the first reveal to the final detail.</h2>
          <p className="collector-story-description">
            The Vice City poster gives your wall or desk a full visual moment. Its bold artwork brings the color and energy of the Collector's Box into your space.
          </p>
          <ul className="collector-benefits">
            <li><Check size={18} aria-hidden="true" /><span>A poster insert for your wall or desk display.</span></li>
            <li><Check size={18} aria-hidden="true" /><span>Vice-inspired artwork that makes the display feel complete.</span></li>
            <li><Check size={18} aria-hidden="true" /><span>Packed with the rest of your collection in one box.</span></li>
          </ul>
          <div className="collector-feature-note">
            <PackageCheck size={20} aria-hidden="true" />
            <p><b>Made for the unboxing.</b><span>Packed with your collection in mind.</span></p>
          </div>
          <a className="collector-story-link" href="#inside-box" onClick={event => { event.preventDefault(); document.getElementById('inside-box')?.scrollIntoView({behavior: 'smooth'}); }}>
            Explore featured items <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>

        <figure className="collector-feature-media">
          <ProductArt item={BOX_ITEMS[3]} large />
          <figcaption>
            <Layers3 size={18} aria-hidden="true" />
            <span><b>Vice City poster</b><small>A full visual for your wall or desk</small></span>
          </figcaption>
        </figure>
      </section>

      <section className="collector-feature collector-feature-image-left collector-logo-feature" aria-labelledby="collector-logo-title">
        <figure className="collector-feature-media">
          <ProductArt item={BOX_ITEMS[4]} large />
          <figcaption>
            <Layers3 size={18} aria-hidden="true" />
            <span><b>Collector's logo card</b><small>A finishing piece for your box</small></span>
          </figcaption>
        </figure>

        <div className="collector-feature-copy">
          <p className="collector-story-eyebrow">05 / THE FINAL PIECE</p>
          <h2 id="collector-logo-title">A finishing touch for your collection.</h2>
          <p className="collector-story-description">
            The Collector's logo card adds one more piece to the Vice City display. Place it beside the poster, lamp, and gaming collectible to tie the full box together.
          </p>
          <ul className="collector-benefits">
            <li><Check size={18} aria-hidden="true" /><span>A bold logo piece for your desk or shelf.</span></li>
            <li><Check size={18} aria-hidden="true" /><span>Easy to pair with the poster and Collector's artwork.</span></li>
            <li><Check size={18} aria-hidden="true" /><span>Included with the rest of your edition pieces.</span></li>
          </ul>
          <div className="collector-feature-note">
            <PackageCheck size={20} aria-hidden="true" />
            <p><b>All 9, together.</b><span>The complete collection comes in one box.</span></p>
          </div>
          <a className="collector-story-link" href="#inside-box" onClick={event => { event.preventDefault(); document.getElementById('inside-box')?.scrollIntoView({behavior: 'smooth'}); }}>
            Explore featured items <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}
