import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'host',
      filename: 'remoteEntry.js',
      exposes: {
        './hostApi': './src/hostApi.ts',
      },
      remotes: {
        remote1: 'http://localhost:5174/assets/remoteEntry.js',
        remote2: 'http://localhost:5175/assets/remoteEntry.js'
      },
      shared: {
        vue: { requiredVersion: false },
        'vue-router': { requiredVersion: false }
      }
    })
  ],
    build: {
        target: 'esnext',
        cssCodeSplit: false,
    },
  server: {
      cors: {
          origin: '*', // or specifically ['http://localhost:5173']
          methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      },
    port: 5173
  }
});
