import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

// Simple id generator
let counter = 5;
const nextId = () => (++counter).toString().padStart(4,'0');

// Seed commits present both locally & remotely
const seed = [
  { id: '0001', label: 'init project (v0.1)', local: true, remote: true },
  { id: '0002', label: 'add catalog (v0.2)', local: true, remote: true },
  { id: '0003', label: 'cart feature (v0.3)', local: true, remote: true },
  { id: '0004', label: 'accounts (v0.4)', local: true, remote: true },
  { id: '0005', label: 'db integration (v0.5)', local: true, remote: true },
];

export default function GitSyncDemo(){
  const [commits, setCommits] = useState(seed);

  const ahead = useMemo(()=> commits.filter(c => c.local && !c.remote).length, [commits]);
  const behind = useMemo(()=> commits.filter(c => c.remote && !c.local).length, [commits]);

  function commitLocal(){
    const id = nextId();
    setCommits(prev => [...prev, { id, label: `local change ${id}`, local:true, remote:false }]);
  }
  function push(){
    setCommits(prev => prev.map(c => c.local && !c.remote ? { ...c, remote:true } : c));
  }
  function simulateRemotePush(){
    const id = nextId();
    setCommits(prev => [...prev, { id, label: `remote change ${id}`, local:false, remote:true }]);
  }
  function pull(){
    setCommits(prev => prev.map(c => c.remote && !c.local ? { ...c, local:true } : c));
  }
  function reset(){
    counter = 5;
    setCommits(seed.map(c => ({...c})));
  }

  return (
    <main className="app-shell git-sync-demo">
      <h1 style={{marginBottom:'.3rem'}}>Git ↔ GitHub Sync Demo</h1>
      <p style={{fontSize:'.85rem', maxWidth:'760px'}}>Shows divergence between your local branch and the remote origin. Local-only commits must be pushed. Remote-only commits need pulling. When both sides have a commit, it is synchronized.</p>

      <section className="sync-status">
        <div className="status-pill ahead">Ahead: {ahead}</div>
        <div className="status-pill behind">Behind: {behind}</div>
        <div className="status-pill in-sync">In Sync: {commits.filter(c=>c.local && c.remote).length}</div>
      </section>

      <section className="git-actions">
        <button onClick={commitLocal} disabled={ahead+behind>20}>Local Commit</button>
        <button onClick={push} disabled={ahead===0}>Push</button>
        <button onClick={simulateRemotePush}>Simulate Remote Push</button>
        <button onClick={pull} disabled={behind===0}>Pull</button>
        <button onClick={reset}>Reset</button>
      </section>

      <div className="git-stream" aria-label="Commit history">
        {commits.map((c,i) => {
          const state = c.local && c.remote ? 'synced' : c.local ? 'local-only' : 'remote-only';
          return (
            <div key={c.id} className={`commit-row ${state}`}>
              <div className="connect" aria-hidden>{i!==commits.length-1 && <span/>}</div>
              <div className="lane local" title={c.local ? 'Present locally' : 'Missing locally'}>
                <span className={c.local ? 'dot present' : 'dot missing'} />
              </div>
              <div className="lane remote" title={c.remote ? 'Present on remote' : 'Missing on remote'}>
                <span className={c.remote ? 'dot present' : 'dot missing'} />
              </div>
              <div className="meta">
                <code className="sha">{c.id}</code>
                <span className="label">{c.label}</span>
                <span className={`state ${state}`}>{state.replace('-', ' ')}</span>
              </div>
            </div>
          );
        })}
      </div>

      <section style={{marginTop:'1.75rem'}}>
        <h2 style={{fontSize:'1rem'}}>Explanation</h2>
        <ul style={{fontSize:'.7rem', lineHeight:'1.1rem'}}>
          <li><strong>Local Commit</strong>: adds a commit only to your working branch (ahead increases).</li>
          <li><strong>Push</strong>: sends local-only commits to remote (ahead returns to 0).</li>
          <li><strong>Simulate Remote Push</strong>: someone else pushed to GitHub; you are now behind.</li>
          <li><strong>Pull</strong>: integrates remote-only commits locally (behind returns to 0).</li>
        </ul>
      </section>

      <p style={{marginTop:'2rem', fontSize:'.7rem'}}><Link to="/">← Back Home</Link></p>
    </main>
  );
}
