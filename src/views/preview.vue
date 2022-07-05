<template>
  <div :style="[main]">
    <transition-group appear>
      <div
        v-for="(item, index) of list"
        :key="index"
        :style="[item_style(item)]"
      >
        <component
          :is="item.name"
          :ref="item.name + index"
          :width="Math.round(item.w)"
          :height="Math.round(item.h)"
          :option="item.options"
        >
        </component>
      </div>
    </transition-group>
  </div>
</template>

<script>
import initElementList from "@/utils/initElement";
import initDataV from "@/utils/initDataV";
import initEcharts from "@/utils/initEcharts";
export default {
  computed: {
    main: function () {
      const designData = this.designData;
      const isAuto = designData.isAuto;
      const mainW = designData.mainW;
      const mainH = designData.mainH;
      const defaultBg = this.defaultBg;
      console.log("defaultBg", defaultBg);
      const result = {
        width: isAuto ? "100vw" : mainW + "px",
        height: isAuto ? "100vh" : mainH + "px",
        background: `url(${defaultBg}) repeat`,
        // transform: `scale(${designData.containerScale})`,
        margin: "0 auto",
        overflow: "hidden",
      };
      if (designData.bgImg) {
        result.background = `url(${designData.bgImg}) no-repeat`;
      }
      console.log("result", result);
      return result;
    },
    item_style: function () {
      return (item) => {
        console.log("item", item);
        return {
          position: "absolute",
          width: Math.round(item.w) + "px",
          height: Math.round(item.h) + "px",
          top: Math.round(item.y) + "px",
          left: Math.round(item.x) + "px",
          zIndex: item.z,
        };
      };
    },
  },
  data() {
    return {
      name: "preview",
      defaultBg: require("@/assets/main_bg.png"),
      list: [],
      designData: {},
    };
  },
  created() {
    const list = JSON.parse(decodeURIComponent(localStorage.getItem("list")));
    let componentsList = [...initElementList, ...initDataV, ...initEcharts];
    for (let item of list) {
      let template = componentsList.find((j) => j.name === item.name);
      this.$app.component(template.name, template);
    }
    this.designData = JSON.parse(
      decodeURIComponent(localStorage.getItem("designData"))
    );
    this.list = list;
  },
};
</script>

<style lang="scss">
</style>
