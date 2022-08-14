<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools>
        <span slot="left-tag">共166条记录</span>
        <template slot="right">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
            >导入</el-button
          >
          <el-button size="small" type="danger" @click="exportExcel"
            >导出</el-button
          >
          <el-button size="small" type="primary" @click="showAdd"
            >新增员工</el-button
          >
        </template>
      </PageTools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table :data="employees">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="员工">
            <template slot-scope="{ row }">
              <img
                v-imgError="require('@/assets/common/head.jpg')"
                :src="row.staffPhoto"
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
              />
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            :formatter="formatFormOfEmployment"
            prop="formOfEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="">
            <!-- 为什么这个位置用过滤器,格式化时间不只局限于表格, 此时建议用过滤器 -->
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="">
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push('/employees/detail/' + row.id)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="onRemove(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            :current-page="pages.page"
            :page-size="pages.size"
            :total="total"
            layout="prev, pager, next"
            @current-change="currentChange"
            @size-change="handleSizeChange"
          />
        </el-row>
      </el-card>
    </div>
    <!-- 添加员工组件 -->
    <add-employees
      @add-success="getEmployeesList"
      :visible.sync="showAddEmployees"
    />
  </div>
</template>

<script>
import { getEmployeesInfoApi, delEmployee } from '@/api/employee'
import employees from '@/constant/employees'
const { exportExcelMapPath, hireType } = employees
import AddEmployees from './components/add-employees.vue'
export default {
  name: 'Employees',
  components: {
    AddEmployees
  },
  data() {
    return {
      employees: [],
      total: 0,
      pages: {
        page: 1,
        size: 5
      },
      showAddEmployees: false
    }
  },

  created() {
    this.getEmployeesList()
  },

  methods: {
    async getEmployeesList() {
      const { rows, total } = await getEmployeesInfoApi(this.pages)
      this.employees = rows
      this.total = total
    },
    currentChange(val) {
      this.pages.page = val
      this.getEmployeesList()
    },
    handleSizeChange(val) {
      this.pages.page = val
      this.getEmployeesList()
    },
    formatFormOfEmployment(row, colum, cellValue, index) {
      // if (cellValue === 1) return '正式'
      // if (cellValue === 2) return '非正式'
      // return '未知'
      const findItem = employees.hireType.find((item) => item.id === cellValue)
      return findItem ? findItem.value : '未知'
    },
    async onRemove(id) {
      try {
        await this.$confirm('是否删除该员工')
        await delEmployee(id)
        this.$message.success('删除成功')
        this.getEmployeesList()
      } catch (error) {}
    },
    showAdd() {
      this.showAddEmployees = true
    },
    async exportExcel() {
      const { export_json_to_excel } = await import('@/vendor/Export2Excel')
      const { rows } = await getEmployeesInfoApi({
        page: 1,
        size: this.total
      })
      const header = Object.keys(exportExcelMapPath)
      const data = rows.map((item) => {
        return header.map((h) => {
          if (h === '聘用形式') {
            const findItem = hireType.find((hire) => {
              return hire.id === item[exportExcelMapPath[h]]
            })
            return findItem ? findItem.value : '未知'
          } else {
            return item[exportExcelMapPath[h]]
          }
        })
      })
      export_json_to_excel({
        header: header,
        data: data,
        filename: '员工资料表',
        autoWidth: true,
        bookType: 'xlsx',
        multiHeader: [['手机号', '其他信息', '', '', '', '', '部门']],
        merges: ['A1:A2', 'B1:F1', 'G1:G2']
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
