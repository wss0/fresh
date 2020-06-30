<template>
  
  <div class="history">
      <!-- 搜索历史  实时热搜  搜索热门品类 -->
    <div class="one" v-if="list[0]">
      <span class="search">搜索历史</span>
      <div class="one-bottom">
        <span v-for="(item,index) in list" :key='index'>{{item}}</span>
      </div>
      <div @click="clear">
        点击清除历史记录
      </div>
    </div>
   
    <div class="three">
      <span class="search">搜索热门品类</span>
      <div class="three-bottom">
        <span class="mi" v-for='(item,index) in keywords' :key='index'>{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import {getSearchKeyword} from "@/api/index.js"
export default {
  props:['search_history'],
     name: "History",
    //  computed:{
    //    ...mapState(['history_list'])
    //  },
    data(){
      return{
       keywords:[],
       list: []
      }
    },
     mounted(){
       this.list = this.search_history
      getSearchKeyword().then(res => {
        
        this.keywords = res.data.data;
        // console.log(this.keywords)
      });
     },
     methods:{
       clear(){
         this.list = []
         this.$emit('change1', this.list)
       }
     }
};
</script>

<style lang="less" scoped>
// <!-- 搜索历史  实时热搜  搜索热门品类 -->
.history {
  margin-top: 0.4rem;
  padding-left: .2rem;
  .search {
    font-weight: bold;
    color: black;
  }
  .one {
    height: 1.6rem;
    // border: 1px solid red;
    .one-bottom {
      span {
        // width: 28px;
        // height: 22px;
        padding: 0.1rem 0.2rem;
        line-height:0.44rem;
        text-align: center;
        border-radius: 0.4rem;
        display: inline-block;
        margin-top: 0.2rem;
        background-color: #f5f5f5;
        &.you {
          margin-left: 0.16rem;
        }
      }
    }
  }
  
  .three {
    height: 80px;
    // border: 1px solid red;
    .three-bottom {
      span {
        padding: 0.04rem 0.3rem;
        margin-left: 0.2rem;
        line-height: 0.44rem;
        text-align: center;
        border-radius: 0.4rem;
        display: inline-block;
        margin-top: 0.2rem;
        background-color: #f5f5f5;
      }
      
    }
  }
}
</style>

