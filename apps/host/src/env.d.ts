/// <reference types="vite/client" />

declare module 'remote1/RemoteApp' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'remote2/RemoteApp' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare global {
  interface Window {
    HostAPI: {
      setSidebar: (items: any[]) => void;
      clearSidebar: () => void;
      navigate: (to: string) => void;
    };
  }
}
