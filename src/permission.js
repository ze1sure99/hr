import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth' // 从 cookie 获取 token
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // 配置 NProgress（不显示旋转的加载图标）

const whiteList = ['/login'] // 不需要重定向的白名单

// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  // 开始进度条
  NProgress.start()

  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // 判断用户是否登录（是否有 token）
  const hasToken = getToken()

  if (hasToken) {
    // 如果用户有 token 且访问的是登录页，跳转到首页
    if (to.path === '/login') {
      next({ path: '/' }) // 已登录，跳转到首页
      NProgress.done() // 完成进度条
    } else {
       //这个分支会执行路由后置守卫
       next() // 放过
    }
  } else {
    // 如果没有 token（未登录）
    if (whiteList.indexOf(to.path) !== -1) {
      // 如果是白名单中的页面（无需登录），直接跳转
      next()
    } else {
      // 如果是其他页面（需要登录），跳转到登录页
      next(`/login?redirect=${to.path}`) // 跳转到登录页面并携带重定向路径
      NProgress.done() // 完成进度条
    }
  }
})

// 路由后置守卫
router.afterEach(() => {
  // 完成进度条
  NProgress.done()
})
