/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        zoho: {
          50: '#f0f4ff',
          100: '#e0eaff',
          200: '#c7d7fe',
          300: '#a5bcfd',
          400: '#8196fa',
          500: '#5f6ef5',
          600: '#4a50e8',
          700: '#3d3ecd',
          800: '#3335a5',
          900: '#2e3183',
        },
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.1), 0 0 0 1px rgba(95,110,245,0.2)',
        'card-selected': '0 0 0 2px #5f6ef5, 0 8px 24px rgba(95,110,245,0.15)',
      },
    },
  },
  plugins: [],
};
