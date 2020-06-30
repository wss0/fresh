<template>
  <div>
    <div class="blueBig">
      <div>
        <img src="@/assets/hema/hema_logo.png" alt />
      </div>
      <div>
        <img src="@/assets/hema/hema_text.png" alt />
      </div>
    </div>
    <div class="phone">
      手机淘宝
      <span>快速登录</span>
    </div>
    <div class="zhi">
      支付宝
      <span>快速登录</span>
    </div>
    <div class="zhang" @click="btn">账号/密码登录</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    btn() {
      this.$router.push({
        path: "/loginTwo"
      });
    }
  }
};
</script>

<style lang="less" scoped>
div {
  text-align: center;
  display: flex;
  flex-direction: column;
  .blueBig {
    color: blue;
    font-size: 30px;
    height: 280px;
    div {
      width: 200px;
      height: 200px;
      margin-left: 138px;
      margin-top: 63px;
      img {
        width: 100px;
      }
    }
  }
  .phone {
    margin-left: 36px;
    border: 1px solid #ff5511;
    background-color: #ff5511;
    color: white;
    width: 300px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    display: inline-block;
    font-size: 25px;
    margin-bottom: 8px;
    span {
      margin-left: 5px;
      font-size: 18px;
    }
  }
  .zhi {
    margin-left: 36px;
    border: 1px solid blue;
    background-color: blue;
    color: white;
    width: 300px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    display: inline-block;
    font-size: 25px;
    margin-bottom: 8px;
    span {
      margin-left: 5px;
      font-size: 18px;
    }
  }
  .zhang {
    margin-left: 36px;
    border: 1px solid black;
    color: black;
    width: 300px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    display: inline-block;
    font-size: 15px;
  }
}
</style>
