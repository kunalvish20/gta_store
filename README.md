# D&D STORE — GTA VI Collector Box Pre-Order

Routes:

- `#/homepage-secondary` — new magenta/black rotating-box landing page
- `#/product/dd-collector-box` — image-first converting product page
- `#/checkout` — Razorpay checkout flow

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

- `api/create-razorpay-order.js` — creates a Razorpay order securely on the server
- `api/verify-razorpay-payment.js` — verifies the payment signature securely on the server

For Vercel deployment, add all three environment variables in Project Settings → Environment Variables, then redeploy.
