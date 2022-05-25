import {
	createApp
} from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import dataV from '@jiaminghi/data-view'
import * as echarts from 'echarts';
import {
	updateComponentStatus,
	getData,
	request
} from './utils/utils'

//注册echarts地图
import chinaGeoJson from '@/assets/map/china.json'
echarts.registerMap('china', chinaGeoJson);


console.log('request', request())

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

// initComponents(app)
// app.config.performance = true
app.config.globalProperties.$createId = createId
app.config.globalProperties.$updateComponentStatus = updateComponentStatus
app.config.globalProperties.$getData = getData
app.config.globalProperties.$app = app
app.config.globalProperties.$echarts = echarts



for (let [key, component] of Object.entries(ElementPlusIconsVue)) {
	// console.log('key',key)
	app.component(key, component)
}

app.use(dataV)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
