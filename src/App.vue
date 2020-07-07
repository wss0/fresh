<template>
  <div id="app" v-cloak>
      <router-view></router-view>
  </div>
</template>

<script>
import Footer from "@/components/Footer";
import { mapState } from 'vuex'
export default {
  data() {
    return {
    };
  },
  components: {
    Footer,
  },
  computed:{
    ...mapState(['show'])
  },
  watch: {
    $route(to, from, next) {}
  }
};
</script>

<style lang="less">
[v-cloak] {
  display: none !important;
}
* {
  margin: 0;
  padding: 0;
  touch-action: none;
}
.router {
  position: absolute;
  width: 100%;
}
html {
  background-color: rgb(202, 201, 201);
}
</style>