import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'host',
      remotes: {
        remote1: 'http://localhost:5174/assets/remoteEntry.js',
        remote2: 'http://localhost:5175/assets/remoteEntry.js'
      },
        server: {
            cors: {
                origin: '*', // or specifically ['http://localhost:5173']
                methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
            },
        },
      shared: {
        vue: { singleton: true, eager: true, requiredVersion: '^3.4.0' },
        'vue-router': { singleton: true, eager: true, requiredVersion: '^4.3.0' }
      }
    })
  ],
  server: {
      cors: {
          origin: '*', // or specifically ['http://localhost:5173']
          methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      },
    port: 5173
  }
});
