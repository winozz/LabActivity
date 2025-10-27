# Instructor Guide - Laboratory Practical Exam

## 📚 Overview

This guide provides instructions for instructors on how to administer the Express.js Laboratory Practical Exam, interpret results, and handle common scenarios.

---

## 🎯 Exam Objectives

Students will demonstrate their ability to:
1. Debug and fix middleware configuration issues
2. Implement proper HTTP status codes
3. Create RESTful API endpoints
4. Handle errors appropriately
5. Export Node.js modules correctly
6. Follow Git best practices
7. Work under time constraints

---

## ⏱️ Exam Specifications

| Specification | Details |
|--------------|---------|
| **Duration** | 90 minutes |
| **Total Points** | 100 (before deductions) |
| **Passing Score** | 60 points |
| **Number of Bugs** | 7 bugs to fix |
| **Hints Available** | 3 hints (-10 points each) |
| **Minimum Score** | 70 (using all 3 hints) |
| **Format** | Individual, device-locked |

---

## 🚀 Before the Exam

### 1. Technical Setup

Ensure all students have:
- [ ] Modern web browser (Chrome, Firefox, Edge)
- [ ] Working internet connection
- [ ] Access to the exam URL: `/lecture4/lab-exam`
- [ ] Cleared browser cache (or use incognito for fresh session)
- [ ] Basic understanding of Express.js and Git

### 2. Pre-Exam Briefing

Inform students about:
- 90-minute time limit with auto-submit
- Device-locked sessions (cannot retake on same device)
- Hint system and point deductions
- Code editor interface and tools
- Git requirements (conceptual, shown in hints)
- Passing score requirement

### 3. Test the System

Before exam day:
- [ ] Navigate to exam page and start a test session
- [ ] Verify timer countdown works
- [ ] Test hint reveal functionality
- [ ] Check code editor responsiveness
- [ ] Verify test code button works
- [ ] Confirm submit and scoring work correctly
- [ ] Test session persistence (refresh page)

---

## 📋 During the Exam

### Monitoring

1. **Time Management**
   - Exam auto-starts when student clicks "Start Exam"
   - Timer is visible at top of screen
   - Red pulsing alert when < 10 minutes remain
   - Auto-submit at 0:00

2. **Student Assistance**
   - **Do not** reveal bugs directly
   - **Can** clarify general concepts
   - **Can** help with interface issues
   - **Cannot** debug their specific code
   - Direct students to use hints if stuck

3. **Technical Issues**

   **Browser Crash/Refresh:**
   - Session is automatically restored from localStorage
   - Timer continues from last saved state
   - Code is preserved

   **Session Issues:**
   - Session ID is unique per device
   - Cannot be transferred to another device
   - To reset: clear localStorage or use different browser
   ```javascript
   // To manually clear session (instructor console):
   localStorage.removeItem('labExamSessionId');
   localStorage.removeItem('labExam_[sessionId]');
   ```

   **Cannot Access Exam:**
   - Verify correct URL path
   - Check browser console for errors
   - Try incognito mode for fresh session

---

## 📊 Grading Rubric

### Automatic Scoring System

The exam automatically grades based on 7 test cases:

| Test Case | Points | What It Checks |
|-----------|--------|----------------|
| Middleware Order | 15 | `helmet()` before `cors()` |
| CORS Configuration | 10 | `cors({ origin: '...' })` present |
| Health Check Status | 15 | Returns 503 on error condition |
| POST Endpoint | 15 | `/api/data` route exists with `req.body` |
| Error Status Code | 15 | Error middleware sets `res.status()` |
| Listen Error Handler | 15 | Handles EADDRINUSE with `.on('error')` |
| Module Export | 15 | `module.exports = app` present |
| **Subtotal** | **100** | |
| Hint Deductions | -10 each | Up to -30 points |
| **Final Range** | **70-100** | |

### Grade Scale

| Score | Grade | Status |
|-------|-------|--------|
| 90-100 | A | Excellent |
| 80-89 | B | Very Good |
| 70-79 | C | Good |
| 60-69 | D | Passing |
| 0-59 | F | Failing |

---

## 🔍 Reviewing Student Results

### Accessing Results

Students see results immediately upon submission:
- Overall score (X/100)
- Pass/fail status
- Individual test results
- Hints used and deductions
- Session ID for reference

### Interpreting Results

**Perfect Score (100):**
- Fixed all 7 bugs correctly
- Used no hints
- Demonstrates mastery

**High Score (80-99):**
- Most bugs fixed
- May have used 1-2 hints
- Strong understanding

**Passing Score (60-79):**
- Fixed essential bugs
- Likely used all hints
- Adequate understanding

**Failing Score (<60):**
- Missing critical fixes
- May need review session
- Consider remedial work

### Common Mistake Patterns

1. **Middleware Order (15 pts)**
   - Student often forgets security-first principle
   - May not understand middleware execution order

2. **CORS Config (10 pts)**
   - Students miss the security implication
   - May think `cors()` alone is sufficient

3. **Status Codes (15 pts)**
   - Confusion about when to use 200 vs 503
   - May not understand HTTP semantics

4. **Missing Route (15 pts)**
   - Students might overlook the requirement
   - Shows reading comprehension issue

5. **Error Handling (30 pts total)**
   - Both error middleware and listen errors
   - Shows understanding of robust error handling

6. **Module Export (15 pts)**
   - Often forgotten
   - Critical for testing and modularity

---

## 📝 After the Exam

### 1. Review Session (Recommended)

Hold a class review covering:
- Each bug and why it's important
- Best practices for Express.js
- Common mistakes observed
- Security considerations
- Professional error handling

### 2. Individual Feedback

For students who struggled:
- Identify specific knowledge gaps
- Recommend resources
- Offer practice problems
- Consider retake policy

### 3. Exam Analytics

Track across all students:
- Average score
- Most missed test cases
- Hint usage patterns
- Time completion statistics
- Pass/fail rate

**Example analysis questions:**
- Which bugs were most commonly fixed?
- Which bugs were most commonly missed?
- Did students who used hints perform better?
- Was 90 minutes adequate time?

---

## 🔧 Customizing the Exam

### Change Difficulty

**Make Easier:**
```javascript
// In LabExam.jsx
const EXAM_DURATION = 120 * 60 * 1000; // 120 minutes
const HINT_PENALTY = 5; // Reduce penalty
```

**Make Harder:**
```javascript
const EXAM_DURATION = 60 * 60 * 1000; // 60 minutes
const HINT_PENALTY = 15; // Increase penalty
// Add more complex bugs to buggyCode
```

### Add New Test Cases

```javascript
// In testCases array
{
  id: 8,
  name: "Rate limiting middleware present",
  test: (code) => {
    return code.includes('rate-limit') || code.includes('rateLimit');
  },
  points: 10
}
```

### Modify Hints

```javascript
// In hints array
{
  id: 4,
  title: "Your New Hint",
  content: "Your hint content here..."
}
```

---

## 🎓 Pedagogical Notes

### Learning Objectives Assessed

1. **Knowledge** (Remembering)
   - Recall Express.js middleware syntax
   - Remember HTTP status codes

2. **Comprehension** (Understanding)
   - Explain middleware execution order
   - Describe error handling flow

3. **Application** (Applying)
   - Apply correct status codes
   - Implement error handlers

4. **Analysis** (Analyzing)
   - Debug existing code
   - Identify security issues

5. **Synthesis** (Creating)
   - Create missing endpoints
   - Construct proper exports

6. **Evaluation** (Evaluating)
   - Judge code quality
   - Assess security practices

### Bloom's Taxonomy Level

This exam primarily targets **Application** and **Analysis** levels, with elements of **Evaluation**.

---

## 📞 Troubleshooting

### Common Issues & Solutions

#### "Student can't start the exam"
- **Check:** Browser compatibility
- **Check:** JavaScript enabled
- **Solution:** Use Chrome/Firefox, clear cache

#### "Timer shows negative time"
- **Cause:** System clock change
- **Solution:** Refresh page, timer recalculates

#### "Code not saving"
- **Check:** localStorage enabled
- **Check:** Not in private browsing
- **Solution:** Enable localStorage, use regular browser

#### "Session already exists"
- **Cause:** Previous attempt on same device
- **Solution:** Clear localStorage or use different device
```javascript
// In browser console:
localStorage.clear();
```

#### "Scoring seems incorrect"
- **Check:** Review test case logic
- **Verify:** Student code against solution
- **Note:** Scoring is strict pattern matching

---

## 📚 Resources for Students

### Recommended Study Materials

**Before the exam:**
1. Express.js Official Documentation
2. Node.js Error Handling Guide
3. HTTP Status Codes Reference
4. Git Commit Message Best Practices

**Practice Resources:**
1. Express.js debugging exercises
2. Middleware ordering tutorials
3. REST API implementation guides
4. Error handling patterns

---

## 🔐 Academic Integrity

### Preventing Cheating

1. **Device Locking:** Session bound to device
2. **Time Limit:** Prevents external research
3. **Randomization:** Could implement multiple versions
4. **Monitoring:** In-person administration recommended

### Handling Violations

If suspected cheating:
1. Document session ID
2. Compare code submissions
3. Interview student about solution
4. Follow institutional policy

---

## 📊 Success Metrics

### Ideal Distribution

For a well-designed exam:
- **90-100:** 20-30% of students
- **80-89:** 30-40% of students
- **70-79:** 20-30% of students
- **60-69:** 10-15% of students
- **0-59:** 5-10% of students

### Red Flags

**Too Easy (adjust difficulty):**
- >50% perfect scores
- Average score >85
- Most students finish early

**Too Hard (adjust difficulty):**
- >40% failing
- Average score <60
- High hint usage across all students

---

## 📧 Student Communication Templates

### Pre-Exam Announcement

```
Subject: Lab Practical Exam - Express.js & Git

Dear Students,

The laboratory practical exam will be held on [DATE] at [TIME].

Details:
- Duration: 90 minutes
- Topics: Express.js, REST APIs, Error Handling, Git
- Format: Individual, online IDE
- Location: [URL]

Preparation:
- Review Express.js middleware
- Study HTTP status codes
- Practice error handling
- Understand Git basics

Important:
- One attempt per device
- Exam auto-submits at time limit
- 3 hints available (-10 points each)
- Passing score: 60/100

Good luck!
```

### Post-Exam Feedback

```
Subject: Lab Exam Results - [Student Name]

Dear [Student Name],

Your lab exam results:

Score: [X]/100
Status: [Pass/Fail]
Session ID: [session_xxx]

Breakdown:
- Tests Passed: [X]/7
- Hints Used: [X]
- Deductions: -[X] points

[If passed:]
Congratulations! You demonstrated strong understanding of Express.js concepts.

[If failed:]
Please schedule office hours to review areas for improvement.

Best regards,
[Instructor Name]
```

---

## 🎯 Future Improvements

Consider implementing:
- [ ] Multiple exam versions (randomized bugs)
- [ ] Backend result storage
- [ ] Student authentication
- [ ] Instructor dashboard
- [ ] Export results to CSV/PDF
- [ ] Code playback feature
- [ ] Plagiarism detection
- [ ] Partial credit for near-matches

---

## 📖 Appendix

### A. Complete Solution
See `LAB_EXAM_SOLUTION.js` for the complete fixed code.

### B. Test Case Logic
Each test case uses regex or substring matching to verify fixes.

### C. Session Storage Schema
```javascript
{
  sessionId: "session_timestamp_random",
  started: boolean,
  finished: boolean,
  startTime: timestamp,
  endTime: timestamp,
  code: string,
  hintsUsed: array,
  score: number,
  testResults: array
}
```

---

**Document Version:** 1.0  
**Last Updated:** 2025-10-27  
**Course:** DCIT 26 - Application Development  
**Contact:** [Your Contact Information]
