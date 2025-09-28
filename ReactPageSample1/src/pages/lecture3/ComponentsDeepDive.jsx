import React from 'react';
import { Link } from 'react-router-dom';
import PresenterNotes from '../../components/PresenterNotes.jsx';
import PresentationMode from '../../components/PresentationMode.jsx';
import { getMobileStyles } from '../../utils/mobileStyles.js';

const ComponentsDeepDive = () => {
  const styles = getMobileStyles();
  const presenterNotes = [
    {
      title: "🔧 Component Architecture Foundation",
      duration: "8 minutes",
      keyPoints: [
        "Component hierarchy and composition patterns",
        "Functional vs Class components comparison",
        "Component responsibilities and single-purpose design",
        "Building reusable component libraries"
      ],
      script: `
        📚 **Welcome to Components Deep Dive!**
        
        Today we'll explore the architectural patterns that make React components powerful and maintainable.
        
        🏗️ **Component Architecture Principles:**
        
        • **Single Responsibility:** Each component should have one clear purpose
        • **Composition over Inheritance:** Build complex UIs by combining simple components
        • **Reusability:** Design components to work in multiple contexts
        • **Predictability:** Components should behave consistently with the same props
        
        🎯 **Learning Goals for Today:**
        1. Master component composition patterns
        2. Understand lifecycle methods and hooks
        3. Implement proper component communication
        4. Apply performance optimization techniques
      `,
      interactions: [
        "Ask: 'What makes a component well-designed?'",
        "Poll: Experience with component libraries (Material-UI, Ant Design, etc.)",
        "Discussion: Share examples of poorly designed components they've encountered"
      ],
      commonQuestions: [
        "Q: When should I break a component into smaller pieces? A: When it has multiple responsibilities or becomes hard to test/understand",
        "Q: How do I know if a component is reusable enough? A: If you can use it in 2-3 different contexts without modification"
      ]
    },
    {
      title: "⚡ Functional vs Class Components Deep Comparison",
      duration: "10 minutes",
      keyPoints: [
        "Syntax and structure differences",
        "Lifecycle methods vs useEffect hooks",
        "State management approaches",
        "Performance characteristics and optimization"
      ],
      script: `
        🔍 **The Great Component Debate: Functional vs Class**
        
        Let's dive deep into the two ways to create React components and understand when to use each approach.
        
        📊 **Functional Components (Modern Approach):**
        
        \`\`\`jsx
        // Functional Component with Hooks
        function UserProfile({ userId }) {
          const [user, setUser] = useState(null);
          const [loading, setLoading] = useState(true);
          
          useEffect(() => {
            fetchUser(userId).then(userData => {
              setUser(userData);
              setLoading(false);
            });
          }, [userId]);
          
          if (loading) return <div>Loading...</div>;
          
          return (
            <div className="user-profile">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          );
        }
        \`\`\`
        
        🏛️ **Class Components (Traditional Approach):**
        
        \`\`\`jsx
        // Class Component with Lifecycle Methods
        class UserProfile extends React.Component {
          constructor(props) {
            super(props);
            this.state = {
              user: null,
              loading: true
            };
          }
          
          componentDidMount() {
            this.fetchUser();
          }
          
          componentDidUpdate(prevProps) {
            if (prevProps.userId !== this.props.userId) {
              this.fetchUser();
            }
          }
          
          fetchUser = async () => {
            this.setState({ loading: true });
            const user = await fetchUser(this.props.userId);
            this.setState({ user, loading: false });
          }
          
          render() {
            const { user, loading } = this.state;
            
            if (loading) return <div>Loading...</div>;
            
            return (
              <div className="user-profile">
                <h2>{user.name}</h2>
                <p>{user.email}</p>
              </div>
            );
          }
        }
        \`\`\`
        
        ⚖️ **Comparison Summary:**
        
        | Aspect | Functional Components | Class Components |
        |--------|----------------------|------------------|
        | **Syntax** | Simpler, less boilerplate | More verbose setup |
        | **State Management** | useState hook | this.state object |
        | **Lifecycle** | useEffect hook | Multiple lifecycle methods |
        | **Performance** | Easier to optimize | Requires manual optimization |
        | **Testing** | Easier to test | More complex setup |
        | **Future Support** | ✅ Active development | ⚠️ Legacy support only |
      `,
      interactions: [
        "Show both examples side by side",
        "Ask: 'Which approach feels more natural to you?'",
        "Code along: Convert a class component to functional"
      ],
      commonQuestions: [
        "Q: Should I convert all class components to functional? A: Not necessary, but new components should use functional approach",
        "Q: Are class components deprecated? A: No, but React team focuses development on hooks and functional components"
      ]
    },
    {
      title: "🔄 Component Lifecycle & Effect Hooks",
      duration: "12 minutes",
      keyPoints: [
        "Component lifecycle phases explained",
        "useEffect hook patterns and dependencies",
        "Cleanup functions and memory management",
        "Advanced effect patterns and custom hooks"
      ],
      script: `
        🌱 **Understanding Component Lifecycle**
        
        Every React component goes through three main phases in its lifecycle. Let's explore each phase and how to handle them effectively.
        
        📊 **The Three Lifecycle Phases:**
        
        \`\`\`
        ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
        │   MOUNTING  │ ──▶│  UPDATING   │ ──▶│ UNMOUNTING  │
        │  (Creation) │    │ (Re-render) │    │ (Cleanup)   │
        └─────────────┘    └─────────────┘    └─────────────┘
        \`\`\`
        
        🚀 **1. Mounting Phase (Component Creation):**
        
        \`\`\`jsx
        function DataComponent() {
          const [data, setData] = useState([]);
          
          // Runs once after component mounts
          useEffect(() => {
            console.log('Component mounted - fetch initial data');
            fetchData().then(setData);
          }, []); // Empty dependency array = mount only
          
          return <div>{data.length} items loaded</div>;
        }
        \`\`\`
        
        🔄 **2. Updating Phase (Props or State Changes):**
        
        \`\`\`jsx
        function SearchResults({ query }) {
          const [results, setResults] = useState([]);
          
          // Runs when 'query' prop changes
          useEffect(() => {
            console.log('Query changed - fetch new results');
            if (query) {
              searchAPI(query).then(setResults);
            }
          }, [query]); // Dependency array with 'query'
          
          return (
            <div>
              {results.map(item => 
                <div key={item.id}>{item.title}</div>
              )}
            </div>
          );
        }
        \`\`\`
        
        🧹 **3. Unmounting Phase (Component Cleanup):**
        
        \`\`\`jsx
        function TimerComponent() {
          const [count, setCount] = useState(0);
          
          useEffect(() => {
            console.log('Starting timer');
            const intervalId = setInterval(() => {
              setCount(c => c + 1);
            }, 1000);
            
            // Cleanup function - runs when component unmounts
            return () => {
              console.log('Cleaning up timer');
              clearInterval(intervalId);
            };
          }, []);
          
          return <div>Timer: {count}</div>;
        }
        \`\`\`
        
        🎯 **Advanced Effect Patterns:**
        
        \`\`\`jsx
        // Multiple effects for different concerns
        function UserDashboard({ userId }) {
          const [user, setUser] = useState(null);
          const [notifications, setNotifications] = useState([]);
          
          // Effect 1: User data
          useEffect(() => {
            fetchUser(userId).then(setUser);
          }, [userId]);
          
          // Effect 2: Notifications
          useEffect(() => {
            const unsubscribe = subscribeToNotifications(userId, setNotifications);
            return unsubscribe; // Cleanup subscription
          }, [userId]);
          
          // Effect 3: Document title
          useEffect(() => {
            document.title = user ? \`Dashboard - \${user.name}\` : 'Dashboard';
          }, [user]);
          
          return <div>...</div>;
        }
        \`\`\`
      `,
      interactions: [
        "Live demo: Component mounting and unmounting",
        "Show browser dev tools to track effect execution",
        "Code challenge: Fix a memory leak in a timer component"
      ],
      commonQuestions: [
        "Q: Why do my effects run twice in development? A: React's Strict Mode intentionally double-calls effects to help detect side effects",
        "Q: When should I split effects? A: When they handle different concerns or have different dependencies"
      ]
    },
    {
      title: "📡 Component Communication Patterns",
      duration: "15 minutes",
      keyPoints: [
        "Props drilling and its limitations",
        "Context API for global state sharing",
        "Custom event systems and ref forwarding",
        "Component composition strategies"
      ],
      script: `
        🔗 **Mastering Component Communication**
        
        As your React app grows, components need to communicate efficiently. Let's explore the patterns and tools available.
        
        📊 **Communication Pattern Hierarchy:**
        
        \`\`\`
        ┌─────────────────┐
        │   Props Down    │ ◀── Simple, Direct
        ├─────────────────┤
        │ Callbacks Up    │ ◀── Event Handling
        ├─────────────────┤
        │ Context API     │ ◀── Global State
        ├─────────────────┤
        │ State Libraries │ ◀── Complex Apps
        └─────────────────┘
        \`\`\`
        
        ⬇️ **1. Props Down (Parent to Child):**
        
        \`\`\`jsx
        // Parent Component
        function ShoppingApp() {
          const [cartItems, setCartItems] = useState([]);
          const [user, setUser] = useState(null);
          
          return (
            <div>
              <Header user={user} cartCount={cartItems.length} />
              <ProductList onAddToCart={(item) => 
                setCartItems(prev => [...prev, item])
              } />
              <Cart items={cartItems} />
            </div>
          );
        }
        
        // Child Components
        function Header({ user, cartCount }) {
          return (
            <nav>
              <span>Welcome {user?.name}</span>
              <span>Cart ({cartCount})</span>
            </nav>
          );
        }
        \`\`\`
        
        ⬆️ **2. Callbacks Up (Child to Parent):**
        
        \`\`\`jsx
        function ProductCard({ product, onAddToCart, onViewDetails }) {
          const handleAddClick = () => {
            onAddToCart(product);
            // Notify parent of the action
          };
          
          return (
            <div className="product-card">
              <h3>{product.name}</h3>
              <p>\${product.price}</p>
              <button onClick={handleAddClick}>Add to Cart</button>
              <button onClick={() => onViewDetails(product.id)}>
                View Details
              </button>
            </div>
          );
        }
        \`\`\`
        
        🌍 **3. Context API (Global Communication):**
        
        \`\`\`jsx
        // Create Context
        const AppContext = createContext();
        
        // Context Provider
        function AppProvider({ children }) {
          const [user, setUser] = useState(null);
          const [theme, setTheme] = useState('light');
          const [cart, setCart] = useState([]);
          
          const value = {
            user,
            theme,
            cart,
            setUser,
            setTheme,
            addToCart: (item) => setCart(prev => [...prev, item]),
            removeFromCart: (id) => setCart(prev => 
              prev.filter(item => item.id !== id)
            )
          };
          
          return (
            <AppContext.Provider value={value}>
              {children}
            </AppContext.Provider>
          );
        }
        
        // Using Context in Components
        function UserProfile() {
          const { user, theme } = useContext(AppContext);
          
          return (
            <div className={\`profile theme-\${theme}\`}>
              <h2>{user?.name}</h2>
            </div>
          );
        }
        
        function AddToCartButton({ product }) {
          const { addToCart } = useContext(AppContext);
          
          return (
            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          );
        }
        \`\`\`
        
        🔧 **4. Advanced: Custom Hooks for Communication:**
        
        \`\`\`jsx
        // Custom hook for cart management
        function useCart() {
          const [items, setItems] = useState([]);
          
          const addItem = useCallback((product) => {
            setItems(prev => {
              const existing = prev.find(item => item.id === product.id);
              if (existing) {
                return prev.map(item => 
                  item.id === product.id 
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                );
              }
              return [...prev, { ...product, quantity: 1 }];
            });
          }, []);
          
          const removeItem = useCallback((id) => {
            setItems(prev => prev.filter(item => item.id !== id));
          }, []);
          
          const total = useMemo(() => 
            items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
          , [items]);
          
          return { items, addItem, removeItem, total };
        }
        
        // Using the custom hook
        function ShoppingApp() {
          const cart = useCart();
          
          return (
            <CartProvider value={cart}>
              <ProductList />
              <Cart />
            </CartProvider>
          );
        }
        \`\`\`
      `,
      interactions: [
        "Live coding: Build a theme switcher with Context",
        "Diagram: Draw component communication flow on whiteboard",
        "Exercise: Identify communication anti-patterns in sample code"
      ],
      commonQuestions: [
        "Q: When should I use Context vs props? A: Use Context for truly global state (theme, user, language). Use props for component-specific data",
        "Q: Can I have multiple contexts? A: Yes! Create separate contexts for different concerns (AuthContext, ThemeContext, etc.)"
      ]
    },
    {
      title: "🚀 Performance Optimization Techniques",
      duration: "12 minutes",
      keyPoints: [
        "React.memo for preventing unnecessary re-renders",
        "useMemo and useCallback for expensive computations",
        "Code splitting and lazy loading strategies",
        "Profiler tools and performance monitoring"
      ],
      script: `
        ⚡ **Optimizing React Component Performance**
        
        Performance optimization in React is about preventing unnecessary work. Let's explore the key techniques and tools.
        
        📊 **Performance Optimization Hierarchy:**
        
        \`\`\`
        ┌─────────────────────┐
        │ Prevent Re-renders  │ ◀── React.memo, useMemo
        ├─────────────────────┤
        │ Optimize Expensive  │ ◀── useCallback, useMemo
        │    Computations     │
        ├─────────────────────┤
        │   Code Splitting    │ ◀── React.lazy, Suspense
        ├─────────────────────┤
        │ Bundle Optimization │ ◀── Tree shaking, chunking
        └─────────────────────┘
        \`\`\`
        
        🛡️ **1. React.memo - Preventing Unnecessary Re-renders:**
        
        \`\`\`jsx
        // Without optimization - re-renders every time parent updates
        function ExpensiveChild({ data, theme }) {
          console.log('ExpensiveChild rendering...');
          
          const processedData = data.map(item => ({
            ...item,
            processed: performExpensiveCalculation(item)
          }));
          
          return (
            <div className={theme}>
              {processedData.map(item => 
                <div key={item.id}>{item.name}: {item.processed}</div>
              )}
            </div>
          );
        }
        
        // With React.memo - only re-renders when props actually change
        const OptimizedChild = React.memo(function ExpensiveChild({ data, theme }) {
          console.log('OptimizedChild rendering...');
          
          const processedData = useMemo(() => 
            data.map(item => ({
              ...item,
              processed: performExpensiveCalculation(item)
            }))
          , [data]);
          
          return (
            <div className={theme}>
              {processedData.map(item => 
                <div key={item.id}>{item.name}: {item.processed}</div>
              )}
            </div>
          );
        });
        \`\`\`
        
        🧠 **2. useMemo - Caching Expensive Computations:**
        
        \`\`\`jsx
        function DataAnalytics({ rawData, filters, sortOrder }) {
          // Expensive computation - only recalculate when dependencies change
          const processedData = useMemo(() => {
            console.log('Processing data...');
            
            return rawData
              .filter(item => {
                // Apply filters
                return filters.every(filter => 
                  item[filter.field] === filter.value
                );
              })
              .sort((a, b) => {
                // Apply sorting
                if (sortOrder.direction === 'asc') {
                  return a[sortOrder.field] > b[sortOrder.field] ? 1 : -1;
                }
                return a[sortOrder.field] < b[sortOrder.field] ? 1 : -1;
              })
              .map(item => ({
                ...item,
                analytics: calculateAnalytics(item) // Expensive calculation
              }));
          }, [rawData, filters, sortOrder]);
          
          // Expensive summary - only recalculate when processed data changes
          const summary = useMemo(() => {
            console.log('Calculating summary...');
            
            return {
              total: processedData.length,
              average: processedData.reduce((sum, item) => 
                sum + item.value, 0) / processedData.length,
              categories: [...new Set(processedData.map(item => item.category))]
            };
          }, [processedData]);
          
          return (
            <div>
              <div className="summary">
                <p>Total: {summary.total}</p>
                <p>Average: {summary.average.toFixed(2)}</p>
                <p>Categories: {summary.categories.join(', ')}</p>
              </div>
              <div className="data">
                {processedData.map(item => 
                  <DataRow key={item.id} item={item} />
                )}
              </div>
            </div>
          );
        }
        \`\`\`
        
        🔗 **3. useCallback - Stabilizing Function References:**
        
        \`\`\`jsx
        function TodoList({ todos, filter }) {
          // Without useCallback - new function on every render
          const handleToggle = (id) => {
            setTodos(prev => prev.map(todo => 
              todo.id === id 
                ? { ...todo, completed: !todo.completed }
                : todo
            ));
          };
          
          // With useCallback - stable function reference
          const handleToggleOptimized = useCallback((id) => {
            setTodos(prev => prev.map(todo => 
              todo.id === id 
                ? { ...todo, completed: !todo.completed }
                : todo
            ));
          }, []); // Empty dependencies - function never changes
          
          const filteredTodos = useMemo(() => 
            todos.filter(todo => {
              switch(filter) {
                case 'active': return !todo.completed;
                case 'completed': return todo.completed;
                default: return true;
              }
            })
          , [todos, filter]);
          
          return (
            <div>
              {filteredTodos.map(todo => 
                <TodoItem 
                  key={todo.id} 
                  todo={todo} 
                  onToggle={handleToggleOptimized}
                />
              )}
            </div>
          );
        }
        
        // TodoItem only re-renders when its specific todo changes
        const TodoItem = React.memo(function TodoItem({ todo, onToggle }) {
          return (
            <div onClick={() => onToggle(todo.id)}>
              {todo.text} - {todo.completed ? '✅' : '⭕'}
            </div>
          );
        });
        \`\`\`
        
        📦 **4. Code Splitting with React.lazy:**
        
        \`\`\`jsx
        import { lazy, Suspense } from 'react';
        
        // Lazy load heavy components
        const HeavyDashboard = lazy(() => import('./HeavyDashboard'));
        const DataVisualization = lazy(() => import('./DataVisualization'));
        
        function App() {
          const [currentView, setCurrentView] = useState('home');
          
          return (
            <div>
              <nav>
                <button onClick={() => setCurrentView('home')}>Home</button>
                <button onClick={() => setCurrentView('dashboard')}>Dashboard</button>
                <button onClick={() => setCurrentView('analytics')}>Analytics</button>
              </nav>
              
              <Suspense fallback={
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <div>Loading...</div>
                </div>
              }>
                {currentView === 'dashboard' && <HeavyDashboard />}
                {currentView === 'analytics' && <DataVisualization />}
              </Suspense>
            </div>
          );
        }
        \`\`\`
      `,
      interactions: [
        "Demo: Show React DevTools Profiler",
        "Performance comparison: Before and after optimization",
        "Exercise: Identify performance bottlenecks in sample code"
      ],
      commonQuestions: [
        "Q: Should I optimize everything with React.memo? A: No, only optimize components that actually have performance issues",
        "Q: How do I know if my optimizations are working? A: Use React DevTools Profiler to measure render times and frequency"
      ]
    },
    {
      title: "🎯 Component Best Practices & Design Patterns",
      duration: "10 minutes",
      keyPoints: [
        "Component design principles and patterns",
        "Error boundaries and error handling",
        "Testing strategies for components",
        "Documentation and maintainability"
      ],
      script: `
        💡 **Component Design Best Practices**
        
        Let's wrap up with essential patterns and practices that will make your components maintainable, testable, and scalable.
        
        🏗️ **SOLID Principles Applied to React Components:**
        
        \`\`\`
        S - Single Responsibility Principle
        O - Open/Closed Principle  
        L - Liskov Substitution Principle
        I - Interface Segregation Principle
        D - Dependency Inversion Principle
        \`\`\`
        
        ✅ **1. Single Responsibility - Do One Thing Well:**
        
        \`\`\`jsx
        // ❌ Bad: Component doing too many things
        function UserDashboard({ userId }) {
          const [user, setUser] = useState(null);
          const [posts, setPosts] = useState([]);
          const [notifications, setNotifications] = useState([]);
          const [theme, setTheme] = useState('light');
          
          // Handles user data, posts, notifications, theming...
          return (
            <div className={\`dashboard \${theme}\`}>
              <UserProfile user={user} />
              <PostList posts={posts} />
              <NotificationPanel notifications={notifications} />
              <ThemeToggle theme={theme} onToggle={setTheme} />
            </div>
          );
        }
        
        // ✅ Good: Separate concerns
        function UserDashboard({ userId }) {
          return (
            <DashboardLayout>
              <UserProfileContainer userId={userId} />
              <UserPostsContainer userId={userId} />
              <NotificationsContainer userId={userId} />
            </DashboardLayout>
          );
        }
        \`\`\`
        
        🛡️ **2. Error Boundaries - Graceful Failure Handling:**
        
        \`\`\`jsx
        class ErrorBoundary extends React.Component {
          constructor(props) {
            super(props);
            this.state = { hasError: false, error: null };
          }
          
          static getDerivedStateFromError(error) {
            return { hasError: true, error };
          }
          
          componentDidCatch(error, errorInfo) {
            console.error('Component Error:', error, errorInfo);
            // Send to error reporting service
            this.props.onError?.(error, errorInfo);
          }
          
          render() {
            if (this.state.hasError) {
              return this.props.fallback || (
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                  <h2>Something went wrong</h2>
                  <button onClick={() => this.setState({ hasError: false })}>
                    Try Again
                  </button>
                </div>
              );
            }
            
            return this.props.children;
          }
        }
        
        // Usage
        function App() {
          return (
            <ErrorBoundary 
              fallback={<CustomErrorPage />}
              onError={(error, info) => reportError(error, info)}
            >
              <Router>
                <Routes>
                  <Route path="/profile" element={
                    <ErrorBoundary fallback={<ProfileError />}>
                      <UserProfile />
                    </ErrorBoundary>
                  } />
                </Routes>
              </Router>
            </ErrorBoundary>
          );
        }
        \`\`\`
        
        📝 **3. Component Documentation Pattern:**
        
        \`\`\`jsx
        /**
         * Button Component
         * 
         * A reusable button component with multiple variants and sizes.
         * 
         * @param {Object} props - Component props
         * @param {'primary'|'secondary'|'danger'} props.variant - Button style variant
         * @param {'small'|'medium'|'large'} props.size - Button size
         * @param {boolean} props.disabled - Whether button is disabled
         * @param {boolean} props.loading - Whether to show loading state
         * @param {Function} props.onClick - Click handler function
         * @param {React.ReactNode} props.children - Button content
         * 
         * @example
         * <Button variant="primary" size="large" onClick={handleSubmit}>
         *   Submit Form
         * </Button>
         */
        function Button({ 
          variant = 'primary', 
          size = 'medium', 
          disabled = false,
          loading = false,
          onClick,
          children,
          ...props 
        }) {
          const buttonClass = \`btn btn--\${variant} btn--\${size} \${loading ? 'btn--loading' : ''}\`;
          
          return (
            <button
              className={buttonClass}
              disabled={disabled || loading}
              onClick={onClick}
              aria-busy={loading}
              {...props}
            >
              {loading ? (
                <>
                  <span className="spinner" aria-hidden="true" />
                  <span>Loading...</span>
                </>
              ) : (
                children
              )}
            </button>
          );
        }
        
        // PropTypes for runtime validation (optional with TypeScript)
        Button.propTypes = {
          variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
          size: PropTypes.oneOf(['small', 'medium', 'large']),
          disabled: PropTypes.bool,
          loading: PropTypes.bool,
          onClick: PropTypes.func,
          children: PropTypes.node.isRequired
        };
        \`\`\`
        
        🧪 **4. Testing Strategy:**
        
        \`\`\`jsx
        import { render, screen, fireEvent, waitFor } from '@testing-library/react';
        import userEvent from '@testing-library/user-event';
        
        // Test component behavior, not implementation
        describe('UserProfile Component', () => {
          const mockUser = {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'avatar.jpg'
          };
          
          test('displays user information correctly', () => {
            render(<UserProfile user={mockUser} />);
            
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('john@example.com')).toBeInTheDocument();
            expect(screen.getByRole('img', { name: /john doe/i })).toBeInTheDocument();
          });
          
          test('handles edit profile action', async () => {
            const user = userEvent.setup();
            const mockOnEdit = jest.fn();
            
            render(
              <UserProfile 
                user={mockUser} 
                onEdit={mockOnEdit} 
                editable={true} 
              />
            );
            
            const editButton = screen.getByRole('button', { name: /edit profile/i });
            await user.click(editButton);
            
            expect(mockOnEdit).toHaveBeenCalledWith(mockUser.id);
          });
          
          test('shows loading state while updating', async () => {
            const { rerender } = render(
              <UserProfile user={mockUser} isUpdating={false} />
            );
            
            // Trigger update
            rerender(<UserProfile user={mockUser} isUpdating={true} />);
            
            expect(screen.getByText(/updating/i)).toBeInTheDocument();
            expect(screen.getByRole('button')).toBeDisabled();
          });
        });
        \`\`\`
      `,
      interactions: [
        "Code review: Analyze component for best practices violations",
        "Testing workshop: Write tests for a sample component",
        "Design exercise: Refactor a complex component using SOLID principles"
      ],
      commonQuestions: [
        "Q: How do I know when to extract a component? A: When you have repeated UI patterns or complex logic that can be isolated",
        "Q: Should every component have tests? A: Focus on testing components with complex logic or critical user interactions"
      ]
    }
  ];

  const slideData = [
    {
      title: "🔧 Component Architecture Foundation",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      content: [
        "• Single Responsibility Principle",
        "• Composition over Inheritance", 
        "• Reusability and Predictability",
        "• Component Design Patterns"
      ]
    },
    {
      title: "⚡ Functional vs Class Components",
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      content: [
        "• Syntax and Structure Differences",
        "• State Management Approaches", 
        "• Lifecycle vs useEffect Hooks",
        "• Performance Characteristics"
      ]
    },
    {
      title: "🔄 Component Lifecycle & Effects",
      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      content: [
        "• Mounting, Updating, Unmounting",
        "• useEffect Hook Patterns",
        "• Dependency Arrays and Cleanup",
        "• Advanced Effect Strategies"
      ]
    },
    {
      title: "📡 Component Communication",
      background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      content: [
        "• Props Down, Callbacks Up",
        "• Context API for Global State",
        "• Custom Event Systems", 
        "• Component Composition Patterns"
      ]
    },
    {
      title: "🚀 Performance Optimization",
      background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      content: [
        "• React.memo for Re-render Prevention",
        "• useMemo and useCallback",
        "• Code Splitting and Lazy Loading",
        "• Performance Monitoring Tools"
      ]
    },
    {
      title: "🎯 Best Practices & Patterns",
      background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      content: [
        "• SOLID Principles in React",
        "• Error Boundaries and Handling",
        "• Testing Strategies",
        "• Documentation and Maintainability"
      ]
    }
  ];
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #20c997 0%, #138c6e 100%)', 
      padding: '2rem', 
      color: 'white',
      fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica Neue", sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
              Lecture 3 • Components Deep Dive
            </div>
            <h1 style={{ margin: '0', fontSize: '2.5rem', fontWeight: '700' }}>
              React Components Deep Dive
            </h1>
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
              Lecture 3 • Components Deep Dive
            </div>
            <h1 style={{ margin: '0', fontSize: '2.5rem', fontWeight: '700' }}>
              React Components Deep Dive
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <PresenterNotes notes={presenterNotes} />
            <PresentationMode slides={slideData} />
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
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '2rem',
          backdropFilter: 'blur(10px)',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            <div>
              <h3 style={{ color: '#64ffda', marginBottom: '1rem' }}>🏗️ What You'll Learn</h3>
              <ul style={{ listStyle: 'none', padding: '0' }}>
                <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#64ffda', marginRight: '0.5rem' }}>▸</span>
                  Component architecture and design patterns
                </li>
                <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#64ffda', marginRight: '0.5rem' }}>▸</span>
                  Functional vs Class components comparison
                </li>
                <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#64ffda', marginRight: '0.5rem' }}>▸</span>
                  Component lifecycle and effect hooks
                </li>
                <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#64ffda', marginRight: '0.5rem' }}>▸</span>
                  Communication patterns and state sharing
                </li>
                <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#64ffda', marginRight: '0.5rem' }}>▸</span>
                  Performance optimization techniques
                </li>
                <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#64ffda', marginRight: '0.5rem' }}>▸</span>
                  Testing and best practices
                </li>
              </ul>
            </div>
            
            <div>
              <h3 style={{ color: '#64ffda', marginBottom: '1rem' }}>⚡ Key Concepts</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Component Architecture', 'Hooks vs Lifecycle', 'Performance', 'Communication', 'Testing', 'Best Practices'].map(concept => (
                  <span key={concept} style={{
                    background: 'rgba(100, 255, 218, 0.2)',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '15px',
                    fontSize: '0.9rem',
                    border: '1px solid rgba(100, 255, 218, 0.3)'
                  }}>
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Component Architecture Section */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '2rem',
          backdropFilter: 'blur(10px)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: '#64ffda', marginBottom: '1.5rem', fontSize: '1.8rem' }}>
            🏗️ Component Architecture Principles
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
            <div>
              <h3 style={{ marginBottom: '1rem' }}>✅ Good Component Design</h3>
              <div style={{
                background: 'rgba(76, 175, 80, 0.1)',
                border: '1px solid rgba(76, 175, 80, 0.3)',
                borderRadius: '8px',
                padding: '1rem'
              }}>
                <pre style={{ margin: '0', fontSize: '0.85rem', color: '#a5f3fc' }}>
{`function UserCard({ user, onEdit }) {
  return (
    <div className="user-card">
      <Avatar src={user.avatar} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <Button onClick={() => onEdit(user.id)}>
        Edit Profile
      </Button>
    </div>
  );
}`}
                </pre>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#4ade80' }}>
                  ✓ Single responsibility ✓ Clear props ✓ Reusable
                </p>
              </div>
            </div>
            
            <div>
              <h3 style={{ marginBottom: '1rem' }}>❌ Poor Component Design</h3>
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '8px',
                padding: '1rem'
              }}>
                <pre style={{ margin: '0', fontSize: '0.85rem', color: '#fca5a5' }}>
{`function UserThing({ data }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Fetches data, handles state,
  // renders UI, manages themes...
  return <div>Everything...</div>;
}`}
                </pre>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#ef4444' }}>
                  ✗ Multiple responsibilities ✗ Hard to test ✗ Not reusable
                </p>
              </div>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(45deg, rgba(100, 255, 218, 0.1), rgba(100, 155, 255, 0.1))',
            borderRadius: '8px',
            padding: '1.5rem',
            border: '1px solid rgba(100, 255, 218, 0.2)'
          }}>
            <h4 style={{ color: '#64ffda', marginBottom: '1rem' }}>🎯 SOLID Principles for React Components</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <strong style={{ color: '#64ffda' }}>S</strong> - Single Responsibility<br/>
                <small>One component, one purpose</small>
              </div>
              <div>
                <strong style={{ color: '#64ffda' }}>O</strong> - Open/Closed<br/>
                <small>Extend via props, not modification</small>
              </div>
              <div>
                <strong style={{ color: '#64ffda' }}>L</strong> - Liskov Substitution<br/>
                <small>Components should be replaceable</small>
              </div>
              <div>
                <strong style={{ color: '#64ffda' }}>I</strong> - Interface Segregation<br/>
                <small>Don't force unused props</small>
              </div>
              <div>
                <strong style={{ color: '#64ffda' }}>D</strong> - Dependency Inversion<br/>
                <small>Depend on abstractions</small>
              </div>
            </div>
          </div>
        </div>

        {/* Functional vs Class Components Comparison */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '2rem',
          backdropFilter: 'blur(10px)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: '#64ffda', marginBottom: '1.5rem', fontSize: '1.8rem' }}>
            ⚡ Functional vs Class Components
          </h2>

          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#64ffda' }}>
              📊 Feature Comparison Matrix
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.9rem'
              }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid rgba(100, 255, 218, 0.3)' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', color: '#64ffda' }}>Feature</th>
                    <th style={{ padding: '0.75rem', textAlign: 'center', color: '#4ade80' }}>Functional Components</th>
                    <th style={{ padding: '0.75rem', textAlign: 'center', color: '#60a5fa' }}>Class Components</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>Syntax</td>
                    <td style={{ padding: '0.75rem', textAlign: 'center', color: '#4ade80' }}>✅ Simpler, less boilerplate</td>
                    <td style={{ padding: '0.75rem', textAlign: 'center', color: '#60a5fa' }}>⚠️ More verbose setup</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>State Management</td>
                    <td style={{ padding: '0.75rem', textAlign: 'center', color: '#4ade80' }}>✅ useState hook</td>
                    <td style={{ padding: '0.75rem', textAlign: 'center', color: '#60a5fa' }}>⚠️ this.state object</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>Lifecycle</td>
                    <td style={{ padding: '0.75rem', textAlign: 'center', color: '#4ade80' }}>✅ useEffect hook</td>
                    <td style={{ padding: '0.75rem', textAlign: 'center', color: '#60a5fa' }}>⚠️ Multiple lifecycle methods</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>Performance</td>
                    <td style={{ padding: '0.75rem', textAlign: 'center', color: '#4ade80' }}>✅ Easier to optimize</td>
                    <td style={{ padding: '0.75rem', textAlign: 'center', color: '#60a5fa' }}>⚠️ Manual optimization</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>Testing</td>
                    <td style={{ padding: '0.75rem', textAlign: 'center', color: '#4ade80' }}>✅ Easier to test</td>
                    <td style={{ padding: '0.75rem', textAlign: 'center', color: '#60a5fa' }}>⚠️ More complex setup</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>Future Support</td>
                    <td style={{ padding: '0.75rem', textAlign: 'center', color: '#4ade80' }}>✅ Active development</td>
                    <td style={{ padding: '0.75rem', textAlign: 'center', color: '#ef4444' }}>⚠️ Legacy support only</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <h4 style={{ color: '#4ade80', marginBottom: '1rem' }}>🔥 Modern Functional Component</h4>
              <div style={{
                background: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '8px',
                padding: '1rem'
              }}>
                <pre style={{ margin: '0', fontSize: '0.8rem', color: '#a5f3fc', lineHeight: '1.4' }}>
{`function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUser(userId).then(userData => {
      setUser(userData);
      setLoading(false);
    });
  }, [userId]);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}`}
                </pre>
              </div>
            </div>

            <div>
              <h4 style={{ color: '#60a5fa', marginBottom: '1rem' }}>🏛️ Traditional Class Component</h4>
              <div style={{
                background: 'rgba(96, 165, 250, 0.1)',
                border: '1px solid rgba(96, 165, 250, 0.3)',
                borderRadius: '8px',
                padding: '1rem'
              }}>
                <pre style={{ margin: '0', fontSize: '0.8rem', color: '#a5f3fc', lineHeight: '1.4' }}>
{`class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null, loading: true };
  }
  
  componentDidMount() {
    this.fetchUser();
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.fetchUser();
    }
  }
  
  fetchUser = async () => {
    const user = await fetchUser(this.props.userId);
    this.setState({ user, loading: false });
  }
  
  render() {
    const { user, loading } = this.state;
    if (loading) return <div>Loading...</div>;
    
    return (
      <div className="user-profile">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    );
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Optimization */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '2rem',
          backdropFilter: 'blur(10px)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: '#64ffda', marginBottom: '1.5rem', fontSize: '1.8rem' }}>
            🚀 Performance Optimization Techniques
          </h2>

          <div style={{
            background: 'linear-gradient(45deg, rgba(244, 114, 182, 0.1), rgba(251, 191, 36, 0.1))',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '2rem',
            border: '1px solid rgba(244, 114, 182, 0.2)'
          }}>
            <h3 style={{ color: '#f472b6', marginBottom: '1rem', textAlign: 'center' }}>
              📊 Optimization Hierarchy
            </h3>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <div style={{
                background: 'rgba(244, 114, 182, 0.2)',
                padding: '0.75rem 2rem',
                borderRadius: '25px',
                border: '2px solid rgba(244, 114, 182, 0.3)',
                width: '300px',
                textAlign: 'center'
              }}>
                <strong>1. Prevent Re-renders</strong><br/>
                <small>React.memo, useMemo</small>
              </div>
              <div style={{ color: '#f472b6', fontSize: '1.2rem' }}>↓</div>
              <div style={{
                background: 'rgba(251, 191, 36, 0.2)',
                padding: '0.75rem 2rem',
                borderRadius: '25px',
                border: '2px solid rgba(251, 191, 36, 0.3)',
                width: '280px',
                textAlign: 'center'
              }}>
                <strong>2. Optimize Expensive Operations</strong><br/>
                <small>useCallback, useMemo</small>
              </div>
              <div style={{ color: '#fbbf24', fontSize: '1.2rem' }}>↓</div>
              <div style={{
                background: 'rgba(168, 85, 247, 0.2)',
                padding: '0.75rem 2rem',
                borderRadius: '25px',
                border: '2px solid rgba(168, 85, 247, 0.3)',
                width: '260px',
                textAlign: 'center'
              }}>
                <strong>3. Code Splitting</strong><br/>
                <small>React.lazy, Suspense</small>
              </div>
              <div style={{ color: '#a855f7', fontSize: '1.2rem' }}>↓</div>
              <div style={{
                background: 'rgba(34, 197, 94, 0.2)',
                padding: '0.75rem 2rem',
                borderRadius: '25px',
                border: '2px solid rgba(34, 197, 94, 0.3)',
                width: '240px',
                textAlign: 'center'
              }}>
                <strong>4. Bundle Optimization</strong><br/>
                <small>Tree shaking, chunking</small>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <h4 style={{ color: '#f472b6', marginBottom: '1rem' }}>🛡️ React.memo Example</h4>
              <div style={{
                background: 'rgba(244, 114, 182, 0.1)',
                border: '1px solid rgba(244, 114, 182, 0.3)',
                borderRadius: '8px',
                padding: '1rem'
              }}>
                <pre style={{ margin: '0', fontSize: '0.8rem', color: '#a5f3fc', lineHeight: '1.4' }}>
{`// Only re-renders when props change
const ExpensiveChild = React.memo(
  function ExpensiveChild({ data, theme }) {
    console.log('Rendering expensive child');
    
    const processedData = useMemo(() => 
      data.map(item => ({
        ...item,
        processed: heavyCalculation(item)
      }))
    , [data]);
    
    return (
      <div className={theme}>
        {processedData.map(item => 
          <div key={item.id}>{item.name}</div>
        )}
      </div>
    );
  }
);`}
                </pre>
              </div>
            </div>

            <div>
              <h4 style={{ color: '#fbbf24', marginBottom: '1rem' }}>⚡ useCallback Example</h4>
              <div style={{
                background: 'rgba(251, 191, 36, 0.1)',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                borderRadius: '8px',
                padding: '1rem'
              }}>
                <pre style={{ margin: '0', fontSize: '0.8rem', color: '#a5f3fc', lineHeight: '1.4' }}>
{`function TodoList({ todos }) {
  // Stable function reference
  const handleToggle = useCallback((id) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  }, []); // Empty deps = never changes
  
  return (
    <div>
      {todos.map(todo => 
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onToggle={handleToggle}
        />
      )}
    </div>
  );
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '2rem'
        }}>
          <Link 
            to="/lecture3/overview"
            style={{
              display: 'block',
              background: 'rgba(255,255,255,0.1)',
              padding: '1rem',
              borderRadius: '8px',
              textDecoration: 'none',
              color: 'white',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease'
            }}
          >
            ← React Overview
          </Link>
          <Link 
            to="/lecture3/pure-react"
            style={{
              display: 'block',
              background: 'rgba(255,255,255,0.1)',
              padding: '1rem',
              borderRadius: '8px',
              textDecoration: 'none',
              color: 'white',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease'
            }}
          >
            Pure React →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComponentsDeepDive;