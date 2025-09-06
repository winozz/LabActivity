import React from 'react';
import { Link } from 'react-router-dom';

// Simple visualization of project checkpoints (git-oriented)
export default function Checkpoints() {
  const checkpoints = [
    { id: 1, label: 'Project Initialization', description: 'Scaffold React + Vite project', tag: 'init' },
    { id: 2, label: 'Add Routing', description: 'Introduce react-router and navigation', tag: 'routing' },
    { id: 3, label: 'Checkpoint Page', description: 'Visualization page for version control milestones', tag: 'checkpoint-page' },
  ];

  return (
    <main className="app-shell">
      <h1>Project Checkpoints</h1>
      <p>Suggested milestones to commit when using Git version control.</p>
      <ol className="checkpoint-list">
        {checkpoints.map(c => (
          <li key={c.id}>
            <div className="checkpoint-card">
              <strong>{c.id}. {c.label}</strong>
              <div className="desc">{c.description}</div>
              <code className="tag">git commit -m "{c.tag}"</code>
            </div>
          </li>
        ))}
      </ol>
      <p><Link to="/">← Back Home</Link></p>
    </main>
  );
}
