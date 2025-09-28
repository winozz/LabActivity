import React from 'react';
import { Link } from 'react-router-dom';

const versions = [
  { ver: '0.1', title: 'Initial Commit', details: [
    'Basic project setup', 'Git repo initialized', 'README with project goals', 'Empty folder structure (frontend/backend/docs/tests)'
  ], highlight: 'Setup' },
  { ver: '0.2', title: 'Product Listing MVP', details: [
    'Backend: hardcoded JSON product list', 'Frontend: product cards (name + price)', 'No DB, no cart yet'
  ], highlight: 'Catalog' },
  { ver: '0.3', title: 'Shopping Cart Feature', details: [
    'Add to Cart button', 'Cart summary page', 'Cart stored in local/session storage'
  ], highlight: 'Cart' },
  { ver: '0.4', title: 'User Accounts', details: [
    'Login/signup (hashed password)', 'User session handling', 'Saved cart per user'
  ], highlight: 'Accounts' },
  { ver: '0.5', title: 'Database Integration', details: [
    'SQLite/PostgreSQL added', 'Products + users persisted', 'Migration scripts'
  ], highlight: 'Database' },
  { ver: '0.6', title: 'Checkout & Orders', details: [
    'Checkout page (address + payment placeholder)', 'Persist orders', 'Order history view'
  ], highlight: 'Checkout' },
  { ver: '0.7', title: 'UI & Styling Upgrade', details: [
    'Responsive styling (Tailwind/Bootstrap)', 'Product images & categories', 'Search & filter'
  ], highlight: 'UI/UX' },
  { ver: '0.8', title: 'Payment Gateway Integration', details: [
    'Stripe/PayPal sandbox', 'Real payment flow (test mode)', 'Secure backend validation'
  ], highlight: 'Payment' },
  { ver: '1.0', title: 'Stable Release', details: [
    'Polished UI/UX', 'CI/CD pipeline', 'Unit + integration tests', 'Documentation finalized'
  ], highlight: 'Release' },
];

export default function ECommerceRoadmap() {
  return (
    <main className="app-shell">
      <h1>E-Commerce Iterative Roadmap</h1>
      <p>This timeline shows incremental version milestones for building a minimal e-commerce platform using Git for version control.</p>

      <section className="timeline">
        {versions.map((v, idx) => (
          <div key={v.ver} className="timeline-item">
            <div className="marker" aria-hidden />
            <div className="content">
              <h2>v{v.ver} – {v.title}</h2>
              <ul>{v.details.map(d => <li key={d}>{d}</li>)}</ul>
              <div className="tagline">Focus: {v.highlight}</div>
              {idx < versions.length - 1 && <div className="progress-label">→ evolves toward v{versions[idx + 1].ver}</div>}
            </div>
          </div>
        ))}
      </section>

      <section style={{marginTop:'2rem'}}>
        <h3>Visual Sequence</h3>
        <div className="sequence-bar">
          {versions.map(v => (
            <div key={v.ver} className="seq-node" title={`v${v.ver} ${v.title}`}>
              <span>v{v.ver}</span>
            </div>
          ))}
        </div>
        <div className="sequence-labels">
          {versions.map(v => <div key={v.ver}>{v.highlight}</div>)}
        </div>
      </section>

      <section style={{marginTop:'2rem'}}>
        <h3>Suggested Commit Messages</h3>
        <ol className="commit-list">
          {versions.map(v => (
            <li key={v.ver}><code>git commit -m "v{v.ver} {v.title.replace(/"/g,'') }"</code></li>
          ))}
        </ol>
      </section>

      <p style={{marginTop:'2rem'}}><Link to="/">← Back Home</Link></p>
    </main>
  );
}
