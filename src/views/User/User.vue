<template>
  <div class="wrapper">
     <user-top></user-top>
     <user-ding></user-ding>
     <user-she></user-she>
     <user-like></user-like>
  </div>
</template>

<script>
import userTop from '@/views/User/components/userTop'
import userDing from '@/views/User/components/userDing'
import userShe from '@/views/User/components/userShe'
import userLike from '@/views/User/components/userLike'
export default {
  data () {
    return {
      msg: ''
    }
  },
  methods: {

  },
  components:{
    userTop,
    userDing,
    userShe,
    userLike
  }
}
</script>

<style scoped>
.wrapper{
  background-color: rgb(250,250,250);
  width: 100%;
  height: 100%;
}
</style>
