<template>
	<el-row class="top_tab">
		<el-col :span="12" :class="currentTab === 1 ? 'no_active':''">
			<div @click="currentTab = 0">组件</div>
		</el-col>
		<el-col :span="12" :class="currentTab === 0 ? 'no_active':''">
			<div @click="currentTab = 1">图层</div>
		</el-col>
	</el-row>
	<template v-if="currentTab === 0">
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
			
			<template v-if="group.opened">
				<el-row :gutter="2" v-for="(item,index) in group.list" :key="index">
					<el-col :span="12">
						<div class="item" draggable="true" :config="JSON.stringify(item)" @dragstart="dragStart">
							<el-icon :size="30" style="margin-bottom: 10px;">
								<component :is="item.icon">
								</component>
							</el-icon>
							{{item.title}}
						</div>
					</el-col>
				</el-row>
			</template>
			
		</template>
	</template>
	<template v-else>
		图层
		<div>
			<div>

			</div>
			<div>

			</div>
		</div>
	</template>
</template>

<script>
	import initElementList from './initElement'
	import options from './options'
	export default {
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
						opened: true,
						list: []
					},
					{
						name: '地图',
						opened: true,
						list: []
					}
				],
			}
		},
		created() {
			console.log('options', options)
			let list = [...initElementList]
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
		position: fixed;
		z-index: 7;
		background: #353f50;
		box-shadow: 0 1px 3px #2b3340;
	}
</style>
