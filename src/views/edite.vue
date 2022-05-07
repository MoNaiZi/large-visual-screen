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
					<sidebar @dragStart="dragStart"></sidebar>
				</el-aside>
				<el-main @dragover="allowDrop" @drop="drop"
					:style="{background: 'url('+defaultBg+') repeat',height:1920 / designData.scaleX * designData.scaleY+'px',transform: 'scale('+containerScale+')'}">
					<div v-for="(item,index) in list" :key="index" class="cptDiv" :style="{width:Math.round(item.w)+'px',
                  height:Math.round(item.h)+'px',
                  top:Math.round(item.y)+'px',left:Math.round(item.x)+'px',
                  zIndex: currentCptIndex === index ? 1800 : item.x}">
						<div v-resize="'move'" class="activeMask"
							:style="currentCptIndex === index ? {border:'1px solid #B6BFCE'}:{}" />
						<div style="width: 100%;height: 100%" @click="selectItem(index)">
							<component :is="item.name" :ref="item.name+index" :width="Math.round(item.w)"
								:height="Math.round(item.h)" :option="item.options">
							</component>
						</div>
						<div class="delTag">
							<i class="el-icon-copy-document" @click.stop="copyCpt(item)" />
							<i style="margin-left: 4px" class="el-icon-delete" @click.stop="delCpt(item,index)" />
						</div>
						<div v-show="currentCptIndex === index" style="top: -3px;left: -3px;cursor: se-resize"
							class="resizeTag" v-resize="'lt'" />
						<div v-show="currentCptIndex === index" style="top: -3px;left: 48%;cursor: s-resize"
							class="resizeTag" v-resize="'t'" />
						<div v-show="currentCptIndex === index" style="top: -3px;right: -4px;cursor: ne-resize"
							class="resizeTag" v-resize="'rt'" />
						<div v-show="currentCptIndex === index" style="top: 48%;right: -4px;cursor: w-resize"
							class="resizeTag" v-resize="'r'" />
						<div v-show="currentCptIndex === index" style="bottom: -4px;right: -4px;cursor: se-resize"
							class="resizeTag" v-resize="'rb'" />
						<div v-show="currentCptIndex === index" style="bottom: -4px;left: 48%;cursor: s-resize"
							class="resizeTag" v-resize="'b'" />
						<div v-show="currentCptIndex === index" style="bottom: -4px;left: -3px;cursor: ne-resize"
							class="resizeTag" v-resize="'lb'" />
						<div v-show="currentCptIndex === index" style="top: 48%;left: -3px;cursor: w-resize"
							class="resizeTag" v-resize="'l'" />
					</div>

				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import sidebar from '@/components/sidebar'
	import options from '@/components/options'
	import {
		createApp
	} from 'vue'
	const app = createApp({})
	export default {
		components: {
			sidebar
		},
		created() {},
		data() {
			return {
				designData: {
					id: '',
					title: '我的大屏',
					scaleX: 16,
					scaleY: 9,
					version: '',
					bgColor: '#2B3340',
					simpleDesc: '',
					bgImg: '',
					viewCode: '',
					components: []
				},
				currentCptIndex: 0,
				currentComponents: {
					option: undefined
				},
				list: [],
				dom: {},
				currentTab: 0,
				defaultBg: require('@/assets/main_bg.png'),
				containerScale: 1,
			}
		},
		methods: {
			selectItem(index) {
				console.log('index', index)
				this.currentCptIndex = index
			},
			allowDrop(e) {
				e.preventDefault()
			},
			dragStart(dom) {
				this.dom = dom;
				dom.draggable = false;
			},
			drop(e) {
				console.log('释放', e)
				const MyComponent = app.component('Tools')
				console.log('MyComponent', this, MyComponent)
				let config = JSON.parse(this.dom.getAttribute('config'));
				const that = this
				console.log('config.name', config.name)
				let data = {
					groupTag: config.group,
					title: config.title,
					icon: config.icon,
					name: config.name,
					z: 100,
					x: Math.round(e.offsetX),
					y: Math.round(e.offsetY),
					w: config.initWidth,
					h: config.initHeight,
					id: that.$createId()
				}
				const group = options[config.group];
				if (group && group.options[config.name + '-option']) {
					const configOptions = group.options[config.name + '-option']
					if (configOptions.cptDataForm) { //将静态数据、api、sql用三个字段存储，配置项未填写apiUrl字段和sql字段在此处赋默认值
						if (!configOptions.cptDataForm.apiUrl) {
							configOptions.cptDataForm.apiUrl = '/design/test'
						}
						if (!configOptions.cptDataForm.sql) {
							configOptions.cptDataForm.sql = 'select username from sys_user limit 1'
						}
					}
					data.options = JSON.parse(JSON.stringify(configOptions))
				} else {
					this.$message.error("未再options.js中查找到" + config.group + "." + config.name + "-option的自定义属性")
					return;
				}
				console.log('data', data)
				this.list.push(data);
			}
		},
		directives: {
			resize(el, binding) {
				let containerScale = 1
				el.onmousedown = function(e) {
					const scaleClientX = e.clientX / containerScale;
					const scaleClientY = e.clientY / containerScale;
					const rbX = scaleClientX - el.parentNode.offsetWidth;
					const rbY = scaleClientY - el.parentNode.offsetHeight;
					const ltX = scaleClientX + el.parentNode.offsetWidth;
					const ltY = scaleClientY + el.parentNode.offsetHeight;
					const disX = scaleClientX - el.parentNode.offsetLeft;
					const disY = scaleClientY - el.parentNode.offsetTop;
					let w, h, x, y;
					document.onmousemove = function(me) {
						const meScaleClientX = me.clientX / containerScale
						const meScaleClientY = me.clientY / containerScale
						if (binding.value === 'move') {
							x = meScaleClientX - disX;
							y = meScaleClientY - disY;
							el.parentNode.style.left = x + 'px';
							el.parentNode.style.top = y + 'px';
						} else {
							switch (binding.value) {
								case 'lt':
									w = ltX - meScaleClientX;
									h = ltY - meScaleClientY;
									x = meScaleClientX - disX;
									y = meScaleClientY - disY;
									el.parentNode.style.left = x + 'px';
									el.parentNode.style.top = y + 'px';
									break;
								case 't':
									h = ltY - meScaleClientY;
									y = meScaleClientY - disY;
									el.parentNode.style.top = y + 'px';
									break;
								case 'rt':
									w = meScaleClientX - rbX;
									h = ltY - meScaleClientY;
									y = meScaleClientY - disY;
									el.parentNode.style.top = y + 'px';
									break;
								case 'r':
									w = meScaleClientX - rbX;
									break;
								case 'rb':
									w = meScaleClientX - rbX;
									h = meScaleClientY - rbY;
									break;
								case 'b':
									h = meScaleClientY - rbY;
									break;
								case 'lb':
									w = ltX - meScaleClientX;
									h = meScaleClientY - rbY;
									x = meScaleClientX - disX;
									el.parentNode.style.left = x + 'px';
									break;
								case 'l':
									w = ltX - meScaleClientX;
									x = meScaleClientX - disX;
									el.parentNode.style.left = x + 'px';
									break;
							}
							w = w < 40 ? 40 : w; //限制最小缩放
							h = h < 20 ? 20 : h;
							el.parentNode.style.width = w + 'px';
							el.parentNode.style.height = h + 'px';
						}
					}
					document.onmouseup = function() {
						document.onmousemove = document.onmouseup = null;
					}
					return false;
				}
			}
		}
	}
</script>

<style>
	.resizeTag {
		width: 6px;
		height: 6px;
		position: absolute;
		background-color: #B6BFCE;
		z-index: 2000;
		border-radius: 50%;
	}

	.cptDiv {
		position: absolute;
	}

	.cptDiv:hover .delTag {
		display: block
	}

	.activeMask {
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 1801
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
		position: relative;
		margin: 0 10px;
		background-size: 100% 100%;
		transform-origin: 0 0
	}
</style>
