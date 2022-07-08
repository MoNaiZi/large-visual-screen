<template>
  <dv-active-ring-chart
    :key="refreshFlagKey"
    ref="ringChart"
    :config="config"
    style="width: 100%; height: 100%"
    :style="{ '--top': pageType === 'preview' ? '0px' : '-45px' }"
  />
</template>

<script>
export default {
  name: "dataV-activeRing",
  catalogue: "dataV",
  title: "动态环图",
  icon: "Help",
  group: "chart",
  props: {
    width: Number,
    height: Number,
    option: Object,
    pageType: String,
  },
  watch: {
    option: {
      handler() {
        this.init();
        this.$updateComponentStatus(this, "ringChart");
      },
      deep: true, //深度监听
    },
    width() {
      this.$refs.ringChart.chart.resize();
      //   this.$updateComponentStatus(this, "ringChart");
    },
    height() {
      this.$refs.ringChart.chart.resize();
      //   this.$updateComponentStatus(this, "ringChart");
    },
  },
  data() {
    return {
      config: {},
      refreshFlagKey: this.$createId(),
    };
  },
  created() {
    console.log("this", this);
    this.init();
  },
  mounted() {},
  beforeUnmount() {
    this.$updateComponentStatus(this, "ringChart");
    console.log("在卸载组件实例之前调用。在这个阶段，实例仍然是完全正常的。。");
  },
  unmounted() {
    // clearTimeout(animationHandler)
    console.log(
      "卸载组件实例后调用。调用此钩子时，组件实例的所有指令都被解除绑定，所有事件侦听器都被移除，所有子组件实例被卸载。"
    );
  },
  methods: {
    init() {
      let data = this.$getData(this.option);
      this.config = { data, ...this.option.attribute };
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .active-ring-chart-container {
  position: absolute;
}
::v-deep .active-ring-info {
  position: relative !important;
  top: var(--top) !important;
  .active-ring-name {
    width: 150px !important;
    overflow: inherit !important;
  }
  /* top: -72px !important; */
}
</style>
