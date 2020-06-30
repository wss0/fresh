<template>
  <div>
    <SortTop/>
    <SortLeft @change="changew" />
    <SortRight :product_list="product_list" />
  </div>
</template>


<script>
import SortTop from '@/views/Sort/components/sort-top'
import SortLeft from '@/views/Sort/components/sort-left'
import SortRight from '@/views/Sort/components/sort-right'
export default {
   data(){
       return{
         product_list: []
       }
   },
   components:{
       SortTop,
       SortLeft,
       SortRight
   },
   methods:{
     changew(list){
       this.product_list = list
     }
   }
}

</script>


<style lang='less' scope>

</style>