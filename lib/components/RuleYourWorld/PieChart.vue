<template>
  <v-chart 
    :options='chartOptions'
    class='pie-chart'
    ref='pieChart'
  />
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'

export default {
  name: 'PieChart',

  props: {
    seriesData: {
      type: Array,
      required: false,
      default: () => {
        return []
      },
    }
  },

  components: {
    'v-chart': ECharts,
  },

  computed: {
    chartOptions () {
      return {
         tooltip: {
          show: true,
          trigger: 'item',
          formatter: "{b}: {c}%"
        },
        series: [
          {
            name: 'Percent of people on the category',
            type: 'pie',
            radius: '90%',
            center: ['50%', '50%'],
            data: [
              ...this.chartSeriesData,
            ],
          },
        ],
      }
    },

    chartSeriesData () {
      const data = this.seriesData.filter(data => data.value)
      if (this.remaining > 0) {
        return [
          {
            name: 'Remaining',
            value: this.remaining,
          },
          ...data,
        ]
      }

      return data
    },

    remaining () {
      return this.seriesData.reduce((acc, curr) => {
        if (curr.value) {
          return acc - curr.value
        }

        return acc
      }, 100)
    }
  },
}
</script>

<style lang="scss" scoped>
.pie-chart {
  height: 100%;
  width: 100%;
}
</style>
