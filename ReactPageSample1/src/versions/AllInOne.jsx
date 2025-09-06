import React, { useState, useMemo } from 'react';
import VersionShell from '../layout/VersionShell.jsx';
import { productsV02 } from '../mockData/products.v02.js';
import { productsV03 } from '../mockData/products.v03.js';
import { usersV04 } from '../mockData/users.v04.js';

// Ordered version metadata
const VERSION_STEPS = [
  { key:'0.1', title:'Initial Commit', features:['structure'] },
  { key:'0.2', title:'Catalog', features:['products'] },
  { key:'0.3', title:'Cart', features:['products','cart'] },
  { key:'0.4', title:'Accounts', features:['products','cart','auth'] },
  { key:'0.5', title:'Database', features:['products','cart','auth','db'] },
  { key:'0.6', title:'Checkout', features:['products','cart','auth','db','checkout'] },
  { key:'0.7', title:'UI/UX', features:['products','cart','auth','db','checkout','ui'] },
  { key:'0.8', title:'Payment', features:['products','cart','auth','db','checkout','ui','payment'] },
  { key:'1.0', title:'Release', features:['products','cart','auth','db','checkout','ui','payment','release'] },
  { key:'1.1', title:'Account Management', features:['products','cart','auth','db','checkout','ui','payment','release','account'] },
];

export default function AllInOne() {
  const [version, setVersion] = useState('0.2');
  const [cart, setCart] = useState([]); // generic cart
  const [user, setUser] = useState(null);
  const [checkoutData, setCheckoutData] = useState(null);
  const [payStatus, setPayStatus] = useState('idle');
  const [loginInput, setLoginInput] = useState('');

  const meta = VERSION_STEPS.find(v => v.key === version);
  const features = meta?.features || [];

  // Choose product list by version (0.3+ uses extended list)
  const products = useMemo(() => (version >= '0.3' ? productsV03 : productsV02), [version]);

  function addToCart(p) {
    if (!features.includes('cart')) return;
    setCart(prev => {
      const existing = prev.find(i => i.id === p.id);
      if (existing) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: p.id, name: p.name, price: p.price, qty: 1 }];
    });
  }

  const total = cart.reduce((s,i)=> s + i.price * i.qty, 0);

  function login(e){
    e.preventDefault();
    const u = usersV04.find(u => u.username === loginInput.trim().toLowerCase());
    if (u) setUser(u); else alert('Mock: user not found (try alice / bob)');
  }

  function submitCheckout(e){
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    setCheckoutData(data);
  }

  function pay(){
    setPayStatus('processing');
    setTimeout(()=> setPayStatus('success'), 1200);
  }

  return (
    <VersionShell version={version} title="All-In-One Progressive View" focus={meta?.title}>
      <p style={{fontSize:'.8rem', marginTop:'-.25rem'}}>Select a version to see only the features available at that stage. Later versions accumulate earlier features.</p>

      {/* Version Selector Git Graph */}
      <div className="git-graph-wrapper">
        <div className="git-graph" role="list" aria-label="Version history graph">
          {VERSION_STEPS.map((v,i) => (
            <div className="git-node-wrap" role="listitem" key={v.key}>
              {i !== 0 && <div className="git-edge" aria-hidden></div>}
              <button
                onClick={()=> setVersion(v.key)}
                className={"git-node" + (v.key === version ? ' active' : '')}
                aria-current={v.key === version ? 'true' : 'false'}
                aria-label={`Select version ${v.key} ${v.title}`}
              >
                <span className="git-node-circle" />
                <span className="git-node-label">v{v.key}</span>
                <span className="git-node-title">{v.title}</span>
              </button>
            </div>
          ))}
        </div>
        <div className="git-legend" aria-hidden>
          <span className="legend-item"><span className="dot current" /> Current</span>
          <span className="legend-item"><span className="dot future" /> Future</span>
        </div>
      </div>

      {/* Product Catalog */}
      {features.includes('products') && (
        <section style={{marginTop:'1rem'}}>
          <h2 style={{fontSize:'1rem'}}>Products {features.includes('cart') && '(click Add)'}</h2>
          <div style={{display:'grid', gap:'1rem', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))'}}>
            {products.map(p => (
              <div key={p.id} style={{background:'#fff', border:'1px solid #e2e8f0', borderRadius:'8px', padding:'.7rem'}}>
                <strong style={{display:'block', fontSize:'.8rem'}}>{p.name}</strong>
                <span style={{fontSize:'.7rem', color:'#334155'}}>${p.price.toFixed(2)}</span>
                {features.includes('cart') && (
                  <div style={{marginTop:'.5rem'}}>
                    <button onClick={()=> addToCart(p)} style={{fontSize:'.6rem', padding:'.3rem .55rem'}}>Add</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Cart */}
      {features.includes('cart') && (
        <section style={{marginTop:'1.5rem'}}>
          <h2 style={{fontSize:'1rem'}}>Cart</h2>
          {cart.length === 0 && <p style={{fontSize:'.7rem'}}>Empty.</p>}
          {cart.length > 0 && (
            <table style={{width:'100%', fontSize:'.65rem', borderCollapse:'collapse'}}>
              <thead>
                <tr><th style={{textAlign:'left', borderBottom:'1px solid #e2e8f0'}}>Item</th><th style={{textAlign:'left', borderBottom:'1px solid #e2e8f0'}}>Qty</th><th style={{textAlign:'left', borderBottom:'1px solid #e2e8f0'}}>Total</th></tr>
              </thead>
              <tbody>
                {cart.map(i => (
                  <tr key={i.id}>
                    <td style={{borderBottom:'1px solid #f1f5f9', padding:'.25rem .3rem'}}>{i.name}</td>
                    <td style={{borderBottom:'1px solid #f1f5f9', padding:'.25rem .3rem'}}>{i.qty}</td>
                    <td style={{borderBottom:'1px solid #f1f5f9', padding:'.25rem .3rem'}}>${(i.price*i.qty).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {cart.length > 0 && <p style={{fontSize:'.7rem', marginTop:'.4rem'}}>Subtotal: ${total.toFixed(2)}</p>}
        </section>
      )}

      {/* Auth */}
      {features.includes('auth') && (
        <section style={{marginTop:'1.5rem'}}>
          <h2 style={{fontSize:'1rem'}}>User</h2>
          {!user && (
            <form onSubmit={login} style={{display:'flex', gap:'.4rem', flexWrap:'wrap'}}>
              <input value={loginInput} onChange={e=> setLoginInput(e.target.value)} placeholder="username (alice/bob)" style={{padding:'.4rem .6rem', fontSize:'.65rem'}} />
              <button style={{padding:'.4rem .8rem', fontSize:'.6rem'}}>Login</button>
            </form>
          )}
          {user && <p style={{fontSize:'.7rem'}}>Logged in as <strong>{user.username}</strong></p>}
        </section>
      )}

      {/* Database concept */}
      {features.includes('db') && (
        <section style={{marginTop:'1.5rem'}}>
          <h2 style={{fontSize:'1rem'}}>Data Persistence</h2>
          <p style={{fontSize:'.7rem', lineHeight:'1.1rem'}}>Data now stored in a real database (conceptual in this mock). Prior versions used in-memory/static arrays.</p>
        </section>
      )}

      {/* Checkout */}
      {features.includes('checkout') && cart.length > 0 && (
        <section style={{marginTop:'1.5rem'}}>
          <h2 style={{fontSize:'1rem'}}>Checkout</h2>
          {!checkoutData && (
            <form onSubmit={submitCheckout} style={{display:'grid', gap:'.5rem', maxWidth:'360px'}}>
              <input required placeholder="Full Name" style={{padding:'.45rem .6rem', fontSize:'.65rem'}} />
              <input required placeholder="Address" style={{padding:'.45rem .6rem', fontSize:'.65rem'}} />
              <input required placeholder="City" style={{padding:'.45rem .6rem', fontSize:'.65rem'}} />
              <button style={{padding:'.5rem .7rem', fontSize:'.65rem'}}>Save Order Info</button>
            </form>
          )}
          {checkoutData && <p style={{fontSize:'.7rem'}}>Order details captured. Proceed to payment at v0.8.</p>}
        </section>
      )}

      {/* Payment */}
      {features.includes('payment') && checkoutData && (
        <section style={{marginTop:'1.5rem'}}>
          <h2 style={{fontSize:'1rem'}}>Payment</h2>
          {payStatus === 'idle' && <button onClick={pay} style={{padding:'.55rem .9rem', fontSize:'.65rem'}}>Pay Now</button>}
          {payStatus === 'processing' && <p style={{fontSize:'.7rem'}}>Processing...</p>}
          {payStatus === 'success' && <p style={{fontSize:'.7rem', color:'#16a34a'}}>Payment success (mock) • Receipt TEST-XYZ</p>}
        </section>
      )}

      {features.includes('release') && (
        <section style={{marginTop:'1.5rem'}}>
          <h2 style={{fontSize:'1rem'}}>Release Quality</h2>
          <ul style={{fontSize:'.65rem'}}>
            <li>Automated tests & CI/CD</li>
            <li>Performance + accessibility checks</li>
            <li>Docs & onboarding assets</li>
          </ul>
        </section>
      )}

      {features.includes('account') && (
        <section style={{marginTop:'1.5rem'}}>
          <h2 style={{fontSize:'1rem'}}>Account Management</h2>
          <p style={{fontSize:'.65rem'}}>Enhanced user profile editing & credential management introduced at v1.1 (see standalone v1.1 page for interactive mock).</p>
        </section>
      )}

    </VersionShell>
  );
}
