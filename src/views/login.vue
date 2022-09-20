<template>
  <div>
    <div class="bg">
      <div class="login_main">
        <div class="tab">
          <text :class="{ active: this.active }" @click="this.active = true"
            >密码登录</text
          >
          <text :class="{ active: !this.active }" @click="this.active = false"
            >免费注册</text
          >
        </div>

        <el-form
          class="from"
          :model="loginForm"
          :rules="rules"
          ref="login"
          label-width="0"
        >
          <el-form-item prop="name" class="item">
            <el-input
              v-model="loginForm.name"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>

          <el-form-item v-show="!active" prop="email" class="item">
            <el-input
              v-model="loginForm.email"
              placeholder="请输入邮箱"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password" class="item">
            <el-input
              v-model="loginForm.password"
              placeholder="输入密码登录"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>

        <div class="btn">
          <el-button
            style="width: 100%; height: 40px"
            type="primary"
            @click="submitForm"
          >
            {{ active ? "登录" : "注册" }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const inspectEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      const emailRegExp = /^\w{6,18}@\w{2,4}\.(com)|(net)$/;
      if (!emailRegExp.test(value)) {
        callback(new Error("请输入正确的邮箱"));
      }
      return true;
    };
    return {
      rules: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "长度在 3 到 5 个字符",
            trigger: "blur",
          },
        ],
        email: [
          {
            validator: inspectEmail,
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入登录密码",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "长度在 3 到 5 个字符",
            trigger: "blur",
          },
        ],
      },
      loginForm: {
        name: "",
        email: "",
        password: "",
      },
      active: true, //true 登录 false 注册
    };
  },
  methods: {
    submitForm() {
      const that = this;
      const active = this.active;
      let arr = ["name", "password"];
      if (!active) arr.push("email");
      this.$refs["login"].validateField(arr, (valid) => {
        if (valid) {
          that.loginAndRegistration();
        } else {
          return false;
        }
      });
    },
    async loginAndRegistration() {
      const active = this.active;
      const loginForm = this.loginForm;
      let result = {
        code: 0,
        msg: "",
      };
      if (active) delete loginForm.email;
      if (active) {
        //登录
        result = await this.$api("/login", "post", loginForm);
      } else {
        //注册
        result = await this.$api("/register", "post", loginForm);
      }

      const { code, msg, data } = result;
      let type = "success";

      if (code == 1 && active) {
        if (msg === "请先注册") {
          this.active = false;
        }

        type = "warning";
      }
      if (code == 0 && !active) {
        this.active = true;
      } else if (code == 1 && !active) {
        type = "warning";
      }
      if (msg === "登录成功") {
        localStorage.setItem("users", JSON.stringify(data));
        setTimeout(() => {
          this.$router.push("/index");
        }, 2000);
      }

      this.$message({
        showClose: true,
        message: msg,
        type,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.active {
  font-size: 23px;
}

::v-deep .el-form-item__error {
  left: 10px;
}

::v-deep .el-input__inner {
  border: 0;
  border-radius: 0;
  padding: 0;
  font-size: 16px;
  border-bottom: solid 1px #dcdee0 !important;
}

::v-deep .el-input__icon {
  font-size: 20px;
}

::v-deep .el-input__wrapper:hover {
  box-shadow: 0 0 0 0;
}

::v-deep .el-input__wrapper {
  box-shadow: 0 0 0 0 !important;
}

.from {
  margin: 30px 0px;

  .item {
    margin-top: 40px;
  }
}

.login_main {
  height: 320px;
  width: 20%;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  div {
    width: 100%;
    display: flex;
    font-size: 19px;
    align-items: center;

    text {
      cursor: pointer;
    }

    text:last-child {
      margin-left: 10px;
    }
  }
}

.bg {
  // background-image: url('https://t7.baidu.com/it/u=810585695,3039658333&fm=193&f=GIF');
  background: #a0a0a0;
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
