<template>
	<dv-digital-flop :config="flopConfig" ref="digitalFlop" style="width:100%;height:100%;" />
</template>

<script>
	export default {
		name: "dataV-digitalFlop",
		title: "数字翻牌器",
		icon: 'DataAnalysis',
		initWidth: 256,
		initHeight: 80,
		group: 'basic',
		props: {
			width: Number,
			height: Number,
			option: Object
		},
		data() {
			return {
				uuid: null,
				flopConfig: {
					number: [999]
				}
			}
		},
		watch: {
			'option.attribute': {
				handler() {

				},
				deep: true //深度监听
			},
			width() {

			}
		},
		created() {

		},
		methods: {

		},
		beforeUnmount() {
			const digitalFlop = this.$refs.digitalFlop
			clearTimeout(digitalFlop.animationHandler)
			console.log('在卸载组件实例之前调用。在这个阶段，实例仍然是完全正常的。。')
		}
	}
</script>

<style scoped>

</style>
