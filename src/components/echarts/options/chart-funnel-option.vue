<template>
	<el-form label-width="80px">
		<el-form-item label="标题名">
			<el-input v-model="data.title" />
		</el-form-item>
		<el-form-item label="标题大小">
			<el-input-number v-model="data.titleFontSize" :min="1" />
		</el-form-item>
		<el-form-item label="标题颜色">
			<el-color-picker v-model="data.titleColor" show-alpha="true" size="large" />
		</el-form-item>
		<el-form-item label="间距">
			<el-input-number v-model="data.gap" :min="1" />
		</el-form-item>
		<el-form-item label="边框大小">
			<el-input-number v-model="data.itemBorderWidth" :min="1" />
		</el-form-item>
		<el-form-item label="边框颜色">
			<el-color-picker v-model="data.itemBorderColor" show-alpha="true" size="large" />
		</el-form-item>
		<el-form-item label="字体大小">
			<el-input-number v-model="data.itemFontSize" :min="1" />
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: 'chart-funnel-option',
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
</style>
