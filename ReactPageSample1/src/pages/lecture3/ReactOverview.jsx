import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ReactOverview = () => {
  const [activeSection, setActiveSection] = useState('components');

  const reactConcepts = {
    components: {
      title: "Component-Based Architecture",
      icon: "🧩",
      description: "React applications are built using components - reusable, self-contained pieces of code that represent parts of a user interface.",
      details: [
        "Components are like JavaScript functions that accept inputs (props) and return React elements",
        "They can be written as functions or classes",
        "Components can be composed together to build complex UIs",
        "Each component manages its own state and lifecycle"
      ],
      example: `function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Usage
<Welcome name="Sara" />`
    },
    declarative: {
      title: "Declarative Programming",
      icon: "📋",
      description: "React makes it painless to create interactive UIs by using a declarative approach - you describe what the UI should look like for any given state.",
      details: [
        "You describe what you want, not how to achieve it",
        "React efficiently updates the DOM when data changes",
        "More predictable code that's easier to debug",
        "Contrast with imperative programming where you specify step-by-step instructions"
      ],
      example: `// Declarative (React)
const [count, setCount] = useState(0);
return <button onClick={() => setCount(count + 1)}>
  Count: {count}
</button>;

// vs Imperative (Vanilla JS)
// const button = document.createElement('button');
// button.textContent = 'Count: 0';
// button.addEventListener('click', function() { ... });`
    },
    stateDriven: {
      title: "State-Driven UI",
      icon: "🔄",
      description: "React components can maintain their own state, and the UI automatically updates when state changes.",
      details: [
        "State is data that can change over time",
        "When state changes, React re-renders the component",
        "State should be treated as immutable",
        "Use hooks like useState to manage state in functional components"
      ],
      example: `function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`
    },
    library: {
      title: "JavaScript Library",
      icon: "📚",
      description: "React is a library, not a framework. It focuses specifically on building user interfaces and gives you the flexibility to choose other tools.",
      details: [
        "Focused on the view layer of applications",
        "Can be integrated into existing projects gradually",
        "Doesn't dictate how you handle routing, state management, or styling",
        "Ecosystem of complementary libraries (React Router, Redux, etc.)"
      ],
      example: `// React can be added to any HTML page
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

// Or used in modern build systems
import React from 'react';
import ReactDOM from 'react-dom/client';`
    },
    popular: {
      title: "Extremely Popular",
      icon: "🌟",
      description: "React is one of the most popular frontend technologies, used by millions of developers and major companies worldwide.",
      details: [
        "Used by Facebook, Netflix, Airbnb, Instagram, and many others",
        "Large and active community with extensive ecosystem",
        "Abundant learning resources, tutorials, and documentation",
        "High demand skill in the job market"
      ],
      stats: [
        { label: "GitHub Stars", value: "220k+" },
        { label: "NPM Weekly Downloads", value: "20M+" },
        { label: "Stack Overflow Questions", value: "400k+" },
        { label: "Job Postings", value: "High Demand" }
      ]
    },
    facebook: {
      title: "Created by Facebook",
      icon: "👥",
      description: "React was created by Jordan Walke at Facebook in 2011 and open-sourced in 2013. It continues to be maintained by Meta and the community.",
      details: [
        "Originally developed to solve Facebook's UI complexity issues",
        "First used in Facebook's newsfeed in 2011",
        "Open-sourced at JSConf US in May 2013",
        "Now maintained by Meta (Facebook) and the open-source community"
      ],
      timeline: [
        { year: "2011", event: "Initial development at Facebook" },
        { year: "2013", event: "Open-sourced to the public" },
        { year: "2015", event: "React Native released" },
        { year: "2019", event: "React Hooks introduced" },
        { year: "2022", event: "React 18 with Concurrent Features" }
      ]
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #20c997 0%, #138c6e 100%)', 
      padding: '2rem', 
      color: 'white',
      fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica Neue", sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
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
              Lecture 3 • React Fundamentals
            </div>
            <h1 style={{ margin: '0', fontSize: '2.5rem', fontWeight: '700' }}>
              What is React?
            </h1>
          </div>
          <Link to="/" style={{ 
            background: 'rgba(255,255,255,0.2)', 
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '500',
            transition: 'all 0.2s ease'
          }}>
            ← Back to Home
          </Link>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          {Object.entries(reactConcepts).map(([key, concept]) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              style={{
                background: activeSection === key ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                border: activeSection === key ? '2px solid rgba(255,255,255,0.5)' : '1px solid rgba(255,255,255,0.2)',
                color: 'white',
                padding: '0.75rem 1.25rem',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: activeSection === key ? '600' : '500',
                fontSize: '0.9rem',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>{concept.icon}</span>
              {concept.title}
            </button>
          ))}
        </div>

        {/* Active Section Content */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '2rem',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <span style={{ fontSize: '3rem' }}>
              {reactConcepts[activeSection].icon}
            </span>
            <div>
              <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem' }}>
                {reactConcepts[activeSection].title}
              </h2>
              <p style={{ margin: '0', fontSize: '1.1rem', opacity: '0.9' }}>
                {reactConcepts[activeSection].description}
              </p>
            </div>
          </div>

          {/* Details */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Key Points:</h3>
            <ul style={{ 
              listStyle: 'none', 
              padding: '0',
              display: 'grid',
              gap: '0.75rem'
            }}>
              {reactConcepts[activeSection].details.map((detail, idx) => (
                <li key={idx} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  background: 'rgba(0,0,0,0.1)',
                  borderRadius: '8px'
                }}>
                  <span style={{
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    flexShrink: 0
                  }}>
                    {idx + 1}
                  </span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Code Example or Stats */}
          {reactConcepts[activeSection].example && (
            <div style={{
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '8px',
              padding: '1.5rem',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginTop: '0', marginBottom: '1rem' }}>Example:</h3>
              <pre style={{
                background: 'rgba(0,0,0,0.3)',
                padding: '1rem',
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '0.9rem',
                lineHeight: '1.4'
              }}>
                <code>{reactConcepts[activeSection].example}</code>
              </pre>
            </div>
          )}

          {/* Stats for Popular section */}
          {reactConcepts[activeSection].stats && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              {reactConcepts[activeSection].stats.map((stat, idx) => (
                <div key={idx} style={{
                  background: 'rgba(0,0,0,0.2)',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: '0.8' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Timeline for Facebook section */}
          {reactConcepts[activeSection].timeline && (
            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>React Timeline:</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {reactConcepts[activeSection].timeline.map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem',
                    background: 'rgba(0,0,0,0.1)',
                    borderRadius: '8px'
                  }}>
                    <div style={{
                      background: 'rgba(255,255,255,0.2)',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontWeight: 'bold',
                      fontSize: '0.9rem'
                    }}>
                      {item.year}
                    </div>
                    <div>{item.event}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'rgba(0,0,0,0.1)',
          borderRadius: '8px'
        }}>
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>Next Steps</h3>
            <p style={{ margin: '0', opacity: '0.8' }}>
              Now that you understand what React is, let's set up your development environment.
            </p>
          </div>
          <Link 
            to="/lecture3/setup" 
            style={{
              background: 'white',
              color: '#138c6e',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            Development Setup →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReactOverview;