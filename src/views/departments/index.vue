<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!-- 头部 -->
        <TreeTools :isRoot="true" :treeNode="company" />
        <!-- 树形 -->
        <el-tree :data="treeData" :props="defaultProps" default-expand-all>
          <!-- 作用域插槽 -->
          <!-- v-slot 获取组件内部slot提供的数据 -->
          <template v-slot="{ data }">
            <TreeTools :treeNode="data" />
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getDeptsApi } from '@/api/departments'
import TreeTools from './components/tree-tools.vue'
import { transListToTree } from '@/utils/index'
export default {
  components: {
    TreeTools
  },
  data() {
    return {
      treeData: [],
      defaultProps: {
        label: 'name' //将data中哪个数据名显示到树形页面中
        // children: 'child' //树形默认查找了节点通过children
      },
      company: { name: '传智教育', manager: '负责人' }
    }
  },

  created() {
    this.loadDepts()
  },

  methods: {
    async loadDepts() {
      const res = await getDeptsApi()
      this.treeData = transListToTree(res.depts, '')
    }
  }
}
</script>

<style scoped lang="scss">
.el-card {
  font-size: 14px;
}
</style>
