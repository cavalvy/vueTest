import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router);

const router = new Router({
    mode : 'history',
    linkExactActiveClass : 'active',
    routes
})
// 全局前置守卫
router.beforeEach((to, from, next) => {
    const app = router.app;
    const store = app.$options.store;
    // 获取仓库里的登录信息
    const auth = store.state.auth;

    const articleId = to.params.articleId;
    //跳轉新頁面后隱藏消息
    app.$message.hide();

    if ((auth && to.path.indexOf('/auth/') !== -1) || (!auth && to.meta.auth) ||
        // 有 articleId 且不能找到与其对应的文章时，跳转到首页
        (articleId && !store.getters.getArticleById(articleId)))
    {
        // 如果当前用户已登录，且目标路由包含 /auth/ ，就跳转到首页
        next('/')
    } else {
        next()
    }
});

router.afterEach((to, from) => {
    const app = router.app
    const store = app.$options.store
    const showMsg = to.params.showMsg

    if (showMsg) {
        // showMsg 是一个字符时，使用它作为消息内容
        if (typeof showMsg === 'string') {
            app.$message.show(showMsg)
        } else {
            app.$message.show('操作成功')
        }
    }
})

export default router