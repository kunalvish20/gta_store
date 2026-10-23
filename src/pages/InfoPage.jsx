import {ArrowRight, CheckCircle, Mail, ShieldCheck} from 'lucide-react';
import {PRODUCT_PATH, SITE} from '../data/catalog';

const pages = {
  shipping: {
    eyebrow: 'Delivery',
    title: 'Shipping & Delivery',
    copy: "The GTA VI Collector's Box is a pre-order. Check the delivery details shown during checkout and keep your contact and shipping information accurate. Contact support with your payment ID if you have a question about dispatch or delivery.",
    bullets: ["Standard delivery is included with the Collector's Box", 'Review your delivery address before making payment', 'If your order is not fulfilled or arrives later than a stated delivery schedule, contact support for a review under the Return & Refund Policy']
  },
  returns: {
    eyebrow: 'Final sale policy',
    title: 'Return & Refund Policy',
    copy: "All items in the GTA VI Collector's Box are final sale and non-returnable for a change of mind. Once an order is placed, we do not offer change-of-mind returns, exchanges, or refunds. Your rights under applicable consumer law remain in place.",
    bullets: [
      'Contact support if an item is defective, damaged, incorrect, or materially different from its description',
      'Contact support if your order cannot be fulfilled or is delivered later than a stated delivery schedule',
      'Where applicable law requires a remedy, we will review the issue and provide the appropriate return, refund, or other resolution'
    ],
    sections: [
      {
        heading: 'How to report an order issue',
        copy: `Email ${SITE.supportEmail} with your payment ID, a description of the issue, and photos where relevant. We will use these details to review your request and explain the next steps. There is no change-of-mind return option.`
      },
      {
        heading: 'Before you place a pre-order',
        copy: 'Please review the box contents, price, quantity, delivery information, and this policy before paying. The final-sale rule does not remove remedies available under applicable consumer law.'
      }
    ]
  },
  privacy: {
    eyebrow: 'Policy',
    title: 'Privacy Policy',
    copy: `${SITE.name} collects checkout details only to process pre-orders, payment verification, delivery support, and customer communication.`,
    bullets: ['Cart data stays in your browser', 'Payment is handled through Razorpay checkout', 'Customer details are used only for order and support workflows']
  },
  contact: {
    eyebrow: 'Help',
    title: 'Contact Us',
    copy: `Reach ${SITE.name} support for order help, delivery questions, payment confirmation, or product-care requests.`,
    bullets: [SITE.supportEmail, SITE.supportPhone, SITE.supportHours]
  },
  terms: {
    eyebrow: 'Policy',
    title: 'Terms of Service',
    copy: "Review the Collector's Box details, INR price, quantity, delivery information, and Return & Refund Policy before placing a pre-order. All items are final sale for a change of mind, while remedies required by applicable consumer law remain available.",
    bullets: ['Prices and order totals are shown in INR before payment', 'Orders are confirmed after successful payment verification', 'Use the contact page to report an order or delivery issue']
  },
  payment: {
    eyebrow: 'Security',
    title: 'Payment Security',
    copy: 'Checkout is powered by Razorpay. The browser receives a short-lived order ID and public key, while payment verification happens through server APIs.',
    bullets: ['No card details are stored by the React storefront', 'Payment signature is verified after checkout', 'Order totals are shown before payment opens']
  },
  'order-status': {
    eyebrow: 'Orders',
    title: 'Track Order',
    copy: 'Use your payment ID, email, or phone number when contacting support. Tracking details are sent after the preorder moves to dispatch.',
    bullets: ['Payment ID helps verify order status faster', 'Dispatch updates are shared on email and SMS', 'Support can confirm payment and delivery details']
  },
  cancellation: {
    eyebrow: 'Orders',
    title: 'Order Cancellation Policy',
    copy: 'You can change your cart before payment. After a pre-order is placed, change-of-mind cancellations and refunds are not offered. This does not limit any remedy available under applicable consumer law.',
    bullets: ['Check your quantity and delivery details before payment', 'Contact support with your payment ID if there is an order error or fulfilment issue', 'For defective, incorrect, not-as-described, late, or unfulfilled orders, see the Return & Refund Policy']
  },
  warranty: {
    eyebrow: 'Care',
    title: 'Product Care',
    copy: "Store Collector's Edition items away from direct sunlight, heat, moisture, and rough handling. These care tips do not change the Return & Refund Policy or any rights under applicable consumer law.",
    bullets: ['Keep packaging and order details if you need to report an issue', 'Avoid bending printed inserts and poster material', 'Use a dry microfiber cloth for display items']
  }
};

export function InfoPage({type = 'contact'}) {
  const page = pages[type] || pages.contact;

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
            <a href={`#${PRODUCT_PATH}`}>Back to product <ArrowRight size={18} /></a>
            <a href={`mailto:${SITE.supportEmail}`}><Mail size={18} /> Email support</a>
          </div>
        </div>
      </section>
    </main>
  );
}
