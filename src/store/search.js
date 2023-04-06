//search模块仓库
import {reqGetSearchInfo} from "@/api"

const actions = {
    async getSearchList({ commit }, params) {
       let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
        commit("GETSEARCHLIST",result.data)
    }
    }
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList=searchList
    }
}
const state = {
    searchList:{}
}
//在项目中为了简化数据而生,
const getters = {
    //当前仓库中的state，并非大仓库中的state
    goodsList(state) {
        return state.searchList.goodsList||[]         
    },
    trademarkList(state) {
        return state.searchList.trademarkList
    },
    attrsList(state) {
        return state.searchList.attrsList
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}