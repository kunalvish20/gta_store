export const SITE = {
  name: 'DND Store',
  shortName: 'DND',
  origin: 'https://dndstores.com',
  supportEmail: '',
  supportPhone: '',
  supportHours: 'Mon-Sat, 10 AM-7 PM IST'
};

export const PRODUCT = {
  id: 'gta-collector-box',
  name: "GTA VI Collector's Box",
  shortName: "Collector's Box",
  category: "9 Item Collector's Edition",
  price: 6499,
  oldPrice: 9999,
  rating: 4.9,
  reviews: 128,
  tag: 'Pre-Order Drop',
  description:
    "A nine-piece pre-order collection of Vice-inspired apparel, accessories, artwork, and display pieces in one Collector's Box.",
  highlights: [
    "9 display-ready Collector's Edition items",
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
    name: "Collector's Box",
    heading: 'The collection starts here.',
    detail: "The illustrated Collector's Box brings the nine-piece drop together, with vivid Vice-inspired artwork on every visible side.",
    src: '/assets/collector-box.webp'
  },
  {
    name: 'VI hoodie',
    heading: 'Take the drop beyond your setup.',
    detail: 'A black pullover hoodie with a crisp palm-filled VI mark on the chest. A quiet everyday piece with a clear nod to the collection.',
    src: '/assets/vi-hoodie.webp'
  },
  {
    name: 'Display lamp',
    heading: 'Bring the neon home.',
    detail: 'The VI display lamp puts a bright pink accent on a desk or shelf, with palms and the game logo at the center of the glow.',
    src: '/assets/lamp_gta-VI.png'
  },
  {
    name: 'Vice City poster',
    heading: 'Put the city on your wall.',
    detail: 'A wide illustrated poster featuring a collage of characters, vehicles, and coastal scenes around the VI artwork.',
    src: '/assets/poster-full.jpg'
  },
  {
    name: 'Vice City door hanger',
    heading: 'Do not disturb. Vice City calling.',
    detail: 'A colorful door hanger with sunset palms, the VI artwork, and a playful message for your gaming space.',
    src: '/assets/vice-city-door-hanger.webp'
  },
  {
    name: 'Sticker pack',
    heading: 'Make your gear your own.',
    detail: 'A set of six bold graphics, from palm-filled VI marks to Vice City characters and playful slogans, ready for your favorite surfaces.',
    src: '/assets/sticker-pack.webp'
  },
  {
    name: 'Red bandana',
    heading: 'A classic with a bold twist.',
    detail: 'A bright red bandana with a white paisley pattern. Wear it, tie it to a bag, or add it to your display.',
    src: '/assets/red-bandana.webp'
  },
  {
    name: 'Game-case keychain',
    heading: 'Carry a little Vice City.',
    detail: 'A miniature blue game-case charm with colorful VI artwork, attached to a metal key ring.',
    src: '/assets/game-case-keychain.webp'
  },
  {
    name: "Collector's logo card",
    heading: 'Finish with the signature artwork.',
    detail: 'The bold VI logo card gives the collection one more display detail, with a pink-to-orange city palette.',
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
