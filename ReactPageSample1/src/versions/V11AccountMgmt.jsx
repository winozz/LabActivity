import React, { useState } from 'react';
import VersionShell from '../layout/VersionShell.jsx';

// Simple in-memory profile + password simulation (NOT secure, demonstration only)
const mockUser = {
  id: 1,
  username: 'alice',
  email: 'alice@example.com',
  displayName: 'Alice',
};

export default function V11AccountMgmt() {
  const [user, setUser] = useState(mockUser);
  const [editing, setEditing] = useState(false);
  const [pwdEditing, setPwdEditing] = useState(false);
  const [form, setForm] = useState({ displayName: user.displayName, email: user.email });
  const [passwordForm, setPasswordForm] = useState({ current:'', next:'', confirm:'' });
  const [message, setMessage] = useState(null);

  function onChange(e){
    const { name, value } = e.target; setForm(f => ({...f, [name]: value}));
  }

  function saveProfile(e){
    e.preventDefault();
    setUser(u => ({ ...u, displayName: form.displayName.trim(), email: form.email.trim() }));
    setEditing(false);
    setMessage('Profile updated');
  }

  function updatePassword(e){
    e.preventDefault();
    if (!passwordForm.current) { setMessage('Enter current password (mock)'); return; }
    if (passwordForm.next.length < 6) { setMessage('New password too short'); return; }
    if (passwordForm.next !== passwordForm.confirm) { setMessage('Passwords do not match'); return; }
    setPwdEditing(false);
    setPasswordForm({ current:'', next:'', confirm:'' });
    setMessage('Password changed (mock)');
  }

  function onPwdChange(e){
    const { name, value } = e.target; setPasswordForm(f => ({...f, [name]: value}));
  }

  function resetMessages(){ setMessage(null); }

  return (
    <VersionShell version="1.1" title="Account Management" focus="Manage Account">
      <p style={{fontSize:'.8rem'}}>Adds the ability for a signed-in user to update profile details & change password (mock only).</p>

      <section style={{marginTop:'1rem'}}>
        <h2 style={{fontSize:'.95rem'}}>Profile</h2>
        {!editing && (
          <div style={{fontSize:'.75rem', background:'#fff', border:'1px solid #e2e8f0', padding:'.9rem 1rem', borderRadius:'8px', maxWidth:'420px'}}>
            <div><strong>Name:</strong> {user.displayName}</div>
            <div><strong>Username:</strong> {user.username}</div>
            <div><strong>Email:</strong> {user.email}</div>
            <div style={{marginTop:'.6rem'}}>
              <button onClick={()=> { resetMessages(); setEditing(true); }} style={{fontSize:'.65rem', padding:'.4rem .7rem'}}>Edit Profile</button>
            </div>
          </div>
        )}
        {editing && (
          <form onSubmit={saveProfile} style={{display:'grid', gap:'.6rem', background:'#fff', border:'1px solid #e2e8f0', padding:'1rem', borderRadius:'8px', maxWidth:'420px'}}>
            <label style={{display:'grid', gap:'.25rem', fontSize:'.6rem', textTransform:'uppercase', letterSpacing:'.05em'}}>
              Display Name
              <input name="displayName" value={form.displayName} onChange={onChange} style={{padding:'.45rem .6rem', fontSize:'.7rem'}} required />
            </label>
            <label style={{display:'grid', gap:'.25rem', fontSize:'.6rem', textTransform:'uppercase', letterSpacing:'.05em'}}>
              Email
              <input type="email" name="email" value={form.email} onChange={onChange} style={{padding:'.45rem .6rem', fontSize:'.7rem'}} required />
            </label>
            <div style={{display:'flex', gap:'.5rem'}}>
              <button type="submit" style={{fontSize:'.65rem', padding:'.45rem .9rem'}}>Save</button>
              <button type="button" onClick={()=> { setEditing(false); resetMessages(); setForm({ displayName: user.displayName, email: user.email }); }} style={{fontSize:'.65rem', padding:'.45rem .9rem'}}>Cancel</button>
            </div>
          </form>
        )}
      </section>

      <section style={{marginTop:'1.75rem'}}>
        <h2 style={{fontSize:'.95rem'}}>Password</h2>
        {!pwdEditing && (
          <div style={{fontSize:'.75rem', background:'#fff', border:'1px solid #e2e8f0', padding:'.9rem 1rem', borderRadius:'8px', maxWidth:'420px'}}>
            <p style={{marginTop:0}}>For security, choose a strong password.</p>
            <button onClick={()=> { resetMessages(); setPwdEditing(true); }} style={{fontSize:'.65rem', padding:'.4rem .7rem'}}>Change Password</button>
          </div>
        )}
        {pwdEditing && (
          <form onSubmit={updatePassword} style={{display:'grid', gap:'.6rem', background:'#fff', border:'1px solid #e2e8f0', padding:'1rem', borderRadius:'8px', maxWidth:'420px'}}>
            <label style={{display:'grid', gap:'.25rem', fontSize:'.6rem', textTransform:'uppercase', letterSpacing:'.05em'}}>
              Current Password
              <input name="current" type="password" value={passwordForm.current} onChange={onPwdChange} style={{padding:'.45rem .6rem', fontSize:'.7rem'}} required />
            </label>
            <label style={{display:'grid', gap:'.25rem', fontSize:'.6rem', textTransform:'uppercase', letterSpacing:'.05em'}}>
              New Password
              <input name="next" type="password" value={passwordForm.next} onChange={onPwdChange} style={{padding:'.45rem .6rem', fontSize:'.7rem'}} required />
            </label>
            <label style={{display:'grid', gap:'.25rem', fontSize:'.6rem', textTransform:'uppercase', letterSpacing:'.05em'}}>
              Confirm
              <input name="confirm" type="password" value={passwordForm.confirm} onChange={onPwdChange} style={{padding:'.45rem .6rem', fontSize:'.7rem'}} required />
            </label>
            <div style={{display:'flex', gap:'.5rem'}}>
              <button type="submit" style={{fontSize:'.65rem', padding:'.45rem .9rem'}}>Update</button>
              <button type="button" onClick={()=> { setPwdEditing(false); resetMessages(); setPasswordForm({ current:'', next:'', confirm:'' }); }} style={{fontSize:'.65rem', padding:'.45rem .9rem'}}>Cancel</button>
            </div>
          </form>
        )}
      </section>

      {message && <div style={{marginTop:'1rem', fontSize:'.65rem', color:'#16a34a'}}>{message}</div>}

      <p style={{marginTop:'1.5rem'}}><code>git commit -m "v1.1 account management"</code></p>
    </VersionShell>
  );
}
