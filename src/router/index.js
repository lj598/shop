import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import {Notify, Toast} from "vant";
// import Home from '../views/Home.vue'
const Home = ()=> import('../views/home/Home');
const Categroy = ()=> import('../views/category/Categroy');
const Detail = ()=> import('../views/detail/Detail');
const Profile = ()=> import('../views/profile/Profile');
const ShopCar = ()=> import('../views/shopcar/ShopCar');
const Register = ()=> import('../views/profile/Register');
const Login = ()=> import('../views/profile/Login');

const routes = [
  {
    path: '/',
    name: 'DefaultHome',
    component: Home,
    meta: {
      title:'图书兄弟'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title:'图书兄弟'
    }
  },
  {
    path: '/categroy',
    name: 'Categroy',
    component:Categroy,
    meta: {
      title:'图书兄弟-商品分类'
    }
  },
  {
    path: '/detail',
    name: 'Detail',
    component:Detail,
    meta: {
      title:'图书兄弟-详情'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component:Profile,
    meta: {
      title:'图书兄弟-个人中心',
      isAuthRequired:true,
    }
  },
  {
    path: '/register',
    name: 'Register',
    component:Register,
    meta: {
      title:'图书兄弟-用户注册'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component:Login,
    meta: {
      title:'图书兄弟-用户登录'
    }
  },
  {
    path: '/shopcar',
    name: 'ShopCar',
    component:ShopCar,
    meta: {
      title:'图书兄弟-购物车',
      isAuthRequired: true,
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,from,next)=>{
  if(to.meta.isAuthRequired && store.state.user.isLogin === false){//如果被访问的页面需要用户认证且登录状态为false时
    Toast.fail('请登录')  //如果没有登录,在这里跳转
    return next('/login');//跳转至login
  }else {
    next();
  }
  document.title = to.meta.title;
})
export default router
