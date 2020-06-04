import Vue from 'vue'
import Router from 'vue-router'
const Home = resolve => {
  require.ensure(
    ['@/views/home/index.vue'],
    () => {
      resolve(require('@/views/home/index.vue'))
    },
    ''
  )
}
const GenerGif = resolve => {
  require.ensure(
    ['@/views/generGif/index.vue'],
    () => {
      resolve(require('@/views/generGif/index.vue'))
    },
    ''
  )
}
const Qr = resolve => {
  require.ensure(
    ['@/views/qr/index.vue'],
    () => {
      resolve(require('@/views/qr/index.vue'))
    },
    ''
  )
}


Vue.use(Router)

const routes = [
  { path: '*', redirect: '/' },
  { name: 'home', path: '/', component: Home, meta: { auth: true } },
  { name: 'gif', path: '/gif', component: GenerGif, meta: { auth: true } },
  { name: 'qr', path: '/qr', component: Qr, meta: { auth: true } }
]

const router = new Router({
  mode: 'hash',
  routes
})
export default router
