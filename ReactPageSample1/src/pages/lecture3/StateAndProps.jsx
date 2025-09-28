import React from 'react';
import { Link } from 'react-router-dom';
import PresenterNotes from '../../components/PresenterNotes.jsx';
import PresentationMode from '../../components/PresentationMode.jsx';
import { getMobileStyles } from '../../utils/mobileStyles.js';

const StateAndProps = () => {
  const styles = getMobileStyles();
  const presenterNotes = [
    {
      title: "🎯 State & Props Foundation",
      duration: "10 minutes",
      keyPoints: [
        "Understanding React's data flow philosophy",
        "State vs Props: When to use each",
        "Immutability principles in React",
        "Component communication patterns"
      ],
      script: `
        🎉 **Welcome to State & Props - React's Data Management!**
        
        Today we'll dive deep into React's core data management concepts that power every React application.
        
        🔄 **React's Unidirectional Data Flow:**
        
        React follows a simple but powerful principle: data flows down, events flow up.
        
        \`\`\`
        ┌─────────────┐
        │   Parent    │ ──── props ────▶ ┌─────────────┐
        │ Component   │                  │   Child     │
        │             │ ◀── callbacks ── │ Component   │
        └─────────────┘                  └─────────────┘
        \`\`\`
        
        📊 **The Big Picture:**
        
        • **State**: Internal component data that can change
        • **Props**: External data passed from parent components
        • **Immutability**: Always create new objects/arrays, never mutate existing ones
        • **Single Source of Truth**: Keep shared state in the closest common ancestor
        
        🎯 **What We'll Cover Today:**
        1. Local component state with useState
        2. Props passing and prop drilling solutions
        3. State lifting patterns
        4. Advanced state management techniques
        5. Performance considerations
        6. Common pitfalls and how to avoid them
      `,
      interactions: [
        "Poll: 'How many have worked with state in other frameworks?'",
        "Quick demo: Show console.log of state changes",
        "Ask: 'What challenges have you faced with data management?'"
      ],
      commonQuestions: [
        "Q: When should I use state vs props? A: State for component-internal data that changes, props for data passed from parent",
        "Q: Can I modify props directly? A: No, props are read-only. Use callbacks to communicate changes to parent."
      ]
    },
    {
      title: "🔧 useState Hook Deep Dive",
      duration: "15 minutes",
      keyPoints: [
        "useState syntax and patterns",
        "State initialization strategies",
        "Functional state updates",
        "Managing complex state objects and arrays"
      ],
      script: `
        🔧 **Mastering the useState Hook**
        
        The useState hook is your primary tool for managing component state. Let's explore all its patterns and best practices.
        
        📚 **Basic useState Patterns:**
        
        \`\`\`jsx
        // 1. Simple state
        function Counter() {
          const [count, setCount] = useState(0);
          
          return (
            <div>
              <p>Count: {count}</p>
              <button onClick={() => setCount(count + 1)}>
                Increment
              </button>
            </div>
          );
        }
        
        // 2. Multiple state variables
        function UserForm() {
          const [name, setName] = useState('');
          const [email, setEmail] = useState('');
          const [age, setAge] = useState(0);
          
          const handleSubmit = (e) => {
            e.preventDefault();
            console.log({ name, email, age });
          };
          
          return (
            <form onSubmit={handleSubmit}>
              <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
              <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <input 
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                placeholder="Age"
              />
              <button type="submit">Submit</button>
            </form>
          );
        }
        \`\`\`
        
        🏗️ **Complex State Management:**
        
        \`\`\`jsx
        // Managing object state
        function UserProfile() {
          const [user, setUser] = useState({
            name: '',
            email: '',
            preferences: {
              theme: 'light',
              notifications: true
            }
          });
          
          // ✅ Correct: Using spread operator for immutable updates
          const updateName = (newName) => {
            setUser(prevUser => ({
              ...prevUser,
              name: newName
            }));
          };
          
          // ✅ Correct: Nested object updates
          const updateTheme = (newTheme) => {
            setUser(prevUser => ({
              ...prevUser,
              preferences: {
                ...prevUser.preferences,
                theme: newTheme
              }
            }));
          };
          
          // ❌ Wrong: Direct mutation
          const badUpdate = (newName) => {
            user.name = newName; // Don't do this!
            setUser(user); // React won't detect the change
          };
          
          return (
            <div>
              <h2>Profile: {user.name}</h2>
              <button onClick={() => updateName('John Doe')}>
                Set Name
              </button>
              <button onClick={() => updateTheme('dark')}>
                Toggle Theme
              </button>
            </div>
          );
        }
        \`\`\`
        
        📋 **Array State Management:**
        
        \`\`\`jsx
        function TodoList() {
          const [todos, setTodos] = useState([
            { id: 1, text: 'Learn React', completed: false },
            { id: 2, text: 'Build an app', completed: false }
          ]);
          
          // ✅ Adding items
          const addTodo = (text) => {
            setTodos(prevTodos => [
              ...prevTodos,
              { id: Date.now(), text, completed: false }
            ]);
          };
          
          // ✅ Updating items
          const toggleTodo = (id) => {
            setTodos(prevTodos => 
              prevTodos.map(todo => 
                todo.id === id 
                  ? { ...todo, completed: !todo.completed }
                  : todo
              )
            );
          };
          
          // ✅ Removing items
          const deleteTodo = (id) => {
            setTodos(prevTodos => 
              prevTodos.filter(todo => todo.id !== id)
            );
          };
          
          return (
            <div>
              {todos.map(todo => (
                <div key={todo.id}>
                  <span 
                    style={{
                      textDecoration: todo.completed ? 'line-through' : 'none'
                    }}
                  >
                    {todo.text}
                  </span>
                  <button onClick={() => toggleTodo(todo.id)}>
                    {todo.completed ? 'Undo' : 'Complete'}
                  </button>
                  <button onClick={() => deleteTodo(todo.id)}>
                    Delete
                  </button>
                </div>
              ))}
              <button onClick={() => addTodo('New Todo')}>
                Add Todo
              </button>
            </div>
          );
        }
        \`\`\`
        
        ⚡ **Functional State Updates:**
        
        \`\`\`jsx
        function AsyncCounter() {
          const [count, setCount] = useState(0);
          
          // ❌ Problem: Stale closure
          const incrementThreeTimes = () => {
            setCount(count + 1); // Uses current count
            setCount(count + 1); // Still uses same count!
            setCount(count + 1); // Still uses same count!
          };
          
          // ✅ Solution: Functional updates
          const incrementThreeTimesSafe = () => {
            setCount(prevCount => prevCount + 1);
            setCount(prevCount => prevCount + 1);
            setCount(prevCount => prevCount + 1);
          };
          
          return (
            <div>
              <p>Count: {count}</p>
              <button onClick={incrementThreeTimes}>
                Bad Increment (+3)
              </button>
              <button onClick={incrementThreeTimesSafe}>
                Good Increment (+3)
              </button>
            </div>
          );
        }
        \`\`\`
      `,
      interactions: [
        "Live coding: Build a todo list with state",
        "Debug exercise: Fix a broken state update",
        "Student exercise: Create a shopping cart with state"
      ],
      commonQuestions: [
        "Q: Why isn't my state updating immediately? A: State updates are asynchronous and batched for performance",
        "Q: Should I use one state object or multiple state variables? A: Use multiple variables for unrelated data, objects for related data"
      ]
    },
    {
      title: "📡 Props Passing and Communication",
      duration: "12 minutes", 
      keyPoints: [
        "Props passing patterns and best practices",
        "Prop types and validation",
        "Children props and component composition",
        "Callback props for upward communication"
      ],
      script: `
        📡 **Mastering Props - React's Communication System**
        
        Props are React's way of passing data between components. They're the foundation of component composition and communication.
        
        🎯 **Basic Props Patterns:**
        
        \`\`\`jsx
        // Parent Component
        function App() {
          const user = {
            id: 1,
            name: 'Alice Johnson',
            email: 'alice@example.com',
            avatar: 'https://example.com/avatar.jpg'
          };
          
          return (
            <div>
              <Header title="User Dashboard" />
              <UserCard 
                user={user}
                showEmail={true}
                onEditClick={(userId) => console.log('Edit user:', userId)}
              />
              <StatusMessage 
                type="success"
                message="Profile updated successfully!"
              />
            </div>
          );
        }
        
        // Child Components
        function Header({ title }) {
          return (
            <header style={{ padding: '1rem', backgroundColor: '#f5f5f5' }}>
              <h1>{title}</h1>
            </header>
          );
        }
        
        function UserCard({ user, showEmail, onEditClick }) {
          return (
            <div style={{ 
              border: '1px solid #ddd', 
              padding: '1rem',
              borderRadius: '8px'
            }}>
              <img src={user.avatar} alt={user.name} width="50" />
              <h3>{user.name}</h3>
              {showEmail && <p>{user.email}</p>}
              <button onClick={() => onEditClick(user.id)}>
                Edit Profile
              </button>
            </div>
          );
        }
        
        function StatusMessage({ type, message }) {
          const styles = {
            success: { backgroundColor: '#d4edda', color: '#155724' },
            error: { backgroundColor: '#f8d7da', color: '#721c24' },
            warning: { backgroundColor: '#fff3cd', color: '#856404' }
          };
          
          return (
            <div style={{
              ...styles[type],
              padding: '1rem',
              borderRadius: '4px',
              margin: '1rem 0'
            }}>
              {message}
            </div>
          );
        }
        \`\`\`
        
        👶 **Children Props and Composition:**
        
        \`\`\`jsx
        // Flexible container components using children
        function Card({ title, footer, children }) {
          return (
            <div style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              {title && (
                <div style={{ 
                  padding: '1rem', 
                  backgroundColor: '#f5f5f5',
                  fontWeight: 'bold'
                }}>
                  {title}
                </div>
              )}
              <div style={{ padding: '1rem' }}>
                {children}
              </div>
              {footer && (
                <div style={{ 
                  padding: '1rem', 
                  backgroundColor: '#f8f9fa',
                  borderTop: '1px solid #ddd'
                }}>
                  {footer}
                </div>
              )}
            </div>
          );
        }
        
        // Usage examples
        function Dashboard() {
          return (
            <div>
              <Card title="User Statistics">
                <p>Total Users: 1,234</p>
                <p>Active Today: 89</p>
                <p>New This Week: 156</p>
              </Card>
              
              <Card 
                title="Quick Actions"
                footer={<button>View All Actions</button>}
              >
                <button>Create User</button>
                <button>Send Newsletter</button>
                <button>Generate Report</button>
              </Card>
              
              <Card>
                <h3>Custom Content</h3>
                <p>This card has no predefined title or footer.</p>
                <img src="chart.png" alt="Analytics Chart" />
              </Card>
            </div>
          );
        }
        \`\`\`
        
        🔄 **Advanced Props Patterns:**
        
        \`\`\`jsx
        // Render props pattern
        function DataFetcher({ url, render }) {
          const [data, setData] = useState(null);
          const [loading, setLoading] = useState(true);
          const [error, setError] = useState(null);
          
          useEffect(() => {
            fetch(url)
              .then(response => response.json())
              .then(data => {
                setData(data);
                setLoading(false);
              })
              .catch(error => {
                setError(error);
                setLoading(false);
              });
          }, [url]);
          
          return render({ data, loading, error });
        }
        
        // Usage of render props
        function UserList() {
          return (
            <DataFetcher 
              url="/api/users"
              render={({ data, loading, error }) => {
                if (loading) return <div>Loading users...</div>;
                if (error) return <div>Error: {error.message}</div>;
                
                return (
                  <ul>
                    {data.map(user => (
                      <li key={user.id}>{user.name}</li>
                    ))}
                  </ul>
                );
              }}
            />
          );
        }
        
        // Compound components pattern
        function Tabs({ defaultTab, children }) {
          const [activeTab, setActiveTab] = useState(defaultTab);
          
          return (
            <div className="tabs">
              <div className="tab-headers">
                {React.Children.map(children, (child, index) => (
                  <button
                    key={index}
                    className={activeTab === child.props.label ? 'active' : ''}
                    onClick={() => setActiveTab(child.props.label)}
                  >
                    {child.props.label}
                  </button>
                ))}
              </div>
              <div className="tab-content">
                {React.Children.map(children, (child) => (
                  activeTab === child.props.label ? child : null
                ))}
              </div>
            </div>
          );
        }
        
        function Tab({ label, children }) {
          return <div>{children}</div>;
        }
        
        // Usage
        function App() {
          return (
            <Tabs defaultTab="Profile">
              <Tab label="Profile">
                <h2>User Profile</h2>
                <p>Profile information goes here</p>
              </Tab>
              <Tab label="Settings">
                <h2>Settings</h2>
                <p>Settings panel goes here</p>
              </Tab>
              <Tab label="Help">
                <h2>Help</h2>
                <p>Help documentation goes here</p>
              </Tab>
            </Tabs>
          );
        }
        \`\`\`
      `,
      interactions: [
        "Live demo: Build a reusable Card component",
        "Exercise: Create a compound Modal component",
        "Code review: Identify props anti-patterns"
      ],
      commonQuestions: [
        "Q: How do I pass multiple props efficiently? A: Use object destructuring and spread operator: <Component {...props} />",
        "Q: What's the difference between children and regular props? A: Children is a special prop for component composition"
      ]
    },
    {
      title: "⬆️ State Lifting and Data Flow",
      duration: "15 minutes",
      keyPoints: [
        "When and why to lift state up",
        "Finding the common ancestor component",
        "Avoiding prop drilling with composition",
        "State architecture planning"
      ],
      script: `
        ⬆️ **State Lifting - Managing Shared State**
        
        When multiple components need to share state, we "lift" it to their closest common ancestor. This is a fundamental React pattern.
        
        🎯 **The State Lifting Pattern:**
        
        \`\`\`
        Before Lifting:
        ┌──────────┐    ┌──────────┐
        │Component │    │Component │
        │    A     │    │    B     │
        │ [state]  │    │ [state]  │ ← Duplicated state
        └──────────┘    └──────────┘
        
        After Lifting:
               ┌──────────────┐
               │   Parent     │
               │  [state]     │ ← Single source of truth
               └──────┬───────┘
                     │
             ┌───────┼───────┐
             ▼               ▼
        ┌──────────┐    ┌──────────┐
        │Component │    │Component │
        │    A     │    │    B     │
        │ (props)  │    │ (props)  │
        └──────────┘    └──────────┘
        \`\`\`
        
        📊 **Real-World Example - Shopping Cart:**
        
        \`\`\`jsx
        // ❌ Before lifting - duplicated state
        function ProductList() {
          const [cartCount, setCartCount] = useState(0); // Duplicated
          // ... component logic
        }
        
        function CartSummary() {
          const [cartCount, setCartCount] = useState(0); // Duplicated
          // ... component logic
        }
        
        // ✅ After lifting - shared state
        function ShoppingApp() {
          const [cartItems, setCartItems] = useState([]);
          const [products, setProducts] = useState([
            { id: 1, name: 'Laptop', price: 999 },
            { id: 2, name: 'Phone', price: 699 },
            { id: 3, name: 'Tablet', price: 399 }
          ]);
          
          const addToCart = (product) => {
            setCartItems(prevItems => {
              const existingItem = prevItems.find(item => item.id === product.id);
              if (existingItem) {
                return prevItems.map(item =>
                  item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                );
              }
              return [...prevItems, { ...product, quantity: 1 }];
            });
          };
          
          const removeFromCart = (productId) => {
            setCartItems(prevItems =>
              prevItems.filter(item => item.id !== productId)
            );
          };
          
          const updateQuantity = (productId, newQuantity) => {
            if (newQuantity <= 0) {
              removeFromCart(productId);
              return;
            }
            
            setCartItems(prevItems =>
              prevItems.map(item =>
                item.id === productId
                  ? { ...item, quantity: newQuantity }
                  : item
              )
            );
          };
          
          const getTotalPrice = () => {
            return cartItems.reduce(
              (total, item) => total + (item.price * item.quantity), 
              0
            );
          };
          
          return (
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
              <ProductList 
                products={products}
                onAddToCart={addToCart}
                cartItems={cartItems}
              />
              <CartSummary 
                cartItems={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
                totalPrice={getTotalPrice()}
              />
            </div>
          );
        }
        
        function ProductList({ products, onAddToCart, cartItems }) {
          const getCartQuantity = (productId) => {
            const cartItem = cartItems.find(item => item.id === productId);
            return cartItem ? cartItem.quantity : 0;
          };
          
          return (
            <div>
              <h2>Products</h2>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {products.map(product => (
                  <div key={product.id} style={{
                    border: '1px solid #ddd',
                    padding: '1rem',
                    borderRadius: '8px'
                  }}>
                    <h3>{product.name}</h3>
                    <p>\${product.price}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <button onClick={() => onAddToCart(product)}>
                        Add to Cart
                      </button>
                      {getCartQuantity(product.id) > 0 && (
                        <span>In cart: {getCartQuantity(product.id)}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }
        
        function CartSummary({ cartItems, onUpdateQuantity, onRemoveItem, totalPrice }) {
          return (
            <div style={{
              border: '1px solid #ddd',
              padding: '1rem',
              borderRadius: '8px',
              height: 'fit-content'
            }}>
              <h2>Cart Summary</h2>
              {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <>
                  {cartItems.map(item => (
                    <div key={item.id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.5rem 0',
                      borderBottom: '1px solid #eee'
                    }}>
                      <div>
                        <div>{item.name}</div>
                        <div style={{ fontSize: '0.9rem', color: '#666' }}>
                          \${item.price} each
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          style={{ marginLeft: '0.5rem', color: 'red' }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  <div style={{ 
                    marginTop: '1rem', 
                    fontSize: '1.2rem', 
                    fontWeight: 'bold' 
                  }}>
                    Total: \${totalPrice.toFixed(2)}
                  </div>
                  <button style={{
                    width: '100%',
                    padding: '1rem',
                    marginTop: '1rem',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}>
                    Checkout
                  </button>
                </>
              )}
            </div>
          );
        }
        \`\`\`
        
        🏗️ **Avoiding Prop Drilling with Composition:**
        
        \`\`\`jsx
        // ❌ Prop drilling - passing props through many levels
        function App({ user }) {
          return <Layout user={user} />;
        }
        
        function Layout({ user }) {
          return (
            <div>
              <Header user={user} />
              <Main user={user} />
            </div>
          );
        }
        
        function Header({ user }) {
          return <UserMenu user={user} />;
        }
        
        function UserMenu({ user }) {
          return <div>Welcome, {user.name}!</div>;
        }
        
        // ✅ Component composition - avoiding unnecessary prop passing
        function App({ user }) {
          return (
            <Layout 
              header={<Header><UserMenu user={user} /></Header>}
              main={<Main />}
            />
          );
        }
        
        function Layout({ header, main }) {
          return (
            <div>
              {header}
              {main}
            </div>
          );
        }
        
        function Header({ children }) {
          return (
            <header style={{ padding: '1rem', backgroundColor: '#f5f5f5' }}>
              {children}
            </header>
          );
        }
        
        function UserMenu({ user }) {
          return <div>Welcome, {user.name}!</div>;
        }
        \`\`\`
      `,
      interactions: [
        "Diagram: Draw state lifting on whiteboard",
        "Live coding: Refactor components to lift state",
        "Exercise: Identify where state should live in a given component tree"
      ],
      commonQuestions: [
        "Q: How do I know where to lift state? A: Find the lowest common ancestor of all components that need the state",
        "Q: What if prop drilling gets too deep? A: Consider Context API, composition patterns, or state management libraries"
      ]
    },
    {
      title: "⚡ Advanced State Patterns & Performance",
      duration: "12 minutes",
      keyPoints: [
        "useReducer for complex state logic",
        "State normalization techniques",
        "Performance optimization with state",
        "Common state management pitfalls"
      ],
      script: `
        ⚡ **Advanced State Management Patterns**
        
        As your React applications grow, you'll need more sophisticated state management patterns. Let's explore advanced techniques.
        
        🔧 **useReducer for Complex State:**
        
        \`\`\`jsx
        // When useState becomes unwieldy, useReducer provides better structure
        const initialState = {
          todos: [],
          filter: 'all', // 'all', 'active', 'completed'
          loading: false,
          error: null
        };
        
        function todoReducer(state, action) {
          switch (action.type) {
            case 'ADD_TODO':
              return {
                ...state,
                todos: [
                  ...state.todos,
                  {
                    id: Date.now(),
                    text: action.payload.text,
                    completed: false,
                    createdAt: new Date()
                  }
                ]
              };
              
            case 'TOGGLE_TODO':
              return {
                ...state,
                todos: state.todos.map(todo =>
                  todo.id === action.payload.id
                    ? { ...todo, completed: !todo.completed }
                    : todo
                )
              };
              
            case 'DELETE_TODO':
              return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload.id)
              };
              
            case 'SET_FILTER':
              return {
                ...state,
                filter: action.payload.filter
              };
              
            case 'LOAD_TODOS_START':
              return {
                ...state,
                loading: true,
                error: null
              };
              
            case 'LOAD_TODOS_SUCCESS':
              return {
                ...state,
                loading: false,
                todos: action.payload.todos
              };
              
            case 'LOAD_TODOS_ERROR':
              return {
                ...state,
                loading: false,
                error: action.payload.error
              };
              
            default:
              return state;
          }
        }
        
        function TodoApp() {
          const [state, dispatch] = useReducer(todoReducer, initialState);
          
          const addTodo = (text) => {
            dispatch({ type: 'ADD_TODO', payload: { text } });
          };
          
          const toggleTodo = (id) => {
            dispatch({ type: 'TOGGLE_TODO', payload: { id } });
          };
          
          const deleteTodo = (id) => {
            dispatch({ type: 'DELETE_TODO', payload: { id } });
          };
          
          const setFilter = (filter) => {
            dispatch({ type: 'SET_FILTER', payload: { filter } });
          };
          
          const filteredTodos = useMemo(() => {
            switch (state.filter) {
              case 'active':
                return state.todos.filter(todo => !todo.completed);
              case 'completed':
                return state.todos.filter(todo => todo.completed);
              default:
                return state.todos;
            }
          }, [state.todos, state.filter]);
          
          return (
            <div>
              <TodoInput onAddTodo={addTodo} />
              <TodoFilters 
                currentFilter={state.filter} 
                onSetFilter={setFilter} 
              />
              <TodoList 
                todos={filteredTodos}
                onToggleTodo={toggleTodo}
                onDeleteTodo={deleteTodo}
              />
              {state.loading && <div>Loading todos...</div>}
              {state.error && <div>Error: {state.error}</div>}
            </div>
          );
        }
        \`\`\`
        
        📊 **State Normalization for Performance:**
        
        \`\`\`jsx
        // ❌ Nested state structure - hard to update efficiently
        const badState = {
          users: [
            {
              id: 1,
              name: 'Alice',
              posts: [
                { id: 101, title: 'Hello World', userId: 1 },
                { id: 102, title: 'React Tips', userId: 1 }
              ]
            },
            {
              id: 2,
              name: 'Bob',
              posts: [
                { id: 103, title: 'JavaScript Guide', userId: 2 }
              ]
            }
          ]
        };
        
        // ✅ Normalized state structure - efficient updates
        const normalizedState = {
          users: {
            byId: {
              1: { id: 1, name: 'Alice', postIds: [101, 102] },
              2: { id: 2, name: 'Bob', postIds: [103] }
            },
            allIds: [1, 2]
          },
          posts: {
            byId: {
              101: { id: 101, title: 'Hello World', userId: 1 },
              102: { id: 102, title: 'React Tips', userId: 1 },
              103: { id: 103, title: 'JavaScript Guide', userId: 2 }
            },
            allIds: [101, 102, 103]
          }
        };
        
        // Custom hook for normalized data management
        function useNormalizedState() {
          const [state, setState] = useState({
            entities: {},
            ids: []
          });
          
          const addEntity = useCallback((entity) => {
            setState(prev => ({
              entities: {
                ...prev.entities,
                [entity.id]: entity
              },
              ids: prev.ids.includes(entity.id) 
                ? prev.ids 
                : [...prev.ids, entity.id]
            }));
          }, []);
          
          const updateEntity = useCallback((id, updates) => {
            setState(prev => ({
              ...prev,
              entities: {
                ...prev.entities,
                [id]: {
                  ...prev.entities[id],
                  ...updates
                }
              }
            }));
          }, []);
          
          const removeEntity = useCallback((id) => {
            setState(prev => ({
              entities: Object.fromEntries(
                Object.entries(prev.entities).filter(([key]) => key !== id)
              ),
              ids: prev.ids.filter(entityId => entityId !== id)
            }));
          }, []);
          
          return {
            entities: state.entities,
            ids: state.ids,
            addEntity,
            updateEntity,
            removeEntity
          };
        }
        \`\`\`
        
        🚀 **Performance Optimization Patterns:**
        
        \`\`\`jsx
        // Optimizing expensive state calculations
        function DataDashboard({ rawData }) {
          // ✅ Memoize expensive calculations
          const processedData = useMemo(() => {
            console.log('Processing data...'); // Only runs when rawData changes
            
            return rawData
              .filter(item => item.isActive)
              .map(item => ({
                ...item,
                score: calculateComplexScore(item),
                category: categorizeItem(item)
              }))
              .sort((a, b) => b.score - a.score);
          }, [rawData]);
          
          const [sortField, setSortField] = useState('score');
          const [filterCategory, setFilterCategory] = useState('all');
          
          // ✅ Memoize filtered and sorted data
          const displayData = useMemo(() => {
            console.log('Filtering and sorting...'); // Only runs when dependencies change
            
            let filtered = processedData;
            if (filterCategory !== 'all') {
              filtered = filtered.filter(item => item.category === filterCategory);
            }
            
            return filtered.sort((a, b) => {
              if (sortField === 'name') {
                return a.name.localeCompare(b.name);
              }
              return b[sortField] - a[sortField];
            });
          }, [processedData, sortField, filterCategory]);
          
          // ✅ Memoize event handlers to prevent child re-renders
          const handleSort = useCallback((field) => {
            setSortField(field);
          }, []);
          
          const handleFilter = useCallback((category) => {
            setFilterCategory(category);
          }, []);
          
          return (
            <div>
              <DataControls 
                onSort={handleSort}
                onFilter={handleFilter}
                currentSort={sortField}
                currentFilter={filterCategory}
              />
              <DataTable data={displayData} />
            </div>
          );
        }
        
        // ✅ Memoized child component to prevent unnecessary re-renders
        const DataTable = React.memo(function DataTable({ data }) {
          console.log('Rendering DataTable'); // Only when data actually changes
          
          return (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Score</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {data.map(item => (
                  <DataRow key={item.id} item={item} />
                ))}
              </tbody>
            </table>
          );
        });
        
        const DataRow = React.memo(function DataRow({ item }) {
          return (
            <tr>
              <td>{item.name}</td>
              <td>{item.score}</td>
              <td>{item.category}</td>
            </tr>
          );
        });
        \`\`\`
      `,
      interactions: [
        "Performance demo: Show React DevTools Profiler",
        "Code challenge: Convert useState to useReducer",
        "Exercise: Optimize a slow component with memoization"
      ],
      commonQuestions: [
        "Q: When should I use useReducer instead of useState? A: When state logic is complex, involves multiple sub-values, or next state depends on previous state",
        "Q: Does normalizing state always improve performance? A: It improves update performance but can complicate data access - use when benefits outweigh complexity"
      ]
    },
    {
      title: "🎯 Best Practices and Common Pitfalls",
      duration: "8 minutes",
      keyPoints: [
        "State and props anti-patterns to avoid",
        "Testing components with state and props",
        "Debugging state-related issues",
        "Architecture decisions for scalable state"
      ],
      script: `
        🎯 **State & Props Best Practices**
        
        Let's wrap up with essential best practices and common mistakes to avoid when working with React state and props.
        
        ⚠️ **Common Pitfalls and Solutions:**
        
        \`\`\`jsx
        // ❌ PITFALL 1: Direct state mutation
        function BadTodoList() {
          const [todos, setTodos] = useState([]);
          
          const badAddTodo = (text) => {
            todos.push({ id: Date.now(), text }); // DON'T mutate directly!
            setTodos(todos); // React won't detect this change
          };
          
          const badToggleTodo = (id) => {
            const todo = todos.find(t => t.id === id);
            todo.completed = !todo.completed; // DON'T mutate objects!
            setTodos(todos);
          };
        }
        
        // ✅ SOLUTION: Always create new objects/arrays
        function GoodTodoList() {
          const [todos, setTodos] = useState([]);
          
          const addTodo = (text) => {
            setTodos(prevTodos => [
              ...prevTodos,
              { id: Date.now(), text, completed: false }
            ]);
          };
          
          const toggleTodo = (id) => {
            setTodos(prevTodos =>
              prevTodos.map(todo =>
                todo.id === id
                  ? { ...todo, completed: !todo.completed }
                  : todo
              )
            );
          };
        }
        
        // ❌ PITFALL 2: Stale closures in effects
        function BadTimer({ onTick }) {
          const [count, setCount] = useState(0);
          
          useEffect(() => {
            const interval = setInterval(() => {
              onTick(count); // Stale closure - always uses initial count (0)
              setCount(count + 1); // Stale closure
            }, 1000);
            
            return () => clearInterval(interval);
          }, []); // Empty deps cause stale closure
        }
        
        // ✅ SOLUTION: Use functional updates or proper dependencies
        function GoodTimer({ onTick }) {
          const [count, setCount] = useState(0);
          
          useEffect(() => {
            const interval = setInterval(() => {
              setCount(prevCount => {
                onTick(prevCount);
                return prevCount + 1;
              });
            }, 1000);
            
            return () => clearInterval(interval);
          }, [onTick]); // Include dependencies or use functional updates
        }
        
        // ❌ PITFALL 3: Prop drilling without considering alternatives
        function DeeplyNestedApp() {
          const [user, setUser] = useState(null);
          const [theme, setTheme] = useState('light');
          
          return (
            <Layout 
              user={user} 
              theme={theme}
              onThemeChange={setTheme}
            />
          );
        }
        
        function Layout({ user, theme, onThemeChange }) {
          return (
            <div>
              <Header user={user} theme={theme} onThemeChange={onThemeChange} />
              <Sidebar user={user} theme={theme} />
              <MainContent user={user} theme={theme} />
            </div>
          );
        }
        
        // ✅ SOLUTION: Use Context for widely-needed data
        const ThemeContext = createContext();
        const UserContext = createContext();
        
        function BetterApp() {
          const [user, setUser] = useState(null);
          const [theme, setTheme] = useState('light');
          
          return (
            <UserContext.Provider value={{ user, setUser }}>
              <ThemeContext.Provider value={{ theme, setTheme }}>
                <Layout />
              </ThemeContext.Provider>
            </UserContext.Provider>
          );
        }
        
        function Layout() {
          return (
            <div>
              <Header />
              <Sidebar />
              <MainContent />
            </div>
          );
        }
        
        function Header() {
          const { user } = useContext(UserContext);
          const { theme, setTheme } = useContext(ThemeContext);
          
          return (
            <header className={\`header theme-\${theme}\`}>
              <span>Welcome, {user?.name}</span>
              <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                Toggle Theme
              </button>
            </header>
          );
        }
        \`\`\`
        
        🧪 **Testing Components with State and Props:**
        
        \`\`\`jsx
        import { render, screen, fireEvent } from '@testing-library/react';
        import userEvent from '@testing-library/user-event';
        
        // Testing component with state
        function Counter() {
          const [count, setCount] = useState(0);
          
          return (
            <div>
              <span data-testid="count">Count: {count}</span>
              <button onClick={() => setCount(count + 1)}>
                Increment
              </button>
              <button onClick={() => setCount(count - 1)}>
                Decrement
              </button>
            </div>
          );
        }
        
        describe('Counter Component', () => {
          test('displays initial count of 0', () => {
            render(<Counter />);
            expect(screen.getByTestId('count')).toHaveTextContent('Count: 0');
          });
          
          test('increments count when increment button is clicked', async () => {
            const user = userEvent.setup();
            render(<Counter />);
            
            const incrementButton = screen.getByText('Increment');
            await user.click(incrementButton);
            
            expect(screen.getByTestId('count')).toHaveTextContent('Count: 1');
          });
          
          test('decrements count when decrement button is clicked', async () => {
            const user = userEvent.setup();
            render(<Counter />);
            
            const decrementButton = screen.getByText('Decrement');
            await user.click(decrementButton);
            
            expect(screen.getByTestId('count')).toHaveTextContent('Count: -1');
          });
        });
        
        // Testing component with props
        function UserCard({ user, onEdit, showEmail = true }) {
          return (
            <div data-testid="user-card">
              <h3>{user.name}</h3>
              {showEmail && <p>{user.email}</p>}
              <button onClick={() => onEdit(user.id)}>
                Edit Profile
              </button>
            </div>
          );
        }
        
        describe('UserCard Component', () => {
          const mockUser = {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com'
          };
          
          test('displays user information', () => {
            const mockOnEdit = jest.fn();
            
            render(<UserCard user={mockUser} onEdit={mockOnEdit} />);
            
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('john@example.com')).toBeInTheDocument();
          });
          
          test('hides email when showEmail is false', () => {
            const mockOnEdit = jest.fn();
            
            render(
              <UserCard 
                user={mockUser} 
                onEdit={mockOnEdit} 
                showEmail={false} 
              />
            );
            
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.queryByText('john@example.com')).not.toBeInTheDocument();
          });
          
          test('calls onEdit with user id when edit button is clicked', async () => {
            const user = userEvent.setup();
            const mockOnEdit = jest.fn();
            
            render(<UserCard user={mockUser} onEdit={mockOnEdit} />);
            
            const editButton = screen.getByText('Edit Profile');
            await user.click(editButton);
            
            expect(mockOnEdit).toHaveBeenCalledWith(1);
          });
        });
        \`\`\`
        
        🏗️ **Architecture Guidelines:**
        
        1. **Keep state as close to where it's used as possible**
        2. **Lift state up only when necessary for sharing**
        3. **Use Context for truly global state (user, theme, language)**
        4. **Consider useReducer for complex state logic**
        5. **Normalize state structure for performance-critical applications**
        6. **Use custom hooks to encapsulate state logic**
        7. **Test state changes, not implementation details**
      `,
      interactions: [
        "Code review: Identify and fix state anti-patterns",
        "Testing workshop: Write tests for stateful components",
        "Architecture discussion: Plan state management for a large app"
      ],
      commonQuestions: [
        "Q: How do I debug state issues? A: Use React DevTools, add console.logs in useEffect, and verify state updates are immutable",
        "Q: Should I use Redux for state management? A: Start with built-in React state management. Add Redux when complexity requires it."
      ]
    }
  ];

  const slideData = [
    {
      title: "🎯 State & Props Foundation",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      content: [
        "• Understanding React's Unidirectional Data Flow",
        "• State vs Props: Internal vs External Data",
        "• Immutability Principles in React",
        "• Component Communication Patterns"
      ]
    },
    {
      title: "🔧 useState Hook Mastery",
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      content: [
        "• Basic State Management Patterns",
        "• Complex State Objects and Arrays",
        "• Functional State Updates",
        "• State Initialization Strategies"
      ]
    },
    {
      title: "📡 Props Communication",
      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      content: [
        "• Props Passing Best Practices",
        "• Children Props and Composition",
        "• Callback Props for Upward Communication",
        "• Advanced Props Patterns"
      ]
    },
    {
      title: "⬆️ State Lifting Patterns",
      background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      content: [
        "• When and Why to Lift State Up",
        "• Finding Common Ancestor Components",
        "• Avoiding Prop Drilling",
        "• Component Composition Strategies"
      ]
    },
    {
      title: "⚡ Advanced State Management",
      background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      content: [
        "• useReducer for Complex Logic",
        "• State Normalization Techniques",
        "• Performance Optimization Patterns",
        "• Custom Hooks for State Logic"
      ]
    },
    {
      title: "🎯 Best Practices & Testing",
      background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      content: [
        "• Common Pitfalls and Solutions",
        "• Testing Components with State",
        "• Debugging State Issues",
        "• Scalable State Architecture"
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
              Lecture 3 • State & Props
            </div>
            <h1 style={{ margin: '0', fontSize: '2.5rem', fontWeight: '700' }}>
              React State & Props
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
              Lecture 3 • State & Props
            </div>
            <h1 style={{ margin: '0', fontSize: '2.5rem', fontWeight: '700' }}>
              React State & Props
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
              <h3 style={{ color: '#64ffda', marginBottom: '1rem' }}>🎯 What You'll Master</h3>
              <ul style={{ listStyle: 'none', padding: '0' }}>
                <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#64ffda', marginRight: '0.5rem' }}>▸</span>
                  useState hook patterns and best practices
                </li>
                <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#64ffda', marginRight: '0.5rem' }}>▸</span>
                  Props passing and component communication
                </li>
                <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#64ffda', marginRight: '0.5rem' }}>▸</span>
                  State lifting and data flow architecture
                </li>
                <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#64ffda', marginRight: '0.5rem' }}>▸</span>
                  Advanced state management with useReducer
                </li>
                <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#64ffda', marginRight: '0.5rem' }}>▸</span>
                  Performance optimization techniques
                </li>
                <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#64ffda', marginRight: '0.5rem' }}>▸</span>
                  Testing and debugging state-related issues
                </li>
              </ul>
            </div>
            
            <div>
              <h3 style={{ color: '#64ffda', marginBottom: '1rem' }}>⚡ Core Concepts</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['useState Hook', 'Props Passing', 'State Lifting', 'useReducer', 'Performance', 'Testing'].map(concept => (
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

        {/* React Data Flow Diagram */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '2rem',
          backdropFilter: 'blur(10px)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: '#64ffda', marginBottom: '1.5rem', fontSize: '1.8rem', textAlign: 'center' }}>
            🔄 React's Unidirectional Data Flow
          </h2>

          <div style={{
            background: 'linear-gradient(45deg, rgba(100, 255, 218, 0.1), rgba(100, 155, 255, 0.1))',
            borderRadius: '12px',
            padding: '2rem',
            marginBottom: '2rem',
            border: '1px solid rgba(100, 255, 218, 0.2)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              {/* Parent Component */}
              <div style={{
                background: 'rgba(100, 255, 218, 0.3)',
                border: '2px solid rgba(100, 255, 218, 0.5)',
                borderRadius: '12px',
                padding: '1rem 2rem',
                textAlign: 'center',
                minWidth: '200px'
              }}>
                <strong style={{ color: '#64ffda' }}>Parent Component</strong><br/>
                <small>[state, setState]</small>
              </div>

              {/* Flow arrows and labels */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: '#4ade80', fontSize: '1.5rem' }}>↓</div>
                  <small style={{ color: '#4ade80' }}>props</small>
                </div>
                <div style={{ textAlign: 'center', marginLeft: '2rem' }}>
                  <div style={{ color: '#f472b6', fontSize: '1.5rem' }}>↑</div>
                  <small style={{ color: '#f472b6' }}>callbacks</small>
                </div>
              </div>

              {/* Child Component */}
              <div style={{
                background: 'rgba(244, 114, 182, 0.3)',
                border: '2px solid rgba(244, 114, 182, 0.5)',
                borderRadius: '12px',
                padding: '1rem 2rem',
                textAlign: 'center',
                minWidth: '200px'
              }}>
                <strong style={{ color: '#f472b6' }}>Child Component</strong><br/>
                <small>receives props, triggers callbacks</small>
              </div>
            </div>

            <div style={{
              textAlign: 'center',
              marginTop: '1.5rem',
              padding: '1rem',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px'
            }}>
              <strong style={{ color: '#64ffda' }}>Key Principle:</strong><br/>
              Data flows DOWN through props • Events flow UP through callbacks
            </div>
          </div>
        </div>

        {/* useState Patterns */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '2rem',
          backdropFilter: 'blur(10px)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: '#64ffda', marginBottom: '1.5rem', fontSize: '1.8rem' }}>
            🔧 useState Hook Patterns
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
            <div>
              <h3 style={{ marginBottom: '1rem', color: '#4ade80' }}>✅ Correct State Updates</h3>
              <div style={{
                background: 'rgba(76, 175, 80, 0.1)',
                border: '1px solid rgba(76, 175, 80, 0.3)',
                borderRadius: '8px',
                padding: '1rem'
              }}>
                <pre style={{ margin: '0', fontSize: '0.85rem', color: '#a5f3fc', lineHeight: '1.4' }}>
{`// ✅ Immutable array updates
const [todos, setTodos] = useState([]);

// Add item
setTodos(prev => [...prev, newTodo]);

// Update item
setTodos(prev => 
  prev.map(todo => 
    todo.id === id 
      ? { ...todo, completed: !todo.completed }
      : todo
  )
);

// Remove item
setTodos(prev => 
  prev.filter(todo => todo.id !== id)
);`}
                </pre>
              </div>
            </div>

            <div>
              <h3 style={{ marginBottom: '1rem', color: '#ef4444' }}>❌ Common Mistakes</h3>
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '8px',
                padding: '1rem'
              }}>
                <pre style={{ margin: '0', fontSize: '0.85rem', color: '#fca5a5', lineHeight: '1.4' }}>
{`// ❌ Direct mutation (DON'T DO)
const [todos, setTodos] = useState([]);

// BAD: Mutating array directly
todos.push(newTodo);
setTodos(todos);

// BAD: Mutating object directly
todos[0].completed = true;
setTodos(todos);

// BAD: Using array methods that mutate
todos.sort();
setTodos(todos);`}
                </pre>
              </div>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(45deg, rgba(251, 191, 36, 0.1), rgba(245, 101, 101, 0.1))',
            borderRadius: '8px',
            padding: '1.5rem',
            border: '1px solid rgba(251, 191, 36, 0.2)'
          }}>
            <h4 style={{ color: '#fbbf24', marginBottom: '1rem' }}>🧠 Complex State Management Example</h4>
            <div style={{ overflowX: 'auto' }}>
              <pre style={{ margin: '0', fontSize: '0.85rem', color: '#a5f3fc', lineHeight: '1.4' }}>
{`function ShoppingCart() {
  const [cart, setCart] = useState({
    items: [],
    total: 0,
    discount: 0,
    shipping: { method: 'standard', cost: 5.99 }
  });

  const addItem = (product) => {
    setCart(prevCart => ({
      ...prevCart,
      items: [...prevCart.items, { ...product, quantity: 1 }],
      total: prevCart.total + product.price
    }));
  };

  const updateShipping = (method, cost) => {
    setCart(prevCart => ({
      ...prevCart,
      shipping: { method, cost }
    }));
  };

  return (
    <div>
      <p>Items: {cart.items.length}</p>
      <p>Total: $\{(cart.total + cart.shipping.cost).toFixed(2)}</p>
      <p>Shipping: {cart.shipping.method}</p>
    </div>
  );
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* State Lifting Visual */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '2rem',
          backdropFilter: 'blur(10px)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: '#64ffda', marginBottom: '1.5rem', fontSize: '1.8rem' }}>
            ⬆️ State Lifting Pattern
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'center' }}>
            <div>
              <h4 style={{ color: '#ef4444', marginBottom: '1rem' }}>❌ Before Lifting</h4>
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '8px',
                padding: '1.5rem',
                textAlign: 'center'
              }}>
                <div style={{
                  background: 'rgba(239, 68, 68, 0.2)',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  marginBottom: '1rem',
                  border: '1px solid rgba(239, 68, 68, 0.4)'
                }}>
                  Component A<br/>
                  <small>[duplicated state]</small>
                </div>
                <div style={{
                  background: 'rgba(239, 68, 68, 0.2)',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(239, 68, 68, 0.4)'
                }}>
                  Component B<br/>
                  <small>[duplicated state]</small>
                </div>
                <p style={{ fontSize: '0.9rem', marginTop: '1rem', color: '#ef4444' }}>
                  State is duplicated and can get out of sync
                </p>
              </div>
            </div>

            <div style={{ textAlign: 'center', color: '#64ffda', fontSize: '2rem' }}>
              →
            </div>

            <div>
              <h4 style={{ color: '#4ade80', marginBottom: '1rem' }}>✅ After Lifting</h4>
              <div style={{
                background: 'rgba(76, 175, 80, 0.1)',
                border: '1px solid rgba(76, 175, 80, 0.3)',
                borderRadius: '8px',
                padding: '1.5rem',
                textAlign: 'center'
              }}>
                <div style={{
                  background: 'rgba(100, 255, 218, 0.2)',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  marginBottom: '1rem',
                  border: '1px solid rgba(100, 255, 218, 0.4)'
                }}>
                  Parent Component<br/>
                  <small>[shared state]</small>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', gap: '0.5rem' }}>
                  <div style={{
                    background: 'rgba(76, 175, 80, 0.2)',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: '1px solid rgba(76, 175, 80, 0.4)',
                    flex: 1
                  }}>
                    Component A<br/>
                    <small>(receives props)</small>
                  </div>
                  <div style={{
                    background: 'rgba(76, 175, 80, 0.2)',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: '1px solid rgba(76, 175, 80, 0.4)',
                    flex: 1
                  }}>
                    Component B<br/>
                    <small>(receives props)</small>
                  </div>
                </div>
                <p style={{ fontSize: '0.9rem', marginTop: '1rem', color: '#4ade80' }}>
                  Single source of truth, always in sync
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Tips */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '2rem',
          backdropFilter: 'blur(10px)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: '#64ffda', marginBottom: '1.5rem', fontSize: '1.8rem' }}>
            ⚡ Performance Optimization Tips
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div style={{
              background: 'rgba(244, 114, 182, 0.1)',
              border: '1px solid rgba(244, 114, 182, 0.3)',
              borderRadius: '8px',
              padding: '1.5rem'
            }}>
              <h4 style={{ color: '#f472b6', marginBottom: '1rem' }}>🛡️ React.memo</h4>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                Prevents unnecessary re-renders when props haven't changed.
              </p>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '4px', fontSize: '0.85rem' }}>
{`const ExpensiveChild = React.memo(
  function ExpensiveChild({ data }) {
    return <div>{/* expensive rendering */}</div>;
  }
);`}
              </div>
            </div>

            <div style={{
              background: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              borderRadius: '8px',
              padding: '1.5rem'
            }}>
              <h4 style={{ color: '#fbbf24', marginBottom: '1rem' }}>🧠 useMemo</h4>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                Memoizes expensive calculations between renders.
              </p>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '4px', fontSize: '0.85rem' }}>
{`const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);`}
              </div>
            </div>

            <div style={{
              background: 'rgba(168, 85, 247, 0.1)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              borderRadius: '8px',
              padding: '1.5rem'
            }}>
              <h4 style={{ color: '#a855f7', marginBottom: '1rem' }}>🔗 useCallback</h4>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                Memoizes function references to prevent child re-renders.
              </p>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '4px', fontSize: '0.85rem' }}>
{`const handleClick = useCallback((id) => {
  setItems(prev => prev.filter(item => item.id !== id));
}, []);`}
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
            to="/lecture3/components"
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
            ← Components Deep Dive
          </Link>
          <Link 
            to="/lecture3/javascript-essentials"
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
            JavaScript Essentials →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StateAndProps;