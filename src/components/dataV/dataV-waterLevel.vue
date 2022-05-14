<template>
	<dv-water-level-pond :key="refreshFlagKey" ref="waterLevel" :config="config"
		:style="{width:width+'px',height:height+'px'}" />
</template>

<script>
	export default {
		name: "dataV-waterLevel",
		title: "水位图",
		icon: 'GobletSquareFull',
		initWidth: 120,
		initHeight: 100,
		group: 'chart',
		props: {
			width: Number,
			height: Number,
			option: Object
		},
		data() {
			return {
				config: {},
				uuid: null,
				refreshFlagKey: null
			}
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
		created() {

		},
		beforeUnmount() {
			const waterLevel = this.$refs.waterLevel
			clearTimeout(waterLevel.animationHandler)
			console.log('在卸载组件实例之前调用。在这个阶段，实例仍然是完全正常的。。')
		},
		methods: {


		}
	}
</script>

<style scoped>

</style>
