# 🎓 Student Quick-Start Guide - Lab Practical Exam

## ⏱️ Quick Facts

- **Time Limit:** 90 minutes
- **Maximum Score:** 100 points
- **Passing Score:** 60 points
- **Bugs to Fix:** 7 bugs in Express.js code
- **Hints Available:** 3 (costs 10 points each)
- **Format:** Individual, device-locked

---

## 🚀 Getting Started

### Step 1: Access the Exam
1. Navigate to **Lecture 4** → **Lab Practical Exam**
2. Read all instructions carefully
3. Make sure you have 90 uninterrupted minutes
4. Click **"Start Exam"** when ready

⚠️ **Warning:** The timer starts immediately when you click Start!

---

## 🖥️ Understanding the Interface

### Three-Panel Layout

```
┌─────────────┬──────────────────┬─────────────┐
│             │                  │             │
│  Problem    │   Code Editor    │  Console    │
│  Statement  │   (server.js)    │  Output     │
│  & Hints    │                  │             │
│             │                  │             │
└─────────────┴──────────────────┴─────────────┘
```

**Left Panel:** 
- Problem description
- List of 7 bugs to fix
- Git requirements
- 3 hints (can be revealed)

**Middle Panel:**
- The buggy Express.js code
- Edit directly in the textarea
- Two action buttons at top

**Right Panel:**
- Console output from tests
- Shows feedback messages
- Terminal-style display

---

## 🎯 The 7 Bugs You Need to Fix

### Quick Reference

1. **Middleware Order** - Security middleware must be first
2. **CORS Configuration** - Needs specific origin setting
3. **Health Check Status** - Wrong HTTP status code
4. **Missing Route** - POST endpoint not implemented
5. **Error Status Code** - Error handler missing status
6. **Port Error** - No error handling for port conflicts
7. **Module Export** - App not exported for testing

---

## 💡 Using Hints Wisely

### When to Use Hints

✅ **Use a hint if:**
- You're stuck for more than 15 minutes on one bug
- You've tried multiple approaches without success
- Time is running low and you need direction

❌ **Don't use hints if:**
- You can solve it with a bit more time
- You're not actively stuck yet
- You want to maximize your score

### Hint Cost Analysis

| Scenario | Hints Used | Deduction | Possible Score |
|----------|-----------|-----------|----------------|
| No hints | 0 | -0 | 100 |
| One hint | 1 | -10 | 90 |
| Two hints | 2 | -20 | 80 |
| All hints | 3 | -30 | 70 |

**Strategy:** Save hints for when truly stuck. Each hint can save time but costs points!

---

## 🧪 Testing Your Code

### Test Button
Click **"Test Code"** to:
- Run a syntax check
- Get general feedback
- Verify code compiles

**Note:** This does NOT run the actual grading tests!

### Submit Button
Click **"Submit Final Answer"** to:
- End the exam
- Run all 7 test cases
- Receive your final score

⚠️ **Warning:** Submission is final and cannot be undone!

---

## ⏰ Time Management Strategy

### Recommended Timeline

**First 15 minutes:**
- Read all problems carefully
- Understand what each bug might be
- Plan your approach

**Next 60 minutes:**
- Fix bugs systematically
- Test frequently
- Use hints if stuck >15 min

**Last 15 minutes:**
- Review all your fixes
- Double-check critical bugs
- Submit with confidence

### Time Warnings

- **Red pulsing timer:** Less than 10 minutes left
- **Auto-submit:** Happens at 0:00 automatically

---

## 📝 Git Best Practices (Conceptual)

While you can't actually run Git in the exam, demonstrate knowledge:

```bash
# Good commit message format:
git commit -m "fix: resolve middleware order and CORS config"

# Key principles:
✓ Use imperative mood ("fix" not "fixed")
✓ Be specific about what was fixed
✓ Keep first line under 50 characters
✓ Add details in body if needed
```

---

## 🎯 Scoring Breakdown

### Points Distribution

| Bug | Description | Points |
|-----|-------------|--------|
| 1 | Middleware Order | 15 |
| 2 | CORS Configuration | 10 |
| 3 | Health Check Status | 15 |
| 4 | Missing POST Route | 15 |
| 5 | Error Status Code | 15 |
| 6 | Port Error Handling | 15 |
| 7 | Module Export | 15 |
| **Total** | | **100** |

### Grade Scale

- **A (90-100):** Excellent work
- **B (80-89):** Very good
- **C (70-79):** Good
- **D (60-69):** Passing
- **F (0-59):** Not passing

---

## 🔧 Common Mistakes to Avoid

### ❌ Don't:
- Rush through without reading problems
- Ignore hint descriptions even if not using them
- Forget to save (auto-saves anyway, but be careful)
- Panic when timer shows red
- Submit without testing

### ✅ Do:
- Read each bug description carefully
- Use the Test button frequently
- Keep track of which bugs you've fixed
- Stay calm and methodical
- Review before submitting

---

## 🆘 Troubleshooting

### "My code disappeared!"
- **Solution:** Refresh the page - code auto-saves
- Your session will restore with all progress

### "Timer seems wrong"
- **Solution:** Based on start time, not system clock
- Refreshing recalculates correctly

### "Can't click Submit"
- **Check:** Make sure you've edited something
- **Try:** Click Test first, then Submit

### "Session already finished"
- **Cause:** You completed the exam on this device
- **Cannot:** Retake on same device (by design)

---

## 📊 After Submission

### What You'll See

1. **Overall Score** - Large display of X/100
2. **Pass/Fail Status** - With visual indicator
3. **Test Breakdown** - Which bugs you fixed
4. **Hints Used** - How many points deducted
5. **Session ID** - For reference

### Score Breakdown Example

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           YOUR RESULTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

           85 / 100
          🎉 PASSED!

Tests Passed: 6/7
Hints Used: 1
Deduction: -10 points

✅ Middleware Order [15 pts]
✅ CORS Configuration [10 pts]
✅ Health Check Status [15 pts]
❌ Missing POST Route [0 pts]
✅ Error Status Code [15 pts]
✅ Port Error Handling [15 pts]
✅ Module Export [15 pts]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 💪 Success Tips

### Before the Exam
1. Review Express.js middleware concepts
2. Study HTTP status codes (200, 404, 500, 503)
3. Practice implementing REST APIs
4. Understand error handling patterns
5. Get familiar with module.exports

### During the Exam
1. Stay calm and focused
2. Work methodically through each bug
3. Test frequently
4. Use hints when truly stuck (not as first resort)
5. Save time for final review

### After the Exam
1. Review what you missed
2. Understand the correct solutions
3. Learn from mistakes
4. Practice areas of weakness

---

## 🎓 Study Resources

### Key Concepts to Review

**Express.js:**
- Middleware execution order
- `app.use()` vs `app.get()` vs `app.post()`
- Request/response cycle
- Error handling middleware signature

**HTTP:**
- Status codes (200, 404, 500, 503)
- When to use each status code
- RESTful API conventions

**Node.js:**
- `module.exports` and `require()`
- Error handling in async code
- Process events

**Git:**
- Commit message best practices
- Staging and committing workflow

---

## ❓ FAQ

**Q: Can I pause the exam?**  
A: No, once started, the timer runs continuously.

**Q: What if my browser crashes?**  
A: Refresh the page - your session will restore.

**Q: Can I retake the exam?**  
A: No, session is locked to your device.

**Q: Are hints worth it?**  
A: Only if stuck - each hint costs 10 points but can save time.

**Q: How is the code graded?**  
A: Automatically by 7 test cases checking for specific fixes.

**Q: Can I see the test cases?**  
A: No, but test names are descriptive of what they check.

**Q: What if I don't finish in time?**  
A: Exam auto-submits and grades whatever fixes you completed.

**Q: Is there partial credit?**  
A: Yes! Each of 7 bugs is graded independently.

---

## 🎯 Final Checklist

Before starting the exam:
- [ ] I have 90 uninterrupted minutes
- [ ] My browser is up to date
- [ ] I've reviewed Express.js concepts
- [ ] I understand the scoring system
- [ ] I know how to use hints
- [ ] I'm ready to debug code
- [ ] I have a clear workspace

During the exam:
- [ ] Read all bug descriptions
- [ ] Work systematically
- [ ] Test code frequently
- [ ] Use hints wisely
- [ ] Keep track of time
- [ ] Review before submitting

---

## 🌟 Words of Encouragement

Remember:
- **You've been trained for this!**
- Take your time and think clearly
- Every bug fixed adds points
- Even 60/100 is passing
- Learn from mistakes for next time

**Good luck! You've got this! 💪**

---

## 📞 Need Help?

**Technical Issues:**
- Refresh the page first
- Clear browser cache
- Try different browser
- Contact instructor immediately

**Content Questions:**
- Use the hints system
- Review problem descriptions
- Think about similar examples from class

---

**Exam Version:** 1.0  
**Course:** DCIT 26 - Application Development  
**Duration:** 90 minutes  
**Max Score:** 100 points  
**Passing:** 60 points

---

Good luck with your exam! 🚀
