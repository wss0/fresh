
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/style/reset.css'
// 一像素边框
import '@/assets/style/border.css'
// 移动端300毫秒延迟
import fastClick from 'fastclick'
fastClick.attach(document.body)


//登录  
import ele from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ele);


import { Icon } from 'vant';
Vue.use(Icon);


//购物车需要兄弟组件传值   eventBus
import EventBus from './EventBus.js';
Vue.prototype.$bus = EventBus;

//首页轮播  swiper
// import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)

import "@/assets/iconfont/iconfont";
import "@/assets/iconfont/iconfont.css";

import store from './store'

Vue.prototype.$dialog = dialog;
import dialog from "./utils/dialog";

Vue.config.productionTip = false

import "@/assets/js/media_750";
import "vue-ydui/dist/ydui.base.css";
import "@/assets/css/base.css";
import "@/assets/css/reset.css";
import "@/assets/css/style.css";


//立即保存
Vue.prototype.$validator = function(rule) {
  return new schema(rule);
};
//异步验证
import schema from "async-validator";

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
