import Vue from 'vue'
import Vuex from 'vuex'
import ls from '../utils/localStorage'
import router from '../router'
// 引入 actions.js 的所有导出
import * as moreActions from './actions'


Vue.use(Vuex);

const state = {
    // 用户信息，初始值从本地 localStorage 获取
    user : ls.getItem('user'),
    // 添加 auth 来保存当前用户的登录状态
    auth : ls.getItem('auth'),

    articles: ls.getItem('articles'),

}

const mutations = {
    UPDATE_USER(state, user) {
        // 改变 user 的值
        state.user = user
        // 将改变后的值存入 localStorage
        ls.setItem('user', user)
    },
    // 添加 UPDATE_AUTH 来更改当前用户的登录状态
    UPDATE_AUTH(state, auth){
        state.auth = auth;
        ls.setItem('auth', auth)
    },
    // 更改所有文章的事件类型
    UPDATE_ARTICLES(state, articles) {
        state.articles = articles;
        ls.setItem('articles', articles)
    }
}

const actions = {
    login({ commit }, user) {//参数解构来简化代码
        // 登录时有传用户信息，就更新下用户信息
        if (user) commit('UPDATE_USER', user)
        // 更新当前用户的登录状态为已登录
        commit('UPDATE_AUTH', true)
        // 跳转到首页
        router.push('/')
    },
    logout({ commit }){//参数解构来简化代码
        commit('UPDATE_AUTH',false);
        router.push({name : 'Home',params: { logout: true }});
    },
    // 更新个人信息
    updateUser({ state, commit }, user) {
        // 获取仓库的个人信息
        const stateUser = state.user;
        // 简单的数据类型判断
        if (stateUser && typeof stateUser === 'object') {
            // 合并新旧个人信息，等价于 user = Object.assign({}, stateUser, user)
            user = { ...stateUser, ...user }
        }

        commit('UPDATE_USER', user)
    },
    // 使用对象展开运算符混入 moreActions
    //理解為const actions = Object.assign(actions, moreActions)
    ...moreActions
};
const getters = {
    // 第一参数是 state，因为要传 id，所以这里返回一个函数
    getArticleById: (state) => (id) => {
        // 从仓库获取所有文章
        let articles = state.articles

        // 所有文章是一个数组时
        if (Array.isArray(articles)) {
            // 传进来的 id 和文章的 articleId 相同时，返回这些文章
            articles = articles.filter(article => parseInt(id) === parseInt(article.articleId));
            // 根据文章长度，返回文章或者 null
            return articles.length ? articles[0] : null
        } else {
            // 返回 null
            return null
        }
    }
};

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
});

export default store