import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

// Combined milestone data (reuse conceptually from checkpoints & roadmap)
const milestones = [
  { version: '0.1', label: 'Initial Commit', type: 'setup', done: true },
  { version: '0.2', label: 'Product Listing MVP', type: 'catalog', done: true },
  { version: '0.3', label: 'Shopping Cart Feature', type: 'cart', done: false },
  { version: '0.4', label: 'User Accounts', type: 'auth', done: false },
  { version: '0.5', label: 'Database Integration', type: 'data', done: false },
  { version: '0.6', label: 'Checkout & Orders', type: 'orders', done: false },
  { version: '0.7', label: 'UI & Styling Upgrade', type: 'ui', done: false },
  { version: '0.8', label: 'Payment Gateway Integration', type: 'payment', done: false },
  { version: '1.0', label: 'Stable Release', type: 'release', done: false },
];

export default function Dashboard() {
  const [query, setQuery] = useState('');
  const [showOnlyPending, setShowOnlyPending] = useState(false);

  const filtered = useMemo(() => {
    return milestones.filter(m => {
      if (showOnlyPending && m.done) return false;
      if (query && !(`${m.version} ${m.label} ${m.type}`.toLowerCase().includes(query.toLowerCase()))) return false;
      return true;
    });
  }, [query, showOnlyPending]);

  const total = milestones.length;
  const completed = milestones.filter(m => m.done).length;
  const progressPct = Math.round((completed / total) * 100);

  return (
    <main className="app-shell dashboard">
      <header>
        <h1>Project Dashboard</h1>
        <p>A unified view of development milestones and progress status.</p>
      </header>

      <section className="progress-panel">
        <div className="progress-bar-wrapper" aria-label={`Progress ${progressPct}%`}>
          <div className="progress-bar" style={{width: progressPct + '%'}} />
        </div>
        <div className="progress-meta">{completed} / {total} milestones complete ({progressPct}%)</div>
      </section>

      <section className="filters" aria-label="Filters">
        <input
          type="text"
          placeholder="Search (version, label, type)..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <label className="checkbox">
          <input type="checkbox" checked={showOnlyPending} onChange={e => setShowOnlyPending(e.target.checked)} />
          Show only pending
        </label>
      </section>

      <section className="milestone-list" aria-label="Milestone list">
        {filtered.length === 0 && <p className="empty">No milestones match your filter.</p>}
        {filtered.map(m => (
          <article key={m.version} className={"milestone-card" + (m.done ? ' done' : '')}>
            <div className="milestone-head">
              <span className="version">v{m.version}</span>
              <span className={"status-pill" + (m.done ? ' complete' : ' pending')}>
                {m.done ? 'Complete' : 'Pending'}
              </span>
            </div>
            <h2>{m.label}</h2>
            <p className="type">Type: {m.type}</p>
            <div className="actions">
              <code>git commit -m "v{m.version} {m.label.replace(/"/g,'') }"</code>
            </div>
          </article>
        ))}
      </section>

      <nav style={{marginTop:'2rem', display:'flex', gap:'1rem', flexWrap:'wrap'}}>
        <Link to="/">Home</Link>
        <Link to="/checkpoints">Checkpoints</Link>
        <Link to="/roadmap">Roadmap</Link>
      </nav>
    </main>
  );
}
