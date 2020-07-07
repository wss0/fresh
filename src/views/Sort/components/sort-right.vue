<template>
  <div class="content">
    <div class="content-top">
      <div
        class="commodity"
        :class="gradeSwitch == 1 ? 'cart-color-green' : ''"
        @click="set_where(1)"
      >新品特惠</div>
      <div
        class="commodity"
        :class="gradeSwitch == 2 ? 'cart-color-green' : ''"
        @click="set_where(2)"
      >热卖爆款</div>
    </div>
    <div class="conterPic">
      <div class="list">
        <div class="des item acea-row row-between-wrapper" v-for="(item, index) in product_list" :key="index">
          <div class="pictrue">
            <img :src="item.image" />
          </div>
          <div class="text">
            <div class="name line1">{{ item.store_name }}</div>
            <div class="sales">销量 {{ item.sales }}</div>
            <div class="song">商家配送</div>
            <div class="money font-color-orange">
              <div class="_left">
                <span class="num">￥</span>
                <span class="yuanB">{{ item.price }}</span>
                <span class="xiang">/箱</span>
              </div>
              <div class="right">
                <img src="@/assets/shpping-cart/购物车.png" alt />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      gradeSwitch: 1,
      prolist: []
    };
  },
  props: ["product_list"],
  methods: {
    ...mapMutations["changeProlist"],
    set_where(index) {
      switch (index) {
        case 1:
          this.gradeSwitch = index;
          break;
        case 2:
          this.gradeSwitch = index;
          break;
      }
    },

    goDetail() {
      axios
        .get("http://www.insideria.vip/api/category", {
          params: {
            id: 9
          }
        })
        .then(res => {
          // console.log(res);
          //  A.右侧商品复制  --》右侧商品获取商品分类
          this.changeProlist(prolist);
          this.prolist = res.data.data;
        });
    }
  }
};
</script>


<style lang='less' scope>
.content {
  margin: 0.09rem 0 0 0;
  // float: left;
  .content-top {
    display: flex;
    text-align: center;
    line-height: 0.48rem;
    // margin-left: -75px;
    .commodity {
      width: 1.62rem;
      height: 0.48rem;
      background-color: #f1f1f1;
      border-radius: 0.24rem;
      font-size: 0.24rem;
      margin: 0.25rem 0 0 0.2rem;
    }
    .commodity.cart-color-green {
      color: #21a8ea;
      background-color: #e5f7ff;
    }
  }
 //右侧图片
.conterPic {
   margin: 0 0 0 1.8rem;
  .list {
    padding: 0 0.2rem 0 0.17rem;
    .item {
      display: flex;
      margin-bottom: 0.35rem;
      width: 5.33rem;
      position: relative;
      .pictrue {
        width: 1.58rem;
        height: 1.68rem;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          border-radius: 0.06rem;
        }
      }
      .text {
        margin-left: 0.04rem !important;
        width: 3.44rem;
        .name {
          height: 0.4rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: black;
          font-size: 0.32rem;
        }
        .song {
          border: 1px solid #b8b6b6;
          font-size: 0.2rem;
          width: 0.9rem;
          height: 0.28rem;
          line-height: 0.34rem;
          margin-top: 0.1rem;
        }
        .sales {
          font-size: 0.22rem;
          color: #aaa;
          margin-top: 0.08rem;
        }
        .money {
          font-size: 0.28rem;
          margin-top: 0.18rem;
          display: flex;
          justify-content: space-between;
          ._left {
            .num {
              font-size: 0.2rem;
              color: red;
            }
            .yuanB {
              font-size: 0.32rem;
              color: red;
            }
            .xiang {
              color: gray;
              font-size: 0.2rem;
            }
          }
          .right {
            display: inline-block;
            border-radius: 50%;
            margin-left: 0.56rem;
            margin-top: -0.1rem;
            img {
              width: 0.5rem;
              height: 0.5rem;
              text-align: center;
              padding-top: 0.04rem;
              padding-left: 0.04rem;
            }
          }
        }
      }
    }
  }
}
}
</style>