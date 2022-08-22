import Layout from '@/layout'
export default {
  path: '/salarys',
  component: Layout,
  meta: {
    id: 'salarys' //用来和后端权限做约定的
  },
  children: [
    {
      path: '',
      component: () => import('@/views/salarys'),
      meta: { title: '工资', icon: 'money' }
    }
  ]
}
