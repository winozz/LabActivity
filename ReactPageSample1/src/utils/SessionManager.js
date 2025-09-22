// Session management utilities for LMS
class SessionManager {
  constructor() {
    this.storageKey = 'lms_session_data';
    this.initializeSession();
  }

  initializeSession() {
    const existingData = this.getSessionData();
    if (!existingData) {
      const initialData = {
        userId: this.generateUserId(),
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
        courses: {},
        achievements: [],
        totalTimeSpent: 0,
        streak: 0,
        lastLoginDate: new Date().toDateString()
      };
      this.saveSessionData(initialData);
    } else {
      // Update last active time
      existingData.lastActive = new Date().toISOString();
      this.updateStreak(existingData);
      this.saveSessionData(existingData);
    }
  }

  generateUserId() {
    return 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }

  getSessionData() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading session data:', error);
      return null;
    }
  }

  saveSessionData(data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving session data:', error);
    }
  }

  updateStreak(sessionData) {
    const today = new Date().toDateString();
    const lastLogin = sessionData.lastLoginDate;
    
    if (lastLogin !== today) {
      const lastLoginDate = new Date(lastLogin);
      const todayDate = new Date(today);
      const daysDiff = Math.floor((todayDate - lastLoginDate) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === 1) {
        // Consecutive day
        sessionData.streak += 1;
      } else if (daysDiff > 1) {
        // Streak broken
        sessionData.streak = 1;
      }
      
      sessionData.lastLoginDate = today;
    }
  }

  // Course progress methods
  getCourseProgress(courseId) {
    const sessionData = this.getSessionData();
    return sessionData?.courses?.[courseId] || {
      currentModule: 0,
      currentLesson: 0,
      completedLessons: [],
      completedQuizzes: [],
      timeSpent: 0,
      enrolledAt: new Date().toISOString(),
      lastAccessed: new Date().toISOString(),
      completionPercentage: 0
    };
  }

  saveCourseProgress(courseId, progressData) {
    const sessionData = this.getSessionData();
    if (!sessionData.courses) {
      sessionData.courses = {};
    }
    
    sessionData.courses[courseId] = {
      ...sessionData.courses[courseId],
      ...progressData,
      lastAccessed: new Date().toISOString()
    };
    
    this.saveSessionData(sessionData);
  }

  completeLesson(courseId, moduleId, lessonId) {
    const progress = this.getCourseProgress(courseId);
    const lessonKey = `${moduleId}-${lessonId}`;
    
    if (!progress.completedLessons.includes(lessonKey)) {
      progress.completedLessons.push(lessonKey);
      
      // Check for achievements
      this.checkAchievements(courseId, progress);
    }
    
    this.saveCourseProgress(courseId, progress);
    return progress;
  }

  completeQuiz(courseId, moduleId, lessonId, score) {
    const progress = this.getCourseProgress(courseId);
    const quizKey = `${moduleId}-${lessonId}`;
    
    const existingQuizIndex = progress.completedQuizzes.findIndex(q => q.quizKey === quizKey);
    const quizResult = {
      quizKey,
      score,
      completedAt: new Date().toISOString(),
      passed: score >= 70
    };
    
    if (existingQuizIndex >= 0) {
      // Update existing quiz result if score improved
      if (score > progress.completedQuizzes[existingQuizIndex].score) {
        progress.completedQuizzes[existingQuizIndex] = quizResult;
      }
    } else {
      progress.completedQuizzes.push(quizResult);
    }
    
    this.saveCourseProgress(courseId, progress);
    return progress;
  }

  updateTimeSpent(courseId, minutes) {
    const sessionData = this.getSessionData();
    const progress = this.getCourseProgress(courseId);
    
    progress.timeSpent = (progress.timeSpent || 0) + minutes;
    sessionData.totalTimeSpent = (sessionData.totalTimeSpent || 0) + minutes;
    
    this.saveCourseProgress(courseId, progress);
    this.saveSessionData(sessionData);
  }

  calculateCompletionPercentage(courseId, totalLessons) {
    const progress = this.getCourseProgress(courseId);
    const completedCount = progress.completedLessons.length;
    const percentage = Math.round((completedCount / totalLessons) * 100);
    
    progress.completionPercentage = percentage;
    this.saveCourseProgress(courseId, progress);
    
    return percentage;
  }

  checkAchievements(courseId, progress) {
    const sessionData = this.getSessionData();
    const achievements = [];
    
    // First lesson completed
    if (progress.completedLessons.length === 1) {
      achievements.push({
        id: 'first_lesson',
        title: 'Getting Started',
        description: 'Completed your first lesson',
        earnedAt: new Date().toISOString(),
        courseId
      });
    }
    
    // Complete a module (assuming 2 lessons per module for demo)
    if (progress.completedLessons.length % 2 === 0 && progress.completedLessons.length > 0) {
      achievements.push({
        id: `module_complete_${Math.floor(progress.completedLessons.length / 2)}`,
        title: 'Module Master',
        description: `Completed Module ${Math.floor(progress.completedLessons.length / 2)}`,
        earnedAt: new Date().toISOString(),
        courseId
      });
    }
    
    // Quiz ace (all quizzes passed with > 90%)
    const highScoreQuizzes = progress.completedQuizzes.filter(q => q.score >= 90);
    if (highScoreQuizzes.length >= 3) {
      achievements.push({
        id: 'quiz_ace',
        title: 'Quiz Ace',
        description: 'Scored 90%+ on 3 or more quizzes',
        earnedAt: new Date().toISOString(),
        courseId
      });
    }
    
    // Add new achievements to session data
    achievements.forEach(achievement => {
      const existingAchievement = sessionData.achievements.find(a => a.id === achievement.id);
      if (!existingAchievement) {
        sessionData.achievements.push(achievement);
      }
    });
    
    if (achievements.length > 0) {
      this.saveSessionData(sessionData);
    }
    
    return achievements;
  }

  getAchievements() {
    const sessionData = this.getSessionData();
    return sessionData?.achievements || [];
  }

  getUserStats() {
    const sessionData = this.getSessionData();
    if (!sessionData) return null;
    
    const courses = sessionData.courses || {};
    const totalCourses = Object.keys(courses).length;
    const completedCourses = Object.values(courses).filter(c => c.completionPercentage >= 100).length;
    
    return {
      userId: sessionData.userId,
      totalTimeSpent: sessionData.totalTimeSpent || 0,
      streak: sessionData.streak || 0,
      totalCourses,
      completedCourses,
      achievements: sessionData.achievements?.length || 0,
      memberSince: sessionData.createdAt,
      lastActive: sessionData.lastActive
    };
  }

  exportProgress() {
    const sessionData = this.getSessionData();
    const blob = new Blob([JSON.stringify(sessionData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lms_progress_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  resetProgress() {
    if (confirm('Are you sure you want to reset all progress? This action cannot be undone.')) {
      localStorage.removeItem(this.storageKey);
      this.initializeSession();
      window.location.reload();
    }
  }
}

// Export singleton instance
export const sessionManager = new SessionManager();

// React hook for using session data
export const useSession = () => {
  const [sessionData, setSessionData] = React.useState(null);
  
  React.useEffect(() => {
    const data = sessionManager.getSessionData();
    setSessionData(data);
    
    // Update session data every minute
    const interval = setInterval(() => {
      const updatedData = sessionManager.getSessionData();
      setSessionData(updatedData);
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  return {
    sessionData,
    sessionManager,
    updateSession: () => setSessionData(sessionManager.getSessionData())
  };
};