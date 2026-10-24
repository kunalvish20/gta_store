export const SITE = {
  name: 'DND Store',
  shortName: 'DND',
  origin: 'https://dndstores.com',
  supportEmail: '',
  creatorEmail: 'workdndstores@gmail.com',
  supportPhone: '',
  supportHours: 'Mon-Sat, 10 AM-7 PM IST'
};

export const PRODUCT = {
  id: 'gta-collector-box',
  name: "GTA VI Collector's Box",
  shortName: "Collector's Box",
  category: "11 Item Collector's Edition",
  price: 6499,
  oldPrice: 9999,
  rating: 4.9,
  reviews: 128,
  tag: 'Pre-Order Drop',
  description:
    "An 11-piece pre-order collection of Vice-inspired apparel, accessories, artwork, and display pieces in one Collector's Box.",
  highlights: [
    "11 Collector's Edition items",
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
    detail: "The illustrated Collector's Box brings the 11-piece drop together, with vivid Vice-inspired artwork on every visible side.",
    src: '/assets/collector-box.webp'
  },
  {
    name: 'Display lamp',
    heading: 'Bring the neon home.',
    detail: 'The VI display lamp puts a bright pink accent on a desk or shelf, with palms and the game logo at the center of the glow.',
    src: '/assets/lamp_gta-VI.png'
  },
  {
    name: 'VI hoodie',
    heading: 'Take the drop beyond your setup.',
    detail: 'A black pullover hoodie with a crisp palm-filled VI mark on the chest. A quiet everyday piece with a clear nod to the collection.',
    src: '/assets/vi-hoodie.webp'
  },
  {
    name: 'Console controller holder',
    heading: 'Give your controller a place to rest.',
    detail: 'A VI-inspired stand for displaying your console controller between sessions. Console and controller are shown for context.',
    src: '/assets/gamibng.png'
  },
  {
    name: "Lucia's Customized Bandana",
    heading: 'A classic with a bold twist.',
    detail: 'A bright red bandana with a white paisley pattern. Wear it, tie it to a bag, or add it to your display.',
    src: '/assets/red-bandana.webp'
  },
  {
    name: 'Desk mat',
    heading: 'Set the scene at your desk.',
    detail: 'A desk mat for your gaming setup. Product image and final design details are coming soon.'
  },
  {
    name: 'Game-case keychain',
    heading: 'Carry a little Vice City.',
    detail: 'A miniature blue game-case charm with colorful VI artwork, attached to a metal key ring.',
    src: '/assets/game-case-keychain.webp'
  },
  {
    name: "DND I'm Playing GTA 6 door hanger",
    heading: 'Let the door do the talking.',
    detail: 'A colorful do-not-disturb door hanger for your gaming space, featuring VI artwork and a playful Vice City message.',
    src: '/assets/vice-city-door-hanger.webp'
  },
  {
    name: 'Vice City poster',
    heading: 'Put the city on your wall.',
    detail: 'A wide illustrated poster featuring a collage of characters, vehicles, and coastal scenes around the VI artwork.',
    src: '/assets/poster-full.jpg'
  },
  {
    name: 'Sticker pack',
    heading: 'Make your gear your own.',
    detail: 'A set of six bold graphics, from palm-filled VI marks to Vice City characters and playful slogans, ready for your favorite surfaces.',
    src: '/assets/sticker-pack.webp'
  },
  {
    name: 'GTA VI Map (Londia Map)',
    heading: 'Explore the world beyond the box.',
    detail: 'A GTA VI map to unfold and explore. Product image and final design details are coming soon.'
  }
];

export const REVIEWS = [
  'The box presentation feels premium and the included items make the drop feel complete.',
  'Checkout was clear, payment felt safe, and the order summary was easy to review.',
  'The product images, packaging details, and support links made the store feel reliable.'
];

export const HERO_PRODUCT = PRODUCT;
export const BOX_SLIDES = BOX_ITEMS.map(item => ({
  type: item.src ? 'image' : 'placeholder',
  src: item.src,
  label: item.name
}));
