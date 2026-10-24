import {ShoppingBag} from 'lucide-react';
import {useEffect, useRef, useState} from 'react';
import {PRODUCT, PRODUCT_PATH} from '../data/catalog';
import {BrandLogo} from './BrandLogo';
import {useStore} from '../context/StoreContext';
import {go, useRoute} from '../hooks/useRoute';

const links = [
  ['Product', PRODUCT_PATH],
  ['Inside Box', `${PRODUCT_PATH}?inside`],
  ['Reviews', '/?reviews'],
  ['Cart', '/cart']
];

export function Header() {
  const route = useRoute();
  const {count} = useStore();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const isPreorderRoute = ['/', '/home', '/homepage-secondary', '/home-secondary'].includes(route) || route === PRODUCT_PATH || route.startsWith('/product/');

  useEffect(() => setOpen(false), [route]);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    const desktop = window.matchMedia('(min-width: 981px)');
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    const closeOnEscape = event => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeOnEscape);
    desktop.addEventListener('change', closeOnDesktop);
    closeOnDesktop();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [open]);

  const navigate = path => {
    setOpen(false);
    go(path.split('?')[0]);
    if (path.includes('inside')) setTimeout(() => document.getElementById('inside-box')?.scrollIntoView({behavior: 'smooth'}), 80);
    if (path.includes('reviews')) setTimeout(() => document.getElementById('reviews')?.scrollIntoView({behavior: 'smooth'}), 80);
  };

  return (
    <>
      <header className="site-header">
        <BrandLogo />
        <nav>
          {links.slice(0, 3).map(([label, path]) => (
            <button key={label} onClick={() => navigate(path)}>{label}</button>
          ))}
        </nav>
        <div className="header-actions">
          <button className="cart-icon" aria-label="Open cart" onClick={() => go('/cart')}>
            <ShoppingBag size={19} />
            {count > 0 && <b>{count}</b>}
          </button>
          <button className="buy-link" onClick={() => go(PRODUCT_PATH)}>{isPreorderRoute ? 'Pre-Order' : 'Buy Now'}</button>
          <button
            ref={menuButtonRef}
            type="button"
            className={`menu-btn ${open ? 'is-open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-controls="site-mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen(value => !value)}
          >
            <span className="menu-glyph" aria-hidden="true"><span /><span /><span /></span>
          </button>
        </div>
      </header>
      <div className={`mobile-menu-backdrop ${open ? 'is-open' : ''}`} aria-hidden="true" onClick={() => setOpen(false)} />
      <nav id="site-mobile-menu" className={`mobile-menu ${open ? 'is-open' : ''}`} aria-label="Mobile navigation" aria-hidden={!open} inert={!open}>
        <b>{PRODUCT.name}</b>
        {links.map(([label, path]) => (
          <button key={label} type="button" onClick={() => navigate(path)}>{label}</button>
        ))}
      </nav>
    </>
  );
}
