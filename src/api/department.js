import request from '@/utils/request'
/**
 * 获取组织架构列表的函数
 */
export function getDepartmentList() {
  return request({
    url: '/api/company/department',
    method: 'get'
  })
}