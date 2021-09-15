<template>
  <div>
    <Navbar>
      <template v-slot:default>用户登录</template>
    </Navbar>
    <div style="margin-top: 50px">
      <div style="text-align: center;padding-top: 50px">
        <van-image
          width="10rem"
          height="10rem"
          fit="contain"
          lazy-load
          src="http://www.zanboon.com/Public/Home/default/images/logo.png"
        />
        <van-form @submit="onSubmit"><!--此处调用onSubmit-->
          <van-cell-group inset>
            <van-field
              v-model="email"
              name="邮箱"
              label="邮箱"
              placeholder="请输入邮箱"
              :rules="[{ required: true, message: '请填写邮箱' }]"
            />
            <van-field
              v-model="password"
              type="password"
              name="密码"
              label="密码"
              placeholder="请输入密码"
              :rules="[{ required: true, message: '请填写密码' }]"
            />
          </van-cell-group>
          <div style="margin: 16px;">
            <div class="link-login" @click="$router.push({path:'/register'})">
              没有账号，立即注册
            </div>
            <van-button color="#42b983" round block type="primary" native-type="submit">
              登录
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar";
import {reactive,toRefs} from "vue";
import {login} from "@/network/user";
import {Notify, Toast} from "vant";
import {useRouter} from 'vue-router';
import {useStore} from 'vuex'

export default {
  name: "Login",
  components:{
    Navbar,
  },
  setup(){
    const user_info = reactive({
      email:"",
      password:"",
    })
    const router = useRouter()
    const store = useStore()//使用vuex的useStore做状态管理
    const onSubmit = async ()=>{//提交事件
      const res = await login(user_info)
      //防止出现因token丢失反复登陆的情况，需要将token保存在本地(window.localStorage)通过setItem(key,value)以及getItem(key)设置值获取值
      window.localStorage.setItem('token',res.access_token)//保存token
      store.commit('setItLogin',true)
      Toast.success('登录成功！')
      user_info.email = ''
      user_info.password = ''
      setTimeout(()=>{
        // router.go(-1)//0.5秒后跳转到登录前的页面
        router.push('/')//直接跳首页
        console.log(window.localStorage.getItem('token'))
      },500)
    }
    return{
      ...toRefs(user_info),//将对象解包返回，template可以直接解读对象中的属性
      onSubmit,
    }
  }
}
</script>

<style scoped lang="less">
  .link-login {
    display: inline-block;
    font-size: 14px;
    margin-bottom: 15px;
    float: left;
    padding-left: 15px;
    color: #42b983;
  }
</style>
