#!/usr/bin/env node

import chalk from 'chalk';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
import fs from 'fs';
import path from 'path';

// Import configurations
import { stackCommands } from './src/config/stackCommands.js';
import { gitignoreTemplates } from './src/config/gitignoreTemplates.js';

// Import utilities
import { runCommand } from './src/utils/command.js';
import {
  createReadme,
  createPythonReadme,
  createDatabaseReadme,
} from './src/utils/readme.js';

// Import templates
import { setupReactViteTemplate } from './src/templates/reactVite.js';
import { setupTailwind } from './src/templates/tailwind.js';
import { setupShadcn } from './src/templates/shadcn.js';
import { setupNextjsTemplate } from './src/templates/nextjs.js';
import { setupVueTemplate } from './src/templates/vue.js';
import {
  createNodeExpressProject,
  createNodePrismaProject,
  createNodeDrizzleProject,
  createPythonFlaskProject,
  createPythonFastAPIProject,
  createPythonDjangoProject,
} from './src/templates/manualProjects.js';

async function showTitle() {
  const rainbowTitle = chalkAnimation.rainbow('Project Structure Generator 🚀');
  await new Promise((r) => setTimeout(r, 1000));
  rainbowTitle.stop();
  console.log(
    gradient.pastel.multiline(figlet.textSync('InitGen', { font: 'Standard' }))
  );
}

async function mainMenu() {
  console.log(chalk.bgBlueBright('\nWelcome to InitGen CLI!\n'));

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'stack',
      message: 'Choose your tech stack:',
      choices: [
        { name: 'React (Vite)', value: 'react-vite' },
        { name: 'Vite + React + Tailwind v4', value: 'vite-tailwind' },
        { name: 'Vite + React + Tailwind + shadcn/ui', value: 'vite-shadcn' },
        { name: 'Next.js', value: 'nextjs' },
        { name: 'Next.js + shadcn/ui', value: 'nextjs-shadcn' },
        { name: 'Vue (Vite)', value: 'vue' },
        { name: 'Node.js + Express', value: 'node-express' },
        {
          name: 'Node.js + Express + Prisma (PostgreSQL)',
          value: 'node-prisma',
        },
        {
          name: 'Node.js + Express + Drizzle (PostgreSQL)',
          value: 'node-drizzle',
        },
        { name: 'Python + Flask', value: 'python-flask' },
        { name: 'Python + FastAPI', value: 'python-fastapi' },
        { name: 'Python + Django', value: 'python-django' },
      ],
    },
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      default: 'my-app',
      validate: (input) => {
        if (input.trim() === '') return 'Project name cannot be empty';
        if (!/^[a-zA-Z0-9-_]+$/.test(input))
          return 'Project name can only contain letters, numbers, hyphens, and underscores';
        return true;
      },
    },
  ]);

  // Ask for TypeScript if it's a Vite React, Tailwind, shadcn, Next.js, Vue, or Node.js project
  if (
    answers.stack === 'react-vite' ||
    answers.stack === 'vite-tailwind' ||
    answers.stack === 'vite-shadcn' ||
    answers.stack === 'nextjs' ||
    answers.stack === 'nextjs-shadcn' ||
    answers.stack === 'vue' ||
    answers.stack === 'node-express' ||
    answers.stack === 'node-prisma' ||
    answers.stack === 'node-drizzle'
  ) {
    const tsAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'useTypeScript',
        message: 'Choose language:',
        choices: [
          { name: 'JavaScript', value: false },
          { name: 'TypeScript', value: true },
        ],
        default: false,
      },
    ]);
    answers.useTypeScript = tsAnswer.useTypeScript;
  }

  const gitAnswer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'initGit',
      message: 'Initialize git repository?',
      default: true,
    },
  ]);
  answers.initGit = gitAnswer.initGit;

  return answers;
}

async function createProjectStructure(config) {
  const { projectName, stack, initGit, useTypeScript } = config;
  const projectPath = path.join(process.cwd(), projectName);
  const stackConfig = stackCommands[stack];

  if (fs.existsSync(projectPath)) {
    throw new Error(`Directory "${projectName}" already exists!`);
  }

  if (stackConfig.manual) {
    fs.mkdirSync(projectPath, { recursive: true });

    if (stack === 'node-express') {
      await createNodeExpressProject(projectPath, projectName, useTypeScript);

      // Install dependencies for Node Express
      try {
        console.log(chalk.dim('  📦 Installing dependencies...'));
        await runCommand('npm install', projectPath);
        console.log(chalk.dim('  ✓ Installed dependencies'));
      } catch (error) {
        console.log(
          chalk.yellow(
            '  ⚠ Could not install dependencies. Run "npm install" manually.'
          )
        );
      }
    } else if (stack === 'node-prisma') {
      await createNodePrismaProject(projectPath, projectName, useTypeScript);

      // Install dependencies for Node + Prisma
      try {
        console.log(chalk.dim('  📦 Installing dependencies...'));
        await runCommand('npm install', projectPath);
        console.log(chalk.dim('  ✓ Installed dependencies'));

        console.log(chalk.dim('  🔧 Setting up Prisma...'));
        await runCommand('npx prisma generate', projectPath);
        console.log(chalk.dim('  ✓ Generated Prisma client'));
      } catch (error) {
        console.log(
          chalk.yellow(
            '  ⚠ Could not install dependencies or setup Prisma. Run "npm install" and "npx prisma generate" manually.'
          )
        );
      }
    } else if (stack === 'node-drizzle') {
      await createNodeDrizzleProject(projectPath, projectName, useTypeScript);

      // Install dependencies for Node + Drizzle
      try {
        console.log(chalk.dim('  📦 Installing dependencies...'));
        await runCommand('npm install', projectPath);
        console.log(chalk.dim('  ✓ Installed dependencies'));

        console.log(chalk.dim('  🔧 Setting up Drizzle...'));
        await runCommand('npm run db:generate', projectPath);
        console.log(chalk.dim('  ✓ Generated Drizzle schema'));
      } catch (error) {
        console.log(
          chalk.yellow(
            '  ⚠ Could not install dependencies or setup Drizzle. Run "npm install" and "npm run db:generate" manually.'
          )
        );
      }
    } else if (stack === 'python-flask') {
      await createPythonFlaskProject(projectPath, projectName);

      // Install dependencies for Python Flask
      try {
        console.log(chalk.dim('  📦 Installing Python dependencies...'));
        await runCommand('pip install -r requirements.txt', projectPath);
        console.log(chalk.dim('  ✓ Installed Python dependencies'));
      } catch (error) {
        console.log(
          chalk.yellow(
            '  ⚠ Could not install dependencies. Run "pip install -r requirements.txt" manually.'
          )
        );
      }
    } else if (stack === 'python-fastapi') {
      await createPythonFastAPIProject(projectPath, projectName);

      // Install dependencies for Python FastAPI
      try {
        console.log(chalk.dim('  📦 Installing Python dependencies...'));
        await runCommand('pip install -r requirements.txt', projectPath);
        console.log(chalk.dim('  ✓ Installed FastAPI dependencies'));
      } catch (error) {
        console.log(
          chalk.yellow(
            '  ⚠ Could not install dependencies. Run "pip install -r requirements.txt" manually.'
          )
        );
      }
    } else if (stack === 'python-django') {
      await createPythonDjangoProject(projectPath, projectName);

      // Install dependencies for Python Django
      try {
        console.log(chalk.dim('  📦 Installing Python dependencies...'));
        await runCommand('pip install -r requirements.txt', projectPath);
        console.log(chalk.dim('  ✓ Installed Django'));
      } catch (error) {
        console.log(
          chalk.yellow(
            '  ⚠ Could not install dependencies. Run "pip install -r requirements.txt" manually.'
          )
        );
      }
    }
  } else {
    let command;

    // Handle react-vite, vite-tailwind, and vite-shadcn with dynamic template
    if (
      stack === 'react-vite' ||
      stack === 'vite-tailwind' ||
      stack === 'vite-shadcn'
    ) {
      const template = useTypeScript ? 'react-ts' : 'react';
      command = `npm create vite@latest ${projectName} -- --template ${template}`;
    } else if (stack === 'nextjs' || stack === 'nextjs-shadcn') {
      // Next.js with dynamic TypeScript choice
      if (useTypeScript) {
        command = `npx create-next-app@latest ${projectName} --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes`;
      } else {
        command = `npx create-next-app@latest ${projectName} --js --tailwind --eslint --app --src-dir --import-alias "@/*" --yes`;
      }
    } else if (stack === 'vue') {
      // Vue with dynamic TypeScript choice
      if (useTypeScript) {
        command = `npm create vue@latest ${projectName} -- --typescript --jsx --router --pinia --vitest --default`;
      } else {
        command = `npm create vue@latest ${projectName} -- --jsx --router --pinia --vitest --default`;
      }
    } else {
      command = stackConfig.command.replace('{name}', projectName);
    }

    console.log(chalk.dim(`\n  Running: ${command}\n`));

    try {
      await runCommand(command, process.cwd());
    } catch (error) {
      throw new Error(`Failed to create project: ${error.message}`);
    }

    // Install dependencies for react-vite
    if (stack === 'react-vite') {
      try {
        console.log(chalk.dim('  📦 Installing dependencies...'));
        await runCommand('npm install', projectPath);
        console.log(chalk.dim('  ✓ Installed dependencies'));

        // Setup beautiful template
        await setupReactViteTemplate(projectPath, projectName, useTypeScript);
      } catch (error) {
        console.log(chalk.yellow('  ⚠ Could not install dependencies'));
      }
    }

    // Setup templates for Next.js and Vue
    if (stack === 'nextjs' || stack === 'nextjs-shadcn') {
      await setupNextjsTemplate(
        projectPath,
        projectName,
        useTypeScript,
        stack === 'nextjs-shadcn'
      );
    } else if (stack === 'vue') {
      // Install dependencies for Vue
      try {
        console.log(chalk.dim('  📦 Installing dependencies...'));
        await runCommand('npm install', projectPath);
        console.log(chalk.dim('  ✓ Installed dependencies'));

        // Setup beautiful template
        await setupVueTemplate(projectPath, projectName, useTypeScript);
      } catch (error) {
        console.log(chalk.yellow('  ⚠ Could not install dependencies'));
      }
    }

    // Setup Tailwind if needed
    if (stackConfig.setupTailwind && !stackConfig.setupShadcn) {
      await setupTailwind(projectPath, projectName);
    }

    // Setup shadcn/ui if needed (includes Tailwind) - but not for Next.js as it's already handled
    if (stackConfig.setupShadcn && !stack.startsWith('nextjs')) {
      await setupShadcn(projectPath, projectName, useTypeScript);
    }
  }

  const gitignorePath = path.join(projectPath, '.gitignore');
  const isPython = stack.startsWith('python');
  const isDatabase = stack === 'node-prisma' || stack === 'node-drizzle';

  let gitignoreTemplate;
  if (isPython) {
    gitignoreTemplate = gitignoreTemplates.python;
  } else if (isDatabase) {
    gitignoreTemplate = gitignoreTemplates['javascript-db'];
  } else {
    gitignoreTemplate = gitignoreTemplates.javascript;
  }

  if (fs.existsSync(gitignorePath)) {
    const existingContent = fs.readFileSync(gitignorePath, 'utf-8');
    fs.writeFileSync(gitignorePath, existingContent + '\n' + gitignoreTemplate);
  } else {
    fs.writeFileSync(gitignorePath, gitignoreTemplate);
  }

  const readmePath = path.join(projectPath, 'README.md');
  if (!fs.existsSync(readmePath)) {
    let readme;
    if (isPython) {
      readme = createPythonReadme(
        projectName,
        stackConfig.name,
        stack === 'python-flask'
      );
    } else if (isDatabase) {
      const dbType = stack === 'node-prisma' ? 'prisma' : 'drizzle';
      readme = createDatabaseReadme
        ? createDatabaseReadme(projectName, stackConfig.name, dbType)
        : createReadme(projectName, stackConfig.name);
    } else {
      readme = createReadme(projectName, stackConfig.name);
    }
    fs.writeFileSync(readmePath, readme);
  }

  if (initGit) {
    try {
      await runCommand('git init', projectPath);
      console.log(chalk.dim('  ✓ Initialized git repository'));
    } catch (error) {
      console.log(chalk.yellow('  ⚠ Could not initialize git repository'));
    }
  }
}

async function run() {
  await showTitle();

  const config = await mainMenu();

  console.log(chalk.green('\n🔨 Creating your project...\n'));

  const spinner = createSpinner('Setting up project structure...').start();

  try {
    await createProjectStructure(config);
    spinner.success({ text: '✓ Project created successfully!' });

    console.log(chalk.cyan(`\n📁 Project: ${config.projectName}`));
    console.log(
      chalk.dim(`📍 Location: ${path.join(process.cwd(), config.projectName)}`)
    );
    console.log(chalk.yellow('\n🚀 Next steps:\n'));

    // Different commands for different stacks
    if (config.stack === 'python-django') {
      console.log(
        chalk.white(`   cd ${config.projectName}/${config.projectName}`)
      );
      console.log(chalk.white(`   python manage.py runserver`));
    } else if (config.stack === 'python-flask') {
      console.log(chalk.white(`   cd ${config.projectName}`));
      console.log(chalk.white(`   python run.py`));
    } else if (config.stack === 'python-fastapi') {
      console.log(chalk.white(`   cd ${config.projectName}`));
      console.log(chalk.white(`   uvicorn main:app --reload`));
    } else if (config.stack === 'node-express') {
      console.log(chalk.white(`   cd ${config.projectName}`));
      console.log(chalk.white(`   npm run dev`));
    } else if (config.stack === 'node-prisma') {
      console.log(chalk.white(`   cd ${config.projectName}`));
      console.log(chalk.white(`   npm run db:migrate`));
      console.log(chalk.white(`   npm run dev`));
      console.log('');
      console.log(chalk.dim('   💡 Additional commands:'));
      console.log(chalk.dim('   npm run db:studio  # View database'));
    } else if (config.stack === 'node-drizzle') {
      console.log(chalk.white(`   cd ${config.projectName}`));
      console.log(chalk.white(`   npm run db:create`));
      console.log(chalk.white(`   npm run db:generate`));
      console.log(chalk.white(`   npm run db:push`));
      console.log(chalk.white(`   npm run dev`));
      console.log('');
      console.log(chalk.dim('   💡 Additional commands:'));
      console.log(chalk.dim('   npm run db:studio  # View database'));
      console.log(chalk.dim('   npm run db:migrate # Run migrations'));
    } else {
      console.log(chalk.white(`   cd ${config.projectName}`));
      console.log(chalk.white(`   npm run dev`));
    }

    console.log(chalk.magenta('\n✨ Happy coding! ✨\n'));
  } catch (error) {
    spinner.error({ text: `✗ ${error.message}` });
    process.exit(1);
  }
}

run();
