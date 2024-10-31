import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/categories': {
        target: 'http://45.147.46.138:8080/api', // Gerçek API adresiniz
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/categories/, '/categories')
      }
    }
  }
})
