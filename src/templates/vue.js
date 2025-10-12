import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export async function setupVueTemplate(
  projectPath,
  projectName,
  useTypeScript = false
) {
  const appPath = path.join(projectPath, 'src', 'App.vue');

  const vueCode = `<script setup${useTypeScript ? ' lang="ts"' : ''}>
import { ref } from 'vue'
</script>

<template>
  <div class="container">
    <main class="main">
      <div class="content">
        <div class="hero">
          <h2 class="hero-title">
            Ship faster with
            <span class="gradient-text">
              Vue.js
            </span>
          </h2>
          <p class="hero-description">
            Build your next project with Vue 3. 
            The progressive JavaScript framework for building user interfaces.
          </p>
        </div>

        <div class="features">
          <div class="feature-card">
            <div class="feature-title">Composition API</div>
            <p class="feature-description">Build with Vue 3's powerful Composition API for better code organization</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-title">Single File Components</div>
            <p class="feature-description">Write HTML, CSS, and JavaScript in one elegant .vue file</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-title">${
              useTypeScript ? 'Type Safe' : 'Reactive System'
            }</div>
            <p class="feature-description">${
              useTypeScript
                ? 'Full TypeScript support with type inference and checking'
                : "Enjoy Vue's reactive data system and blazing-fast virtual DOM"
            }</p>
          </div>
        </div>
      </div>
    </main>

    <footer class="footer">
      <p>
        InitGen CLI by 
        <a 
          href="https://www.pankajk.tech" 
          target="_blank" 
          rel="noopener noreferrer"
          class="footer-link"
        >
          Pankaj Kumar
        </a>
      </p>
    </footer>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #000;
  color: #fff;
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
</style>
`;

  fs.writeFileSync(appPath, vueCode);

  // Update main.css (Vue uses assets/main.css)
  const mainCssPath = path.join(projectPath, 'src', 'assets', 'main.css');
  if (fs.existsSync(mainCssPath)) {
    const globalCss = `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: #000 !important;
  min-height: 100vh;
  color: #fff !important;
  line-height: 1.6;
  width: 100%;
  overflow-x: hidden;
  display: block !important;
  place-items: unset !important;
}

#app {
  min-height: 100vh;
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}
`;
    fs.writeFileSync(mainCssPath, globalCss);
  }

  // Also update base.css to remove default styling
  const baseCssPath = path.join(projectPath, 'src', 'assets', 'base.css');
  if (fs.existsSync(baseCssPath)) {
    const baseCss = `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
`;
    fs.writeFileSync(baseCssPath, baseCss);
  }

  console.log(chalk.dim('  ✓ Created Vue template'));
}
