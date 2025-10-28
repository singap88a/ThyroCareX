// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        primaryHover: "var(--primary-hover)",
        secondary: "var(--secondary-color)",
        accent: "var(--accent-color)",
        neutral: {
          white: "var(--background)",
          gray: "var(--background-secondary)",
        },
      },
    },
  },
  plugins: [],
}
