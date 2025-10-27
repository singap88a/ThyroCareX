/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#14b8a6', // teal
        secondary: '#e0f2fe', // light blue
        neutral: {
          white: '#ffffff',
          gray: '#f9fafb',
        },
        accent: '#6366f1', // soft indigo
      },
    },
  },
  plugins: [],
}
