import React from 'react';
import VersionShell from '../../../layout/VersionShell.jsx';

export default function V07UI() {
  return (
    <VersionShell version="0.7" title="UI & Styling Upgrade" focus="UI/UX">
      <p style={{fontSize:'.85rem'}}>Applies a design system (e.g. Tailwind). Below is a conceptual card grid styled with utility-like classes (inline for prototype).</p>
      <div style={{display:'grid', gap:'1rem', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', marginTop:'1rem'}}>
        {[1,2,3,4,5,6].map(i => (
          <div key={i} style={{background:'#fff', border:'1px solid #e2e8f0', borderRadius:'14px', padding:'1rem', boxShadow:'0 4px 12px -2px rgba(0,0,0,.06)'}}>
            <div style={{height:'90px', background:'linear-gradient(135deg,#3b82f6,#6366f1)', borderRadius:'10px', marginBottom:'.75rem'}} />
            <strong style={{fontSize:'.8rem'}}>Product {i}</strong>
            <div style={{fontSize:'.7rem', color:'#475569', margin:'.2rem 0 .6rem'}}>Category</div>
            <button style={{fontSize:'.65rem', padding:'.4rem .6rem'}}>View</button>
          </div>
        ))}
      </div>
      <p style={{marginTop:'1rem'}}><code>git commit -m "v0.7 ui styling upgrade"</code></p>
    </VersionShell>
  );
}
