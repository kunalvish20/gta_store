import {ArrowRight, CheckCircle, Mail, ShieldCheck} from 'lucide-react';
import {PRODUCT_PATH, SITE} from '../data/catalog';

const pages = {
  shipping: {
    eyebrow: 'Delivery',
    title: 'Shipping & Delivery',
    copy: 'Pre-order dispatch updates are shared by email and SMS after payment confirmation. Every order is prepared with protective packing and delivery details are confirmed before dispatch.',
    bullets: ['Free standard delivery on this collector box', 'Tracking shared as soon as the parcel is handed over', 'Address confirmation before dispatch for preorder shipments']
  },
  returns: {
    eyebrow: 'Support',
    title: 'Returns & Support',
    copy: 'If your order arrives damaged or incorrect, contact support within 48 hours of delivery with photos of the box, shipping label, and product condition.',
    bullets: ['Damage and wrong-item support window: 48 hours', 'Keep original packaging until the case is resolved', 'Support team replies during published business hours']
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
    copy: 'By placing a pre-order, you agree that product availability, dispatch timeline, and delivery updates will be communicated through the contact details entered at checkout.',
    bullets: ['Prices are shown in INR before payment', 'Orders are confirmed after successful payment verification', 'Store content and product visuals are for collector merchandise presentation']
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
    title: 'Cancellation',
    copy: 'Cancellation support is available before an order is packed for dispatch. Once packed or shipped, the returns support process applies.',
    bullets: ['Contact support quickly with your payment ID', 'Refund handling follows the payment provider timeline', 'Packed or shipped orders move to delivery support']
  },
  warranty: {
    eyebrow: 'Care',
    title: 'Product Care',
    copy: 'Store collector items away from direct sunlight, heat, moisture, and rough handling. Keep inserts and packaging for support requests.',
    bullets: ['Keep original packaging for any claim', 'Avoid bending printed inserts and poster material', 'Use dry microfiber cleaning for display items']
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
          <div className="info-actions">
            <a href={`#${PRODUCT_PATH}`}>Back to product <ArrowRight size={18} /></a>
            <a href={`mailto:${SITE.supportEmail}`}><Mail size={18} /> Email support</a>
          </div>
        </div>
      </section>
    </main>
  );
}
