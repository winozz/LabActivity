import React, { useState } from 'react';

const EmbeddedSimulator = ({ scenario = "gitops-workflow" }) => {
  const [step, setStep] = useState(0);
  const [gitRepository, setGitRepository] = useState({
    branches: ['main', 'feature/new-api'],
    commits: [
      { id: 'abc123', message: 'Initial deployment config', files: ['app-deployment.yaml'] },
      { id: 'def456', message: 'Add new API endpoint', files: ['api-service.yaml'] }
    ]
  });
  const [kubernetesCluster, setKubernetesCluster] = useState({
    deployments: [],
    services: [],
    status: 'Empty Cluster'
  });
  const [gitOpsAgent, setGitOpsAgent] = useState({
    status: 'Watching',
    lastSync: null,
    health: 'Healthy'
  });
  const [githubActions, setGithubActions] = useState({
    status: 'idle',
    workflows: ['ci.yml', 'deploy-staging.yml', 'deploy-production.yml'],
    lastRun: null,
    currentJob: null
  });
  const [environments, setEnvironments] = useState({
    staging: {
      status: 'running',
      version: 'v1.0.0',
      url: 'https://staging.myapp.com',
      lastDeployed: '1 hour ago'
    },
    production: {
      status: 'running',
      version: 'v1.0.0',
      url: 'https://myapp.com',
      lastDeployed: '1 day ago',
      requiresApproval: true
    }
  });

  const scenarios = {
    "github-actions-gitops": {
      title: "GitHub Actions GitOps Workflow",
      steps: [
        {
          title: "Create Pull Request",
          description: "Developer creates a pull request with new API endpoint changes.",
          action: "Open Pull Request",
          actionFn: () => {
            setGitRepository(prev => ({
              ...prev,
              pullRequest: { id: 42, title: 'Add new API endpoint', status: 'open' }
            }));
          }
        },
        {
          title: "Automated CI Testing",
          description: "GitHub Actions runs automated tests, linting, and security scans.",
          action: "Run CI Pipeline",
          actionFn: () => {
            setGithubActions(prev => ({
              ...prev,
              status: 'running',
              currentJob: 'test',
              lastRun: { id: 1234, status: 'running', workflow: 'CI' }
            }));
            setTimeout(() => {
              setGithubActions(prev => ({
                ...prev,
                status: 'success',
                currentJob: null,
                lastRun: { id: 1234, status: 'success', workflow: 'CI' }
              }));
            }, 2000);
          }
        },
        {
          title: "Deploy to Staging",
          description: "After CI passes, automatically deploy to staging environment.",
          action: "Deploy to Staging",
          actionFn: () => {
            setGithubActions(prev => ({
              ...prev,
              status: 'running',
              currentJob: 'deploy-staging',
              lastRun: { id: 1235, status: 'running', workflow: 'Deploy Staging' }
            }));
            setTimeout(() => {
              setEnvironments(prev => ({
                ...prev,
                staging: {
                  ...prev.staging,
                  version: 'v1.1.0',
                  lastDeployed: 'just now'
                }
              }));
              setGithubActions(prev => ({
                ...prev,
                status: 'success',
                currentJob: null,
                lastRun: { id: 1235, status: 'success', workflow: 'Deploy Staging' }
              }));
            }, 2500);
          }
        },
        {
          title: "Production Deployment",
          description: "Manual approval required for production deployment.",
          action: "Deploy to Production",
          actionFn: () => {
            setGithubActions(prev => ({
              ...prev,
              status: 'waiting_approval',
              lastRun: { id: 1236, status: 'waiting_approval', workflow: 'Deploy Production' }
            }));
            setTimeout(() => {
              setGithubActions(prev => ({
                ...prev,
                status: 'running',
                currentJob: 'deploy-production'
              }));
              setTimeout(() => {
                setEnvironments(prev => ({
                  ...prev,
                  production: {
                    ...prev.production,
                    version: 'v1.1.0',
                    lastDeployed: 'just now'
                  }
                }));
                setGithubActions(prev => ({
                  ...prev,
                  status: 'success',
                  currentJob: null,
                  lastRun: { id: 1236, status: 'success', workflow: 'Deploy Production' }
                }));
              }, 2000);
            }, 2000);
          }
        }
      ]
    },
    "gitops-workflow": {
      title: "GitOps Deployment Workflow",
      steps: [
        {
          title: "Initial State",
          description: "Start with an empty Kubernetes cluster and a Git repository containing deployment configurations.",
          action: "Start Simulation",
          actionFn: null
        },
        {
          title: "Push New Deployment",
          description: "Developer pushes a new deployment configuration to the Git repository.",
          action: "Push Changes to Git",
          actionFn: () => {
            const newCommit = {
              id: 'def456',
              message: 'Update app to version 2.1.0',
              files: ['app-deployment.yaml']
            };
            setGitRepository(prev => ({
              ...prev,
              commits: [...prev.commits, newCommit]
            }));
          }
        },
        {
          title: "GitOps Agent Detects Changes",
          description: "The GitOps agent (ArgoCD/Flux) detects changes in the Git repository.",
          action: "Agent Syncs Repository",
          actionFn: () => {
            setGitOpsAgent(prev => ({
              ...prev,
              lastSync: new Date().toLocaleTimeString(),
              status: 'Syncing'
            }));
          }
        },
        {
          title: "Deploy to Kubernetes",
          description: "GitOps agent applies the configuration changes to the Kubernetes cluster.",
          action: "Apply Kubernetes Manifests",
          actionFn: () => {
            setKubernetesCluster(prev => ({
              ...prev,
              deployments: [
                {
                  name: 'web-app',
                  replicas: 3,
                  image: 'myapp:v2.1.0',
                  status: 'Running'
                }
              ],
              services: [
                {
                  name: 'web-app-service',
                  type: 'LoadBalancer',
                  port: 80
                }
              ],
              status: 'Application Deployed'
            }));
            setGitOpsAgent(prev => ({
              ...prev,
              status: 'Synced',
              health: 'Healthy'
            }));
          }
        },
        {
          title: "Monitoring & Drift Detection",
          description: "GitOps continuously monitors for any configuration drift and maintains the desired state.",
          action: "Complete GitOps Cycle",
          actionFn: () => {
            setGitOpsAgent(prev => ({
              ...prev,
              status: 'Monitoring',
              health: 'Healthy'
            }));
          }
        }
      ]
    }
  };

  const currentScenario = scenarios[scenario] || scenarios["gitops-workflow"];
  const currentStep = currentScenario.steps[step];

  const executeStep = () => {
    if (currentStep.actionFn) {
      currentStep.actionFn();
    }
    
    if (step < currentScenario.steps.length - 1) {
      setTimeout(() => setStep(prev => prev + 1), 500);
    }
  };

  const resetSimulation = () => {
    setStep(0);
    setGitRepository({
      branches: ['main', 'feature/new-api'],
      commits: [
        { id: 'abc123', message: 'Initial deployment config', files: ['app-deployment.yaml'] }
      ]
    });
    setKubernetesCluster({
      deployments: [],
      services: [],
      status: 'Empty Cluster'
    });
    setGitOpsAgent({
      status: 'Watching',
      lastSync: null,
      health: 'Healthy'
    });
    setGithubActions({
      status: 'idle',
      workflows: ['ci.yml', 'deploy-staging.yml', 'deploy-production.yml'],
      lastRun: null,
      currentJob: null
    });
    setEnvironments({
      staging: {
        status: 'running',
        version: 'v1.0.0',
        url: 'https://staging.myapp.com',
        lastDeployed: '1 hour ago'
      },
      production: {
        status: 'running',
        version: 'v1.0.0',
        url: 'https://myapp.com',
        lastDeployed: '1 day ago',
        requiresApproval: true
      }
    });
  };

  return (
    <div style={{
      background: '#1a1a1a',
      border: '1px solid #333',
      borderRadius: '12px',
      padding: '1.5rem',
      color: '#e0e0e0'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid #333'
      }}>
        <h3 style={{ color: '#64ffda', margin: 0 }}>{currentScenario.title}</h3>
        <button
          onClick={resetSimulation}
          style={{
            background: '#6c757d',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.875rem'
          }}
        >
          🔄 Reset
        </button>
      </div>

      {/* Step Information */}
      <div style={{
        background: '#2d2d2d',
        border: '1px solid #444',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1.5rem'
      }}>
        <h4 style={{ color: '#ffd700', margin: '0 0 0.5rem 0' }}>
          Step {step + 1}: {currentStep.title}
        </h4>
        <p style={{ margin: '0 0 1rem 0', color: '#ccc' }}>
          {currentStep.description}
        </p>
        <button
          onClick={executeStep}
          disabled={step >= currentScenario.steps.length - 1 && (gitOpsAgent.status === 'Monitoring' || githubActions.status === 'success')}
          style={{
            background: step >= currentScenario.steps.length - 1 && (gitOpsAgent.status === 'Monitoring' || githubActions.status === 'success') 
              ? '#28a745' : '#007bff',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            cursor: step >= currentScenario.steps.length - 1 && (gitOpsAgent.status === 'Monitoring' || githubActions.status === 'success') 
              ? 'default' : 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}
        >
          {step >= currentScenario.steps.length - 1 && (gitOpsAgent.status === 'Monitoring' || githubActions.status === 'success') 
            ? '✅ Simulation Complete' : currentStep.action}
        </button>
      </div>

      {/* GitHub Actions GitOps Simulation */}
      {scenario === "github-actions-gitops" ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem'
        }}>
          {/* Git Repository & PR */}
          <div style={{
            background: '#2d2d2d',
            border: '1px solid #444',
            borderRadius: '8px',
            padding: '1rem'
          }}>
            <h4 style={{ color: '#f39c12', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center' }}>
              🔧 Git Repository
            </h4>
            <div style={{ fontSize: '0.875rem' }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Branches:</strong> {gitRepository.branches.join(', ')}
              </div>
              {gitRepository.pullRequest && (
                <div style={{
                  background: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '4px',
                  padding: '0.5rem',
                  marginTop: '0.5rem'
                }}>
                  <div style={{ color: '#64ffda' }}>🔄 Pull Request #{gitRepository.pullRequest.id}</div>
                  <div>{gitRepository.pullRequest.title}</div>
                  <span style={{ 
                    background: gitRepository.pullRequest.status === 'open' ? '#28a745' : '#6c757d',
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '0.75rem'
                  }}>
                    {gitRepository.pullRequest.status}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* GitHub Actions */}
          <div style={{
            background: '#2d2d2d',
            border: '1px solid #444',
            borderRadius: '8px',
            padding: '1rem'
          }}>
            <h4 style={{ color: '#e74c3c', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center' }}>
              ⚡ GitHub Actions
            </h4>
            <div style={{ fontSize: '0.875rem' }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Status:</strong> 
                <span style={{ 
                  color: githubActions.status === 'success' ? '#28a745' : 
                        githubActions.status === 'running' ? '#fd7e14' : 
                        githubActions.status === 'waiting_approval' ? '#ffc107' : '#6c757d',
                  marginLeft: '0.5rem'
                }}>
                  {githubActions.status}
                </span>
              </div>
              {githubActions.currentJob && (
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Current Job:</strong> {githubActions.currentJob}
                </div>
              )}
              {githubActions.lastRun && (
                <div style={{
                  background: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '4px',
                  padding: '0.5rem',
                  marginTop: '0.5rem'
                }}>
                  <div style={{ color: '#64ffda' }}>Last Run: {githubActions.lastRun.workflow}</div>
                  <span style={{ 
                    background: githubActions.lastRun.status === 'success' ? '#28a745' : 
                              githubActions.lastRun.status === 'running' ? '#fd7e14' : 
                              githubActions.lastRun.status === 'waiting_approval' ? '#ffc107' : '#dc3545',
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '0.75rem'
                  }}>
                    {githubActions.lastRun.status}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Staging Environment */}
          <div style={{
            background: '#2d2d2d',
            border: '1px solid #444',
            borderRadius: '8px',
            padding: '1rem'
          }}>
            <h4 style={{ color: '#fd7e14', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center' }}>
              🌐 Staging Environment
            </h4>
            <div style={{ fontSize: '0.875rem' }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Status:</strong> 
                <span style={{ color: '#28a745', marginLeft: '0.5rem' }}>
                  {environments.staging.status}
                </span>
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Version:</strong> {environments.staging.version}
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>URL:</strong> 
                <a href={environments.staging.url} style={{ color: '#64ffda', marginLeft: '0.5rem' }}>
                  {environments.staging.url}
                </a>
              </div>
              <div>
                <strong>Last Deployed:</strong> {environments.staging.lastDeployed}
              </div>
            </div>
          </div>

          {/* Production Environment */}
          <div style={{
            background: '#2d2d2d',
            border: '1px solid #444',
            borderRadius: '8px',
            padding: '1rem'
          }}>
            <h4 style={{ color: '#dc3545', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center' }}>
              🚀 Production Environment
            </h4>
            <div style={{ fontSize: '0.875rem' }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Status:</strong> 
                <span style={{ color: '#28a745', marginLeft: '0.5rem' }}>
                  {environments.production.status}
                </span>
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Version:</strong> {environments.production.version}
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>URL:</strong> 
                <a href={environments.production.url} style={{ color: '#64ffda', marginLeft: '0.5rem' }}>
                  {environments.production.url}
                </a>
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Last Deployed:</strong> {environments.production.lastDeployed}
              </div>
              {environments.production.requiresApproval && githubActions.status === 'waiting_approval' && (
                <div style={{ color: '#ffc107' }}>⚠️ Requires manual approval</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Traditional GitOps Simulation */
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '1rem'
        }}>
          {/* Git Repository */}
          <div style={{
            background: '#2d2d2d',
            border: '1px solid #444',
            borderRadius: '8px',
            padding: '1rem'
          }}>
            <h4 style={{ color: '#f39c12', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center' }}>
              🔧 Git Repository
            </h4>
            <div style={{ fontSize: '0.875rem' }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Branch:</strong> {gitRepository.branches[0]}
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Latest Commits:</strong>
              </div>
              {gitRepository.commits.slice(-2).map((commit, index) => (
                <div key={commit.id} style={{
                  background: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '4px',
                  padding: '0.5rem',
                  marginBottom: '0.5rem',
                  fontSize: '0.8rem'
                }}>
                  <div style={{ color: '#64ffda' }}>{commit.id}</div>
                  <div>{commit.message}</div>
                  <div style={{ color: '#888' }}>{commit.files.join(', ')}</div>
                </div>
              ))}
            </div>
          </div>

          {/* GitOps Agent */}
          <div style={{
            background: '#2d2d2d',
            border: '1px solid #444',
            borderRadius: '8px',
            padding: '1rem'
          }}>
            <h4 style={{ color: '#e74c3c', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center' }}>
              🤖 GitOps Agent
            </h4>
            <div style={{ fontSize: '0.875rem' }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Status:</strong> 
                <span style={{ 
                  color: gitOpsAgent.status === 'Synced' ? '#28a745' : 
                         gitOpsAgent.status === 'Syncing' ? '#ffc107' : '#6c757d',
                  marginLeft: '0.5rem'
                }}>
                  {gitOpsAgent.status}
                </span>
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Health:</strong> 
                <span style={{ color: '#28a745', marginLeft: '0.5rem' }}>
                  {gitOpsAgent.health}
                </span>
              </div>
              <div>
                <strong>Last Sync:</strong> {gitOpsAgent.lastSync || 'Never'}
              </div>
            </div>
          </div>

          {/* Kubernetes Cluster */}
          <div style={{
            background: '#2d2d2d',
            border: '1px solid #444',
            borderRadius: '8px',
            padding: '1rem'
          }}>
            <h4 style={{ color: '#3498db', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center' }}>
              ☸️ Kubernetes Cluster
            </h4>
            <div style={{ fontSize: '0.875rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <strong>Status:</strong> 
                <span style={{ 
                  color: kubernetesCluster.status === 'Application Deployed' ? '#28a745' : '#6c757d',
                  marginLeft: '0.5rem'
                }}>
                  {kubernetesCluster.status}
                </span>
              </div>
              
              {kubernetesCluster.deployments.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  <strong>Deployments:</strong>
                  {kubernetesCluster.deployments.map((deployment, index) => (
                    <div key={index} style={{
                      background: '#1a1a1a',
                      border: '1px solid #333',
                      borderRadius: '4px',
                      padding: '0.5rem',
                      marginTop: '0.5rem',
                      fontSize: '0.8rem'
                    }}>
                      <div><strong>{deployment.name}</strong></div>
                      <div>Replicas: {deployment.replicas}</div>
                      <div>Image: {deployment.image}</div>
                      <div style={{ color: '#28a745' }}>Status: {deployment.status}</div>
                    </div>
                  ))}
                </div>
              )}

              {kubernetesCluster.services.length > 0 && (
                <div>
                  <strong>Services:</strong>
                  {kubernetesCluster.services.map((service, index) => (
                    <div key={index} style={{
                      background: '#1a1a1a',
                      border: '1px solid #333',
                      borderRadius: '4px',
                      padding: '0.5rem',
                      marginTop: '0.5rem',
                      fontSize: '0.8rem'
                    }}>
                      <div><strong>{service.name}</strong></div>
                      <div>Type: {service.type}</div>
                      <div>Port: {service.port}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Progress Indicator */}
      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        background: '#2d2d2d',
        borderRadius: '8px'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '0.5rem'
        }}>
          <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Progress</span>
          <span style={{ fontSize: '0.875rem', color: '#64ffda' }}>
            {step + 1} / {currentScenario.steps.length}
          </span>
        </div>
        <div style={{
          width: '100%',
          height: '8px',
          background: '#1a1a1a',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${((step + 1) / currentScenario.steps.length) * 100}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #007bff, #64ffda)',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>
    </div>
  );
};

export default EmbeddedSimulator;