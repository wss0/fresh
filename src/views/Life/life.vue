<template>
  <div class="life-All">
    <div class="top-life">生活</div>
    <div class="dongHu">
      <div class="dong">
        <img src="@/assets/life/hmlife_01.png" />
        <span>动态</span>
      </div>
      <div class="hu">
        <img src="@/assets/life/hmlife_02.png" />
        <span>互动</span>
      </div>
    </div>
    <div class="smallHm">
      <img src="@/assets/life/hmlife_03.png" />
    </div>
    <div class="scrollA" style="height:500px"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: ""
    };
  },
  methods: {}
};
</script>

<style lang='less' scoped>
.life-All {
  background-color: rgb(245, 245, 245);
  font-size: 18px;
  height: 100%;
  .top-life {
    width: 100%;
    height: 60px;
    background-color: rgb(153, 201, 245);
    line-height: 60px;
    text-align: center;
    color: #fff;
  }
  .dongHu {
    display: flex;
    flex: 1;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background-color: #f5f5f5;
    img {
      display: inline-block;
      width: 35px;
      margin-top: -7px;
    }
    .dong {
      width: 50%;
      background-color: #fff;
      border-radius: 10px;
      margin: 6px 12px;
      vertical-align: middle;
      span {
        margin-left: 10px;
      }
    }
    .hu {
      width: 50%;
      background-color: #fff;
      border-radius: 10px;
      margin: 6px 12px;
      vertical-align: middle;
      span {
        margin-left: 10px;
      }
    }
  }
  .smallHm {
    width: 300px;
    height: 300px;
    margin: 10px auto;
    img {
      display: block;
      width: 106%;
      height: 84%;
    }
  }
}
</style>
