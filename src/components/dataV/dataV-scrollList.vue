<template>
  <dv-scroll-ranking-board :config="config" :style="{width:width+'px',height:height+'px'}" />
</template>

<script>
export default {
  name: "dataV-scrollList",
  title: "滚动列表",
  icon: 'Finished',
  group: 'chart',
  props:{
    width:Number,
    height:Number,
    option:Object
  },
  data(){
    return {
      config: {},
      uuid: null
    }
  },
  watch: {
    'option.attribute': {
      handler() {
    
      },
      deep: true//深度监听
    },
  },
  created() {

  },
  methods:{

  }
}
</script>

<style scoped>

</style>
