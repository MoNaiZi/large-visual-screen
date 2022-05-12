import custom_text_options from '@/components/element/options/custom-text-option'

function initElement(app, name) {
	let list = [custom_text_options]
	let item = list.find(item => item.name === name)
	console.log('初始化', name)
	app.component(item.name, item)
}


function main(app, name) {
	initElement(app, name)
}

export default main
