import { login } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    setToken(state, payLoad) {
      state.token = payLoad
    }
  },
  actions: {
    async getToken(context, payLoad) {
      // 发送请求
      const res = await login(payLoad)
      context.commit('setToken', res)
    }
  }
}
