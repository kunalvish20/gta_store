import {PRODUCT} from './catalog.js';
import {format} from '../lib/format.js';

export const FAQ_ITEMS = [
  ['Is this a pre-order?', `Yes. ${PRODUCT.name} is presented as a limited pre-order drop priced at ${format(PRODUCT.price)}.`],
  ['What is included in the box?', "The box includes 9 Collector's Edition items. The gallery previews five featured pieces, with each frame paired to its own product detail."],
  ['Is payment secure?', 'Yes. Checkout is handled by Razorpay, while order creation and payment verification happen through server APIs.'],
  ['When will pre-orders ship?', 'Dispatch and tracking updates are shared through the email and phone number entered at checkout after the preorder moves into fulfilment.'],
  ['How do I get support?', 'Support contact details will be published on the Contact page. Please keep your payment ID for faster order lookup.']
];
