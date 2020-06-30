import Vue from 'vue'
import VueRouter from 'vue-router'


import first from '@/views/home/first'
// import SortIndex from "@/views/Sort/index";
import Sort from "@/views/Sort/index"
import ShoppingCart from "@/views/shop/ShoppingCart";
import ShopIndex from "@/views/shop/shopIndex";
import User from "@/views/User/User";
import Life from '@/views/Life/life'
import home from "@/views/home/Home.vue"
Vue.use(VueRouter)
//两次访问相同路劲防止报错
const originalPush = VueRouter.prototype.push;
var location = "/order/list/:type?"
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => {
    console.log(1,err)
    return err
  })
};

const routes = [
  {
    path: "/",
    redirect:'/home/first'
  },
  {
    path: "/home",
    name: "home",
    component:home,
    children:[
      {
        path: "/home/first",
        name: "first",
        component: first, //首页
      },
      {
        path: "Sort",
        name: "SortIndex",
        component: Sort,   //分类
      },
      {
        path: "life",
        name: "life", 
        component: Life  //盒区生活
      },
      {
        path: "cart",
        name: "cartChildrent",  //购物车
        component: () => import(/*通过购物车点击后的页面*/"@/views/shop/CartChildrent.vue")
      },
      {
        path: "user",
        name: "User",
        component: User,  //我的
        beforeEnter: (to, from, next) => {
          // console.log(token)
          if (localStorage.getItem('token')) {
            next()
            console.log(localStorage.getItem('token'))
          } else {
            next('/login')
          }
        }
      },
    ]
  },
  

  {
    path: '/search/sou',
    name: 'sou',
    component: () => import(/*点开分类之后进入的页面*/"@/components/sou.vue")
  }, 
  {
    path: "/order/submit/:id",
    name: "OrderSubmission",
    meta: {
      title: "提交订单",
    },
    component: () => import("@/views/order/OrderSubmission.vue")
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( /*登录之跳转*/"@/views/login/Login.vue")
  },
  {
    path: '/register',
    name: 'register',
    component: () => import( /*注册*/"@/views/login/register.vue")
  },
  {
    path: '/loginTwo',
    name: 'LoginTwo',
    component: () => import( /*登录*/"@/views/login/LoginTwo.vue")
  },
  {
    path: '/XiangPages/:id',
    name: 'XiangPages',
    component: () => import(/*详情页*/ "@/views/XiangPages/XiangPages.vue")
  },
  {
    path: "/evaluate_list/:id",
    name: "EvaluateList",
    meta: {
      title: "商品评分",
    },
    component: () => import(/*更多商品评价*/"@/views/XiangPages/components/moreEvaluation.vue")
  },
  {
    path: "/order/submit/:id",
    name: "OrderSubmission",
    meta: {
      title: "提交订单",
    },
    component: () => import(/*订单页面点击提交订单*/"@/views/order/OrderSubmission")
  },
  {
    path: "/user/add_address",
    name: "AddAddress",
    meta: {
      title: "添加收货地址",
    },
    component: () => import(/*添加新的收货地址*/"@/views/order/components/AddAddress.vue")
  },
  {
    path: "/order/status/:id/:status",
    name: "PaymentStatus",
    meta: {
      title: "支付状态",
    },
    component: () => import("@/views/order/components/PaymentStatus")
  },
  // {
  //   path: "/order/list/:type?",
  //   name: "MyOrder",
  //   meta: {
  //     title: "我的订单",
  //   },
  //   component: () => import(/*我的界面-待付款*/"@/views/User/user-order/MyOrder")
  // },
  {
    path: "*",
    name: "NotDefined",
    meta: {
      backgroundColor: "#F4F6FB"
    },
    component: () => import(/*页面找不到了*/ "@/components/NotDefined")
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router




