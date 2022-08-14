<template>
  <div class="dashboard-container">
    <div class="app-container">
      <UploadExcel
        :beforeUpload="excelSuccess"
        :onSuccess="onSuccess"
      ></UploadExcel>
    </div>
  </div>
</template>

<script>
import { importEmployee } from '@/api/employee'
import { formatTime } from '@/filters'
import employees from '@/constant/employees'
const { importMapKeyPath } = employees
export default {
  data() {
    return {}
  },

  created() {},

  methods: {
    excelSuccess({ name }) {
      if (!name.endsWith('.xlsx')) {
        this.$message.error('请选择xlsx文件')
        return false
      }
      return true
    },
    async onSuccess({ header, results }) {
      const newArr = results.map((item) => {
        const obj = {}
        for (let key in importMapKeyPath) {
          if (key === '入职日期' || key === '转正日期') {
            // excel时间戳
            const timestamp = item[key]
            // 转换
            const date = new Date((timestamp - 1) * 24 * 60 * 60 * 1000)
            date.setFullYear(date.getFullYear() - 70)
            obj[importMapKeyPath[key]] = formatTime(date)
          } else {
            obj[importMapKeyPath[key]] = item[key]
          }
        }
        return obj
      })
      await importEmployee(newArr)
      this.$message.success('导入成功')
      this.$router.go('-1')
    }
  }
}
</script>

<style scoped></style>
