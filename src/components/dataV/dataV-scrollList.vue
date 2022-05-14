<template>
	<dv-scroll-ranking-board :config="config" ref="scrollList" :style="{width:width+'px',height:height+'px'}" />
</template>

<script>
	export default {
		name: "dataV-scrollList",
		title: "滚动列表",
		icon: 'Finished',
		group: 'chart',
		props: {
			width: Number,
			height: Number,
			option: Object
		},
		data() {
			return {
				config: {},
				uuid: null
			}
		},
		watch: {
			'option.attribute': {
				handler() {

				},
				deep: true //深度监听
			},
		},
		created() {

		},
		beforeUnmount() {
			const scrollList = this.$refs.scrollList
			clearTimeout(scrollList.animationHandler)
			console.log('在卸载组件实例之前调用。在这个阶段，实例仍然是完全正常的。。')
		},
		methods: {

		}
	}
</script>

<style scoped>

</style>
