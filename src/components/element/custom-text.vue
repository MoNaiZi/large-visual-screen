<template>
	<div  style="width: 100%;height: 100%">
		<div v-if="!cptData.edite" style="width: 100%;height: 100%" :style="[main_style]">
			{{cptData.cptDataForm.dataText}}
		</div>
		<div v-else style="width: 100%;height: 100%" :style="[main_style]">
			<el-input @keyup.enter="enter" autosize :suffix-icon="Check" v-model="cptData.cptDataForm.dataText" />
		</div>
	</div>

</template>

<script>
	// import {getDataStr, pollingRefresh} from "@/utils/refreshCptData";

	export default {
		name: "custom-text",
		title: '文字框',
		icon: 'ChatLineSquare',
		initWidth: 150,
		initHeight: 40,
		group: 'basic',
		props: {
			option: Object
		},
		data() {
			return {
				cptData: {},
				id: this.$createId()
			}
		},
		computed: {
			main_style: function() {
				const option = this.option
				let result = {
					textAlign: option.attribute.textAlign,
					color: option.attribute.textColor,
					fontSize: option.attribute.textSize + 'px',
					fontStyle: option.attribute.fontStyle,
					fontWeight: option.attribute.fontWeight,
					lineHeight: option.attribute.textLineHeight + 'px',
					backgroundColor: option.attribute.bgColor,
					fontFamily: option.attribute.textFamily,
					textDecoration: option.attribute.textDecoration,
					background: option.attribute.bgColor
				}
				return result
			}
		},
		watch: {
			'option': {
				deep: true,
				handler: function() {
					// console.log('监听', this.option)
				}
			}
		},
		created() {
			// console.log('组件id', this.id, 'option', this.option)
			this.cptData = this.option
			this.init();
		},
		methods: {
			enter(){
				this.cptData.edite = false
			},
			init() {
				// pollingRefresh(this.uuid, this.option.cptDataForm, this.loadData)
			},
			loadData() {
				// getDataStr(this.option.cptDataForm).then(res => {
				//   this.cptData = res;
				// });
			}
		},
	}
</script>

<style scoped>

</style>
