<template>
  <component
    :key="refreshFlagKey"
    ref="decoration"
    :is="option.attribute.decorationType"
    :style="{
      width: width + 'px',
      height: height + 'px',
      color: option.attribute.textColor,
    }"
    style="display: flex"
    :color="[option.attribute.color1, option.attribute.color2]"
    >{{ option.attribute.text }}</component
  >
</template>

<script>
export default {
  name: "dataV-decoration",
  catalogue: "dataV",
  title: "炫酷装饰",
  icon: "MagicStick",
  initWidth: 256,
  initHeight: 191,
  group: "basic",
  props: {
    width: Number,
    height: Number,
    option: Object,
  },
  watch: {
    option: {
      handler() {},
      deep: true, //深度监听
    },
    width() {},
  },
  data() {
    return {
      refreshFlagKey: "",
    };
  },
  beforeUnmount() {
    this.$updateComponentStatus(this, "decoration");
    console.log("在卸载组件实例之前调用。在这个阶段，实例仍然是完全正常的。。");
  },
};
</script>

<style scoped>
</style>
