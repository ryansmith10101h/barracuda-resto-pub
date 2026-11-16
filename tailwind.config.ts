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
        // Deep Black & Charcoal base
        dark: {
          950: '#070709', // Deepest background
          900: '#0D0E12', // Surface
          850: '#13141A', // Elevated cards
          800: '#181A22', // Hover card
          750: '#222530', // Borders / subtle separators
          700: '#2C303E',
          600: '#3D4255',
        },
        // Warm Espresso Brown
        espresso: {
          950: '#0E0B09',
          900: '#17120F',
          850: '#221A15',
          800: '#2D231C',
          700: '#43342A',
          600: '#5C483A',
        },
        // Muted Bronze
        bronze: {
          DEFAULT: '#8C6F4B',
          light: '#B29168',
          hover: '#7A5F3F',
          dark: '#58432B',
          glow: 'rgba(140, 111, 75, 0.15)',
        },
        // Champagne & Restrained Gold (used with discipline)
        champagne: {
          DEFAULT: '#E5D6BA',
          light: '#F5EBD7',
          muted: '#C5B597',
        },
        gold: {
          DEFAULT: '#C6A550', // Restrained warm gold
          light: '#E4CE88',
          hover: '#B59441',
          dark: '#856A27',
          glow: 'rgba(198, 165, 80, 0.12)',
        },
        // Warm Cream Typography
        cream: {
          50: '#FAF8F3', // Primary headings
          100: '#F2EDE2', // Subheadings
          200: '#E4DCD0', // Body text
          300: '#CAC1B2', // Secondary text
          400: '#A49B8B', // Muted details
          500: '#7E7666',
        },
        // Controlled Amber Highlights
        amber: {
          accent: '#D97724',
          soft: '#E88B38',
          deep: '#9E4E10',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        display: ['var(--font-display)', 'var(--font-serif)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'subtle-glow': 'radial-gradient(circle at 50% 0%, rgba(198, 165, 80, 0.05) 0%, transparent 70%)',
        'espresso-glow': 'radial-gradient(circle at 50% 100%, rgba(45, 35, 28, 0.6) 0%, transparent 60%)',
      },
      boxShadow: {
        'bronze-sm': '0 0 15px rgba(140, 111, 75, 0.10)',
        'gold-sm': '0 0 15px rgba(198, 165, 80, 0.08)',
        'elevated': '0 12px 40px -10px rgba(0, 0, 0, 0.85)',
      },
    },
  },
  plugins: [],
};

export default config;
