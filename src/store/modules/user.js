import { getToken, removeToken, setToken } from '@/utils/auth'
// state中定义数据
const state = {
  token: getToken() // 从缓存中读取初始值
}

const mutations = {
  // mutations中的方法，第一个参数是state，第二个参数是传入的参数（payload）
  // setToken两个参数 state是当前模块的state token是传入的token
  setToken(state, token) {
    // 存到vuex中
    state.token = token
    // 同步到缓存
    setToken(token)
  },
  removeToken(state) {
    // 1.删除vuex中的token
    state.token = null
    // 2.删除缓存中的token
    removeToken()
  }
}

// actions中定义页面调用方法
const actions = {
  // 第一个参数是context上下文，第二个参数是传入参数
  login(conext, data) {
    //  console.log(conext);
    console.log(data)
    // todo: 调用登陆接口

    // 登陆成功后，会返回一个token 123456(点击登录，设置token为123456)
    conext.commit('setToken', '123456')
  }
}

export default {
  namespaced: true, // 开启命名空间,dispatch调用需要这样调用 dispatch('user/login')
  state,
  mutations,
  actions
}
