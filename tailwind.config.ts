import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

/**
 * Palette echoes the AI Incident Database / Responsible AI Collaborative look:
 * a deep navy chrome, a confident blue accent, and clean neutral surfaces.
 */
const config: Config = {
  content: [
    './src/**/*.{ts,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#001934',
          50: '#e7edf3',
          800: '#062c4d',
          900: '#001934',
          950: '#000f20',
        },
        brand: {
          DEFAULT: '#2563eb',
          50: '#eff6ff',
          100: '#dbeafe',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
      fontFamily: {
        sans: [
          'var(--font-sans)',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '70rem',
      },
    },
  },
  plugins: [typography],
};

export default config;
