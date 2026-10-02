import {ChevronDown} from 'lucide-react';
import {useState} from 'react';

const questions = [
  ['Is this a pre-order?', 'Yes. This product is presented as a limited pre-order drop priced at ₹4,999.'],
  ['What is included in the product gallery?', 'The gallery shows the full visual set included with this drop, with each frame paired to its own product story.'],
  ['Can I use the gallery on mobile?', 'Yes. The main product gallery and the story section support touch swiping, large tap targets and horizontal thumbnail scrolling.'],
  ['When will pre-orders ship?', 'Pre-order dispatch updates can be shared after order confirmation. Add your final dispatch timeline before launching live payments.']
];

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="faq preorder-faq">
      <div>
        <p className="eyebrow">FAQ</p>
        <h2>Before you pre-order.</h2>
      </div>
      <div className="faq-list">
        {questions.map(([title, answer], index) => (
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
