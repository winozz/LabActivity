import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PresenterNotes from '../../components/PresenterNotes.jsx';
import PresentationMode from '../../components/PresentationMode.jsx';
import { getMobileStyles } from '../../utils/mobileStyles.js';

const StateManagement = () => {
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

  const stateManagementSections = {
    introduction: {
      title: "State Management Overview",
      icon: "🗂️",
      description: "Understanding different approaches to managing state in React applications.",
      importance: "As applications grow, proper state management becomes crucial for maintainability and performance.",
      concepts: [
        "Local component state with useState",
        "Lifting state up for shared data",
        "Context API for global state",
        "External state management libraries",
        "State normalization and organization"
      ],
      stateTypes: [
        {
          type: "Local State",
          description: "State that belongs to a single component",
          when: "Form inputs, toggles, component-specific data",
          tools: "useState, useReducer"
        },
        {
          type: "Shared State",
          description: "State that multiple components need to access",
          when: "Parent-child communication, sibling components",
          tools: "Lifting state up, props drilling"
        },
        {
          type: "Global State",
          description: "State that many components across the app need",
          when: "User authentication, themes, application settings",
          tools: "Context API, Redux, Zustand"
        },
        {
          type: "Remote State",
          description: "State that comes from external APIs",
          when: "Server data, caching, synchronization",
          tools: "React Query, SWR, Apollo Client"
        }
      ]
    },
    contextAPI: {
      title: "Context API",
      icon: "🔄",
      description: "React's built-in solution for sharing state across multiple components without prop drilling.",
      importance: "Context API eliminates the need to pass props through multiple component layers.",
      examples: [
        {
          name: "Basic Context Setup",
          description: "Creating and using a simple context",
          code: `import React, { createContext, useContext, useState } from 'react';

// 1. Create the context
const ThemeContext = createContext();

// 2. Create a provider component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  const value = {
    theme,
    toggleTheme
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Create a custom hook for using the context
export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

// 4. Usage in components
function App() {
  return (
    <ThemeProvider>
      <Header />
      <MainContent />
      <Footer />
    </ThemeProvider>
  );
}

function Header() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className={\`header \${theme}\`}>
      <h1>My App</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
    </header>
  );
}`
        },
        {
          name: "Authentication Context",
          description: "Managing user authentication state globally",
          code: `import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

// Auth reducer for complex state management
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        user: action.payload, 
        isAuthenticated: true 
      };
    case 'LOGIN_ERROR':
      return { 
        ...state, 
        loading: false, 
        error: action.payload, 
        isAuthenticated: false 
      };
    case 'LOGOUT':
      return { 
        loading: false, 
        user: null, 
        isAuthenticated: false, 
        error: null 
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  });
  
  // Check for existing session on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and restore user session
      verifyToken(token).then(user => {
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      }).catch(() => {
        localStorage.removeItem('token');
      });
    }
  }, []);
  
  const login = async (credentials) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const { user, token } = await loginAPI(credentials);
      localStorage.setItem('token', token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: error.message });
    }
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };
  
  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}`
        },
        {
          name: "Shopping Cart Context",
          description: "Managing shopping cart state across an e-commerce app",
          code: `import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
      
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
      
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
      
    case 'CLEAR_CART':
      return { ...state, items: [] };
      
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false
  });
  
  const addItem = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };
  
  const removeItem = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };
  
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
    }
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };
  
  // Computed values
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return (
    <CartContext.Provider value={{
      ...state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      toggleCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}`
        }
      ]
    },
    redux: {
      title: "Redux Toolkit",
      icon: "🏪",
      description: "The modern way to use Redux for predictable state management.",
      importance: "Redux provides a predictable state container for large applications with complex state interactions.",
      features: [
        "Single source of truth",
        "State is read-only",
        "Changes are made with pure functions",
        "Time-travel debugging",
        "Middleware support",
        "DevTools integration"
      ],
      setup: `# Install Redux Toolkit and React-Redux
npm install @reduxjs/toolkit react-redux

# Or with Yarn
yarn add @reduxjs/toolkit react-redux`,
      examples: [
        {
          name: "Store Setup",
          description: "Setting up the Redux store with Redux Toolkit",
          code: `// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import userReducer from './userSlice';
import todoReducer from './todoSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    todos: todoReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import TodoApp from './TodoApp';

function App() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
}`
        },
        {
          name: "Creating Slices",
          description: "Using createSlice for reducer logic",
          code: `// store/todoSlice.js
import { createSlice, nanoid } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    filter: 'all', // 'all', 'active', 'completed'
    loading: false
  },
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare: (text) => ({
        payload: {
          id: nanoid(),
          text,
          completed: false,
          createdAt: Date.now()
        }
      })
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find(item => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    editTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.items.find(item => item.id === id);
      if (todo) {
        todo.text = text;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearCompleted: (state) => {
      state.items = state.items.filter(item => !item.completed);
    }
  }
});

export const { 
  addTodo, 
  toggleTodo, 
  deleteTodo, 
  editTodo, 
  setFilter, 
  clearCompleted 
} = todoSlice.actions;

// Selectors
export const selectAllTodos = (state) => state.todos.items;
export const selectTodoById = (state, todoId) => 
  state.todos.items.find(todo => todo.id === todoId);
export const selectFilteredTodos = (state) => {
  const filter = state.todos.filter;
  const todos = state.todos.items;
  
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};

export default todoSlice.reducer;`
        },
        {
          name: "Using in Components",
          description: "Connecting React components to Redux state",
          code: `// components/TodoList.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectFilteredTodos, 
  toggleTodo, 
  deleteTodo,
  setFilter 
} from '../store/todoSlice';

function TodoList() {
  const todos = useSelector(selectFilteredTodos);
  const filter = useSelector(state => state.todos.filter);
  const dispatch = useDispatch();
  
  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };
  
  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };
  
  return (
    <div>
      {/* Filter buttons */}
      <div className="filters">
        {['all', 'active', 'completed'].map(filterType => (
          <button
            key={filterType}
            className={filter === filterType ? 'active' : ''}
            onClick={() => dispatch(setFilter(filterType))}
          >
            {filterType}
          </button>
        ))}
      </div>
      
      {/* Todo list */}
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => handleDelete(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// components/AddTodo.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/todoSlice';

function AddTodo() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}`
        }
      ]
    },
    zustand: {
      title: "Zustand",
      icon: "🐻",
      description: "A small, fast, and scalable bearbones state management solution.",
      importance: "Zustand provides a simpler alternative to Redux with less boilerplate and great TypeScript support.",
      features: [
        "Minimal boilerplate",
        "No providers needed",
        "TypeScript-first",
        "DevTools support",
        "Middleware ecosystem",
        "Small bundle size (~2.9kb)"
      ],
      installation: `# Install Zustand
npm install zustand

# Or with Yarn
yarn add zustand`,
      examples: [
        {
          name: "Basic Store",
          description: "Creating a simple counter store with Zustand",
          code: `import { create } from 'zustand';

// Define the store
const useCounterStore = create((set, get) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  
  // Computed values
  get isPositive() {
    return get().count > 0;
  },
  
  // Async actions
  incrementAsync: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    set((state) => ({ count: state.count + 1 }));
  }
}));

// Using in components
function Counter() {
  const { count, increment, decrement, reset, isPositive } = useCounterStore();
  
  return (
    <div>
      <h2>Count: {count}</h2>
      <p>Is positive: {isPositive ? 'Yes' : 'No'}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

// Subscribing to specific state
function CountDisplay() {
  const count = useCounterStore((state) => state.count);
  return <div>Current count: {count}</div>;
}`
        },
        {
          name: "Complex Store with Slices",
          description: "Organizing larger stores with slices pattern",
          code: `import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

// User slice
const createUserSlice = (set, get) => ({
  user: null,
  isAuthenticated: false,
  login: async (credentials) => {
    const user = await loginAPI(credentials);
    set({ user, isAuthenticated: true });
  },
  logout: () => set({ user: null, isAuthenticated: false }),
});

// Cart slice
const createCartSlice = (set, get) => ({
  items: [],
  addItem: (product) => set((state) => ({
    items: [...state.items, { ...product, quantity: 1 }]
  })),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
  getTotalPrice: () => {
    const items = get().items;
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }
});

// UI slice
const createUISlice = (set) => ({
  theme: 'light',
  sidebarOpen: false,
  toggleTheme: () => set((state) => ({
    theme: state.theme === 'light' ? 'dark' : 'light'
  })),
  toggleSidebar: () => set((state) => ({
    sidebarOpen: !state.sidebarOpen
  }))
});

// Combined store
const useAppStore = create(
  subscribeWithSelector((set, get) => ({
    ...createUserSlice(set, get),
    ...createCartSlice(set, get),
    ...createUISlice(set, get),
  }))
);

// Usage in components
function App() {
  const { theme, user, isAuthenticated } = useAppStore();
  
  return (
    <div className={\`app \${theme}\`}>
      {isAuthenticated ? (
        <Dashboard user={user} />
      ) : (
        <LoginForm />
      )}
    </div>
  );
}`
        },
        {
          name: "Persistence and Middleware",
          description: "Adding persistence and middleware to Zustand stores",
          code: `import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// Store with persistence and Immer
const useSettingsStore = create(
  persist(
    immer((set) => ({
      preferences: {
        theme: 'light',
        language: 'en',
        notifications: true
      },
      updatePreference: (key, value) => set((state) => {
        state.preferences[key] = value;
      }),
      resetPreferences: () => set((state) => {
        state.preferences = {
          theme: 'light',
          language: 'en',
          notifications: true
        };
      })
    })),
    {
      name: 'user-settings',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ preferences: state.preferences }),
    }
  )
);

// Custom middleware for logging
const logger = (config) => (set, get, api) =>
  config(
    (...args) => {
      console.log('State before:', get());
      set(...args);
      console.log('State after:', get());
    },
    get,
    api
  );

// Store with custom middleware
const useLoggedStore = create(
  logger((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
  }))
);`
        }
      ]
    },
    patterns: {
      title: "State Management Patterns",
      icon: "🎨",
      description: "Best practices and patterns for organizing and managing state effectively.",
      importance: "Following established patterns helps create maintainable and scalable applications.",
      patterns: [
        {
          name: "State Colocation",
          description: "Keep state as close to where it's used as possible",
          example: `// ❌ Avoid: Lifting state too high
function App() {
  const [userProfile, setUserProfile] = useState(null);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <UserProfile profile={userProfile} setProfile={setUserProfile} />
      <ShoppingCart cart={shoppingCart} setCart={setShoppingCart} />
    </div>
  );
}

// ✅ Better: Keep state local when possible
function App() {
  return (
    <div>
      <Header /> {/* Manages its own search state */}
      <UserProfile /> {/* Manages its own profile state */}
      <ShoppingCart /> {/* Manages its own cart state */}
    </div>
  );
}

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  // Search logic here
}`
        },
        {
          name: "State Normalization",
          description: "Structure state data efficiently to avoid duplication",
          example: `// ❌ Avoid: Nested, denormalized data
const state = {
  posts: [
    {
      id: 1,
      title: 'Post 1',
      author: { id: 1, name: 'John', email: 'john@example.com' },
      comments: [
        { id: 1, text: 'Great post!', author: { id: 2, name: 'Jane' } },
        { id: 2, text: 'Thanks!', author: { id: 1, name: 'John' } }
      ]
    }
  ]
};

// ✅ Better: Normalized state structure
const state = {
  entities: {
    users: {
      1: { id: 1, name: 'John', email: 'john@example.com' },
      2: { id: 2, name: 'Jane', email: 'jane@example.com' }
    },
    posts: {
      1: { id: 1, title: 'Post 1', authorId: 1, commentIds: [1, 2] }
    },
    comments: {
      1: { id: 1, text: 'Great post!', authorId: 2, postId: 1 },
      2: { id: 2, text: 'Thanks!', authorId: 1, postId: 1 }
    }
  }
};`
        },
        {
          name: "Optimistic Updates",
          description: "Update UI immediately while waiting for server confirmation",
          example: `function useTodos() {
  const [todos, setTodos] = useState([]);
  
  const addTodo = async (text) => {
    // Optimistic update
    const optimisticTodo = {
      id: Date.now(), // Temporary ID
      text,
      completed: false,
      pending: true
    };
    
    setTodos(prev => [...prev, optimisticTodo]);
    
    try {
      // Server request
      const newTodo = await api.createTodo({ text });
      
      // Replace optimistic todo with server response
      setTodos(prev => 
        prev.map(todo => 
          todo.id === optimisticTodo.id ? newTodo : todo
        )
      );
    } catch (error) {
      // Rollback on error
      setTodos(prev => 
        prev.filter(todo => todo.id !== optimisticTodo.id)
      );
      toast.error('Failed to add todo');
    }
  };
  
  return { todos, addTodo };
}`
        },
        {
          name: "Command Pattern",
          description: "Encapsulate actions as objects for undo/redo functionality",
          example: `class Command {
  execute() {
    throw new Error('Execute method must be implemented');
  }
  
  undo() {
    throw new Error('Undo method must be implemented');
  }
}

class AddTodoCommand extends Command {
  constructor(todoStore, text) {
    super();
    this.todoStore = todoStore;
    this.text = text;
    this.todoId = null;
  }
  
  execute() {
    this.todoId = this.todoStore.addTodo(this.text);
  }
  
  undo() {
    this.todoStore.removeTodo(this.todoId);
  }
}

class CommandManager {
  constructor() {
    this.history = [];
    this.currentIndex = -1;
  }
  
  execute(command) {
    // Remove any commands after current index
    this.history = this.history.slice(0, this.currentIndex + 1);
    
    // Execute and add to history
    command.execute();
    this.history.push(command);
    this.currentIndex++;
  }
  
  undo() {
    if (this.currentIndex >= 0) {
      const command = this.history[this.currentIndex];
      command.undo();
      this.currentIndex--;
    }
  }
  
  redo() {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      const command = this.history[this.currentIndex];
      command.execute();
    }
  }
}`
        }
      ]
    }
  };

  // Show presentation mode if requested
  if (showPresentation) {
    return (
      <PresentationMode
        slides={stateSlides}
        lessonTitle="State Management in React"
        presenterNotes={statePresenterNotes}
        onExit={() => setShowPresentation(false)}
      />
    );
  }

  return (
    <div style={{
      ...styles.container,
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
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
              Lecture 3 Part 2 • State Management
            </div>
            <h1 style={styles.title}>
              State Management in React
            </h1>
            <p style={styles.subtitle}>
              Master different approaches to managing state in React applications
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
          {Object.entries(stateManagementSections).map(([key, section]) => (
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
              {stateManagementSections[activeSection].icon}
            </span>
            <div style={{ flex: 1 }}>
              <h2 style={styles.sectionTitle}>
                {stateManagementSections[activeSection].title}
              </h2>
              <p style={styles.sectionDescription}>
                {stateManagementSections[activeSection].description}
              </p>
              <div style={styles.infoBox}>
                <strong>Why it matters:</strong> {stateManagementSections[activeSection].importance}
              </div>
            </div>
          </div>

          {/* Section-specific content */}
          {activeSection === 'introduction' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* State Types Overview */}
              <div>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.3rem' }}>Types of State:</h3>
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: styles.container.padding === '1rem' ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1rem'
                }}>
                  {stateManagementSections[activeSection].stateTypes.map((type, idx) => (
                    <div key={idx} style={{
                      background: 'rgba(0,0,0,0.1)',
                      padding: '1.5rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#fff' }}>
                        {type.type}
                      </h4>
                      <p style={{ margin: '0 0 0.75rem 0', opacity: '0.9', fontSize: '0.9rem' }}>
                        {type.description}
                      </p>
                      <div style={{ 
                        background: 'rgba(255,255,255,0.1)', 
                        padding: '0.5rem', 
                        borderRadius: '4px',
                        marginBottom: '0.5rem',
                        fontSize: '0.85rem'
                      }}>
                        <strong>When to use:</strong> {type.when}
                      </div>
                      <div style={{ 
                        background: 'rgba(100,200,255,0.2)', 
                        padding: '0.5rem', 
                        borderRadius: '4px',
                        fontSize: '0.85rem'
                      }}>
                        <strong>Tools:</strong> {type.tools}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'contextAPI' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {stateManagementSections[activeSection].examples.map((example, idx) => (
                <div key={idx} style={styles.exampleContainer}>
                  <div style={styles.exampleHeader}>
                    <h3 style={styles.exampleTitle}>{example.name}</h3>
                    <button
                      onClick={() => toggleCode(`context-${idx}`)}
                      style={styles.toggleButton(showCode[`context-${idx}`])}
                    >
                      {showCode[`context-${idx}`] ? 'Hide Code' : 'Show Code'}
                    </button>
                  </div>
                  <p style={{ margin: '0 0 1rem 0', opacity: '0.9' }}>{example.description}</p>
                  {showCode[`context-${idx}`] && (
                    <pre style={styles.codeBlock}>
                      <code>{example.code}</code>
                    </pre>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeSection === 'redux' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Features Overview */}
              <div>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.3rem' }}>Redux Principles:</h3>
                <ul style={{ listStyle: 'none', padding: '0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {stateManagementSections[activeSection].features.map((feature, idx) => (
                    <li key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.5rem',
                      background: 'rgba(0,0,0,0.1)',
                      borderRadius: '6px'
                    }}>
                      <span style={{
                        background: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        flexShrink: 0
                      }}>
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Installation */}
              <div style={styles.exampleContainer}>
                <div style={styles.exampleHeader}>
                  <h3 style={styles.exampleTitle}>Installation</h3>
                </div>
                <pre style={styles.codeBlock}>
                  <code>{stateManagementSections[activeSection].setup}</code>
                </pre>
              </div>

              {/* Examples */}
              {stateManagementSections[activeSection].examples.map((example, idx) => (
                <div key={idx} style={styles.exampleContainer}>
                  <div style={styles.exampleHeader}>
                    <h3 style={styles.exampleTitle}>{example.name}</h3>
                    <button
                      onClick={() => toggleCode(`redux-${idx}`)}
                      style={styles.toggleButton(showCode[`redux-${idx}`])}
                    >
                      {showCode[`redux-${idx}`] ? 'Hide Code' : 'Show Code'}
                    </button>
                  </div>
                  <p style={{ margin: '0 0 1rem 0', opacity: '0.9' }}>{example.description}</p>
                  {showCode[`redux-${idx}`] && (
                    <pre style={styles.codeBlock}>
                      <code>{example.code}</code>
                    </pre>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeSection === 'zustand' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Features Overview */}
              <div>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.3rem' }}>Zustand Features:</h3>
                <ul style={{ listStyle: 'none', padding: '0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {stateManagementSections[activeSection].features.map((feature, idx) => (
                    <li key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.5rem',
                      background: 'rgba(0,0,0,0.1)',
                      borderRadius: '6px'
                    }}>
                      <span style={{
                        background: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        flexShrink: 0
                      }}>
                        🐻
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Installation */}
              <div style={styles.exampleContainer}>
                <div style={styles.exampleHeader}>
                  <h3 style={styles.exampleTitle}>Installation</h3>
                </div>
                <pre style={styles.codeBlock}>
                  <code>{stateManagementSections[activeSection].installation}</code>
                </pre>
              </div>

              {/* Examples */}
              {stateManagementSections[activeSection].examples.map((example, idx) => (
                <div key={idx} style={styles.exampleContainer}>
                  <div style={styles.exampleHeader}>
                    <h3 style={styles.exampleTitle}>{example.name}</h3>
                    <button
                      onClick={() => toggleCode(`zustand-${idx}`)}
                      style={styles.toggleButton(showCode[`zustand-${idx}`])}
                    >
                      {showCode[`zustand-${idx}`] ? 'Hide Code' : 'Show Code'}
                    </button>
                  </div>
                  <p style={{ margin: '0 0 1rem 0', opacity: '0.9' }}>{example.description}</p>
                  {showCode[`zustand-${idx}`] && (
                    <pre style={styles.codeBlock}>
                      <code>{example.code}</code>
                    </pre>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeSection === 'patterns' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {stateManagementSections[activeSection].patterns.map((pattern, idx) => (
                <div key={idx} style={styles.exampleContainer}>
                  <div style={styles.exampleHeader}>
                    <h3 style={styles.exampleTitle}>{pattern.name}</h3>
                    <button
                      onClick={() => toggleCode(`pattern-${idx}`)}
                      style={styles.toggleButton(showCode[`pattern-${idx}`])}
                    >
                      {showCode[`pattern-${idx}`] ? 'Hide Code' : 'Show Code'}
                    </button>
                  </div>
                  <p style={{ margin: '0 0 1rem 0', opacity: '0.9' }}>{pattern.description}</p>
                  {showCode[`pattern-${idx}`] && (
                    <pre style={styles.codeBlock}>
                      <code>{pattern.example}</code>
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
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'rgba(0,0,0,0.1)',
          borderRadius: '8px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>🎉 Congratulations!</h3>
            <p style={{ margin: '0', opacity: '0.8' }}>
              You've completed the React fundamentals course. You're now ready to build powerful React applications!
            </p>
          </div>
        </div>
      </div>
      
      <PresenterNotes 
        notes={statePresenterNotes} 
        lessonTitle="State Management in React" 
      />
    </div>
  );
};

// Presenter notes for State Management
const statePresenterNotes = [
  {
    section: "State Management Overview",
    duration: "10-12 minutes",
    keyPoints: [
      "Different types of state require different solutions",
      "Start simple and add complexity as needed",
      "Consider the component tree and data flow",
      "Performance implications of state management choices"
    ],
    script: `State management is one of the most critical aspects of React development, and it's also where many developers get overwhelmed. The key is understanding that not all state is created equal.

We have local state that belongs to a single component, shared state that multiple components need, global state that the entire app uses, and remote state that comes from servers. Each type has its own best practices and tools.

The golden rule is to start simple. Use local state with useState when possible, lift state up when you need to share it, and only reach for global state management when you truly need it across many components.`,
    interactions: [
      {
        type: "Survey",
        description: "Ask students about their experience with state management complexity"
      },
      {
        type: "Diagram",
        description: "Draw the component tree and show different state placement strategies"
      }
    ]
  },
  {
    section: "Context API",
    duration: "15-18 minutes",
    keyPoints: [
      "Built into React, no external dependencies",
      "Perfect for theming, authentication, and app-wide settings",
      "Avoid overuse - not everything needs to be global",
      "Custom hooks make context easier to use"
    ],
    script: `Context API is React's built-in solution for avoiding prop drilling. It's perfect for data that truly needs to be global - like user authentication, themes, or language settings.

The key insight is that Context isn't just about passing data down - it's about creating a clean API for your application state. Custom hooks like useAuth or useTheme make your components cleaner and your context more maintainable.

However, remember that Context can cause unnecessary re-renders if not used carefully. Every component that consumes a context will re-render when that context value changes.`,
    interactions: [
      {
        type: "Live Coding",
        description: "Build a theme context together, showing provider setup and consumption"
      },
      {
        type: "Best Practices",
        description: "Discuss when to use Context vs prop drilling vs global state"
      }
    ]
  },
  {
    section: "Redux Toolkit",
    duration: "20-25 minutes",
    keyPoints: [
      "Redux Toolkit is the modern way to use Redux",
      "Predictable state updates with immutable patterns",
      "Excellent DevTools for debugging",
      "Great for complex applications with lots of state interactions"
    ],
    script: `Redux has evolved significantly, and Redux Toolkit is now the recommended way to use Redux. It eliminates most of the boilerplate that gave Redux a bad reputation while keeping all the benefits.

The core principles remain the same: single source of truth, state is read-only, and changes happen through pure functions. But Redux Toolkit makes it much more pleasant to work with.

Redux shines in large applications where you have complex state interactions, need time-travel debugging, or want predictable state management patterns that scale well across large teams.`,
    interactions: [
      {
        type: "Code Walkthrough",
        description: "Walk through the todo slice example, explaining createSlice and selectors"
      },
      {
        type: "DevTools Demo",
        description: "Show Redux DevTools and time-travel debugging"
      }
    ]
  }
];

// Slide data for presentation mode
const stateSlides = [
  {
    title: "State Management in React",
    subtitle: "Building Scalable Applications with Proper State Architecture",
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  {
    title: "🗂️ Types of State",
    bullets: [
      "Local State - Single component (useState, useReducer)",
      "Shared State - Multiple components (lifting state up)",
      "Global State - App-wide (Context API, Redux, Zustand)",
      "Remote State - Server data (React Query, SWR)"
    ],
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  },
  {
    title: "🔄 Context API",
    bullets: [
      "Built into React - no external dependencies",
      "Perfect for themes, auth, and global settings",
      "Custom hooks improve developer experience",
      "Be mindful of performance implications"
    ],
    background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
  },
  {
    title: "🏪 Redux Toolkit",
    bullets: [
      "Modern Redux with minimal boilerplate",
      "Predictable state management",
      "Excellent debugging with DevTools",
      "Great for complex, large-scale applications"
    ],
    background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
  },
  {
    title: "🐻 Zustand",
    bullets: [
      "Minimal boilerplate, maximum flexibility",
      "No providers needed",
      "Excellent TypeScript support",
      "Small bundle size (~2.9kb)"
    ],
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
  },
  {
    title: "🎨 Best Practices",
    bullets: [
      "Start simple with local state",
      "Colocate state close to where it's used",
      "Normalize complex state structures",
      "Use appropriate tools for your use case"
    ],
    background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
  }
];

export default StateManagement;