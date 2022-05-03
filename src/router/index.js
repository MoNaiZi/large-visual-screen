import {
	createRouter,
	createWebHistory
} from 'vue-router'

import edite from '@/views/edite'

const routes = [{
	path: '/',
	name: 'edite',
	component: edite
}]


export default createRouter({
	history: createWebHistory(),
	routes
})
