import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

const isDev = process.env.NODE_ENV !== 'production';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: isDev ? {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Local backend for dev
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  } : undefined,
});