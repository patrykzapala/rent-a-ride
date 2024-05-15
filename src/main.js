import { createApp, ref } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

// Używamy ref, aby utworzyć zmienną reaktywną dla stanu logowania
const isLoggedIn = ref(false);

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn.value) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

app.config.globalProperties.isLoggedIn = isLoggedIn; // Dodajemy zmienną do globalnych właściwości aplikacji

app.use(router);
app.mount('#app');
