<template>
	<component :key="refreshFlagKey" :is="option.attribute.decorationType"
		:style="{width:width+'px',height:height+'px',color: option.attribute.textColor}"
		:color="[option.attribute.color1, option.attribute.color2]">{{option.attribute.text}}</component>
</template>

<script>
	export default {
		name: "dataV-decoration",
		title: "炫酷装饰",
		icon: 'MagicStick',
		initWidth: 256,
		initHeight: 191,
		group: 'basic',
		props: {
			width: Number,
			height: Number,
			option: Object
		},
		watch: {
			option: {
				handler() {

				},
				deep: true //深度监听
			},
			width() {

			}
		},
		data() {
			return {
				refreshFlagKey: ""
			}
		}
	}
</script>

<style scoped>

</style>
