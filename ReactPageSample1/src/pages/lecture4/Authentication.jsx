import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PresenterNotes from '../../components/PresenterNotes.jsx';
import PresentationMode from '../../components/PresentationMode.jsx';
import { getMobileStyles } from '../../utils/mobileStyles.js';

const Authentication = () => {
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

  const authSections = {
    introduction: {
      title: "Authentication vs Authorization",
      icon: "🔐",
      description: "Understanding the difference between authentication and authorization in web applications.",
      importance: "Security is fundamental to web applications - users need to prove who they are (authentication) and the system needs to control what they can do (authorization).",
      concepts: [
        {
          type: "Authentication",
          question: "Who are you?",
          description: "The process of verifying the identity of a user",
          examples: ["Login with username/password", "OAuth with Google/GitHub", "Multi-factor authentication", "Biometric verification"],
          methods: ["Session-based", "Token-based (JWT)", "OAuth 2.0", "OpenID Connect"]
        },
        {
          type: "Authorization",
          question: "What can you do?",
          description: "The process of determining what an authenticated user is allowed to do",
          examples: ["Admin can delete users", "User can edit own profile", "Guest can only view public content", "Premium user can access special features"],
          methods: ["Role-based (RBAC)", "Attribute-based (ABAC)", "Permission-based", "Resource-based"]
        }
      ],
      workflow: [
        "User provides credentials (authentication)",
        "System verifies credentials",
        "System issues token/session",
        "User sends token with requests",
        "System checks permissions (authorization)",
        "System allows or denies access"
      ]
    },
    jwt: {
      title: "JWT (JSON Web Tokens)",
      icon: "🎫",
      description: "Understanding JWT structure, benefits, and implementation for stateless authentication.",
      importance: "JWT enables stateless authentication, making it easier to scale applications across multiple servers.",
      structure: {
        header: {
          description: "Contains token type and signing algorithm",
          example: '{"alg": "HS256", "typ": "JWT"}'
        },
        payload: {
          description: "Contains claims (user data and metadata)",
          example: '{"sub": "1234567890", "name": "John Doe", "role": "admin", "exp": 1516239022}'
        },
        signature: {
          description: "Used to verify token hasn't been tampered with",
          example: "HMACSHA256(base64UrlEncode(header) + '.' + base64UrlEncode(payload), secret)"
        }
      },
      benefits: [
        "Stateless - no server-side session storage needed",
        "Scalable - tokens can be verified by any server",
        "Cross-domain - works across different domains",
        "Self-contained - all needed info is in the token"
      ],
      drawbacks: [
        "Cannot be revoked until expiration",
        "Larger than session IDs",
        "Sensitive data exposed if token is compromised",
        "Difficult to handle compromised secrets"
      ]
    },
    implementation: {
      title: "Implementation Examples",
      icon: "💻",
      description: "Practical implementation of authentication and authorization in Node.js/Express.",
      importance: "Seeing real code helps understand how authentication concepts translate into working applications.",
      examples: [
        {
          name: "JWT Authentication Middleware",
          description: "Complete JWT implementation with login, token generation, and verification",
          code: `const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// JWT configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
    issuer: 'your-app-name',
    audience: 'your-app-users'
  });
};

// Login endpoint
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find user and include password for verification
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Set cookie (optional, for browser clients)
    res.cookie('token', token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    // Send response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

// Authentication middleware
const authenticate = async (req, res, next) => {
  try {
    let token;

    // Get token from header or cookie
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);
      
      // Get user from database
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Token is valid but user no longer exists'
        });
      }

      // Add user to request object
      req.user = user;
      next();

    } catch (jwtError) {
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Token has expired'
        });
      } else if (jwtError.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          message: 'Invalid token'
        });
      } else {
        throw jwtError;
      }
    }

  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during authentication'
    });
  }
};

// Logout endpoint
const logout = (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000), // 10 seconds
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
};

module.exports = { login, logout, authenticate, generateToken };`
        },
        {
          name: "Role-Based Authorization",
          description: "Implementing role-based access control with middleware",
          code: `// Authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    // User must be authenticated first
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    // Check if user's role is authorized
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: \`Access denied. Required roles: \${roles.join(', ')}\`
      });
    }

    next();
  };
};

// Permission-based authorization
const checkPermission = (permission) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
      }

      // Get user with permissions populated
      const user = await User.findById(req.user._id).populate('permissions');
      
      const hasPermission = user.permissions.some(perm => perm.name === permission);
      
      if (!hasPermission) {
        return res.status(403).json({
          success: false,
          message: \`Access denied. Required permission: \${permission}\`
        });
      }

      next();
    } catch (error) {
      console.error('Permission check error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during permission check'
      });
    }
  };
};

// Resource ownership check
const checkOwnership = (resourceModel, resourceIdParam = 'id') => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params[resourceIdParam];
      const resource = await resourceModel.findById(resourceId);

      if (!resource) {
        return res.status(404).json({
          success: false,
          message: 'Resource not found'
        });
      }

      // Check if user owns the resource or is admin
      if (resource.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Access denied. You can only access your own resources.'
        });
      }

      // Add resource to request for use in route handler
      req.resource = resource;
      next();

    } catch (error) {
      console.error('Ownership check error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during ownership check'
      });
    }
  };
};

// Usage examples in routes
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

// Public route (no authentication required)
router.get('/public-data', (req, res) => {
  res.json({ message: 'This is public data' });
});

// Protected route (authentication required)
router.get('/profile', authenticate, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

// Admin only route
router.delete('/users/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting user' });
  }
});

// Multiple roles allowed
router.get('/analytics', authenticate, authorize('admin', 'manager'), (req, res) => {
  res.json({ message: 'Analytics data for admins and managers' });
});

// Permission-based route
router.post('/products', authenticate, checkPermission('create_product'), (req, res) => {
  // Create product logic
  res.json({ message: 'Product created' });
});

// Resource ownership route
const Post = require('../models/Post');
router.put('/posts/:id', authenticate, checkOwnership(Post), (req, res) => {
  // User can only edit their own posts (or admin can edit any)
  res.json({ message: 'Post updated', post: req.resource });
});

module.exports = { authorize, checkPermission, checkOwnership };`
        },
        {
          name: "Session-Based Authentication",
          description: "Alternative session-based authentication using express-session",
          code: `const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcryptjs');

// Session configuration
const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions'
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true, // Prevent XSS
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    sameSite: 'lax' // CSRF protection
  }
};

// Apply session middleware
app.use(session(sessionConfig));

// Session-based login
const sessionLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Create session
    req.session.userId = user._id;
    req.session.userRole = user.role;

    // Regenerate session ID for security
    req.session.regenerate((err) => {
      if (err) {
        console.error('Session regeneration error:', err);
        return res.status(500).json({
          success: false,
          message: 'Session error'
        });
      }

      req.session.userId = user._id;
      req.session.userRole = user.role;

      res.status(200).json({
        success: true,
        message: 'Login successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    });

  } catch (error) {
    console.error('Session login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

// Session authentication middleware
const sessionAuth = async (req, res, next) => {
  try {
    // Check if user is logged in
    if (!req.session.userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    // Get user from database
    const user = await User.findById(req.session.userId);
    if (!user) {
      // User no longer exists, destroy session
      req.session.destroy();
      return res.status(401).json({
        success: false,
        message: 'User no longer exists'
      });
    }

    // Add user to request
    req.user = user;
    next();

  } catch (error) {
    console.error('Session authentication error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during authentication'
    });
  }
};

// Session logout
const sessionLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Session destruction error:', err);
      return res.status(500).json({
        success: false,
        message: 'Error during logout'
      });
    }

    res.clearCookie('connect.sid'); // Clear session cookie
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  });
};

// Session management utilities
const getActiveSessions = async (userId) => {
  try {
    const store = req.sessionStore;
    return new Promise((resolve, reject) => {
      store.all((err, sessions) => {
        if (err) return reject(err);
        
        const userSessions = Object.keys(sessions)
          .filter(sessionId => sessions[sessionId].userId === userId)
          .map(sessionId => ({
            id: sessionId,
            createdAt: sessions[sessionId].createdAt,
            lastAccess: sessions[sessionId].lastAccess
          }));
        
        resolve(userSessions);
      });
    });
  } catch (error) {
    console.error('Get active sessions error:', error);
    throw error;
  }
};

module.exports = { 
  sessionLogin, 
  sessionLogout, 
  sessionAuth, 
  sessionConfig,
  getActiveSessions 
};`
        }
      ]
    },
    security: {
      title: "Security Best Practices",
      icon: "🛡️",
      description: "Essential security practices for authentication and authorization systems.",
      importance: "Security vulnerabilities in authentication can compromise entire applications and user data.",
      practices: [
        {
          category: "Password Security",
          recommendations: [
            "Always hash passwords using bcrypt or similar",
            "Enforce strong password policies",
            "Implement rate limiting for login attempts",
            "Never store passwords in plain text",
            "Use salt to prevent rainbow table attacks"
          ],
          code: `const bcrypt = require('bcryptjs');

// Hash password before saving
const hashPassword = async (password) => {
  const saltRounds = 12; // Higher is more secure but slower
  return await bcrypt.hash(password, saltRounds);
};

// Verify password
const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Password strength validation
const validatePasswordStrength = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\\d/.test(password);
  const hasNonalphas = /\\W/.test(password);

  return password.length >= minLength && 
         hasUpperCase && 
         hasLowerCase && 
         hasNumbers && 
         hasNonalphas;
};`
        },
        {
          category: "Token Security",
          recommendations: [
            "Use strong, random secrets for JWT signing",
            "Set appropriate token expiration times",
            "Implement token refresh mechanisms",
            "Store tokens securely (httpOnly cookies for web)",
            "Validate tokens on every request"
          ],
          code: `// Secure token configuration
const JWT_SECRET = process.env.JWT_SECRET; // Use environment variable
const ACCESS_TOKEN_EXPIRE = '15m'; // Short-lived access tokens
const REFRESH_TOKEN_EXPIRE = '7d'; // Longer-lived refresh tokens

// Generate token pair
const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId, type: 'access' }, 
    JWT_SECRET, 
    { expiresIn: ACCESS_TOKEN_EXPIRE }
  );
  
  const refreshToken = jwt.sign(
    { userId, type: 'refresh' }, 
    JWT_SECRET, 
    { expiresIn: REFRESH_TOKEN_EXPIRE }
  );
  
  return { accessToken, refreshToken };
};

// Refresh token endpoint
const refreshTokens = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    const decoded = jwt.verify(refreshToken, JWT_SECRET);
    
    if (decoded.type !== 'refresh') {
      return res.status(401).json({ message: 'Invalid token type' });
    }
    
    const tokens = generateTokens(decoded.userId);
    res.json(tokens);
    
  } catch (error) {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};`
        },
        {
          category: "General Security",
          recommendations: [
            "Use HTTPS in production",
            "Implement CORS properly",
            "Add security headers (helmet.js)",
            "Validate and sanitize all inputs",
            "Log security events for monitoring"
          ],
          code: `const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

// Security middleware
app.use(helmet()); // Set security headers

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});
app.use('/api/', limiter);

// More strict rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // limit each IP to 5 login attempts per windowMs
  skipSuccessfulRequests: true
});
app.use('/api/auth/login', authLimiter);

// Sanitize data
app.use(mongoSanitize()); // Remove NoSQL injection attempts

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true, // Allow cookies
  optionsSuccessStatus: 200
}));`
        }
      ]
    }
  };

  // Show presentation mode if requested
  if (showPresentation) {
    return (
      <PresentationMode
        slides={authSlides}
        lessonTitle="Authentication & Authorization"
        presenterNotes={authPresenterNotes}
        onExit={() => setShowPresentation(false)}
      />
    );
  }

  return (
    <div style={{
      ...styles.container,
      background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)'
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
              Authentication & Authorization
            </h1>
            <p style={styles.subtitle}>
              Secure your applications with proper authentication and authorization
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
          {Object.entries(authSections).map(([key, section]) => (
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
              {authSections[activeSection].icon}
            </span>
            <div style={{ flex: 1 }}>
              <h2 style={styles.sectionTitle}>
                {authSections[activeSection].title}
              </h2>
              <p style={styles.sectionDescription}>
                {authSections[activeSection].description}
              </p>
              <div style={styles.infoBox}>
                <strong>Why it matters:</strong> {authSections[activeSection].importance}
              </div>
            </div>
          </div>

          {/* Section-specific content */}
          {activeSection === 'introduction' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Concepts Comparison */}
              <div>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.3rem' }}>Key Concepts:</h3>
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: styles.container.padding === '1rem' ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))',
                  gap: '1.5rem'
                }}>
                  {authSections[activeSection].concepts.map((concept, idx) => (
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
                        <h4 style={{ margin: 0, fontSize: '1.2rem', color: '#fff' }}>
                          {concept.type}
                        </h4>
                        <span style={{
                          background: 'rgba(255,255,255,0.2)',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '12px',
                          fontSize: '0.85rem',
                          fontStyle: 'italic'
                        }}>
                          {concept.question}
                        </span>
                      </div>
                      <p style={{ margin: '0 0 1rem 0', opacity: '0.9' }}>
                        {concept.description}
                      </p>
                      <div style={{ marginBottom: '1rem' }}>
                        <strong>Examples:</strong>
                        <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem' }}>
                          {concept.examples.map((example, exIdx) => (
                            <li key={exIdx} style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <strong>Methods:</strong>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                          {concept.methods.map((method, mIdx) => (
                            <span key={mIdx} style={{
                              background: 'rgba(255,255,255,0.2)',
                              padding: '0.25rem 0.5rem',
                              borderRadius: '12px',
                              fontSize: '0.8rem'
                            }}>
                              {method}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Workflow */}
              <div>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.3rem' }}>Authentication Flow:</h3>
                <div style={{
                  background: 'rgba(0,0,0,0.1)',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  {authSections[activeSection].workflow.map((step, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      margin: '0.75rem 0',
                      padding: '0.75rem',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '6px'
                    }}>
                      <span style={{
                        background: 'rgba(59, 130, 246, 0.8)',
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
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'jwt' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* JWT Structure */}
              <div>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.3rem' }}>JWT Structure:</h3>
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: styles.container.padding === '1rem' ? '1fr' : 'repeat(3, 1fr)',
                  gap: '1rem'
                }}>
                  {Object.entries(authSections[activeSection].structure).map(([key, part]) => (
                    <div key={key} style={{
                      background: 'rgba(0,0,0,0.1)',
                      padding: '1.5rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      <h4 style={{ 
                        margin: '0 0 0.5rem 0', 
                        fontSize: '1.1rem', 
                        color: '#fff',
                        textTransform: 'capitalize'
                      }}>
                        {key}
                      </h4>
                      <p style={{ margin: '0 0 1rem 0', opacity: '0.9', fontSize: '0.9rem' }}>
                        {part.description}
                      </p>
                      <div style={{
                        background: 'rgba(255,255,255,0.1)',
                        padding: '0.75rem',
                        borderRadius: '4px',
                        fontFamily: 'monospace',
                        fontSize: '0.8rem',
                        wordBreak: 'break-all'
                      }}>
                        {part.example}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits vs Drawbacks */}
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: styles.container.padding === '1rem' ? '1fr' : '1fr 1fr',
                gap: '1.5rem'
              }}>
                <div style={{
                  background: 'rgba(34, 197, 94, 0.1)',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(34, 197, 94, 0.3)'
                }}>
                  <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#22c55e' }}>
                    ✅ Benefits
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                    {authSections[activeSection].benefits.map((benefit, idx) => (
                      <li key={idx} style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(239, 68, 68, 0.3)'
                }}>
                  <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#ef4444' }}>
                    ⚠️ Drawbacks
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                    {authSections[activeSection].drawbacks.map((drawback, idx) => (
                      <li key={idx} style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
                        {drawback}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'implementation' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {authSections[activeSection].examples.map((example, idx) => (
                <div key={idx} style={styles.exampleContainer}>
                  <div style={styles.exampleHeader}>
                    <h3 style={styles.exampleTitle}>{example.name}</h3>
                    <button
                      onClick={() => toggleCode(`auth-${idx}`)}
                      style={styles.toggleButton(showCode[`auth-${idx}`])}
                    >
                      {showCode[`auth-${idx}`] ? 'Hide Code' : 'Show Code'}
                    </button>
                  </div>
                  <p style={{ margin: '0 0 1rem 0', opacity: '0.9' }}>{example.description}</p>
                  {showCode[`auth-${idx}`] && (
                    <pre style={styles.codeBlock}>
                      <code>{example.code}</code>
                    </pre>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeSection === 'security' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {authSections[activeSection].practices.map((practice, idx) => (
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
                    <strong>Recommendations:</strong>
                    <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem' }}>
                      {practice.recommendations.map((rec, rIdx) => (
                        <li key={rIdx} style={{ margin: '0.5rem 0', opacity: '0.9' }}>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <button
                      onClick={() => toggleCode(`security-${idx}`)}
                      style={styles.toggleButton(showCode[`security-${idx}`])}
                    >
                      {showCode[`security-${idx}`] ? 'Hide Example' : 'Show Example'}
                    </button>
                    {showCode[`security-${idx}`] && (
                      <pre style={styles.codeBlock}>
                        <code>{practice.code}</code>
                      </pre>
                    )}
                  </div>
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
            <h3 style={{ margin: '0 0 0.5rem 0' }}>🗄️ Next: Database Integration</h3>
            <p style={{ margin: '0', opacity: '0.8' }}>
              Learn MongoDB integration, data modeling, and DAO patterns
            </p>
          </div>
          <Link 
            to="/lecture4/database"
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
        notes={authPresenterNotes} 
        lessonTitle="Authentication & Authorization" 
      />
    </div>
  );
};

// Presenter notes for Authentication
const authPresenterNotes = [
  {
    section: "Authentication vs Authorization",
    duration: "8-10 minutes",
    keyPoints: [
      "Authentication = Who are you? Authorization = What can you do?",
      "Two separate but related security concerns",
      "Authentication comes first, authorization builds on it",
      "Different methods for different use cases"
    ],
    script: `The distinction between authentication and authorization is fundamental but often confused. Think of it like getting into a building - authentication is showing your ID to prove you are who you say you are. Authorization is the building deciding whether you can access the executive floor based on your role.

Authentication answers 'Who are you?' and happens first. Authorization answers 'What are you allowed to do?' and happens on every request. You can't have authorization without authentication, but you can have authentication without complex authorization.`,
    interactions: [
      {
        type: "Real-world Analogy",
        description: "Use driver's license example - proving identity vs. what license class allows you to drive"
      },
      {
        type: "Discussion",
        description: "Ask students about authentication methods they use daily"
      }
    ]
  },
  {
    section: "JWT Implementation",
    duration: "15-18 minutes",
    keyPoints: [
      "JWTs are self-contained tokens with user information",
      "Stateless - no server-side session storage needed",
      "Include proper expiration and refresh mechanisms",
      "Security considerations: secure storage and strong secrets"
    ],
    script: `JWTs solve the scalability problem of session-based authentication. With sessions, the server must store session data and look it up on every request. With JWTs, all the necessary information is in the token itself, so any server can verify it without database calls.

However, this comes with trade-offs. Once issued, a JWT can't be revoked until it expires. That's why we use short-lived access tokens with longer-lived refresh tokens. If an access token is compromised, it's only valid for a short time.`,
    interactions: [
      {
        type: "Live Demo",
        description: "Decode a JWT token on jwt.io to show the structure"
      },
      {
        type: "Security Discussion",
        description: "Discuss where to store JWTs securely in different client types"
      }
    ]
  },
  {
    section: "Security Best Practices",
    duration: "10-12 minutes",
    keyPoints: [
      "Always hash passwords with proper salt",
      "Use HTTPS in production",
      "Implement rate limiting",
      "Validate and sanitize all inputs",
      "Monitor and log security events"
    ],
    script: `Security isn't an afterthought - it needs to be built in from the beginning. Password hashing with bcrypt is non-negotiable. The salt rounds should be high enough to be secure but not so high that login becomes slow.

Rate limiting is crucial for preventing brute force attacks. Don't just limit by IP - consider limiting by username too. And always use HTTPS in production - authentication over HTTP is essentially sending passwords in plain text.`,
    interactions: [
      {
        type: "Security Checklist",
        description: "Review a security checklist for authentication systems"
      },
      {
        type: "Common Vulnerabilities",
        description: "Discuss OWASP top 10 authentication-related vulnerabilities"
      }
    ]
  }
];

// Slide data for presentation mode
const authSlides = [
  {
    title: "Authentication & Authorization",
    subtitle: "Securing Your Web Applications",
    background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
  },
  {
    title: "🔐 Authentication vs Authorization",
    bullets: [
      "Authentication: Who are you? (Identity verification)",
      "Authorization: What can you do? (Permission control)",
      "Authentication comes first, authorization builds on it",
      "Different methods: sessions, tokens, OAuth, etc."
    ],
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  },
  {
    title: "🎫 JWT (JSON Web Tokens)",
    bullets: [
      "Self-contained tokens with user information",
      "Stateless - no server-side session storage",
      "Structure: Header.Payload.Signature",
      "Benefits: scalable, cross-domain support"
    ],
    background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
  },
  {
    title: "💻 Implementation Patterns",
    bullets: [
      "JWT middleware for token verification",
      "Role-based access control (RBAC)",
      "Resource ownership validation",
      "Session-based alternatives"
    ],
    background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
  },
  {
    title: "🛡️ Security Best Practices",
    bullets: [
      "Hash passwords with bcrypt (never plain text)",
      "Use HTTPS in production",
      "Implement rate limiting for auth endpoints",
      "Validate and sanitize all inputs",
      "Monitor and log security events"
    ],
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
  },
  {
    title: "🔒 Key Takeaways",
    bullets: [
      "Security is not optional - build it in from start",
      "Choose authentication method based on requirements",
      "Always validate permissions on protected resources",
      "Keep security practices up to date"
    ],
    background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
  }
];

export default Authentication;