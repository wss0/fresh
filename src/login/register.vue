<template>
  <div class="loginBox">
     <div>
        <img src="@/assets/hema/hema_logo.png" alt />
      </div>
    <div>
      <el-input v-model="username" class="inp" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
      <el-input
        v-model="password"
        prefix-icon=" el-icon-s-promotion"
        class="inp"
        placeholder="请输入用户密码"
      ></el-input>
      <el-input
        v-model="passwordNew"
        prefix-icon=" el-icon-s-promotion"
        class="inp"
        placeholder="确认用户密码"
      ></el-input>
      <el-button type="primary" class="btn" @click="login">立即注册</el-button>
    </div>
    <div class="tip">
      已有账号?
      <span @click="$router.push('/login')" class="font-color-green">立即登录</span>
    </div>
  </div>
</template>
<script>
import { register } from "@/api/index.js";
import { mapState, mapMutations } from "vuex";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      passwordNew: ""
    };
  },

  methods: {
    ...mapMutations(["changeToken"]),
    login() {
      if (!this.username || !this.password || this.passwordNew) {
        this.$message({
          message: "用户名个密码不能为空",
          showClose: true,
          type: "error"
        });
      }
      let obj = {
        account: this.username,
        password: this.password,
        passwordNew: this.passwordNew
      };
      register(obj).then(data => {
        this.$alert("恭喜您，登录成功", "提示", {
          confirmButtonText: "好的",
          callback: action => {
            this.$router.push("/");
          }
        });
      });
    },
  },
  computed: {
    ...mapState(["a"])
  }
};
</script>
<style lang="less" scoped>
.loginBox {
  width: 100%;
  height: 100%;
  text-align: center;
  background: rgba(255, 68, 0, 0.192);
  position: fixed;
  top: 0;
  left: 0;
  h2 {
    height: 60px;
    line-height: 60px;
    margin-top: 70px;
  }
  h3 {
    margin: 30px 0;
  }
  > div {
    width: 300px;
    background: #fff;
    margin: auto;
    padding-top: 20px;
    .inp {
      width: 80%;
      margin: 5px auto;
    }
    .btn {
      width: 80%;
      margin: 20px auto;
    }
  }
  > p {
    position: absolute;
    bottom: 10px;
    width: 100%;
    text-align: center;
  }
}
</style>