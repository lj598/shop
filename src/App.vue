<template>
<!--考虑到前后端服务器的资源开销问题，由于每切换一次页面会重加载一次页面与数据，这里使用keep-alive保存页面数据，实现一次加载重复使用-->
<!--  <router-view v-slot="{Component}">-->
<!--    <transition>-->
<!--      <keep-alive>-->
<!--        <component :is="Component"></component>-->
<!--      </keep-alive>-->
<!--    </transition>-->
<!--  </router-view>-->
<!-- 在调试期间暂不启用keep-alive -->
  <router-view></router-view>
<!--项目完成后再开启-->
  <div id="nav">
    <div class="tab-bar-item">
      <router-link to="/">
        <div class="icon">
          <i class="iconfont icon-shouye"></i>
        </div>
        <div>首页</div>
      </router-link>
    </div>
    <div class="tab-bar-item">
      <router-link to="/categroy">
        <div class="icon">
          <i class="iconfont icon-leimupinleifenleleibie"></i>
        </div>
        <div>分类</div>
      </router-link>
    </div>
    <div class="tab-bar-item">

      <router-link to="/shopcar">
        <div class="icon">
          <van-badge :content="$store.state.cartCount" max="9">
            <i class="iconfont icon-gouwuche"></i>
          </van-badge>
        </div>
        <div>购物车</div>
      </router-link>
    </div>
    <div class="tab-bar-item">
      <router-link to="/profile">
        <div class="icon">
          <i class="iconfont icon-wode"></i>
        </div>
        <div>我的</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import {onBeforeMount} from "vue";
import {useStore} from "vuex";

export default {
  name:'App',
  components:{

  },
  setup(){
    const store = useStore()
    onBeforeMount(async ()=>{
      await store.dispatch('updateCart')

    })
  }
}
</script>
<style lang="less">
@import "assets/css/base.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 10px;
  background: #f6f6f6;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  //固定至底部
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -3px 1px rgba(100,100,100,0.1);

  .tab-bar-item {
    font-size: var(--font-size);
    .icon {
      display: inline-block;
      width: 24px;
      height: 24px;
      margin-top: 3px;
      vertical-align: middle;
    }
  }
  a {
    color: var(--color-text);

    &.router-link-exact-active {
      //被选中的颜色
      color: var(--color-height-text);
    }
  }
}
</style>
