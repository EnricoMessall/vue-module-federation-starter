import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import RemoteApp from './RemoteApp.vue';
import Overview from './views/Overview.vue';
import Details from './views/Details.vue';
import AnalyticsWeekly from './views/AnalyticsWeekly.vue';
import AnalyticsMonthly from './views/AnalyticsMonthly.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: RemoteApp,
    children: [
      { path: '', redirect: 'overview' },
      { path: 'overview', component: Overview },
      { path: 'details', component: Details },
      { path: 'analytics-weekly', component: AnalyticsWeekly },
      { path: 'analytics-monthly', component: AnalyticsMonthly },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
