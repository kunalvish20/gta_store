# GTA Store - GTA VI Collector's Box Pre-Order

Routes:

- `/` - rotating-box landing page
- `/product/gta-collector-box` - product page
- `/checkout` - Razorpay checkout flow (`noindex`)
- `/robots.txt` - crawler rules
- `/sitemap.xml` - canonical, indexable routes on `https://dndstores.com`

The build generates page-specific HTML in `dist/_seo/` with titles, descriptions,
canonical URLs, social metadata, visible summary content, and JSON-LD. Vercel
rewrites clean URLs to those pages. Older `#/...` links are upgraded in the
browser. Update `SITE.origin`, `public/sitemap.xml`, and `public/robots.txt`
together if the production domain changes.

## Run locally

```bash
npm install
npm run dev
```

## Razorpay setup

Create `.env.local` from `.env.example`:

```bash
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Razorpay uses `key_id` and `key_secret`. Keep `RAZORPAY_KEY_SECRET` only on the server/Vercel environment variables. Do not expose it in React code.

The payment system uses:

- `api/create-razorpay-order.js` - creates a Razorpay order securely on the server
- `api/verify-razorpay-payment.js` - verifies the payment signature securely on the server

For Vercel deployment, add all three environment variables in Project Settings > Environment Variables, then redeploy.
