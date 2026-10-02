import crypto from 'crypto';

function send(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    send(res, 405, {error: 'Method not allowed'});
    return;
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    send(res, 500, {error: 'Razorpay secret is not configured on the server.'});
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      send(res, 400, {error: 'Missing payment verification fields.'});
      return;
    }

    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const expectedBuffer = Buffer.from(expectedSignature);
    const providedBuffer = Buffer.from(String(razorpay_signature));
    const verified = expectedBuffer.length === providedBuffer.length &&
      crypto.timingSafeEqual(expectedBuffer, providedBuffer);

    if (!verified) {
      send(res, 400, {verified: false, error: 'Invalid payment signature.'});
      return;
    }

    send(res, 200, {verified: true, paymentId: razorpay_payment_id});
  } catch (error) {
    send(res, 500, {verified: false, error: error.message || 'Unable to verify payment.'});
  }
}
