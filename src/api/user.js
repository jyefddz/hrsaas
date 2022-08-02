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
