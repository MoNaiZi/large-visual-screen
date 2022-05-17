<template>
	<div style="position: relative">
		<el-form label-width="100px" size="mini">
			<el-form-item label="颜色1">
				<el-color-picker v-model="tempColor1" show-alpha @change="changeColor" />
			</el-form-item>
			<el-form-item label="颜色2">
				<el-color-picker v-model="tempColor2" show-alpha @change="changeColor" />
			</el-form-item>
			<el-form-item label="样式">
				<el-select v-model="data.shape" placeholder="请选择">
					<el-option label="矩形" value="rect" />
					<el-option label="圆角矩形" value="roundRect" />
					<el-option label="圆形" value="round" />
				</el-select>
			</el-form-item>
			<el-form-item label="波浪数量">
				<el-input-number v-model="data.waveNum" :min="1" />
			</el-form-item>
			<el-form-item label="波浪高度">
				<el-input-number v-model="data.waveHeight" :min="1" />
			</el-form-item>
			<el-form-item label="波浪透明度">
				<el-input-number v-model="data.waveOpacity" :min="0" :max="2" />

			</el-form-item>
			<el-form-item label="信息格式化">
				<el-input type="textarea" v-model="data.formatter" />
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: "dataV-waterLevel-option",
		props: {
			attribute: Object
		},
		data() {
			return {
				data: this.attribute,
				tempColor1: '#00BAFF',
				tempColor2: '#3DE7C9',
			}
		},
		methods: {
			changeColor() {
				this.data.colors = [this.tempColor1, this.tempColor2]
				this.data.refresh = !this.attribute.refresh
			}
		}
	}
</script>

<style scoped>

</style>
