<template>
<div class="nav-bar">
  <div class="left" @click="GoBack">
    <slot name="left">
      <img src="~assets/image/left.png" alt="">
    </slot>
  </div>
  <div class="center">
    <slot>图书兄弟</slot>
  </div>
  <div class="right">
    <slot name="right">
      <img src="~assets/image/more.png" alt="">
    </slot>
  </div>
</div>
</template>

<script>
import {useRouter} from 'vue-router'
export default {
  name: "Navbar",
  setup() {
    const router = useRouter();
    const GoBack = ()=>{
      router.go(-1);//使用历史模式，回退上一页
    }
    return {
      GoBack
    }
  }
}
</script>

<style scoped lang="less">
  .nav-bar {
    background: var(--color-tint);
    color: #fff;
    //置顶
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 3;
    height: 45px;
    line-height: 45px;
    //左中右布局
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-shadow: 0 3px rgba(100,100,100,.1);
    .left,.right {
      width: 60px;
      padding: 1vh;
    }
    .center {
      flex: 1;
    }
  }
</style>
