<template>
	<el-row class="top_tab">
		<el-col :span="12" :class="currentTab === 1 ? 'no_active':''">
			<div @click="currentTab = 0">组件</div>
		</el-col>
		<el-col :span="12" :class="currentTab === 0 ? 'no_active':''">
			<div @click="currentTab = 1">图层</div>
		</el-col>
	</el-row>
	<div v-show="currentTab === 0">
		<template v-for="(group,groupIndex) in groupList" :key="groupIndex">
			<el-row class="tab_item" @click="openGroup(groupIndex)">
				<el-col :span="8">{{group.name}}</el-col>
				<el-col :span="2" :offset="13">
					<el-icon>
						<component :is="group.opened?'ArrowDownBold':'ArrowRightBold'">
						</component>
					</el-icon>
				</el-col>
			</el-row>

			<div v-show="group.opened">
				<el-row :gutter="2">
					<el-col :span="12" v-for="(item,index) in group.list" :key="index">
						<div class="item" draggable="true" :config="JSON.stringify(item)" @dragstart="dragStart">
							<el-icon :size="30" style="margin-bottom: 10px;">
								<component :is="item.icon">
								</component>
							</el-icon>
							{{item.title}}
						</div>
					</el-col>
				</el-row>
			</div>

		</template>
	</div>
	<div  v-show="currentTab === 1">
		<div v-show="selectList.length === 0" style="text-align: center;line-height: 50px;">
			无图层
		</div>
		<el-row v-for="(item,index) in selectList" :key="index" class="selectedItem"
			:style="{background: selectIndex === index ? '#3F4B5F':'#353f50'}">
			<el-col :span="4" style="text-align: center">
				<el-icon>
					<component :is="item.icon">
					</component>
				</el-icon>
			</el-col>
			<el-col :span="15" @click="selectIndexFn(index)">{{item.title}}</el-col>
			<el-col :span="5" style="text-align: center">
				<el-icon>
					<component :is="'CopyDocument'">
					</component>
				</el-icon>
				<el-icon>
					<component :is="'Delete'">
					</component>
				</el-icon>

			</el-col>
		</el-row>
	</div>
</template>

<script>
	import initElementList from './initElement'
	import initDataV from './initDataV'
	import initEcharts from './initEcharts'
	import options from './options'
	export default {
		props: {
			selectList: {
				type: Array,
				default: () => {
					return []
				}
			},
			selectIndex: Number
		},
		data() {
			return {
				currentTab: 0,
				groupList: [{
						name: '基础',
						groupName: 'basic',
						opened: true,
						list: []
					},
					{
						name: '图表',
						groupName: 'chart',
						opened: true,
						list: []
					},
					{
						name: '地图',
						groupName: 'map',
						opened: true,
						list: []
					}
				],
			}
		},
		created() {
			console.log('options', options)
			let list = [...initElementList, ...initDataV, ...initEcharts]
			for (let item of list) {
				console.log('item', item)
				this.$app.component(item.name, item)
				let groupIndex = this.groupList.findIndex(j => j.groupName === item.group)
				if (groupIndex != -1) {
					this.groupList[groupIndex].list.push(item)
				}

			}

		},
		methods: {
			selectIndexFn(index) {
				this.$emit('selectIndexFn', index)
			},
			openGroup(index) {
				this.groupList[index].opened = !this.groupList[index].opened
			},
			dragStart(e) {
				let dom = e.currentTarget.cloneNode(true);
				console.log('dom', dom)
				this.$emit('dragStart', dom);
			}

		}
	}
</script>

<style>
	.selectedItem {
		line-height: 45px;
		cursor: pointer;
		box-shadow: 0 1px 3px #2b3340 inset;
	}

	.item {
		background-color: rgb(63, 75, 95);
		height: 80px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 16px;
	}

	.tab_item {
		height: 50px;
		line-height: 50px;
		display: flex;
		align-items: center;
		margin-top: 9px;
	}

	.top_tab {
		width: 100%;
		height: 40px;
		text-align: center;
		line-height: 40px;
		cursor: pointer;
		z-index: 7;
		background: #353f50;
		box-shadow: 0 1px 3px #2b3340;
	}
</style>
