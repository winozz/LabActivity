# Lab Exam - Updated Version (REST API Focus)

## 🎯 Summary of Changes

The Lab Exam has been **simplified and refocused** to concentrate on REST API fundamentals, eliminating complex middleware concepts.

---

## ✅ What Changed

### Removed Concepts:
- ❌ `helmet()` security middleware
- ❌ `morgan()` logging middleware
- ❌ CORS origin configuration
- ❌ Port error handling (EADDRINUSE)
- ❌ Complex middleware ordering

### New Focus Areas:
- ✅ **API Versioning** (`/api/v1`)
- ✅ **REST API endpoints** (CRUD operations)
- ✅ **HTTP Methods** (GET, POST, PUT, DELETE)
- ✅ **HTTP Status Codes** (200, 201, 400, 404, 500)
- ✅ **Request Validation**
- ✅ **Error Handling Middleware**

---

## 🐛 The 7 New Bugs to Fix

### Bug 1: Missing API Versioning (15 points)
**Problem:** Routes don't use `/api/v1` prefix  
**Fix:** Add versioning structure to all routes
```javascript
// BEFORE
app.get('/users', ...)

// AFTER
const API_VERSION = '/api/v1';
app.get(`${API_VERSION}/users`, ...)
```

### Bug 2: Incomplete Health Check (10 points)
**Problem:** Health endpoint only returns `{ status: 'ok' }`  
**Fix:** Include timestamp, version, and uptime
```javascript
// BEFORE
res.json({ status: 'ok' });

// AFTER
res.json({
  status: 'ok',
  timestamp: new Date().toISOString(),
  version: '1.0.0',
  uptime: process.uptime()
});
```

### Bug 3: Wrong Status Code in GET (15 points)
**Problem:** GET /users returns 201 instead of 200  
**Fix:** Use 200 OK for successful GET requests
```javascript
// BEFORE
res.status(201).json(users);

// AFTER
res.status(200).json(users);
```

### Bug 4: Missing Validation in POST (15 points)
**Problem:** POST /users doesn't validate input and returns wrong status  
**Fix:** Add validation and use 201 Created
```javascript
// BEFORE
app.post('/users', (req, res) => {
  const newUser = req.body;
  res.status(200).json({ ... });
});

// AFTER
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }
  res.status(201).json({ ... });
});
```

### Bug 5: Wrong HTTP Method for Update (15 points)
**Problem:** Update route uses POST instead of PUT  
**Fix:** Change to app.put()
```javascript
// BEFORE
app.post('/users/:id', ...)

// AFTER
app.put('/users/:id', ...)
```

### Bug 6: Missing Status Code in DELETE (15 points)
**Problem:** DELETE endpoint doesn't set status code  
**Fix:** Add res.status(200) or res.status(204)
```javascript
// BEFORE
res.json({ message: 'User deleted' });

// AFTER
res.status(200).json({ message: 'User deleted' });
```

### Bug 7: Missing Error Handler (15 points)
**Problem:** No error handling middleware  
**Fix:** Add middleware with 4 parameters
```javascript
// ADD THIS
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});
```

---

## 💡 Updated Hints

### Hint 1: API Versioning & Health Check (-10 points)
"REST APIs should use versioning like /api/v1 to allow future changes. Health checks should include timestamp, version, and uptime information for monitoring."

### Hint 2: HTTP Status Codes for CRUD (-10 points)
"GET requests return 200 OK. POST (create) returns 201 Created. PUT/PATCH (update) returns 200 OK. DELETE returns 200 or 204. Make sure each endpoint uses the correct status code."

### Hint 3: Request Validation & Error Handling (-10 points)
"Always validate request data before processing. POST /users should check if name and email exist. Add error handling middleware with signature (err, req, res, next) and proper status codes."

---

## 📊 Test Cases

| # | Test Case | Points | What It Checks |
|---|-----------|--------|----------------|
| 1 | API Versioning | 15 | Routes use `/api/v1` prefix |
| 2 | Health Check | 10 | Includes timestamp, version, uptime |
| 3 | GET Status | 15 | Returns 200 (not 201) |
| 4 | POST Validation | 15 | Validates input, returns 201 |
| 5 | PUT Method | 15 | Uses `app.put()` not `app.post()` |
| 6 | DELETE Status | 15 | Sets proper status code |
| 7 | Error Handler | 15 | 4-parameter middleware exists |
| **Total** | | **100** | |

---

## 🎓 Learning Objectives

Students will learn:
1. **REST API Design Principles**
   - Resource-based URLs
   - Proper HTTP methods
   - Standard status codes

2. **API Versioning**
   - Why versioning matters
   - URL-based versioning (`/api/v1`)
   - Future-proofing APIs

3. **HTTP Semantics**
   - GET for retrieval (200)
   - POST for creation (201)
   - PUT for updates (200)
   - DELETE for removal (200/204)
   - Error responses (400, 404, 500)

4. **Input Validation**
   - Checking required fields
   - Returning appropriate errors
   - Client feedback

5. **Error Handling**
   - Express error middleware
   - Centralized error handling
   - Development vs production messages

---

## 🚀 How to Use

### For Students:
1. Navigate to **Lecture 4** → **🎯 Lab Practical Exam**
2. Read the problem statement
3. Fix the 7 bugs in the code editor
4. Test your code
5. Submit when ready

### For Instructors:
- Review `LAB_EXAM_SOLUTION.js` for correct answers
- Check `LAB_EXAM_INSTRUCTOR_GUIDE.md` for administration tips
- Monitor student progress via session IDs

---

## 📝 Git Integration

Students are reminded to follow Git best practices:

```bash
# Good commit message
git commit -m "fix: implement REST API with proper HTTP methods and status codes"

# Descriptive commit
git commit -m "fix: add API versioning and request validation

- Add /api/v1 prefix to all routes
- Implement input validation in POST endpoint
- Fix HTTP methods and status codes
- Add error handling middleware"
```

---

## 🔧 Technical Details

### Dependencies:
```json
{
  "express": "^4.x.x",
  "cors": "^2.x.x",
  "lucide-react": "^0.x.x"
}
```

### React Component:
- Fully functional React component
- Uses React hooks (useState, useEffect)
- localStorage for session management
- Responsive layout with Tailwind CSS classes

### Session Management:
- Device-locked via localStorage
- Unique session ID per device
- Auto-save code changes
- Restores on page refresh
- Cannot retake once completed

---

## ✨ Features

1. **90-Minute Timer**
   - Countdown display
   - Red alert when < 10 min
   - Auto-submit at 0:00

2. **Code Editor**
   - Live editing
   - Monospace font
   - Tab support
   - Auto-save

3. **Hints System**
   - 3 hints available
   - 10 points each
   - Progressive difficulty
   - Reveal on demand

4. **Automatic Grading**
   - 7 test cases
   - Instant feedback
   - Detailed breakdown
   - Pass/fail status

5. **Results Page**
   - Overall score
   - Individual test results
   - Hints used
   - Session ID

---

## 📖 Documentation Files

1. **LAB_EXAM_README.md** - General overview (needs update)
2. **LAB_EXAM_SOLUTION.js** - ✅ Updated with new bugs/fixes
3. **LAB_EXAM_INSTRUCTOR_GUIDE.md** - For instructors (needs update)
4. **LAB_EXAM_STUDENT_GUIDE.md** - For students (needs update)
5. **LAB_EXAM_CHANGES.md** - This file!

---

## 🎯 Next Steps

To fully update the documentation:

1. ✅ Update main component (LabExam.jsx)
2. ✅ Update solution file
3. ⚠️ Update README (recommended)
4. ⚠️ Update Instructor Guide (recommended)
5. ⚠️ Update Student Guide (recommended)

---

## 🔍 Testing Checklist

- [ ] Navigate to exam page
- [ ] Click "Start Exam"
- [ ] Verify timer countdown
- [ ] Edit code in editor
- [ ] Reveal a hint
- [ ] Click "Test Code"
- [ ] Click "Submit Final Answer"
- [ ] View results page
- [ ] Refresh page (session should restore if not submitted)

---

## 💪 Benefits of New Version

✅ **Simpler**: Removed complex middleware concepts  
✅ **Focused**: Pure REST API and HTTP fundamentals  
✅ **Practical**: Real-world API design patterns  
✅ **Clear**: Each bug tests one specific concept  
✅ **Educational**: Progressive difficulty with hints  

---

**Last Updated:** October 27, 2025  
**Version:** 2.0 (REST API Focus)  
**Course:** DCIT 26 - Application Development
