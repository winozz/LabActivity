import React, { useState } from 'react';
import VersionShell from '../layout/VersionShell.jsx';
import { usersV04 } from '../mockData/users.v04.js';

export default function V04Accounts() {
  const [currentUser, setCurrentUser] = useState(null);
  const [username, setUsername] = useState('');

  function login(e) {
    e.preventDefault();
    const user = usersV04.find(u => u.username === username.trim().toLowerCase());
    if (user) setCurrentUser(user); else alert('User not found (mock).');
  }

  return (
    <VersionShell version="0.4" title="User Accounts" focus="Accounts">
      {!currentUser && (
        <form onSubmit={login} style={{display:'flex', gap:'.5rem', flexWrap:'wrap'}}>
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="username (alec / bert)" style={{padding:'.4rem .6rem', fontSize:'.75rem'}} />
          <button type="submit" style={{fontSize:'.7rem', padding:'.4rem .8rem'}}>Login</button>
        </form>
      )}
      {currentUser && <p style={{fontSize:'.8rem'}}>Logged in as <strong>{currentUser.username}</strong> (mock session)</p>}
      <ul style={{fontSize:'.75rem', marginTop:'1rem'}}>
        <li>Basic login (no password real hashing in mock)</li>
        <li>User session state placeholder</li>
        <li>Per-user cart concept (not fully implemented)</li>
      </ul>
      <p style={{marginTop:'1rem'}}><code>git commit -m "v0.4 user accounts"</code></p>
    </VersionShell>
  );
}
