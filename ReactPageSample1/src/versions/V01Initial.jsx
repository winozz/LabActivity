import React from 'react';
import VersionShell from '../layout/VersionShell.jsx';

export default function V01Initial() {
  return (
    <VersionShell version="0.1" title="Initial Commit" focus="Setup">
      <ul style={{fontSize:'.85rem', lineHeight:'1.2rem'}}>
        <li>Project structure created (frontend / backend / docs / tests)</li>
        <li>Git repository initialized</li>
        <li>README with project goals</li>
        <li>No UI yet – foundation only</li>
      </ul>
      <p style={{marginTop:'1rem'}}><code>git commit -m "v0.1 initial commit"</code></p>
    </VersionShell>
  );
}
