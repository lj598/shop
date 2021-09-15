<template>
  <div>
    <Navbar>
      <template v-slot:default>个人信息</template>
    </Navbar>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>
      <van-button round block color="#44ba8b" @click="Logout">退出</van-button>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar";
import {logout} from "@/network/user";
import {Toast} from "vant";
import {useRouter} from 'vue-router';
import {useStore} from 'vuex'
export default {
  name: "Profile",
  components: {
    Navbar
  },
  setup(){
    const store = useStore()
    const router = useRouter()
    const Logout = async ()=>{
     const res =await logout()
      console.log("状态码",res.response.status);
      if(res.status=='204'){
        window.localStorage.setItem('token','')
        store.commit('setIsLogin',false)//在vuex中也清除登录信息
        Toast.success('退出成功！')
        setTimeout(()=>{
          router.push('/login')
        },500)
      }
    }
    return {
      Logout,
    }
  }
}
</script>

<style scoped>

</style>
