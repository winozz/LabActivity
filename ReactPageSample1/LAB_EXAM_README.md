# Laboratory Practical Exam - Express.js & Git

## 📋 Overview

This is a comprehensive 90-minute practical examination system designed to test students' understanding of Express.js backend development and Git version control. The exam features an IDE-like interface where students fix bugs in a provided Express.js server.

## ✨ Key Features

### 🕐 Time Management
- **90-minute countdown timer** that starts when the exam begins
- Visual warning when less than 10 minutes remain (red pulsing timer)
- **Auto-submit** when time expires
- Real-time clock display in minutes:seconds format

### 🔐 Session Management
- **Device-locked sessions** using localStorage
- Unique session ID generated per device: `session_${timestamp}_${random}`
- Session persistence: if browser is refreshed, the exam state is restored
- **Cannot retake the exam** once submitted on the same device
- Session data includes:
  - Start time
  - Current code state
  - Hints used
  - Submission status
  - Final score and test results

### 💡 Hint System
- **3 hints available** to help students
- Each hint costs **-10 points** when revealed
- Hints are progressively helpful:
  - **Hint 1**: Middleware Order & CORS Configuration
  - **Hint 2**: HTTP Status Codes & Missing Routes
  - **Hint 3**: Error Handling & Module Exports
- Hints can be toggled to show/hide
- Used hints are tracked and displayed in the final score

### 🎯 Scoring System
- **Maximum score**: 100 points
- **7 test cases**, each worth 15 points (total: 105 base points)
- **Hint penalty**: -10 points per hint used
- **Passing score**: 60 points
- Final score calculation: `earned_points - (hints_used × 10)`

### 🧪 Test Cases

The exam validates 7 different bugs:

1. **Middleware Order** (15 points)
   - `helmet()` must be called before `cors()`
   - Security middleware should be applied first

2. **CORS Configuration** (10 points)
   - CORS should specify allowed origins
   - Should use `cors({ origin: ... })` instead of `cors()`

3. **Health Check Status Code** (15 points)
   - Error condition should return HTTP 503
   - Should check for negative uptime and return proper error status

4. **Missing POST Endpoint** (15 points)
   - Must implement `POST /api/data` route
   - Should accept and return JSON with `req.body`

5. **Error Middleware Status Code** (15 points)
   - Error handler must call `res.status()` with proper code
   - Should use `err.status || 500`

6. **Port Error Handling** (15 points)
   - Must handle `EADDRINUSE` error in `.listen()`
   - Should implement `.on('error')` handler

7. **Module Exports** (15 points)
   - Must export the app with `module.exports = app`
   - Required for testing purposes

## 🎨 User Interface

### Start Screen
- Exam title and time limit display
- Important instructions panel with:
  - Number of bugs to fix
  - Session locking information
  - Hint availability and cost
  - Maximum score information
  - Git practice reminder
- Topics covered overview
- Session ID display
- Start button to begin the exam

### Exam Interface (IDE-like)
**Three-panel layout:**

1. **Left Panel - Problem Statement & Hints** (96px width)
   - Problem description with bug list
   - Git requirements section with example commands
   - Expandable hints section
   - Each hint can be revealed individually

2. **Middle Panel - Code Editor**
   - File tab showing `server.js`
   - Large textarea with buggy Express.js code
   - Monospace font for code editing
   - Action buttons:
     - **Test Code**: Runs syntax check
     - **Submit Final Answer**: Grades and finishes exam

3. **Right Panel - Console Output** (96px width)
   - Terminal-style output display
   - Shows feedback from test runs
   - Clear button to reset console
   - Monospace font with green text on black background

### Results Screen
- Pass/fail indicator with icon
- Large score display (X/100)
- Statistics grid:
  - Tests passed
  - Hints used
  - Point deduction
- Detailed test breakdown showing:
  - Each test case name
  - Pass/fail status
  - Points earned
- Hints usage summary
- Session ID for reference

## 🐛 The 7 Bugs Students Must Fix

### Bug 1: Wrong Middleware Order
```javascript
// WRONG:
app.use(cors());
app.use(helmet());

// CORRECT:
app.use(helmet()); // Security first!
app.use(cors());
```

### Bug 2: Missing CORS Configuration
```javascript
// WRONG:
app.use(cors()); // Allows all origins

// CORRECT:
app.use(cors({
  origin: 'http://localhost:3000' // or specific origins
}));
```

### Bug 3: Wrong Status Code in Health Check
```javascript
// WRONG:
if (uptime < 0) {
  res.status(200).json({ status: 'error' }); // Should be 503
}

// CORRECT:
if (uptime < 0) {
  res.status(503).json({ status: 'error' });
}
```

### Bug 4: Missing POST Endpoint
```javascript
// MISSING - Need to add:
app.post('/api/data', (req, res) => {
  res.status(200).json({
    success: true,
    data: req.body,
    message: 'Data received successfully'
  });
});
```

### Bug 5: Error Middleware Missing Status
```javascript
// WRONG:
app.use((err, req, res, next) => {
  res.json({ error: 'Internal Server Error' }); // No status code
});

// CORRECT:
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: 'Internal Server Error'
  });
});
```

### Bug 6: Missing Listen Error Handler
```javascript
// WRONG:
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// CORRECT:
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
    process.exit(1);
  }
});
```

### Bug 7: Missing Module Export
```javascript
// MISSING - Need to add at the end:
module.exports = app;
```

## 🎓 Git Usage Requirements

Students are reminded to follow Git best practices:

```bash
# Stage your changes
git add server.js

# Commit with descriptive message
git commit -m "fix: resolve 7 bugs in Express server"

# Good commit message format:
# - Use imperative mood
# - Be specific and clear
```

## 💾 Technical Implementation

### Session Storage Structure
```javascript
{
  sessionId: "session_1234567890_abc123def",
  started: true,
  finished: false,
  startTime: 1234567890000,
  endTime: 1234567890000, // only when finished
  code: "// student's current code",
  hintsUsed: [1, 3],
  score: 85,
  testResults: [
    { id: 1, name: "Test name", passed: true, points: 15 }
  ]
}
```

### Test Case Implementation
Each test case is an object with:
- `id`: Unique identifier
- `name`: Description of what is being tested
- `test`: Function that validates the code (returns boolean)
- `points`: Points awarded if test passes

### Timer Implementation
- Uses `setInterval` to update countdown every second
- Calculates remaining time from start time
- Auto-submits when time reaches 0
- Cleanup on component unmount

## 🚀 Usage

### For Instructors

1. **Access the exam page**: Navigate to Lecture 4 → Lab Practical Exam
2. **Monitor students**: Check session IDs if needed
3. **Review results**: Students see immediate feedback upon completion

### For Students

1. Click "Start Exam" to begin
2. Read the problem statement carefully
3. Edit the code in the middle panel
4. Use hints sparingly (each costs 10 points)
5. Test your code before submitting
6. Submit final answer when confident
7. View detailed results upon completion

## 📊 Grading Breakdown

| Component | Points | Notes |
|-----------|--------|-------|
| Middleware Order | 15 | helmet before cors |
| CORS Config | 10 | Specify origin |
| Health Status | 15 | Use 503 for errors |
| POST Endpoint | 15 | /api/data route |
| Error Status | 15 | Set proper status code |
| Listen Error | 15 | Handle EADDRINUSE |
| Module Export | 15 | Export app |
| **Total Base** | **100** | Before deductions |
| Hint Penalty | -10 each | Up to -30 |
| **Final Range** | **70-100** | With all hints: 70 |

## 🔧 Customization

To modify the exam:

1. **Change duration**: Update `EXAM_DURATION` constant (in milliseconds)
2. **Adjust hint penalty**: Update `HINT_PENALTY` constant
3. **Modify test cases**: Edit the `testCases` array
4. **Update hints**: Modify the `hints` array
5. **Change buggy code**: Update the `buggyCode` string

## 🎯 Learning Outcomes

By completing this exam, students demonstrate:
- Understanding of Express.js middleware concepts
- Knowledge of HTTP status codes
- Ability to implement REST API endpoints
- Error handling best practices
- Node.js module system
- Git workflow basics
- Debugging and problem-solving skills
- Time management under pressure

## 📱 Responsive Design

The interface adapts to different screen sizes:
- Desktop: Full three-panel layout
- Tablet: Adjusted panel widths
- Mobile: Stacked layout (recommended to use desktop for better experience)

## ⚠️ Important Notes

1. **One attempt per device**: Session is locked to device localStorage
2. **No pause feature**: Once started, the timer runs continuously
3. **Auto-save**: Code is saved automatically every time it changes
4. **Browser refresh**: Will restore session if exam is in progress
5. **Incognito mode**: Will create a new session (use carefully)

## 🔐 Security Considerations

- Session ID is device-specific
- No backend validation (client-side only for demo purposes)
- In production, implement server-side session management
- Consider adding student authentication
- Store results in a database for instructor access

## 📝 Future Enhancements

Potential improvements:
- [ ] Backend integration for result storage
- [ ] Student authentication system
- [ ] Multiple exam versions (randomize bugs)
- [ ] Code syntax highlighting
- [ ] Real-time instructor monitoring dashboard
- [ ] Export results to CSV
- [ ] Plagiarism detection
- [ ] Video proctoring integration

---

**Created for**: DCIT 26 - Application Development and Emerging Technologies  
**Target Duration**: 90 minutes  
**Difficulty Level**: Intermediate  
**Topics**: Express.js, Node.js, Git, REST APIs
