# Project Structure Documentation

## Overview
This React application is organized by lectures and functionality to improve maintainability and navigation.

## Folder Structure

```
src/
├── pages/                          # All page components organized by lecture
│   ├── home/                      # Home page and general app pages
│   ├── lecture1/                  # E-Commerce Project (DCIT26 Lecture 1)
│   │   ├── Checkpoints.jsx        # Project checkpoints tracker
│   │   ├── Dashboard.jsx          # Main project dashboard
│   │   ├── ECommerceRoadmap.jsx   # Development roadmap
│   │   └── versions/              # Version history of the project
│   │       ├── V01Initial.jsx     # v0.1 - Initial setup
│   │       ├── V02Catalog.jsx     # v0.2 - Product catalog
│   │       ├── V03Cart.jsx        # v0.3 - Shopping cart
│   │       ├── V04Accounts.jsx    # v0.4 - User accounts
│   │       ├── V05Database.jsx    # v0.5 - Database integration
│   │       ├── V06Checkout.jsx    # v0.6 - Checkout process
│   │       ├── V07UI.jsx          # v0.7 - UI improvements
│   │       ├── V08Payment.jsx     # v0.8 - Payment integration
│   │       ├── V10Release.jsx     # v1.0 - Production release
│   │       ├── V11AccountMgmt.jsx # v1.1 - Account management
│   │       ├── AllInOne.jsx       # Combined view of all versions
│   │       └── VersionsIndex.jsx  # Version navigation index
│   ├── lecture2/                  # DevOps & GitOps (DCIT26 Lecture 2)
│   │   ├── GitGuide.jsx          # Git usage guide
│   │   ├── GitOpsLMS.jsx         # DevOps Learning Management System
│   │   ├── GitOpsPresentation.jsx # GitOps presentation slides
│   │   ├── GitOpsSimulator.jsx   # Interactive GitOps simulator
│   │   └── GitSyncDemo.jsx       # Git synchronization demo
│   └── lecture3/                  # React Fundamentals (DCIT26 Lecture 3)
│       ├── ReactOverview.jsx     # What is React? Core concepts
│       ├── DevelopmentSetup.jsx  # Setting up dev environment
│       ├── PureReact.jsx         # Pure React without build tools
│       ├── JavaScriptEssentials.jsx # Essential JS for React
│       ├── ComponentsDeepDive.jsx   # Advanced component concepts
│       ├── StateAndProps.jsx     # State management and props
│       └── Lecture3Preview.jsx   # Preview/placeholder content
├── components/                    # Reusable shared components
│   ├── EmbeddedSimulator.jsx     # Shared simulator component
│   └── [other shared components]
├── layout/                       # Layout components
│   └── VersionShell.jsx         # Version wrapper layout
├── mockData/                     # Mock data for development
│   ├── products.v02.js          # Product data for v0.2
│   ├── products.v03.js          # Product data for v0.3
│   └── users.v04.js             # User data for v0.4
├── utils/                        # Utility functions and helpers
│   └── SessionManager.js        # Session management utilities
├── App.jsx                       # Main application component
├── main.jsx                      # Application entry point
└── styles.css                    # Global styles
```

## Lecture Organization

### Lecture 1: E-Commerce Project
**Focus**: Full-stack web application development
- **Main Pages**: Dashboard, Roadmap, Checkpoints
- **Versions**: Complete version history from v0.1 to v1.1
- **Learning Goals**: 
  - Project planning and management
  - Version control and iterative development
  - Full-stack application architecture

### Lecture 2: DevOps & GitOps
**Focus**: Development operations and Git-based workflows
- **Main Pages**: GitOps Presentation, DevOps Academy, GitOps Simulator
- **Tools**: Git Guide, Git Sync Demo
- **Learning Goals**:
  - Understanding DevOps principles
  - GitOps workflow implementation
  - CI/CD pipeline concepts

### Lecture 3: React Fundamentals
**Focus**: React library core concepts and development
- **Core Topics**: React Overview, Development Setup, Pure React
- **Advanced Topics**: JavaScript Essentials, Components, State & Props
- **Learning Goals**:
  - React component-based architecture
  - Modern JavaScript features
  - State management and data flow

## Benefits of This Organization

1. **Logical Grouping**: Related files are grouped by lecture topic
2. **Scalability**: Easy to add new lectures or components
3. **Maintainability**: Clear separation of concerns
4. **Navigation**: Intuitive file structure for development
5. **Learning Path**: Follows the natural progression of the course

## Import Path Changes

After reorganization, import paths have been updated to:
```javascript
// Lecture 1 imports
import Dashboard from './pages/lecture1/Dashboard.jsx';
import Checkpoints from './pages/lecture1/Checkpoints.jsx';

// Lecture 2 imports
import GitOpsLMS from './pages/lecture2/GitOpsLMS.jsx';
import GitOpsSimulator from './pages/lecture2/GitOpsSimulator.jsx';

// Lecture 3 imports
import ReactOverview from './pages/lecture3/ReactOverview.jsx';
import DevelopmentSetup from './pages/lecture3/DevelopmentSetup.jsx';
```

This organization makes the codebase more professional and easier to navigate for both developers and students learning from the project structure.