import React from 'react';
import VersionShell from '../../../layout/VersionShell.jsx';
import { productsV02 } from '../../../mockData/products.v02.js';

export default function V02Catalog() {
  return (
    <VersionShell version="0.2" title="Product Listing MVP" focus="Catalog">
      <p style={{fontSize:'.85rem'}}>A minimal product listing: static JSON, no cart, no database.</p>
      <div style={{display:'grid', gap:'1rem', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', marginTop:'1rem'}}>
        {productsV02.map(p => (
          <div key={p.id} style={{background:'#fff', border:'1px solid #e2e8f0', borderRadius:'8px', padding:'.75rem'}}>
            <strong style={{display:'block', fontSize:'.85rem'}}>{p.name}</strong>
            <span style={{fontSize:'.75rem', color:'#334155'}}>${p.price.toFixed(2)}</span>
            <div style={{marginTop:'.5rem'}}>
              <button disabled style={{fontSize:'.6rem', padding:'.3rem .5rem', opacity:.4}}>Add to Cart (v0.3)</button>
            </div>
          </div>
        ))}
      </div>
      <p style={{marginTop:'1rem'}}><code>git commit -m "v0.2 product listing mvp"</code></p>
    </VersionShell>
  );
}
