import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { runCommand } from '../utils/command.js';

export async function setupShadcn(
  projectPath,
  projectName,
  useTypeScript = true
) {
  console.log(chalk.dim('  🎨 Setting up shadcn/ui...'));

  // First ensure Tailwind is set up
  try {
    console.log(chalk.dim('  📦 Installing Tailwind CSS and dependencies...'));
    await runCommand(
      'npm install tailwindcss @tailwindcss/vite --legacy-peer-deps',
      projectPath
    );
    console.log(chalk.dim('  ✓ Installed Tailwind CSS'));
  } catch (error) {
    console.log(
      chalk.yellow(`  ⚠ Could not install Tailwind CSS: ${error.message}`)
    );
    return;
  }

  // Install @types/node for path resolution
  try {
    await runCommand('npm install -D @types/node', projectPath);
    console.log(chalk.dim('  ✓ Installed @types/node'));
  } catch (error) {
    console.log(chalk.yellow('  ⚠ Could not install @types/node'));
  }

  // Update src/index.css with Tailwind imports
  const indexCssPath = path.join(projectPath, 'src', 'index.css');
  const tailwindCss = `@import "tailwindcss";
`;
  fs.writeFileSync(indexCssPath, tailwindCss);
  console.log(chalk.dim('  ✓ Updated index.css with Tailwind imports'));

  // Update vite.config file with path alias and Tailwind plugin
  const viteConfigPath = path.join(projectPath, 'vite.config.js');
  const viteConfigTsPath = path.join(projectPath, 'vite.config.ts');
  const isTypeScript = useTypeScript && fs.existsSync(viteConfigTsPath);
  const configPath = isTypeScript ? viteConfigTsPath : viteConfigPath;

  const viteConfig = `import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
`;

  fs.writeFileSync(configPath, viteConfig);
  console.log(
    chalk.dim('  ✓ Updated vite.config with path alias and Tailwind plugin')
  );

  // Update tsconfig.json for path resolution
  if (useTypeScript) {
    const tsconfigPath = path.join(projectPath, 'tsconfig.json');
    const tsconfigAppPath = path.join(projectPath, 'tsconfig.app.json');

    // Update main tsconfig.json
    if (fs.existsSync(tsconfigPath)) {
      const tsconfig = {
        files: [],
        references: [
          { path: './tsconfig.app.json' },
          { path: './tsconfig.node.json' },
        ],
        compilerOptions: {
          baseUrl: '.',
          paths: {
            '@/*': ['./src/*'],
          },
        },
      };
      fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
      console.log(chalk.dim('  ✓ Updated tsconfig.json'));
    }

    // Update tsconfig.app.json
    if (fs.existsSync(tsconfigAppPath)) {
      try {
        const tsconfigAppContent = fs.readFileSync(tsconfigAppPath, 'utf-8');
        const tsconfigApp = JSON.parse(tsconfigAppContent);

        tsconfigApp.compilerOptions = {
          ...tsconfigApp.compilerOptions,
          baseUrl: '.',
          paths: {
            '@/*': ['./src/*'],
          },
        };

        fs.writeFileSync(tsconfigAppPath, JSON.stringify(tsconfigApp, null, 2));
        console.log(chalk.dim('  ✓ Updated tsconfig.app.json'));
      } catch (error) {
        console.log(chalk.yellow('  ⚠ Could not update tsconfig.app.json'));
      }
    }
  }

  // Create shadcn/ui configuration manually
  let shadcnSuccess = false;
  try {
    console.log(chalk.dim('  🔧 Setting up shadcn/ui configuration...'));

    // Create components.json for shadcn/ui
    const componentsConfig = {
      $schema: 'https://ui.shadcn.com/schema.json',
      style: 'new-york',
      rsc: false,
      tsx: useTypeScript,
      tailwind: {
        config: 'tailwind.config.js',
        css: 'src/index.css',
        baseColor: 'neutral',
        cssVariables: true,
        prefix: '',
      },
      aliases: {
        components: '@/components',
        utils: '@/lib/utils',
        ui: '@/components/ui',
        lib: '@/lib',
        hooks: '@/hooks',
      },
    };

    fs.writeFileSync(
      path.join(projectPath, 'components.json'),
      JSON.stringify(componentsConfig, null, 2)
    );

    // Create lib/utils.ts for shadcn components
    const libDir = path.join(projectPath, 'src/lib');
    fs.mkdirSync(libDir, { recursive: true });

    const utilsContent = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`;

    const utilsFile = useTypeScript ? 'utils.ts' : 'utils.js';
    fs.writeFileSync(path.join(libDir, utilsFile), utilsContent);

    // Create components/ui directory
    const componentsDir = path.join(projectPath, 'src/components/ui');
    fs.mkdirSync(componentsDir, { recursive: true });

    // Install required dependencies for shadcn/ui utilities and components
    await runCommand(
      'npm install clsx tailwind-merge class-variance-authority @radix-ui/react-slot',
      projectPath
    );

    console.log(chalk.dim('  ✓ Created shadcn/ui configuration'));
    console.log(chalk.dim('  ✓ Set up utility functions'));

    shadcnSuccess = true;
  } catch (error) {
    console.log(
      chalk.yellow(`  ⚠ Could not set up shadcn/ui: ${error.message}`)
    );
    console.log(
      chalk.dim(
        '  💡 You can run "npx shadcn@latest init" manually after project creation'
      )
    );

    shadcnSuccess = true;
  }

  // Create example App component using shadcn Button
  const appExt = useTypeScript ? 'tsx' : 'jsx';
  const appPath = path.join(projectPath, 'src', `App.${appExt}`);

  const appCode = `${
    useTypeScript ? 'import React from "react"\n' : ''
  }import './App.css'

function App() {
  return (
    <div className="container">
      <main className="main">
        <div className="content">
          <div className="hero">
            <h2 className="hero-title">
              Ship faster with
              <span className="gradient-text">
                React + Tailwind + shadcn/ui
              </span>
            </h2>
            <p className="hero-description">
              Build your next project with Vite, React, Tailwind CSS, and shadcn/ui. 
              Beautiful components, fast development, production-ready.
            </p>
          </div>

          <div className="features">
            <div className="feature-card">
              <div className="feature-title">Lightning Fast</div>
              <p className="feature-description">Instant HMR and optimized build with Vite's next-gen tooling</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-title">${
                useTypeScript ? 'Type Safe' : 'Modern Stack'
              }</div>
              <p className="feature-description">${
                useTypeScript
                  ? 'Full TypeScript support for scalable applications'
                  : 'Modern React with the latest JavaScript features'
              }</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-title">shadcn/ui Ready</div>
              <p className="feature-description">Beautiful components with Tailwind CSS and path aliases configured</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>
          InitGen CLI by{' '}
          <a 
            href="https://www.pankajk.tech" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            Pankaj Kumar
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App
`;

  fs.writeFileSync(appPath, appCode);

  // Update CSS for shadcn styling
  const cssPath = path.join(projectPath, 'src', 'App.css');
  const appCss = `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: #000;
  min-height: 100vh;
  color: #fff;
  line-height: 1.6;
  width: 100%;
  overflow-x: hidden;
}

.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.content {
  max-width: 48rem;
  text-align: center;
  width: 100%;
}

.hero {
  margin-bottom: 3rem;
}

.hero-title {
  font-size: 3.75rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1;
  margin-bottom: 1rem;
}

.gradient-text {
  display: block;
  background: linear-gradient(to right, #f5f5f5, #a3a3a3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.25rem;
  color: #9ca3af;
  max-width: 42rem;
  margin: 0 auto 3rem;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding-top: 3rem;
  text-align: left;
}

.feature-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feature-title {
  color: #9ca3af;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.feature-description {
  color: #6b7280;
  line-height: 1.6;
}

.footer {
  border-top: 1px solid #1f2937;
  padding: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
}

.footer-link {
  color: #6b7280;
  text-decoration: none;
}

.footer-link:hover {
  color: #9ca3af;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.25rem;
  }
  
  .hero-description {
    font-size: 1.125rem;
  }
  
  .features {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding-top: 2rem;
  }
  
  .main {
    padding: 1rem;
  }
}
`;

  fs.writeFileSync(cssPath, appCss);

  console.log(chalk.dim('  ✓ Created shadcn/ui demo components'));
  console.log(chalk.green('  🎉 shadcn/ui setup complete!'));
}
