<template>
<!--  <van-swipe v-if="banners.length" class="my-swipe" :autoplay="3000" indicator-color="white">-->
<!--    <van-swipe-item class="van-swipe-item" v-for="(item,index) in banners" :key="index">-->
<!--      <img :src="item.img_url" alt="">-->
<!--    </van-swipe-item>-->
<!--  </van-swipe>-->
  <van-swipe v-if="banners.length" class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item class="van-swipe-item" v-for="(item ,index) in banners" :key="index">
      <img v-lazy="item.img_url"/>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: "HomeSwiper",
  props: {
    banners: Array,
    default(){
      return [];
    }
  },
  data() {
    return {
      current:0,
    };
  },
  // methods: {
  //   onChange(index) {
  //     this.current = index;
  //   }
  // }
}
</script>

<style scoped lang="less">
 .my-swipe {
   .van-swipe-item {
     img {
       width: 100%;
       height: auto;
     }
   }
 }
</style>
