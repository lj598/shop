<template>
  <div class="goods">
    <GoodsItem v-for="item in goods" :product="item" :key="item.id" @click.prevent="LogDetail(item.id)"></GoodsItem>
  </div>
</template>

<script>
import GoodsItem from "@/components/content/goods/GoodsItem";
import router from "@/router";
export default {
  name: "GoodsList",
  components: {
    GoodsItem,
  },
  setup(){
    const LogDetail = (id)=>{//点击图片跳转购买
      router.push({
        path:'/detail',
        query:{id},//根据id接收
      })
    }
    return {
      LogDetail,
    }
  },
  props: {
    goods:{
      type:Array,
      default(){
        return [];
      }
    }
  },
}
</script>

<style scoped lang="less">
  .goods {
    display: flex;
    //flex-direction: row;
    flex-wrap: wrap;//自动换行
    justify-content: space-around;
    padding: 10px;
  }
</style>
