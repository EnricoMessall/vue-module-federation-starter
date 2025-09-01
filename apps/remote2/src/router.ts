import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import RemoteApp from './RemoteApp.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/dashboard' },
  { path: '/:page?', component: RemoteApp, props: true },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
