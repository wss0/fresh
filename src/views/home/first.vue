<template>
  <div class="nav">
      <home-header></home-header>
      <home-recommend></home-recommend>
      <home-weekend></home-weekend>
      <home-icons></home-icons>
      <home-pic-two></home-pic-two>
      <home-swiper></home-swiper>  
  </div>
</template>

<script>
import HomeHeader from "./components/Header.vue"; //顶部导航
import HomeRecommend from "./components/Scrllo"; //轮播图
import HomeSwiper from "./components/Icons"; //选项卡
import HomeIcons from "./components/Scroll-two"; //超核算
import HomePicTwo from "./components/Pic-two";
import HomeWeekend from "./components/Carts"; //菜单列表
export default {
  name: "Home",
  data() {
    return {
      category: [1, 2, 3],
      active: 0,
      arr:[{age:1},{age:2}]
    };
  },
  components: {
    HomeHeader,
    HomeRecommend,
    HomeWeekend,
    HomeIcons,
    HomePicTwo,
    HomeSwiper,
  },
  watch:{
    arr:{
       deep:true,
       handler(newArr,oldArr){
          
       }
    }
  },
  methods: {
    oneSortTap(index) {
     
    },

  }
};
</script>
<style lang="less" scoped>
.nav {
  background-color: rgb(250, 250, 250);
}
.blue {
  color: blue;
}
</style>