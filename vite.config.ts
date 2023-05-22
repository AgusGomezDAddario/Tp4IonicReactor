import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy(),
  ],
  build: {
    outDir: 'dist', // Nombre del directorio de salida deseado
  },
  optimizeDeps: {
    exclude: [`@ionic/pwa-elements/loader`],
  },
});