import {ArrowRight} from 'lucide-react';
import {PRODUCT_PATH} from '../data/catalog';

const pages = {
  shipping: ['Shipping & Delivery', 'In-stock orders are generally prepared within 1-2 business days. Tracking can be added once a fulfilment provider is connected.'],
  returns: ['Returns & Support', 'Add your production return policy here before launch. Keep original packaging for any support request.'],
  privacy: ['Privacy', 'This demo stores cart data in the browser. Add your production privacy policy before collecting real customer data.'],
  contact: ['Contact', 'Replace support@example.com with your real customer support channel before launch.']
};

export function InfoPage({type = 'contact'}) {
  const [title, copy] = pages[type] || pages.contact;

  return (
    <main className="page">
      <section className="page-hero">
        <p className="eyebrow">D&D Store</p>
        <h1>{title}.</h1>
      </section>
      <section className="info-static">
        <h2>{title}</h2>
        <p>{copy}</p>
        <a href={`#${PRODUCT_PATH}`}>Back to product <ArrowRight size={18} /></a>
      </section>
    </main>
  );
}
