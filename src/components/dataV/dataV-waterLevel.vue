<template>
	<dv-water-level-pond :key="refreshFlagKey" ref="waterLevel" :config="attribute"
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
				attribute: {},
				refreshFlagKey: ''
			}
		},
		watch: {
			'option': {
				handler() {
					this.$updateComponentStatus(this, 'waterLevel')
				},
				deep: true //深度监听
			},
			width() {
				this.$updateComponentStatus(this, 'waterLevel')
			},
			height() {
				this.$updateComponentStatus(this, 'waterLevel')
			}
		},
		created() {
			this.attribute.data = this.$getData(this.option)
		},
		beforeUnmount() {
			this.$updateComponentStatus(this, 'waterLevel')
			console.log('在卸载组件实例之前调用。在这个阶段，实例仍然是完全正常的。。')
		},
		methods: {


		}
	}
</script>

<style scoped>

</style>
