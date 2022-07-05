<template>
  <dv-percent-pond
    :key="refreshFlagKey"
    ref="percentPond"
    :config="attribute"
    style="width: 100%; height: 100%"
  />
</template>

<script>
export default {
  name: "dataV-percentPond",
  catalogue: "dataV",
  title: "进度池",
  icon: "Film",
  initWidth: 300,
  initHeight: 100,
  group: "chart",
  props: {
    width: Number,
    height: Number,
    option: Object,
  },
  watch: {
    "option.attribute": {
      handler() {
        console.log("有变动");
        this.refreshFlagKey = this.$createId();
      },
      deep: true, //深度监听
    },
    width() {},
    height() {},
  },
  data() {
    return {
      uuid: null,
      attribute: this.option.attribute,
      refreshFlagKey: this.$createId(), //强制刷新视图
    };
  },
  created() {},
  beforeUnmount() {
    const percentPond = this.$refs.percentPond;
    clearTimeout(percentPond.animationHandler);
    console.log("在卸载组件实例之前调用。在这个阶段，实例仍然是完全正常的。。");
  },
  methods: {},
};
</script>

<style scoped>
</style>
