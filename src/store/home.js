//search模块仓库
import { reqCateGoryList, reqGetBannerList,reqFloorList } from "@/api"
const actions = {
    async categoryList({commit}) {  //形参commit 解构赋值
        let result = await reqCateGoryList();
        if (result.code == 200) {
            commit("CATEGORYLIST",result.data)
        }
    },
   async getBannerList({commit}){
       let result = await reqGetBannerList()
       if (result.code == 200) {
           commit('GETBANNERLIST',result.data)
       }
    },
   
   async getFloorList({ commit }) {
       let result = await reqFloorList()
       if (result.code == 200) {
        commit('GETFLOORLIST',result.data)
    }
   }
}
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
        
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList=bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList=floorList
    }

}
const state = {
    categoryList: [],
    bannerList: [],
    floorList:[]
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}