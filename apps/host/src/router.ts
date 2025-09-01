import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from './views/Home.vue';
import { clearSidebar } from './hostApi';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: Home },
  {
    path: '/remote1/:page?',
    name: 'remote1',
    component: () => import('remote1/RemoteApp'),
    props: true,
  },
  {
    path: '/remote2/:page?',
    name: 'remote2',
    component: () => import('remote2/RemoteApp'),
    props: true,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  if (to.name === 'home') {
    clearSidebar();
  }
  next();
});
