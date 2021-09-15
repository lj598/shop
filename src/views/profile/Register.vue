<template>
  <div>
    <Navbar>
      <template v-slot:default>新用户注册</template>
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
              v-model="name"
              name="用户名"
              label="用户名"
              placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
              v-model="password"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
            />
            <van-field
              v-model="password_confirmation"
              type="password"
              name="确认密码"
              label="确认密码"
              placeholder="再次输入密码"
              :rules="[{ required: true, message: '请填一致的密码' }]"
            />
            <van-field
              v-model="email"
              name="电子邮箱"
              label="电子邮箱"
              placeholder="请输入正确的电子邮箱"
              :rules="[{ required: true, message: '请填写正确的电子邮箱' }]"
            />
          </van-cell-group>
          <div style="margin: 16px;">
            <div class="link-login" @click="$router.push({path:'/login'})">
              已有账号，立即登录
            </div>
            <van-button color="#42b983" round block type="primary" native-type="submit">
              提交
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
import {register} from "@/network/user";
import {Notify, Toast} from "vant";
import {useRouter} from 'vue-router';

export default {
  name: "Register",
  components:{
    Navbar,
  },
  setup(){
    const user_info = reactive({
      name:"",
      password:"",
      password_confirmation:"",
      email:""
    })
    const router = useRouter()
    const onSubmit = async ()=>{//提交事件
      console.log("##########")
      if(user_info.password!=user_info.password_confirmation){
        Notify('两次密码不一致!')
      }else {
       const res = await register(user_info)
        console.log(res);
       if(res.status=='201'){
         Toast.success('注册成功！')
         //注册成功，重定向到登录界面
         setTimeout(()=>{
          router.push({path:'/login'})
         },1000)
       }
       user_info.password_confirmation=''
       user_info.password=''//注册完成后，密码置空
      }

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
