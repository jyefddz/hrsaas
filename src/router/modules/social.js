import Layout from '@/layout'
export default {
  path: '/social',
  component: Layout,
  meta: {
    id: 'social' //用来和后端权限做约定的
  },
  children: [
    {
      path: '',
      component: () => import('@/views/social'),
      meta: { title: '社保', icon: 'table' }
    }
  ]
}
