// ==========================================
// SOLUTION FILE - Express.js Lab Exam
// All 7 bugs fixed - DO NOT SHARE WITH STUDENTS
// Focus: REST API, Versioning, HTTP Methods & Status Codes
// ==========================================

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ FIX 1: Added API versioning with /api/v1 prefix
const API_VERSION = '/api/v1';

// ✅ FIX 2: Health check now includes proper response structure
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    uptime: process.uptime()
  });
});

// ✅ FIX 3: GET endpoint now returns correct 200 status (not 201)
app.get(`${API_VERSION}/users`, (req, res) => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];
  res.status(200).json(users); // Fixed: 200 for successful GET
});

// ✅ FIX 4: POST endpoint with validation and correct 201 status
app.post(`${API_VERSION}/users`, (req, res) => {
  const { name, email } = req.body;
  
  // Added validation
  if (!name || !email) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Name and email are required'
    });
  }
  
  const newUser = {
    id: Date.now(),
    name,
    email
  };
  
  res.status(201).json({ // Fixed: 201 for resource creation
    message: 'User created',
    user: newUser
  });
});

// ✅ FIX 5: Changed from app.post() to app.put() for update operation
app.put(`${API_VERSION}/users/:id`, (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  res.status(200).json({
    message: 'User updated',
    id: id,
    data: updates
  });
});

// ✅ FIX 6: DELETE endpoint now includes proper status code
app.delete(`${API_VERSION}/users/:id`, (req, res) => {
  const { id } = req.params;
  
  res.status(200).json({ // Fixed: Added status code
    message: `User ${id} deleted`,
    success: true
  });
});

// ✅ FIX 7: Added error handling middleware with 4 parameters
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler (no bug here)
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.originalUrl
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Version: ${API_VERSION}`);
});

module.exports = app;

/* ==========================================
   GIT COMMANDS TO SUBMIT:
   ==========================================
   
   # Stage the fixed file
   git add server.js
   
   # Commit with a descriptive message
   git commit -m "fix: implement REST API with versioning and proper HTTP methods
   
   - Add /api/v1 versioning to all routes
   - Fix GET endpoint to return 200 status
   - Add validation to POST endpoint, return 201
   - Change update route from POST to PUT
   - Add status code to DELETE endpoint
   - Implement error handling middleware
   - Complete health check response"
   
   # Check commit log
   git log --oneline -1
   
   ========================================== */

/* ==========================================
   TESTING THE SOLUTION:
   ==========================================
   
   1. Install dependencies:
      npm install express cors
   
   2. Start the server:
      node server.js
   
   3. Test endpoints:
   
   # Health check
   curl http://localhost:3000/health
   
   # Get all users
   curl http://localhost:3000/api/v1/users
   
   # Create user
   curl -X POST http://localhost:3000/api/v1/users \
     -H "Content-Type: application/json" \
     -d '{"name":"Alice","email":"alice@example.com"}'
   
   # Update user
   curl -X PUT http://localhost:3000/api/v1/users/1 \
     -H "Content-Type: application/json" \
     -d '{"name":"Alice Updated"}'
   
   # Delete user
   curl -X DELETE http://localhost:3000/api/v1/users/1
   
   # Test 404
   curl http://localhost:3000/api/v1/invalid
   
   ========================================== */

/* ==========================================
   SCORING BREAKDOWN:
   ==========================================
   
   ✅ Fix 1: API Versioning (/api/v1)      [15 points]
   ✅ Fix 2: Complete Health Check         [10 points]
   ✅ Fix 3: GET Status Code (200)         [15 points]
   ✅ Fix 4: POST Validation & 201         [15 points]
   ✅ Fix 5: PUT Method for Update         [15 points]
   ✅ Fix 6: DELETE Status Code            [15 points]
   ✅ Fix 7: Error Handling Middleware     [15 points]
   
   Total: 100 points (before hint deductions)
   
   ========================================== */
