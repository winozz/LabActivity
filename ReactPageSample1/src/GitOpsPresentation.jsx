import React from 'react';
import { Link } from 'react-router-dom';

const GitOpsPresentation = () => {
  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 
      color: "#fff", 
      padding: "2rem", 
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{ 
        maxWidth: "800px", 
        textAlign: "center",
        background: "rgba(255, 255, 255, 0.1)",
        borderRadius: "20px",
        padding: "4rem",
        backdropFilter: "blur(10px)",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
      }}>
        <h1 style={{ 
          fontSize: "3.5rem", 
          marginBottom: "1.5rem",
          background: "linear-gradient(45deg, #ffffff, #f0f0f0)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          GitOps & DevOps Learning
        </h1>
        
        <p style={{ 
          fontSize: "1.3rem", 
          marginBottom: "3rem",
          opacity: "0.9",
          lineHeight: "1.6"
        }}>
          Welcome to our comprehensive DevOps and GitOps learning platform!<br/>
          Choose your learning path below:
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          marginBottom: "3rem"
        }}>
          <Link to="/gitops-lms" style={{ 
            background: "rgba(255, 255, 255, 0.2)",
            padding: "2rem",
            borderRadius: "15px",
            textDecoration: "none",
            color: "#fff",
            transition: "all 0.3s ease",
            border: "2px solid rgba(255, 255, 255, 0.3)"
          }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎓</div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>DevOps Academy</h3>
            <p style={{ opacity: "0.9", lineHeight: "1.5" }}>
              Complete course with lessons, quizzes, and hands-on exercises. 
              Learn at your own pace with progress tracking.
            </p>
          </Link>

          <Link to="/gitops-simulator" style={{ 
            background: "rgba(255, 255, 255, 0.2)",
            padding: "2rem",
            borderRadius: "15px",
            textDecoration: "none",
            color: "#fff",
            transition: "all 0.3s ease",
            border: "2px solid rgba(255, 255, 255, 0.3)"
          }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🚀</div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>GitOps Simulator</h3>
            <p style={{ opacity: "0.9", lineHeight: "1.5" }}>
              Practice GitOps deployments in a safe, simulated environment. 
              Experience real-world scenarios and workflows.
            </p>
          </Link>
        </div>

        <div style={{
          background: "rgba(255, 255, 255, 0.1)",
          padding: "2rem",
          borderRadius: "15px",
          marginBottom: "2rem"
        }}>
          <h3 style={{ marginBottom: "1rem" }}>What You'll Learn</h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            textAlign: "left"
          }}>
            <div>
              <strong>DevOps Fundamentals</strong>
              <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                <li>Culture & Collaboration</li>
                <li>Automation Principles</li>
                <li>Continuous Improvement</li>
              </ul>
            </div>
            <div>
              <strong>Version Control</strong>
              <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                <li>Git Workflows</li>
                <li>Branching Strategies</li>
                <li>Code Reviews</li>
              </ul>
            </div>
            <div>
              <strong>CI/CD Pipelines</strong>
              <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                <li>Automated Testing</li>
                <li>Build Automation</li>
                <li>Deployment Strategies</li>
              </ul>
            </div>
            <div>
              <strong>GitOps Practices</strong>
              <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                <li>Infrastructure as Code</li>
                <li>Declarative Deployments</li>
                <li>Monitoring & Observability</li>
              </ul>
            </div>
          </div>
        </div>
        
        <Link to="/" style={{ 
          color: "#ffffff", 
          textDecoration: "none", 
          fontSize: "1.1rem",
          background: "rgba(255, 255, 255, 0.2)",
          padding: "0.75rem 1.5rem",
          borderRadius: "25px",
          transition: "all 0.3s ease"
        }}>
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default GitOpsPresentation;