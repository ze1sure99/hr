import axios from 'axios'
import store from '@/store'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  timeout: 10000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 使用 store 获取 token
    const token = store.getters.token // 从 Vuex 中获取 token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}` // 在请求头中添加 Authorization
    }
    return config
  },
  error => {
    // 请求错误处理
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        // 如果服务器返回的数据符合预期，直接返回
        return response.data;
    },
    error => {
        // 响应错误处理
        console.error('响应错误:', error);
        if (error.response) {
            // 根据返回的错误代码做处理
            if (error.response.status === 401) {
                // 处理未授权的情况，可能是 token 失效，跳转到登录页面
                console.log('Token 失效，请重新登录');
                // todo 例如清除 token 并跳转到登录页面
                // store.dispatch('user/logout'); // 调用 Vuex 中的 logout action 清除 token
                // window.location.href = '/login';
            } else {
                // 其他类型的错误可以在这里处理
                console.error('其他错误:', error.response.status);
            }
        } else {
            // 如果没有响应，表示网络问题或其他错误
            console.error('网络错误:', error.message);
        }
        return Promise.reject(error); // 返回失败的 Promise
    }
);

export default service
