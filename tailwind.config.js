/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00B4D8',
        primaryHover: '#00A2C2',
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
