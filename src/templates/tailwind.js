import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { runCommand } from '../utils/command.js';

export async function setupTailwind(projectPath, projectName) {
  console.log(chalk.dim('  ⚙️  Setting up Tailwind CSS...'));

  // First install base dependencies
  try {
    console.log(chalk.dim('  📦 Installing dependencies...'));
    await runCommand('npm install', projectPath);
    console.log(chalk.dim('  ✓ Installed base dependencies'));
  } catch (error) {
    console.log(chalk.yellow('  ⚠ Could not install base dependencies'));
    return;
  }

  // Install Tailwind v4 and @tailwindcss/vite
  try {
    await runCommand(
      'npm install -D tailwindcss @tailwindcss/vite --legacy-peer-deps',
      projectPath
    );
    console.log(chalk.dim('  ✓ Installed Tailwind CSS v4'));
  } catch (error) {
    console.log(
      chalk.yellow(`  ⚠ Could not install Tailwind CSS: ${error.message}`)
    );
    return;
  }

  // Update vite.config file to include Tailwind plugin
  const viteConfigPath = path.join(projectPath, 'vite.config.js');
  const viteConfigTsPath = path.join(projectPath, 'vite.config.ts');
  const isTypeScript = fs.existsSync(viteConfigTsPath);
  const configPath = isTypeScript ? viteConfigTsPath : viteConfigPath;

  const viteConfig = isTypeScript
    ? `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
`
    : `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
`;

  fs.writeFileSync(configPath, viteConfig);
  console.log(chalk.dim('  ✓ Updated Vite config'));

  // Update index.css with Tailwind v4 import
  const indexCss = `@import "tailwindcss";
`;
  fs.writeFileSync(path.join(projectPath, 'src', 'index.css'), indexCss);

  // Create a sample App file with Tailwind classes
  const appExt = isTypeScript ? 'tsx' : 'jsx';
  const appPath = path.join(projectPath, 'src', `App.${appExt}`);

  const appCode = `${isTypeScript ? "import React from 'react'\n" : ''}
function App() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col w-full">
      <main className="flex-1 flex items-center justify-center px-6 py-8 w-full">
        <div className="max-w-4xl w-full mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-6xl font-bold tracking-tight">
              Ship faster with
              <span className="block bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
                Modern Stack
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Build your next project with Vite, React, and Tailwind CSS v4. 
              Fast, minimal, and production-ready.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 text-left">
            <div className="space-y-2">
              <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">Lightning Fast</div>
              <p className="text-gray-500">Instant HMR and optimized build with Vite's next-gen tooling</p>
            </div>
            
            <div className="space-y-2">
              <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">${
                isTypeScript ? 'Type Safe' : 'Modern JS'
              }</div>
              <p className="text-gray-500">${
                isTypeScript
                  ? 'Full TypeScript support for scalable applications'
                  : 'Latest JavaScript features out of the box'
              }</p>
            </div>
            
            <div className="space-y-2">
              <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">Tailwind v4</div>
              <p className="text-gray-500">Next-generation CSS framework with enhanced performance</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-800 px-6 py-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-500">
          <p>
            InitGen CLI by{' '}
            <a 
              href="https://www.pankajk.tech" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition font-medium"
            >
              Pankaj Kumar
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
`;
  fs.writeFileSync(appPath, appCode);

  // Remove default App.css
  const appCssPath = path.join(projectPath, 'src', 'App.css');
  if (fs.existsSync(appCssPath)) {
    fs.unlinkSync(appCssPath);
  }

  console.log(chalk.dim('  ✓ Configured Tailwind CSS v4'));
}
