<template>
  <div class="calender">
    <el-row type="flex" justify="end">
      <el-col :span="5">
        <el-select
          @change="updateCalendar"
          v-model="currentYear"
          placeholder="请选择"
        >
          <el-option
            v-for="item in years"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select @change="updateCalendar" v-model="currentMonth">
          <el-option
            v-for="item in 12"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{ date }">
        <div class="cell-box">
          {{ date.getDate() }}
          <span v-if="isweek(date)">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'Calender',
  data() {
    return {
      years: [],
      currentYear: '',
      currentMonth: '',
      currentDate: ''
    }
  },

  created() {
    this.initcalendar()
  },

  methods: {
    initcalendar() {
      const date = new Date()
      this.currentYear = date.getFullYear()
      this.currentMonth = date.getMonth() + 1
      //   this.years = Array(11)
      //     .fill(this.currentYear - 5)
      //     .map((item, i) => item + i)
      this.years = Array.from(
        Array(11).fill(this.currentYear - 5),
        (item, i) => item + i
      )
      this.currentDate = date
    },
    isweek(date) {
      return date.getDay() === 6 || date.getDay() === 0
    },
    // 用于更新日历
    updateCalendar() {
      this.currentDate = this.currentYear + '-' + this.currentMonth
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-calendar__header {
  display: none;
}
::v-deep .el-calendar-table td {
  border: none !important;
}
.cell-box {
  color: pink;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
