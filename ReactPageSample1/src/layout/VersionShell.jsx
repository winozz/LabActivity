import React from 'react';
import { Link } from 'react-router-dom';

export default function VersionShell({ version, title, focus, children }) {
  return (
    <div className="version-shell app-shell">
      <header style={{marginBottom:'1.5rem'}}>
        <h1 style={{marginBottom:'.3rem'}}>v{version} – {title}</h1>
        {focus && <div className="tagline" style={{fontSize:'.75rem', letterSpacing:'.05em', textTransform:'uppercase', color:'#475569'}}>Focus: {focus}</div>}
        <nav style={{marginTop:'1rem', display:'flex', gap:'.75rem', flexWrap:'wrap', fontSize:'.8rem'}}>
          <Link to="/">Home</Link>
          <Link to="/roadmap">Roadmap</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/checkpoints">Checkpoints</Link>
        </nav>
      </header>
      <section>{children}</section>
      <footer style={{marginTop:'2.5rem', fontSize:'.65rem', color:'#64748b'}}>Prototype mockup page for iterative version visualization.</footer>
    </div>
  );
}
