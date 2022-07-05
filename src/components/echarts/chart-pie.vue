<template>
  <div :id="id" style="width: 100%; height: 100%"></div>
</template>

<script>
import { markRaw } from "vue";
export default {
  name: "chart-pie",
  catalogue: "echarts",
  title: "饼图",
  icon: "PieChart",
  group: "chart",
  props: {
    width: Number,
    height: Number,
    option: Object,
  },
  data() {
    return {
      id: this.$createId(),
      chartOption: {},
      chart: undefined,
      cptData: [],
    };
  },
  watch: {
    "option.attribute": {
      handler(obj, newObj) {
        this.loadChart(newObj);
      },
      deep: true, //深度监听
    },
    width() {
      this.chart.resize();
    },
    height() {
      this.chart.resize();
    },
  },
  created() {
    this.cptData = this.$getData(this.option);
  },
  mounted() {
    this.chart = markRaw(this.$echarts.init(document.getElementById(this.id)));
    this.loadChart(this.option.attribute);
  },
  methods: {
    loadChart(attribute) {
      const that = this;
      that.chartOption = {
        color: attribute.pieColor,
        title: {
          text: attribute.chartTitle,
          subtext: attribute.subtext,
          left: attribute.titleX,
          top: attribute.titleY,
          textStyle: {
            fontSize: attribute.titleFontSize,
            color: attribute.titleTextColor,
          },
          // 副标题文本样式设置
          subtextStyle: {
            fontSize: 12,
            color: attribute.subtextColor,
          },
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          show: attribute.legendShow,
          orient: attribute.orient,
          x: attribute.legendX,
          y: attribute.legendY,
          textStyle: {
            color: attribute.legendTextColor,
            fontSize: attribute.legendFontSize,
          },
        },
        series: [
          {
            name: attribute.chartTitle,
            type: "pie",
            roseType:
              attribute.roseType === "false" ? false : attribute.roseType,
            radius: [
              attribute.radiusInside + "%",
              attribute.radiusOutside + "%",
            ],
            label: {
              position: attribute.labelPosition,
              fontSize: attribute.labelFontSize,
              color: attribute.labelColor,
            },
            itemStyle: {
              borderRadius: attribute.borderRadius,
            },
            data: this.cptData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(255, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      that.chart.setOption(that.chartOption);
    },
  },
};
</script>

<style scoped>
</style>
