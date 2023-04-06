import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'

//引入二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

export default [
    {
        path: '/center',
        component: Center,
        children: [
          {
            // path: '/center/myorder',
            path: 'myorder',
            component: MyOrder,
          },
          {
            path: 'grouporder',
            component: GroupOrder,
          },
             /* 重定向 */
          {
            path: '',
            redirect: 'myorder'
          }
        ]
      },
    
    {
        path: '/paysuccess',
        component: PaySuccess,
        /* 只有从支付界面, 才能跳转到支付成功的界面 */
        beforeEnter (to, from, next) {
          if (from.path==='/pay') {
            next()
          } else {
            next('/pay')
          }
        }
      },
    {
        path: '/pay',
        component: Pay,
    
        // 将query参数映射成props传递给路由组件
        props: route => ({orderId: route.query.orderId}),
    
        /* 只能从交易界面, 才能跳转到支付界面 */
        beforeEnter (to, from, next) {
          if (from.path==='/trade') {
            next()
          } else {
            next('/trade')
          }
        }
      },
    {
        path: '/trade',
        component: Trade,
        /* 只能从购物车界面, 才能跳转到交易界面 */
        beforeEnter (to, from, next) {
          if (from.path==='/shopcart') {
            next()
          } else {
            next('/shopcart')
          }
        }
    },
    {
        /* 占位符 */
        path: '/shopcart',  
        component:ShopCart
    },
    {
        /* 占位符 */
        path: "/addcartsuccess",  
        name:'addcartsuccess',
        component: AddCartSuccess,
        meta:{isShow:true}
    },
    {
        /* 占位符 */
        path: "/detail/:skuid",  
        component: Detail,
        meta:{isShow:true}
    },
    {
    path: "/home",  //此处的路径是切换路由组件时网址显示的路径
    component: Home,
    meta:{show:true},
},
{
    path: "/search/:keyword?",
    component: Search,
    meta: { show: true },
    name: "search",
    props: ($route) => {
        return { keyword: $route.params.keyword, k: $route.query.k };
    }
},
{
    path: "/login",
    component: Login,
    meta:{show:false},
},
{
    path: "/register",
    component: Register,
    meta:{show:false},
},
{
    path: '*',
    redirect:'/home'
},
]