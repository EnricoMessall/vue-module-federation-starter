/// <reference types="vite/client" />

declare module 'host/hostApi' {
  export type SidebarItem = {
    label: string;
    icon?: string;
    to?: string;
    items?: SidebarItem[];
  };
  export function setSidebar(items: SidebarItem[]): void;
  export function clearSidebar(): void;
  export function navigate(to: string): Promise<void> | void;
  export function useSidebar(): { items: SidebarItem[] };
}