// @ts-nocheck
<template>
  <div id="home">
    <Navbar>
      <template v-slot:default>图书商城</template>
    </Navbar>
    <TabControl v-show="isTabFixed" @tabClick="tabClick" :titles="['畅销','新书','精选']"><!--选项卡-->
    </TabControl>
<!--滚动条组件-->
    <div class="wrapper"><!--父容器-->
      <div class="content"><!--子容器,可变长度-->
        <div ref="banref">
          <HomeSwiper :banners="banners"></HomeSwiper>
          <RecommendView :recommends="recommends"><!--使用此方法传输数据-->
          </RecommendView>
        </div>
        <TabControl @tabClick="tabClick" :titles="['畅销','新书','精选']"><!--选项卡-->
        </TabControl>
        <GoodsList :goods="showGoods"></GoodsList>
      </div>
    </div>
    <BackTop v-show="isTabFixed" @bTop="bTop"></BackTop>
  </div>
</template>

<script>
// @ts-ignore
import Navbar from "@/components/common/navbar/Navbar";
// @ts-ignore
import HomeSwiper from "@/views/home/ChildComps/HomeSwiper";
// @ts-ignore
import RecommendView from "@/views/home/ChildComps/RecommendView";
// @ts-ignore
import TabControl from "@/components/content/tabControl/TabControl";
// @ts-ignore
import GoodsList from "@/components/content/goods/GoodsList";
// @ts-ignore
import BackTop from "@/components/common/backtop/BackTop";
// @ts-ignore
import {getHomeAllData,getHomeGoods} from "@/network/home";
import {onMounted, reactive, ref, computed,watchEffect,nextTick} from 'vue';
import BScroll from 'better-scroll';
export default {
name: "Home",
  // @ts-ignore
  setup() {
  let isTabFixed = ref(false);
  let banref = ref(null);
  let temid = ref(0);
  const recommends = ref([]);//可使用数组或者对象暂存后端数据
  // @ts-ignore
  const tabClick = (index)=>{//切换选项卡
    temid.value = index;
    let type = ['sales','new','recommend'];
    currectType.value = type[index];
    // console.log("当前类型"+currectType.value);
    nextTick(()=>{//切换选项卡以后也要重新计算高度，避免数据加载不出来
      // @ts-ignore
      bscroll && bscroll.refresh();
    })//由于数据变化后需要重新渲染，因此需要渲染完画面后执行，重新计算高度
  }
  //声明商品数据模型
  const goods = reactive({
    sales:{page:0,list:[]},
    new:{page: 0,list:[]},
    recommend:{page: 0,list:[]},
  });
  let currectType = ref('sales');
  const showGoods = computed(()=>{//显示数据，只拿取goods数据模型的一个到GoodsList组件内
    // @ts-ignore
    return goods[currectType.value].list;//取currentType的类型进行返回
  })
  let bscroll = reactive({});
  let banners = ref([]);
  onMounted(()=>{//生命周期函数
    console.log("TOKEN:",window.localStorage.getItem('token'));//可以根据token来判断是否登录状态
    // @ts-ignore
    getHomeAllData().then(res=>{
        // console.log(res.goods);
        recommends.value = res.goods.data;
        banners.value = res.slides;
        console.log(banners.value);
      });
      // @ts-ignore
      getHomeGoods('sales').then(res=>{
        goods.sales.list = res.goods.data;
      });
      // @ts-ignore
      getHomeGoods('recommend').then(res=>{
        goods.recommend.list = res.goods.data;
      });
      // @ts-ignore
      getHomeGoods('new').then(res=>{
        goods.new.list = res.goods.data;
      });
      //创建BScroll对象
      // @ts-ignore
      bscroll = new BScroll(document.querySelector('.wrapper'),{
        probeType:3,//值为1时，会非实时（屏幕滑动超过一定距离）派发scroll时间；2时屏幕滑动实时派发scroll；3时则滚动时派发
        // 且momentum滚动动画运行时也派发scroll事件
        click:true,//是否允许点击
        pullUpLoad:true,//允许上拉加载更多
      });//获取需要滚动的最外层盒子

      //触发滚动事件
      // @ts-ignore
      bscroll.on('scroll',(position)=>{//一直滚动一直触发事件
        // @ts-ignore
        isTabFixed.value = (-position.y) > banref.value.offsetHeight;//当滚动高度为盒子高度时，显示选项卡
      });
      //上划加载数据，触发pullingUp
      // @ts-ignore
      bscroll.on('pullingUp',()=>{
        // @ts-ignore
        const page = goods[currectType.value].page + 1;
        // @ts-ignore
        getHomeGoods(currectType.value,page).then(res=>{
          // @ts-ignore
          goods[currectType.value].list.push(...res.goods.data);//新获取的数据先解构再追加进原数组
          // @ts-ignore
          console.log("goods:",goods[currectType.value].list);
          // @ts-ignore
          goods[currectType.value].page += 1;
        })
        // @ts-ignore
        bscroll.finishPullUp();//上拉结束后将数据加载出来
        // console.log("当前类型："+currectType.value+"当前页"+page+"高度"+position.y);
        // @ts-ignore
        bscroll && bscroll.refresh();//重新计算高度
      });
    });
    //监听任何变量变化
    watchEffect(()=>{
      nextTick(()=>{
        // @ts-ignore
        bscroll && bscroll.refresh();
      })//由于数据变化后需要重新渲染，因此需要渲染完画面后执行，重新计算高度

    });
    const bTop = ()=>{
      // @ts-ignore
      bscroll.scrollTo(0,0,500);//直接滚动到指定位置
      //500毫秒内回到顶部
    };
    return {
      isTabFixed,
      banners,
      recommends,
      temid,
      goods,
      showGoods,
      banref,
      bTop,
      tabClick,
    }
  },
  components: {
  //使用的组件注册
    HomeSwiper,
    BackTop,
    TabControl,
    RecommendView,
    GoodsList,
    Navbar,
  },
}
</script>

<style scoped lang="less">
#home {
  height: 100vh;//占领整个屏幕的高度
  position: relative;
  .wrapper {
    position: absolute;
    top: 45px;//避免遮蔽标题栏
    bottom: 50px;//避免遮蔽菜单栏
    left: 0;
    right: 0;
    overflow: hidden;//超出部分隐藏，使页面无法使用浏览器自带滚动，目的是使用滚动插件BScroll
    .content {
      .banners {

      }
    }
  }
}


</style>
