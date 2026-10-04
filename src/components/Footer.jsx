import {CreditCard, Headphones, PackageCheck, ShieldCheck} from 'lucide-react';
import {PRODUCT_PATH, SITE} from '../data/catalog';

const footerGroups = [
  {
    title: 'Shop',
    links: [
      ['Product', `#${PRODUCT_PATH}`],
      ['Inside Box', `#${PRODUCT_PATH}?inside`],
      ['Reviews', `#${PRODUCT_PATH}?reviews`],
      ['Cart', '#/cart'],
      ['Checkout', '#/checkout']
    ]
  },
  {
    title: 'Customer Care',
    links: [
      ['Contact Us', '#/contact'],
      ['Shipping & Delivery', '#/shipping'],
      ['Returns & Support', '#/returns'],
      ['Track Order', '#/order-status'],
      ['Cancellation', '#/cancellation']
    ]
  },
  {
    title: 'Policies',
    links: [
      ['Privacy Policy', '#/privacy'],
      ['Terms of Service', '#/terms'],
      ['Payment Security', '#/payment'],
      ['Product Care', '#/warranty'],
      ['Sitemap', '/sitemap.xml']
    ]
  }
];

const trustItems = [
  [ShieldCheck, 'Secure Payments', 'Razorpay checkout with server-side payment verification.'],
  [PackageCheck, 'Protected Packing', 'Collector items are packed for safer storage and delivery.'],
  [CreditCard, 'Clear Totals', 'Order total, delivery cost, and quantity are shown before payment.']
];

export function Footer() {
  return (
    <footer>
      <div className="footer-brand">
        <button className="brand">{SITE.shortName} <span>STORE</span></button>
        <p>Independent collector storefront for the GTA VI Collector Box, with secure payment, transparent policies, and support before and after checkout.</p>
        <div className="footer-contact">
          <span><Headphones size={16} /> {SITE.supportEmail}</span>
          <span>{SITE.supportPhone}</span>
          <span>{SITE.supportHours}</span>
        </div>
      </div>

      <div className="footer-trust">
        {trustItems.map(([Icon, title, copy]) => (
          <article key={title}>
            <Icon size={19} />
            <b>{title}</b>
            <p>{copy}</p>
          </article>
        ))}
      </div>

      <nav className="footer-links" aria-label="Footer navigation">
        {footerGroups.map(group => (
          <section key={group.title}>
            <h3>{group.title}</h3>
            {group.links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
          </section>
        ))}
      </nav>

      <small>&copy; 2026 {SITE.name}. Secure checkout powered by Razorpay. Independent collector merchandise store.</small>
    </footer>
  );
}
