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
- Support for 12+ tech stacks including shadcn/ui and Database ORMs
- Database ORM integration (Prisma, Drizzle) with PostgreSQL
- Automatic dependency installation
- TypeScript support
- Git integration
- Production-ready configurations
- Database migration and schema management tools

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

// Database ORM Projects (v2.1.0+)
export async function createNodePrismaProject(projectPath, projectName, useTypeScript)
export async function createNodeDrizzleProject(projectPath, projectName, useTypeScript)

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
  'node-prisma': {
    name: 'Node.js + Express + Prisma (PostgreSQL)',
    manual: true, // Creates files manually via createNodePrismaProject()
  },
  'node-drizzle': {
    name: 'Node.js + Express + Drizzle (PostgreSQL)',
    manual: true, // Creates files manually via createNodeDrizzleProject()
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

#### **Node.js + Express + Prisma + TypeScript (v2.1.0+)**

```
my-prisma-app/
├── src/
│   └── index.ts
├── prisma/
│   └── schema.prisma
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
└── README.md
```

#### **Node.js + Express + Drizzle + TypeScript (v2.1.0+)**

```
my-drizzle-app/
├── src/
│   ├── index.ts
│   └── db/
│       ├── index.ts          # Database connection with dotenv.config()
│       ├── schema.ts         # Database schema definitions
│       ├── create.ts         # Auto database creation script
│       ├── migrate.ts        # Migration runner
│       └── migrations/       # Generated migration files
├── drizzle.config.js         # Drizzle configuration
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
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
├── index.js                    # 439 lines - Main CLI entry point (updated v2.1.0)
├── package.json               # 6 dependencies + 2 devDependencies
├── README.md                  # User-facing documentation (updated v2.1.0)
├── TECHNICAL_DOCS.md          # Technical documentation (updated v2.1.0)
├── LICENSE                    # MIT license
├── .npmignore                 # Excludes docs/, node_modules/
└── src/
    ├── config/
    │   ├── stackCommands.js       # 12 tech stacks configuration (50+ lines, +2 DB stacks)
    │   └── gitignoreTemplates.js  # JS + Python + DB .gitignore templates (95+ lines)
    ├── templates/
    │   ├── reactVite.js           # 214 lines - React + CSS styling
    │   ├── tailwind.js           # 146 lines - Tailwind v4 setup + vite config
    │   ├── shadcn.js             # 300+ lines - shadcn/ui setup + components
    │   ├── nextjs.js             # 350+ lines - Next.js + optional shadcn support
    │   ├── vue.js                # 239 lines - Vue 3 SFC with styling
    │   └── manualProjects.js     # 1100+ lines - Node/Python/Database generators (+600 lines v2.1.0)
    └── utils/
        ├── command.js            # 12 lines - Enhanced exec with timeout & buffer (v2.1.0)
        └── readme.js             # 120+ lines - Dynamic README + Database docs (v2.1.0)
```

---

## 🗄️ Database ORM Integration (v2.1.0)

### Supported Database ORMs

#### **Prisma ORM**

- **Auto-generated Prisma Client** with TypeScript support
- **Database migration system** via `prisma migrate dev`
- **Prisma Studio** for visual database management
- **Schema-first approach** with commented examples
- **PostgreSQL integration** with proper connection handling

#### **Drizzle ORM**

- **Lightweight ORM** with excellent TypeScript support
- **Auto database creation** via custom `db:create` script
- **Schema generation** and migration tools
- **Drizzle Studio** for database visualization
- **Robust environment loading** with `dotenv.config()` in database connection
- **Zero-config Docker compatibility**

### Database Project Features

#### **Environment Variable Handling**

```javascript
// Fixed in v2.1.0: Environment variables now load properly in database connections
import dotenv from 'dotenv';
dotenv.config(); // Added to src/db/index.ts to fix DATABASE_URL undefined issues
```

#### **Drizzle Auto Database Creation**

```javascript
// New in v2.1.0: Automatic database creation script
export async function createDatabase() {
  const databaseUrl = process.env.DATABASE_URL;
  const url = new URL(databaseUrl);
  const dbName = url.pathname.slice(1);

  // Connect to postgres database to create target database
  const adminUrl = databaseUrl.replace(`/${dbName}`, '/postgres');
  const adminClient = postgres(adminUrl);

  // Check if database exists, create if not
  const result =
    await adminClient`SELECT 1 FROM pg_database WHERE datname = ${dbName}`;
  if (result.length === 0) {
    await adminClient.unsafe(`CREATE DATABASE "${dbName}"`);
  }
}
```

#### **Database Workflows**

**Prisma Workflow:**

```bash
npm run db:migrate  # Run database migrations
npm run db:generate # Generate Prisma client
npm run db:studio   # Launch Prisma Studio
```

**Drizzle Workflow:**

```bash
npm run db:create   # Auto-create database (New in v2.1.0)
npm run db:generate # Generate migration files
npm run db:push     # Push schema to database
npm run db:studio   # Launch Drizzle Studio
npm run db:migrate  # Run existing migrations
```

### Database Template Architecture

#### **Prisma Template Structure**

- Simplified schema with commented examples (no opinionated User/Post models)
- Basic Express server with health check endpoints
- Automatic Prisma Client generation during setup
- Environment-specific configuration

#### **Drizzle Template Structure**

- Modular database setup with separate connection, schema, and migration files
- Auto database creation script for seamless Docker integration
- Lightweight schema definitions with example comments
- Enhanced error handling and environment variable loading

### Key Technical Improvements (v2.1.0)

#### **Fixed Environment Variable Loading**

- **Problem**: `process.env.DATABASE_URL` was `undefined` causing "role Panka does not exist" errors
- **Solution**: Added `dotenv.config()` to database connection files before URL access
- **Impact**: Reliable database connections across all environments

#### **Enhanced Command Buffer & Timeout**

```javascript
// Updated in command.js v2.1.0
export async function runCommand(command, cwd) {
  return execPromise(command, {
    cwd,
    maxBuffer: 1024 * 1024 * 50, // Increased to 50MB
    timeout: 300000, // Added 5 minute timeout
  });
}
```

#### **Automatic Database Creation for Drizzle**

- Eliminates need for manual `createdb` or PostgreSQL setup
- Works seamlessly with Docker PostgreSQL containers
- Matches Prisma's automatic database creation behavior
- Provides better developer experience for database projects

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
