<template>
  <div class="wrapper">
    <div class="title-span">
      <span class="You">..猜你喜欢.</span>
      <span class="color">RECOMMEND..</span>
    </div>
    <div class="newProduct acea-row row-between-wrapper">
      <div class="item" v-for="(item, index) in info.firstList" :key="index">
        <div class="pictrue">
          <img :src="item.image" />
        </div>

        <div class="text">
          <div class="name line1">{{ item.store_name }}</div>
          <div class="text-wrapper">
            <span class="text-red">附近已买过</span>
            <span class="text-title">商家24H发货</span>
          </div>
          <div class="money">
            <img src="@/assets/search-top/钱.png" alt />
            <span class="num">
              {{ item.price }}
              <span class="num-two">/箱</span>
              <div class="Div-img">
                <img src="@/assets/shpping-cart/购物车.png" alt />
              </div>
            </span>
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
      axios.get("http://www.insideria.vip/api/index").then(res => {
        let that = this;
        that.info.firstList = res.data.data.info.firstList;
      });
    }
  }
};
</script>

<style lang='less' scoped>
.wrapper {
  width: 100%;
  background-color: rgb(238, 234, 234);
  margin-top: 0.2rem;
  .title-span {
    display: flex;
    text-align: center;
    padding-left: 90px;
    .You {
      display: inline-block;
      text-align: center;
      color: grey;
    }
    .color {
      color: rgb(157, 157, 241);
    }
  }
  .newProduct {
    display: flex;
    flex-wrap: wrap;
    padding: 0 0.3rem;
    margin-top: -0.14rem;
    .item {
      text-align: center;
      width: 3.3rem;
      border: 1px solid #e5e5e5;
      border-radius: 0.06rem;
      margin-top: 0.29rem;
      margin-left: 5px;
      border: 1px solid #fff;
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
          margin-top: 3px;
          width: 100%;
          height: 20px;
          .text-red {
            color: red;
          }
          .text-title {
            font-size: 1px;
            border: 1px solid black;
          }
        }
        .money {
          font-weight: bold;
          font-size: 0.26rem;
          margin: -5px 0 0.06rem 0;
          height: 18px;
          img {
            width: 13px;
            height: 15px;
          }
          .num {
            font-size: 0.34rem;
            color: orangered;
            .num-two {
              color: rgb(150, 148, 148);
              font-size: 0.2rem;
            }
            .Div-img {
              display: inline-block;
              width: 20px;
              height: 20px;
              background-color: rgb(68, 160, 247);
              border-radius: 50%;
              margin-left: 28px;
              margin-top: 10px;
              img {
                width: 20px;
                height: 20px;
                text-align: center;
                padding-top: 2px;
                padding-left: 2px;
              }
            }
          }
        }
      }
    }
  }
}
</style>