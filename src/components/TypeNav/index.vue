<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <!-- 事件委派 -->
            <div @mouseleave="leaveShow" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 过度动画 -->
                <transition name="sort">
                    <div class="sort" v-show="show">
                        <div class="all-sort-list2" @click="goSearch">
                            <div
                                class="item"
                                v-for="(c1, index) in categoryList"
                                :key="c1.categoryId"
                                :class="{ cur: currentIndex == index }"
                            >
                                <h3 @mouseenter="changeIndex(index)">
                                    <a
                                        :data-categoryName="c1.categoryName"
                                        :data-categoryId="c1.categoryId"
                                        >{{ c1.categoryName }}</a
                                    >
                                </h3>
                                <!-- 二三级分类 -->
                                <div
                                    class="item-list clearfix"
                                    :style="{
                                        display:
                                            currentIndex == index
                                                ? 'block'
                                                : 'none'
                                    }"
                                >
                                    <div
                                        class="subitem"
                                        v-for="c2 in c1.categoryChild"
                                        :key="c2.categoryId"
                                    >
                                        <dl class="fore">
                                            <dt>
                                                <a
                                                    :data-categoryName="
                                                        c2.categoryName
                                                    "
                                                    :data-categoryId="
                                                        c2.categoryId
                                                    "
                                                    >{{ c2.categoryName }}</a
                                                >
                                            </dt>
                                            <!-- 第三级 -->
                                            <dd>
                                                <em
                                                    v-for="c3 in c2.categoryChild"
                                                    :key="c3.categoryId"
                                                >
                                                    <a
                                                        :data-categoryName="
                                                            c3.categoryName
                                                        "
                                                        :data-categoryId="
                                                            c3.categoryId
                                                        "
                                                        >{{
                                                            c3.categoryName
                                                        }}</a
                                                    >
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex' //辅助函数获取数据
import { throttle } from 'lodash'
export default {
    name: 'TypeNav',
    data() {
        return {
            currentIndex: -1,
            show: true
        }
    },
    //组件挂载完毕，可以向服务器发送请求
    mounted() {
        if (this.$route.path != '/home') {
            this.show = false
        }
    },
    computed: {
        ...mapState({
            //右侧是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
            //注入一个参数state，其实为大仓库中的数据
            categoryList: (state) => state.home.categoryList
        })
    },
    methods: {
        //鼠标进入修改响应元素的背景颜色
        //采用键值对形式创建函数，将changeIndex定义为节流函数，该函数触发很频繁时，设置50ms才会执行一次
        changeIndex: throttle(function (index) {
            this.currentIndex = index
        }, 50),

        //event能够获取到触发节点的事件
        goSearch(event) {
            //获取当前触发节点的子节点
            let element = event.target
            //dataset获取节点的自定义属性和属性值（对象可以解构赋值）
            let { categoryname, category1id, category2id, category3id } =
                element.dataset
            if (categoryname) {
                //整理路由跳转的参数
                let location = { name: 'search' }
                let query = { categoryName: categoryname }
                if (category1id) {
                    query.category1Id = category1id
                } else if (category2id) {
                    query.category2Id = category2id
                } else {
                    query.category3Id = category3id
                }
                //判断：如果路由跳转的时候，带有params参数，捎带脚传递过去
                if (this.$route.params) {
                    location.params = this.$route.params
                    //动态给location配置对象添加query属性
                    location.query = query
                    //路由跳转
                    this.$router.push(location)
                }
            }
        },
        /*         goSearch() {
            this.$router.push('/search')
        } */
        //鼠标移除触发时间
        leaveShow() {
            this.currentIndex = -1
            if (this.$route.path != '/home') {
                this.show = false
            }
        },
        enterShow() {
            this.show = true
        }
    }
}
</script>

<style lang="less">
.cur {
    background: #e1251b;
}
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 27px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    /*                     &:hover {
                        .item-list {
                            display: block;
                        }
                    } */
                }
            }
        }
        .sort-enter {
            height: 0px;
        }
        .sort-enter-to {
            height: 461px;
        }
        .sort-enter-to {
            transition: all 0.5s linear;
        }
    }
}
</style>