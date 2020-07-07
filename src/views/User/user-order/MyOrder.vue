<template>
  <div class="my-order" ref="container">
    <div class="header w">
      <i>图片</i>
      <div class="header-border">
        <input type="text" placeholder="搜索我的订单" />
      </div>
      <i>图片</i>
    </div>
    <!-- nav -->
    <div class="unNav acea-row row-around">
      <div>全部分类</div>
      <div
        class="item"
        :class="{ on: type === 0 }"
        @click.stop="$router.replace({ path: '/order/list/0' })"
      >
        <div>待付款</div>
        <div class="num">{{ orderData.unpaid_count || 0 }}</div>
      </div>
      <div
        class="item"
        :class="{ on: type === 1 }"
        @click.stop="$router.replace({ path: '/order/list/1' })"
      >
        <div>待发货</div>
        <div class="num">{{ orderData.unshipped_count || 0 }}</div>
      </div>
      <div
        class="item"
        :class="{ on: type === 2 }"
        @click.stop="$router.replace({ path: '/order/list/2' })"
      >
        <div>待收货</div>
        <div class="num">{{ orderData.received_count || 0 }}</div>
      </div>
      <div
        class="item"
        :class="{ on: type === 3 }"
        @click.stop="$router.replace({ path: '/order/list/3' })"
      >
        <div>待评价</div>
        <div class="num">{{ orderData.evaluated_count || 0 }}</div>
      </div>
    </div>
    <!--  -->
     <div class="item" v-for="order in orderList" :key="order.id">
        <div
            class="item-info acea-row row-between row-top"
            v-for="cart in order.cartInfo"
            :key="cart.id"
          >
            <div class="pictrue">
              <img
                :src="cart.productInfo.image"
                @click.stop="
                  $router.push({ path: '/detail/' + cart.productInfo.id })
                "
                v-if="
                  cart.combination_id === 0 &&
                    cart.bargain_id === 0 &&
                    cart.seckill_id === 0
                "
              />
              <img
                :src="cart.productInfo.image"
                @click.stop="
                  $router.push({
                    path: '/activity/group_detail/' + cart.combination_id
                  })
                "
                v-else-if="cart.combination_id > 0"
              />
              <img
                :src="cart.productInfo.image"
                @click.stop="
                  $router.push({
                    path: '/activity/dargain_detail/' + cart.bargain_id
                  })
                "
                v-else-if="cart.bargain_id > 0"
              />
              <img
                :src="cart.productInfo.image"
                @click.stop="
                  $router.push({
                    path: '/activity/seckill_detail/' + cart.seckill_id
                  })
                "
                v-else-if="cart.seckill_id > 0"
              />
            </div>
        </div>
     </div>
    <!--  -->
    <div class="noCart" v-if="orderList.length === 0 && page > 1">
      <div class="pictrue">
        <img src="@/assets/images/noOrder.png" />
      </div>
    </div>
  </div>
</template>
<script>
import { getOrderData, getOrderList } from "@/api/index";

import { mapGetters } from "vuex";
import { isWeixin } from "@/utils";
const STATUS = [
  "待付款",
  "待发货",
  "待收货",
  "待评价",
  "已完成",
  "",
  "",
  "",
  "",
  "待付款"
];

const NAME = "MyOrder";

export default {
  name: NAME,
  data() {
    return {
      orderData: {},
      orderList: [],

      offlinePayStatus: 2,
      type: parseInt(this.$route.params.type) || 0,
      page: 1,
      limit: 20,
      pay: false,
      payType: ["yue", "weixin"],
      from: isWeixin() ? "weixin" : "weixinh5",
      generalActive: false,
      generalContent: {
        promoterNum: "",
        title: ""
      }
    };
  },
  components: {
    // Loadings,
    // Payment,
    // GeneralWindow
  },
  mounted(){
    this.getOrderList()
  },
  computed: mapGetters(["userInfo"]),
  watch: {
    $route(n) {
      if (n.name === NAME) {
        const type = parseInt(this.$route.params.type) || 0;
        if (this.type !== type) {
          this.changeType(type);
        }
        this.getOrderData();
      }
    }
  },
  methods: {
    //订单统计数据 
    getOrderData() {
      getOrderData().then(res => {
        this.orderData = res.data;
      });
    },
    changeType(type) {
      this.type = type;
    },
    // 订单列表
    getOrderList() {
      getOrderList().then(res => {
        this.orderList += res.data.data;
      });
    },
  }
};
</script>

<style lang='less' scoped>
.noCart {
  margin-top: 0.17rem;
  padding-top: 0.1rem;
}

.noCart .pictrue {
  width: 4rem;
  height: 3rem;
  margin: 0.7rem auto 0.5rem auto;
}

.noCart .pictrue img {
  width: 100%;
  height: 100%;
}

.w {
  border: 1px solid red;
  display: flex;
  height: 1.3rem;
  i {
    line-height: 1.3rem;
  }
  .header-border {
    margin: 0.3rem 10px 0 0.16rem;
    border: 0.02rem solid #15b9ec;
    height: 0.7rem;
    width: 5rem;
    border-radius: 0.4rem;
    input {
      margin: 0.16rem;
    }
  }
}
.unNav {
  margin: 0;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
}
</style>
