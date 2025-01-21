import { getToken, removeToken, setToken } from '@/utils/auth'
import {login}  from '@/api/user'
import { getUserProfile } from '@/api/user'
// state中定义数据
const state = {
  token: getToken() ,// 从缓存中读取初始值
  userProfile:{

  } 
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
  },

  setUserProfile(state,userProfile){
    state.userProfile = userProfile
  }

}

// actions中定义页面调用方法
const actions = {
  // 第一个参数是context上下文，第二个参数是传入参数
  async login(conext, data) {
    //  console.log(conext);
    // console.log(data)
    // console.log(data.mobile)
    //   调用登陆接口
    const res =  await login({
      mobile: data.mobile, 
      password: data.password
    })
    const token = res
    // 登陆成功后，会返回一个token 123456(点击登录，设置token为123456)
    conext.commit('setToken', token)
  },
  // 获取用户的基本资料
  async getUserInfo(conext) {
   const res =  await getUserProfile();
   conext.commit('setUserProfile',res);
  //  console.log(conext)
  },
  async logout(conext) {
    // 1.删除token
    conext.commit('removeToken')
    // 2.删除用户信息
    conext.commit('setUserProfile',{})
  }


}

export default {
  namespaced: true, // 开启命名空间,dispatch调用需要这样调用 dispatch('user/login')
  state,
  mutations,
  actions
}