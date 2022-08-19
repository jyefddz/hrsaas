<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane label="登录账户设置" name="account">
            <!-- 放置表单 -->
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名:">
                <el-input v-model="formData.username" style="width: 300px" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  v-model="formData.password"
                  style="width: 300px"
                  type="password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSave">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="user">
            <UserInfo></UserInfo>
          </el-tab-pane>
          <el-tab-pane label="岗位信息" name="job">
            <JobInfo></JobInfo>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetail } from '@/api/user'
import { saveUserDetailById } from '@/api/employee'
import UserInfo from '@/views/employees/components/user-info.vue'
import JobInfo from '@/views/employees/components/job-info.vue'
import Cookies from 'js-cookie'
export default {
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    return {
      formData: {},
      activeName: Cookies.get('employeeDetailTab') || 'account'
    }
  },

  created() {
    this.loadUserDetail()
  },

  methods: {
    async loadUserDetail() {
      const res = await getUserDetail(this.$route.params.id)
      this.formData = res
    },
    async onSave() {
      await saveUserDetailById(this.formData)
      this.$message.success('修改成功')
    },
    handleTabClick() {
      Cookies.set('employeeDetailTab', this.activeName)
    }
  }
}
</script>

<style scoped></style>
