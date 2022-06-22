<template>
  <div>
    <el-container>
      <el-header>
        <div style="display: flex; justify-content: space-between">
          <div class="logo" @click="toIndex">
            <img
              style="width: 45px; height: 45px; margin-top: 5px"
              src="@/assets/logo.png"
              alt=""
            />
          </div>
          <div style="line-height: 28px">
            <h3>编辑显示比例{{ designData.scale }}</h3>
          </div>
          <div class="set">
            <div class="header_set_item">导入</div>
            <div class="header_set_item" @click="createdImg">生成图片</div>
            <div class="header_set_item" @click="removeList">
              <el-icon :size="22">
                <component :is="'Delete'"> </component>
              </el-icon>
            </div>
            <div class="header_set_item" @click="this.dialogVisible = true">
              <el-icon :size="22">
                <component :is="'Tools'"> </component>
              </el-icon>
            </div>
            <div>
              <el-button type="primary" @click="save" plain>保存</el-button>
            </div>
            <div>
              <el-button type="primary" @click="toPreview" plain
                >预览</el-button
              >
            </div>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="220px" style="overflow-x: hidden">
          <sidebar
            @dragStart="dragStart"
            :selectList="list"
            :selectIndex="currentIndex"
            @selectIndexFn="selectItem"
            @changeCurrentItem="changeCurrentItem"
          ></sidebar>
        </el-aside>

        <el-main
          :id="mainId"
          :style="{ overflow: designData.isAuto ? 'hidden' : 'auto' }"
        >
          <div class="ScaleMarkX">
            <ScaleMarkX />
          </div>
          <div class="ScaleMarkY">
            <ScaleMarkY />
          </div>
          <div
            class="wrap"
            @dragover="allowDrop"
            @drop="drop"
            :style="[setWrap_style]"
            @click.self="selectItem(-1)"
          >
            <div
              v-for="(item, index) in list"
              :key="index"
              class="cptDiv"
              @mousedown="selectItem(index)"
              :style="[cptDiv_fn(item, index)]"
            >
              <div v-show="currentIndex === index" class="lineX"></div>
              <div v-show="currentIndex === index" class="lineY"></div>

              <div
                v-show="!(item.options || {}).edite"
                v-resize="{ key: 'move', index: index }"
                @dblclick.stop="dblclick(index)"
                class="activeMask"
                style="z-index: 100"
              />
              <div
                class="component_main"
                :style="{
                  border: currentIndex === index ? '1px solid #B6BFCE' : '',
                }"
              >
                <component
                  :is="item.name"
                  :ref="item.name + index"
                  :width="Math.round(item.w)"
                  :height="Math.round(item.h)"
                  :option="item.options"
                >
                </component>

                <el-icon
                  @click.stop="edite(index)"
                  v-show="currentIndex === index"
                  style="
                    position: absolute;
                    color: #fff;
                    top: 0px;
                    right: 0px;
                    cursor: pointer;
                    z-index: 110;
                  "
                >
                  <component :is="handleIcon(item)"> </component>
                </el-icon>
              </div>
              <div
                v-show="currentIndex === index"
                style="top: -3px; left: -3px; cursor: se-resize"
                class="resizeTag"
                v-resize="{ key: 'lt', index: index }"
              />
              <div
                v-show="currentIndex === index"
                style="top: -3px; left: 48%; cursor: s-resize"
                class="resizeTag"
                v-resize="{ key: 't', index: index }"
              />
              <div
                v-show="currentIndex === index"
                style="top: -3px; right: -4px; cursor: ne-resize"
                class="resizeTag"
                v-resize="{ key: 'rt', index: index }"
              />
              <div
                v-show="currentIndex === index"
                style="top: 48%; right: -4px; cursor: w-resize"
                class="resizeTag"
                v-resize="{ key: 'r', index: index }"
              />
              <div
                v-show="currentIndex === index"
                style="bottom: -4px; right: -4px; cursor: se-resize"
                class="resizeTag"
                v-resize="{ key: 'rb', index: index }"
              />
              <div
                v-show="currentIndex === index"
                style="bottom: -4px; left: 48%; cursor: s-resize"
                class="resizeTag"
                v-resize="{ key: 'b', index: index }"
              />
              <div
                v-show="currentIndex === index"
                style="bottom: -4px; left: -3px; cursor: ne-resize"
                class="resizeTag"
                v-resize="{ key: 'lb', index: index }"
              />
              <div
                v-show="currentIndex === index"
                style="top: 48%; left: -3px; cursor: w-resize"
                class="resizeTag"
                v-resize="{ key: 'l', index: index }"
              />
            </div>
          </div>
          <!-- <rightAside></rightAside> -->
        </el-main>
      </el-container>
    </el-container>
    <el-dialog v-model="dialogVisible" title="界面设置" width="30%">
      <div class="dialog_main">
        <el-form ref="formRef" label-width="100px" label-position="left">
          <el-form-item label="标题" prop="age">
            <el-input
              type="text"
              v-model="designData.title"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="屏幕自适应">
            <el-switch @change="isAutoFn" v-model="designData.isAuto" />
          </el-form-item>
          <template v-if="!designData.isAuto">
            <el-form-item label="屏幕宽">
              <el-input-number
                v-model="designData.mainW"
                :min="1"
                @change="handleMainW"
              />
            </el-form-item>
            <el-form-item label="屏幕高">
              <el-input-number
                v-model="designData.mainH"
                :min="1"
                @change="handleMainH"
              />
            </el-form-item>
            <el-form-item label="显示比例">
              <el-select
                v-model="designData.scale"
                placeholder="请选择"
                style="width: 100%"
                @change="scaleChange"
              >
                <el-option
                  v-for="item in scaleOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </template>
          <el-form-item label="背景颜色">
            <el-color-picker
              v-model="designData.bgColor"
              @active-change="changeBgColor"
              show-alpha
            />
          </el-form-item>
          <el-form-item label="背景图片">
            <div class="uploadItem" v-if="designData.bgImg" @click="upBgImg">
              <el-icon class="remove_bgImg" @click.stop="designData.bgImg = ''">
                <component :is="'Close'"></component>
              </el-icon>

              <el-image
                style="width: 100%; height: 100%"
                :src="designData.bgImg"
                fit="cover"
              />
            </div>
            <div v-else class="uploadItem" @click="upBgImg">
              <el-icon style="font-size: 40px; color: #aaa">
                <component :is="'Plus'"> </component>
              </el-icon>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <!-- <el-button @click="dialogVisible = false">取消</el-button> -->
          <el-button type="primary" @click="this.dialogVisible = false"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
    <item-settings
      :currentItem="currentItem"
      ref="itemSettings"
    ></item-settings>
    <el-dialog v-model="isShowCover" @close="this.cover = ''">
      <img class="cover" style="width: 100%" :src="cover" />
      <div class="save_img">
        <el-button type="primary" @click="saveImg">保存图片</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ElMessageBox, ElMessage, ElLoading } from "element-plus";
import sidebar from "@/components/sidebar";
import rightAside from "@/components/rightAside";
import options from "@/utils/options";
import itemSettings from "@/components/item-settings";
import initOptionsComponents from "@/utils/initOptionsComponents";
import ScaleMarkX from "@/components/ScaleMarkX";
import ScaleMarkY from "@/components/ScaleMarkY";
import html2canvas from "html2canvas";
// import utils from "@/utils/utils";
const utils = require("@/utils/utils");
export default {
  components: {
    rightAside,
    sidebar,
    itemSettings,
    ElMessageBox,
    ScaleMarkX,
    ScaleMarkY,
  },
  computed: {
    setWrap_style() {
      let designData = this.designData;
      let defaultBg = this.defaultBg;
      let containerScale = this.containerScale;
      let bgImg = designData.bgImg;
      const isAuto = designData.isAuto;

      let result = {
        background: designData.bgColor
          ? designData.bgColor
          : "url(" + defaultBg + ") repeat",
        transform: "scale(" + containerScale + ")",
      };
      if (!isAuto) {
        result.width = designData.mainW + "px";
        result.height = designData.mainH + "px";
      }
      if (bgImg) {
        result.background = "url(" + bgImg + ") no-repeat";
      }

      return result;
    },
    elMainFn() {
      let { defaultBg, designData, containerScale } = this;
      let result = {
        background: "url(" + defaultBg + ") repeat",
        height: (1920 / designData.scaleX) * designData.scaleY + "px",
        transform: "scale(" + containerScale + ")",
      };
      return result;
    },
  },
  data() {
    return {
      scaleOptions: [
        {
          value: "0.3",
          label: "30%",
        },
        {
          value: "0.5",
          label: "50%",
        },
        {
          value: "0.7",
          label: "70%",
        },
        {
          value: "1",
          label: "100%",
        },
      ],
      dialogVisible: false,
      mainId: this.$createId(),
      designData: {
        title: "我的大屏",
        scaleX: 16,
        scaleY: 9,
        mainW: 0,
        mainH: 0,
        scale: "80%",
        bgColor: "",
        isAuto: true,
        bgImg: "",
      },
      currentIndex: 0,
      currentComponents: {
        option: undefined,
      },
      list: [],
      dom: {},
      currentTab: 0,
      defaultBg: require("@/assets/main_bg.png"),
      containerScale: 0.8,
      currentItem: {},
      clickTime: 0,
      wrap: {},
      id: "",
      cover: "",
      isShowCover: false,
      users: JSON.parse(localStorage.getItem("users") || "{}"),
    };
  },
  watch: {
    containerScale: function (val) {
      this.designData.scale = `${val * 100}%`;
    },
  },
  created() {
    const query = this.$route.query || {};
    const id = query._id;
    this.id = id;
    const users = this.users;
    if (!users && !users._id) {
      this.$message({
        message: "请先登录",
      });
      this.$router.push("/login");
      return;
    }
    if (id) {
      this.getData();
    } else {
      // this.list =
      //   JSON.parse(decodeURIComponent(localStorage.getItem("list"))) || [];
      // const designData = JSON.parse(
      //   decodeURIComponent(localStorage.getItem("designData"))
      // );
      // if (designData) this.designData = designData;
    }
  },
  mounted() {
    this.wrap = document.querySelector(".wrap");
    if (this.wrap) {
      this.designData.mainW = this.wrap.offsetWidth;
      this.designData.mainH = this.wrap.offsetHeight;
    }
  },
  methods: {
    handleIcon(item) {
      const options = item.options || {};
      let icon = item.minIcon;
      const edite = options.edite;
      let result = edite ? "View" : "Hide";
      if (icon) {
        result = edite ? "Select" : icon;
      }
      return result;
    },
    toIndex() {
      const that = this;
      ElMessageBox.alert("是否保存", {
        distinguishCancelAndClose: true,
        showCancelButton: true,
        confirmButtonText: "是",
        cancelButtonText: "否",
        callback: async (action) => {
          console.log("action", action);
          if (action === "confirm") {
            await that.save();
            setTimeout(function () {
              that.$router.push("/index");
            }, 2000);
          } else if (action === "cancel") {
            that.$router.push("/index");
          }
        },
      });
    },
    async upBgImg() {
      const img = await utils.asyncUpImg();
      if (img) {
        this.designData.bgImg = img;
      }
    },
    saveImg() {
      let img = document.querySelector(".cover");
      // 将图片的src属性作为URL地址
      let url = img.src;
      let a = document.createElement("a");
      let event = new MouseEvent("click");

      a.download = this.designData.title || "下载图片名称";
      a.href = url;

      a.dispatchEvent(event);
    },
    createdImg(isShowCover = true) {
      const loadingInstance = ElLoading.service({
        fullscreen: true,
      });
      this.currentIndex = -1;
      const that = this;
      setTimeout(() => {
        loadingInstance.close();
      }, 10000);
      return new Promise((resolve) => {
        this.$nextTick(() => {
          const dom = document.querySelector(".wrap");
          return html2canvas(dom).then((canvas) => {
            const cover = canvas.toDataURL("image/png");
            that.cover = cover;
            that.isShowCover = isShowCover;
            loadingInstance.close();
            resolve(cover);
          });
        });
      });
    },
    getData() {
      const id = this.id;
      console.log("id", id);
      this.$api("/getData", "get", {
        id,
      })
        .then((res) => {
          console.log("获取大屏数据", res);

          const list = res.list || [];
          this.designData = res.data || {};
          this.containerScale = res.data.containerScale;
          for (let item of list) {
            const initResult = initOptionsComponents(
              this.$app,
              item.name + "-option"
            );
            console.log("initResult", initResult);
            if (initResult != true) {
              this.$message.error(initResult);
              return;
            }
          }
          this.list = list;
        })
        .catch((err) => {
          console.log("服务器错误", err);
        });
    },
    async save() {
      const that = this;
      const designData = JSON.parse(JSON.stringify(that.designData));
      const list = that.list;
      const users = that.users;
      const id = that.id;

      designData.containerScale = that.containerScale;
      designData.cover = await that.createdImg(false);
      designData.list = list;
      designData.createdUserId = users._id;

      let result = {};
      if (id) {
        result = await that.$api("/update", "post", designData);
      } else {
        result = await that.$api("/save", "post", designData);
        that.id = result.id;
      }
      console.log("保存或者更新结果", result);
      that.$message({
        message: result.msg,
        type: result.code ? "error" : "success",
      });

      utils.setLocalStorage(designData, list);
    },
    isAutoFn(isBool) {
      this.containerScale = isBool ? 0.8 : 1;
    },

    toPreview() {
      let designData = this.designData;
      designData.defaultBg = this.defaultBg;
      designData.containerScale = designData.isAuto ? 1 : this.containerScale;

      utils.setLocalStorage(designData, this.list);
      const routeUrl = this.$router.resolve({
        path: "/preview",
      });
      window.open(routeUrl.href, "_blank");
      // 打开新标签，需要重新注册组件
    },
    edite(index) {
      let result = this.list[index].options.edite ? false : true;
      this.list[index].options.edite = result;
      let msg = this.list[index].options.editeTextMsg || "预览";
      let message = `开启${msg}`;
      let type = "success";
      if (!result) {
        message = `关闭${msg}`;
        type = "";
      }
      ElMessage({
        message,
        type,
      });
    },
    changeBgColor(value) {
      this.designData.bgColor = value;
    },
    scaleChange(value) {
      this.containerScale = value;
      console.log("wrap", this.wrap);
    },
    handleMainW(value) {
      this.designData.mainW = value;
    },
    handleMainH(value) {
      this.designData.mainH = value;
    },
    removeList() {
      const that = this;
      ElMessageBox.alert("是否清空所有图层", {
        confirmButtonText: "确认",
        callback: (action) => {
          let message = "清空取消";
          let type = "info ";
          if (action === "confirm") {
            message = "清空成功";
            type = "success";
            that.list = [];
            that.currentIndex = -1;
            that.currentItem = {};
          }
          ElMessage({
            type,
            message,
          });
        },
      });
    },
    dblclick(index) {
      console.log("双击·");
      this.list[index].options.edite = true;
      this.currentIndex = index;
    },
    changeCurrentItem({ obj, index }) {
      obj = JSON.parse(JSON.stringify(obj));
      if (JSON.stringify(obj) === "{}") {
        this.list.splice(index, 1);
      } else {
        this.list.push(obj);
        index = this.list.length - 1;
      }
      this.currentItem = obj;
      this.currentIndex = index;
    },
    remove() {
      this.list.splice(this.currentIndex, 1);
      this.dialogVisible = false;
      this.currentItem = {};
    },
    copy(item) {
      let newObj = JSON.parse(JSON.stringify(item));
      newObj.id = this.$createId();
      newObj.x += 20;
      newObj.y += 20;
      this.list.push(newObj);
      this.currentIndex = this.list.length - 1;
    },
    cptDiv_fn(item, index) {
      let currentIndex = this.currentIndex;
      let result = {
        width: Math.round(item.w) + "px",
        height: Math.round(item.h) + "px",
        top: Math.round(item.y) + "px",
        left: Math.round(item.x) + "px",
        zIndex: currentIndex === index ? 1800 : item.x,
      };
      return result;
    },
    selectItem(index) {
      console.log("选择", index);
      if (index >= 0) {
        this.currentItem = this.list[index];
      } else {
        for (let item of this.list) {
          if (item.options && item.options.edite) {
            item.options.edite = false;
          }
        }
        this.currentItem = {};
      }

      this.currentIndex = index;
    },
    allowDrop(e) {
      e.preventDefault();
    },
    dragStart(dom) {
      this.dom = dom;
      dom.draggable = false;
    },
    drop(e) {
      console.time();
      let config = JSON.parse(this.dom.getAttribute("config"));
      const that = this;
      let data = {
        groupTag: config.group,
        title: config.title,
        icon: config.icon,
        name: config.name,
        minIcon: config.minIcon,
        z: 100,
        x: Math.round(e.offsetX),
        y: Math.round(e.offsetY),
        w: config.initWidth || 200,
        h: config.initHeight || 200,
        id: that.$createId(),
      };
      const group = options[config.group];
      let name = config.name + "-option";

      if (group && group.options[name]) {
        const configOptions = group.options[name];
        data.options = JSON.parse(JSON.stringify(configOptions));
      } else {
        this.$message.error(
          "未再options.js中查找到" +
            config.group +
            "." +
            config.name +
            "-option的自定义属性"
        );
        return;
      }
      // const newData = JSON.parse(JSON.stringify(data))
      this.currentItem = data;

      const initResult = initOptionsComponents(this.$app, name);
      console.log("initResult", initResult);
      if (initResult != true) {
        this.$message.error(initResult);
        return;
      }
      this.list.push(data);
      this.currentIndex = this.list.length - 1;
      console.timeEnd();
    },
  },
  directives: {
    resize(el, binding) {
      let { key, index } = binding.value;

      const that = binding.instance;
      let containerScale = that.containerScale;
      // let  elExample = createApp({})

      el.onmousedown = function (e) {
        console.log("按下元素", e.timeStamp, that.clickTime);
        // if (e.timeStamp - that.clickTime <= 200 && that.clickTime != 0) {
        // 	console.log('双击')
        // 	that.list[index].options.edite = true
        // }
        that.clickTime = e.timeStamp;
        const scaleClientX = e.clientX / containerScale;
        const scaleClientY = e.clientY / containerScale;
        const rbX = scaleClientX - el.parentNode.offsetWidth;
        const rbY = scaleClientY - el.parentNode.offsetHeight;
        const ltX = scaleClientX + el.parentNode.offsetWidth;
        const ltY = scaleClientY + el.parentNode.offsetHeight;
        const disX = scaleClientX - el.parentNode.offsetLeft;
        const disY = scaleClientY - el.parentNode.offsetTop;
        let w, h, x, y;
        document.onmousemove = function (me) {
          const meScaleClientX = me.clientX / containerScale;
          const meScaleClientY = me.clientY / containerScale;
          // let offsetX = me.offsetX
          // console.log('offsetX', offsetX)
          // console.log('meScaleClientX', meScaleClientX)
          // if (meScaleClientX <= offsetX + 220) {
          // 	return
          // }
          if (key === "move") {
            x = meScaleClientX - disX;
            y = meScaleClientY - disY;
            el.parentNode.style.left = x + "px";
            el.parentNode.style.top = y + "px";
          } else {
            switch (key) {
              case "lt":
                w = ltX - meScaleClientX;
                h = ltY - meScaleClientY;
                x = meScaleClientX - disX;
                y = meScaleClientY - disY;
                el.parentNode.style.left = x + "px";
                el.parentNode.style.top = y + "px";
                break;
              case "t":
                h = ltY - meScaleClientY;
                y = meScaleClientY - disY;
                el.parentNode.style.top = y + "px";
                break;
              case "rt":
                w = meScaleClientX - rbX;
                h = ltY - meScaleClientY;
                y = meScaleClientY - disY;
                el.parentNode.style.top = y + "px";
                break;
              case "r":
                w = meScaleClientX - rbX;
                break;
              case "rb":
                w = meScaleClientX - rbX;
                h = meScaleClientY - rbY;
                break;
              case "b":
                h = meScaleClientY - rbY;
                break;
              case "lb":
                w = ltX - meScaleClientX;
                h = meScaleClientY - rbY;
                x = meScaleClientX - disX;
                el.parentNode.style.left = x + "px";
                break;
              case "l":
                w = ltX - meScaleClientX;
                x = meScaleClientX - disX;
                // console.log('x', x, 'w', w)
                el.parentNode.style.left = x + "px";
                break;
            }
            w = w < 40 ? 40 : w; //限制最小缩放
            h = h < 20 ? 20 : h;
            el.parentNode.style.width = w + "px";
            el.parentNode.style.height = h + "px";
          }
        };
        document.onmouseup = function () {
          document.onmousemove = document.onmouseup = null;
          if (w) that.list[index].w = Math.round(w);
          if (h) that.list[index].h = Math.round(h);
          if (x) that.list[index].x = Math.round(x);
          if (y) that.list[index].y = Math.round(y);
          that.currentItem = that.list[index];
        };
        return false;
      };
    },
  },
};
</script>

<style lang="scss">
.save_img {
  position: relative;
  top: 13px;
}

.component_main {
  width: 100%;
  height: 100%;
  position: relative;
}

@mixin ScaleMarkXY($w, $h) {
  position: fixed;
  z-index: 100;
  width: $w;
  height: $h;
}

.ScaleMarkX {
  @include ScaleMarkXY(100%, 10px);
}

.ScaleMarkY {
  @include ScaleMarkXY(10px, 100%);
}

.dialog_main {
  height: 50vh;
  margin-bottom: 30px;

  .uploadItem {
    position: relative;
    width: 120px;
    height: 120px;
    text-align: center;
    line-height: 150px;
    border: 1px solid #ddd;
    cursor: pointer;

    .remove_bgImg {
      font-size: 18px;
      color: rgb(75 75 75);
      position: absolute;
      z-index: 1;
      right: -6px;
      top: -6px;
      background: #c4c4c4;
      border-radius: 10px;
    }
  }
}

.set {
  display: flex;
  justify-content: space-between;
  width: 320px;
  align-items: center;
  line-height: 4px;

  .header_set_item {
    cursor: pointer;
    margin-right: 10px;
  }
}

.logo {
  width: 170px;
  cursor: pointer;
}

.lineY {
  position: fixed;
  border-right: 3px dashed #808080;
  height: 130%;
  top: -10%;
}

.lineX {
  position: fixed;
  border-top: 3px dashed #808080;
  width: 130%;
  left: -10%;
}

.resizeTag {
  width: 6px;
  height: 6px;
  position: absolute;
  background-color: #b6bfce;
  z-index: 2000;
  border-radius: 50%;
}

.cptDiv {
  position: absolute;

  .activeMask {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 100;
    cursor: move;
  }
}

.cptDiv:hover .delTag {
  display: block;
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
  position: relative;
}

.el-header,
.el-footer {
  text-align: center;
  line-height: 60px;
  background: #353f50;
  color: #fff;
  box-shadow: 0 2px 5px #2b3340 inset;
}

.el-aside {
  background-color: #353f50;
  color: #fff;
  text-align: center;
  box-shadow: 0 2px 5px #2b3340 inset;
}

.el-main {
  padding: 0px !important;
  color: #333;
  text-align: center;
  line-height: 160px;
  position: relative;
  margin: 0px;
  background-size: 100% 100%;
  overflow: hidden;
  transform-origin: 0 0;
  background: #000000;
  // display: flex !important;
  .wrap {
    position: relative;
    left: -120px;
    top: -26px;
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
    overflow: hidden;
    // cursor: default;
  }
}
</style>
