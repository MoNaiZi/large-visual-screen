<template>
	<div :id="uuid" style="width: 100%;height:100%;"></div>
</template>

<script>
	export default {
		name: "chart-pie",
		title: "饼图",
		icon: 'PieChart',
		group: 'chart',
		props: {
			width: Number,
			height: Number,
			option: Object
		},
		data() {
			return {
				uuid: '',
				chartOption: {},
				chart: undefined,
				cptData: []
			}
		},
		watch: {
			'option.attribute': {
				handler() {

				},
				deep: true //深度监听
			},
			width() {

			},
			height() {

			}
		},
		created() {

		},
		mounted() {},
		methods: {

		}
	}
</script>

<style scoped>

</style>
