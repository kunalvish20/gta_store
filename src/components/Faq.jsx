import {ChevronDown} from 'lucide-react';
import {useState} from 'react';
import {FAQ_ITEMS} from '../data/faq';

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="faq preorder-faq" id="faq">
      <div>
        <p className="eyebrow">FAQ</p>
        <h2>Before you pre-order.</h2>
      </div>
      <div className="faq-list">
        {FAQ_ITEMS.map(([title, answer], index) => (
          <article className={open === index ? 'open' : ''} key={title}>
            <button onClick={() => setOpen(open === index ? -1 : index)}>
              <span>{title}</span>
              <ChevronDown />
            </button>
            {open === index && <p>{answer}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}
