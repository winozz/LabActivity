import React, { useState, useEffect, useCallback } from 'react';
import PresenterNotes from './PresenterNotes.jsx';

const PresentationMode = ({ 
  slides = [], 
  lessonTitle = "Presentation",
  presenterNotes = [],
  onExit 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPresenterNotes, setShowPresenterNotes] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Navigation functions
  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide, slides.length]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  const goToSlide = useCallback((index) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlide(index);
    }
  }, [slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case 'ArrowRight':
        case ' ':
        case 'Enter':
          event.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          prevSlide();
          break;
        case 'Escape':
          if (isFullscreen) {
            exitFullscreen();
          } else {
            onExit?.();
          }
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 'Home':
          event.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          event.preventDefault();
          goToSlide(slides.length - 1);
          break;
        default:
          // Number keys for direct slide navigation
          if (event.key >= '1' && event.key <= '9') {
            const slideIndex = parseInt(event.key) - 1;
            if (slideIndex < slides.length) {
              goToSlide(slideIndex);
            }
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextSlide, prevSlide, goToSlide, isFullscreen, onExit]);

  // Fullscreen functionality
  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error('Error attempting to enable fullscreen:', err);
      }
    } else {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (err) {
        console.error('Error attempting to exit fullscreen:', err);
      }
    }
  };

  const exitFullscreen = async () => {
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (err) {
        console.error('Error exiting fullscreen:', err);
      }
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (slides.length === 0) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#f3f4f6',
        color: '#6b7280',
        fontSize: '1.2rem'
      }}>
        No slides available for presentation
      </div>
    );
  }

  const currentSlideData = slides[currentSlide];
  const progress = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: '#1a202c',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 2000,
      fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica Neue", sans-serif'
    }}>
      {/* Header Bar */}
      {!isFullscreen && (
        <div style={{
          background: 'rgba(0, 0, 0, 0.8)',
          padding: '0.75rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div>
            <h3 style={{ margin: '0', fontSize: '1.1rem', fontWeight: '600' }}>
              {lessonTitle}
            </h3>
            <div style={{ fontSize: '0.85rem', opacity: '0.7' }}>
              Slide {currentSlide + 1} of {slides.length}
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button
              onClick={toggleFullscreen}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: 'white',
                borderRadius: '6px',
                padding: '0.5rem',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
              title="Toggle Fullscreen (F)"
            >
              ⛶
            </button>
            
            {presenterNotes.length > 0 && (
              <button
                onClick={() => setShowPresenterNotes(!showPresenterNotes)}
                style={{
                  background: showPresenterNotes 
                    ? 'rgba(34, 197, 94, 0.2)' 
                    : 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  color: 'white',
                  borderRadius: '6px',
                  padding: '0.5rem 0.75rem',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                📝 Notes
              </button>
            )}
            
            <button
              onClick={onExit}
              style={{
                background: 'rgba(239, 68, 68, 0.2)',
                border: 'none',
                color: 'white',
                borderRadius: '6px',
                padding: '0.5rem',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
              title="Exit Presentation (Esc)"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div style={{
        height: '4px',
        background: 'rgba(255, 255, 255, 0.1)',
        position: 'relative'
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
          transition: 'width 0.3s ease'
        }} />
      </div>

      {/* Main Content Area */}
      <div style={{ 
        flex: 1, 
        display: 'flex',
        position: 'relative'
      }}>
        {/* Slide Content */}
        <div style={{
          flex: showPresenterNotes ? '2' : '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          background: currentSlideData?.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background Pattern */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: 'radial-gradient(circle at 25% 25%, white 2px, transparent 2px)',
            backgroundSize: '50px 50px'
          }} />
          
          {/* Slide Content */}
          <div style={{
            maxWidth: '900px',
            width: '100%',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1
          }}>
            {/* Slide Title */}
            {currentSlideData?.title && (
              <h1 style={{
                fontSize: isFullscreen ? '3.5rem' : '2.5rem',
                fontWeight: '700',
                margin: '0 0 2rem 0',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                lineHeight: '1.2'
              }}>
                {currentSlideData.title}
              </h1>
            )}

            {/* Slide Subtitle */}
            {currentSlideData?.subtitle && (
              <h2 style={{
                fontSize: isFullscreen ? '1.8rem' : '1.4rem',
                fontWeight: '400',
                margin: '0 0 2.5rem 0',
                opacity: '0.9',
                lineHeight: '1.4'
              }}>
                {currentSlideData.subtitle}
              </h2>
            )}

            {/* Slide Content */}
            {currentSlideData?.content && (
              <div style={{
                fontSize: isFullscreen ? '1.4rem' : '1.1rem',
                lineHeight: '1.6',
                textAlign: currentSlideData?.textAlign || 'center'
              }}>
                {typeof currentSlideData.content === 'string' ? (
                  <div dangerouslySetInnerHTML={{ __html: currentSlideData.content }} />
                ) : (
                  currentSlideData.content
                )}
              </div>
            )}

            {/* Slide Bullets */}
            {currentSlideData?.bullets && (
              <ul style={{
                fontSize: isFullscreen ? '1.3rem' : '1rem',
                lineHeight: '1.8',
                textAlign: 'left',
                maxWidth: '700px',
                margin: '2rem auto',
                paddingLeft: '2rem'
              }}>
                {currentSlideData.bullets.map((bullet, index) => (
                  <li key={index} style={{ 
                    marginBottom: '1rem',
                    animation: `slideInLeft 0.5s ease-out ${index * 0.1}s both`
                  }}>
                    {bullet}
                  </li>
                ))}
              </ul>
            )}

            {/* Slide Image */}
            {currentSlideData?.image && (
              <div style={{ margin: '2rem 0' }}>
                <img 
                  src={currentSlideData.image}
                  alt={currentSlideData.imageAlt || 'Slide image'}
                  style={{
                    maxWidth: '80%',
                    height: 'auto',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Presenter Notes Sidebar */}
        {showPresenterNotes && presenterNotes.length > 0 && (
          <div style={{
            flex: '1',
            background: 'rgba(0, 0, 0, 0.9)',
            padding: '1.5rem',
            overflow: 'auto',
            borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '0.9rem',
            lineHeight: '1.6'
          }}>
            <h3 style={{
              margin: '0 0 1rem 0',
              color: '#f3f4f6',
              fontSize: '1.1rem',
              fontWeight: '600',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              paddingBottom: '0.5rem'
            }}>
              Presenter Notes
            </h3>
            
            {presenterNotes[currentSlide] && (
              <div>
                {presenterNotes[currentSlide].keyPoints && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ color: '#60a5fa', margin: '0 0 0.5rem 0' }}>
                      Key Points:
                    </h4>
                    <ul style={{ margin: '0', paddingLeft: '1.2rem', color: '#d1d5db' }}>
                      {presenterNotes[currentSlide].keyPoints.map((point, idx) => (
                        <li key={idx} style={{ marginBottom: '0.3rem' }}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {presenterNotes[currentSlide].script && (
                  <div>
                    <h4 style={{ color: '#60a5fa', margin: '0 0 0.5rem 0' }}>
                      Script:
                    </h4>
                    <div style={{ 
                      color: '#d1d5db', 
                      fontSize: '0.85rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '1rem',
                      borderRadius: '6px'
                    }}>
                      {presenterNotes[currentSlide].script.split('\n\n').map((paragraph, idx) => (
                        <p key={idx} style={{ 
                          margin: idx === 0 ? '0 0 0.5rem 0' : '0.5rem 0' 
                        }}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.8)',
        padding: '1rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          style={{
            background: currentSlide === 0 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(59, 130, 246, 0.3)',
            border: 'none',
            color: currentSlide === 0 ? '#6b7280' : 'white',
            borderRadius: '8px',
            padding: '0.75rem 1.5rem',
            cursor: currentSlide === 0 ? 'not-allowed' : 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          ← Previous
        </button>

        {/* Slide Indicators */}
        <div style={{ 
          display: 'flex', 
          gap: '0.5rem',
          alignItems: 'center'
        }}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                background: index === currentSlide 
                  ? '#3b82f6' 
                  : 'rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          style={{
            background: currentSlide === slides.length - 1
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(59, 130, 246, 0.3)',
            border: 'none',
            color: currentSlide === slides.length - 1 ? '#6b7280' : 'white',
            borderRadius: '8px',
            padding: '0.75rem 1.5rem',
            cursor: currentSlide === slides.length - 1 ? 'not-allowed' : 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          Next →
        </button>
      </div>

      {/* Keyboard Shortcuts Help */}
      {!isFullscreen && (
        <div style={{
          position: 'absolute',
          bottom: '80px',
          right: '20px',
          background: 'rgba(0, 0, 0, 0.8)',
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          fontSize: '0.75rem',
          color: '#d1d5db',
          opacity: '0.7',
          pointerEvents: 'none'
        }}>
          <div>Arrow keys: Navigate • F: Fullscreen • Esc: Exit</div>
          <div>1-9: Jump to slide • Space/Enter: Next</div>
        </div>
      )}

      <style>
        {`
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default PresentationMode;