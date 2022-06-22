import axios from 'axios'
// import Qs from 'qs'
import {
	ElMessage
} from "element-plus";

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
	console.log('req', req)
	const method = req.method
	if (method === 'post') {
		console.log('req.data', req.data)
		// req.data = Qs.stringify(req.data)
		req.data = JSON.stringify(req.data)

		req.headers = {
			'Content-Type': 'application/json'
		};
	} else if (method === 'get') {
		const params = {
			id: req.id
		}
		req.params = params;
	}

	return req
}, error => Promise.reject(error))
//响应拦截器
axios.interceptors.response.use(response => {
	return response
}, error => Promise.reject(error))

function request(url = '/', method = 'get', data) {
	let baseUrl = 'http://127.168.0.0:3000' + url
	return axios[method](baseUrl, data).then(res => {
		console.log('请求回来的', res)
		const resultData = res.data
		return resultData
	}).catch(err => {
		const code = err.code
		let msg = ''
		switch (code) {
			case "ERR_NETWORK":
				msg = "服务器网络错误"
				break
			default:
				msg = '请求失败'
				break
		}
		err.msg = msg
		return err
	})
}



function asyncUpImg() {
	let input = document.createElement("input");
	input.type = "file";
	return new Promise(resolve => {
		input.onchange = function (e) {
			let files = e.path[0].files || [];
			let type = "warning";
			let message = "上传图片失败";
			if (files.length) {
				const img = URL.createObjectURL(files[0]);
				resolve(img)
				type = "success";
				message = "上传图片成功";
			}
			ElMessage({
				type,
				message,
			});
		};
		let event = new MouseEvent("click");
		input.dispatchEvent(event);
	})
}

function setLocalStorage(designData, list) {
	designData = encodeURIComponent(JSON.stringify(designData));
	list = encodeURIComponent(JSON.stringify(list));
	localStorage.setItem("designData", designData);
	localStorage.setItem("list", list);
}
export {
	getData,
	updateComponentStatus,
	request,
	asyncUpImg,
	setLocalStorage
}
