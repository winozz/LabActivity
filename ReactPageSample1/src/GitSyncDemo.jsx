import React, { useState, useMemo, useCallback, useEffect } from 'react';
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
  const [commits, setCommits] = useState(seed.map(c => ({...c, changed: []})));
  const [showIDE, setShowIDE] = useState(false);
  const [activity, setActivity] = useState([]); // {time,msg}

  const filePool = [
    'src/App.jsx',
    'src/components/Cart.jsx',
    'src/pages/Dashboard.jsx',
    'src/hooks/useAuth.js',
    'src/styles.css',
    'README.md'
  ];

  function log(msg){
    setActivity(a => [...a.slice(-49), { time: Date.now(), msg }]);
  }

  const ahead = useMemo(()=> commits.filter(c => c.local && !c.remote).length, [commits]);
  const behind = useMemo(()=> commits.filter(c => c.remote && !c.local).length, [commits]);

  const pickFiles = () => {
    const count = Math.random() < 0.5 ? 1 : 2;
    const shuffled = [...filePool].sort(()=> Math.random()-0.5);
    return shuffled.slice(0,count);
  };

  function commitLocal(){
    const id = nextId();
    const changed = pickFiles();
    setCommits(prev => [...prev, { id, label: `local change ${id}`, local:true, remote:false, changed }]);
    log(`Local commit ${id} (${changed.join(', ')})`);
  }
  function push(){
    setCommits(prev => prev.map(c => c.local && !c.remote ? { ...c, remote:true } : c));
    log('Pushed local commits to origin');
  }
  function simulateRemotePush(){
    const id = nextId();
    const changed = pickFiles();
    setCommits(prev => [...prev, { id, label: `remote change ${id}`, local:false, remote:true, changed }]);
    log(`Remote commit appeared ${id} (${changed.join(', ')})`);
  }
  function pull(){
    let pulled = 0;
    setCommits(prev => prev.map(c => {
      if(c.remote && !c.local){ pulled++; return { ...c, local:true }; }
      return c;
    }));
    log(pulled? `Pulled ${pulled} remote commit(s)` : 'Nothing to pull');
  }
  function reset(){
    counter = 5;
    setCommits(seed.map(c => ({...c, changed: []})));
    setActivity([]);
    log('Reset simulation state');
  }

  const latestLocalChangeFiles = useMemo(()=> {
    const last = [...commits].reverse().find(c => c.local && !c.remote);
    return last?.changed || [];
  }, [commits]);
  const latestRemoteChangeFiles = useMemo(()=> {
    const last = [...commits].reverse().find(c => c.remote && !c.local);
    return last?.changed || [];
  }, [commits]);

  const fileStatus = useCallback((file) => {
    const localTouched = latestLocalChangeFiles.includes(file);
    const remoteTouched = latestRemoteChangeFiles.includes(file);
    if(localTouched && remoteTouched) return 'both';
    if(localTouched) return 'local';
    if(remoteTouched) return 'remote';
    return 'clean';
  }, [latestLocalChangeFiles, latestRemoteChangeFiles]);

  useEffect(() => {
    function onKey(e){ if(e.key==='Escape') setShowIDE(false); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

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
  <button onClick={()=> setShowIDE(true)}>Open VS Workspace Mock</button>
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

      {showIDE && (
        <div className="ide-overlay" role="dialog" aria-modal="true">
          <div className="ide-modal">
            <div className="ide-titlebar">
              <span>VS Workspace Mock • branch: main</span>
              <button className="ide-close" onClick={()=> setShowIDE(false)} aria-label="Close">×</button>
            </div>
            <div className="ide-body">
              <aside className="ide-sidebar" aria-label="Explorer">
                <div className="panel-heading">EXPLORER</div>
                <ul className="file-tree">
                  {filePool.map(f => {
                    const st = fileStatus(f);
                    return (
                      <li key={f} className={`file-item ${st}`}>
                        <span className="dot" />
                        <span className="name">{f}</span>
                        {st !== 'clean' && <span className={`badge ${st}`}>{st}</span>}
                      </li>
                    );
                  })}
                </ul>
                <div className="panel-heading" style={{marginTop:'1rem'}}>SCM</div>
                <div className="scm-stats">
                  <div>Ahead: {ahead}</div>
                  <div>Behind: {behind}</div>
                  <div>Total: {commits.length}</div>
                </div>
              </aside>
              <main className="ide-main" aria-label="Editor">
                <div className="editor-tabs">
                  <div className="tab active">README.md</div>
                  <div className="tab">src/App.jsx</div>
                </div>
                <div className="editor-content">
{`# Project Demo\n\nLatest local files changed: ${latestLocalChangeFiles.join(', ') || 'None'}\nLatest remote files changed: ${latestRemoteChangeFiles.join(', ') || 'None'}\n\nAhead: ${ahead}  Behind: ${behind}\n\nUse the buttons outside this modal to create commits, then watch badges update.`}
                </div>
                <div className="terminal-panel" aria-label="Activity Log">
                  <div className="panel-heading small">TERMINAL / OUTPUT</div>
                  <div className="activity-scroll">
                    {activity.length===0 && <div className="placeholder">(no activity yet)</div>}
                    {activity.slice().reverse().map(a => (
                      <div key={a.time} className="log-line">{new Date(a.time).toLocaleTimeString()} — {a.msg}</div>
                    ))}
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
