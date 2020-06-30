<template>
  <div class="goodList">
    <div
      class="item acea-row row-between-wrapper"
      v-for="(item, index) in good_list"
      :key="index"
      @click="goDetail(item)"
    >
      <div class="pictrue">
        <img :src="item.image" class="image" />
      </div>
      <div class="underline">
        <div class="text">
          <div class="line1">{{ item.store_name }}</div>
          <div class="w">
            <div class="money font-color-orange">
              <span class="yuanA">￥</span>
              <span class="num">{{ item.price }}</span>
              <span class="numC">/箱</span>
            </div>
            <div class="imgCart">
              <img src="@/assets/shpping-cart/购物车.png" alt class="imgR" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { goShopDetail } from "@/api/index.js";
export default {
  name: "GoodList",
  props: ["goodList", "search"],
  mounted() {
    this.good_list = this.goodList
  },
  data: function() {
    return {
      where: {
        page: 1,
        limit: 8,
        news: 0,
        priceOrder: "",
        salesOrder: ""
      },
      // goodList:[]
      timer: null,
      good_list: []
    };
  },
  watch: {
    search() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (!this.search) {
        this.good_list = [];
        return;
      }
      this.timer = setTimeout(() => {
        const result = [];
          this.good_list.forEach(value => {
            if (
              value.store_name.indexOf(this.search) > -1
            ) {
              result.push(value);
            }
          });
        this.good_list = result;
      }, 100);
    }
  },
  methods: {
    // 商品详情跳转
    goDetail(item) {
      goShopDetail(item).then(() => {
        this.$router.push({ path: "/detail/" + item.id });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.goodList {
  overflow: hidden;

  .item {
    position: relative;
    padding-left: 0.3rem;
    background-color: #fff;
    display: flex;
    .pictrue {
      width: 1.8rem;
      height: 1.8rem;
      position: relative;
      .image {
        width: 80px;
        // height: 100%;
        // border-radius: 0.06rem;
      }
    }
    .underline {
      padding: 0.3rem 0.3rem 0.3rem 0;
      border-bottom: 1px solid #f5f5f5;
      .text {
        font-size: 0.3rem;
        color: #222;
        width: 4.89rem;
        text-align: left;
        .line1 {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
        }
        .w {
          display: flex;
          margin-top: 0.5rem;
          width: 100%;
          height: 20px;
          justify-content: space-between;
          .imgCart {
            width: 20px;
            height: 20px;
            background-color: #44a0f7;
            border-radius: 50%;
            // margin-left: 66px;
            // margin-top: 52px;
            .imgR {
              width: 20px;
              height: 20px;
            }
          }
        }
        .money {
          font-size: 0.26rem;
          font-weight: 700;
          .yuanA {
            font-size: 10px;
            color: red;
          }
          .num {
            font-size: 16px;
            color: red;
          }
          .numC {
            font-size: 10px;
            color: gray;
          }
        }
      }
    }
  }
}
</style>