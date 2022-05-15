<template>
	<el-form label-width="100px" size="mini">
		<el-form-item label="标题">
			<el-input v-model="data.titleText" />
		</el-form-item>
		<el-form-item label="标题颜色">
			<el-color-picker v-model="data.titleColor" show-alpha />
		</el-form-item>
		<el-form-item label="标题大小">
			<el-input-number v-model="data.titleFontSize" :min="4" :max="100" />
		</el-form-item>
		<el-form-item label="副标题">
			<el-input v-model="data.subtext" />
		</el-form-item>
		<el-form-item label="副标题颜色">
			<el-color-picker v-model="data.subTitleColor" show-alpha />
		</el-form-item>
		<el-form-item label="副标题大小">
			<el-input-number v-model="data.subTitleFontSize" :min="4" :max="100" />
		</el-form-item>
		<el-form-item label="标题位置(左)">
			<el-input v-model="data.titleLeft" />
		</el-form-item>
		<el-form-item label="标题位置(上)">
			<el-input v-model="data.titleTop" />
		</el-form-item>
		<el-form-item label="说明">
			<el-input v-model="data.seriesName" />
		</el-form-item>
		<el-form-item label="地图字颜色">
			<el-color-picker v-model="data.geoLabelColor" show-alpha />
		</el-form-item>
		<el-form-item label="地图字大小">
			<el-input-number v-model="data.geoLabelSize" :min="4" :max="100" />
		</el-form-item>
		<el-form-item label="允许缩放">
			<el-switch v-model="data.roam" active-text="开" inactive-text="关" />
		</el-form-item>
		<el-form-item label=">100文字">
			<el-input v-model="data.piecesLabel1" />
		</el-form-item>
		<el-form-item label=">100颜色">
			<el-color-picker v-model="data.piecesColor1" show-alpha />
		</el-form-item>
		<el-form-item label="10 - 100文字">
			<el-input v-model="data.piecesLabel2" />
		</el-form-item>
		<el-form-item label="10-100颜色">
			<el-color-picker v-model="data.piecesColor2" show-alpha />
		</el-form-item>
		<el-form-item label="1-9文字">
			<el-input v-model="data.piecesLabel3" />
		</el-form-item>
		<el-form-item label="1-9颜色">
			<el-color-picker v-model="data.piecesColor3" show-alpha />
		</el-form-item>
		<el-form-item label="0-1文字">
			<el-input v-model="data.piecesLabel4" />
		</el-form-item>
		<el-form-item label="0-1颜色">
			<el-color-picker v-model="data.piecesColor4" show-alpha />
		</el-form-item>
		<el-form-item label="0文字">
			<el-input v-model="data.piecesLabel5" />
		</el-form-item>
		<el-form-item label="0颜色">
			<el-color-picker v-model="data.piecesColor5" show-alpha />
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: "chart-mapGc-option",
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
