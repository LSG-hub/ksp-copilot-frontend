import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Slate serves the built SPA at the domain root. In dev, proxy /server to the
// live Catalyst function to sidestep CORS while developing locally.
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    proxy: {
      '/server': {
        target: 'https://ksp-crime-db-60074558778.development.catalystserverless.in',
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
