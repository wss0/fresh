<template>
  <div class="aside">
    <div
      class="item"
      v-for="(item,index) in sortList"
      :key="index"
      @click="sort(index)"
      :class="sortActive == index ? 'font-color-blue' : '' "
    >
      <span>{{item.cate_name}}</span>
    </div>
  </div>
</template>


<script>
import axios from "axios";
// import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      sortList: [],
      sortActive: 0
    };
  },
  mounted() {
    this.category();
  },
  // computed: {...mapState['product_list']},
  methods: {
    // ...mapMutations['changeProductList'],
    category() {
      // var array = [];
      // for (let i = 0; i < this.categoryTwo.length; i++) {
      //   array.push(this.categoryTwo[i].id);
      // }
      axios.get("https/api/category").then(res => {
        console.log(res);
        this.sortList = res.data.data;
      });
    },
    sort(index) {
      this.sortActive = index;

      var array = [];
      for (let i = 0; i < this.sortList.length; i++) {
        array.push(this.sortList[i].id);
      }
     axios.get("https://hema.insideria.vip/api/products", {
       params:{
         cid:array[index]
       }
     }).then(res=>{
       this.prolist = res.data.data;
       this.$emit('change', this.prolist)
      //  this.changeProductList(this.prolist)
     })
    }
  
  }
}
</script>
<style lang='less' scope>
.aside {
  float: left;
  width: 1.8rem;
  height: 100%;
  background-color: #f7f7f7;
  margin-top: 6px;
  padding-bottom: 200px;
  .item {
    // border: 1px solid red;
    // height: 0.98rem;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 0.98rem;
    position: relative;
  }
  .item.font-color-blue {
    background-color: #fff;
    width: 100%;
  }
  .item.font-color-blue::before {
    content: "";
    width: 0.04rem;
    height: 0.35rem;
    background-color: rgb(105, 105, 247);
    position: absolute;
    top: 50%;
    margin-top: -0.175rem;
    left: 0;
  }
}
</style>