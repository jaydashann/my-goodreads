import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  
  return {
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          // secure: false,
          // ws: true
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    },
    plugins: [
      react(), 
      tailwindcss()
    ],
  };
});
