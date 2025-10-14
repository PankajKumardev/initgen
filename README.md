# 🚀 InitGen v2.0

[![npm version](https://img.shields.io/npm/v/initgen.svg)](https://www.npmjs.com/package/initgen)
[![npm downloads](https://img.shields.io/npm/dm/initgen.svg)](https://www.npmjs.com/package/initgen)
[![GitHub stars](https://img.shields.io/github/stars/PankajKumardev/initgen?style=social)](https://github.com/PankajKumardev/initgen)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful, interactive command-line tool to scaffold modern web and backend projects with zero configuration. Create production-ready projects with your preferred tech stack in seconds!

📖 **[Full Documentation & Interactive Demo](https://initgen.pankajk.tech/)**

## 🎉 What's New in v2.0

- 🎨 **shadcn/ui Integration** - Full support for React component library with Tailwind
- 🔧 **Enhanced Next.js Templates** - Improved file structure with proper .jsx/.tsx extensions
- 📦 **Tailwind CSS v4 Everywhere** - All templates now use modern Tailwind v4
- 🎯 **Better JavaScript Support** - Proper .jsx extensions for JavaScript projects
- ⚡ **Automatic Dependency Management** - Pre-configured shadcn components and dependencies

## ✨ Features

- 🎨 **Beautiful Interactive UI** - Animated CLI with colorful prompts
- 🔧 **10 Tech Stacks Supported** - React, Next.js, Vue, Node.js, Python frameworks + shadcn/ui
- 📦 **Automatic Dependency Installation** - npm install & pip install handled automatically
- 🎯 **TypeScript Support** - Choose JS or TS for React, Vue, Next.js, and Node.js
- 🎨 **Tailwind CSS v4** - Modern styling with the latest Tailwind across all templates
- 🧩 **shadcn/ui Components** - Pre-configured component library with automatic setup
- 📝 **Auto-generated Files** - README, .gitignore, and project structure
- ⚡ **Ready to Run** - Projects work immediately after creation
- 🔧 **Smart File Extensions** - Proper .jsx/.tsx extensions based on language choice

## 📋 Supported Stacks

### Frontend Frameworks

- **React (Vite)** - Lightning-fast React development with Vite
- **Vite + React + Tailwind v4** - React with modern Tailwind CSS
- **Vite + shadcn/ui** - Complete React + Tailwind + shadcn component library
- **Next.js** - The React framework for production with Tailwind v4
- **Next.js + shadcn/ui** - Next.js with shadcn components and Tailwind v4
- **Vue (Vite)** - Progressive JavaScript framework

### Backend Frameworks

- **Node.js + Express** - Fast, minimalist web framework
- **Python + Flask** - Lightweight WSGI web framework
- **Python + Django** - High-level Python web framework

## 🛠️ Installation

### Quick Start (Recommended)

Use npx to run without installation:

```bash
npx initgen
```

### Global Installation

Install once, use anywhere:

```bash
npm install -g initgen
```

Then run with:

```bash
initgen
```

### Local Installation (for development)

Clone the repository:

```bash
git clone https://github.com/PankajKumardev/initgen.git
cd initgen
npm install
```

Run locally:

```bash
node index.js
```

Link globally (optional):

```bash
npm link
```

## 🚀 Usage

### Run the CLI

```bash
node index.js
```

Or if you've linked it globally:

```bash
initgen
```

### Interactive Prompts

1. **Choose your tech stack** - Select from 7 different frameworks
2. **Project name** - Enter your project name
3. **Choose language** - Select JavaScript or TypeScript (where applicable)
4. **Initialize git** - Optionally set up git repository

### Example

```bash
$ initgen

Project Structure Generator 🚀
  ___       _ _    ____
 |_ _|_ __ (_) |_ / ___| ___ _ __
  | || '_ \| | __| |  _ / _ \ '_ \
  | || | | | | |_| |_| |  __/ | | |
 |___|_| |_|_|\__|\____|\___|_| |_|

Welcome to InitGen CLI!

? Choose your tech stack: React (Vite)
? Project name: my-app
? Choose language: TypeScript
? Initialize git repository? Yes

🔨 Creating your project...
📦 Installing dependencies...
✓ Installed dependencies
✓ Project created successfully!

📁 Project: my-app
📍 Location: /path/to/my-app

🚀 Next steps:

   cd my-app
   npm run dev

✨ Happy coding! ✨
```

## 📦 What Gets Created

### React (Vite) / Vue

```
my-app/
├── src/
│   ├── App.jsx/tsx
│   ├── App.css
│   └── main.jsx/tsx
├── public/
├── index.html
├── package.json
├── .gitignore
└── README.md
```

### Vite + shadcn/ui

```
my-app/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── Button.jsx/tsx
│   │       └── Card.jsx/tsx
│   ├── lib/
│   │   └── utils.js/ts
│   ├── App.jsx/tsx
│   └── main.jsx/tsx
├── public/
├── index.html
├── tailwind.config.js
├── components.json
├── package.json
├── .gitignore
└── README.md
```

### Next.js

```
my-app/
├── src/
│   └── app/
│       ├── page.jsx/tsx
│       ├── layout.jsx/tsx
│       └── globals.css
├── public/
├── tailwind.config.js
├── package.json
├── .gitignore
└── README.md
```

### Next.js + shadcn/ui

```
my-app/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── button.jsx/tsx
│   │       └── card.jsx/tsx
│   ├── lib/
│   │   └── utils.js/ts
│   └── app/
│       ├── page.jsx/tsx
│       ├── layout.jsx/tsx
│       └── globals.css
├── public/
├── tailwind.config.js
├── components.json
├── package.json
├── .gitignore
└── README.md
```

### Node.js + Express

```
my-app/
├── src/
│   ├── index.js
│   ├── routes/
│   ├── controllers/
│   └── models/
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

### Python + Flask

```
my-app/
├── app/
│   ├── __init__.py
│   ├── routes/
│   └── models/
├── run.py
├── requirements.txt
├── .gitignore
└── README.md
```

### Python + Django

```
my-app/
└── my-app/
    ├── my-app/
    │   ├── settings.py
    │   ├── urls.py
    │   ├── wsgi.py
    │   └── asgi.py
    ├── app/
    │   ├── views.py
    │   └── urls.py
    ├── manage.py
    ├── requirements.txt
    └── .gitignore
```

## 🎨 Templates

All templates come with:

- ✅ **Minimal Professional Design** - Clean black background with gradient accents
- ✅ **Responsive Layout** - Works on all screen sizes
- ✅ **Production Ready** - Optimized configuration
- ✅ **Pre-configured Routes** - Basic API endpoints included
- ✅ **Developer Experience** - Hot reload, fast refresh, auto-restart
- ✅ **Tailwind CSS v4** - Modern utility-first CSS framework
- ✅ **Smart File Extensions** - Proper .jsx/.tsx based on language choice

### Template Features

#### Frontend Templates

- Full-width black background
- Gradient hero text with Tailwind v4 styling
- 3-column feature grid with responsive design
- Minimal footer with creator credit
- Framework-specific optimizations
- Automatic Tailwind configuration

#### shadcn/ui Templates

- Pre-installed shadcn components (Button, Card)
- Automatic dependency management (clsx, tailwind-merge, class-variance-authority)
- Proper TypeScript/JavaScript component structure
- shadcn CLI configuration (components.json)
- Tailwind v4 compatibility with CSS variables
- Manual component fallbacks for reliability

#### Backend Templates

- RESTful API structure
- Health check endpoint
- Environment variable support
- Development server configuration
- Organized folder structure

## 🔧 Configuration

### Stack Commands

Located in `src/config/stackCommands.js`

### Gitignore Templates

Located in `src/config/gitignoreTemplates.js`

### Template Files

Located in `src/templates/`

- `reactVite.js` - React + Vite template
- `tailwind.js` - Tailwind CSS v4 setup
- `shadcn.js` - Vite + React + shadcn/ui template (New in v2.0)
- `nextjs.js` - Next.js template with shadcn/ui support (Enhanced in v2.0)
- `vue.js` - Vue template
- `manualProjects.js` - Node.js, Flask, Django templates

## 📝 Scripts

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "node index.js"
  }
}
```

## 🤝 Dependencies

### CLI Tools

- `chalk` - Terminal styling
- `gradient-string` - Gradient text effects
- `chalk-animation` - Animated text
- `figlet` - ASCII art text
- `inquirer` - Interactive prompts
- `nanospinner` - Loading spinners

## � v2.0 Features Deep Dive

### shadcn/ui Integration

InitGen v2.0 includes full shadcn/ui support with:

- **Automatic Component Installation**: Button and Card components pre-installed
- **Dependency Management**: All required packages (clsx, tailwind-merge, class-variance-authority, @radix-ui/react-slot) automatically installed
- **Tailwind v4 Compatibility**: Custom CSS variables for seamless theming
- **TypeScript/JavaScript Support**: Proper component structure for both languages
- **Manual Fallbacks**: Reliable component loading with error handling

### Enhanced Next.js Templates

- **Smart File Extensions**: Automatically creates .jsx files for JavaScript projects, .tsx for TypeScript
- **Tailwind v4 Integration**: All Next.js templates now use Tailwind CSS instead of custom CSS
- **shadcn/ui Ready**: Next.js + shadcn/ui option for component-based development
- **Improved Structure**: Better app router structure with proper layout files

### File Extension Intelligence

InitGen v2.0 automatically handles file extensions:

- **JavaScript Projects**: Creates .jsx files for React components
- **TypeScript Projects**: Creates .tsx files for React components
- **Consistent Naming**: Proper extensions across all framework templates

## �🐛 Troubleshooting

### shadcn/ui Component Issues

If shadcn components aren't working:

1. Check if all dependencies are installed:

   ```bash
   npm list clsx tailwind-merge class-variance-authority
   ```

2. Verify Tailwind configuration is correct
3. Manual fallback components are included for reliability

### Port Already in Use

If you get a port error, another process is using that port. Stop the other process or change the port in your project.

### Python Dependencies Not Installing

Make sure you have `pip` installed:

```bash
python -m pip --version
```

### Node Modules Not Installing

Make sure you have `npm` installed:

```bash
npm --version
```

### TypeScript Errors

If you get TypeScript errors, make sure you have the latest version:

```bash
npm install -g typescript
```

### File Extension Issues

If you're seeing .js files instead of .jsx in JavaScript projects, you're using an older version. Update to v2.0:

```bash
npm update -g initgen
```

## 🌟 Examples

### Create a React App with shadcn/ui (New in v2.0)

```bash
npx initgen
# Choose: Vite + shadcn/ui
# Name: my-shadcn-app
# Language: TypeScript
# Git: Yes
```

### Create a Next.js App with shadcn/ui (Enhanced in v2.0)

```bash
npx initgen
# Choose: Next.js + shadcn/ui
# Name: my-nextjs-app
# Language: JavaScript (creates .jsx files)
# Git: Yes
```

### Create a React App with Tailwind

```bash
npx initgen
# Choose: Vite + React + Tailwind v4
# Name: my-react-app
# Language: TypeScript
# Git: Yes
```

### Create a Node.js API

```bash
npx initgen
# Choose: Node.js + Express
# Name: my-api
# Git: Yes
```

### Create a Django Project

```bash
npx initgen
# Choose: Python + Django
# Name: my-django-app
# Git: Yes
```

## 📄 License

MIT License - feel free to use this for personal or commercial projects!

## 👨‍💻 Author

**Pankaj Kumar**

- Website: [www.pankajk.tech](https://www.pankajk.tech)
- GitHub: [@PankajKumardev](https://github.com/PankajKumardev)

## 🙏 Acknowledgments

- Built with love using Node.js
- Inspired by create-react-app, create-next-app, and create-vite
- Thanks to the open-source community

## 🚀 Roadmap

### Completed in v2.0 ✅

- [x] shadcn/ui integration for React and Next.js
- [x] Enhanced Next.js templates with proper file extensions
- [x] Tailwind CSS v4 support across all templates
- [x] Smart JavaScript/TypeScript file extension handling

### Future Plans

- [ ] Add more UI libraries (Ant Design, Material UI, Chakra UI)
- [ ] Add more backend frameworks (FastAPI, Express with TypeScript)
- [ ] Add database setup options (Prisma, Drizzle)
- [ ] Add CI/CD configuration files
- [ ] Add Docker support
- [ ] Add testing framework setup (Jest, Vitest, Playwright)
- [ ] Add more frontend frameworks (Svelte, Solid)
- [ ] Add mobile frameworks (React Native, Flutter)
- [ ] Add authentication templates (NextAuth, Clerk, Supabase Auth)

## 💡 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

**Made with ❤️ by Pankaj Kumar**

_InitGen - Create projects at lightning speed!_
