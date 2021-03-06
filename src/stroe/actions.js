// 引入路由作页面跳转用
import router from '../router'

// 导出一个 post 事件，这里的用户参数是 { article, articleId }，article 包含文章标题和内容，articleId 是文章 ID
export const post = ({ commit, state }, { article, articleId }) => {
    // 从仓库获取所有文章
    let articles = state.articles;
    // 没有文章时，建一个空数组
    if (!Array.isArray(articles)) articles = [];

    // 存在 article 时
    if (article) {
        // 因为是单用户，所以指定用户 ID 为 1
        const uid = 1;
        // 获取用户传过来的 title 和 content
        const {title, content} = article;
        // 获取当前日期
        const date = new Date();

        // 如果没传 articleId，表示新建文章
        if (articleId === undefined) {
            // 获取最后一篇文章
            const lastArticle = articles[articles.length - 1];

            if (lastArticle) {
                // 将当前 articleId 在最后一篇文章的 articleId 基础上加 1
                articleId = parseInt(lastArticle.articleId) + 1
            } else {
                // 将当前 articleId 在文章长度基础上加 1
                articleId = articles.length + 1
            }

            // 将当前文章添加到所有文章
            articles.push({
                uid,
                articleId,
                title,
                content,
                date
            })
        } else { // article 传参时
            // 遍历所有文章
            for (let article of articles) {
                // 找到与 articleId 对应的文章
                if (parseInt(article.articleId) === parseInt(articleId)) {
                    article.title = title;
                    article.content = content;
                    break
                }
            }
            // 更新文章列表
            commit('UPDATE_ARTICLES', articles)
            // 跳转，附带 Content 参数，以指示首页显示一个消息提示
            router.push({name: 'Content', params: {articleId, showMsg: true}})
        }
    }else { // article 传参时
            // 遍历所有文章
        for (let article of articles) {
            // 找到与 articleId 对应的文章
            if (parseInt(article.articleId) === parseInt(articleId)) {
                // 删除对应的文章
                articles.splice(articles.indexOf(article), 1);
                break
            }
        }

        // 更新文章列表
        commit('UPDATE_ARTICLES', articles)
        // 跳转到首页，附带 showMsg 参数，以指示首页显示一个消息提示
        router.push({ name: 'Home', params: { showMsg: true } })
    }
};
// 参数 articleId 是文章 ID；isAdd 为 true 时点赞，为 false 时取消赞
export const like = ({ commit, state }, { articleId, isAdd }) => {
    // 仓库的文章
    let articles = state.articles
    // 点赞用户列表
    let likeUsers = []
    // 用户 ID，默认为 1
    const uid = 1

    if (!Array.isArray(articles)) articles = []

    for (let article of articles) {
        // 找到对应文章时
        if (parseInt(article.articleId) === parseInt(articleId)) {
            // 更新点赞用户列表
            likeUsers = Array.isArray(article.likeUsers) ? article.likeUsers : likeUsers;

            if (isAdd) {
                // 是否已赞
                const isAdded = likeUsers.some(likeUser => parseInt(likeUser.uid) === uid);

                if (!isAdded) {
                    // 在点赞用户列表中加入当前用户
                    likeUsers.push({ uid })
                }
            } else {
                for (let likeUser of likeUsers) {
                    // 找到对应点赞用户时
                    if (parseInt(likeUser.uid) === uid) {
                        // 删除点赞用户
                        likeUsers.splice(likeUsers.indexOf(likeUser), 1)
                        break
                    }
                }
            }

            // 更新文章的点赞用户列表
            article.likeUsers = likeUsers
            break
        }
    }

    // 提交 UPDATE_ARTICLES 以更新所有文章
    commit('UPDATE_ARTICLES', articles)
    // 返回点赞用户列表
    return likeUsers
}