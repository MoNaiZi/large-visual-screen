<template>
  <dv-digital-flop
    :config="flopConfig"
    ref="digitalFlop"
    style="width: 100%; height: 100%"
  />
</template>

<script>
export default {
  name: "dataV-digitalFlop",
  catalogue: "dataV",
  title: "数字翻牌器",
  icon: "DataAnalysis",
  initWidth: 256,
  initHeight: 80,
  group: "chart",
  props: {
    width: Number,
    height: Number,
    option: Object,
  },
  data() {
    return {
      flopConfig: {
        number: [999],
        content: "{nt}个",
      },
      textList: [],
    };
  },
  watch: {
    option: {
      handler() {
        this.init();
      },
      deep: true, //深度监听
    },
    width() {},
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      let dataText = this.$getData(this.option);
      if (dataText) {
        console.log("dataText", typeof dataText);
        let textList = JSON.parse(dataText); //dataText.split(",");
        this.textList = textList;
        this.ClearTiming();
        let content = this.option.attribute.content;
        const that = this;
        for (let [i, item] of textList.entries()) {
          console.log("item", item);
          let time = i + 1;
          let list = item;
          that[`time${i}`] = setInterval(() => {
            that.flopConfig = {
              number: list,
              content,
            };
          }, 1000 * time);
        }
      }
    },
    ClearTiming() {
      for (let i = 0; i < this.textList.length; i++) {
        clearTimeout(this[`time${i}`]);
      }
    },
  },
  beforeUnmount() {
    this.ClearTiming();
    const digitalFlop = this.$refs.digitalFlop;
    clearTimeout(digitalFlop.animationHandler);
    console.log("在卸载组件实例之前调用。在这个阶段，实例仍然是完全正常的。。");
  },
};
</script>

<style scoped>
</style>
