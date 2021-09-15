import { createStore } from 'vuex'

import mutations from '../store/diff_state/mutations'
import actions from '../store/diff_state/actions'
import getters from '../store/diff_state/getters'
const state = {
  user:{
    isLogin:window.localStorage.getItem('token')?true:false,//根据token是否存在来设置登录状态
  },
  cartCount:0
}
export default createStore({
  state:state,
  mutations: mutations,
  actions: actions,
  getters: getters,
  // modules: {
  // }
  //将多个状态拆分为子文件
})
