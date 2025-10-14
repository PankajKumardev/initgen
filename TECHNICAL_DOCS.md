# InitGen - Technical Documentation

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Dependencies](#dependencies)
4. [Core Components](#core-components)
5. [Project Templates](#project-templates)
6. [Internal Workflow](#internal-workflow)
7. [File Structure](#file-structure)
8. [Command Execution](#command-execution)
9. [Configuration System](#configuration-system)
10. [Error Handling](#error-handling)
11. [Development Setup](#development-setup)
12. [Performance Considerations](#performance-considerations)

---

## 🔍 Overview

**InitGen** is a Node.js-based CLI tool that scaffolds modern web and backend projects with zero configuration. It provides an interactive interface for creating production-ready projects across multiple tech stacks.

### Key Features

- Interactive CLI with beautiful animations
- Support for 10+ tech stacks including shadcn/ui
- Automatic dependency installation
- TypeScript support
- Git integration
- Production-ready configurations

---

## 🏗️ Architecture

InitGen follows a modular architecture with clear separation of concerns:

```
┌─────────────────┐
│   Entry Point   │  index.js (CLI Interface)
│    (index.js)   │
└─────────┬───────┘
          │
    ┌─────▼─────┐
    │   Core    │  Main orchestration logic
    │  Engine   │  User interaction & flow control
    └─────┬─────┘
          │
    ┌─────▼─────┐
    │Templates  │  Project-specific generators
    │ System    │  (React, Next.js, Python, etc.)
    └─────┬─────┘
          │
    ┌─────▼─────┐
    │Utilities  │  Common functions
    │& Config   │  (Commands, README, Git)
    └───────────┘
```

### Module Breakdown

1. **Entry Point** (`index.js`): CLI interface, user prompts, flow orchestration
2. **Templates** (`src/templates/`): Stack-specific project generators
3. **Configuration** (`src/config/`): Stack definitions and git templates
4. **Utilities** (`src/utils/`): Shared functionality (commands, file operations)

---

## 📦 Dependencies

### Core Dependencies (6 packages)

#### **chalk** (^5.3.0)

- **Purpose**: Terminal string styling and coloring
- **Usage**: Error messages (`chalk.red()`), success indicators (`chalk.green()`), colored output
- **Implementation**: Used in spinners, warnings, success messages throughout CLI flow

#### **chalk-animation** (^2.0.0)

- **Purpose**: Animated terminal text effects
- **Usage**: Welcome screen rainbow animation for "Project Structure Generator 🚀"
- **Implementation**: `chalkAnimation.rainbow()` with 1000ms timeout in `showTitle()`

#### **figlet** (^1.7.0)

- **Purpose**: ASCII art text generation for branding
- **Usage**: Generate large "InitGen" title display
- **Implementation**: `figlet.textSync('InitGen', { font: 'Standard' })` with gradient overlay

#### **gradient-string** (^2.0.1)

- **Purpose**: Gradient color effects on ASCII text
- **Usage**: Pastel gradient applied to figlet ASCII title
- **Implementation**: `gradient.pastel.multiline(asciiText)` for visual appeal

#### **inquirer** (^9.2.7)

- **Purpose**: Interactive command-line user prompts
- **Usage**: Tech stack selection, project naming, TypeScript choice, Git initialization
- **Implementation**: Three separate prompt sequences with validation and conditional logic

#### **nanospinner** (^1.1.0)

- **Purpose**: Elegant terminal loading spinners with status updates
- **Usage**: Progress indication during project creation with success/error states
- **Implementation**: `createSpinner().start()`, `.success()`, `.error()` pattern

### Development Dependencies (2 packages)

#### **@tailwindcss/vite** (^4.1.14)

- **Purpose**: Tailwind CSS v4 Vite plugin integration
- **Usage**: Automatically installs and configures in `vite-tailwind` projects
- **Implementation**: Added to vite.config.js as `tailwindcss()` plugin in `setupTailwind()`

#### **tailwindcss** (^4.1.14)

- **Purpose**: Core Tailwind CSS v4 framework
- **Usage**: CSS framework installed with `--legacy-peer-deps` flag in Tailwind projects
- **Implementation**: Dynamically installed via `runCommand()` during project setup

---

## 🔧 Core Components

### 1. Main Engine (`index.js`)

```javascript
#!/usr/bin/env node
// Entry point with proper shebang for CLI execution

// Core flow:
showTitle() → mainMenu() → createProject() → postSetup()
```

**Key Functions:**

- **`showTitle()`**: 1000ms rainbow animation + ASCII "InitGen" with pastel gradient
- **`mainMenu()`**: 8 tech stack choices + project naming + TypeScript/Git prompts
- **`createProjectStructure()`**: Main orchestrator handling manual vs command-based projects
- **`run()`**: Entry point coordinating title → menu → creation → success message

### 2. Template System (`src/templates/`)

Each template module handles specific tech stack generation:

#### **React Vite Template** (`reactVite.js`)

```javascript
export async function setupReactViteTemplate(projectName, useTypeScript, projectPath)
```

- Creates Vite + React project with optional TypeScript
- Configures development environment
- Sets up proper project structure

#### **Tailwind Template** (`tailwind.js`)

```javascript
export async function setupTailwind(projectPath, useTypeScript)
```

- Installs Tailwind CSS v4
- Configures Vite for Tailwind processing
- Creates optimized CSS configuration

#### **Next.js Template** (`nextjs.js`)

```javascript
export async function setupNextjsTemplate(projectName, useTypeScript, projectPath)
```

- Uses `create-next-app` with appropriate flags
- Configures TypeScript if selected
- Sets up development server

#### **Vue Template** (`vue.js`)

```javascript
export async function setupVueTemplate(projectName, useTypeScript, projectPath)
```

- Creates Vue 3 project with Vite
- TypeScript integration support
- Component-based architecture setup

#### **shadcn/ui Template** (`shadcn.js`)

```javascript
export async function setupShadcn(projectPath, projectName, useTypeScript)
```

- Installs Tailwind CSS v4 + @tailwindcss/vite + @types/node
- Configures path aliases (@/\*) in vite.config and tsconfig files
- Runs `npx shadcn@latest init` with pre-configured components.json
- Creates demo App component with Button variants
- Updates CSS with shadcn-compatible styling

#### **Manual Projects** (`manualProjects.js`)

Handles backend frameworks that require custom file generation:

```javascript
// Node.js + Express
export async function createNodeExpressProject(projectName, useTypeScript, projectPath)

// Python frameworks
export async function createPythonFlaskProject(projectName, projectPath)
export async function createPythonFastAPIProject(projectName, projectPath)
export async function createPythonDjangoProject(projectName, projectPath)
```

### 3. Configuration System (`src/config/`)

#### **Stack Commands** (`stackCommands.js`)

Defines available tech stacks and their properties:

```javascript
export const stackCommands = {
  'react-vite': {
    command: null, // Dynamically: `npm create vite@latest ${name} -- --template react[-ts]`
    name: 'React (Vite)',
    needsInstall: false, // Auto-installs via npm install + setupReactViteTemplate()
  },
  'vite-tailwind': {
    command: null, // Same as react-vite but triggers setupTailwind()
    name: 'Vite + React + Tailwind v4',
    setupTailwind: true, // Installs Tailwind v4 + @tailwindcss/vite plugin
  },
  'vite-shadcn': {
    command: null, // Vite + React + full shadcn/ui setup
    name: 'Vite + React + Tailwind + shadcn/ui',
    setupShadcn: true, // Full shadcn setup: Tailwind + path aliases + components
  },
  'nextjs-shadcn': {
    command: null, // Next.js + shadcn/ui integration
    name: 'Next.js + shadcn/ui',
    setupShadcn: true, // Adds shadcn to existing Next.js setup
  },
  'node-express': {
    name: 'Node.js + Express',
    manual: true, // Creates files manually via createNodeExpressProject()
  },
  // ... 3 more Python stacks (flask, fastapi, django)
};
```

#### **Gitignore Templates** (`gitignoreTemplates.js`)

Pre-configured `.gitignore` files for different project types:

```javascript
export const gitignoreTemplates = {
  javascript: `
# dependencies + production + misc + logs + editor + next.js + cache
node_modules/, .env variants, build/dist/, .DS_Store, npm logs, 
.vscode/, .next/, .cache, .turbo (45 lines total)`,
  python: `
# Byte-compiled + Virtual env + Django/Flask + Distribution + IDE + OS  
__pycache__/, venv/, *.log, db.sqlite3, dist/, .vscode/, .DS_Store
(35 lines total with detailed Python-specific patterns)`,
};
```

### 4. Utility Functions (`src/utils/`)

#### **Command Execution** (`command.js`)

```javascript
export async function runCommand(command, cwd) {
  return execPromise(command, { cwd, maxBuffer: 1024 * 1024 * 10 });
}
// 10MB buffer for handling large npm/pip outputs
// Promisified child_process.exec with working directory support
```

- Promisified `child_process.exec`
- Large buffer for handling npm/pip output
- Working directory support

#### **README Generation** (`readme.js`)

```javascript
export function createReadme(projectName, stack, useTypeScript)
export function createPythonReadme(projectName, framework)
```

- Generates stack-specific README files
- Includes proper run commands and project structure
- Language-specific documentation

---

## 🚀 Internal Workflow

### 1. **Initialization Phase**

```
User runs `initgen` → Show animated title → Display main menu
```

### 2. **Configuration Phase**

```
Tech stack selection → Project naming → Language choice → Git preference
```

### 3. **Project Creation Phase**

#### For Vite-based projects (React, Vue):

```
1. `npm create vite@latest ${name} -- --template react[-ts]`
2. `npm install` in project directory
3. setupReactViteTemplate() → Custom App.jsx/tsx + 214 lines CSS
4. setupTailwind() (if vite-tailwind) → Install v4 + configure vite.config
5. Generate custom README with stack info
```

#### For Next.js projects:

```
1. `npx create-next-app@latest ${name} --typescript|js --tailwind --eslint --app --src-dir`
2. setupNextjsTemplate() → Custom page.tsx with 233 lines of styled components
3. No separate npm install (create-next-app handles it)
```

#### For Manual projects (Node.js, Python):

```
1. fs.mkdirSync() → Create src/, routes/, controllers/ directories
2. Generate package.json with dependencies (Express, CORS, dotenv)
3. Create index.ts/js with full Express server + routes (100+ lines)
4. `npm install` or `pip install -r requirements.txt`
5. Custom README with framework-specific run commands
```

### 4. **Post-Setup Phase**

```
1. Initialize Git repository (if requested)
2. Create appropriate .gitignore
3. Display success message with next steps
4. Provide run commands
```

---

## 📁 File Structure

### Generated Project Structures

#### **React + Vite + TypeScript**

```
my-react-app/
├── public/
│   └── vite.svg
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

#### **Node.js + Express + TypeScript**

```
my-node-app/
├── src/
│   ├── index.ts
│   ├── routes/
│   │   └── api.ts
│   └── middleware/
│       └── cors.ts
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

#### **Python + Flask**

```
my-flask-app/
├── app.py
├── requirements.txt
├── .env.example
├── templates/
│   └── index.html
├── static/
│   └── style.css
└── README.md
```

### InitGen Source Structure (Actual Codebase)

```
project-scaffold-cli/
├── index.js                    # 335 lines - Main CLI entry point
├── package.json               # 6 dependencies + 2 devDependencies
├── README.md                  # User-facing documentation
├── LICENSE                    # MIT license
├── .npmignore                 # Excludes docs/, node_modules/
└── src/
    ├── config/
    │   ├── stackCommands.js       # 10 tech stacks configuration (40+ lines)
    │   └── gitignoreTemplates.js  # JS + Python .gitignore templates (89 lines)
    ├── templates/
    │   ├── reactVite.js           # 214 lines - React + CSS styling
    │   ├── tailwind.js           # 146 lines - Tailwind v4 setup + vite config
    │   ├── shadcn.js             # 300+ lines - shadcn/ui setup + components
    │   ├── nextjs.js             # 350+ lines - Next.js + optional shadcn support
    │   ├── vue.js                # 239 lines - Vue 3 SFC with styling
    │   └── manualProjects.js     # 468 lines - Node/Python project generators
    └── utils/
        ├── command.js            # 9 lines - Promisified child_process.exec
        └── readme.js             # 67 lines - Dynamic README generation
```

---

## ⚡ Command Execution

### Command Types

#### **npm Commands**

- `npm create vite@latest <name> --template react-ts`
- `npm install <packages>`
- `npm run dev` (for testing)

#### **Python Commands**

- `pip install flask`
- `python -m flask run`
- `python manage.py runserver` (Django)

#### **Git Commands**

- `git init`
- `git add .`
- `git commit -m "Initial commit"`

### Execution Strategy

1. **Async/Await Pattern**: All commands use promisified execution
2. **Error Handling**: Comprehensive try-catch blocks
3. **Progress Indication**: Spinners show command progress
4. **Working Directory**: Commands run in correct project context
5. **Buffer Management**: Large buffer for handling verbose output

---

## ⚙️ Configuration System

### Stack Configuration Format

```javascript
{
  command: null | string,      // Base creation command
  name: string,               // Display name
  needsInstall: boolean,      // Auto-install dependencies
  manual: boolean,           // Requires custom file generation
  setupTailwind: boolean     // Special Tailwind setup flag
}
```

### Dynamic Command Generation

Commands are built dynamically based on user choices:

```javascript
// TypeScript flag adds to base command
const tsFlag = useTypeScript ? '-ts' : '';
const command = `npm create vite@latest ${projectName} --template react${tsFlag}`;
```

---

## 🛠️ Error Handling

### Error Categories

#### **1. User Input Errors**

- Empty project names
- Invalid characters in names
- Existing directory conflicts

#### **2. System Errors**

- Missing Node.js/npm
- Network connectivity issues
- Permission problems

#### **3. Command Execution Errors**

- Failed npm installations
- Git initialization failures
- File system errors

### Error Handling Strategy

```javascript
try {
  await runCommand(command, projectPath);
  spinner.success({ text: '✓ Success message' });
} catch (error) {
  spinner.error({ text: '✗ Error occurred' });
  console.error(chalk.red(`Error: ${error.message}`));
  process.exit(1);
}
```

---

## 💻 Development Setup

### Prerequisites

- Node.js >= 14.0.0
- npm or yarn
- Git (for repository initialization)

### Local Development

```bash
# Clone repository
git clone https://github.com/PankajKumardev/initgen.git
cd initgen

# Install dependencies
npm install

# Test locally
node index.js

# Link globally for testing
npm link
initgen
```

### Publishing Process

```bash
# Update version
npm version patch

# Publish to npm
npm publish
```

---

## 🚀 Performance Considerations

### Optimization Strategies

#### **1. Minimal Dependencies**

- Only essential packages included
- No heavy frameworks or UI libraries
- ES modules for better tree-shaking

#### **2. Sequential Command Execution**

- Commands run one after another for reliability
- Optimized buffer sizes for large outputs
- Proper working directory management

#### **3. Fast Project Generation**

- Template reuse and caching
- Minimal file I/O operations
- Streamlined dependency installation

#### **4. Memory Management**

- Promisified async operations
- Proper cleanup after command execution
- Limited buffer sizes for safety

### Bundle Analysis

- **Source Code**: ~1,800 lines total across all files
- **Package size**: ~15.4 KB compressed (6 runtime deps)
- **Install time**: ~2-3 seconds (`npm install -g initgen`)
- **Project generation**: 10-30 seconds (network dependent)

---

## 🔄 Extension Points

### Adding New Tech Stacks

1. **Update Stack Commands** (`stackCommands.js`)
2. **Create Template Module** (`src/templates/newStack.js`)
3. **Add to Main Switch** (in `index.js`)
4. **Update Documentation**

### Template Module Structure

```javascript
export async function setupNewStackTemplate(
  projectName,
  useTypeScript,
  projectPath
) {
  const spinner = createSpinner('Setting up project...').start();

  try {
    // 1. Create base project
    await runCommand('base-command', process.cwd());

    // 2. Install dependencies
    await runCommand('npm install dependencies', projectPath);

    // 3. Configure files
    // Create configs, update package.json, etc.

    // 4. Generate README
    const readme = createCustomReadme(projectName);
    fs.writeFileSync(path.join(projectPath, 'README.md'), readme);

    spinner.success({ text: '✓ Project created successfully!' });
  } catch (error) {
    spinner.error({ text: '✗ Error creating project' });
    throw error;
  }
}
```

---

### Analytics & Monitoring

### Usage Tracking

- npm download statistics available via API
- GitHub repository statistics

### Metrics Collected

- Project creation success/failure rates
- Popular tech stack choices
- Performance benchmarks

---

## 🔒 Security Considerations

### Input Validation

- Project name sanitization
- Path traversal prevention
- Command injection protection

### Dependency Security

- Regular dependency updates
- Vulnerability scanning
- Minimal attack surface

### File Operations

- Safe file creation practices
- Proper permission handling
- Directory traversal prevention

---

## 🤝 Contributing Guidelines

### Code Style

- ES6+ modules
- Async/await preferred over callbacks
- Consistent error handling patterns
- Clear variable naming

### Testing Strategy

- Manual testing across platforms
- Integration testing with real projects
- Performance benchmarking
- Cross-platform compatibility testing

### Documentation Updates

- Keep technical docs in sync with code
- Update README for new features
- Maintain changelog for releases

---

## 📈 Future Roadmap

### Planned Features

- Plugin system for custom templates
- Configuration file support
- Interactive project customization
- Cloud deployment integration
- Docker containerization support

### Performance Improvements

- Command caching
- **Parallel processing implementation** (currently sequential)
- Incremental updates
- Smart dependency management

---

This technical documentation provides a comprehensive overview of InitGen's architecture, internal workings, and extension capabilities. For user-facing documentation, visit [https://initgen.pankajk.tech/](https://initgen.pankajk.tech/).
