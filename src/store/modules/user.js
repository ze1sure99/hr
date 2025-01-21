import { getToken, removeToken, setToken } from '@/utils/auth'
import { login, getUserProfile, updatePassword } from '@/api/user'

// state中定义数据
const state = {
  token: getToken(), // 从缓存中读取初始值
  userProfile: {}
}

const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  setUserProfile(state, userProfile) {
    state.userProfile = userProfile
  }
}

// actions中定义页面调用方法
const actions = {
  // 登录
  async login(conext, data) {
    const res = await login({
      mobile: data.mobile,
      password: data.password
    })
    const token = res
    conext.commit('setToken', token)
  },

  // 获取用户的基本资料
  async getUserInfo(conext) {
    try {
      const res = await getUserProfile()
      if (res && res.username) {
        conext.commit('setUserProfile', res)
      } else {
        conext.commit('setUserProfile', {})
      }
    } catch (error) {
      console.error('获取用户信息失败', error)
      conext.commit('setUserProfile', {}) // 出现错误时确保 userProfile 被清空
    }
  },

  // 登出
  async logout(conext) {
    conext.commit('removeToken')
    conext.commit('setUserProfile', {})
  },

  // 修改用户密码
  async updatePassword(conext, passwordData) {
    console.log(passwordData.currentPassword,passwordData.newPassword)
    const data = {
      oldPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword
    }
    try {
      // 调用 updatePassword API 来修改密码
      const res = await updatePassword(data)
      console.log(res)
      if (res && res.success) {
        // 如果修改密码成功，返回成功消息
        return '密码修改成功'
      } else {
        // 如果返回的结果不成功，抛出错误
        throw new Error(res.message || '密码修改失败')
      }
    } catch (error) {
      // 错误处理
      console.error('修改密码失败', error)
      throw new Error(error.message || '密码修改失败')
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
