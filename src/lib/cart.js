import {MAX_ORDER_QUANTITY, PRODUCTS} from '../data/catalog.js';

const normalizeQuantity = value => {
  if (typeof value !== 'number' && typeof value !== 'string') return 0;
  const quantity = Number(value);
  return Number.isFinite(quantity)
    ? Math.max(0, Math.min(MAX_ORDER_QUANTITY, Math.floor(quantity)))
    : 0;
};

export function normalizeCart(cart) {
  if (!cart || typeof cart !== 'object' || Array.isArray(cart)) return {};
  return Object.fromEntries(PRODUCTS.flatMap(({id}) => {
    const quantity = normalizeQuantity(cart[id]);
    return quantity ? [[id, quantity]] : [];
  }));
}

export function setCartItemQuantity(cart, id, quantity) {
  const next = normalizeCart(cart);
  if (!PRODUCTS.some(product => product.id === id)) return next;
  const normalizedQuantity = normalizeQuantity(quantity);
  if (normalizedQuantity) next[id] = normalizedQuantity;
  else delete next[id];
  return next;
}

export function addCartItem(cart, id, quantity = 1) {
  const next = normalizeCart(cart);
  return setCartItemQuantity(next, id, (next[id] || 0) + normalizeQuantity(quantity));
}
