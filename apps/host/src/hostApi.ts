import { reactive, readonly } from 'vue';
import type { Router } from 'vue-router';

export type SidebarItem = {
  label: string;
  icon?: string;
  to?: string;
  items?: SidebarItem[];
};

const state = reactive({
  items: [] as SidebarItem[],
});

export function useSidebar() {
  return readonly(state);
}

export function setSidebar(items: SidebarItem[]) {
  state.items.splice(0, state.items.length, ...items);
}

export function clearSidebar() {
  state.items.splice(0, state.items.length);
}

export function installHostAPI(router: Router) {
  const api = {
    setSidebar,
    clearSidebar,
    navigate: (to: string) => router.push(to),
  } as const;
  (window as any).HostAPI = api;
  return api;
}
