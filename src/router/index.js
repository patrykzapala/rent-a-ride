import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
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
	],
})

export default router