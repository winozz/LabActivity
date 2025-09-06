import React, { useState } from 'react';
import VersionShell from '../layout/VersionShell.jsx';

export default function V06Checkout() {
  const [submitted, setSubmitted] = useState(false);
  function submit(e){ e.preventDefault(); setSubmitted(true); }
  return (
    <VersionShell version="0.6" title="Checkout & Orders" focus="Checkout">
      <p style={{fontSize:'.85rem'}}>Collects user shipping data and creates an order record (mocked).</p>
      {!submitted && (
        <form onSubmit={submit} style={{display:'grid', gap:'.6rem', maxWidth:'400px', marginTop:'1rem'}}>
          <input required placeholder="Full Name" style={{padding:'.5rem .6rem', fontSize:'.75rem'}} />
          <input required placeholder="Address" style={{padding:'.5rem .6rem', fontSize:'.75rem'}} />
          <input required placeholder="City" style={{padding:'.5rem .6rem', fontSize:'.75rem'}} />
          <input required placeholder="Payment Method (mock)" style={{padding:'.5rem .6rem', fontSize:'.75rem'}} />
          <button type="submit" style={{padding:'.55rem .8rem', fontSize:'.75rem'}}>Place Order</button>
        </form>
      )}
      {submitted && <p style={{marginTop:'1rem', fontSize:'.8rem'}}>Order created (mock)! An order history page would list it here.</p>}
      <p style={{marginTop:'1rem'}}><code>git commit -m "v0.6 checkout orders"</code></p>
    </VersionShell>
  );
}
