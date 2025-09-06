import React, { useState } from 'react';
import VersionShell from '../layout/VersionShell.jsx';
import { productsV03 } from '../mockData/products.v03.js';

export default function V03Cart() {
  const [cart, setCart] = useState([]);

  function addToCart(p) {
    setCart(prev => {
      const existing = prev.find(i => i.id === p.id);
      if (existing) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: p.id, name: p.name, price: p.price, qty: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <VersionShell version="0.3" title="Shopping Cart Feature" focus="Cart">
      <p style={{fontSize:'.85rem'}}>Introduces local (in-memory) cart state. Still no backend/database.</p>
      <div style={{display:'grid', gap:'1rem', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', marginTop:'1rem'}}>
        {productsV03.map(p => (
          <div key={p.id} style={{background:'#fff', border:'1px solid #e2e8f0', borderRadius:'8px', padding:'.75rem'}}>
            <strong style={{display:'block', fontSize:'.85rem'}}>{p.name}</strong>
            <span style={{fontSize:'.75rem', color:'#334155'}}>${p.price.toFixed(2)}</span>
            <div style={{marginTop:'.5rem'}}>
              <button onClick={() => addToCart(p)} style={{fontSize:'.6rem', padding:'.3rem .5rem'}}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>

      <section style={{marginTop:'1.5rem'}}>
        <h2 style={{fontSize:'1rem'}}>Cart Summary</h2>
        {cart.length === 0 && <p style={{fontSize:'.75rem'}}>Cart is empty.</p>}
        {cart.length > 0 && (
          <table style={{width:'100%', fontSize:'.7rem', borderCollapse:'collapse'}}>
            <thead>
              <tr style={{textAlign:'left'}}>
                <th style={{borderBottom:'1px solid #e2e8f0', padding:'.25rem .4rem'}}>Item</th>
                <th style={{borderBottom:'1px solid #e2e8f0', padding:'.25rem .4rem'}}>Qty</th>
                <th style={{borderBottom:'1px solid #e2e8f0', padding:'.25rem .4rem'}}>Price</th>
                <th style={{borderBottom:'1px solid #e2e8f0', padding:'.25rem .4rem'}}></th>
              </tr>
            </thead>
            <tbody>
              {cart.map(i => (
                <tr key={i.id}>
                  <td style={{borderBottom:'1px solid #f1f5f9', padding:'.25rem .4rem'}}>{i.name}</td>
                  <td style={{borderBottom:'1px solid #f1f5f9', padding:'.25rem .4rem'}}>{i.qty}</td>
                  <td style={{borderBottom:'1px solid #f1f5f9', padding:'.25rem .4rem'}}>${(i.price * i.qty).toFixed(2)}</td>
                  <td style={{borderBottom:'1px solid #f1f5f9', padding:'.25rem .4rem'}}>
                    <button onClick={() => removeFromCart(i.id)} style={{fontSize:'.55rem', padding:'.2rem .45rem'}}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {cart.length > 0 && <p style={{marginTop:'.5rem', fontSize:'.75rem'}}>Total: ${total.toFixed(2)}</p>}
      </section>
      <p style={{marginTop:'1rem'}}><code>git commit -m "v0.3 cart feature"</code></p>
    </VersionShell>
  );
}
