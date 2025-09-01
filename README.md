# Vue 3 + Vite Module Federation Example (Host + Two Remotes)

This repository demonstrates a Vue 3 + Vite setup using Module Federation with:
- A Host application using PrimeVue for layout and navigation
- Two Remote applications (remote1, remote2)
- A dynamic sidebar in the Host that is configured by the currently loaded Remote via a simple HostAPI

Features:
- Topbar (PrimeVue Menubar) to navigate between Home, Remote 1, and Remote 2
- Sidebar (PrimeVue PanelMenu) populated/overridden by the active Remote
- Each Remote exposes a component via Module Federation and provides multiple routes (via `:page` param) reflected in the Host sidebar

## Project structure

```
apps/
  host/
  remote1/
  remote2/
```

## Getting started

1) Install dependencies at the repository root (uses npm workspaces):

```
npm install
```

2) In three separate terminals, start the remotes first, then the host:

```
# Terminal 1
npm run dev:remote1

# Terminal 2
npm run dev:remote2

# Terminal 3
npm run dev:host
```

- remote1 runs on http://localhost:5174
- remote2 runs on http://localhost:5175
- host runs on http://localhost:5173

Open http://localhost:5173 in your browser.

## How it works

- The Host configures Module Federation remotes in `apps/host/vite.config.ts`:
  - `remote1: 'http://localhost:5174/assets/remoteEntry.js'`
  - `remote2: 'http://localhost:5175/assets/remoteEntry.js'`
- The Host exposes a simple API on `window.HostAPI` (see `apps/host/src/hostApi.ts`):
  - `setSidebar(items)` to populate/override the sidebar menu model
  - `clearSidebar()` to clear it (e.g., when navigating to Home)
  - `navigate(to)` to allow remotes to programmatically navigate the Host router
- The Host uses PrimeVue components:
  - Topbar: Menubar with Home / Remote1 / Remote2 entries
  - Sidebar: PanelMenu bound to the model provided by the active Remote
- Host routes (apps/host/src/router.ts):
  - `/` -> Home
  - `/remote1/:page?` -> loads remote1 exposed component
  - `/remote2/:page?` -> loads remote2 exposed component
- Each Remote exposes `./RemoteApp` via federation and uses the current route param `page` to render different subviews. On mount it calls `window.HostAPI.setSidebar([...])` to configure the Host sidebar with links pointing back to host routes like `/remote1/overview`, `/remote1/details`, etc.

## Customizing sidebar from a Remote

A Remote can set a nested menu using the following structure (compatible with PrimeVue menu model):

```ts
window.HostAPI.setSidebar([
  { label: 'Overview', icon: 'pi pi-home', to: '/remote1/overview' },
  { label: 'Details', icon: 'pi pi-list', to: '/remote1/details' },
  { label: 'Analytics', icon: 'pi pi-chart-line', items: [
      { label: 'Weekly', to: '/remote1/analytics-weekly' },
      { label: 'Monthly', to: '/remote1/analytics-monthly' }
  ] }
]);
```

The Host will render this via PrimeVue PanelMenu and `vue-router` handles navigation.

## Build

You can build all apps (remotes first, then host) with:

```
npm run build
```

## Notes
- Ensure remotes are running before the Host so the federation runtime can load their `remoteEntry.js`.
- This setup uses Vue 3, Vite 5, and `@originjs/vite-plugin-federation`.
- PrimeVue theme and icons are loaded by the Host; remotes use plain markup plus `pi` icon classes.
