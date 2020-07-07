import axios from 'axios'
axios.defaults.baseURL = 'http://www.insideria.vip/api';
axios.defaults.headers.common["Authori-zation"] = "Bearer " + localStorage.getItem("token")
 

axios.interceptors.request.use(function (config) {
  config.headers["Authori-zation"] = "Bearer " + localStorage.getItem("token")
 
  config.params = {
    ...config.params,
    appkey: 'dongmeiqi_i_1545272862243'
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default axios
