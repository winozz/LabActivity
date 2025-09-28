import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PresenterNotes from '../../components/PresenterNotes.jsx';

const JavaScriptEssentials = () => {
  const [activeSection, setActiveSection] = useState('destructuring');
  const [showOutput, setShowOutput] = useState({});

  const toggleOutput = (sectionId) => {
    setShowOutput(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const jsTopics = {
    destructuring: {
      title: "Destructuring Assignment",
      icon: "📦",
      description: "Extract values from arrays or properties from objects into distinct variables.",
      importance: "Essential for working with props and state in React components.",
      examples: [
        {
          title: "Array Destructuring",
          code: `// Array destructuring
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;

console.log(first);  // 1
console.log(second); // 2
console.log(rest);   // [3, 4, 5]

// Common in React hooks
const [count, setCount] = useState(0);`,
          output: `1
2
[3, 4, 5]`,
          reactExample: `// In React component
function Counter() {
  const [count, setCount] = useState(0);
  return <div>Count: {count}</div>;
}`
        },
        {
          title: "Object Destructuring",
          code: `// Object destructuring
const user = {
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
  city: 'New York'
};

const { name, email, ...otherInfo } = user;
console.log(name);      // 'John Doe'
console.log(email);     // 'john@example.com'
console.log(otherInfo); // { age: 30, city: 'New York' }

// With different variable names
const { name: fullName, age: userAge } = user;
console.log(fullName);  // 'John Doe'
console.log(userAge);   // 30`,
          output: `'John Doe'
'john@example.com'
{ age: 30, city: 'New York' }
'John Doe'
30`,
          reactExample: `// In React component
function UserCard({ user }) {
  const { name, email, age } = user;
  return (
    <div>
      <h3>{name}</h3>
      <p>{email}</p>
      <p>Age: {age}</p>
    </div>
  );
}`
        }
      ]
    },
    arrowFunctions: {
      title: "Arrow Functions",
      icon: "🏹",
      description: "A concise way to write functions with lexical this binding.",
      importance: "Commonly used in React for event handlers and inline functions.",
      examples: [
        {
          title: "Basic Arrow Functions",
          code: `// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// With single parameter (parentheses optional)
const double = x => x * 2;

// With no parameters
const greet = () => 'Hello World!';

// With block body
const processData = (data) => {
  const processed = data.map(item => item * 2);
  return processed.filter(item => item > 10);
};

console.log(add(5, 3));        // 8
console.log(double(4));        // 8
console.log(greet());          // 'Hello World!'
console.log(processData([2, 6, 8, 3])); // [12, 16]`,
          output: `8
8
'Hello World!'
[12, 16]`,
          reactExample: `// In React component
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}`
        },
        {
          title: "Arrow Functions vs Regular Functions",
          code: `// Regular function - 'this' depends on how it's called
function RegularFunction() {
  this.value = 42;
  
  setTimeout(function() {
    console.log(this.value); // undefined (this refers to global object)
  }, 1000);
}

// Arrow function - 'this' is lexically bound
function ArrowFunction() {
  this.value = 42;
  
  setTimeout(() => {
    console.log(this.value); // 42 (this refers to ArrowFunction instance)
  }, 1000);
}`,
          reactExample: `// In React component
class MyComponent extends React.Component {
  state = { count: 0 };

  // Arrow function maintains 'this' context
  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return <button onClick={this.handleClick}>Count: {this.state.count}</button>;
  }
}`
        }
      ]
    },
    spreadRest: {
      title: "Spread & Rest Operators",
      icon: "🌊",
      description: "The ... operator for expanding iterables (spread) or collecting arguments (rest).",
      importance: "Critical for immutable updates in React state management.",
      examples: [
        {
          title: "Spread Operator with Arrays",
          code: `// Spread operator with arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Combining arrays
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Adding elements
const withNew = [...arr1, 7, 8];
console.log(withNew); // [1, 2, 3, 7, 8]

// Copying arrays (shallow copy)
const copy = [...arr1];
console.log(copy); // [1, 2, 3]
console.log(copy === arr1); // false (different array objects)`,
          output: `[1, 2, 3, 4, 5, 6]
[1, 2, 3, 7, 8]
[1, 2, 3]
false`,
          reactExample: `// In React state updates
const [items, setItems] = useState([1, 2, 3]);

// Adding item to array
const addItem = (newItem) => {
  setItems([...items, newItem]); // Creates new array
};

// Removing item from array
const removeItem = (index) => {
  setItems([
    ...items.slice(0, index),
    ...items.slice(index + 1)
  ]);
};`
        },
        {
          title: "Spread Operator with Objects",
          code: `// Spread operator with objects
const user = { name: 'John', age: 30 };
const address = { city: 'New York', country: 'USA' };

// Combining objects
const fullProfile = { ...user, ...address };
console.log(fullProfile);
// { name: 'John', age: 30, city: 'New York', country: 'USA' }

// Updating object properties
const updatedUser = { ...user, age: 31, email: 'john@example.com' };
console.log(updatedUser);
// { name: 'John', age: 31, email: 'john@example.com' }

// Override properties
const override = { ...user, name: 'Jane' };
console.log(override); // { name: 'Jane', age: 30 }`,
          output: `{ name: 'John', age: 30, city: 'New York', country: 'USA' }
{ name: 'John', age: 31, email: 'john@example.com' }
{ name: 'Jane', age: 30 }`,
          reactExample: `// In React state updates
const [user, setUser] = useState({ name: 'John', age: 30 });

// Updating user property
const updateAge = (newAge) => {
  setUser({ ...user, age: newAge }); // Creates new object
};

// Adding new property
const addEmail = (email) => {
  setUser({ ...user, email }); // Same as { ...user, email: email }
};`
        }
      ]
    },
    arrayMethods: {
      title: "Array Methods",
      icon: "🔄",
      description: "Higher-order functions for working with arrays: map, filter, reduce, forEach.",
      importance: "Essential for rendering lists and transforming data in React.",
      examples: [
        {
          title: "map() - Transform Elements",
          code: `// map() creates a new array by transforming each element
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const users = [
  { id: 1, name: 'John', age: 25 },
  { id: 2, name: 'Jane', age: 30 },
  { id: 3, name: 'Bob', age: 35 }
];

const userNames = users.map(user => user.name);
console.log(userNames); // ['John', 'Jane', 'Bob']

const userCards = users.map(user => ({
  ...user,
  isAdult: user.age >= 18,
  displayName: \`\${user.name} (Age: \${user.age})\`
}));
console.log(userCards);`,
          output: `[2, 4, 6, 8, 10]
['John', 'Jane', 'Bob']
[
  { id: 1, name: 'John', age: 25, isAdult: true, displayName: 'John (Age: 25)' },
  { id: 2, name: 'Jane', age: 30, isAdult: true, displayName: 'Jane (Age: 30)' },
  { id: 3, name: 'Bob', age: 35, isAdult: true, displayName: 'Bob (Age: 35)' }
]`,
          reactExample: `// In React component
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name} - Age: {user.age}
        </li>
      ))}
    </ul>
  );
}`
        },
        {
          title: "filter() & reduce()",
          code: `const products = [
  { id: 1, name: 'Laptop', price: 1000, category: 'Electronics' },
  { id: 2, name: 'Book', price: 20, category: 'Education' },
  { id: 3, name: 'Phone', price: 800, category: 'Electronics' },
  { id: 4, name: 'Pen', price: 5, category: 'Education' }
];

// filter() creates a new array with elements that pass a test
const electronics = products.filter(product => product.category === 'Electronics');
console.log(electronics);

const expensive = products.filter(product => product.price > 100);
console.log('Expensive items:', expensive.length);

// reduce() reduces array to a single value
const totalValue = products.reduce((sum, product) => sum + product.price, 0);
console.log('Total value:', totalValue);

const categories = products.reduce((acc, product) => {
  if (!acc[product.category]) {
    acc[product.category] = [];
  }
  acc[product.category].push(product);
  return acc;
}, {});
console.log('Grouped by category:', categories);`,
          output: `[{ id: 1, name: 'Laptop', price: 1000, category: 'Electronics' }, { id: 3, name: 'Phone', price: 800, category: 'Electronics' }]
Expensive items: 2
Total value: 1825
Grouped by category: { Electronics: [...], Education: [...] }`,
          reactExample: `// In React component
function ProductList({ products, category }) {
  const filteredProducts = products
    .filter(product => !category || product.category === category)
    .map(product => (
      <div key={product.id}>
        <h3>{product.name}</h3>
        <p>\${product.price}</p>
      </div>
    ));

  return <div>{filteredProducts}</div>;
}`
        }
      ]
    },
    templateLiterals: {
      title: "Template Literals",
      icon: "📝",
      description: "String literals allowing embedded expressions using backticks.",
      importance: "Useful for dynamic content and multi-line strings in React.",
      examples: [
        {
          title: "Basic Template Literals",
          code: `// Template literals with backticks
const name = 'John';
const age = 30;

// String interpolation
const greeting = \`Hello, my name is \${name} and I am \${age} years old.\`;
console.log(greeting);

// Multi-line strings
const multiLine = \`
  This is a multi-line
  string that preserves
  line breaks and spacing.
\`;
console.log(multiLine);

// Expressions inside template literals
const a = 5;
const b = 3;
const math = \`\${a} + \${b} = \${a + b}\`;
console.log(math);

// Function calls inside template literals
const getStatus = (user) => user.isActive ? 'Active' : 'Inactive';
const user = { name: 'Alice', isActive: true };
const status = \`User \${user.name} is \${getStatus(user)}\`;
console.log(status);`,
          output: `Hello, my name is John and I am 30 years old.

  This is a multi-line
  string that preserves
  line breaks and spacing.

5 + 3 = 8
User Alice is Active`,
          reactExample: `// In React component
function UserProfile({ user }) {
  const profileClass = \`user-profile \${user.isPremium ? 'premium' : 'basic'}\`;
  
  return (
    <div className={profileClass}>
      <h2>Welcome, {user.name}!</h2>
      <p>{\`You have \${user.credits} credits remaining.\`}</p>
    </div>
  );
}`
        }
      ]
    },
    conditionalOperator: {
      title: "Conditional (Ternary) Operator",
      icon: "❓",
      description: "A shorthand for if-else statements: condition ? trueValue : falseValue",
      importance: "Frequently used for conditional rendering in React JSX.",
      examples: [
        {
          title: "Basic Ternary Operator",
          code: `// Basic ternary operator
const age = 20;
const status = age >= 18 ? 'adult' : 'minor';
console.log(status); // 'adult'

// Nested ternary (use sparingly)
const score = 85;
const grade = score >= 90 ? 'A' : 
              score >= 80 ? 'B' : 
              score >= 70 ? 'C' : 'F';
console.log(grade); // 'B'

// With functions
const user = { name: 'John', isLoggedIn: true };
const greeting = user.isLoggedIn ? 
  \`Welcome back, \${user.name}!\` : 
  'Please log in';
console.log(greeting);

// Alternative to if-else
const getDiscount = (isPremium) => {
  return isPremium ? 0.2 : 0.1;
};
console.log('Premium discount:', getDiscount(true));   // 0.2
console.log('Regular discount:', getDiscount(false));  // 0.1`,
          output: `adult
B
Welcome back, John!
Premium discount: 0.2
Regular discount: 0.1`,
          reactExample: `// In React component
function LoginButton({ isLoggedIn, user }) {
  return (
    <div>
      {isLoggedIn ? (
        <button>Welcome, {user.name}</button>
      ) : (
        <button>Please Log In</button>
      )}
    </div>
  );
}`
        },
        {
          title: "Short-circuit Evaluation",
          code: `// Logical AND (&&) - short-circuit evaluation
const user = { name: 'John', notifications: 3 };

// Only renders if condition is true
const notificationBadge = user.notifications > 0 && \`\${user.notifications} new\`;
console.log(notificationBadge); // '3 new'

const noNotifications = 0 && 'No notifications';
console.log(noNotifications); // 0 (falsy value)

// Logical OR (||) - default values
const defaultName = '' || 'Anonymous';
console.log(defaultName); // 'Anonymous'

const username = 'John' || 'Guest';
console.log(username); // 'John'

// Nullish coalescing (??) - only null or undefined
const value1 = 0 ?? 'default';     // 0
const value2 = null ?? 'default';  // 'default'
const value3 = '' ?? 'default';    // ''

console.log(value1, value2, value3);`,
          output: `3 new
0
Anonymous
John
0 default`,
          reactExample: `// In React component
function NotificationBadge({ count }) {
  return (
    <div>
      {count > 0 && (
        <span className="badge">{count}</span>
      )}
    </div>
  );
}

function UserGreeting({ user }) {
  return <h1>Hello, {user?.name || 'Guest'}!</h1>;
}`
        }
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
              Lecture 3 • JavaScript Essentials
            </div>
            <h1 style={{ margin: '0', fontSize: '2.5rem', fontWeight: '700' }}>
              Essential JavaScript for React
            </h1>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '1.1rem', opacity: '0.9' }}>
              Master these JavaScript concepts to become proficient in React
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

        {/* Navigation */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          {Object.entries(jsTopics).map(([key, topic]) => (
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
              <span style={{ fontSize: '1.1rem' }}>{topic.icon}</span>
              {topic.title}
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
          {/* Topic Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <span style={{ fontSize: '3rem' }}>
              {jsTopics[activeSection].icon}
            </span>
            <div>
              <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem' }}>
                {jsTopics[activeSection].title}
              </h2>
              <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', opacity: '0.9' }}>
                {jsTopics[activeSection].description}
              </p>
              <div style={{
                background: 'rgba(255,200,100,0.2)',
                padding: '0.75rem',
                borderRadius: '6px',
                borderLeft: '4px solid rgba(255,200,100,0.6)',
                fontSize: '0.95rem'
              }}>
                <strong>Why it matters in React:</strong> {jsTopics[activeSection].importance}
              </div>
            </div>
          </div>

          {/* Examples */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {jsTopics[activeSection].examples.map((example, idx) => (
              <div key={idx} style={{
                background: 'rgba(0,0,0,0.1)',
                borderRadius: '8px',
                padding: '1.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <h3 style={{ margin: '0', fontSize: '1.4rem' }}>
                    {example.title}
                  </h3>
                  <button
                    onClick={() => toggleOutput(`${activeSection}-${idx}`)}
                    style={{
                      background: showOutput[`${activeSection}-${idx}`] ? 'rgba(255,100,100,0.8)' : 'rgba(100,255,100,0.8)',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: '500'
                    }}
                  >
                    {showOutput[`${activeSection}-${idx}`] ? 'Hide Output' : 'Show Output'}
                  </button>
                </div>

                {/* JavaScript Code */}
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', opacity: '0.9' }}>
                    JavaScript Code:
                  </h4>
                  <pre style={{
                    background: 'rgba(0,0,0,0.3)',
                    padding: '1.5rem',
                    borderRadius: '6px',
                    overflow: 'auto',
                    fontSize: '0.85rem',
                    lineHeight: '1.4',
                    margin: '0'
                  }}>
                    <code>{example.code}</code>
                  </pre>
                </div>

                {/* Output */}
                {showOutput[`${activeSection}-${idx}`] && example.output && (
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', opacity: '0.9' }}>
                      Console Output:
                    </h4>
                    <pre style={{
                      background: 'rgba(0,100,0,0.2)',
                      padding: '1rem',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      lineHeight: '1.4',
                      margin: '0',
                      border: '1px solid rgba(0,200,0,0.3)'
                    }}>
                      <code>{example.output}</code>
                    </pre>
                  </div>
                )}

                {/* React Example */}
                {example.reactExample && (
                  <div>
                    <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', opacity: '0.9' }}>
                      React Usage Example:
                    </h4>
                    <pre style={{
                      background: 'rgba(100,200,255,0.2)',
                      padding: '1.5rem',
                      borderRadius: '6px',
                      overflow: 'auto',
                      fontSize: '0.85rem',
                      lineHeight: '1.4',
                      margin: '0',
                      border: '1px solid rgba(100,200,255,0.3)'
                    }}>
                      <code>{example.reactExample}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Practice Section */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '2rem',
          marginTop: '2rem',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{ margin: '0 0 1rem 0', fontSize: '2rem' }}>
            🎯 Practice Challenge
          </h2>
          <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
            Try combining these concepts in a small React component:
          </p>
          
          <div style={{
            background: 'rgba(0,0,0,0.2)',
            padding: '1.5rem',
            borderRadius: '8px',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{ margin: '0 0 1rem 0' }}>Challenge: User List Component</h3>
            <p style={{ margin: '0 0 1rem 0' }}>
              Create a component that displays a list of users and implements these features:
            </p>
            <ul style={{ marginLeft: '1.5rem', lineHeight: '1.6' }}>
              <li>Use destructuring to extract user properties</li>
              <li>Use map() to render the user list</li>
              <li>Use the ternary operator for conditional rendering</li>
              <li>Use template literals for dynamic messages</li>
              <li>Use the spread operator to add new users</li>
            </ul>
          </div>
          
          <pre style={{
            background: 'rgba(0,0,0,0.3)',
            padding: '1.5rem',
            borderRadius: '8px',
            fontSize: '0.85rem',
            lineHeight: '1.4',
            overflow: 'auto'
          }}>
            <code>{`// Your challenge - fill in the missing parts!
function UserListApp() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John', age: 25, isActive: true },
    { id: 2, name: 'Jane', age: 30, isActive: false }
  ]);

  const addUser = (newUser) => {
    // Use spread operator to add new user
  };

  return (
    <div>
      <h2>User Management</h2>
      {/* Use map and destructuring here */}
      {users.map(user => {
        // Destructure user properties
        // Use ternary operator for status
        // Use template literals for display
      })}
    </div>
  );
}`}</code>
          </pre>
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
            to="/lecture3/pure-react" 
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            ← Pure React
          </Link>
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>Great Job! 🎉</h3>
            <p style={{ margin: '0', opacity: '0.8', textAlign: 'center' }}>
              You've mastered the JavaScript essentials for React!
            </p>
          </div>
          <Link 
            to="/" 
            style={{
              background: 'white',
              color: '#138c6e',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            Back to Home
          </Link>
        </div>
      </div>
      
      <PresenterNotes 
        notes={jsEssentialsNotes} 
        lessonTitle="JavaScript Essentials for React" 
      />
    </div>
  );
};

// Presenter notes for JavaScript Essentials
const jsEssentialsNotes = [
  {
    section: "Modern JavaScript Prerequisites",
    duration: "5 minutes",
    keyPoints: [
      "React relies heavily on modern JavaScript features",
      "ES6+ features are essential for React development", 
      "Understanding these concepts before React saves confusion later"
    ],
    script: `Before diving deeper into React, we need to ensure you're comfortable with the modern JavaScript features that React uses extensively. These aren't React-specific concepts, but they're so commonly used in React that they feel like part of the framework itself.`
  },
  {
    section: "Destructuring Assignment",
    duration: "8-10 minutes",
    keyPoints: [
      "Extract values from arrays and objects",
      "Commonly used for props and state",
      "Makes code cleaner and more readable"
    ],
    script: `Destructuring is probably the most important modern JavaScript feature for React development. You'll see it everywhere - in component props, state management, and API responses. It allows us to extract values from objects and arrays in a clean, readable way.`
  }
  // Add more sections as needed...
];

export default JavaScriptEssentials;