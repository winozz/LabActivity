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
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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

  // Mobile detection
  useEffect(() => {
    const checkIsMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        || window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
      
      // Auto-hide presenter notes on mobile for better experience
      if (isMobileDevice && showPresenterNotes) {
        setShowPresenterNotes(false);
      }
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [showPresenterNotes]);

  // Touch gesture handling
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

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
    <div 
      style={{
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
        fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica Neue", sans-serif',
        touchAction: 'manipulation', // Prevent zoom on touch
        userSelect: 'none', // Prevent text selection on mobile
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none'
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Header Bar */}
      {!isFullscreen && (
        <div style={{
          background: 'rgba(0, 0, 0, 0.8)',
          padding: isMobile ? '0.5rem 1rem' : '0.75rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative'
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ 
              margin: '0', 
              fontSize: isMobile ? '0.95rem' : '1.1rem', 
              fontWeight: '600',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {isMobile ? lessonTitle.substring(0, 20) + (lessonTitle.length > 20 ? '...' : '') : lessonTitle}
            </h3>
            <div style={{ 
              fontSize: isMobile ? '0.75rem' : '0.85rem', 
              opacity: '0.7' 
            }}>
              {currentSlide + 1}/{slides.length}
            </div>
          </div>
          
          {isMobile ? (
            /* Mobile Header Controls */
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <button
                onClick={toggleMobileMenu}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  color: 'white',
                  borderRadius: '6px',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
                title="Menu"
              >
                ☰
              </button>
              <button
                onClick={onExit}
                style={{
                  background: 'rgba(239, 68, 68, 0.2)',
                  border: 'none',
                  color: 'white',
                  borderRadius: '6px',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
                title="Exit"
              >
                ✕
              </button>
            </div>
          ) : (
            /* Desktop Header Controls */
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
          )}
          
          {/* Mobile Menu Dropdown */}
          {isMobile && showMobileMenu && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: '1rem',
              background: 'rgba(0, 0, 0, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              padding: '0.5rem',
              zIndex: 1000,
              minWidth: '150px'
            }}>
              <button
                onClick={() => {
                  toggleFullscreen();
                  setShowMobileMenu(false);
                }}
                style={{
                  display: 'block',
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  textAlign: 'left',
                  borderRadius: '4px'
                }}
              >
                ⛶ Fullscreen
              </button>
              
              {presenterNotes.length > 0 && (
                <button
                  onClick={() => {
                    setShowPresenterNotes(!showPresenterNotes);
                    setShowMobileMenu(false);
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    padding: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    textAlign: 'left',
                    borderRadius: '4px'
                  }}
                >
                  📝 {showPresenterNotes ? 'Hide' : 'Show'} Notes
                </button>
              )}
            </div>
          )}
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
          background: 'linear-gradient(90deg, #8B1538, #DAA520)',
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
          flex: showPresenterNotes && !isMobile ? '2' : '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '1rem' : '2rem',
          background: currentSlideData?.background || 'linear-gradient(135deg, #8B1538 0%, #1B365D 100%)',
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
            maxWidth: isMobile ? '100%' : '900px',
            width: '100%',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
            padding: isMobile ? '0 0.5rem' : '0'
          }}>
            {/* Slide Title */}
            {currentSlideData?.title && (
              <h1 style={{
                fontSize: (() => {
                  if (isMobile) return isFullscreen ? '2rem' : '1.5rem';
                  return isFullscreen ? '3.5rem' : '2.5rem';
                })(),
                fontWeight: '700',
                margin: isMobile ? '0 0 1rem 0' : '0 0 2rem 0',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                lineHeight: '1.2',
                wordBreak: isMobile ? 'break-word' : 'normal'
              }}>
                {currentSlideData.title}
              </h1>
            )}

            {/* Slide Subtitle */}
            {currentSlideData?.subtitle && (
              <h2 style={{
                fontSize: (() => {
                  if (isMobile) return isFullscreen ? '1.2rem' : '1rem';
                  return isFullscreen ? '1.8rem' : '1.4rem';
                })(),
                fontWeight: '400',
                margin: isMobile ? '0 0 1.5rem 0' : '0 0 2.5rem 0',
                opacity: '0.9',
                lineHeight: '1.4',
                wordBreak: isMobile ? 'break-word' : 'normal'
              }}>
                {currentSlideData.subtitle}
              </h2>
            )}

            {/* Slide Content */}
            {currentSlideData?.content && (
              <div style={{
                fontSize: (() => {
                  if (isMobile) return isFullscreen ? '1rem' : '0.9rem';
                  return isFullscreen ? '1.4rem' : '1.1rem';
                })(),
                lineHeight: '1.6',
                textAlign: currentSlideData?.textAlign || 'center',
                wordBreak: isMobile ? 'break-word' : 'normal'
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
                fontSize: (() => {
                  if (isMobile) return isFullscreen ? '0.95rem' : '0.85rem';
                  return isFullscreen ? '1.3rem' : '1rem';
                })(),
                lineHeight: '1.8',
                textAlign: 'left',
                maxWidth: isMobile ? '100%' : '700px',
                margin: isMobile ? '1rem auto' : '2rem auto',
                paddingLeft: isMobile ? '1.5rem' : '2rem'
              }}>
                {currentSlideData.bullets.map((bullet, index) => (
                  <li key={index} style={{ 
                    marginBottom: isMobile ? '0.75rem' : '1rem',
                    animation: `slideInLeft 0.5s ease-out ${index * 0.1}s both`,
                    wordBreak: isMobile ? 'break-word' : 'normal'
                  }}>
                    {bullet}
                  </li>
                ))}
              </ul>
            )}

            {/* Slide Image */}
            {currentSlideData?.image && (
              <div style={{ margin: isMobile ? '1rem 0' : '2rem 0' }}>
                <img 
                  src={currentSlideData.image}
                  alt={currentSlideData.imageAlt || 'Slide image'}
                  style={{
                    maxWidth: isMobile ? '95%' : '80%',
                    height: 'auto',
                    borderRadius: isMobile ? '8px' : '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Presenter Notes Sidebar */}
        {showPresenterNotes && presenterNotes.length > 0 && !isMobile && (
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
                      Note:
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
        padding: isMobile ? '0.75rem 1rem' : '1rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        minHeight: isMobile ? '60px' : 'auto'
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
            borderRadius: isMobile ? '12px' : '8px',
            padding: isMobile ? '1rem' : '0.75rem 1.5rem',
            cursor: currentSlide === 0 ? 'not-allowed' : 'pointer',
            fontSize: isMobile ? '0.8rem' : '0.9rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            minWidth: isMobile ? '60px' : 'auto',
            minHeight: isMobile ? '44px' : 'auto', // iOS recommended touch target size
            justifyContent: 'center'
          }}
        >
          {isMobile ? '←' : '← Previous'}
        </button>

        {/* Slide Indicators */}
        <div style={{ 
          display: 'flex', 
          gap: isMobile ? '0.3rem' : '0.5rem',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center',
          maxWidth: isMobile ? '200px' : 'none',
          overflow: isMobile ? 'hidden' : 'visible'
        }}>
          {slides.slice(0, isMobile ? 8 : slides.length).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: isMobile ? '8px' : '12px',
                height: isMobile ? '8px' : '12px',
                borderRadius: '50%',
                border: 'none',
                background: index === currentSlide 
                  ? '#3b82f6' 
                  : 'rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                minWidth: isMobile ? '20px' : '12px',
                minHeight: isMobile ? '20px' : '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title={`Go to slide ${index + 1}`}
            />
          ))}
          {isMobile && slides.length > 8 && (
            <span style={{
              fontSize: '0.7rem',
              color: '#9ca3af',
              marginLeft: '0.3rem'
            }}>
              +{slides.length - 8}
            </span>
          )}
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
            borderRadius: isMobile ? '12px' : '8px',
            padding: isMobile ? '1rem' : '0.75rem 1.5rem',
            cursor: currentSlide === slides.length - 1 ? 'not-allowed' : 'pointer',
            fontSize: isMobile ? '0.8rem' : '0.9rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            minWidth: isMobile ? '60px' : 'auto',
            minHeight: isMobile ? '44px' : 'auto', // iOS recommended touch target size
            justifyContent: 'center'
          }}
        >
          {isMobile ? '→' : 'Next →'}
        </button>
      </div>

      {/* Mobile Swipe Hint / Keyboard Shortcuts Help */}
      {!isFullscreen && (
        <div style={{
          position: 'absolute',
          bottom: isMobile ? '70px' : '80px',
          right: isMobile ? '10px' : '20px',
          left: isMobile ? '10px' : 'auto',
          background: 'rgba(0, 0, 0, 0.8)',
          padding: isMobile ? '0.5rem' : '0.75rem 1rem',
          borderRadius: '8px',
          fontSize: isMobile ? '0.7rem' : '0.75rem',
          color: '#d1d5db',
          opacity: '0.7',
          pointerEvents: 'none',
          textAlign: isMobile ? 'center' : 'left'
        }}>
          {isMobile ? (
            <div>👆 Swipe left/right to navigate • Tap menu for options</div>
          ) : (
            <>
              <div>Arrow keys: Navigate • F: Fullscreen • Esc: Exit</div>
              <div>1-9: Jump to slide • Space/Enter: Next</div>
            </>
          )}
        </div>
      )}

      {/* Mobile Presenter Notes Overlay */}
      {isMobile && showPresenterNotes && presenterNotes.length > 0 && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '400px',
          maxHeight: '70%',
          background: 'rgba(0, 0, 0, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '12px',
          padding: '1rem',
          overflow: 'auto',
          zIndex: 1001
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '0.5rem'
          }}>
            <h3 style={{
              margin: '0',
              color: '#f3f4f6',
              fontSize: '1rem',
              fontWeight: '600'
            }}>
              Presenter Notes
            </h3>
            <button
              onClick={() => setShowPresenterNotes(false)}
              style={{
                background: 'rgba(239, 68, 68, 0.2)',
                border: 'none',
                color: 'white',
                borderRadius: '6px',
                padding: '0.25rem 0.5rem',
                cursor: 'pointer',
                fontSize: '0.8rem'
              }}
            >
              ✕
            </button>
          </div>
          
          {presenterNotes[currentSlide] && (
            <div style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
              {presenterNotes[currentSlide].keyPoints && (
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ color: '#60a5fa', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>
                    Key Points:
                  </h4>
                  <ul style={{ margin: '0', paddingLeft: '1rem', color: '#d1d5db' }}>
                    {presenterNotes[currentSlide].keyPoints.map((point, idx) => (
                      <li key={idx} style={{ marginBottom: '0.25rem' }}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {presenterNotes[currentSlide].script && (
                <div>
                  <h4 style={{ color: '#60a5fa', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>
                    Note:
                  </h4>
                  <div style={{ 
                    color: '#d1d5db', 
                    fontSize: '0.8rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    maxHeight: '200px',
                    overflow: 'auto'
                  }}>
                    {presenterNotes[currentSlide].script.split('\n\n').slice(0, 3).map((paragraph, idx) => (
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