import Layout from '@/layout'
export default {
  path: '/approvals',
  component: Layout,
  meta: {
    id: 'approvals' //用来和后端权限做约定的
  },
  children: [
    {
      path: '',
      component: () => import('@/views/approvals'),
      meta: { title: '审批', icon: 'tree-table' }
    }
  ]
}
