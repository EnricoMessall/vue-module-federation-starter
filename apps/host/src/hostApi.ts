import {reactive, readonly} from 'vue';
import type {Router} from 'vue-router';

export type SidebarItem = {
  label: string;
  icon?: string;
  to?: string;
  items?: SidebarItem[];
};

const state = reactive({
  items: [] as SidebarItem[],
});

let boundRouter: Router | undefined;

export function useSidebar() {
  return readonly(state);
}

export function setSidebar(items: SidebarItem[]) {
  state.items.splice(0, state.items.length, ...items);
}

export function clearSidebar() {
  state.items.splice(0, state.items.length);
}

export function navigate(to: string) {
  if (boundRouter) return boundRouter.push(to);
}

export function bindRouter(router: Router) {
  boundRouter = router;
}

// Provide a default export object for easier MF consumption
const api = {
  setSidebar,
  clearSidebar,
  navigate,
  useSidebar,
} as const;

export default api;

export function installHostAPI(router: Router) {
  bindRouter(router);
  // Assign to window for backward compatibility / non-MF consumers
  (window as any).HostAPI = api;
  return api;
}
