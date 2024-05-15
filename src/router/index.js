import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/flota',
    component: () => import('../views/Flota.vue')
  },
  {
    path: '/opinions',
    component: () => import('../views/Opinions.vue')
  },
  {
    path: '/contact',
    component: () => import('../views/Contact.vue')
  },
  {
    path: '/history',
    // name: 'History',
    component: () => import('../views/History.vue'),
    meta: { requiresAuth: true }
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;


