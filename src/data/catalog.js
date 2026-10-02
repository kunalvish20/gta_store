export const PRODUCT = {
  id: 'dd-collector-box',
  name: 'GTA VI Collector Box',
  shortName: 'Collector Box',
  category: '5 Item Collector Drop',
  price: 4999,
  oldPrice: 4999,
  rating: 4.9,
  reviews: 128,
  tag: 'Pre-Order Drop',
  description:
    'A premium pre-order collector drop built around black surfaces, neon nights and Vice-inspired energy.',
  highlights: [
    'Only product in the store',
    'Five display-ready items inside',
    'Protective gift-ready packing',
    'Fast cart and checkout flow'
  ]
};

export const PRODUCTS = [PRODUCT];
export const PRODUCT_PATH = `/product/${PRODUCT.id}`;

export const BOX_ITEMS = [
  {
    name: 'Gaming collectible',
    detail: 'Hero desk collectible for the main display moment.',
    src: '/assets/gamibng.png'
  },
  {
    name: 'Collector artwork',
    detail: 'Premium GTA-inspired artwork for the box reveal.',
    src: '/assets/Gta_VI.png'
  },
  {
    name: 'Display lamp',
    detail: 'Neon-style lamp piece for the Vice City shelf mood.',
    src: '/assets/lamp_gta-VI.png'
  },
  {
    name: 'Vice City poster',
    detail: 'Full visual poster insert for wall or desk display.',
    src: '/assets/poster-full.jpg'
  },
  {
    name: 'Collector logo card',
    detail: 'Finishing insert with care and collector details.',
    src: '/assets/poster-logo.png',
    contain: true
  }
];

export const REVIEWS = [
  'The box looks premium straight away. The five items make it feel complete.',
  'Checkout was clear and the sticky cart button made buying easy on mobile.',
  'The GTA-style colors and product images made it feel like a real drop.'
];

export const HERO_PRODUCT = PRODUCT;
export const BOX_SLIDES = BOX_ITEMS.map(item => ({
  type: 'image',
  src: item.src,
  label: item.name
}));
