<template>
<!--推荐页视图-->
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommends.slice(0,4)" :key="item.id">
      <a href="#" @click.prevent="LogDetail(item.id)">
        <img v-lazy="item.cover_url" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
import {useRouter} from 'vue-router';
export default {
  name: "RecommendView",
  props:{
    recommends:{//接收Home传输的数据,
      type:Array,//以数组形式
      default() {
        return [];//默认情况下返回空数组,防止页面缺失数据报错
      },
    },
  },
  setup(){
    const router = useRouter();
    const LogDetail = (id)=>{//点击图片跳转购买
      router.push({
        path:'/detail',
        query:{id},//根据id接收
      })
    }
    return{
      LogDetail
    }
  }
}
</script>

<style scoped lang="less">
  .recommend {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 15px 0 30px;
    border-bottom: 8px solid #eee;
    font-size: 12px;
    .recommend-item {
      flex: 1;
      margin-top: 10px;
      img {
        width: 70px;
        height: 70px;
        margin-bottom: 10px;
      }
    }
  }
</style>
