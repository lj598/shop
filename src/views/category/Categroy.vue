<template>
  <div>
    <Navbar>
      <template v-slot:default>商品分类</template>
    </Navbar>
    <div id="main_box">
      <div class="ordertab">
        <van-tabs v-model:active="active" @click="tabClick">
          <van-tab title="销量"></van-tab>
          <van-tab title="价格"></van-tab>
          <van-tab title="评论"></van-tab>
        </van-tabs>
      </div>

      <div><!--    侧边栏菜单    -->
        <van-sidebar class="leftmenu" v-model="activeKey">
          <van-collapse v-model="activeName" accordion>
            <van-collapse-item :title="item.name" :name="item.name" v-for="(item,index) in categories" :key="item.id">
              <van-sidebar-item v-for="sub in item.children" :title="sub.name" :key="sub.id" @click="getGoods(sub.id)"></van-sidebar-item>
            </van-collapse-item>
          </van-collapse>
        </van-sidebar>
      </div>
      <div class="goodslist">
        <div class="content">
          <van-card
            v-for="item in showGoods"
            :key="item.id"
            :num="item.comments_count"
            :tag="item.comments_count>=0?'流行':'标签'"
            :price="item.price"
            :desc="item.updated_at"
            :title="item.title"
            :thumb="item.cover_url"
            origin-price="10.00"
            lazy-load="true"
            @click.prevent="LogDetail(item.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar";
import Detail from "@/views/detail/Detail";
import {getCategory, getCategoryGoods} from "@/network/category";
import {ref, reactive, onMounted, computed, watchEffect, nextTick} from 'vue';
import router from "@/router";
export default {
  name: "Categroy",
  setup() {
    let activeKey = ref(0);
    let activeName = ref(1);
    let categories = ref([]);
    let currentOrder = ref('sales');
    let currentCid = ref(0);

    const goods = reactive({//制作一个数据模型，用于存储按条件加载过来的数据
      sales: {page: 1, list: []},
      price: {page: 1, list: []},
      comments_count: {page: 1, list: []},
    });

    //制作计算属性，返回加载的数据
    const showGoods = computed(()=>{
      return goods[currentOrder.value].list;
    })
    const init = ()=>{//初始化数据
      getCategoryGoods('sales',currentCid.value).then((res)=>{
        console.log('sales',res.goods.data);
        goods.sales.list = res.goods.data;
      })
      getCategoryGoods('price',currentCid.value).then((res)=>{
        console.log('price',res.goods.data);
        goods.price.list = res.goods.data;
      })
      getCategoryGoods('comments_count',currentCid.value).then((res)=>{
        console.log('comments_count',res.goods.data);
        goods.comments_count.list = res.goods.data;
      })
    }
    const tabClick = (index)=>{//排序选项卡
      let order = ['sales','price','comments_count']
      currentOrder.value = order[index];
      console.log('当前分类id',currentCid.value);
      console.log('当前排序序号',currentOrder.value)//-->sales
    }
    onMounted(()=>{//页面加载完后调用
      getCategory().then(res=>{
        categories.value = res.categories;
        console.log("getCategory",categories.value)
      })

      init();//调用函数加载分类数据
    })
    const getGoods = (cid)=>{//通过分类选择商品
      currentCid.value = cid;
      init();
      console.log(currentCid.value);
    }

    const LogDetail = (id)=>{//点击图片跳转购买
        router.push({
        path:'/detail',
        query:{id},//根据id接收
      })
    }

    return {
      activeKey,
      activeName,
      categories,
      currentOrder,
      goods,
      showGoods,
      LogDetail,
      tabClick,
      getGoods,
    }
  },
  components: {
    Detail,
    Navbar,
  }
}
</script>

<style scoped lang="less">
  #main_box {
    display: flex;
    .ordertab {
      flex: 1;
      float: right;
      //background-color: #666666;
      width: 100%;
      height: 60px;
      z-index: 6;
      position: fixed;
      top: 45px;
      right: 0;
      //left: 130px;
    }
    .leftmenu {
      position: fixed;
      top: 95px;
      left: 0;
      //background-color: #42b983;
      width: 100px;
      //height: 400px;
    }
    .goodslist {
      flex: 1;
      position: absolute;
      top: 100px;
      //left: 130px;
      //z-index: -1;
      right: 0;
      height: 100vh;
      //padding: 10px;
      text-align: left;
    }
  }
</style>
