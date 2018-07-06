// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入 vue.js 的默认值
import Vue from 'vue'
// 引入 App.vue 的默认值
import App from './App'

import router from './router'
//全局指令
import './directives'
//全局消息
import './components'
// 引入 store/index.js 的默认值
import store from './stroe'
// 引入插件
import VueSweetalert2 from './plugins/vue-sweetalert2'
import Message from './plugins/message'

// 使用插件
Vue.use(VueSweetalert2);
Vue.use(Message);
// 设置 false 以阻止 Vue 在启动时生成生产提示
Vue.config.productionTip = false
// eslint 配置，允许 new 一个实例后不赋值，我们没有使用 eslint，如果有，则下一行注释不可缺少
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // 注入 store
  store,
  components: { App },
  template: '<App/>'
})
