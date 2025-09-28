import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DevelopmentSetup = () => {
  const [activeTab, setActiveTab] = useState('nodejs');
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (itemId) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const setupSteps = {
    nodejs: {
      title: "Node.js & npm",
      icon: "🟢",
      description: "Node.js is a JavaScript runtime that allows you to run JavaScript outside the browser. npm is the package manager that comes with Node.js.",
      steps: [
        {
          id: "download-node",
          title: "Download Node.js",
          description: "Visit nodejs.org and download the LTS (Long Term Support) version",
          command: "# Check if Node.js is installed\nnode --version\nnpm --version",
          details: "The LTS version is recommended for most users as it's the most stable."
        },
        {
          id: "install-node",
          title: "Install Node.js",
          description: "Run the installer and follow the setup wizard",
          details: "The installer will automatically add Node.js and npm to your PATH."
        },
        {
          id: "verify-installation",
          title: "Verify Installation",
          description: "Open terminal/command prompt and check versions",
          command: "node --version  # Should show v18.x.x or higher\nnpm --version   # Should show 9.x.x or higher"
        }
      ]
    },
    editor: {
      title: "Code Editor Setup",
      icon: "📝",
      description: "A good code editor with React support will make development much easier and more productive.",
      steps: [
        {
          id: "vscode-download",
          title: "Download VS Code",
          description: "Visual Studio Code is the most popular editor for React development",
          details: "Download from code.visualstudio.com - it's free and cross-platform."
        },
        {
          id: "react-extensions",
          title: "Install React Extensions",
          description: "Essential extensions for React development",
          extensions: [
            "ES7+ React/Redux/React-Native snippets",
            "Bracket Pair Colorizer",
            "Auto Rename Tag",
            "Prettier - Code formatter",
            "ESLint"
          ]
        },
        {
          id: "configure-vscode",
          title: "Configure VS Code",
          description: "Set up useful settings for React development",
          command: `// settings.json
{
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}`
        }
      ]
    },
    react_app: {
      title: "Create React App (Legacy)",
      icon: "⚛️",
      description: "Create React App was the traditional tool for React projects, but it's now considered legacy due to performance limitations and maintenance challenges.",
      steps: [
        {
          id: "cra-overview",
          title: "What is Create React App?",
          description: "Understanding CRA's role and current status",
          details: "Create React App was Facebook's official tool for bootstrapping React applications. It provided zero-configuration setup with Webpack, Babel, and other tools pre-configured. However, it's now in maintenance mode and no longer actively developed.",
          limitations: [
            "Slow development server startup (3-5 seconds)",
            "Slower hot module replacement (HMR)",
            "Large bundle sizes",
            "Limited customization without ejecting",
            "Outdated build tools (Webpack 5 with complex config)",
            "No longer actively maintained by Facebook",
            "Poor performance on large applications"
          ]
        },
        {
          id: "cra-scalability-issues",
          title: "Why CRA Isn't Scalable",
          description: "Understanding the fundamental limitations that make CRA unsuitable for modern development",
          scalabilityIssues: [
            {
              problem: "Bundle Size Growth",
              description: "As your app grows, CRA's bundle sizes become increasingly large, leading to slower load times",
              impact: "Production bundles can exceed 2-3MB even for medium-sized applications"
            },
            {
              problem: "Development Server Performance",
              description: "Webpack's development server becomes slower as your codebase grows",
              impact: "Startup times can reach 30+ seconds for large applications"
            },
            {
              problem: "Limited Tree Shaking",
              description: "Webpack's tree shaking in CRA is not as effective as modern bundlers",
              impact: "Unused code often remains in production bundles"
            },
            {
              problem: "Complex Configuration",
              description: "Customizing CRA requires ejecting, which exposes complex Webpack config",
              impact: "Once ejected, you lose automatic updates and must maintain build tools manually"
            },
            {
              problem: "Outdated Dependencies",
              description: "CRA often ships with outdated versions of build tools and dependencies",
              impact: "Security vulnerabilities and missing modern features"
            }
          ]
        },
        {
          id: "create-cra-app",
          title: "Creating a CRA App (For Reference)",
          description: "How to create a CRA app - primarily for educational purposes",
          command: "npx create-react-app my-legacy-app\ncd my-legacy-app\nnpm start",
          details: "⚠️ Note: This approach is no longer recommended for new projects. Use Vite instead!",
          warning: "Create React App is in maintenance mode. Facebook recommends using frameworks like Next.js or Remix for new projects."
        },
        {
          id: "cra-project-structure",
          title: "CRA Project Structure",
          description: "Understanding the traditional CRA folder structure",
          structure: `my-legacy-app/
├── public/
│   ├── index.html      # Main HTML file
│   ├── favicon.ico     # App icon
│   └── manifest.json   # PWA manifest
├── src/
│   ├── App.js          # Main App component
│   ├── App.css         # App styles
│   ├── App.test.js     # App tests
│   ├── index.js        # Entry point
│   ├── index.css       # Global styles
│   ├── logo.svg        # React logo
│   ├── reportWebVitals.js  # Performance measuring
│   └── setupTests.js   # Test configuration
├── package.json        # Dependencies and scripts
├── README.md          # Project documentation
└── node_modules/      # Installed packages (very large!)`
        }
      ]
    },
    alternative: {
      title: "Vite (Recommended)",
      icon: "⚡",
      description: "Vite is the modern, lightning-fast build tool that has become the new standard for React development, replacing Create React App.",
      steps: [
        {
          id: "why-vite",
          title: "Why Vite is Superior",
          description: "Understanding why Vite has become the preferred choice for React development",
          advantages: [
            {
              feature: "Lightning Fast HMR",
              description: "Hot Module Replacement is instant thanks to native ES modules",
              benefit: "Changes appear in the browser in milliseconds, not seconds"
            },
            {
              feature: "Ultra-Fast Cold Start",
              description: "Development server starts in under 200ms regardless of project size",
              benefit: "No more waiting 3-5 seconds for your dev server to start"
            },
            {
              feature: "Optimized Production Builds",
              description: "Uses Rollup for production builds with superior tree-shaking",
              benefit: "Smaller bundle sizes and better performance"
            },
            {
              feature: "Modern by Default",
              description: "Built for modern browsers with ESM support",
              benefit: "Leverages the latest web standards for better performance"
            },
            {
              feature: "Framework Agnostic",
              description: "Works with React, Vue, Svelte, and vanilla JavaScript",
              benefit: "One tool for all your frontend projects"
            }
          ]
        },
        {
          id: "vite-vs-cra-detailed",
          title: "Detailed Performance Comparison",
          description: "Side-by-side comparison of Vite vs Create React App performance metrics",
          detailedComparison: [
            {
              metric: "Cold Start Time",
              cra: "3-5 seconds (small app), 15-30+ seconds (large app)",
              vite: "Under 200ms consistently",
              improvement: "15-150x faster"
            },
            {
              metric: "Hot Module Replacement",
              cra: "1-3 seconds for changes to appear",
              vite: "Instant (under 100ms)",
              improvement: "10-30x faster"
            },
            {
              metric: "Production Build Time",
              cra: "30-60 seconds (typical project)",
              vite: "10-20 seconds (same project)",
              improvement: "2-3x faster"
            },
            {
              metric: "Bundle Size",
              cra: "2-3MB (typical app with routing)",
              vite: "800KB-1.2MB (same app)",
              improvement: "60-70% smaller"
            },
            {
              metric: "Memory Usage",
              cra: "400-600MB (development)",
              vite: "150-250MB (development)",
              improvement: "50-60% less memory"
            }
          ]
        },
        {
          id: "create-vite-app",
          title: "Create Your First Vite React App",
          description: "Step-by-step guide to creating a React app with Vite",
          command: "# Method 1: Using npm create\nnpm create vite@latest my-react-app -- --template react\n\n# Method 2: Using yarn\nyarn create vite my-react-app --template react\n\n# Method 3: Using pnpm\npnpm create vite my-react-app --template react\n\n# Navigate and install dependencies\ncd my-react-app\nnpm install\nnpm run dev",
          details: "Vite offers multiple templates: react, react-ts (TypeScript), react-swc, and more. The setup process is faster and simpler than CRA."
        },
        {
          id: "vite-project-structure",
          title: "Vite Project Structure",
          description: "Understanding the clean and modern Vite project structure",
          structure: `my-react-app/
├── public/
│   └── vite.svg        # Vite logo (replaceable)
├── src/
│   ├── App.jsx         # Main App component (.jsx extension)
│   ├── App.css         # App styles
│   ├── index.css       # Global styles
│   ├── main.jsx        # Entry point (not index.js)
│   └── assets/         # Static assets
│       └── react.svg   # React logo
├── index.html          # HTML template (in root, not public!)
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
└── README.md          # Project documentation`,
          keyDifferences: [
            "HTML file is in root directory, not public/",
            "Entry point is main.jsx instead of index.js",
            "Uses .jsx extension by default",
            "Cleaner folder structure with fewer boilerplate files",
            "vite.config.js for easy customization"
          ]
        },
        {
          id: "vite-development-experience",
          title: "Superior Development Experience",
          description: "How Vite enhances your daily development workflow",
          features: [
            {
              name: "Instant Server Start",
              description: "Start coding immediately without waiting for bundle compilation",
              example: "npm run dev starts in ~200ms vs CRA's 3-5 seconds"
            },
            {
              name: "Real-time Updates",
              description: "See changes instantly without page refresh or losing state",
              example: "Edit a component and see changes in <100ms"
            },
            {
              name: "Smart Dependency Pre-bundling",
              description: "Automatically optimizes node_modules dependencies",
              example: "First-time dependency resolution, then cached for speed"
            },
            {
              name: "Built-in TypeScript Support",
              description: "TypeScript works out-of-the-box without configuration",
              example: "Just use .tsx files and Vite handles the rest"
            },
            {
              name: "CSS Preprocessing",
              description: "Built-in support for Sass, Less, Stylus",
              example: "Import .scss files directly, no setup needed"
            }
          ]
        },
        {
          id: "vite-scalability",
          title: "Why Vite Scales Better",
          description: "Understanding how Vite maintains performance as your project grows",
          scalabilityFeatures: [
            {
              aspect: "Incremental Development",
              description: "Only transforms files that are actually imported",
              benefit: "Dev server performance doesn't degrade with project size"
            },
            {
              aspect: "Native ES Modules",
              description: "Leverages browser's native module system during development",
              benefit: "No bundling during development = consistent fast performance"
            },
            {
              aspect: "Optimized Production Builds",
              description: "Uses Rollup with advanced tree-shaking and code splitting",
              benefit: "Smaller, more efficient bundles even for large applications"
            },
            {
              aspect: "Plugin Ecosystem",
              description: "Extensive plugin system for customization without complexity",
              benefit: "Easy to extend functionality without ejecting"
            }
          ]
        },
        {
          id: "migration-from-cra",
          title: "Migrating from Create React App to Vite",
          description: "How to migrate existing CRA projects to Vite",
          migrationSteps: [
            "Install Vite and related dependencies",
            "Move index.html from public/ to root",
            "Update index.html to include script tag for src/main.jsx",
            "Rename src/index.js to src/main.jsx",
            "Create vite.config.js configuration",
            "Update package.json scripts",
            "Update import paths and resolve any compatibility issues"
          ],
          command: `# Quick migration command example
npm uninstall react-scripts
npm install --save-dev vite @vitejs/plugin-react
# Then update configuration files...`,
          details: "Migration is straightforward but requires updating configuration. Most React code works without changes."
        }
      ]
    },
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #20c997 0%, #138c6e 100%)', 
      padding: '2rem', 
      color: 'white',
      fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica Neue", sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <div>
            <div style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.2)',
              padding: '0.4rem 1rem',
              borderRadius: '20px',
              fontSize: '0.85rem',
              marginBottom: '0.5rem'
            }}>
              Lecture 3 • Development Setup
            </div>
            <h1 style={{ margin: '0', fontSize: '2.5rem', fontWeight: '700' }}>
              Setting Up Your React Development Environment
            </h1>
          </div>
          <Link to="/" style={{ 
            background: 'rgba(255,255,255,0.2)', 
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '500'
          }}>
            ← Back to Home
          </Link>
        </div>

        {/* Progress Bar */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: '600' }}>Setup Progress</span>
            <span>{Object.values(checkedItems).filter(Boolean).length} / {Object.values(setupSteps).reduce((acc, tab) => acc + tab.steps.length, 0)} completed</span>
          </div>
          <div style={{
            height: '6px',
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${(Object.values(checkedItems).filter(Boolean).length / Object.values(setupSteps).reduce((acc, tab) => acc + tab.steps.length, 0)) * 100}%`,
              background: 'white',
              borderRadius: '3px',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          {Object.entries(setupSteps).map(([key, step]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={{
                background: activeTab === key ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                border: activeTab === key ? '2px solid rgba(255,255,255,0.5)' : '1px solid rgba(255,255,255,0.2)',
                color: 'white',
                padding: '0.75rem 1.25rem',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: activeTab === key ? '600' : '500',
                fontSize: '0.9rem',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>{step.icon}</span>
              {step.title}
            </button>
          ))}
        </div>

        {/* Active Tab Content */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '2rem',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <span style={{ fontSize: '3rem' }}>
              {setupSteps[activeTab].icon}
            </span>
            <div>
              <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem' }}>
                {setupSteps[activeTab].title}
              </h2>
              <p style={{ margin: '0', fontSize: '1.1rem', opacity: '0.9' }}>
                {setupSteps[activeTab].description}
              </p>
            </div>
          </div>

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {setupSteps[activeTab].steps.map((step, idx) => (
              <div key={step.id} style={{
                background: 'rgba(0,0,0,0.1)',
                borderRadius: '8px',
                padding: '1.5rem',
                border: checkedItems[step.id] ? '2px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <button
                    onClick={() => toggleCheck(step.id)}
                    style={{
                      background: checkedItems[step.id] ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.1)',
                      color: checkedItems[step.id] ? '#138c6e' : 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      flexShrink: 0,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {checkedItems[step.id] ? '✓' : idx + 1}
                  </button>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.3rem' }}>
                      {step.title}
                    </h3>
                    <p style={{ margin: '0', opacity: '0.9' }}>
                      {step.description}
                    </p>
                  </div>
                </div>

                {step.command && (
                  <div style={{
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '6px',
                    padding: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <pre style={{
                      margin: '0',
                      fontSize: '0.9rem',
                      lineHeight: '1.4',
                      overflow: 'auto'
                    }}>
                      <code>{step.command}</code>
                    </pre>
                  </div>
                )}

                {step.structure && (
                  <div style={{
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '6px',
                    padding: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <pre style={{
                      margin: '0',
                      fontSize: '0.85rem',
                      lineHeight: '1.4',
                      fontFamily: 'Consolas, Monaco, monospace'
                    }}>
                      {step.structure}
                    </pre>
                  </div>
                )}

                {step.limitations && (
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ margin: '0 0 0.75rem 0', color: '#ff6b6b' }}>⚠️ Limitations:</h4>
                    <ul style={{ margin: '0', paddingLeft: '1.5rem' }}>
                      {step.limitations.map((limitation, i) => (
                        <li key={i} style={{ marginBottom: '0.25rem', color: '#ffcccb' }}>{limitation}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {step.scalabilityIssues && (
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ margin: '0 0 1rem 0', color: '#ff6b6b' }}>🚨 Scalability Problems:</h4>
                    {step.scalabilityIssues.map((issue, i) => (
                      <div key={i} style={{
                        background: 'rgba(255, 107, 107, 0.1)',
                        border: '1px solid rgba(255, 107, 107, 0.3)',
                        borderRadius: '6px',
                        padding: '1rem',
                        marginBottom: '0.75rem'
                      }}>
                        <h5 style={{ margin: '0 0 0.5rem 0', color: '#ff6b6b' }}>{issue.problem}</h5>
                        <p style={{ margin: '0 0 0.5rem 0', opacity: '0.9' }}>{issue.description}</p>
                        <div style={{ 
                          fontSize: '0.85rem', 
                          fontStyle: 'italic', 
                          color: '#ffcccb' 
                        }}>
                          Impact: {issue.impact}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {step.warning && (
                  <div style={{
                    background: 'rgba(255, 193, 7, 0.2)',
                    border: '2px solid rgba(255, 193, 7, 0.5)',
                    borderRadius: '6px',
                    padding: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ color: '#ffc107', fontWeight: '600', marginBottom: '0.5rem' }}>
                      ⚠️ Important Notice
                    </div>
                    <div style={{ color: '#fff3cd' }}>{step.warning}</div>
                  </div>
                )}

                {step.advantages && (
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ margin: '0 0 1rem 0', color: '#20c997' }}>✨ Key Advantages:</h4>
                    {step.advantages.map((advantage, i) => (
                      <div key={i} style={{
                        background: 'rgba(32, 201, 151, 0.1)',
                        border: '1px solid rgba(32, 201, 151, 0.3)',
                        borderRadius: '6px',
                        padding: '1rem',
                        marginBottom: '0.75rem'
                      }}>
                        <h5 style={{ margin: '0 0 0.5rem 0', color: '#20c997' }}>{advantage.feature}</h5>
                        <p style={{ margin: '0 0 0.5rem 0', opacity: '0.9' }}>{advantage.description}</p>
                        <div style={{ 
                          fontSize: '0.85rem', 
                          fontStyle: 'italic', 
                          color: '#a8e6cf' 
                        }}>
                          Benefit: {advantage.benefit}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {step.detailedComparison && (
                  <div style={{
                    marginBottom: '1rem'
                  }}>
                    <h4 style={{ margin: '0 0 1rem 0' }}>📊 Performance Metrics:</h4>
                    {step.detailedComparison.map((comp, i) => (
                      <div key={i} style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        padding: '1rem',
                        marginBottom: '0.75rem',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gap: '1rem',
                        alignItems: 'center'
                      }}>
                        <div>
                          <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{comp.metric}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.85rem', opacity: '0.8', marginBottom: '0.25rem' }}>Create React App</div>
                          <div style={{ color: '#ff6b6b' }}>{comp.cra}</div>
                          <div style={{ fontSize: '0.85rem', opacity: '0.8', marginTop: '0.5rem' }}>Vite</div>
                          <div style={{ color: '#20c997' }}>{comp.vite}</div>
                        </div>
                        <div style={{
                          background: 'rgba(32, 201, 151, 0.2)',
                          padding: '0.5rem',
                          borderRadius: '4px',
                          textAlign: 'center',
                          color: '#20c997',
                          fontWeight: '600'
                        }}>
                          {comp.improvement}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {step.keyDifferences && (
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ margin: '0 0 0.75rem 0' }}>🔑 Key Differences from CRA:</h4>
                    <ul style={{ margin: '0', paddingLeft: '1.5rem' }}>
                      {step.keyDifferences.map((diff, i) => (
                        <li key={i} style={{ marginBottom: '0.25rem', color: '#a8e6cf' }}>{diff}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {step.features && (
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ margin: '0 0 1rem 0', color: '#20c997' }}>🚀 Development Features:</h4>
                    {step.features.map((feature, i) => (
                      <div key={i} style={{
                        background: 'rgba(32, 201, 151, 0.1)',
                        border: '1px solid rgba(32, 201, 151, 0.3)',
                        borderRadius: '6px',
                        padding: '1rem',
                        marginBottom: '0.75rem'
                      }}>
                        <h5 style={{ margin: '0 0 0.5rem 0', color: '#20c997' }}>{feature.name}</h5>
                        <p style={{ margin: '0 0 0.5rem 0', opacity: '0.9' }}>{feature.description}</p>
                        <div style={{ 
                          fontSize: '0.85rem', 
                          fontStyle: 'italic', 
                          color: '#a8e6cf',
                          background: 'rgba(0,0,0,0.2)',
                          padding: '0.5rem',
                          borderRadius: '4px'
                        }}>
                          Example: {feature.example}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {step.scalabilityFeatures && (
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ margin: '0 0 1rem 0', color: '#20c997' }}>📈 Scalability Advantages:</h4>
                    {step.scalabilityFeatures.map((feature, i) => (
                      <div key={i} style={{
                        background: 'rgba(32, 201, 151, 0.1)',
                        border: '1px solid rgba(32, 201, 151, 0.3)',
                        borderRadius: '6px',
                        padding: '1rem',
                        marginBottom: '0.75rem'
                      }}>
                        <h5 style={{ margin: '0 0 0.5rem 0', color: '#20c997' }}>{feature.aspect}</h5>
                        <p style={{ margin: '0 0 0.5rem 0', opacity: '0.9' }}>{feature.description}</p>
                        <div style={{ 
                          fontSize: '0.85rem', 
                          fontStyle: 'italic', 
                          color: '#a8e6cf' 
                        }}>
                          Result: {feature.benefit}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {step.migrationSteps && (
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ margin: '0 0 0.75rem 0' }}>🔄 Migration Steps:</h4>
                    <ol style={{ margin: '0', paddingLeft: '1.5rem' }}>
                      {step.migrationSteps.map((stepItem, i) => (
                        <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.4' }}>{stepItem}</li>
                      ))}
                    </ol>
                  </div>
                )}

                {step.extensions && (
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ margin: '0 0 0.75rem 0' }}>Recommended Extensions:</h4>
                    <ul style={{ margin: '0', paddingLeft: '1.5rem' }}>
                      {step.extensions.map((ext, i) => (
                        <li key={i} style={{ marginBottom: '0.25rem' }}>{ext}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {step.benefits && (
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ margin: '0 0 0.75rem 0' }}>Benefits:</h4>
                    <ul style={{ margin: '0', paddingLeft: '1.5rem' }}>
                      {step.benefits.map((benefit, i) => (
                        <li key={i} style={{ marginBottom: '0.25rem' }}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {step.comparison && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    {step.comparison.map((comp, i) => (
                      <div key={i} style={{
                        background: 'rgba(255,255,255,0.1)',
                        padding: '1rem',
                        borderRadius: '6px'
                      }}>
                        <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                          {comp.feature}
                        </div>
                        <div style={{ fontSize: '0.9rem' }}>
                          <div>Vite: {comp.vite}</div>
                          <div>CRA: {comp.cra}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {step.details && (
                  <div style={{
                    background: 'rgba(255,255,255,0.1)',
                    padding: '1rem',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    fontStyle: 'italic'
                  }}>
                    💡 {step.details}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recommendation Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #20c997 0%, #17a2b8 100%)',
          borderRadius: '12px',
          padding: '2rem',
          marginTop: '2rem',
          marginBottom: '2rem',
          textAlign: 'center',
          border: '2px solid rgba(255,255,255,0.3)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏆</div>
          <h2 style={{ margin: '0 0 1rem 0', fontSize: '2rem' }}>Our Recommendation: Use Vite</h2>
          <p style={{ 
            margin: '0 0 1.5rem 0', 
            fontSize: '1.2rem', 
            lineHeight: '1.6',
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            For new React projects in 2024, <strong>Vite is the clear winner</strong>. It offers superior performance, 
            modern tooling, and excellent developer experience. Create React App is legacy technology that's 
            no longer actively maintained.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '1rem',
              borderRadius: '8px'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚡</div>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>15-150x Faster</h3>
              <p style={{ margin: '0', fontSize: '0.9rem' }}>
                Cold starts and hot reloads that don't waste your time
              </p>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '1rem',
              borderRadius: '8px'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📦</div>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>60% Smaller Bundles</h3>
              <p style={{ margin: '0', fontSize: '0.9rem' }}>
                Better performance for your users with optimized builds
              </p>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '1rem',
              borderRadius: '8px'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🚀</div>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>Future-Proof</h3>
              <p style={{ margin: '0', fontSize: '0.9rem' }}>
                Built on modern web standards with active development
              </p>
            </div>
          </div>
          <div style={{ 
            marginTop: '1.5rem',
            padding: '1rem',
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '8px',
            fontSize: '1rem'
          }}>
            <strong>Quick Start:</strong> <code style={{ 
              background: 'rgba(0,0,0,0.3)', 
              padding: '0.2rem 0.5rem', 
              borderRadius: '4px',
              fontSize: '0.9rem'
            }}>
              npm create vite@latest my-app -- --template react
            </code>
          </div>
        </div>

        {/* Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'rgba(0,0,0,0.1)',
          borderRadius: '8px'
        }}>
          <Link 
            to="/lecture3/overview" 
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            ← React Overview
          </Link>
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>Next: Pure React</h3>
            <p style={{ margin: '0', opacity: '0.8', textAlign: 'center' }}>
              Learn React without any build tools
            </p>
          </div>
          <Link 
            to="/lecture3/pure-react" 
            style={{
              background: 'white',
              color: '#138c6e',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            Pure React →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentSetup;