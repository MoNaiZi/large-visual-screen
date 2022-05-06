import {
	createApp
} from 'vue'
import App from '@/App.vue'

import custom_text from '@/components/element/custom-text'


let list = [custom_text]
let resultObj = {}
const app = createApp(App)
for (let item of list) {
	app.component(item.name, item)
	const title = item.title ? item.title:'未命名组件';
	const initWidth = item.initWidth ? item.initWidth:400;
	const initHeight = item.initHeight ? item.initHeight:300;
	const group = item.group ? item.group:'default';
	resultObj[group] = resultObj[group] ? resultObj[group]:[]
	resultObj[group].push({group:group,title,name:item.name,icon:item.icon,initWidth,initHeight});
}

export default resultObj;