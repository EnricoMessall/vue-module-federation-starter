<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const page = computed(() => (route.params.page as string) || 'overview');

function configureSidebar() {
  if (typeof window !== 'undefined' && (window as any).HostAPI) {
    (window as any).HostAPI.setSidebar([
      { label: 'Overview', icon: 'pi pi-home', to: '/remote1/overview' },
      { label: 'Details', icon: 'pi pi-list', to: '/remote1/details' },
      {
        label: 'Analytics', icon: 'pi pi-chart-line', items: [
          { label: 'Weekly', command: '/remote1/analytics-weekly' },
          { label: 'Monthly', to: '/remote1/analytics-monthly' },
        ]
      }
    ]);
  }
}

onMounted(() => {
  configureSidebar();
});

onBeforeUnmount(() => {
  if ((window as any).HostAPI) {
    (window as any).HostAPI.clearSidebar();
  }
});
</script>

<template>
  <section>
    <h2>Remote 1</h2>
    <p>Current page: <strong>{{ page }}</strong></p>
    <div v-if="page === 'overview'">
      <p>This is the overview page provided by Remote 1.</p>
    </div>
    <div v-else-if="page === 'details'">
      <p>Details content from Remote 1.</p>
    </div>
    <div v-else-if="page === 'analytics-weekly'">
      <p>Weekly analytics from Remote 1.</p>
    </div>
    <div v-else-if="page === 'analytics-monthly'">
      <p>Monthly analytics from Remote 1.</p>
    </div>
    <div v-else>
      <p>Unknown page. Choose an item from the sidebar.</p>
    </div>
  </section>
</template>
