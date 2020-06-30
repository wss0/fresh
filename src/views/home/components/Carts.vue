<template>
  <div class="nav">
    <router-link
      :to="item.wap_url ? item.wap_url : ''"
      class="item"
      v-for="(item, index) in menus"
      :key="index"
    >
      <div class="pictrue">
        <img :src="item.pic" alt="img" />
      </div>
      <div class="nav-title">{{ item.name }}</div>
    </router-link>
  </div>
</template>

<script>
import { navScroll } from "@/api/index.js";
import axios from "axios";
export default {
  data() {
    return {
      msg: "",
      menus: []
    };
  },
  mounted() {
    this.navScroll();
  },
  methods: {
    navScroll() {
      navScroll().then(res => {
        let that = this;
        let list = res.data.data.menus;
        that.menus = list;
      });
    }
  }
};
</script>

<style lang='less' scoped>
.nav {
  width: 100%;
  background: rgb(240, 239, 239);
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.3rem;
  .item {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 20%;
    text-align: center;
    font-size: 0.26rem;
    margin-bottom: 0.35rem;
    .pictrue {
      width: 45px;
      height: 45px;
      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
      }
    }
    .nav-title {
      color: black;
      margin-top: 6px;
      font-size: 10px;
    }
  }
}
</style>
