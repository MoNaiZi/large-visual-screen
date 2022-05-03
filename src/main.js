import {
	createApp
} from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for ( let [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}
app.use(router)
app.use(ElementPlus)
app.mount('#app')
