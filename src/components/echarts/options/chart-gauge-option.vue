<template>
	<el-form label-width="100px" size="mini">
		<el-form-item label="标题">
			<el-input v-model="data.title" />
		</el-form-item>
		<el-form-item label="标题字体">
			<el-input-number v-model="data.titleSize" :min="1" :max="100" :step="1" />
		</el-form-item>
		<el-form-item label="标题颜色">
			<el-color-picker v-model="data.titleColor" />
		</el-form-item>
		<el-form-item label="最小值">
			<el-input-number v-model="data.min" />
		</el-form-item>
		<el-form-item label="最大值">
			<el-input-number v-model="data.max" />
		</el-form-item>
		<el-form-item label="起始角度">
			<el-slider v-model="data.startAngle" :min="-360" :max="360" :step="1" />
		</el-form-item>
		<el-form-item label="结束角度">
			<el-slider v-model="data.endAngle" :min="-360" :max="360" :step="1" />
		</el-form-item>
		<el-form-item label="表盘宽度">
			<el-input-number v-model="data.lineWidth" :min="1" :max="100" :step="1" />
		</el-form-item>
		<el-form-item label="表盘颜色1">
			<el-color-picker v-model="data.color1" />
		</el-form-item>
		<el-form-item label="表盘颜色2">
			<el-color-picker v-model="data.color2" />
		</el-form-item>
		<el-form-item label="表盘颜色3">
			<el-color-picker v-model="data.color3" />
		</el-form-item>
		<el-form-item label="刻度边距">
			<el-input-number v-model="data.lineDistance" :min="-10" :max="100" :step="1" />
		</el-form-item>
		<el-form-item label="刻度长度">
			<el-input-number v-model="data.tickLength" :min="1" :max="100" :step="1" />
		</el-form-item>
		<el-form-item label="刻度值边距">
			<el-input-number v-model="data.labelDistance" :min="-10" :max="100" :step="1" />
		</el-form-item>
		<el-form-item label="刻度字体">
			<el-input-number v-model="data.labelSize" :min="1" :max="100" :step="1" />
		</el-form-item>
		<el-form-item label="指针长度">
			<el-input-number v-model="data.pointerLength" :min="1" :max="120" :step="1" />
		</el-form-item>
		<el-form-item label="指针宽度">
			<el-input-number v-model="data.pointerWidth" :min="1" :max="120" :step="1" />
		</el-form-item>
		<el-form-item label="指针颜色">
			<el-color-picker v-model="data.itemColor" />
		</el-form-item>
		<el-form-item label="数值字体">
			<el-input-number v-model="data.detailSize" :min="2" :max="120" :step="1" />
		</el-form-item>
		<el-form-item label="数值颜色">
			<el-color-picker v-model="data.detailColor" />
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: "chart-gauge-option",
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

<style scoped>

</style>
