<template>
  <div>
    <!-- 选项卡 -->
    <div class="navScroll colorA">
      <div
        class="cart-font"
        :class="cartActive == index ? 'greenA' : ''"
        v-for="(item, index) in cartHuan"
        :key="index"
        @click="oneSortTap(index)"
      >
        {{ item.name }}
        <div class="like">{{ item.meta.nameTwo}}</div>
      </div>
    </div>
    <component :is="cartOne[cartActive]"></component>
    <div style="height:500px">.</div>
  </div>
</template>

<script>
import All from '@/views/home/components/Header-cart/All'
import Season from '@/views/home/components/Header-cart/Season'
import Feel from '@/views/home/components/Header-cart/Feel'
import Enter from '@/views/home/components/Header-cart/Enter'
export default {
  data() {
    return {
      msg: "",
      cartActive:'',
        // 选项卡
      cartHuan: [
        {
          name: "全部",
          meta: {
            nameTwo: "猜你喜欢"
          }
        },
        {
          name: "时令",
          meta: {
            nameTwo: "当季优选"
          }
        },
        {
          name: "进口",
          meta: {
            nameTwo: "国际直采"
          }
        },
        {
          name: "人气",
          meta: {
            nameTwo: "大家在买"
          }
        }
      ],
      cartActive: 0,
      cartOne: ["All", "Season", "Feel", "Enter"]
    };
  },
  components:{
    All,
    Season,
    Feel,
    Enter
  },
  methods: {
    oneSortTap: function(index) {
      this.cartActive = index;
    }
  }
};
</script>

<style lang='less' scoped>
 //选项卡
  .navScroll {
    display: flex;
    justify-content: center;
    text-align: center;
    .cart-font {
      text-align: center;
      line-height: 0.36rem;
      width: 25%;
      height: 0.8rem;
      .like {
        margin-left:0.32rem;
        margin-top: 0.06rem;
        display: flex;
        justify-content: space-evenly;
        width: 1.24rem;
        height: 0.32rem;
        font-size: 0.02rem;
        background-color: rgb(68, 160, 247);
        color: white;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        // border-radius: 0.4rem;
      }
    }
    .greenA {
      width: 25%;
      height: 40px;
      text-align: center;
      color: rgb(68, 160, 247);
      // font-weight: bold;
      box-sizing: border-box;
    }
  }
</style>
