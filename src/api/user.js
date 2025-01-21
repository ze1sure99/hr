import request from '@/utils/request';

export function login(data) {
  console.log('api/login', data);
  return request({
    url: 'api/sys/login',
    method: 'post',
    data: data
  })
    .then(response => {
      if (response && response.success === true) {
        return response.data; // 返回登录成功时的 token 数据
      } else {
        throw new Error(response.message || '登录失败');
      }
    })
    .catch(error => {
      console.error('登录请求失败:', error);
      throw error; // 抛出错误
    });
}


export function getUserProfile() {
  return request({
    url: '/api/sys/profile',  // API 路径
    method: 'get',            // 请求方式为 GET
  })
    .then(response => {
      if (response && response.success === true) {
        return response.data;  // 返回用户资料数据
      } else {
        throw new Error(response.message || '获取用户资料失败');
      }
    })
    .catch(error => {
      console.error('获取用户资料失败:', error);
      throw error;  // 抛出错误
    });
}


