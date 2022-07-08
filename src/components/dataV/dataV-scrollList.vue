<template>
  <dv-scroll-ranking-board
    :config="attribute"
    :key="refreshFlagKey"
    ref="scrollList"
    :style="{ width: width + 'px', height: height + 'px' }"
  />
</template>

<script>
export default {
  name: "dataV-scrollList",
  catalogue: "dataV",
  title: "滚动列表",
  icon: "Finished",
  group: "chart",
  props: {
    width: Number,
    height: Number,
    option: Object,
  },
  data() {
    return {
      attribute: {},
      refreshFlagKey: "",
    };
  },
  watch: {
    option: {
      handler() {
        this.init();
        this.$updateComponentStatus(this, "scrollList");
      },
      deep: true, //深度监听
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.attribute.data = this.$getData(this.option);
    },
  },
  beforeUnmount() {
    this.$updateComponentStatus(this, "scrollList");
    console.log("在卸载组件实例之前调用。在这个阶段，实例仍然是完全正常的。。");
  },
};
</script>

<style scoped>
</style>
