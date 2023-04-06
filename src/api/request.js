import axios from "axios";
//引入进度条
import nprogress from 'nprogress';
//引入进度条样式
//在当前模块引入store
import store from '@/store'
import 'nprogress/nprogress.css';
//1、对axios二次封装
const requests = axios.create({
    //基础路径，requests发出的请求在端口号后面会跟改baseURl
    baseURL:'/api',
    timeout: 5000,
})
//请求拦截器----在项目中发请求（请求没有发出去）可以做一些事情
requests.interceptors.request.use((config) => {
    //现在的问题是config是什么?配置对象

    //可以让进度条开始动
    if(store.state.detail.uuid_token){
      //请求头添加一个字段(userTempId):和后台老师商量好了
      config.headers.userTempId = store.state.detail.uuid_token;
    }
    //需要携带token带给服务器
    if (store.state.user.token) {
        config.headers.token=store.state.user.token
    }

    nprogress.start();
    return config;
  });
//3、配置响应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调函数

    //响应成功，关闭进度条
    nprogress.done()
    return  res.data;
},(error) => {
    //失败的回调函数
    console.log("响应失败"+error)
    return Promise.reject(new Error('fail'))
})
//4、对外暴露
export default requests;