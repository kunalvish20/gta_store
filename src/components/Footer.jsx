import {useState} from 'react';
import {ArrowUpRight, Mail} from 'lucide-react';
import {PRODUCT_PATH, SITE} from '../data/catalog';
import {BrandLogo} from './BrandLogo';

const footerGroups = [
  {
    title: 'Shop',
    links: [
      ["Collector's Box", PRODUCT_PATH],
      ['Cart', '/cart']
    ]
  },
  {
    title: 'Help',
    links: [
      ['Contact', '/contact'],
      ['Shipping & Delivery', '/shipping'],
      ['Track Order', '/order-status']
    ]
  },
  {
    title: 'Legal',
    links: [
      ['Terms', '/terms'],
      ['Privacy', '/privacy'],
      ['Payment Security', '/payment']
    ]
  }
];

export function Footer() {
  const [newsletterMessage, setNewsletterMessage] = useState('');

  const requestNewsletter = event => {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get('newsletter-email')?.toString().trim();
    if (!email) return;
    if (!SITE.supportEmail) return;

    const subject = encodeURIComponent(`${SITE.name} newsletter request`);
    const body = encodeURIComponent(`Please add ${email} to the newsletter for GTA VI Collector's Box updates.`);
    setNewsletterMessage('Send the prepared email in your email app to request updates.');
    window.location.href = `mailto:${SITE.supportEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <footer className="site-footer">
      <div className="footer-palms" aria-hidden="true">
        <span className="footer-palm footer-palm-left" />
        <span className="footer-palm footer-palm-right" />
        <span className="footer-palm footer-palm-distant-left" />
        <span className="footer-palm footer-palm-distant-right" />
        <span className="footer-spark footer-spark-one">✦</span>
        <span className="footer-spark footer-spark-two">✦</span>
      </div>

      <div className="footer-main">
        <div className="footer-brand">
          <BrandLogo />
          <h2>GTA VI <span>Collector's Box.</span></h2>
          <p>11-item limited preorder.</p>
        </div>

        <section className="footer-newsletter" aria-labelledby="footer-newsletter-title">
          <h3 id="footer-newsletter-title">Newsletter</h3>
          <p>Get updates on the collector's box.</p>
          <form onSubmit={requestNewsletter}>
            <label htmlFor="footer-newsletter-email">Email address</label>
            <div className="footer-newsletter-control">
              <input id="footer-newsletter-email" name="newsletter-email" type="email" autoComplete="email" placeholder="you@example.com" required disabled={!SITE.supportEmail} />
              <button type="submit" disabled={!SITE.supportEmail}>Join <ArrowUpRight size={17} aria-hidden="true" /></button>
            </div>
            <p className="footer-newsletter-note" role="status">{newsletterMessage || (SITE.supportEmail ? 'Opens your email app to request updates.' : 'Email updates will be available soon.')}</p>
          </form>
        </section>
      </div>

      <div className="footer-creator">
        <div>
          <span>CREATE WITH DND</span>
          <h3>Have an audience? Let's make something together.</h3>
          <p>Creators, promoters, and sellers can share their Instagram or YouTube links with us.</p>
        </div>
        <a href="/join-as-a-creator">Join as a Creator <ArrowUpRight size={19} aria-hidden="true" /></a>
      </div>

      <nav className="footer-links" aria-label="Footer navigation">
        {footerGroups.map(group => (
          <section key={group.title}>
            <h3>{group.title}</h3>
            <ul>
              {group.links.map(([label, href]) => (
                <li key={label}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </section>
        ))}
      </nav>

      <div className="footer-meta">
        <small>&copy; {new Date().getFullYear()} {SITE.name}.</small>
        {SITE.supportEmail && <a href={`mailto:${SITE.supportEmail}`}><Mail size={16} aria-hidden="true" /> {SITE.supportEmail}</a>}
      </div>
    </footer>
  );
}
