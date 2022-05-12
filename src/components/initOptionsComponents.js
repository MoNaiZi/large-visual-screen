import custom_text_options from './element/options/custom-text-option'
// const files = require.context('@/components/element/options', false, /\.vue$/)

async function initElement(app, name) {

	// console.log('files', files)
	// let src = '@/components/element/options/custom-text-option'
	// console.log('name', name, require('./element/options/' + name + '.vue'))
	// let custom_text_options = (await import('./element/options/custom-text-option')).default
	// console.log('custom_text_options', custom_text_options)
	let list = [custom_text_options]
	// console.log('list', list)
	
	
	let item = list.find(item => item.name === name)
	app.component(item.name, item)
}



function main(app, name) {
	initElement(app, name)
}

export default main
