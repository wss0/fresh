<template>
  <!-- 超级核算 -->
  <div class="hotListA">
    <div class="titleW acea-row row-center-wrapper">
      <span class="moreLeft">超盒算</span>
      <span class="moreRight">更多</span>
    </div>
    <swiper :options="hotOption">
      <swiper-slide v-for="(k, indexw) in hotInfo" :key="indexw">
        <div class="listA acea-row row-middle">
          <div class="item" v-for="(item, indexn) in k.list" :key="indexn">
            <router-link :to="'/XiangPages/' + item.id" class="pictrue" >
              <img :src="item.image" class="right" />
            </router-link>
            <div class="name line1">{{ item.store_name }}</div>
            <div class="item-color">
              <div class="item-left-">
                <div class="money font-color-orange">
                  <span class="money_">￥</span>
                  <span class="Price">{{ item.price }}</span>
                  <span class="money-x">/箱</span>
                </div>
              </div>
              <div class="item-right-">
                <img src="@/assets/shpping-cart/购物车.png" alt class="item-img" />
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import axios from "axios";
import { getGoodScroll, getProductDetail } from "@/api/index.js";
export default {
  name: "HomeSwiper",
  data() {
    return {
      hotOption: {},
      hotInfo: []
    };
  },
  mounted() {
    // 超级核算轮播图
    this.GoodScroll();
  },
  methods: {
    GoodScroll() {
      getGoodScroll().then(res => {
        // 请求回来的数据
        let hotList = res.data.data.list || [];
        let count = Math.ceil(hotList.length / 3);
        // 存放的是截取好的三个数据
        let hotArray = [];
        for (var i = 0; i < count; i++) {
          // 请求回来的数据中 每一次都有三个显示
          let list = hotList.slice(i * 3, i * 3 + 3);
          // 如何是由长度的   放到截取数组中   没有长度就放不到里面
          if (list.length) hotArray.push({ list: list });
        }
        // 复制给我循环遍历的数组
        this.hotInfo = hotArray;
      });
    },
  }
};
</script>

<style lang='less' scoped>
.hotListA {
  margin: 0.16rem 0.2rem;
  width: 7rem;
  padding-left: 0.08rem;
  padding-right: 4px;
  border-radius: 0.06rem;
  height: 4.4rem;
  background-color: white;
}

.titleW {
  display: flex;
  font-size: 0.34rem;
  font-weight: bold;
  height: 0.8rem;
  justify-content: space-between;
  padding-top: 0.16rem;
  padding-left: 0.12rem;
  background-color: #fff;
  .moreLeft {
    display: inline-block;
    text-align: justify;
    white-space: normal;
    max-width: 5.28rem;
    color: black;
    padding-right: 4rem;
    font-size: 0.32rem;
    font-family: Microsoft Yahei;
  }
}
.swiper {
  background-color: #fff;
}
.listA {
  // border: 1px solid red;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  .item {
    width: 2.18rem;
    .pictrue {
      width: 100%;
      height: 2.18rem;
      position: relative;
      img {
        width: 100%;
        height: 70%;
        border-radius: 0.06rem;
      }
    }
    .name {
      margin-left: 0.2rem;
      font-size: 0.26rem;
      height: 0.5rem;
      color: #333;
      margin-top: 0.12rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      position: relative;
    }
    .item-color {
      margin-left: 0.16rem;
      display: flex;
      .item-left- {
        .money {
          flex: 1;
          font-size: 0.26rem;
          color: red;
          .money_ {
            font-size: 0.2rem;
          }
          .money-x {
            color: gray;
            font-size: 10px;
            // color: rgb(250, 250, 250);
          }
        }
      }
      .item-right- {
        width: 0.4rem;
        height: 0.4rem;
        background-color: #44a0f7;
        border-radius: 50%;
        margin-left: 0.44rem;
        margin-top: -0.08rem;
        .item-img {
          width: 0.4rem;
          height: 0.4rem;
        }
      }
    }
    .Div-img {
      position: absolute;
      top: 157px;
      left: 53px;
      display: inline-block;
      width: 20px;
      height: 20px;
      background-color: #44a0f7;
      border-radius: 50%;
      margin-left: 28px;
      margin-top: 10px;
      img {
        width: 20px;
        height: 20px;
        text-align: center;
      }
    }
  }
}
</style>
