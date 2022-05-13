<template>
  <div>
<!--    组件内部没有设置deep监听props，数据变更时，请生成新的props，不然组件将无法刷新状态-->
    <dv-scroll-board :config="config" :style="{width:width+'px',height:height+'px'}" />
  </div>

</template>

<script>

export default {
  name: "dataV-scrollTable",
  title: "滚动表格",
  icon: 'SGrid',
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
        this.loadData();
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
