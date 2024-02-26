/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode class variant
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: 'Roboto Mono, monospace'
    },
    extend: {},
  },
  plugins: [],
}
