// Mobile responsive utility functions for Lecture 3 components
export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    || window.innerWidth <= 768;
};

// Mobile-responsive styles for lecture pages
export const getMobileStyles = () => {
  const isMobile = isMobileDevice();
  
  return {
    // Main container styles
    container: {
      minHeight: '100vh',
      padding: isMobile ? '1rem' : '2rem',
      color: 'white',
      fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica Neue", sans-serif'
    },
    
    // Content wrapper
    contentWrapper: {
      maxWidth: isMobile ? '100%' : '1400px',
      margin: '0 auto'
    },
    
    // Header section
    header: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: isMobile ? 'flex-start' : 'center',
      marginBottom: isMobile ? '1.5rem' : '2rem',
      gap: isMobile ? '1rem' : '0'
    },
    
    // Main title
    title: {
      margin: '0',
      fontSize: isMobile ? '1.75rem' : '2.5rem',
      fontWeight: '700',
      lineHeight: isMobile ? '1.3' : '1.2'
    },
    
    // Subtitle
    subtitle: {
      margin: '0.5rem 0 0 0',
      fontSize: isMobile ? '0.95rem' : '1.1rem',
      opacity: '0.9',
      lineHeight: '1.5'
    },
    
    // Navigation buttons
    navigation: {
      display: 'flex',
      gap: isMobile ? '0.3rem' : '0.5rem',
      marginBottom: isMobile ? '1.5rem' : '2rem',
      flexWrap: 'wrap',
      justifyContent: isMobile ? 'center' : 'flex-start'
    },
    
    // Navigation button
    navButton: (isActive = false) => ({
      background: isActive ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
      border: isActive ? '2px solid rgba(255,255,255,0.5)' : '1px solid rgba(255,255,255,0.2)',
      color: 'white',
      padding: isMobile ? '0.6rem 1rem' : '0.75rem 1.25rem',
      borderRadius: isMobile ? '20px' : '25px',
      cursor: 'pointer',
      fontWeight: isActive ? '600' : '500',
      fontSize: isMobile ? '0.8rem' : '0.9rem',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      minHeight: isMobile ? '36px' : 'auto',
      textAlign: 'center'
    }),
    
    // Main content area
    contentArea: {
      background: 'rgba(255,255,255,0.1)',
      borderRadius: isMobile ? '10px' : '12px',
      padding: isMobile ? '1.5rem' : '2rem',
      backdropFilter: 'blur(10px)'
    },
    
    // Section header
    sectionHeader: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'flex-start' : 'center',
      gap: isMobile ? '0.75rem' : '1rem',
      marginBottom: isMobile ? '1rem' : '1.5rem'
    },
    
    // Large icon for sections
    sectionIcon: {
      fontSize: isMobile ? '2rem' : '3rem',
      alignSelf: isMobile ? 'center' : 'flex-start'
    },
    
    // Section title
    sectionTitle: {
      margin: '0 0 0.5rem 0',
      fontSize: isMobile ? '1.5rem' : '2rem',
      textAlign: isMobile ? 'center' : 'left'
    },
    
    // Section description
    sectionDescription: {
      margin: '0 0 0.5rem 0',
      fontSize: isMobile ? '0.95rem' : '1.1rem',
      opacity: '0.9',
      textAlign: isMobile ? 'center' : 'left',
      lineHeight: '1.5'
    },
    
    // Code examples container
    exampleContainer: {
      background: 'rgba(0,0,0,0.1)',
      borderRadius: isMobile ? '6px' : '8px',
      padding: isMobile ? '1rem' : '1.5rem'
    },
    
    // Example header
    exampleHeader: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: isMobile ? 'flex-start' : 'center',
      marginBottom: '1rem',
      gap: isMobile ? '0.75rem' : '0'
    },
    
    // Example title
    exampleTitle: {
      margin: '0',
      fontSize: isMobile ? '1.2rem' : '1.4rem',
      textAlign: isMobile ? 'center' : 'left'
    },
    
    // Toggle button
    toggleButton: (isActive = false) => ({
      background: isActive ? 'rgba(255,100,100,0.8)' : 'rgba(100,255,100,0.8)',
      color: 'white',
      border: 'none',
      padding: isMobile ? '0.6rem 1rem' : '0.5rem 1rem',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: isMobile ? '0.75rem' : '0.8rem',
      fontWeight: '500',
      minHeight: isMobile ? '36px' : 'auto',
      minWidth: isMobile ? '100px' : 'auto'
    }),
    
    // Code block
    codeBlock: {
      background: 'rgba(0,0,0,0.3)',
      padding: isMobile ? '1rem' : '1.5rem',
      borderRadius: '6px',
      overflow: 'auto',
      fontSize: isMobile ? '0.75rem' : '0.85rem',
      lineHeight: '1.4',
      margin: '0'
    },
    
    // Output block
    outputBlock: {
      background: 'rgba(0,100,0,0.2)',
      padding: isMobile ? '0.75rem' : '1rem',
      borderRadius: '6px',
      fontSize: isMobile ? '0.75rem' : '0.85rem',
      lineHeight: '1.4',
      margin: '0',
      border: '1px solid rgba(0,200,0,0.3)'
    },
    
    // Back button
    backButton: {
      background: 'rgba(255,255,255,0.2)',
      color: 'white',
      padding: isMobile ? '0.75rem 1rem' : '0.75rem 1.5rem',
      borderRadius: isMobile ? '6px' : '8px',
      textDecoration: 'none',
      fontWeight: '500',
      fontSize: isMobile ? '0.9rem' : '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: isMobile ? '44px' : 'auto',
      textAlign: 'center'
    },
    
    // Info box styles
    infoBox: {
      background: 'rgba(255,200,100,0.2)',
      padding: isMobile ? '0.75rem' : '0.75rem',
      borderRadius: '6px',
      borderLeft: '4px solid rgba(255,200,100,0.6)',
      fontSize: isMobile ? '0.85rem' : '0.95rem',
      margin: isMobile ? '0.5rem 0' : '0'
    }
  };
};