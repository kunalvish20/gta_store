import {Menu, ShoppingBag, X} from 'lucide-react';
import {useState} from 'react';
import {PRODUCT, PRODUCT_PATH} from '../data/catalog';
import {useStore} from '../context/StoreContext';
import {go, useRoute} from '../hooks/useRoute';

const links = [
  ['Product', PRODUCT_PATH],
  ['Inside Box', `${PRODUCT_PATH}?inside`],
  ['Reviews', `${PRODUCT_PATH}?reviews`],
  ['Cart', '/cart']
];

export function Header() {
  const route = useRoute();
  const {count} = useStore();
  const [open, setOpen] = useState(false);
  const isPreorderRoute = ['/', '/home', '/homepage-secondary', '/home-secondary'].includes(route) || route === PRODUCT_PATH || route.startsWith('/product/');

  const navigate = path => {
    setOpen(false);
    go(path.split('?')[0]);
    if (path.includes('inside')) setTimeout(() => document.getElementById('inside-box')?.scrollIntoView({behavior: 'smooth'}), 80);
    if (path.includes('reviews')) setTimeout(() => document.getElementById('reviews')?.scrollIntoView({behavior: 'smooth'}), 80);
  };

  return (
    <>
      <header className="site-header">
        <button className="brand" onClick={() => go('/')}>
          D&D <span>STORE</span>
        </button>
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
          <button className="menu-btn" aria-label="Menu" onClick={() => setOpen(value => !value)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {open && (
        <div className="mobile-menu">
          <b>{PRODUCT.name}</b>
          {links.map(([label, path]) => (
            <button key={label} onClick={() => navigate(path)}>{label}</button>
          ))}
        </div>
      )}
    </>
  );
}
