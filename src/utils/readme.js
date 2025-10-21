export function createReadme(projectName, stackName) {
  return `# ${projectName}

A ${stackName} project scaffolded with InitGen CLI.

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
- [InitGen CLI](https://github.com/PankajKumardev/initgen)

---

*Scaffolded by InitGen CLI*
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

A ${stackName} project scaffolded with InitGen CLI.

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
- [InitGen CLI](https://github.com/PankajKumardev/initgen)

---

*Scaffolded by InitGen CLI*
`;
}

export function createDatabaseReadme(
  projectName,
  stackName,
  dbType = 'prisma'
) {
  const isPrisma = dbType === 'prisma';

  const setupCommands = isPrisma
    ? `### Database Setup
\`\`\`bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed the database (optional)
npm run db:seed

# Open Prisma Studio
npm run db:studio
\`\`\``
    : `### Database Setup
\`\`\`bash
# Generate Drizzle schema
npm run db:generate

# Run database migrations
npm run db:migrate

# Push schema changes to database
npm run db:push

# Open Drizzle Studio
npm run db:studio
\`\`\``;

  const envSetup = `### Environment Setup
1. Copy \`.env.example\` to \`.env\`
2. Update the \`DATABASE_URL\` with your PostgreSQL connection string:
   \`\`\`
   DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"
   \`\`\``;

  const projectStructure = isPrisma
    ? `## Project Structure

\`\`\`
${projectName}/
├── src/
│   ├── index.js/ts
│   ├── routes/
│   ├── controllers/
│   └── models/
├── prisma/
│   ├── schema.prisma
│   └── seed.js/ts
├── .env.example
└── package.json
\`\`\``
    : `## Project Structure

\`\`\`
${projectName}/
├── src/
│   ├── index.js/ts
│   ├── routes/
│   ├── controllers/
│   └── db/
│       ├── schema.js/ts
│       ├── index.js/ts
│       └── migrations/
├── drizzle.config.js
├── .env.example
└── package.json
\`\`\``;

  return `# ${projectName}

A ${stackName} project scaffolded with InitGen CLI.

## Getting Started

### Install Dependencies
\`\`\`bash
npm install
\`\`\`

${envSetup}

${setupCommands}

### Development
\`\`\`bash
npm run dev
\`\`\`

${projectStructure}

## Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run db:generate\` - Generate ${
    isPrisma ? 'Prisma client' : 'Drizzle schema'
  }
- \`npm run db:migrate\` - Run database migrations
${
  isPrisma
    ? '- `npm run db:seed` - Seed the database'
    : '- `npm run db:push` - Push schema changes'
}
- \`npm run db:studio\` - Open database studio

## API Endpoints

- \`GET /\` - Welcome message
- \`GET /api/users\` - Get all users
- \`POST /api/users\` - Create a new user
- \`GET /api/posts\` - Get all posts
- \`POST /api/posts\` - Create a new post
- \`GET /health\` - Health check

## Learn More

- Documentation for ${stackName}
- [${isPrisma ? 'Prisma' : 'Drizzle'} Documentation](${
    isPrisma
      ? 'https://www.prisma.io/docs'
      : 'https://orm.drizzle.team/docs/overview'
  })
- [InitGen CLI](https://github.com/PankajKumardev/initgen)

---

*Scaffolded by InitGen CLI*
`;
}
