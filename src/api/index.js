import axios from '@/api/axios.js'

// 请求的是菜单列表
export function navScroll() {
    return axios.get("/index");
}

/**
 * 首页
 * @returns {*}
 */
export function getHomeData() {
    return axios.get("index");
}

// 登录
export function login(option = {}) {
    return axios.post('/login', option).then(data => {
        return data
    })
}
// 注册
export function register(option = {}) {
    return axios.post('/register', option).then(data => {
        return data
    })
}
// 退出
export function loginOut(option = {}) {
    return axios.get('/logout', option).then(data => {
        return data
    })
}


/*
 * 个人中心
 * */
export function getUser() {
    return axios.get("/user");
}

/*
 * 个人中心(功能列表)
 * */
export function getMenuUser() {
    return axios.get("/menu/user")
}


/*
 * 购物车 获取数量
 * */
export function getCartCount(data) {
    return axios.get("/cart/count", data);
}



/*详情页
 * 购物车 添加
 * */
export function postCartAdd(data) {

    return axios.post("/cart/add", data, {

        headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
        }
    });
    // return  axios.post({
    //     url:"/cart/add",

    //     headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    // }).then(res=>{
    //     console.log(res)
    // })

}


/*
 * 购物车列表
 * */

export function getCartList() {
    return axios.get("/cart/list", {
    }).then(res => {
        console.log(res)
        return res
    });

}


/*
 * 商品列表
 * */
export function getProducts(q) {
    return axios.get("/products", q);
}


/*
 * 搜索推荐关键字
 */
export function getSearchKeyword() {
    return axios.get("/search/keyword", {})
}

/*
  首页产品的轮播图
 获取产品类型 1 精品推荐 2 热门榜单 3首发新品 4促销单品
*/
export function getGoodScroll() {
    return axios.get("/groom/list/2")
}



/*
商品详情
*/
export function getProductDetail(id) {
    return axios.get('/product/detail/' + id).then(res => {

        return res
    })
}

/**
 * 通过购物车 id 获取订单信息
 * @param cartId
 * @returns {*}
 */
export function postOrderConfirm(cartId) {
    var data = new URLSearchParams();
    data.append("cartId", cartId);
    // console.log("135获取订单=>",cartId)
    return axios.post("/order/confirm", data, {
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
        }
    });
}


/**
* 计算订单金额
* @param key
* @param data
* @returns {*}
*/
export function postOrderComputed(key, data) {
    return axios.post("/order/computed/" + key, data);
}

/**
* 生成订单
* @param key
* @param data
* @returns {*}
*/
export function createOrder(key, data) {

    return axios.post("/order/create/" + key, data || {}, {
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
        }
    });
}

/**
* 微信支付
*/
// export function getWeiXinPay() {
//     return axios.get('https://api.weixin.qq.com/sns/oauth2/access_token').then(res => {

//     })
// }

/**
 * 验证码key
 */
export function getCodeApi() {
    return axios.get("verify_code");
}


/*
* 发送验证码
*/
export function sendCode(obj) {
    return axios.post('/register/verify', obj).then(res => {
        return res
    })
}

/**
 * 产品评价数量和好评度
 */
export function getReplyConfig(id) {
    return axios.get("/reply/config/" + id, {});
}

/**
* 产品评论列表
*/
export function getReplyList(id, q) {
    return axios.get("/reply/list/" + id, q);
}

/**
 * 订单统计数据
 * @returns {*}
 */
export function getOrderData() {
    return axios.get("/order/data");
}

/**
* 订单列表
* @returns {*}
*/
export function getOrderList(data) {
    return axios.get("/order/list", data, {
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
        }
    });
}

/*
 * 设置默认地址
 * */
export function getAddressDefaultSet(id) {
    return axios.post("/address/default/set", { id: id });
  }
  
  /*
   * 获取默认地址
   * */
  export function getAddressDefault() {
    return axios.get("/address/default");
  }