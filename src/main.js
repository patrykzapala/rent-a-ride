import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App)
  .use(router) // Dodanie routera do aplikacji
  .mount('#app');

  