<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!-- 头部 -->
        <TreeTools
          @add="dialogVisible = true"
          :isRoot="true"
          :treeNode="company"
        />
        <!-- 树形 -->
        <el-tree :data="treeData" :props="defaultProps" default-expand-all>
          <!-- 作用域插槽 -->
          <!-- v-slot 获取组件内部slot提供的数据 -->
          <template v-slot="{ data }">
            <TreeTools
              @add="showAddDept"
              @remove="loadDepts"
              :treeNode="data"
            />
          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- 添加部门弹层 -->
    <AddDept @add-success="loadDepts" :visible.sync="dialogVisible" :currentNode="currentNode"/>
  </div>
</template>

<script>
import { getDeptsApi } from '@/api/departments'
import TreeTools from './components/tree-tools.vue'
import AddDept from './components/add-dept.vue'
import { transListToTree } from '@/utils/index'
export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      treeData: [],
      defaultProps: {
        label: 'name' //将data中哪个数据名显示到树形页面中
        // children: 'child' //树形默认查找了节点通过children
      },
      company: { name: '传智教育', manager: '负责人' },
      dialogVisible: false,
      currentNode: {}
    }
  },

  created() {
    this.loadDepts()
  },

  methods: {
    async loadDepts() {
      const res = await getDeptsApi()
      this.treeData = transListToTree(res.depts, '')
    },
    showAddDept(val) {
      this.dialogVisible = true
      this.currentNode = val
    }
  }
}
</script>

<style scoped lang="scss">
.el-card {
  font-size: 14px;
}
</style>
