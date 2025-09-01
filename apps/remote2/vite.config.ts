import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'remote2',
      filename: 'remoteEntry.js',
      exposes: {
        './RemoteApp': './src/RemoteApp.vue',
      },
        server: {
            cors: {
                origin: '*', // or specifically ['http://localhost:5173']
                methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
            },
        },
      shared: {
        vue: { singleton: true, eager: true, requiredVersion: '^3.4.0' },
        'vue-router': { singleton: true, eager: true, requiredVersion: '^4.3.0' },
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
    port: 5175,
  },
});
