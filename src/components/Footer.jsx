import {ArrowUpRight, CreditCard, Headphones, Mail, PackageCheck, Phone, ShieldCheck} from 'lucide-react';
import {PRODUCT_PATH, SITE} from '../data/catalog';
import {BrandLogo} from './BrandLogo';

const footerGroups = [
  {
    title: 'Shop',
    links: [
      ['Product', `#${PRODUCT_PATH}`],
      ['Inside Box', `#${PRODUCT_PATH}?inside`],
      ['Reviews', '#/'],
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
  [PackageCheck, 'Protected Packing', "Collector's Edition items are packed for safer storage and delivery."],
  [CreditCard, 'Clear Totals', 'Order total, delivery cost, and quantity are shown before payment.']
];

export function Footer() {
  const scrollToSection = label => {
    const target = label === 'Reviews' ? 'reviews' : label === 'Inside Box' ? 'inside-box' : null;
    if (target) setTimeout(() => document.getElementById(target)?.scrollIntoView({behavior: 'smooth'}), 100);
  };

  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <BrandLogo />
        <p>Independent storefront for the GTA VI Collector's Box, with secure payment, transparent policies, and support before and after checkout.</p>
        <div className="footer-contact">
          <a href={`mailto:${SITE.supportEmail}`}><Mail size={16} aria-hidden="true" /> {SITE.supportEmail}</a>
          <a href={`tel:${SITE.supportPhone.replace(/[^+\d]/g, '')}`}><Phone size={16} aria-hidden="true" /> {SITE.supportPhone}</a>
          <span><Headphones size={16} aria-hidden="true" /> {SITE.supportHours}</span>
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
            <ul>
              {group.links.map(([label, href]) => (
                <li key={label}>
                  <a href={href} onClick={() => scrollToSection(label)}>{label}</a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </nav>

      <div className="footer-bottom">
        <small>&copy; 2026 {SITE.name}. Secure checkout powered by Razorpay. Independent merchandise store.</small>
        <a href="#/contact">Need help? Contact us <ArrowUpRight size={15} aria-hidden="true" /></a>
      </div>
    </footer>
  );
}
