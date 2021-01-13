<template>
  <canvas ref="chartRef" id="myChart"></canvas>
</template>

<script>
import { Chart } from 'chart.js/dist/Chart.min.js'
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    chartData: {
      labels: ['', '', '', '', '', '', '', ''],
      datasets: [
        {
          pointRadius: 0,
          lineTension: 0.4,
          backgroundColor: '#f2f2f2',
          borderWidth: 2,
          borderColor: '#aaaaaa',
          data: []
        }
      ]
    },
    chartOptions: {
      scaleShowLabels: false,
      maintainAspectRatio: false,
      responsive: true,
      legend: {
        display: false
      },
      gridLines: {
        display: false
      },
      scales: {
        xAxes: [
          {
            id: 'x',
            display: false,
            scaleLabel: {
              display: false
            }
          }
        ],
        yAxes: [
          {
            id: 'y',
            display: false,
            scaleLabel: {
              display: false
            },
            ticks: {
              major: {
                enabled: false
              },
              min: 0,
              max: 100
            }
          }
        ]
      }
    },
    chartInstance: null
  }),
  computed: {
    ...mapGetters(['hourlyChartData']),
    minTemp() {
      let smallest = this.hourlyChartData[0].y
      this.hourlyChartData.forEach((item) => {
        if (item.y < smallest) {
          smallest = item.y
        }
      })
      return smallest
    },
    maxTemp() {
      let largest = this.hourlyChartData[0].y
      this.hourlyChartData.forEach((item) => {
        if (item.y > largest) {
          largest = item.y
        }
      })
      return largest
    }
  },
  // xAxes: [
  //   {
  //   }
  // ],
  // yAxes: [
  //   {
  //     weight: 5000,
  //     gridLines: {
  //       display: false
  //     }
  //   }
  // ]
  watch: {
    hourlyChartData() {
      console.log('DATA CHANGED WATCHER?? FINALLY?')
      // this.$forceUpdate()
      console.log('UPDAETEEE!')
      this.chartData.datasets[0].data = this.hourlyChartData
      this.chartOptions.scales.yAxes[0].ticks.min = this.minTemp - 10
      this.chartOptions.scales.yAxes[0].ticks.max = this.maxTemp + 10
      this.chartInstance.update()
    }
  },
  mounted() {
    console.log('MOUNTTED!')
    this.chartData.datasets[0].data = this.hourlyChartData
    this.chartOptions.scales.yAxes[0].ticks.min = this.minTemp - 10
    this.chartOptions.scales.yAxes[0].ticks.max = this.maxTemp + 10
    const chartRefContext = this.$refs.chartRef.getContext('2d')
    const chartInstance = new Chart(chartRefContext, {
      scaleStartValue: 0,
      type: 'line',
      data: this.chartData,
      options: this.chartOptions
    })
    this.chartInstance = chartInstance
  },
  updated() {
    //  everything used to be here
  },
  beforeUpdate() {
    console.log('OK NOW????')
  }
}
</script>

<style></style>
