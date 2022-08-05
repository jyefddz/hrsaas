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
import TreeTools from './components/tree-tools.vue'
export default {
  components: {
    TreeTools
  },
  data() {
    return {
      treeData: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' }
      ],
      defaultProps: {
        label: 'name' //将data中哪个数据名显示到树形页面中
        // children: 'child' //树形默认查找了节点通过children
      },
      company: { name: '传智教育', manager: '负责人' }
    }
  },

  created() {},

  methods: {}
}
</script>

<style scoped lang="scss">
.el-card {
  font-size: 14px;
}
</style>
