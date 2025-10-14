import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export async function setupNextjsTemplate(
  projectPath,
  projectName,
  useTypeScript = true,
  setupShadcn = false
) {
  const fileExt = useTypeScript ? 'tsx' : 'jsx';
  const srcPath = path.join(projectPath, 'src');

  // Determine the correct app directory path
  const appDir = fs.existsSync(srcPath)
    ? path.join(srcPath, 'app')
    : path.join(projectPath, 'app');

  // For JavaScript projects, we need to ensure the correct file extension
  // Delete any existing page and layout files and create with correct extension
  const possibleExtensions = ['js', 'jsx', 'ts', 'tsx'];

  // Fix page file extension
  for (const ext of possibleExtensions) {
    const possiblePath = path.join(appDir, `page.${ext}`);
    if (fs.existsSync(possiblePath)) {
      fs.unlinkSync(possiblePath); // Delete the existing file
    }
  }

  // Fix layout file extension
  for (const ext of possibleExtensions) {
    const layoutPath = path.join(appDir, `layout.${ext}`);
    if (fs.existsSync(layoutPath) && ext !== fileExt) {
      const layoutContent = fs.readFileSync(layoutPath, 'utf8');
      fs.unlinkSync(layoutPath); // Delete the old file
      fs.writeFileSync(path.join(appDir, `layout.${fileExt}`), layoutContent); // Create with correct extension
    }
  }

  const appPath = path.join(appDir, `page.${fileExt}`);

  // Check if it's Next.js 13+ with app directory
  if (fs.existsSync(appDir)) {
    const pageCode = `export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-4xl w-full mx-auto text-center">
          <div className="mb-12">
            <h1 className="text-6xl font-bold tracking-tight mb-4">
              Ship faster with{" "}
              <span className="bg-gradient-to-r from-neutral-200 to-neutral-600 bg-clip-text text-transparent">
                Next.js
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Build your next project with Next.js. 
              The React framework for production with built-in optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 text-left">
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Server Components
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Built-in support for React Server Components with streaming
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Fast Refresh
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Reliable live-editing experience for React components
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                ${useTypeScript ? 'Type Safe' : 'Full-Stack Ready'}
              </div>
              <p className="text-muted-foreground leading-relaxed">
                ${
                  useTypeScript
                    ? 'Full TypeScript support with automatic type checking'
                    : 'API routes, middleware, and server-side rendering out of the box'
                }
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t p-6 text-center text-sm text-muted-foreground">
        <p>
          InitGen CLI by{' '}
          <a 
            href="https://www.pankajk.tech" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:underline font-medium"
          >
            Pankaj Kumar
          </a>
        </p>
      </footer>
    </div>
  );
}
`;

    const nextCssCode = `@import "tailwindcss";

:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 0 0% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  --secondary: 0 0% 96.1%;
  --secondary-foreground: 0 0% 9%;
  --muted: 0 0% 96.1%;
  --muted-foreground: 0 0% 45.1%;
  --accent: 0 0% 96.1%;
  --accent-foreground: 0 0% 9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 89.8%;
  --input: 0 0% 89.8%;
  --ring: 0 0% 3.9%;
  --radius: 0.5rem;
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  --card: 0 0% 3.9%;
  --card-foreground: 0 0% 98%;
  --popover: 0 0% 3.9%;
  --popover-foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 0 0% 9%;
  --secondary: 0 0% 14.9%;
  --secondary-foreground: 0 0% 98%;
  --muted: 0 0% 14.9%;
  --muted-foreground: 0 0% 63.9%;
  --accent: 0 0% 14.9%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 14.9%;
  --input: 0 0% 14.9%;
  --ring: 0 0% 83.1%;
}

@theme inline {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  --border-radius: var(--radius);
}

* {
  border-color: hsl(var(--border));
}

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 9%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 0% 83.1%;
  }
}
`;

    fs.writeFileSync(appPath, pageCode);

    // Update global CSS - check both possible locations
    let globalCssPath = path.join(appDir, 'globals.css');
    if (!fs.existsSync(globalCssPath)) {
      // Try without src directory
      globalCssPath = path.join(projectPath, 'app', 'globals.css');
    }

    if (fs.existsSync(globalCssPath)) {
      fs.writeFileSync(globalCssPath, nextCssCode);
    }

    console.log(chalk.dim('  ✓ Created Next.js template'));
  }

  // Setup shadcn/ui if requested
  if (setupShadcn) {
    await setupNextjsShadcn(projectPath, projectName, useTypeScript);
  }
}

async function setupNextjsShadcn(projectPath, projectName, useTypeScript) {
  const { runCommand } = await import('../utils/command.js');

  console.log(chalk.dim('  🎨 Setting up shadcn/ui for Next.js...'));

  try {
    // Create shadcn/ui configuration manually for Tailwind v4 compatibility
    console.log(chalk.dim('  🔧 Setting up shadcn/ui configuration...'));

    // Create components.json for shadcn/ui (Tailwind v4 compatible)
    const componentsConfig = {
      $schema: 'https://ui.shadcn.com/schema.json',
      style: 'new-york',
      rsc: true,
      tsx: useTypeScript,
      tailwind: {
        config: 'tailwind.config.ts',
        css: 'src/app/globals.css',
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

    const utilsContent = useTypeScript
      ? `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`
      : `import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
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

    // Update the page to use shadcn components
    const fileExt = useTypeScript ? 'tsx' : 'jsx';
    const srcPath = path.join(projectPath, 'src');
    const appDir = fs.existsSync(srcPath)
      ? path.join(srcPath, 'app')
      : path.join(projectPath, 'app');

    // For JavaScript projects, we need to ensure the correct file extension
    // Delete any existing page and layout files and create with correct extension
    const possibleExtensions = ['js', 'jsx', 'ts', 'tsx'];

    // Fix page file extension
    for (const ext of possibleExtensions) {
      const possiblePath = path.join(appDir, `page.${ext}`);
      if (fs.existsSync(possiblePath)) {
        fs.unlinkSync(possiblePath); // Delete the existing file
      }
    }

    // Fix layout file extension
    for (const ext of possibleExtensions) {
      const layoutPath = path.join(appDir, `layout.${ext}`);
      if (fs.existsSync(layoutPath) && ext !== fileExt) {
        const layoutContent = fs.readFileSync(layoutPath, 'utf8');
        fs.unlinkSync(layoutPath); // Delete the old file
        fs.writeFileSync(path.join(appDir, `layout.${fileExt}`), layoutContent); // Create with correct extension
      }
    }

    const appPath = path.join(appDir, `page.${fileExt}`);

    const shadcnPageCode = `

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-4xl w-full mx-auto text-center">
          <div className="mb-12">
            <h1 className="text-6xl font-bold tracking-tight mb-4">
              Ship faster with{" "}
              <span className="bg-gradient-to-r from-neutral-200 to-neutral-600 bg-clip-text text-transparent">
                Next.js + shadcn/ui
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Build your next project with Next.js and shadcn/ui. 
              Beautiful components, server-side rendering, production-ready.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 text-left">
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Beautiful Components
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Pre-built, accessible components with Tailwind CSS styling
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Server Components
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Built-in support for React Server Components with streaming
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                ${useTypeScript ? 'Type Safe' : 'Full-Stack Ready'}
              </div>
              <p className="text-muted-foreground leading-relaxed">
                ${
                  useTypeScript
                    ? 'Full TypeScript support with automatic type checking'
                    : 'API routes, middleware, and server-side rendering out of the box'
                }
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t p-6 text-center text-sm text-muted-foreground">
        <p>
          InitGen CLI by{' '}
          <a 
            href="https://www.pankajk.tech" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:underline font-medium"
          >
            Pankaj Kumar
          </a>
        </p>
      </footer>
    </div>
  );
}
`;

    fs.writeFileSync(appPath, shadcnPageCode);

    // Update globals.css with proper Tailwind v4 setup and shadcn/ui CSS variables
    const globalsCssPath = path.join(appDir, 'globals.css');
    const tailwindGlobalsCss = `@import "tailwindcss";

:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 0 0% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  --secondary: 0 0% 96.1%;
  --secondary-foreground: 0 0% 9%;
  --muted: 0 0% 96.1%;
  --muted-foreground: 0 0% 45.1%;
  --accent: 0 0% 96.1%;
  --accent-foreground: 0 0% 9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 89.8%;
  --input: 0 0% 89.8%;
  --ring: 0 0% 3.9%;
  --chart-1: 12 76% 61%;
  --chart-2: 173 58% 39%;
  --chart-3: 197 37% 24%;
  --chart-4: 43 74% 66%;
  --chart-5: 27 87% 67%;
  --radius: 0.5rem;
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  --card: 0 0% 3.9%;
  --card-foreground: 0 0% 98%;
  --popover: 0 0% 3.9%;
  --popover-foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 0 0% 9%;
  --secondary: 0 0% 14.9%;
  --secondary-foreground: 0 0% 98%;
  --muted: 0 0% 14.9%;
  --muted-foreground: 0 0% 63.9%;
  --accent: 0 0% 14.9%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 14.9%;
  --input: 0 0% 14.9%;
  --ring: 0 0% 83.1%;
  --chart-1: 220 70% 50%;
  --chart-2: 160 60% 45%;
  --chart-3: 30 80% 55%;
  --chart-4: 280 65% 60%;
  --chart-5: 340 75% 55%;
}

@theme inline {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  --color-chart-1: hsl(var(--chart-1));
  --color-chart-2: hsl(var(--chart-2));
  --color-chart-3: hsl(var(--chart-3));
  --color-chart-4: hsl(var(--chart-4));
  --color-chart-5: hsl(var(--chart-5));
  --border-radius: var(--radius);
}

* {
  border-color: hsl(var(--border));
}

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 9%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 0% 83.1%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}
`;

    if (fs.existsSync(globalsCssPath)) {
      fs.writeFileSync(globalsCssPath, tailwindGlobalsCss);
      console.log(
        chalk.dim(
          '  ✓ Updated globals.css with Tailwind v4 and shadcn/ui theme'
        )
      );
    }

    console.log(chalk.dim('  ✓ Created Next.js page with shadcn/ui setup'));
    console.log(chalk.green('  🎉 Next.js + shadcn/ui setup complete!'));
  } catch (error) {
    console.log(
      chalk.yellow(`  ⚠ Could not setup shadcn/ui: ${error.message}`)
    );
    console.log(
      chalk.dim(
        '  💡 You can run "npx shadcn@latest init" manually after project creation'
      )
    );
  }
}
