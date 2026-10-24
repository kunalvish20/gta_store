import {BOX_ITEMS} from '../data/catalog';
import {ProductArt} from './ProductArt';
import './ProductStorySections.css';

export function ProductStorySections() {
  const total = String(BOX_ITEMS.length).padStart(2, '0');
  return (
    <section className="product-story-sections" id="inside-box" aria-label="What's inside the box">
      {BOX_ITEMS.map((item, index) => {
        const number = String(index + 1).padStart(2, '0');

        return (
          <article className="collector-item" key={number}>
            <div className="collector-item-copy">
              <p className="collector-item-eyebrow">
                {index === 0 ? "WHAT'S INSIDE THE BOX" : 'INSIDE THE BOX'}
                <span>{number} / {total}</span>
              </p>
              <h2>{item.heading}</h2>
              <p className="collector-item-description">{item.detail}</p>
              <p className="collector-item-name">Included piece <b>{item.name}</b></p>
            </div>

            <figure className="collector-item-media">
              <ProductArt item={item} large />
              <figcaption>{item.name} <span>{number} / {total}</span></figcaption>
            </figure>
          </article>
        );
      })}
    </section>
  );
}
