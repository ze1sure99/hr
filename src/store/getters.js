const getters = {
  sidebar: state => state.app.sidebar, // 取app模块的属性
  device: state => state.app.device,
  token: state => state.user.token, // 取user模块的属性
  avatar: state => state.user.avatar,
  name: state => state.user.name
}
// getters便捷访问
export default getters
