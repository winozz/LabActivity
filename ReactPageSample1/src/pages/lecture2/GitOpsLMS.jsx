import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sessionManager } from '../../utils/SessionManager.js';
import EmbeddedSimulator from '../../components/EmbeddedSimulator.jsx';

const GitOpsLMS = ({ courseData, courseId = 'gitops-devops-course' }) => {
  const [currentModule, setCurrentModule] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResults, setQuizResults] = useState(null);
  const [userProgress, setUserProgress] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [timeSpent, setTimeSpent] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState(Date.now());

  // Load session data on component mount
  useEffect(() => {
    const savedProgress = sessionManager.getCourseProgress(courseId);
    setCurrentModule(savedProgress.currentModule || 0);
    setCurrentLesson(savedProgress.currentLesson || 0);
    setCompletedLessons(new Set(savedProgress.completedLessons || []));
    setUserProgress(savedProgress.completionPercentage || 0);
    setTimeSpent(savedProgress.timeSpent || 0);
    setSessionStartTime(Date.now());
  }, [courseId]);

  // Auto-save progress every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const sessionTime = Math.floor((Date.now() - sessionStartTime) / 60000); // minutes
      if (sessionTime > 0) {
        sessionManager.updateTimeSpent(courseId, sessionTime);
        setSessionStartTime(Date.now());
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [courseId, sessionStartTime]);

  const courseModules = courseData || [
    {
      id: 1,
      title: "DevOps Fundamentals",
      description: "Understanding the basics of DevOps culture and practices",
      duration: "45 minutes",
      lessons: [
        {
          id: 1,
          title: "Introduction to DevOps",
          content: {
            overview: "DevOps bridges the gap between development and operations teams, creating a culture of collaboration and shared responsibility. It's a methodology that combines software development and IT operations to shorten the development lifecycle and provide continuous delivery with high software quality.",
            keyPoints: [
              "DevOps is both a culture and a set of practices that emphasize collaboration",
              "It focuses on automation, monitoring, and continuous improvement",
              "The primary goal is to deliver software faster and more reliably",
              "DevOps reduces the time between writing code and deploying it to production",
              "It breaks down silos between development and operations teams",
              "Emphasizes shared responsibility for the entire application lifecycle"
            ],
            practicalExample: {
              title: "Real-World Example: Netflix's DevOps Success",
              content: "Netflix is a prime example of DevOps success. They deploy code thousands of times per day using automated pipelines. Their teams can push new features to millions of users within hours, not months. Netflix's approach includes: microservices architecture, automated testing, continuous deployment, chaos engineering for resilience testing, and comprehensive monitoring systems."
            },
            keyTakeaways: [
              "DevOps is fundamentally about people, processes, and tools working together harmoniously",
              "Automation is crucial for scaling operations and maintaining reliability",
              "Continuous improvement and learning from failures is at the heart of DevOps culture",
              "Success requires organizational commitment, not just technical changes"
            ],
            codeExample: {
              title: "Simple CI/CD Pipeline Example",
              language: "yaml",
              code: `# .github/workflows/deploy.yml
name: Deploy Application
on:
  push:
    branches: [main]
jobs:
  test-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Tests
        run: npm test
      - name: Build Application
        run: npm run build
      - name: Deploy to Production
        run: npm run deploy
        if: success()`
            }
          },
          quiz: [
            {
              question: "What is the primary goal of DevOps?",
              options: [
                "To replace operations teams with developers",
                "To deliver software faster and more reliably through collaboration",
                "To automate everything in software development",
                "To reduce the number of people needed for software delivery"
              ],
              correct: 1
            },
            {
              question: "Which of these is NOT a core DevOps principle?",
              options: [
                "Collaboration between teams",
                "Continuous improvement",
                "Working in isolated silos",
                "Automation of repetitive tasks"
              ],
              correct: 2
            },
            {
              question: "What does Netflix's success with DevOps primarily demonstrate?",
              options: [
                "That only large companies can implement DevOps",
                "The importance of microservices architecture only",
                "How DevOps enables rapid, reliable software delivery at scale",
                "That DevOps is only useful for streaming services"
              ],
              correct: 2
            }
          ]
        },
        {
          id: 2,
          title: "DevOps vs Traditional Development",
          content: {
            overview: "Understanding the key differences between traditional software development and DevOps practices reveals why organizations are making this transformation. Traditional development often creates bottlenecks and inefficiencies that DevOps methodologies are designed to eliminate.",
            keyPoints: [
              "Traditional development typically has long, infrequent release cycles (months or quarters)",
              "DevOps enables continuous delivery with daily or even hourly deployments",
              "Traditional approach: 'Throw it over the wall' mentality between teams",
              "DevOps approach: Shared responsibility throughout the entire application lifecycle",
              "Traditional: Manual testing and deployment processes prone to human error",
              "DevOps: Automated testing, building, and deployment for consistency and speed"
            ],
            practicalExample: {
              title: "Traditional vs DevOps: A Side-by-Side Comparison",
              content: "Traditional Approach: 6-month release cycles → Manual testing → Big-bang deployments → Difficult rollbacks → Blame culture → Separate dev/ops teams. DevOps Approach: Daily/hourly deployments → Automated testing → Incremental changes → Easy rollbacks → Collaborative culture → Integrated teams with shared goals."
            },
            keyTakeaways: [
              "DevOps significantly reduces risk through smaller, more frequent releases",
              "Feedback loops are shorter and more actionable, leading to better products",
              "Quality is built into the process, not just tested at the end",
              "Teams become more responsive to business needs and customer feedback"
            ],
            codeExample: {
              title: "Traditional vs DevOps Deployment Comparison",
              language: "bash",
              code: `# Traditional Deployment (Manual)
# 1. Manual server setup
# 2. Manual file copying
scp app.jar user@server:/opt/app/
ssh user@server "sudo service app restart"
# 3. Manual verification
# 4. Manual rollback if issues

# DevOps Deployment (Automated)
# 1. Automated pipeline trigger
git push origin main
# 2. Automated testing, building, and deployment
# 3. Automated health checks
# 4. Automated rollback on failure`
            }
          },
          quiz: [
            {
              question: "What is a key advantage of frequent, small deployments over big-bang releases?",
              options: [
                "They require less testing",
                "They reduce risk and make problems easier to identify and fix",
                "They eliminate the need for rollback plans",
                "They can only be done with expensive DevOps tools"
              ],
              correct: 1
            },
            {
              question: "In traditional development, what typically happens between development and operations teams?",
              options: [
                "Continuous collaboration",
                "Shared responsibility for outcomes",
                "'Throw it over the wall' mentality with limited communication",
                "Joint planning and execution"
              ],
              correct: 2
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Version Control with Git",
      description: "Master Git workflows and collaborative development",
      duration: "60 minutes",
      lessons: [
        {
          id: 3,
          title: "Git Fundamentals",
          content: {
            overview: "Git is the foundation of modern software development, enabling teams to collaborate effectively and track every change. As a distributed version control system, Git provides powerful features for managing code history, branching strategies, and collaborative workflows that are essential for DevOps practices.",
            keyPoints: [
              "Git is a distributed version control system - no single point of failure",
              "Every clone contains the complete project history and metadata",
              "Branching is lightweight and powerful, enabling parallel development",
              "Merging combines changes from different branches intelligently",
              "Git tracks changes at the file and line level with detailed diffs",
              "Supports both centralized and distributed workflow models"
            ],
            practicalExample: {
              title: "Complete Git Workflow Example",
              content: "Professional Git Workflow: 1. Clone repository (git clone) → 2. Create feature branch (git checkout -b feature/user-auth) → 3. Make changes and stage them (git add .) → 4. Commit with descriptive message (git commit -m 'Add user authentication system') → 5. Push to remote (git push origin feature/user-auth) → 6. Create pull request for code review → 7. Address review feedback → 8. Merge to main branch → 9. Deploy using CI/CD pipeline"
            },
            keyTakeaways: [
              "Every developer has a complete copy of the project history, enabling offline work",
              "Branches allow parallel development without conflicts or interference",
              "Git's distributed nature provides redundancy and flexibility",
              "Proper commit messages and branch naming improve team collaboration"
            ],
            codeExample: {
              title: "Essential Git Commands for DevOps",
              language: "bash",
              code: `# Clone and setup
git clone https://github.com/company/project.git
cd project

# Create and switch to feature branch
git checkout -b feature/new-api-endpoint

# Stage and commit changes
git add .
git commit -m "feat: add user authentication API endpoint

- Add JWT token generation
- Implement password hashing
- Add input validation
- Include comprehensive tests"

# Push and create pull request
git push origin feature/new-api-endpoint

# Keep branch updated with main
git fetch origin
git merge origin/main

# Interactive rebase for clean history
git rebase -i HEAD~3`
            }
          },
          quiz: [
            {
              question: "What makes Git a 'distributed' version control system?",
              options: [
                "It can only work with an internet connection",
                "Every clone contains the complete project history",
                "It distributes files across multiple servers automatically",
                "It requires a central server to function properly"
              ],
              correct: 1
            },
            {
              question: "What is the main advantage of Git branching?",
              options: [
                "It automatically backs up your code",
                "It allows parallel development without conflicts",
                "It reduces file size",
                "It eliminates the need for testing"
              ],
              correct: 1
            },
            {
              question: "Which practice contributes most to effective team collaboration with Git?",
              options: [
                "Using only the main branch",
                "Writing descriptive commit messages and using meaningful branch names",
                "Committing all changes in a single large commit",
                "Avoiding pull requests and merging directly"
              ],
              correct: 1
            }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "CI/CD Pipelines",
      description: "Build automated testing and deployment pipelines",
      duration: "75 minutes",
      lessons: [
        {
          id: 4,
          title: "Continuous Integration Basics",
          content: {
            overview: "Continuous Integration (CI) automatically builds and tests every code change, catching bugs early and ensuring code quality. CI is a fundamental DevOps practice that enables teams to integrate changes frequently while maintaining system stability and reliability.",
            keyPoints: [
              "Every commit triggers automated builds and comprehensive tests",
              "Fast feedback helps developers identify and fix issues quickly",
              "CI prevents integration problems by testing changes frequently",
              "Automated testing increases confidence in code changes",
              "Build artifacts are created consistently and reproducibly",
              "CI pipelines can include security scanning and code quality checks"
            ],
            practicalExample: {
              title: "GitHub Actions CI Pipeline Example",
              content: "Modern CI Pipeline: When you push code to GitHub, Actions automatically: 1. Checks out your code, 2. Sets up the build environment, 3. Installs dependencies, 4. Runs unit tests, 5. Performs code quality analysis, 6. Runs security scans, 7. Builds the application, 8. Stores build artifacts, 9. Sends notifications about results, 10. Triggers deployment if all checks pass."
            },
            keyTakeaways: [
              "CI makes integration problems visible immediately, not weeks later",
              "Comprehensive automated tests are essential for CI success",
              "Fast builds encourage frequent commits and integration",
              "CI pipelines should fail fast to provide quick feedback"
            ],
            codeExample: {
              title: "Complete GitHub Actions CI Pipeline",
              language: "yaml",
              code: `name: Continuous Integration
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16, 18, 20]
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linting
        run: npm run lint
      
      - name: Run unit tests
        run: npm test -- --coverage
      
      - name: Run integration tests
        run: npm run test:integration
      
      - name: Security audit
        run: npm audit --audit-level moderate
      
      - name: Build application
        run: npm run build
      
      - name: Upload coverage reports
        uses: codecov/codecov-action@v3`
            }
          },
          quiz: [
            {
              question: "What happens when a CI build fails?",
              options: [
                "The code is automatically reverted to the last working version",
                "Developers are notified immediately to fix the issue",
                "The deployment continues anyway to avoid delays",
                "The repository is locked until an admin fixes it"
              ],
              correct: 1
            },
            {
              question: "What is the primary benefit of fast CI builds?",
              options: [
                "They use less server resources",
                "They encourage frequent commits and faster feedback",
                "They require fewer tests",
                "They automatically fix code issues"
              ],
              correct: 1
            },
            {
              question: "Which element is most crucial for successful CI implementation?",
              options: [
                "Expensive build servers",
                "Complex deployment scripts",
                "Comprehensive automated test suite",
                "Manual code review processes"
              ],
              correct: 2
            }
          ]
        }
      ]
    },
    {
      id: 4,
      title: "GitOps Principles & Practice",
      description: "Learn GitOps methodology and hands-on implementation",
      duration: "90 minutes",
      lessons: [
        {
          id: 5,
          title: "GitOps with GitHub Actions",
          content: {
            overview: "GitOps uses Git as the single source of truth for infrastructure and application configuration, enabling automated and auditable deployments. GitHub Actions provides an excellent platform for implementing GitOps workflows, making it accessible to teams already using GitHub for version control.",
            keyPoints: [
              "Everything is defined declaratively in Git repositories",
              "GitHub Actions workflows trigger automatically on Git events",
              "Git history provides a complete audit trail of all deployments",
              "Rollbacks are as simple as Git reverts - instant and reliable",
              "Actions can deploy to multiple environments with approval gates",
              "Security is enhanced through GitHub's built-in access control and secrets management"
            ],
            practicalExample: {
              title: "GitOps Workflow with GitHub Actions",
              content: "Complete GitOps Process: 1. Define application and infrastructure as code → 2. Store everything in Git repository → 3. GitHub Actions watches for changes on push/PR → 4. Automated testing runs on every change → 5. Deployment workflow triggers on main branch → 6. Actions deploys to staging automatically → 7. Manual approval required for production → 8. All deployments are logged and auditable through GitHub"
            },
            keyTakeaways: [
              "Git becomes the source of truth for your entire deployment pipeline",
              "GitHub Actions makes GitOps accessible without additional infrastructure",
              "Deployments become traceable, reversible, and reproducible",
              "Built-in security through GitHub's permission system and secrets management"
            ],
            codeExample: {
              title: "GitOps GitHub Actions Workflow",
              language: "yaml",
              code: `# .github/workflows/gitops-deploy.yml
name: GitOps Deployment Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  APP_NAME: web-app
  REGISTRY: ghcr.io

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run Tests
        run: |
          npm install
          npm test
          npm run lint

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      
      - name: Build and Push Image
        run: |
          echo \${{ secrets.GITHUB_TOKEN }} | docker login ghcr.io -u \${{ github.actor }} --password-stdin
          docker build -t \$REGISTRY/\${{ github.repository }}/\$APP_NAME:\${{ github.sha }} .
          docker push \$REGISTRY/\${{ github.repository }}/\$APP_NAME:\${{ github.sha }}

  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Staging
        run: |
          # Update deployment manifest
          sed -i 's|IMAGE_TAG|'\${{ github.sha }}'|g' k8s/deployment.yaml
          # Apply to staging cluster
          kubectl apply -f k8s/ --namespace=staging

  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment: production  # Requires manual approval
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Production
        run: |
          # Update deployment manifest
          sed -i 's|IMAGE_TAG|'\${{ github.sha }}'|g' k8s/deployment.yaml
          # Apply to production cluster
          kubectl apply -f k8s/ --namespace=production
          
      - name: Notify Team
        run: |
          echo "🚀 Deployed \$APP_NAME:\${{ github.sha }} to production"
          # Send Slack notification, email, etc.`
            },
            simulatorScenario: "github-actions-gitops",
            hasSimulator: true
          },
          quiz: [
            {
              question: "In GitOps with GitHub Actions, what serves as the single source of truth?",
              options: [
                "The production environment configuration",
                "Git repository containing application and infrastructure definitions",
                "GitHub Actions workflow logs",
                "Container registry with application images"
              ],
              correct: 1
            },
            {
              question: "How does GitOps handle rollbacks with GitHub Actions?",
              options: [
                "Through complex rollback scripts in workflows",
                "By manually reverting workflow runs",
                "As simple as Git reverts to previous commits, triggering automatic redeployment",
                "By restoring from database backups"
              ],
              correct: 2
            },
            {
              question: "What is a key advantage of using GitHub Actions for GitOps?",
              options: [
                "It requires expensive infrastructure setup",
                "It's integrated with Git and provides built-in security and approval workflows",
                "It only works with Kubernetes",
                "It eliminates the need for testing"
              ],
              correct: 1
            },
            {
              question: "In the GitHub Actions GitOps workflow, when does deployment to production typically happen?",
              options: [
                "Immediately after code is pushed",
                "After automated testing passes and manual approval is given",
                "Only on weekends",
                "When the database is backed up"
              ],
              correct: 1
            }
          ]
        }
      ]
    }
  ];

  const getCurrentLesson = () => {
    return courseModules[currentModule]?.lessons[currentLesson];
  };

  const completeLesson = (moduleId, lessonId) => {
    const lessonKey = `${moduleId}-${lessonId}`;
    const newCompletedLessons = new Set([...completedLessons, lessonKey]);
    setCompletedLessons(newCompletedLessons);
    
    // Update session manager
    const progress = sessionManager.completeLesson(courseId, moduleId, lessonId);
    const newAchievements = sessionManager.checkAchievements(courseId, progress);
    
    if (newAchievements.length > 0) {
      setAchievements(prev => [...prev, ...newAchievements]);
      // Show achievement notification
      newAchievements.forEach(achievement => {
        setTimeout(() => {
          alert(`🎉 Achievement Unlocked: ${achievement.title}\n${achievement.description}`);
        }, 500);
      });
    }
    
    updateProgress();
    
    // Save current module and lesson position
    sessionManager.saveCourseProgress(courseId, {
      currentModule,
      currentLesson,
      completedLessons: Array.from(newCompletedLessons)
    });
  };

  const updateProgress = () => {
    const totalLessons = courseModules.reduce((sum, module) => sum + module.lessons.length, 0);
    const completed = completedLessons.size;
    const percentage = sessionManager.calculateCompletionPercentage(courseId, totalLessons);
    setUserProgress(percentage);
  };

  const nextLesson = () => {
    const currentModuleData = courseModules[currentModule];
    if (currentLesson < currentModuleData.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    } else if (currentModule < courseModules.length - 1) {
      setCurrentModule(currentModule + 1);
      setCurrentLesson(0);
    }
    setShowQuiz(false);
    setQuizResults(null);
    
    // Save progress
    sessionManager.saveCourseProgress(courseId, {
      currentModule: currentModule,
      currentLesson: currentLesson + 1 < currentModuleData.lessons.length ? currentLesson + 1 : 0,
      completedLessons: Array.from(completedLessons)
    });
  };

  const prevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    } else if (currentModule > 0) {
      setCurrentModule(currentModule - 1);
      setCurrentLesson(courseModules[currentModule - 1].lessons.length - 1);
    }
    setShowQuiz(false);
    setQuizResults(null);
    
    // Save progress
    sessionManager.saveCourseProgress(courseId, {
      currentModule: currentModule,
      currentLesson: currentLesson > 0 ? currentLesson - 1 : courseModules[currentModule - 1]?.lessons.length - 1 || 0,
      completedLessons: Array.from(completedLessons)
    });
  };

  const startQuiz = () => {
    setShowQuiz(true);
    setQuizAnswers({});
    setQuizResults(null);
  };

  const submitQuiz = () => {
    const lesson = getCurrentLesson();
    if (!lesson?.quiz) return;

    let correct = 0;
    const results = lesson.quiz.map((question, index) => {
      const userAnswer = quizAnswers[index];
      const isCorrect = userAnswer === question.correct;
      if (isCorrect) correct++;
      return {
        question: question.question,
        userAnswer: userAnswer,
        correctAnswer: question.correct,
        isCorrect
      };
    });

    const score = Math.round((correct / lesson.quiz.length) * 100);
    setQuizResults({ results, score, passed: score >= 70 });

    // Save quiz result to session
    sessionManager.completeQuiz(courseId, courseModules[currentModule].id, lesson.id, score);

    if (score >= 70) {
      completeLesson(courseModules[currentModule].id, lesson.id);
    }
  };

  const isLessonCompleted = (moduleId, lessonId) => {
    return completedLessons.has(`${moduleId}-${lessonId}`);
  };

  useEffect(() => {
    updateProgress();
  }, [completedLessons]);

  const lesson = getCurrentLesson();

  return (
    <div className="lms-container">
      {/* Header */}
      <header className="lms-header">
        <div className="header-content">
          <Link to="/" className="logo">DevOps Academy</Link>
          <div className="progress-section">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${userProgress}%` }}></div>
            </div>
            <span className="progress-text">{userProgress}% Complete</span>
          </div>
        </div>
      </header>

      <div className="lms-body">
        {/* Sidebar */}
        <aside className="sidebar">
          <h3>Course Modules</h3>
          {courseModules.map((module, moduleIndex) => (
            <div key={module.id} className="module-section">
              <div 
                className={`module-header ${moduleIndex === currentModule ? 'active' : ''}`}
                onClick={() => setCurrentModule(moduleIndex)}
              >
                <h4>{module.title}</h4>
                <span className="duration">{module.duration}</span>
              </div>
              <ul className="lessons-list">
                {module.lessons.map((lesson, lessonIndex) => (
                  <li 
                    key={lesson.id}
                    className={`lesson-item ${
                      moduleIndex === currentModule && lessonIndex === currentLesson ? 'active' : ''
                    } ${isLessonCompleted(module.id, lesson.id) ? 'completed' : ''}`}
                    onClick={() => {
                      setCurrentModule(moduleIndex);
                      setCurrentLesson(lessonIndex);
                      setShowQuiz(false);
                    }}
                  >
                    <span className="lesson-status">
                      {isLessonCompleted(module.id, lesson.id) ? '✓' : '○'}
                    </span>
                    {lesson.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div className="simulator-section">
            <Link to="/gitops-simulator" className="simulator-link">
              🚀 GitOps Deployment Simulator
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {!showQuiz ? (
            <div className="lesson-content">
              <div className="lesson-header">
                <h1>{lesson?.title}</h1>
                <div className="lesson-meta">
                  <span>Module {currentModule + 1}: {courseModules[currentModule]?.title}</span>
                  <span>Lesson {currentLesson + 1} of {courseModules[currentModule]?.lessons.length}</span>
                </div>
              </div>

              <div className="content-sections">
                <section className="overview-section">
                  <h2>Overview</h2>
                  <p className="overview-text">{lesson?.content.overview}</p>
                </section>

                <section className="key-points-section">
                  <h2>Key Concepts</h2>
                  <ul className="key-points">
                    {lesson?.content.keyPoints.map((point, index) => (
                      <li key={index} className="key-point">{point}</li>
                    ))}
                  </ul>
                </section>

                <section className="example-section">
                  <h2>Practical Example</h2>
                  <div className="example-card">
                    <h3>{lesson?.content.practicalExample.title}</h3>
                    <p>{lesson?.content.practicalExample.content}</p>
                  </div>
                </section>

                <section className="takeaways-section">
                  <h2>Key Takeaways</h2>
                  <div className="takeaways-grid">
                    {lesson?.content.keyTakeaways.map((takeaway, index) => (
                      <div key={index} className="takeaway-card">
                        <span className="takeaway-number">{index + 1}</span>
                        <p>{takeaway}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {lesson?.content.codeExample && (
                  <section className="code-example-section">
                    <h2>Code Example</h2>
                    <div className="code-example-card">
                      <h3>{lesson.content.codeExample.title}</h3>
                      <div className="code-block">
                        <div className="code-header">
                          <span className="language-tag">{lesson.content.codeExample.language}</span>
                          <button 
                            className="copy-btn"
                            onClick={() => navigator.clipboard.writeText(lesson.content.codeExample.code)}
                          >
                            📋 Copy
                          </button>
                        </div>
                        <pre className="code-content">
                          <code>{lesson.content.codeExample.code}</code>
                        </pre>
                      </div>
                    </div>
                  </section>
                )}

                {lesson?.content.simulatorScenario && (
                  <section className="simulator-section">
                    <h2>Interactive Simulation</h2>
                    <div className="embedded-simulator">
                      <EmbeddedSimulator scenario={lesson.content.simulatorScenario} />
                    </div>
                  </section>
                )}
              </div>

              <div className="lesson-actions">
                <button onClick={prevLesson} disabled={currentModule === 0 && currentLesson === 0} className="nav-btn prev">
                  ← Previous Lesson
                </button>
                
                {lesson?.quiz && (
                  <button onClick={startQuiz} className="quiz-btn">
                    Take Quiz
                  </button>
                )}
                
                <button onClick={nextLesson} className="nav-btn next">
                  Next Lesson →
                </button>
              </div>
            </div>
          ) : (
            <div className="quiz-content">
              <div className="quiz-header">
                <h2>Quiz: {lesson?.title}</h2>
                <p>Answer all questions to complete this lesson. You need 70% to pass.</p>
              </div>

              {!quizResults ? (
                <div className="quiz-questions">
                  {lesson?.quiz.map((question, index) => (
                    <div key={index} className="question-card">
                      <h3>Question {index + 1}</h3>
                      <p className="question-text">{question.question}</p>
                      <div className="options">
                        {question.options.map((option, optionIndex) => (
                          <label key={optionIndex} className="option-label">
                            <input
                              type="radio"
                              name={`question-${index}`}
                              value={optionIndex}
                              onChange={(e) => setQuizAnswers({
                                ...quizAnswers,
                                [index]: parseInt(e.target.value)
                              })}
                            />
                            <span className="option-text">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <button 
                    onClick={submitQuiz} 
                    className="submit-quiz-btn"
                    disabled={Object.keys(quizAnswers).length < lesson?.quiz.length}
                  >
                    Submit Quiz
                  </button>
                </div>
              ) : (
                <div className="quiz-results">
                  <div className={`score-card ${quizResults.passed ? 'passed' : 'failed'}`}>
                    <h3>{quizResults.passed ? '🎉 Congratulations!' : '📚 Keep Learning!'}</h3>
                    <p className="score">Your Score: {quizResults.score}%</p>
                    <p className="pass-message">
                      {quizResults.passed ? 
                        'You\'ve successfully completed this lesson!' : 
                        'You need 70% to pass. Review the material and try again.'
                      }
                    </p>
                  </div>

                  <div className="detailed-results">
                    <h4>Detailed Results</h4>
                    {quizResults.results.map((result, index) => (
                      <div key={index} className={`result-item ${result.isCorrect ? 'correct' : 'incorrect'}`}>
                        <p className="result-question">{result.question}</p>
                        <p className="result-status">
                          {result.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="quiz-actions">
                    <button onClick={() => setShowQuiz(false)} className="back-to-lesson-btn">
                      Back to Lesson
                    </button>
                    {quizResults.passed && (
                      <button onClick={nextLesson} className="continue-btn">
                        Continue to Next Lesson
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <style jsx>{`
        .lms-container {
          min-height: 100vh;
          background: #f8f9fa;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .lms-header {
          background: #fff;
          border-bottom: 1px solid #e9ecef;
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .header-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: bold;
          color: #007bff;
          text-decoration: none;
        }

        .progress-section {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .progress-bar {
          width: 200px;
          height: 8px;
          background: #e9ecef;
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #007bff, #28a745);
          transition: width 0.3s ease;
        }

        .progress-text {
          font-size: 0.9rem;
          color: #6c757d;
          font-weight: 500;
        }

        .lms-body {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          min-height: calc(100vh - 80px);
        }

        .sidebar {
          width: 350px;
          background: #fff;
          border-right: 1px solid #e9ecef;
          padding: 2rem;
          overflow-y: auto;
        }

        .sidebar h3 {
          margin-bottom: 1.5rem;
          color: #495057;
          font-size: 1.1rem;
        }

        .module-section {
          margin-bottom: 1.5rem;
        }

        .module-header {
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-bottom: 0.5rem;
        }

        .module-header:hover, .module-header.active {
          background: #007bff;
          color: #fff;
        }

        .module-header h4 {
          margin: 0 0 0.5rem 0;
          font-size: 1rem;
        }

        .duration {
          font-size: 0.8rem;
          opacity: 0.8;
        }

        .lessons-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .lesson-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          margin: 0.25rem 0;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.9rem;
        }

        .lesson-item:hover {
          background: #f8f9fa;
        }

        .lesson-item.active {
          background: #e3f2fd;
          color: #1976d2;
          font-weight: 500;
        }

        .lesson-item.completed {
          color: #28a745;
        }

        .lesson-status {
          font-weight: bold;
          width: 20px;
        }

        .simulator-section {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #e9ecef;
        }

        .simulator-link {
          display: block;
          padding: 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          text-decoration: none;
          border-radius: 8px;
          text-align: center;
          font-weight: 500;
          transition: transform 0.2s ease;
        }

        .simulator-link:hover {
          transform: translateY(-2px);
          color: #fff;
        }

        .main-content {
          flex: 1;
          padding: 2rem;
          background: #fff;
          overflow-y: auto;
        }

        .lesson-header {
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #e9ecef;
        }

        .lesson-header h1 {
          margin: 0 0 0.5rem 0;
          color: #212529;
          font-size: 2rem;
          line-height: 1.2;
        }

        .lesson-meta {
          display: flex;
          gap: 1rem;
          color: #6c757d;
          font-size: 0.9rem;
        }

        .content-sections {
          max-width: 800px;
        }

        .content-sections section {
          margin-bottom: 3rem;
        }

        .content-sections h2 {
          color: #495057;
          margin-bottom: 1rem;
          font-size: 1.3rem;
          position: relative;
          padding-left: 1rem;
        }

        .content-sections h2::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: #007bff;
          border-radius: 2px;
        }

        .overview-text {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #495057;
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 8px;
          border-left: 4px solid #007bff;
        }

        .key-points {
          list-style: none;
          padding: 0;
        }

        .key-point {
          background: #fff;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 0.75rem;
          position: relative;
          padding-left: 3rem;
          line-height: 1.5;
        }

        .key-point::before {
          content: '→';
          position: absolute;
          left: 1rem;
          top: 1rem;
          color: #007bff;
          font-weight: bold;
          font-size: 1.2rem;
        }

        .example-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .example-card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.2rem;
        }

        .example-card p {
          margin: 0;
          line-height: 1.6;
          opacity: 0.95;
        }

        .takeaways-grid {
          display: grid;
          gap: 1rem;
        }

        .takeaway-card {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid #e9ecef;
        }

        .takeaway-number {
          background: #007bff;
          color: #fff;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .takeaway-card p {
          margin: 0;
          line-height: 1.5;
        }

        .lesson-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid #e9ecef;
        }

        .nav-btn, .quiz-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          display: inline-block;
        }

        .nav-btn {
          background: #6c757d;
          color: #fff;
        }

        .nav-btn:hover:not(:disabled) {
          background: #5a6268;
          transform: translateY(-1px);
        }

        .nav-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .quiz-btn {
          background: #28a745;
          color: #fff;
        }

        .quiz-btn:hover {
          background: #218838;
          transform: translateY(-1px);
        }

        .quiz-content {
          max-width: 800px;
        }

        .quiz-header {
          margin-bottom: 2rem;
          text-align: center;
        }

        .quiz-header h2 {
          color: #495057;
          margin-bottom: 0.5rem;
        }

        .question-card {
          background: #fff;
          border: 1px solid #e9ecef;
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .question-card h3 {
          color: #007bff;
          margin-bottom: 1rem;
        }

        .question-text {
          font-size: 1.1rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
          color: #495057;
        }

        .options {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .option-label {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .option-label:hover {
          background: #e9ecef;
        }

        .option-label input[type="radio"] {
          margin: 0;
        }

        .option-text {
          flex: 1;
          line-height: 1.4;
        }

        .submit-quiz-btn {
          background: #007bff;
          color: #fff;
          border: none;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 1rem;
        }

        .submit-quiz-btn:hover:not(:disabled) {
          background: #0056b3;
          transform: translateY(-1px);
        }

        .submit-quiz-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .quiz-results {
          text-align: center;
        }

        .score-card {
          background: #fff;
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .score-card.passed {
          border: 3px solid #28a745;
        }

        .score-card.failed {
          border: 3px solid #dc3545;
        }

        .score-card h3 {
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }

        .score {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .score-card.passed .score {
          color: #28a745;
        }

        .score-card.failed .score {
          color: #dc3545;
        }

        .detailed-results {
          text-align: left;
          margin-bottom: 2rem;
        }

        .detailed-results h4 {
          margin-bottom: 1rem;
          color: #495057;
        }

        .result-item {
          background: #fff;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 0.75rem;
        }

        .result-item.correct {
          border-left: 4px solid #28a745;
        }

        .result-item.incorrect {
          border-left: 4px solid #dc3545;
        }

        .result-question {
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .result-status {
          margin: 0;
          font-size: 0.9rem;
        }

        .result-item.correct .result-status {
          color: #28a745;
        }

        .result-item.incorrect .result-status {
          color: #dc3545;
        }

        .quiz-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .back-to-lesson-btn, .continue-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .back-to-lesson-btn {
          background: #6c757d;
          color: #fff;
        }

        .continue-btn {
          background: #28a745;
          color: #fff;
        }

        .back-to-lesson-btn:hover, .continue-btn:hover {
          transform: translateY(-1px);
        }

        /* Code Example Styles */
        .code-example-section {
          margin: 2rem 0;
        }

        .code-example-card {
          background: #1e1e1e;
          border: 1px solid #333;
          border-radius: 12px;
          overflow: hidden;
          margin-top: 1rem;
        }

        .code-block {
          position: relative;
        }

        .code-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          background: #2d2d2d;
          border-bottom: 1px solid #444;
        }

        .language-tag {
          font-size: 0.875rem;
          color: #64ffda;
          font-weight: 500;
          text-transform: uppercase;
        }

        .copy-btn {
          background: #007bff;
          color: white;
          border: none;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .copy-btn:hover {
          background: #0056b3;
        }

        .code-content {
          padding: 1rem;
          margin: 0;
          font-family: 'Monaco', 'Consolas', 'Ubuntu Mono', monospace;
          font-size: 0.875rem;
          line-height: 1.5;
          color: #f8f8f2;
          background: #1e1e1e;
          overflow-x: auto;
          white-space: pre-wrap;
        }

        /* Embedded Simulator Styles */
        .simulator-section {
          margin: 2rem 0;
        }

        .embedded-simulator {
          border: 1px solid #333;
          border-radius: 12px;
          overflow: hidden;
          background: #1a1a1a;
          margin-top: 1rem;
        }

        @media (max-width: 768px) {
          .lms-body {
            flex-direction: column;
          }
          
          .sidebar {
            width: 100%;
            order: 2;
          }
          
          .main-content {
            order: 1;
          }
          
          .lesson-actions {
            flex-direction: column;
            gap: 1rem;
          }
          
          .quiz-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default GitOpsLMS;