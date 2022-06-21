<template>
  <div :style="[mian_fn]">
    <div class="tab_main">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="User" name="first">User</el-tab-pane>
        <el-tab-pane label="Config" name="second">Config</el-tab-pane>
        <el-tab-pane label="Role" name="third">Role</el-tab-pane>
        <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
      </el-tabs>
    </div>
    <div></div>
  </div>
</template>
<script>
export default {
  computed: {
    mian_fn: function () {
      let result = { background: "#fff", width: "0px" }; //280px

      return result;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>