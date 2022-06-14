<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-button type="primary" @click="toEdite">立即创建</el-button>
        <el-button>登出</el-button>
      </el-header>
      <div style="height: 70px"></div>
      <el-main>
        <h3>我的大屏</h3>
        <!-- 	<div class="list">
					<div class="item" v-for="item in 20" :key="item">
						{{item}}
					</div>
				</div> -->
        <el-row :gutter="20">
          <el-col :span="6" v-for="(item, index) in list" :key="index">
            <div class="item">
              <el-image
                style="width: 100%; height: 100%"
                src="https://t7.baidu.com/it/u=810585695,3039658333&fm=193&f=GIF"
                :fit="fit"
              />
              <text>{{ item }}</text>
              <div class="operation">
                <div @click="toEdite(item)">编辑</div>
                <div @click="remove">删除</div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-empty v-if="!list.length" description="我的大屏为空,快去创建吧" />
        <div class="templateList"></div>
      </el-main>
    </el-container>
  </div>
</template>


<script>
import { ElMessage, ElMessageBox } from "element-plus";
export default {
  data() {
    return {
      list: [],
      users: JSON.parse(localStorage.getItem("users") || "{}"),
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      const _id = this.users._id;
      if (!_id) {
        ElMessage({
          type: "success",
          message: "请先登录",
        });
        setTimeout(() => {
          this.$router.push("/login");
        }, 2000);
        return;
      }
      this.$api("/getDataList", "get", { id: this.users._id }).then((res) => {
        this.list = res;
      });
    },
    toEdite(item) {
      const _id = item && item._id ? item._id : "";
      this.$router.push({
        path: "/edite",
        query: { _id },
      });
    },
    remove() {
      ElMessageBox.confirm("确认要删除吗，删除之后不可恢复?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        ElMessage({
          type: "success",
          message: "删除成功",
        });
      });
    },
  },
};
</script>

<style scoped lang="scss">
$white: #fff;
$black: #000;
$zIndex0: 0;
$zIndex1: 1;

.item {
  position: relative;
  width: 270px;
  height: 339px;
  background: #eceff5;
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;
  box-shadow: 2px 2px 5px 0px #dedede;

  text {
    position: absolute;
    z-index: $zIndex1;
  }

  .el-image {
    width: 100% !important;
    height: 100% !important;
    position: absolute;
    left: 0;
    z-index: $zIndex0;
  }

  .operation {
    display: flex;
    width: 70%;
    background: #fff;
    border-radius: 30px;
    justify-content: space-evenly;
    position: absolute;
    left: 15%;
    right: 0px;
    bottom: 18px;
    height: 40px;
    line-height: 40px;
    font-size: 13px;

    div {
      width: 50%;
    }
  }
}

.item:hover {
  box-shadow: 3px 8px 12px 2px #dedede;
}

.el-container {
  height: auto;
  overflow: auto;
}

.el-header {
  background: $white;
  color: $black;
  box-shadow: 2px 0px 8px 0px #dcdcdc inset;
  text-align: right;
  position: fixed;
  left: 0px;
  right: 0px;
  height: 70px;
  z-index: 999999;
}

.el-main {
  background: $white;
  color: $black;
  padding: 20px !important;
  line-height: 50px;
  width: 80%;
  margin: 0 auto;
  overflow: visible;

  h3 {
    text-align: left;
    line-height: 15px;
  }

  .list {
    text-align: left;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
  }
}
</style>
