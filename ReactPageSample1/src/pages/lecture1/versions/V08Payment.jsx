import React, { useState } from 'react';
import VersionShell from '../../../layout/VersionShell.jsx';

export default function V08Payment() {
  const [status, setStatus] = useState('idle');
  function pay(){ setStatus('processing'); setTimeout(()=> setStatus('success'), 1200); }
  return (
    <VersionShell version="0.8" title="Payment Gateway Integration" focus="Payment">
      <p style={{fontSize:'.85rem'}}>Simulates integration with a payment provider (Stripe/PayPal sandbox).</p>
      {status === 'idle' && <button onClick={pay} style={{padding:'.6rem 1rem', fontSize:'.75rem'}}>Pay $49.00</button>}
      {status === 'processing' && <p style={{fontSize:'.8rem'}}>Processing payment...</p>}
      {status === 'success' && <p style={{fontSize:'.8rem', color:'#16a34a'}}>Payment succeeded (mock)! Receipt ID: TEST-12345</p>}
      <ul style={{marginTop:'1rem', fontSize:'.75rem'}}>
        <li>Client obtains payment intent (mocked)</li>
        <li>Server would verify event signature</li>
        <li>Order marked as paid</li>
      </ul>
      <p style={{marginTop:'1rem'}}><code>git commit -m "v0.8 payment integration"</code></p>
    </VersionShell>
  );
}
