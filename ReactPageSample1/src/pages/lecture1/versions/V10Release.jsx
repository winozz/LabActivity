import React from 'react';
import VersionShell from '../../../layout/VersionShell.jsx';

export default function V10Release() {
  return (
    <VersionShell version="1.0" title="Stable Release" focus="Release">
      <p style={{fontSize:'.85rem'}}>Represents the polished, deployable product.</p>
      <ul style={{fontSize:'.75rem'}}>
        <li>All core flows implemented (browse → cart → checkout → payment → order history)</li>
        <li>Comprehensive test coverage (unit + integration)</li>
        <li>Automated CI/CD pipeline (build, test, deploy)</li>
        <li>Documentation + onboarding guide</li>
        <li>Performance & accessibility audits passed</li>
      </ul>
      <p style={{marginTop:'1rem'}}><code>git commit -m "v1.0 stable release"</code></p>
    </VersionShell>
  );
}
