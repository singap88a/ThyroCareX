/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Colors for main app
        primary: "var(--primary-color)",
        primaryHover: "var(--primary-hover)",
        secondary: "var(--secondary-color)",
        accent: "var(--accent-color)",
        neutral: {
          white: "var(--background)",
          gray: "var(--background-secondary)",
        },
        
        // Admin Dashboard Colors - Enhanced
        admin: {
          dark: {
            bg: '#0f172a',
            card: '#1e293b',
            hover: '#334155',
            text: '#f8fafc',
            muted: '#94a3b8',
            border: '#334155',
            sidebar: '#0f172a',
            header: '#1e293b',
          },
          light: {
            bg: '#f8fafc',
            card: '#ffffff',
            hover: '#f1f5f9',
            text: '#0f172a',
            muted: '#64748b',
            border: '#e2e8f0',
            sidebar: '#ffffff',
            header: '#ffffff',
          },
          primary: 'var(--primary-color)',
          secondary: 'var(--secondary-color)',
          success: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444',
          info: '#06b6d4',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}