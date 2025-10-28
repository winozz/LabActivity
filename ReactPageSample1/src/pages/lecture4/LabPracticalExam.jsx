import React, { useState, useEffect, useRef } from 'react';

const LabPracticalExam = () => {
  // Session and timer state
  const [sessionId, setSessionId] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutes in seconds
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [examLocked, setExamLocked] = useState(false);
  
  // Student information
  const [studentNumber, setStudentNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [showStudentForm, setShowStudentForm] = useState(false);
  
  // Access control
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessPassword, setAccessPassword] = useState('');
  const [authError, setAuthError] = useState('');
  
  // Code editor state
  const [studentCode, setStudentCode] = useState('');
  const [testResults, setTestResults] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  const [showResultsModal, setShowResultsModal] = useState(false);
  
  // Hint and scoring state
  const [hintsRevealed, setHintsRevealed] = useState([false, false, false]);
  const [score, setScore] = useState(0);
  const [maxScore] = useState(100);
  
  // Instructor controls
  const [showInstructorPanel, setShowInstructorPanel] = useState(false);
  const [instructorPassword, setInstructorPassword] = useState('');
  
  // API testing state
  const [isApiTesting, setIsApiTesting] = useState(false);
  const [testEndpoint, setTestEndpoint] = useState('/api/users');
  const [testMethod, setTestMethod] = useState('GET');
  const [testRequestBody, setTestRequestBody] = useState('{\n  "name": "Test User",\n  "email": "test@example.com"\n}');
  
  // Simulated database for API testing
  const [simulatedUsers, setSimulatedUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' }
  ]);

  const timerRef = useRef(null);

  // Exam version - increment this when code changes
  const EXAM_VERSION = 2;

  // Initial broken code with multiple errors to fix
  const initialCode = `// Express.js REST API - Fix the errors below
const express = require('express');
const app = express();

// Middleware for parsing JSON (check if needed)
app.use(express.json());

// Sample users data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' }
];

// TODO: Fix the GET endpoint below
// Error 1: Wrong endpoint name (should be /api/users)
// Error 2: Not sending proper JSON response
// Error 3: Missing status code
app.get('/api/user', (req, res) => {
  res.send(users);
});

// TODO: Fix the POST endpoint to add new user
// Error 4: Wrong HTTP method (should be POST not GET)
// Error 5: Not accessing request body correctly
// Error 6: Missing proper response
app.get('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    role: 'user'
  };
  users.push(newUser);
  res.send('User added');
});

// Error 7: PORT constant not defined before use
// Error 8: Template literal syntax error
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});

// Error 9: Missing module.exports
`;

  const correctCode = `// Express.js REST API - Fix the errors below
const express = require('express');
const app = express();

// Middleware for parsing JSON (check if needed)
app.use(express.json());

// Sample users data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' }
];

// TODO: Fix the GET endpoint below
// Error 1: Wrong endpoint name (should be /api/users)
// Error 2: Not sending proper JSON response
// Error 3: Missing status code
app.get('/api/users', (req, res) => {
  res.status(200).json(users);
});

// TODO: Fix the POST endpoint to add new user
// Error 4: Wrong HTTP method (should be POST not GET)
// Error 5: Not accessing request body correctly
// Error 6: Missing proper response
app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    role: 'user'
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Error 7: PORT constant not defined before use
// Error 8: Template literal syntax error
const PORT = 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});

// Error 9: Missing module.exports
module.exports = app;
`;

  const hints = [
    {
      title: "Hint 1: GET Endpoint",
      content: "The GET endpoint path should be plural (/api/users). Use res.status(200).json(users) to send the response with proper status code and JSON format."
    },
    {
      title: "Hint 2: POST Endpoint",
      content: "Change app.get() to app.post() for the second endpoint. Use res.status(201).json(newUser) to return the created user with HTTP 201 (Created) status code."
    },
    {
      title: "Hint 3: Server Configuration",
      content: "Define 'const PORT = 3000;' before app.listen(). Use template literals: console.log(`Server running on port ${PORT}`). Add 'module.exports = app;' at the end."
    }
  ];

  // Initialize session on component mount
  useEffect(() => {
    const storedSession = localStorage.getItem('labExamSession');
    
    if (storedSession) {
      const session = JSON.parse(storedSession);
      
      // Check if exam version matches, if not, clear old session
      if (session.version !== EXAM_VERSION) {
        console.log('Exam version mismatch. Clearing old session...');
        localStorage.removeItem('labExamSession');
        return;
      }
      
      // Check if exam was already completed
      if (session.completed) {
        setExamLocked(true);
        setIsExamFinished(true);
        setScore(session.finalScore);
        setHintsRevealed(session.hintsUsed);
        setStudentNumber(session.studentNumber || '');
        setStudentName(session.studentName || '');
      } else if (session.startTime) {
        // Resume existing session
        const elapsed = Math.floor((Date.now() - session.startTime) / 1000);
        const remaining = Math.max(0, 60 * 60 - elapsed);
        
        if (remaining > 0) {
          setSessionId(session.id);
          setTimeRemaining(remaining);
          setIsExamStarted(true);
          setStudentCode(session.code || initialCode);
          setHintsRevealed(session.hintsUsed || [false, false, false]);
          setStudentNumber(session.studentNumber || '');
          setStudentName(session.studentName || '');
        } else {
          // Time expired
          finishExam(session.code || initialCode, session.hintsUsed || [false, false, false]);
        }
      }
    }
  }, []);

  // Timer countdown
  useEffect(() => {
    if (isExamStarted && !isExamFinished && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          
          // Save progress
          updateSession({ timeRemaining: newTime });
          
          if (newTime <= 0) {
            finishExam(studentCode, hintsRevealed);
            return 0;
          }
          return newTime;
        });
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [isExamStarted, isExamFinished, timeRemaining]);

  const startExam = () => {
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const session = {
      id: newSessionId,
      version: EXAM_VERSION,
      startTime: Date.now(),
      code: initialCode,
      hintsUsed: [false, false, false],
      completed: false,
      studentNumber: studentNumber,
      studentName: studentName
    };

    localStorage.setItem('labExamSession', JSON.stringify(session));
    setSessionId(newSessionId);
    setStudentCode(initialCode);
    setIsExamStarted(true);
    setShowStudentForm(false);
  };

  const updateSession = (updates) => {
    const storedSession = localStorage.getItem('labExamSession');
    if (storedSession) {
      const session = JSON.parse(storedSession);
      const updatedSession = { ...session, ...updates };
      localStorage.setItem('labExamSession', JSON.stringify(updatedSession));
    }
  };

  const revealHint = (index) => {
    if (!hintsRevealed[index]) {
      const newHintsRevealed = [...hintsRevealed];
      newHintsRevealed[index] = true;
      setHintsRevealed(newHintsRevealed);
      updateSession({ hintsUsed: newHintsRevealed });
    }
  };

  const evaluateCode = (codeToEvaluate = null) => {
    console.log('Evaluating code...');
    // Handle if called from onClick (event object) vs direct call (code string)
    const code = (typeof codeToEvaluate === 'string') ? codeToEvaluate : studentCode;
    let points = maxScore;
    const errors = [];
    const checks = [];

    // Check 1: Correct GET endpoint path (15 points)
    if (code.includes("app.get('/api/users'")) {
      checks.push({ test: "GET endpoint path is /api/users", passed: true });
    } else {
      checks.push({ test: "GET endpoint path is /api/users", passed: false });
      errors.push("GET endpoint should be '/api/users' (plural)");
      points -= 15;
    }

    // Check 2: Using res.json() for GET (15 points)
    // Extract the GET endpoint block - find app.get and capture until the closing });
    const getMatch = code.match(/app\.get\s*\(\s*['"]\/api\/users['"]\s*,\s*\([^)]*\)\s*=>\s*\{[^}]*\}\s*\)/);
    const hasGetJson = code.includes("app.get('/api/users'") && (code.includes('res.json(users)') || code.includes('.json(users)'));
    if (hasGetJson) {
      checks.push({ test: "GET uses res.json() for response", passed: true });
    } else {
      checks.push({ test: "GET uses res.json() for response", passed: false });
      errors.push("GET should use res.json(users) instead of res.send()");
      points -= 15;
    }

    // Check 3: Status code for GET (10 points)
    const hasGetStatus = code.includes("app.get('/api/users'") && code.includes('res.status(200)');
    if (hasGetStatus) {
      checks.push({ test: "GET has HTTP status 200", passed: true });
    } else {
      checks.push({ test: "GET has HTTP status 200", passed: false });
      errors.push("GET should set HTTP status code with res.status(200)");
      points -= 10;
    }

    // Check 4: POST method used correctly (15 points)
    if (code.includes("app.post('/api/users'")) {
      checks.push({ test: "POST method used for creating users", passed: true });
    } else {
      checks.push({ test: "POST method used for creating users", passed: false });
      errors.push("Should use app.post() not app.get() for adding users");
      points -= 15;
    }

    // Check 5: POST returns JSON response (15 points)
    // Check if both app.post and res.json(newUser) exist
    const hasPostJson = code.includes("app.post('/api/users'") && (code.includes('res.json(newUser)') || code.includes('.json(newUser)'));
    if (hasPostJson) {
      checks.push({ test: "POST returns JSON response with new user", passed: true });
    } else {
      checks.push({ test: "POST returns JSON response with new user", passed: false });
      errors.push("POST should return res.json(newUser) not res.send()");
      points -= 15;
    }

    // Check 6: POST has 201 status code (10 points)
    const hasPostStatus = code.includes("app.post('/api/users'") && code.includes('res.status(201)');
    if (hasPostStatus) {
      checks.push({ test: "POST has HTTP status 201", passed: true });
    } else {
      checks.push({ test: "POST has HTTP status 201", passed: false });
      errors.push("POST should use res.status(201) for resource creation");
      points -= 10;
    }

    // Check 7: PORT constant defined (10 points)
    if (code.includes('const PORT') || code.includes('let PORT') || code.includes('var PORT')) {
      checks.push({ test: "PORT constant is defined", passed: true });
    } else {
      checks.push({ test: "PORT constant is defined", passed: false });
      errors.push("PORT variable must be defined before use");
      points -= 10;
    }

    // Check 8: Module exports (10 points)
    if (code.includes('module.exports')) {
      checks.push({ test: "App is exported with module.exports", passed: true });
    } else {
      checks.push({ test: "App is exported with module.exports", passed: false });
      errors.push("Missing module.exports = app");
      points -= 10;
    }

    // Deduct points for hints
    const hintsUsedCount = hintsRevealed.filter(h => h).length;
    const hintDeduction = hintsUsedCount * 10;
    points = Math.max(0, points - hintDeduction);

    const results = {
      checks,
      errors,
      score: points,
      hintsDeduction: hintDeduction,
      passed: errors.length === 0
    };

    // Set test results first, then show modal
    setTestResults(results);
    // Use setTimeout to ensure state is updated before showing modal
    setTimeout(() => {
      setShowResultsModal(true);
    }, 0);

    return points;
  };

  const finishExam = (code, hints) => {
    setStudentCode(code);
    setHintsRevealed(hints);
    const finalScore = evaluateCode(code);
    
    setScore(finalScore);
    setIsExamFinished(true);
    setIsExamStarted(false);

    updateSession({
      completed: true,
      finalScore: finalScore,
      endTime: Date.now(),
      code: code,
      hintsUsed: hints
    });

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const submitExam = () => {
    if (window.confirm('Are you sure you want to submit your exam? This action cannot be undone.')) {
      finishExam(studentCode, hintsRevealed);
    }
  };

  const testApiEndpoint = () => {
    setIsApiTesting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (testMethod === 'GET') {
        // Test GET endpoint
        const hasCorrectEndpoint = studentCode.includes("app.get('/api/users'");
        const hasJsonResponse = studentCode.includes('res.json(users)') || studentCode.includes('.json(users)');
        const hasStatus = studentCode.includes('res.status(200)');

        if (hasCorrectEndpoint && hasJsonResponse && hasStatus) {
          setApiResponse({
            status: 200,
            statusText: 'OK',
            data: simulatedUsers,
            headers: {
              'content-type': 'application/json',
              'x-powered-by': 'Express'
            }
          });
        } else if (!hasCorrectEndpoint) {
          setApiResponse({
            status: 404,
            statusText: 'Not Found',
            data: { error: 'Cannot GET /api/users' },
            headers: { 'content-type': 'application/json' }
          });
        } else if (!hasJsonResponse || !hasStatus) {
          setApiResponse({
            status: 200,
            statusText: 'OK',
            data: 'Warning: Response format may be incorrect',
            headers: { 'content-type': 'text/html' }
          });
        }
      } else {
        // Test POST endpoint
        const hasCorrectMethod = studentCode.includes("app.post('/api/users'");
        const hasJsonResponse = studentCode.includes('res.json(newUser)') || studentCode.includes('.json(newUser)');
        const hasStatus201 = studentCode.includes('res.status(201)');

        if (hasCorrectMethod && hasJsonResponse && hasStatus201) {
          try {
            const requestBody = JSON.parse(testRequestBody);
            const newUser = {
              id: simulatedUsers.length + 1,
              name: requestBody.name,
              email: requestBody.email,
              role: 'user'
            };
            
            // Add user to simulated database
            setSimulatedUsers(prev => [...prev, newUser]);
            
            setApiResponse({
              status: 201,
              statusText: 'Created',
              data: newUser,
              headers: {
                'content-type': 'application/json',
                'x-powered-by': 'Express'
              }
            });
          } catch (e) {
            setApiResponse({
              status: 400,
              statusText: 'Bad Request',
              data: { error: 'Invalid JSON in request body' },
              headers: { 'content-type': 'application/json' }
            });
          }
        } else if (!hasCorrectMethod) {
          setApiResponse({
            status: 404,
            statusText: 'Not Found',
            data: { error: 'Cannot POST /api/users - Check HTTP method' },
            headers: { 'content-type': 'application/json' }
          });
        } else if (!hasStatus201) {
          setApiResponse({
            status: 200,
            statusText: 'OK',
            data: { message: 'User added', warning: 'Should use 201 status for resource creation' },
            headers: { 'content-type': 'application/json' }
          });
        } else {
          setApiResponse({
            status: 200,
            statusText: 'OK',
            data: 'Warning: Response format may be incorrect',
            headers: { 'content-type': 'text/html' }
          });
        }
      }
      
      setIsApiTesting(false);
    }, 800);
  };

  const resetSession = (password) => {
    if (password === 'instructor2025') {
      localStorage.removeItem('labExamSession');
      window.location.reload();
    } else {
      alert('Incorrect password!');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAccessPasswordSubmit = () => {
    if (accessPassword === 'exam1') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password. Please try again.');
    }
  };

  // Render access control screen
  if (!isAuthenticated) {
    return (
      <div style={styles.container}>
        <div style={styles.accessScreen}>
          <h1 style={styles.title}>Laboratory Practical Exam</h1>
          <h2 style={styles.subtitle}>Access Control</h2>
          
          <div style={styles.accessForm}>
            <p style={styles.accessDescription}>
              This exam is password-protected. Please enter the access password provided by your instructor.
            </p>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Access Password:</label>
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
                style={styles.input}
              />
              {authError && <p style={styles.errorText}>{authError}</p>}
            </div>

            <button 
              style={styles.startButton}
              onClick={handleAccessPasswordSubmit}
            >
              Access Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render locked screen if exam already taken
  if (examLocked && !showInstructorPanel) {
    return (
      <div style={styles.container}>
        <div style={styles.lockedScreen}>
          <h1 style={styles.title}>Exam Already Completed</h1>
          <p style={styles.lockedText}>
            This device has already been used to complete the exam.
          </p>
          <div style={styles.scoreDisplay}>
            <h2>Your Final Score</h2>
            <div style={styles.finalScore}>{score} / {maxScore}</div>
            <p>Hints Used: {hintsRevealed.filter(h => h).length} (-{hintsRevealed.filter(h => h).length * 10} points)</p>
          </div>
          <button 
            style={styles.instructorButton}
            onClick={() => setShowInstructorPanel(true)}
          >
            Instructor Controls
          </button>
        </div>

        {showInstructorPanel && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <h3>Instructor Session Reset</h3>
              <input
                type="password"
                placeholder="Enter instructor password"
                value={instructorPassword}
                onChange={(e) => setInstructorPassword(e.target.value)}
                style={styles.input}
              />
              <div style={styles.modalButtons}>
                <button 
                  onClick={() => resetSession(instructorPassword)}
                  style={styles.resetButton}
                >
                  Reset Session
                </button>
                <button 
                  onClick={() => setShowInstructorPanel(false)}
                  style={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
              <p style={styles.hint}></p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Render start screen
  if (!isExamStarted && !isExamFinished) {
    return (
      <div style={styles.container}>
        <div style={styles.startScreen}>
          <h1 style={styles.title}>Laboratory Practical Exam</h1>
          <h2 style={styles.subtitle}>Express.js REST API - GET Method</h2>
          
          {!showStudentForm ? (
            <>
              <div style={styles.instructions}>
                <h3>Instructions</h3>
                <ul style={styles.instructionList}>
                  <li><strong>Time Limit:</strong> 60 minutes</li>
                  <li><strong>Maximum Score:</strong> 100 points</li>
                  <li><strong>Task:</strong> Fix the errors in the Express.js REST API code</li>
                  <li><strong>Hints:</strong> 3 hints available (-10 points each)</li>
                  <li><strong>Testing:</strong> Use the API tester to verify your implementation</li>
                  <li><strong>Important:</strong> Once started, the exam cannot be paused. The session is locked to this device.</li>
                </ul>

                <h3>Learning Objectives</h3>
                <ul style={styles.instructionList}>
                  <li>Implement a basic Express.js GET endpoint</li>
                  <li>Use proper HTTP status codes</li>
                  <li>Send JSON responses correctly</li>
                  <li>Follow REST API naming conventions</li>
                  <li>Export Express applications properly</li>
                </ul>
              </div>

              <button 
                style={styles.startButton}
                onClick={() => setShowStudentForm(true)}
              >
                Start Exam
              </button>

              <button 
                style={styles.instructorButtonSmall}
                onClick={() => setShowInstructorPanel(true)}
              >
                Instructor Controls
              </button>
            </>
          ) : (
            <div style={styles.studentForm}>
              <h3 style={styles.formTitle}>Student Information</h3>
              <p style={styles.formDescription}>Please enter your details before starting the exam:</p>
              
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Student Number:</label>
                <input
                  type="text"
                  placeholder="e.g., 2021-12345"
                  value={studentNumber}
                  onChange={(e) => setStudentNumber(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Full Name:</label>
                <input
                  type="text"
                  placeholder="e.g., Juan Dela Cruz"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.formButtons}>
                <button 
                  style={styles.backButton}
                  onClick={() => setShowStudentForm(false)}
                >
                  Back
                </button>
                <button 
                  style={{
                    ...styles.startButton,
                    opacity: (!studentNumber || !studentName) ? 0.5 : 1,
                    cursor: (!studentNumber || !studentName) ? 'not-allowed' : 'pointer'
                  }}
                  onClick={startExam}
                  disabled={!studentNumber || !studentName}
                >
                  Begin Exam
                </button>
              </div>
            </div>
          )}
        </div>

        {showInstructorPanel && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <h3>Instructor Session Reset</h3>
              <input
                type="password"
                placeholder="Enter instructor password"
                value={instructorPassword}
                onChange={(e) => setInstructorPassword(e.target.value)}
                style={styles.input}
              />
              <div style={styles.modalButtons}>
                <button 
                  onClick={() => resetSession(instructorPassword)}
                  style={styles.resetButton}
                >
                  Reset Session
                </button>
                <button 
                  onClick={() => setShowInstructorPanel(false)}
                  style={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Render results screen
  if (isExamFinished) {
    return (
      <div style={styles.container}>
        <div style={styles.resultsScreen}>
          <h1 style={styles.title}>Exam Completed!</h1>
          
          {(studentNumber || studentName) && (
            <div style={styles.studentInfo}>
              <h3>Student Information</h3>
              <div style={styles.studentInfoRow}>
                <strong>Student Number:</strong> {studentNumber || 'N/A'}
              </div>
              <div style={styles.studentInfoRow}>
                <strong>Full Name:</strong> {studentName || 'N/A'}
              </div>
            </div>
          )}
          
          <div style={styles.scoreDisplay}>
            <h2>Your Final Score</h2>
            <div style={styles.finalScore}>{score} / {maxScore}</div>
            <p style={styles.gradeText}>
              {score >= 90 ? 'Excellent!' : 
               score >= 80 ? 'Very Good!' : 
               score >= 70 ? 'Passing' : 
               'Needs Improvement'}
            </p>
          </div>

          <div style={styles.resultsSection}>
            <h3>Score Breakdown</h3>
            <div style={styles.scoreBreakdown}>
              <div style={styles.breakdownItem}>
                <span>Base Score:</span>
                <span>{testResults ? (testResults.score + testResults.hintsDeduction) : 0} points</span>
              </div>
              <div style={styles.breakdownItem}>
                <span>Hints Used:</span>
                <span>-{hintsRevealed.filter(h => h).length * 10} points ({hintsRevealed.filter(h => h).length} hints)</span>
              </div>
              <div style={{...styles.breakdownItem, ...styles.totalItem}}>
                <span><strong>Final Score:</strong></span>
                <span><strong>{score} points</strong></span>
              </div>
            </div>
          </div>

          {testResults && (
            <div style={styles.resultsSection}>
              <h3>Test Results</h3>
              {testResults.checks.map((check, index) => (
                <div key={index} style={styles.checkItem}>
                  <span style={check.passed ? styles.checkPassed : styles.checkFailed}>
                    {check.passed ? '✓' : '✗'}
                  </span>
                  <span>{check.test}</span>
                </div>
              ))}
            </div>
          )}

          {testResults && testResults.errors.length > 0 && (
            <div style={styles.resultsSection}>
              <h3>Issues Found</h3>
              <ul style={styles.errorList}>
                {testResults.errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <div style={styles.resultsSection}>
            <h3>Your Code</h3>
            <pre style={styles.codePreview}>{studentCode}</pre>
          </div>

          <div style={styles.resultsSection}>
            <h3>Correct Solution</h3>
            <pre style={styles.codePreview}>{correctCode}</pre>
          </div>

          <button 
            style={styles.instructorButton}
            onClick={() => setShowInstructorPanel(true)}
          >
            Instructor Controls
          </button>
        </div>

        {showInstructorPanel && (
          <div style={styles.modal}>
            <div style={styles.modalContent}>
              <h3>Instructor Session Reset</h3>
              <input
                type="password"
                placeholder="Enter instructor password"
                value={instructorPassword}
                onChange={(e) => setInstructorPassword(e.target.value)}
                style={styles.input}
              />
              <div style={styles.modalButtons}>
                <button 
                  onClick={() => resetSession(instructorPassword)}
                  style={styles.resetButton}
                >
                  Reset Session
                </button>
                <button 
                  onClick={() => setShowInstructorPanel(false)}
                  style={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Render exam interface
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Laboratory Practical Exam</h1>
        <div style={styles.timerContainer}>
          <span style={timeRemaining < 300 ? styles.timerWarning : styles.timer}>
            {formatTime(timeRemaining)}
          </span>
          <button 
            style={styles.submitButton}
            onClick={submitExam}
          >
            Submit Exam
          </button>
        </div>
      </div>

      <div style={styles.mainContent}>
        {/* Instructions Panel */}
        <div style={styles.instructionsPanel}>
          <h3 style={styles.instructionsPanelTitle}>Instructions</h3>
          <div style={styles.instructionsContent}>
            <div style={styles.instructionItem}>
              <strong>Task:</strong> Fix all errors in the Express.js code
            </div>
            <div style={styles.instructionItem}>
              <strong>Time Limit:</strong> 60 minutes
            </div>
            <div style={styles.instructionItem}>
              <strong>Maximum Score:</strong> 100 points
            </div>
            <div style={styles.instructionItem}>
              <strong>Hints Available:</strong> 3 hints (-10 points each)
            </div>
            <div style={styles.instructionItem}>
              <strong>How to Test:</strong> Use "Check Code" button and API Tester
            </div>
            <div style={styles.instructionItem}>
              <strong>Objectives:</strong>
              <ul style={styles.objectivesList}>
                <li>Correct the API endpoint path</li>
                <li>Fix the response method</li>
                <li>Add proper HTTP status codes</li>
                <li>Define required constants</li>
                <li>Export the application module</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Left Panel - Code Editor */}
        <div style={styles.leftPanel}>
          <div style={styles.panelHeader}>
            <h3>Code Editor</h3>
            <span style={styles.fileName}>server.js</span>
          </div>
          
          <textarea
            value={studentCode}
            onChange={(e) => {
              setStudentCode(e.target.value);
              updateSession({ code: e.target.value });
            }}
            style={styles.codeEditor}
            spellCheck={false}
          />

          <div style={styles.editorActions}>
            <button 
              style={styles.testCodeButton}
              onClick={evaluateCode}
            >
              Check Code
            </button>
          </div>

          {/* Console Output Panel */}
          {testResults && testResults.errors.length > 0 && (
            <div style={styles.consoleOutput}>
              <div style={styles.consoleHeader}>
                <span style={styles.consoleTitle}>⚠ Issues to Fix</span>
                <button 
                  style={styles.clearConsoleButton}
                  onClick={() => setTestResults(null)}
                >
                  Clear
                </button>
              </div>
              
              <div style={styles.consoleBody}>
                {testResults.errors.map((error, index) => (
                  <div key={index} style={styles.consoleErrorLine}>
                    <span style={styles.consoleErrorIcon}>⚠</span>
                    <span style={styles.consoleErrorText}>{error}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - API Tester & Hints */}
        <div style={styles.rightPanel}>
          {/* API Documentation & Tester */}
          <div style={styles.apiPanel}>
            <h3>API Documentation & Tester</h3>
            
            <div style={styles.apiDocs}>
              {/* GET Endpoint */}
              <div style={styles.endpointCard}>
                <div style={styles.methodBadge}>GET</div>
                <code style={styles.endpointPath}>/api/users</code>
              </div>
              
              <p style={styles.apiDescription}>
                Retrieves a list of all users from the database.
              </p>

              <h4 style={styles.sectionTitle}>GET Response</h4>
              <pre style={styles.codeBlock}>
{`Status: 200 OK
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin"
  },
  ...
]`}
              </pre>

              {/* POST Endpoint */}
              <div style={{...styles.endpointCard, marginTop: '20px'}}>
                <div style={{...styles.methodBadge, backgroundColor: '#3498db'}}>POST</div>
                <code style={styles.endpointPath}>/api/users</code>
              </div>
              
              <p style={styles.apiDescription}>
                Creates a new user in the database.
              </p>

              <h4 style={styles.sectionTitle}>POST Request Body</h4>
              <pre style={styles.codeBlock}>
{`{
  "name": "New User",
  "email": "newuser@example.com"
}`}
              </pre>

              <h4 style={styles.sectionTitle}>POST Response</h4>
              <pre style={styles.codeBlock}>
{`Status: 201 Created
{
  "id": 4,
  "name": "New User",
  "email": "newuser@example.com",
  "role": "user"
}`}
              </pre>

              <h4 style={styles.sectionTitle}>Response Codes</h4>
              <div style={styles.responseCode}>
                <span style={styles.code200}>200</span> OK - GET success
              </div>
              <div style={styles.responseCode}>
                <span style={{...styles.code200, backgroundColor: '#3498db'}}>201</span> Created - POST success
              </div>
              <div style={styles.responseCode}>
                <span style={styles.code404}>404</span> Not Found - Endpoint doesn't exist
              </div>
            </div>

            {/* API Tester Interface */}
            <div style={styles.apiTester}>
              <h4 style={styles.sectionTitle}>Test Your API</h4>
              
              <div style={styles.testerRow}>
                <label style={styles.testerLabel}>Method:</label>
                <select 
                  value={testMethod} 
                  onChange={(e) => setTestMethod(e.target.value)}
                  style={styles.methodSelect}
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                </select>
              </div>

              {testMethod === 'POST' && (
                <div style={styles.testerRow}>
                  <label style={styles.testerLabel}>Request Body (JSON):</label>
                  <textarea
                    value={testRequestBody}
                    onChange={(e) => setTestRequestBody(e.target.value)}
                    style={styles.requestBodyInput}
                    placeholder='{"name": "Test User", "email": "test@example.com"}'
                    rows={4}
                  />
                </div>
              )}

              <button 
                style={styles.testApiButton}
                onClick={testApiEndpoint}
                disabled={isApiTesting}
              >
                {isApiTesting ? 'Testing...' : `Test ${testMethod} /api/users`}
              </button>

              <button 
                style={{...styles.testApiButton, backgroundColor: '#e74c3c', marginTop: '10px'}}
                onClick={() => {
                  setSimulatedUsers([
                    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
                    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
                    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' }
                  ]);
                  setApiResponse(null);
                }}
              >
                Reset Database
              </button>
            </div>

            {apiResponse && (
              <div style={styles.apiResponse}>
                <h4>Response</h4>
                <div style={styles.responseStatus}>
                  <span style={apiResponse.status >= 200 && apiResponse.status < 300 ? styles.statusSuccess : styles.statusError}>
                    {apiResponse.status} {apiResponse.statusText}
                  </span>
                </div>
                <h5>Headers:</h5>
                <pre style={styles.responseData}>
                  {JSON.stringify(apiResponse.headers, null, 2)}
                </pre>
                <h5>Body:</h5>
                <pre style={styles.responseData}>
                  {typeof apiResponse.data === 'object' 
                    ? JSON.stringify(apiResponse.data, null, 2)
                    : apiResponse.data}
                </pre>
              </div>
            )}
          </div>

          {/* Hints Panel */}
          <div style={styles.hintsPanel}>
            <h3>Hints (10 points each)</h3>
            <p style={styles.hintsInfo}>
              Hints Used: {hintsRevealed.filter(h => h).length} / 3
            </p>
            
            {hints.map((hint, index) => (
              <div key={index} style={styles.hintCard}>
                {!hintsRevealed[index] ? (
                  <button 
                    style={styles.revealButton}
                    onClick={() => revealHint(index)}
                  >
                    Reveal Hint {index + 1} (-10 points)
                  </button>
                ) : (
                  <div style={styles.hintRevealed}>
                    <h4 style={styles.hintTitle}>{hint.title}</h4>
                    <p style={styles.hintContent}>{hint.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Test Results Modal */}
      {showResultsModal && testResults && (
        <div style={styles.modal}>
          <div style={styles.resultsModalContent}>
            <div style={styles.resultsModalHeader}>
              <h2 style={styles.resultsModalTitle}>Code Check Results</h2>
              <button 
                style={styles.closeButton}
                onClick={() => setShowResultsModal(false)}
              >
                ✕
              </button>
            </div>

            <div style={styles.resultsModalBody}>
              <div style={styles.checksSection}>
                <h3>Test Checks</h3>
                {testResults.checks.map((check, index) => (
                  <div key={index} style={styles.checkItem}>
                    <span style={check.passed ? styles.checkPassed : styles.checkFailed}>
                      {check.passed ? '✓' : '✗'}
                    </span>
                    <span>{check.test}</span>
                  </div>
                ))}
              </div>

              {testResults.errors.length > 0 && (
                <div style={styles.errorsSection}>
                  <h3>Issues to Fix</h3>
                  <ul style={styles.errorListModal}>
                    {testResults.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {testResults.hintsDeduction > 0 && (
                <div style={styles.hintsDeductionInfo}>
                  Hint Penalty: -{testResults.hintsDeduction} points
                </div>
              )}
            </div>

            <div style={styles.resultsModalFooter}>
              <button 
                style={styles.closeModalButton}
                onClick={() => setShowResultsModal(false)}
              >
                Continue Coding
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '20px',
  },
  startScreen: {
    maxWidth: '800px',
    margin: '50px auto',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '2.5em',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '1.5em',
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: '30px',
  },
  instructions: {
    marginBottom: '30px',
  },
  instructionList: {
    lineHeight: '1.8',
    color: '#34495e',
  },
  startButton: {
    width: '100%',
    padding: '15px',
    fontSize: '1.2em',
    fontWeight: 'bold',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '15px',
    transition: 'background-color 0.3s',
  },
  instructorButtonSmall: {
    width: '100%',
    padding: '10px',
    fontSize: '0.9em',
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  header: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  headerTitle: {
    margin: 0,
    fontSize: '1.8em',
  },
  timerContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  timer: {
    fontSize: '1.8em',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  timerWarning: {
    fontSize: '1.8em',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    color: '#e74c3c',
    animation: 'pulse 1s infinite',
  },
  submitButton: {
    padding: '12px 24px',
    fontSize: '1.1em',
    fontWeight: 'bold',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  mainContent: {
    display: 'grid',
    gridTemplateColumns: '280px 1.8fr 1fr',
    gap: '20px',
    height: 'calc(100vh - 200px)',
  },
  instructionsPanel: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    overflowY: 'auto',
  },
  instructionsPanelTitle: {
    margin: '0 0 15px 0',
    color: '#2c3e50',
    fontSize: '1.2em',
    borderBottom: '2px solid #3498db',
    paddingBottom: '10px',
  },
  instructionsContent: {
    fontSize: '0.9em',
    color: '#34495e',
  },
  instructionItem: {
    marginBottom: '12px',
    lineHeight: '1.6',
  },
  objectivesList: {
    marginTop: '8px',
    marginBottom: '0',
    paddingLeft: '20px',
    lineHeight: '1.8',
  },
  leftPanel: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    height: '100%',
  },
  rightPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    overflowY: 'auto',
  },
  panelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    paddingBottom: '10px',
    borderBottom: '2px solid #ecf0f1',
  },
  fileName: {
    color: '#7f8c8d',
    fontFamily: 'monospace',
  },
  codeEditor: {
    fontFamily: "'Courier New', monospace",
    fontSize: '14px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    backgroundColor: '#282c34',
    color: '#abb2bf',
    resize: 'none',
    lineHeight: '1.6',
    marginBottom: '15px',
    minHeight: '450px',
    height: '450px',
    overflowY: 'auto',
  },
  editorActions: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
  },
  testCodeButton: {
    padding: '10px 20px',
    fontSize: '1em',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  testResultsPanel: {
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    borderLeft: '4px solid #3498db',
    maxHeight: '250px',
    minHeight: '150px',
    overflowY: 'auto',
    flexShrink: 0,
  },
  checkItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 0',
    fontSize: '0.95em',
  },
  checkPassed: {
    color: '#27ae60',
    fontWeight: 'bold',
    fontSize: '1.2em',
  },
  checkFailed: {
    color: '#e74c3c',
    fontWeight: 'bold',
    fontSize: '1.2em',
  },
  scorePreview: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#3498db',
    color: 'white',
    borderRadius: '6px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  apiPanel: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  apiDocs: {
    marginBottom: '20px',
  },
  endpointCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    marginBottom: '15px',
  },
  methodBadge: {
    padding: '6px 12px',
    backgroundColor: '#27ae60',
    color: 'white',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '0.9em',
  },
  endpointPath: {
    fontSize: '1.1em',
    fontFamily: 'monospace',
    color: '#2c3e50',
  },
  apiDescription: {
    color: '#5a6c7d',
    lineHeight: '1.6',
  },
  sectionTitle: {
    marginTop: '15px',
    marginBottom: '10px',
    color: '#2c3e50',
  },
  codeBlock: {
    backgroundColor: '#282c34',
    color: '#abb2bf',
    padding: '15px',
    borderRadius: '6px',
    fontSize: '0.9em',
    overflow: 'auto',
  },
  responseCode: {
    padding: '8px',
    marginBottom: '5px',
    fontSize: '0.95em',
    color: '#34495e',
  },
  code200: {
    display: 'inline-block',
    padding: '4px 8px',
    backgroundColor: '#27ae60',
    color: 'white',
    borderRadius: '4px',
    fontWeight: 'bold',
    marginRight: '10px',
    fontSize: '0.85em',
  },
  code404: {
    display: 'inline-block',
    padding: '4px 8px',
    backgroundColor: '#e74c3c',
    color: 'white',
    borderRadius: '4px',
    fontWeight: 'bold',
    marginRight: '10px',
    fontSize: '0.85em',
  },
  testApiButton: {
    width: '100%',
    padding: '12px',
    fontSize: '1em',
    fontWeight: 'bold',
    backgroundColor: '#8e44ad',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '15px',
  },
  apiResponse: {
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '8px',
    borderLeft: '4px solid #8e44ad',
  },
  responseStatus: {
    marginBottom: '10px',
  },
  statusSuccess: {
    padding: '8px 12px',
    backgroundColor: '#27ae60',
    color: 'white',
    borderRadius: '4px',
    fontWeight: 'bold',
  },
  statusError: {
    padding: '8px 12px',
    backgroundColor: '#e74c3c',
    color: 'white',
    borderRadius: '4px',
    fontWeight: 'bold',
  },
  responseData: {
    backgroundColor: '#282c34',
    color: '#abb2bf',
    padding: '12px',
    borderRadius: '6px',
    fontSize: '0.85em',
    overflow: 'auto',
    maxHeight: '200px',
  },
  hintsPanel: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  hintsInfo: {
    color: '#7f8c8d',
    marginBottom: '15px',
  },
  hintCard: {
    marginBottom: '15px',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
  },
  revealButton: {
    width: '100%',
    padding: '12px',
    fontSize: '1em',
    fontWeight: 'bold',
    backgroundColor: '#f39c12',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  hintRevealed: {
    backgroundColor: '#fff3cd',
    padding: '15px',
    borderRadius: '6px',
    border: '1px solid #f39c12',
  },
  hintTitle: {
    color: '#856404',
    marginTop: 0,
    marginBottom: '10px',
  },
  hintContent: {
    color: '#533f03',
    margin: 0,
    lineHeight: '1.6',
  },
  resultsScreen: {
    maxWidth: '1000px',
    margin: '30px auto',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  scoreDisplay: {
    textAlign: 'center',
    padding: '30px',
    backgroundColor: '#ecf0f1',
    borderRadius: '12px',
    marginBottom: '30px',
  },
  finalScore: {
    fontSize: '4em',
    fontWeight: 'bold',
    color: '#27ae60',
    margin: '20px 0',
  },
  gradeText: {
    fontSize: '1.5em',
    color: '#7f8c8d',
  },
  resultsSection: {
    marginBottom: '30px',
  },
  scoreBreakdown: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
  },
  breakdownItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #dee2e6',
  },
  totalItem: {
    borderBottom: 'none',
    borderTop: '2px solid #2c3e50',
    marginTop: '10px',
    paddingTop: '15px',
  },
  errorList: {
    backgroundColor: '#f8d7da',
    padding: '20px',
    borderRadius: '8px',
    color: '#721c24',
    lineHeight: '1.8',
  },
  codePreview: {
    backgroundColor: '#282c34',
    color: '#abb2bf',
    padding: '20px',
    borderRadius: '8px',
    overflow: 'auto',
    fontSize: '0.9em',
    lineHeight: '1.6',
  },
  instructorButton: {
    width: '100%',
    padding: '12px',
    fontSize: '1em',
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  lockedScreen: {
    maxWidth: '600px',
    margin: '100px auto',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  lockedText: {
    fontSize: '1.2em',
    color: '#7f8c8d',
    marginBottom: '30px',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    maxWidth: '400px',
    width: '90%',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '1em',
    border: '1px solid #ddd',
    borderRadius: '6px',
    marginBottom: '15px',
    boxSizing: 'border-box',
  },
  modalButtons: {
    display: 'flex',
    gap: '10px',
  },
  resetButton: {
    flex: 1,
    padding: '12px',
    fontSize: '1em',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  cancelButton: {
    flex: 1,
    padding: '12px',
    fontSize: '1em',
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  hint: {
    marginTop: '15px',
    fontSize: '0.85em',
    color: '#7f8c8d',
    textAlign: 'center',
  },
  studentForm: {
    marginTop: '30px',
    padding: '30px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    border: '2px solid #3498db',
  },
  formTitle: {
    marginTop: 0,
    marginBottom: '10px',
    color: '#2c3e50',
    fontSize: '1.5em',
  },
  formDescription: {
    color: '#7f8c8d',
    marginBottom: '25px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  formLabel: {
    display: 'block',
    marginBottom: '8px',
    color: '#34495e',
    fontWeight: 'bold',
  },
  formButtons: {
    display: 'flex',
    gap: '10px',
    marginTop: '25px',
  },
  backButton: {
    flex: 1,
    padding: '12px',
    fontSize: '1em',
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  studentInfo: {
    backgroundColor: '#e8f4f8',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '20px',
    border: '2px solid #3498db',
  },
  studentInfoRow: {
    padding: '8px 0',
    fontSize: '1.05em',
    color: '#2c3e50',
  },
  accessScreen: {
    maxWidth: '600px',
    margin: '100px auto',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  accessForm: {
    marginTop: '30px',
  },
  accessDescription: {
    color: '#7f8c8d',
    marginBottom: '25px',
    textAlign: 'center',
    fontSize: '1.05em',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: '0.9em',
    marginTop: '8px',
    marginBottom: '0',
  },
  resultsModalContent: {
    backgroundColor: 'white',
    borderRadius: '12px',
    maxWidth: '700px',
    width: '90%',
    maxHeight: '85vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  resultsModalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '25px 30px',
    borderBottom: '2px solid #ecf0f1',
    backgroundColor: '#f8f9fa',
  },
  resultsModalTitle: {
    margin: 0,
    color: '#2c3e50',
    fontSize: '1.8em',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.8em',
    color: '#7f8c8d',
    cursor: 'pointer',
    padding: '0',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    transition: 'all 0.2s',
  },
  resultsModalBody: {
    padding: '30px',
    overflowY: 'auto',
    flex: 1,
  },
  scorePreviewLarge: {
    padding: '20px',
    backgroundColor: '#3498db',
    color: 'white',
    borderRadius: '8px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.5em',
    marginBottom: '25px',
  },
  checksSection: {
    marginBottom: '25px',
  },
  errorsSection: {
    backgroundColor: '#f8d7da',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  errorListModal: {
    margin: '10px 0 0 0',
    paddingLeft: '25px',
    color: '#721c24',
    lineHeight: '1.8',
  },
  hintsDeductionInfo: {
    padding: '15px',
    backgroundColor: '#fff3cd',
    borderRadius: '8px',
    color: '#856404',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  resultsModalFooter: {
    padding: '20px 30px',
    borderTop: '2px solid #ecf0f1',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  closeModalButton: {
    padding: '12px 40px',
    fontSize: '1.1em',
    fontWeight: 'bold',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  // Console Output Styles
  consoleOutput: {
    marginTop: '15px',
    backgroundColor: '#1e1e1e',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '2px solid #3498db',
    maxHeight: '400px',
    display: 'flex',
    flexDirection: 'column',
  },
  consoleHeader: {
    backgroundColor: '#2d2d2d',
    padding: '10px 15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #3498db',
  },
  consoleTitle: {
    color: '#61dafb',
    fontWeight: 'bold',
    fontSize: '0.95em',
    fontFamily: 'monospace',
  },
  clearConsoleButton: {
    padding: '4px 12px',
    fontSize: '0.85em',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  consoleBody: {
    padding: '15px',
    color: '#d4d4d4',
    fontFamily: 'monospace',
    fontSize: '0.9em',
    overflowY: 'auto',
    maxHeight: '350px',
  },
  consoleScoreBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px',
    backgroundColor: '#2d2d2d',
    borderRadius: '6px',
    marginBottom: '12px',
    borderLeft: '4px solid #3498db',
  },
  consoleScoreLabel: {
    color: '#61dafb',
    fontWeight: 'bold',
  },
  consoleScoreValue: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: '1.1em',
  },
  passedBadge: {
    marginLeft: 'auto',
    padding: '4px 10px',
    backgroundColor: '#27ae60',
    color: 'white',
    borderRadius: '4px',
    fontSize: '0.85em',
    fontWeight: 'bold',
  },
  failedBadge: {
    marginLeft: 'auto',
    padding: '4px 10px',
    backgroundColor: '#e74c3c',
    color: 'white',
    borderRadius: '4px',
    fontSize: '0.85em',
    fontWeight: 'bold',
  },
  consoleSection: {
    marginBottom: '15px',
  },
  consoleSectionTitle: {
    color: '#61dafb',
    fontWeight: 'bold',
    marginBottom: '8px',
    fontSize: '0.95em',
  },
  consoleCheckLine: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    padding: '4px 0',
    lineHeight: '1.5',
  },
  consoleCheckPass: {
    color: '#27ae60',
    fontWeight: 'bold',
    minWidth: '30px',
  },
  consoleCheckFail: {
    color: '#e74c3c',
    fontWeight: 'bold',
    minWidth: '30px',
  },
  consoleCheckText: {
    color: '#d4d4d4',
  },
  consoleErrorLine: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    padding: '6px 10px',
    backgroundColor: '#3d2626',
    borderRadius: '4px',
    marginBottom: '6px',
    borderLeft: '3px solid #e74c3c',
  },
  consoleErrorIcon: {
    color: '#f39c12',
    fontWeight: 'bold',
  },
  consoleErrorText: {
    color: '#f8d7da',
    lineHeight: '1.5',
  },
  consoleHintLine: {
    padding: '8px 12px',
    backgroundColor: '#3d3526',
    borderRadius: '4px',
    color: '#f39c12',
    borderLeft: '3px solid #f39c12',
  },
  apiTester: {
    marginBottom: '15px',
  },
  testerRow: {
    marginBottom: '12px',
  },
  testerLabel: {
    display: 'block',
    color: '#61dafb',
    fontWeight: 'bold',
    marginBottom: '6px',
    fontSize: '0.95em',
  },
  methodSelect: {
    width: '100%',
    padding: '8px',
    backgroundColor: '#2d2d2d',
    color: '#d4d4d4',
    border: '1px solid #3e3e3e',
    borderRadius: '4px',
    fontSize: '0.9em',
    cursor: 'pointer',
  },
  requestBodyInput: {
    width: '100%',
    minHeight: '100px',
    padding: '10px',
    backgroundColor: '#1e1e1e',
    color: '#d4d4d4',
    border: '1px solid #3e3e3e',
    borderRadius: '4px',
    fontFamily: 'monospace',
    fontSize: '0.9em',
    resize: 'vertical',
    lineHeight: '1.5',
  },
};

export default LabPracticalExam;
