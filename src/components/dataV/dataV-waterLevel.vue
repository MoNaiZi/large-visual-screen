<template>
  <dv-water-level-pond :key="refreshFlagKey" :config="config" :style="{width:width+'px',height:height+'px'}" />
</template>

<script>
export default {
  name: "dataV-waterLevel",
  title: "水位图",
  icon: 'GobletSquareFull',
  initWidth: 120,
  initHeight: 100,
  group: 'chart',
  props:{
    width:Number,
    height:Number,
    option:Object
  },
  data(){
    return {
      config: {},
      uuid: null,
      refreshFlagKey: null
    }
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
  created() {

  },
  methods:{

    
  }
}
</script>

<style scoped>

</style>
