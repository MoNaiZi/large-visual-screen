<template>
	<dv-active-ring-chart :key="refreshFlagKey" ref="ringChart" :config="attribute" style="width:100%;height:100%" />
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
			'option': {
				handler() {
					this.$updateComponentStatus(this, 'ringChart')
				},
				deep: true //深度监听
			},
			width() {
				this.$updateComponentStatus(this, 'ringChart')
			},
			height() {
				this.$updateComponentStatus(this, 'ringChart')
			}
		},
		data() {
			return {
				attribute: this.option.attribute,
				refreshFlagKey: this.$createId(),
			}
		},
		created() {
			if (this.option && this.option.cptDataForm) {
				this.attribute.data = JSON.parse(this.option.cptDataForm.dataText)
			}

		},
		beforeUnmount() {
			this.$updateComponentStatus(this, 'ringChart')
			console.log('在卸载组件实例之前调用。在这个阶段，实例仍然是完全正常的。。')
		},
		unmounted() {

			// clearTimeout(animationHandler)
			console.log('卸载组件实例后调用。调用此钩子时，组件实例的所有指令都被解除绑定，所有事件侦听器都被移除，所有子组件实例被卸载。')
		},
		methods: {

		}
	}
</script>

<style>
	.active-ring-info {
		top: -72px !important;
	}

	.active-ring-name {
		height: 0px !important;
		overflow: visible !important;
	}
</style>
