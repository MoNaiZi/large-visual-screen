<template>
  <dv-percent-pond :key="refreshFlagKey" :config="pondConfig" style="width: 100%;height: 100%" />
</template>

<script>


export default {
  name: "dataV-percentPond",
  title: "进度池",
  icon: 'Film',
  initWidth: 300,
  initHeight: 100,
  group: 'basic',
  props:{
    width:Number,
    height:Number,
    option:Object
  },
  watch: {
    'option.attribute': {
      handler() {
        this.loadData();
      },
      deep: true//深度监听
    },
    width(){

    },
    height(){

    }
  },
  data() {
    return {
      uuid: null,
      pondConfig:{},
      refreshFlagKey: null //强制刷新视图
    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style scoped>

</style>
