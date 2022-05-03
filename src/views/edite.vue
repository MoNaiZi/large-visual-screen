<template>
	<div>
		<el-container>
			<el-header>
				<div style="display: flex;justify-content: space-between;">
					<div class="logo">
						<img src="@/assets/logo.png" alt="">
					</div>
					<div style="display: flex;justify-content: space-between;">
						<div>导入</div>
						<div>导出</div>
						<div>
							<el-icon>
								<delete />
							</el-icon>
						</div>
						<div>
							<el-icon>
								<tools></tools>
							</el-icon>
						</div>
						<div>
							<el-button type="primary" plain>保存</el-button>
						</div>
						<div>
							<el-button type="primary" plain>预览</el-button>
						</div>
					</div>
				</div>
			</el-header>
			<el-container>
				<el-aside width="220px">
					<el-row class="top_tab">
						<el-col :span="12" :class="currentTab === 1 ? 'no_active':''">
							<div @click="currentTab = 0">组件</div>
						</el-col>
						<el-col :span="12" :class="currentTab === 0 ? 'no_active':''">
							<div @click="currentTab = 1">图层</div>
						</el-col>
					</el-row>
					<template v-if="currentTab === 0">
						<el-row class="tab_item">
							<el-col :span="8">基础</el-col>
							<el-col :span="2" :offset="13">
								<el-icon>
									<arrow-down-bold />
								</el-icon>
							</el-col>
						</el-row>
						<el-row :gutter="2">
							<el-col :span="12">
								<div class="item">
									<el-icon :size="30" style="margin-bottom: 10px;">
										<chat-line-square />
									</el-icon>
									文字框
								</div>
							</el-col>
							<el-col :span="12">
								<div class="item">
									<el-icon :size="30" style="margin-bottom: 10px;">
										<chat-line-square />
									</el-icon>
									文字框
								</div>
							</el-col>
						</el-row>
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
				</el-aside>
				<el-main :style="{background: 'url('+defaultBg+') repeat'}">Main</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import {
		Delete,
		Tools,
		ArrowDownBold,
		ChatLineSquare
	} from '@element-plus/icons-vue'
	export default {
		components: {
			Delete,
			Tools,
			ArrowDownBold,
			ChatLineSquare
		},
		data() {
			return {
				currentTab: 0,
				defaultBg: require('@/assets/main_bg.png')
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

	.no_active {
		background: #3F4B5F;
	}

	.el-tabs__content {
		padding: 32px;
		color: #6b778c;
		font-size: 32px;
		font-weight: 600;
	}

	.el-tabs--right .el-tabs__content,
	.el-tabs--left .el-tabs__content {
		height: 100%;
	}

	.el-container {
		height: 100vh;
	}

	.el-header,
	.el-footer {
		text-align: center;
		line-height: 60px;
		background: #353F50;
		color: #fff;
		box-shadow: 0 2px 5px #2b3340 inset;
	}

	.el-aside {
		background-color: #353F50;
		color: #fff;
		text-align: center;
		box-shadow: 0 2px 5px #2b3340 inset;
	}

	.el-main {
		color: #333;
		text-align: center;
		line-height: 160px;
	}
</style>
