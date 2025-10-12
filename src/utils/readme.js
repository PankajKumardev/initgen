export function createReadme(projectName, stackName) {
  return `# ${projectName}

A ${stackName} project scaffolded with Scaffold CLI.

## Getting Started

### Install Dependencies
\`\`\`bash
npm install
\`\`\`

### Development
\`\`\`bash
npm run dev
\`\`\`

### Build
\`\`\`bash
npm run build
\`\`\`

## Project Structure

\`\`\`
${projectName}/
├── src/
│   ├── components/
│   └── ...
├── public/
└── package.json
\`\`\`

## Learn More

- Documentation for ${stackName}
- [Scaffold CLI](https://github.com/your-repo)

---

*Scaffolded by Scaffold CLI*
`;
}

export function createPythonReadme(projectName, stackName, isFlask = false) {
  const venvCommand = isFlask
    ? 'python -m venv venv\nsource venv/bin/activate  # On Windows: venv\\\\Scripts\\\\activate'
    : 'source venv/bin/activate  # On Windows: venv\\\\Scripts\\\\activate';

  const installCommand = isFlask
    ? 'pip install -r requirements.txt'
    : 'pip install -r requirements.txt';

  const runCommand = isFlask ? 'python run.py' : 'python manage.py runserver';

  return `# ${projectName}

A ${stackName} project scaffolded with Scaffold CLI.

## Getting Started

### Create Virtual Environment
\`\`\`bash
${venvCommand}
\`\`\`

### Install Dependencies
\`\`\`bash
${installCommand}
\`\`\`

### Run Development Server
\`\`\`bash
${runCommand}
\`\`\`

## Project Structure

\`\`\`
${projectName}/
├── app/
│   ├── routes/
│   └── models/
└── requirements.txt
\`\`\`

## Learn More

- Documentation for ${stackName}
- [Scaffold CLI](https://github.com/your-repo)

---

*Scaffolded by Scaffold CLI*
`;
}
