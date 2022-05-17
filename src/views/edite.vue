<template>
	<div>
		<el-container>
			<el-header>
				<div style="display: flex;justify-content: space-between;">
					<div class="logo">
						<img style="width: 45px;height: 45px;margin-top:5px;" src="@/assets/logo.png" alt="">
					</div>
					<div class="set">
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
				<el-aside width="220px" style="overflow-x: hidden;">
					<sidebar @dragStart="dragStart" :selectList="list" :selectIndex="currentIndex"
						@selectIndexFn="selectItem" @changeCurrentItem="changeCurrentItem"></sidebar>
				</el-aside>

				<el-main @dragover="allowDrop" @drop="drop" :style="{
					background: 'url(' + defaultBg + ') repeat',
					transform: 'scale(' + containerScale + ')'
				}" @click.self="selectItem(-1)">
					<div v-for="(item,index) in list" :key="index" class="cptDiv" @mousedown.stop="selectItem(index)"
						:style="[cptDiv_fn(item,index)]">

						<div v-show="currentIndex === index" class="ScaleMarkX"
							:style="{width:1920*containerScale+'px'}">
							<ScaleMarkX />
						</div>
						<div v-show="currentIndex === index" class="ScaleMarkY"
							:style="{height:1920*containerScale / designData.scaleX * designData.scaleY+'px'}">
							<ScaleMarkY />
						</div>

						<div v-resize="{key:'move',index:index}" @dblclick.stop="dblclick(index)" class="activeMask"
							:style="{border:currentIndex === index?'1px solid #B6BFCE':'',zIndex:(item.options||{}).edite?0:100}" />
						<div style="width: 100%;height: 100%;position: relative;">
							<component :is="item.name" :ref="item.name+index" :width="Math.round(item.w)"
								:height="Math.round(item.h)" :option="item.options">
							</component>
							<!-- 		<div v-show="currentIndex === index" style="position: absolute;top: -92px;right: 4px;">
								<el-icon style="cursor:pointer;" @click="copy(item)" color="#fff">
									<component :is="'CopyDocument'">
									</component>
								</el-icon>

								<el-icon style="cursor:pointer;" @click="this.dialogVisible = true" color="#fff">
									<component :is="'Delete'">
									</component>
								</el-icon>
							</div> -->

						</div>
						<div v-show="currentIndex === index" style="top: -3px;left: -3px;cursor: se-resize"
							class="resizeTag" v-resize="{key:'lt',index:index}" />
						<div v-show="currentIndex === index" style="top: -3px;left: 48%;cursor: s-resize"
							class="resizeTag" v-resize="{key:'t',index:index}" />
						<div v-show="currentIndex === index" style="top: -3px;right: -4px;cursor: ne-resize"
							class="resizeTag" v-resize="{key:'rt',index:index}" />
						<div v-show="currentIndex === index" style="top: 48%;right: -4px;cursor: w-resize"
							class="resizeTag" v-resize="{key:'r',index:index}" />
						<div v-show="currentIndex === index" style="bottom: -4px;right: -4px;cursor: se-resize"
							class="resizeTag" v-resize="{key:'rb',index:index}" />
						<div v-show="currentIndex === index" style="bottom: -4px;left: 48%;cursor: s-resize"
							class="resizeTag" v-resize="{key:'b',index:index}" />
						<div v-show="currentIndex === index" style="bottom: -4px;left: -3px;cursor: ne-resize"
							class="resizeTag" v-resize="{key:'lb',index:index}" />
						<div v-show="currentIndex === index" style="top: 48%;left: -3px;cursor: w-resize"
							class="resizeTag" v-resize="{key:'l',index:index}" />
					</div>

				</el-main>
			</el-container>
		</el-container>
		<!-- 		<el-dialog v-model="dialogVisible" title="提示" width="30%" :before-close="handleClose">
			<span>是否确认删除该元素</span>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogVisible = false">取消</el-button>
					<el-button type="primary" @click="remove">确定</el-button>
				</span>
			</template>
		</el-dialog> -->
		<item-settings :currentItem="currentItem" ref="itemSettings"></item-settings>
	</div>
</template>

<script>
	import {
		ElMessageBox
	} from 'element-plus'
	import sidebar from '@/components/sidebar'
	import options from '@/utils/options'
	import itemSettings from '@/components/item-settings'
	import initOptionsComponents from '@/utils/initOptionsComponents'
	import ScaleMarkX from "@/components/ScaleMarkX";
	import ScaleMarkY from "@/components/ScaleMarkY";
	export default {
		components: {
			sidebar,
			itemSettings,
			ElMessageBox,
			ScaleMarkX,
			ScaleMarkY
		},
		computed: {
			elMainFn() {
				let {
					defaultBg,
					designData,
					containerScale
				} = this
				let result = {
					background: 'url(' + defaultBg + ') repeat',
					height: 1920 / designData.scaleX * designData.scaleY + 'px',
					transform: 'scale(' + containerScale + ')'
				}
				return result
			}
		},
		data() {
			return {
				dialogVisible: false,
				designData: {
					scaleX: 16,
					scaleY: 9,
				},
				currentIndex: 0,
				currentComponents: {
					option: undefined
				},
				list: [],
				dom: {},
				currentTab: 0,
				defaultBg: require('@/assets/main_bg.png'),
				containerScale: 1,
				currentItem: {},
				clickTime: 0
			}
		},
		created() {

		},
		mounted() {
			// console.log('模板',this.$app.component('custom-text'))
		},
		methods: {
			dblclick(index) {
				console.log('双击·')
				this.list[index].options.edite = true
				this.currentIndex = index
			},
			changeCurrentItem({
				obj,
				index
			}) {
				obj = JSON.parse(JSON.stringify(obj))
				if (JSON.stringify(obj) === '{}') {
					this.list.splice(index, 1)
				} else {
					this.list.push(obj)
					index = this.list.length - 1
				}
				this.currentItem = obj
				this.currentIndex = index
			},
			remove() {
				this.list.splice(this.currentIndex, 1)
				this.dialogVisible = false
				this.currentItem = {}
			},
			copy(item) {
				let newObj = JSON.parse(JSON.stringify(item))
				newObj.id = this.$createId()
				newObj.x += 20
				newObj.y += 20
				this.list.push(newObj)
				this.currentIndex = this.list.length - 1
			},
			cptDiv_fn(item, index) {
				let currentIndex = this.currentIndex
				let result = {
					width: Math.round(item.w) + 'px',
					height: Math.round(item.h) + 'px',
					top: Math.round(item.y) + 'px',
					left: Math.round(item.x) + 'px',
					zIndex: currentIndex === index ? 1800 : item.x
				}
				return result
			},
			selectItem(index) {
				if (index >= 0) {
					this.currentItem = this.list[index]
				} else {
					for (let item of this.list) {
						if (item.options && item.options.edite) {
							item.options.edite = false
						}
					}
					this.currentItem = {}
				}

				this.currentIndex = index
			},
			allowDrop(e) {
				e.preventDefault()
			},
			dragStart(dom) {
				this.dom = dom;
				dom.draggable = false;
			},
			drop(e) {
				console.time()
				let config = JSON.parse(this.dom.getAttribute('config'));
				const that = this
				let data = {
					groupTag: config.group,
					title: config.title,
					icon: config.icon,
					name: config.name,
					z: 100,
					x: Math.round(e.offsetX),
					y: Math.round(e.offsetY),
					w: config.initWidth || 200,
					h: config.initHeight || 200,
					id: that.$createId()
				}
				const group = options[config.group];
				let name = config.name + '-option'

				if (group && group.options[name]) {
					const configOptions = group.options[name]
					data.options = JSON.parse(JSON.stringify(configOptions))
				} else {
					this.$message.error("未再options.js中查找到" + config.group + "." + config.name + "-option的自定义属性")
					return;
				}
				// const newData = JSON.parse(JSON.stringify(data))
				this.currentItem = data

				const initResult = initOptionsComponents(this.$app, name)
				console.log('initResult', initResult)
				if (initResult != true) {
					this.$message.error(initResult)
					return
				}
				this.list.push(data);
				this.currentIndex = this.list.length - 1
				console.timeEnd()
			}
		},
		directives: {
			resize(el, binding) {

				let {
					key,
					index
				} = binding.value

				const that = binding.instance
				let containerScale = that.containerScale
				// let  elExample = createApp({})

				el.onmousedown = function(e) {
					console.log('按下元素', e.timeStamp, that.clickTime)
					// if (e.timeStamp - that.clickTime <= 200 && that.clickTime != 0) {
					// 	console.log('双击')
					// 	that.list[index].options.edite = true
					// }
					that.clickTime = e.timeStamp
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
						if (key === 'move') {
							x = meScaleClientX - disX;
							y = meScaleClientY - disY;
							el.parentNode.style.left = x + 'px';
							el.parentNode.style.top = y + 'px';
						} else {
							switch (key) {
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
						if (w) that.list[index].w = Math.round(w);
						if (h) that.list[index].h = Math.round(h);
						if (x) that.list[index].x = Math.round(x);
						if (y) that.list[index].y = Math.round(y);
						that.currentItem = that.list[index]
					}
					return false;
				}
			}
		}
	}
</script>

<style>
	.set {
		display: flex;
		justify-content: space-between;
		width: 270px;
		align-items: center;
		line-height: 4px;
	}

	.logo {
		width: 170px;
	}

	.ScaleMarkY {
		position: fixed;
		border-right: 3px dashed #808080;
		height: 100%;
		top: 0px;
	}

	.ScaleMarkX {
		position: fixed;
		border-top: 3px dashed #808080;
		width: 100%;
		left: 0px;
	}

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
		z-index: 100
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
		overflow: hidden;
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
		margin: 0px;
		background-size: 100% 100%;
		transform-origin: 0 0
	}
</style>
