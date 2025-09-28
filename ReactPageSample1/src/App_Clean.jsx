import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Import all Lecture 1 components (E-Commerce Project)
import {
  Dashboard,
  Checkpoints,
  ECommerceRoadmap,
  V01Initial,
  V02Catalog,
  V03Cart,
  V04Accounts,
  V05Database,
  V06Checkout,
  V07UI,
  V08Payment,
  V10Release,
  V11AccountMgmt,
  VersionsIndex,
  AllInOne
} from './pages/lecture1';

// Import all Lecture 2 components (DevOps & GitOps)
import {
  GitGuide,
  GitOpsLMS,
  GitOpsPresentation,
  GitOpsSimulator,
  GitSyncDemo
} from './pages/lecture2';

// Import all Lecture 3 components (React Fundamentals)
import {
  ReactOverview,
  DevelopmentSetup,
  PureReact,
  JavaScriptEssentials,
  ComponentsDeepDive,
  StateAndProps,
  Lecture3Preview
} from './pages/lecture3';

// Dynamic lecture data structure for easy future additions
const lectureData = [
  {
    id: 1,
    title: "Lecture 1: E-Commerce Project",
    color: "#fd7e14",
    headerColor: "#d56208",
    description: "Full-stack web application development with version control",
    links: [
      { to: "/dashboard", label: "Dashboard", featured: true },
      { to: "/roadmap", label: "Roadmap", featured: true },
      { to: "/checkpoints", label: "Checkpoints", featured: true },
      { to: "/versions", label: "All Versions", featured: true },
      { to: "/versions/all", label: "All-In-One View", featured: true },
      { to: "/versions/v0.1", label: "v0.1", version: true },
      { to: "/versions/v0.2", label: "v0.2", version: true },
      { to: "/versions/v0.3", label: "v0.3", version: true },
      { to: "/versions/v0.4", label: "v0.4", version: true },
      { to: "/versions/v0.5", label: "v0.5", version: true },
      { to: "/versions/v0.6", label: "v0.6", version: true },
      { to: "/versions/v0.7", label: "v0.7", version: true },
      { to: "/versions/v0.8", label: "v0.8", version: true },
      { to: "/versions/v1.0", label: "v1.0", version: true },
      { to: "/versions/v1.1", label: "v1.1", version: true }
    ]
  },
  {
    id: 2,
    title: "Lecture 2: DevOps & GitOps",
    color: "#6f42c1",
    headerColor: "#563d7c",
    description: "Development operations and Git-based workflows",
    links: [
      { to: "/gitops-keynote", label: "GitOps Presentation", featured: true },
      { to: "/gitops-lms", label: "DevOps Academy", featured: true },
      { to: "/gitops-simulator", label: "GitOps Simulator", featured: true },
      { to: "/git-sync", label: "Git Sync Demo", featured: false },
      { to: "/git-guide", label: "Git Guide", featured: false }
    ]
  },
  {
    id: 3,
    title: "Lecture 3: React Fundamentals",
    color: "#20c997",
    headerColor: "#138c6e",
    description: "Component-based architecture and modern JavaScript",
    links: [
      { to: "/lecture3/overview", label: "React Overview", featured: true },
      { to: "/lecture3/setup", label: "Development Setup", featured: true },
      { to: "/lecture3/pure-react", label: "Pure React", featured: true },
      { to: "/lecture3/javascript-essentials", label: "JavaScript Essentials", featured: true },
      { to: "/lecture3/components", label: "Components Deep Dive", featured: false },
      { to: "/lecture3/state-props", label: "State & Props", featured: false }
    ]
  }
];

// Adds a loading effect when clicking on links
const handleLinkClick = (e) => {
  const target = e.currentTarget;
  target.style.opacity = '0.7';
  target.style.transform = 'scale(0.98)';
  setTimeout(() => {
    target.style.opacity = '1';
    target.style.transform = 'scale(1)';
  }, 150);
};

function Home() {
  return (
    <main className="app-shell" style={{
      maxWidth: '1100px', 
      margin: '0 auto',
      padding: '2.5rem',
      fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica Neue", sans-serif',
      background: '#f8fafc',
      minHeight: '100vh',
      color: '#334155'
    }}>
      {/* Header Section */}
      <div style={{
        background: 'linear-gradient(135deg, #333F50 0%, #161c24 100%)',
        padding: '2rem',
        borderRadius: '16px',
        marginBottom: '2.5rem',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '-30px',
          right: '-30px',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(100, 255, 218, 0.15) 0%, rgba(100, 255, 218, 0) 70%)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-50px',
          left: '-20px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(100, 155, 255, 0.1) 0%, rgba(100, 155, 255, 0) 70%)',
        }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ 
            display: 'inline-block', 
            background: 'rgba(100, 255, 218, 0.2)', 
            padding: '0.35rem 0.75rem', 
            borderRadius: '20px',
            marginBottom: '0.75rem',
            fontSize: '0.85rem',
            fontWeight: '500'
          }}>
            DCIT26 • Course Materials
          </div>
          
          <h1 style={{
            margin: '0 0 1rem 0',
            fontSize: '2.25rem',
            fontWeight: '700',
            letterSpacing: '-0.025em',
            background: 'linear-gradient(to right, #ffffff, #a8b8d8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}>Interactive Learning Portal</h1>
          
          <p style={{
            margin: '0',
            fontSize: '1rem',
            opacity: '0.9',
            maxWidth: '600px',
            lineHeight: '1.6'
          }}>
            Navigate through your course materials organized by lecture topics.
            All resources are categorized for intuitive access and improved learning experience.
          </p>
        </div>
      </div>

      {/* Project Structure Info */}
      <div style={{
        background: 'rgba(59, 130, 246, 0.1)',
        border: '1px solid rgba(59, 130, 246, 0.2)',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '0.75rem'
        }}>
          <span style={{ fontSize: '1.5rem' }}>📁</span>
          <h2 style={{ margin: '0', fontSize: '1.2rem', color: '#1e40af' }}>
            Organized Project Structure
          </h2>
        </div>
        <p style={{ 
          margin: '0', 
          fontSize: '0.95rem', 
          opacity: '0.8',
          lineHeight: '1.5'
        }}>
          This project is now organized with a clean folder structure: 
          <code style={{ 
            background: 'rgba(0,0,0,0.1)', 
            padding: '0.2rem 0.4rem', 
            borderRadius: '3px', 
            margin: '0 0.25rem' 
          }}>
            pages/lecture1/
          </code>
          for E-Commerce, 
          <code style={{ 
            background: 'rgba(0,0,0,0.1)', 
            padding: '0.2rem 0.4rem', 
            borderRadius: '3px', 
            margin: '0 0.25rem' 
          }}>
            pages/lecture2/
          </code>
          for DevOps, and 
          <code style={{ 
            background: 'rgba(0,0,0,0.1)', 
            padding: '0.2rem 0.4rem', 
            borderRadius: '3px', 
            margin: '0 0.25rem' 
          }}>
            pages/lecture3/
          </code>
          for React. Each lecture has its own dedicated components and resources.
        </p>
      </div>
      
      {/* Navigation Cards */}
      <nav style={{
        display:'flex', 
        flexDirection:'column', 
        gap:'2.5rem', 
        fontSize:'.85rem',
        position: 'relative'
      }}>
        {/* Dynamically generate navigation from lecture data */}
        {lectureData.map(lecture => (
          <div key={lecture.id} style={{
            background: '#ffffff',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: '1px solid rgba(0,0,0,0.05)'
          }}>
            <h3 style={{
              margin: '0', 
              color: '#fff',
              padding: '1rem 1.5rem',
              background: `linear-gradient(to right, ${lecture.headerColor}, ${lecture.color})`,
              fontSize: '1.15rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <span style={{ 
                background: 'rgba(255, 255, 255, 0.25)', 
                width: '28px', 
                height: '28px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                border: '2px solid rgba(255,255,255,0.4)'
              }}>
                {lecture.id}
              </span>
              <div>
                <div>{lecture.title}</div>
                <div style={{ 
                  fontSize: '0.8rem', 
                  opacity: '0.9', 
                  fontWeight: '400',
                  marginTop: '0.25rem'
                }}>
                  {lecture.description}
                </div>
              </div>
              
              {/* Decorative circle */}
              <div style={{
                position: 'absolute',
                right: '-20px',
                top: '-20px',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                zIndex: 0
              }} />
            </h3>
            
            <div style={{ padding: '1.5rem' }}>
              <div style={{display:'flex', gap:'0.65rem', flexWrap:'wrap', marginBottom: '0.5rem'}}>
                {/* Featured links (more prominent) */}
                {lecture.links.filter(link => link.featured).map((link, idx) => (
                  <Link 
                    key={idx}
                    to={link.to} 
                    style={{
                      background: `linear-gradient(135deg, ${lecture.color} 0%, ${lecture.headerColor} 100%)`,
                      color: '#fff', 
                      padding: '0.6rem 1.2rem',
                      fontSize: '0.9rem',
                      borderRadius: '8px', 
                      fontWeight: 'bold', 
                      textDecoration: 'none',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease',
                      border: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.15)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                    }}
                    onClick={handleLinkClick}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              
              {/* Render version numbers in a separate row if there are any */}
              {lecture.links.some(link => link.version) && (
                <div style={{display:'flex', gap:'0.4rem', flexWrap:'wrap', marginTop:'0.75rem'}}>
                  {lecture.links.filter(link => link.version).map((link, idx) => (
                    <Link 
                      key={idx}
                      to={link.to} 
                      style={{
                        background: `${lecture.color}B3`,
                        color: '#fff', 
                        padding: '0.4rem 0.8rem',
                        borderRadius: '20px', 
                        textDecoration: 'none',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
                        border: `1px solid ${lecture.color}`,
                        transition: 'all 0.2s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = lecture.color;
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = `${lecture.color}B3`;
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                      onClick={handleLinkClick}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
              
              {/* Secondary links (less prominent) */}
              {lecture.links.filter(link => !link.featured && !link.version).length > 0 && (
                <div style={{display:'flex', gap:'0.5rem', flexWrap:'wrap', marginTop:'0.75rem'}}>
                  {lecture.links.filter(link => !link.featured && !link.version).map((link, idx) => (
                    <Link 
                      key={idx}
                      to={link.to} 
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: `1px solid ${lecture.color}`, 
                        color: lecture.color, 
                        padding: '0.5rem 1rem', 
                        borderRadius: '6px', 
                        textDecoration: 'none',
                        fontSize: '0.85rem',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = `${lecture.color}22`;
                        e.currentTarget.style.borderColor = lecture.headerColor;
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                        e.currentTarget.style.borderColor = lecture.color;
                      }}
                      onClick={handleLinkClick}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </nav>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/LabActivity/">
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Lecture 1 Routes - E-Commerce Project */}
        <Route path="/checkpoints" element={<Checkpoints />} />
        <Route path="/roadmap" element={<ECommerceRoadmap />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/versions" element={<VersionsIndex />} />
        <Route path="/versions/v0.1" element={<V01Initial />} />
        <Route path="/versions/v0.2" element={<V02Catalog />} />
        <Route path="/versions/v0.3" element={<V03Cart />} />
        <Route path="/versions/v0.4" element={<V04Accounts />} />
        <Route path="/versions/v0.5" element={<V05Database />} />
        <Route path="/versions/v0.6" element={<V06Checkout />} />
        <Route path="/versions/v0.7" element={<V07UI />} />
        <Route path="/versions/v0.8" element={<V08Payment />} />
        <Route path="/versions/v1.0" element={<V10Release />} />
        <Route path="/versions/v1.1" element={<V11AccountMgmt />} />
        <Route path="/versions/all" element={<AllInOne />} />
        
        {/* Lecture 2 Routes - DevOps & GitOps */}
        <Route path="/git-sync" element={<GitSyncDemo />} />
        <Route path="/git-guide" element={<GitGuide />} />
        <Route path="/gitops-keynote" element={<GitOpsPresentation />} />
        <Route path="/gitops-lms" element={<GitOpsLMS />} />
        <Route path="/gitops-simulator" element={<GitOpsSimulator />} />
        
        {/* Lecture 3 Routes - React Fundamentals */}
        <Route path="/lecture3/preview" element={<Lecture3Preview />} />
        <Route path="/lecture3/overview" element={<ReactOverview />} />
        <Route path="/lecture3/setup" element={<DevelopmentSetup />} />
        <Route path="/lecture3/pure-react" element={<PureReact />} />
        <Route path="/lecture3/javascript-essentials" element={<JavaScriptEssentials />} />
        <Route path="/lecture3/components" element={<ComponentsDeepDive />} />
        <Route path="/lecture3/state-props" element={<StateAndProps />} />
      </Routes>
    </BrowserRouter>
  );
}