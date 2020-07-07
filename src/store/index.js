import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'',
    history_list: [],
    show: true,
    XiangPagepriceNum:{},
    getAddress:''
  },
  mutations: {
    changeXiangppriceNum(state, key, val){
      state.XiangPagepriceNum.key = val
    },
    changeToken(state,val){
      console.log(val)
      state.token = val
    },
    changeHistoryList(state, val){
      state.history_list.push(val)
    },
    changeShow(state,val){
      state.show = val
    },
    changeGetAddress(state,val){
      state.getAddress = val
    }
  },
  actions: {
  },
  modules: {
  }
})
