import React from 'react';

function AppTest() {
  return (
    <div style={{
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      background: '#f8fafc',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#8B1538' }}>CVSU Learning Portal - Test</h1>
      <p>If you can see this, React is working!</p>
      <div style={{
        background: '#8B1538',
        color: 'white',
        padding: '1rem',
        borderRadius: '8px',
        marginTop: '1rem'
      }}>
        CVSU Theme Applied Successfully
      </div>
    </div>
  );
}

export default AppTest;