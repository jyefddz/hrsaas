import { getUserInfoApi, login, getUserDetail } from '@/api/user'
import { setTokenTime } from '@/utils/auth'
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
    },
    // 退出
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
    }
  }
}
