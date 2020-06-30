<template>
 <div class="wrapperA">
    <div class="myOrder">
    <div class="title acea-row row-between-wrapper">
      <div class="dingDan">我的订单</div>
      <router-link :to="'/order/list/'" class="allOrder" tag="li" style="list-style:none">
        查看更多订单
        <span class="iconfont icon-jiantou">></span>
      </router-link>
    </div>
    <div class="orderState acea-row row-middle">
      <router-link :to="{ path: '/order/list/' + 0 }" class="itemAT">
        <div class="pictrue">
          <img src="@/assets/shou/dfk (3).png" />
          <span
            class="order-status-num"
            v-if="orderStatusNum.unpaid_count > 0"
          >{{ orderStatusNum.unpaid_count }}</span>
        </div>
        <div>待付款</div>
      </router-link>
      <router-link :to="{ path: '/order/list/' + 1 }" class="itemAT">
        <div class="pictrue">
          <img src="@/assets/shou/dfk.png" />
          <span
            class="order-status-num"
            v-if="orderStatusNum.unshipped_count > 0"
          >{{ orderStatusNum.unshipped_count }}</span>
        </div>
        <div>待发货</div>
      </router-link>
      <router-link :to="{ path: '/order/list/' + 2 }" class="itemAT">
        <div class="pictrue">
          <img src="@/assets/shou/dsh.png" />
          <span
            class="order-status-num"
            v-if="orderStatusNum.received_count > 0"
          >{{ orderStatusNum.received_count }}</span>
        </div>
        <div>待收货</div>
      </router-link>
      <router-link :to="{ path: '/order/list/' + 3 }" class="itemAT">
        <div class="pictrue">
          <img src="@/assets/shou/dpj.png" />
          <span
            class="order-status-num"
            v-if="orderStatusNum.evaluated_count > 0"
          >{{ orderStatusNum.evaluated_count }}</span>
        </div>
        <div>待评价</div>
      </router-link>
    </div>
  </div>
 </div>
</template>

<script>
import { getUser, getMenuUser } from "@/api/index.js";
export default {
  data() {
    return {
      orderStatusNum: {}
    };
  },
  methods: {
    User: function() {
      let that = this;
      getUser().then(res => {
        that.userInfo = res.data;
        that.orderStatusNum = res.data.orderStatusNum;
        this.generalContent = {
          promoterNum: `您在商城累计消费金额仅差 <span style="color: #ee5a52;">${res
            .data.promoter_price || 0}元</span>即可开通推广权限`,
          title: "您未获得推广权限"
        };
      });
    }
  }
};
</script>

<style lang='less' scoped>

.myOrder {
  width: 360px;
  height: 115px;
  margin-left: 6px;
  margin-top: 7px;
  border: 1px solid #fff;
  border-radius: 10px;
   background-color: #fff;
  .title {
    display: flex;
    justify-content: space-between;
    margin-left: 22px;
    margin-right: 28px;
    .dingDan{
      margin-top: 3px;
      color: black;
      font-weight: bold;
    }
    .allOrder{
      color: #666666;
    }
  }

  .orderState {
    text-align: center;
    margin-top: 20px;
    display: flex;
     justify-content: space-evenly;
    .itemAT {
      // width: 25%;
      .pictrue {
         width: 40px;
        img {
          width: 45px;
        }
        span {
        }
      }
    }
  }
}
.orderState{
  div{
    color: black;
    font-size: 10px;
  }
}

</style>
