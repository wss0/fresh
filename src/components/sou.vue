<template>
  <div>
    <div class="product-top">
      <div class="product-suo">
        <img src="@/assets/search-top/放大镜 .png" alt />
        <input type="text" placeholder="点击搜索商品" v-model="search" ref="focus" />
      </div>
      <div class="bnt" @click="submit">搜索</div>
    </div>
    <!-- 搜索历史  实时热搜  搜索热门品类 -->
    <History v-show='!search' :search_history='search_history'
    @change1="change"
    ></History>
    <!-- 搜索没有商品时 -->
    <div
      class="noCommodity"
      v-cloak
      v-if="goodList.length === 0 && where.page > 1"
    >
      <div class="noPictrue">
        <img src="@/assets/images/noSearch.png" class="image" />
      </div>
    </div>
      <!-- 能够搜索到商品的组件 -->
    <GoodList :goodList="goodList"  :search='search'   v-show='!flag'></GoodList>
  </div>
</template>

<script>
import { getProducts,getSearchKeyword } from "@/api/index.js";
import GoodList from "@/components/GoodList";
import History from "@/components/History";
import { trim } from "@/utils";
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      search: "",
      keywords:[],
      where: {
        page: 1,
        limit: 20,
        keyword: ""
      },
      goodList: [],
      flag:true,
      search_history: [],
      status: null
    };
  },
  computed:{
     ...mapState(['show'])
  },
  mounted(){
      this.getData()
      this.getGoodlist()
      console.log(this.$route)
      this.route = this.$route.path
      if(this.route.indexOf(this.router)>-1 ){
         this.status = true
         this.changeShow(this.status)
      }
  },
  methods:{
    ...mapMutations(['changeHistoryList','changeShow']),
    getData(){
       getSearchKeyword().then(res => {
        this.keywords = res.data;
      });
    },
    submit() {
      const search = trim(this.search) || "";
      if (!search) return;
      this.flag=false
      this.where.keyword = search;
      this.where.page = 1;
      this.search_history.push(search)
    },
    getGoodlist() {
      let q = this.where;
      getProducts(q).then(res => {
        this.goodList.push.apply(this.goodList, res.data.data);
        this.where.page = this.where.page + 1;
      });
    },
    change(list){
      this.search_history = list
    }
  },
  components:{
    GoodList,
    History
  }
};
</script>




<style lang='less' scoped>
//上方

.product-top {
   touch-action: none; 
  background-color: #f7f7f7;
  width: 100%;
  height: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .product-suo {
    border-radius: 0.4rem;
    background-color: #fff;
    width: 5.1rem;
    height: 0.68rem;
    line-height: 0.68rem;
    img {
      margin-left: 0.2rem;
      width: 0.5rem;
      height:  0.5rem;
    }
  }
  .bnt {
    border-radius:0.4rem;
    background-color: #1ab4fc;
    color: white;
    text-align: center;
    margin-left: 0.2rem;
    width: 1.14rem;
    height:0.68rem;
    line-height: 0.68rem;
  }
}
</style>
