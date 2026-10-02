const PRODUCT_PRICE = 4999;
const MAX_QTY = 10;

function send(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

function clean(value = '') {
  return String(value).trim().slice(0, 180);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    send(res, 405, {error: 'Method not allowed'});
    return;
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    send(res, 500, {error: 'Razorpay keys are not configured on the server.'});
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const quantity = Math.max(1, Math.min(MAX_QTY, Number(body.quantity || 1)));
    const amount = PRODUCT_PRICE * quantity * 100;
    const customer = body.customer || {};

    const orderPayload = {
      amount,
      currency: 'INR',
      receipt: `dd-preorder-${Date.now()}`,
      notes: {
        product: 'GTA VI Collector Box',
        quantity: String(quantity),
        name: clean(customer.name),
        email: clean(customer.email),
        phone: clean(customer.phone),
        pincode: clean(customer.pincode),
        city: clean(customer.city),
        state: clean(customer.state)
      }
    };

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderPayload)
    });

    const razorpayOrder = await razorpayResponse.json();

    if (!razorpayResponse.ok) {
      send(res, razorpayResponse.status, {
        error: razorpayOrder?.error?.description || 'Razorpay order creation failed.'
      });
      return;
    }

    send(res, 200, {
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      quantity,
      publicKey: keyId
    });
  } catch (error) {
    send(res, 500, {error: error.message || 'Unable to create order.'});
  }
}
