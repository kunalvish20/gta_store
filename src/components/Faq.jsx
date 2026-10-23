import {ChevronDown} from 'lucide-react';
import {useState} from 'react';
import {PRODUCT, SITE} from '../data/catalog';
import {format} from '../lib/format';

const questions = [
  ['Is this a pre-order?', `Yes. ${PRODUCT.name} is presented as a limited pre-order drop priced at ${format(PRODUCT.price)}.`],
  ['What is included in the box?', "The box includes 9 Collector's Edition items. The gallery previews five featured pieces, with each frame paired to its own product detail."],
  ['Is payment secure?', 'Yes. Checkout is handled by Razorpay, while order creation and payment verification happen through server APIs.'],
  ['When will pre-orders ship?', 'Dispatch and tracking updates are shared through the email and phone number entered at checkout after the preorder moves into fulfilment.'],
  ['How do I get support?', `Use the footer contact links or email ${SITE.supportEmail}. Please include your payment ID for faster order lookup.`]
];

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="faq preorder-faq" id="faq">
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
