import request from '@/utils/request'

/**
 * 登录请求
 * @param {Object} data password mobile
 * @returns Promise
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息
 * @returns Promise
 */
export function getUserInfoApi() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

/**
 * 根据用户id获取员工详情数据
 * @param {String} id 用户id
 * @returns Promise
 */
export function getUserDetail(id) {
  return request({
    url: '/sys/user/' + id
  })
}
