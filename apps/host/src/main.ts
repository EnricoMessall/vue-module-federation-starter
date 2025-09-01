import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import App from './App.vue';
import { router } from './router';
import { installHostAPI } from './hostApi';
import Menubar from 'primevue/menubar';
import PanelMenu from 'primevue/panelmenu';
import Button from 'primevue/button';

// Create app
const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.component('Menubar', Menubar);
app.component('PanelMenu', PanelMenu);
app.component('Button', Button);
app.use(router);

// Install HostAPI with router navigate binding
installHostAPI(router);

app.mount('#app');
