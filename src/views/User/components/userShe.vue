<template>
  <div>
    <div class="myService">
      <!-- <div class="title acea-row row-middle">我的服务</div> -->
      <div class="serviceList acea-row row-middle">
        <template v-for="(item, index) in MyMenus">
          <div class="itemB" :key="index" @click="goPages(index)" v-if="item.wap_url">
            <div class="pictrue">
              <img :src="item.pic" />
            </div>
            <div>{{ item.name }}</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, getMenuUser } from "@/api/index";
export default {
  data() {
    return {
      MyMenus: []
    };
  },
  mounted() {
    this.MenuUser();
  },
  methods: {
    MenuUser: function() {
      let that = this;
      getMenuUser().then(res => {
        that.MyMenus = res.data.data.routine_my_menus;
      });
    }
  }
};
</script>

<style lang='less' scoped>
.serviceList {
  display: flex;
  width: 352px;
  flex-wrap: wrap;
  // border: 1px solid red;
  margin-left: 10px;
  margin-top: 10px;
  height: 185px;
  border-radius: 10px;
  background: #fff;
  .itemB{
    // border: 1px solid red;
    width: 25%;
   padding-left: 10px;
   box-sizing: border-box;
   text-align: center;
   img{
     width: 70%;
   }
  }
}
</style>
