import { createApp } from 'vue';
import vuex from 'vuex';
import App from './App.vue';
import router from './router';
import store from './store';
import {Lazyload} from 'vant';
import 'vant/lib/index.css';

import Vant from 'vant';

const create = createApp(App);
create.use(store);
create.use(Vant);
create.use(router);
create.use(Lazyload,{
    loading: require('./assets/image/default.svg'),//懒加载的自定义图片
});
// create.use(Log);
create.mount('#app');
