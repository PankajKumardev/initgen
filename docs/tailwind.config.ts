import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
    },
    extend: {
      colors: {
        background: 'hsl(210 20% 98%)',
        foreground: 'hsl(222 47% 11%)',
        primary: {
          DEFAULT: 'hsl(222 89% 60%)',
          foreground: '#ffffff',
        },
        muted: 'hsl(210 16% 93%)',
        border: 'hsl(214 32% 91%)',
        card: {
          DEFAULT: '#ffffff',
          foreground: 'hsl(222 47% 11%)',
        },
      },
      borderRadius: {
        xl: '1rem',
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'SFMono-Regular',
          'Consolas',
          'Liberation Mono',
          'Menlo',
          'monospace',
        ],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
