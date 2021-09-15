import {getCard} from "@/network/shopcar";

const actions = {
  async updateCart(context){
    const res = await getCard()
    context.commit('addCart',{count:res.data.length||0});//购物车的长度(是否有商品)
  }
}
export default actions
