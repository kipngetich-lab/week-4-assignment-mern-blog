import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic' // Important for React 17
    })
  ],
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer')
      ]
    }
  },
  optimizeDeps: {
    exclude: ['js-big-decimal']
  },
  server: {
    watch: {
      usePolling: true
    }
  }
});