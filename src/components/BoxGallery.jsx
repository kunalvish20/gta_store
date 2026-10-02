import {ChevronLeft, ChevronRight} from 'lucide-react';
import {useRef, useState} from 'react';
import {BOX_ITEMS} from '../data/catalog';
import {ProductArt} from './ProductArt';

export function BoxGallery({
  eyebrow = 'Inside the box',
  title = 'Five frames. One premium drop.',
  className = ''
}) {
  const [active, setActive] = useState(0);
  const touchStart = useRef(null);
  const item = BOX_ITEMS[active];

  const move = direction => {
    setActive(index => (index + direction + BOX_ITEMS.length) % BOX_ITEMS.length);
  };

  const onTouchEnd = event => {
    if (touchStart.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(delta) > 44) move(delta > 0 ? -1 : 1);
    touchStart.current = null;
  };

  return (
    <section className={`box-section dynamic-product-story ${className}`} id="inside-box">
      <div className="section-title">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>

      <div className="box-grid">
        <div
          className="gallery-card dynamic-gallery-card"
          onTouchStart={event => { touchStart.current = event.touches[0].clientX; }}
          onTouchEnd={onTouchEnd}
        >
          <div className="dynamic-slide" key={item.src}>
            <ProductArt item={item} large priority={active === 0} />
          </div>
          <button className="gallery-arrow left" aria-label="Previous item" onClick={() => move(-1)}><ChevronLeft /></button>
          <button className="gallery-arrow right" aria-label="Next item" onClick={() => move(1)}><ChevronRight /></button>
          <div className="gallery-caption">
            <span>0{active + 1} / 0{BOX_ITEMS.length}</span>
            <b>{item.name}</b>
          </div>
        </div>

        <div className="box-copy dynamic-copy" key={`${item.name}-copy`}>
          <p className="dynamic-index">FRAME 0{active + 1}</p>
          <h3>{item.name}</h3>
          <p>{item.detail}</p>
          <div className="dynamic-progress" aria-hidden="true">
            <i style={{width: `${((active + 1) / BOX_ITEMS.length) * 100}%`}} />
          </div>
          <div className="dynamic-dots" aria-label="Choose a product frame">
            {BOX_ITEMS.map((boxItem, index) => (
              <button
                key={boxItem.name}
                className={active === index ? 'active' : ''}
                onClick={() => setActive(index)}
                aria-label={`Show ${boxItem.name}`}
              >
                <span>0{index + 1}</span>
                <b>{boxItem.name}</b>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
