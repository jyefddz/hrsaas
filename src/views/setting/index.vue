<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-button type="primary" @click="addDialogVisible = true"
            >新增角色</el-button
          >
          <!-- 表格 -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="序号" type="index"> </el-table-column>
            <el-table-column prop="name" label="角色"> </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            :page-size="pageSize"
            :page-sizes="[3, 5, 10, 20]"
            layout="prev, pager, next, sizes"
            :total="total"
            @current-change="currentChange"
            @size-change="handleSizeChange"
          >
          </el-pagination>
        </el-tab-pane>
        <!-- 弹层 -->
        <el-dialog
          @close="dialogClose"
          title="新增角色"
          :visible.sync="addDialogVisible"
          width="50%"
        >
          <!-- :model -->
          <!-- v-model @input :value -->
          <el-form
            ref="form"
            label-width="80px"
            :model="addRoleForm"
            :rules="addRoleFormRules"
          >
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="addRoleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="角色描述">
              <el-input v-model="addRoleForm.description"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="onClose">取 消</el-button>
            <el-button type="primary" @click="onAddRole">确 定</el-button>
          </span>
        </el-dialog>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>
          <el-form ref="form" label-width="80px">
            <el-form-item label="公司名称">
              <el-input v-model="companyInfo.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                v-model="companyInfo.companyAddress"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input v-model="companyInfo.mailbox" disabled></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="companyInfo.remarks" disabled></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getRolesApi, addRolesApi } from '@/api/role'
import { getCompanyInfoApi } from '@/api/setting'
export default {
  data() {
    return {
      activeName: 'first',
      tableData: [],
      total: 0,
      pageSize: 3,
      page: 1,
      addDialogVisible: false,
      addRoleForm: { name: '', description: '' },
      addRoleFormRules: {
        name: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          }
        ]
      },
      companyInfo: { name: '', companyAddress: '', mailbox: '', remarks: '' }
    }
  },

  created() {
    this.getRoles()
    this.getCompanyInfo()
  },

  methods: {
    async getRoles() {
      const { rows, total } = await getRolesApi({
        page: this.page,
        pagesize: this.pageSize
      })
      this.tableData = rows
      this.total = total
    },
    currentChange(val) {
      this.page = val
      this.getRoles()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getRoles()
    },
    // 点击取消
    onClose() {
      this.addDialogVisible = false
    },
    async onAddRole() {
      await this.$refs.form.validate()
      await addRolesApi(this.addRoleForm)
      this.$message.success('添加成功')
      this.addDialogVisible = false
      this.getRoles()
    },
    // 监听对话框关闭
    dialogClose() {
      this.$refs.form.resetFields()
      this.addRoleForm.description = ''
    },
    async getCompanyInfo() {
      const res = await getCompanyInfoApi(
        this.$store.state.user.userInfo.companyId
      )
      this.companyInfo = res
      // console.log(this.companyInfo)
    }
  }
}
</script>

<style scoped lang="less"></style>
