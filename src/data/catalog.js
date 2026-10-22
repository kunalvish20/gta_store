export const SITE = {
  name: 'DND Store',
  shortName: 'DND',
  origin: 'https://gta-store.example.com',
  supportEmail: 'support@gta-store.example.com',
  supportPhone: '+91 98765 43210',
  supportHours: 'Mon-Sat, 10 AM-7 PM IST'
};

export const PRODUCT = {
  id: 'gta-collector-box',
  name: 'GTA VI Collector Box',
  shortName: 'Collector Box',
  category: '5 Item Collector Drop',
  price: 6499,
  oldPrice: 9999,
  rating: 4.9,
  reviews: 128,
  tag: 'Pre-Order Drop',
  description:
    'A premium pre-order collector drop built around black surfaces, neon nights and Vice-inspired energy.',
  highlights: [
    'Five display-ready collector items',
    'Secure Razorpay checkout',
    'Protective gift-ready packing',
    'Tracked delivery updates after dispatch'
  ]
};

export const PRODUCTS = [PRODUCT];
export const MAX_ORDER_QUANTITY = 10;
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
  'The box presentation feels premium and the included items make the drop feel complete.',
  'Checkout was clear, payment felt safe, and the order summary was easy to review.',
  'The product images, packaging details, and support links made the store feel reliable.'
];

export const HERO_PRODUCT = PRODUCT;
export const BOX_SLIDES = BOX_ITEMS.map(item => ({
  type: 'image',
  src: item.src,
  label: item.name
}));
