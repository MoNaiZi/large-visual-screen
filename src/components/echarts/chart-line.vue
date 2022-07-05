<template>
  <div :id="id" style="width: 100%; height: 100%"></div>
</template>

<script>
import { markRaw } from "vue";
export default {
  name: "chart-line",
  catalogue: "echarts",
  title: "折线图",
  icon: "DataLine",
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
        color: attribute.lineColor,
        title: {
          text: attribute.title,
          subtext: attribute.subtext,
          left: attribute.titleLeft,
          top: attribute.titleTop,
          textStyle: {
            color: attribute.titleTextColor,
          },
          subtextStyle: {
            fontSize: 12,
            color: attribute.subtextColor,
          },
        },
        grid: {
          x: 10,
          y: 30,
          x2: 10,
          y2: 10,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: that.cptData.xData.split(","),
          axisLabel: {
            show: attribute.xLabelShow,
            color: attribute.xLabelColor,
          },
          axisLine: {
            show: attribute.xLineShow,
            lineStyle: {
              color: attribute.xLineColor,
            },
          },
          axisTick: {
            //x轴刻度线
            show: attribute.xTickShow,
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            show: attribute.yLabelShow,
            color: attribute.yLabelColor,
          },
          axisLine: {
            show: attribute.yLineShow,
            lineStyle: {
              color: attribute.yLineColor,
            },
          },
          axisTick: {
            //y轴刻度线
            show: attribute.yTickShow,
          },
          splitLine: {
            //网格线
            show: attribute.yGridLineShow,
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        series: [
          {
            data: that.cptData.yData.split(","),
            type: "line",
            smooth: attribute.smooth,
            areaStyle: {
              color: new that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: attribute.areaColor1,
                },
                {
                  offset: 0.34,
                  color: attribute.areaColor2,
                },
                {
                  offset: 1,
                  color: attribute.areaColor3,
                },
              ]),
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
