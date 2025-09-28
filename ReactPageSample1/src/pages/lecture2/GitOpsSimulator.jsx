import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const GitOpsSimulator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [simulationState, setSimulationState] = useState({
    gitRepo: {
      branches: ['main'],
      currentBranch: 'main',
      commits: [
        { id: 'abc123', message: 'Initial application setup', author: 'dev-team', timestamp: '2 hours ago' }
      ],
      hasChanges: false
    },
    cluster: {
      status: 'running',
      pods: [
        { name: 'app-v1-pod-1', status: 'running', version: 'v1.0.0' },
        { name: 'app-v1-pod-2', status: 'running', version: 'v1.0.0' }
      ],
      services: ['app-service', 'database-service'],
      currentVersion: 'v1.0.0'
    },
    gitopsAgent: {
      status: 'watching',
      lastSync: '30 seconds ago',
      autoSync: true
    },
    deploymentHistory: []
  });
  
  const [logs, setLogs] = useState([
    { timestamp: new Date().toLocaleTimeString(), level: 'info', message: 'GitOps agent initialized and watching repository' },
    { timestamp: new Date().toLocaleTimeString(), level: 'info', message: 'Cluster state synchronized with Git repository' }
  ]);

  const [isSimulating, setIsSimulating] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState(null);

  const simulationSteps = [
    {
      title: "Initialize GitOps Environment",
      description: "Set up your Git repository and connect it to the Kubernetes cluster",
      actions: [
        "Create Git repository with application manifests",
        "Install GitOps agent (ArgoCD/Flux) on cluster",
        "Configure agent to watch the repository",
        "Verify initial synchronization"
      ],
      completed: true
    },
    {
      title: "Make Code Changes",
      description: "Simulate a developer making changes to the application",
      actions: [
        "Developer creates feature branch",
        "Implements new feature or bug fix",
        "Updates Docker image tag in manifests",
        "Commits changes to Git"
      ],
      completed: false
    },
    {
      title: "GitOps Deployment",
      description: "Watch as GitOps automatically deploys your changes",
      actions: [
        "GitOps agent detects Git changes",
        "Validates Kubernetes manifests",
        "Applies changes to cluster",
        "Monitors rollout status"
      ],
      completed: false
    },
    {
      title: "Monitor & Verify",
      description: "Ensure the deployment was successful and monitor the application",
      actions: [
        "Check pod health and readiness",
        "Verify service endpoints",
        "Monitor application metrics",
        "Confirm user traffic routing"
      ],
      completed: false
    }
  ];

  const scenarios = [
    {
      id: 'feature-deployment',
      title: 'Deploy New Feature',
      description: 'Deploy a new feature to production using GitOps',
      difficulty: 'Beginner',
      estimatedTime: '5 minutes',
      steps: [
        'Create feature branch',
        'Update application code',
        'Update Docker image tag',
        'Commit and push changes',
        'Watch automated deployment'
      ]
    },
    {
      id: 'rollback-scenario',
      title: 'Emergency Rollback',
      description: 'Practice rolling back a problematic deployment',
      difficulty: 'Intermediate',
      estimatedTime: '7 minutes',
      steps: [
        'Deploy problematic version',
        'Detect issues in monitoring',
        'Revert Git commit',
        'Watch automatic rollback',
        'Verify system recovery'
      ]
    },
    {
      id: 'multi-env-deployment',
      title: 'Multi-Environment Deployment',
      description: 'Deploy changes across dev, staging, and production',
      difficulty: 'Advanced',
      estimatedTime: '10 minutes',
      steps: [
        'Deploy to development',
        'Run automated tests',
        'Promote to staging',
        'Manual approval gate',
        'Deploy to production'
      ]
    }
  ];

  const addLog = (level, message) => {
    const newLog = {
      timestamp: new Date().toLocaleTimeString(),
      level,
      message
    };
    setLogs(prev => [newLog, ...prev.slice(0, 19)]); // Keep only last 20 logs
  };

  const simulateFeatureDeployment = async () => {
    setIsSimulating(true);
    addLog('info', 'Starting feature deployment simulation...');

    // Step 1: Create feature branch
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSimulationState(prev => ({
      ...prev,
      gitRepo: {
        ...prev.gitRepo,
        branches: [...prev.gitRepo.branches, 'feature/new-ui'],
        currentBranch: 'feature/new-ui',
        hasChanges: true
      }
    }));
    addLog('info', 'Created feature branch: feature/new-ui');

    // Step 2: Make code changes
    await new Promise(resolve => setTimeout(resolve, 1500));
    const newCommit = {
      id: 'def456',
      message: 'Add new user interface components',
      author: 'jane-dev',
      timestamp: 'just now'
    };
    setSimulationState(prev => ({
      ...prev,
      gitRepo: {
        ...prev.gitRepo,
        commits: [newCommit, ...prev.gitRepo.commits]
      }
    }));
    addLog('info', 'Committed changes: Add new user interface components');

    // Step 3: Merge to main
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSimulationState(prev => ({
      ...prev,
      gitRepo: {
        ...prev.gitRepo,
        currentBranch: 'main'
      }
    }));
    addLog('info', 'Merged feature branch to main');

    // Step 4: GitOps agent detects changes
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSimulationState(prev => ({
      ...prev,
      gitopsAgent: {
        ...prev.gitopsAgent,
        status: 'syncing',
        lastSync: 'now'
      }
    }));
    addLog('warning', 'GitOps agent detected changes in repository');
    addLog('info', 'Starting synchronization process...');

    // Step 5: Deploy new version
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSimulationState(prev => ({
      ...prev,
      cluster: {
        ...prev.cluster,
        pods: [
          { name: 'app-v2-pod-1', status: 'running', version: 'v2.0.0' },
          { name: 'app-v2-pod-2', status: 'running', version: 'v2.0.0' }
        ],
        currentVersion: 'v2.0.0'
      },
      gitopsAgent: {
        ...prev.gitopsAgent,
        status: 'synced',
        lastSync: 'just now'
      },
      deploymentHistory: [
        {
          version: 'v2.0.0',
          timestamp: new Date().toLocaleString(),
          status: 'success',
          commit: 'def456'
        },
        ...prev.deploymentHistory
      ]
    }));
    addLog('success', 'Successfully deployed version v2.0.0');
    addLog('info', 'All pods healthy and running');
    addLog('info', 'Deployment completed successfully!');

    setIsSimulating(false);
    setCurrentStep(4);
  };

  const simulateRollback = async () => {
    setIsSimulating(true);
    addLog('error', 'Critical issue detected in production!');
    addLog('warning', 'Initiating emergency rollback procedure...');

    // Step 1: Revert Git commit
    await new Promise(resolve => setTimeout(resolve, 1500));
    addLog('info', 'Reverting to previous stable commit: abc123');

    // Step 2: GitOps detects revert
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSimulationState(prev => ({
      ...prev,
      gitopsAgent: {
        ...prev.gitopsAgent,
        status: 'syncing'
      }
    }));
    addLog('info', 'GitOps agent detected revert commit');

    // Step 3: Rollback deployment
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSimulationState(prev => ({
      ...prev,
      cluster: {
        ...prev.cluster,
        pods: [
          { name: 'app-v1-pod-1', status: 'running', version: 'v1.0.0' },
          { name: 'app-v1-pod-2', status: 'running', version: 'v1.0.0' }
        ],
        currentVersion: 'v1.0.0'
      },
      gitopsAgent: {
        ...prev.gitopsAgent,
        status: 'synced'
      },
      deploymentHistory: [
        {
          version: 'v1.0.0',
          timestamp: new Date().toLocaleString(),
          status: 'rollback',
          commit: 'abc123'
        },
        ...prev.deploymentHistory
      ]
    }));
    addLog('success', 'Successfully rolled back to v1.0.0');
    addLog('info', 'System restored to stable state');

    setIsSimulating(false);
  };

  const resetSimulation = () => {
    setCurrentStep(0);
    setSimulationState({
      gitRepo: {
        branches: ['main'],
        currentBranch: 'main',
        commits: [
          { id: 'abc123', message: 'Initial application setup', author: 'dev-team', timestamp: '2 hours ago' }
        ],
        hasChanges: false
      },
      cluster: {
        status: 'running',
        pods: [
          { name: 'app-v1-pod-1', status: 'running', version: 'v1.0.0' },
          { name: 'app-v1-pod-2', status: 'running', version: 'v1.0.0' }
        ],
        services: ['app-service', 'database-service'],
        currentVersion: 'v1.0.0'
      },
      gitopsAgent: {
        status: 'watching',
        lastSync: '30 seconds ago',
        autoSync: true
      },
      deploymentHistory: []
    });
    setLogs([
      { timestamp: new Date().toLocaleTimeString(), level: 'info', message: 'GitOps agent initialized and watching repository' },
      { timestamp: new Date().toLocaleTimeString(), level: 'info', message: 'Cluster state synchronized with Git repository' }
    ]);
    setSelectedScenario(null);
  };

  return (
    <div className="simulator-container">
      {/* Header */}
      <header className="simulator-header">
        <div className="header-content">
          <Link to="/gitops-lms" className="back-link">← Back to Course</Link>
          <h1>GitOps Deployment Simulator</h1>
          <button onClick={resetSimulation} className="reset-btn">Reset Simulation</button>
        </div>
      </header>

      <div className="simulator-body">
        {/* Scenario Selection */}
        {!selectedScenario && (
          <div className="scenario-selection">
            <h2>Choose a Deployment Scenario</h2>
            <div className="scenarios-grid">
              {scenarios.map(scenario => (
                <div key={scenario.id} className="scenario-card">
                  <h3>{scenario.title}</h3>
                  <p className="scenario-description">{scenario.description}</p>
                  <div className="scenario-meta">
                    <span className={`difficulty ${scenario.difficulty.toLowerCase()}`}>
                      {scenario.difficulty}
                    </span>
                    <span className="time">⏱️ {scenario.estimatedTime}</span>
                  </div>
                  <div className="scenario-steps">
                    <h4>What you'll learn:</h4>
                    <ul>
                      {scenario.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                  </div>
                  <button 
                    onClick={() => setSelectedScenario(scenario)}
                    className="start-scenario-btn"
                  >
                    Start Scenario
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Simulator Interface */}
        {selectedScenario && (
          <div className="simulator-interface">
            {/* Progress Steps */}
            <div className="steps-section">
              <h3>Deployment Process</h3>
              <div className="steps-list">
                {simulationSteps.map((step, index) => (
                  <div key={index} className={`step-item ${index === currentStep ? 'active' : ''} ${step.completed ? 'completed' : ''}`}>
                    <div className="step-number">{index + 1}</div>
                    <div className="step-content">
                      <h4>{step.title}</h4>
                      <p>{step.description}</p>
                      <ul className="step-actions">
                        {step.actions.map((action, actionIndex) => (
                          <li key={actionIndex}>{action}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Control Panel */}
            <div className="control-panel">
              <h3>Simulation Controls</h3>
              <div className="controls-grid">
                <button 
                  onClick={simulateFeatureDeployment}
                  disabled={isSimulating}
                  className="action-btn deploy"
                >
                  {isSimulating ? 'Deploying...' : 'Deploy New Feature'}
                </button>
                <button 
                  onClick={simulateRollback}
                  disabled={isSimulating || simulationState.cluster.currentVersion === 'v1.0.0'}
                  className="action-btn rollback"
                >
                  Emergency Rollback
                </button>
              </div>
            </div>

            {/* System Overview */}
            <div className="system-overview">
              <div className="overview-section">
                <h3>🔧 Git Repository</h3>
                <div className="git-info">
                  <div className="info-row">
                    <span>Current Branch:</span>
                    <code>{simulationState.gitRepo.currentBranch}</code>
                  </div>
                  <div className="info-row">
                    <span>Branches:</span>
                    <div className="branches">
                      {simulationState.gitRepo.branches.map(branch => (
                        <span key={branch} className="branch-tag">{branch}</span>
                      ))}
                    </div>
                  </div>
                  <div className="commits-section">
                    <h4>Recent Commits:</h4>
                    {simulationState.gitRepo.commits.map(commit => (
                      <div key={commit.id} className="commit-item">
                        <code className="commit-id">{commit.id}</code>
                        <span className="commit-message">{commit.message}</span>
                        <span className="commit-meta">{commit.author} • {commit.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="overview-section">
                <h3>☸️ Kubernetes Cluster</h3>
                <div className="cluster-info">
                  <div className="info-row">
                    <span>Status:</span>
                    <span className={`status ${simulationState.cluster.status}`}>
                      {simulationState.cluster.status}
                    </span>
                  </div>
                  <div className="info-row">
                    <span>Current Version:</span>
                    <code>{simulationState.cluster.currentVersion}</code>
                  </div>
                  <div className="pods-section">
                    <h4>Running Pods:</h4>
                    {simulationState.cluster.pods.map(pod => (
                      <div key={pod.name} className="pod-item">
                        <span className="pod-name">{pod.name}</span>
                        <span className={`pod-status ${pod.status}`}>{pod.status}</span>
                        <span className="pod-version">{pod.version}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="overview-section">
                <h3>🔄 GitOps Agent</h3>
                <div className="agent-info">
                  <div className="info-row">
                    <span>Status:</span>
                    <span className={`status ${simulationState.gitopsAgent.status}`}>
                      {simulationState.gitopsAgent.status}
                    </span>
                  </div>
                  <div className="info-row">
                    <span>Last Sync:</span>
                    <span>{simulationState.gitopsAgent.lastSync}</span>
                  </div>
                  <div className="info-row">
                    <span>Auto Sync:</span>
                    <span className={simulationState.gitopsAgent.autoSync ? 'enabled' : 'disabled'}>
                      {simulationState.gitopsAgent.autoSync ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Deployment History */}
            {simulationState.deploymentHistory.length > 0 && (
              <div className="deployment-history">
                <h3>📋 Deployment History</h3>
                <div className="history-list">
                  {simulationState.deploymentHistory.map((deployment, index) => (
                    <div key={index} className={`history-item ${deployment.status}`}>
                      <div className="deployment-version">{deployment.version}</div>
                      <div className="deployment-details">
                        <span className="deployment-time">{deployment.timestamp}</span>
                        <span className={`deployment-status ${deployment.status}`}>
                          {deployment.status}
                        </span>
                        <code className="deployment-commit">{deployment.commit}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Live Logs */}
            <div className="logs-section">
              <h3>📄 Live Logs</h3>
              <div className="logs-container">
                {logs.map((log, index) => (
                  <div key={index} className={`log-entry ${log.level}`}>
                    <span className="log-timestamp">{log.timestamp}</span>
                    <span className={`log-level ${log.level}`}>{log.level.toUpperCase()}</span>
                    <span className="log-message">{log.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .simulator-container {
          min-height: 100vh;
          background: #f5f7fa;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .simulator-header {
          background: #fff;
          border-bottom: 1px solid #e1e8ed;
          padding: 1rem 0;
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

        .back-link {
          color: #007bff;
          text-decoration: none;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .back-link:hover {
          color: #0056b3;
        }

        .simulator-header h1 {
          margin: 0;
          color: #2c3e50;
          font-size: 1.8rem;
        }

        .reset-btn {
          background: #6c757d;
          color: #fff;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
        }

        .reset-btn:hover {
          background: #5a6268;
        }

        .simulator-body {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }

        .scenario-selection {
          text-align: center;
          margin-bottom: 3rem;
        }

        .scenario-selection h2 {
          color: #2c3e50;
          margin-bottom: 2rem;
          font-size: 2rem;
        }

        .scenarios-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .scenario-card {
          background: #fff;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          text-align: left;
          transition: transform 0.2s ease;
        }

        .scenario-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 12px rgba(0,0,0,0.15);
        }

        .scenario-card h3 {
          color: #2c3e50;
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }

        .scenario-description {
          color: #6c757d;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }

        .scenario-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .difficulty {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .difficulty.beginner {
          background: #d4edda;
          color: #155724;
        }

        .difficulty.intermediate {
          background: #fff3cd;
          color: #856404;
        }

        .difficulty.advanced {
          background: #f8d7da;
          color: #721c24;
        }

        .time {
          color: #6c757d;
          font-size: 0.9rem;
        }

        .scenario-steps h4 {
          color: #495057;
          margin-bottom: 0.75rem;
          font-size: 1rem;
        }

        .scenario-steps ul {
          margin: 0;
          padding-left: 1.5rem;
          color: #6c757d;
        }

        .scenario-steps li {
          margin-bottom: 0.5rem;
        }

        .start-scenario-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          border: none;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          width: 100%;
          margin-top: 1.5rem;
          transition: all 0.2s ease;
        }

        .start-scenario-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }

        .simulator-interface {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .steps-section, .control-panel, .system-overview, .deployment-history, .logs-section {
          background: #fff;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .steps-section {
          grid-column: 1 / -1;
        }

        .steps-section h3, .control-panel h3, .system-overview h3, .deployment-history h3, .logs-section h3 {
          color: #2c3e50;
          margin-bottom: 1.5rem;
          font-size: 1.2rem;
        }

        .steps-list {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
        }

        .step-item {
          flex: 1;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.5rem;
          border-radius: 8px;
          background: #f8f9fa;
          transition: all 0.3s ease;
        }

        .step-item.active {
          background: #e3f2fd;
          border: 2px solid #2196f3;
        }

        .step-item.completed {
          background: #e8f5e8;
          border: 2px solid #28a745;
        }

        .step-number {
          background: #6c757d;
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

        .step-item.active .step-number {
          background: #2196f3;
        }

        .step-item.completed .step-number {
          background: #28a745;
        }

        .step-content h4 {
          margin: 0 0 0.5rem 0;
          color: #2c3e50;
          font-size: 1rem;
        }

        .step-content p {
          margin: 0 0 1rem 0;
          color: #6c757d;
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .step-actions {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .step-actions li {
          font-size: 0.8rem;
          color: #868e96;
          margin-bottom: 0.25rem;
          position: relative;
          padding-left: 1rem;
        }

        .step-actions li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #ced4da;
        }

        .controls-grid {
          display: grid;
          gap: 1rem;
        }

        .action-btn {
          padding: 1rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 1rem;
        }

        .action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .action-btn.deploy {
          background: #28a745;
          color: #fff;
        }

        .action-btn.deploy:hover:not(:disabled) {
          background: #218838;
          transform: translateY(-1px);
        }

        .action-btn.rollback {
          background: #dc3545;
          color: #fff;
        }

        .action-btn.rollback:hover:not(:disabled) {
          background: #c82333;
          transform: translateY(-1px);
        }

        .system-overview {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .overview-section h3 {
          margin-bottom: 1rem;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #e9ecef;
        }

        .info-row:last-child {
          border-bottom: none;
          margin-bottom: 1rem;
        }

        .status {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .status.running, .status.synced, .status.enabled {
          background: #d4edda;
          color: #155724;
        }

        .status.syncing, .status.watching {
          background: #fff3cd;
          color: #856404;
        }

        .branches {
          display: flex;
          gap: 0.5rem;
        }

        .branch-tag {
          background: #e9ecef;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
          font-family: monospace;
        }

        .commits-section h4, .pods-section h4 {
          color: #495057;
          margin-bottom: 0.75rem;
          font-size: 0.9rem;
        }

        .commit-item, .pod-item {
          background: #f8f9fa;
          padding: 0.75rem;
          border-radius: 6px;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
        }

        .commit-id, .pod-version {
          background: #e9ecef;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.8rem;
        }

        .commit-message {
          flex: 1;
          color: #495057;
        }

        .commit-meta {
          color: #6c757d;
          font-size: 0.8rem;
        }

        .pod-name {
          flex: 1;
          font-family: monospace;
        }

        .pod-status {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .pod-status.running {
          background: #d4edda;
          color: #155724;
        }

        .deployment-history {
          grid-column: 1 / -1;
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .history-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-radius: 8px;
          border-left: 4px solid #28a745;
        }

        .history-item.rollback {
          border-left-color: #dc3545;
        }

        .deployment-version {
          font-family: monospace;
          font-weight: bold;
          background: #e9ecef;
          padding: 0.5rem;
          border-radius: 4px;
        }

        .deployment-details {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .deployment-time {
          color: #6c757d;
          font-size: 0.9rem;
        }

        .deployment-status {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .deployment-status.success {
          background: #d4edda;
          color: #155724;
        }

        .deployment-status.rollback {
          background: #f8d7da;
          color: #721c24;
        }

        .deployment-commit {
          font-family: monospace;
          background: #e9ecef;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
        }

        .logs-section {
          grid-column: 1 / -1;
        }

        .logs-container {
          background: #1e1e1e;
          border-radius: 8px;
          padding: 1rem;
          max-height: 300px;
          overflow-y: auto;
          font-family: 'Consolas', 'Monaco', monospace;
        }

        .log-entry {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.5rem;
          padding: 0.5rem;
          border-radius: 4px;
          font-size: 0.9rem;
        }

        .log-entry.info {
          background: rgba(52, 144, 220, 0.1);
        }

        .log-entry.warning {
          background: rgba(255, 193, 7, 0.1);
        }

        .log-entry.error {
          background: rgba(220, 53, 69, 0.1);
        }

        .log-entry.success {
          background: rgba(40, 167, 69, 0.1);
        }

        .log-timestamp {
          color: #6c757d;
          font-size: 0.8rem;
          min-width: 80px;
        }

        .log-level {
          font-weight: bold;
          min-width: 60px;
          font-size: 0.8rem;
        }

        .log-level.info {
          color: #3490dc;
        }

        .log-level.warning {
          color: #ffcd07;
        }

        .log-level.error {
          color: #dc3545;
        }

        .log-level.success {
          color: #28a745;
        }

        .log-message {
          color: #e9ecef;
          flex: 1;
        }

        @media (max-width: 768px) {
          .simulator-interface {
            grid-template-columns: 1fr;
          }
          
          .system-overview {
            grid-template-columns: 1fr;
          }
          
          .steps-list {
            flex-direction: column;
          }
          
          .scenarios-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default GitOpsSimulator;