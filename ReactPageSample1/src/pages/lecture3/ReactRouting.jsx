import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PresenterNotes from '../../components/PresenterNotes.jsx';
import PresentationMode from '../../components/PresentationMode.jsx';
import { getMobileStyles } from '../../utils/mobileStyles.js';

const ReactRouting = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [showPresentation, setShowPresentation] = useState(false);
  const [showCode, setShowCode] = useState({});
  const styles = getMobileStyles();

  const toggleCode = (sectionId) => {
    setShowCode(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const routingSections = {
    introduction: {
      title: "Introduction to React Router",
      icon: "🧭",
      description: "React Router enables navigation and routing in single-page applications (SPAs).",
      importance: "Essential for building multi-page React applications with client-side routing.",
      content: [
        "React Router is a declarative routing library for React applications",
        "It keeps your UI in sync with the URL",
        "Enables navigation without page refreshes",
        "Supports nested routing, dynamic segments, and route guards"
      ],
      installation: `# Install React Router
npm install react-router-dom

# Or with Yarn
yarn add react-router-dom`,
      basicExample: `import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}`
    },
    components: {
      title: "Core Router Components",
      icon: "🧩",
      description: "Understanding the essential components that make React Router work.",
      importance: "These components form the foundation of any React Router implementation.",
      components: [
        {
          name: "BrowserRouter",
          description: "The main router component that wraps your entire application",
          usage: "Wrap your App component with BrowserRouter to enable routing",
          example: `import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      {/* Your app components */}
    </BrowserRouter>
  );
}`
        },
        {
          name: "Routes & Route",
          description: "Define which component should render for specific paths",
          usage: "Routes contains multiple Route components that define path-component mappings",
          example: `import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}`
        },
        {
          name: "Link & NavLink",
          description: "Navigate between routes without page refreshes",
          usage: "Use Link for basic navigation, NavLink for navigation with active states",
          example: `import { Link, NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      
      {/* NavLink with active styling */}
      <NavLink 
        to="/products" 
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        Products
      </NavLink>
    </nav>
  );
}`
        }
      ]
    },
    navigation: {
      title: "Navigation Techniques",
      icon: "🧭",
      description: "Different ways to navigate programmatically and declaratively in React Router.",
      importance: "Understanding navigation patterns is crucial for building intuitive user experiences.",
      techniques: [
        {
          name: "Declarative Navigation",
          description: "Using Link and NavLink components for user-initiated navigation",
          example: `import { Link, NavLink } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <Link to="/" className="logo">My App</Link>
        
        <div className="nav-links">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/settings">Settings</NavLink>
        </div>
      </nav>
    </header>
  );
}`
        },
        {
          name: "Programmatic Navigation",
          description: "Using useNavigate hook for navigation in response to events",
          example: `import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  
  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      // Navigate to dashboard after successful login
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  const goBack = () => {
    navigate(-1); // Go back one page in history
  };
  
  return (
    <form onSubmit={handleLogin}>
      {/* form fields */}
      <button type="button" onClick={goBack}>
        ← Back
      </button>
      <button type="submit">Login</button>
    </form>
  );
}`
        },
        {
          name: "Navigation with State",
          description: "Passing data along with navigation using state",
          example: `import { useNavigate, useLocation } from 'react-router-dom';

// Sending state
function ProductList() {
  const navigate = useNavigate();
  
  const viewProduct = (product) => {
    navigate(\`/products/\${product.id}\`, {
      state: { product, fromList: true }
    });
  };
  
  return (
    <div>
      {products.map(product => (
        <button key={product.id} onClick={() => viewProduct(product)}>
          {product.name}
        </button>
      ))}
    </div>
  );
}

// Receiving state
function ProductDetail() {
  const location = useLocation();
  const { product, fromList } = location.state || {};
  
  return (
    <div>
      {fromList && <p>← Back to product list</p>}
      <h1>{product?.name}</h1>
      {/* product details */}
    </div>
  );
}`
        }
      ]
    },
    dynamicRoutes: {
      title: "Dynamic Routes & Parameters",
      icon: "🔀",
      description: "Creating flexible routes with URL parameters and dynamic segments.",
      importance: "Dynamic routes enable building scalable applications with parameterized URLs.",
      concepts: [
        {
          name: "URL Parameters",
          description: "Capture dynamic segments from the URL",
          example: `import { useParams } from 'react-router-dom';

// Route definition: /users/:userId
function UserProfile() {
  const { userId } = useParams();
  
  useEffect(() => {
    // Fetch user data based on userId
    fetchUser(userId);
  }, [userId]);
  
  return <div>User Profile for ID: {userId}</div>;
}

// Multiple parameters: /users/:userId/posts/:postId
function UserPost() {
  const { userId, postId } = useParams();
  
  return (
    <div>
      <h1>Post {postId}</h1>
      <p>By User {userId}</p>
    </div>
  );
}`
        },
        {
          name: "Query Parameters",
          description: "Handle search parameters and query strings",
          example: `import { useSearchParams } from 'react-router-dom';

// URL: /products?category=electronics&sort=price&page=2
function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const category = searchParams.get('category');
  const sort = searchParams.get('sort');
  const page = searchParams.get('page') || '1';
  
  const updateFilters = (newCategory) => {
    setSearchParams({
      category: newCategory,
      sort: sort,
      page: '1' // Reset to first page
    });
  };
  
  return (
    <div>
      <h1>Products - Category: {category}</h1>
      <select onChange={(e) => updateFilters(e.target.value)}>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="books">Books</option>
      </select>
      {/* Product list */}
    </div>
  );
}`
        },
        {
          name: "Optional Parameters",
          description: "Create routes with optional segments",
          example: `// Route with optional parameter
<Route path="/users/:userId/:tab?" element={<UserProfile />} />

function UserProfile() {
  const { userId, tab } = useParams();
  
  return (
    <div>
      <h1>User {userId}</h1>
      <div className="tabs">
        <Link to={\`/users/\${userId}\`}>Overview</Link>
        <Link to={\`/users/\${userId}/posts\`}>Posts</Link>
        <Link to={\`/users/\${userId}/settings\`}>Settings</Link>
      </div>
      
      {/* Render different content based on tab */}
      {!tab && <UserOverview />}
      {tab === 'posts' && <UserPosts />}
      {tab === 'settings' && <UserSettings />}
    </div>
  );
}`
        }
      ]
    },
    nestedRoutes: {
      title: "Nested Routes & Layouts",
      icon: "🪆",
      description: "Building complex navigation structures with nested routes and shared layouts.",
      importance: "Nested routes enable building applications with consistent layouts and hierarchical navigation.",
      examples: [
        {
          name: "Basic Nested Routes",
          description: "Creating parent-child route relationships",
          example: `import { Outlet } from 'react-router-dom';

// Parent Layout Component
function DashboardLayout() {
  return (
    <div className="dashboard">
      <header>Dashboard Header</header>
      <nav>
        <Link to="/dashboard">Overview</Link>
        <Link to="/dashboard/analytics">Analytics</Link>
        <Link to="/dashboard/users">Users</Link>
      </nav>
      <main>
        {/* Child routes render here */}
        <Outlet />
      </main>
    </div>
  );
}

// Route Configuration
<Routes>
  <Route path="/dashboard" element={<DashboardLayout />}>
    <Route index element={<DashboardOverview />} />
    <Route path="analytics" element={<Analytics />} />
    <Route path="users" element={<UserManagement />} />
    <Route path="users/:id" element={<UserDetail />} />
  </Route>
</Routes>`
        },
        {
          name: "Multiple Layout Levels",
          description: "Creating deeply nested route structures",
          example: `// App Layout (Top Level)
function AppLayout() {
  return (
    <div className="app">
      <GlobalHeader />
      <Outlet />
      <GlobalFooter />
    </div>
  );
}

// Admin Layout (Second Level)
function AdminLayout() {
  return (
    <div className="admin">
      <AdminSidebar />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}

// Route Structure
<Routes>
  <Route path="/" element={<AppLayout />}>
    <Route index element={<HomePage />} />
    <Route path="about" element={<AboutPage />} />
    
    <Route path="admin" element={<AdminLayout />}>
      <Route index element={<AdminDashboard />} />
      <Route path="users" element={<AdminUsers />} />
      <Route path="settings" element={<AdminSettings />} />
    </Route>
  </Route>
</Routes>`
        },
        {
          name: "Protected Routes",
          description: "Implementing authentication-based route protection",
          example: `import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isAuthenticated = useAuth(); // Your auth hook
  const location = useLocation();
  
  if (!isAuthenticated) {
    // Redirect to login with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
}

// Usage in Routes
<Routes>
  <Route path="/login" element={<LoginPage />} />
  <Route
    path="/dashboard/*"
    element={
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    }
  >
    <Route index element={<Dashboard />} />
    <Route path="profile" element={<Profile />} />
    <Route path="settings" element={<Settings />} />
  </Route>
</Routes>`
        }
      ]
    },
    hooks: {
      title: "Router Hooks",
      icon: "🪝",
      description: "Essential hooks for accessing router state and functionality.",
      importance: "Router hooks provide access to routing data and navigation functions in functional components.",
      hooks: [
        {
          name: "useNavigate",
          description: "Navigate programmatically to different routes",
          example: `import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();
  
  const handleSubmit = () => {
    // Navigate to success page
    navigate('/success');
    
    // Navigate with replacement (no back button)
    navigate('/dashboard', { replace: true });
    
    // Navigate with state
    navigate('/results', { state: { data: formData } });
    
    // Go back/forward in history
    navigate(-1); // Go back
    navigate(1);  // Go forward
  };
  
  return <button onClick={handleSubmit}>Submit</button>;
}`
        },
        {
          name: "useLocation",
          description: "Access current location object with pathname, search, state",
          example: `import { useLocation } from 'react-router-dom';

function MyComponent() {
  const location = useLocation();
  
  console.log(location.pathname); // "/products/123"
  console.log(location.search);   // "?category=electronics"
  console.log(location.state);    // Data passed via navigate
  console.log(location.hash);     // "#section1"
  
  // Use location to conditionally render
  const isHomePage = location.pathname === '/';
  
  return (
    <div>
      <h1>Current Path: {location.pathname}</h1>
      {isHomePage && <WelcomeBanner />}
    </div>
  );
}`
        },
        {
          name: "useParams",
          description: "Access URL parameters from dynamic routes",
          example: `import { useParams } from 'react-router-dom';

// Route: /users/:userId/posts/:postId
function PostDetail() {
  const { userId, postId } = useParams();
  
  useEffect(() => {
    fetchPost(userId, postId);
  }, [userId, postId]);
  
  return (
    <div>
      <h1>Post {postId}</h1>
      <p>Author: User {userId}</p>
    </div>
  );
}`
        },
        {
          name: "useSearchParams",
          description: "Read and update URL search parameters",
          example: `import { useSearchParams } from 'react-router-dom';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'all';
  
  const updateSearch = (newQuery) => {
    setSearchParams({
      q: newQuery,
      category: category
    });
  };
  
  return (
    <div>
      <input
        value={query}
        onChange={(e) => updateSearch(e.target.value)}
        placeholder="Search..."
      />
      <p>Searching for: {query} in {category}</p>
    </div>
  );
}`
        }
      ]
    }
  };

  // Show presentation mode if requested
  if (showPresentation) {
    return (
      <PresentationMode
        slides={routingSlides}
        lessonTitle="React Router & Navigation"
        presenterNotes={presenterNotes}
        onExit={() => setShowPresentation(false)}
      />
    );
  }

  return (
    <div style={{
      ...styles.container,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
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
              Lecture 3 Part 2 • React Router
            </div>
            <h1 style={styles.title}>
              Routing & Navigation with React Router
            </h1>
            <p style={styles.subtitle}>
              Build single-page applications with client-side routing and navigation
            </p>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: styles.container.padding === '1rem' ? 'column' : 'row',
            gap: '0.5rem',
            alignItems: 'stretch'
          }}>
            <button
              onClick={() => setShowPresentation(true)}
              style={{
                ...styles.backButton,
                background: 'rgba(34, 197, 94, 0.3)',
                border: '1px solid rgba(34, 197, 94, 0.5)'
              }}
            >
              🎤 Start Presentation
            </button>
            <Link to="/" style={styles.backButton}>
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <div style={styles.navigation}>
          {Object.entries(routingSections).map(([key, section]) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              style={styles.navButton(activeSection === key)}
            >
              <span style={{ fontSize: '1.1rem' }}>{section.icon}</span>
              {section.title}
            </button>
          ))}
        </div>

        {/* Active Section Content */}
        <div style={styles.contentArea}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionIcon}>
              {routingSections[activeSection].icon}
            </span>
            <div style={{ flex: 1 }}>
              <h2 style={styles.sectionTitle}>
                {routingSections[activeSection].title}
              </h2>
              <p style={styles.sectionDescription}>
                {routingSections[activeSection].description}
              </p>
              <div style={styles.infoBox}>
                <strong>Why it matters:</strong> {routingSections[activeSection].importance}
              </div>
            </div>
          </div>

          {/* Section-specific content */}
          {activeSection === 'introduction' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Content Points */}
              <div>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.3rem' }}>Key Concepts:</h3>
                <ul style={{ listStyle: 'none', padding: '0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {routingSections[activeSection].content.map((point, idx) => (
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
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Installation */}
              <div style={styles.exampleContainer}>
                <div style={styles.exampleHeader}>
                  <h3 style={styles.exampleTitle}>Installation</h3>
                  <button
                    onClick={() => toggleCode('installation')}
                    style={styles.toggleButton(showCode['installation'])}
                  >
                    {showCode['installation'] ? 'Hide Code' : 'Show Code'}
                  </button>
                </div>
                {showCode['installation'] && (
                  <pre style={styles.codeBlock}>
                    <code>{routingSections[activeSection].installation}</code>
                  </pre>
                )}
              </div>

              {/* Basic Example */}
              <div style={styles.exampleContainer}>
                <div style={styles.exampleHeader}>
                  <h3 style={styles.exampleTitle}>Basic Setup Example</h3>
                  <button
                    onClick={() => toggleCode('basic')}
                    style={styles.toggleButton(showCode['basic'])}
                  >
                    {showCode['basic'] ? 'Hide Code' : 'Show Code'}
                  </button>
                </div>
                {showCode['basic'] && (
                  <pre style={styles.codeBlock}>
                    <code>{routingSections[activeSection].basicExample}</code>
                  </pre>
                )}
              </div>
            </div>
          )}

          {activeSection === 'components' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {routingSections[activeSection].components.map((component, idx) => (
                <div key={idx} style={styles.exampleContainer}>
                  <div style={styles.exampleHeader}>
                    <h3 style={styles.exampleTitle}>{component.name}</h3>
                    <button
                      onClick={() => toggleCode(`component-${idx}`)}
                      style={styles.toggleButton(showCode[`component-${idx}`])}
                    >
                      {showCode[`component-${idx}`] ? 'Hide Code' : 'Show Code'}
                    </button>
                  </div>
                  <p style={{ margin: '0 0 1rem 0', opacity: '0.9' }}>{component.description}</p>
                  <div style={{
                    background: 'rgba(100,200,255,0.2)',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    marginBottom: '1rem',
                    fontSize: '0.9rem'
                  }}>
                    <strong>Usage:</strong> {component.usage}
                  </div>
                  {showCode[`component-${idx}`] && (
                    <pre style={styles.codeBlock}>
                      <code>{component.example}</code>
                    </pre>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeSection === 'navigation' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {routingSections[activeSection].techniques.map((technique, idx) => (
                <div key={idx} style={styles.exampleContainer}>
                  <div style={styles.exampleHeader}>
                    <h3 style={styles.exampleTitle}>{technique.name}</h3>
                    <button
                      onClick={() => toggleCode(`nav-${idx}`)}
                      style={styles.toggleButton(showCode[`nav-${idx}`])}
                    >
                      {showCode[`nav-${idx}`] ? 'Hide Code' : 'Show Code'}
                    </button>
                  </div>
                  <p style={{ margin: '0 0 1rem 0', opacity: '0.9' }}>{technique.description}</p>
                  {showCode[`nav-${idx}`] && (
                    <pre style={styles.codeBlock}>
                      <code>{technique.example}</code>
                    </pre>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeSection === 'dynamicRoutes' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {routingSections[activeSection].concepts.map((concept, idx) => (
                <div key={idx} style={styles.exampleContainer}>
                  <div style={styles.exampleHeader}>
                    <h3 style={styles.exampleTitle}>{concept.name}</h3>
                    <button
                      onClick={() => toggleCode(`dynamic-${idx}`)}
                      style={styles.toggleButton(showCode[`dynamic-${idx}`])}
                    >
                      {showCode[`dynamic-${idx}`] ? 'Hide Code' : 'Show Code'}
                    </button>
                  </div>
                  <p style={{ margin: '0 0 1rem 0', opacity: '0.9' }}>{concept.description}</p>
                  {showCode[`dynamic-${idx}`] && (
                    <pre style={styles.codeBlock}>
                      <code>{concept.example}</code>
                    </pre>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeSection === 'nestedRoutes' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {routingSections[activeSection].examples.map((example, idx) => (
                <div key={idx} style={styles.exampleContainer}>
                  <div style={styles.exampleHeader}>
                    <h3 style={styles.exampleTitle}>{example.name}</h3>
                    <button
                      onClick={() => toggleCode(`nested-${idx}`)}
                      style={styles.toggleButton(showCode[`nested-${idx}`])}
                    >
                      {showCode[`nested-${idx}`] ? 'Hide Code' : 'Show Code'}
                    </button>
                  </div>
                  <p style={{ margin: '0 0 1rem 0', opacity: '0.9' }}>{example.description}</p>
                  {showCode[`nested-${idx}`] && (
                    <pre style={styles.codeBlock}>
                      <code>{example.example}</code>
                    </pre>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeSection === 'hooks' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {routingSections[activeSection].hooks.map((hook, idx) => (
                <div key={idx} style={styles.exampleContainer}>
                  <div style={styles.exampleHeader}>
                    <h3 style={styles.exampleTitle}>{hook.name}</h3>
                    <button
                      onClick={() => toggleCode(`hook-${idx}`)}
                      style={styles.toggleButton(showCode[`hook-${idx}`])}
                    >
                      {showCode[`hook-${idx}`] ? 'Hide Code' : 'Show Code'}
                    </button>
                  </div>
                  <p style={{ margin: '0 0 1rem 0', opacity: '0.9' }}>{hook.description}</p>
                  {showCode[`hook-${idx}`] && (
                    <pre style={styles.codeBlock}>
                      <code>{hook.example}</code>
                    </pre>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation to Next Topic */}
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
            <h3 style={{ margin: '0 0 0.5rem 0' }}>Next: State Management</h3>
            <p style={{ margin: '0', opacity: '0.8' }}>
              Learn advanced state management patterns and tools for React applications.
            </p>
          </div>
          <Link 
            to="/lecture3/state-management" 
            style={{
              background: 'white',
              color: '#764ba2',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            State Management →
          </Link>
        </div>
      </div>
      
      <PresenterNotes 
        notes={presenterNotes} 
        lessonTitle="React Router & Navigation" 
      />
    </div>
  );
};

// Presenter notes for React Router
const presenterNotes = [
  {
    section: "Introduction to React Router",
    duration: "8-10 minutes",
    keyPoints: [
      "React Router enables client-side routing in SPAs",
      "Keeps UI in sync with URL without page refreshes",
      "Declarative routing approach fits React's philosophy",
      "Industry standard for React routing"
    ],
    script: `Welcome to React Router! In traditional multi-page applications, every navigation requires a full page reload from the server. But in single-page applications (SPAs), we want smooth, fast navigation without those jarring page reloads.

React Router solves this problem by implementing client-side routing. It intercepts navigation events and updates the UI based on the URL, all while staying on the same page. This creates a much faster, more app-like experience for users.

The beauty of React Router is that it's declarative - you describe what components should render for different URLs, and React Router handles all the complex navigation logic for you.`,
    interactions: [
      {
        type: "Demo",
        description: "Show the difference between traditional page navigation and SPA navigation"
      },
      {
        type: "Question",
        description: "Ask students about their experience with different types of websites and navigation"
      }
    ]
  },
  {
    section: "Core Router Components",
    duration: "12-15 minutes",
    keyPoints: [
      "BrowserRouter wraps your entire application",
      "Routes and Route define path-component mappings",
      "Link enables navigation without page reloads",
      "NavLink provides active state styling"
    ],
    script: `Let's break down the essential components that make React Router work. Think of these as the building blocks of your navigation system.

BrowserRouter is like the foundation - it wraps your entire app and provides the routing context. Without it, none of the other router components will work.

Routes and Route work together to define your application's structure. Routes is like a container, and each Route inside it says "when the URL matches this path, show this component."

Link and NavLink are your navigation tools. Link is for basic navigation, while NavLink is smarter - it knows when it's pointing to the current page and can style itself accordingly.`,
    interactions: [
      {
        type: "Live Coding",
        description: "Build a simple router setup step by step"
      },
      {
        type: "Exercise",
        description: "Have students identify router components in existing code"
      }
    ]
  },
  {
    section: "Navigation Techniques",
    duration: "10-12 minutes",
    keyPoints: [
      "Declarative navigation with Link components",
      "Programmatic navigation with useNavigate",
      "Passing state through navigation",
      "Handling navigation history"
    ],
    script: `Navigation in React Router comes in two main flavors: declarative and programmatic.

Declarative navigation uses Link and NavLink components - you declare in your JSX where a click should take the user. This is perfect for menus, buttons, and any user-initiated navigation.

Programmatic navigation uses the useNavigate hook - this is for when you need to navigate in response to events like form submissions, authentication, or API responses. You can also navigate backwards and forwards in history, and even pass data along with the navigation.`,
    interactions: [
      {
        type: "Scenario Discussion",
        description: "When would you use declarative vs programmatic navigation?"
      },
      {
        type: "Code Review",
        description: "Review the login form navigation example"
      }
    ]
  }
];

// Slide data for presentation mode
const routingSlides = [
  {
    title: "React Router & Navigation",
    subtitle: "Building Single-Page Applications with Client-Side Routing",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    title: "🧭 What is React Router?",
    bullets: [
      "Client-side routing library for React applications",
      "Keeps UI in sync with the URL",
      "Enables navigation without page refreshes",
      "Declarative routing approach"
    ],
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  },
  {
    title: "🧩 Core Components",
    bullets: [
      "BrowserRouter - Wraps your entire application",
      "Routes & Route - Define path-component mappings",
      "Link - Navigate without page reloads",
      "NavLink - Navigation with active states"
    ],
    background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
  },
  {
    title: "🧭 Navigation Techniques",
    bullets: [
      "Declarative: Link and NavLink components",
      "Programmatic: useNavigate hook",
      "State passing through navigation",
      "History manipulation and control"
    ],
    background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
  },
  {
    title: "🔀 Dynamic Routes",
    bullets: [
      "URL parameters with useParams",
      "Query strings with useSearchParams",
      "Optional route segments",
      "Flexible, scalable routing patterns"
    ],
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
  },
  {
    title: "🪆 Nested Routes & Layouts",
    bullets: [
      "Hierarchical route structures",
      "Shared layouts with Outlet",
      "Protected route patterns",
      "Complex navigation architectures"
    ],
    background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
  },
  {
    title: "🪝 Essential Hooks",
    bullets: [
      "useNavigate - Programmatic navigation",
      "useLocation - Current location data",
      "useParams - URL parameters",
      "useSearchParams - Query string management"
    ],
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  }
];

export default ReactRouting;