import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#070709',
          900: '#0D0E12',
          850: '#121318',
          800: '#171821',
          750: '#1E202B',
          700: '#272937',
          600: '#383B4F',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F3E5AB',
          hover: '#C29D26',
          dark: '#997A15',
          glow: 'rgba(212, 175, 55, 0.15)',
        },
        cream: {
          50: '#FCFBF7',
          100: '#F5F3EB',
          200: '#E8E5D8',
          300: '#D2CEC0',
          400: '#A8A495',
          500: '#7E7A6D',
        },
        amber: {
          accent: '#F59E0B',
          deep: '#B45309',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        display: ['var(--font-display)', 'var(--font-serif)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'subtle-glow': 'radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
      },
      boxShadow: {
        'gold-sm': '0 0 15px rgba(212, 175, 55, 0.12)',
        'gold-md': '0 0 30px rgba(212, 175, 55, 0.18)',
        'elevated': '0 10px 40px -10px rgba(0, 0, 0, 0.7)',
      },
    },
  },
  plugins: [],
};

export default config;
