import request from '@/utils/request'

/**
 * 获取角色列表
 * @param {*} params
 * @returns
 */
export function getRolesApi(params) {
  return request({
    url: '/sys/role',
    params
  })
}

/**
 * 添加角色
 * @param {*} data {name,rgion}
 * @returns
 */
export function addRolesApi(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}

/**
 * 根据id获取角色详情
 * @param {*} id 角色id
 * @returns Promise
 */
export function getRolesInfo(id) {
  return request({
    url: '/sys/role/' + id
  })
}

/**
 *  给角色分配权限
 * @param {*} data {id,permIds}
 * @returns Promise
 */
export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}