<template>
  <div>
    <!--    组件内部没有设置deep监听props，数据变更时，请生成新的props，不然组件将无法刷新状态-->
    <dv-scroll-board
      :config="attribute"
      :key="refreshFlagKey"
      ref="scrollTable"
      :style="{ width: width + 'px', height: height + 'px' }"
    />
  </div>
</template>

<script>
export default {
  name: "dataV-scrollTable",
  catalogue: "dataV",
  title: "滚动表格",
  icon: "Grid",
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
        this.$updateComponentStatus(this, "scrollTable");
      },
      deep: true, //深度监听
    },
  },
  created() {
    this.attribute.data = this.$getData(this.option);
  },
  beforeUnmount() {
    this.$updateComponentStatus(this, "scrollTable");
    console.log("在卸载组件实例之前调用。在这个阶段，实例仍然是完全正常的。。");
  },
  methods: {},
};
</script>

<style scoped>
</style>
