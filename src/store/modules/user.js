import { getUserInfoApi, login, getUserDetail } from '@/api/user'
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
    },
    // 获取用户信息
    async getUserInfo(context) {
      const userBaseInfo = await getUserInfoApi()
      const userInfo = await getUserDetail(userBaseInfo.userId)
      context.commit('setUserInfo', { ...userBaseInfo, ...userInfo })
    }
  }
}
