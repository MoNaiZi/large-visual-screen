import {
	createRouter,
	createWebHistory
} from 'vue-router'

import edite from '@/views/edite'
import preview from '@/views/preview'

const routes = [{
		path: '/',
		name: 'edite',
		component: edite
	},
	{
		path: '/preview',
		name: 'preview',
		component: preview
	}
]


export default createRouter({
	history: createWebHistory(),
	routes
})
