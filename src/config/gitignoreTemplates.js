export const gitignoreTemplates = {
  javascript: `
# dependencies
node_modules/
.pnp
.pnp.js

# testing
coverage/

# production
build/
dist/

# misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# editor
.vscode/*
!.vscode/extensions.json
.idea
*.swp
*.swo
*~

# next.js
.next/
out/

# cache
.cache
.parcel-cache
.turbo
`,
  python: `
# Byte-compiled / optimized / DLL files
__pycache__/
*.py[cod]
*$py.class

# Virtual environment
venv/
env/
ENV/
.venv

# Django stuff
*.log
local_settings.py
db.sqlite3
db.sqlite3-journal

# Flask stuff
instance/
.webassets-cache

# Environment variables
.env
.env.local

# Distribution / packaging
dist/
build/
*.egg-info/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
`,
};
