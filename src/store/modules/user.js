import { getUserInfoApi, login, getUserDetail } from '@/api/user'
import { setTokenTime } from '@/utils/auth'
import { resetRouter } from '@/router'
export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {}
  },
  mutations: {
    setToken(state, payLoad) {
      state.token = payLoad
    },
    setUserInfo(state, payLoad) {
      state.userInfo = payLoad
    }
  },
  actions: {
    // 登录获取token
    async getToken(context, payLoad) {
      // 发送请求
      const res = await login(payLoad)
      context.commit('setToken', res)
      setTokenTime()
    },
    // 获取用户信息
    async getUserInfo(context) {
      const userBaseInfo = await getUserInfoApi()
      const userInfo = await getUserDetail(userBaseInfo.userId)
      context.commit('setUserInfo', { ...userBaseInfo, ...userInfo })
      // 在这里通过userbaseInfo 处理动态路由
      // actions 内部可以通过 return将数据传递出去,类似then中的reject
      return userBaseInfo
    },
    // 退出
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      resetRouter()
      //  { root: true } context相当于全局的context
      context.commit('permission/setRoutes', [], { root: true })
    }
  }
}
