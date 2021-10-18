import {request} from "@/network/request";

export function getDetail(id){//获取详情信息
  return request({
    url:'api/goods/'+id,
  })
}
