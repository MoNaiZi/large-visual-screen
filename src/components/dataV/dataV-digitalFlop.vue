<template>
	<dv-digital-flop :config="flopConfig" style="width:100%;height:100%;" />
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
				flopConfig: {}
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

		}
	}
</script>

<style scoped>

</style>
