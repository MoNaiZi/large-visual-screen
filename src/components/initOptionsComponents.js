//element
import custom_text_options from '@/components/element/options/custom-text-option'

//dataV
import dataV_activeRingr_option from '@/components/dataV/options/dataV-activeRing-option'
import dataV_border_option from '@/components/dataV/options/dataV-border-option'
import dataV_decoration_option from '@/components/dataV/options/dataV-decoration-option'
import dataV_digitalFlop_option from '@/components/dataV/options/dataV-digitalFlop-option'
import dataV_percentPond_option from '@/components/dataV/options/dataV-percentPond-option'
import dataV_scrollList_option from '@/components/dataV/options/dataV-scrollList-option'
import dataV_scrollTable_option from '@/components/dataV/options/dataV-scrollTable-option'
import dataV_waterLevel_option from '@/components/dataV/options/dataV-waterLevel-option'

//charts
import chart_clock_option from '@/components/echarts/options/chart-clock-option'


function main(app, name) {
	try {
		let charts = [
			chart_clock_option
		]
		let dataVlist = [
			dataV_activeRingr_option,
			dataV_border_option,
			dataV_decoration_option,
			dataV_digitalFlop_option,
			dataV_percentPond_option,
			dataV_scrollList_option,
			dataV_scrollTable_option,
			dataV_waterLevel_option,
		]
		let elementList = [
			custom_text_options
		]
		let list = [
			...charts,
			...dataVlist,
			...elementList
		]
		console.log('注册组件', name)
		let item = list.find(item => item.name === name)
		if (!item) throw '没有找到该功能配置'

		app.component(item.name, item)
		return true
	} catch (err) {
		return err
	}

}

export default main
