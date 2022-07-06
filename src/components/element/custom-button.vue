<template>
  <div style="height: 100%">
    <button
      style="
        width: 100%;
        height: 100%;
        border: none;
        position: absolute;
        left: 0px;
      "
      @click="redirect()"
      :style="{
        background: option.attribute.bgColor,
        color: option.attribute.textColor,
        borderRadius: option.attribute.radius + 'px',
        fontSize: option.attribute.fontSize + 'px',
        fontWeight: option.attribute.fontWeight,
      }"
    >
      {{ cptData }}
    </button>
  </div>
</template>

<script>
export default {
  name: "custom-button",
  title: "按钮",
  icon: "Pointer",
  initWidth: 150,
  initHeight: 50,
  group: "basic",
  catalogue: "element",
  props: {
    option: Object,
  },
  watch: {
    option: {
      deep: true,
      handler() {
        this.cptData = this.$getData(this.option);
      },
    },
  },
  data() {
    return {
      cptData: "",
    };
  },
  created() {
    this.cptData = this.$getData(this.option);
  },
  methods: {
    redirect() {
      if (this.option.attribute.url) {
        if (this.option.attribute.url.startsWith("view")) {
          this.$router.push(this.option.attribute.url);
          this.$emit("reload");
        } else {
          window.open(this.option.attribute.url);
        }
      }
    },
  },
};
</script>

<style scoped>
</style>
