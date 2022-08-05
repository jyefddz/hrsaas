import request from '@/utils/request'

/**
 * 获取组织架构的数据
 * @returns Promise
 */
export function getDeptsApi() {
  return request({
    url: '/company/department'
  })
}
