<template>
	<el-form label-width="100px" size="mini">
		<el-form-item label="样式">
			<el-select v-model="data.decorationType" placeholder="请选择">
				<el-option v-for="item in decorationTypes" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="颜色1">
			<el-color-picker v-model="data.color1" show-alpha />
		</el-form-item>
		<el-form-item label="颜色2">
			<el-color-picker v-model="data.color2" show-alpha />
		</el-form-item>

		<div v-show="data.decorationType === 'dv-decoration-7'
      || data.decorationType === 'dv-decoration-9' || data.decorationType === 'dv-decoration-11'
      || data.decorationType === 'dv-decoration-12'">
			<el-form-item label="文本">
				<el-input v-model="data.text" />
			</el-form-item>
			<el-form-item label="颜色3">
				<el-color-picker v-model="data.textColor" show-alpha />
			</el-form-item>
		</div>

	</el-form>
</template>

<script>
	export default {
		name: "dataV-decoration-option",
		props: {
			attribute: Object
		},
		data() {
			return {
				data: this.attribute,
				decorationTypes: [{
						label: '样式1',
						value: 'dv-decoration-1'
					},
					{
						label: '样式2',
						value: 'dv-decoration-2'
					},
					{
						label: '样式3',
						value: 'dv-decoration-3'
					},
					{
						label: '样式4',
						value: 'dv-decoration-4'
					},
					{
						label: '样式5',
						value: 'dv-decoration-5'
					},
					{
						label: '样式6',
						value: 'dv-decoration-6'
					},
					{
						label: '样式7',
						value: 'dv-decoration-7'
					},
					{
						label: '样式8',
						value: 'dv-decoration-8'
					},
					{
						label: '样式9',
						value: 'dv-decoration-9'
					},
					{
						label: '样式10',
						value: 'dv-decoration-10'
					},
					{
						label: '样式11',
						value: 'dv-decoration-11'
					},
					{
						label: '样式12',
						value: 'dv-decoration-12'
					},
				]
			}
		}
	}
</script>

<style scoped>

</style>
