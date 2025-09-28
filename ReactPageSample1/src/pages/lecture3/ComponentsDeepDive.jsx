import React from 'react';
import { Link } from 'react-router-dom';

const ComponentsDeepDive = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #20c997 0%, #138c6e 100%)', 
      padding: '2rem', 
      color: 'white',
      fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica Neue", sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <div>
            <div style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.2)',
              padding: '0.4rem 1rem',
              borderRadius: '20px',
              fontSize: '0.85rem',
              marginBottom: '0.5rem'
            }}>
              Lecture 3 • Components Deep Dive
            </div>
            <h1 style={{ margin: '0', fontSize: '2.5rem', fontWeight: '700' }}>
              React Components Deep Dive
            </h1>
          </div>
          <Link to="/" style={{ 
            background: 'rgba(255,255,255,0.2)', 
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '500'
          }}>
            ← Back to Home
          </Link>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '2rem',
          backdropFilter: 'blur(10px)',
          textAlign: 'center'
        }}>
          <h2 style={{ margin: '0 0 1rem 0' }}>🚧 Coming Soon</h2>
          <p style={{ margin: '0', fontSize: '1.1rem', opacity: '0.9' }}>
            This section will cover advanced component concepts including component lifecycle,
            composition patterns, and best practices.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <Link 
              to="/lecture3/overview" 
              style={{
                background: 'white',
                color: '#138c6e',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              Back to React Overview
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentsDeepDive;