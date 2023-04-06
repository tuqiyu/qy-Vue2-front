import Vue from 'vue'
import App from './App.vue'
import store from './store'
import '@/mock/mockServe'
import "swiper/css/swiper.css"
//三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import { Button,MessageBox} from 'element-ui';
Vue.component(Button.name,Button);
//ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
import * as API from '@/api';
//引入路由
import router from '@/router';
//测试
import { reqCateGoryList, reqGetSearchInfo } from '@/api';

//引入懒加载插件
import VueLazyload from 'vue-lazyload';
import atm from '@/assets/1.gif';
//注册插件
Vue.use(VueLazyload,{
  //懒加载默认的图片
  loading:atm
});
//引入表单校验插件
import "@/plugins/validate";

reqCateGoryList();
reqGetSearchInfo({})  //空对象能把params参数中所有的对象都找到

Vue.config.productionTip = false

new Vue({
      //全局事件总线$bus配置
  beforeCreate() {
    //此处的this就是这个new Vue()对象
    //网络有很多bus通信总结，原理相同，换汤不换药
        Vue.prototype.$bus = this
        Vue.prototype.$API = API;
  },
    render: h => h(App),
    //注册路由 KV一致省略V router小写
    router,
      //注册store,此时组件中都会拥有$store
    store
}).$mount('#app')
