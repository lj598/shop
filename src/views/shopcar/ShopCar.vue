<template>
  <div>
    <Navbar>
      <template v-slot:default>我的购物车</template>
    </Navbar>
    <div class="cart-box">
      <div class="cart-body">
        <van-checkbox-group ref="checkboxGroup">
          <van-swipe-cell :right-width="50" v-for="(item,index) in list" :key="index">
            <div class="goods-item">
              <van-checkbox name=""/>
              <div class="goods-img"><img v-lazy="" alt=""/></div>
              <div class="goods-desc">
                <div class="goods-title">
                  <span>{{item.goods.title}}</span>
                  <span>x{{item.goods.stock}}</span>
                </div>
                <div class="goods-btn">
                  <div class="price">
                    <small>￥</small>{{item.goods.price+'.00'}}</div>
                    <van-stepper integer :min="1" :max="item.goods.stock" :model-value="item.num" :name="item.id" @change="onChange" async-change/>
                </div>
              </div>
            </div>
            <template #right>
              <van-button
                square
                icon="delete"
                type="danger"
                class="delete-button"
              ></van-button>
            </template>
          </van-swipe-cell>
        </van-checkbox-group>
      </div>
      <van-submit-bar class="submit-all" :price="9999" button-text="结算">
        <van-checkbox>全选</van-checkbox>
      </van-submit-bar>
      <div class="empty" v-if="!list.length">
        <img src="../../assets/image/empty-car.png" alt="购物车空空如也">
        <div class="title">购物车空空如也{{list.length}}</div>
        <van-button round color="#42b983" type="primary" block @click="goTo">前往选购</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {getCard} from "@/network/shopcar";
import {onMounted, reactive, toRefs} from "vue";
import {Toast} from "vant";

export default {
  name: "ShopCar",
  setup(){
    const router = useRouter()
    const store = useStore()
    //数据模型，状态
    const state = reactive({
      list:[]
    })
    const init = async ()=>{//初始化购物车数据
      Toast.loading({message:'数据加载中',forbidClick:true})
      const res = await getCard('include=goods')
      state.list = res.data//将商品信息存入list中
      console.log(state.list.length);
      Toast.clear()
    }
    const onChange = (value,detail)=>{
      console.log(value);
      console.log(detail.name);
    }
    onMounted(()=>{
      init()
    })
    const goTo = ()=>{
      router.push('/')
    }
    return {
      ...toRefs(state),
      goTo,
      onChange,
    }
  },
  components: {
    Navbar
  }
}
</script>

<style scoped lang="less">

</style>
