/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/*/client/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
