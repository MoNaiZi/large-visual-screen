<template>
  <div :id="id" style="width: 100%; height: 100%"></div>
</template>

<script>
import { markRaw } from "vue";
export default {
  name: "chart-funnel",
  catalogue: "echarts",
  title: "漏斗图",
  icon: "Filter",
  group: "chart",
  initWidth: 400,
  initHeight: 400,
  props: {
    option: Object,
    width: [String, Number],
    height: [String, Number],
  },
  watch: {
    option: {
      deep: true,
      handler() {
        this.init();
        this.generate();
      },
    },
    width() {
      this.chart.resize();
    },
    height() {
      this.chart.resize();
    },
  },
  data() {
    return {
      id: this.$createId(),
      data: [],
      chart: {},
    };
  },
  created() {
    this.init();
  },
  mounted() {
    this.chart = markRaw(this.$echarts.init(document.getElementById(this.id)));
    this.generate();
  },
  methods: {
    init() {
      this.data = this.$getData(this.option);
    },
    generate() {
      let data = this.data;
      let attribute = this.option.attribute;
      let dataNameList = data.map((item) => item.name);
      let option = {
        title: {
          text: attribute.title,
          bottom: 10,
          x: "center",
          textStyle: {
            color: attribute.titleColor,
            fontSize: attribute.titleFontSize,
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}%",
        },
        // toolbox: {
        // 	feature: {
        // 		dataView: {
        // 			readOnly: false
        // 		},
        // 		restore: {},
        // 		saveAsImage: {}
        // 	}
        // },
        legend: {
          data: dataNameList,
          textStyle: {
            color: "#fff",
            fontSize: 15,
            lineHeight: 50,
            marginTop: 20,
          },
        },

        series: [
          {
            name: "Funnel",
            type: "funnel",
            left: "10%",
            top: 60,
            bottom: 60,
            width: "80%",
            min: 0,
            max: 100,
            minSize: "0%",
            maxSize: "100%",
            sort: "descending",
            gap: attribute.gap,
            label: {
              show: true,
              position: "inside",
              fontSize: attribute.itemFontSize,
            },
            labelLine: {
              length: 10,

              lineStyle: {
                width: 1,
                type: "solid",
              },
            },
            itemStyle: {
              borderColor: attribute.itemBorderColor,
              borderWidth: attribute.itemBorderWidth,
            },
            emphasis: {
              label: {
                fontSize: 30,
              },
            },
            data,
          },
        ],
      };
      this.chart.setOption(option);
    },
  },
};
</script>

<style>
</style>
