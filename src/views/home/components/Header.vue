<template>
  <div v-cloak>
    <div  id="indexs">
      <div class="top-nav">
        <div class="left">
          <img src="@/assets/search-top/定位.png" alt />
          <span class="top-title" :style="{ opacity: 'textOpacity' }" v-if="show">北京路8号</span>
        </div>
        <div class="right">
          <img src="@/assets/search-top/扫描.png" alt />
          <img src="@/assets/search-top/二维码.png" alt />
        </div>
      </div>

      <div class="search" :style="{ bottom: topBottom, width: topWidth, left: topLeft }">
        <router-link to="/search/sou" class="text" tag="input">
          <input type="text" class="textA" />
        </router-link>
        <button class="sou_"></button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Hearder",
  data() {
    return {
      textOpacity: 1,
      topBottom: "0%",
      topWidth: "100%",
      topLeft: "0%",
      show: true
    };
  },
  mounted: function() {
    window.addEventListener("scroll", this.handleScroll);
    var indexs = document.getElementById("indexs");
    // console.log(indexs.style.height)
  },
  methods: {
    handleScroll() {
      var that = this;
      let indexs = document.getElementById("indexs");
      var num = window.scrollY;
      if (window.scrollY <= 200 && window.scrollY > 0) {
        this.show = false;
        /* 
          滚动条从0开始滑动到200为止，滚动条变化值s=200，
          搜索框由初始位置变化到末尾，bottom变化值b=100，width变化值w=35，left变化值l=10，
          假设滑动到0-200之间某位置时，搜索框bottom为x，滚动条位置为num，
          x/b = num/s => x=b*num/s, 
          bottom初始位置为0，逐渐增加，
          则topBottom = 0+x => topBottom = 0+b*num/s
          同理，width从100开始逐渐减小，
          topWidth = 100-x => 100-w*num/s
        */
        // bottom从0%->100%，
        that.topBottom = (100 * num) / 200 + "%";
        // 宽度逐渐变窄，从100%->65%，变化了35%，100-变化的值就是滑动到某时刻的宽度百分数
        that.topWidth = 100 - (35 * num) / 200 + "%";
        // left从0->10%，变化了10%，
        that.topLeft = (10 * num) / 200 + "%";
        indexs.style.height = 1.3 - (0.5 * num) / 200 + "rem";
      } 
      // else if (window.scrollY <= 200 && window.scrollY > 50) {
      //   that.topWidth = 65 + "%";
      //   that.topLeft = 10 + "%";
      //   that.topBottom = (100 * num) / 200 + "%";
      //   indexs.style.height = 1.3 - (0.5 * num) / 200 + "rem";
      // }
      if (window.scrollY > 200) {
        that.topBottom = "100%";
        indexs.style.height = 1 + "rem";
      }
      if (window.scrollY == 0) {
        that.topBottom = 0 + "%";
        indexs.style.height = 1.3 + "rem";
        that.topWidth = "100%";
        that.topLeft = "0%";
        this.show = true;
      }
    },
    navScroll() {
      axios.get("https://hema.insideria.vip/api/index").then(res => {
        let that = this;
        let list = res.data.data.menus;
        that.menus = list;
      });
    }
  }
};
</script>

<style lang="less" scoped>
* {
  margin: 0px;
  padding: 0px;
}
#indexs{
  touch-action: none; 
  position: fixed;
  top: 0;
  width: 100%;
  padding: 2%;
  height: 1.3rem;
  z-index: 99;
  background-color: white;
  overflow: hidden;
  .top-nav {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 0.6rem;
    .left {
      text-align: middle;
      .top-title {
        padding-left: 0.2rem;
      }
    }
    img {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
  .search {
    position: relative;
    height: 0.58rem;
    margin-top: -0.04rem;
    border: 0.03rem solid rgb(65, 187, 235);
    border-right: 0;
    border-radius: 0.4rem;
    background-color: white;
    display: flex;
    overflow: hidden;
    .text {
      margin-left: 0.3rem;
      flex: 1;
    }
    .sou_ {
      width: 0.8rem;
      height: 0.6rem;
      border-radius: 0.4rem 0 0 0.4rem;
      background: url("../../../assets/search-top/搜索.png") no-repeat center;
      background-color: rgb(65, 187, 235);
      background-size: 77% 90%;
    }
  }
}
</style>


