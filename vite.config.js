import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://thyrocarex.runasp.net',
        changeOrigin: true,
        secure: false, // In case of SSL issues, though target is https
      }
    }
  }
})
