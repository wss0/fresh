<template>
  <div class="acea-row row-middlefooter" id="footer">
    <router-link
      class="item"
      tag="li"
      :class="{ on: item.url === $route.path }"
      :to="item.url"
      v-for="(item, index) in footerList"
      :key="index"
    >

      <!-- <div v-if="index==3 && $route.path=='/cart/cartChildrent'" class="threeNum">{{pickNum}}</div> -->
      <div class="p-t">
        <svg class="icon">
          <use :xlink:href="item.url === $route.path ? item.icon2 : item.icon1" />
        </svg>
        <div  :class="nowIndex == index ? 'blue' :''" @click="btn(index)">{{ item.name }}</div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      footerList: [
        {
          name: "首页",
          icon1: "#icon-home",
          icon2: "#icon-shouye",
          url: "/home/first"
        },
        {
          name: "分类",
          icon1: "#icon-fenlei",
          icon2: "#icon-fenlei1",
          url: "/home/sort"
        },
        {
          name: "盒区生活",
          icon1: "#icon-huanyingyu",
          icon2: "#icon-hi",
          url: "/home/life"
        },
        {
          name: "购物车",
          icon1: "#icon-gouwuche1",
          icon2: "#icon-gouwuche",
          url: "/home/cart",
        },
        {
          name: "我的",
          icon1: "#icon-xiaolian",
          icon2: "#icon-xiaolian1",
          url: "/home/user",
          meta: {
            auth: true
          }
        }
      ],
      nowIndex:0,
      pickNum: 0
    };
  },
  methods: {
    btn(index){
      this.nowIndex = index
    }
  },
  
 
};
</script>

<style lang='less' scoped>

#footer {
  background-color: white;
  position: fixed;
  z-index: 99;
  bottom: 0;
  width: 100%;
  height: 1rem;
  display: flex;
  border-top: 0.01rem solid #e0e0e0;
}
.item {
  width: 20%;
  height: 100%;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.icon {
  width: 0.6rem;
  height: 0.4rem;
  line-height: 1;
  font-size: 0.24rem;
  color: #616161;
  text-align: center;
}
.blue{
  color: #25a4bb;
}
</style>
