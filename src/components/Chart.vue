<template>
  <canvas ref="chartRef" id="myChart"></canvas>
</template>

<script>
import { Chart } from 'chart.js/dist/Chart.min.js'
export default {
  props: ['hourlyEightChartData'],
  data: () => ({
    chartData: {
      labels: ['', '', '', '', '', '', '', ''],
      datasets: [
        {
          pointRadius: 0,
          lineTension: 0.4,
          backgroundColor: '#f1f1f1',
          borderWidth: 0,
          borderColor: '#f1f1f1',
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
    }
  }),
  computed: {
    minTemp() {
      let smallest = this.hourlyEightChartData[0].y
      this.hourlyEightChartData.forEach((item) => {
        if (item.y < smallest) {
          smallest = item.y
        }
      })
      return smallest
    },
    maxTemp() {
      let largest = this.hourlyEightChartData[0].y
      this.hourlyEightChartData.forEach((item) => {
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
  mounted() {
    // this.chartData.labels = this.hourlyEightChartData
    this.chartData.datasets[0].data = this.hourlyEightChartData
    this.chartOptions.scales.yAxes[0].ticks.min = this.minTemp - 10
    this.chartOptions.scales.yAxes[0].ticks.max = this.maxTemp + 10
    const chartRefContext = this.$refs.chartRef.getContext('2d')
    // const myChart =
    new Chart(chartRefContext, {
      scaleStartValue: 0,
      type: 'line',
      data: this.chartData,
      options: this.chartOptions
    })
    // this.renderChart(this.chartData, this.chartOptions)
    // this.chartData.datasets[0].data = this.hourlyEightChartData
  }
}
</script>

<style></style>
