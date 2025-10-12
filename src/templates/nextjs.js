import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export async function setupNextjsTemplate(
  projectPath,
  projectName,
  useTypeScript = true
) {
  const fileExt = useTypeScript ? 'tsx' : 'jsx';
  const srcPath = path.join(projectPath, 'src');

  // Determine the correct app directory path
  const appDir = fs.existsSync(srcPath)
    ? path.join(srcPath, 'app')
    : path.join(projectPath, 'app');

  // Find the existing page file (could be .js, .jsx, .ts, or .tsx)
  let existingPageFile = null;
  const possibleExtensions = ['js', 'jsx', 'ts', 'tsx'];
  for (const ext of possibleExtensions) {
    const possiblePath = path.join(appDir, `page.${ext}`);
    if (fs.existsSync(possiblePath)) {
      existingPageFile = possiblePath;
      break;
    }
  }

  const appPath = existingPageFile || path.join(appDir, `page.${fileExt}`);

  // Check if it's Next.js 13+ with app directory
  if (fs.existsSync(appDir)) {
    const pageCode = `export default function Home() {
  return (
    <div className="container">
      <main className="main">
        <div className="content">
          <div className="hero">
            <h2 className="hero-title">
              Ship faster with
              <span className="gradient-text">
                Next.js
              </span>
            </h2>
            <p className="hero-description">
              Build your next project with Next.js. 
              The React framework for production with built-in optimization.
            </p>
          </div>

          <div className="features">
            <div className="feature-card">
              <div className="feature-title">Server Components</div>
              <p className="feature-description">Built-in support for React Server Components with streaming</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-title">Fast Refresh</div>
              <p className="feature-description">Reliable live-editing experience for React components</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-title">${
                useTypeScript ? 'Type Safe' : 'Full-Stack Ready'
              }</div>
              <p className="feature-description">${
                useTypeScript
                  ? 'Full TypeScript support with automatic type checking'
                  : 'API routes, middleware, and server-side rendering out of the box'
              }</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>
          Scaffolded CLI by{' '}
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
  );
}
`;

    const nextCssCode = `* {
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
  padding: 2rem 1.5rem;
  width: 100%;
}

.content {
  max-width: 64rem;
  width: 100%;
  margin: 0 auto;
}

.hero {
  text-align: center;
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
  color: #d1d5db;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.footer-link:hover {
  color: #fff;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .features {
    grid-template-columns: 1fr;
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
}
