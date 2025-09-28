import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PresenterNotes from '../../components/PresenterNotes.jsx';
import { getMobileStyles } from '../../utils/mobileStyles.js';

const PureReact = () => {
  const [activeExample, setActiveExample] = useState('hello-world');
  const [showCode, setShowCode] = useState({});
  const styles = getMobileStyles();

  const toggleCode = (exampleId) => {
    setShowCode(prev => ({
      ...prev,
      [exampleId]: !prev[exampleId]
    }));
  };

  const examples = {
    'hello-world': {
      title: "Hello World",
      description: "The simplest React example using just HTML and script tags",
      html: `<!DOCTYPE html>
<html>
<head>
    <title>Pure React Hello World</title>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        function HelloWorld() {
            return <h1>Hello, World from Pure React! 🚀</h1>;
        }

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<HelloWorld />);
    </script>
</body>
</html>`,
      explanation: "This example shows React running without any build tools. We include React, ReactDOM, and Babel directly from CDN links.",
      keyPoints: [
        "No build tools or bundlers required",
        "Babel transforms JSX in the browser",
        "Perfect for learning and prototyping",
        "React and ReactDOM loaded from CDN"
      ]
    },
    'interactive': {
      title: "Interactive Counter",
      description: "A counter component demonstrating state management in pure React",
      html: `<!DOCTYPE html>
<html>
<head>
    <title>Interactive React Counter</title>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .counter {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            text-align: center;
        }
        .count {
            font-size: 3rem;
            font-weight: bold;
            color: #333;
            margin: 1rem 0;
        }
        button {
            font-size: 1.2rem;
            padding: 0.8rem 1.5rem;
            margin: 0 0.5rem;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .increment { background: #4CAF50; color: white; }
        .decrement { background: #f44336; color: white; }
        .reset { background: #ff9800; color: white; }
        button:hover { transform: translateY(-2px); }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        function Counter() {
            const [count, setCount] = React.useState(0);

            return (
                <div className="counter">
                    <h2>Pure React Counter</h2>
                    <div className="count">{count}</div>
                    <div>
                        <button 
                            className="decrement" 
                            onClick={() => setCount(count - 1)}
                        >
                            -
                        </button>
                        <button 
                            className="reset" 
                            onClick={() => setCount(0)}
                        >
                            Reset
                        </button>
                        <button 
                            className="increment" 
                            onClick={() => setCount(count + 1)}
                        >
                            +
                        </button>
                    </div>
                </div>
            );
        }

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<Counter />);
    </script>
</body>
</html>`,
      explanation: "This example demonstrates React hooks (useState) and event handling in a pure HTML environment.",
      keyPoints: [
        "Uses useState hook for state management",
        "Event handlers for button clicks",
        "Inline CSS for styling",
        "Demonstrates React's reactivity"
      ]
    },
    'components': {
      title: "Multiple Components",
      description: "An example with multiple components working together",
      html: `<!DOCTYPE html>
<html>
<head>
    <title>Multiple React Components</title>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            margin: 0;
            padding: 2rem;
            background: #f0f2f5;
        }
        .app {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            padding: 2rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .user-card {
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 1rem;
            margin: 0.5rem 0;
            background: #fafafa;
        }
        .user-name { font-weight: bold; color: #333; }
        .user-email { color: #666; font-size: 0.9rem; }
        .add-user {
            background: #1976d2;
            color: white;
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            margin-top: 1rem;
        }
        .add-user:hover { background: #1565c0; }
        input {
            width: 100%;
            padding: 0.8rem;
            margin: 0.5rem 0;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
        }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        // User Card Component
        function UserCard({ user }) {
            return (
                <div className="user-card">
                    <div className="user-name">{user.name}</div>
                    <div className="user-email">{user.email}</div>
                </div>
            );
        }

        // User List Component
        function UserList({ users }) {
            return (
                <div>
                    <h3>Users ({users.length})</h3>
                    {users.map(user => (
                        <UserCard key={user.id} user={user} />
                    ))}
                </div>
            );
        }

        // Add User Form Component
        function AddUserForm({ onAddUser }) {
            const [name, setName] = React.useState('');
            const [email, setEmail] = React.useState('');

            const handleSubmit = (e) => {
                e.preventDefault();
                if (name && email) {
                    onAddUser({ name, email });
                    setName('');
                    setEmail('');
                }
            };

            return (
                <form onSubmit={handleSubmit}>
                    <h3>Add New User</h3>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit" className="add-user">Add User</button>
                </form>
            );
        }

        // Main App Component
        function App() {
            const [users, setUsers] = React.useState([
                { id: 1, name: 'John Doe', email: 'john@example.com' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
            ]);

            const addUser = (newUser) => {
                const user = {
                    ...newUser,
                    id: users.length + 1
                };
                setUsers([...users, user]);
            };

            return (
                <div className="app">
                    <h1>User Management System</h1>
                    <AddUserForm onAddUser={addUser} />
                    <UserList users={users} />
                </div>
            );
        }

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    </script>
</body>
</html>`,
      explanation: "This example shows how multiple components can work together, demonstrating props, state lifting, and component composition.",
      keyPoints: [
        "Multiple components with different responsibilities",
        "Props passing between components",
        "State lifting to parent component",
        "Form handling and controlled inputs"
      ]
    },
    'no-jsx': {
      title: "Pure React (No JSX)",
      description: "React without JSX, using React.createElement directly",
      html: `<!DOCTYPE html>
<html>
<head>
    <title>Pure React without JSX</title>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 2rem;
            background: #282c34;
            color: white;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #363c4a;
            padding: 2rem;
            border-radius: 10px;
        }
        button {
            background: #61dafb;
            color: #282c34;
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            margin: 0.5rem;
        }
    </style>
</head>
<body>
    <div id="root"></div>

    <script>
        // Counter component without JSX
        function Counter() {
            const [count, setCount] = React.useState(0);

            return React.createElement('div', { className: 'container' },
                React.createElement('h1', null, 'Pure React Counter (No JSX)'),
                React.createElement('p', null, 'Current count: ', count),
                React.createElement('div', null,
                    React.createElement('button', {
                        onClick: () => setCount(count - 1)
                    }, 'Decrease'),
                    React.createElement('button', {
                        onClick: () => setCount(0)
                    }, 'Reset'),
                    React.createElement('button', {
                        onClick: () => setCount(count + 1)
                    }, 'Increase')
                ),
                React.createElement('p', { style: { fontSize: '0.9rem', opacity: 0.8 } },
                    'This component is built using React.createElement instead of JSX!'
                )
            );
        }

        // Render without JSX
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(React.createElement(Counter));
    </script>
</body>
</html>`,
      explanation: "This shows what React looks like without JSX - using React.createElement directly. JSX is just syntactic sugar!",
      keyPoints: [
        "No JSX transformation needed",
        "Uses React.createElement directly",
        "Shows what JSX compiles to",
        "More verbose but educational"
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
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
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
              Lecture 3 • Pure React
            </div>
            <h1 style={{ margin: '0', fontSize: '2.5rem', fontWeight: '700' }}>
              Pure React Implementation
            </h1>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '1.1rem', opacity: '0.9' }}>
              Learn React without build tools - just HTML, CSS, and JavaScript
            </p>
          </div>
          <Link to="/" style={{ 
            background: 'rgba(255,255,255,0.2)', 
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '500'
          }}>
            ← Back to Home
          </Link>
        </div>

        {/* Introduction */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '2rem',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.8rem' }}>
            Why Start with Pure React?
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            {[
              { icon: '🎯', title: 'Focus on Fundamentals', desc: 'Understand React without tooling complexity' },
              { icon: '⚡', title: 'Instant Feedback', desc: 'No build steps - just save and refresh' },
              { icon: '🔍', title: 'Clear Understanding', desc: 'See exactly what React does under the hood' },
              { icon: '🚀', title: 'Quick Prototyping', desc: 'Perfect for testing ideas and learning' }
            ].map((benefit, idx) => (
              <div key={idx} style={{
                background: 'rgba(0,0,0,0.1)',
                padding: '1.5rem',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                  {benefit.icon}
                </div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>
                  {benefit.title}
                </h3>
                <p style={{ margin: '0', fontSize: '0.9rem', opacity: '0.8' }}>
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Example Navigation */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          {Object.entries(examples).map(([key, example]) => (
            <button
              key={key}
              onClick={() => setActiveExample(key)}
              style={{
                background: activeExample === key ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                border: activeExample === key ? '2px solid rgba(255,255,255,0.5)' : '1px solid rgba(255,255,255,0.2)',
                color: 'white',
                padding: '0.75rem 1.25rem',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: activeExample === key ? '600' : '500',
                fontSize: '0.9rem',
                transition: 'all 0.2s ease'
              }}
            >
              {example.title}
            </button>
          ))}
        </div>

        {/* Active Example */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '2rem',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem' }}>
              {examples[activeExample].title}
            </h2>
            <p style={{ margin: '0', fontSize: '1.1rem', opacity: '0.9' }}>
              {examples[activeExample].description}
            </p>
          </div>

          {/* Key Points */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Key Learning Points:</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '0.75rem' 
            }}>
              {examples[activeExample].keyPoints.map((point, idx) => (
                <div key={idx} style={{
                  background: 'rgba(0,0,0,0.1)',
                  padding: '1rem',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <span style={{
                    background: 'rgba(255,255,255,0.2)',
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
                    ✓
                  </span>
                  <span style={{ fontSize: '0.9rem' }}>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code Toggle */}
          <div style={{ marginBottom: '1rem' }}>
            <button
              onClick={() => toggleCode(activeExample)}
              style={{
                background: showCode[activeExample] ? 'rgba(255,100,100,0.8)' : 'rgba(100,255,100,0.8)',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.9rem',
                transition: 'all 0.2s ease'
              }}
            >
              {showCode[activeExample] ? '🙈 Hide Code' : '👁️ Show Complete Code'}
            </button>
          </div>

          {/* Code Display */}
          {showCode[activeExample] && (
            <div style={{
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '8px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              position: 'relative'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <h4 style={{ margin: '0', fontSize: '1.1rem' }}>
                  Complete HTML File
                </h4>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(examples[activeExample].html);
                    alert('Code copied to clipboard!');
                  }}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  📋 Copy Code
                </button>
              </div>
              <pre style={{
                background: 'rgba(0,0,0,0.5)',
                padding: '1.5rem',
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '0.85rem',
                lineHeight: '1.4',
                margin: '0',
                maxHeight: '500px'
              }}>
                <code>{examples[activeExample].html}</code>
              </pre>
            </div>
          )}

          {/* Explanation */}
          <div style={{
            background: 'rgba(100,200,255,0.1)',
            padding: '1.5rem',
            borderRadius: '8px',
            borderLeft: '4px solid rgba(100,200,255,0.5)'
          }}>
            <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1.2rem' }}>
              💡 Explanation
            </h4>
            <p style={{ margin: '0', fontSize: '1rem', lineHeight: '1.6' }}>
              {examples[activeExample].explanation}
            </p>
          </div>
        </div>

        {/* Try It Yourself Section */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '2rem',
          marginTop: '2rem',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{ margin: '0 0 1rem 0', fontSize: '2rem' }}>
            🛠️ Try It Yourself
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '1.5rem' 
          }}>
            <div style={{
              background: 'rgba(0,0,0,0.1)',
              padding: '1.5rem',
              borderRadius: '8px'
            }}>
              <h3 style={{ margin: '0 0 1rem 0' }}>Step 1: Create HTML File</h3>
              <p>Create a new file called <code style={{ background: 'rgba(0,0,0,0.3)', padding: '0.2rem 0.4rem', borderRadius: '3px' }}>index.html</code> and copy one of the examples above.</p>
            </div>
            <div style={{
              background: 'rgba(0,0,0,0.1)',
              padding: '1.5rem',
              borderRadius: '8px'
            }}>
              <h3 style={{ margin: '0 0 1rem 0' }}>Step 2: Open in Browser</h3>
              <p>Double-click the HTML file or right-click and select "Open with Browser".</p>
            </div>
            <div style={{
              background: 'rgba(0,0,0,0.1)',
              padding: '1.5rem',
              borderRadius: '8px'
            }}>
              <h3 style={{ margin: '0 0 1rem 0' }}>Step 3: Experiment</h3>
              <p>Modify the code, save the file, and refresh the browser to see your changes!</p>
            </div>
          </div>
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
          <Link 
            to="/lecture3/setup" 
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            ← Development Setup
          </Link>
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>Next: JavaScript Essentials</h3>
            <p style={{ margin: '0', opacity: '0.8', textAlign: 'center' }}>
              Essential JavaScript concepts for React
            </p>
          </div>
          <Link 
            to="/lecture3/javascript-essentials" 
            style={{
              background: 'white',
              color: '#138c6e',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            JS Essentials →
          </Link>
        </div>
      </div>
      
      <PresenterNotes 
        notes={pureReactNotes} 
        lessonTitle="Pure React" 
      />
    </div>
  );
};

// Presenter notes for Pure React
const pureReactNotes = [
  {
    section: "Introduction to Pure React",
    duration: "5-7 minutes",
    keyPoints: [
      "Pure React means using React without build tools",
      "Great for understanding React fundamentals",
      "Uses CDN links instead of npm packages",
      "Perfect for learning and prototyping"
    ],
    script: `Welcome to Pure React! Before we dive into modern development environments, it's important to understand React at its core, without any build tools or complexity.

Pure React means using React directly in the browser with just HTML, CSS, and JavaScript. No webpack, no babel, no build process - just React itself. This approach helps you understand exactly what React does and how it works.

We're going to explore four different examples, starting from the simplest 'Hello World' and building up to more complex interactions. Each example is complete HTML that you can save and open directly in your browser.

This approach is excellent for learning because there's no setup complexity, no hidden magic - just React doing what React does best: building user interfaces.`
  },
  {
    section: "Hello World Example",
    duration: "8-10 minutes",
    keyPoints: [
      "CDN links for React and ReactDOM",
      "Babel transformer for JSX",
      "Basic component structure",
      "ReactDOM.render() method"
    ],
    script: `Let's start with the classic 'Hello World' example. This shows the absolute minimum needed to get React running.

Notice we're including three CDN links: React itself, ReactDOM for rendering to the DOM, and Babel for transforming JSX. In modern development, build tools handle this transformation, but here we can see it happening live in the browser.

The component is just a function that returns JSX. JSX looks like HTML but it's actually JavaScript that gets transformed into React.createElement calls. When you write <h1>Hello, World!</h1>, Babel transforms this into React.createElement('h1', null, 'Hello, World!').

Finally, ReactDOM.render() takes our component and mounts it to a DOM element. This is where React takes control of that part of your webpage.`
  },
  {
    section: "Counter Example",
    duration: "10-12 minutes", 
    keyPoints: [
      "useState hook for state management",
      "Event handlers in React",
      "State updates trigger re-renders",
      "Functional components vs class components"
    ],
    script: `The counter example introduces state - the heart of interactive React applications.

The useState hook gives us a state variable (count) and a function to update it (setCount). When we call setCount, React knows the component needs to re-render with the new value.

Notice the event handler: onClick={increment}. We're passing a function reference, not calling the function. React will call this function when the button is clicked.

This demonstrates React's core principle: when state changes, the UI automatically updates. You don't manually update the DOM - you just update your state, and React handles the rest.

The beauty of this approach is predictability. Your UI is always a function of your current state. If you know the state, you know exactly how the UI will look.`
  },
  {
    section: "Todo List Example",
    duration: "12-15 minutes",
    keyPoints: [
      "Managing arrays in state",
      "Form handling in React",
      "List rendering with keys",
      "Multiple state variables"
    ],
    script: `The todo list example shows more realistic state management with arrays and forms.

We have two pieces of state: the input value and the todos array. Managing form input in React follows a pattern called 'controlled components' - the input's value is controlled by React state, not the DOM.

When adding a todo, we use the spread operator to create a new array rather than mutating the existing one. This is crucial in React - state should be treated as immutable. React uses object reference equality to determine if it needs to re-render, so we always create new objects/arrays.

The key prop on each todo item is important for performance. React uses keys to efficiently update lists when items are added, removed, or reordered. Never use array indices as keys for dynamic lists - use unique, stable identifiers.

This example shows how React scales from simple interactions to more complex data management while maintaining the same principles.`
  },
  {
    section: "User Profile Example",
    duration: "10-12 minutes",
    keyPoints: [
      "Object state management",
      "Conditional rendering",
      "Input binding patterns",
      "State structure best practices"
    ],
    script: `Our final example demonstrates working with object state and conditional rendering.

The user profile shows how to manage state that's an object rather than primitive values. When updating object state, we need to create a new object, which we do using the spread operator: {...user, name: newName}.

Conditional rendering uses JavaScript's logical operators. The user.name && <h2>Welcome, {user.name}!</h2> pattern only renders the welcome message if the user has a name.

The edit mode toggle demonstrates how React can completely change what's rendered based on state. Same component, same data, but entirely different UI based on the isEditing flag.

This pattern of conditional rendering is everywhere in React applications - showing loading states, authenticated vs unauthenticated views, different layouts based on user permissions, and much more.`
  },
  {
    section: "Transitioning to Modern Development",
    duration: "5-7 minutes",
    keyPoints: [
      "Pure React vs modern tooling trade-offs",
      "When to use each approach",
      "Next steps in React learning",
      "Build tools benefits"
    ],
    script: `Pure React is fantastic for learning and simple prototypes, but real applications need more sophisticated tooling.

Build tools give us hot reloading, optimized bundles, TypeScript support, CSS preprocessing, and much more. They also handle the JSX transformation automatically, so we don't need to include Babel in the browser.

However, understanding Pure React gives you a solid foundation. When something goes wrong with your build process, or when you need to debug a complex React issue, knowing how React works at its core is invaluable.

The concepts you've learned here - components, state, event handling, conditional rendering - are exactly the same whether you're using Pure React or a modern build setup. The tools change, but React's core principles remain constant.

Now that you understand React fundamentals, you're ready to explore modern development environments and more advanced React features.`
  }
];

export default PureReact;