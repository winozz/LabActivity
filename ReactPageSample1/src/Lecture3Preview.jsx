import React from 'react';
import { Link } from 'react-router-dom';

const Lecture3Preview = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #20c997 0%, #138c6e 100%)', 
      padding: '2rem', 
      color: 'white',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h1 style={{ margin: '0' }}>Lecture 3: Advanced Topics</h1>
          <Link to="/" style={{ 
            background: 'rgba(255,255,255,0.2)', 
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            textDecoration: 'none'
          }}>
            Back to Home
          </Link>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '8px',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <h2>Coming Soon</h2>
          <p>
            The content for Lecture 3 is currently in development. This section will include advanced topics
            that build upon concepts introduced in previous lectures.
          </p>
          
          <div style={{
            background: 'rgba(0,0,0,0.1)',
            padding: '1rem',
            borderRadius: '4px',
            marginTop: '1rem'
          }}>
            <h3>Expected Release: October 2025</h3>
            <p>Check back soon for updates!</p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {[1, 2, 3].map(index => (
            <div key={index} style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '200px'
            }}>
              <div>
                <h3 style={{ marginTop: '0' }}>Future Topic {index}</h3>
                <p>This placeholder will be replaced with actual content for Lecture 3.</p>
              </div>
              <div style={{
                background: 'rgba(0,0,0,0.2)',
                height: '24px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem'
              }}>
                Module {index} • Coming Soon
              </div>
            </div>
          ))}
        </div>

        <div style={{
          background: 'rgba(0,0,0,0.2)',
          padding: '1.5rem',
          borderRadius: '8px',
          fontSize: '0.9rem',
          marginTop: '2rem'
        }}>
          <h3 style={{ marginTop: '0' }}>Subscribe for Updates</h3>
          <p>Enter your email to be notified when new content is available:</p>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="email"
              placeholder="your.email@example.com"
              style={{
                flex: 1,
                padding: '0.75rem',
                borderRadius: '4px',
                border: 'none',
                background: 'rgba(255,255,255,0.1)',
                color: 'white'
              }}
            />
            <button
              style={{
                background: 'white',
                color: '#138c6e',
                border: 'none',
                borderRadius: '4px',
                padding: '0 1.5rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lecture3Preview;