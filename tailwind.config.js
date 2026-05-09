/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{svelte,js,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Newcastle-inspired color scheme with dark theme
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#121212',
          900: '#080808',
          950: '#020202'
        },
        accent: {
          light: '#a3d5ff', // Baby blue
          DEFAULT: '#60a5fa', // Medium blue
          dark: '#1e40af' // Dark blue
        },
        gold: {
          light: '#fef3c7',
          DEFAULT: '#f59e0b',
          dark: '#d97706'
        }
      },
      borderRadius: {
        lg: '0.5rem'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
