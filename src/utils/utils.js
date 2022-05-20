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

// export default {
// 	getData,
// 	 updateComponentStatus
// }

module.exports = {
	getData,
	updateComponentStatus
}
