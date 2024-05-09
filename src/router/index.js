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
		{
			path: '/contact',
			component: () => import('../views/Contact.vue')
		},
		{
			path: '/login',
			component: () => import('../views/Login.vue')
		},
	],
})

export default router