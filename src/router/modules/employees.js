import Layout from '@/layout'
export default {
  path: '/employees',
  component: Layout,
  meta: {
    id: 'employees' //用来和后端权限做约定的
  },
  children: [
    {
      path: '',
      component: () => import('@/views/employees'),
      meta: { title: '员工', icon: 'people' },
      name: 'employees',
    },
    {
      path: 'detail/:id',
      component: () => import('@/views/employees/detail'),
      hidden: true,
      name: 'employees',
    },
    {
      path: 'print/:id', // 二级默认路由
      component: () => import('@/views/employees/print'), // 按需加载
      hidden: true,
      name: 'employees',
    }
  ]
}
