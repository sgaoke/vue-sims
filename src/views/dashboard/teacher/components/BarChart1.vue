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
          data: ['优秀', '良好', '合格', '不合格']
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
            name: '人数'
          }
        ],
        series: [
          {
            name: '优秀',
            type: 'bar',
            barGap: 0,
            // label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [63, 69, 86, 53, 59, 79],
            animationDuration
          },
          {
            name: '良好',
            type: 'bar',
            // label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [62, 78, 59, 94, 69, 73],
            animationDuration
          },
          {
            name: '合格',
            type: 'bar',
            // label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [75, 83, 62, 94, 59, 62],
            animationDuration
          },
          {
            name: '不合格',
            type: 'bar',
            // label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [79, 67, 91, 79, 64, 87]
          }
        ]
      })
    }
  }
}
</script>
