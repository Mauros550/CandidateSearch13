import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000, // Optional, use Render's PORT variable during deployment
  },
  preview: {
    allowedHosts: [
      'candidatesearch13.onrender.com',  
      'localhost',
    ],
  },
});



//envDir: './env',