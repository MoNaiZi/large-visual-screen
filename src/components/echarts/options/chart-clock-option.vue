<template>
	<el-form label-width="100px" size="mini" style="display: flex;flex-direction: column;align-items: center;">
		<el-form-item  label="表盘宽度">
			<el-input-number v-model="data.axisLineWidth" :min="1" :max="200" />
		</el-form-item>
		<el-form-item label="表盘字体">
			<el-input-number v-model="data.axisLabelSize" :min="5" :max="200" />
		</el-form-item>
		<el-form-item label="字体边距">
			<el-input-number v-model="data.axisLabelDistance" :min="1" :max="100" />
		</el-form-item>
		<el-form-item label="刻度边距">
			<el-input-number v-model="data.splitLineDistance" :min="1" :max="100" />
		</el-form-item>
		<el-form-item label="表盘外圈颜色">
			<el-color-picker v-model="data.hourPointerColor" show-alpha />
		</el-form-item>
		<el-form-item label="表盘字体颜色">
			<el-color-picker v-model="data.hourPointerColor" show-alpha />
		</el-form-item>
		<el-form-item label="时针颜色">
			<el-color-picker v-model="data.hourPointerColor" show-alpha />
		</el-form-item>
		<el-form-item label="分针颜色">
			<el-color-picker v-model="data.hourPointerColor" show-alpha />
		</el-form-item>
		<el-form-item label="秒针颜色">
			<el-color-picker v-model="data.hourPointerColor" show-alpha />
		</el-form-item>


	</el-form>
</template>

<script>
	export default {
		name: "chart-clock-option",
		props: {
			attribute: Object
		},
		data() {
			return {
				data: this.attribute
			}
		}
	}
</script>

<style>
	.el-form-item__label {
		/* width: 80px !important; */
	}
</style>
