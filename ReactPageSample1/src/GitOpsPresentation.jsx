import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const GitOpsPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const presentationSlides = [
    {
      title: 'DevOps & Modern Software Development',
      subtitle: 'A Student Guide to GitOps & CI/CD',
      content: [
        'Welcome to Modern Software Development!',
        'Understanding how code travels from your laptop to production',
        'Building reliable, automated software delivery pipelines',
        'Real-world practices used by companies like Google, Netflix, and GitHub'
      ]
    },
    {
      title: 'Traditional Development Problems',
      subtitle: 'Why We Need Better Processes',
      content: [
        'Manual deployments prone to human error',
        '"It works on my machine" syndrome',
        'Long development cycles',
        'Difficult rollbacks and recovery',
        'Poor collaboration between teams',
        'Solution: DevOps & Automation'
      ]
    },
    {
      title: 'What is DevOps?',
      subtitle: 'Development + Operations = DevOps',
      content: [
        'Bridge between Development and Operations teams',
        'Culture of collaboration and shared responsibility',
        'Faster, more reliable software delivery',
        'Continuous monitoring and feedback',
        'Automation of repetitive tasks',
        'Focus on improving processes continuously'
      ]
    },
    {
      title: 'Version Control with Git',
      subtitle: 'The Foundation of Modern Development',
      content: [
        'Track every change in your code',
        'Branching: Work on features in isolation',
        'Merging: Combine changes safely',
        'Collaboration: Multiple developers, one codebase',
        'History: See what changed, when, and by whom',
        'Distributed: Every copy is a full backup'
      ]
    },
    {
      title: 'Continuous Integration (CI)',
      subtitle: 'Automating Code Quality',
      content: [
        'Automatically test every code change',
        'Run tests, linting, and security scans',
        'Catch bugs before they reach production',
        'Generate test reports and coverage metrics',
        'Build applications automatically',
        'Fast feedback for developers'
      ]
    },
    {
      title: 'Continuous Deployment (CD)',
      subtitle: 'Automating Software Delivery',
      content: [
        'Automatically deploy tested code',
        'Deploy to different environments (dev, staging, prod)',
        'Rolling updates with zero downtime',
        'Automated rollback if issues detected',
        'Faster time to market',
        'Blue-green and canary deployments'
      ]
    },
    {
      title: 'What is GitOps?',
      subtitle: 'Git as the Single Source of Truth',
      content: [
        'All infrastructure and app configs in Git',
        'Declarative: Describe what you want, not how',
        'Automated: Changes trigger deployments',
        'Observable: See the current state clearly',
        'Reversible: Easy rollbacks via Git',
        'Used by major tech companies worldwide'
      ]
    },
    {
      title: 'GitOps Core Principles',
      subtitle: 'The Four Pillars',
      content: [
        '1. Declarative Configuration',
        '2. Version Controlled (Git)',
        '3. Automatically Applied',
        '4. Continuously Monitored',
        '',
        'These principles ensure reliable, auditable deployments'
      ]
    },
    {
      title: 'Popular DevOps Tools',
      subtitle: 'Tools You Should Know About',
      content: [
        'GitHub Actions - CI/CD workflows',
        'GitLab CI - Integrated DevOps platform',
        'Azure DevOps - Microsoft ecosystem',
        'Jenkins - Open-source automation',
        'Docker - Containerization',
        'Kubernetes - Container orchestration'
      ]
    },
    {
      title: 'Real-World Example: E-commerce Site',
      subtitle: 'From Code to Customer',
      content: [
        'Developer commits bug fix to Git',
        'CI runs: tests pass, build succeeds',
        'Auto-deploy to staging environment',
        'QA team reviews and approves',
        'Auto-deploy to production',
        'Monitor performance and user experience'
      ]
    },
    {
      title: 'Student Benefits',
      subtitle: 'Why This Matters for Your Career',
      content: [
        'High demand for DevOps skills in industry',
        'Build professional-quality projects',
        'Understand how teams collaborate',
        'Automate tedious tasks',
        'Foundation for cloud and infrastructure',
        'Stand out in job applications'
      ]
    },
    {
      title: 'Getting Started',
      subtitle: 'Your Next Steps',
      content: [
        '1. Master Git basics (branches, merges, PRs)',
        '2. Set up a simple CI pipeline (GitHub Actions)',
        '3. Learn Docker basics',
        '4. Practice with cloud platforms (AWS, Azure, GCP)',
        '5. Build a portfolio project with full CI/CD',
        '6. Join DevOps communities and keep learning!'
      ]
    }
  ];

  const detailedContent = {
    'devops-basics': {
      title: 'DevOps Fundamentals',
      sections: [
        {
          title: 'What is DevOps?',
          content: [
            'DevOps is a cultural and technical movement that emphasizes collaboration between development and operations teams.',
            'The main goal is to shorten the development lifecycle while delivering features, fixes, and updates frequently in close alignment with business objectives.',
            'DevOps practices include continuous integration, continuous delivery, automation, monitoring, and collaboration.'
          ]
        },
        {
          title: 'Why DevOps Matters',
          content: [
            'Faster time to market for new features',
            'Improved collaboration between teams',
            'Higher quality software through automation',
            'Better customer satisfaction through reliable systems',
            'Reduced costs through efficiency gains'
          ]
        },
        {
          title: 'DevOps vs Traditional Development',
          content: [
            'Traditional: Development and Operations work in silos',
            'DevOps: Shared responsibility throughout the entire lifecycle',
            'Traditional: Manual processes and deployments',
            'DevOps: Automated testing, building, and deployment',
            'Traditional: Blame culture when things go wrong',
            'DevOps: Blameless post-mortems and continuous improvement'
          ]
        }
      ]
    },
    'version-control': {
      title: 'Version Control Systems',
      sections: [
        {
          title: 'Git Fundamentals',
          content: [
            'Git is a distributed version control system that tracks changes in files and coordinates work between multiple people.',
            'Every Git repository contains the complete history of all changes, making it fully distributed.',
            'Key concepts: repository, commit, branch, merge, remote, clone, push, pull.'
          ]
        },
        {
          title: 'Git Workflow',
          content: [
            '1. Clone or initialize a repository',
            '2. Create a new branch for your feature',
            '3. Make changes and commit them with descriptive messages',
            '4. Push your branch to the remote repository',
            '5. Create a pull request for code review',
            '6. Merge the approved changes to the main branch'
          ]
        },
        {
          title: 'Best Practices',
          content: [
            'Write clear, descriptive commit messages',
            'Make small, focused commits',
            'Use branches for features and experiments',
            'Review code before merging',
            'Keep the main branch deployable',
            'Use tags for releases'
          ]
        }
      ]
    },
    'cicd-intro': {
      title: 'CI/CD Pipeline Introduction',
      sections: [
        {
          title: 'Continuous Integration (CI)',
          content: [
            'CI is the practice of automatically building and testing code changes frequently.',
            'Developers integrate their changes into a shared repository multiple times per day.',
            'Each integration is verified by automated builds and tests to detect errors quickly.',
            'Benefits: Early bug detection, reduced integration problems, faster development cycles.'
          ]
        },
        {
          title: 'Continuous Deployment (CD)',
          content: [
            'CD extends CI by automatically deploying all code changes to production after passing tests.',
            'Continuous Delivery ensures that code is always in a deployable state.',
            'Automated deployment reduces human error and enables faster releases.',
            'Rollback strategies ensure quick recovery from issues.'
          ]
        },
        {
          title: 'Pipeline Stages',
          content: [
            '1. Source: Code is committed to version control',
            '2. Build: Compile and package the application',
            '3. Test: Run automated tests (unit, integration, security)',
            '4. Deploy: Release to staging environment',
            '5. Test: Run acceptance and performance tests',
            '6. Release: Deploy to production',
            '7. Monitor: Track performance and user feedback'
          ]
        }
      ]
    },
    'gitops-principles': {
      title: 'GitOps Principles & Practices',
      sections: [
        {
          title: 'GitOps Definition',
          content: [
            'GitOps is a way of implementing Continuous Deployment for cloud native applications.',
            'It focuses on using Git as a single source of truth for declarative infrastructure and applications.',
            'Changes to infrastructure and applications are made through Git commits.',
            'Automated agents ensure the actual state matches the desired state defined in Git.'
          ]
        },
        {
          title: 'Four Principles of GitOps',
          content: [
            '1. Declarative: Everything is expressed declaratively',
            '2. Versioned: Everything is stored in Git with full version history',
            '3. Automatically Applied: Changes are automatically applied to the live system',
            '4. Continuously Monitored: The system continuously observes and corrects drift'
          ]
        },
        {
          title: 'Benefits of GitOps',
          content: [
            'Enhanced security through Git-based access control',
            'Improved reliability through declarative infrastructure',
            'Faster recovery with easy rollbacks',
            'Better collaboration through familiar Git workflows',
            'Complete audit trail of all changes',
            'Reduced operational complexity'
          ]
        }
      ]
    },
    'tools-overview': {
      title: 'DevOps Tools Ecosystem',
      sections: [
        {
          title: 'CI/CD Platforms',
          content: [
            'GitHub Actions: Integrated with GitHub, uses YAML workflows',
            'GitLab CI: Built into GitLab, offers complete DevOps platform',
            'Jenkins: Open-source, highly customizable with plugins',
            'Azure DevOps: Microsoft\'s integrated development solution',
            'CircleCI: Cloud-based with powerful workflow capabilities'
          ]
        },
        {
          title: 'Containerization & Orchestration',
          content: [
            'Docker: Package applications and dependencies into containers',
            'Kubernetes: Orchestrate containers at scale',
            'Docker Compose: Define multi-container applications',
            'Helm: Package manager for Kubernetes',
            'OpenShift: Enterprise Kubernetes platform'
          ]
        },
        {
          title: 'Monitoring & Observability',
          content: [
            'Prometheus: Metrics collection and alerting',
            'Grafana: Data visualization and dashboards',
            'ELK Stack: Elasticsearch, Logstash, Kibana for log analysis',
            'Datadog: Cloud monitoring and analytics',
            'New Relic: Application performance monitoring'
          ]
        }
      ]
    },
    'real-world-examples': {
      title: 'Real-World Applications',
      sections: [
        {
          title: 'Netflix: Continuous Deployment at Scale',
          content: [
            'Netflix deploys thousands of times per day across their global infrastructure.',
            'They use a sophisticated CI/CD pipeline with automated testing and canary deployments.',
            'Spinnaker (created by Netflix) manages multi-cloud deployments.',
            'Chaos engineering ensures system resilience.'
          ]
        },
        {
          title: 'Google: Site Reliability Engineering',
          content: [
            'Google pioneered SRE (Site Reliability Engineering) practices.',
            'They treat operations as a software problem.',
            'Error budgets balance feature velocity with reliability.',
            'Automated incident response reduces manual intervention.'
          ]
        },
        {
          title: 'Spotify: DevOps Culture',
          content: [
            'Spotify\'s squad model promotes autonomous teams.',
            'Each squad owns their service\'s full lifecycle.',
            'Continuous delivery enables rapid experimentation.',
            'Culture of learning from failures drives improvement.'
          ]
        }
      ]
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % presentationSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + presentationSlides.length) % presentationSlides.length);
  };

  const openModal = (contentKey) => {
    setModalContent(detailedContent[contentKey]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <div className="presentation-container">
      <nav className="presentation-nav">
        <Link to="/" className="nav-link">← Back to Home</Link>
        <div className="slide-counter">
          Slide {currentSlide + 1} of {presentationSlides.length}
        </div>
      </nav>

      <div className="slide-container">
        <div className="slide">
          <h1 className="slide-title">{presentationSlides[currentSlide].title}</h1>
          {presentationSlides[currentSlide].subtitle && (
            <h2 className="slide-subtitle">{presentationSlides[currentSlide].subtitle}</h2>
          )}
          <div className="slide-content">
            {presentationSlides[currentSlide].content.map((item, index) => (
              <div key={index} className="content-item">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="slide-controls">
          <button onClick={prevSlide} className="control-btn">
            ← Previous
          </button>
          <button onClick={nextSlide} className="control-btn">
            Next →
          </button>
        </div>

        <div className="quick-access">
          <h3>Learn More:</h3>
          <div className="topic-buttons">
            <button onClick={() => openModal('devops-basics')} className="topic-btn">
              DevOps Basics
            </button>
            <button onClick={() => openModal('version-control')} className="topic-btn">
              Version Control
            </button>
            <button onClick={() => openModal('cicd-intro')} className="topic-btn">
              CI/CD Pipeline
            </button>
            <button onClick={() => openModal('gitops-principles')} className="topic-btn">
              GitOps Principles
            </button>
            <button onClick={() => openModal('tools-overview')} className="topic-btn">
              DevOps Tools
            </button>
            <button onClick={() => openModal('real-world-examples')} className="topic-btn">
              Real Examples
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && modalContent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <h2 className="modal-title">{modalContent.title}</h2>
            <div className="modal-body">
              {modalContent.sections.map((section, index) => (
                <div key={index} className="modal-section">
                  <h3 className="section-title">{section.title}</h3>
                  <div className="section-content">
                    {section.content.map((item, itemIndex) => (
                      <p key={itemIndex} className="content-paragraph">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .presentation-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #ffffff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .presentation-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background: rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
        }

        .nav-link {
          color: #ffffff;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .slide-counter {
          background: rgba(255, 255, 255, 0.1);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
        }

        .slide-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .slide {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 3rem;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          min-height: 400px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .slide-title {
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 1rem;
          text-align: center;
          background: linear-gradient(45deg, #ffffff, #f0f0f0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .slide-subtitle {
          font-size: 1.5rem;
          text-align: center;
          margin-bottom: 2rem;
          opacity: 0.9;
          font-weight: 300;
        }

        .slide-content {
          font-size: 1.3rem;
          line-height: 1.8;
        }

        .content-item {
          margin-bottom: 1rem;
          padding: 0.5rem 0;
          opacity: 0.95;
        }

        .slide-controls {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .control-btn {
          background: rgba(255, 255, 255, 0.2);
          color: #ffffff;
          border: none;
          padding: 1rem 2rem;
          border-radius: 10px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .control-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .quick-access {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          padding: 2rem;
          backdrop-filter: blur(10px);
        }

        .quick-access h3 {
          text-align: center;
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
        }

        .topic-buttons {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .topic-btn {
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
          border: none;
          padding: 1rem;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          backdrop-filter: blur(5px);
        }

        .topic-btn:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          padding: 2rem;
          max-width: 800px;
          max-height: 80vh;
          overflow-y: auto;
          position: relative;
          color: #ffffff;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: #ffffff;
          font-size: 1.5rem;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .modal-close:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: rotate(90deg);
        }

        .modal-title {
          font-size: 2rem;
          margin-bottom: 2rem;
          text-align: center;
          background: linear-gradient(45deg, #ffffff, #f0f0f0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .modal-section {
          margin-bottom: 2rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 1.5rem;
        }

        .section-title {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: #ffffff;
          border-bottom: 2px solid rgba(255, 255, 255, 0.3);
          padding-bottom: 0.5rem;
        }

        .content-paragraph {
          margin-bottom: 0.8rem;
          line-height: 1.6;
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .slide-title {
            font-size: 2rem;
          }
          
          .slide-subtitle {
            font-size: 1.2rem;
          }
          
          .slide-content {
            font-size: 1.1rem;
          }
          
          .topic-buttons {
            grid-template-columns: 1fr;
          }
          
          .modal-content {
            margin: 1rem;
            max-height: 90vh;
          }
        }
      `}</style>
    </div>
  );
};

export default GitOpsPresentation;