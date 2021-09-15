<template>
  <div>
    <Navbar>
<!--title-->
      <template v-slot:default>商品详情:{{id}}</template>
    </Navbar>

    <van-image
      class="image"
      width="100%"
      lazy-load
      :src="detail.cover_url"
    />
    <van-card
      style="text-align: left"
      :num="detail.stock"
      :price="detail.price+'.00'"
      :desc="detail.description"
      :title="detail.title"
    >
      <template #tags>
        <van-tag plain type="danger">{{detail.is_on?"上架":"不上架"}}</van-tag>
        <van-tag plain type="danger">{{detail.is_recommend?"不推荐":"推荐"}}</van-tag>
      </template>
      <template #footer>
        <div class="card-footer" style="text-align: center">
          <van-row justify="space-around">
            <van-col span="6"><van-icon name="like-o"/>推荐</van-col>
            <van-col span="6"><van-icon name="friends-o"/>帮我选</van-col>
            <van-col span="6"><van-icon name="share-o"/>分享</van-col>
          </van-row>
          <div class="goods-choose">
            <van-button type="warning" @click="handleAddCard">加入购物车</van-button>
            <van-button type="danger" @click="goToCard">立即购买</van-button>
          </div>
        </div>
      </template>
    </van-card>
<!--下面放概述，热评等-->
    <van-tabs v-model:active="active">
      <van-tab title="概述">
<!-- 在这里有部分内容以富文本方式加载，此时需要加载富文本内容需要添加v-html -->
        <div class="content" v-html="detail.details">

        </div>
      </van-tab>

      <van-tab title="热评">
        <div class="comments" v-for="item in detail.comments">
          <div class="comments-user" >
            <van-image
              round
              width="2.5rem"
              height="2.5rem"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
          </div>
          <div class="comments-user-message">
            <div class="message-top">
              {{item.user.name}}
            </div>
            <div class="message-footer">
              {{item.updated_at}}&nbsp&nbsp&nbsp书本名称:{{detail.title}}
            </div>
          </div>
          <div class="user-comments">
            {{item.content}}
          </div>
          <div class="user-comments-image">
            <div>
              <van-image class="comments-img" width="130" height="130" fit="cover" lazy-load :src="item.user.avatar_url"/>
            </div>
            <div>
              <van-image class="comments-img" width="130" height="130" fit="cover" lazy-load :src="item.user.avatar_url"/>
            </div>
            <div>
              <van-image class="comments-img" width="130" height="130" fit="cover" lazy-load :src="item.user.avatar_url"/>
            </div>
            <div>
              <van-image class="comments-img" width="130" height="130" fit="cover" lazy-load :src="item.user.avatar_url"/>
            </div>
            <div>
              <van-image class="comments-img" width="130" height="130" fit="cover" lazy-load :src="item.user.avatar_url"/>
            </div>
            <div>
              <van-image class="comments-img" width="130" height="130" fit="cover" lazy-load :src="item.user.avatar_url"/>
            </div>
            <div>
              <van-image class="comments-img" width="130" height="130" fit="cover" lazy-load :src="item.user.avatar_url"/>
            </div>
            <div>
              <van-image class="comments-img" width="130" height="130" fit="cover" lazy-load :src="item.user.avatar_url"/>
            </div>
            <div>
              <van-image class="comments-img" width="130" height="130" fit="cover" lazy-load :src="item.user.avatar_url"/>
            </div>
          </div>
          <div style="color: #888888; text-align: right;padding-top: 5px; padding-right: 35px">
            <van-icon name="star-o"/>&nbsp{{item.star}}
          </div>
        </div>
      </van-tab>
      <van-tab title="相关图书">
        <goods-list :goods="like_goods"/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar";
import {useRoute, useRouter} from 'vue-router';
import {onMounted, reactive, ref,toRefs} from 'vue';
import {getDetail} from "@/network/detail";
import GoodsList from "@/components/content/goods/GoodsList";
import {addCard} from "@/network/shopcar";
import {Toast} from "vant";
import {useStore} from 'vuex'

export default {
  name: "Detail",
  components: {
    GoodsList,
    Navbar
  },
  setup(){
    const route = useRoute();
    const router = useRouter();
    const id = ref(0);
    const active = ref(0)
    const store = useStore();
    const book = reactive({
      detail:{},//商品信息
      like_goods:[],//类似信息
      // comments:[]//评论
    })
    onMounted(async ()=>{
      id.value = route.query.id;

      let res = await getDetail(id.value)
      book.detail = res.goods;
      book.like_goods = res.like_goods;
      console.log("书本描述",book.detail)
      console.log("相似书籍",book.like_goods)
      console.log("书本评论",book.detail.comments)
    })
    const handleAddCard = async ()=>{
      const res = await addCard({
        goods_id:book.detail.id,//商品id
        num:1,//默认添加1个，点一次加一次
      })
      if(res.status=='201'||res.status=='204'){
        Toast.success('添加成功')
        await store.dispatch('updateCart')//通过dispatch分发方式调用updateCart方法，
      }
    }
    const goToCard = async ()=>{
      const res = await addCard({
        goods_id:book.detail.id,//商品id
        num:1,//默认添加1个，点一次加一次
      })
      if(res.status=='201'||res.status=='204'){
        Toast.success('添加成功,即将跳转购物车')
        await store.dispatch('updateCart')
        await router.push('/shopcar')
      }
    }

    return {
      id,
      active,
      handleAddCard,
      goToCard,
      ...toRefs(book),//对book响应式对象的解构
    }
  }
}
</script>

<style scoped lang="less">
  .image {
    margin-top: 50px;
  }
  .content {
    padding: 10px;
    img {
      max-width: 100%;
      height: auto;
    }
  }
  .card-footer {
    line-height: 22px;
    .goods-choose {
      margin-top: 10px;
      text-align: right;
    }
  }
  .comments {
    .comments-user{
      display: inline-block;
      float: left;
      width: 12%;
      height: 50px;
      padding: 5px 5px;
      text-align: left;
    }
    .comments-user-message {
      //margin-bottom: 10px;
      display: inline-block;
      float: right;
      width: 88%;
      height: 50px;
      .message-top {
        width: 100%;
        height: 60%;
        color: #666666;
        //background-color: #42bbaa;
        text-align: left;
        padding: 7px 7px;
      }
      .message-footer {
        width: 100%;
        height: 40%;
        color: #888888;
        text-align: left;
        font-size: 10px;
        padding: 4px 4px;
        //background-color: #42b983;
      }
    }
    .user-comments {
      color: #666666;
      margin-top: 10px;
      text-align: left;
      padding: 5px 5px 0 10px;
    }
    .user-comments-image {
      background-color: #42b983;
      margin-top: 5px;
      margin-left: 8px;
      width: 96%;
      display: grid;
      grid-template-rows: 70px 70px 70px;
      grid-template-columns: 132px 132px 132px;
    }
  }

</style>
