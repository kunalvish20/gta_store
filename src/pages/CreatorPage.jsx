import {ArrowRight, Camera, Check, Megaphone, Store, Video} from 'lucide-react';
import {useState} from 'react';
import {SITE} from '../data/catalog';
import './CreatorPage.css';

const waysToJoin = [
  {
    number: '01',
    icon: Video,
    title: 'Create content',
    description: 'Show the box in your own style through videos, reels, unboxings, or setup content.'
  },
  {
    number: '02',
    icon: Megaphone,
    title: 'Promote the drop',
    description: 'Share the collection with your community and talk to us about a promoter partnership.'
  },
  {
    number: '03',
    icon: Store,
    title: 'Sell with us',
    description: 'Have a store or an audience that would love the collection? Tell us how you would work together.'
  }
];

function isSocialUrl(value) {
  if (!value) return false;
  try {
    const url = new URL(value);
    const domains = ['instagram.com', 'youtube.com', 'youtu.be'];
    return url.protocol === 'https:' && domains.some(domain => url.hostname === domain || url.hostname.endsWith(`.${domain}`));
  } catch {
    return false;
  }
}

export function CreatorPage() {
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const applicationEmail = SITE.creatorEmail || SITE.supportEmail;

  const submitApplication = event => {
    event.preventDefault();
    setError('');
    setStatus('');

    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const interest = String(form.get('interest') || '').trim();
    const socialLink = String(form.get('socialLink') || '').trim();
    const secondLink = String(form.get('secondLink') || '').trim();
    const message = String(form.get('message') || '').trim();

    if (!isSocialUrl(socialLink) || (secondLink && !isSocialUrl(secondLink))) {
      setError('Paste a full Instagram or YouTube link starting with https://.');
      return;
    }
    if (!applicationEmail) {
      setError('Applications are not open yet. Please check back soon.');
      return;
    }

    const subject = encodeURIComponent(`${SITE.name} creator application - ${name}`);
    const body = encodeURIComponent([
      `Name: ${name}`,
      `Email: ${email}`,
      `Interested in: ${interest}`,
      `Social link: ${socialLink}`,
      `Additional link: ${secondLink || 'Not provided'}`,
      '',
      'About my work:',
      message || 'Not provided'
    ].join('\n'));

    setStatus('Your email app is opening. Send the prepared draft to complete your application.');
    window.location.href = `mailto:${applicationEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <main className="creator-page">
      <section className="creator-hero" aria-labelledby="creator-title">
        <div className="creator-hero-inner">
          <div className="creator-hero-copy">
            <p className="creator-eyebrow">DND STORE / CREATOR PROGRAM</p>
            <h1 id="creator-title">JOIN AS A <em>CREATOR.</em></h1>
            <p className="creator-lead">Have an Instagram or YouTube audience? Share your work and explore a partnership as a creator, promoter, or seller.</p>
            <a className="creator-primary-link" href="#apply">Start your application <ArrowRight size={19} aria-hidden="true" /></a>
            <p className="creator-hero-note"><Check size={16} aria-hidden="true" /> One social link is enough to get started.</p>
          </div>
          <form id="apply" className="creator-form" onSubmit={submitApplication} aria-labelledby="creator-form-title">
            <div className="creator-form-heading">
              <span>CREATOR / PROMOTER / SELLER</span>
              <h2 id="creator-form-title">Let's work together.</h2>
              <p>Tell us where to find your work. It only takes a few details.</p>
            </div>
            <fieldset className="creator-interest">
              <legend>I want to... *</legend>
              <div className="creator-interest-options">
                <label><input type="radio" name="interest" value="Create content" required /><span>Create</span></label>
                <label><input type="radio" name="interest" value="Promote the drop" /><span>Promote</span></label>
                <label><input type="radio" name="interest" value="Sell the collection" /><span>Sell</span></label>
              </div>
            </fieldset>
            <div className="creator-form-row">
              <label htmlFor="creator-name">Your name *
                <input id="creator-name" name="name" type="text" autoComplete="name" maxLength="80" placeholder="Your full name" required />
              </label>
              <label htmlFor="creator-email">Email address *
                <input id="creator-email" name="email" type="email" autoComplete="email" maxLength="120" placeholder="you@example.com" required />
              </label>
            </div>
            <label htmlFor="creator-social"><Camera size={16} aria-hidden="true" /> Instagram or YouTube link *
              <input id="creator-social" name="socialLink" type="url" inputMode="url" autoComplete="url" placeholder="https://instagram.com/yourname" required onChange={() => setError('')} />
            </label>
            <details className="creator-more-fields">
              <summary>Add another link or a short pitch <span>(optional)</span></summary>
              <div className="creator-more-fields-inner">
                <label htmlFor="creator-second-link"><Video size={16} aria-hidden="true" /> Another Instagram or YouTube link
                  <input id="creator-second-link" name="secondLink" type="text" inputMode="url" placeholder="https://youtube.com/@yourchannel" onChange={() => setError('')} />
                </label>
                <label htmlFor="creator-message">Your idea
                  <textarea id="creator-message" name="message" maxLength="600" rows="3" placeholder="Tell us about your audience, store, or collaboration idea." />
                </label>
              </div>
            </details>
            {error && <p className="creator-form-feedback is-error" role="alert">{error}</p>}
            {status && <p className="creator-form-feedback" role="status">{status}</p>}
            <button className="creator-submit" type="submit" disabled={!applicationEmail}>
              {applicationEmail ? 'Continue to email' : 'Applications opening soon'} <ArrowRight size={18} aria-hidden="true" />
            </button>
            {applicationEmail && <p className="creator-form-hint">We prepare an email to {applicationEmail}. Press send in your email app to complete your application.</p>}
            <p className="creator-form-privacy">We use your details to review and reply to your enquiry. Read our <a href="/privacy">Privacy Policy</a>.</p>
          </form>
          <div className="creator-hero-visual" aria-hidden="true">
            <img src="/assets/collector-box.webp" alt="" width="640" height="640" decoding="async" />
            <span className="creator-visual-caption">ONE BOX. YOUR STORY.</span>
          </div>
        </div>
      </section>

      <section className="creator-paths" aria-labelledby="creator-paths-title">
        <div className="creator-section-heading">
          <p className="creator-eyebrow">WAYS TO WORK TOGETHER</p>
          <h2 id="creator-paths-title">Find your way <em>in.</em></h2>
          <p>Tell us what you do best. We will review your links and get in touch if there is a fit for an upcoming collaboration.</p>
        </div>
        <div className="creator-path-grid">
          {waysToJoin.map(({number, icon: Icon, title, description}) => (
            <article className="creator-path-card" key={number}>
              <div className="creator-path-card-top"><span>{number} / 03</span><Icon size={24} aria-hidden="true" /></div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <div className="creator-path-cta"><span>YOUR NEXT COLLAB STARTS HERE.</span><a href="#apply">Share your link <ArrowRight size={17} aria-hidden="true" /></a></div>
      </section>
    </main>
  );
}
