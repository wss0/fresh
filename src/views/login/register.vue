<template>
  <div class="loginBox">
    <div>
      <img src="@/assets/hema/hema_logo.png" alt />
      <div class="zhangHao">注册帐号</div>
    </div>
    <div>
      <el-input v-model="userPhone" class="inp" prefix-icon="el-icon-user" placeholder="+86>手机号"></el-input>
      <el-input v-model="userCode" class="inp" prefix-icon="el-icon-user" placeholder="短信验证码"></el-input>
      <!-- a标签组织事件默认行为  javascript:;-->
      <button @click="sendCode" class="yanzheng">{{isRun?`${runTime}s后重获取`:"获取验证码"}}</button>

      <el-input
        v-model="password"
        prefix-icon=" el-icon-s-promotion"
        class="inp"
        placeholder="请输入用户密码"
        type="password"
      ></el-input>
      <el-input
        v-model="passwordNew"
        prefix-icon=" el-icon-s-promotion"
        class="inp"
        placeholder="确认用户密码"
        type="password"
      ></el-input>
      <el-button type="primary" class="btn" @click="register">立即注册</el-button>
    </div>
    <div class="tip">
      已有账号?
      <span @click="$router.push('/login')" class="font-color-green">立即登录</span>
    </div>
  </div>
</template>
<script>
import { register, sendCode , getCodeApi } from "@/api/index.js";
import { mapState, mapMutations } from "vuex";
export default {
  name: "login",
  data() {
    return {
      userPhone: "13323164180",
      userCode: "",
      password: "",
      passwordNew: "",
      keyCode:"",
      //倒计时
      isRun: false, //是否发送验证码   发送显示时间  没有显示获取验证码文字
      runTime: 60
    };
  },
  mounted(){
     this.getCode()
  },
  methods:  {
    ...mapMutations(["changeToken"]),

    getCode() {
      var that =this
      getCodeApi()
        .then(res => {
          that.keyCode = res.data.data.key;
        })
        .catch(res => {
          that.$dialog.error(res.msg);
        });
    },
    async sendCode() {
      if (this.isRun) return; //代表已经运行  就停止下面的操作
      //验证
      if (!/^1\d{10}$/.test(this.userPhone)) {
        this.$message({
          message: "请保证手机号正确",
          showClose: true,
          type: "error"
        });
        return;
      }

      //通知服务器发送验证码
      let obj = {
        phone: this.userPhone,
        type: "register",
        key: this.keyCode
      };
      await sendCode(obj).then(res => {
        console.log(res);
      });

      //成功  开启倒计时
      this.isRun = true;
      this.autoTimer = setInterval(() => {
        if (this.runTime == 0) {
          //这样会重新渲染所以
          this.runTime = 60;
          this.isRun = false; //相当于跑完了
          clearInterval(this.autoTimer); //不要忘记清定时器
          return;
        }
        this.runTime--;
      }, 1000);
    },
    register() {
      if (!this.userPhone || !this.password || this.passwordNew) {
        this.$message({
          message: "用户名个密码不能为空",
          showClose: true,
          type: "error"
        });
      }
      let obj = {
        account: this.userPhone,
        // captcha: this.userCode,
        captcha: '123456',
        password: this.password,
        spread:0
      };
      register(obj).then(data => {
        this.$alert("恭喜您，注册成功", "提示", {
          confirmButtonText: "好的",
          callback: action => {
            this.$router.push("/home/first");
          }
        });
      });
    }
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
  .zhangHao {
    font-weight: bold;
    font-size: 0.4rem;
  }
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
    .yanzheng {
      border-radius: 0.4rem;
      border: 1px solid pink;
      background-color: pink;
      padding: 0.1rem;
      font-weight: bold;
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