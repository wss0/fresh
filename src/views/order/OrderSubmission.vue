<template>
  <div class="order-submission">
    <div class="allAddress" :style="store_self_mention ? '' : 'padding-top: 0.2rem'">
      <!-- 最上面 --》 快递配送  到店自取 -->
      <div class="nav acea-row">
        <!-- v-if="store_self_mention" -->
        <div
          v-if="store_self_mention"
          class="item font-color-green"
          :class="shipping_type === 0 ? 'on' : 'on2'"
          @click="addressType(0)"
        ></div>
        <!-- v-if="store_self_mention" -->
        <div
          v-if="store_self_mention"
          class="item font-color-green"
          :class="shipping_type === 1 ? 'on' : 'on2'"
          @click="addressType(1)"
        ></div>
      </div>
      <!-- 电话  和  地址 -->
      <div
        class="address acea-row row-between-wrapper"
        v-if="shipping_type === 0"
        @click="addressTap"
      >
        <!-- 默认地址 -->
        <div class="addressCon" v-if="addressInfo">
          <div class="name">
            {{ addressInfo.real_name }}
            <span class="phone">{{ addressInfo.phone }}</span>
          </div>

          <div>
            <span class="default font-color-green" v-if="addressInfo.is_default">[默认]</span>
            {{ addressInfo.province }}{{ addressInfo.city
            }}{{ addressInfo.district }}{{ addressInfo.detail }}
          </div>
        </div>
        <!-- 没有地址时  设置地址 -->
        <div class="addressCon" v-else>
          <div class="setaddress">设置收货地址</div>
        </div>
        <!-- 小于号 -->
        <div class="iconfont icon-jiantou">></div>
      </div>
    </div>
    <!-- 加入购物车的商品 -->
    <!-- orderGroupInfo.cartInfo ？？？？  -->
    <OrderGoods :evaluate="0" :cartInfo="orderGroupInfo.cartInfo"></OrderGoods>
    <!-- 显示的优惠卷。。。 商品下面文字部分 -->
    <div class="wrapper">
      <!-- @click="couponTap" v-if="deduction === false" -->
      <div class="item acea-row row-between-wrapper">
        <div>优惠券</div>
        <div class="discount">
          <!-- 优惠卷小箭头 -->
          <span class="iconfont icon-jiantou"></span>
        </div>
      </div>

      <div class="item acea-row row-between-wrapper">
        <div>积分抵扣</div>
        <!--  //是圈的定位 -->
        <div class="discount">
          <div class="select-btn">
            <!--  是圈  -->
            <div class="checkbox-wrapper">
              <label class="well-check">
                <!-- 可以当积分使用的按钮 1. useIntegral -->
                <input type="checkbox" v-model="useIntegral" />
                <i class="icon"></i>
                <span class="integral">
                  当前积分
                  <span class="num font-color-orange">{{ userInfo.integral || 0 }}</span>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="item acea-row row-between-wrapper">
        会员优惠
        <!-- <div class="discount">￥{{ orderGroupInfo.priceGroup.vipPrice }}</div> -->
      </div>
      <div class="item acea-row row-between-wrapper" v-if="shipping_type === 0">
        <div>快递费用</div>
        <!--如果快递费用>0 是运费价格  否则是免运费  -->
        <div class="discount">
          {{
          orderPrice.pay_postage > 0
          ? "￥" + orderPrice.pay_postage
          : "免运费"
          }}
        </div>
      </div>

      <div class="item">
        <div>备注信息</div>
        <textarea placeholder="请添加备注（150字以内）" v-model="mark"></textarea>
      </div>
    </div>
    <!-- 支付方法 -->
    <div class="wrapper">
      <div class="item">
        <div>支付方式</div>
        <div class="list">
          <!--  -->
          <div
            class="payItem acea-row row-middle"
            :class="active === 'weixin' ? 'on' : ''"
            @click="payItem('weixin')"
            v-show="isWeixin"
          >
            <div class="name acea-row row-center-wrapper">
              <div class="iconfont icon-weixin2" :class="active === 'weixin' ? 'bounceIn' : ''"></div>微信支付
            </div>
            <div class="tip">微信快捷支付</div>
          </div>

         
          <div
            class="payItem acea-row row-middle"
            :class="active === 'yue' ? 'on' : ''"
            @click="payItem('yue')"
          >
            <div class="name acea-row row-center-wrapper">
              <div class="iconfont icon-icon-test" :class="active === 'yue' ? 'bounceIn' : ''"></div>余额支付
            </div>
            <div class="tip">可用余额：{{ userInfo.now_money || 0 }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="moneyList">
      <div class="item acea-row row-between-wrapper">
        <div>运费：￥{{ orderPrice.pay_postage }}</div>
        <div class="money"></div>
      </div>
      <div class="item acea-row row-between-wrapper">
        <div>合计：￥{{ orderPrice.total_price }}</div>
      </div>
      <div class="item acea-row row-between-wrapper btn">
        <div @click="createOrder" class="btnA">提交订单</div>
      </div>
    </div>

    <div class="settlement" style="height:2.9rem"></div>

    <!-- 新添地址 :checked="addressInfo.id" -->
    <address-window v-model="showAddress" ref="mychild" @checked="check"></address-window>
  </div>
</template>


<script>
import OrderGoods from "@/views/order/components/OrderGoods";
import CouponListWindow from "@/views/order/components/CouponListWindow";
import AddressWindow from "@/views/order/components/AddressWindow";
// import { postOrderConfirm, postOrderComputed, createOrder } from "@/api/order";
import {
  postOrderConfirm,
  postOrderComputed,
  createOrder,
  getWeiXinPay
} from "@/api/index";

import { storeListApi } from "@/api/store";
import { getUser } from "@/api/user";
import { pay } from "@/libs/wechat";
import { isWeixin } from "@/utils"; //可以看链接
import { mapGetters, mapMutations, mapState } from "vuex";
import cookie from "@/utils/store/cookie";
const NAME = "OrderSubmission",
  _isWeixin = isWeixin();
const LONGITUDE = "user_longitude";
const LATITUDE = "user_latitude";
export default {
  name: NAME,
  components: {
    OrderGoods,
    CouponListWindow,
    AddressWindow
  },
  props: {},
  computed: {
    ...mapGetters(["storeItems"]),
    storeItem: function() {
      if (JSON.stringify(this.storeItems) == "{}") {
        return this.storeList;
      } else {
        return this.storeItems;
      }
    }
  },
  data: function() {
    return {
      cartid: "",
      offlinePayStatus: 2,
      from: _isWeixin ? "weixin" : "weixinh5",
      // deduction: true,
      isWeixin: _isWeixin,
      pinkId: 0,

      active: _isWeixin ? "weixin" : "yue", //判断是微信还是其他方式 动态绑定的class

      // showCoupon: false,

      showAddress: false,

      addressInfo: {},

      // couponId: 0,

      // 传过来的数据 会覆盖orderGroupInfo  所以即使没有cartInfo也能用
      orderGroupInfo: {
        //加入购物车的商品  信息
        // priceGroup: {}
      },
      // orderGroupInfo:{},

      usableCoupon: {},
      // addressLoaded: false,
      //2.useIntegral
      useIntegral: false,
      //
      orderPrice: {
        
      },
      //订单备注
      mark: "",
      system_store: {},
      shipping_type: 0,
      userInfo: {}, //给个人中发请求  可用余额  积分
      store_self_mention: {}
    };
  },
  watch: {
    //3.useIntegral
    useIntegral() {
      //监听一下  如果点击后  订单 会重新生成  所以订单绘画自行一次
      this.computedPrice();
    },
    $route(n) {
      if (n.name === NAME) {
        this.getUserInfo(); //个人中心
        this.getCartInfo(); //从购物车界面跳到订单页之后的请求
      }
    },
    shipping_type() {
      this.computedPrice();
    }
  },
  mounted: function() {
    let that = this;
    that.getUserInfo();
    that.getCartInfo();

    var getAddressInfo =
      JSON.parse(localStorage.getItem("addressInfo")) + this.$route.params.id;
    // console.log("371--保存地址=>"+addressInfo)
    this.addressInfo = getAddressInfo;
  },
  methods: {
    ...mapMutations(["changeGetAddress"]),
    getUserInfo() {
      //个人中心
      getUser()
        .then(res => {
          this.userInfo = res.data;
        })
        .catch(() => {});
    },

    addressType: function(index) {
      if (index && !this.system_store.id)
        return this.$dialog.error("暂无门店信息，您无法选择到店自提！");
      // this.shipping_type = index;
    },

    //判断有几个生成订单  --》
    computedPrice() {
      let shipping_type = this.shipping_type;
      // 计算 订单金额的请求
      // console.log()
      postOrderComputed(this.orderGroupInfo.orderKey, {
        addressId: this.addressInfo.id,
        useIntegral: this.useIntegral ? 1 : 0,
        couponId: this.usableCoupon.id || 0,
        shipping_type: parseInt(shipping_type) + 1,
        payType: this.active
      })
        .then(res => {
          // console.log("优惠=》413" + res.data.data.result);
          if (res.data.data.status === "EXTEND_ORDER") {
            //如果在生成订单   进行跳转
            this.$router.replace({
              // 成功后跳转到订单详情
              path: "/order/detail/" + res.data.data.result.orderId
            });
          } else {
            //   如果只有一个订单就 给orderPrice赋值
            this.orderPrice.pay_postage = res.data.data.result.pay_postage;
            this.orderPrice.total_price = res.data.data.result.total_price;
       
          }
        })
        .catch(res => {
          console.log(res);
          this.$dialog.error(res.msg);
        });
    },
    //从购物车界面跳到订单页之后的请求
    getCartInfo() {
      const cartIds = this.$route.params.id; //接受购物车传过来的id
      if (!cartIds) {
        this.$dialog.error("参数有误");
        return this.$router.go(-1); //如果穿过来的id不正确  返回到上一个界面
      }
      // 通过购物车 id 获取订单信息
      postOrderConfirm(cartIds).then(res => {
          this.offlinePayStatus = res.data.data.offline_pay_status;
          this.orderGroupInfo = res.data.data; //A. 加入购物车的商品信息 B. 会员优惠
          // console.log("商品信息???437=>"+this.orderGroupInfo)
          this.deduction = res.data.deduction;
          this.usableCoupon = res.data.usableCoupon || {};
          console.log("462=>" + res.data.addressInfo);
          if (
            res.data.addressInfo != "" &&
            res.data.addressInfo != undefined &&
            res.data.addressInfo != {}
          ) {
            this.addressInfo = res.data.addressInfo || {}; //存储的是地址 电话号等信息
          } else {
            var getAddressInfo = JSON.parse(
              localStorage.getItem("addressInfo")
            );
            // console.log("371--保存地址=>"+addressInfo)
            this.addressInfo = getAddressInfo;
          }
          this.system_store = res.data.system_store || {};
          // console.log(res.data.store_self_mention)
          this.store_self_mention = res.data.store_self_mention;
          this.computedPrice();
        })
        .catch(error => {
          console.log(error);
          this.$dialog.error("加载订单数据失败");
        });
    },
    //电话  详细信息
    addressTap: function() {
      this.showAddress = true; //修改信息   true的  可以修改信息的组件显示
      if (!this.addressLoaded) {
        this.addressLoaded = true;
        this.$refs.mychild.getAddressList();
      }
    },
    addressRedirect() {
      this.addressLoaded = false;
      this.showAddress = false;
    },

    //点击支付   active是动态绑定的class判断是微信还是余额
    payItem: function(index) {
      this.active = index;

      this.computedPrice();
    },
    changeAddress(addressInfo) {
      this.addressInfo = addressInfo;
      this.computedPrice();
    },
    // 点击立即结算   会   生成一个订单
    createOrder() {
      // console.log("471=>"+1)
      let shipping_type = this.shipping_type;
      if (!this.active) return this.$dialog.toast({ mes: "请选择支付方式" });
      if (!this.addressInfo.id)
        return this.$dialog.toast({ mes: "请选择收货地址" });
      this.$dialog.loading.open("生成订单中");
      //生成订单的接口
      var data = new URLSearchParams();
      data.append("addressId", this.addressInfo.id);
      data.append("couponId", this.usableCoupon.id || 0);
      data.append("payType", this.active);
      data.append("useIntegral", this.useIntegral ? 1 : 0);
      data.append("mark", this.mark || "");
      data.append("from", this.from);
      data.append("real_name", this.contacts);
      data.append("phone", this.contactsTel);
      data.append("shipping_type", parseInt(shipping_type) + 1);
      createOrder(
        this.orderGroupInfo.orderKey,
        data
        //  {
        // real_name: this.contacts, //姓名
        // phone: this.contactsTel, //电话
        // addressId: this.addressInfo.id, //地址编号
        // useIntegral: this.useIntegral ? 1 : 0,
        // couponId: this.usableCoupon.id || 0, //	领取优惠券编号
        // payType: this.active, //	支付方式
        // pinkId: this.pinkId, //	拼团编号
        // from: this.from, //微信支付类型
        // mark: this.mark || "", //订单备注
        // shipping_type: parseInt(shipping_type) + 1 //类型-》 微信：到店自取
        // }
      )
        .then(res => {
          //  console.log("530=>"+res)
          this.$dialog.loading.close();
          var data = res.data.data;
          console.log("497=>" + data.result.orderId);
          let url = "/order/status/" + data.result.orderId;
          switch (data.status) {
            case "EXTEND_ORDER": //再次下单
            case "PAY_DEFICIENCY": //
            case "PAY_ERROR": //支付失败
              this.$router.replace({
                path: url + "/0?msg=" + res.msg
              });
              break;
            case "SUCCESS": //成功
              this.$dialog.success(res.msg);
              this.$router.replace({
                path: url + "/1"
              });
              break;
            case "WECHAT_H5_PAY": //微信h5的支付
              this.$router.replace({
                path: url + "/2"
              });
              setTimeout(() => {
                location.href = data.result.jsConfig.mweb_url;
              }, 100);
              break;
            case "WECHAT_PAY": //微信支付
              pay(data.result.jsConfig).finally(() => {
                this.$router.replace({
                  path: url + "/4"
                });
              });
          }
        })
        .catch(err => {
          this.$dialog.error(err.msg || "创建订单失败");
          this.$dialog.loading.close();
          // this.$router.go(-1);
        });
    },
    // AddressWindow-- 传递过来的数据给地址复制
    check(address) {
      this.addressInfo = address;
      //让组件消失
      this.showAddress = false;
      localStorage.setItem("addressInfo", JSON.stringify(address));
    }
  }
};
</script>
