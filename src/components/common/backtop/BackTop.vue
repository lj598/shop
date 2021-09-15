<template>
  <div class="backTop" @click="backTop">
  </div>
</template>

<script>
export default {
  name: "BackTop",
  setup(prop,{emit}) {
    return {
      backTop:()=>{
        emit('bTop');//调用父组件传入的方法bTop
      }
    }
  }
}
</script>

<style scoped lang="less">
  .backTop {
    width: 46px;
    height: 49px;
    position: fixed;//位置设置为固定的页面位置
    bottom: 100px;
    right: 40px;
    box-shadow: 3px 3px 2px #888888;
    border-radius: 50%;
    background: #fcfcfc url("~assets/image/Up.svg") no-repeat center center;
    //transform: translateX(-25%);
    //transition: all .5s ease-in-out;
  }
</style>
