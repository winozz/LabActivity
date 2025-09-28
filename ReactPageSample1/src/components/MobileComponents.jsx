import React from 'react';
import { getMobileStyles } from '../utils/mobileStyles.js';

// Mobile-responsive wrapper component for Lecture 3 pages
export const MobileLectureWrapper = ({ 
  children, 
  title, 
  subtitle, 
  lectureNumber = "3",
  backgroundColor = "linear-gradient(135deg, #20c997 0%, #138c6e 100%)",
  showPresentationButton = false,
  onPresentationClick,
  backLink = "/",
  className = ""
}) => {
  const styles = getMobileStyles();
  
  return (
    <div style={{
      ...styles.container,
      background: backgroundColor
    }} className={className}>
      <div style={styles.contentWrapper}>
        {/* Header */}
        <div style={styles.header}>
          <div style={{ flex: 1 }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.2)',
              padding: '0.4rem 1rem',
              borderRadius: '20px',
              fontSize: '0.85rem',
              marginBottom: '0.5rem'
            }}>
              Lecture {lectureNumber} • {title}
            </div>
            <h1 style={styles.title}>
              {title}
            </h1>
            {subtitle && (
              <p style={styles.subtitle}>
                {subtitle}
              </p>
            )}
          </div>
          
          {/* Header Buttons */}
          <div style={{
            display: 'flex',
            flexDirection: styles.container.padding === '1rem' ? 'column' : 'row',
            gap: '0.5rem',
            alignItems: 'stretch'
          }}>
            {showPresentationButton && (
              <button
                onClick={onPresentationClick}
                style={{
                  ...styles.backButton,
                  background: 'rgba(34, 197, 94, 0.3)',
                  border: '1px solid rgba(34, 197, 94, 0.5)'
                }}
              >
                🎤 Start Presentation
              </button>
            )}
            <a href={backLink} style={styles.backButton}>
              ← Back to Home
            </a>
          </div>
        </div>
        
        {/* Content */}
        {children}
      </div>
    </div>
  );
};

// Mobile-responsive content area wrapper
export const MobileContentArea = ({ children, className = "" }) => {
  const styles = getMobileStyles();
  
  return (
    <div style={styles.contentArea} className={className}>
      {children}
    </div>
  );
};

// Mobile-responsive navigation component
export const MobileNavigation = ({ items, activeItem, onItemClick, className = "" }) => {
  const styles = getMobileStyles();
  
  return (
    <div style={styles.navigation} className={className}>
      {items.map((item, index) => (
        <button
          key={item.key || item.id || index}
          onClick={() => onItemClick(item.key || item.id || index)}
          style={styles.navButton(activeItem === (item.key || item.id || index))}
        >
          {item.icon && <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>}
          {item.label || item.title || item.name}
        </button>
      ))}
    </div>
  );
};

// Mobile-responsive section header
export const MobileSectionHeader = ({ icon, title, description, className = "" }) => {
  const styles = getMobileStyles();
  
  return (
    <div style={styles.sectionHeader} className={className}>
      {icon && <span style={styles.sectionIcon}>{icon}</span>}
      <div style={{ flex: 1 }}>
        <h2 style={styles.sectionTitle}>{title}</h2>
        {description && (
          <p style={styles.sectionDescription}>{description}</p>
        )}
      </div>
    </div>
  );
};

// Mobile-responsive code block
export const MobileCodeBlock = ({ code, language = "javascript", className = "" }) => {
  const styles = getMobileStyles();
  
  return (
    <pre style={{...styles.codeBlock, className}}>
      <code>{code}</code>
    </pre>
  );
};

// Mobile-responsive example container
export const MobileExampleContainer = ({ 
  title, 
  children, 
  onToggle, 
  isExpanded = false, 
  toggleLabel = "Toggle",
  className = "" 
}) => {
  const styles = getMobileStyles();
  
  return (
    <div style={styles.exampleContainer} className={className}>
      <div style={styles.exampleHeader}>
        <h3 style={styles.exampleTitle}>{title}</h3>
        {onToggle && (
          <button
            onClick={onToggle}
            style={styles.toggleButton(isExpanded)}
          >
            {isExpanded ? `Hide ${toggleLabel}` : `Show ${toggleLabel}`}
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

// Mobile-responsive info box
export const MobileInfoBox = ({ children, type = "info", className = "" }) => {
  const styles = getMobileStyles();
  
  const typeStyles = {
    info: styles.infoBox,
    warning: { ...styles.infoBox, background: 'rgba(255,193,7,0.2)', borderLeft: '4px solid rgba(255,193,7,0.6)' },
    success: { ...styles.infoBox, background: 'rgba(40,167,69,0.2)', borderLeft: '4px solid rgba(40,167,69,0.6)' },
    error: { ...styles.infoBox, background: 'rgba(220,53,69,0.2)', borderLeft: '4px solid rgba(220,53,69,0.6)' }
  };
  
  return (
    <div style={{...typeStyles[type], ...className}}>
      {children}
    </div>
  );
};

// Mobile-responsive grid layout
export const MobileGrid = ({ 
  children, 
  columns = 2, 
  gap = "1rem", 
  className = "" 
}) => {
  const styles = getMobileStyles();
  const isMobile = styles.container.padding === '1rem';
  
  return (
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : `repeat(${columns}, 1fr)`,
        gap: isMobile ? '1rem' : gap
      }} 
      className={className}
    >
      {children}
    </div>
  );
};

// Mobile-responsive button component
export const MobileButton = ({ 
  children, 
  variant = "primary", 
  size = "medium",
  onClick,
  disabled = false,
  className = "",
  ...props 
}) => {
  const styles = getMobileStyles();
  const isMobile = styles.container.padding === '1rem';
  
  const variants = {
    primary: {
      background: 'rgba(34, 197, 94, 0.3)',
      border: '1px solid rgba(34, 197, 94, 0.5)',
      color: 'white'
    },
    secondary: {
      background: 'rgba(255,255,255,0.1)',
      border: '1px solid rgba(255,255,255,0.3)',
      color: 'white'
    },
    outline: {
      background: 'transparent',
      border: '2px solid rgba(255,255,255,0.3)',
      color: 'white'
    }
  };
  
  const sizes = {
    small: {
      padding: isMobile ? '0.5rem 0.75rem' : '0.4rem 0.8rem',
      fontSize: isMobile ? '0.8rem' : '0.75rem',
      minHeight: isMobile ? '32px' : '28px'
    },
    medium: {
      padding: isMobile ? '0.75rem 1rem' : '0.6rem 1.2rem',
      fontSize: isMobile ? '0.9rem' : '0.85rem',
      minHeight: isMobile ? '44px' : '40px'
    },
    large: {
      padding: isMobile ? '1rem 1.5rem' : '0.8rem 1.6rem',
      fontSize: isMobile ? '1rem' : '0.95rem',
      minHeight: isMobile ? '48px' : '44px'
    }
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...variants[variant],
        ...sizes[size],
        borderRadius: isMobile ? '8px' : '6px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontWeight: '500',
        transition: 'all 0.2s ease',
        opacity: disabled ? 0.5 : 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
      }}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
};

export default {
  MobileLectureWrapper,
  MobileContentArea,
  MobileNavigation,
  MobileSectionHeader,
  MobileCodeBlock,
  MobileExampleContainer,
  MobileInfoBox,
  MobileGrid,
  MobileButton
};