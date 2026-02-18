/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'ui-sans-serif', 'system-ui'],
        sans: ['"Manrope"', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: {
          DEFAULT: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
      },
    },
  },
  plugins: [],
}
