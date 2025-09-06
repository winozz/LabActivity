import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function GitGuide() {
  const [history, setHistory] = useState([]); // simulated terminal lines
  const [input, setInput] = useState('');
  const [branch, setBranch] = useState('main');
  const mockAuthors = [
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
    { name: 'Carlos', email: 'carlos@example.com' },
    { name: 'Dana', email: 'dana@example.com' }
  ];
  const initialCommits = [
    { id: 'a1b2c3d', msg: 'init project', authorName: mockAuthors[0].name, authorEmail: mockAuthors[0].email, pushed: true },
    { id: 'd4e5f6a', msg: 'setup routing', authorName: mockAuthors[1].name, authorEmail: mockAuthors[1].email, pushed: true },
    { id: 'b7c8d9e', msg: 'add dashboard', authorName: mockAuthors[2].name, authorEmail: mockAuthors[2].email, pushed: true }
  ];
  const [localCommits, setLocalCommits] = useState(initialCommits);
  const [remoteCommits, setRemoteCommits] = useState(initialCommits);
  const [staged, setStaged] = useState([]); // filenames
  const [wdChanges, setWdChanges] = useState(['README.md', 'src/App.jsx']);
  const [stashes, setStashes] = useState([]); // array of {msg, changes}
  const [config, setConfig] = useState({ name: '(no name)', email: '(no email)' });
  const inputRef = useRef(null);
  const [showIDE, setShowIDE] = useState(false);
  const [activity, setActivity] = useState([]); // {time,msg}

  // simple mock file pool to visualize states
  const allFiles = [
    'README.md',
    'src/App.jsx',
    'src/main.jsx',
    'src/styles.css',
    'src/versions/AllInOne.jsx',
    'src/GitGuide.jsx'
  ];

  function log(msg){
    setActivity(a => [...a.slice(-60), { time: Date.now(), msg }]);
  }

  function print(line){ setHistory(h => [...h, line]); }
  function status(){
  const ahead = localCommits.filter(c => !c.pushed).length;
    const stagedList = staged.length? staged.join(' '): '(none)';
    const wdList = wdChanges.filter(f=> !staged.includes(f)).join(' ') || '(clean)';
    print(`On branch ${branch}`);
    print(`Commits ahead: ${ahead>0? ahead:0}`);
    print(`Changes staged: ${stagedList}`);
    print(`Changes not staged: ${wdList}`);
  }
  function handleCommand(raw){
    const line = raw.trim();
    if(!line){ return; }
    print(`$ ${line}`);
    const parts = line.split(/\s+/);
    const cmd = parts[0];
    if(cmd !== 'git'){ print('Command must start with git'); return; }
    const sub = parts[1];
    switch(sub){
      case 'status': status(); break;
      case 'config': {
        // support: git config --global user.name "Name" ; git config --global user.email "email"
        const full = line;
        const nameMatch = full.match(/user\.name\s+"([^"]+)"/);
        const emailMatch = full.match(/user\.email\s+"([^"]+)"/);
        if(!nameMatch && !emailMatch){ print('usage: git config --global user.name "Your Name" (and/or user.email)'); break; }
        setConfig(c => ({
          name: nameMatch? nameMatch[1] : c.name,
          email: emailMatch? emailMatch[1] : c.email
        }));
        const changed = [];
        if(nameMatch) changed.push(`name='${nameMatch[1]}'`);
        if(emailMatch) changed.push(`email='${emailMatch[1]}'`);
        print(`Updated config: ${changed.join(', ')}`);
        break; }
      case 'add': {
        const target = parts[2];
        if(!target){ print('fatal: pathspec required'); break; }
        if(target === '.'){ setStaged(wdChanges); print('Added all changes'); break; }
        if(!wdChanges.includes(target)){ print(`warning: pathspec '${target}' did not match any files`); break; }
        if(!staged.includes(target)) setStaged(s => [...s, target]);
        print(`staged ${target}`);
        log(`Staged ${target}`);
        break;
      }
      case 'commit': {
        const mIndex = line.indexOf('-m');
        if(mIndex === -1){ print('error: commit message required (-m)'); break; }
        const msgMatch = line.match(/-m\s+"([^"]+)"/);
        if(!msgMatch){ print('error: wrap commit message in quotes'); break; }
        if(staged.length===0){ print('nothing to commit, working tree clean'); break; }
        const msg = msgMatch[1];
  const newCommit = { id: Math.random().toString(16).slice(2,9), msg, authorName: config.name, authorEmail: config.email, pushed: false };
        setLocalCommits(c => [...c, newCommit]);
        // remove staged from wdChanges (simulate clean)
        setWdChanges(files => files.filter(f => !staged.includes(f)));
        setStaged([]);
        print(`[${branch} ${newCommit.id}] ${msg}`);
        log(`Commit ${newCommit.id}: ${msg}`);
        break; }
      case 'log': {
        localCommits.slice().reverse().forEach(commit => {
          const tag = commit.pushed ? 'pushed' : 'local';
          const name = commit.authorName || 'Unknown';
          const email = commit.authorEmail || 'unknown@example.com';
            print(`commit ${commit.id} (${tag})`);
            print(`Author: ${name} <${email}>`);
            print(`Message: ${commit.msg}`);
            print('');
        });
        break; }
      case 'push': {
        const unpushed = localCommits.filter(c => !c.pushed);
        if(unpushed.length === 0){ print('Everything up-to-date'); break; }
        const updated = localCommits.map(c => ({...c, pushed: true}));
        setLocalCommits(updated);
        setRemoteCommits(updated.filter(c => c.pushed));
        print(`Pushed ${unpushed.length} commit(s) to origin/${branch}`);
        log(`Pushed ${unpushed.length} commit(s)`);
        break; }
      case 'pull': {
        // simulate remote has no new commits (unless future extension adds)
        if(remoteCommits.length === localCommits.filter(c=> c.pushed).length){ print('Already up to date.'); break; }
        // merge remote commits (rare path not used now)
        const remoteIds = new Set(remoteCommits.map(c=> c.id));
        const merged = [...localCommits];
        remoteCommits.forEach(rc => { if(!merged.find(c=> c.id===rc.id)) merged.push(rc); });
        setLocalCommits(merged);
        print('Pulled latest changes');
        log('Pulled changes');
        break; }
      case 'switch': {
        const target = parts[2];
        if(!target){ print('error: branch name required'); break; }
        if(target === branch){ print(`Already on '${branch}'`); break; }
        setBranch(target);
        print(`Switched to branch '${target}'`);
        log(`Switched to ${target}`);
        break; }
      case 'stash': {
        const action = parts[2];
        if(!action || action==='push'){ const msgIdx = line.indexOf('-m'); const msg = msgIdx>-1? (line.match(/-m\s+"([^"]+)"/)||[])[1] : 'WIP'; setStashes(s=> [{msg, changes: wdChanges.slice()}, ...s]); setWdChanges([]); setStaged([]); print(`Saved working directory state '${msg}'`); log(`Stashed changes (${msg})`); }
        else if(action==='list'){ stashes.forEach((s,i)=> print(`stash@{${i}}: ${s.msg}`)); if(!stashes.length) print('No stashes.'); }
        else if(action==='pop'){ if(!stashes.length){ print('No stash entries.'); break;} const [first,...rest]=stashes; setWdChanges(first.changes); setStashes(rest); print(`Applied and dropped stash (${first.msg})`); log(`Popped stash (${first.msg})`);} 
        else { print('Unsupported stash subcommand in simulation'); }
        break; }
      default:
        print(`git: '${sub}' not implemented in simulation`);
    }
  }
  function onSubmit(e){ e.preventDefault(); handleCommand(input); setInput(''); }

  // derive file status: staged vs modified
  const fileStatus = (file) => {
    if(staged.includes(file)) return 'staged';
    if(wdChanges.includes(file)) return 'modified';
    return 'clean';
  };

  useEffect(()=> {
    function onKey(e){ if(e.key==='Escape') setShowIDE(false); }
    window.addEventListener('keydown', onKey);
    return ()=> window.removeEventListener('keydown', onKey);
  }, []);
  return (
    <main className="app-shell" style={{maxWidth:'940px'}}>
      <h1 style={{marginTop:0}}>Git & GitHub Essentials</h1>
      <p style={{fontSize:'.85rem'}}>Cheat‑sheet style guide aligned with the version visualization in this project. Commands assume you are inside the repository folder.</p>

      <Section title="1. Identity Configuration (One-Time Per Machine)">
        <CodeBlock>{`git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global core.autocrlf true        # on Windows to normalize line endings
git config --list --show-origin               # verify`}</CodeBlock>
        <p className="note">Use <code>--local</code> (omit <code>--global</code>) inside a repo to override only for that project.</p>
      </Section>

      <Section title="2. Basic Workflow (Working Directory → Staging → Commit)">
        <ol className="list">
          <li>Edit files (working directory).</li>
          <li>Stage changes (index): <code>git add &lt;file&gt;</code></li>
          <li>Create snapshot: <code>git commit -m "message"</code></li>
        </ol>
        <CodeBlock>{`git status                  # what changed / staged
git add src/versions/V03Cart.jsx
git commit -m "feat: add remove from cart"
git log --oneline --decorate --graph -n 5`}</CodeBlock>
        <p className="tip">Stage everything (tracked + new): <code>git add .</code> &nbsp; Undo a staged file: <code>git restore --staged file.js</code></p>
      </Section>

      <Section title="3. Branching & Merging">
        <CodeBlock>{`git branch                   # list branches
git switch -c feature/cart-badge   # create & switch
git switch main                  # move back to main
git merge feature/cart-badge     # fast-forward or merge commit
git branch -d feature/cart-badge # delete merged branch`}</CodeBlock>
        <p className="warn">If merge conflicts appear, Git marks conflict areas with <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code> lines—resolve, then <code>git add</code> and <code>git commit</code>.</p>
      </Section>

      <Section title="4. Comparing Changes">
        <CodeBlock>{`git diff                    # unstaged diffs
git diff --staged          # what will commit
git diff main..feature/cart-badge   # branch vs branch
git log --oneline --graph --decorate --all
git show HEAD~1            # show a specific commit`}</CodeBlock>
      </Section>

      <Section title="5. Stashing & Temporary Shelving">
        <CodeBlock>{`git stash push -m "wip: cart calc"   # save dirty state
git stash list                      # view stashes
git stash show -p stash@{0}         # diff
git stash apply stash@{0}           # re-apply (keep stash)
git stash pop                       # apply + drop
git stash drop stash@{0}            # remove specific
git stash clear                     # remove all`}</CodeBlock>
        <p className="note">Stash keeps uncommitted tracked changes; staged changes are included unless you pass <code>--keep-index</code>.</p>
      </Section>

      <Section title="6. Undoing / Rewriting (Caution)">
        <CodeBlock>{`git restore file.js                 # discard unstaged changes to file
git restore --staged file.js        # unstage (keep working copy)
git commit --amend                  # edit last commit (do not amend if already pushed)
git revert <commit>                 # create inverse commit (safe for shared history)
git reset --soft HEAD~1             # move HEAD back, keep changes staged
git reset --mixed HEAD~1            # move HEAD back, keep changes unstaged
git reset --hard HEAD~1             # DANGEROUS: discard changes
git clean -df                       # remove untracked files/dirs (careful)`}</CodeBlock>
        <p className="warn"><strong>Never</strong> use <code>--hard</code> or history rewriting commands on commits others already pulled, unless the team agrees.</p>
      </Section>

      <Section title="7. Connecting to GitHub (Remote)">
        <CodeBlock>{`# after creating empty repo on GitHub
git remote add origin https://github.com/USER/REPO.git
git remote -v                  # verify
git push -u origin main        # first push sets upstream
git pull                       # fetch + merge
git fetch                      # fetch only (no merge)`}</CodeBlock>
        <p className="tip">Change remote URL: <code>git remote set-url origin &lt;new-url&gt;</code>.</p>
      </Section>

      <Section title="8. Fork / Clone / Upstream">
        <CodeBlock>{`git clone https://github.com/USER/REPO.git
cd REPO
git remote add upstream https://github.com/ORIGINAL/REPO.git
git fetch upstream
git merge upstream/main   # or: git rebase upstream/main`}</CodeBlock>
      </Section>

      <Section title="9. Pull Requests (Workflow Summary)">
        <ol className="list">
          <li>Create branch: <code>git switch -c feature/x</code></li>
          <li>Commit small logical changes.</li>
          <li>Push: <code>git push -u origin feature/x</code></li>
          <li>Open PR on GitHub (compare <code>feature/x</code> → <code>main</code>).</li>
          <li>Review / address comments.</li>
          <li>Merge (squash or rebase). Delete branch.</li>
          <li>Pull updated <code>main</code> locally.</li>
        </ol>
      </Section>

      <Section title="10. Helpful Aliases (Optional)">
        <CodeBlock>{`git config --global alias.st status
git config --global alias.cm "commit -m"
git config --global alias.lg "log --oneline --graph --decorate --all"`}</CodeBlock>
      </Section>

      <Section title="11. Typical Daily Cycle">
        <CodeBlock>{`git pull --ff-only
git switch -c feature/improve-ui
...code / commits...
git push -u origin feature/improve-ui
# open PR, get review, merge
git switch main
git pull --ff-only
git branch -d feature/improve-ui`}</CodeBlock>
      </Section>

      <Section title="12. Interactive Simulator (Subset)">
        <p style={{fontSize:'.7rem'}}>Try basic commands: status, add, commit -m, log, push, pull, switch, stash (push|list|pop). This is a simplified educational model.</p>
        <div style={{background:'#0f172a', padding:'1rem', borderRadius:'8px', color:'#f1f5f9', fontSize:'.6rem'}}>
          <div style={{maxHeight:'220px', overflowY:'auto', marginBottom:'.6rem', border:'1px solid #1e293b', padding:'.5rem', background:'#020617'}}>
            {history.length===0 && <div style={{opacity:.5}}>Type a command below (e.g. git status)</div>}
            {history.map((l,i)=>(<div key={i} style={{whiteSpace:'pre-wrap'}}>{l}</div>))}
          </div>
          <form onSubmit={onSubmit} style={{display:'flex', gap:'.5rem'}}>
            <span style={{alignSelf:'center', color:'#64748b'}}>$</span>
            <input ref={inputRef} value={input} onChange={e=> setInput(e.target.value)} style={{flex:1, background:'#1e293b', color:'#f8fafc', border:'1px solid #334155', padding:'.4rem .6rem', fontFamily:'monospace', fontSize:'.6rem'}} placeholder="git status" />
            <button style={{background:'#2563eb', color:'#fff', border:'none', padding:'.45rem .8rem', fontSize:'.6rem', borderRadius:'4px'}}>Run</button>
          </form>
          <div style={{marginTop:'.6rem', display:'flex', flexWrap:'wrap', gap:'.4rem'}}>
            {['git status','git add README.md','git commit -m "update readme"','git log','git push','git pull','git switch feature/ui','git stash push -m "wip"','git stash list','git stash pop'].map(c=> <button key={c} onClick={()=> { setInput(c); handleCommand(c);} } style={{background:'#1e293b', color:'#fff', border:'1px solid #334155', padding:'.3rem .5rem', fontSize:'.55rem', borderRadius:'4px'}}>{c}</button>)}
            <button onClick={()=> setShowIDE(true)} style={{background:'#334155', color:'#fff', border:'1px solid #475569', padding:'.3rem .5rem', fontSize:'.55rem', borderRadius:'4px'}}>Open Workspace Mock</button>
          </div>
        </div>
      </Section>

      <Section title="13. Common Mistakes & Errors">
        <ul style={{fontSize:'.65rem', lineHeight:'1.05rem'}}>
          <li><strong>Forgot to configure identity:</strong> Git warns "Please tell me who you are" → run config name/email.</li>
            <li><strong>Accidentally committed secrets:</strong> Remove file, rotate secret, purge with BFG or filter-repo; force push only if private.</li>
            <li><strong>Working on main:</strong> Harder code review; create feature branches early.</li>
            <li><strong>Amending after push:</strong> Causes divergence for others; prefer a new commit or coordinated force push.</li>
            <li><strong>Using reset --hard casually:</strong> Data loss; consider stash or revert instead.</li>
            <li><strong>Merge conflicts panic:</strong> Open conflicted files, search for <code>&lt;&lt;&lt;&lt;&lt;&lt;</code> markers, resolve logically, stage, commit.</li>
            <li><strong>Large binary in repo:</strong> Use Git LFS or artifacts store; remove from history if accidental.</li>
        </ul>
      </Section>

      <Section title="14. Quick Tips">
        <ul style={{fontSize:'.65rem', lineHeight:'1.05rem'}}>
          <li>Commit messages: imperative mood ("Add cart removal").</li>
          <li>Small commits &gt; huge commits; easier to review &amp; revert.</li>
          <li>Run tests before push to avoid broken remote builds.</li>
          <li>Use <code>git pull --ff-only</code> to avoid surprise merge commits.</li>
          <li>Rebase interactive (<code>git rebase -i</code>) to squash WIP before PR merge (team policy permitting).</li>
          <li>Use <code>git tag v1.0.0</code> for releases.</li>
          <li>Alias <code>lg</code> for quick graph view.</li>
        </ul>
      </Section>

      <Section title="15. References & Further Reading">
        <ul style={{fontSize:'.65rem', lineHeight:'1.05rem'}}>
          <li><a href="https://git-scm.com/docs" target="_blank" rel="noreferrer">Official Git Documentation</a> – authoritative command reference.</li>
          <li><a href="https://git-scm.com/book/en/v2" target="_blank" rel="noreferrer">Pro Git Book</a> – in‑depth free book (Chapters 2–3 for everyday usage).</li>
          <li><a href="https://docs.github.com" target="_blank" rel="noreferrer">GitHub Docs</a> – authentication, pull requests, actions, security.</li>
          <li><a href="https://learngitbranching.js.org" target="_blank" rel="noreferrer">Learn Git Branching</a> – interactive visual branching puzzles.</li>
          <li><a href="https://ohmygit.org" target="_blank" rel="noreferrer">Oh My Git!</a> – gamified Git learning (open source).</li>
          <li><a href="https://www.atlassian.com/git/tutorials" target="_blank" rel="noreferrer">Atlassian Git Tutorials</a> – conceptual articles & workflows.</li>
          <li><a href="https://gitignore.io" target="_blank" rel="noreferrer">gitignore.io</a> – generate language / tooling specific .gitignore templates.</li>
          <li><a href="https://semver.org" target="_blank" rel="noreferrer">Semantic Versioning</a> – for consistent version tags (e.g. v1.2.3).</li>
          <li><a href="https://www.conventionalcommits.org" target="_blank" rel="noreferrer">Conventional Commits</a> – commit message spec powering changelog automation.</li>
          <li><a href="https://nvie.com/posts/a-successful-git-branching-model/" target="_blank" rel="noreferrer">Git Flow Model</a> – classic branching model (evaluate if fits your team).</li>
          <li><a href="https://trunkbaseddevelopment.com" target="_blank" rel="noreferrer">Trunk Based Development</a> – alternative emphasizing short‑lived branches.</li>
          <li><a href="https://docs.github.com/en/get-started/quickstart/github-flow" target="_blank" rel="noreferrer">GitHub Flow</a> – lightweight branch & PR workflow for continuous delivery.</li>
        </ul>
      </Section>

      <footer style={{marginTop:'2.5rem', fontSize:'.6rem', color:'#64748b'}}>Guide generated for educational purposes. Adapt commands to your policy (e.g. conventional commits, protected branches).</footer>
      <p style={{marginTop:'1rem'}}><Link to="/">← Back Home</Link></p>

      {showIDE && (
        <div className="ide-overlay" role="dialog" aria-modal="true">
          <div className="ide-modal">
            <div className="ide-titlebar">
              <span>VS Workspace Mock • branch: {branch}</span>
              <button className="ide-close" onClick={()=> setShowIDE(false)} aria-label="Close">×</button>
            </div>
            <div className="ide-body">
              <aside className="ide-sidebar" aria-label="Explorer">
                <div className="panel-heading">EXPLORER</div>
                <ul className="file-tree">
                  {allFiles.map(f => {
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
                <div className="panel-heading" style={{marginTop:'1rem'}}>COMMITS</div>
                <div style={{maxHeight:'120px', overflowY:'auto', fontSize:'10px', padding:'4px 4px 2px', border:'1px solid #243551', borderRadius:'4px', background:'#0f172a'}}>
                  {[...localCommits].slice().reverse().slice(0,6).map(c => (
                    <div key={c.id} style={{marginBottom:'4px'}}>
                      <code style={{background:'#1e293b', padding:'1px 4px', borderRadius:'4px'}}>{c.id}</code> {c.msg}
                      {!c.pushed && <span style={{color:'#f59e0b'}}> • local</span>}
                    </div>
                  ))}
                  {localCommits.length===0 && <div style={{opacity:.5}}>no commits</div>}
                </div>
                <div className="panel-heading" style={{marginTop:'1rem'}}>IDENTITY</div>
                <div style={{fontSize:'10px', lineHeight:'1.2rem'}}>
                  <div>Name: {config.name}</div>
                  <div>Email: {config.email}</div>
                </div>
                <div className="panel-heading" style={{marginTop:'1rem'}}>STASHES</div>
                <div style={{fontSize:'10px', lineHeight:'1.1rem'}}>
                  {stashes.length===0 && <div style={{opacity:.45}}>empty</div>}
                  {stashes.map((s,i)=>(<div key={i}><code style={{background:'#1e293b', padding:'1px 4px', borderRadius:'4px'}}>#{i}</code> {s.msg}</div>))}
                </div>
              </aside>
              <main className="ide-main" aria-label="Editor">
                <div className="editor-tabs">
                  <div className="tab active">README.md</div>
                  <div className="tab">src/App.jsx</div>
                </div>
                <div className="editor-content">
{`# Git Simulator Workspace\n\nBranch: ${branch}\nAhead (unpushed commits): ${localCommits.filter(c=>!c.pushed).length}\nWorking changes: ${wdChanges.filter(f=>!staged.includes(f)).join(', ') || 'none'}\nStaged: ${staged.join(', ') || 'none'}\n\nUse the interactive buttons / commands to modify state. This panel mirrors the simulator.`}
                </div>
                <div className="terminal-panel" aria-label="Activity Log">
                  <div className="panel-heading small">ACTIVITY</div>
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

function Section({ title, children }) {
  return (
    <section style={{marginTop:'2rem'}}>
      <h2 style={{fontSize:'1rem', margin:'0 0 .4rem'}}>{title}</h2>
      {children}
    </section>
  );
}

function CodeBlock({ children }) {
  return (
    <pre style={{background:'#0f172a', color:'#f8fafc', padding:'0.85rem 1rem', fontSize:'.63rem', lineHeight:'1.1rem', borderRadius:'8px', overflowX:'auto'}}><code>{children}</code></pre>
  );
}
