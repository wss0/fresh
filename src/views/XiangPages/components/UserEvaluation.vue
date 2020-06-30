<template>
  <div>
    <div class="wrapp" v-for="(item,index) in reply_" :key="index" >
      <div class="wrapper">
        <div class="left">
          <div class="left_left">
            <img :src="item.avatar" alt class="image" />
          </div>
          <span class="right_right">{{item.nickname}}</span>
        </div>
        <div class="right">{{item.add_time}}</div>
      </div>
      <div class="comment">{{item.comment}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["reply"],
  data() {
    return {
      reply_: []
    };
  },
  methods: {},
  mounted() {
    this.reply_ = this.reply;
    this.reply_.splice(1,1)
  }
};
</script>

<style lang='less' scoped>
.wrapper {
  width: 100%;
  height: 0.88rem;
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    .left_left {
      margin-right: 0.5rem;
      width: 0.9rem;
      height: 0.9rem;
      .image {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
  }
}
.comment{
  margin-left: 1.36rem;
}
</style>
