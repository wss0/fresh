<template>
  <!-- 没有任何商品 -->
  <div class="shoppingCart">
    <div class="noCart">
      <div class="pictrue">
        <img src="@/assets/images/noCart.png" />
      </div>
      <div class="goShopping">
        <span>去逛逛</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'ShoppingCart',
  data() {
    return {
      
    };
  },
  mounted() {
    // var data = {
    //   time_expire: "2018-06-08T10:34:56+08:00",
    //   amount: {
    //     total: 100,
    //     currency: "CNY"
    //   },
    //   mchid: "1230000109",
    //   description: "Image形象店-深圳腾大-QQ公仔",
    //   notify_url: " https://www.weixin.qq.com/wxpay/pay.php",
    //   out_trade_no: "1217752501201407033233368018",
    //   goods_tag: "WXG",
    //   appid: "wxd678efh567hg6787",
    //   attach: "自定义数据说明",
    //   detail: {
    //     invoice_id: "wx123",
    //     goods_detail: [
    //       {
    //         goods_name: "iPhoneX 256G",
    //         wechatpay_goods_id: "1001",
    //         quantity: 1,
    //         merchant_goods_id: "商品编码",
    //         unit_price: 828800
    //       },
    //       {
    //         goods_name: "iPhoneX 256G",
    //         wechatpay_goods_id: "1001",
    //         quantity: 1,
    //         merchant_goods_id: "商品编码",
    //         unit_price: 828800
    //       }
    //     ],
    //     cost_price: 608800
    //   },
    //   scene_info: {
    //     device_id: "013467007045764",
    //     store_info: {
    //       address: "广东省深圳市南山区科技中一道10000号",
    //       area_code: "440305",
    //       name: "腾讯大厦分店",
    //       id: "0001"
    //     },
    //     h5_info: {
    //       app_name: "王者荣耀",
    //       app_url: "https://pay.qq.com",
    //       bundle_id: "com.tencent.wzryiOS",
    //       package_name: "com.tencent.tmgp.sgame",
    //       type: "iOSAndroidWap"
    //     },
    //     payer_client_ip: "14.23.150.211"
    //   }
    // };
    // axios
    //   .post("https://api.mch.weixin.qq.com/v3/pay/transactions/h5", data)
    //   .then(res => {
    //     console.log(res);
    //   });

  },
  components: {
    // Recommend
  },
  methods: {
   
  }
};
</script>

<style lang='less' scoped>
.shoppingCart {
  width: 100%;
  height: 100%;
  background-color: #fff !important;
}
.top-shop {
  width: 100%;
  height: 1.2rem;
  background-color: #09b7fe;
  line-height: 1.2rem;
}
.top-title,
.top-delete {
  display: inline-block;
  width: 1.6rem;
  height: 1rem;
  text-align: center;
}
.top-title {
  color: #fff;
  font-size: 0.36rem;
  margin-left: 2.9rem;
}
.top-delete {
  float: right;
  font-size: 0.32rem;
  color: #7ce4ff;
}

.ipt_num {
  width: 100%;
  display: block;
  line-height: 0.44rem;
  text-align: center;
}
.noCart {
  margin-top: 0 !important;
  .pictrue {
    img {
      width: 300px;
      height: 200px;
      margin-left: 20px;
    }
  }
}
.goShopping {
  text-align: center;
  padding-top: 20px;
}
.goShopping span {
  display: inline-block;
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 18px;
  color: #888;
}
</style>
