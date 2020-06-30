<template>
  <div class="warpperTOP">
    <div class="PageTop" v-show="show">
      <router-link to="/home/first" tag="li">
        <img src="@/assets/search-top/小于号.png" alt />
      </router-link>
      <!-- 购物车的跳转 -->
      <router-link to="/home/cart" tag="li">
        <i class="iconfont">&#xe612;</i>
      </router-link>
    </div>
    <!-- 顶部的渐隐渐显 -->
    <!-- <div class="pageHeaderW" v-show="!show" :style="opacityStyle">
      <img src="@/assets/search-top/小于号.png" alt />
      <div class="navScrollA">
        <div
          class="cart-font"
          :class="pageActive == index ? 'greenA' : ''"
          v-for="(item, index) in pagesXuan"
          :key="index"
          @click="pageBtn(index)"
        >{{ item }}</div>
      </div>
      <div class="box">
        <i class="iconfont">分享图</i>
        <i class="iconfont">&#xe612;</i>
      </div>
    </div> -->

    <!-- 点击加入购物车后  数量也会增加 -->
    <div class="iconNum" v-if="num>0">{{priceNum}}</div>
    <div id="title0">
      <swiper :options="hotOptionB" class="A">
        <swiper-slide v-for="(k, indexw) in storeInfoA" :key="indexw">
          <img :src="storeInfoA[indexw]" style="width:100%,backgrond-size:100% 100%" />
        </swiper-slide>
      </swiper>
      <div class="titleBlue">
        <span class="diDIan">产地量范</span>
        <span class="heMa">盒马量贩.基地优选.售后无忧</span>
      </div>
    </div>
    <div class="wenZi">
      <div class="wenZiT">{{navList}}</div>
      <i>分享图标</i>
    </div>
    <div class="hui">
      <span>皮薄肉厚</span>
      <span>汁水充盈</span>
    </div>
    <div class="price">
      <div class="priceY vip-price">
        <i>￥</i>
        <div class="vip">{{vipPrice}}</div>
      </div>
      <div class="priceY Yuan-price">
        <i>￥</i>
        <div class="yuan">{{yuanPrice}}</div>
      </div>
    </div>
    <div class="hour">
      <!-- <i>发货图标</i> -->
      <span>商家24H不发货，第三方物流配送，免运费</span>
      <i class="da" style="padding-left:14px">></i>
    </div>
    <div class="huo">
      <!-- <i>对号图标</i> -->
      <span>7天无理由退换货</span>
      <i class="da" style="padding-left:170px">></i>
    </div>
    <div class="xuan">
      <span>已选:</span>
      <span>1个/箱</span>
      <i class="da" style="padding-left:255px">></i>
    </div>
    <div>
      <!-- 评价 -->
      <div class="userEvaluation" id="title1">
        <div class="title2">
          <div class="reply">
            <div>评价({{ replyCount }})</div>
            <div class="ping" @click='ping'>
              查看全部评价 >
            </div>
          </div>
          <user-evaluation :reply="reply" v-if="replyCount" ></user-evaluation>
        </div>
        
      </div>
    </div>
    <div class="ball" v-if="isExist"></div>

    <div class="Pagefooter" @click="jiaCart">加入购物车</div>
  </div>
</template>

<script>
import axios from "axios";
import { postCartAdd, getCartCount } from "@/api/index.js";
import UserEvaluation from "@/views/XiangPages/components/UserEvaluation";
import XiangPageHearder from "@/views/XiangPages/components/XiangPageHearder.vue";
import { getProductDetail } from "@/api/index.js";
import { mapState, mapMutations } from "vuex";

var XiangPagepriceNumKey = "XiangPagepriceNum_";
export default {
  name: "XiangPages",
  data() {
    return {
      pagesXuan: ["商品", "评价", "精选", "详情", "推荐"],
      //顶部显示和隐藏
      show: true,
      opacityStyle: {
        opacity: 0
      },
      pageActive: "",
      id: "",
      storeInfoA: [],
      navList: "",
      hotOptionB: {},
      yuanPrice: "",
      vipPrice: "",
      replyCount: "",
      replyChance: "",
      reply: [],
      isExist: false,
      //购物车的加数
      priceNum: 0,
      num: false,
      news: 1,
      attr: {
        productAttr: [],
        productSelect: {}
      },
      // 商品详情中的规格
      productValue: [],
      uniqueABC: "",
      num: 0
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    var strXiangPagepriceNumKey = XiangPagepriceNumKey + this.id;
    var priceNum = localStorage.getItem(strXiangPagepriceNumKey);
    this.num = priceNum;
    this.priceNum = priceNum;

    let that = this;
    this.getProduct();
    this.getProduct();
    window.addEventListener("scroll", this.handleScroll);
    // this.jiaCart(0)
  },
  methods: {
    //保留商品数量
    ...mapMutations(["changeXiangppriceNum"]),

    //头部渐隐渐显
    handleScroll() {
      const top = document.documentElement.scrollTop;
      if (top > 60) {
        var opacity = top / 140;
        opacity = opacity > 1 ? 1 : opacity;
        this.opacityStyle = {
          opacity
        };
        this.show = false;
      } else {
        this.show = true;
      }
    },
    //头部选项卡
    pageBtn(index) {
      this.pageActive = index;
    },
    //过度   购物车小球
    afterEnter() {
      // console.log(1)
      this.isExist = false;
      this.num = true;
    },
    //加入购物车
    jiaCart() {
      this.isExist = true;
      this.priceNum++;
      this.num = true;
      // 将priceNum的数值传给footer    购物车数量    触发函数并传值    0  1   2
      this.$bus.$emit("sendPickNum", this.priceNum);
      //购物车请求
      var data = new URLSearchParams();
      data.append("productId", this.id);
      data.append("cartNum", this.priceNum);
      data.append("new", "0"); //购物车类型
      data.append("uniqueId", this.uniqueABC); //商品规格
      postCartAdd(data).then(res => {
      });

      var strXiangPagepriceNumKey = XiangPagepriceNumKey + this.id;
      this.changeXiangppriceNum(strXiangPagepriceNumKey, this.priceNum);
      localStorage.setItem(strXiangPagepriceNumKey, this.priceNum);
    },
    //自定义方法 获取数据
    getProduct() {
      getProductDetail(this.id).then(res => {
        this.navList = res.data.data.storeInfo.store_name;
        this.storeInfoA = res.data.data.storeInfo.slider_image;
        this.yuanPrice = res.data.data.storeInfo.price;
        this.vipPrice = res.data.data.storeInfo.vip_price;
        // 商品详情中的规格
        this.$set(this, "productValue", res.data.productValue);
        this.uniqueABC = res.data.data.productValue.默认.unique;
        // 评价
        this.$set(this, "replyChance", res.data.data.replyChance);
        this.$set(this, "replyCount", res.data.data.replyCount);
        this.reply = res.data.data.reply ? [res.data.data.reply] : [];
      });
    },
    ping(){
        this.$router.push("/evaluate_list/" + this.id)
    }
  },
  components: {
    UserEvaluation,
    XiangPageHearder
  }
};
</script>

<style lang='less' scoped>
.warpperTOP {
  touch-action: none;
  overflow: hidden;
}
.pageHeaderW {
  touch-action: none;
  border: 1px solid #fff;
  display: flex;
  justify-content: space-between;
  height: 0.8rem;
  line-height: 0.8rem;
  position: fixed;
  width: 100%;
  top: 0px;
  left: -1px;
  background-color: rgb(173, 173, 247);
  color: #fff;
  z-index: 100;
  .navScrollA {
    display: flex;
    flex: 2;
    justify-content: space-between;
  }
  img {
    width: 0.4rem;
    height: 0.4rem;
    margin-right: 0.3rem;
    margin-top: 0.2rem;
  }
  .box {
    margin-left: 0.3rem;
  }
}
.warpperTOP {
  height: 730px;
}
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

.PageTop {
  display: flex;
  justify-content: space-between;
  img {
    width: 0.8rem;
    height: 0.8rem;
    border: 1px solid rgb(240, 236, 236);
    border-radius: 50%;
    background-color: rgb(240, 236, 236);
  }
  i {
    width: 0.8rem;
    height: 0.8rem;
    font-size: 0.66rem;
    border: 0.02rem solid rgb(240, 236, 236);
    border-radius: 50%;
    background-color: rgb(240, 236, 236);
  }
}
.iconNum {
  width: 15px;
  height: 15px;
  border: 0.02rem solid red;
  border-radius: 50%;
  background-color: red;
  color: #fff;
  text-align: center;
  font-weight: bold;
  position: relative;
  left:7.14rem;
  top: -0.82rem;
  z-index: 30;
}

.Pagefooter {
  text-align: center;
  line-height: 1rem;
  height: 1rem;
  width: 100%;
  color: white;
  font-size: 0.4rem;
  background-color: rgb(86, 86, 253);
  position: fixed;
  bottom: 0rem;
  z-index: 200;
}
#title0 {
  display: flex;
  position: relative;
  height: 6rem;
  width: 100%;
  .A {
    width: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .titleBlue {
    // border: 1px solid red;
    display: flex;
    position: absolute;
    bottom: -0.48rem;
    left: 0.36rem;
    z-index: 99;
    .diDIan {
      text-align: center;
      width: 1.6rem;
      margin-right: 0.2rem;
      color: white;
      font-family: FangSong;
      background-color: rgb(84, 84, 252);
    }
    .heMa {
      padding-top: 0.04rem;
      text-align: center;
      color: rgb(153, 150, 150);
      font-size: 0.2rem;
    }
  }
}
.wenZi {
  display: flex;
  justify-content: space-between;
  margin-top: 0.6rem;
  // border: 1px solid blue;
  .wenZiT {
    width: 240px;
    height: 40px;
    margin-left: 18px;
    font-size: 15px;
    font-weight: bold;
  }
}
.hui {
  margin-top: 1px;
  margin-left: 18px;
  span {
    padding-right: 8px;
  }
}
.price {
  display: flex;
  // border: 1px solid red;
  width: 300px;
  height: 20px;
  margin-top: 15px;
  .priceY {
    display: flex;
    // border: 1px solid blue;
    margin-left: 14px;
    line-height: 20px;
  }
  .vip-price {
    color: chocolate;
  }
  .Yuan-price {
    font-size: 10px;
    text-decoration: line-through;
  }
}
.hour,
.huo,
.xuan {
  width: 360px;
  height: 30px;
  background-color: rgb(226, 220, 220);
  border-radius: 5px;
  margin-left: 5px;
  padding-left: 5px;
  line-height: 30px;
  margin-bottom: 3px;
  span {
    //  border: 1px solid red;
    margin-left: 6px;
    color: black;
  }
}

// 评价
#title1 {
  width: 7.2rem;
  height: 0.6rem;
  line-height: 0.6rem;
  background-color: rgb(226, 220, 220);
  border-radius: 0.1rem;
  margin-left: 0.1rem;
  padding-left: 0.1rem;
  border-bottom: 0.02rem solid #fafafa;
  .title2 {
    .reply {
      display: flex;
      justify-content: space-between;
      .ping {
        padding-right: 0.3rem;
      }
    }
  }
}
</style>
