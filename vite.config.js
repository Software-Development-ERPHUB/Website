import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dev only: serve public/demo/<slug>/index.html at the clean folder URL /demo/<slug>/
// (static hosts such as Nginx/Apache already do this in production).
const demoFolders = {
  name: 'demo-folders',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      const m = req.url && req.url.match(/^\/demo\/([\w-]+)\/?(\?.*)?$/)
      if (m) req.url = `/demo/${m[1]}/index.html${m[2] || ''}`
      next()
    })
  },
}

export default defineConfig({
  plugins: [react(), demoFolders],
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
