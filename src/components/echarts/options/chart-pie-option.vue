<template>
	<div>
		<el-form label-width="100px" size="mini">
			<el-form-item label="标题">
				<el-input v-model="data.chartTitle" />
			</el-form-item>
			<el-form-item label="标题位置(X)">
				<el-input v-model="data.titleX" />
			</el-form-item>
			<el-form-item label="标题位置(Y)">
				<el-input v-model="data.titleY" />
			</el-form-item>
			<el-form-item label="标题大小">
				<el-input-number v-model="data.titleFontSize" :min="10" :max="50" />
			</el-form-item>
			<el-form-item label="标题颜色">
				<el-color-picker v-model="data.titleTextColor" />
			</el-form-item>
			<el-form-item label="副标题">
				<el-input v-model="data.subtext" />
			</el-form-item>
			<el-form-item label="副标题颜色">
				<el-color-picker v-model="data.subtextColor" />
			</el-form-item>
			<el-form-item label="图例显示">
				<el-switch v-model="data.legendShow" active-text="开" inactive-text="关" />
			</el-form-item>
			<div v-show="data.legendShow">
				<el-form-item label="图例位置(X)">
					<el-input v-model="data.legendX" />
				</el-form-item>
				<el-form-item label="图例位置(Y)">
					<el-input v-model="data.legendY" />
				</el-form-item>
				<el-form-item label="图例布局方式">
					<el-select v-model="data.orient">
						<el-option label="纵向" value="vertical" />
						<el-option label="横向" value="horizontal" />
					</el-select>
				</el-form-item>
				<el-form-item label="图例字体">
					<el-input-number v-model="data.legendFontSize" :min="2" :max="120" />
				</el-form-item>
				<el-form-item label="图例文字颜色">
					<el-color-picker v-model="data.legendTextColor" />
				</el-form-item>
			</div>
			<el-form-item label="南丁格尔图">
				<el-select v-model="data.roseType">
					<el-option label="不展示" value="false" />
					<el-option label="圆心角" value="radius" />
					<el-option label="扇区" value="area" />
				</el-select>
			</el-form-item>
			<el-form-item label="外环大小%">
				<el-input-number v-model="data.radiusOutside" :min="2" :max="120" />
			</el-form-item>
			<el-form-item label="内环大小%">
				<el-input-number v-model="data.radiusInside" :min="0" :max="100" />
			</el-form-item>
			<el-form-item label="圆角">
				<el-slider v-model="data.borderRadius" :min="0" :max="120" />
			</el-form-item>
			<el-form-item label="大饼颜色">
				<div>
					<div v-for="(item,index) in data.pieColor" :key="index" class="colorBlock"
						:style="{backgroundColor:item}">
						<div class="delTag" @click="delColor(index)">
							<i class="el-icon-delete"></i>
						</div>
					</div>
					<el-color-picker v-model="tempColor" show-alpha @change="addColor" />
				</div>
			</el-form-item>
			<el-form-item label="label位置">
				<el-select v-model="data.labelPosition">
					<el-option label="内部" value="inside" />
					<el-option label="外侧" value="outside" />
					<el-option label="中心" value="center" />
				</el-select>
			</el-form-item>
			<el-form-item label="label字体">
				<el-input-number v-model="data.labelFontSize" :min="2" :max="120" />
			</el-form-item>
			<el-form-item label="label颜色">
				<el-color-picker v-model="data.labelColor" />
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: "chart-pie-option",
		props: {
			attribute: Object
		},
		data() {
			return {
				tempColor: '',
				data: this.attribute
			}
		},
		methods: {
			addColor() {
				this.data.pieColor.push(this.tempColor)
			},
			delColor(index) {
				this.data.pieColor.splice(index, 1);
			}
		}
	}
</script>

<style scoped>
	.colorBlock {
		float: left;
		width: 25px;
		height: 25px;
		margin-right: 2px;
	}

	.colorBlock:hover .delTag {
		display: inline-block
	}

	.delTag {
		width: 100%;
		height: 100%;
		display: none;
		text-align: center;
		font-size: 18px;
		color: #fff
	}
</style>
