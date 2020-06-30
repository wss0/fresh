<template>
  <div>
    <div class="wrapper">
       <router-link :to="{ path: '/user/account' }" class="item">
          <div>我的余额</div>
          <div class="num">{{ userInfo.now_money || 0 }}</div>
        </router-link>
      <router-link :to="'/user/integral'" class="item" >
        <div>当前积分</div>
        <div class="num">{{ userInfo.integral || 0 }}</div>
      </router-link>
      <router-link :to="'/user/user_coupon'" class="item">
        <div>优惠券</div>
        <div class="num">{{ userInfo.couponCount || 0 }}</div>
      </router-link>
    </div>
  </div>
</template>


<script>
import { getUser } from "@/api/index";
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  mounted() {
    this.User();
  },
  methods: {
    User: function() {
      getUser().then(res => {
        this.userInfo = res.data.data;
      });
    }
  }
};
</script>


<style lang='less' scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  a {
    text-align: center;
    .numT {
    }
    .num {
    }
  }
}
</style>