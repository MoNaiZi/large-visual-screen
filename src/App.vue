<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style lang="scss">
body {
  margin: 0px;
}

.flex {
  display: flex;
}
.el-header {
  z-index: 10 !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

*::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

*::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background: #5e708d;
}

*::-webkit-scrollbar-track {
  border-radius: 4px;
  background: #ddd;
}
</style>
