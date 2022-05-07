import {
	createApp
} from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import initComponents from '@/components/index'

function createRandomString(length, possibleString) {
	let text = ''
	const possible = possibleString || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length))
	}

	return text
}

function createId(length = 12) {
	return createRandomString(length)
}


const app = createApp(App)
initComponents(app)
app.config.globalProperties.$createId = createId
for (let [key, component] of Object.entries(ElementPlusIconsVue)) {
	// console.log('key',key)
	app.component(key, component)
}


app.use(router)
app.use(ElementPlus)
app.mount('#app')
