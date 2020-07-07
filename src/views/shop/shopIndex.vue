<template>
  <div class="shoppingCart">
    <div class="top-shop">
      <span class="top-title">购物车</span>
      <span class="top-delete"  @click="delgoods" style="touch-action:none">删除</span>
    </div>

    <div v-if="cartList.valid.length > 0 || cartList.invalid.length > 0">
      <div class="list">
        <div
          class="item acea-row row-between-wrapper"
          v-for="(item, index) in cartList.valid"
          :key="index"
        >
          <div class="select-btn">
            <div class="checkbox-wrapper">
              <label class="well-check">
                <input
                  type="checkbox"
                  name
                  value
                  :checked="item.checked"
                  @click="switchSelect(index)"
                />
                <!-- 判断是否是选中状态 checked-->
                <i class="icon"></i>
              </label>
            </div>
          </div>
          <div class="picTxt acea-row row-between-wrapper">
            <div class="pictrue" @click="$router.push({ path: '/detail/' + item.product_id })">
              <img :src="item.productInfo.attrInfo.image" v-if="item.productInfo.attrInfo" />
              <img :src="item.productInfo.image" v-else />
            </div>
            <div class="text">
              <div class="line1">{{ item.productInfo.store_name }}</div>
              <div
                class="infor line1"
                v-if="item.productInfo.attrInfo"
              >属性：{{ item.productInfo.attrInfo.suk }}</div>
              <div class="money">￥{{ item.truePrice }}</div>
            </div>
            <div class="carnum acea-row row-center-wrapper">
              <div
                class="reduce"
                :class="cartList.valid[index].cart_num <= 1 ? 'on' : ''"
                @click.prevent="reduce(index)"
              >-</div>

              <div class="num">
                <input
                  type="number"
                  v-model="item.cart_num"
                  class="ipt_num"
                  @input.prevent="specifiName(index)"
                  @blur.prevent="blurName(index)"
                />
                <!-- prevent是阻止默认事件   input是输入   blur是失去焦点-->
              </div>
              
              <div
                class="plus"
                v-if="cartList.valid[index].attrInfo"
                :class="
                  cartList.valid[index].cart_num >=
                  cartList.valid[index].attrInfo.stock
                    ? 'on'
                    : ''
                "
                @click.prevent="plus(index)"
              >+</div>
              <!-- click.prevent  点击阻止默认事件  因为一个加号还有可能是前面的click事件   为了当我点击加号不影响其他的click事件所以需要.prevent-->
              <div
                class="plus"
                v-else
                :class="
                  cartList.valid[index].cart_num >= cartList.valid[index].stock
                    ? 'on'
                    : ''
                "
                @click.prevent="plus(index)"
              >+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--购物车暂无商品-->
    <div class="noCart" v-if="cartList.valid.length === 0 && cartList.invalid.length === 0">
      <div class="pictrue">
        <img src="@/assets/images/noCart.png" />
      </div>
      <div class="goShopping">
        <span>去逛逛</span>
      </div>
      <Recommend></Recommend>
    </div>
    <div style="height:2.1rem"></div>
    <div class="footer acea-row row-between-wrapper" v-if="cartList.valid.length > 0">
      <div>
        <div class="select-btn">
          <div class="checkbox-wrapper">
            <label class="well-check">
              <input
                type="checkbox"
                name
                value
                :checked="isAllSelect && cartCount > 0"
                @click="allChecked"
              />
              <i class="icon"></i>
              <!-- 全选框满足条件   商品数量不能为0   -->
              <span class="checkAll">全选 ({{ cartCount }})</span>
            </label>
          </div>
        </div>
      </div>
      <!-- v-if="footerswitch === false"    没有用  可以删掉 -->
      <div class="money acea-row row-middle" >
        <span class="font-color-orange">￥{{ countmoney }}</span>
        <div class="placeOrder bg-color-green" @click="placeOrder">立即下单</div>
      </div>
    </div>
  </div>
</template>
<script>
import Recommend from "@/components/Recommend";
import {
  getCartList,
  postCartDel,
  changeCartNum,
  getCartCount
} from "@/api/store";
import { postCollectAll } from "@/api/user";
import { mul, add } from "@/utils/bc";
import cookie from "@/utils/store/cookie";
import debounce from "lodash.debounce";

const CHECKED_IDS = "cart_checked";
var i
export default {
  name: "ShoppingCart",
  components: {
    Recommend
  },
  props: {},
  data: function() {
    return {
      // invalid是没有商品     valid有选中商品
      cartList: { invalid: [], valid: [] },

      isAllSelect: false,
      cartCount: 0,
      countmoney: 0,
      // goodsHidden: true,
      // footerswitch: false,
      count: 0,

      // 全选  数组
      checkedIds: [],//4 checkedIds

      loaded: false,
      index_num: 0
    };
  },
  watch: {
    $route(n) {
      if (n.name === "ShoppingCart") {
        this.carnum();
        this.countMoney();
        this.getCartList();
        this.gainCount();
        // this.goodsHidden = true;
        // this.footerswitch = false;
      }
    }
  },
  mounted: function() {
    let that = this;
    that.carnum();
    that.countMoney();
    that.getCartList();
    that.gainCount();
  },
  methods: {
    //获取商品
    getCartList: function() {
      let that = this;
      getCartList().then(res => {
        that.cartList = res.data;
        
        let checkedIds = cookie.get(CHECKED_IDS) || []; //3 checkedIds

        if (!Array.isArray(checkedIds)) checkedIds = [];  // Array.isArray判断checkedIds是不是数组
        this.cartList.valid.forEach(cart => {
          if (checkedIds.length) {
            //
            if (checkedIds.indexOf(cart.id) !== -1) cart.checked = true;
            else cart.checked = false;
          } else {
            cart.checked = true;
            that.checkedIds.push(cart.id);
          }
        });
        if (checkedIds.length) {
          that.checkedIds = checkedIds;
        }
        that.isAllSelect =
          that.checkedIds.length === this.cartList.valid.length;
        //全选框流程  data->false -->获取商品列表时 在做判断  前端设置的全选框的长度===后端获取获取商品的长度

        that.carnum();
        that.countMoney();
        this.loaded = true;
      });
    },
    //删除商品；
    delgoods: function() {
      let that = this,
        id = [],
        valid = [],
        list = that.cartList.invalid;
      list.forEach(function(val) {
        if (val.checked === true) {   //确认是选中的商品   将商品的id放到   id数组中
          id.push(val.id);
        }
      });
      if (id.length === 0) {//如果是0代表没有商品
        that.$dialog.toast({ mes: "请选择产品" });
        return;
      }
      //发送删除的请求   把握选中的商品传过去
      postCartDel(id).then(function() {
        list.forEach(function(val, i) {
          if (val.checked === false || val.checked === undefined)
            valid.push(list[i]);
        });
        that.$set(that.cartList, "valid", valid);  //因为有删除的商品了  所以呢  需要重新给获取的商品复制  

        that.carnum();      //商品数量   
        that.countMoney();   //商品价格
        that.gainCount();  //重新获取数量
      });
    },
    // //获取数量
    gainCount: function() {
      let that = this;
      getCartCount().then(res => {
        that.count = res.data.count;
      });
    },
    //立即下单；
    placeOrder: function() {
      let that = this,
        list = that.cartList.valid,
        id = [];
      list.forEach(function(val) {
        if (val.checked === true) {
          id.push(val.id);
        }
      });
      if (id.length === 0) {
        that.$dialog.toast({ mes: "请选择产品" });
        return;
      }
      this.$router.push({ path: "/order/submit/" + id });
    },
    
    //加
    plus: function(index) {
      let that = this;
      let list = that.cartList.valid[index]; //具体加那个商品的索引
      list.cart_num++;   //让当前商品数量加加
      
      if (list.attrInfo) {
        if (list.cart_num >= list.attrInfo.stock) {  //如果加的数量大于库存数  可以将加的数量显示
          that.$set(list, "cart_num", list.attrInfo.stock);
        }
      } else {
        if (list.cart_num >= list.stock) {
          that.$set(list, "cart_num", list.stock);
        }
      }
      that.carnum();
      that.countMoney();
      that.syncCartNum(list);
    },
    //加减中间的数量
    specifiName(index) {
      let list = this.cartList.valid[index];
      this.index_num = index;
      this.carnum();
      this.countMoney();
      this.syncCartNum(list);
    },
    //加减中间的数量
    blurName(index) {
      let list = this.cartList.valid[index];
      if (list.cart_num < 1) {
        this.$set(list, "cart_num", 1);  //
      }
      this.carnum();
      this.countMoney();
      this.syncCartNum(list);
    },
    //减
    reduce: function(index) {
      let that = this;
      let list = that.cartList.valid[index];  //获取当前选中的商品
      list.cart_num--;  //数量减减
      if (list.cart_num < 1) {
        that.$set(list, "cart_num", 1);  //如果说数量已将减到小于1让他默认是1
      }
      that.carnum();
      that.countMoney();
      that.syncCartNum(list);
    },
    //重新获取数量
    syncCartNum(cart) {
      //cart 相当是形参   会有实参给他传值
      if (!cart.sync)
         //重新获取商品数量   防抖的方法  不停的加或者减就不停的发送请求  没加一次  第二次在加 时间间隔是500ms
        cart.sync = debounce(() => {
          //重新获取商品数量 
          changeCartNum(cart.id, Math.max(cart.cart_num, 1) || 1);
        }, 500);

      cart.sync();
    },
    //单选
    switchSelect: function(index) {
      let that = this,
        //赋值 商品的全部信息      获取到全部商品信息  通过索引再将商品信息赋值给单选  因为通过单选可以进行购买
        cart = that.cartList.valid[index];

      //判断全选的数组里面是否有单选的这个商品   如果有是true没有false
       i = this.checkedIds.indexOf(cart.id);  //  i ???

      //单选的选中还是没有选中
      cart.checked = !cart.checked;

      if (i !== -1) this.checkedIds.splice(i, 1);

      //商品的全部信息 中  判断是否选中商品  选中true  是true可以放到全选框中
      if (cart.checked) {
        this.checkedIds.push(cart.id);
      }

      //单选 中 选中的商品有几个
      let len = that.cartList.valid.length;

      let selectnum = [];
      for (let i = 0; i < len; i++) {
        if (that.cartList.valid[i].checked === true) {
          selectnum.push(true);
        }
      }

      that.isAllSelect = selectnum.length === len;

      that.$set(that, "cartList", that.cartList);
      that.$set(that, "isAllSelect", that.isAllSelect);

      //单选  选中的话  将商品id放到cookie中
      cookie.set(CHECKED_IDS, that.checkedIds);

      that.carnum();
      that.countMoney();
    },
    //全选
    allChecked: function() {
      let that = this;
      let selectAllStatus = that.isAllSelect;
      selectAllStatus = !selectAllStatus;    //没有点是  false  点之后是true
      let checkedIds = [];   //1  checkedIds
      for (let i = 0; i < array.length; i++) {
        array[i].checked = selectAllStatus;
        checked.push()
      }
      that.cartList.valid.forEach(cart => {
        cart.checked = selectAllStatus;     //每一个商品判断是否是选中状态
        if (selectAllStatus) checkedIds.push(cart.id);
      });
      that.$set(that, "cartList", that.cartList);
      that.$set(that, "isAllSelect", selectAllStatus);
      this.checkedIds = checkedIds;   //5.checkedIds
      cookie.set(CHECKED_IDS, checkedIds);   //2.  checkedIds  将商品的id放到cookie里
      that.carnum();
      that.countMoney();
    },
    //数量
    carnum: function() {
      let that = this;
      var carnum = 0;
      var array = that.cartList.valid; //选中的商品
      for (let i = 0; i < array.length; i++) {
        //选中的商品的数量
        if (array[i].checked === true) {
          //checked选中状态
          carnum += parseInt(array[i].cart_num);
        }
      }
      that.$set(that, "cartCount", carnum); //cartCount是定义的数量   cartnum是自己定义的
    },
    //总共价钱；
    countMoney: function() {
      let that = this;
      let carmoney = 0;
      let array = that.cartList.valid;
      for (let i = 0; i < array.length; i++) {
        if (array[i].checked === true) {
          carmoney = add(carmoney, mul(array[i].cart_num, array[i].truePrice));
          //add就是  carmoney+mul    第一次carmoney就是0    mul就是数量 × 价格
        }
      }
      that.countmoney = carmoney;
    }
  }
};
</script>
<style scoped>
.top-shop {
  width: 100%;
  height: 60px;
  background-color: rgb(153, 201, 245);
  line-height: 60px;
}
.top-title,
.top-delete {
  display: inline-block;
  width: 80px;
  height: 50px;
  text-align: center;
}
.top-title {
  color: #fff;
  font-size: 18px;
  margin-left: 145px;
}
.top-delete {
  float: right;
  font-size: 16px;
}

.ipt_num {
  width: 100%;
  display: block;
  line-height: 0.44rem;
  text-align: center;
}
.noCart {
  margin-top: 0 !important;
}
.goShopping {
  text-align: center;
  padding-top: 20px;
}
.goShopping span {
  display: inline-block;
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 18px;
  color: #888;
}
</style>
