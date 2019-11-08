// 职责：创建一个router实例 导出给main使用
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import Image from '@/views/image'
import NotFound from '@/views/404'

Vue.use(VueRouter)

const router = new VueRouter({
  // 定义路由规则（路径==>组件）
  routes: [
    // name选项作用  找到对应的路由规则
    // 跳转方便一些：$router.push('/login') 或者 $router.push({name:'login'})
    { path: '/login', name: 'login', component: Login },
    { path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/article', name: 'article', component: Article },
        { path: '/image', name: 'image', component: Image }
      ] },
    { path: '*', name: '404', component: NotFound }

  ]
})
// 前置守卫
router.beforeEach((to, from, next) => {
  // 1,去得路径是登陆的时候，放行
  // if (to.path === '/login') return next
  // 2,不是登陆的时候且并没有登录  拦截 登录页面
  // if (!store.getUser().token) return next('/login')
  // 3,其他情况 放行
  // next()
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})
export default router
