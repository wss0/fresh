<template>
  <div class="evaluateWtapper">
    <div class="evaluateItem" v-for="(item, index) in reply" :key="index">
      <div class="pic-text acea-row row-middle">
        <div class="pictrue">
          <img :src="item.avatar" class="image" />
        </div>
        <div class="acea-row row-middle">
          <div class="name line1">{{ item.nickname }}</div>
          <div class="start" :class="'star' + item.star"></div>
        </div>
      </div>
      <div class="time">{{ item.add_time }} {{ item.suk }}</div>
      <div class="evaluate-infor">{{ item.comment }}</div>
      <div class="imgList acea-row">
        <div class="pictrue" v-for="(itemn, index) in item.pics" :key="index">
          <img :src="itemn" class="image" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { ImagePreview } from "vant";

Vue.use(ImagePreview);
export default {
  name: "UserEvaluation",
  props: {
    reply: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  mounted: function() {
    
  },
  methods: {
  
  }
};
</script>
