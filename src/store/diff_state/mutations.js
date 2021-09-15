const mutations = {
  setIsLogin(state,payload){
    state.user.isLogin = payload
  },
  addCart(state,payload){//状态管理方法，由它控制购物车商品的显示数量
    state.cartCount = payload.count
  }
}
export default mutations;
