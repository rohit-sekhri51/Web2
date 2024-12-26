/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        purple: {
          500: "#5046e4",
          300: "#e1e6ff"
        }
      }
    },
  },
  plugins: [],
}

