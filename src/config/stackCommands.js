export const stackCommands = {
  'react-vite': {
    command: null, // Will be set dynamically based on TS choice
    name: 'React (Vite)',
    needsInstall: false, // We install automatically
  },
  'vite-tailwind': {
    command: null, // Will be set dynamically based on TS choice
    name: 'Vite + React + Tailwind v4',
    needsInstall: false, // We install everything during setup
    setupTailwind: true,
  },
  'vite-shadcn': {
    command: null, // Will be set dynamically based on TS choice
    name: 'Vite + React + Tailwind + shadcn/ui',
    needsInstall: false, // We install everything during setup
    setupTailwind: true,
    setupShadcn: true,
  },
  nextjs: {
    command: null, // Will be set dynamically based on TS choice
    name: 'Next.js',
    needsInstall: false,
  },
  'nextjs-shadcn': {
    command: null, // Will be set dynamically based on TS choice
    name: 'Next.js + shadcn/ui',
    needsInstall: false,
    setupShadcn: true,
  },
  vue: {
    command: null, // Will be set dynamically based on TS choice
    name: 'Vue (Vite)',
    needsInstall: false,
  },
  'node-express': {
    name: 'Node.js + Express',
    manual: true,
  },
  'python-flask': {
    name: 'Python + Flask',
    manual: true,
  },
  'python-fastapi': {
    name: 'Python + FastAPI',
    manual: true,
  },
  'python-django': {
    name: 'Python + Django',
    manual: true,
  },
};
