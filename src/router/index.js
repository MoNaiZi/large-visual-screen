import {
	createRouter,
	createWebHistory
} from 'vue-router'

import edite from '@/views/edite'
import preview from '@/views/preview'
import login from '@/views/login'
import index from '@/views/index'

const routes = [
	{
		path: '/:catchAll(.*)',
		name: '/',
		redirect: '/',
		// component: edite
	},
	{
		path: '/',
		name: 'index',
		component: index
	},
	{
		path: '/edite',
		name: 'edite',
		component: edite
	},
	{
		path: '/preview',
		name: 'preview',
		component: preview
	},
	{
		path: '/login',
		name: 'login',
		component: login
	}
]


export default createRouter({
	history: createWebHistory(),
	routes
})
