import {ArrowRight, CheckCircle, Mail, ShieldCheck} from 'lucide-react';
import {PRODUCT_PATH, SITE} from '../data/catalog';
import {INFO_PAGES} from '../data/infoPages';

export function InfoPage({type = 'contact'}) {
  const page = INFO_PAGES[type] || INFO_PAGES.contact;

  return (
    <main className="page">
      <section className="page-hero">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}.</h1>
      </section>
      <section className="info-static">
        <div className="info-card">
          <ShieldCheck />
          <p className="eyebrow">{SITE.name}</p>
          <h2>{page.title}</h2>
          <p>{page.copy}</p>
          <ul>
            {page.bullets.map(item => (
              <li key={item}><CheckCircle size={17} /> {item}</li>
            ))}
          </ul>
          {page.sections?.map(section => (
            <section key={section.heading}>
              <h3>{section.heading}</h3>
              <p>{section.copy}</p>
            </section>
          ))}
          <div className="info-actions">
            <a href={PRODUCT_PATH}>Back to product <ArrowRight size={18} /></a>
            {SITE.supportEmail && <a href={`mailto:${SITE.supportEmail}`}><Mail size={18} /> Email support</a>}
          </div>
        </div>
      </section>
    </main>
  );
}
