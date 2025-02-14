import request from '@/utils/request'

/**
 * 获取权限列表
 */
export function getPermissonList() {
    return request({
        url: '/api/sys/permission',
        method: 'get'
    })
}