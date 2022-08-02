import router from '@/router'
import store from '@/store'
// 路由(全局)前置守卫
// 会在所有路由进入之前触发
// 进行权限控制
// 调用了next 进入该路由,如果没有调用则无法进入
// to: 去哪里的路由信息
// from: 来自哪里的路由信息
// next: 是否进入
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  if (token) {
    // 1. 登录
    // 1.1 是否进入登录页
    if (to.path === '/login') {
      // 是  跳到首页
      next('/')
    } else {
      // 不是  直接进入
      next()
    }
  } else {
    // 2. 未登录
    // 访问的是否在白名单(未登录也能访问的页面)
    const isCludes = whiteList.includes(to.path)
    if (isCludes) {
      // 2.1. 在白名单 放行
      next()
    } else {
      // 2.2 不在白名单(不登录不能访问) 跳到登录页
      next('/login')
    }
  }
})
