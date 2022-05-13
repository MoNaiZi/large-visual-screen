<template>
	<dv-active-ring-chart :key="refreshFlagKey" :config="config" style="width:100%;height:100%" />
</template>

<script>
	export default {
		name: "dataV-activeRing",
		title: "动态环图",
		icon: 'Help',
		group: 'chart',
		props: {
			width: Number,
			height: Number,
			option: Object
		},
		watch: {
			'option.attribute': {
				handler() {
					this.loadData();
				},
				deep: true //深度监听
			},
			width() {

			},
			height() {

			}
		},
		data() {
			return {
				uuid: null,
				config: {},
				refreshFlagKey: null,
			}
		},
		created() {

		},
		methods: {

		}
	}
</script>

<style scoped>

</style>
