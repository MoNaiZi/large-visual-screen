//element
import custom_button_option from '@/components/element/options/custom-button-option'
import custom_carousel_option from '@/components/element/options/custom-carousel-option'
import custom_iframe_option from '@/components/element/options/custom-iframe-option'
import custom_image_option from '@/components/element/options/custom-image-option'
import custom_text_option from '@/components/element/options/custom-text-option'
let elementList = [
	custom_button_option,
	custom_carousel_option,
	custom_iframe_option,
	custom_image_option,
	custom_text_option
]
//dataV
import dataV_activeRingr_option from '@/components/dataV/options/dataV-activeRing-option'
import dataV_border_option from '@/components/dataV/options/dataV-border-option'
import dataV_decoration_option from '@/components/dataV/options/dataV-decoration-option'
import dataV_digitalFlop_option from '@/components/dataV/options/dataV-digitalFlop-option'
import dataV_percentPond_option from '@/components/dataV/options/dataV-percentPond-option'
import dataV_scrollList_option from '@/components/dataV/options/dataV-scrollList-option'
import dataV_scrollTable_option from '@/components/dataV/options/dataV-scrollTable-option'
import dataV_waterLevel_option from '@/components/dataV/options/dataV-waterLevel-option'

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

//charts
import chart_clock_option from '@/components/echarts/options/chart-clock-option'
import chart_column_option from '@/components/echarts/options/chart-column-option'
import chart_gauge_option from '@/components/echarts/options/chart-gauge-option'
import chart_line_option from '@/components/echarts/options/chart-line-option'
import chart_mapGc_option from '@/components/echarts/options/chart-mapGc-option'
import chart_mapMigrate_option from '@/components/echarts/options/chart-mapMigrate-option'
import chart_pie_option from '@/components/echarts/options/chart-pie-option'
import chart_tdColumn_option from '@/components/echarts/options/chart-tdColumn-option'
let charts = [
	chart_clock_option,
	chart_column_option,
	chart_gauge_option,
	chart_line_option,
	chart_mapGc_option,
	chart_mapMigrate_option,
	chart_pie_option,
	chart_tdColumn_option
]

function main(app, name) {
	try {
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
