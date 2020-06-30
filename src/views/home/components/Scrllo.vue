<template>
   <div class="scroll">
      <div class="swiper-container">
        <swiper :options="swiperOption" >
        <swiper-slide v-for="(item, index) in banner" :key="index">
          <img :src="item.pic" />
        </swiper-slide>
        <div class="swiper-pagination paginationBanner" slot="pagination"></div>
      </swiper>
      </div>
    </div>
</template>

<script>
import { getHomeData } from "@/api/index.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "@/assets/css/swiper.min.css";
export default {
  data() {
    return {
      banner:[],
      swiperOption:{
         pagination: '.swiper-pagination'
      }
    };
  },
  mounted(){
    this.getHomeData()
  },
  methods: {
      getHomeData(){
        getHomeData().then(res=>{
          console.log(res.data.data.banner)
          this.banner = res.data.data.banner
        })
      }
  }
};
// rgb(65, 187, 235)
</script>

<style lang='less' scoped>
.scroll /deep/ .swiper-pagination-bullet-active{
    background: #fff;
}
.scroll{
  padding-top: 1.6rem;
  height:4.5rem;
  width: 100%; 
  overflow: hidden;
  .swiper-container{
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    list-style: none;
    padding: 0;
    z-index: 90;
     img{
       width:100%;
       height: 100%;
     }
  }
}
</style>

