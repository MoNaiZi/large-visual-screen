<template>
	<div :id="id" style="width: 100%;height:100%;"></div>
</template>

<script>
	// import {getDataStr, pollingRefresh} from "@/utils/refreshCptData";

	export default {
		name: "chart-gauge",
		title: "仪表盘",
		icon: 'Stopwatch',
		initWidth: 300,
		initHeight: 200,
		group: 'chart',
		props: {
			width: Number,
			height: Number,
			option: Object
		},
		watch: {
			'option.attribute': {
				handler(obj, newObj) {
					this.loadChart(newObj);
				},
				deep: true //深度监听
			},
			width() {
				this.chart.resize();
			},
			height() {
				this.chart.resize();
			}
		},
		data() {
			return {
				id: this.$createId(),
				chartOption: {},
				chart: null,
				cptData: 0
			}
		},
		created() {
			this.cptData = this.$getData(this.option)
		},
		mounted() {
			this.chart = this.$echarts.init(document.getElementById(this.id), 'dark');
			this.loadChart(this.option.attribute)
		},
		methods: {
			loadChart(attribute) {
				const that = this;
				that.chartOption = {
					backgroundColor: '',
					tooltip: {
						formatter: '{a} <br/>{b} : {c}%'
					},
					series: [{
						name: 'Pressure',
						type: 'gauge',
						startAngle: attribute.startAngle,
						endAngle: attribute.endAngle,
						radius: '100%',
						min: attribute.min,
						max: attribute.max,
						axisLabel: {
							distance: attribute.labelDistance,
							color: '#999',
							fontSize: attribute.labelSize
						},
						axisTick: {
							show: true,
							length: attribute.tickLength,
							distance: attribute.lineDistance,
						},
						splitLine: {
							distance: attribute.lineDistance,
							length: attribute.tickLength * 1.5,
							lineStyle: {
								width: 2,
								color: '#999'
							}
						},
						axisLine: {
							lineStyle: {
								width: attribute.lineWidth,
								color: [
									[0.3, attribute.color1],
									[0.7, attribute.color2],
									[1, attribute.color3]
								]
							}
						},
						progress: {
							show: true,
							width: attribute.lineWidth,
						},
						pointer: {
							length: attribute.pointerLength + '%',
							width: attribute.pointerWidth,
						},
						itemStyle: {
							color: attribute.itemColor
						},
						title: {
							show: true,
							fontSize: attribute.titleSize,
							color: attribute.titleColor
						},
						detail: {
							valueAnimation: true,
							formatter: '{value}',
							color: attribute.detailColor,
							fontSize: attribute.detailSize,
						},
						data: [{
							value: that.cptData,
							name: attribute.title
						}]
					}]
				}
				that.chart.setOption(that.chartOption);
			}
		}
	}
</script>

<style scoped>

</style>
