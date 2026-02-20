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
        display: ['"Newsreader"', '"Iowan Old Style"', '"Palatino Linotype"', 'serif'],
        sans: ['"Space Grotesk"', '"Noto Sans"', '"Helvetica Neue"', 'sans-serif'],
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
