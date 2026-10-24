import {BOX_ITEMS} from '../data/catalog';
import {ProductArt} from './ProductArt';
import './ProductStorySections.css';

const FEATURE_COPY = [
  {
    heading: 'A centerpiece for your setup.',
    description: 'Give your desk or shelf a clear focal point with the gaming collectible included in the box.'
  },
  {
    heading: 'The collection starts with the box.',
    description: "See the Collector's Box that brings the edition together, from the first reveal to the finished display."
  },
  {
    heading: 'Set the mood with light.',
    description: 'The display lamp brings a neon-inspired accent to your gaming space or collection shelf.'
  },
  {
    heading: 'Bring the artwork into view.',
    description: 'The Vice City poster adds a bold visual to your wall, desk, or collector display.'
  },
  {
    heading: 'Finish the display.',
    description: "The Collector's logo card is a final visual detail to pair with the other featured pieces."
  }
];

const TOTAL_ITEMS = 9;

export function ProductStorySections() {
  return (
    <section className="product-story-sections" id="inside-box" aria-label="What's inside the box">
      {Array.from({length: TOTAL_ITEMS}, (_, index) => {
        const item = BOX_ITEMS[index];
        const copy = FEATURE_COPY[index];
        const number = String(index + 1).padStart(2, '0');

        return (
          <article className="collector-item" key={number}>
            <div className="collector-item-copy">
              <p className="collector-item-eyebrow">
                {index === 0 ? "WHAT'S INSIDE THE BOX" : 'INSIDE THE BOX'}
                <span>{number} / 09</span>
              </p>
              <h2>{copy?.heading ?? `Collector's item ${number}`}</h2>
              <p className="collector-item-description">
                {copy?.description ?? 'Image and item details will be added here when the full collection is revealed.'}
              </p>
              {item && <p className="collector-item-name">Included piece <b>{item.name}</b></p>}
            </div>

            <figure className={`collector-item-media${item ? '' : ' is-pending'}`}>
              {item ? <ProductArt item={item} large /> : (
                <div className="collector-item-placeholder" role="img" aria-label={`Image for collector's item ${number} coming soon`}>
                  <span>{number}</span>
                  <small>Image coming soon</small>
                </div>
              )}
              <figcaption>{item?.name ?? `Collector's item ${number}`} <span>{number} / 09</span></figcaption>
            </figure>
          </article>
        );
      })}
    </section>
  );
}
