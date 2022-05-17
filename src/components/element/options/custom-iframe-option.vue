<template>
	<el-form label-width="80px" size="mini">
		<el-form-item label="url">
			<el-input v-model="data.url"></el-input>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		name: "custom-iframe-option",
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
