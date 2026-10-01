import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Forward /api calls to the Express server in /server during development
    proxy: {
      '/api': { target: 'http://localhost:5000', changeOrigin: true },
      '/uploads/media': { target: 'http://localhost:5000', changeOrigin: true },
    },
  },
  build: {
    target: 'es2019',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: { react: ['react', 'react-dom', 'react-router-dom'] },
      },
    },
  },
})
