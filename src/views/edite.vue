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
								<component :is="'Delete'">
								</component>
							</el-icon>
						</div>
						<div>
							<el-icon>
								<component :is="'Tools'">
								</component>
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
					<sidebar></sidebar>
				</el-aside>
				<el-main :style="{background: 'url('+defaultBg+') repeat'}">Main</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import sidebar from '@/components/sidebar'
	export default {
		components: {
			sidebar
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
