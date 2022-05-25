import axios from 'axios'

function updateComponentStatus(that, refName, dataKey = "refreshFlagKey") {
	const ringChart = that.$refs[refName]
	if (ringChart) {
		clearTimeout(ringChart.animationHandler)
	}

	that[dataKey] = that.$createId()
}


function getData(option) {
	if (option && option.cptDataForm) {
		try {
			return JSON.parse(JSON.stringify(option.cptDataForm.dataText))
		} catch (err) {
			return option.cptDataForm.dataText
		}

	}
	return {}
}

function request(url, params) {
	console.log('url', url)
	let baseUrl = 'http://127.168.0.0:3000/'
	axios.get(baseUrl, {
		params
	}).then(res => {
		console.log('请求回来的', res)
	})
}

export {
	getData,
	updateComponentStatus,
	request
}
