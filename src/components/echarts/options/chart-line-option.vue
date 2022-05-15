<template>
	<el-form label-width="100px" size="mini">
		<el-form-item label="标题">
			<el-input v-model="data.title" />
		</el-form-item>
		<el-form-item label="标题颜色">
			<el-color-picker v-model="data.titleTextColor" show-alpha />
		</el-form-item>
		<el-form-item label="副标题">
			<el-input v-model="data.subtext" />
		</el-form-item>
		<el-form-item label="副标题颜色">
			<el-color-picker v-model="data.subtextColor" show-alpha />
		</el-form-item>
		<el-form-item label="标题位置(左)">
			<el-input v-model="data.titleLeft" />
		</el-form-item>
		<el-form-item label="标题位置(上)">
			<el-input v-model="data.titleTop" />
		</el-form-item>
		<el-form-item label="x轴文字">
			<el-switch v-model="data.xLabelShow" active-text="开" inactive-text="关" />
		</el-form-item>
		<el-form-item label="x轴字体颜色">
			<el-color-picker v-model="data.xLabelColor" show-alpha />
		</el-form-item>
		<el-form-item label="x轴线显示">
			<el-switch v-model="data.xLineShow" active-text="开" inactive-text="关" />
		</el-form-item>
		<el-form-item label="x轴线颜色">
			<el-color-picker v-model="data.xLineColor" show-alpha />
		</el-form-item>
		<el-form-item label="x轴刻度线">
			<el-switch v-model="data.xTickShow" active-text="开" inactive-text="关" />
		</el-form-item>
		<el-form-item label="y轴文字">
			<el-switch v-model="data.yLabelShow" active-text="开" inactive-text="关" />
		</el-form-item>
		<el-form-item label="y轴字体颜色">
			<el-color-picker v-model="data.yLabelColor" show-alpha />
		</el-form-item>
		<el-form-item label="y轴线显示">
			<el-switch v-model="data.yLineShow" active-text="开" inactive-text="关" />
		</el-form-item>
		<el-form-item label="y轴颜色">
			<el-color-picker v-model="data.yLineColor" show-alpha />
		</el-form-item>
		<el-form-item label="y轴网格线">
			<el-switch v-model="data.yGridLineShow" active-text="开" inactive-text="关" />
		</el-form-item>
		<el-form-item label="y轴刻度线">
			<el-switch v-model="data.yTickShow" active-text="开" inactive-text="关" />
		</el-form-item>
		<el-form-item label="平滑曲线">
			<el-switch v-model="data.smooth" active-text="开" inactive-text="关" />
		</el-form-item>

		<el-form-item label="渐变颜色1">
			<el-color-picker v-model="data.areaColor1" show-alpha />
		</el-form-item>
		<el-form-item label="渐变颜色2">
			<el-color-picker v-model="data.areaColor2" show-alpha />
		</el-form-item>
		<el-form-item label="渐变颜色3">
			<el-color-picker v-model="data.areaColor3" show-alpha />
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: "chart-line-option",
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
