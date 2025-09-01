<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Overview from './views/Overview.vue';
import Details from './views/Details.vue';
import AnalyticsWeekly from './views/AnalyticsWeekly.vue';
import AnalyticsMonthly from './views/AnalyticsMonthly.vue';

const route = useRoute();
const page = computed(() => (route.params.page as string) || 'overview');
const hasChildRoute = computed(() => route.matched.length > 1);

const componentMap: Record<string, any> = {
  overview: Overview,
  details: Details,
  'analytics-weekly': AnalyticsWeekly,
  'analytics-monthly': AnalyticsMonthly,
};

let hostApi: any;

async function configureSidebar() {
  const mod = await import('host/hostApi');
  hostApi = (mod as any)?.default ?? mod;

  const sidebar = [
    { label: 'Overview', icon: 'pi pi-home', to: '/remote1/overview' },
    { label: 'Details', icon: 'pi pi-list', to: '/remote1/details' },
    {
      label: 'Analytics', icon: 'pi pi-chart-line', items: [
        { label: 'Weekly', to: '/remote1/analytics-weekly' },
        { label: 'Monthly', to: '/remote1/analytics-monthly' },
      ]
    }
  ];

  hostApi?.setSidebar(sidebar as any);
}

onMounted(() => {
  configureSidebar();
});
</script>

<template>
  <section>
    <router-view v-if="hasChildRoute" />
    <div v-else>
      <component v-if="componentMap[page]" :is="componentMap[page]" />
      <p v-else>Unknown page. Choose an item from the sidebar.</p>
    </div>
  </section>
</template>
