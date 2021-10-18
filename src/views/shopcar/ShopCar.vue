<template>
  <div>
    <Navbar>
      <template v-slot:default>我的购物车</template>
    </Navbar>
    <div class="cart-box">
      <div class="cart-body">
        <van-checkbox-group ref="checkboxGroup" @change="groupChange" v-model="result">
          <van-swipe-cell :right-width="50" v-for="(item,index) in list" :key="index">
            <div class="goods-item">
              <van-checkbox :name="item.id"/>
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
import {checkCard, getCard, modifyCard} from "@/network/shopcar";
import {onMounted, reactive, toRefs} from "vue";
import {Toast} from "vant";

export default {
  name: "ShopCar",
  setup(){
    const router = useRouter()
    const store = useStore()
    //数据模型，状态
    const state = reactive({
      list:[],
      result:[]//存放购物车id
    })
    const init = async ()=>{//初始化购物车数据
      Toast.loading({message:'数据加载中',forbidClick:true})
      const res = await getCard('include=goods')
      state.list = res.data//将商品信息存入list中
      state.result = res.data.filter((n)=>{n.is_checked==1}).map(item=>item.id)
      // console.log(state.result)
      console.log(state.list.length);
      Toast.clear()
    }
    const onChange = async (value,detail)=>{
      Toast.loading({message:'修改中...',forbidClick:true})
     await modifyCard(detail.name,{num:value})
       state.list.forEach(item=>{//后端被修改的同事，前端同事也要修改显示数量
         if(item.id == detail.name){
           item.num = value
         }
       })//同步修改前端数组
      await Toast.clear()
    }
    const groupChange = (result)=>{
      console.log(result)
      state.result = result
      checkCard({cart_ids:result})
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
      groupChange,
    }
  },
  components: {
    Navbar
  }
}
</script>

<style scoped lang="less">

</style>
