<template>
  <div>
    <el-form size="mini">
      <el-form-item label="字体大小">
        <el-input-number v-model="data.fontSize" :min="0" :max="500" />
      </el-form-item>
      <el-form-item label="字体粗细">
        <el-select v-model="data.fontWeight" placeholder="请选择">
          <el-option
            v-for="item in data.fontWeightList"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <span>
          点击跳转
          <el-tooltip
            effect="light"
            content="跳转外链请写全路径如：https://www.baidu.com，大屏间跳转请写view?id=大屏ID，如：view?id=6580439c70e1d2c2ff2b98"
            placement="bottom-end"
          >
            <i class="el-icon-warning" />
          </el-tooltip>
        </span>
        <el-input type="textarea" :rows="3" v-model="data.url"></el-input>
      </el-form-item>
      <el-form-item label="背景颜色">
        <el-color-picker v-model="data.bgColor" show-alpha />
      </el-form-item>
      <el-form-item label="文本颜色">
        <el-color-picker v-model="data.textColor" show-alpha />
      </el-form-item>
      <el-form-item label="圆角">
        <el-input-number v-model="data.radius" :min="0" :max="500" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "custom-button-option",
  props: {
    attribute: Object,
  },
  data() {
    return {
      data: this.attribute,
    };
  },
};
</script>

<style scoped>
</style>
