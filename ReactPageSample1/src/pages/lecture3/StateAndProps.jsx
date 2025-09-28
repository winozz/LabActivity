import React from 'react';
import { Link } from 'react-router-dom';

const StateAndProps = () => {
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
              Lecture 3 • State & Props
            </div>
            <h1 style={{ margin: '0', fontSize: '2.5rem', fontWeight: '700' }}>
              React State & Props
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
            This section will cover React state management, props passing,
            state lifting, and advanced patterns for data flow.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <Link 
              to="/lecture3/javascript-essentials" 
              style={{
                background: 'white',
                color: '#138c6e',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              Back to JavaScript Essentials
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateAndProps;