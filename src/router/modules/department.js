import Layout from '@/layout'

export default {
  name: 'department',
  path: '/department', // 父路径
  component: Layout,
  redirect: '/department/index1', // 默认重定向到第一个子路径
  meta: {
    title: '组织管理',
    icon: 'tree'
  },
  children: [
    {
      path: 'index1', // 第一个子路径
      name: 'DepartmentIndex1',
      component: () => import('@/views/department/index1'),
      meta: {
        title: '子页面1',
        icon: 'el-icon-document'
      }
    },
    {
      path: 'index2', // 第二个子路径
      name: 'DepartmentIndex2',
      component: () => import('@/views/department/index2'),
      meta: {
        title: '子页面2',
        icon: 'el-icon-folder'
      }
    }
  ]
}