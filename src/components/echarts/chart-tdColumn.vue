<template>
  <div :id="id" style="width: 100%; height: 100%"></div>
</template>

<script>
import { markRaw } from "vue";
export default {
  name: "chart-tdColumn",
  catalogue: "echarts",
  title: "立体柱图",
  icon: "Histogram",
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
      cptData: {},
    };
  },
  watch: {
    option: {
      handler() {
        this.init();
        this.loadChart();
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
    this.init();
  },
  mounted() {
    this.chart = markRaw(this.$echarts.init(document.getElementById(this.id)));
    this.loadChart();
  },
  methods: {
    init() {
      this.cptData = JSON.parse(this.$getData(this.option));
    },
    loadChart() {
      const that = this;
      let attribute = that.option.attribute;
      let columnColor = attribute.barColor;
      if (attribute.gradualColor) {
        columnColor = new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: attribute.barColor1,
          },
          {
            offset: 0.5,
            color: attribute.barColor2,
          },
          {
            offset: 1,
            color: attribute.barColor3,
          },
        ]);
      }
      that.chartOption = {
        color: columnColor,
        title: {
          text: attribute.chartTitle,
          textStyle: {
            color: attribute.titleTextColor,
          },
          left: attribute.titleLeft,
          top: attribute.titleTop,
        },
        tooltip: {},
        grid: {
          x: 10,
          y: 30,
          x2: 10,
          y2: 10,
          containLabel: true,
        },
        xAxis: {
          show: attribute.xAxisShow,
          type: "category",
          data: this.cptData.xData.split(","),
          axisLabel: {
            color: attribute.xLabelColor,
            rotate: attribute.xFontRotate, //倾斜角度-180~180
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
          show: attribute.yAxisShow,
          type: "value",
          axisLabel: {
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
        series: [
          {
            name: "新增用户数量",
            type: "bar", //pictorialBar || bar
            showBackground: attribute.barBgShow,
            stack: "account",
            barWidth: attribute.barWidth,
            data: this.cptData.yData.split(","),
          },
          {
            name: "邀请新用户数量",
            type: "bar",
            stack: "account",
            barWidth: attribute.barWidth,
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#ffae88",
                },
                {
                  offset: 1,
                  color: "#ff7388",
                },
              ]),
            },
            data: this.cptData.yData2.split(","),
          },
          {
            z: 3,
            type: "pictorialBar",
            symbolPosition: "end",
            symbol: "diamond",
            symbolOffset: [0, "-50%"],
            symbolSize: [attribute.barWidth, 10],
            symbolRotate: 0,
            itemStyle: {
              borderWidth: 0,
              color: "#10e6ff",
            },
            data: this.cptData.yData3.split(","),
          },
          {
            z: 3,
            type: "pictorialBar",
            symbolPosition: "end",
            symbol: "diamond",
            symbolOffset: [0, "-50%"],
            symbolSize: [attribute.barWidth, 10],
            itemStyle: {
              borderWidth: 0,
              color: "#ffcf90",
            },
            data: this.cptData.yData4.split(","),
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
