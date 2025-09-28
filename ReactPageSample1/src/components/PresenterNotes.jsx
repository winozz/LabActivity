import React, { useState, useEffect } from 'react';

const PresenterNotes = ({ notes, lessonTitle = "Lesson" }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  // Default password - can be customized per component
  const PRESENTER_PASSWORD = 'teach2024';

  useEffect(() => {
    // Check if user is already authenticated in this session
    const authStatus = sessionStorage.getItem(`presenter_auth_${lessonTitle}`);
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, [lessonTitle]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === PRESENTER_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem(`presenter_auth_${lessonTitle}`, 'true');
      setShowLogin(false);
      setPassword('');
    } else {
      alert('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsVisible(false);
    sessionStorage.removeItem(`presenter_auth_${lessonTitle}`);
  };

  if (!isAuthenticated) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000
      }}>
        <button
          onClick={() => setShowLogin(true)}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            padding: '12px 20px',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
          }}
        >
          🎤 Presenter Mode
        </button>

        {showLogin && (
          <div style={{
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000
          }}>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2rem',
              maxWidth: '400px',
              width: '90%',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              animation: 'slideIn 0.3s ease-out'
            }}>
              <h3 style={{
                margin: '0 0 1rem 0',
                color: '#1f2937',
                fontSize: '1.5rem',
                textAlign: 'center'
              }}>
                🔐 Presenter Access
              </h3>
              <p style={{
                margin: '0 0 1.5rem 0',
                color: '#6b7280',
                textAlign: 'center',
                fontSize: '0.95rem'
              }}>
                Enter the presenter password to access teaching notes and scripts.
              </p>
              <form onSubmit={handlePasswordSubmit}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter presenter password..."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    marginBottom: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  autoFocus
                />
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  justifyContent: 'flex-end'
                }}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowLogin(false);
                      setPassword('');
                    }}
                    style={{
                      background: '#f3f4f6',
                      color: '#374151',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 16px',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 20px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Access Notes
                  </button>
                </div>
              </form>
              <div style={{
                marginTop: '1rem',
                padding: '0.75rem',
                background: '#fef3c7',
                borderRadius: '8px',
                fontSize: '0.85rem',
                color: '#92400e'
              }}>
                💡 <strong>Hint:</strong> Default password is "teach2024"
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {/* Presenter Notes Toggle Button */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <button
          onClick={() => setIsVisible(!isVisible)}
          style={{
            background: isVisible 
              ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            padding: '12px 20px',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: isVisible 
              ? '0 4px 15px rgba(16, 185, 129, 0.3)' 
              : '0 4px 15px rgba(102, 126, 234, 0.3)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {isVisible ? '👁️ Hide Notes' : '📝 Show Notes'}
        </button>
        
        <button
          onClick={handleLogout}
          style={{
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            padding: '8px 12px',
            fontSize: '0.8rem',
            cursor: 'pointer',
            opacity: '0.8'
          }}
        >
          🔒 Lock
        </button>
      </div>

      {/* Presenter Notes Panel */}
      {isVisible && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          background: 'rgba(0, 0, 0, 0.9)',
          zIndex: 1500,
          display: 'flex',
          padding: '2rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden'
          }}>
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '1.5rem 2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', fontWeight: '700' }}>
                  🎤 Presenter Notes: {lessonTitle}
                </h2>
                <p style={{ margin: '0', opacity: '0.9', fontSize: '0.95rem' }}>
                  Section {currentSection + 1} of {notes.length}
                </p>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>

            {/* Navigation */}
            <div style={{
              padding: '1rem 2rem',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              gap: '0.5rem',
              overflowX: 'auto'
            }}>
              {notes.map((note, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSection(index)}
                  style={{
                    background: currentSection === index 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                      : '#f3f4f6',
                    color: currentSection === index ? 'white' : '#374151',
                    border: 'none',
                    borderRadius: '25px',
                    padding: '8px 16px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {note.section}
                </button>
              ))}
            </div>

            {/* Content */}
            <div style={{
              flex: 1,
              overflow: 'auto',
              padding: '2rem'
            }}>
              {notes[currentSection] && (
                <div>
                  <h3 style={{
                    margin: '0 0 1.5rem 0',
                    color: '#1f2937',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <span style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem',
                      fontWeight: '700'
                    }}>
                      {currentSection + 1}
                    </span>
                    {notes[currentSection].section}
                  </h3>

                  {/* Duration */}
                  {notes[currentSection].duration && (
                    <div style={{
                      background: '#fef3c7',
                      color: '#92400e',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      marginBottom: '1.5rem',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      ⏱️ Estimated time: {notes[currentSection].duration}
                    </div>
                  )}

                  {/* Key Points */}
                  {notes[currentSection].keyPoints && (
                    <div style={{ marginBottom: '2rem' }}>
                      <h4 style={{
                        margin: '0 0 1rem 0',
                        color: '#1f2937',
                        fontSize: '1.2rem',
                        fontWeight: '600'
                      }}>
                        🎯 Key Points to Cover:
                      </h4>
                      <ul style={{
                        margin: '0',
                        paddingLeft: '1.5rem',
                        color: '#374151',
                        lineHeight: '1.7'
                      }}>
                        {notes[currentSection].keyPoints.map((point, idx) => (
                          <li key={idx} style={{ marginBottom: '0.5rem' }}>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Teaching Script */}
                  {notes[currentSection].script && (
                    <div style={{ marginBottom: '2rem' }}>
                      <h4 style={{
                        margin: '0 0 1rem 0',
                        color: '#1f2937',
                        fontSize: '1.2rem',
                        fontWeight: '600'
                      }}>
                        💬 Teaching Script:
                      </h4>
                      <div style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        fontSize: '1rem',
                        lineHeight: '1.7',
                        color: '#334155',
                        fontFamily: 'Georgia, serif'
                      }}>
                        {notes[currentSection].script.split('\n\n').map((paragraph, idx) => (
                          <p key={idx} style={{
                            margin: idx === 0 ? '0 0 1rem 0' : '1rem 0',
                            textAlign: 'justify'
                          }}>
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Interactive Elements */}
                  {notes[currentSection].interactions && (
                    <div style={{ marginBottom: '2rem' }}>
                      <h4 style={{
                        margin: '0 0 1rem 0',
                        color: '#1f2937',
                        fontSize: '1.2rem',
                        fontWeight: '600'
                      }}>
                        🤝 Student Interactions:
                      </h4>
                      {notes[currentSection].interactions.map((interaction, idx) => (
                        <div key={idx} style={{
                          background: '#ecfdf5',
                          border: '1px solid #d1fae5',
                          borderRadius: '8px',
                          padding: '1rem',
                          marginBottom: '1rem'
                        }}>
                          <h5 style={{
                            margin: '0 0 0.5rem 0',
                            color: '#065f46',
                            fontSize: '1rem',
                            fontWeight: '600'
                          }}>
                            {interaction.type}
                          </h5>
                          <p style={{
                            margin: '0',
                            color: '#047857',
                            fontSize: '0.95rem'
                          }}>
                            {interaction.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Common Questions */}
                  {notes[currentSection].commonQuestions && (
                    <div>
                      <h4 style={{
                        margin: '0 0 1rem 0',
                        color: '#1f2937',
                        fontSize: '1.2rem',
                        fontWeight: '600'
                      }}>
                        ❓ Common Student Questions:
                      </h4>
                      {notes[currentSection].commonQuestions.map((qa, idx) => (
                        <div key={idx} style={{
                          background: '#fef7ff',
                          border: '1px solid #f3e8ff',
                          borderRadius: '8px',
                          padding: '1rem',
                          marginBottom: '1rem'
                        }}>
                          <h5 style={{
                            margin: '0 0 0.5rem 0',
                            color: '#7c3aed',
                            fontSize: '1rem',
                            fontWeight: '600'
                          }}>
                            Q: {qa.question}
                          </h5>
                          <p style={{
                            margin: '0',
                            color: '#6b46c1',
                            fontSize: '0.95rem'
                          }}>
                            A: {qa.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer Navigation */}
            <div style={{
              padding: '1rem 2rem',
              borderTop: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <button
                onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                disabled={currentSection === 0}
                style={{
                  background: currentSection === 0 ? '#f3f4f6' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: currentSection === 0 ? '#9ca3af' : 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 16px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: currentSection === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                ← Previous
              </button>
              
              <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                {currentSection + 1} of {notes.length}
              </span>

              <button
                onClick={() => setCurrentSection(Math.min(notes.length - 1, currentSection + 1))}
                disabled={currentSection === notes.length - 1}
                style={{
                  background: currentSection === notes.length - 1 ? '#f3f4f6' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: currentSection === notes.length - 1 ? '#9ca3af' : 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 16px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: currentSection === notes.length - 1 ? 'not-allowed' : 'pointer'
                }}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </>
  );
};

export default PresenterNotes;