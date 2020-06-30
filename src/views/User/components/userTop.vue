<template>
  <div>
    <div class="user">
      <div class="userTop">
        <div class="top-left">
          <i class="iconfont">&#xe613;</i>
        </div>
        <div class="top-right">
          <img src="@/assets/life/客服.png" alt />
          <i class="iconfont">&#xe60b;</i>
          <i class="iconfont">&#xe646;</i>
        </div>
      </div>
      <div class="userName">
        <router-link to="/login" class="NameRight">
          <img src alt />
        </router-link>
        <div class="NameLeft">
          <span class="NameLTop">设置昵称</span>
          <span class="NameLBottom">会员名：珊珊最美</span>
        </div>
      </div>
      <div class="userYou">
         <userTopB></userTopB>
      </div>
    </div>
    

  </div>
</template>

<script>
import userTopB from '@/views/User/components/userTopB'
export default {
  data() {
    return {

    };
  },
  methods: {},
  components:{
    userTopB
  }
};
</script>

<style lang='less' scoped>
.user{
  background-color: #fff;
}
.userTop {
  display: flex;
  justify-content: space-between;
  .top-left {
    i {
      font-size: 30px;
    }
  }
  .top-right {
    img {
      width: 20px;
      height: 20px;
      margin-top: -12px;
      margin-left: 4px;
    }
    i {
      margin-left: 5px;
      font-size: 25px;
    }
  }
}
.userName {
  //  border: 1px solid red;
  display: flex;
  margin-left: 8px;
  .NameRight {
    border: 1px solid black;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
  .NameLeft {
    margin-top: 5px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    span {
      margin-top: 5px;
      width: 150px;
      height: 20px;
      //  border: 1px solid blue;
    }
    .NameLTop {
      font-weight: bold;
      font-size: 18px;
      font-family: Microsoft Yahei;
    }
    .NameLBottom {
      font-size: 10px;
    }
  }
}
.userYou {
  margin-top: 10px;
  height: 40px;
  width: 100%;
  border-bottom: 1px solid black;
  div {
    span {
      display: inline-block;
      width: 25%;
      margin-top: 4px;
    }
  }
  .YT {
    text-align: center;
  }
  .YB {
    text-align: center;
  }
}
</style>
