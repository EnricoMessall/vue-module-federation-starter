import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'remote1',
      filename: 'remoteEntry.js',
      exposes: {
        './RemoteApp': './src/RemoteApp.vue',
      },
      remotes: {
        host: 'http://localhost:5173/assets/remoteEntry.js',
      },
      shared: {
        vue: { requiredVersion: false },
        'vue-router': { requiredVersion: false },
      },
    }),
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
    port: 5174,
  },
});
