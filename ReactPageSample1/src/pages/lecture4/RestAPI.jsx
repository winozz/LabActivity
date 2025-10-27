import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PresenterNotes from '../../components/PresenterNotes.jsx';
import PresentationMode from '../../components/PresentationMode.jsx';
import { getMobileStyles } from '../../utils/mobileStyles.js';

const RestAPI = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [showPresentation, setShowPresentation] = useState(false);
  const [showCode, setShowCode] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessPassword, setAccessPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const styles = getMobileStyles();

  const toggleCode = (sectionId) => {
    setShowCode(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const restAPISections = {
    introduction: {
      title: "What is a REST API?",
      icon: "🌐",
      description: "Understanding RESTful architecture and API design principles.",
      importance: "REST APIs are the backbone of modern web applications, enabling communication between frontend and backend systems.",
      principles: [
        {
          name: "Stateless",
          description: "Each request contains all information needed to process it",
          example: "No session data stored on server between requests"
        },
        {
          name: "Uniform Interface",
          description: "Consistent way to interact with resources",
          example: "Standard HTTP methods (GET, POST, PUT, DELETE)"
        },
        {
          name: "Resource-Based",
          description: "Everything is treated as a resource with unique URIs",
          example: "/users/123 represents user with ID 123"
        },
        {
          name: "Client-Server",
          description: "Clear separation between client and server",
          example: "Frontend and backend can be developed independently"
        },
        {
          name: "Cacheable",
          description: "Responses can be cached to improve performance",
          example: "GET requests can be cached by browsers or CDNs"
        }
      ]
    },
    httpMethods: {
      title: "HTTP Methods",
      icon: "🔧",
      description: "Understanding different HTTP methods and their purposes.",
      importance: "Each HTTP method has specific semantics and should be used appropriately for different operations.",
      methods: [
        {
          method: "GET",
          purpose: "Retrieve data",
          safe: true,
          idempotent: true,
          description: "Used to fetch resources without modifying server state",
          examples: [
            "GET /api/users - Get all users",
            "GET /api/users/123 - Get specific user",
            "GET /api/products?category=electronics - Get filtered products"
          ]
        },
        {
          method: "POST",
          purpose: "Create new resource",
          safe: false,
          idempotent: false,
          description: "Used to create new resources on the server",
          examples: [
            "POST /api/users - Create new user",
            "POST /api/orders - Create new order",
            "POST /api/auth/login - Authenticate user"
          ]
        },
        {
          method: "PUT",
          purpose: "Update/replace resource",
          safe: false,
          idempotent: true,
          description: "Used to update entire resource or create if doesn't exist",
          examples: [
            "PUT /api/users/123 - Update entire user record",
            "PUT /api/products/456 - Replace product data",
            "PUT /api/settings - Update application settings"
          ]
        },
        {
          method: "PATCH",
          purpose: "Partial update",
          safe: false,
          idempotent: false,
          description: "Used to apply partial modifications to a resource",
          examples: [
            "PATCH /api/users/123 - Update specific user fields",
            "PATCH /api/orders/789 - Update order status",
            "PATCH /api/profile - Update profile information"
          ]
        },
        {
          method: "DELETE",
          purpose: "Remove resource",
          safe: false,
          idempotent: true,
          description: "Used to delete resources from the server",
          examples: [
            "DELETE /api/users/123 - Delete specific user",
            "DELETE /api/posts/456 - Delete blog post",
            "DELETE /api/cart/items/789 - Remove item from cart"
          ]
        }
      ]
    },
    statusCodes: {
      title: "HTTP Status Codes",
      icon: "📊",
      description: "Understanding HTTP status codes and their meanings.",
      importance: "Proper status codes help clients understand the result of their requests and handle responses appropriately.",
      categories: [
        {
          range: "1xx",
          name: "Informational",
          description: "Request received, continuing process",
          codes: [
            { code: "100", name: "Continue", usage: "Rare in REST APIs" },
            { code: "101", name: "Switching Protocols", usage: "WebSocket upgrades" }
          ]
        },
        {
          range: "2xx",
          name: "Success",
          description: "Request successfully received and processed",
          codes: [
            { code: "200", name: "OK", usage: "Successful GET, PUT, PATCH" },
            { code: "201", name: "Created", usage: "Successful POST creating resource" },
            { code: "204", name: "No Content", usage: "Successful DELETE or PUT with no response body" }
          ]
        },
        {
          range: "3xx",
          name: "Redirection",
          description: "Further action needed to complete request",
          codes: [
            { code: "301", name: "Moved Permanently", usage: "Resource permanently moved" },
            { code: "304", name: "Not Modified", usage: "Cached version is still valid" }
          ]
        },
        {
          range: "4xx",
          name: "Client Error",
          description: "Request contains bad syntax or cannot be fulfilled",
          codes: [
            { code: "400", name: "Bad Request", usage: "Invalid request syntax or data" },
            { code: "401", name: "Unauthorized", usage: "Authentication required" },
            { code: "403", name: "Forbidden", usage: "Access denied" },
            { code: "404", name: "Not Found", usage: "Resource doesn't exist" },
            { code: "409", name: "Conflict", usage: "Resource conflict (duplicate email)" },
            { code: "422", name: "Unprocessable Entity", usage: "Valid syntax but semantic errors" }
          ]
        },
        {
          range: "5xx",
          name: "Server Error",
          description: "Server failed to fulfill valid request",
          codes: [
            { code: "500", name: "Internal Server Error", usage: "Generic server error" },
            { code: "502", name: "Bad Gateway", usage: "Invalid response from upstream" },
            { code: "503", name: "Service Unavailable", usage: "Server temporarily overloaded" }
          ]
        }
      ]
    },
    apiDesign: {
      title: "API Design Best Practices",
      icon: "🎨",
      description: "Learn how to design clean, intuitive, and maintainable REST APIs.",
      importance: "Good API design improves developer experience, reduces errors, and makes your API easier to understand and use.",
      practices: [
        {
          category: "URL Structure",
          guidelines: [
            "Use nouns, not verbs in URLs (/users not /getUsers)",
            "Use plural nouns for collections (/products not /product)",
            "Use hierarchical structure for relationships (/users/123/orders)",
            "Keep URLs simple and predictable",
            "Use lowercase letters and hyphens for readability"
          ],
          examples: [
            "✅ GET /api/v1/users/123/orders",
            "✅ POST /api/v1/products",
            "❌ GET /api/v1/getUserOrders?userId=123",
            "❌ POST /api/v1/createProduct"
          ]
        },
        {
          category: "Request/Response Format",
          guidelines: [
            "Use JSON as the primary data format",
            "Include proper Content-Type headers",
            "Use consistent field naming (camelCase or snake_case)",
            "Include metadata in responses when helpful",
            "Handle errors consistently across all endpoints"
          ],
          examples: [
            "✅ Content-Type: application/json",
            "✅ Consistent error format across all endpoints",
            "✅ Include pagination metadata for collections",
            "❌ Mixing XML and JSON in same API"
          ]
        },
        {
          category: "Versioning",
          guidelines: [
            "Version your API from the beginning",
            "Use semantic versioning (v1, v2, etc.)",
            "Include version in URL path or headers",
            "Maintain backward compatibility when possible",
            "Deprecate old versions gracefully"
          ],
          examples: [
            "✅ /api/v1/users",
            "✅ /api/v2/users (with new features)",
            "✅ Header: API-Version: v1",
            "❌ Breaking changes without version bump"
          ]
        }
      ]
    },
    examples: {
      title: "Practical Examples",
      icon: "💻",
      description: "Real-world REST API implementation examples using Express.js.",
      importance: "Seeing actual code helps understand how REST principles translate into working applications.",
      examples: [
        {
          name: "Basic Express Server Setup",
          description: "Setting up a basic Express.js server with middleware",
          code: `const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('combined')); // Logging
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: \`Route \${req.originalUrl} not found\`
  });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`
        },
        {
          name: "User CRUD Operations",
          description: "Complete CRUD operations for a User resource",
          code: `const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// In-memory storage (use database in production)
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', created: new Date() },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', created: new Date() }
];
let nextId = 3;

// GET /api/users - Get all users with pagination
router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || '';
  
  // Filter users based on search
  let filteredUsers = users;
  if (search) {
    filteredUsers = users.filter(user => 
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  
  res.json({
    data: paginatedUsers,
    pagination: {
      page,
      limit,
      total: filteredUsers.length,
      pages: Math.ceil(filteredUsers.length / limit)
    }
  });
});

// GET /api/users/:id - Get specific user
router.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({
      error: 'User not found',
      message: \`User with ID \${userId} does not exist\`
    });
  }
  
  res.json({ data: user });
});

// POST /api/users - Create new user
router.post('/', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Valid email is required')
], (req, res) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }
  
  const { name, email } = req.body;
  
  // Check for duplicate email
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({
      error: 'Conflict',
      message: 'User with this email already exists'
    });
  }
  
  // Create new user
  const newUser = {
    id: nextId++,
    name,
    email,
    created: new Date()
  };
  
  users.push(newUser);
  
  res.status(201).json({
    message: 'User created successfully',
    data: newUser
  });
});

// PUT /api/users/:id - Update entire user
router.put('/:id', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Valid email is required')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }
  
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({
      error: 'User not found',
      message: \`User with ID \${userId} does not exist\`
    });
  }
  
  const { name, email } = req.body;
  
  // Check for duplicate email (excluding current user)
  const existingUser = users.find(u => u.email === email && u.id !== userId);
  if (existingUser) {
    return res.status(409).json({
      error: 'Conflict',
      message: 'User with this email already exists'
    });
  }
  
  // Update user
  users[userIndex] = {
    ...users[userIndex],
    name,
    email,
    updated: new Date()
  };
  
  res.json({
    message: 'User updated successfully',
    data: users[userIndex]
  });
});

// PATCH /api/users/:id - Partial update
router.patch('/:id', [
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').optional().isEmail().withMessage('Valid email is required')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }
  
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({
      error: 'User not found',
      message: \`User with ID \${userId} does not exist\`
    });
  }
  
  const updates = req.body;
  
  // Check for duplicate email if email is being updated
  if (updates.email) {
    const existingUser = users.find(u => u.email === updates.email && u.id !== userId);
    if (existingUser) {
      return res.status(409).json({
        error: 'Conflict',
        message: 'User with this email already exists'
      });
    }
  }
  
  // Apply updates
  users[userIndex] = {
    ...users[userIndex],
    ...updates,
    updated: new Date()
  };
  
  res.json({
    message: 'User updated successfully',
    data: users[userIndex]
  });
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({
      error: 'User not found',
      message: \`User with ID \${userId} does not exist\`
    });
  }
  
  users.splice(userIndex, 1);
  
  res.status(204).send(); // No content
});

module.exports = router;`
        },
        {
          name: "Error Handling & Validation",
          description: "Comprehensive error handling and request validation",
          code: `const express = require('express');
const { body, param, query, validationResult } = require('express-validator');

// Custom error classes
class APIError extends Error {
  constructor(message, statusCode = 500, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = 'APIError';
  }
}

class ValidationError extends APIError {
  constructor(errors) {
    super('Validation failed', 400, errors);
    this.name = 'ValidationError';
  }
}

class NotFoundError extends APIError {
  constructor(resource) {
    super(\`\${resource} not found\`, 404);
    this.name = 'NotFoundError';
  }
}

// Validation middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError(errors.array());
  }
  next();
};

// Async error wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Rate limiting middleware
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too Many Requests',
    message: 'Rate limit exceeded. Please try again later.'
  }
});

// Example route with comprehensive validation
const router = express.Router();

router.post('/users', 
  limiter,
  [
    body('name')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters')
      .matches(/^[a-zA-Z\\s]+$/)
      .withMessage('Name can only contain letters and spaces'),
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Valid email is required'),
    body('age')
      .optional()
      .isInt({ min: 13, max: 120 })
      .withMessage('Age must be between 13 and 120'),
    body('phone')
      .optional()
      .isMobilePhone()
      .withMessage('Valid phone number is required')
  ],
  validateRequest,
  asyncHandler(async (req, res) => {
    const { name, email, age, phone } = req.body;
    
    // Simulate database operation
    const user = await createUser({ name, email, age, phone });
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user
    });
  })
);

// Global error handler
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  console.error(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new NotFoundError(message);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new APIError(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ValidationError(message);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    ...(error.errors && { details: error.errors })
  });
};

module.exports = { router, errorHandler, APIError, NotFoundError, ValidationError };`
        }
      ]
    }
  };

  // Show presentation mode if requested
  if (showPresentation) {
    return (
      <PresentationMode
        slides={restAPISlides}
        lessonTitle="REST API Development"
        presenterNotes={restAPIPresenterNotes}
        onExit={() => setShowPresentation(false)}
      />
    );
  }

  const handleAccessPasswordSubmit = () => {
    if (accessPassword === 'restapi2025') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password. Please try again.');
    }
  };

  // Render access control screen
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f5f7fa',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          maxWidth: '600px',
          width: '100%',
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '40px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}>
          <h1 style={{
            fontSize: '2.5em',
            color: '#2c3e50',
            textAlign: 'center',
            marginBottom: '10px',
          }}>REST API Lecture</h1>
          <h2 style={{
            fontSize: '1.5em',
            color: '#7f8c8d',
            textAlign: 'center',
            marginBottom: '30px',
          }}>Access Control</h2>
          
          <div style={{ marginTop: '30px' }}>
            <p style={{
              color: '#7f8c8d',
              marginBottom: '25px',
              textAlign: 'center',
              fontSize: '1.05em',
            }}>
              This lecture material is password-protected. Please enter the access password.
            </p>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#34495e',
                fontWeight: 'bold',
              }}>Access Password:</label>
              <input
                type="password"
                placeholder="Enter password"
                value={accessPassword}
                onChange={(e) => {
                  setAccessPassword(e.target.value);
                  setAuthError('');
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAccessPasswordSubmit();
                  }
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '1em',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  boxSizing: 'border-box',
                }}
              />
              {authError && <p style={{
                color: '#e74c3c',
                fontSize: '0.9em',
                marginTop: '8px',
                marginBottom: '0',
              }}>{authError}</p>}
            </div>

            <button 
              style={{
                width: '100%',
                padding: '15px',
                fontSize: '1.2em',
                fontWeight: 'bold',
                backgroundColor: '#27ae60',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#229954'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#27ae60'}
              onClick={handleAccessPasswordSubmit}
            >
              Access Lecture
            </button>
          </div>
        </div>
      </div>
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
              Lecture 4 • Backend Development
            </div>
            <h1 style={styles.title}>
              REST API Development
            </h1>
            <p style={styles.subtitle}>
              Learn to build robust and scalable REST APIs using modern best practices
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
          {Object.entries(restAPISections).map(([key, section]) => (
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
              {restAPISections[activeSection].icon}
            </span>
            <div style={{ flex: 1 }}>
              <h2 style={styles.sectionTitle}>
                {restAPISections[activeSection].title}
              </h2>
              <p style={styles.sectionDescription}>
                {restAPISections[activeSection].description}
              </p>
              <div style={styles.infoBox}>
                <strong>Why it matters:</strong> {restAPISections[activeSection].importance}
              </div>
            </div>
          </div>

          {/* Section-specific content */}
          {activeSection === 'introduction' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.3rem' }}>REST Principles:</h3>
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: styles.container.padding === '1rem' ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1rem'
                }}>
                  {restAPISections[activeSection].principles.map((principle, idx) => (
                    <div key={idx} style={{
                      background: 'rgba(0,0,0,0.1)',
                      padding: '1.5rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#fff' }}>
                        {principle.name}
                      </h4>
                      <p style={{ margin: '0 0 0.75rem 0', opacity: '0.9', fontSize: '0.9rem' }}>
                        {principle.description}
                      </p>
                      <div style={{ 
                        background: 'rgba(255,255,255,0.1)', 
                        padding: '0.5rem', 
                        borderRadius: '4px',
                        fontSize: '0.85rem'
                      }}>
                        <strong>Example:</strong> {principle.example}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'httpMethods' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {restAPISections[activeSection].methods.map((method, idx) => (
                <div key={idx} style={{
                  background: 'rgba(0,0,0,0.1)',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <span style={{
                      background: method.safe ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontWeight: 'bold',
                      fontSize: '0.9rem'
                    }}>
                      {method.method}
                    </span>
                    <div>
                      <span style={{
                        background: 'rgba(255,255,255,0.1)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        marginRight: '0.5rem'
                      }}>
                        {method.safe ? 'Safe' : 'Unsafe'}
                      </span>
                      <span style={{
                        background: 'rgba(255,255,255,0.1)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem'
                      }}>
                        {method.idempotent ? 'Idempotent' : 'Non-idempotent'}
                      </span>
                    </div>
                  </div>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>
                    {method.purpose}
                  </h4>
                  <p style={{ margin: '0 0 1rem 0', opacity: '0.9' }}>
                    {method.description}
                  </p>
                  <div>
                    <strong>Common Examples:</strong>
                    <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem' }}>
                      {method.examples.map((example, exIdx) => (
                        <li key={exIdx} style={{ margin: '0.25rem 0' }}>{example}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'statusCodes' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {restAPISections[activeSection].categories.map((category, idx) => (
                <div key={idx} style={{
                  background: 'rgba(0,0,0,0.1)',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <span style={{
                      background: `rgba(${idx * 60 + 100}, ${200 - idx * 30}, ${150 + idx * 20}, 0.3)`,
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontWeight: 'bold',
                      fontSize: '1rem'
                    }}>
                      {category.range}
                    </span>
                    <h4 style={{ margin: 0, fontSize: '1.2rem' }}>{category.name}</h4>
                  </div>
                  <p style={{ margin: '0 0 1rem 0', opacity: '0.9' }}>
                    {category.description}
                  </p>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: styles.container.padding === '1rem' ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '0.75rem'
                  }}>
                    {category.codes.map((code, codeIdx) => (
                      <div key={codeIdx} style={{
                        background: 'rgba(255,255,255,0.1)',
                        padding: '0.75rem',
                        borderRadius: '6px',
                        fontSize: '0.9rem'
                      }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                          {code.code} {code.name}
                        </div>
                        <div style={{ opacity: '0.8', fontSize: '0.85rem' }}>
                          {code.usage}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'apiDesign' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {restAPISections[activeSection].practices.map((practice, idx) => (
                <div key={idx} style={{
                  background: 'rgba(0,0,0,0.1)',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.3rem' }}>
                    {practice.category}
                  </h3>
                  <div style={{ marginBottom: '1rem' }}>
                    <strong>Guidelines:</strong>
                    <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem' }}>
                      {practice.guidelines.map((guideline, gIdx) => (
                        <li key={gIdx} style={{ margin: '0.5rem 0', opacity: '0.9' }}>
                          {guideline}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong>Examples:</strong>
                    <div style={{
                      background: 'rgba(255,255,255,0.1)',
                      padding: '1rem',
                      borderRadius: '6px',
                      marginTop: '0.5rem'
                    }}>
                      {practice.examples.map((example, eIdx) => (
                        <div key={eIdx} style={{
                          margin: '0.25rem 0',
                          fontFamily: 'monospace',
                          fontSize: '0.9rem',
                          color: example.startsWith('✅') ? '#4ade80' : example.startsWith('❌') ? '#f87171' : 'inherit'
                        }}>
                          {example}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'examples' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {restAPISections[activeSection].examples.map((example, idx) => (
                <div key={idx} style={styles.exampleContainer}>
                  <div style={styles.exampleHeader}>
                    <h3 style={styles.exampleTitle}>{example.name}</h3>
                    <button
                      onClick={() => toggleCode(`example-${idx}`)}
                      style={styles.toggleButton(showCode[`example-${idx}`])}
                    >
                      {showCode[`example-${idx}`] ? 'Hide Code' : 'Show Code'}
                    </button>
                  </div>
                  <p style={{ margin: '0 0 1rem 0', opacity: '0.9' }}>{example.description}</p>
                  {showCode[`example-${idx}`] && (
                    <pre style={styles.codeBlock}>
                      <code>{example.code}</code>
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
          borderRadius: '8px',
          flexDirection: styles.container.padding === '1rem' ? 'column' : 'row',
          gap: '1rem'
        }}>
          <div style={{ textAlign: styles.container.padding === '1rem' ? 'center' : 'left' }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>🔐 Next: Authentication & Authorization</h3>
            <p style={{ margin: '0', opacity: '0.8' }}>
              Learn how to secure your APIs with authentication and authorization
            </p>
          </div>
          <Link 
            to="/lecture4/auth"
            style={{
              ...styles.backButton,
              background: 'rgba(34, 197, 94, 0.3)',
              border: '1px solid rgba(34, 197, 94, 0.5)',
              textDecoration: 'none'
            }}
          >
            Continue →
          </Link>
        </div>
      </div>
      
      <PresenterNotes 
        notes={restAPIPresenterNotes} 
        lessonTitle="REST API Development" 
      />
    </div>
  );
};

// Presenter notes for REST API
const restAPIPresenterNotes = [
  {
    section: "What is a REST API?",
    duration: "8-10 minutes",
    keyPoints: [
      "REST is an architectural style, not a protocol",
      "Based on stateless, resource-based design",
      "Uses standard HTTP methods and status codes",
      "Enables scalable and maintainable web services"
    ],
    script: `REST stands for Representational State Transfer, and it's important to understand that it's an architectural style, not a strict protocol. This means there's flexibility in how you implement it, but following the principles gives you predictable, scalable APIs.

The key insight is that everything in REST is treated as a resource - users, products, orders - and each resource has a unique identifier (URI). The stateless principle means each request must contain all the information needed to process it, which makes your API more scalable because servers don't need to remember previous requests.`,
    interactions: [
      {
        type: "Discussion",
        description: "Ask students about APIs they've used and what made them easy or difficult to work with"
      },
      {
        type: "Diagram",
        description: "Draw the client-server interaction showing stateless requests"
      }
    ]
  },
  {
    section: "HTTP Methods",
    duration: "12-15 minutes",
    keyPoints: [
      "Each method has specific semantics and use cases",
      "Safe methods don't modify server state",
      "Idempotent methods can be called multiple times safely",
      "Choose the right method for the operation"
    ],
    script: `Understanding HTTP methods is crucial because they convey intent. GET is for retrieving data and should never modify anything on the server. POST creates new resources, PUT replaces entire resources, PATCH updates parts of resources, and DELETE removes them.

The concepts of 'safe' and 'idempotent' are important for caching and reliability. Safe methods like GET can be cached by browsers and proxies. Idempotent methods like PUT and DELETE can be retried safely if a request fails.`,
    interactions: [
      {
        type: "Interactive Exercise",
        description: "Give scenarios and ask students which HTTP method to use"
      },
      {
        type: "Real Example",
        description: "Show actual API calls using different methods"
      }
    ]
  },
  {
    section: "Practical Examples",
    duration: "20-25 minutes",
    keyPoints: [
      "Express.js makes REST API development straightforward",
      "Proper error handling improves developer experience",
      "Validation prevents security issues and data corruption",
      "Middleware adds cross-cutting concerns"
    ],
    script: `Now let's see how these concepts translate into actual code. Express.js provides a clean way to implement REST APIs with its routing system that maps directly to HTTP methods.

The key to good API development is thinking about error cases from the beginning. What happens when data is invalid? When a resource doesn't exist? When the server is overloaded? Handling these gracefully makes your API much more reliable and developer-friendly.`,
    interactions: [
      {
        type: "Live Coding",
        description: "Build a simple user endpoint together, showing validation and error handling"
      },
      {
        type: "Code Review",
        description: "Walk through the error handling middleware and explain each part"
      }
    ]
  }
];

// Slide data for presentation mode
const restAPISlides = [
  {
    title: "REST API Development",
    subtitle: "Building Robust and Scalable Web Services",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    title: "🌐 What is REST?",
    bullets: [
      "Representational State Transfer - architectural style",
      "Stateless, resource-based design",
      "Uses standard HTTP methods and status codes",
      "Enables scalable, maintainable web services"
    ],
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  },
  {
    title: "🔧 HTTP Methods",
    bullets: [
      "GET - Retrieve data (safe, idempotent)",
      "POST - Create resources (unsafe, non-idempotent)",
      "PUT - Update/replace entire resource (unsafe, idempotent)",
      "PATCH - Partial updates (unsafe, typically non-idempotent)",
      "DELETE - Remove resources (unsafe, idempotent)"
    ],
    background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
  },
  {
    title: "📊 Status Codes",
    bullets: [
      "2xx - Success (200 OK, 201 Created, 204 No Content)",
      "4xx - Client Errors (400 Bad Request, 401 Unauthorized, 404 Not Found)",
      "5xx - Server Errors (500 Internal Server Error, 503 Service Unavailable)"
    ],
    background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
  },
  {
    title: "🎨 API Design Best Practices",
    bullets: [
      "Use nouns in URLs, not verbs (/users not /getUsers)",
      "Consistent naming conventions and response formats",
      "Proper versioning strategy (/api/v1/)",
      "Comprehensive error handling and validation"
    ],
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
  },
  {
    title: "💻 Express.js Implementation",
    bullets: [
      "Clean routing with Express Router",
      "Middleware for validation and error handling",
      "Proper status code usage",
      "Request/response data validation"
    ],
    background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
  }
];

export default RestAPI;