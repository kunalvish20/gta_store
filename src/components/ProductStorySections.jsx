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
        title="Five pieces. One collector box."
        className="product-story-section collector-story-gallery"
      />

      <section className="collector-feature collector-feature-image-left" aria-labelledby="collector-setup-title">
        <figure className="collector-feature-media">
          <ProductArt item={BOX_ITEMS[2]} large />
          <figcaption>
            <Lightbulb size={18} aria-hidden="true" />
            <span><b>Display lamp</b><small>Included in your collector box</small></span>
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
            <li><Check size={18} aria-hidden="true" /><span>Matching artwork to complete the collector theme.</span></li>
          </ul>
          <div className="collector-feature-note">
            <Layers3 size={20} aria-hidden="true" />
            <p><b>One box, a complete display.</b><span>All five collector items are included.</span></p>
          </div>
        </div>
      </section>

      <section className="collector-feature collector-feature-image-right" aria-labelledby="collector-details-title">
        <div className="collector-feature-copy">
          <p className="collector-story-eyebrow">04 / THE FINISHING DETAILS</p>
          <h2 id="collector-details-title">From the first reveal to the final detail.</h2>
          <p className="collector-story-description">
            The Vice City poster gives your wall or desk a full visual moment. Collector artwork and a logo card round out the box, with care details for your collection.
          </p>
          <ul className="collector-benefits">
            <li><Check size={18} aria-hidden="true" /><span>A poster insert for your wall or desk display.</span></li>
            <li><Check size={18} aria-hidden="true" /><span>A collector logo card with care and collector details.</span></li>
            <li><Check size={18} aria-hidden="true" /><span>Protective, gift-ready packing for the full box.</span></li>
          </ul>
          <div className="collector-feature-note">
            <PackageCheck size={20} aria-hidden="true" />
            <p><b>Made for the unboxing.</b><span>Packed with your collection in mind.</span></p>
          </div>
          <a className="collector-story-link" href="#inside-box" onClick={event => { event.preventDefault(); document.getElementById('inside-box')?.scrollIntoView({behavior: 'smooth'}); }}>
            Explore all five items <ArrowUpRight size={17} aria-hidden="true" />
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
    </div>
  );
}
