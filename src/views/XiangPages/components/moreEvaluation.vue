<template>
  <div class="evaluate-list" ref="container">
    <div class="header">
        <div class="black">
            商品评价{{replyCount}}
        </div>
      <div class="nav acea-row row-middle">
        <div class="acea-row row-center-wrapper" v-for="(item, index) in navList" :key="index">
          <!--  -->
          <div
            class="item"
            :class="currentActive === index ? 'bg-color-green' : ''"
            v-if="item.num"
          >{{ item.evaluate }}({{ item.num }})</div>
        </div>
      </div>
    </div>
    <UserEvaluation :reply="reply"></UserEvaluation>
  </div>
</template>


<script>
import { getReplyConfig, getProductDetail, getReplyList } from "@/api/index.js";
import UserEvaluation from "@/views/XiangPages/components/UserEvaluationPic";
export default {
  data() {
    return {
      product_id: 0,
      replyData: {},
      navList: [
        { evaluate: "全部", num: 0 },
        { evaluate: "好评", num: 0 },
        { evaluate: "中评", num: 0 },
        { evaluate: "差评", num: 0 }
      ],
      page: 1,
      limit: 8,
      reply: [],
      currentActive: 0
    };
  },
  mounted() {
    this.product_id = this.$route.params.id;
    this.getProductReplyCount();
    this.getProductReplyList();
  },
  methods: {
    getProductReplyCount: function() {
      getReplyConfig(this.product_id).then(res => {
        this.replyData = res.data.data;
        this.navList[0].num = res.data.sum_count;
        this.navList[1].num = res.data.good_count;
        this.navList[2].num = res.data.in_count;
        this.navList[3].num = res.data.poor_count;
      });
    },
    //产品评论列表   需要给更多商品界面传值reply
    getProductReplyList: function() {
      getReplyList(this.product_id).then(res => {
        this.reply.push.apply(this.reply, res.data.data);
      });
    },
    //自定义方法 获取数据
    getProduct() {
    
      getProductDetail(this.product_id).then(res => {
        // 评价
        this.replyCount = res.data.data.replyCount
      });
    },
  },
  components: {
    UserEvaluation
  }
};
</script>


<style lang='less' scope>
.black{
  color: black;
  text-align: center;
  height: 0.7rem;
  font-size: 0.32rem;
  line-height: 0.7rem;
  background-color: white;
  font-weight: bold;
}
</style>