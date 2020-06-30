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
        type="password"
      ></el-input>
    
      <el-button type="primary" class="btn" @click="login">登录</el-button>
      <el-button type="primary" class="btn" @click="zhuCe">注册</el-button>
      <el-button type="primary" class="btn" @click="Forget">忘记密码</el-button>
    </div>
  </div>
</template>
<script>
import { login } from "@/api/index.js";
import { mapState, mapMutations } from "vuex";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  created() {
    // console.log(this.token)
    console.log(this.$store.state.a)
  },
  methods: {
    ...mapMutations(["changeToken"]),
    login() {
      if (!this.username || !this.password) {
        this.$message({
          message: "用户名个密码不能为空",
          showClose: true,
          type: "error"
        });
      }
      let obj = {
        account: this.username,
        password: this.password
      };
      login(obj).then(data => {
        // console.log(data)
        this.changeToken(data.data.data.token);
        localStorage.setItem("token", data.data.data.token);
        this.$alert("恭喜您，登录成功", "提示", {
          confirmButtonText: "好的",
          callback: action => {
            this.$router.push("/home/first");
          }
        });
      });
    },
    zhuCe() {
      this.$router.push("/register");
    },
   Forget(){
     this.$router.push('/Forget')
   }
  },
  computed: {
    ...mapState(["a"])
  }
};
</script>
<style lang="less" >
 .el-message-box{
   width: 355px !important;
}
</style>
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