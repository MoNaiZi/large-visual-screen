import custom_text from '@/components/element/custom-text'
let list = [custom_text]

const init = function(app) {
	for (let item of list) {
		app.component(item.name, item)
	}
}

export default init
