<template>
	<el-form label-width="100px" size="mini">
		<el-form-item label="边框粗细">
			<el-input-number :min="1" :max="100" v-model="data.borderWidth" />
		</el-form-item>
		<el-form-item label="边框圆角">
			<el-input-number :min="0" :max="100" v-model="data.borderRadius" />
		</el-form-item>
		<el-form-item label="内边距">
			<el-input-number :min="0" :max="100" v-model="data.borderGap" />
		</el-form-item>
		<el-form-item label="局部渐变">
			<el-switch v-model="data.localGradient" />
		</el-form-item>
		<el-form-item label="线条粗细">
			<el-input-number :min="0" :max="50" v-model="data.lineWidth" />
		</el-form-item>
		<el-form-item label="线条间隔">
			<el-input-number :min="0" :max="20" v-model="data.lineSpace" />
		</el-form-item>
		<!--    <el-form-item label="颜色1">
      <el-color-picker v-model="data.colors[0]" show-alpha/>
    </el-form-item>
    <el-form-item label="颜色2">
      <el-color-picker v-model="data.colors[1]" show-alpha/>
    </el-form-item>-->
	</el-form>
</template>

<script>
	export default {
		name: "dataV-percentPond-option",
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
