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
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateX(-50%) translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateX(-50%) translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.3s ease-out both',
      },
    },
  },
  plugins: [],
}
