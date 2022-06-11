import {
	createRouter,
	createWebHistory
} from 'vue-router'

import edite from '@/views/edite'
import preview from '@/views/preview'
import login from '@/views/login'

const routes = [{
		path: '/',
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
