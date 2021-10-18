import axios from 'axios';
import {Notify, Toast} from "vant";
import router from "@/router";
export function request(config) {
    const instance = axios.create({
        baseURL:'https://api.shop.eduwork.cn',
        timeout:5000
    })
    //请求拦截
    instance.interceptors.request.use(config=>{
      //如果有些接口需要认证访问,在此统一设置
      const token = window.localStorage.getItem('token')
      if(token){
        config.headers.Authorization = 'Bearer'+token
      }
      return config;//此时是直接放行
    }, error => {
      //如果请求接口时没有登录，则跳转至登录界面
    })
    //响应拦截
    instance.interceptors.response.use(res=>{
        return res.data ? res.data : res;
    },error => {
        //需要授权才可以访问的接口，直接去login授权

      //如果存在错误，则处理
      onerror = error.response.data.errors;
      // console.log(onerror[Object.keys(onerror)[0]]);
      if(error.response.status=="401"){
        Toast.fail('请登录')
        router.push('/login')
      }
      const err = onerror[Object.keys(onerror)[0]][0]
      if(err){
        console.log(err);
        Notify(err)
      }
    })
    return instance(config);
}
