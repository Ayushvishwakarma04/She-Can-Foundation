/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // This line is essential for dark mode
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}