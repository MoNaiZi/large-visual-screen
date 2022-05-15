<template>
	<div>
		<el-form label-width="100px" size="mini">
			<el-form-item label="标题">
				<el-input v-model="data.chartTitle" />
			</el-form-item>
			<el-form-item label="标题位置(左)">
				<el-input v-model="data.titleLeft" />
			</el-form-item>
			<el-form-item label="标题位置(上)">
				<el-input v-model="data.titleTop" />
			</el-form-item>
			<el-form-item label="标题颜色">
				<el-color-picker v-model="data.titleTextColor" show-alpha />
			</el-form-item>
			<el-form-item label="x轴">
				<el-switch v-model="data.xAxisShow" active-text="开" inactive-text="关" />
			</el-form-item>
			<div v-show="data.xAxisShow">
				<el-form-item label="x轴线显示">
					<el-switch v-model="data.xLineShow" active-text="开" inactive-text="关" />
				</el-form-item>
				<el-form-item label="x轴线颜色">
					<el-color-picker v-model="data.xLineColor" show-alpha />
				</el-form-item>
				<el-form-item label="x轴刻度线">
					<el-switch v-model="data.xTickShow" active-text="开" inactive-text="关" />
				</el-form-item>
				<el-form-item label="x轴字体颜色">
					<el-color-picker v-model="data.xLabelColor" show-alpha />
				</el-form-item>
				<el-form-item label="x轴字体倾斜">
					<el-slider v-model="data.xFontRotate" :min="-180" :max="180" />
				</el-form-item>
			</div>
			<el-form-item label="y轴">
				<el-switch v-model="data.yAxisShow" active-text="开" inactive-text="关" />
			</el-form-item>
			<div v-show="data.yAxisShow">
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
				<el-form-item label="y轴字体颜色">
					<el-color-picker v-model="data.yLabelColor" show-alpha />
				</el-form-item>
			</div>
			<el-form-item label="颜色渐变">
				<el-switch v-model="data.gradualColor" active-text="开" inactive-text="关" />
			</el-form-item>
			<div v-if="data.gradualColor">
				<el-form-item label="柱顶颜色">
					<el-color-picker v-model="data.barColor1" show-alpha />
				</el-form-item>
				<el-form-item label="柱中颜色">
					<el-color-picker v-model="data.barColor2" show-alpha />
				</el-form-item>
				<el-form-item label="柱底颜色">
					<el-color-picker v-model="data.barColor3" show-alpha />
				</el-form-item>
			</div>
			<div v-else>
				<el-form-item label="柱体颜色">
					<el-color-picker v-model="data.barColor" show-alpha />
				</el-form-item>
			</div>
			<el-form-item label="柱体背景" v-show="data.barType === 'bar'">
				<el-switch v-model="data.barBgShow" active-text="开" inactive-text="关" />
			</el-form-item>
			<el-form-item label="柱体宽度">
				<el-input-number v-model="data.barWidth" :min="1" :max="100" />
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: "chart-tdColumn-option",
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
