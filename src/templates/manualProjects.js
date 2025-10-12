import fs from 'fs';
import path from 'path';

export async function createNodeExpressProject(
  projectPath,
  projectName,
  useTypeScript = false
) {
  const dirs = ['src', 'src/routes', 'src/controllers', 'src/models'];
  dirs.forEach((dir) => {
    fs.mkdirSync(path.join(projectPath, dir), { recursive: true });
  });

  const fileExt = useTypeScript ? 'ts' : 'js';
  const mainFile = `src/index.${fileExt}`;

  const packageJson = {
    name: projectName,
    version: '1.0.0',
    description: 'A Node.js Express project',
    main: mainFile,
    type: 'module',
    scripts: useTypeScript
      ? {
          start: 'node dist/index.js',
          dev: 'tsx watch src/index.ts',
          build: 'tsc',
        }
      : {
          start: 'node src/index.js',
          dev: 'nodemon src/index.js',
        },
    keywords: ['express', 'nodejs'],
    author: '',
    license: 'ISC',
    dependencies: {
      express: '^4.18.2',
      cors: '^2.8.5',
      dotenv: '^16.3.1',
    },
    devDependencies: useTypeScript
      ? {
          '@types/node': '^20.10.0',
          '@types/express': '^4.17.21',
          '@types/cors': '^2.8.17',
          typescript: '^5.3.3',
          tsx: '^4.7.0',
        }
      : {
          nodemon: '^3.0.1',
        },
  };
  fs.writeFileSync(
    path.join(projectPath, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );

  if (useTypeScript) {
    const tsConfig = {
      compilerOptions: {
        target: 'ES2020',
        module: 'ESNext',
        moduleResolution: 'node',
        lib: ['ES2020'],
        outDir: './dist',
        rootDir: './src',
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
        resolveJsonModule: true,
      },
      include: ['src/**/*'],
      exclude: ['node_modules', 'dist'],
    };
    fs.writeFileSync(
      path.join(projectPath, 'tsconfig.json'),
      JSON.stringify(tsConfig, null, 2)
    );

    const serverCode = `import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Express API! 🚀' });
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(\`✅ Server is running on http://localhost:\${PORT}\`);
});
`;
    fs.writeFileSync(path.join(projectPath, 'src', 'index.ts'), serverCode);
  } else {
    const serverCode = `import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Express API! 🚀' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(\`✅ Server is running on http://localhost:\${PORT}\`);
});
`;
    fs.writeFileSync(path.join(projectPath, 'src', 'index.js'), serverCode);
  }

  fs.writeFileSync(
    path.join(projectPath, '.env.example'),
    'PORT=3000\nNODE_ENV=development\n'
  );
}

export async function createPythonFlaskProject(projectPath, projectName) {
  const dirs = ['app', 'app/routes', 'app/models'];
  dirs.forEach((dir) => {
    fs.mkdirSync(path.join(projectPath, dir), { recursive: true });
  });

  const appInit = `from flask import Flask

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'dev-secret-key'
    
    from app.routes import main
    app.register_blueprint(main.bp)
    
    return app
`;
  fs.writeFileSync(path.join(projectPath, 'app', '__init__.py'), appInit);

  fs.mkdirSync(path.join(projectPath, 'app', 'routes'), { recursive: true });
  const mainRoutes = `from flask import Blueprint, jsonify

bp = Blueprint('main', __name__)

@bp.route('/')
def index():
    return jsonify({'message': 'Welcome to Flask API! 🚀'})

@bp.route('/health')
def health():
    return jsonify({'status': 'OK'})
`;
  fs.writeFileSync(
    path.join(projectPath, 'app', 'routes', 'main.py'),
    mainRoutes
  );

  fs.writeFileSync(path.join(projectPath, 'app', 'models', '__init__.py'), '');

  const runPy = `from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
`;
  fs.writeFileSync(path.join(projectPath, 'run.py'), runPy);

  const requirements = `Flask==3.0.0
python-dotenv==1.0.0
`;
  fs.writeFileSync(path.join(projectPath, 'requirements.txt'), requirements);
}

export async function createPythonFastAPIProject(projectPath, projectName) {
  const dirs = ['app', 'app/routers', 'app/models'];
  dirs.forEach((dir) => {
    fs.mkdirSync(path.join(projectPath, dir), { recursive: true });
  });

  const mainPy = `from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import main
import os

app = FastAPI(title="${projectName}", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(main.router)

@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI! 🚀"}
`;
  fs.writeFileSync(path.join(projectPath, 'main.py'), mainPy);

  const routerCode = `from fastapi import APIRouter
from datetime import datetime

router = APIRouter(prefix="/api", tags=["api"])

@router.get("/health")
async def health_check():
    return {
        "status": "OK",
        "timestamp": datetime.now().isoformat()
    }
`;
  fs.writeFileSync(
    path.join(projectPath, 'app', 'routers', 'main.py'),
    routerCode
  );

  fs.writeFileSync(path.join(projectPath, 'app', '__init__.py'), '');
  fs.writeFileSync(path.join(projectPath, 'app', 'routers', '__init__.py'), '');
  fs.writeFileSync(path.join(projectPath, 'app', 'models', '__init__.py'), '');

  const requirements = `fastapi==0.104.0
uvicorn[standard]==0.24.0
python-dotenv==1.0.0
`;
  fs.writeFileSync(path.join(projectPath, 'requirements.txt'), requirements);

  fs.writeFileSync(
    path.join(projectPath, '.env.example'),
    'PORT=8000\nENVIRONMENT=development\n'
  );
}

export async function createPythonDjangoProject(projectPath, projectName) {
  // Create basic Django project structure
  const dirs = [
    projectName,
    `${projectName}/${projectName}`,
    `${projectName}/app`,
  ];

  dirs.forEach((dir) => {
    fs.mkdirSync(path.join(projectPath, dir), { recursive: true });
  });

  // Create manage.py
  const managePy = `#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', '${projectName}.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()
`;
  fs.writeFileSync(path.join(projectPath, projectName, 'manage.py'), managePy);

  // Create settings.py
  const settingsPy = `from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-dev-key-change-in-production'

DEBUG = True

ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'app',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = '${projectName}.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = '${projectName}.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
`;
  fs.writeFileSync(
    path.join(projectPath, projectName, projectName, 'settings.py'),
    settingsPy
  );

  // Create urls.py
  const urlsPy = `from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('app.urls')),
]
`;
  fs.writeFileSync(
    path.join(projectPath, projectName, projectName, 'urls.py'),
    urlsPy
  );

  // Create wsgi.py
  const wsgiPy = `import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', '${projectName}.settings')
application = get_wsgi_application()
`;
  fs.writeFileSync(
    path.join(projectPath, projectName, projectName, 'wsgi.py'),
    wsgiPy
  );

  // Create asgi.py
  const asgiPy = `import os
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', '${projectName}.settings')
application = get_asgi_application()
`;
  fs.writeFileSync(
    path.join(projectPath, projectName, projectName, 'asgi.py'),
    asgiPy
  );

  // Create __init__.py files
  fs.writeFileSync(
    path.join(projectPath, projectName, projectName, '__init__.py'),
    ''
  );
  fs.writeFileSync(
    path.join(projectPath, projectName, 'app', '__init__.py'),
    ''
  );

  // Create app views.py
  const viewsPy = `from django.http import JsonResponse

def index(request):
    return JsonResponse({'message': 'Welcome to Django API! 🚀'})

def health(request):
    return JsonResponse({'status': 'OK'})
`;
  fs.writeFileSync(
    path.join(projectPath, projectName, 'app', 'views.py'),
    viewsPy
  );

  // Create app urls.py
  const appUrlsPy = `from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('health/', views.health, name='health'),
]
`;
  fs.writeFileSync(
    path.join(projectPath, projectName, 'app', 'urls.py'),
    appUrlsPy
  );

  // Create app apps.py
  const appsPy = `from django.apps import AppConfig

class AppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app'
`;
  fs.writeFileSync(
    path.join(projectPath, projectName, 'app', 'apps.py'),
    appsPy
  );

  // Create requirements.txt
  const requirements = `Django>=5.0.0
python-dotenv>=1.0.0
`;
  fs.writeFileSync(path.join(projectPath, 'requirements.txt'), requirements);
}
