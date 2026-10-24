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

function isPlatformUrl(value, domains) {
  if (!value) return true;
  try {
    const url = new URL(value);
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
    const instagram = String(form.get('instagram') || '').trim();
    const youtube = String(form.get('youtube') || '').trim();
    const message = String(form.get('message') || '').trim();

    if (!instagram && !youtube) {
      setError('Add your Instagram or YouTube link to continue.');
      return;
    }
    if (!isPlatformUrl(instagram, ['instagram.com']) || !isPlatformUrl(youtube, ['youtube.com', 'youtu.be'])) {
      setError('Use full HTTPS links from Instagram or YouTube.');
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
      `Instagram: ${instagram || 'Not provided'}`,
      `YouTube: ${youtube || 'Not provided'}`,
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
            <p className="creator-lead">Your content has a point of view. Bring it to our Collector's Box and explore a partnership as a creator, promoter, or seller.</p>
            <a className="creator-primary-link" href="#apply">Share your links <ArrowRight size={19} aria-hidden="true" /></a>
            <p className="creator-hero-note"><Check size={16} aria-hidden="true" /> YouTube or Instagram is all you need to start.</p>
          </div>
          <div className="creator-hero-visual" aria-hidden="true">
            <span className="creator-visual-orbit creator-visual-orbit-one" />
            <span className="creator-visual-orbit creator-visual-orbit-two" />
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
      </section>

      <section className="creator-apply" id="apply" aria-labelledby="creator-apply-title">
        <div className="creator-apply-inner">
          <div className="creator-apply-intro">
            <p className="creator-eyebrow">YOUR NEXT MOVE</p>
            <h2 id="creator-apply-title">LET'S MAKE <em>IT HAPPEN.</em></h2>
            <p>Share a link to your Instagram or YouTube and a little about what you would like to do. Creator collaborations, promotions, and seller enquiries are welcome.</p>
            <div className="creator-apply-steps">
              <span><b>01</b> Choose how you want to partner</span>
              <span><b>02</b> Add at least one social link</span>
              <span><b>03</b> Send your application</span>
            </div>
          </div>

          <form className="creator-form" onSubmit={submitApplication}>
            <div className="creator-form-heading">
              <span>APPLICATION / 01</span>
              <h3>Tell us about you.</h3>
              <p>Fields marked * are required.</p>
            </div>
            <div className="creator-form-row">
              <label htmlFor="creator-name">Your name *
                <input id="creator-name" name="name" type="text" autoComplete="name" maxLength="80" placeholder="Your full name" required />
              </label>
              <label htmlFor="creator-email">Email address *
                <input id="creator-email" name="email" type="email" autoComplete="email" maxLength="120" placeholder="you@example.com" required />
              </label>
            </div>
            <label htmlFor="creator-interest">I want to *
              <select id="creator-interest" name="interest" defaultValue="" required>
                <option value="" disabled>Select an option</option>
                <option value="Create content">Create content</option>
                <option value="Promote the drop">Promote the drop</option>
                <option value="Sell the collection">Sell the collection</option>
              </select>
            </label>
            <div className="creator-form-row">
              <label htmlFor="creator-instagram"><Camera size={16} aria-hidden="true" /> Instagram link
                <input id="creator-instagram" name="instagram" type="url" inputMode="url" placeholder="https://instagram.com/yourname" onChange={() => setError('')} />
              </label>
              <label htmlFor="creator-youtube"><Video size={17} aria-hidden="true" /> YouTube link
                <input id="creator-youtube" name="youtube" type="url" inputMode="url" placeholder="https://youtube.com/@yourchannel" onChange={() => setError('')} />
              </label>
            </div>
            <p className="creator-form-hint">Add at least one full Instagram or YouTube URL.</p>
            <label htmlFor="creator-message">Your idea <span>(optional)</span>
              <textarea id="creator-message" name="message" maxLength="600" rows="4" placeholder="Tell us about your content, audience, store, or collaboration idea." />
            </label>
            <p className="creator-form-privacy">Your details will be used only to review and reply to this enquiry. See our <a href="/privacy">Privacy Policy</a>.</p>
            {error && <p className="creator-form-feedback is-error" role="alert">{error}</p>}
            {status && <p className="creator-form-feedback" role="status">{status}</p>}
            <button className="creator-submit" type="submit" disabled={!applicationEmail}>
              {applicationEmail ? 'Open application email' : 'Applications opening soon'} <ArrowRight size={18} aria-hidden="true" />
            </button>
            {applicationEmail && <p className="creator-form-hint">Your email app opens with a prepared draft. Press send there to finish.</p>}
          </form>
        </div>
      </section>
    </main>
  );
}
