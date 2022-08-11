import request from '@/utils/request'

/**
 * 获取员工列表(简单)
 * @returns Promise
 */
export function getEmployeesApi() {
  return request({
    url: '/sys/user/simple'
  })
}

/**
 * 获取员工列表
 * @param {*} params {page,size}
 * @returns 
 */
export function getEmployeesInfoApi(params) {
  return request({
    url: '/sys/user',
    params
  })
}