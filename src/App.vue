<template>
    <div>
        <Header></Header>
        <router-view></router-view>
        <!-- 在Home、Search显示 登录注册时隐藏 -->
        <Footer v-show="$route.meta.show"></Footer>
    </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
    name: 'app',
    components: {
        Header,
        Footer
    },
    mounted() {
        //通知vuex发送请求，获取数据，存储于仓库中
        //组件身上才有$store属性
        this.$store.dispatch('categoryList')
    }
}
</script>

<style scoped></style>
