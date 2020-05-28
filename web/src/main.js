// import 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router/index'
import '@/style/reset.css'
import '@/style/common.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
// 生产环境关闭devtools和日志与警告
if (process.env.NODE_ENV === 'production') {
  Vue.config.devtools = false
  Vue.config.silent = true
}

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  mounted() {
    document.dispatchEvent(new Event('render-event'));
  }
})






// import Vue from 'vue'
// import App from './App.vue'

// Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')
