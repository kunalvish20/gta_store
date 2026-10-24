import {PRODUCT, PRODUCT_PATH, SITE} from './catalog.js';
import {FAQ_ITEMS} from './faq.js';
import {INFO_PAGES} from './infoPages.js';
import {format} from '../lib/format.js';

export const INDEXABLE_PATHS = ['/', PRODUCT_PATH, ...Object.keys(INFO_PAGES).map(path => `/${path}`)];

export function getSeoPage(path) {
  const url = `${SITE.origin}${path}`;
  const image = `${SITE.origin}/assets/Gta-box.webp`;
  const organization = {
    '@type': 'Organization',
    '@id': `${SITE.origin}/#organization`,
    name: SITE.name,
    url: SITE.origin
  };
  const website = {
    '@type': 'WebSite',
    '@id': `${SITE.origin}/#website`,
    name: SITE.name,
    url: `${SITE.origin}/`,
    publisher: {'@id': organization['@id']}
  };

  let title;
  let description;
  let heading;
  let robots = 'index,follow,max-image-preview:large';
  const graph = [organization, website];

  if (path === '/') {
    title = "GTA VI Collector's Box Pre-Order | DND Store";
    description = "Explore the 9-item GTA VI Collector's Box, preview featured collectibles, and pre-order with secure Razorpay checkout and free standard delivery.";
    heading = "GTA VI Collector's Edition";
  } else if (path === PRODUCT_PATH) {
    title = `${PRODUCT.name} | Pre-Order for ${format(PRODUCT.price)} | ${SITE.name}`;
    description = `Pre-order the 9-item ${PRODUCT.name} for ${format(PRODUCT.price)}. Explore the featured items, review delivery details, and check out securely with Razorpay.`;
    heading = PRODUCT.name;
    graph.push({
      '@type': 'Product',
      '@id': `${url}#product`,
      name: PRODUCT.name,
      description: PRODUCT.description,
      image: [image],
      sku: PRODUCT.id,
      category: PRODUCT.category,
      offers: {
        '@type': 'Offer',
        url,
        price: PRODUCT.price,
        priceCurrency: 'INR',
        availability: 'https://schema.org/PreOrder',
        seller: {'@id': organization['@id']}
      }
    });
    graph.push({
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map(([name, answer]) => ({
        '@type': 'Question',
        name,
        acceptedAnswer: {'@type': 'Answer', text: answer}
      }))
    });
  } else if (INFO_PAGES[path.slice(1)]) {
    const page = INFO_PAGES[path.slice(1)];
    title = `${page.title} | ${SITE.name}`;
    description = page.copy;
    heading = page.title;
  } else {
    title = `${SITE.name} | Secure Checkout`;
    description = 'Review your order and complete your pre-order securely.';
    heading = path === '/cart' ? 'Your cart' : 'Checkout';
    robots = 'noindex,follow';
  }

  if (robots.startsWith('index')) {
    graph.push({
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: title,
      description,
      isPartOf: {'@id': website['@id']}
    });
  }

  return {path, url, image, title, description, heading, robots, graph};
}
