<template>
  <div class="custom_text_option">
    <el-form label-width="70px" label-position="left">
      <el-form-item label="字体">
        <el-select v-model="data.textFamily">
          <el-option
            v-for="(item, index) in textFamilyList"
            :key="index + item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="颜色">
        <el-color-picker
          @active-change="selectTextColor"
          v-model="data.textColor"
          show-alpha
        />
      </el-form-item>
      <el-form-item label="加粗">
        <el-select v-model="data.fontWeight">
          <el-option label="更细" value="lighter" />
          <el-option label="正常" value="normal" />
          <el-option label="加粗" value="bold" />
          <el-option label="更粗(存在兼容问题)" value="bolder" />
        </el-select>
      </el-form-item>
      <el-form-item label="倾斜">
        <el-select v-model="data.fontStyle">
          <el-option label="正常" value="normal" />
          <el-option label="斜体" value="italic" />
          <el-option label="倾斜" value="oblique" />
        </el-select>
      </el-form-item>
      <el-form-item label="背景色">
        <el-color-picker
          @active-change="selectBgColor"
          v-model="data.bgColor"
          show-alpha
        />
      </el-form-item>
      <el-form-item label="文字大小">
        <el-input-number
          :min="13"
          :max="200"
          v-model="data.textSize"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="行高">
        <el-input-number
          :min="13"
          :max="250"
          v-model="data.textLineHeight"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="对齐方式">
        <el-select v-model="data.textAlign">
          <el-option
            v-for="(item, index) in textAlignList"
            :key="index + item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="下划线">
        <el-select v-model="data.textDecoration">
          <el-option
            v-for="(item, index) in textDecorationList"
            :key="index + item.label"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <!-- <span slot="label"> -->
        点击跳转
        <el-tooltip
          effect="light"
          content="跳转外链请写全路径如：https://www.baidu.com，大屏间跳转请写view?id=大屏ID，如：view?id=6580439c70e1d2c2ff2b98"
          placement="bottom-end"
        >
          <i class="el-icon-warning" />
        </el-tooltip>
        <!-- </span> -->
        <el-input type="textarea" :rows="3" v-model="data.url"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "custom-text-option",
  props: {
    attribute: Object,
  },
  watch: {
    data: {
      deep: true,
      handler() {
        // this.$emit('change', this.data)
      },
    },
    attribute: {
      deep: true,
      handler() {
        this.data = this.attribute;
      },
    },
  },
  data() {
    return {
      data: this.attribute,
      textFamilyList: ["微软雅黑", "黑体", "宋体", "仿宋", "楷体", "华文宋体"],
      textAlignList: ["left", "center", "right"],
      textDecorationList: [
        {
          label: "无",
          value: "none",
        },
        {
          label: "下划线",
          value: "underline",
        },
        {
          label: "上划线",
          value: "overline",
        },
        {
          label: "穿过文字",
          value: "line-through",
        },
        {
          label: "闪烁(存在兼容问题)",
          value: "blink",
        },
      ],
    };
  },
  created() {},
  methods: {
    selectBgColor(color) {
      this.data.bgColor = color;
    },
    selectTextColor(color) {
      this.data.textColor = color;
    },
  },
};
</script>

<style lang="scss" scoped>
.custom_text_option {
  padding: 0px 10px;
}
</style>
