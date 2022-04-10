<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 3000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '500px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['语文', '数学', '英语', '政治']
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: ['初一上', '初一下', '初二上', '初二下', '初三上', '初三下']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '平均分'
          }
        ],
        series: [
          {
            name: '语文',
            type: 'bar',
            barGap: 0,
            // label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [32, 33, 30, 33, 39, 39],
            animationDuration
          },
          {
            name: '数学',
            type: 'bar',
            // label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [20, 82, 91, 34, 90, 34],
            animationDuration
          },
          {
            name: '英语',
            type: 'bar',
            // label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [50, 32, 20, 54, 90, 20],
            animationDuration
          },
          {
            name: '政治',
            type: 'bar',
            // label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [98, 77, 10, 99, 40, 77]
          }
        ]
      })
    }
  }
}
</script>
