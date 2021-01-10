<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['hourlyEightChartData'],
  data: () => ({
    chartData: {
      datasets: [
        {
          label: 'Weather Data I am the cool label',
          backgroundColor: '#ffffff',
          borderColor: '#000000',
          fill: false,
          data: []
        }
      ]
    },
    chartOptions: {
      gridLines: {
        display: false
      },
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Chart.js Time Point Data'
        }
      },
      scales: {
        x: {
          type: 'time',
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Time'
          },
          gridLines: {
            display: false
          },
          ticks: {
            display: true,
            color: '#00ffff'
          }
        },
        y: {
          gridLines: {
            display: false
          },
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Temp'
          },
          ticks: {
            display: false
          }
        }
      }
    }
  }),
  mounted() {
    console.log('heyyaaaa!', this.hourlyEightChartData)
    this.chartData.datasets[0].data = this.hourlyEightChartData
    this.renderChart(this.chartData, this.chartOptions)
  },
  created() {
    console.log('123!', this.hourlyEightChartData)
  }
}
</script>

<style></style>
