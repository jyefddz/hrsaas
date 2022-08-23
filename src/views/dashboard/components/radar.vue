<template>
  <div class="radarCharts" ref="main">雷达</div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {}
  },

  created() {},
  mounted() {
    this.initRadar()
  },

  methods: {
    initRadar() {
      var myChart = echarts.init(this.$refs.main)
      // 绘制图表
      const radarOption = {
        backgroundColor: '#167b27',
        title: {
          text: '人员绩效表',
          textStyle: {
            color: 'pink',
            fontSize: 20
          }
        },
        legend: {
          data: ['三三', '四四']
        },
        radar: {
          // shape: 'circle',
          axisName: {
            color: 'rgb(238, 100, 102)'
          },
          indicator: [
            { name: '加班', max: 100 },
            { name: 'bug数量', max: 100 },
            { name: '迟到', max: 100 },
            { name: '早退', max: 100 },
            { name: '打游戏', max: 100 },
            { name: '摸鱼', max: 100 }
          ],
          axisLine: {
            lineStyle: {
              color: 'rgba(238, 100, 90, 0.5)'
            }
          },
          splitArea: {
            areaStyle: {
              color: ['#77EADF', '#26C3BE'],
              shadowColor: 'rgba(0, 100, 0, 0.6)',
              shadowBlur: 10
            }
          }
        },
        series: [
          {
            name: '人员绩效表',
            type: 'radar',
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: '三三'
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: '四四'
              }
            ]
          }
        ]
      }
      //   绘制图表
      myChart.setOption(radarOption)
    }
  }
}
</script>

<style scoped lang="scss">
.radarCharts {
  width: 500px;
  height: 500px;
}
</style>
