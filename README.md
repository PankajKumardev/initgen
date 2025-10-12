# 🚀 InitGen

[![npm version](https://img.shields.io/npm/v/initgen.svg)](https://www.npmjs.com/package/initgen)
[![npm downloads](https://img.shields.io/npm/dm/initgen.svg)](https://www.npmjs.com/package/initgen)
[![GitHub stars](https://img.shields.io/github/stars/PankajKumardev/initgen?style=social)](https://github.com/PankajKumardev/initgen)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful, interactive command-line tool to scaffold modern web and backend projects with zero configuration. Create production-ready projects with your preferred tech stack in seconds!

## ✨ Features

- 🎨 **Beautiful Interactive UI** - Animated CLI with colorful prompts
- 🔧 **7 Tech Stacks Supported** - React, Next.js, Vue, Node.js, Python frameworks
- 📦 **Automatic Dependency Installation** - npm install & pip install handled automatically
- 🎯 **TypeScript Support** - Choose JS or TS for React, Vue, Next.js, and Node.js
- 🎨 **Tailwind CSS v4** - Modern styling with the latest Tailwind
- 📝 **Auto-generated Files** - README, .gitignore, and project structure
- ⚡ **Ready to Run** - Projects work immediately after creation

## 📋 Supported Stacks

### Frontend Frameworks

- **React (Vite)** - Lightning-fast React development with Vite
- **Vite + React + Tailwind v4** - React with modern Tailwind CSS
- **Next.js** - The React framework for production
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

### Next.js

```
my-app/
├── src/
│   └── app/
│       ├── page.jsx/tsx
│       ├── layout.jsx/tsx
│       └── globals.css
├── public/
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

### Template Features

#### Frontend Templates

- Full-width black background
- Gradient hero text
- 3-column feature grid
- Minimal footer with creator credit
- Framework-specific optimizations

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
- `nextjs.js` - Next.js template
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

## 🐛 Troubleshooting

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

## 🌟 Examples

### Create a React App with Tailwind

```bash
node index.js
# Choose: Vite + React + Tailwind v4
# Name: my-react-app
# Language: TypeScript
# Git: Yes
```

### Create a Node.js API

```bash
node index.js
# Choose: Node.js + Express
# Name: my-api
# Git: Yes
```

### Create a Django Project

```bash
node index.js
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

- [ ] Add more backend frameworks (FastAPI, Express with TypeScript)
- [ ] Add database setup options
- [ ] Add CI/CD configuration files
- [ ] Add Docker support
- [ ] Add testing framework setup
- [ ] Add more frontend frameworks (Svelte, Solid)
- [ ] Add mobile frameworks (React Native, Flutter)

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
