import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Checkpoints from './pages/lecture1/Checkpoints.jsx';
import ECommerceRoadmap from './pages/lecture1/ECommerceRoadmap.jsx';
import Dashboard from './pages/lecture1/Dashboard.jsx';
import V01Initial from './pages/lecture1/versions/V01Initial.jsx';
import V02Catalog from './pages/lecture1/versions/V02Catalog.jsx';
import V03Cart from './pages/lecture1/versions/V03Cart.jsx';
import V04Accounts from './pages/lecture1/versions/V04Accounts.jsx';
import V05Database from './pages/lecture1/versions/V05Database.jsx';
import V06Checkout from './pages/lecture1/versions/V06Checkout.jsx';
import V07UI from './pages/lecture1/versions/V07UI.jsx';
import V08Payment from './pages/lecture1/versions/V08Payment.jsx';
import V10Release from './pages/lecture1/versions/V10Release.jsx';
import VersionsIndex from './pages/lecture1/versions/VersionsIndex.jsx';
import AllInOne from './pages/lecture1/versions/AllInOne.jsx';
import GitSyncDemo from './pages/lecture2/GitSyncDemo.jsx';
import GitGuide from './pages/lecture2/GitGuide.jsx';
import GitOpsPresentation from './pages/lecture2/GitOpsPresentation';
import GitOpsLMS from './pages/lecture2/GitOpsLMS';
import GitOpsSimulator from './pages/lecture2/GitOpsSimulator';
import V11AccountMgmt from './pages/lecture1/versions/V11AccountMgmt.jsx';
import Lecture3Preview from './pages/lecture3/Lecture3Preview.jsx';
import ReactOverview from './pages/lecture3/ReactOverview.jsx';
import DevelopmentSetup from './pages/lecture3/DevelopmentSetup.jsx';
import PureReact from './pages/lecture3/PureReact.jsx';
import JavaScriptEssentials from './pages/lecture3/JavaScriptEssentials.jsx';
import ComponentsDeepDive from './pages/lecture3/ComponentsDeepDive.jsx';
import StateAndProps from './pages/lecture3/StateAndProps.jsx';

// Dynamic lecture data structure for easy future additions
const lectureData = [
  {
    id: 1,
    title: "Lecture 1: E-Commerce Project",
    color: "#fd7e14",
    headerColor: "#d56208",
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
    links: [
      { to: "/lecture3/overview", label: "React Overview", featured: true },
      { to: "/lecture3/setup", label: "Development Setup", featured: true },
      { to: "/lecture3/pure-react", label: "Pure React", featured: true },
      { to: "/lecture3/javascript-essentials", label: "JavaScript Essentials", featured: true },
      { to: "/lecture3/components", label: "Components Deep Dive", featured: true },
      { to: "/lecture3/state-props", label: "State & Props", featured: true }
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
              {lecture.title}
              
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
        <Route path="/git-sync" element={<GitSyncDemo />} />
        <Route path="/git-guide" element={<GitGuide />} />
        <Route path="/gitops-keynote" element={<GitOpsPresentation />} />
        <Route path="/gitops-lms" element={<GitOpsLMS />} />
        <Route path="/gitops-simulator" element={<GitOpsSimulator />} />
        <Route path="/versions/all" element={<AllInOne />} />
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
