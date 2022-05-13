<template>
	<div :id="uuid" style="width: 100%;height:100%;"></div>
</template>

<script>
	export default {
		name: "cpt-chart-tdColumn",
		title: "立体柱图",
		icon: 'SData',
		group: 'chart',
		props: {
			width: Number,
			height: Number,
			option: Object
		},
		data() {
			return {
				uuid: null,
				chartOption: {},
				chart: undefined,
				cptData: {},
			}
		},
		watch: {
			'option.attribute': {
				handler(obj, newObj) {

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
		mounted() {


		},
		methods: {
		
		}
	}
</script>

<style scoped>

</style>
