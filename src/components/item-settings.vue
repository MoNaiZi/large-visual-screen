<template>
  <div>
    <div style="position: fixed; z-index: 1801; bottom: 40px; right: 30px">
      <el-button
        style="
          background-color: #3f4b5f;
          color: white;
          height: 60px;
          width: 60px;
        "
        circle
        @click="configBarShow = !configBarShow"
      >
        <el-icon :size="30">
          <component :is="'Operation'"> </component>
        </el-icon>
      </el-button>
    </div>
    <transition appear name="configTs">
      <div v-show="configBarShow">
        <el-row class="main">
          <div v-drag class="title">
            <div>
              <div>组件属性</div>
            </div>
            <div>
              <div class="closeItem" @click.stop="closeBar">
                <el-icon>
                  <component :is="'Close'"> </component>
                </el-icon>
              </div>
            </div>
          </div>
          <div style="width: 100%">
            <el-tabs v-model="configTab" :stretch="true">
              <el-tab-pane label="坐标" name="basic">
                <div style="width: 98%; margin: 0 auto">
                  <el-row class="set_item">
                    宽度：
                    <el-input-number
                      :min="20"
                      :max="2000"
                      v-model="currentitem.w"
                      size="small"
                      @change="changeConfig"
                    />
                  </el-row>
                  <el-row class="set_item">
                    高度：
                    <el-input-number
                      :min="20"
                      :max="1500"
                      v-model="currentitem.h"
                      size="small"
                      @change="changeConfig"
                    />
                  </el-row>
                  <el-row class="set_item">
                    X 轴：
                    <el-input-number
                      :min="-500"
                      :max="2500"
                      v-model="currentitem.x"
                      size="small"
                      @change="changeConfig"
                    />
                  </el-row>
                  <el-row class="set_item">
                    Y 轴：
                    <el-input-number
                      :min="-500"
                      v-model="currentitem.y"
                      size="small"
                      @change="changeConfig"
                    />
                  </el-row>
                  <el-row class="set_item">
                    Z 轴：
                    <el-input-number
                      :min="1"
                      :max="1800"
                      v-model="currentitem.z"
                      size="small"
                      @change="changeConfig"
                    />
                  </el-row>
                </div>
              </el-tab-pane>
              <el-tab-pane label="属性" name="custom">
                <div
                  class="customForm"
                  v-if="currentitem && currentitem.options"
                >
                  <component
                    :is="currentitem.name + '-option'"
                    :attribute="currentitem.options.attribute"
                    @change="changeComponent"
                  >
                  </component>
                </div>
              </el-tab-pane>
              <!-- <el-tab-pane label="编辑文本" name="custom_text"> </el-tab-pane> -->
              <!--      展示数据表单需在option.js初始化cptDataForm-->
              <el-tab-pane label="数据" name="data" v-if="cptDataFormShow">
                <div class="customForm">
                  <el-form size="mini" label-position="top">
                    <el-form-item label="数据类型">
                      <el-radio-group
                        v-model="currentitem.options.cptDataForm.dataSource"
                        @change="changeDataSource"
                      >
                        <el-radio :label="1">静态数据</el-radio>
                        <el-radio :label="2">接口</el-radio>
                        <!-- <el-radio :label="3">sql</el-radio> -->
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item
                      label="轮询"
                      v-show="currentitem.options.cptDataForm.dataSource !== 1"
                    >
                      <el-switch
                        v-model="dataPollEnable"
                        active-text="开启"
                        inactive-text="关闭"
                      />
                    </el-form-item>
                    <el-form-item label="轮询时间(s)" v-show="dataPollEnable">
                      <el-input-number
                        v-model="currentitem.options.cptDataForm.pollTime"
                        :min="0"
                        :max="100"
                        label="描述文字"
                      />
                    </el-form-item>
                    <el-form-item
                      :label="
                        dataLabels[
                          currentitem.options.cptDataForm.dataSource - 1
                        ]
                      "
                    >
                      <el-input
                        v-show="
                          currentitem.options.cptDataForm.dataSource === 1
                        "
                        type="textarea"
                        :rows="5"
                        v-model="currentitem.options.cptDataForm.dataText"
                      />
                      <el-input
                        v-show="
                          currentitem.options.cptDataForm.dataSource === 2
                        "
                        type="textarea"
                        :rows="5"
                        v-model="currentitem.options.cptDataForm.apiUrl"
                      />
                      <el-input
                        v-show="
                          currentitem.options.cptDataForm.dataSource === 3
                        "
                        type="textarea"
                        :rows="5"
                        v-model="currentitem.options.cptDataForm.sql"
                      />
                    </el-form-item>
                    <el-form-item
                      v-show="currentitem.options.cptDataForm.dataSource === 2"
                    >
                      <el-button
                        type="primary"
                        style="width: 100%"
                        @click="refreshCptData"
                        >刷新数据
                      </el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-row>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "configBar",
  props: {
    currentItem: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    currentItem: {
      deep: true,
      handler: function (newVal) {
        this.currentitem = newVal;
        let cptDataForm = newVal.options.cptDataForm || {};
        console.log("cptDataForm", cptDataForm);
        if (JSON.stringify(newVal) != "{}") {
          this.configBarShow = true;
          if (JSON.stringify(cptDataForm) != "{}") {
            this.cptDataFormShow = true;
          } else {
            this.cptDataFormShow = false;
          }
        } else {
          this.configBarShow = false;
        }
      },
    },
  },
  computed: {
    dataPollEnable: {
      get() {
        return !!(
          this.currentitem.options &&
          this.currentitem.options.cptDataForm &&
          this.currentitem.options.cptDataForm.pollTime &&
          this.currentitem.options.cptDataForm.pollTime !== 0
        );
      },
      set(newValue) {
        if (newValue) {
          this.currentitem.options.cptDataForm.pollTime = 8;
        } else {
          this.currentitem.options.cptDataForm.pollTime = 0;
          this.refreshCptData(); //清除定时器
        }
        return newValue;
      },
    },
  },
  data() {
    return {
      cptDataFormShow: false,
      configTab: "custom",
      dataLabels: ["数据", "接口地址", "sql"],
      configBarShow: false,
      currentitem: {},
    };
  },
  methods: {
    changeComponent() {
      // this.currentitem.options.attribute = data
    },
    changeDataSource(val) {
      //静态数据不显示轮询按钮
      if (val === 1) {
        let currentitem = this.currentitem || {};
        let options = currentitem.options || {};
        if (options.cptDataForm) {
          options.cptDataForm.pollTime = 0;
        }
      }
    },
    // 刷新数据，调用父组件(index)中refreshCptData方法
    // 在父组件中再调用选中图层中的refreshCptData方法
    // 图层中的refreshCptData方法再自行调后端接口渲染数据，文本框的内容和数据类型组装在option.cptDataForm中
    refreshCptData() {
      this.$emit("refreshCptData");
    },
    showConfigBar() {
      this.configBarShow = true;
    },
    changeConfig() {},
    closeBar() {
      this.configBarShow = false;
    },
  },
  directives: {
    drag(el) {
      el.onmousedown = function (e) {
        const disX = e.clientX - el.parentNode.offsetLeft;
        const disY = e.clientY - el.parentNode.offsetTop;
        document.onmousemove = function (e) {
          el.parentNode.style.left = e.clientX - disX + "px";
          el.parentNode.style.top = e.clientY - disY + "px";
        };
        document.onmouseup = function () {
          document.onmousemove = document.onmouseup = null;
        };
        return false;
      };
    },
  },
};
</script>

<style lang="scss">
.main {
  position: fixed !important;
  width: 260px;
  height: 450px;
  z-index: 1802;
  bottom: 84px;
  right: 30px;
  border-radius: 6px;
  background: rgba(228, 230, 236, 0.9);
  border: 1px solid #3f4b5f;

  .title {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 10px;
    background: #3f4b5f;
    color: #fff;
    height: 26px;
    cursor: move;
  }

  .set_item {
    margin: 10px;
  }

  .el-tabs {
    height: 398px;
    width: 100%;
  }

  .customForm {
    width: 95%;
    padding: 0 6px 0 4px;
    height: 345px;
    overflow: auto;
  }
}

.el-tabs__content {
  padding: 0px !important;
  font-size: 26px !important;
}

.el-input__inner {
  height: 36px !important;
  font-size: 15px !important;
}

.cptTitle:hover {
  cursor: move;
}

.closeItem {
  cursor: pointer;
  padding: 10px;
  margin-top: -7px;
}

.configTs-enter-active,
.configTs-leave-active {
  transition: all 0.3s;
}

.configTs-enter,
.configTs-leave-to {
  opacity: 0;
  transform: scale(0.3);
  transform-origin: right bottom;
}
</style>
