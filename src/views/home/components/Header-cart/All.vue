<template>
  <div class="wrapper">
    <div class="newProduct acea-row row-between-wrapper">
      <div class="item" v-for="(item, index) in info.firstList" :key="index">
        <div class="pictrue">
          <img :src="item.image" />
        </div>
        <div class="text">
          <div class="name line1">{{ item.store_name }}</div>
          <div class="text-wrapper">
            <span class="text-title">商家24H发货</span>
          </div>
          <div class="money">
            <div class="l">
              <span class="money_">￥</span>
              <span class="yuan">{{ item.price }}</span>
              <span class="num-two">/箱</span>
            </div>
            <div class="Div-img">
              <img src="@/assets/shpping-cart/购物车.png" alt class="imgR" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      info: {
        firstList: []
      }
    };
  },
  mounted() {
    this.getHomeDate();
  },
  methods: {
    getHomeDate() {
      axios.get("https://hema.insideria.vip/api/index").then(res => {
        // console.log(res.data.data.info.firstList);
        let that = this;
        that.info.firstList = res.data.data.info.bastList;
      });
    }
  }
};
</script>

<style lang='less' scoped>
.wrapper {
  width: 100%;
  background-color: #fafafa;
  margin-top: 0.2rem;
  .newProduct {
    display: flex;
    flex-wrap: wrap;
    padding: 0 0.3rem;
    margin-top: -0.14rem;
    .item {
      width: 3.3rem;
      border-radius: 0.06rem;
      margin-top: 0.29rem;
      margin-left: 0.1rem;
      .pictrue {
        width: 100%;
        height: 3.3rem;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          border-radius: 0.1rem 0.1rem 0 0;
        }
      }
      .text {
        background-color: #fff;
        padding: 0.18rem 0.15rem 0.27rem 0.15rem;
        .name {
          font-size: 0.3rem;
          color: #282828;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .text-wrapper {
          margin-top: 0.06rem;
          width: 100%;
          height: 0.4rem;
          .text-red {
            color: red;
          }
          .text-title {
            font-size: 0.02rem;
            border: 0.02rem solid black;
          }
        }
        .money {
          display: flex;
          font-weight: bold;
          font-size: 0.26rem;
          margin: -0.1rem 0 0.06rem 0;
          height: 0.36rem;
          .l {
            padding-top: 0.1rem;
            box-sizing: border-box;
            .money_ {
              font-size: 0.2rem;
              color: red;
            }
            .yuan {
              font-size: 0.32rem;
              color: red;
            }
            .num-two {
              font-size: 0.2rem;
              color: gray;
            }
          }
          .Div-img {
            width: 0.4rem;
            height: 0.4rem;
            background-color: #44a0f7;
            border-radius: 50%;
            margin-left: 1.32rem;
            margin-top:0.04rem;
            .imgR {
              width:0.4rem;
              height:0.4rem;
            }
          }
        }
      }
    }
  }
}
</style>






