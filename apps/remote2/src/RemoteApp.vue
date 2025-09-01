<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const page = computed(() => (route.params.page as string) || 'dashboard');

function configureSidebar() {
  if (typeof window !== 'undefined' && (window as any).HostAPI) {
    (window as any).HostAPI.setSidebar([
      { label: 'Dashboard', icon: 'pi pi-home', to: '/remote2/dashboard' },
      {
        label: 'Reports', icon: 'pi pi-file', items: [
          { label: 'Sales', to: '/remote2/reports-sales' },
          { label: 'Inventory', to: '/remote2/reports-inventory' }
        ]
      },
      { label: 'Settings', icon: 'pi pi-cog', to: '/remote2/settings' }
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
    <h2>Remote 2</h2>
    <p>Current page: <strong>{{ page }}</strong></p>
    <div v-if="page === 'dashboard'">
      <p>Welcome to the Remote 2 dashboard.</p>
    </div>
    <div v-else-if="page === 'reports-sales'">
      <p>Sales report content from Remote 2.</p>
    </div>
    <div v-else-if="page === 'reports-inventory'">
      <p>Inventory report content from Remote 2.</p>
    </div>
    <div v-else-if="page === 'settings'">
      <p>Settings page for Remote 2.</p>
    </div>
    <div v-else>
      <p>Unknown page. Choose an item from the sidebar.</p>
    </div>
  </section>
</template>
