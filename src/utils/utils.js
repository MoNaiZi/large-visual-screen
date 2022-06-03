import axios from 'axios'
// import qs from 'qs'

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



//请求拦截器
axios.interceptors.request.use(req => {
	// console.log('req111111', req)
	// if (req.method === 'post') {
	// 	req.data = qs.stringify(req.data)
	// 	// req.headers = {
	// 	// 	'Content-Type': 'application/x-www-form-urlencoded'
	// 	// };
	// }
	return req
}, error => Promise.reject(error))
//响应拦截器
axios.interceptors.response.use(response => {
	return response
}, error => Promise.reject(error))

function request(url = '/', method = 'get') {
	let baseUrl = 'http://127.168.0.0:3000' + url
	// let formData = new FormData()

	// for (let key in params) {
	// 	formData.append(key, params[key])
	// }
	let params = new URLSearchParams()
	params.append('aaa', 'bbbb')
	axios[method](baseUrl, params).then(res => {
		console.log('请求回来的', res)
	})
}

export {
	getData,
	updateComponentStatus,
	request
}
