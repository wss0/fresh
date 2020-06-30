<template>
  <div>
    <div class="wrapper activity acea-row row-between-wrapper">
      <router-link to="/" class="item" v-for="(item, index) in activity" :key="index">
        <div class="text">
          <div class="name">{{ item.title }}</div>
          <div class="nameB">{{ item.info }}</div>
        </div>
        <img :src="item.pic" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { getHomeData } from "@/api/index.js";
export default {
  data() {
    return {
      activity: []
    };
  },
  mounted() {
    this.getHomeData();
  },
  methods: {
    getHomeData() {
      getHomeData().then(res => {
        this.activity = res.data.data.activity;
        this.activity.splice(1, 1);
      });
    }
  }
};
</script>

<style lang='less' scoped>
.wrapper {
  display: flex;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
  margin-bottom: 10px;
  .item {
    width: 50%;
    height: 2.6rem;
    overflow: hidden;
    border: 1px solid #f5f5f5;
    padding: 0.2rem 0.3rem;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 4px;
    img {
      width: 100%;
    }
    .text {
      margin-bottom: 0.2rem;
      .name {
        color: black;
        font-weight: bold;
        margin-bottom: 0.2rem;
      }
      .nameB {
        color: black;
      }
    }
  }
}
</style>
