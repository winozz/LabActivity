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
      description: "React applications are built using components - reusable, self-contained pieces of code that represent parts of a user interface. Components follow the Single Responsibility Principle and encapsulate both UI logic and presentation.",
      details: [
        "Components are pure functions that transform props and state into React elements (Virtual DOM nodes)",
        "Functional components use hooks for state and lifecycle management, while class components use lifecycle methods",
        "Component composition creates hierarchical UI trees with unidirectional data flow",
        "Each component has its own scope, state management, and can implement custom lifecycle behaviors",
        "Components support TypeScript for type safety and better developer experience",
        "Higher-Order Components (HOCs) and Render Props patterns enable advanced composition strategies"
      ],
      example: `// Functional Component with Hooks
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Async data fetching with cleanup
    const abortController = new AbortController();
    
    fetchUser(userId, { signal: abortController.signal })
      .then(userData => {
        setUser(userData);
        setLoading(false);
      })
      .catch(error => {
        if (error.name !== 'AbortError') {
          console.error('Failed to fetch user:', error);
          setLoading(false);
        }
      });
    
    // Cleanup function prevents memory leaks
    return () => abortController.abort();
  }, [userId]);
  
  if (loading) return <LoadingSpinner />;
  if (!user) return <ErrorMessage />;
  
  return (
    <div className="user-profile">
      <Avatar src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <ContactInfo email={user.email} phone={user.phone} />
    </div>
  );
}

// Component Composition Example
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/profile/:id" element={<UserProfile />} />
      </Routes>
      <Footer />
    </Router>
  );
}`,
      technicalConcepts: [
        {
          title: "Virtual DOM & Reconciliation",
          description: "React creates a virtual representation of the DOM in memory and uses a diffing algorithm to minimize actual DOM manipulations"
        },
        {
          title: "Component Lifecycle",
          description: "Components go through mounting, updating, and unmounting phases, each with specific hook or method opportunities"
        },
        {
          title: "Props vs State",
          description: "Props are immutable data passed from parent components, while state is mutable data managed within the component"
        }
      ]
    },
    declarative: {
      title: "Declarative Programming Paradigm",
      icon: "📋",
      description: "React embraces declarative programming where you describe the desired UI state rather than imperative DOM manipulation steps. This paradigm shift enables predictable, maintainable code through functional programming principles.",
      details: [
        "Declarative code describes 'what' the UI should look like for any given state, not 'how' to achieve it",
        "React's reconciliation algorithm efficiently updates the DOM using a Virtual DOM diffing process",
        "Functional programming concepts like immutability and pure functions reduce side effects",
        "State transitions are predictable and can be reasoned about mathematically",
        "Time-travel debugging and state replay become possible with predictable state changes",
        "Declarative patterns enable better testing through predictable input/output relationships"
      ],
      example: `// Declarative React (Functional Programming)
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  
  // Pure function - same input always produces same output
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'completed': return todos.filter(todo => todo.completed);
      case 'active': return todos.filter(todo => !todo.completed);
      default: return todos;
    }
  }, [todos, filter]);
  
  // Immutable state updates
  const toggleTodo = useCallback((id) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id 
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }, []);
  
  // Declarative UI description
  return (
    <div className="todo-app">
      <TodoForm onSubmit={addTodo} />
      <FilterButtons 
        currentFilter={filter} 
        onFilterChange={setFilter} 
      />
      <TodoList 
        todos={filteredTodos} 
        onToggle={toggleTodo} 
      />
    </div>
  );
}

// vs Imperative Vanilla JavaScript
/*
function updateTodoDisplay() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = ''; // Clear existing items
  
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    if (todo.completed) {
      li.classList.add('completed');
    }
    li.addEventListener('click', () => toggleTodo(todo.id));
    todoList.appendChild(li);
  });
}
*/`,
      technicalConcepts: [
        {
          title: "Virtual DOM Reconciliation",
          description: "React maintains a virtual representation of the DOM and uses a diffing algorithm to compute minimal changes needed for updates"
        },
        {
          title: "Immutable Data Patterns",
          description: "State updates create new objects rather than mutating existing ones, enabling time-travel debugging and predictable state management"
        },
        {
          title: "Functional Programming Benefits",
          description: "Pure functions, higher-order components, and immutability reduce bugs and make code more testable and maintainable"
        }
      ]
    },
    stateDriven: {
      title: "State-Driven UI Architecture",
      icon: "🔄",
      description: "React implements unidirectional data flow where UI is a pure function of state. State management drives all UI updates through a predictable, reactive system that ensures UI consistency and enables powerful debugging capabilities.",
      details: [
        "State represents the complete UI condition at any point in time, following the single source of truth principle",
        "React's reconciliation engine automatically re-renders components when state changes, using efficient diffing",
        "Unidirectional data flow prevents circular dependencies and makes state changes predictable",
        "State should be treated as immutable to enable time-travel debugging and performance optimizations",
        "Hook-based state management (useState, useReducer) provides fine-grained reactivity",
        "State lifting and context provide solutions for sharing state across component boundaries",
        "Advanced patterns include state machines, reducers, and reactive programming with observables"
      ],
      example: `// Advanced State Management Example
function useAdvancedCounter(initialValue = 0) {
  const [state, dispatch] = useReducer(counterReducer, {
    count: initialValue,
    history: [initialValue],
    isLoading: false
  });
  
  // Actions with async support
  const actions = useMemo(() => ({
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' }),
    reset: () => dispatch({ type: 'RESET', payload: initialValue }),
    setAsync: async (value) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 1000));
        dispatch({ type: 'SET_VALUE', payload: value });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    undo: () => dispatch({ type: 'UNDO' })
  }), [initialValue]);
  
  return [state, actions];
}

// Reducer with immutable state updates
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
        history: [...state.history, state.count + 1]
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
        history: [...state.history, state.count - 1]
      };
    case 'RESET':
      return {
        ...state,
        count: action.payload,
        history: [action.payload]
      };
    case 'SET_VALUE':
      return {
        ...state,
        count: action.payload,
        history: [...state.history, action.payload],
        isLoading: false
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    case 'UNDO':
      const newHistory = state.history.slice(0, -1);
      return {
        ...state,
        count: newHistory[newHistory.length - 1] || 0,
        history: newHistory
      };
    default:
      return state;
  }
}

// Component using advanced state management
function AdvancedCounter() {
  const [{ count, history, isLoading }, actions] = useAdvancedCounter(0);
  
  return (
    <div className="advanced-counter">
      <h2>Count: {count}</h2>
      <div className="controls">
        <button onClick={actions.increment} disabled={isLoading}>
          +
        </button>
        <button onClick={actions.decrement} disabled={isLoading}>
          -
        </button>
        <button onClick={actions.reset} disabled={isLoading}>
          Reset
        </button>
        <button 
          onClick={() => actions.setAsync(Math.floor(Math.random() * 100))}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Random'}
        </button>
        <button 
          onClick={actions.undo} 
          disabled={isLoading || history.length <= 1}
        >
          Undo
        </button>
      </div>
      <div className="history">
        History: {history.join(' → ')}
      </div>
    </div>
  );
}`,
      technicalConcepts: [
        {
          title: "State Immutability",
          description: "State updates create new objects rather than mutating existing ones, enabling efficient change detection and debugging"
        },
        {
          title: "Unidirectional Data Flow",
          description: "Data flows down through props and events flow up through callbacks, creating predictable and debuggable applications"
        },
        {
          title: "State Lifting & Context",
          description: "Shared state can be moved up the component tree or managed through React Context for cross-component communication"
        }
      ]
    },
    library: {
      title: "JavaScript Library Architecture",
      icon: "📚",
      description: "React is a focused JavaScript library rather than a full framework, implementing the Unix philosophy of 'do one thing and do it well'. This architectural decision provides maximum flexibility while maintaining a minimal core that can be extended with ecosystem tools.",
      details: [
        "Library vs Framework: React provides view layer functionality without imposing architectural constraints",
        "Minimal core with extensible plugin architecture through the React ecosystem",
        "Can be integrated incrementally into existing applications without complete rewrites",
        "Ecosystem flexibility allows choosing best-in-class solutions for routing, state management, and tooling",
        "React's core focuses on component rendering, state management, and Virtual DOM reconciliation",
        "Framework-like capabilities achieved through composition of libraries (React Router, Redux, etc.)",
        "Build tool agnostic - works with Webpack, Vite, Parcel, or even without build tools"
      ],
      example: `// Incremental Integration Example
// Existing vanilla JS application
function initializeApp() {
  // Legacy code continues to work
  initializeLegacyComponents();
  
  // Add React to specific parts
  const reactMountPoint = document.getElementById('react-component');
  if (reactMountPoint) {
    const root = ReactDOM.createRoot(reactMountPoint);
    root.render(<ModernReactComponent />);
  }
}

// Flexible Architecture Example
// You choose your own tech stack
import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Choose your router
import { Provider } from 'react-redux'; // Choose your state management
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Choose your data fetching
import { ThemeProvider } from 'styled-components'; // Choose your styling solution

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <AppRoutes />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  );
}

// vs Framework approach (Angular example)
/*
@NgModule({
  imports: [
    BrowserModule,        // Required
    RouterModule,         // Framework's router
    HttpClientModule,     // Framework's HTTP client
    FormsModule          // Framework's forms
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
*/

// React's Bundle Size Comparison
// React core: ~42KB (production build)
// Angular: ~130KB+ (minimal app)
// Vue: ~34KB (core + template compiler)

// CDN Usage Example (No build tools required)
/*
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script type="text/babel">
  function Hello() {
    return React.createElement('h1', null, 'Hello, World!');
  }
  
  ReactDOM.render(React.createElement(Hello), document.getElementById('root'));
</script>
*/`,
      technicalConcepts: [
        {
          title: "Library vs Framework Trade-offs",
          description: "Libraries provide flexibility but require more decisions; frameworks provide structure but less flexibility"
        },
        {
          title: "Incremental Adoption Strategy",
          description: "React can be gradually introduced to existing codebases without requiring complete rewrites"
        },
        {
          title: "Ecosystem Composition",
          description: "React's minimal core allows developers to compose best-in-class solutions for their specific needs"
        }
      ]
    },
    popular: {
      title: "Industry Adoption & Ecosystem",
      icon: "🌟",
      description: "React has achieved unprecedented adoption in the JavaScript ecosystem, becoming the de facto standard for modern frontend development. Its popularity stems from strong technical foundations, active community, and enterprise-grade tooling ecosystem.",
      details: [
        "Used by Fortune 500 companies including Meta, Netflix, Airbnb, Uber, WhatsApp, and Instagram",
        "GitHub: 220,000+ stars, 45,000+ forks, representing massive community engagement",
        "NPM ecosystem: 20M+ weekly downloads with 100,000+ React-related packages",
        "Developer surveys consistently rank React as most loved and wanted frontend technology",
        "Job market: React skills command premium salaries and have highest demand in frontend development",
        "Corporate backing from Meta ensures long-term stability and continued innovation",
        "Active RFC (Request for Comments) process allows community input on future development"
      ],
      stats: [
        { label: "GitHub Stars", value: "220k+", detail: "Most starred UI library" },
        { label: "NPM Weekly Downloads", value: "20M+", detail: "Massive adoption rate" },
        { label: "Stack Overflow Questions", value: "400k+", detail: "Active community support" },
        { label: "Job Market Demand", value: "85%", detail: "Of frontend job postings" },
        { label: "Developer Satisfaction", value: "87%", detail: "Would use again (Stack Overflow 2023)" },
        { label: "Production Websites", value: "10M+", detail: "Built with React worldwide" }
      ],
      marketAnalysis: {
        salaryData: [
          { level: "Junior React Developer", salary: "$65,000 - $85,000", experience: "0-2 years" },
          { level: "Mid-level React Developer", salary: "$85,000 - $120,000", experience: "2-5 years" },
          { level: "Senior React Developer", salary: "$120,000 - $180,000", experience: "5+ years" },
          { level: "React Architect", salary: "$150,000 - $250,000", experience: "8+ years" }
        ],
        industryTrends: [
          "React Native expanding React skills to mobile development",
          "Next.js driving React adoption in full-stack development",
          "Server-side rendering (SSR) becoming standard for performance",
          "React 18 concurrent features enabling new UI patterns"
        ]
      },
      technicalConcepts: [
        {
          title: "Enterprise Adoption Factors",
          description: "Large-scale applications benefit from React's component reusability, TypeScript support, and mature testing ecosystem"
        },
        {
          title: "Developer Experience (DX)",
          description: "Excellent tooling including React DevTools, hot reloading, and extensive IDE support drives adoption"
        },
        {
          title: "Performance at Scale",
          description: "Virtual DOM, code splitting, and concurrent rendering enable React to handle complex, high-traffic applications"
        }
      ]
    },
    facebook: {
      title: "Meta Engineering & Open Source",
      icon: "👥",
      description: "React was created by Jordan Walke at Facebook (now Meta) in 2011 to solve complex UI problems at scale. Its open-source success demonstrates how enterprise solutions can benefit the entire developer community.",
      details: [
        "Originally developed to solve Facebook's news feed performance and complexity issues",
        "First production deployment in Facebook's news feed (2011), later Instagram (2012)",
        "Open-sourced at JSConf US in May 2013, revolutionizing frontend development",
        "Maintained by Meta's dedicated React team with contributions from 1,500+ community contributors",
        "React's development philosophy: 'Move Fast and Don't Break Things' through careful API design",
        "Concurrent development of React Native (2015) proved React's architecture could transcend web development",
        "RFC (Request for Comments) process ensures community input on major changes"
      ],
      timeline: [
        { 
          year: "2011", 
          event: "Initial development by Jordan Walke", 
          impact: "Solved Facebook's UI complexity problems",
          technical: "Introduced Virtual DOM concept"
        },
        { 
          year: "2013", 
          event: "Open-sourced to the public", 
          impact: "Sparked declarative UI revolution",
          technical: "Made Virtual DOM mainstream"
        },
        { 
          year: "2015", 
          event: "React Native released", 
          impact: "Extended React to mobile development",
          technical: "Proved architecture portability"
        },
        { 
          year: "2016", 
          event: "React Fiber architecture", 
          impact: "Enabled concurrent rendering",
          technical: "Rewrote reconciliation algorithm"
        },
        { 
          year: "2019", 
          event: "React Hooks introduced", 
          impact: "Simplified state management",
          technical: "Functional programming paradigm"
        },
        { 
          year: "2022", 
          event: "React 18 with Concurrent Features", 
          impact: "Performance and UX improvements",
          technical: "Automatic batching, Suspense, Transitions"
        }
      ],
      technicalEvolution: {
        architecturalMilestones: [
          {
            version: "React 0.3 (2013)",
            innovation: "Virtual DOM",
            impact: "Efficient DOM updates through diffing algorithm"
          },
          {
            version: "React 15 (2016)",
            innovation: "React Fiber",
            impact: "Incremental rendering and priority-based updates"
          },
          {
            version: "React 16.8 (2019)",
            innovation: "Hooks API",
            impact: "State and lifecycle in functional components"
          },
          {
            version: "React 18 (2022)",
            innovation: "Concurrent Rendering",
            impact: "Interruptible rendering for better user experience"
          }
        ],
        designPrinciples: [
          "Gradual Adoption: New features don't break existing code",
          "Developer Experience: Clear error messages and helpful warnings",
          "Performance by Default: Optimizations built into the framework",
          "Declarative API: Predictable code that's easy to reason about"
        ]
      },
      technicalConcepts: [
        {
          title: "Enterprise-Scale Problem Solving",
          description: "React emerged from real-world scaling challenges at one of the world's largest web applications"
        },
        {
          title: "Open Source Governance",
          description: "Meta's approach to open source includes transparent RFC process and community-driven development"
        },
        {
          title: "Continuous Innovation",
          description: "React's evolution from class components to hooks to concurrent features shows commitment to developer experience"
        }
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

          {/* Technical Concepts Section */}
          {reactConcepts[activeSection].technicalConcepts && (
            <div style={{
              background: 'rgba(0,0,0,0.15)',
              borderRadius: '8px',
              padding: '1.5rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{ marginTop: '0', marginBottom: '1.5rem', color: '#64ffda' }}>
                🔬 Technical Deep Dive
              </h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '1rem' 
              }}>
                {reactConcepts[activeSection].technicalConcepts.map((concept, idx) => (
                  <div key={idx} style={{
                    background: 'rgba(0,0,0,0.1)',
                    padding: '1rem',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <h4 style={{ 
                      margin: '0 0 0.75rem 0', 
                      color: '#64ffda', 
                      fontSize: '1rem' 
                    }}>
                      {concept.title}
                    </h4>
                    <p style={{ margin: '0', fontSize: '0.9rem', lineHeight: '1.4' }}>
                      {concept.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Code Example */}
          {reactConcepts[activeSection].example && (
            <div style={{
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '8px',
              padding: '1.5rem',
              marginBottom: '1rem'
            }}>
              <h3 style={{ marginTop: '0', marginBottom: '1rem', color: '#64ffda' }}>
                💻 Code Example:
              </h3>
              <pre style={{
                background: 'rgba(0,0,0,0.4)',
                padding: '1.5rem',
                borderRadius: '6px',
                overflow: 'auto',
                fontSize: '0.85rem',
                lineHeight: '1.4',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <code style={{ color: '#a5f3fc' }}>{reactConcepts[activeSection].example}</code>
              </pre>
            </div>
          )}

          {/* Enhanced Stats for Popular section */}
          {reactConcepts[activeSection].stats && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', color: '#64ffda' }}>📊 Market Statistics:</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                {reactConcepts[activeSection].stats.map((stat, idx) => (
                  <div key={idx} style={{
                    background: 'rgba(0,0,0,0.2)',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    textAlign: 'center',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#64ffda' }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: '0.9', marginBottom: '0.5rem' }}>
                      {stat.label}
                    </div>
                    {stat.detail && (
                      <div style={{ fontSize: '0.8rem', opacity: '0.7', fontStyle: 'italic' }}>
                        {stat.detail}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Market Analysis for Popular section */}
              {reactConcepts[activeSection].marketAnalysis && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '2rem',
                  marginTop: '2rem'
                }}>
                  <div style={{
                    background: 'rgba(0,0,0,0.1)',
                    padding: '1.5rem',
                    borderRadius: '8px'
                  }}>
                    <h4 style={{ color: '#64ffda', marginBottom: '1rem' }}>💰 Salary Ranges (US)</h4>
                    {reactConcepts[activeSection].marketAnalysis.salaryData.map((data, idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.75rem',
                        marginBottom: '0.5rem',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '4px'
                      }}>
                        <div>
                          <div style={{ fontWeight: 'bold' }}>{data.level}</div>
                          <div style={{ fontSize: '0.8rem', opacity: '0.7' }}>{data.experience}</div>
                        </div>
                        <div style={{ color: '#64ffda', fontWeight: 'bold' }}>
                          {data.salary}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div style={{
                    background: 'rgba(0,0,0,0.1)',
                    padding: '1.5rem',
                    borderRadius: '8px'
                  }}>
                    <h4 style={{ color: '#64ffda', marginBottom: '1rem' }}>📈 Industry Trends</h4>
                    {reactConcepts[activeSection].marketAnalysis.industryTrends.map((trend, idx) => (
                      <div key={idx} style={{
                        padding: '0.75rem',
                        marginBottom: '0.5rem',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '4px',
                        borderLeft: '3px solid #64ffda'
                      }}>
                        {trend}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Enhanced Timeline for Facebook section */}
          {reactConcepts[activeSection].timeline && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', color: '#64ffda' }}>📅 React Evolution Timeline:</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {reactConcepts[activeSection].timeline.map((item, idx) => (
                  <div key={idx} style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: '1rem',
                    padding: '1.5rem',
                    background: 'rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #64ffda, #4facfe)',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      color: '#000',
                      textAlign: 'center',
                      minWidth: '80px'
                    }}>
                      {item.year}
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: '#64ffda' }}>
                        {item.event}
                      </h4>
                      {item.impact && (
                        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>
                          <strong>Impact:</strong> {item.impact}
                        </p>
                      )}
                      {item.technical && (
                        <p style={{ margin: '0', fontSize: '0.9rem', opacity: '0.8', fontStyle: 'italic' }}>
                          <strong>Technical:</strong> {item.technical}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Technical Evolution for Facebook section */}
              {reactConcepts[activeSection].technicalEvolution && (
                <div style={{ marginTop: '2rem' }}>
                  <h4 style={{ color: '#64ffda', marginBottom: '1rem' }}>🏗️ Architectural Milestones</h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1rem',
                    marginBottom: '2rem'
                  }}>
                    {reactConcepts[activeSection].technicalEvolution.architecturalMilestones.map((milestone, idx) => (
                      <div key={idx} style={{
                        background: 'rgba(0,0,0,0.1)',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.1)'
                      }}>
                        <h5 style={{ color: '#64ffda', margin: '0 0 0.5rem 0' }}>
                          {milestone.version}
                        </h5>
                        <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>
                          {milestone.innovation}
                        </p>
                        <p style={{ margin: '0', fontSize: '0.9rem', opacity: '0.8' }}>
                          {milestone.impact}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <h4 style={{ color: '#64ffda', marginBottom: '1rem' }}>⚡ Design Principles</h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '0.75rem'
                  }}>
                    {reactConcepts[activeSection].technicalEvolution.designPrinciples.map((principle, idx) => (
                      <div key={idx} style={{
                        padding: '1rem',
                        background: 'rgba(100, 255, 218, 0.1)',
                        borderRadius: '6px',
                        border: '1px solid rgba(100, 255, 218, 0.2)',
                        fontSize: '0.9rem'
                      }}>
                        {principle}
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
    duration: "12-15 minutes",
    keyPoints: [
      "React components follow the Single Responsibility Principle",
      "Virtual DOM enables efficient UI updates through reconciliation",
      "Component composition creates reusable, maintainable architectures",
      "Hooks provide state and lifecycle management in functional components"
    ],
    script: `Welcome to React! Let's start with the most fundamental concept - component-based architecture.

React revolutionized frontend development by applying software engineering principles to UI development. Components are pure functions that transform props and state into Virtual DOM elements. This functional approach brings predictability and testability to UI code.

The key insight is that UIs are hierarchical structures that can be decomposed into independent, reusable pieces. Each component encapsulates its own logic, state, and presentation - following the Single Responsibility Principle from SOLID design patterns.

Virtual DOM is React's secret weapon. Instead of directly manipulating the real DOM (which is slow), React maintains a virtual representation in memory. When state changes, React creates a new virtual DOM tree, compares it with the previous version using a diffing algorithm, and efficiently updates only what actually changed in the real DOM.

Component composition is like LEGO blocks - you build complex structures from simple, reusable pieces. This approach scales incredibly well and promotes code reuse across your application.`,
    interactions: [
      {
        type: "Technical Demo",
        description: "Show React DevTools to visualize component hierarchy and state changes"
      },
      {
        type: "Code Walkthrough",
        description: "Demonstrate the advanced UserProfile component with useEffect cleanup"
      },
      {
        type: "Architecture Discussion",
        description: "Compare component architecture to traditional MVC patterns"
      }
    ],
    commonQuestions: [
      {
        question: "How does Virtual DOM actually improve performance?",
        answer: "Virtual DOM operations are pure JavaScript object manipulations (fast), while real DOM operations trigger layout recalculations and repaints (slow). React batches updates and only applies necessary changes."
      },
      {
        question: "When should I use class components vs functional components?",
        answer: "Use functional components with hooks for all new development. Class components are legacy and only needed for error boundaries or when working with old codebases."
      },
      {
        question: "How do I handle async operations in components?",
        answer: "Use useEffect with cleanup functions to prevent memory leaks. Consider custom hooks for complex async logic, and state management libraries for global async state."
      }
    ]
  },
  {
    section: "Declarative Programming Paradigm",
    duration: "10-12 minutes",
    keyPoints: [
      "Declarative code describes 'what' not 'how'",
      "Functional programming principles reduce bugs and improve maintainability",
      "Immutable state updates enable time-travel debugging",
      "React's reconciliation algorithm handles efficient DOM updates"
    ],
    script: `Declarative programming is a paradigm shift that makes React incredibly powerful. Instead of writing imperative code that describes step-by-step DOM manipulations, you declare what your UI should look like for any given state.

This connects to functional programming principles. Your components become pure functions: given the same props and state, they always render the same output. This predictability is what makes React applications easier to reason about, test, and debug.

Immutability is crucial here. When you update state, you don't modify existing objects - you create new ones. This might seem inefficient, but it enables powerful debugging features like time-travel debugging, where you can step backwards and forwards through state changes.

React's reconciliation algorithm is what makes declarative programming performant. You describe the desired end state, and React figures out the most efficient way to get there using its Virtual DOM diffing algorithm.

The mathematical foundation is important: UI = f(state). Your UI is a pure function of your application state. This makes React applications predictable and enables powerful patterns like server-side rendering and static generation.`,
    interactions: [
      {
        type: "Live Coding",
        description: "Build the advanced TodoApp showing immutable state updates and pure functions"
      },
      {
        type: "Performance Analysis",
        description: "Use React DevTools Profiler to show reconciliation in action"
      },
      {
        type: "Comparison Exercise",
        description: "Show equivalent imperative JavaScript code to highlight the difference"
      }
    ],
    commonQuestions: [
      {
        question: "Doesn't creating new objects every time hurt performance?",
        answer: "Modern JavaScript engines are optimized for object creation. React's diffing algorithm and immutability actually enable better performance optimizations like React.memo and useMemo."
      },
      {
        question: "How does React know what changed if everything is immutable?",
        answer: "React uses reference equality checks. If you follow immutability patterns, React can quickly determine what changed by comparing object references rather than deep comparing object contents."
      }
    ]
  },
  {
    section: "State-Driven UI Architecture",
    duration: "15-18 minutes",
    keyPoints: [
      "State represents complete UI condition at any point in time",
      "Unidirectional data flow prevents circular dependencies",
      "State immutability enables time-travel debugging",
      "Advanced patterns include reducers and state machines"
    ],
    script: `State management is where React truly shines. State represents the complete condition of your UI at any point in time. This is the 'single source of truth' principle - your entire UI can be derived from your application state.

Unidirectional data flow is crucial. Data flows down through props, and changes flow up through callbacks. This creates a predictable data flow that makes debugging much easier. You can trace any UI change back to a state change.

The advanced counter example demonstrates several important patterns:
1. useReducer for complex state logic
2. Immutable state updates
3. Action patterns for state changes
4. History tracking for undo functionality

State machines are an advanced pattern where your component can only be in specific states and can only transition between them in predefined ways. This eliminates many classes of bugs.

The key insight is that state changes drive UI updates, not the other way around. You never directly manipulate the UI - you update state and let React re-render accordingly.`,
    interactions: [
      {
        type: "Live Implementation",
        description: "Build the advanced counter component step by step, explaining each pattern"
      },
      {
        type: "State Visualization",
        description: "Use React DevTools to show state changes and re-renders"
      },
      {
        type: "Architecture Design",
        description: "Have students design state structure for a complex application"
      }
    ],
    commonQuestions: [
      {
        question: "When should I use useState vs useReducer?",
        answer: "Use useState for simple state (primitives, small objects). Use useReducer for complex state logic, multiple related state variables, or when next state depends on previous state."
      },
      {
        question: "How do I share state between components?",
        answer: "Lift state up to common parent, use Context API for widely shared state, or use external state management libraries like Redux or Zustand for complex applications."
      },
      {
        question: "What's the difference between controlled and uncontrolled components?",
        answer: "Controlled components have their state managed by React (value + onChange). Uncontrolled components manage their own state internally. Prefer controlled components for consistency."
      }
    ]
  },
  {
    section: "JavaScript Library Architecture",
    duration: "8-10 minutes",
    keyPoints: [
      "Library vs Framework: flexibility vs convention",
      "Incremental adoption strategy",
      "Ecosystem composition allows best-in-class solutions",
      "Build tool agnostic approach"
    ],
    script: `Understanding React as a library rather than a framework is crucial for making good architectural decisions. Libraries give you tools and let you decide how to use them. Frameworks provide structure but constrain your choices.

React's library approach means you can:
1. Adopt it incrementally - add React to one part of an existing app
2. Choose your own router, state management, and build tools
3. Swap out individual pieces as requirements change
4. Maintain smaller bundle sizes by only including what you need

The incremental adoption example shows how React can coexist with existing vanilla JavaScript code. This is powerful for modernizing legacy applications without rewrites.

React's minimal core focuses on three things:
1. Component rendering
2. State management
3. Virtual DOM reconciliation

Everything else - routing, data fetching, styling - is handled by the ecosystem. This allows you to choose best-in-class solutions for your specific needs.

The trade-off is decision fatigue for beginners, but this flexibility is why React has remained relevant as the ecosystem evolved.`,
    interactions: [
      {
        type: "Architecture Comparison",
        description: "Compare React + ecosystem vs Angular framework approach"
      },
      {
        type: "Migration Strategy",
        description: "Discuss strategies for adopting React in existing applications"
      },
      {
        type: "Ecosystem Tour",
        description: "Overview of popular React ecosystem libraries"
      }
    ],
    commonQuestions: [
      {
        question: "Which router should I use with React?",
        answer: "React Router is the most popular and well-maintained. Next.js provides file-based routing. Choose based on your needs - client-side vs server-side routing."
      },
      {
        question: "How do I handle global state without Redux?",
        answer: "Context API for simple global state, Zustand for medium complexity, or Redux Toolkit for complex applications with time-travel debugging needs."
      }
    ]
  },
  {
    section: "Industry Adoption & Ecosystem",
    duration: "6-8 minutes",
    keyPoints: [
      "React dominates frontend job market",
      "Enterprise adoption driven by performance and maintainability",
      "Salary premiums for React skills",
      "Future-proof technology choice"
    ],
    script: `React's popularity isn't just hype - it's driven by real technical and business advantages. The statistics are impressive, but what's behind them?

Enterprise adoption happened because React solves real problems:
1. Component reusability reduces development time
2. Virtual DOM enables complex UIs to perform well
3. Strong TypeScript support improves code quality
4. Mature testing ecosystem reduces bugs
5. Large talent pool reduces hiring risk

The salary data shows React skills command premium compensation because:
1. High demand relative to supply
2. React developers tend to understand modern JavaScript well
3. React skills transfer to React Native for mobile development
4. Companies invest heavily in React-based architectures

Industry trends show React expanding beyond traditional web:
1. React Native for mobile
2. Next.js for full-stack development
3. React Server Components for performance
4. React 18 Concurrent Features for UX improvements

This isn't just about popularity - it's about technical excellence and business value driving adoption.`,
    interactions: [
      {
        type: "Career Planning",
        description: "Discuss React career paths and skill development strategies"
      },
      {
        type: "Market Analysis",
        description: "Review job postings and salary data in students' target markets"
      },
      {
        type: "Portfolio Discussion",
        description: "What React projects make the strongest portfolio pieces"
      }
    ],
    commonQuestions: [
      {
        question: "Is React worth learning if I'm already proficient in another framework?",
        answer: "Yes. React concepts transfer to other frameworks, and React's market dominance makes it valuable even as a secondary skill."
      },
      {
        question: "Will React become obsolete soon?",
        answer: "Unlikely. React continues to innovate (Concurrent Features, Server Components) and has massive ecosystem investment. Even if something better emerges, React skills will remain valuable for years."
      }
    ]
  },
  {
    section: "Meta Engineering & Open Source",
    duration: "5-7 minutes",
    keyPoints: [
      "React emerged from real enterprise-scale problems",
      "Open source governance includes community input",
      "Continuous innovation through RFC process",
      "Technical evolution shows commitment to developer experience"
    ],
    script: `React's origin story is important because it shows the library was born from real-world, enterprise-scale problems. Facebook's news feed in 2011 had serious performance and maintainability issues with traditional approaches.

The technical evolution is impressive:
1. Virtual DOM (2013) - Efficient updates
2. React Fiber (2016) - Concurrent rendering
3. Hooks (2019) - Functional programming
4. Concurrent Features (2022) - Better UX

Each major version solved real problems developers faced. This wasn't academic research - it was practical engineering solving production problems.

Meta's approach to open source includes:
1. Transparent RFC process for major changes
2. Community feedback before implementation
3. Gradual adoption strategy - no breaking changes
4. Clear migration paths for major updates

The design principles show thoughtful engineering:
1. Gradual Adoption - you can migrate incrementally
2. Developer Experience - great error messages and warnings
3. Performance by Default - optimizations built-in
4. Declarative API - predictable and learnable

This foundation gives confidence that React will continue evolving thoughtfully rather than making disruptive changes.`,
    interactions: [
      {
        type: "Technical History",
        description: "Show examples of how each major React version solved specific problems"
      },
      {
        type: "RFC Process Demo",
        description: "Look at current React RFCs to show community involvement"
      },
      {
        type: "Future Roadmap",
        description: "Discuss React's current priorities and upcoming features"
      }
    ],
    commonQuestions: [
      {
        question: "Does Meta's control over React create vendor lock-in risk?",
        answer: "React is open source with MIT license. While Meta leads development, the community contributes significantly and could fork if needed. The RFC process ensures transparency."
      },
      {
        question: "How does React's evolution affect existing applications?",
        answer: "React follows semantic versioning and provides clear migration guides. Major versions are infrequent and well-planned. Most updates are additive rather than breaking."
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