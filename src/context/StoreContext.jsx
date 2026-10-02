import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {PRODUCTS} from '../data/catalog';

const StoreContext = createContext(null);

const readJson = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
};

export function StoreProvider({children}) {
  const [cart, setCart] = useState(() => readJson('dd_cart', {}));
  const [isCartDrawerOpen, setCartDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('dd_cart', JSON.stringify(cart));
  }, [cart]);

  const value = useMemo(() => {
    const add = (id, qty = 1) => {
      setCart(current => ({...current, [id]: (current[id] || 0) + qty}));
    };

    const preorder = (id, qty = 1) => {
      setCart(current => ({...current, [id]: (current[id] || 0) + qty}));
      setCartDrawerOpen(true);
    };

    const setQty = (id, qty) => {
      setCart(current => {
        const next = {...current};
        if (qty <= 0) delete next[id];
        else next[id] = qty;
        return next;
      });
    };

    const clearCart = () => setCart({});
    const openCartDrawer = () => setCartDrawerOpen(true);
    const closeCartDrawer = () => setCartDrawerOpen(false);

    const count = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
    const subtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
      const product = PRODUCTS.find(item => item.id === id);
      return sum + (product?.price || 0) * qty;
    }, 0);

    return {
      cart,
      add,
      preorder,
      setQty,
      clearCart,
      count,
      subtotal,
      isCartDrawerOpen,
      openCartDrawer,
      closeCartDrawer
    };
  }, [cart, isCartDrawerOpen]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);
