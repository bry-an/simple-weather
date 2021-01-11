<script>
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
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
          // fill: false,
          data: []
        }
      ]
    },
    chartOptions: {
      responsive: true,
      gridLines: {
        display: false
      },
      plugins: {
        title: {
          display: true,
          text: 'Chart.js Time Point Data'
        }
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: false
            }
          }
        ],
        x: {
          type: 'time',
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Time'
          },
          ticks: {
            display: true,
            color: '#00ffff'
          }
        },
        y: {
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
    this.chartData.datasets[0].data = this.hourlyEightChartData
    // this.chartData.labels = this.hourlyEightChartData
    this.renderChart(this.chartData, this.chartOptions)
  },
  created() {
    console.log('123!', this.hourlyEightChartData)
  }
}
</script>

<style></style>
