import {request} from "@/network/request";
//添加至购物车
export function addCard(data){
  return request({
    url:'/api/carts',
    method:'post',
    data:data,
  })
}
//修改购物车
export function modifyCard(id,data){
  return request({
    url:`/api/carts/${id}`,
    method:'put',
    data:data,
  })
}
//选择商品状态
export function checkCard(data){
  return request({
    url:'/api/carts/checked',
    method:'patch',
    data:data,
  })
}
//获取购物车列表
export function getCard(data=''){
  return request({
    url:'/api/carts?'+data,
    method:'get',
  })
}
//删除购物车选项
export function deleteCardItem(id){
  return request({
    url:`/api/carts/${id}`,
    method:'delete',
  })
}
