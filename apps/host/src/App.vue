<script setup lang="ts">
import Menubar from 'primevue/menubar';
import PanelMenu from 'primevue/panelmenu';
import Button from 'primevue/button';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useSidebar } from './hostApi';

const router = useRouter();
const sidebar = useSidebar();

const topMenu = computed(() => ([
  { label: 'Home', icon: 'pi pi-home', command: () => router.push('/') },
  { label: 'Remote 1', icon: 'pi pi-box', command: () => router.push('/remote1/overview') },
  { label: 'Remote 2', icon: 'pi pi-box', command: () => router.push('/remote2/dashboard') }
]));

function test() {
  console.log('test');
}
</script>

<template>
  <div class="app-root">
    <Menubar :model="topMenu" class="p-2">
      <template #start>
        <span class="font-bold">Host App</span>
      </template>
    </Menubar>
    <div class="layout grid">
      <div class="col-12 md:col-3 lg:col-2">
        <PanelMenu v-if="sidebar.items.length" :model="sidebar.items">
          <template #item="{ item }">
            <router-link v-if="item.to" v-slot="{ href, navigate }" :to="item.to" custom>
              <a class="flex items-center cursor-pointer text-surface-700 dark:text-surface-0 px-4 py-2" :href="href" @click="navigate">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
              </a>
            </router-link>
            <a v-else class="flex items-center cursor-pointer text-surface-700 dark:text-surface-0 px-4 py-2" :href="item.url" :target="item.target">
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
              <span v-if="item.items" class="pi pi-angle-down text-primary ml-auto" />
            </a>
          </template>
        </PanelMenu>
        <div v-else class="p-3 text-500">Sidebar will be provided by the active remote.</div>
      </div>
      <div class="col-12 md:col-9 lg:col-10 p-3">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style>
.app-root {
  min-height: 100vh;
}
</style>
