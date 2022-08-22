import Layout from '@/layout'
export default {
  path: '/attendances',
  component: Layout,
  meta: {
    id: 'attendances' //用来和后端权限做约定的
  },
  children: [
    {
      path: '',
      component: () => import('@/views/attendances'),
      meta: { title: '考勤', icon: 'skill' }
    }
  ]
}
