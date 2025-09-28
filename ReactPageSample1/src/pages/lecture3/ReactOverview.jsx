import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PresenterNotes from '../../components/PresenterNotes.jsx';
import PresentationMode from '../../components/PresentationMode.jsx';
import { getMobileStyles } from '../../utils/mobileStyles.js';

const ReactOverview = () => {
  const [activeSection, setActiveSection] = useState('components');
  const [showPresentation, setShowPresentation] = useState(false);
  const styles = getMobileStyles();

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

  // Show presentation mode if requested
  if (showPresentation) {
    return (
      <PresentationMode
        slides={reactSlides}
        lessonTitle="React Overview"
        presenterNotes={presenterNotes}
        onExit={() => setShowPresentation(false)}
      />
    );
  }

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
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              onClick={() => setShowPresentation(true)}
              style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
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
              🎥 Presentation Mode
            </button>
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
      
      <PresenterNotes 
        notes={presenterNotes} 
        lessonTitle="React Overview" 
      />
    </div>
  );
};

// Comprehensive presenter notes for React Overview
const presenterNotes = [
  {
    section: "Component-Based Architecture",
    duration: "8-10 minutes",
    keyPoints: [
      "React is all about breaking UI into reusable pieces",
      "Components are like JavaScript functions that return JSX",
      "Components can accept props (properties) and manage state",
      "Think of components as custom HTML elements"
    ],
    script: `Welcome to React! Let's start with the most fundamental concept - components. 

Think of React components as building blocks for your user interface. Just like you might use LEGO blocks to build something complex, React components let you build complex user interfaces from simple, reusable pieces.

A React component is essentially a JavaScript function that returns JSX - which is a syntax extension that looks like HTML but is actually JavaScript. The beauty is that once you create a component, you can use it anywhere in your application, as many times as you want.

For example, if you create a 'Button' component, you can use it throughout your entire application. Need to change how all buttons look? Just update the Button component, and every button in your app automatically gets updated. This is the power of component-based architecture.`,
    interactions: [
      {
        type: "Question to Students",
        description: "Ask: 'Can anyone think of a website where you see the same UI elements repeated? Like buttons, cards, or navigation items?'"
      },
      {
        type: "Live Demo",
        description: "Show the Welcome component example in the browser dev tools"
      }
    ],
    commonQuestions: [
      {
        question: "What's the difference between a component and a regular HTML element?",
        answer: "HTML elements are predefined (like <div>, <p>, <button>), but React components are custom elements you create. They can contain logic, state, and can be reused with different data."
      },
      {
        question: "Do I need to know HTML well before learning React?",
        answer: "Yes, a solid understanding of HTML and CSS is essential since JSX looks similar to HTML, and you'll need CSS for styling your components."
      }
    ]
  },
  {
    section: "Declarative Programming",
    duration: "6-8 minutes",
    keyPoints: [
      "Declarative vs Imperative programming paradigms",
      "You describe 'what' you want, not 'how' to do it",
      "React handles the DOM manipulation for you",
      "Makes code more predictable and easier to debug"
    ],
    script: `Now let's talk about declarative programming - this is a game-changer in how we think about building user interfaces.

In traditional, imperative programming, you tell the computer exactly HOW to do something, step by step. It's like giving someone directions: 'Go straight, turn left at the light, go two blocks, turn right.' You're specifying every single step.

But declarative programming is different. Instead of saying HOW, you describe WHAT you want the end result to be. It's like telling someone 'I want to go to the coffee shop on Main Street' and letting them figure out the best route.

In React, you declare what your UI should look like for any given state, and React figures out how to make it happen. You don't manually manipulate DOM elements, add classes, or update text content. You just describe what the UI should look like, and React takes care of the rest.

This makes your code much more predictable because you're not worried about the complex steps of updating the interface - you just focus on what it should look like.`,
    interactions: [
      {
        type: "Analogy Exercise",
        description: "Have students compare imperative vs declarative by thinking about ordering at a restaurant (declarative: 'I want a burger') vs cooking instructions (imperative: 'heat oil, add onions, cook for 3 minutes...')"
      }
    ],
    commonQuestions: [
      {
        question: "Is declarative programming always better than imperative?",
        answer: "Not always! Declarative is great for UI because it's predictable and easier to reason about. But sometimes you need imperative code for specific performance optimizations or complex interactions."
      },
      {
        question: "How does React know when to update the UI?",
        answer: "React uses a concept called the Virtual DOM and a process called reconciliation. When your data changes, React compares the new virtual representation with the previous one and updates only what actually changed."
      }
    ]
  },
  {
    section: "State-Driven UI",
    duration: "10-12 minutes",
    keyPoints: [
      "State is data that can change over time",
      "When state changes, UI automatically updates",
      "React uses a unidirectional data flow",
      "State management is crucial for interactive applications"
    ],
    script: `State is one of the most important concepts in React, so let's really dive into this.

Think of state as the 'memory' of your component. It's data that can change over time, and when it changes, your component automatically re-renders to reflect those changes.

Here's a simple way to understand it: imagine a light switch in your room. The light can be either 'on' or 'off' - that's its state. When you flip the switch, the state changes, and the room's lighting changes accordingly. React components work the same way.

Let's say you have a counter component. The current count is stored in state. When you click a button to increment the counter, React updates the state and automatically re-renders the component to show the new count. You don't have to manually update the DOM or change the text on the screen - React does it all for you.

This is what makes React so powerful for interactive applications. Your UI is always a reflection of your current state, and React ensures they stay in sync.

The key principle here is unidirectional data flow - data flows down through your component tree, and changes flow back up through events. This makes your application much easier to understand and debug.`,
    interactions: [
      {
        type: "Live Coding",
        description: "Build a simple counter component together, showing how clicking a button changes state and updates the UI"
      },
      {
        type: "Student Exercise",
        description: "Have students brainstorm examples of state in applications they use daily (like social media likes, shopping cart items, form inputs)"
      }
    ],
    commonQuestions: [
      {
        question: "Can I change state directly?",
        answer: "No! In React, you should never modify state directly. Always use the setter function (like setState or the function returned by useState) to ensure React knows the state has changed and can update the UI."
      },
      {
        question: "What's the difference between state and props?",
        answer: "State is internal to a component and can change over time. Props are external data passed to a component from its parent and should not be modified by the component receiving them."
      }
    ]
  },
  {
    section: "JavaScript Library",
    duration: "5-7 minutes",
    keyPoints: [
      "React is a library, not a framework",
      "Focused specifically on building user interfaces",
      "Can be integrated into existing projects incrementally",
      "Flexible - you choose your own tools and architecture"
    ],
    script: `It's important to understand that React is a library, not a framework - and this distinction matters.

A framework is like a complete toolkit that gives you everything you need and tells you how to structure your entire application. Think of it like a pre-built house where the rooms, layout, and even some furniture are already decided for you.

A library, on the other hand, is more like a toolbox. React gives you powerful tools for building user interfaces, but it doesn't dictate how you structure your entire application, what router to use, how to handle data fetching, or how to manage global state.

This makes React incredibly flexible. You can:
- Add React to just one part of an existing website
- Choose your own routing solution
- Pick your preferred state management library
- Use any build tools you want

React focuses on one thing and does it exceptionally well: building interactive user interfaces. For everything else, you have the freedom to choose the best tools for your specific needs.

This flexibility is both a strength and sometimes a challenge for beginners, because you have more decisions to make. But it also means React can adapt to almost any project requirements.`,
    interactions: [
      {
        type: "Discussion",
        description: "Ask students about their experience with other tools - have they used frameworks vs libraries before? What are the pros and cons of each?"
      }
    ],
    commonQuestions: [
      {
        question: "Is React harder to learn because it's a library instead of a framework?",
        answer: "It depends! React itself might be easier to learn because it's focused, but you might need to learn additional libraries for routing, state management, etc. Frameworks give you more out of the box but are more opinionated."
      },
      {
        question: "Can I use React with other JavaScript frameworks?",
        answer: "Generally, no. React is designed to manage the entire UI layer. However, you can migrate from other frameworks to React incrementally or use React for specific parts of a larger application."
      }
    ]
  },
  {
    section: "Popularity & Ecosystem",
    duration: "4-5 minutes",
    keyPoints: [
      "One of the most popular JavaScript libraries",
      "Strong job market demand",
      "Huge ecosystem of third-party packages",
      "Active community and continuous development"
    ],
    script: `Let's talk about why React has become so incredibly popular and what this means for you as developers.

React is one of the most widely used JavaScript libraries in the world. According to the Stack Overflow Developer Survey, it consistently ranks as one of the most loved and wanted web frameworks. This popularity translates directly into career opportunities - there's huge demand for React developers in the job market.

But popularity isn't everything - what really matters is the ecosystem that has grown around React. There are thousands of third-party packages available for React, covering everything from UI component libraries to state management solutions to testing utilities. This means you rarely have to build everything from scratch.

The React community is incredibly active and helpful. Whether you're stuck on a problem or looking for best practices, you'll find abundant resources - tutorials, blog posts, Stack Overflow answers, and open-source examples.

React is also backed by Meta (formerly Facebook), which means it has strong institutional support and continues to evolve with new features and improvements. The React team regularly releases updates that make the library faster, more powerful, and easier to use.

All of this means that investing your time in learning React is a smart career move - you're learning a skill that's in high demand and has a bright future.`,
    interactions: [
      {
        type: "Career Discussion",
        description: "Talk about React job opportunities in your local market and show job posting examples"
      }
    ],
    commonQuestions: [
      {
        question: "Will React become obsolete soon?",
        answer: "Very unlikely. React has been around since 2013 and continues to evolve and adapt. Its large ecosystem and community make it very stable. Even if something better comes along, React skills will remain valuable for years."
      }
    ]
  },
  {
    section: "Created by Meta/Facebook",
    duration: "3-4 minutes",
    keyPoints: [
      "Originally developed by Jordan Walke at Facebook in 2011",
      "Open-sourced in 2013",
      "Created to solve Facebook's specific UI problems",
      "Now used by Facebook, Netflix, Airbnb, and many others"
    ],
    script: `Let's briefly cover React's origins, because understanding why it was created helps explain its design principles.

React was originally developed by Jordan Walke, a software engineer at Facebook, back in 2011. Facebook was facing some serious challenges with their user interface as their application grew more complex. They had problems with data consistency, making updates efficiently, and maintaining their codebase as it scaled.

Facebook's news feed, for example, needed to update in real-time as new posts came in, comments were added, and likes were updated. With traditional approaches, this became increasingly difficult to manage without bugs and performance issues.

React was Facebook's solution to these problems. It introduced concepts like the virtual DOM and unidirectional data flow specifically to address these challenges. After proving successful internally, Facebook open-sourced React in 2013, allowing the entire web development community to benefit from their innovations.

Today, React powers not just Facebook, but also Instagram, WhatsApp, Netflix, Airbnb, Uber, and thousands of other companies. The fact that it was born out of real-world, large-scale problems gives React a practical, battle-tested foundation.

This origin story is important because it shows that React wasn't created in a vacuum - it was designed to solve real problems that developers face when building complex, interactive user interfaces.`,
    interactions: [
      {
        type: "Industry Examples",
        description: "Show examples of popular websites and apps that use React (Facebook, Instagram, Netflix, etc.)"
      }
    ],
    commonQuestions: [
      {
        question: "Does Facebook still control React's development?",
        answer: "Facebook (now Meta) still leads React's development, but it's open source with contributions from the community. The React team is transparent about their roadmap and accepts community input."
      }
    ]
  }
];

// Slide data for presentation mode
const reactSlides = [
  {
    title: "What is React?",
    subtitle: "A JavaScript Library for Building User Interfaces",
    background: "linear-gradient(135deg, #20c997 0%, #138c6e 100%)",
    content: ""
  },
  {
    title: "🧩 Component-Based Architecture",
    subtitle: "Building UIs with Reusable Pieces",
    bullets: [
      "Components are like JavaScript functions that return JSX",
      "Reusable, self-contained pieces of code",
      "Can be composed together to build complex UIs",
      "Each component manages its own state and lifecycle"
    ],
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    title: "📝 Declarative Programming",
    subtitle: "Describe What, Not How",
    bullets: [
      "You describe what the UI should look like",
      "React figures out how to make it happen",
      "No manual DOM manipulation required",
      "Makes code more predictable and easier to debug"
    ],
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  {
    title: "⚡ State-Driven UI",
    subtitle: "Your UI is Always in Sync",
    bullets: [
      "State is data that can change over time",
      "When state changes, UI automatically updates",
      "Unidirectional data flow",
      "Perfect for interactive applications"
    ],
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  },
  {
    title: "📚 JavaScript Library",
    subtitle: "Focused and Flexible",
    bullets: [
      "Library, not a framework - you choose your tools",
      "Focused specifically on building user interfaces",
      "Can be integrated into existing projects incrementally",
      "Flexible architecture - adapts to your needs"
    ],
    background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
  },
  {
    title: "🌟 Extremely Popular",
    subtitle: "Loved by Developers Worldwide",
    bullets: [
      "One of the most popular JavaScript libraries",
      "Strong job market demand",
      "Huge ecosystem of third-party packages",
      "Active community and continuous development"
    ],
    background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
  },
  {
    title: "🏢 Created by Meta/Facebook",
    subtitle: "Born from Real-World Problems",
    bullets: [
      "Originally developed by Jordan Walke at Facebook (2011)",
      "Open-sourced in 2013",
      "Created to solve Facebook's specific UI challenges",
      "Used by Facebook, Netflix, Airbnb, and thousands more"
    ],
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
  },
  {
    title: "🚀 Ready to Get Started?",
    subtitle: "Next: Setting Up Your Development Environment",
    content: `
      <div style="text-align: center; margin: 2rem 0;">
        <div style="font-size: 1.3rem; margin-bottom: 2rem; opacity: 0.9;">
          Now that you understand what React is, let's set up your development environment and start building!
        </div>
        <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
          <div style="background: rgba(255,255,255,0.2); padding: 1rem 1.5rem; border-radius: 10px;">
            ✅ Node.js & npm
          </div>
          <div style="background: rgba(255,255,255,0.2); padding: 1rem 1.5rem; border-radius: 10px;">
            ✅ VS Code Setup
          </div>
          <div style="background: rgba(255,255,255,0.2); padding: 1rem 1.5rem; border-radius: 10px;">
            ✅ Vite (Modern Tooling)
          </div>
        </div>
      </div>
    `,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  }
];

export default ReactOverview;