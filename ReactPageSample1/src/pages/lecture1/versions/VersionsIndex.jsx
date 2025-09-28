import React from 'react';
import { Link } from 'react-router-dom';

const versions = [
  { ver:'0.1', title:'Initial Commit', focus:'Setup' },
  { ver:'0.2', title:'Product Listing MVP', focus:'Catalog' },
  { ver:'0.3', title:'Shopping Cart Feature', focus:'Cart' },
  { ver:'0.4', title:'User Accounts', focus:'Accounts' },
  { ver:'0.5', title:'Database Integration', focus:'Database' },
  { ver:'0.6', title:'Checkout & Orders', focus:'Checkout' },
  { ver:'0.7', title:'UI & Styling Upgrade', focus:'UI/UX' },
  { ver:'0.8', title:'Payment Gateway Integration', focus:'Payment' },
  { ver:'1.0', title:'Stable Release', focus:'Release' },
  { ver:'1.1', title:'Account Management', focus:'Account Mgmt' },
];

export default function VersionsIndex(){
  return (
    <main className="app-shell">
      <h1>Version Mockups</h1>
      <p style={{fontSize:'.9rem'}}>Browse each iterative version mock page for the e-commerce prototype.</p>
      <div style={{display:'grid', gap:'1rem', gridTemplateColumns:'repeat(auto-fill,minmax(210px,1fr))', marginTop:'1.25rem'}}>
        {versions.map(v => (
          <Link key={v.ver} to={`/versions/v${v.ver}`} style={{textDecoration:'none'}}>
            <div style={{background:'#fff', border:'1px solid #e2e8f0', borderRadius:'10px', padding:'.85rem', height:'100%', display:'flex', flexDirection:'column', gap:'.4rem'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <span style={{fontSize:'.7rem', background:'#1e293b', color:'#fff', padding:'.25rem .45rem', borderRadius:'4px'}}>v{v.ver}</span>
                <span style={{fontSize:'.6rem', textTransform:'uppercase', letterSpacing:'.05em', color:'#475569'}}>{v.focus}</span>
              </div>
              <strong style={{fontSize:'.8rem', lineHeight:'1.1rem', color:'#0f172a'}}>{v.title}</strong>
              <span style={{fontSize:'.65rem', color:'#64748b'}}>View mock →</span>
            </div>
          </Link>
        ))}
      </div>
      <p style={{marginTop:'2rem', fontSize:'.75rem'}}><Link to="/">← Back Home</Link></p>
    </main>
  );
}
