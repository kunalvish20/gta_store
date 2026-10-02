export const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || '';

let razorpayScriptPromise;

export function loadRazorpayScript() {
  if (window.Razorpay) return Promise.resolve(true);
  if (razorpayScriptPromise) return razorpayScriptPromise;

  razorpayScriptPromise = new Promise(resolve => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  return razorpayScriptPromise;
}

export async function createRazorpayOrder({quantity, customer}) {
  const response = await fetch('/api/create-razorpay-order', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({quantity, customer})
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || 'Unable to create Razorpay order.');
  }

  return data;
}

export async function verifyRazorpayPayment(payload) {
  const response = await fetch('/api/verify-razorpay-payment', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.verified) {
    throw new Error(data.error || 'Payment verification failed.');
  }

  return data;
}
